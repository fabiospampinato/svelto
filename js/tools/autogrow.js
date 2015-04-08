
/* AUTOGROW */

;(function ( $, window, document, undefined ) {

    $.factory ( 'autogrow', {

        default_width: 0,
        default_height: 0,
        onUpdate: $.noop

    }, {

        /* SPECIAL */

        init: function () {

            this.is_border_box = ( this.$ele.css ( 'box-sizing' ) === 'border-box' );

            this.is_input = this.$ele.is ( 'input' );
            this.is_textarea = this.$ele.is ( 'textarea' );

            if ( this.is_input ) {

                this._init_input ();

            } else if ( this.is_textarea ) {

                this._init_textarea ();
            }

        },

        ready: function () {

            $('input.autogrow, textarea.autogrow').autogrow ();

        },

        /* INPUT */

        _init_input: function () {

            this.extra_pxs = this.is_border_box ? parseFloat ( this.$node.css ( 'border-left-width' ) ) + parseFloat ( this.$node.css ( 'padding-left' ) ) + parseFloat ( this.$node.css ( 'padding-right' ) ) + parseFloat ( this.$node.css ( 'border-right-width' ) ) : 0;

            this._update_input_width ();

            this.$ele.on ( 'input change', this._update_input_width );

        },

        _update_input_width: function () {

            var needed_width = this._get_input_needed_width ( this.$node ),
                actual_width = this.$node.width ();

            if ( needed_width > actual_width ) {

                this.$node.width ( needed_width + this.extra_pxs );

            } else if ( actual_width > needed_width ) {

                this.$node.width ( Math.max ( needed_width, this.options.default_width ) + this.extra_pxs );

            }

            this.hook ( 'onUpdate' );

        },

        _get_input_needed_width: function () {

            var id = 'span_' + $.getUID ();

            $body.append ( '<span id="' + id + '">' + this.$node.val () + '</span>' );

            var $span = $('#' + id);

            $span.css ({
                'position' : 'absolute',
                'left' : -9999,
                'top' : -9999,
                'font-family' : this.$node.css ( 'font-family' ),
                'font-size' : this.$node.css ( 'font-size' ),
                'font-weight' : this.$node.css ( 'font-weight' ),
                'font-style' : this.$node.css ( 'font-style' )
            });

            var width = $span.width ();

            $span.remove ();

            return width;

        },

        /* TEXTAREA */

        _init_textarea: function () {

            this.extra_pxs = this.is_border_box ? parseFloat ( this.$node.css ( 'border-top-width' ) ) + parseFloat ( this.$node.css ( 'padding-top' ) ) + parseFloat ( this.$node.css ( 'padding-bottom' ) ) + parseFloat ( this.$node.css ( 'border-bottom-width' ) ) : 0;

            this._update_textarea_height ();

            this.$ele.on ( 'input change', this._update_textarea_height );

        },

        _update_textarea_height: function () {

            var actual_height = this.$node.height (),
                needed_height = this.$node.height ( 1 ).get ( 0 ).scrollHeight - parseFloat ( this.$node.css ( 'padding-top' ) ) - parseFloat ( this.$node.css ( 'padding-bottom' ) );

            if ( needed_height > actual_height ) {

                this.$node.height ( needed_height + this.extra_pxs );

            } else if ( actual_height > needed_height ) {

                this.$node.height ( Math.max ( needed_height, this.options.default_height ) + this.extra_pxs );

            } else {

                this.$node.height ( actual_height + this.extra_pxs );

            }

            this.hook ( 'onUpdate' );

        },

        /* PUBLIC */

        update: function () {

            if ( this.is_input ) {

                this._update_input_width ();

            } else if ( this.is_textarea ) {

                this._update_textarea_height ();
            }

        }

    });

}( lQuery, window, document ));
