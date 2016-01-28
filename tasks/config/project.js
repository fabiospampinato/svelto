
/* =========================================================================
 * Svelto - Tasks - Config - Project
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRES */

var _        = require ( 'lodash' ),
    argv     = require ( 'yargs' ).argv,
    file     = require ( '../utilities/file' ),
    defaults = require ( './defaults' ),
    custom   = file.load ( '../../svelto.json', {} ),
    dot      = file.load ( '../../.svelto.json', {} );

/* ENVIRONMENT */

var environment    = argv.environment || argv.env || dot.environment || custom.environment || defaults.environment,
    environmentKey = environment ? 'environments.' + environment : undefined;

/* PROJECT */

var project = _.merge ( {}, defaults, _.get ( defaults, environmentKey ), custom, _.get ( custom, environmentKey ), dot, _.get ( dot, environmentKey ) );

/* EXPORT */

module.exports = project;
