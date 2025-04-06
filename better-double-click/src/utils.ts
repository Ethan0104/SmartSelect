export default function findMatches(regex: RegExp, str: string) {
    let matches: number[][] = []
    let match: RegExpExecArray | null = null
    while ((match = regex.exec(str)) !== null) {
        matches.push([match.index, match.index + match[0].length])
        // This is to avoid infinite loops with zero-width matches
        if (regex.lastIndex === match.index) {
            regex.lastIndex++
        }
    }
    return matches
}
