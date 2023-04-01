const gulp = require('gulp');
const { src, series, parallel, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function copyHtml() {
  return src('src/*.html').pipe(gulp.dest('dist'));
}

function copyFonts() {
  return src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
}

function buildStyles() {
    return gulp.src('./src/scss/**/*.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
  };

exports.copyHtml = copyHtml;
exports.buildStyles = buildStyles;
exports.default = series(
  parallel(copyHtml, buildStyles, copyFonts)
);

exports.dev = function() {
  watch('src/scss/**/*.scss', buildStyles);
  watch('src/*.html', copyHtml);
  watch('src/fonts/**/*', copyFonts);
};