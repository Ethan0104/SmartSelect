'use strict'

import { smartTextSelector } from './selector_engine/pattern_matcher.js'

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'processTextSelection') {
        // Call the core engine function (simulate with a dummy function here)
        let selection = smartTextSelector(
            request.text,
            request.initialSelectionStart,
            request.initialSelectionEnd
        )

        // Send the result back to content.js
        chrome.tabs.sendMessage(sender.tab.id, {
            action: 'highlightText',
            start: selection.start,
            end: selection.end,
        })
    }
})
