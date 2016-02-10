
/* HOME */

Router.route ( '/', {
  layoutTemplate: 'master',
  yieldRegions: {
    'homepage': { to: 'content' }
  }
});

/* WIDGETIZE */

if ( Meteor.isClient ) {

  Template.home.onRendered ( function () {

    $(document.body).widgetize ();

  });

}
