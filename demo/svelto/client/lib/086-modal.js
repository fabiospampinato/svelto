
/* =========================================================================
 * Svelto - Remote - Modal
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require ../remote.js
 * @require ../../modal/modal.js
 * @require ../../noty/noty.js
 * ========================================================================= */

//TODO: Add locking capabilities, both at class-level and global-level (should be layout-level but seems impossible to implement)

//FIXME: Not well written

(function ( $, _, Svelto, Widgets, Factory, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'remoteModal',
    options: {
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
        animating: 'remote-modal-animating'
      },
      animations: {
        resize: Animations.normal
      }
    }
  };

  /* REMOTE MODAL */

  class RemoteModal extends Widgets.Remote {

    /* MODAL */

    ___loadingModal () {

      /*
        <div class="modal ' + this.options.classes.placeholder + ' card">
          <div class="card-block">
            <svg class="spinner">
              <circle cx="1.625em" cy="1.625em" r="1.25em">
            </svg>
          </div>
        </div>
      */

      this.$modal = $('<div class="modal ' + this.options.classes.placeholder + ' card"><div class="card-block"><svg class="spinner"><circle cx="1.625em" cy="1.625em" r="1.25em"></svg></div></div>').appendTo ( this.$layout );

    }

    _destroyModal () {

      if ( !this.$modal ) return;

      this.$modal.modal ( 'close' );

      this._delay ( function () {

        this.$modal.remove ();

        this.$modal = false;

      }, Widgets.Modal.config.options.animations.close );

    }

    /* ABORT */

    ___abort () {

      this._on ( true, this.$modal, 'modal:close', this.abort );

    }

    /* REQUEST HANDLERS */

    __beforesend ( res ) {

      if ( this.isAborted () ) return;

      this.___loadingModal ();
      this.___abort ();

      this.$modal.modal ( 'open' );

      super.__beforesend ( res );

    }

    __error ( res ) {

      if ( this.isAborted () ) return;

      let resj = _.attempt ( JSON.parse, res );

      $.noty ( _.isError ( resj ) || !('msg' in resj) ? this.options.messages.error : resj.msg );

      this._destroyModal ();

      super.__error ( res );

    }

    __success ( res ) {

      if ( this.isAborted () ) return;

      let resj = _.attempt ( JSON.parse, res );

      if ( _.isError ( resj ) || !('modal' in resj) ) {

        return this.__error ( res );

      } else {

        /* VARIABLES */

        let prevRect = this.$modal.getRect (),
            $remoteModal = $(resj.modal),
            attributes = Array.from ( $remoteModal.prop ( 'attributes' ) );

        /* CLONING ATTRIBUTES */

        for ( let attribute of attributes ) {

          if ( attribute.name !== 'class' ) {

            this.$modal.attr ( attribute.name, attribute.value );

          } else {

            this.$modal.addClass ( attribute.value );

          }

        }

        /* RESIZING */

        this._frame ( function () {

          this.$modal.addClass ( this.options.classes.loaded ).html ( $remoteModal.html () ).widgetize ();

          let newRect = this.$modal.getRect ();

          this.$modal.css ({
            width: prevRect.width,
            height: prevRect.height
          });

          this._frame ( function () {

            this.$modal.addClass ( this.options.classes.animating );

            this.$modal.animate ({
              width: newRect.width,
              height: newRect.height
            }, this.options.animations.resize, function () {
              this.$modal.css ({
                width: '',
                height: ''
              }).removeClass ( this.options.classes.placeholder + ' ' + this.options.classes.loaded + ' ' + this.options.classes.animating );
            }.bind ( this ));

          });

        });

        super.__success ( res );

      }

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
