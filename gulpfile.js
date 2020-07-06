var gulp = require('gulp');
var cleanCss = require('gulp-clean-css');
var browserSync = require('browser-sync');
var rigger = require('gulp-rigger');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var rimraf = require('rimraf');

function html() {
  return gulp
    .src('src/*.html')
    .pipe(rigger())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}
function scss() {
  return gulp
    .src('src/scss/main.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}
function js() {
  return gulp
    .src('src/js/common.js')
    .pipe(rigger())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}
function img() {
  return gulp
    .src('src/img/**/*.*')
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.stream());
}
function fonts() {
  return gulp
    .src('src/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'))
    .pipe(browserSync.stream());
}
gulp.task(
  'watch',
  gulp.series(html, scss, js, gulp.parallel(img, fonts), (done) => {
    gulp.watch('src/**/*.html', gulp.series(html));
    gulp.watch('src/**/*.scss', gulp.series(scss));
    gulp.watch('src/**/*.js', gulp.series(js));
    gulp.watch('src/img/**/*.*', gulp.series(img));
    gulp.watch('src/fonts/**/*.*', gulp.series(fonts));
    done();
  })
);
gulp.task('browser-sync', (done) => {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
    notify: false,
  });
  done();
});
gulp.task('cleanup', function (done) {
  rimraf('./dist', done);
});
gulp.task('default', gulp.series('cleanup', 'watch', 'browser-sync'));
