
/* =========================================================================
* Svelto - Pseudo CSS
* =========================================================================
* Copyright (c) 2015 Fabio Spampinato
* Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
* =========================================================================
* @requires ../svelto/svelto.js
* ========================================================================= */

/* PSEUDO CSS */

//TODO: Rename it, it's not limited to pseudo-elements, even if that it's pretty much the only use case
//TODO: Memory leaks here, for example when we remove an element it's pseudo styles are still being attached to the dynamically attached stylesheet

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  let $stylesheet,
      tree = {};

  /* UTILITIES */

  let cssfy = function ( tree ) {

    let css = '';

    for ( let selector in tree ) {

      css += selector + '{';

      if ( _.isString ( tree[selector] ) ) {

        css += tree[selector];

      } else {

        for ( let property in tree[selector] ) {

          css += property + ':' + tree[selector][property] + ';';

        }

      }

      css += '}';

    }

    return css;

  };

  let update = function () {

    $stylesheet.html ( cssfy ( tree ) );

  };

  /* PSEUDO CSS */

  $.pseudoCSS = function ( selector, property, value ) {

    if ( _.isString ( property ) ) {

      tree[selector] = property;

    } else {

      let rule = _.isUndefined ( value ) ? property : { property: value };

      tree[selector] = _.merge ( _.isString ( tree[selector] ) ? {} : tree[selector] || {}, rule );

    }

    update ();

  };

  /* READY */

  $(function () {

    $stylesheet = $('<style class="pseudo" />').appendTo ( $head );

  });

}( Svelto.$, Svelto._, window, document ));
