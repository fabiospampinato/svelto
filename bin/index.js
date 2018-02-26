#!/usr/bin/env node

//TODO: Replace `pacco` to `svelto` in the help text, we probably need to add an API for this to Caporal

/* REQUIRE */

const execa = require ( 'execa' ),
      path = require ( 'path' ),
      rdf = require ( 'require-dot-file' ),
      config = require ( '../pacco.json' );

/* VARIABLES */

const root = path.resolve ( __dirname, '..' ),
      src = path.join ( root, 'src' ),
      icon = path.join ( root, 'resources', 'icon', 'icon.png' ),
      iconError = path.join ( root, 'resources', 'icon', 'icon_error.png' ),
      sveltoConfig = rdf ( 'svelto.json', process.cwd () ) || {};

/* EXECUTE */

const args = ['--config', JSON.stringify ( config ), '--config', JSON.stringify ( sveltoConfig ), '--source', src, '--icon', icon, '--icon-error', iconError, ...process.argv.slice ( 2 )];
const opts = {
  cwd: process.cwd (),
  stdio: 'inherit'
};

execa ( 'pacco', args, opts );
