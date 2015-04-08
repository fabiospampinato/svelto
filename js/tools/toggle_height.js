
/* TOGGLE HEIGHT  */

;(function ( $, window, document, undefined ) {

    $.factory ( 'toggleHeight', {

        /* SPECIAL */

        init: function () {

            this.speed = parseFloat ( this.$node.css ( 'transition-duration' ) ) * 1000;

            this.$node.height ( this.$node.height () );

        },

        call: function ( force ) {

            this._toggle ( force );

        },

        /* PRIVATE */

        _is_visible: function () {

            return ( this.$node.height () !== 0 );

        },

        _get_actual_height: function () {

            var old_style = this.$node.attr ( 'style' ) || '';

            this.$node.css ( 'css-text', old_style + 'display:block;position:absolute;top:-99999px;height:auto;' );

            var actual_height = this.$node.height ();

            this.$node.css ( 'css-text', old_style );

            return actual_height;

        },

        _toggle: function ( force ) {

            if ( this._is_visible () || force === false ) {

                this.$node.defer ( function () {

                    this.height ( 0 );

                });

                this.$node.defer ( function () {

                    this.toggle ( false );

                }, this.speed || 0 );

            } else {

                this.$node.toggle ( true );

                var actual_height = this._get_actual_height ();

                this.$node.defer ( function () {

                    this.height ( actual_height );

                });

                this.$node.defer ( function () {

                    this.height ( 'auto' );

                }, this.speed );

            }

        }

    });

}( lQuery, window, document ));
