function isInlineElement(element) {
    const inlineElements = new Set([
        'A',
        'ABBR',
        'ACRONYM',
        'B',
        'BDI',
        'BDO',
        'BIG',
        'BR',
        'BUTTON',
        'CANVAS',
        'CITE',
        'CODE',
        'DATA',
        'DATALIST',
        'DEL',
        'DFN',
        'EM',
        'EMBED',
        'I',
        'IFRAME',
        'IMG',
        'INPUT',
        'INS',
        'KBD',
        'LABEL',
        'MAP',
        'MARK',
        'METER',
        'NOSCRIPT',
        'OBJECT',
        'OUTPUT',
        'PICTURE',
        'PROGRESS',
        'Q',
        'RUBY',
        'S',
        'SAMP',
        'SCRIPT',
        'SELECT',
        'SLOT',
        'SMALL',
        'SPAN',
        'STRONG',
        'SUB',
        'SUP',
        'SVG',
        'TEMPLATE',
        'TEXTAREA',
        'TIME',
        'U',
        'TT',
        'VAR',
        'VIDEO',
        'WBR',
    ])
    return inlineElements.has(element.nodeName)
}

function forceGetPreviousSibling(node) {
    return node.previousSibling || forceGetPreviousSibling(node.parentNode)
}

function forceGetNextSibling(node) {
    return node.nextSibling || forceGetNextSibling(node.parentNode)
}

export function getSurroundingInlineTextNodes(textNode) {
    let inlineText = ''
    let textNodes = []
    let node = textNode
    let initialNodeIndex = -1 // magical number to keep track of the index of the initial text node

    // Traverse backward
    while (node) {
        if (node.nodeType === Node.TEXT_NODE) {
            textNodes.unshift(node)
            initialNodeIndex++ // only need to increment index if a node is inserted at the beginning
            inlineText = node.nodeValue + inlineText
        } else if (
            node.nodeType === Node.ELEMENT_NODE &&
            isInlineElement(node)
        ) {
            node = node.lastChild
            continue
        } else {
            break
        }
        node = forceGetPreviousSibling(node)
    }

    node = forceGetNextSibling(textNode)

    // Traverse forward
    while (node) {
        if (node.nodeType === Node.TEXT_NODE) {
            // no need to update index if a node is inserted at the end
            textNodes.push(node)
            inlineText += node.nodeValue
        } else if (
            node.nodeType === Node.ELEMENT_NODE &&
            isInlineElement(node)
        ) {
            node = node.firstChild
            continue
        } else {
            break
        }
        node = forceGetNextSibling(node)
    }

    return { inlineText, textNodes, initialNodeIndex }
}
