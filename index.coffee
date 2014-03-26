spawn = require('child_process').spawn
path = require('path')
RSVP = require('rsvp')
quickTemp = require('quick-temp')

class BuildFont
  constructor: (inputTree, options)->
    @inputTree = inputTree
    @options = options
    @options ?= {}
    @options.output ?= ''


  read: (readTree)->
    quickTemp.makeOrRemake(this, 'tmpDestDir')

    readTree(@inputTree)
    .then (dir)=>
      return new RSVP.Promise (resolve, reject)=>
        dir = path.resolve(dir)

        output =  @tmpDestDir
        if @options.output
          output = path.join(@tmpDestDir, @options.output)

        commands = ['compile', dir]
        for key, option of @options
          commands.push('--'+key)
          if option?
            if option instanceof Array
              for subCommand in option
                commands.push subCommand
            else
              if key == 'output'
                option = output
              commands.push(option)

        fontcustom = spawn 'fontcustom', commands

        fontcustom.stdout.on 'data', (data)=>
          if @options.debug == null
            console.log ""+data

        fontcustom.stderr.on 'data', (data)->
          reject ""+data

        fontcustom.on 'close', (code)=>
          if code == 0
            resolve @tmpDestDir
          else
            reject "fontcustom returned a status code of #{code}"

  cleanup: ->
    quickTemp.remove(this, 'tmpDestDir')

module.exports = (args...)->
  new BuildFont args...
