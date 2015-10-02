var spawn = require('cross-spawn');
var path = require('path');
var RSVP = require('rsvp');
var quickTemp = require('quick-temp');
var helpers = require('broccoli-kitchen-sink-helpers');

function pathIsAbsolute(filepath) {
  return filepath &&
  typeof filepath === 'string' &&
  path.normalize(filepath) === path.resolve(path.normalize(filepath));
}

function BuildFont(inputTree, options) {
  var self = this;
  this.inputTree = inputTree;
  this.options = options || {};
  this.options.output = this.options.output || '';
  this.cachedHash = null;

  if (pathIsAbsolute(this.inputTree)) {
    this.inputTree = path.relative(process.cwd(), this.inputTree);
  }
}

BuildFont.prototype.read = function(readTree) {
  var self = this;
  var hash = helpers.hashTree(self.inputTree);

  // Use cached
  if (hash === self.cachedHash && (self.tmpDestDir != null)) {
    return new RSVP.resolve(self.tmpDestDir)
  }

  // Update cache
  self.cachedHash = hash;
  quickTemp.makeOrRemake(self, 'tmpDestDir');

  return readTree(self.inputTree).then(function(dir) {
    return new RSVP.Promise(function(resolve, reject) {
      dir = path.resolve(dir);
      var output;

      if (pathIsAbsolute(self.options.output)) {
        output = self.options.output;
      } else {
        output = path.join(self.tmpDestDir, self.options.output || '');
      }

      //Replace \\ with / which ruby accepts in windows
      commands = ['compile', dir.replace(/\\/g, '/')];

      // Remove once https://github.com/FontCustom/fontcustom/pull/247 is fixed
      if (self.options.templates) {
        var templates = self.options.templates.map(function(templatePath) {
          return path.relative(dir, templatePath);
        });
        commands.push('--templates', templates.join(' '));
      }

      for (key in self.options) {
        if (key === 'templates') continue; // Remove once https://github.com/FontCustom/fontcustom/pull/247 is fixed
        option = self.options[key];
        commands.push('--' + key);
        if (option != null) {
          if (option instanceof Array) {
            commands.push(option.join(' '));
          } else {
            commands.push(key === 'output' ? output : option);
          }
        }
      }

      var fontcustom = spawn('fontcustom', commands);

      fontcustom.stdout.on('data', function(data) {
        if (self.options.debug || data.toString().indexOf('error') > -1) {
          process.stdout.write(data);
        }
      });
      fontcustom.stderr.on('data', function(data) {
        process.stderr.write(data);
      });
      fontcustom.on('close', function(code) {
        if (code === 0) {
          resolve(self.tmpDestDir);
        } else {
          throw new Error("fontcustom returned a status code of " + code);
        }
      });

    });
  });
};

BuildFont.prototype.cleanup = function() {
  return quickTemp.remove(this, 'tmpDestDir');
};

module.exports = function(inputTree, options) {
  return new BuildFont(inputTree, options)
};
