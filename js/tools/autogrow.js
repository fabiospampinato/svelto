
/* AUTOGROW */

$.fn.autogrow = function () {

    var element_val_pxs = function ( $ele ) {

        var span_html = '<span id="test_span">' + $ele.val () + '</span>';

        $body.append ( span_html );

        var $span = $('#test_span');

        $span.css ({
            'position' : 'absolute',
            'left' : -9999,
            'top' : -9999,
            'font-family' : $ele.css ( 'font-family' ),
            'font-size' : $ele.css ( 'font-size' ),
            'font-weight' : $ele.css ( 'font-weight' ),
            'font-style' : $ele.css ( 'font-style' )
        });

        var result = $span.width ();

        $span.remove ();

        return result;

    };

    return this.each ( function ( node ) {

        var $ele = $(node),
            default_width = $ele.data ( 'default-width' ) || 0,
            default_height = $ele.data ( 'default-height' ) || 0,
            type = $ele.is ( 'input' ) ? 'input' : 'textarea',
            is_border_box = ( $ele.css ( 'box-sizing' ) === 'border-box' ),
            extra_pxs = is_border_box
                            ? type === 'input'
                                ? parseInt ( $ele.css ( 'border-left-width' ) ) + parseInt ( $ele.css ( 'padding-left' ) ) + parseInt ( $ele.css ( 'padding-right' ) ) + parseInt ( $ele.css ( 'border-right-width' ) )
                                : type === 'textarea'
                                    ? parseInt ( $ele.css ( 'border-top-width' ) ) + parseInt ( $ele.css ( 'padding-top' ) ) + parseInt ( $ele.css ( 'padding-bottom' ) ) + parseInt ( $ele.css ( 'border-bottom-width' ) )
                                    : 0
                            : 0;

        if ( type === 'input' ) { // increase the width

            var update_width = function () {

                var needed_width = element_val_pxs ( $ele ),
                    actual_width = $ele.width ();

                if ( needed_width > actual_width ) {

                    $ele.css ( 'width', needed_width + extra_pxs + 'px' );

                } else if ( actual_width > needed_width ) {

                    $ele.css ( 'width', Math.max ( needed_width, default_width ) + extra_pxs + 'px' );

                }

            };

            update_width ();

            $ele.on ( 'input change', update_width );

        } else if ( type === 'textarea' ) { // increase the height

            var update_height = function () {

                var actual_height = $ele.height (),
                    needed_height = $ele.css ( 'height', '1px' ).get ( 0 ).scrollHeight - parseInt ( $ele.css ( 'padding-top' ) ) - parseInt ( $ele.css ( 'padding-bottom' ) );

                if ( needed_height > actual_height ) {

                    $ele.css ( 'height', needed_height + extra_pxs + 'px' );

                } else if ( actual_height > needed_height ) {

                    $ele.css ( 'height', Math.max ( needed_height, default_height ) + extra_pxs + 'px' );

                } else {

                    $ele.css ( 'height', actual_height + extra_pxs + 'px' );

                }

            };

            update_height();

            $ele.on ( 'input change', update_height );

        }

    });

};

/* READY */

$.dom_ready ( function () {

    $('input.autogrow, textarea.autogrow').autogrow ();

});
