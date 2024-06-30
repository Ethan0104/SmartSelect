export const HTTPS_LINKS = "http/https links"
export const UUIDS = "uuids"
export const FILE_PATHS = "file paths"
export const DOUBLE_QUOTE_STRINGS = "double quote strings"
export const SINGLE_QUOTE_STRINGS = "single quote strings"

export const SELECT_PATTERNS = [
    {
        "name": HTTPS_LINKS,
        "regex": /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi,
    },
    {
        "name": UUIDS,
        "regex": /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi,
    },
    {
        "name": FILE_PATHS,
        "regex": /(?:\/|(?:\.\.?)?\/?)(?:[^\/\s]+\/)*(?:[^\/\s]+)/g,
    },
    {
        "name": DOUBLE_QUOTE_STRINGS,
        "regex": /"(.*?)"/g,
    },
    {
        "name": SINGLE_QUOTE_STRINGS,
        "regex": /'(.*?)'/g,
    },
]

// this feature flag hides errors/bugs, so it should be on in prod but off in dev
export const SKIP_IF_NO_CHANGE_IN_SELECTION = false
