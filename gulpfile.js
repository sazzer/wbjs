var gulp = require('gulp'),
  babel = require('gulp-babel'),
  config = require('config'),
  env = require('gulp-env'),
  eslint = require('gulp-eslint'),
  exec = require('child_process').exec,
  istanbul = require('gulp-istanbul'),
  jscpd = require('gulp-jscpd'),
  mocha = require('gulp-mocha'),
  remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul'),
  sourcemaps = require('gulp-sourcemaps');

function buildLint(target) {
  return function() {
    return gulp.src(['src/' + target + '/**/*.js'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  };
}

function buildJscpd(target) {
  return function() {
    return gulp.src(['src/' + target + '/**/*.js'])
      .pipe(jscpd());
  }
}

function buildBabel(target) {
  return function() {
    return gulp.src(['src/' + target + '/**/*.js'])
      .pipe(sourcemaps.init())
      .pipe(babel({
        plugins: ['rewire', 'typecheck', 'syntax-flow', 'transform-flow-strip-types'],
        presets: ['es2015']
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('target/' + target));
  }
}

function migrate(dir, cb) {
  env({
    vars: {
      DATABASE_URL: config.get('Database.url')
    }
  });

  exec('./node_modules/.bin/db-migrate --migrations-dir=./src/migrations --verbose ' + dir, function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}

['server', 'integration'].forEach(function(target) {
  gulp.task('lint:' + target, buildLint(target));
  gulp.task('jscpd:' + target, buildJscpd(target));
  gulp.task('babel:' + target, buildBabel(target));
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
      text: undefined
    }
   }));
});

gulp.task('migrate:up', function(cb) {
  migrate('up', cb);
});

gulp.task('migrate:down', function(cb) {
  migrate('down', cb);
});

gulp.task('pre-integration-test', function(cb) {
  env({
    vars: {
      NODE_ENV: 'integration'
    }
  });

  migrate('up', cb);
});

gulp.task('build', ['lint:server', 'jscpd:server', 'babel:server']);
gulp.task('build_integration', ['lint:integration', 'jscpd:integration', 'babel:integration']);
gulp.task('test', ['post-unit-test']);

gulp.task('default', ['test']);
