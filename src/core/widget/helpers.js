
/* =========================================================================
 * Svelto - Core - Widget (Helpers)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto ) {

  'use strict';

  /* WIDGET */

  let widget = {

    is ( element, Widget, loose = false ) { // `loose` controls whether we strictly require an instance of it or just a selector match

      if ( loose && Widget.config.selector && $(element).is ( Widget.config.selector ) ) return true;

      return !!widget.get ( element, Widget );

    },

    get ( element, Widget ) {

      return element[`_${Widget.config.name}`];

    },

    set ( element, instance ) {

      element[`_${instance.name}`] = instance;

    },

    remove ( element, instance ) { // Both widgets and instances can be passed

      let name = 'config' in instance ? instance.config.name : instance.name;

      delete element[`_${name}`];

    }

  }

  /* EXPORT */

  $.widget = widget;

}( Svelto.$, Svelto._, Svelto ));
