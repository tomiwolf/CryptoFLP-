let     gulp = require('gulp'),
        connect = require('gulp-connect'),
        notify = require("gulp-notify"),
        pug = require('gulp-pug'),
        sass = require('gulp-sass'),
        sourcemaps = require('gulp-sourcemaps'),
        autoprefixer = require('gulp-autoprefixer'),
        // uglify = require('gulp-uglify'),gulp
        zip = require('gulp-zip'),
        concat = require('gulp-concat'),
        imagemin = require('gulp-imagemin'),
        uglify = require('gulp-uglify-es').default;


sass.compiler = require('node-sass');


// task connect

gulp.task('connect', function() {
    connect.server({
        name: 'Dist App',
        root: 'dist',
        port: 8000,
        livereload: true
    });
});

// task html
gulp.task('pug', function () {
    return  gulp.src('stage/html/pug/*.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
        .pipe(notify("Task Pug Is Done"));
});

// task css

gulp.task('css', function () {
    return gulp.src(['stage/css/sass/**/*.scss', 'stage/css/**/*.css'])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify("Task Sass Is Done"))
        .pipe(connect.reload());
});

// Task Js

gulp.task('js', function () {

    return gulp.src('stage/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload())
});

// Task Compressed

gulp.task('compressed', function () {

    return gulp.src('dist/**/*.*')
        .pipe(zip('website.zip'))
        .pipe(gulp.dest('.'));
});

// task images

gulp.task('image', function () {

    return gulp.src('stage/image/*.*')
    .pipe(imagemin([
        imagemin.mozjpeg({quality: 75, progressive: true})
    ]))
    .pipe(gulp.dest('dist/image'))
    .pipe(notify("Task Image Is Done"));
});


// task watch

gulp.task('watch', function () {

    gulp.watch('stage/html/**/*.pug', gulp.series('pug'));
    gulp.watch('stage/css/**/*.scss', gulp.series('css'));
    gulp.watch('stage/js/*.js', gulp.series('js'));
    gulp.watch('stage/image/*.*', gulp.series('image'));
    gulp.watch('dist/**/*.*', gulp.series('compressed'));
});

// gulp default

gulp.task('default', gulp.parallel('watch','connect'));
