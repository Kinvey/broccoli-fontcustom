module.exports = function (broccoli) {
  var fontCustom = require('broccoli-fontcustom')

  var fontIcons = broccoli.makeTree('test')
  fontIcons = fontCustom(fontIcons, {
    inputFiles: [
      'icons/*.svg'
    ],
    outputFile: 'fonts/Icons'
  })

  return [fontIcons]
}
