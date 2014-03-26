# Broccoli Font Custom

Generate custom icon webfonts using Font Custom and Broccoli

## Installation

1. Install Font Custom on your system
  * On a mac:
    1. `brew install fontforge ttfautohint`
    1. `gem install fontcustom`
  * On Linux:
    1. `sudo apt-get install fontforge ttfautohint`
    1. `wget http://people.mozilla.com/~jkew/woff/woff-code-latest.zip`
    1. `unzip woff-code-latest.zip -d sfnt2woff && cd sfnt2woff && make && sudo mv sfnt2woff /usr/local/bin/`
    1. `gem install fontcustom`

2. Add broccoli-fontcustom to your project
  * `npm install broccoli-fontcustom`

3. Add broccoloi-fontcustom to your Brocfile.js
  * `var fontCustom = require('broccoli-fontcustom');`

4. Configure broccoli-fontcustom with the second configuration being any command line arguments to fontcustom (minus the `--` before them) if there is no parameter to the argument specify null
  * ```
// 'test/icons' is relative to your current working directory
var fontIcons = broccoli.makeTree('test/icons');
fontIcons = fontCustom(fontIcons, {
  // Output is relative to the resulting broccoli file.
  output: 'fonts',
  // Name the font file
  'font-name': 'Icons',
  // Disable the md5 hash being added to the end of the filenames
  'no-hash': null
  // Whatever templates you would like to use, by default it will generate `preview` and `css` templates
  templates: ['css','preview']
  // The prefix for each glyph's CSS class. Default: icon-
  'css-prefix': 'icon'
  // Display debug information
  debug: null
});
```