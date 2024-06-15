'use strict'

document.addEventListener('dblclick', function (event) {
    // TODO: does not support cross-element selection
    let selection = window.getSelection()
    let range = selection.getRangeAt(0) // 0 is safe since the native behavior for double click is a single word
    let element = range.startContainer
    console.log('Element:', element)

    element = getNodeParentIfNotElementNode(element)

    // Get the text of the element
    let text = element.innerText || element.textContent
    console.log('Text:', text)

    // Send data to the background script
    chrome.runtime.sendMessage({
        action: 'processTextSelection',
        text: text,
        initialSelectionStart: range.startOffset,
        initialSelectionEnd: range.endOffset,
    })
})

function getNodeParentIfNotElementNode(node) {
    while (node.nodeType !== Node.ELEMENT_NODE) {
        node = node.parentNode
    }
    return node
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'highlightText') {
        let selection = window.getSelection()
        let element = selection.getRangeAt(0).startContainer
        element = getNodeParentIfNotElementNode(element)
        selection.removeAllRanges()

        let range = document.createRange()

        let textNode = element.firstChild
        range.setStart(textNode, request.start)
        range.setEnd(textNode, request.end)

        selection.addRange(range)
    }
})
