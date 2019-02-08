
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
          newWidth = $.window.outerWidth,
          newHeight = $.window.outerHeight;

    const didPixelRatioChange = newPixelRatio !== pixelRatio,
          didWidthChange = newWidth !== width,
          didHeightChange = newHeight !== height,
          didSomethingChange = didPixelRatioChange || didWidthChange || didHeightChange; // Sometimes for some reason nothing actually changed

    if ( !didSomethingChange || didWidthChange || didPixelRatioChange ) {

      width = newWidth;

      $.$window.trigger ( 'resize:width' );

    }

    if ( !didSomethingChange || didHeightChange || didPixelRatioChange ) {

      height = newHeight;

      $.$window.trigger ( 'resize:height' );

    }

    pixelRatio = newPixelRatio;

  });

}( window.$ ));
