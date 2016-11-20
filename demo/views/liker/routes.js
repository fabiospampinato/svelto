
/* LIKER - UPDATE */

Router.route ( '/liker-update', function () {

  let body = this.request.body,
      likes = Number ( body['current[likes]'] ),
      dislikes = Number ( body['current[dislikes]'] ),
      prevState = JSON.parse ( body['current[state]'] || null ),
      state = JSON.parse ( body.state || null );

  if ( state !== prevState ) {
    if ( state === true ) likes++;
    if ( state === false ) dislikes++;
    if ( prevState === true ) likes--;
    if ( prevState === false ) dislikes--;
  }

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({ likes, dislikes, state }) );

  }, 1000 );

}, { where: 'server' });

/* LIKER - STATE */

Router.route ( '/liker-state', function () {

  setTimeout ( () => {

    this.response.end ( JSON.stringify ({
      state: true
    }));

  }, 1000 );

}, { where: 'server' });
