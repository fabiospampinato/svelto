
/* HOME */

Router.route ( '/', {
  layoutTemplate: 'master',
  yieldRegions: {
    'homepage': { to: 'content' }
  }
});

/* WIDGETIZE */

if ( Meteor.isClient ) {

  Template.homepage.onRendered ( function () {

    $(document.body).widgetize ();

  });

}
