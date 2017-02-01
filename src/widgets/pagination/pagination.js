
/* =========================================================================
 * Svelto - Widgets - Pagination
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require widgets/pager/pager.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'pagination',
    plugin: true,
    selector: '.pagination'
  };

  /* PAGINATION */

  class Pagination extends Widgets.Pager {}

  /* FACTORY */

  Factory.make ( Pagination, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
