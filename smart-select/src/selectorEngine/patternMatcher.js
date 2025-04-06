import { FilePathSelectorEngine } from './engines/filePaths.js'
import { HttpLinkSelectorEngine } from './engines/httpLinks.js'
import { UUIDSelectorEngine } from './engines/uuid.js'

const ENGINES = [
    new UUIDSelectorEngine(),
    new HttpLinkSelectorEngine(),
    new FilePathSelectorEngine(),
    // TODO: P1!!!!! add file path with line and column number engine, like path/to/file.py:12:34
]

export function smartTextSelector(inlineText, start, end) {
    console.log('in: smartTextSelector inlineText', inlineText)
    console.log(
        'in: smartTextSelector offset',
        start,
        end,
        inlineText.slice(start, end)
    )
    let matchedPattern = null
    let matchedStart = null
    let matchedEnd = null

    for (const engine of ENGINES) {
        engine.setUp(inlineText, start, end)
        const newSelection = engine.getNewSelection()
        console.log(
            engine.name,
            'in: smartTextSelector newSelection',
            newSelection
        )
        if (newSelection) {
            matchedPattern = newSelection.name
            matchedStart = newSelection.matchedStart
            matchedEnd = newSelection.matchedEnd
            break
        }
    }
    console.log('in: smartTextSelector matchedPattern', matchedPattern)
    console.log('in: smartTextSelector matchedStart', matchedStart)
    console.log('in: smartTextSelector matchedEnd', matchedEnd)

    if (!matchedPattern) {
        console.log('no pattern found!!!')
        return {
            matchStart: null,
            matchEnd: null,
            matchedPattern: null,
        }
    }

    return {
        matchedStart,
        matchedEnd,
        matchedPattern: matchedPattern,
    }
}
