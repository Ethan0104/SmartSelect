export default function findMatches(regex, str) {
    let matches = []
    let match
    while ((match = regex.exec(str)) !== null) {
        matches.push([match.index, match.index + match[0].length])
        // This is to avoid infinite loops with zero-width matches
        if (regex.lastIndex === match.index) {
            regex.lastIndex++
        }
    }
    return matches
}
