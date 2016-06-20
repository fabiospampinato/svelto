
/* =========================================================================
 * Svelto - Widgets - Remote - Modal
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote.js
 * @require widgets/modal/modal.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

//TODO: Add locking capabilities, both at class-level and global-level (should be layout-level but seems impossible to implement)
//FIXME: Not well written

(function ( $, _, Svelto, Widgets, Factory, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remoteModal',
    options: {
      persistent: false, // Wether it should survive a change of page or not. Needed when used in frameworks like Meteor
      ajax: {
        cache: false,
        method: 'POST'
      },
      messages: {
        error: 'An error occurred, please try again later'
      },
      classes: {
        placeholder: 'remote-modal-placeholder',
        loaded: 'remote-modal-loaded',
        resizing: 'remote-modal-resizing',
        showing: 'remote-modal-showing'
      },
      animations: {
        resize: Animations.normal
      }
    }
  };

  /* REMOTE MODAL */

  class RemoteModal extends Widgets.Remote {

    /* PRIVATE */

    _getUrl () {

      return window.location.href.split ( '#' )[0];

    }

    /* PERSISTENT */

    ___persistent () {

      if ( !this.options.persistent ) {

        this.___route ();

      }

    }

    __route () {

      let currentUrl = this._getUrl ();

      if ( this._openUrl && this._openUrl !== currentUrl ) {

        this.abort ();

      }

    }

    /* MODAL */

    ___loadingModal () {

      /*
        <div class="modal ${this.options.classes.placeholder} card">
          <div class="card-block">
            <svg class="spinner">
              <circle cx="1.625em" cy="1.625em" r="1.25em">
            </svg>
          </div>
        </div>
      */

      this.$modal = $(`<div class="modal ${this.options.classes.placeholder} card"><div class="card-block"><svg class="spinner"><circle cx="1.625em" cy="1.625em" r="1.25em"></svg></div></div>`).appendTo ( this.$layout );

    }

    _destroyModal () {

      if ( !this.$modal ) return;

      this.$modal.modal ( 'close' );

      this._delay ( function () {

        if ( !this.$modal ) return;

        this.$modal.remove ();

        this.$modal = false;

      }, Widgets.Modal.config.options.animations.close );

    }

    /* ABORT */

    ___abort () {

      this._on ( true, this.$modal, 'modal:beforeclose', this.abort );

    }

    /* CLOSE */

    ___close () {

      this._on ( true, this.$modal, 'modal:close', this._destroyModal );

    }

    /* REQUEST HANDLERS */

    __beforesend ( res ) {

      if ( this.isAborted () ) return;

      this._defer ( function () {

        this._openUrl = this._getUrl ();

      });

      this.___persistent ();
      this.___loadingModal ();
      this.___abort ();

      this.$modal.modal ( 'open' );

      super.__beforesend ( res );

    }

    __error ( res ) {

      if ( this.isAborted () ) return;

      let resj = _.isPlainObject ( res ) ? res : _.attempt ( JSON.parse, res );

      $.toast ( _.isError ( resj ) || !('message' in resj) ? this.options.messages.error : resj.message );

      this._destroyModal ();

      super.__error ( res );

    }

    __success ( res ) {

      if ( this.isAborted () ) return;

      let resj = _.isPlainObject ( res ) ? res : _.attempt ( JSON.parse, res );

      if ( _.isError ( resj ) || !('modal' in resj) ) return this.__error ( res );

      /* VARIABLES */

      let prevRect = this.$modal.getRect (),
          $remoteModal = $(resj.modal);

      $remoteModal.addClass ( Widgets.Modal.config.options.classes.show ).addClass ( Widgets.Modal.config.options.classes.open );

      /* AVOIDING MODAL CLOSE */

      let instance = this.$modal.modal ( 'instance' );
      instance.close = instance._reset;

      /* RESIZING */

      this._frame ( function () {

        this.$modal.replaceWith ( $remoteModal );
        this.$modal = $remoteModal;
        this.$modal.widgetize ();

        this.___close ();

        let newRect = this.$modal.getRect ();

        this.$modal.css ({
          width: prevRect.width,
          height: prevRect.height
        });

        this.$modal.addClass ( this.options.classes.placeholder ).addClass ( this.options.classes.resizing );

        this._frame ( function () {

          this.$modal.addClass ( this.options.classes.showing );

          this.$modal.animate ({
            width: newRect.width,
            height: newRect.height
          }, this.options.animations.resize, () => {
            this.$modal.css ({
              width: '',
              height: ''
            }).removeClass ( this.options.classes.placeholder + ' ' + this.options.classes.loaded + ' ' + this.options.classes.resizing + ' ' + this.options.classes.showing );
          });

        });

      });

      super.__success ( res );

    }

    /* API OVERRIDES */

    abort () {

      this._destroyModal ();

      super.abort ();

    }

  }

  /* FACTORY */

  Factory.init ( RemoteModal, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Animations ));
