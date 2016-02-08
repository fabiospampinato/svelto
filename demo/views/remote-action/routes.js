
/* REMOTE ACTION 1 */

Router.route ( '/remote-action-1', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      msg: 'Task accomplished Master!'
    }));

  }, 1500 );

}, { where: 'server' });

/* REMOTE MODAL 1 */

Router.route ( '/remote-action-2', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      msg: 'Color: `' + this.request.body.color + '`'
    }));

  }, 1500 );

}, { where: 'server' });
