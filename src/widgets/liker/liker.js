
/* =========================================================================
 * Svelto - Widgets - Liker
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require widgets/remote/reaction/reaction.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'liker',
    plugin: true,
    selector: '.liker',
    options: {
      likes: 0,
      dislikes: 0,
      datas: {
        likes: 'likes',
        dislikes: 'dislikes'
      },
      selectors: {
        like: '.like',
        dislike: '.dislike'
      }
    }
  };

  /* LIKER */

  class Liker extends Widgets.RemoteReaction {

    /* SPECIAL */

    _variables () {

      super._variables ();

      this.$like = this.$reaction.find ( this.options.selectors.like );
      this.$dislike = this.$reaction.find ( this.options.selectors.dislike );

    }

    _init () {

      this.options.likes = Number ( this.$like.data ( this.options.datas.likes ) ) || this.options.likes;
      this.options.dislikes = Number ( this.$dislike.data ( this.options.datas.dislikes ) ) || this.options.dislikes;

      super._init ();

    }

    _events () {

      this.___like ();
      this.___dislike ();

    }

    /* UPDATE */

    _update () {

      super._update ();

      this.$like.attr ( `data-${this.options.datas.likes}`, this.options.likes );
      this.$dislike.attr ( `data-${this.options.datas.dislikes}`, this.options.dislikes );

    }

    /* LIKE */

    ___like () {

      this._on ( this.$like, Pointer.tap, this.__like );

    }

    __like () {

      let action = this.options.state ? 'reset' : 'like';

      this[action]();

    }

    /* DISLIKE */

    ___dislike () {

      this._on ( this.$dislike, Pointer.tap, this.__dislike );

    }

    __dislike () {

      let action = this.options.state === false ? 'reset' : 'dislike';

      this[action]();

    }

    /* REQUEST CALLBACKS */

    _success ( resj ) {

      this.options.likes = resj.likes;
      this.options.dislikes = resj.dislikes;

      super._success ( resj );

    }

    /* API */

    get () {

      return _.pick ( this.options, ['likes', 'dislikes', 'state'] );

    }

    toggle ( force = !this.options.state ) {

      if ( !!force !== this.options.state ) {

        this.set ( !!force );

      }

    }

    like () {

      return this.set ( true );

    }

    dislike () {

      return this.set ( false );

    }

  }

  /* FACTORY */

  Factory.make ( Liker, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));
