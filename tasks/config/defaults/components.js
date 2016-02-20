
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
  core: true,
  decorators: {
    actionable: true,
    attached: true,
    blurred: true,
    border_radius: true,
    centered: true,
    colors: true,
    disabled: true,
    grid: true,
    hidden: true,
    highlighted: true,
    limited: true,
    order: true,
    outlined: true,
    raisable: true,
    sizes: true,
    z_depths: true
  },
  lib: {
    bteach: true,
    color: true,
    embedded_css: true,
    fuzzy: true,
    n_times_action: true,
    notification: true,
    one_time_action: true,
    positionate: true,
    regexes: true,
    timer: true,
    touching: true,
    transform: true,
    validator: true,
  },
  widgets: {
    accordion: true,
    boilerplate: false,
    breadcrumb: true,
    button: true,
    card: true,
    carousel: true,
    centerer: true,
    chat: true,
    checkbox: true,
    closer: true,
    colorpicker: true,
    container: true,
    datepicker: true,
    divider: true,
    draggable: true,
    dropdown: true,
    droppable: true,
    embedded: true,
    expander: true,
    flag: true,
    flickable: true,
    flippable: true,
    footer: true,
    form: true,
    fullscreen: true,
    header: true,
    icon: true,
    icons: true,
    image: true,
    infobar: true,
    input: true,
    label: true,
    modal: true,
    noty: true,
    opener: true,
    overlay: true,
    pager: true,
    panel: true,
    parallax: true,
    placeholder: true,
    prism: true,
    progressbar: true,
    radio: true,
    rater: true,
    remote: true,
    ripple: true,
    sections: true,
    select: true,
    selectable: true,
    shape: true,
    slider: true,
    sortable: true,
    spacer: true,
    spinner: true,
    statistic: true,
    stepper: true,
    switch: true,
    table: true,
    tabs: true,
    tagbox: true,
    targeter: true,
    textarea: true,
    time_ago: true,
    toggler: true,
    toolbar: true,
    tooltip: true,
    typography: true
  }
};

/* EXPORT */

module.exports = components;
