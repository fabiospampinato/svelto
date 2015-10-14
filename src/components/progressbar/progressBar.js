
/* =========================================================================
* Svelto - Progressbar v0.2.0
* =========================================================================
* Copyright (c) 2015 Fabio Spampinato
* Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
* =========================================================================
* @requires ../widget/factory.js
* ========================================================================= */

(function ( $, _, window, document, undefined ) {

'use strict';

/* HELPER */

$.progressbar = function ( options ) {

  options = _.isNumber ( options ) ? { value: options } : options;

  return new $.svelto.progressbar ( options );

};

/* PROGRESSBAR */

$.factory ( 'svelto.progressbar', {

  /* TEMPLATES */

  templates: {
    base: '<div class="progressbar {%=(o.striped ? "striped" : "")%} {%=(o.labeled ? "labeled" : "")%} {%=o.colors.off%} {%=o.size%} {%=o.css%}">' +
            '<div class="progressbar-highlight {%=o.colors.on%}"></div>' +
          '</div>'
  },

  /* OPTIONS */

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
    selectors: {
      highlight: '.progressbar-highlight'
    },
    callbacks: {
      change: _.noop,
      empty: _.noop,
      full: _.noop
    }
  },

  /* SPECIAL */

  _variables: function () {

    this.$progressbar = this.$element;
    this.$highlight = this.$progressbar.find ( this.options.selectors.highlight );

  },

  _init: function () {

    this.options.value = this._sanitizeValue ( this.options.value );

    this._updateWidth ();
    this._updateLabel ();

  },

  /* PRIVATE */

  _sanitizeValue: function ( value ) {

    var nr = Number ( value );

    return _.clamp ( 0, ( _.isNaN ( nr ) ? 0 : nr ), 100 );

  },

  _roundValue: function ( value ) {

    return value.toFixed ( this.options.decimals );

  },

  _updateWidth: function () {

    this.$highlight.css ( 'min-width', this.options.value + '%' );

  },

  _updateLabel: function () {

    this.$highlight.attr ( 'data-value', this._roundValue ( this.options.value ) + '%' );

  },

  _update: function () {

    this._updateWidth ();
    this._updateLabel ();

  },

  /* PUBLIC */

  get: function () {

    return this.options.value;

  },

  set: function ( value ) {

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

});

/* READY */

$(function () {

  $('.progressbar').each ( function () {

    var $progressbar = $(this);

    $progressbar.progressbar ({
      value: $progressbar.data ( 'value' ),
      decimals: $progressbar.data ( 'decimals ')
    });

  });

});

}( jQuery, _, window, document ));
