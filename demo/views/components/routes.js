
/* COMPONENTS */

let components = ['grid', 'multiple', 'sections', 'typography', 'colors', 'helpers', 'helpers-responsive', 'highlight', 'outline', 'raisable', 'ripple', 'sizes', 'z-depths', 'breadcrumb', 'button', 'card', 'chat', 'container', 'divider', 'embedded', 'flags', 'footer', 'form', 'header', 'icons', 'image', 'input', 'label', 'pager', 'pagination', 'parallax', 'placeholder', 'shapes', 'spinner', 'statistic', 'table', 'textarea', 'toolbar', 'accordion', 'carousel', 'checkbox', 'colorpicker', 'datepicker', 'dropdown', 'expander', 'flippable', 'infobar', 'modal', 'panel', 'noty', 'overlay', 'progressbar', 'radio', 'rater', 'select', 'slider', 'spinner-overlay', 'stepper', 'switch', 'syntax', 'tabs', 'tagbox', 'tooltip', 'autogrow', 'blurred', 'browser', 'bteach', 'color', 'cookie', 'draggable', 'droppable', 'flickable', 'form-ajax', 'form-sync', 'form-validate', 'notification', 'n-times-action', 'one-time-action', 'pointer', 'positionate', 'remote-action', 'remote-modal', 'selectable', 'sortable', 'table-helper', 'time-ago', 'timer', 'touching'];

for ( let component of components ) {

  Router.route ( '/' + component, {
    layoutTemplate: 'master',
    yieldRegions: {
      [component]: { to: 'main' }
    }
  });

  /* WIDGETIZE */

  if ( Meteor.isClient ) {

    Template[component].onRendered ( function () {

      $(document.body).widgetize ();

    });

  }

}
