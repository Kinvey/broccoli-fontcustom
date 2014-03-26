helpers = require("broccoli-kitchen-sink-helpers")
spawn = require('child_process').spawn
path = require('path')
RSVP = require('rsvp')
quickTemp = require('quick-temp')

class BuildFont
  constructor: (inputTree, options)->
    @inputTree = inputTree
    @options = options

  read: (readTree)->
    quickTemp.makeOrRemake(this, 'tmpDestDir')

    readTree(@inputTree)
    .then (dir)=>
      return new RSVP.Promise (resolve, reject)=>
        dir = path.resolve(dir)

        if @options.output
          @options.output = path.join(@tmpDestDir, @options.output)
        else
          @options.output = @tmpDestDir

        output = ""

        commands = ['compile', dir]
        for key, option of @options
          commands.push('--'+key)
          if option?
            commands.push(option)

        fontcustom = spawn 'fontcustom', commands

        fontcustom.stdout.on 'data', (data)->
          output += "#{data}\n"

        fontcustom.stderr.on 'data', (data)->
          reject ""+data

        fontcustom.on 'close', (code)=>
          if code == 0
            resolve @tmpDestDir
          else
            console.log output
            reject "fontcustom returned a status code of #{code}"

  cleanup: ->
    quickTemp.remove(this, 'tmpDestDir')

module.exports = (args...)->
  new BuildFont args...
