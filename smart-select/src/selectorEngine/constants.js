export const SELECT_PATTERNS = [
    // standard http/https links
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi,
    // uuids
    /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi,
    // file paths
    /(?:\/|(?:\.\.?)?\/?)(?:[^\/\s]+\/)*(?:[^\/\s]+)/g,
]

// this feature flag hides errors/bugs, so it should be on in prod but off in dev
export const SKIP_IF_NO_CHANGE_IN_SELECTION = false
