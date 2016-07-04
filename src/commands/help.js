
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
    title: 'Roll a set of dice of a single type and add a modifier.',
    color: '#2FA44F',
    text: '`/mortybot roll XdY+Z` rolls X dice of type Y and adds modifier Z. Only one modifier per set of die rolls.\n',
    mrkdwn_in: ['text']
  },
  {
    title: 'Roll a set of different dice types with modifiers.',
    color: '#2FA44F',
    text: '`/mortybot roll XdY+Z+AdB+C` rolls X dice of type Y and adds Z, then rolls A dice of type B and adds C, all results are added together. Add as many as you like.\n',
    mrkdwn_in: ['text']
  },
  {
    title: 'Roll groups of dice and total some of them separately.',
    color: '#2FA44F',
    text: '`/mortybot roll XdY+Z+AdB, QdR+S+TdU+V` rolls and adds dice and modifiers, but totals the groups separated by commas separately. Add as many groups as you like.\n',
    mrkdwn_in: ['text']
  },
  {
    title: 'Help me Mortybot, you\'re my only hope',
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
