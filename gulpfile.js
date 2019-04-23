var gulp = require('gulp');
var cleancss = require('gulp-clean-css');
var browsersync = require('browser-sync');
var rigger = require('gulp-rigger');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var rimraf = require('rimraf');
var sequence = require('gulp-sequence');

gulp.task('html', function() {
	return gulp.src('src/index.html')
			.pipe(rigger())
			.pipe(gulp.dest('dist'))
			.pipe(browsersync.reload({stream: true}))
})

gulp.task('css', function() {
	return gulp.src('src/css/main.css')
			.pipe(less())
			.pipe(autoprefixer())
			.pipe(cleancss())
			.pipe(gulp.dest('dist/css'))
			.pipe(browsersync.reload({stream: true}))
})

gulp.task('js', function() {
	return gulp.src('src/js/common.js')
			.pipe(rigger())
			.pipe(uglify())
			.pipe(gulp.dest('dist/js'))
			.pipe(browsersync.reload({stream: true}))
})

gulp.task('img', function() {
	return gulp.src('src/img/**/*.*')
			.pipe(gulp.dest('dist/img'))
			.pipe(browsersync.reload({stream: true}))
})

gulp.task('fonts', function() {
	return gulp.src('src/fonts/**/*.*')
			.pipe(gulp.dest('dist/fonts'))
			.pipe(browsersync.reload({stream: true}))
})

gulp.task('watch', function(cb) {
	sequence('html', 'css', 'js', ['img', 'fonts'], cb);
	gulp.watch('src/**/*.html', ['html']);
	gulp.watch('src/**/*.css', ['css']);
	gulp.watch('src/**/*.js', ['js']);
	gulp.watch('src/img/**/*.*', ['img']);
	gulp.watch('src/fonts/**/*.*', ['fonts']);
})

gulp.task('default', sequence('cleandist', 'watch', 'browser'));

gulp.task('browser', function() {
    browsersync.init({
        server: {
            baseDir: "dist"
        },
        notify: false
    });
});

gulp.task('cleandist', function(cb) {
	rimraf('./dist', cb);
})