
/* BROWSER */

//TODO: detect browsers, versions, OSes

;(function ( $, window, document, undefined ) {

    'use strict';

    var userAgent = navigator.userAgent.toLowerCase ();

    $.browser = {
        isMobile: /iphone|ipad|android|ipod|opera mini|opera mobile|blackberry|iemobile|webos|windows phone|playbook|tablet|kindle/i.test ( userAgent ),
        isTablet: /ipad|playbook|tablet|kindle/i.test ( userAgent ),
        isAndroid: /Android/i.test ( userAgent ),
        isIOS: /(iPhone|iPad|iPod)/i.test ( userAgent ),
        isMac: /Mac/i.test ( userAgent ),
        isIE: /msie [\w.]+/.test ( userAgent )
    };

}( lQuery, window, document ));
