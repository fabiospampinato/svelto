
/* REMOTE POPOVER 1 */

Router.route ( '/remote-popover-1', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      popover: '<div class="popover card">' +
                 '<div class="card-header">This is a remote popover!</div>' +
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

/* REMOTE POPOVER 2 */

Router.route ( '/remote-popover-2', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      popover: '<div class="popover card xs-8">' +
                 '<div class="card-header text-center">This is a remote popover!</div>' +
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

/* REMOTE POPOVER AUTOFOCUS */

Router.route ( '/remote-popover-autofocus', function () {

  this.response.end ( JSON.stringify ({
    popover: '<div class="container bordered popover">' +
               '<input class="bordered" autofocus>' +
             '</div>'
  }));

}, { where: 'server' });
