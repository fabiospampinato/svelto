
/* =========================================================================
 * Svelto - N Times Action
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires NTA.Action.js
 * ========================================================================= */

//TODO: Add an action expiry parameter, so that we can run an action N times during a range of period, like once a week, once a month and so on

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* N TIMES ACTION */

  $.nTimesAction = function ( options ) {

    /* OPTIONS */

    options = _.merge ({
      group: 'nta', //INFO: The cookie name that holds the actions, a namespace for related actions basically
      action: false, //INFO: The action name
      times: Infinity, //INFO: The times an action can be executed
      fn: false //INFO: The function to execute
    }, options );

    /* NORMALIZING TIMES */

    options.times = Number(options.times);

    if ( _.isNaN ( options.times ) ) {

      options.times = 0;

    }

    /* N TIMES ACTION */

    if ( options.action ) {

      let action = new Svelto.NTA.Action ({ group: options.group, name: options.action }),
          actionTimes = action.get ();

      if ( options.fn && actionTimes < options.times ) {

        let value = options.fn ( options.group, options.action, actionTimes + 1 );

        if ( value !== false ) {

          action.set ( actionTimes + 1 );

        }

      }

      return action;

    } else if ( options.group ) {

      return new Svelto.NTA.Group ( options.group );

    }

  };

}( jQuery, _, window, document ));
