
/* SORTABLE */

//TODO: only do the minimum amount of changes, if a row is added we don't need to resort the whole table

;(function ( $, window, document, undefined ) {

    $.factory ( 'sortable', {

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

    }, {

        /* SPECIAL */

        init: function () {

            this.$headers = this.$node.find ( 'thead th' );
            this.$sortables = this.$headers.filter ( '[data-sort]' );
            this.$tbody = this.$node.find ( 'tbody' );

            this.$current_sortable = false;
            this.current_direction = false;

            this._bind_change ();
            this._bind_click ();

        },

        ready: function () {

            $('table.sortable').sortable ();

        },

        /* CHANGE */

        _bind_change: function () {

            this.$node.on ( 'change', this._handler_change );

        },

        _handler_change: function ( event ) {

            if ( this.$current_sortable ) {

                this._sort ( this.$current_sortable, this.current_direction );

            }

        },

        /* CLICK */

        _bind_click: function () {

            this.$sortables.on ( 'click', this._handler_click );

        },

        _handler_click: function ( event ) {

            var $sortable = $(this);

            this.current_direction = ( this.$current_sortable === $sortable )
                                    ? ( !this.current_direction || current_direction === 'desc' ) //FIXME: if !current_direction sortare o asc, o se giá é asc usare desc
                                        ? 'asc'
                                        : 'desc'
                                    : 'asc';

            this.$current_sortable = $sortable;

            _sort ( this.$current_sortable, this.current_direction );

        }

    });

}( lQuery, window, document ));
