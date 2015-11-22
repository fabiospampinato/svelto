
/* =========================================================================
 * Svelto - One Time Action
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../n_times_action/n_times_action.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* ONE TIME ACTION */

  $.oneTimeAction = function ( options ) {

    return $.nTimesAction ( _.merge ( { group: 'ota' }, options, { times: 1 } ) );

  };

}( Svelto.$, Svelto._, window, document ));
