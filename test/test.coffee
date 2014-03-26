fs = require("fs")

describe "broccoli-fontcustom", ->
  it "should have generated a font", (done) ->
    fs.readFile "test/actual/fonts/Icons.woff", (err, data) ->
      done err