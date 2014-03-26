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