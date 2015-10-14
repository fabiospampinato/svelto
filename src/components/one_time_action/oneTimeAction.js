
/* =========================================================================
 * Svelto - One Time Action v0.3.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../n_times_action/nTimesAction.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* ONE TIME ACTION */

  $.oneTimeAction = function ( options ) {

    return $.nTimesAction ( _.merge ( { group: 'ota' }, options, { times: 1 } ) );

  };

}( jQuery, _, window, document ));
