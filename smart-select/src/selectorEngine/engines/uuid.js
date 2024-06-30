import { SelectorEngineBase } from './common.js'
import { UUIDS } from '../constants.js'

export class UUIDSelectorEngine extends SelectorEngineBase {
    constructor(inlineText, start, end) {
        super(inlineText, start, end)

        this.name = UUIDS
        this.regex = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi
    }
}