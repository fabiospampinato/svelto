
/* =========================================================================
* Svelto - Progressbar
* =========================================================================
* Copyright (c) 2015 Fabio Spampinato
* Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
* =========================================================================
* @requires ../widget/widget.js
* ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'progressbar',
    plugin: true,
    selector: '.progressbar',
    templates: {
      base: '<div class="progressbar {%=(o.striped ? "striped" : "")%} {%=(o.indeterminate ? "indeterminate" : "")%} {%=(o.labeled ? "labeled" : "")%} {%=o.colors.off%} {%=o.size%} {%=o.css%}">' +
              '<div class="progressbar-highlight {%=o.colors.on%}"></div>' +
            '</div>'
    },
    options: {
      value: 0, //INFO: Percentage
      colors: { //INFO: Colors to use for the progressbar
        on: '', //INFO: Color of `.progressbar-highlight`
        off: '' //INFO: Color of `.progressbar`
      },
      striped: false, //INFO: Draw striped over it
      indeterminate: false, //INFO: Indeterminate state
      labeled: false, //INFO: Draw a label inside
      decimals: 0, //INFO: Amount of decimals to round the label value to
      size: '', //INFO: Size of the progressbar: '', 'compact', 'slim'
      css: '',
      datas: {
        value: 'value'
      },
      selectors: {
        highlight: '.progressbar-highlight'
      },
      callbacks: {
        change: _.noop,
        empty: _.noop,
        full: _.noop
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

    static widgetize ( $progressbar ) {

      $progressbar.progressbar ({
        value: $progressbar.data ( 'value' ),
        decimals: $progressbar.data ( 'decimals ')
      });

    }

    _variables () {

      this.$progressbar = this.$element;
      this.$highlight = this.$progressbar.find ( this.options.selectors.highlight );

    }

    _init () {

      this.options.value = this._sanitizeValue ( this.options.value );

      this._update ();

    }

    /* VALUE */

    _sanitizeValue ( value ) {

      let nr = Number ( value );

      return _.clamp ( 0, _.isNaN ( nr ) ? 0 : nr, 100 );

    }

    _roundValue ( value ) {

      return Number ( value.toFixed ( this.options.decimals ) );

    }

    /* UPDATE */

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

      value = this._sanitizeValue ( value );

      if ( value !== this.options.value ) {

        this.options.value = value;

        this._update ();

        this._trigger ( 'change' );

        if ( this.options.value === 0 ) {

          this._trigger ( 'empty' );

        } else if ( this.options.value === 100 ) {

          this._trigger ( 'full' );

        }

      }

    }

  }

  /* FACTORY */

  $.factory ( Progressbar, config, Svelto );

}( Svelto.$, Svelto._, window, document ));
