
/* PSEUDO CSS */

//TODO: Rename it, it's not limited to pseudo-elements, even if that it's pretty much the only use case
//TODO: Memory leaks here, for example when we remove an element it's pseudo styles are still being attached to the dynamically attached stylesheet

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  var $stylesheet,
      tree = {};

  /* UTILITIES */

  var cssfy = function ( tree ) {

    var css = '';

    for ( var selector in tree ) {

      css += selector + '{';

      if ( _.isString ( tree[selector] ) ) {

        css += tree[selector];

      } else {

        for ( var property in tree[selector] ) {

          css += property + ':' + tree[selector][property] + ';';

        }

      }

      css += '}';

    }

    return css;

  };

  var update = function () {

    var css = cssfy ( tree );

    $stylesheet.html ( css );

  };

  /* PSEUDO CSS */

  $.pseudoCSS = function ( selector, property, value ) {

    if ( _.isString ( property ) ) {

      tree[selector] = property;

    } else {

      var rule = _.isUndefined ( value ) ? property : { property: value };

      tree[selector] = _.merge ( _.isString ( tree[selector] ) ? {} : tree[selector] || {}, rule );

    }

    update ();

  };

  /* READY */

  $(function () {

    $stylesheet = $('<style />').appendTo ( $head );

  });

}( jQuery, _, window, document ));
