
/* =========================================================================
 * Svelto - Tasks - Config - Environment
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

var project = require ( './project.js' );

/* ENVIRONMENT */

var environment = {
  isDevelopment: !!project.isDevelopment
};

/* EXPORT */

module.exports = environment;
