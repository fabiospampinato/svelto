
// @require ../init.js
// @require ./elements.js

(function ( $ ) {

  // On mobile a `resize` event may get triggered because of the chrome of the browser

  /* RESIZE */

  let width = $.window.outerWidth,
      height = $.window.outerHeight;

  $.$window.on ( 'resize', () => {

    const newWidth = $.window.outerWidth;

    if ( newWidth !== width ) {

      width = newWidth;

      $.$window.trigger ( 'resize:width' );

    }

    const newHeight = $.window.outerHeight;

    if ( newHeight !== height ) {

      height = newHeight;

      $.$window.trigger ( 'resize:height' );

    }

  });

}( window.$ ));
