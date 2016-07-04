/*

8d4+3+4d4+26,4d6+2

The grammmar should return a simple array containing objects, each with two
fields, rolls and modifiers, which in turn contain strings for evaluation by
the rolling engine.

Groups of dice and modifiers are separated by commas. All dice rolls may have
one and only one modifier applied to them, either positive or negative.

A rollstring of 8d4+3+4d4+26,4d6+2 produces:

parsedResults =  [
                   [
                      {
                         "rollString": "8d4+3",
                         "numDice": "8",
                         "dieType": "4",
                         "modVal": "3",
                         "modFunc": function( a, b ){
                            [code]
                         },
                         "modString": "+"
                      },
                      {
                         "rollString": "4d4+26",
                         "numDice": "4",
                         "dieType": "4",
                         "modVal": "26",
                         "modFunc": function( a, b ){
                            [code]
                         },
                         "modString": "+"
                      }
                   ],
                   [
                      {
                         "rollString": "4d6+2",
                         "numDice": "4",
                         "dieType": "6",
                         "modVal": "2",
                         "modFunc": function( a, b ){
                            [code]
                         },
                         "modString": "+"
                      }
                   ]
                ]

*/

start
  = rgcommasep+

rgcommasep
  = [ ]* rollgroup:(troll:roll tmodifier:modifier? [+\-]? {
                       var result = { rollString: "" }
                       for (var key in troll) result[key]=troll[key]
                       result.rollString = result.numDice + "d" + result.dieType
                       if (tmodifier) {
                         for (var key in tmodifier) result[key]=tmodifier[key]
                    	   result.rollString += tmodifier.modString + tmodifier.modVal
                       }
                       return result
                     }
                   )+ ","?
    { return rollgroup }

roll
  = numdice:[0-9]+ "d" dietype:[0-9]+ {
 	    var rollObj = { numDice: 0,
    				          dieType: 0 }

      rollObj.numDice = numdice.join("")
      rollObj.dieType = dietype.join("")

      return rollObj
    }

modifier
  = modsign:[+\-] modval:[0-9]+ !"d" {
      var modObj = { modVal: 0,
    	               modFunc: 0,
                     modString: "" }

      modObj.modVal = modval.join("")
      modObj.modString = modsign
	    if (modsign == '+') modObj.modFunc = (a, b) => { return a + b }
      else if (modsign == '-') modObj.modFunc = (a, b) => { return a - b }
      else modObj.modFunc = undefined

	    return modObj
    }
