
/* =========================================================================
 * Svelto - Browser
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  let userAgent  = navigator.userAgent.toLowerCase (),
      vendor     = navigator.vendor.toLowerCase (),
      appVersion = navigator.appVersion.toLowerCase ();

  /* CHECKS */

  let isIphone        = /iphone/i.test ( userAgent ),
      isIpad          = /ipad/i.test ( userAgent ),
      isIpod          = /ipod/i.test ( userAgent ),
      isAndroid       = /android/i.test ( userAgent ),
      isAndroidPhone  = isAndroid && /mobile/i.test ( userAgent ),
      isAndroidTablet = isAndroid && !isAndroidPhone,
      isBlackberry    = /blackberry/i.test ( userAgent ) || /BB10/i.test ( userAgent ),
      isWindows       = /win/i.test ( appVersion ),
      isWindowsPhone  = isWindows && /phone/i.test ( userAgent ),
      isWindowsTablet = isWindows && !isWindowsPhone && /touch/i.test ( userAgent ),
      isMobile        = isIphone || isIpod || isAndroidPhone || isBlackberry || isWindowsPhone,
      isTablet        = isIpad || isAndroidTablet || isWindowsTablet;

  /* BROWSER */

  $.browser = {
    is: {
      chrome: /chrome|chromium/i.test ( userAgent ) && /google inc/.test ( vendor ),
      firefox: /firefox/i.test ( userAgent ),
      ie: /msie/i.test ( userAgent ) || 'ActiveXObject' in window, /* IE || EDGE */
      opera:  /^Opera\//.test ( userAgent ) || /\x20OPR\//.test ( userAgent ), /* Opera <= 12 || Opera >= 15 */
      safari: /safari/i.test ( userAgent ) && /apple computer/i.test ( vendor ),
      iphone: isIphone,
      ipad: isIpad,
      ipod: isIpod,
      ios: isIphone || isIpad || isIpod,
      android: isAndroid,
      androidPhone: isAndroidPhone,
      androidTablet: isAndroidTablet,
      blackberry: isBlackberry,
      linux: /linux/i.test ( appVersion ),
      mac: /mac/i.test ( appVersion ),
      windows: isWindows,
      windowsPhone: isWindowsPhone,
      windowsTablet: isWindowsTablet,
      mobile: isMobile,
      tablet: isTablet,
      desktop: !isMobile && !isTablet,
      online: () => navigator.onLine,
      offline: () => !navigator.onLine,
      touchDevice: 'ontouchstart' in window || ( 'DocumentTouch' in window && document instanceof DocumentTouch )
    }
  };

}( jQuery, _, window, document ));
