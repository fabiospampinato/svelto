
Package.describe ({
  name: 'svelto:svelto',
  summary: 'Modular front end framework for modern browsers, with battery included: 50+ components & 20+ tools.',
  version: '0.4.0-beta2',
  git: 'https://github.com/svelto/svelto.git'
});

Package.onUse ( function ( api ) {

  api.versionsFrom ( 'METEOR@1.0' );

  api.use ( 'ecmascript@0.1.6', 'client' );
  api.use ( 'stevezhu:lodash@3.10.1', 'client' );
  api.use ( 'jquery@1.11.4', 'client' );

  //TODO: Add auto assets array generation

  var assets = [
    'dist/fonts/MaterialIcons-Regular.eot',
    'dist/fonts/MaterialIcons-Regular.ttf',
    'dist/fonts/MaterialIcons-Regular.woff',
    'dist/fonts/MaterialIcons-Regular.woff2',
    'dist/images/blurred.svg',
    'dist/images/chat-clips.svg',
    'dist/images/dropdown-clips.svg',
    'dist/images/flags.png'
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
