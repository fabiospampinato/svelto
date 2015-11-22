
/* =========================================================================
* Svelto - Progressbar
* =========================================================================
* Copyright (c) 2015 Fabio Spampinato
* Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
* =========================================================================
* @requires ../widget/factory.js
* ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'progressbar',
    templates: {
      base: '<div class="progressbar {%=(o.striped ? "striped" : "")%} {%=(o.labeled ? "labeled" : "")%} {%=o.colors.off%} {%=o.size%} {%=o.css%}">' +
              '<div class="progressbar-highlight {%=o.colors.on%}"></div>' +
            '</div>'
    },
    options: {
      value: 0, // Percentage
      colors: { // Colors to use for the progressbar
        on: '', // Color of `.progressbar-highlight`
        off: '' // Color of `.progressbar`
      },
      striped: false, // Draw striped over it
      labeled: false, // Draw a label inside
      decimals: 0, // Amount of decimals to round the label value to
      size: '', // Size of the progressbar: '', 'compact', 'slim'
      css: '',
      datas: {
        value: 'value'
      },
      selectors: {
        highlight: '.progressbar-highlight'
      },
      callbacks: {
        change () {},
        empty () {},
        full () {}
      }
    }
  };

  /* HELPER */

  $.progressbar = function ( options ) {

    options = _.isNumber ( options ) ? { value: options } : options;

    return new Svelto.Progressbar ( options );

  };

  /* PROGRESSBAR */

  class Progressbar extends Svelto.Widget {

    /* SPECIAL */

    _widgetize ( $root ) {

      $root.find ( '.progressbar' ).each ( function () {

        var $progressbar = $(this);

        $progressbar.progressbar ({
          value: $progressbar.data ( 'value' ),
          decimals: $progressbar.data ( 'decimals ')
        });

      });

      //TODO: Add support for $root.filter

    }

    _variables () {

      this.$progressbar = this.$element;
      this.$highlight = this.$progressbar.find ( this.options.selectors.highlight );

    }

    _init () {

      this.options.value = this._sanitizeValue ( this.options.value );

      this._updateWidth ();
      this._updateLabel ();

    }

    /* PRIVATE */

    _sanitizeValue ( value ) {

      var nr = Number ( value );

      return _.clamp ( 0, ( _.isNaN ( nr ) ? 0 : nr ), 100 );

    }

    _roundValue ( value ) {

      return value.toFixed ( this.options.decimals );

    }

    _updateWidth () {

      this.$highlight.css ( 'min-width', this.options.value + '%' );

    }

    _updateLabel () {

      this.$highlight.attr ( 'data-' + this.options.datas.value, this._roundValue ( this.options.value ) + '%' );

    }

    _update () {

      this._updateWidth ();
      this._updateLabel ();

    }

    /* PUBLIC */

    get () {

      return this.options.value;

    }

    set ( value ) {

      value = Number ( value );

      if ( !_.isNaN ( value ) ) {

        value = this._sanitizeValue ( value );

        if ( value !== this.options.value ) {

          var data = {
            previous: this.options.value,
            value: value
          };

          this.options.value = value;

          this._update ();

          this._trigger  ( 'change', data );

          if ( this.options.value === 0 ) {

            this._trigger  ( 'empty', data );

          } else if ( this.options.value === 100 ) {

            this._trigger  ( 'full', data );

          }

        }

      }

    }

  }

  /* BINDING */

  Svelto.Progressbar = Progressbar;
  Svelto.Progressbar.config = config;

  /* FACTORY */

  $.factory ( Svelto.Progressbar );

}( Svelto.$, Svelto._, window, document ));
