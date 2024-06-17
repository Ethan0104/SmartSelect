'use strict'

import { smartTextSelector } from './selectorEngine/patternMatcher.js'
import { SKIP_IF_NO_CHANGE_IN_SELECTION } from './constants.js'

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'processTextSelection') {
        // find the pattern to be selected in the whole text first (treat the text as one chunk)
        const {
            inlineText,
            serializedTextNodes,
            absoluteStartOffset,
            absoluteEndOffset,
        } = request
        let { matchStart, matchEnd } = smartTextSelector(
            inlineText,
            absoluteStartOffset,
            absoluteEndOffset
        )

        // check if the selection is the same as the previous selection
        if (
            SKIP_IF_NO_CHANGE_IN_SELECTION &&
            matchStart == absoluteStartOffset &&
            matchEnd == absoluteEndOffset
        ) {
            return
        }

        // Find the text nodes that contain the selection
        // but first we need to find the very first and last text node that contains the selection and record them
        let firstMatchingTextNodeIndex = 0
        let lastMatchingTextNodeIndex = 0
        for (let i = 0; i < serializedTextNodes.length; i++) {
            const [nodeStart, nodeEnd] = serializedTextNodes[i]
            if (matchStart >= nodeStart && matchStart < nodeEnd) {
                firstMatchingTextNodeIndex = i
            }
            if (matchEnd > nodeStart && matchEnd <= nodeEnd) {
                lastMatchingTextNodeIndex = i
                break
            }
        }
        // then we offset the match start ends using the very first text node that contains the selection
        matchStart -= serializedTextNodes[firstMatchingTextNodeIndex][0]
        matchEnd -= serializedTextNodes[lastMatchingTextNodeIndex][0]

        // Send the result back to content.js
        chrome.tabs.sendMessage(sender.tab.id, {
            action: 'highlightText',
            firstMatchingTextNodeIndex: firstMatchingTextNodeIndex,
            lastMatchingTextNodeIndex: lastMatchingTextNodeIndex,
            matchStart: matchStart,
            matchEnd: matchEnd,
        })
    }
})
