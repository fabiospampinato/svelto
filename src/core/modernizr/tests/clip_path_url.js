
// @require ../init.js
// @require core/jquery/jquery.js

(function ( Modernizr, $ ) {

  /* CLIP PATH URL */

  $.onReady ( function () {

    /* SVG */

    let ns = 'http://www.w3.org/2000/svg',
        svg = document.createElementNS ( ns, 'svg' ),
        clip = document.createElementNS ( ns, 'clipPath' ),
        rect = document.createElementNS ( ns, 'rect' );

    clip.setAttribute ( 'id', 'ModernizrClipPath' );
    rect.setAttribute ( 'width', '0' );

    clip.appendChild ( rect );
    svg.appendChild ( clip );

    /* ELEMENT */

    let ele = document.createElement ( 'div' );

    ele.style.cssText = 'width:2px;height:2px;position:fixed;top:0;left:0;z-index:1000000000;opacity:0;';
    ele.style[Modernizr.prefixed ( 'clip-path' )] = 'url(#ModernizrClipPath)';

    /* APPENDING */

    document.body.appendChild ( svg );
    document.body.appendChild ( ele );

    /* CHECKING */

    let offset = ele.getBoundingClientRect (),
        supported = document.elementFromPoint ( offset.left + 1, offset.top + 1 ) !== ele;

    /* CLEANING */

    document.body.removeChild ( ele );
    document.body.removeChild ( svg );

    /* EXPORTING */

    Modernizr.addTest ( 'clip-path-url', supported );

  });

}( window.Modernizr, window.$ ));
