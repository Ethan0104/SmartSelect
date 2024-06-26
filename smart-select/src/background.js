'use strict'

import { smartTextSelector } from './selectorEngine/patternMatcher.js'
import { SKIP_IF_NO_CHANGE_IN_SELECTION } from './selectorEngine/constants.js'

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'processTextSelection') {
        // find the pattern to be selected in the whole text first (treat the text as one chunk)
        const {
            inlineText,
            serializedTextNodes,
            absoluteStartOffset,
            absoluteEndOffset,
        } = request
        let { matchedStart, matchedEnd, matchedPattern } = smartTextSelector(
            inlineText,
            absoluteStartOffset,
            absoluteEndOffset
        )

        // if no pattern is found, return
        if (!matchedPattern) {
            return
        }

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
