export const HTTPS_LINKS = 'http/https links'
export const UUIDS = 'uuids'
export const UNIX_FILE_PATHS = 'unix file paths'
export const WINDOWS_FILE_PATHS = 'windows file paths'
export const EMAILS = 'emails'
export const MATCH_TYPES = [
    HTTPS_LINKS,
    UUIDS,
    EMAILS,
    UNIX_FILE_PATHS,
    WINDOWS_FILE_PATHS,
] as const
export const MATCH_TYPE_TO_REGEX = {
    [HTTPS_LINKS]:
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi,
    [UUIDS]: /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi,
    [EMAILS]: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    [UNIX_FILE_PATHS]: /\b(?:[a-zA-Z0-9._-]+\/)+[a-zA-Z0-9._-]+\b/g,
    [WINDOWS_FILE_PATHS]:
        /\b(?:[a-zA-Z]:\\)?(?:[a-zA-Z0-9._ -]+\\)+[a-zA-Z0-9._ -]+\b/g,
}

// this feature flag hides errors/bugs, so it should be on in prod but off in dev
export const SKIP_IF_NO_CHANGE_IN_SELECTION = false
