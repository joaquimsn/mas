'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', ['clean'], function (cb) {
  global.isProd = true;
  runSequence(['styles', 'fonts', 'images', 'browserify'], 'gzip', cb);
  return;
});