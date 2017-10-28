
/* =========================================================================
 * Svelto - Core - jQuery - Helpers (Animate Prop)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./animate.js
 * ========================================================================= */

// Alternative flavor of $.animate that by default animates props instead of css props

(function ( $, _ ) {

  'use strict';

  /* DEFAULTS */

  const defaults = {
    internals: {
      getProp: ( ele, prop ) => parseFloat ( ele[prop] ),
      setProp: ( ele, prop, value ) => ele[prop] = value
    }
  };

  /* ANIMATE PROP */

  function animateProp ( eles, props, options ) {

    options = _.merge ( {}, $.animateProp.defaults, options );

    return $.animate ( eles, props, options );

  }

  /* EXPORT */

  $.animateProp = animateProp;
  $.animateProp.defaults = defaults;

}( window.__svelto_jquery, window.__svelto_lodash ));
