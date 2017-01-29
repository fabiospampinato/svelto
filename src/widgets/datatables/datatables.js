
/* =========================================================================
 * Svelto - Widgets - Datatables
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato - All rights reserved.
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./config.js
 * @require core/widget/widget.js
 * ========================================================================= */

//TODO: Add a spinnerOverlay when processing
//TODO: Proxy all `*.dt` events as `dt:*`
//TODO: Test in all browsers

/* DATATABLES */

(function ( $, _, Svelto, Widgets, Factory, DataTable ) {

  'use strict';

  /* CHECK IF LOADED */

  if ( !DataTable ) return;

  /* CONFIG */

  let config = {
    name: 'dt',
    plugin: true,
    selector: 'table.datatable:visible',
    options: {
      selectors: {
        wrapper: '.datatable-wrapper',
        length: '.datatable-length select'
      },
      keystrokes: {
        'ctmd + shift + left': ['page', 'first'],
        'ctmd + left': ['page', 'previous'],
        'ctmd + right': ['page', 'next'],
        'ctmd + shift + right': ['page', 'last']
      }
    }
  };

  /* DATATABLE */

  class DT extends Widgets.Widget {

    /* WIDGETIZE */

    static widgetize ( $ele ) {

      $ele.dataTable ().dt ();

    }

    /* SPECIAL */

    _variables () {

      this.$table = this.$element;
      this.$wrapper = this.$table.closest ( this.options.selectors.wrapper );
      this.$length = this.$wrapper.find ( this.options.selectors.length );
      this._api = this.$table.DataTable ();

    }

    _init () {

      this.___keydown ();

    }

    _destroy () {

      this.$wrapper.remove ();

    }

    /* KEYDOWN */

    ___keydown () {

      this._onHover ( this.$wrapper, [this.$document, 'keydown', this.__keydown] );

    }

    /* API */

    api ( method, ...args ) {

      return this._api[method]( ...args );

    }

    page ( nr, rowNr ) { // nr and rowNr are 0-index numbers

      let page = _.isNumber ( nr ) && !_.isNaN ( nr ) ? nr : Math.floor ( rowNr / this.$length.val () );

      if ( _.isNaN ( page ) ) return this.api ( 'page' );

      this.api ( 'page', page );
      this.api ( 'draw', false );

    }

  }

  /* FACTORY */

  Factory.init ( DT, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.DataTable ));
