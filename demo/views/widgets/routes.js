
/* COMPONENTS */

let components = ['accordion', 'breadcrumb', 'button', 'card', 'carousel', 'centerer', 'chat', 'checkbox', 'colorpicker', 'container', 'datepicker', 'divider', 'draggable', 'dropdown', 'droppable', 'embedded', 'expander', 'figure', 'flag', 'flickable', 'flippable', 'footer', 'form', 'form_ajax', 'form_sync', 'form_validate', 'fullscreen', 'header', 'icon', 'icons', 'image', 'infobar', 'input', 'label', 'modal', 'noty', 'overlay', 'pager', 'pagination', 'panel', 'parallax', 'placeholder', 'progressbar', 'radio', 'rater', 'remote_action', 'remote_modal', 'ripple', 'scroll', 'sections', 'select', 'selectable', 'shape', 'slider', 'sortable', 'spacer', 'spinner', 'spinner_overlay', 'statistic', 'stepper', 'switch', 'table', 'tabs', 'tagbox', 'textarea', 'time_ago', 'toolbar', 'tooltip', 'typography'];

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
