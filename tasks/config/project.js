
/* =========================================================================
 * Svelto - Tasks - Config - Project
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

const _            = require ( 'lodash' ),
      argv         = require ( 'yargs' ).argv,
      path         = require ( 'path' ),
      defaults     = require ( './defaults' ),
      environments = require ( '../utilities/environments' ),
      file         = require ( '../utilities/file' ),
      custom       = file.load ( path.resolve ( __dirname, '../../svelto.json' ), {} ),
      dot          = file.loadRecursive ( '.svelto.json', {} ),
      arg          = argv.config ? file.load ( argv.config ) : {};

/* ENVIRONMENT */

const envsRaw = argv.environments || argv.environment || argv.envs || argv.env || dot.environment || custom.environment || defaults.environment,
      envs = environments.parse ( envsRaw ),
      defaultsEnvs = environments.get ( defaults, envs ),
      customEnvs = environments.get ( custom, envs ),
      dotEnvs = environments.get ( dot, envs ),
      argEnvs = environments.get ( arg, envs );

/* PROJECT */

const project = _.merge ( {}, defaults, ...defaultsEnvs, custom, ...customEnvs, dot, ...dotEnvs, arg, ...argEnvs );

project.environment = envs;

/* EXPORT */

module.exports = project;
