
/* =========================================================================
 * Svelto - Widgets - Datatables - Pager
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../datatables.js
 * @require widgets/targeter/targeter.js
 * ========================================================================= */

//FIXME: Doesn't work with custom sorting

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'datatablesPager',
    plugin: true,
    selector: '.datatables-pager',
    options: {
      widget: Widgets.Dt,
      page: NaN, // The page to go to (higher priority than row number)
      row: NaN, // The row number to go to
      datas: {
        page: 'page',
        row: 'row'
      }
    }
  };

  /* DATATABLES PAGER */

  class DatatablesPager extends Widgets.Targeter {

    /* SPECIAL */

    _init () {

      let page = this.$element.data ( this.options.datas.page ),
          row = this.$element.data ( this.options.datas.row );

      this.options.page = _.isString ( page ) ? page : ( _.isNaN ( Number ( page ) ) ? this.options.page : Number ( page ) );
      this.options.row = _.isNaN ( Number ( row ) ) ? this.options.row : Number ( row );

    }

    _events () {

      this.___targetRemove ();
      this.___tap ();

    }

    /* TAP */

    ___tap () {

      this._on ( Pointer.tap, this.__tap );

    }

    __tap () {

      this.go ();

    }

    /* API */

    go ( page = this.options.page, row = this.options.row ) {

      this._targetInstance.page ( page, row );

    }

  }

  /* FACTORY */

  Factory.make ( DatatablesPager, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));
