
'use strict'

const _ = require('lodash')
const config = require('../config')

const msgDefaults = {
  response_type: 'in_channel',
  username: 'Starbot',
  icon_emoji: config('ICON_EMOJI')
}

let attachments = [
  {
    title: 'Morty will help you do stuff. He\'s the man.',
    color: '#2FA44F',
    text: '`/mortybot roll XdY` rolls X dice of type Y',
    mrkdwn_in: ['text']
  },
  {
    title: 'Configuring Mortybot',
    color: '#E3E4E6',
    text: '`/mortybot help` ... you\'re lookin at it! \n',
    mrkdwn_in: ['text']
  }
]

const handler = (payload, res) => {
  let msg = _.defaults({
    channel: payload.channel_name,
    attachments: attachments
  }, msgDefaults)

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}

module.exports = { pattern: /help/ig, handler: handler }
