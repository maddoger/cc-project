var gulp = require('gulp');
var server = require('gulp-server-livereload');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');

gulp.task('webserver', function () {
    gulp.src('app')
        .pipe(server({
            livereload: true,
            open: true
        }));
});

gulp.task('styles', function () {
    gulp.src('src/styles/[^_]*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
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
        .pipe(csso())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/assets'))
});

gulp.task('watch-styles', function () {
    gulp.watch('src/styles/**/*.scss', ['styles']);
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

gulp.task('fonts', function(){
   gulp.src('src/fonts/**/*', { "base" : "./src/fonts" })
       .pipe(gulp.dest('app/assets/fonts'));
});

gulp.task('js', function () {
    gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/assets'))
});

gulp.task('watch-js', function () {
    gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('default', ['jade', 'styles', 'images', 'fonts', 'js', 'watch-jade', 'watch-styles', 'watch-js', 'webserver']);