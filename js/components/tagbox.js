
/* TAGBOX */

$.fn.tagbox = function ( options ) {

    options = _.merge ({
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
    }, options );

    return this.each ( function ( node ) {

        /* FUNCTIONS */

        var init_input = function () {

            var template = '<div id="tagbox_' + tagbox_id + '" class="container transparent no-padding"><div class="multiple">' + get_tags_html () + '<input value="" placeholder="' + options.input.placeholder + '" class="autogrow ' + options.input.theme + '" data-default-width="' + options.input.default_width + '" /></div></div>';

            $input.after ( template ).addClass ( 'hidden' );

        };

        var get_tags_html = function () {

            var value = $input.val (),
                tags_str = value.split ( options.separator ),
                tags_html = '';

            for ( var n = 0; n < tags_str.length; n++ ) {

                tags_str[n] = sanitize_str ( tags_str[n] );

            }

            if ( options.sort ) {

                tags_str.sort ();

            }

            for ( var n = 0; n < tags_str.length; n++ ) {

                tags_html += get_tag_html ( tags_str[n] );

            }

            return tags_html;

        };

        var get_tag_html = function ( tag_str ) {

            tag_str = sanitize_str ( tag_str );

            return '<div class="tag button ' + options.tag.theme + '"><div class="label">' + tag_str + '</div><div class="sub right actionable close">x</div></div>';

        };

        var sanitize_str = function ( string ) {

            return string.replace ( /[\n\r\t]/g, ' ' ).replace ( /\s+/g, ' ' );

        };

        var update_variables = function () {

            $tags = $tagbox.find ( '.tag' );

            tags_arr = [];

            $tags.each ( function ( node ) {

                var $tag = $(node),
                    $label = $tag.find ( '.label' );

                tags_arr.push ( $label.html () );

            });

        };

        var update_input = function () {

            $input.val ( tags_arr.join ( options.separator ) );

        };

        var add_tag = function ( tag_str, empty ) {

            tag_str = sanitize_str ( tag_str );

            if ( tag_str.length < options.tag.min_length ) {

                if ( tag_str.length > 0 ) { // so it won't be triggered when the user presses enter and the $partial is empty

                    noty ( 'You cannot use tags shorter than 3 characters' );

                }

            } else if ( _( tags_arr ).contains ( tag_str ) ) {

                noty ( 'You cannot use duplicate tags' );

            } else {

                var tag_html = get_tag_html ( tag_str );

                if ( $tags.size () === 0 || options.append ) {

                    $partial.before ( tag_html );

                } else {

                    var tags_ord_arr = tags_arr;

                    tags_ord_arr.push ( tag_str );
                    tags_ord_arr.sort ();

                    var index = tags_ord_arr.indexOf ( tag_str );

                    if ( index - 1 < 0 ) {

                        $tags.first ().before ( tag_html );

                    } else {

                        $tags.eq ( index - 1 ).after ( tag_html );

                    }

                }

                update_variables ();
                update_input ();

                if ( empty === true ) {

                    $partial.val ( '' );

                }

            }

        };

        var remove_tag = function ( $tag, edit ) {

            var $label = $tag.find ( '.label' ),
                tag_str = $label.html ();

            $tag.remove ();

            update_variables ();
            update_input ();

            if ( edit === true ) {

                $partial.val ( tag_str );

            }

        };

        /* VARIABLES */

        var $input = $(node),
            tagbox_id = $.get_uuid ();

        init_input ();

        var $tagbox = $('#tagbox_' + tagbox_id),
            $partial = $tagbox.find ( 'input' ),
            $tags = false,
            tags_arr = false;

        $partial.autogrow ();

        update_variables ();

        /* EVENTS */

        $partial.on ( 'keydown', function ( event ) { // writing inside the partial input

            switch ( event.keyCode ) {

                case 13: // enter
            //  case 32: // spacebar, if enabled actually disables tags with spaces inside of them
                case 188: // comma
                    add_tag ( $partial.val (), true );
                    event.preventDefault ();
                    event.stopImmediatePropagation ();
                    break;

                case 8: // backspace
                case 46: // del
                    if ( $partial.val ().length === 0 && $tags.size () > 0 ) {
                        var $last = $tags.last ();
                        remove_tag ( $last, !event.ctrlKey );
                        event.preventDefault ();
                        event.stopImmediatePropagation ();
                    }
                    break;

                default:
                    if ( _( options.forbidden ).contains ( event.key ) ) {
                        noty ( 'The character you entered is forbidden' );
                        event.preventDefault ();
                        event.stopImmediatePropagation ();
                    }
                    break;

            }

        });

        $partial.on ( 'paste', function ( event ) { // catching a paste, basically parsing the $partial.val () after the paste

            $.defer ( function () {

                var tags_str = $partial.val ().split ( options.separator );

                for ( var i = 0; i < tags_str.length; i++ ) {

                    add_tag ( tags_str[i], false );

                }

                $partial.val ( '' );

            });

        });

        $tagbox.on ( 'click', function ( event ) { // click on close button

            var $target = $(event.target);

            if ( $target.is ( '.close ') ) {

                var $tag = $target.parent ();

                remove_tag ( $tag );

            }

        });

        $tagbox.on ( 'click', function ( event ) { // focus on partial input when clicking on an empty space

            if ( $partial.get ( 0 ) !== document.activeElement && !$(event.target).is ( 'input, .label' ) ) {

                $partial.get ( 0 ).focus ();

            }

        });

    });

};

/* READY */

$.dom_ready ( function () {

    $('input.tagbox').tagbox ();

});
