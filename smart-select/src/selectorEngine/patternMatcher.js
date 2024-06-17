import { SELECT_PATTERNS } from './constants.js'
import findMatches from './utils.js'

export function smartTextSelector(inlineText, startOffset, endOffset) {
    console.log('in: smartTextSelector inlineText', inlineText)
    console.log('in: smartTextSelector offset', startOffset, endOffset)
    // let start = initialSelectionStart
    // let end = initialSelectionEnd
    // console.log('initial start end', initialSelectionStart, initialSelectionEnd)
    // for (const pattern of SELECT_PATTERNS) {
    //     findMatches(pattern, text).forEach((match) => {
    //         console.log(text)
    //         console.log(text.length)
    //         console.log(match)
    //         if (
    //             match[0] <= initialSelectionStart &&
    //             match[1] >= initialSelectionEnd
    //         ) {
    //             start = match[0]
    //             end = match[1]
    //         }
    //     })
    // }
    // console.log('new', start, end)
    // return { start, end }
    const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g;

    let BreakException = {};
    try {
        const matches = findMatches(uuidRegex, inlineText)
        console.log('matches', matches)
        matches.forEach((match) => {
            if (
                match[0] <= startOffset &&
                match[1] >= endOffset
            ) {
                startOffset = match[0]
                endOffset = match[1]
                throw BreakException
            }
        })
    } catch (e) {
        if (e !== BreakException) throw e
    }
    

    // while ((match = uuidRegex.exec(inlineText)) !== null) {
    //     const matchIndex = match.index;
    //     const matchLength = match[0].length;
    //     const matchEndIndex = matchIndex + matchLength;

    //     if (startOffset >= matchIndex && endOffset <= matchEndIndex) {
    //         matchedUUID = match[0];
    //         matchStart = matchIndex;
    //         matchEnd = matchEndIndex;
    //         break;
    //     }
    // }
    return {
        matchStart: startOffset,
        matchEnd: endOffset
    }
}
