
/* =========================================================================
 * Svelto - Embedded CSS
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

/* EMBEDDED CSS */

(function ( $, _, Svelto ) {

  'use strict';

  /* EMBEDDED CSS */

  class EmbeddedCSS {

    constructor () {

      this.$stylesheet = $('<style class="svelto-embedded svelto-embedded-' + ( $.guid++ ) + '">');
      this.tree = {};

    }

    /* PRIVATE */

    _cssfy () {

      let css = '';

      for ( let selector in this.tree ) {

        if ( this.tree.hasOwnProperty ( selector ) ) {

          css += selector + '{';

          if ( _.isPlainObject ( this.tree[selector] ) ) {

            for ( let property in this.tree[selector] ) {

              if ( this.tree[selector].hasOwnProperty ( property ) ) {

                css += property + ':' + this.tree[selector][property] + ';';

              }

            }

          } else if ( _.isString ( this.tree[selector] ) ) {

            css += this.tree[selector] + ';';

          }

          css += '}';

        }

      }

      return css;

    }

    _refresh () {

      this.$stylesheet.text ( this._cssfy () );

    }

    /* API */

    get ( selector ) {

      return this.tree[selector];

    }

    set ( selector, property, value ) {

      if ( property === false ) {

        return this.remove ( selector );

      }

      if ( _.isPlainObject ( property ) ) {

        this.tree[selector] = _.extend ( _.isPlainObject ( this.tree[selector] ) ? this.tree[selector] : {}, property );

      } else if ( _.isString ( property ) ) {

        if ( !value ) {

          this.tree[selector] = property;

        } else {

          return this.set ( selector, { property, value } );

        }

      }

      this._refresh ();

    }

    remove ( selector ) {

      if ( selector in this.tree ) {

        delete this.tree[selector];

        this._refresh ();

      }

    }

    clear () {

      if ( _.size ( this.tree ) ) {

        this.tree = {};

        this._refresh ();

      }

    }

    attach () {

      this.$stylesheet.appendTo ( $(document.head) );

    }

    detach () {

      this.$stylesheet.remove ();

    }

  }

  /* EXPORT */

  Svelto.EmbeddedCSS = new EmbeddedCSS ();

  /* READY */

  $(function () {

    Svelto.EmbeddedCSS.attach ();

  });

}( Svelto.$, Svelto._, Svelto ));
