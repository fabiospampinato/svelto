
/* AUTOGROW */

//TODO: make it more DRY

;(function ( $, window, document, undefined ) {

    'use strict';

    /* AUTOGROW */

    $.widget ( 'presto.autogrow', {

        /* OPTIONS */

        options: {
            default_width: 0,
            default_height: 0,
            callbacks: {
                update: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$growable = this.$element;

            this.is_border_box = ( this.$growable.css ( 'box-sizing' ) === 'border-box' ); //TODO: maybe only support border-box...

            this.is_input = this.$growable.is ( 'input' );
            this.is_textarea = this.$growable.is ( 'textarea' );

            this.extra_pxs = 0;

        },

        _init: function () {

            if ( this.is_border_box ) {

                var props = this.is_input
                                ? ['border-left-width', 'padding-left', 'padding-right', 'border-right-width']
                                : this.is_textarea
                                    ? ['border-top-width', 'padding-top', 'padding-bottom', 'border-bottom-width']
                                    : [];

                for ( var i = 0, l = props.length; i < l; i++ ) {

                    this.extra_pxs += parseFloat ( this.$growable.css ( props[i] ) );

                }

            }

            this.update ();

        },

        _events: function () {

            this._on ( 'input change', this.update );

        },

        /* INPUT */

        _update_input_width: function () {

            var needed_width = this._get_input_needed_width ( this.$growable ),
                actual_width = this.$growable.width ();

            if ( needed_width > actual_width ) {

                this.$growable.width ( needed_width + this.extra_pxs );

            } else if ( actual_width > needed_width ) {

                this.$growable.width ( Math.max ( needed_width, this.options.default_width ) + this.extra_pxs );

            }

        },

        _get_input_needed_width: function () {

            var $span = $( '<span>' + this.$growable.val () + '</span>' );

            $span.css ({
                'position' : 'absolute',
                'left' : -9999,
                'top' : -9999,
                'font-family' : this.$growable.css ( 'font-family' ),
                'font-size' : this.$growable.css ( 'font-size' ),
                'font-weight' : this.$growable.css ( 'font-weight' ),
                'font-style' : this.$growable.css ( 'font-style' )
            });

            $span.appendTo ( $body );

            var width = $span.width ();

            $span.remove ();

            return width;

        },

        /* TEXTAREA */

        _update_textarea_height: function () {

            var actual_height = this.$growable.height (),
                needed_height = this.$growable.height ( 1 ).get ( 0 ).scrollHeight - parseFloat ( this.$growable.css ( 'padding-top' ) ) - parseFloat ( this.$growable.css ( 'padding-bottom' ) );

            if ( needed_height > actual_height ) {

                this.$growable.height ( needed_height + this.extra_pxs );

            } else if ( actual_height > needed_height ) {

                this.$growable.height ( Math.max ( needed_height, this.options.default_height ) + this.extra_pxs );

            } else {

                this.$growable.height ( actual_height + this.extra_pxs );

            }

        },

        /* PUBLIC */

        update: function () {

            if ( this.is_input ) {

                this._update_input_width ();

                this._trigger ( 'update' );

            } else if ( this.is_textarea ) {

                this._update_textarea_height ();

                this._trigger ( 'update' );

            }

        }

    });

    /* READY */

    $(function () {

        $('input.autogrow, textarea.autogrow, .input-wrp.autogrow input, .textarea-wrp.autogrow textarea').autogrow ();

    });

}( lQuery, window, document ));
