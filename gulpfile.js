const gulp = require('gulp');
const { src, series, parallel, dest} = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function copyHtml() {
  return src('src/*.html').pipe(gulp.dest('dist'));
}

function buildStyles() {
    return gulp.src('./src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
  };

exports.copyHtml = copyHtml;
exports.buildStyles = buildStyles;
exports.default = series(
  parallel(copyHtml, buildStyles)
);
