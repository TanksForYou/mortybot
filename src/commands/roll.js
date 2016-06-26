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
  var mortyReply = "Morty's the man."
  var rollResults = []
  var rollTotal = 0

  if (isNaN(numDice)) {
    console.log('Invalid number of dice: ', numDice)
    mortyReply = mortyReply.concat(" ", "Morty needs a number of dice to roll.")
  } else if ([4,6,8,10,12,20,100].indexOf(dieType) < 0) {
    console.log('Invalid die type: ', dieType)
    mortyReply = mortyReply.concat(" ", "Morty doesn't have that kind of die.")
  } else {
    console.log('Rolling: ', payload.text)

    for (var i = 0; i < numDice; i++) {
        rollResults.push(Math.floor(Math.random() * dieType) + 1)
        rollTotal += rollResults[rollResults.length-1]
    }
    console.log('Total: ', rollTotal, ' Rolls: ', rollResults)
    mortyReply = mortyReply.concat(" I rolled: ", rollTotal, " (", rollResults,")")
  }

  mortyReply = mortyReply + '\n'
  let msg = _.defaults({
    channel: payload.channel_name,
    text: mortyReply
  }, msgDefaults)

  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}

module.exports = { pattern: /roll/ig, handler: handler }
