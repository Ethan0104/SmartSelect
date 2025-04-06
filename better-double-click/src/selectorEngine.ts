import { MATCH_TYPE_TO_REGEX, MATCH_TYPES, FILE_PATHS } from './constants'
import { MatchTypes } from './types'
import findMatches from './utils'

const smartTextSelector = (inlineText: string, start: number, end: number) => {
    console.log('in: smartTextSelector inlineText', inlineText)
    console.log(
        'in: smartTextSelector offset',
        start,
        end,
        inlineText.slice(start, end)
    )

    for (const matchType of MATCH_TYPES) {
        const regex = MATCH_TYPE_TO_REGEX[matchType]
        const matches = findMatches(regex, inlineText)
        console.log(matchType, 'matches', matches)
        for (const match of matches) {
            if (match[0] <= start && match[1] >= end) {
                return {
                    matchedStart: matchType === FILE_PATHS ? start : match[0],
                    matchedEnd: match[1],
                    matchedPattern: matchType,
                }
            }
        }
    }
    return null
}

export default smartTextSelector
