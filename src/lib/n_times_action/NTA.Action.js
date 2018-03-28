
// @require ./NTA.Group.js
// @require core/svelto/svelto.js

(function ( $, _, Svelto, NTA ) {

  /* ACTION */

  class Action {

    constructor ( options ) {

      this.group = new NTA.Group ({ name: options.group, cookie: options.cookie });
      this.name = options.name;
      this.expiry = options.expiry;

    }

    get () {

      return this.group.get ( this.name );

    }

    set ( times, expiry ) {

      this.group.set ( this.name, times, expiry || this.expiry );

    }

    remove () {

      this.group.remove ( this.name );

    }

  }

  /* BINDING */

  NTA.Action = Action;

}( Svelto.$, Svelto._, Svelto, Svelto.NTA ));
