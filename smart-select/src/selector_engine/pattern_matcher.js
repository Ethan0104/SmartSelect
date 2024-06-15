import { SELECT_PATTERNS } from './constants.js'
import findMatches from './utils.js'

function smartTextSelector(text, initialSelectionStart, initialSelectionEnd) {
    let start = initialSelectionStart
    let end = initialSelectionEnd
    console.log("initial start end", initialSelectionStart, initialSelectionEnd)
    for (const pattern of SELECT_PATTERNS) {
        findMatches(pattern, text).forEach(match => {
            console.log(match)
            if (
                match[0] <= initialSelectionStart &&
                match[1] >= initialSelectionEnd
            ) {
                start = match[0]
                end = match[1]
            }
        })
    }
    console.log("new", start, end)
    return { start, end }
}

export { smartTextSelector }