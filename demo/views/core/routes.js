
/* COMPONENTS */

let components = ['browser', 'cookie', 'gutter', 'layout', 'multiple'];

for ( let component of components ) {

  Router.route ( '/core/' + component, {
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
