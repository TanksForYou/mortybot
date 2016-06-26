
'use strict'

const dotenv = require('dotenv')
const ENV = process.env.NODE_ENV || 'development'

if (ENV === 'development') dotenv.load()

const config = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  PROXY_URI: process.env.PROXY_URI,
  WEBHOOK_URL: process.env.WEBHOOK_URL,
  MORTYBOT_COMMAND_TOKEN: process.env.MORTYBOT_COMMAND_TOKEN,
  SLACK_TOKEN: process.env.SLACK_TOKEN,
  ICON_EMOJI: ':stars:'
}

console.log('In config, env value: ', process.env.MORTYBOT_COMMAND_TOKEN,
            ' config const: ', config('MORTYBOT_COMMAND_TOKEN'))

module.exports = (key) => {
  if (!key) return config

  return config[key]
}
