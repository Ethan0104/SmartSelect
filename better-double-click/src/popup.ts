'use strict'
;(function () {
    // Settings storage interface with type safety
    interface Settings {
        enableEmails: boolean
        enableLinks: boolean
        enableFilePaths: boolean
        enableUuids: boolean
    }

    // Default settings
    const defaultSettings: Settings = {
        enableEmails: true,
        enableLinks: true,
        enableFilePaths: true,
        enableUuids: true,
    }

    // Storage API wrapper for our settings
    const settingsStorage = {
        // Get all settings from storage
        getAll: (callback: (settings: Settings) => void): void => {
            chrome.storage.sync.get(
                [
                    'enableEmails',
                    'enableLinks',
                    'enableFilePaths',
                    'enableUuids',
                ],
                (result) => {
                    // Merge with defaults for any missing values
                    const settings: Settings = {
                        enableEmails:
                            result.enableEmails === undefined
                                ? defaultSettings.enableEmails
                                : Boolean(result.enableEmails),
                        enableLinks:
                            result.enableLinks === undefined
                                ? defaultSettings.enableLinks
                                : Boolean(result.enableLinks),
                        enableFilePaths:
                            result.enableFilePaths === undefined
                                ? defaultSettings.enableFilePaths
                                : Boolean(result.enableFilePaths),
                        enableUuids:
                            result.enableUuids === undefined
                                ? defaultSettings.enableUuids
                                : Boolean(result.enableUuids),
                    }
                    callback(settings)
                }
            )
        },

        // Save a setting
        saveOne: <K extends keyof Settings>(
            key: K,
            value: Settings[K],
            callback?: () => void
        ): void => {
            const data: Partial<Record<keyof Settings, any>> = {}
            data[key] = value
            chrome.storage.sync.set(data, () => {
                if (callback) callback()
            })

            // Notify content scripts about the updated setting
            notifyContentScriptForSetting(key, value)
        },

        // Initialize settings with defaults if they don't exist yet
        initializeDefaults: (callback?: () => void): void => {
            chrome.storage.sync.get(
                [
                    'enableEmails',
                    'enableLinks',
                    'enableFilePaths',
                    'enableUuids',
                ],
                (result) => {
                    const updates: Partial<Settings> = {}
                    let needsUpdate = false

                    if (result.enableEmails === undefined) {
                        updates.enableEmails = defaultSettings.enableEmails
                        needsUpdate = true
                    }
                    if (result.enableLinks === undefined) {
                        updates.enableLinks = defaultSettings.enableLinks
                        needsUpdate = true
                    }
                    if (result.enableFilePaths === undefined) {
                        updates.enableFilePaths =
                            defaultSettings.enableFilePaths
                        needsUpdate = true
                    }
                    if (result.enableUuids === undefined) {
                        updates.enableUuids = defaultSettings.enableUuids
                        needsUpdate = true
                    }

                    if (needsUpdate) {
                        chrome.storage.sync.set(
                            updates,
                            callback ? callback : () => {}
                        )
                    } else if (callback) {
                        callback()
                    }
                }
            )
        },
    }

    // Get checkbox elements with proper type checking
    const emailsCheckbox = document.getElementById(
        'emailsCheckbox'
    ) as HTMLInputElement | null
    const linksCheckbox = document.getElementById(
        'linksCheckbox'
    ) as HTMLInputElement | null
    const filePathsCheckbox = document.getElementById(
        'filePathsCheckbox'
    ) as HTMLInputElement | null
    const uuidsCheckbox = document.getElementById(
        'uuidsCheckbox'
    ) as HTMLInputElement | null

    // Initialize UI with saved settings
    function initializeUI(): void {
        settingsStorage.initializeDefaults(() => {
            settingsStorage.getAll((settings) => {
                if (emailsCheckbox) {
                    emailsCheckbox.checked = settings.enableEmails
                }
                if (linksCheckbox) {
                    linksCheckbox.checked = settings.enableLinks
                }
                if (filePathsCheckbox) {
                    filePathsCheckbox.checked = settings.enableFilePaths
                }
                if (uuidsCheckbox) {
                    uuidsCheckbox.checked = settings.enableUuids
                }
            })
        })
    }

    // Notify all active tabs' content scripts about a specific updated setting
    function notifyContentScriptForSetting<K extends keyof Settings>(
        key: K,
        value: Settings[K]
    ): void {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            tabs.forEach((tab) => {
                if (tab.id) {
                    chrome.tabs.sendMessage(tab.id, {
                        type: 'SETTING_UPDATED',
                        payload: {
                            key,
                            value,
                        },
                    })
                }
            })
        })
    }

    // Add event listeners for checkboxes
    function setupEventListeners(): void {
        // Real-time saving when checkboxes change
        emailsCheckbox?.addEventListener('change', () => {
            if (emailsCheckbox) {
                settingsStorage.saveOne('enableEmails', emailsCheckbox.checked)
            }
        })

        linksCheckbox?.addEventListener('change', () => {
            if (linksCheckbox) {
                settingsStorage.saveOne('enableLinks', linksCheckbox.checked)
            }
        })

        filePathsCheckbox?.addEventListener('change', () => {
            if (filePathsCheckbox) {
                settingsStorage.saveOne(
                    'enableFilePaths',
                    filePathsCheckbox.checked
                )
            }
        })

        uuidsCheckbox?.addEventListener('change', () => {
            if (uuidsCheckbox) {
                settingsStorage.saveOne('enableUuids', uuidsCheckbox.checked)
            }
        })
    }

    // Initialize everything when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        initializeUI()
        setupEventListeners()
    })
})()
