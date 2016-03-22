
/* =========================================================================
 * Svelto - Tasks - Config - Defaults (Components)
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

// Object used for making partial buildings by filtering out unwanted components
// In the form of `component: enable`. A component's key can also be divided into sub objects, where each key is a component on its own; in this case the parent component will be assumed to be enabled
// Enabling/disabling is affected by component's key specificity. For instance `'widgets/form': false` will disable `widgets/form/ajax` too, but `'widgets/form/ajax': true` has an higher specificity and will enable it back

/* COMPONENTS */

var components = {
  _: true,
  core: {
    'lodash/vendor': false,
    'jquery/vendor': false
  },
  decorators: true,
  lib: true,
  widgets: {
    boilerplate: false
  }
};

/* EXPORT */

module.exports = components;
