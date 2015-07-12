
/* TAGBOX */

//TODO: add support for non latin characters, I mean maybe forbid them and replace them with the latin equivalent
//FIXME: the partial field is too tall
//TODO: more explicative noty messages, like :you cannot use the tag 'something' again
//FIXME: se si entra una tag con tab poi non si e' in focus nel $partial

;(function ( $, window, document, undefined ) {

    'use strict';

    /* TAGBOX */

    $.widget ( 'presto.tagbox', {

        /* TEMPLATES */

        templates: {
            tag: '<div class="tag button {%=(o.color ? o.color : "")%} {%=(o.size ? o.size : "")%} {%=(o.css ? o.css : "")%}">' +
                     '<div class="button-center">' +
                         '{%=o.str%}' +
                     '</div>' +
                     '<div class="button-right actionable close">x</div>' +
                 '</div>'
        },

        /* OPTIONS */

        options: {
            tags: {
                str: '',
                arr: [],
                $nodes: $()
            },
            tag: {
                min_length: 3,
                color: '',
                size: 'small',
                css: 'outlined'
            },
            forbidden: [ '<', '>', ';', '`' ],
            separator: ',',
            sort: false,
            append: true,
            callbacks: {
                tag_added: $.noop,
                tag_removed: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            var $inputs = this.$element.find ( 'input' );

            this.$input = $inputs.eq ( 0 );
            this.$partial = $inputs.eq ( 1 );

        },

        _init: function () {

            this._sanitize_tags_str ();

            var tags_html = this._get_tags_html ();

            this.$partial.before ( tags_html );

            this.options.tags.$nodes = this.$element.find ( '.tag' );

        },

        _events: function () {

            this._on ( this.$partial, 'keypress', this._handler_keypress ); //INFO: For printable characters

            this._on ( this.$partial, 'keydown', function ( event ) {

                if ( event.keyCode === $.ui.keyCode.TAB || event.keyCode === $.ui.keyCode.BACKSPACE || event.keyCode === $.ui.keyCode.DELETE ) {

                    this._handler_keypress ( event );

                }

            }); //INFO: For the others

            this._on ( this.$partial, 'paste', this._handler_paste );

            this._on ( 'click', this._handler_click_on_empty );

            this._on ( 'click', this._handler_click_on_close );

        },

        /* PRIVATE */

        _get_tags_html: function () {

            var tags_html = '';

            for ( var i = 0, l = this.options.tags.arr.length; i < l ; i++ ) {

                tags_html += this._get_tag_html ( this.options.tags.arr[i] );

            }

            return tags_html;

        },

        _get_tag_html: function ( tag_str ) {

            tag_str = this._sanitize_str ( tag_str );

            return this._tmpl ( 'tag', _.extend ( { str: tag_str }, this.options.tag ) );

        },

        _sanitize_tags_str: function () {

            var tags_arr = this.options.tags.str.split ( this.options.separator );

            this.options.tags.arr = [];

            for ( var n = 0; n < tags_arr.length; n++ ) {

                this.options.tags.arr[n] = this._sanitize_str ( tags_arr[n] );

            }

            if ( this.options.sort ) {

                this.options.tags.arr.sort ();

            }

            this.options.tags.str = this.options.tags.arr.join ( this.options.separator );

        },

        _sanitize_str: function ( string ) {

            return string.replace ( /[\n\r\t]/g, ' ' ).replace ( /\s+/g, ' ' );

        },

        _update_variables: function () {

            this.options.tags.$nodes = this.$element.find ( '.tag' );

            this.options.tags.arr = [];

            for ( var i = 0, l = this.options.tags.$nodes.length; i < l; i++ ) {

                this.options.tags.arr[i] = this.options.tags.$nodes.eq ( i ).find ( '.button-center' ).html ();

            }

            this.options.tags.str = this.options.tags.arr.join ( this.options.separator );

        },

        _update_input: function () {

            this.$input.val ( this.options.tags.str );

        },

        _clear_partial: function () {

            this._delay ( function () {

                this.$partial.val ( '' );

            });

        },

        _trim_partial: function () {

            this._delay ( function () {

                this.$partial.val ( _.trim ( this.$partial.val () ) );

            });

        },

        /* KEYPRESS */

        _handler_keypress: function ( event ) {

            var prev_value = this.$partial.val ();

            if ( event.keyCode === $.ui.keyCode.ENTER || event.keyCode === $.ui.keyCode.SPACE || event.keyCode === $.ui.keyCode.TAB || event.keyCode === this.options.separator.charCodeAt ( 0 ) ) {

                var added = this.add_tag ( this.$partial.val () );

                if ( added ) {

                    this._clear_partial ();

                } else {

                    this._delay ( function () {

                        this.$partial.val ( prev_value );

                    });

                }

                event.preventDefault ();
                event.stopImmediatePropagation ();

            } else if ( event.keyCode === $.ui.keyCode.BACKSPACE || event.keyCode === $.ui.keyCode.DELETE ) {

                if ( this.$partial.val ().length === 0 && this.options.tags.arr.length > 0 ) {

                    var $last = this.options.tags.$nodes.last ();
                    this.remove_tag ( $last, !event.ctrlKey );

                }

                event.preventDefault ();
                event.stopImmediatePropagation ();

            } else if ( this.options.forbidden.indexOf ( String.fromCharCode ( event.keyCode ) ) !== -1 ) {

                $.noty ( 'The character you entered is forbidden' );

               this._delay ( function () {

                    this.$partial.val ( prev_value );

                });

                event.preventDefault ();
                event.stopImmediatePropagation ();

            }

        },

        /* PASTE */

        _handler_paste: function ( event ) {

            this._delay ( function () {

                var new_tags = this.$partial.val ().split ( this.options.separator );

                for ( var i = 0; i < new_tags.length; i++ ) {

                    this.add_tag ( new_tags[i] );

                }

                this._clear_partial ();

            });

        },

        /* CLICK ON CLOSE */

        _handler_click_on_close: function ( event ) {

            var $target = $(event.target);

            if ( $target.is ( '.close ') ) {

                var $tag = $target.parent ();

                this.remove_tag ( $tag );

            }

        },

        /* CLICK ON EMPTY */

        _handler_click_on_empty: function ( event ) {

            if ( this.$partial.get ( 0 ) !== document.activeElement && !$(event.target).is ( 'input, .tag, .button-center' ) ) {

                this.$partial.get ( 0 ).focus ();

            }

        },

        /* PUBLIC */

        add_tag: function ( tag_str ) {

            tag_str = this._sanitize_str ( tag_str );

            if ( tag_str.length < this.options.tag.min_length ) {

                if ( tag_str.length > 0 ) { // so it won't be triggered when the user presses enter and the $partial is empty

                    $.noty ( 'You cannot use tags shorter than ' + this.options.tag.min_length + ' characters' );

                    return false;

                }

            } else if ( this.options.tags.arr.indexOf ( tag_str ) !== -1 ) {

                $.noty ( 'You cannot use duplicate tags' );

                return false;

            } else {

                this.options.tags.arr.push ( tag_str );

                if ( this.options.sort ) {

                    this.options.tags.arr.sort ();

                }

                var tag_html = this._get_tag_html ( tag_str );

                if ( this.options.tags.$nodes.length === 0 || this.options.append ) {

                    this.$partial.before ( tag_html );

                } else {

                    var index = this.options.tags.arr.indexOf ( tag_str );

                    if ( index - 1 < 0 ) {

                        this.options.tags.$nodes.first ().before ( tag_html );

                    } else {

                        this.options.tags.$nodes.eq ( index - 1 ).after ( tag_html );

                    }

                }

                this._update_variables ();
                this._update_input ();

                return true;

            }

        },

        remove_tag: function ( $tag, edit ) {

            $tag.remove ();

            this._update_variables ();
            this._update_input ();

            if ( edit === true ) {

                var tag_str = $tag.find ( '.button-center' ).html ();

                this.$partial.val ( tag_str );

            }

        }

    });

    /* READY */

    $(function () {

        $('.tagbox').each ( function () {

            var $tagbox = $(this),
                $input = $tagbox.find ( 'input' ).eq ( 0 ),
                options = {
                    tags: {
                        str: $input.val () || ''
                    }
                };

            $tagbox.tagbox ( options );

        });

    });

}( lQuery, window, document ));
