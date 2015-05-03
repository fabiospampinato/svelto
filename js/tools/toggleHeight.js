
/* TOGGLE HEIGHT  */

;(function ( $, window, document, undefined ) {

    'use strict';

    $.factory ( 'presto.toggleHeight', {

        /* SPECIAL */

        _create: function () {

            this.speed = parseFloat ( this.$element.css ( 'transition-duration' ) ) * 1000;

            this.$element.height ( this.$element.height () );

        },

        _init: function ( force ) { //FIXME

            this._toggle ( force );

        },

        /* PRIVATE */

        _is_visible: function () {

            return ( this.$element.height () !== 0 );

        },

        _get_actual_height: function () {

            var old_style = this.$element.attr ( 'style' ) || '';

            this.$element.css ( 'css-text', old_style + 'display:block;position:absolute;top:-99999px;height:auto;' );

            var actual_height = this.$element.height ();

            this.$element.css ( 'css-text', old_style );

            return actual_height;

        },

        _toggle: function ( force ) {

            if ( this._is_visible () || force === false ) {

                this.$element.defer ( function () {

                    this.height ( 0 );

                });

                this.$element.defer ( function () {

                    this.toggle ( false );

                }, this.speed || 0 );

            } else {

                this.$element.toggle ( true );

                var actual_height = this._get_actual_height ();

                this.$element.defer ( function () {

                    this.height ( actual_height );

                });

                this.$element.defer ( function () {

                    this.height ( 'auto' );

                }, this.speed );

            }

        }

    });

}( lQuery, window, document ));
