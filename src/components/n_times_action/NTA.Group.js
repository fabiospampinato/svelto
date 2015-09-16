
/* =========================================================================
 * Svelto - N Times Action (Group) v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../cookie/cookie.js
 * ========================================================================= */

//TODO: Add support for cookie settable parameters

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* GROUP */

  var Group = function ( name ) {

    this.name = name;
    this.actions = this.unserialize ( $.cookie.get ( this.name ) || '{}' );

  };

  /* METHODS */

  Group.prototype = {

    /* SERIALIZER */

    serialize: JSON.stringify,

    unserialize: JSON.parse,

    /* API */

    get: function ( action ) {

      return this.actions[action] || 0;

    },

    set: function ( action, times ) {

      times = Number(times);

      if ( !_.isNaN ( times ) ) {

        if ( times === 0 ) {

          this.reset ( action );

        } else {

          this.actions[action] = times;

          this.update ();

        }

      }

    },

    update: function () {

      $.cookie.set ( this.name, this.serialize ( this.actions ), Infinity );

    },

    reset: function ( action ) {

      if ( action ) {

        delete this.actions[action];

        this.update ();

      } else {

        this.actions = {};

        $.cookie.remove ( this.name );

      }

    }

  };

  /* BINDING */

  Svelto.NTA = {
    Group: Group
  };

}( jQuery, _, window, document ));
