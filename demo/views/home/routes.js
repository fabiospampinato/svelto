
/* HOME */

Router.route ( '/', {
  layoutTemplate: 'master',
  yieldRegions: {
    'home': { to: 'main' }
  }
});

/* WIDGETIZE */

if ( Meteor.isClient ) {

  Template.home.onRendered ( function () {

    $(document.body).widgetize ();

  });

}
