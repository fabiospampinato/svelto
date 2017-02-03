
/* REMOTE PANEL - LEFT */

Router.route ( '/remote-panel-left', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      panel: '<div class="panel left container">Left</div>'
    }));

  }, 1500 );

}, { where: 'server' });

/* REMOTE PANEL - TOP */

Router.route ( '/remote-panel-top', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      panel: '<div class="panel top container">Top</div>'
    }));

  }, 1500 );

}, { where: 'server' });

/* REMOTE PANEL - BOTTOM */

Router.route ( '/remote-panel-bottom', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      panel: '<div class="panel bottom container">Bottom</div>'
    }));

  }, 1500 );

}, { where: 'server' });

/* REMOTE PANEL - RIGHT */

Router.route ( '/remote-panel-right', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      panel: '<div class="panel right container">Right</div>'
    }));

  }, 1500 );

}, { where: 'server' });

/* REMOTE PANEL - SLIM */

Router.route ( '/remote-panel-slim', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      panel: '<div class="panel bottom slim container">Slim</div>'
    }));

  }, 1500 );

}, { where: 'server' });

/* REMOTE PANEL - FULLSCREEN */

Router.route ( '/remote-panel-fullscreen', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      panel: '<div class="panel top fullscreen container">Fullscreen</div>'
    }));

  }, 1500 );

}, { where: 'server' });

/* REMOTE PANEL - PINNED */

Router.route ( '/remote-panel-pinned', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      panel: '<div class="panel left pinned container">Pinned</div>'
    }));

  }, 1500 );

}, { where: 'server' });
