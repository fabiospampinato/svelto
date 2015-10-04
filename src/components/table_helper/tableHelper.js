
/* =========================================================================
 * Svelto - Table Helper v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* TABLE HELPER */

  $.factory ( 'svelto.tableHelper', {

    /* TEMPLATES */

    templates: {
      row: '<tr {%= ( o.id ? "class=" + o.id : "" ) %} >' +
             '{% for ( var i = 0, l = o.datas.length; i < l; i++ ) { %}' +
               '<td>' +
                 '{%=o.datas[i]%}' +
               '</td>' +
             '{% } %}' +
             '{% for ( var i = 0, l = o.missing; i < l; i++ ) { %}' +
               '<td></td>' +
             '{% } %}' +
           '</tr>'
    },

    /* OPTIONS */

    options: {
      rowIdPrefix: 'rid',
      selectors: {
        header: 'thead',
        body: 'tbody',
        headerCell: 'th',
        rowCell: 'td',
        emptyRow: 'tr.table-row-empty',
        notEmptyRow: 'tr:not(.table-row-empty)'
      },
      callbacks: {
        add: _.noop,
        update: _.noop,
        remove: _.noop,
        clear: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$table = this.$element;
      this.$header = this.$table.find ( this.options.selectors.header );
      this.$body = this.$table.find ( this.options.selectors.body );
      this.$headerCells = this.$header.find ( this.options.selectors.headerCell );
      this.$emptyRow = this.$body.find ( this.options.selectors.emptyRow );

      this.columnsNr = this.$headerCells.length;

    },

    _init: function () {

      this._checkEmpty ();

    },

    /* PRIVATE */

    _checkEmpty: function () {

      var hasNonEmptyRows = this.$body.find ( this.options.selectors.notEmptyRow ).length > 0;

      this.$emptyRow.toggleClass ( 'hidden', hasNonEmptyRows );

    },

    _getRowId: function ( id ) {

      return this.options.rowIdPrefix + '_' + this.guid + '_' + id;

    },

    /* PUBLIC */

    add: function ( id ) { //INFO: id, datas...

      var datas = _.tail ( arguments ),
          rowId = id ? this._getRowId ( id ) : false;

      if ( datas.length > 0 ) {

        if ( rowId && $( '.' + rowId ).length === 1 ) return this;

        var chunks = _.chunk ( datas, this.columnsNr ),
            $rows = $empty;

        for ( var ci = 0, cl = chunks.length; ci < cl; ci++ ) {

          var chunk = chunks[ci],
              rowHtml = this._tmpl ( 'row', { id: rowId, datas: chunk, missing: this.columnsNr - chunk.length } );

          $rows = $rows.add ( rowHtml );

        }

        this.$body.append ( $rows );

        this._checkEmpty ();

        this.$table.trigger ( 'change' );

        this._trigger ( 'add', {
          $rows: $rows
        });

      }

      return this;

    },

    update: function ( id ) { //INFO: id, datas...

      var datas = _.tail ( arguments ),
          $row = $( '.' + this._getRowId ( id ) );

      if ( datas.length > 0 && $row.length === 1 ) {

        var $rowCells = $row.find ( this.options.selectors.rowCell );

        for ( var i = 0, l = datas.length; i < l; i++ ) {

          if ( _.isString ( datas[i] ) ) {

            $rowCells.eq ( i ).html ( datas[i] );

          }

        }

        this.$table.trigger ( 'change' );

        this._trigger ( 'update', {
          $row: $row
        });

      }

      return this;

    },

    remove: function ( id ) {

      var $row = $( '.' + this._getRowId ( id ) );

      if ( $row.length === 1 ) {

        $row.remove ();

        this._checkEmpty ();

        this.$table.trigger ( 'change' );

        this._trigger ( 'remove', {
          $row: $row
        });

      }

      return this;

    },

    clear: function () {

      var $rows = this.$body.find ( this.options.selectors.notEmptyRow );

      if ( $rows.length > 0 ) {

        $rows.remove ();

        this._checkEmpty ();

        this.$table.trigger ( 'change' );

        this._trigger ( 'clear', {
          $rows: $rows
        });

      }

      return this;

    }

  });

  /* READY */

  $(function () {

    $('table.table').tableHelper ();

  });

}( jQuery, _, window, document ));
