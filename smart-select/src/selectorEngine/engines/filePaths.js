import { SelectorEngineBase } from './common.js'
import { FILE_PATHS } from '../constants.js'

export class FilePathSelectorEngine extends SelectorEngineBase {
    constructor(inlineText, start, end) {
        super(inlineText, start, end)

        this.name = FILE_PATHS
        // this.regex = /(?:\/|(?:\.\.?)?\/?)(?:[^\/\s]+\/)*(?:[^\/\s]+)/g
        this.regex = new RegExp('^(/[^/ ]*)+/?$')
    }
}