
/* REMOTE MODAL 1 */

Router.route ( '/remote-modal-1', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      modal: '<form class="card modal xs-8">' +
               '<div class="card-header text-center">This is a remote modal!</div>' +
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

/* REMOTE MODAL 1 */

Router.route ( '/remote-modal-2', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      modal: '<div class="card modal xs-8">' +
               '<div class="card-header text-center">This is a remote modal!</div>' +
               '<div class="card-block">' +
                 '<div class="placeholder" style="width:95%; height:10px;"></div>' +
                 '<div class="placeholder" style="width:92%; height:10px;"></div>' +
                 '<div class="placeholder" style="width:100%; height:10px;"></div>' +
                 '<div class="placeholder" style="width:87%; height:10px;"></div>' +
                 '<div class="placeholder" style="width:97%; height:10px;"></div>' +
                 '<div class="placeholder" style="width:93%; height:10px;"></div>' +
                 '<div class="placeholder" style="width:97%; height:10px;"></div>' +
               '</div>' +
               '<div class="card-footer centerer">' +
                '<div class="button bordered ' + this.request.body.color + '">' + this.request.body.color.toUpperCase () + '</div>' +
               '</div>' +
             '</div>'
    }));

  }, 1500 );

}, { where: 'server' });

/* REMOTE MODAL FULLSCREEN */

Router.route ( '/remote-modal-fullscreen', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      modal: '<div class="card modal fullscreen">' +
                '<div class="card-header">' +
                  '<div class="multiple">' +
                    '<div class="spacer">This is a fullscreen remote modal!</div>' +
                    '<div class="button small modal-closer compact">' +
                      '<i class="icon">close</i>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
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
             '</div>'
    }));

  }, 1500 );

}, { where: 'server' });

/* REMOTE MODAL AUTOFOCUS */

Router.route ( '/remote-modal-autofocus', function () {

  this.response.end ( JSON.stringify ({
    modal: '<div class="container bordered modal xs-8">' +
             '<input class="bordered centered" autofocus>' +
           '</div>'
  }));

}, { where: 'server' });
