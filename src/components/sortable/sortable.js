
/* =========================================================================
 * Svelto - Sortable v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/factory.js
 * ========================================================================= */

//TODO: Add support for tableHelper, just put the new addded row in the right position, good performance gain here!
//TODO: Add support for sorting other things other than tables
//TODO: If possible sort using flexbox's `order` property

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* SORTABLE */

  $.factory ( 'svelto.sortable', {

    /* OPTIONS */

    options: {
      sorters: {
        int: function ( a, b ) {
          return parseInt ( a, 10 ) - parseInt ( b, 10 );
        },
        float: function ( a, b ) {
          return parseFloat ( a ) - parseFloat ( b );
        },
        string: function ( a, b ) {
          a = a.toLocaleLowerCase ();
          b = b.toLocaleLowerCase ();
          return a.localeCompare ( b );
        }
      },
      sortValue: 'sort-value',
      classes: {
        sort: {
          asc: 'sort-asc',
          desc: 'sort-desc'
        }
      },
      selectors: {
        header: 'thead th',
        sortable: '[data-sort]',
        body: 'tbody',
        notEmptyRow: 'tr:not(.table-row-empty)',
        rowCell: 'td'
      },
      callbacks: {
        sort: _.noop
      }
    },

    /* SPECIAL */

    _variables: function () {

      this.$table = this.$element;
      this.$headers = this.$table.find ( this.options.selectors.header );
      this.$sortables = this.$headers.filter ( this.options.selectors.sortable );
      this.$tbody = this.$table.find ( this.options.selectors.body );

      this.table = this.element;
      this.tbody = this.$tbody[0];

      this.sortData = {}; //INFO: Caching object for datas and references to rows
      this.updated = false;

      this.$currentSortable = false;
      this.currentIndex = false; //INFO: `$headers` index, not `$sortables` index
      this.currentDirection = false;

    },

    _init: function () {

      var $initial = this.$headers.filter ( '.' + this.options.classes.sort.asc + ', .' + this.options.classes.sort.desc ).first ();

      if ( $initial.length === 1 ) {

        this.sort ( this.$headers.index ( $initial ), ( $initial.hasClass ( this.options.classes.sort.asc ) ? 'asc' : 'desc' ) );

      }

    },

    _events: function () {

      /* CHANGE */

      this._on ( true, 'change', this.__change ); //TODO: Update to support tableHelper

      /* TAP */

      this._on ( this.$sortables, Pointer.tap, this.__tap );

    },

    /* CHANGE */

    __change: function () {

      if ( this.currentIndex !== false ) {

        this.sortData = {};
        this.updated = false;

        this.sort ( this.currentIndex, this.currentDirection );

      }

    },

    /* CLICK */

    __tap: function ( event ) {

      var newIndex = this.$headers.index ( event.target ),
          newDirection = this.currentIndex === newIndex
                           ? this.currentDirection === 'asc'
                             ? 'desc'
                             : 'asc'
                           : 'asc';

      this.sort ( newIndex, newDirection );

    },

    /* SORT */

    sort: function ( index, direction ) {

      /* VALIDATE */

      var $sortable = this.$headers.eq ( index );

      if ( !$sortable.length ) return; //INFO: Bad index

      var sorterName = $sortable.data ( 'sort' );

      if ( !sorterName ) return; //INFO: Unsortable column

      var sorter = this.options.sorters[sorterName];

      if ( !sorter ) return; //INFO: Unsupported sorter

      direction = ( direction && direction.toLowerCase () === 'desc' ) ? 'desc' : 'asc';

      /* CHECKING CACHED DATAS */

      if ( _.isUndefined ( this.sortData[index] ) || !this.updated ) {

        /* VARIABLES */

        var $trs = this.$tbody.find ( this.options.selectors.notEmptyRow );

        this.sortData[index] = Array ( $trs.length );

        /* POPULATE */

        for ( var i = 0, l = $trs.length; i < l; i++ ) {

          var $td = $trs.eq ( i ).find ( this.options.selectors.rowCell ).eq ( index ),
              value = $td.data ( this.options.sortValue ) || $td.text ();

          this.sortData[index][i] = [$trs[i], value];

        }

      }

      /* SORT */

      if ( index !== this.currentIndex || !this.updated ) {

        this.sortData[index].sort ( function ( a, b ) {

          return sorter ( a[1], b[1] );

        });

      }

      /* REVERSING */

      if ( this.updated && index === this.currentIndex && this.currentDirection !== false  ) {

        var needReversing = ( direction !== this.currentDirection );

      } else {

        var needReversing = ( direction === 'desc' );

      }

      if ( needReversing ) {

        this.sortData[index].reverse ();

      }

      /* REORDER */

      if ( index !== this.currentIndex || direction !== this.currentDirection || !this.updated ) {

        this.table.removeChild ( this.tbody ); //INFO: Detach

        for ( var i = 0, l = this.sortData[index].length; i < l; i++ ) {

          this.tbody.appendChild ( this.sortData[index][i][0] ); //INFO: Reorder

        }

        this.table.appendChild ( this.tbody ); //INFO: Attach

      }

      /* STYLE */

      if ( index !== this.currentIndex || direction !== this.currentDirection ) {

        if ( this.$currentSortable ) {

          this.$currentSortable.removeClass ( this.options.classes.sort[this.currentDirection] );

        }

        $sortable.addClass ( this.options.classes.sort[direction] );

      }

      /* UPDATE */

      this.updated = true;

      this.$currentSortable = $sortable;
      this.currentIndex = index;
      this.currentDirection = direction;

      /* TRIGGER */

      this._trigger ( 'sort', {
        index: this.currentIndex,
        direction: this.currentDirection
      });

    }

  });

  /* READY */

  $(function () {

    $('table.table.sortable').sortable ();

  });

}( jQuery, _, window, document ));
