
/* =========================================================================
 * Svelto - Browser v0.3.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  var userAgent = navigator.userAgent.toLowerCase (),
      vendor = navigator.vendor.toLowerCase (),
      appVersion = navigator.appVersion.toLowerCase ();

  /* CHECKS */

  var is_iphone = /iphone/i.test ( userAgent ),
      is_ipad = /ipad/i.test ( userAgent ),
      is_ipod = /ipod/i.test ( userAgent ),
      is_android = /android/i.test ( userAgent ),
      is_androidPhone = is_android && /mobile/i.test ( userAgent ),
      is_androidTablet = is_android && !is_androidPhone,
      is_blackberry = /blackberry/i.test ( userAgent ) || /BB10/i.test ( userAgent ),
      is_windows = /win/i.test ( appVersion ),
      is_windowsPhone = is_windows && /phone/i.test ( userAgent ),
      is_windowsTablet = is_windows && !is_windowsPhone && /touch/i.test ( userAgent ),
      is_mobile = is_iphone || is_ipod || is_androidPhone || is_blackberry || is_windowsPhone,
      is_tablet = is_ipad || is_androidTablet || is_windowsTablet;

  /* BROWSER */

  $.browser = {
    is: {
      chrome: /chrome|chromium/i.test ( userAgent ) && /google inc/.test ( vendor ),
      firefox: /firefox/i.test ( userAgent ),
      ie: /msie/i.test ( userAgent ) || 'ActiveXObject' in window, /* IE || EDGE */
      opera:  /^Opera\//.test ( userAgent ) || /\x20OPR\//.test ( userAgent ), /* Opera <= 12 || Opera >= 15 */
      safari: /safari/i.test ( userAgent ) && /apple computer/i.test ( vendor ),
      iphone: is_iphone,
      ipad: is_ipad,
      ipod: is_ipod,
      ios: is_iphone || is_ipad || is_ipod,
      android: is_android,
      androidPhone: is_androidPhone,
      androidTablet: is_androidTablet,
      blackberry: is_blackberry,
      linux: /linux/i.test ( appVersion ),
      mac: /mac/i.test ( appVersion ),
      windows: is_windows,
      windowsPhone: is_windowsPhone,
      windowsTablet: is_windowsTablet,
      mobile: is_mobile,
      tablet: is_tablet,
      desktop: !is_mobile && !is_tablet,
      online: function () {
        return navigator.onLine;
      },
      offline: function () {
        return !navigator.onLine;
      },
      touchDevice: 'ontouchstart' in window || ( 'DocumentTouch' in window && document instanceof DocumentTouch )
    }
  };

}( jQuery, _, window, document ));
