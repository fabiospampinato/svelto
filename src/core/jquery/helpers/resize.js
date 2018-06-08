
// @require ../init.js
// @require ./elements.js

(function ( $ ) {

  // On mobile a `resize` event may get triggered because of the chrome of the browser

  /* RESIZE */

  let width = $.window.outerWidth,
      height = $.window.outerHeight,
      pixelRatio = $.window.devicePixelRatio || 1; // Used for more reliable zoom detection

  $.$window.on ( 'resize', (e) => {

    const newPixelRatio = $.window.devicePixelRatio || 1,
          newWidth = $.window.outerWidth;

    if ( newWidth !== width || newPixelRatio !== pixelRatio ) {

      width = newWidth;

      $.$window.trigger ( 'resize:width' );

    }

    const newHeight = $.window.outerHeight;

    if ( newHeight !== height || newPixelRatio !== pixelRatio ) {

      height = newHeight;

      $.$window.trigger ( 'resize:height' );

    }

    pixelRatio = newPixelRatio;

  });

}( window.$ ));
