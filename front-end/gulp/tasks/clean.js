'use strict';

var config = require('../config');
var gulp   = require('gulp');
var clean  = require('gulp-clean');

gulp.task('clean', function () {
  return gulp.src(config.dist.root, {read: false})
      .pipe(clean());
});
