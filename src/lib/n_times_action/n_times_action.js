
/* =========================================================================
 * Svelto - Lib - N Times Action
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ./NTA.Action.js
 * @require ./NTA.Group.js
 * @require core/svelto/svelto.js
 * ========================================================================= */

(function ( $, _, Svelto, NTA ) {

  'use strict';

  /* DEFAULTS */

  let defaults = {
    group: 'nta', // The cookie name that holds the actions, a namespace for related actions basically
    action: false, // The action name
    times: Infinity, // The times an action can be executed
    expiry: false, // When a single action will expire and will then get removed from its group
    fn: false, // The function to execute
    cookie: { // Values that will get passed to `Cookie` when appropriate
      end: Infinity,
      path: undefined,
      domain: undefined,
      secure: undefined
    }
  };

  /* N TIMES ACTION */

  $.nTimesAction = function ( options ) {

    /* OPTIONS */

    options = _.merge ( {}, $.nTimesAction.defaults, options );

    /* N TIMES ACTION */

    if ( options.action ) {

      let action = new NTA.Action ({ group: options.group, name: options.action, expiry: options.expiry, cookie: options.cookie }),
          actionTimes = action.get ();

      /* EXECUTE */

      if ( options.fn && actionTimes < options.times ) {

        let returnValue = options.fn ( options.group, options.action, actionTimes + 1 );

        /* INCREMENT */

        if ( returnValue !== false ) {

          action.set ( actionTimes + 1 );

        }

      }

      return action;

    } else if ( options.group ) {

      return new NTA.Group ({ name: options.group, cookie: options.cookie });

    }

  };

  /* BINDING */

  $.nTimesAction.defaults = defaults;

}( Svelto.$, Svelto._, Svelto, Svelto.NTA ));
