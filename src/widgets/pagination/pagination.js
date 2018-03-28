
// @require widgets/pager/pager.js

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

  Factory.make ( Pagination, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
