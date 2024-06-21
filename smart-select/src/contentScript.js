'use strict'

import { getSurroundingInlineTextNodes } from './domUtils.js'

let textNodesCache = null

function parseDbClickSelectionGetSerializedTextNodeList(selection) {
    const textNode = selection.anchorNode
    const startOffset = selection.anchorOffset
    const endOffset = selection.focusOffset

    // Note: we assume that the element is always a text node
    if (textNode.nodeType !== Node.TEXT_NODE) {
        console.error(
            `Unexpected node type: ${textNode.nodeType}, please reach out to support.`
        )
        return
    }

    const { inlineText, textNodes, initialNodeIndex } =
        getSurroundingInlineTextNodes(textNode)
    console.log(
        'in: parseDbClickSelectionGetTextNodeList, inlineText',
        inlineText
    )
    console.log(
        'in: parseDbClickSelectionGetTextNodeList, textNodes',
        textNodes.length
    )
    for (const node of textNodes) {
        console.log(node.nodeValue)
    }
    console.log(
        'in: parseDbClickSelectionGetTextNodeList, initialNodeIndex',
        initialNodeIndex
    )

    // while we have the context, we can also calculate the absolute start and end offsets
    let absoluteStartOffset = 0
    let absoluteEndOffset = 0
    for (let nodeCounter = 0; nodeCounter < textNodes.length; nodeCounter++) {
        const node = textNodes[nodeCounter]
        const nodeLength = node.nodeValue.length

        if (nodeCounter < initialNodeIndex) {
            absoluteStartOffset += nodeLength
        }

        if (nodeCounter === initialNodeIndex) {
            absoluteStartOffset += startOffset
            break
        }
    }
    absoluteEndOffset = absoluteStartOffset + (endOffset - startOffset)
    console.log(
        'in: parseDbClickSelectionGetTextNodeList, start',
        startOffset,
        absoluteStartOffset
    )
    console.log(
        'in: parseDbClickSelectionGetTextNodeList, end',
        endOffset,
        absoluteEndOffset
    )

    return { inlineText, textNodes, absoluteStartOffset, absoluteEndOffset }
}

function getSerializedTextNodeList(textNodes) {
    let currentOffset = 0
    return textNodes.map((node) => {
        const nodeLength = node.nodeValue.length
        currentOffset += nodeLength
        return [currentOffset - nodeLength, currentOffset]
    })
}

document.addEventListener('dblclick', function (event) {
    const selection = window.getSelection()
    const { inlineText, textNodes, absoluteStartOffset, absoluteEndOffset } =
        parseDbClickSelectionGetSerializedTextNodeList(selection)
    textNodesCache = textNodes

    // we need to serialize the text nodes because chrome.runtime.sendMessage does not support sending objects with functions
    const serializedTextNodes = getSerializedTextNodeList(textNodes)
    console.log('in: dblclick, serializedTextNodes', serializedTextNodes)

    // Send data to the background script
    chrome.runtime.sendMessage({
        action: 'processTextSelection',
        inlineText: inlineText,
        serializedTextNodes: serializedTextNodes,
        absoluteStartOffset: absoluteStartOffset,
        absoluteEndOffset: absoluteEndOffset,
    })
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'highlightText') {
        const {
            firstMatchingTextNodeIndex,
            lastMatchingTextNodeIndex,
            matchStart,
            matchEnd,
        } = request
        let selection = window.getSelection()
        selection.removeAllRanges()

        if (!textNodesCache) {
            textNodesCache =
                parseDbClickSelectionGetSerializedTextNodeList(
                    selection
                ).textNodes
        }

        // set up the Range object properly
        const range = document.createRange()
        range.setStart(textNodesCache[firstMatchingTextNodeIndex], matchStart)
        range.setEnd(textNodesCache[lastMatchingTextNodeIndex], matchEnd)
        selection.addRange(range)

        // Copy the selected text to the clipboard
        const selectedText = selection.toString()
        navigator.clipboard.writeText(selectedText)

        // Show a toast message on the bottom left
        const toast = document.createElement('div')
        toast.className = 'smart-select-extension-toast-message'
        toast.textContent = 'Selected text copied!'
        document.body.appendChild(toast)
        requestAnimationFrame(() => {
            toast.classList.add('show')
        })
        setTimeout(() => {
            toast.remove()
        }, 2000)
    }
})
