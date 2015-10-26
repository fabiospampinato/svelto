
Package.describe ({
  name: 'svelto:svelto',
  summary: 'A rich, modular, web framework for modern browsers. With jade mixins.',
  version: '0.1.0',
  git: 'https://github.com/svelto/svelto.git'
});

Package.onUse ( function ( api ) {

  api.versionsFrom ( 'METEOR@1.0' );

  // api.use ( 'stevezhu:lodash', 'client' );
  // api.use ( 'jquery', 'client' );
  // api.use ( 'ixdi:material-design-iconic-font', 'client' );

  var assets = [
    'dist/images/blur.svg',
    'dist/images/chat-clips.svg',
    'dist/images/dropdown-clips.svg',
    'dist/images/flags.png',
    'dist/images/sample-wide.jpg',
    'dist/images/sample.png'
  ];

  if ( api.addAssets ) {

    api.addAssets ( assets, 'client' );

  } else {

    api.addFiles ( assets, 'client', { isAsset: true } );

  }

  api.addFiles ([
    'dist/css/svelto.css',
    'dist/js/svelto.js'
  ], 'client');

});
