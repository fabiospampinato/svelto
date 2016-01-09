
/* =========================================================================
* Svelto - Embed CSS
* =========================================================================
* Copyright (c) 2015 Fabio Spampinato
* Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
* =========================================================================
* @requires ../svelto/svelto.js
* ========================================================================= */

/* EMBED CSS */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* VARIABLES */

  let $stylesheet,
      tree = {};

  /* UTILITIES */

  let cssfy = function ( tree ) {

    let css = '';

    for ( let selector in tree ) {

      if ( tree.hasOwnProperty ( selector ) ) {

        css += selector + '{';

        if ( _.isString ( tree[selector] ) ) {

          css += tree[selector];

        } else {

          for ( let property in tree[selector] ) {

            if ( tree[selector].hasOwnProperty ( property ) ) {

              css += property + ':' + tree[selector][property] + ';';

            }

          }

        }

        css += '}';

      }

    }

    return css;

  };

  let update = function () {

    $stylesheet.html ( cssfy ( tree ) );

  };

  /* EMBED CSS */

  $.embedCSS = function ( selector, property, value ) {

    if ( property === false ) {

      if ( !( selector in tree ) ) return;

      delete tree[selector];

    } else if ( _.isString ( property ) ) {

      tree[selector] = property;

    } else {

      let rule = _.isUndefined ( value ) ? property : { property: value };

      tree[selector] = _.extend ( _.isString ( tree[selector] ) ? {} : tree[selector] || {}, rule );

    }

    update ();

  };

  /* READY */

  $(function () {

    $stylesheet = $('<style class="svelto-embedded">').appendTo ( $head );

  });

}( Svelto.$, Svelto._, window, document ));
