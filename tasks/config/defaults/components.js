
/* =========================================================================
 * Svelto - Tasks - Config - Defaults (Components)
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

// Object used for making partial buildings by filtering out unwanted components
// In the form of `component: enable`. A component's key can also be divided into sub objects, where each key is a component on its own; in this case the parent component will be assumed to be enabled
// Enabling/disabling is affected by component's key specificity. For instance `'widgets/form': false` will disable `widgets/form/ajax` too, but `'widgets/form/ajax': true` has an higher specificity and will enable it back

/* COMPONENTS */

const components = {
  _: true,
  core: {
    'jquery/vendor': false,
    'lodash/vendor': false
  },
  decorators: true,
  lib: true,
  widgets: {
    boilerplate: false,
    'chart/vendor': false,
    'datatables/vendor': false
  }
};

/* EXPORT */

module.exports = components;
