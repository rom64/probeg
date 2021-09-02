const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
//const htmlmin = require('gulp-htmlmin');
const fileinclude     = require('gulp-file-include');
const replace = require('gulp-replace');

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("app/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("app/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("app/*.html").on('change', gulp.parallel('html'));
    gulp.watch("app/js/**/*.js").on('change', gulp.parallel('scripts'));
    gulp.watch("app/fonts/**/*").on('all', gulp.parallel('fonts'));
    gulp.watch("app/img/**/*").on('all', gulp.parallel('images'));
});

/*gulp.task('htmlmin', function () {
    return gulp.src("app/!*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});*/

gulp.task('scripts', function () {
    return gulp.src("app/js/**/*.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src("app/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"))
        .pipe(browserSync.stream());
});


gulp.task('images', function () {
    return gulp.src("app/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"))
        .pipe(browserSync.stream());
});
gulp.task('html', function() {
    return gulp.src('app/*.+(html|php)')
        .pipe(fileinclude())
        .pipe(replace('../img/', 'img/'))
        .on('error', (error) => {
            console.log(error);
        })
        .pipe(browserSync.stream())
        .pipe(gulp.dest('dist/'))
});
gulp.task('libs', function() {
    return gulp.src('app/libs/**/*')
        .pipe(browserSync.stream())
        .pipe(gulp.dest('dist/libs/'))
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'images', 'html', 'libs'));