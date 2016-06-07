var gulp = require('gulp'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint'),
    jscpd = require('gulp-jscpd'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('lint:server', function() {
    return gulp.src(['src/server/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('jscpd:server', function() {
    return gulp.src(['src/server/**/*.js'])
        .pipe(jscpd());
});

gulp.task('babel:server', function() {
    return gulp.src(['src/server/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            plugins: ['rewire', 'typecheck', 'syntax-flow', 'transform-flow-strip-types'],
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('target/server'));
});

gulp.task('build', ['lint:server', 'jscpd:server', 'babel:server']);
gulp.task('test', ['build']);

gulp.task('default', ['test']);
