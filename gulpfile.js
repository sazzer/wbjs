var gulp = require('gulp'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint'),
    istanbul = require('gulp-istanbul'),
    jscpd = require('gulp-jscpd'),
    mocha = require('gulp-mocha'),
    remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul'),
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

gulp.task('pre-unit-test', ['build'], function() {
    return gulp.src(['target/server/**/*.js'])
        .pipe(istanbul({
          includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('unit-test', ['pre-unit-test'], function() {
    return gulp.src(['target/server/**/*.spec.js'])
        .pipe(mocha({
            ui: 'bdd',
            reporter: 'spec',
            require: ['./target/server/test-helper']
        }))
        .pipe(istanbul.writeReports({
          dir: './target/coverage/server',
          reporters: ['lcovonly', 'json']
        }));
});

gulp.task('post-unit-test', ['unit-test'], function() {
    return gulp.src('./target/coverage/server/coverage-final.json')
      .pipe(remapIstanbul({
        reports: {
          json: 'target/coverage/server/coverage-final.json',
          html: 'target/coverage/server/report',
          'text': undefined
        }
      }));
});

gulp.task('build', ['lint:server', 'jscpd:server', 'babel:server']);
gulp.task('test', ['post-unit-test']);

gulp.task('default', ['test']);
