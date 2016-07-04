'use strict'

const _ = require('lodash')
const config = require('../config')
const rollParse = require('../grammar/rollparse.js')

const msgDefaults = {
  response_type: 'in_channel',
  username: 'Mortybot',
  icon_emoji: config('ICON_EMOJI')
}

const handler = (payload, res) => {
  var rollString = payload.text.slice(5) // FIX: assumes cmd length
  var mortyReply = "Morty's the man. "
  var totalString = "Totals: "
  var detailsString = "Details: "
  var parseResult = []

  console.log('rollString: ', rollString)

  try {
    parseResult = rollParse.parse(rollString)
  } catch (err) {
    console.log('PEG parse error: ', err.message)
    mortyReply = mortyReply.concat("Definitely fucked. Error is: ",
                                   err.message, "\n")
    let msg = _.defaults({
      channel: payload.channel_name,
      text: mortyReply
    }, msgDefaults)

    res.set('content-type', 'application/json')
    res.status(200).json(msg)
    return
  }

  /* iterate through parseResult, do rolls, store result per die and total
     results per rollGroup. Output Morty's reply like this:

     rollString input: 8d4+3+4d4+26,4d6+2

     "Totals: 8d4+3+4d4+26: 37, 4d6+2: 9"
     "Details: 8d4: <rolls>, 4d4: <rolls>, 4d6: <rolls>"
  */

  for (var i = 0; i < parseResult.length; i++) {
    var groupTotal = 0
    if (i > 0) totalString += ", "

    for (var j = 0; j < parseResult[i].length; j++) {
      parseResult[i][j].rollResults = []
      parseResult[i][j].rollTotal = 0

      for (var k = 0; k < parseResult[i][j].numDice; k++) {
        parseResult[i][j].rollResults.push(Math.floor(Math.random() *
                                           parseResult[i][j].dieType) + 1)
        parseResult[i][j].rollTotal += parseResult[i][j].rollResults[k]
      }

      if (typeof parseResult[i][j].modFunc !== undefined) {
        parseResult[i][j].modFunc(parseResult[i][j].rollTotal,
                                  parseResult[i][j].modVal)
      }

      groupTotal += parseResult[i][j].rollTotal

      if (j > 0)  {
        detailsString += " "
        totalString += "+"
      }
      detailsString += parseResult[i][j].numDice + "d" +
                       parseResult[i][j].dieType + ": " +
                       "(" + parseResult[i][j].rollResults + ") "
      totalString += parseResult[i][j].rollString
    }
    totalString += ": *" + groupTotal + "*"
  }

  mortyReply += totalString + '\n' + detailsString + '\n'
  let msg = _.defaults({
    channel: payload.channel_name,
    text: mortyReply
  }, msgDefaults)

  // leave this as part of handler
  res.set('content-type', 'application/json')
  res.status(200).json(msg)
  return
}

module.exports = { pattern: /roll/ig, handler: handler }
