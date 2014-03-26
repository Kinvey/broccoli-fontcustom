fs = require("fs")
path = require("path")
helpers = require("broccoli-kitchen-sink-helpers")
Transform = require("broccoli-transform")

class BuildFont
  constructor: (inputTree, options)->
    unless options.outputFile
      throw 'outputFile option is required for broccoli-fontcustom'

    @inputTree = inputTree
    @outputFile = options.outputFile

  read: (readTree)->
    readTree(@inputTree)
    .then (dir)->
      console.log dir
      dir

  cleanup: ->

module.exports = (args...)->
  new BuildFont args...
