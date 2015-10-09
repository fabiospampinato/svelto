
/* PSEUDO CSS */

//FIXME: Useless right now
//TODO: Memory leaks here, for example when we remove an element it's pseudo styles are still being attached

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  var $style = $('<style type="text/css" />').appendTo ( $head ),
      tree = {};

  /* UTILITIES */

  var updateStyle = function () {

    var css = '';

    for ( var selector in tree ) {

      css += selector + '{' +  + '}';

    }


  };

  /* PSEUDO CSS */

  $.pseudoCSS = function ( selector ) {



  };

}( jQuery, _, window, document ));
