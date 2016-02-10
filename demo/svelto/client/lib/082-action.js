
/* =========================================================================
 * Svelto - Remote - Action
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote.js
 * @require ../../noty/noty.js
 * ========================================================================= */

//TODO: Add locking capabilities (Disable the ability to trigger the same action multiple times simultaneously)

//FIXME: Not well written
//FIXME: Clicking an error/success noty doesn't close it

(function ( $, _, Svelto, Widgets, Factory ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remoteAction',
    options: {
      closingDelay: Widgets.Noty.config.options.ttl / 2,
      ajax: {
        cache: false,
        method: 'POST'
      },
      confirmation: { // Options to pass to a confirmation noty, if falsy or `buttons.length === 0` we won't ask for confirmation. If a button as `isConfirmative` it will be used for confirmation, otherwise the last one will be picked
        body: 'Execute action?',
        buttons: [{
          text: 'Cancel'
        }, {
          text: 'Execute',
          color: 'secondary',
          isConfirmative: true
        }]
      },
      messages: {
        error: 'An error occurred, please try again later',
        success: 'The action has been executed'
      },
      classes: {
        spinner: {
          color: 'white',
          size: 'small',
          css: '',
        }
      }
    }
  };

  /* REMOTE ACTION */

  class RemoteAction extends Widgets.Remote {

    /* NOTY */

    ___confirmationNoty () {

      if ( this.$noty ) return;

      /* VARIABLES */

      let options = _.cloneDeep ( this.options.confirmation ),
          index = _.findIndex ( options.buttons, 'isConfirmative' ),
          button = ( index >= 0 ) ? options.buttons[index] : _.last ( options.buttons );

      /* ON CLICK */

      button.onClick = function () {
        this.request ( true );
        return false;
      }.bind ( this );

      /* OPENING */

      this._replaceNoty ( options );

    }

    ___loadingNoty () {

      this._replaceNoty ( '<svg class="spinner ' + this.options.classes.spinner.color + ' ' + this.options.classes.spinner.size + ' ' + this.options.classes.spinner.css + '"><circle cx="1.625em" cy="1.625em" r="1.25em"></svg>' );

    }

    _replaceNoty ( options ) {

      let instance = $.noty ( _.isString ( options ) ? { body: options, autoplay: false } : _.extend ( {}, options, { autoplay: false } ) );

      instance.close ();

      let $noty = instance.$element;

      if ( this.$noty ) {

        this.$noty.html ( $noty.html () ).widgetize ();

      } else {

        this.$noty = $noty;

        this.$noty.noty ( 'open' );

      }

    }

    _destroyNoty ( delay ) {

      if ( !this.$noty ) return;

      this._delay ( function () {

        this.$noty.noty ( 'close' );

        this._delay ( function () {

          this.$noty.remove ();

          this.$noty = false;

        }, Widgets.Noty.config.options.animations.close );

      }, delay ? this.options.closingDelay : 0 );

    }

    /* REQUEST HANDLERS */

    __beforesend ( res ) {

      if ( this.isAborted () ) return;

      this.___loadingNoty ();

      super.__beforesend ( res );

    }

    __error ( res ) {

      if ( this.isAborted () ) return;

      let resj = _.attempt ( JSON.parse, res );

      this._replaceNoty ( _.isError ( resj ) || !('msg' in resj) ? this.options.messages.error : resj.msg );

      this._destroyNoty ( true );

      super.__error ( res );

    }

    __success ( res ) {

      if ( this.isAborted () ) return;

      let resj = _.attempt ( JSON.parse, res );

      if ( _.isError ( resj ) ) {

        return this.__error ( res );

      } else {

        this._replaceNoty ( 'msg' in resj ? resj.msg : this.options.messages.success );
        this._destroyNoty ( true );

        super.__success ( res );

      }

    }

    /* API OVERRIDES */

    request ( _confirmation ) {

      if ( !_confirmation && this.options.confirmation && 'buttons' in this.options.confirmation && this.options.confirmation.buttons.length ) {

        this.___confirmationNoty ();

      } else {

        super.request ();

      }

    }

    abort () {

      this._destroyNoty ();

      super.abort ();

    }

  }

  /* FACTORY */

  Factory.init ( RemoteAction, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory ));
