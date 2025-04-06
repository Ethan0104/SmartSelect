'use strict'

import smartTextSelector from './selectorEngine'
import { SKIP_IF_NO_CHANGE_IN_SELECTION } from './constants'

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'processTextSelection') {
        // find the pattern to be selected in the whole text first (treat the text as one chunk)
        const inlineText = request.inlineText as string
        const serializedTextNodes = request.serializedTextNodes as number[][]
        const absoluteStartOffset = request.absoluteStartOffset as number
        const absoluteEndOffset = request.absoluteEndOffset as number
        const smartTextSelectorResult = smartTextSelector(
            inlineText,
            absoluteStartOffset,
            absoluteEndOffset
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
            matchedStart == absoluteStartOffset &&
            matchedEnd == absoluteEndOffset
        ) {
            return
        }

        // Find the text nodes that contain the selection
        // but first we need to find the very first and last text node that contains the selection and record them
        let firstMatchingTextNodeIndex = 0
        let lastMatchingTextNodeIndex = 0
        for (let i = 0; i < serializedTextNodes.length; i++) {
            const [nodeStart, nodeEnd] = serializedTextNodes[i]
            if (matchedStart >= nodeStart && matchedStart < nodeEnd) {
                firstMatchingTextNodeIndex = i
            }
            if (matchedEnd > nodeStart && matchedEnd <= nodeEnd) {
                lastMatchingTextNodeIndex = i
                break
            }
        }
        // then we offset the match start ends using the very first text node that contains the selection
        matchedStart -= serializedTextNodes[firstMatchingTextNodeIndex][0]
        matchedEnd -= serializedTextNodes[lastMatchingTextNodeIndex][0]

        // Send the result back to content.js
        if (!sender.tab?.id) {
            console.error('sender.tab.id is null', sender)
            return
        }
        chrome.tabs.sendMessage(sender.tab.id, {
            action: 'highlightText',
            firstMatchingTextNodeIndex: firstMatchingTextNodeIndex,
            lastMatchingTextNodeIndex,
            matchedStart,
            matchedEnd,
            matchedPattern,
        })
    }
})
