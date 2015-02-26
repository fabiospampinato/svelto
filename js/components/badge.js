
/* BADGE */

$.fn.badge = function ( options ) {

    if ( typeof options === 'string' ) {

        options = {
            title: options
        };

    }

    options = _.merge ({
        title: false,
        type: false,
        style: false
    }, options );

    return this.each ( function ( node ) {

        var $ele = $(node),
            $badge_wrp = $ele.find ( '.badge_wrp' ),
            $badge = $badge_wrp.find ( '.badge' ),
            title = options.title || $ele.data ( 'badge' ),
            type = options.type || $ele.data ( 'badge-type' ) || 'floating',
            style = options.style || $ele.data ( 'badge-style' ) || ''; // all_colors, squared

        if ( !title || title === 0 || title === '0' ) title = '';

        if ( !type && type !== 'inline' && type !== 'floating' ) type = 'inline';

        if ( $badge.size () === 0 ) {

            $ele.append ( '<div class="badge_wrp ' + type + '"><div class="badge_subwrp"><div class="badge ' + style + '"></div></div></div>' );

            $badge_wrp = $ele.find ( '.badge_wrp' );
            $badge = $badge_wrp.find ( '.badge' );

        }

        if ( !$badge_wrp.hasClass ( type ) ) {

            $badge_wrp.toggleClass ( 'inline floating' );

        }

        if ( style ) {

            $badge.addClass ( style );

        }

        if ( title ) {

            $badge.html ( title );

        }

        var opening = title !== '';

        if ( opening ) {

            $badge_wrp.removeClass ( 'hidden' );

            $.defer ( function () {

                $badge_wrp.addClass ( 'active' );

            });

        } else {

            $badge_wrp.removeClass ( 'active' );

            $.defer ( function () {

                $badge_wrp.addClass ( 'hidden' );

            }, 150 );

        }

    });

};

/* READY */

$.dom_ready ( function () {

    $('[data-badge]').badge ();

});
