
/* =========================================================================
 * Svelto - N Times Action (Action) v0.1.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires NTA.Group.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* ACTION */

  var Action = function ( options ) {

    this.group = new Svelto.NTA.Group ( options.group );
    this.name = options.name;

  };

  /* METHODS */

  Action.prototype = {

    /* API */

    get: function () {

      return this.group.get ( this.name );

    },

    set: function ( times ) {

      this.group.set ( this.name, times );

    },

    reset: function () {

      this.group.reset ( this.name );

    }

  };

  /* BINDING */

  Svelto.NTA.Action = Action;

}( jQuery, _, window, document ));
