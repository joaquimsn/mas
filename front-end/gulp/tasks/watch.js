'use strict';

var config        = require('../config');
var gulp          = require('gulp');

gulp.task('watch', ['browserSync', 'nodemon'], function () {
  gulp.watch(config.watch.scripts, ['lint']);
  gulp.watch(config.watch.styles,  ['styles']);
  gulp.watch(config.watch.images,  ['images']);
  gulp.watch(config.watch.views,  ['views']);
  gulp.watch(config.test.source,  ['test']);
});