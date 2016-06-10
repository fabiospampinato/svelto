
/* REMOTE ACTION 1 */

Router.route ( '/remote-action-1', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      msg: 'Task accomplished Master!'
    }));

  }, 1500 );

}, { where: 'server' });

/* REMOTE ACTION 2 */

Router.route ( '/remote-action-2', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      msg: 'Color: `' + this.request.body.color + '`'
    }));

  }, 1500 );

}, { where: 'server' });

/* REMOTE ACTION 3 */

Router.route ( '/remote-action-3', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      refresh: true
    }));

  }, 1500 );

}, { where: 'server' });

/* REMOTE ACTION 4 */

Router.route ( '/remote-action-4', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      url: 'http://www.google.com'
    }));

  }, 1500 );

}, { where: 'server' });
