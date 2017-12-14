
/* REMOTE LOADER - TEXT */

Router.route ( '/remote-loader-text', function () {

  setTimeout ( () => {

    this.response.end ( '<span>Remote loaded content</span>' );

  }, 1500 );

}, { where: 'server' });

/* REMOTE LOADER - JSON */

Router.route ( '/remote-loader-json', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      html: '<span>JSON-loaded content</span>'
    }));

  }, 1500 );

}, { where: 'server' });

/* REMOTE LOADER - WIDGET */

Router.route ( '/remote-loader-widget', function () {

  setTimeout ( () => {

    this.response.end ( '<div class="button ripple ripple-primary">Rippable</div>' );

  }, 1500 );

}, { where: 'server' });

/* REMOTE LOADER - NO WRAP */

Router.route ( '/remote-loader-no-wrap', function () {

  setTimeout ( () => {

    this.response.end ( '<span>Not wrapped content</span>' );

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
      message: '<span>Error message...</span>'
    }));

  }, 1500 );

}, { where: 'server' });

/* REMOTE LOADER - SCROLL */

Router.route ( '/remote-loader-scroll', function () {

  this.response.end ( JSON.stringify ({
    message: '<span>Loaded!</span>'
  }));

}, { where: 'server' });

/* REMOTE LOADER - PRELOAD */

Router.route ( '/remote-loader-preload', function () {

  this.response.end ( JSON.stringify ({
    html: '<span>Preloaded!</span>'
  }));

}, { where: 'server' });

/* REMOTE LOADER - AUTOFOCUS */

Router.route ( '/remote-loader-autofocus', function () {

  this.response.end ( JSON.stringify ({
    html: '<input class="bordered" autofocus>'
  }));

}, { where: 'server' });


/* REMOTE LOADER - TARGET */

Router.route ( '/remote-loader-target', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      html: `
        <p class="ok">...remote loaded content...</p>
        <p class="ok">...that matches the selector</p>
        <p>I don't match the selector</p>
      `
    }));

  }, 1500 );

}, { where: 'server' });
