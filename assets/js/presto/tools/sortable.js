
/* SORTABLE */

//TODO: only do the minimum amount of changes, if a row is added we don't need to resort the whole table
//TODO: add support for tableHelper, just put the new addded row in the right position

;(function ( $, window, document, undefined ) {

    'use strict';

    /* SORTABLE */

    $.widget ( 'presto.sortable', {

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
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$table = this.$element;
            this.$headers = this.$table.find ( 'thead th' );
            this.$sortables = this.$headers.filter ( '[data-sort]' );
            this.$tbody = this.$table.find ( 'tbody' );

            this.table = this.element;
            this.tbody = this.$tbody.get ( 0 );

            this.current_index = false; // `$headers` index, not `$sortables` index
            this.current_direction = false;;

        },

        _init: function () {

            var $initial = this.$headers.filter ( '.asc, .desc' ).first ();

            if ( $initial.length ) {

                this.sort ( this.$headers.index ( $initial ), ( $initial.hasClass ( 'asc' ) ? 'asc' : 'desc' ) );

            }

        },

        _events: function () {

            this._on ( true, 'change', this._handler_change ); //TODO: update to support tableHelper

            this._on ( this.$sortables, 'click', this._handler_click );

        },

        /* CHANGE */

        _handler_change: function () {

            if ( this.current_index ) {

                this.sort ( this.current_index, this.current_direction );

            }

        },

        /* CLICK */

        _handler_click: function ( event ) {

            var new_index = this.$headers.index ( event.target ),
                new_direction = this.current_index === new_index
                                    ? this.current_direction === 'asc'
                                        ? 'desc'
                                        : 'asc'
                                    : 'asc';

            this.sort ( new_index, new_direction );

        },

        /* SORT */

        sort: function ( index, direction ) {

            // VALIDATE

            var $sortable = this.$headers.eq ( index );

            if ( !$sortable.length ) return; // bad index

            var sorter_name = $sortable.data ( 'sort' );

            if ( !sorter_name ) return; // unsortable column

            var sorter = this.options.sorters[sorter_name];

            if ( !sorter ) return;

            direction = ( direction && direction.toLowerCase () === 'desc' ) ? 'desc' : 'asc';

            // STYLE

            this.$sortables.removeClass ( 'asc desc' );
            $sortable.addClass ( direction );

            // VARIABLES

            var $trs = this.$tbody.find ( 'tr:not(.empty)' ),
                column = Array ( $trs.length );

            // POPULATE

            $trs.each ( function ( trs_index ) {

                var $td = $(this).find ( 'td' ).eq ( index ),
                    value = $td.data ( 'sort-value' ) || $td.html ();

                column[trs_index] = [this, value];

            });

            // SORT

            column.sort ( function ( a, b ) {

                return sorter ( a[1], b[1] );

            });

            if ( direction === 'desc' ) column.reverse ();

            // APPEND

            this.table.removeChild ( this.tbody ); // detach

            for ( var i = 0, l = column.length; i < l; i++ ) {

                this.tbody.appendChild ( column[i][0] ); // reorder

            }

            this.table.appendChild ( this.tbody ); // attach

            // UPDATE

            this.current_index = index;
            this.current_direction = direction;

            // TRIGGER

            this._trigger ( 'sort', {
                index: this.current_index,
                direction: this.current_direction
            });

        }

    });

    /* READY */

    $(function () {

        $('table.sortable').sortable ();

    });

}( lQuery, window, document ));
