
/* =========================================================================
 * Svelto - Tasks - Config - GitHub
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var project = require ( './project' ),
    plugins = project.plugins,
    GHAPI   = require ( 'github' );

/* GITHUB */

var github = new GHAPI ({
  version: '3.0.0',
  debug: true,
  protocol: 'https',
  timeout: 5000
}).authenticate ( plugins.github.auth );

/* EXPORT */

module.exports = github;
