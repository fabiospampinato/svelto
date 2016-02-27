
/* COMPONENTS */

let components = ['actionable', 'animations', 'attached', 'blurred', 'border_radius', 'centered', 'colors', 'disabled', 'grid', 'hidden', 'highlighted', 'limited', 'order', 'outlined', 'raisable', 'sizes', 'z_depths'];

for ( let component of components ) {

  Router.route ( '/decorators/' + component, {
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
