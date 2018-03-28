
// @require core/svelto/svelto.js

(function ( $, _, Svelto ) {

  'use strict';

  /* WIDGET */

  let widget = {

    new ( Widget, element, options ) {

      return new Widget ( options, element );

    },

    is ( element, Widget, loose = false ) { // `loose` controls whether we strictly require an instance of it or just a selector match

      if ( loose && Widget.config.selector && $(element).is ( Widget.config.selector ) ) return true;

      return !!widget.get ( element, Widget, undefined, false );

    },

    get ( element, Widget, options, instanciate = true ) {

      return element[`_${Widget.config.name}`] || instanciate && widget.new ( Widget, element, options );

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
