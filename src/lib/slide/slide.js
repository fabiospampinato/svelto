
// @require core/animations/animations.js
// @require lib/embedded_css/embedded_css.js

// CSS-based alternative methods for jQuery's
// It assumes the height/width will be `auto`, otherwise pure-CSS can be used for this

(function ( $, _, Svelto, Animations, EmbeddedCSS ) {

  /* DEFAULTS */

  const defaults = {
    duration: Animations.fast,
    axis: 'y',
    classes: {
      init: 'slide',
      noAnimations: 'no-animations',
      x: {
        beforeoff: 'slide-before-left',
        off: 'slide-left',
        beforeon: 'slide-before-right',
        on: 'slide-right'
      },
      y: {
        beforeoff: 'slide-before-up',
        off: 'slide-up',
        beforeon: 'slide-before-down',
        on: 'slide-down'
      }
    },
    callbacks: {
      start: _.noop,
      end: _.noop
    }
  };

  /* UTILITIES */

  function getDurationClass ( duration ) {

    const cls = `slide-${duration}`,
          selector = `.${cls}`;

    if ( !EmbeddedCSS.get ( selector ) ) {

      const seconds = duration / 1000;

      EmbeddedCSS.set ( selector, 'transition', `height ${seconds}s, width ${seconds}s, padding ${seconds}s, border-width ${seconds}s !important` );

    }

    return cls;

  }

  /* DIRECTIONS */

  $.fn.slideDown = function ( options ) {

    return this.slideToggle ( options, true, 'y' );

  };

  $.fn.slideUp = function ( options ) {

    return this.slideToggle ( options, false, 'y' );

  };

  $.fn.slideRight = function ( options ) {

    return this.slideToggle ( options, true, 'x' );

  };

  $.fn.slideLeft = function ( options ) {

    return this.slideToggle ( options, false, 'x' );

  };

  /* TOGGLE */

  $.fn.slideToggle = function ( options, force, axis ) {

    const ele = this[0];

    if ( !ele || ele._sliding ) return;

    options = _.merge ( {}, $.fn.slideToggle.defaults, options );
    _.extend ( options.classes, options.classes[axis || options.axis] );

    const dimension = ( axis || options.axis ) === 'x' ? 'width' : 'height';

    if ( _.isUndefined ( force ) ) {

      force = !this[dimension]();

    } else {

      if ( force !== !this[dimension]() ) return;

    }

    const status = force ? 'on' : 'off',
          oppositeStatus = force ? 'off' : 'on';

    if ( this.hasClass ( options.classes[status] ) ) return;

    ele._sliding = true;

    const durationCls = ( options.duration !== $.fn.slideToggle.defaults.duration ) ? getDurationClass ( options.duration ) : '';

    options.callbacks.start ();

    if ( force ) this.addClass ( options.classes.noAnimations ).removeClass ( options.classes.off ).addClass ( options.classes.on );

    this[dimension]( this[dimension]() ); // Fixing the dimension, can't animate from `auto`

    if ( force ) this.addClass ( options.classes.off ).removeClass ( options.classes.on );

    requestAnimationFrame ( () => {

      this.addClass ( options.classes.init ).addClass ( durationCls );

      if ( force ) this.removeClass ( options.classes.noAnimations );

      requestAnimationFrame ( () => {

        this.addClass ( options.classes[`before${status}`] ).removeClass ( options.classes[oppositeStatus] );

        this.one ( 'transitionend', () => {

          this.addClass ( options.classes[status] ).removeClass ( options.classes[`before${status}`] ).removeClass ( options.classes.init ).removeClass ( durationCls );

          this.css ( dimension, '' );

          delete ele._sliding;

          options.callbacks.end ();

        });

      });

    });

  };

  $.fn.slideToggle.defaults = defaults;

}( Svelto.$, Svelto._, Svelto, Svelto.Animations, Svelto.EmbeddedCSS ));
