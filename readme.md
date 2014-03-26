# Broccoli Font Custom

Generate custom svg based webfonts using Font Custom and Broccoli

## Installation

Install Font Custom on your system
#### On a mac:
```
  brew install fontforge ttfautohint
  gem install fontcustom
```

#### On Linux:
```
sudo apt-get install fontforge ttfautohint
wget http://people.mozilla.com/~jkew/woff/woff-code-latest.zip
unzip woff-code-latest.zip -d sfnt2woff && cd sfnt2woff && make && sudo mv sfnt2woff /usr/local/bin/
gem install fontcustom
```

Add broccoli-fontcustom to your project
```
npm install broccoli-fontcustom
```

## Usage

Add broccoloi-fontcustom to your Brocfile.js
```javascript
var fontCustom = require('broccoli-fontcustom');
```

Configure broccoli-fontcustom with the second configuration being any command line arguments to fontcustom (minus the `--` before them) if there is no parameter to the argument specify null
```javascript
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