
/* BROWSER */

//TODO: detect browsers, versions, OSes, but... is it useful?
//TODO: detect: windows phone, smartphone, windows, linux, safari, opera, firefox, lowend

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* VARIABLES */

    var userAgent = navigator.userAgent.toLowerCase ();

    /* BROWSER */

    $.browser = {
        isMobile: /iphone|ipad|android|ipod|opera mini|opera mobile|blackberry|iemobile|webos|windows phone|playbook|tablet|kindle/i.test ( userAgent ),
        isTablet: /ipad|playbook|tablet|kindle/i.test ( userAgent ),
        isAndroid: /android/i.test ( userAgent ),
        isIOS: /(iphone|ipad|ipod)/i.test ( userAgent ),
        isMac: /mac/i.test ( userAgent ),
        isIE: /msie [\w.]+/.test ( userAgent ),
        isChrome: /chrome/i.test ( userAgent )
    };

    $.browser.hasTouch = ( 'ontouchstart' in window && !($.browser.isChrome && !$.browser.isAndroid) ); //FIXME: Why do we need the second check? Do other libraries do the same?

}( jQuery, _, window, document ));
