
// @require ../init.js
// @require core/lodash/lodash.js
// @require core/shims/shims/requestAnimationFrame.js

// Pretty simple, lightweight, alternative of $.fn.animate implementing a subset of its functionalities
//FIXME: Doesn't work this css properties that don't accept pixel values

(function ( $, _ ) {

  /* DEFAULTS */

  const defaults = {
    easing: 'easeOutQuad',
    duration: 350,
    internals: {
      getProp: ( ele, prop ) => parseFloat ( getComputedStyle ( ele )[prop] ), //TODO: Precompute getComputedStyle maybe
      setProp: ( ele, prop, value ) => ele.style[prop] = `${value}px`
    },
    callbacks: {
      start: _.noop,
      tick: _.noop,
      end: _.noop
    }
  };

  /* ANIMATE */

  function animate ( eles, props, options ) {

    eles = _.castArray ( eles );
    options = _.merge ( {}, $.animate.defaults, options );

    let easing = $.animate.easings[options.easing],
        propsKeys = Object.keys ( props ),
        startTime = Date.now (),
        isStart = true,
        endedNr = 0;

    eles.forEach ( ele => {

      let startProps = {},
          deltaProps = {};

      propsKeys.forEach ( prop => {
        startProps[prop] = options.internals.getProp ( ele, prop );
        deltaProps[prop] = props[prop] - startProps[prop];
      });

      function tick () {

        /* START */

        if ( isStart ) {

          options.callbacks.start ();

          isStart = false;

        }

        /* TICK */

        let currTime = Date.now (),
            currDuration = Math.min ( options.duration, currTime - startTime );

        propsKeys.forEach ( prop => {

          let value = easing ( null, currDuration, startProps[prop], deltaProps[prop], options.duration );

          options.internals.setProp ( ele, prop, value );

        });

        options.callbacks.tick ();

        /* END */

        let isEnd = ( currDuration >= options.duration );

        if ( isEnd ) {

          endedNr += 1;

          if ( endedNr === eles.length ) {

            options.callbacks.end ();

          }

        } else {

          requestAnimationFrame ( tick );

        }

      }

      tick ();

    });

  }

  /* EASINGS */

  const easings = { // Any of the easings provided by http://gsgd.co.uk/sandbox/jquery/easing can be used
    easeInQuad ( x, t, b, c, d ) {
      return c * ( t /= d ) * t + b;
    },
    easeOutQuad ( x, t, b, c, d ) {
      return - c * ( t /= d ) * ( t - 2 ) + b;
    },
    easeInOutQuad ( x, t, b, c, d ) {
      if ( ( t /= d / 2 ) < 1 ) return c / 2 * t * t + b;
      return - c / 2 * ( ( --t ) * ( t - 2 ) - 1 ) + b;
    }
  };

  /* EXPORT */

  $.animate = animate;
  $.animate.defaults = defaults;
  $.animate.easings = easings;

}( window.__svelto_jquery, window.__svelto_lodash ));
