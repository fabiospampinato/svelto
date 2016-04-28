
/* ACTION */

Router.route ( '/selectable-action/action', function () {

  setTimeout ( () => {

    let ids = this.request.body['ids[]'];

    ids = _.isArray ( ids ) ? ids.join ( ', ' ) : ids;

    this.response.end ( JSON.stringify ({
      msg: `Work performed on ids: ${ids}!`
    }));

  }, 1500 );

}, { where: 'server' });

/* MODAL */

Router.route ( '/selectable-action/modal', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      modal: '<form class="card modal xs-8">' +
               '<div class="card-header text-center">Selectable actions modal</div>' +
               '<div class="card-block">' +
                 '<div class="placeholder" style="width:95%; height:10px;"></div>' +
                 '<div class="placeholder" style="width:92%; height:10px;"></div>' +
                 '<div class="placeholder" style="width:100%; height:10px;"></div>' +
                 '<div class="placeholder" style="width:87%; height:10px;"></div>' +
                 '<div class="placeholder" style="width:97%; height:10px;"></div>' +
                 '<div class="placeholder" style="width:93%; height:10px;"></div>' +
                 '<div class="placeholder" style="width:97%; height:10px;"></div>' +
               '</div>' +
               '<div class="card-footer">Footer</div>' +
             '</form>'
    }));

  }, 1500 );

}, { where: 'server' });
