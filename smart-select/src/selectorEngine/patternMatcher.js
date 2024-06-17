import { SELECT_PATTERNS } from './constants.js'
import findMatches from './utils.js'

export function smartTextSelector(inlineText, startOffset, endOffset) {
    console.log('in: smartTextSelector inlineText', inlineText)
    console.log('in: smartTextSelector offset', startOffset, endOffset)
    let BreakException = {}
    let start = startOffset
    let end = endOffset

    try {
        for (const pattern of SELECT_PATTERNS) {
            const matches = findMatches(pattern, inlineText)
            matches.forEach((match) => {
                if (
                    match[0] <= initialSelectionStart &&
                    match[1] >= initialSelectionEnd
                ) {
                    start = match[0]
                    end = match[1]
                    throw BreakException
                }
            })
        }
    } catch (e) {
        if (e !== BreakException) throw e
    }

    return {
        matchStart: start,
        matchEnd: end,
    }
}
