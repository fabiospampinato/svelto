
/* COMPONENTS */

let components = ['accordion', 'breadcrumb', 'button', 'card', 'carousel', 'centerer', 'chat', 'checkbox', 'colorpicker', 'container', 'datepicker', 'divider', 'draggable', 'dropdown', 'droppable', 'embedded', 'expander', 'flag', 'flickable', 'flippable', 'footer', 'form', 'fullscreen', 'header', 'icon', 'icons', 'image', 'infobar', 'input', 'label', 'modal', 'noty', 'overlay', 'pager', 'panel', 'parallax', 'placeholder', 'progressbar', 'radio', 'rater', 'remote_action', 'remote_modal', 'ripple', 'scroll', 'sections', 'select', 'selectable', 'shape', 'slider', 'sortable', 'spacer', 'spinner', 'statistic', 'stepper', 'switch', 'table', 'tabs', 'tagbox', 'textarea', 'time_ago', 'toolbar', 'tooltip', 'typography'];

for ( let component of components ) {

  Router.route ( '/widgets/' + component, {
    layoutTemplate: 'master',
    yieldRegions: {
      [component]: { to: 'content' }
    }
  });

  /* WIDGETIZE */

  if ( Meteor.isClient ) {

    Template[component].onRendered ( function () {

      $(document.body).widgetize ();

    });

  }

}
