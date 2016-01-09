
/* =========================================================================
 * Svelto - N Times Action
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires NTA.Action.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* DEFAULT OPTIONS */

  let defaults = {
    group: 'nta', //INFO: The cookie name that holds the actions, a namespace for related actions basically
    action: false, //INFO: The action name
    times: Infinity, //INFO: The times an action can be executed
    expiry: false, //INFO: When a single action will expire and will then get removed from its group
    fn: false, //INFO: The function to execute
    cookie: { //INFO: Values that will get passed to `$.cookie` when appropriate
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

      let action = new Svelto.NTA.Action ({ group: options.group, name: options.action, expiry: options.expiry, cookie: options.cookie }),
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

      return new Svelto.NTA.Group ({ name: options.group, cookie: options.cookie });

    }

  };

  /* BINDING */

  $.nTimesAction.defaults = defaults;

}( Svelto.$, Svelto._, window, document ));
