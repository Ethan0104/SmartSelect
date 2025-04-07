import {
    MATCH_TYPE_TO_REGEX,
    MATCH_TYPES,
    UNIX_FILE_PATHS,
    UUIDS,
    WINDOWS_FILE_PATHS,
    EMAILS,
    HTTPS_LINKS,
} from './constants'
import { MatchTypes } from './types'
import findMatches from './utils'

const smartTextSelector = (inlineText: string, start: number, end: number) => {
    let matchTypes: MatchTypes[] = []

    const getMatchTypes = async (): Promise<MatchTypes[]> => {
        return new Promise((resolve) => {
            chrome.storage.sync.get(
                [
                    'enableEmails',
                    'enableLinks',
                    'enableFilePaths',
                    'enableUuids',
                ],
                (result) => {
                    if (result.enableEmails) {
                        matchTypes.push(EMAILS)
                    }
                    if (result.enableLinks) {
                        matchTypes.push(HTTPS_LINKS)
                    }
                    if (result.enableFilePaths) {
                        matchTypes.push(UNIX_FILE_PATHS, WINDOWS_FILE_PATHS)
                    }
                    if (result.enableUuids) {
                        matchTypes.push(UUIDS)
                    }
                    resolve(matchTypes)
                }
            )
        })
    }

    const processMatches = async () => {
        const matchTypes = await getMatchTypes()
        for (const matchType of matchTypes) {
            const regex = MATCH_TYPE_TO_REGEX[matchType]
            const matches = findMatches(regex, inlineText)
            for (const match of matches) {
                if (match[0] <= start && match[1] >= end) {
                    return {
                        matchedStart:
                            matchType === UNIX_FILE_PATHS ||
                            matchType === WINDOWS_FILE_PATHS
                                ? start
                                : match[0],
                        matchedEnd: match[1],
                        matchedPattern: matchType,
                    }
                }
            }
        }
        return null
    }

    return processMatches()
}

export default smartTextSelector
