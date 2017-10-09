var gulp = require('gulp'),
    minify = require('gulp-minify');

gulp.task('compress', function () {
    gulp.src('lib/*.js')
        .pipe(minify({
            ext: {
                src:'.debug.js',
                min:'.min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.min.js']
        }))
        .pipe(gulp.dest('dist'))
});
