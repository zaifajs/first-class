var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	uglify = require('gulp-uglify-es').default,
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	fontmin = require('gulp-fontmin'),
	browserSync = require('browser-sync');


// Copy all HTML files
gulp.task('copyHtml', () =>
	gulp.src('src/*.html')
	.pipe(gulp.dest('public'))
);

// Optimize images
gulp.task('imageMin', () =>
	gulp.src('src/img/**/*')
	.pipe(imagemin())
	.pipe(gulp.dest('public/img'))
	.pipe(browserSync.reload({
		stream: true
	}))
);

// Optimize fonts
gulp.task('fontmin', () =>
	gulp.src('src/fonts/**')
	.pipe(fontmin())
	.pipe(gulp.dest('public/fonts'))

);

// Scripts (uglify + concat)
gulp.task('scripts', () =>
	gulp.src('src/js/**/*.js')
	/* .pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(uglify().on('error', function (e) {
		console.log(e);
	})) */
	.pipe(gulp.dest('public/js'))
	.pipe(browserSync.reload({
		stream: true
	}))
);

// Compile Sass
gulp.task('sass', () =>
	gulp.src('src/sass/main.scss')
	.pipe(sass().on('error', sass.logError))
	/* .pipe(sass({
		outputStyle: 'compressed'
	})) */
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(gulp.dest('public/css'))
	.pipe(browserSync.reload({
		stream: true
	}))
);

gulp.task('watch', ['copyHtml', 'imageMin', 'sass', 'scripts', 'fontmin']);


gulp.task('browserSync', function () {
	browserSync.init({
		server: {
			baseDir: 'public/'
		}
	});
});

gulp.task('public-dev', ['browserSync', 'watch'], function () {
	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('src/js/**/*.js', ['scripts']).on('change', browserSync.reload);
	gulp.watch('src/*.html', ['copyHtml']).on('change', browserSync.reload);
});