
/* =========================================================================
 * Svelto - Widgets - Popover - Targeters - Toggler
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../popover.js
 * @require widgets/targeter/toggler/toggler.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'popoverToggler',
    plugin: true,
    selector: '.popover-toggler',
    options: {
      widget: Widgets.Popover
    }
  };

  /* POPOVER TOGGLER */

  class PopoverToggler extends Widgets.Toggler {}

  /* FACTORY */

  Factory.init ( PopoverToggler, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
