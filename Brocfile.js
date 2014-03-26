module.exports = function (broccoli) {
  var fontCustom = require('./index.js');
  var fontIcons = broccoli.makeTree('test/icons');
  fontIcons = fontCustom(fontIcons, {
    output: 'fonts',
    'font-name': 'Icons',
    'no-hash': null,
    debug: null,
    templates: ['css','preview']
  });
  return [fontIcons]
};
