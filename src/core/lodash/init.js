
/* =========================================================================
 * Svelto - lodash (Init)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

(function () {

  'use strict';

  /* LODASH */

  let _ = ( lodash && Number ( lodash.VERSION[0] ) === 3 ) ? lodash : ( ( _ && 'VERSION' in _ && Number ( _.VERSION[0] ) === 3 ) ? _ : false ); // Checking the version also in order to distinguish it from `underscore`

  /* CHECKING */

  if ( !_ ) {

    throw new Error ( 'Svelto depends upon lodash v3, dependency not found' );

  }

  /* EXPORT */

  window.lodash = _;

}());
