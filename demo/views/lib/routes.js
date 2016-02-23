
/* COMPONENTS */

let components = ['bteach', 'color', 'fuzzy', 'n_times_action', 'notification', 'one_time_action', 'positionate', 'regexes', 'timer', 'touching', 'transform', 'validator'];

for ( let component of components ) {

  Router.route ( '/lib/' + component, {
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
