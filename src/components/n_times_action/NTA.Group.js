
/* =========================================================================
 * Svelto - N Times Action (Group)
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires ../cookie/cookie.js
 * ========================================================================= */

//TODO: Add support for cookie settable parameters

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    serializer: JSON.stringify,
    unserializer: JSON.parse
  };

  /* GROUP */

  class Group {

    constructor ( name ) {

      this.name = name;
      this.actions = config.unserializer ( $.cookie.get ( this.name ) || '{}' );

    }

    get ( action ) {

      return this.actions[action] || 0;

    }

    set ( action, times ) {

      times = Number ( times );

      if ( !_.isNaN ( times ) ) {

        if ( times === 0 ) {

          this.reset ( action );

        } else {

          this.actions[action] = times;

          this.update ();

        }

      }

    }

    update () {

      $.cookie.set ( this.name, config.serializer ( this.actions ), Infinity );

    }

    reset ( action ) {

      if ( action ) {

        delete this.actions[action];

        this.update ();

      } else {

        this.actions = {};

        $.cookie.remove ( this.name );

      }

    }

  }

  /* BINDING */

  Svelto.NTA = {};
  Svelto.NTA.Group = Group;
  Svelto.NTA.Group.config = config;

}( jQuery, _, window, document ));
