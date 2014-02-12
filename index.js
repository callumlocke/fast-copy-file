/*
 * fast-copy-file
 * https://github.com/callumlocke/fast-copy-file
 */

'use strict';

var fs = require('graceful-fs');

module.exports = function copyFile(source, target, cb) {
  var cbCalled = false;
  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }

  var rd = fs.createReadStream(source);
  rd.on('error', function (err) {
    done(err);
  });

  var wr = fs.createWriteStream(target);

  wr.on('error', function (err) {
    done(err);
  });

  wr.on('close', function () {
    done();
  });

  rd.pipe(wr);
};
