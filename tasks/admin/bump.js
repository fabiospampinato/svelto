
/* =========================================================================
 * Svelto - Tasks - Admin - Bump
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var argv    = require ( 'yargs' ).argv,
    fs      = require ( 'fs' ),
    merge   = require ( 'merge-stream' ),
    gulp    = require ( 'gulp-help' )( require ( 'gulp' ) ),
    bump    = require ( 'gulp-bump' ),
    replace = require ( 'gulp-replace' );

/* BUMP PACKAGE */

gulp.task ( 'bump-package', false, function () {

  return gulp.src ( './package.json' )
             .pipe ( bump ({
               type: argv.type,
               version: argv.version,
               preid: argv.preid || 'beta'
             }))
             .pipe ( gulp.dest ( './' ) );

});

/* BUMP */

gulp.task ( 'bump', 'Bump Svelto version', ['bump-package'], function () {

  var version = JSON.parse ( fs.readFileSync ( './package.json', 'utf8' ) ).version; // We are not using `require` in order to avoid to get a cached value

  var sveltoJS = gulp.src ( './src/core/svelto/svelto.js' )
                     .pipe ( replace ( /VERSION: '(.*)'/, 'VERSION: \'' + version + '\'' ) )
                     .pipe ( gulp.dest ( './src/core/svelto' ) );

  var sveltoSCSS = gulp.src ( './src/core/svelto/variables.scss' )
                       .pipe ( replace ( /\$svelto-version: '(.*)'/, '$svelto-version: \'' + version + '\'' ) )
                       .pipe ( gulp.dest ( './src/core/svelto' ) );

  var meteor = gulp.src ( './package.js' )
                   .pipe ( replace ( /version: '(.*)'/, 'version: \'' + version + '\'' ) )
                   .pipe ( gulp.dest ( './' ) );

  return merge ( sveltoJS, sveltoSCSS, meteor );

}, {

  options: {
    'type=major|minor|patch|prerelease': 'Section of the semantic version to update [default=patch]',
    'version=major.minor.path': 'Set a specific version to bump to',
    'preid=string': 'Prerelease id [default=beta]'
  }

});
