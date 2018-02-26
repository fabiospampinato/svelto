#!/usr/bin/env node

//TODO: replace `pacco` to `svelto` in the help text

/* REQUIRE */

const execa = require ( 'execa' ),
      path = require ( 'path' ),
      config = require ( '../pacco.json' );

/* VARIABLES */

const root = path.resolve ( __dirname, '..' ),
      src = path.join ( root, 'src' ),
      icon = path.join ( root, 'resources', 'icon', 'icon.png' ),
      iconError = path.join ( root, 'resources', 'icon', 'icon_error.png' );

/* EXECUTE */

const args = ['--config', JSON.stringify ( config ), '--source', src, '--icon', icon, '--icon-error', iconError, ...process.argv.slice ( 2 )];
const opts = {
  cwd: process.cwd (),
  stdio: 'inherit'
};

execa ( 'pacco', args, opts );
