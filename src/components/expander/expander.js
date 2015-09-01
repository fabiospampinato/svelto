
/* EXPANDER */

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* EXPANDER */

    $.widget ( 'presto.expander', {

        /* OPTIONS */

        options: {
            selectors: {
                toggler: '.expander-toggler',
                content: '.container-content'
            },
            delay: {
                open: 250,
                close: 250
            },
            callbacks: {
                open: _.noop,
                close: _.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$expander = this.$element;
            this.$content = this.$expander.find ( this.options.selectors.content );

            this.opened = false;

        },

        _init: function () {

            if ( this.$expander.hasClass ( 'opened' ) ) {

                this.open ();

            }

        },

        _events: function () {

            this._on ( 'click', this.options.selectors.toggler, this.toggle );

        },

        /* PUBLIC */

        toggle: function ( force ) {

            if ( !_.isBoolean ( force ) ) {

                force = !this.opened;

            }

            if ( force !== this.opened ) {

                this.opened = force;

                this.$expander.toggleClass ( 'opened', this.opened );

                this.$content[this.opened ? 'slideDown' : 'slideUp']( this.options.delay.close ); //FIXME: the animation is too expensive

                this._trigger ( this.opened ? 'open' : 'close' );

            }

        },

        open: function () {

            this.toggle ( true );

        },

        close: function () {

            this.toggle ( false);

        }

    });

    /* READY */

    $(function () {

        $('.expander').expander ();

    });

}( jQuery, _, window, document ));
