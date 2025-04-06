'use strict'

import { getSurroundingInlineTextNodes } from './domUtils'

const parseDbClickSelectionGetSerializedTextNodeList = (
    selection: Selection
) => {
    const textNode = selection.anchorNode
    if (!textNode) {
        console.error('.anchorNode is null', selection)
        return
    }
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

    // while we have the context, we can also calculate the absolute start and end offsets
    let absoluteStartOffset = 0
    let absoluteEndOffset = 0
    for (let nodeCounter = 0; nodeCounter < textNodes.length; nodeCounter++) {
        const node = textNodes[nodeCounter]
        const nodeLength = node.nodeValue?.length ?? 0

        if (nodeCounter < initialNodeIndex) {
            absoluteStartOffset += nodeLength
        }

        if (nodeCounter === initialNodeIndex) {
            absoluteStartOffset += startOffset
            break
        }
    }
    absoluteEndOffset = absoluteStartOffset + (endOffset - startOffset)

    return { inlineText, textNodes, absoluteStartOffset, absoluteEndOffset }
}

const getSerializedTextNodeList = (textNodes: Node[]) => {
    let currentOffset = 0
    return textNodes.map((node) => {
        const nodeLength = node.nodeValue?.length ?? 0
        currentOffset += nodeLength
        return [currentOffset - nodeLength, currentOffset]
    })
}

document.addEventListener('dblclick', function (event) {
    const selection = window.getSelection()
    if (!selection) {
        return
    }
    const result = parseDbClickSelectionGetSerializedTextNodeList(selection)
    if (!result) {
        return
    }
    const { inlineText, textNodes, absoluteStartOffset, absoluteEndOffset } =
        result

    // we need to serialize the text nodes because chrome.runtime.sendMessage does not support sending objects with functions
    const serializedTextNodes = getSerializedTextNodeList(textNodes)

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
            matchedStart,
            matchedEnd,
            matchedPattern,
        } = request
        console.log('matched ', matchedPattern)
        console.log('matchedStart ', matchedStart)
        console.log('matchedEnd ', matchedEnd)
        const selection = window.getSelection()
        if (!selection) {
            console.error('selection is null', selection)
            return
        }

        const textNodes =
            parseDbClickSelectionGetSerializedTextNodeList(selection)?.textNodes
        if (!textNodes) {
            console.error('textNodes is null', selection)
            return
        }

        // set up the Range object properly
        selection.removeAllRanges()
        const range = document.createRange()
        range.setStart(textNodes[firstMatchingTextNodeIndex], matchedStart)
        range.setEnd(textNodes[lastMatchingTextNodeIndex], matchedEnd)
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
