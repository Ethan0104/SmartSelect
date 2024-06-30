import findMatches from '../utils.js'

export class SelectorEngineBase {
    constructor() {
        this.name = null
        this.regex = null
    }

    setUp(inlineText, start, end) {
        this.inlineText = inlineText
        this.start = start
        this.end = end
        this.matchedStart = null
        this.matchedEnd = null
    }

    getNewSelection() {
        const matches = findMatches(this.regex, this.inlineText)
        console.log(this.name, 'matches', matches)
        matches.forEach((match) => {
            if (
                match[0] <= this.start &&
                match[1] >= this.end
            ) {
                this.matchedStart = match[0]
                this.matchedEnd = match[1]
            }
        })

        if (this.matchedStart) { // if we found a match
            this.postProcessMatch()
            return {
                matchedStart: this.matchedStart,
                matchedEnd: this.matchedEnd,
                name: this.name,
            }
        } else {
            return null
        }
    }

    // abstract methods
    postProcessMatch() {}
}