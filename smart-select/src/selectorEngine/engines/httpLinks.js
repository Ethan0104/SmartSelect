import { SelectorEngineBase } from './common.js'
import { HTTPS_LINKS } from '../constants.js'

export class HttpLinkSelectorEngine extends SelectorEngineBase {
    constructor(inlineText, start, end) {
        super(inlineText, start, end)

        this.name = HTTPS_LINKS
        this.regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi
    }
}