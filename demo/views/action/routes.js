
/* ACTION */

Router.route ( '/action-action', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      message: `This is an action`
    }));

  }, 1500 );

}, { where: 'server' });

/* MODAL */

Router.route ( '/action-modal', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      modal: `<div class="modal container">This is a modal</div>`
    }));

  }, 1500 );

}, { where: 'server' });

/* PANEL */

Router.route ( '/action-panel', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      panel: `<div class="panel container">This is a panel</div>`
    }));

  }, 1500 );

}, { where: 'server' });

/* POPOVER */

Router.route ( '/action-popover', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      popover: `<div class="popover container">This is a popover</div>`
    }));

  }, 1500 );

}, { where: 'server' });
