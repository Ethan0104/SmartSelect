'use strict'

import { SKIP_IF_NO_CHANGE_IN_SELECTION } from './constants'
import { getSurroundingInlineTextNodes } from './domUtils'
import smartTextSelector from './selectorEngine'

const parseDbClickSelectionGetSerializedTextNodeList = (
    selection: Selection
) => {
    const textNode = selection.anchorNode
    if (!textNode) {
        console.error('.anchorNode is null', selection)
        return
    }

    // 2 cases here:
    // 1. the element is a text node (regular text inbetween <p> for example)
    // 2. something we can't handle (we already handled input and textarea in the upstream function)
    if (textNode.nodeType === Node.TEXT_NODE) {
        const startOffset = selection.anchorOffset
        const endOffset = selection.focusOffset
        console.log('startOffset', startOffset)
        console.log('endOffset', endOffset)

        const { inlineText, textNodes, initialNodeIndex } =
            getSurroundingInlineTextNodes(textNode)

        // while we have the context, we can also calculate the absolute start and end offsets
        let absoluteStartOffset = 0
        let absoluteEndOffset = 0
        for (
            let nodeCounter = 0;
            nodeCounter < textNodes.length;
            nodeCounter++
        ) {
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
    } else {
        console.error(
            `Unexpected node type: ${textNode.nodeType}, please reach out to support.`
        )
        return
    }
}

const getSerializedTextNodeList = (textNodes: Node[]) => {
    let currentOffset = 0
    return textNodes.map((node) => {
        const nodeLength = node.nodeValue?.length ?? 0
        currentOffset += nodeLength
        return [currentOffset - nodeLength, currentOffset]
    })
}

document.addEventListener('dblclick', async function (event) {
    // 2 cases here:
    // 1. the element is a text node (regular text inbetween <p> for example)
    // 2. the element is an input or textarea
    // Let's do an early return for the 2nd case, signaled by event.target being an input or textarea
    if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
    ) {
        console.log('early return for input or textarea')
        const element = event.target as HTMLInputElement | HTMLTextAreaElement
        const start = element.selectionStart
        const end = element.selectionEnd
        if (start === null || end === null) {
            console.error('start or end is null', start, end)
            return
        }
        const inlineText = element.value

        const smartTextSelectorResult = await smartTextSelector(
            inlineText,
            start,
            end
        )

        // if no pattern is found, return
        if (!smartTextSelectorResult) {
            return
        }

        let { matchedStart, matchedEnd, matchedPattern } =
            smartTextSelectorResult

        // check if the selection is the same as the previous selection
        if (
            SKIP_IF_NO_CHANGE_IN_SELECTION &&
            matchedStart == start &&
            matchedEnd == end
        ) {
            return
        }

        // set the selection
        element.setSelectionRange(matchedStart, matchedEnd)
        return
    }

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
    }
})
