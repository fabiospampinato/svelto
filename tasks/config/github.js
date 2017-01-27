
/* =========================================================================
 * Svelto - Tasks - Config - GitHub
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const plugins = require ( './project' ).plugins,
      GHAPI   = require ( 'github' );

/* GITHUB */

const github = new GHAPI ({
  version: '3.0.0',
  debug: true,
  protocol: 'https',
  timeout: 5000
});

if ( plugins.github.enabled ) {

  github.authenticate ( plugins.github.auth );

}

/* EXPORT */

module.exports = github;
