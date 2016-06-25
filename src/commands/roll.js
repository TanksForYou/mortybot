'use strict'

const _ = require('lodash')
const config = require('../config')

const msgDefaults = {
  response_type: 'in_channel',
  username: 'Mortybot',
  icon_emoji: config('ICON_EMOJI')
}

function rollDie(max) {
  return Math.floor(Math.random() * max) + 1;
}

const handler = (payload, res) => {
  var rollString = payload.text.split(' ')[1]
  var rollReq = rollString.split('d')
  var numDice = parseInt(rollReq[0] || 1, 10)
  var dieType = parseInt(rollReq[1], 10)
  var mortyReply = "Morty is the man."
  var rollResult = 0

  if (isNaN(numDice)) {
    console.log('Invalid number of dice: ', numDice)
    mortyReply = mortyReply.concat(" ", "Morty needs a number of dice to roll.")
  } else if ([4,6,8,10,12,20,100].indexOf(dieType) < 0) {
    console.log('Invalid die type: ', dieType)
    mortyReply = mortyReply.concat(" ", "Morty doesn't have that kind of die.")
  } else {
    console.log('rolling: ', payload.text)

    for (var i = 0; i < numDice; i++) {
        rollResult += Math.floor(Math.random() * dieType) + 1
    }
    console.log('result: ', rollResult)
    mortyReply = mortyReply.concat(" It's ", rollResult, ".")
  }

  let msg = _.defaults({
    channel: payload.channel_name,
    text: mortyReply
  }, msgDefaults)

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}

module.exports = { pattern: /roll/ig, handler: handler }
