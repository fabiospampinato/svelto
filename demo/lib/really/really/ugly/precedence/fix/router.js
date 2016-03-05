
SWRouter = {

  page ( template, uri ) {

    Router.route ( uri, {
      layoutTemplate: 'master',
      yieldRegions: {
        [template]: { to: 'content' }
      }
    });

    /* INIT */

    if ( Meteor.isClient ) {

      Template[template].onRendered ( function () {

        $(document.body).scrollTop ( 0 ).widgetize ();

      });

    }

  },

  pages ( templates, prefix = '/' ) {

    for ( let template of templates ) {

      this.page ( template, prefix + template );

    }

  }

};
