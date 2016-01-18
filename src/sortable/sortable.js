
/* =========================================================================
 * Svelto - Sortable
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * ========================================================================= */

//TODO: Better performance with tableHelper, just put the new addded row in the right position, performance boost
//TODO: Add support for sorting other things other than tables' rows

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'sortable',
    plugin: true,
    selector: 'table.sortable',
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
      datas: {
        sorter: 'sort',
        value: 'sort-value'
      },
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
    }
  };

  /* SORTABLE */

  class Sortable extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$table = this.$element;
      this.$headers = this.$table.find ( this.options.selectors.header );
      this.$sortables = this.$headers.filter ( this.options.selectors.sortable );
      this.$tbody = this.$table.find ( this.options.selectors.body );

      this.table = this.element;
      this.tbody = this.$tbody[0];

      this.sortData = {}; //INFO: Caching object for datas and references to rows
      this.isDirty = true;

      this.$currentSortable = false;
      this.currentIndex = false; //INFO: `$headers` index, not `$sortables` index
      this.currentDirection = false;

    }

    _init () {

      let $initial = this.$headers.filter ( '.' + this.options.classes.sort.asc + ', .' + this.options.classes.sort.desc ).first ();

      if ( $initial.length === 1 ) {

        this.sort ( this.$headers.index ( $initial ), ( $initial.hasClass ( this.options.classes.sort.asc ) ? 'asc' : 'desc' ) );

      }

    }

    _events () {

      /* CHANGE */

      this._on ( true, 'change', this.__change );

      /* TAP */

      this._on ( this.$sortables, Pointer.tap, this.__tap );

    }

    /* CHANGE */

    __change () {

      if ( this.currentIndex !== false ) {

        this.sortData = {};
        this.isDirty = true;

        this.sort ( this.currentIndex, this.currentDirection );

      }

    }

    /* CLICK */

    __tap ( event ) {

      let newIndex = this.$headers.index ( event.target ),
          newDirection = this.currentIndex === newIndex
                           ? this.currentDirection === 'asc'
                             ? 'desc'
                             : 'asc'
                           : 'asc';

      this.sort ( newIndex, newDirection );

    }

    /* SORT */

    sort ( index, direction ) {

      /* VALIDATE */

      let $sortable = this.$headers.eq ( index );

      if ( !$sortable.length ) return; //INFO: Bad index

      let sorterName = $sortable.data ( this.options.datas.sorter );

      if ( !sorterName ) return; //INFO: Unsortable column

      let sorter = this.options.sorters[sorterName];

      if ( !sorter ) return; //INFO: Unsupported sorter

      direction = ( direction && direction.toLowerCase () === 'desc' ) ? 'desc' : 'asc';

      /* CHECKING CACHED DATAS */

      if ( _.isUndefined ( this.sortData[index] ) || this.isDirty ) {

        /* VARIABLES */

        let $trs = this.$tbody.find ( this.options.selectors.notEmptyRow );

        this.sortData[index] = new Array ( $trs.length );

        /* POPULATE */

        for ( let i = 0, l = $trs.length; i < l; i++ ) {

          let $td = $trs.eq ( i ).find ( this.options.selectors.rowCell ).eq ( index ),
              value = $td.data ( this.options.datas.value ) || $td.text ();

          this.sortData[index][i] = [$trs[i], value];

        }

      }

      /* SORT */

      if ( index !== this.currentIndex || this.isDirty ) {

        this.sortData[index].sort ( function ( a, b ) {

          return sorter ( a[1], b[1] );

        });

      }

      /* REVERSING */

      let needReversing = false;

      if ( !this.isDirty && index === this.currentIndex && this.currentDirection !== false  ) {

        needReversing = ( direction !== this.currentDirection );

      } else {

        needReversing = ( direction === 'desc' );

      }

      if ( needReversing ) {

        this.sortData[index].reverse ();

      }

      /* REORDER */

      if ( index !== this.currentIndex || direction !== this.currentDirection || this.isDirty ) {

        this.table.removeChild ( this.tbody ); //INFO: Detach

        for ( let i = 0, l = this.sortData[index].length; i < l; i++ ) {

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

      this.isDirty = false;

      this.$currentSortable = $sortable;
      this.currentIndex = index;
      this.currentDirection = direction;

      /* TRIGGER */

      this._trigger ( 'sort', {
        index: this.currentIndex,
        direction: this.currentDirection
      });

    }

  }

  /* FACTORY */

  Factory.init ( Sortable, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));
