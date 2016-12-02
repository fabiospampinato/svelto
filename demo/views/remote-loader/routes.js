
/* REMOTE LOADER - TEXT */

Router.route ( '/remote-loader-text', function () {

  setTimeout ( () => {

    this.response.end ( 'Remote loaded content' );

  }, 1500 );

}, { where: 'server' });

/* REMOTE LOADER - JSON */

Router.route ( '/remote-loader-json', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      html: 'JSON-loaded content'
    }));

  }, 1500 );

}, { where: 'server' });

/* REMOTE LOADER - WIDGET */

Router.route ( '/remote-loader-widget', function () {

  setTimeout ( () => {

    this.response.end ( '<div class="button ripple ripple-primary">Rippable</div>' );

  }, 1500 );

}, { where: 'server' });

/* REMOTE LOADER - JSON (WRONG) */

Router.route ( '/remote-loader-json-wrong', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({}) );

  }, 1500 );

}, { where: 'server' });

/* REMOTE LOADER - JSON (MESSAGE) */

Router.route ( '/remote-loader-json-message', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      message: 'Error message...'
    }));

  }, 1500 );

}, { where: 'server' });

/* REMOTE LOADER - SCROLL */

Router.route ( '/remote-loader-scroll', function () {

  this.response.end ( JSON.stringify ({
    message: 'Loaded!'
  }));

}, { where: 'server' });

/* REMOTE LOADER - PRELOAD */

Router.route ( '/remote-loader-preload', function () {

  this.response.end ( JSON.stringify ({
    html: 'Preloaded!'
  }));

}, { where: 'server' });
