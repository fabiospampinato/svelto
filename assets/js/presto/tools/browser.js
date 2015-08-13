
/* BROWSER */

//TODO: detect browsers, versions, OSes

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* VARIABLES */

    var userAgent = navigator.userAgent.toLowerCase ();

    /* BROWSER */

    $.browser = {
        isMobile: /iphone|ipad|android|ipod|opera mini|opera mobile|blackberry|iemobile|webos|windows phone|playbook|tablet|kindle/i.test ( userAgent ),
        isTablet: /ipad|playbook|tablet|kindle/i.test ( userAgent ),
        isAndroid: /Android/i.test ( userAgent ),
        isIOS: /(iPhone|iPad|iPod)/i.test ( userAgent ),
        isMac: /Mac/i.test ( userAgent ),
        isIE: /msie [\w.]+/.test ( userAgent )
    };

}( jQuery, _, window, document ));
