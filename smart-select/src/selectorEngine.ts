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

    // let matchedStart: number | null = null
    // let matchedEnd: number | null = null

    for (const matchType of MATCH_TYPES) {
        const regex = MATCH_TYPE_TO_REGEX[matchType]
        const matches = findMatches(regex, inlineText)
        console.log(matchType, 'matches', matches)
        for (const match of matches) {
            if (match[0] <= start && match[1] >= end) {
                // matchedStart = match[0]
                // matchedEnd = match[1]
                return {
                    matchedStart: matchType === FILE_PATHS ? start : match[0],
                    matchedEnd: match[1],
                    matchedPattern: matchType,
                }
            }
        }
    }
    return null

    //     if (matchedStart !== null && matchedEnd !== null) {
    //         // if we found a match
    //         if (matchType === FILE_PATHS) {
    //             matchedStart = start
    //         }
    //         return {
    //             matchedStart: matchedStart,
    //             matchedEnd: matchedEnd,
    //             name: matchType,
    //         }
    //     } else {
    //         continue
    //     }
    // }
    // return null
}

export default smartTextSelector
