export const HTTPS_LINKS = 'http/https links'
export const UUIDS = 'uuids'
export const FILE_PATHS = 'file paths'

export const SELECT_PATTERNS = [
    {
        name: HTTPS_LINKS,
        regex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi,
    },
    {
        name: UUIDS,
        regex: /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi,
    },
    {
        name: FILE_PATHS,
        regex: /(?:\/|(?:\.\.?)?\/?)(?:[^\/\s]+\/)*(?:[^\/\s]+)/g,
    },
]

// this feature flag hides errors/bugs, so it should be on in prod but off in dev
export const SKIP_IF_NO_CHANGE_IN_SELECTION = false
