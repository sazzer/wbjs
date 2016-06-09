var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')({
    DEBUG: true
  }),
  remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul'),
  exec = require('child_process').exec,
  convict = require('convict'),
  schema = require('./config/schema.json');

function buildLint(target) {
  return function() {
    return gulp.src(['src/' + target + '/**/*.js'])
      .pipe(plugins.eslint())
      .pipe(plugins.eslint.format())
      .pipe(plugins.eslint.failAfterError());
  };
}

function buildJscpd(target) {
  return function() {
    return gulp.src(['src/' + target + '/**/*.js'])
      .pipe(plugins.jscpd());
  }
}

function buildBabel(target) {
  return function() {
    return gulp.src(['src/' + target + '/**/*.js'])
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.babel({
        plugins: ['rewire', 'typecheck', 'syntax-flow', 'transform-flow-strip-types'],
        presets: ['es2015']
      }))
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest('target/' + target));
  }
}

function loadConfig(name) {
  var conf = convict(schema);

  var env = conf.get('env');
  conf.loadFile(`./config/${env}.json`);
  conf.validate({strict: true});

  return conf.get(name);
}

function migrate(dir, cb) {
  plugins.env({
    vars: {
      DATABASE_URL: loadConfig('database')
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
  plugins.env({
    vars: {
      NODE_ENV: 'development'
    }
  });

  return gulp.src(['target/server/**/*.js'])
    .pipe(plugins.istanbul({
      includeUntested: true,
    }))
    .pipe(plugins.istanbul.hookRequire());
});

gulp.task('unit-test', ['pre-unit-test'], function() {
  return gulp.src(['target/server/**/*.spec.js'])
    .pipe(plugins.mocha({
      ui: 'bdd',
      reporter: 'spec',
      require: ['./target/server/test-helper']
    }))
    .pipe(plugins.istanbul.writeReports({
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

gulp.task('pre-integration-test', ['build', 'build-integration'], function(cb) {
  plugins.env({
    vars: {
      NODE_ENV: 'integration'
    }
  });

  migrate('up', cb);
});

gulp.task('integration-test', ['pre-integration-test'], function() {
  return gulp.src(['target/integration/**/*.spec.js'])
    .pipe(plugins.mocha({
      ui: 'bdd',
      reporter: 'spec',
      require: ['./target/integration/test-helper']
    }));
});

gulp.task('run', ['test'], function() {
  plugins.nodemon({
    script: 'target/server/main.js',
    tasks: ['test'],
    watch: 'src'
  });
});

gulp.task('build', ['lint:server', 'jscpd:server', 'babel:server']);
gulp.task('build-integration', ['lint:integration', 'babel:integration']);
gulp.task('test', ['post-unit-test']);

gulp.task('default', ['test']);
