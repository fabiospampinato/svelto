
/* SUBSCRIBER - UPDATE */

Router.route ( '/subscriber-update', function () {

  let body = this.request.body,
      counter = Number ( body['current[counter]'] ),
      prevState = JSON.parse ( body['current[state]'] || null ),
      state = JSON.parse ( body.state || null );

  if ( state !== prevState ) {
    if ( state === true ) counter++;
    if ( prevState === true ) counter--;
  }

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({ counter, state }) );

  }, 1000 );

}, { where: 'server' });

/* SUBSCRIBER - STATE */

Router.route ( '/subscriber-state', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      state: true
    }));

  }, 1000 );

}, { where: 'server' });
