var gulp = require('gulp');
var server = require('gulp-server-livereload');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

gulp.task('webserver', function () {
    gulp.src('app')
        .pipe(server({
            livereload: true,
            open: true
        }));
});

gulp.task('styles', function () {
    gulp.src('src/styles/[^_]*.scss')

        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass({
            //outputStyle: 'compressed',
            includePaths: [
                //paths.frontend.source,
                //paths.bower + 'susy/sass',
                //paths.bower + 'breakpoint-sass/stylesheets',
                //paths.bower
            ]
            //errLogToConsole: true
        }))
        .pipe(autoprefixer({
            browsers: ['last 10 versions', '> 1%'],
            cascade: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/assets'))
});

gulp.task('jade', function () {
    gulp.src('src/templates/**/*.jade')
        .pipe(plumber())
        .pipe(jade({}))
        .pipe(gulp.dest('app'));
});

gulp.task('watch-jade', function () {
    gulp.watch('src/templates/**/*.jade', ['jade']);
});

gulp.task('images', function(){
   gulp.src('src/images/**/*.*')
       .pipe(gulp.dest('app/assets'));
});

gulp.task('default', ['jade', 'styles', 'images', 'watch-jade', 'webserver']);