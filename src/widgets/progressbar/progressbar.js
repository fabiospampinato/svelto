
/* =========================================================================
* Svelto - Widgets - Progressbar
* =========================================================================
* Copyright (c) 2015-2016 Fabio Spampinato
* Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
* =========================================================================
* @require core/widget/widget.js
* ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'progressbar',
    plugin: true,
    selector: '.progressbar',
    templates: {
      base: '<div class="progressbar <%= o.striped ? "striped" : "" %> <%= o.indeterminate ? "indeterminate" : "" %> <%= o.labeled ? "labeled" : "" %> <%= o.colors.off %> <%= o.size %> <%= o.css %>">' +
              '<div class="progressbar-highlight <%= o.colors.on %>"></div>' +
            '</div>'
    },
    options: {
      value: 0, // Percentage
      colors: { // Colors to use for the progressbar
        on: '', // Color of `.progressbar-highlight`
        off: '' // Color of `.progressbar`
      },
      striped: false, // Draw striped over it
      indeterminate: false, // Indeterminate state
      labeled: false, // Draw a label inside
      decimals: 0, // Amount of decimals to round the label value to
      size: '', // Size of the progressbar: '', 'compact', 'slim'
      css: '',
      datas: {
        value: 'value',
        decimals: 'decimals'
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

  /* PROGRESSBAR */

  class Progressbar extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$progressbar = this.$element;
      this.$highlight = this.$progressbar.find ( this.options.selectors.highlight );

    }

    _init () {

      /* OPTIONS */

      this.options.value = this._sanitizeValue ( this.$progressbar.data ( this.options.datas.value ) || this.options.value );
      this.options.decimals = Number ( this.$progressbar.data ( this.options.datas.decimals ) || this.options.decimals );

      /* UPDATE */

      this._update ();

    }

    /* VALUE */

    _sanitizeValue ( value ) {

      let nr = Number ( value );

      return _.clamp ( _.isNaN ( nr ) ? 0 : nr, 0, 100 );

    }

    _roundValue ( value ) {

      return Number ( value.toFixed ( this.options.decimals ) );

    }

    /* UPDATE */

    _updateWidth () {

      this.$highlight.css ( 'min-width', this.options.value + '%' );

    }

    _updateLabel () {

      this.$highlight.attr ( `data-${this.options.datas.value}`, this._roundValue ( this.options.value ) + '%' );

    }

    _update () {

      this._updateWidth ();
      this._updateLabel ();

    }

    /* API */

    get () {

      return this.options.value;

    }

    set ( value ) {

      value = this._sanitizeValue ( value );

      if ( value === this.options.value ) return;

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

  /* FACTORY */

  Factory.init ( Progressbar, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
