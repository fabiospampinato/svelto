
Package.describe ({
  name: 'svelto:svelto',
  summary: 'Modular front end framework for modern browsers, with battery included: 100+ widgets and tools.',
  version: '0.5.5',
  git: 'https://github.com/svelto/svelto.git'
});

Package.onUse ( function ( api ) {

  api.versionsFrom ( 'METEOR@1.0' );

  api.use ( 'ecmascript@0.1.6', 'client' );
  api.use ( 'stevezhu:lodash@4.6.1', 'client' );
  api.use ( 'jquery@1.11.4', 'client' );

  //TODO: Add auto assets array generation

  var assets = [
    'dist/fonts/MaterialIcons-Regular.woff',
    'dist/fonts/MaterialIcons-Regular.woff2',
    'dist/images/flags.png',
    'dist/images/pointing-clips.svg'
  ];

  if ( api.addAssets ) {

    api.addAssets ( assets, 'client' );

  } else {

    api.addFiles ( assets, 'client', { isAsset: true } );

  }

  api.addFiles ([
    'dist/css/svelto.css',
    'dist/javascript/svelto.js'
  ], 'client' );

});
