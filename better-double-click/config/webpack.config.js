'use strict'

const { merge } = require('webpack-merge')

const common = require('./webpack.common.js')
const PATHS = require('./paths')

// Merge webpack configuration files
const config = (env, argv) =>
    merge(common, {
        entry: {
            popup: PATHS.src + '/popup.ts',
            contentScript: PATHS.src + '/contentScript.ts',
            styles: PATHS.src + '/styles.css',
        },
        devtool: argv.mode === 'production' ? false : 'source-map',
    })

module.exports = config
