
/* TAGBOX */

;(function ( $, window, document, undefined ) {

    $.factory ( 'tagbox', {

        input: {
            default_width: '100',
            placeholder: 'New tag...',
            theme: 'transparent small'
        },
        tag: {
            min_length: 3,
            theme: 'outlined small'
        },
        forbidden: [ '<', '>', ';', '`' ],
        separator: ',',
        sort: false,
        append: true

    }, {

        /* SPECIAL */

        init: function () {

            this.tagbox_id = $.getUID ();

            var template = '<div id="tagbox_' + this.tagbox_id + '" class="container transparent no-padding"><div class="multiple">' + this._get_tags_html () + '<input value="" placeholder="' + this.options.input.placeholder + '" class="autogrow ' + this.options.input.theme + '" data-default-width="' + this.options.input.default_width + '" /></div></div>';

            this.$node.after ( template ).addClass ( 'hidden' );

            this.$tagbox = $('#tagbox_' + this.tagbox_id);
            this.$partial = this.$tagbox.find ( 'input' );
            this.$tags = false;
            this.tags_arr = false;

            this.$partial.autogrow ();

            this._update_variables ();

        },

        ready: function () {

            $('input.tagbox').tagbox ();

        },

        /* PRIVATE */

        _get_tags_html: function () {

            var value = this.$node.val (),
                tags_str = value.split ( this.options.separator ),
                tags_html = '';

            for ( var n = 0; n < tags_str.length; n++ ) {

                tags_str[n] = this._sanitize_str ( tags_str[n] );

            }

            if ( this.options.sort ) {

                tags_str.sort ();

            }

            for ( var n = 0; n < tags_str.length; n++ ) {

                tags_html += this._get_tag_html ( tags_str[n] );

            }

            return tags_html;

        },

        _get_tag_html: function ( tag_str ) {

            tag_str = this._sanitize_str ( tag_str );

            return '<div class="tag button ' + this.options.tag.theme + '"><div class="label">' + tag_str + '</div><div class="sub right actionable close">x</div></div>';

        },

        _sanitize_str: function ( string ) {

            return string.replace ( /[\n\r\t]/g, ' ' ).replace ( /\s+/g, ' ' );

        },

        _update_variables: function () {

            this.$tags = this.$tagbox.find ( '.tag' );

            this.tags_arr = [];

            for ( var i = 0, l = this.$tags.length; i < l; i++ ) {

                var $tag = this.$tags.nodes[i],
                    $label = $tag.find ( '.label' );

                this.tags_arr.push ( $label.html () );

            }

        },

        _update_input: function () {

            this.$node.val ( this.tags_arr.join ( this.options.separator ) );

        },

        /* KEYDOWN */

        _bind_keydown: function () {

            this.$partial.on ( 'keydown', this._handler_keydown );

        },

        _handler_keydown: function ( event ) {

            switch ( event.keyCode ) {

                case 13: // enter
            //  case 32: // spacebar, if enabled actually disables tags with spaces inside of them
                case 188: // comma
                    this.add_tag ( this.$partial.val (), true );
                    event.preventDefault ();
                    event.stopImmediatePropagation ();
                    break;

                case 8: // backspace
                case 46: // del
                    if ( this.$partial.val ().length === 0 && this.$tags.length > 0 ) {
                        var $last = this.$tags.last ();
                        this.remove_tag ( $last, !event.ctrlKey );
                        event.preventDefault ();
                        event.stopImmediatePropagation ();
                    }
                    break;

                default:
                    if ( this.options.forbidden.indexOf ( event.key ) !== -1 ) {
                        $.noty ( 'The character you entered is forbidden' );
                        event.preventDefault ();
                        event.stopImmediatePropagation ();
                    }
                    break;

            }

        },

        /* PASTE */

        _bind_paste: function () {

            this.$partial.on ( 'past', this._handler_paste );

        },

        _handler_paste: function ( event ) {

            // $.defer ( function () { //FIXME: it should be wrapped on defer

                var tags_str = this.$partial.val ().split ( this.options.separator );

                for ( var i = 0; i < tags_str.length; i++ ) {

                    this.add_tag ( tags_str[i], false );

                }

                this.$partial.val ( '' );

            // });

        },

        /* CLICK ON CLOSE */

        _bind_click_on_close: function () {

            this.$tagbox.on ( 'click', this._handler_click_on_close );

        },

        _handler_click_on_close: function ( event ) {

            var $target = $(event.target);

            if ( $target.is ( '.close ') ) {

                var $tag = $target.parent ();

                this.remove_tag ( $tag );

            }

        },

        /* CLICK ON EMPTY */

        _bind_click_on_empty: function () {

            this.$tagbox.on ( 'click', this._handler_click_on_empty );

        },

        _handler_click_on_empty: function ( event ) {

            if ( this.$partial.get ( 0 ) !== document.activeElement && !$(event.target).is ( 'input, .label' ) ) {

                this.$partial.get ( 0 ).focus ();

            }

        },

        /* PUBLIC */

        add_tag: function ( tag_str, empty ) {

            tag_str = this._sanitize_str ( tag_str );

            if ( tag_str.length < this.options.tag.min_length ) {

                if ( tag_str.length > 0 ) { // so it won't be triggered when the user presses enter and the $partial is empty

                    $.noty ( 'You cannot use tags shorter than 3 characters' );

                }

            } else if ( this.tags_arr.indexOf ( tag_str ) !== -1 ) {

                $.noty ( 'You cannot use duplicate tags' );

            } else {

                var tag_html = this._get_tag_html ( tag_str );

                if ( $tags.length === 0 || this.options.append ) {

                    this.$partial.before ( tag_html );

                } else {

                    var tags_ord_arr = tags_arr;

                    tags_ord_arr.push ( tag_str );
                    tags_ord_arr.sort ();

                    var index = tags_ord_arr.indexOf ( tag_str );

                    if ( index - 1 < 0 ) {

                        this.$tags.first ().before ( tag_html );

                    } else {

                        this.$tags.eq ( index - 1 ).after ( tag_html );

                    }

                }

                this.update_variables ();
                this.update_input ();

                if ( empty === true ) {

                    this.$partial.val ( '' );

                }

            }

        },

        remove_tag: function ( $tag, edit ) {

            var $label = $tag.find ( '.label' ),
                tag_str = $label.html ();

            $tag.remove ();

            this.update_variables ();
            this.update_input ();

            if ( edit === true ) {

                this.$partial.val ( tag_str );

            }

        }

    });

}( lQuery, window, document ));
