
/* =========================================================================
 * Svelto - Widgets - Popover - Targeters - Closer
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../popover.js
 * @require widgets/targeter/closer/closer.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'popoverCloser',
    plugin: true,
    selector: '.popover-closer',
    options: {
      widget: Widgets.Popover
    }
  };

  /* POPOVER CLOSER */

  class PopoverCloser extends Widgets.Closer {}

  /* FACTORY */

  Factory.init ( PopoverCloser, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
