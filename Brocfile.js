var fontCustom = require('./index.js');
var fontIcons = fontCustom('test/icons', {
  output: 'fonts',
  'font-name': 'Icons',
  'no-hash': null,
  debug: null,
  templates: ['css','preview']
});
module.exports = fontIcons;
