
/* COMPONENTS */

let components = ['border', 'clearfix', 'display', 'flexbox', 'flip', 'float', 'margin', 'overflow', 'padding', 'rotation', 'screen_reader', 'text', 'visibility'];

for ( let component of components ) {

  Router.route ( '/_/' + component, {
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
