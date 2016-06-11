var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')({
    DEBUG: true
  }),
  remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul'),
  exec = require('child_process').exec,
  convict = require('convict'),
  schema = require('./config/schema.json');

/**
 * Build a task for linking a source area
 * @param {String} target the name of the source area
 * @return {Function} the task function
 */
function buildLint(target) {
  return function() {
    return gulp.src(['src/' + target + '/**/*.js'])
      .pipe(plugins.eslint())
      .pipe(plugins.eslint.format())
      .pipe(plugins.eslint.failAfterError());
  };
}

/**
 * Build a task for running JSCPD on a source area
 * @param {String} target the name of the source area
 * @return {Function} the task function
 */
function buildJscpd(target) {
  return function() {
    return gulp.src(['src/' + target + '/**/*.js'])
      .pipe(plugins.jscpd());
  }
}

/**
 * Build a task for running Babel on a source area
 * @param {String} target the name of the source area
 * @return {Function} the task function
 */
function buildBabel(target) {
  return function() {
    return gulp.src(['src/' + target + '/**/*.js'])
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.babel({
        plugins: ['rewire', ['transform-builtin-extend', {globals: ['Error']}]],
        presets: ['es2015']
      }))
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest('target/' + target));
  }
}

/**
 * Load a configuration parameter with the given name.
 * This reloads the configuration every time to account for changes caused by the tasks
 * @param {String} name The name of the config parameter
 * @return {String} The config parameter
 */
function loadConfig(name) {
  var conf = convict(schema);

  var env = conf.get('env');
  conf.loadFile(`./config/${env}.json`);
  conf.validate({strict: true});

  return conf.get(name);
}

/**
 * Perform a database migration
 * @param {String} dir The direction to migrate. Either 'up' or 'down'
 * @param {Function} cb The callback for after the migration is run
 */
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

// Set up the build tasks for the given target
['server', 'cucumber'].forEach(function(target) {
  gulp.task('lint:' + target, buildLint(target));
  gulp.task('jscpd:' + target, buildJscpd(target));
  gulp.task('babel:' + target, buildBabel(target));
  gulp.task('build:' + target, ['lint:' + target, 'jscpd:' + target, 'build:' + target]);
});

// Unit Testing Tasks
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

// Database Migration Tasks
gulp.task('migrate:up', function(cb) {
  migrate('up', cb);
});

gulp.task('migrate:down', function(cb) {
  migrate('down', cb);
});

// Integration Test Tasks
gulp.task('pre-integration-test', ['build', 'build-cucumber'], function(cb) {
  plugins.env({
    vars: {
      NODE_ENV: 'integration'
    }
  });

  migrate('up', cb);
});

gulp.task('integration-test', ['pre-integration-test'], function() {
  return gulp.src('target/cucumber/features/**/*.feature')
    .pipe(plugins.cucumber({
      steps: 'target/cucumber/steps/**/*.step.js',
      support: 'target/cucumber/support/**/*.js'
    }));
});

gulp.task('copy-cucumber-features', function() {
  return gulp.src('src/cucumber/features/**/*.feature')
    .pipe(gulp.dest('target/cucumber/features'));
})

// Misc Tasks
gulp.task('run', ['test'], function() {
  plugins.nodemon({
    script: 'target/server/main.js',
    tasks: ['test'],
    watch: 'src'
  });
});

gulp.task('build', ['lint:server', 'jscpd:server', 'babel:server']);
gulp.task('build-cucumber', ['lint:cucumber', 'jscpd:cucumber', 'babel:cucumber', 'copy-cucumber-features']);
gulp.task('test', ['post-unit-test']);

gulp.task('default', ['test']);
