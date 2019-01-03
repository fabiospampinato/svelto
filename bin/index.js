#!/usr/bin/env node

//TODO: Replace `pacco` to `svelto` in the help text, we probably need to add an API for this to Caporal

/* REQUIRE */

const _ = require ( 'lodash' ),
      execa = require ( 'execa' ),
      path = require ( 'path' ),
      rdf = require ( 'require-dot-file' ),
      config = require ( '../pacco.json' );

/* VARIABLES */

const root = path.resolve ( __dirname, '..' ),
      src = path.join ( root, 'src' ),
      icon = path.join ( root, 'resources', 'icon', 'icon.png' ),
      iconError = path.join ( root, 'resources', 'icon', 'icon_error.png' ),
      sveltoConfig = rdf ( 'svelto.json', process.cwd () ) || {};

/* SRC */

let argsSrc = [];

if ( _.get ( sveltoConfig, 'paths.tokens.src' ) ) {

  sveltoConfig.paths.tokens.src = [src].concat ( _.castArray ( sveltoConfig.paths.tokens.src ) );

} else {

  argsSrc = ['--source', src];

}

/* EXECUTE */

const encodeObj = obj => Buffer.from ( JSON.stringify ( obj ) ).toString ( 'base64' );

const args = ['--config', encodeObj ( config ), '--config', encodeObj ( sveltoConfig ), ...argsSrc, '--icon', icon, '--icon-error', iconError, ...process.argv.slice ( 2 )];
const opts = {
  cwd: process.cwd (),
  stdio: 'inherit'
};

execa ( 'pacco', args, opts );
