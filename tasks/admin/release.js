
/* =========================================================================
 * Svelto - Tasks - Admin - Release
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var _       = require ( 'lodash' ),
    argv    = require ( 'yargs' ).argv,
    github  = require ( '../config/github' ),
    release = require ( '../config/release' ),
    gulp    = require ( 'gulp-help' )( require ( 'gulp' ) );

/* RELEASE */

gulp.task ( 'release', 'Create a new Svelto release', function () {

  var name = 'v' + release.version;

  return github.releases.createRelease ( _.extend ( {}, argv, {
           owner: 'svelto',
           repo: 'svelto',
           tag_name: name,
           name: name,
           prerelease: ( release.version.indexOf ( '-' ) !== -1 )
         }));

});
