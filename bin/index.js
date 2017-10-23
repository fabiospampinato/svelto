#!/usr/bin/env node

/* IMPORT */

const execa = require ( 'execa' ),
      path = require ( 'path' );

/* EXECUTE */

const args = process.argv.slice ( 2 );
const opts = {
  cwd: path.resolve ( __dirname, '..' ),
  stdio: 'inherit'
};

execa.sync ( 'gulp', args, opts );
