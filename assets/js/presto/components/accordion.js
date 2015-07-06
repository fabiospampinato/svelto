
/* ACCORDION */

;(function ( $, window, document, undefined ) {

    'use strict';

    $.widget ( 'presto.accordion', {

        /* SPECIAL */

        _create: function () {

            this.$expanders = this.$element.children ( '.expander' );
            this.expanders_inst = [];

            for ( var i = 0, l = this.$expanders.length; i < l; i++ ) {

                this.expanders_inst[i] = this.$expanders.eq ( i ).expander ( 'instance' );

            }

            this._bind_open ();

        },

        /* OPEN */

        _bind_open: function () {

            this._on ( this.$expanders, 'expander:open', this._handler_open );

        },

        _handler_open: function ( event, data, node ) {

            for ( var i = 0, l = this.$expanders.length; i < l; i++ ) {

                if ( this.$expanders.nodes[i] !== node ) {

                    this.expanders_inst[i].close ();

                }

            }

        },

        /* PUBLIC */

        toggle: function ( index ) {

            this.expanders_inst[index].toggle ();

        },

        open: function ( index ) {

            this.expanders_inst[index].open ();

        },

        close: function ( index ) {

            this.expanders_inst[index].close ();

        }

    });

    /* READY */

    $(function () {

        $('.accordion').accordion ();

    });

}( lQuery, window, document ));
