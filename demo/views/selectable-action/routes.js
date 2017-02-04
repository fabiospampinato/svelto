
/* UTILITIES */

function getIds ( request ) {

  let ids = request.body['ids[]'];

  return _.isArray ( ids ) ? ids.join ( ', ' ) : ids;

}

/* ACTION */

Router.route ( '/selectable-action-action', function () {

  setTimeout ( () => {

    let ids = getIds ( this.request );

    this.response.end ( JSON.stringify ({
      message: `Rows ids: ${ids}`
    }));

  }, 1500 );

}, { where: 'server' });

/* MODAL */

Router.route ( '/selectable-action-modal', function () {

  setTimeout ( () => {

    let ids = getIds ( this.request );

    this.response.end ( JSON.stringify ({
      modal: `<div class="modal container">Rows ids: ${ids}</div>`
    }));

  }, 1500 );

}, { where: 'server' });

/* PANEL */

Router.route ( '/selectable-action-panel', function () {

  setTimeout ( () => {

    let ids = getIds ( this.request );

    this.response.end ( JSON.stringify ({
      panel: `<div class="panel container">Rows ids: ${ids}</div>`
    }));

  }, 1500 );

}, { where: 'server' });

/* POPOVER */

Router.route ( '/selectable-action-popover', function () {

  setTimeout ( () => {

    let ids = getIds ( this.request );

    this.response.end ( JSON.stringify ({
      popover: `<div class="popover container">Rows ids: ${ids}</div>`
    }));

  }, 1500 );

}, { where: 'server' });
