import {
    HTTPS_LINKS,
    UUIDS,
    UNIX_FILE_PATHS,
    WINDOWS_FILE_PATHS,
    EMAILS,
} from './constants'

export type MatchTypes =
    | typeof HTTPS_LINKS
    | typeof UUIDS
    | typeof UNIX_FILE_PATHS
    | typeof WINDOWS_FILE_PATHS
    | typeof EMAILS
