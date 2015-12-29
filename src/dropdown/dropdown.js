
/* =========================================================================
 * Svelto - Dropdown
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../factory/factory.js
 * @requires ../positionate/positionate.js
 * @requires ../embed_css/embed_css.js
 * ========================================================================= */

(function ( $, _, window, document, undefined ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'dropdown',
    selector: '.dropdown',
    options: {
      positionate: {}, //INFO: Overriding `$.positionate` options
      spacing: {
        attached: 0,
        noTip: 7,
        normal: 14
      },
      classes: {
        noTip: 'no-tip',
        attached: 'attached',
        moving: 'moving',
        show: 'show',
        open: 'open'
      },
      animations: {
        open: Svelto.animation.fast,
        close: Svelto.animation.fast
      },
      callbacks: {
        beforeopen () {},
        open () {},
        close () {}
      }
    }
  };

  /* DROPDOWN */

  class Dropdown extends Svelto.Widget {

    /* SPECIAL */

    _variables () {

      this.$dropdown = this.$element;

      this.$dropdownParents = this.$dropdown.parents ().add ( $window ); //INFO: We are adding `$window` so that the scroll/resize handlers work as expexted
      this.$togglerParents = $empty;

      this.guc = 'dropdown-' + this.guid;
      this.$dropdown.addClass ( this.guc );

      this.hasTip = !this.$dropdown.hasClass ( this.options.classes.noTip );
      this.isAttached = this.$dropdown.hasClass ( this.options.classes.attached );

      this._toggler = false;
      this._prevToggler = false;

      this._isOpen = false;

    }

    /* WINDOW RESIZE / SCROLL */

    _bindParentsResizeScroll () {

      this._on ( this.$dropdownParents.add ( this.$togglerParents ), 'resize scroll', this._repositionate );

    }

    _unbindParentsResizeScroll () {

      this._off ( this.$dropdownParents.add ( this.$togglerParents ), 'resize scroll', this._repositionate );

    }

    /* WINDOW TAP */

    _bindWindowTap () {

      this._on ( $window, Pointer.tap, this.__windowTap );

    }

    _unbindWindowTap () {

      this._off ( $window, Pointer.tap, this.__windowTap );

    }

    __windowTap ( event ) {

      if ( this._isOpen && event !== this._toggleEvent ) {

        if ( this.$dropdown.touching ({ point: $.eventXY ( event )} ).length === 0 ) {

          this.close ();

        }

      }

    }

    /* POSITIONATE */

    _positionate () {

      /* VARIABLES */

      let $toggler = this._toggler,
          noTip = $toggler.hasClass ( this.options.classes.noTip ) || !this.hasTip || this.isAttached,
          $pointer = noTip ? false : $('<div>');

      /* POSITIONATE */

      this.$dropdown.positionate ( _.extend ( {
        $anchor: $toggler,
        $pointer: $pointer,
        spacing:  this.isAttached ? this.options.spacing.attached : ( noTip ? this.options.spacing.noTip : this.options.spacing.normal ),
        callbacks: {
          change ( data ) {
            $toggler.removeClass ( 'dropdown-toggler-top dropdown-toggler-bottom dropdown-toggler-left dropdown-toggler-right' ).addClass ( 'dropdown-toggler-' + data.direction );
          }
        }
      }, this.options.positionate ));

      /* MOCK TIP */

      if ( !noTip ) {

        $.embedCSS ( '.' + this.guc + ':before', $pointer.attr ( 'style' ).slice ( 0, -1 ) + ' rotate(45deg);' ); //FIXME: Too hacky, expecially that `rotate(45deg)`

      }

    }

    _repositionate () {

      if ( this._isOpen ) {

        this._positionate ();

      }

    }

    /* PUBLIC */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force, toggler, event ) {

      this._toggleEvent = event;

      if ( !_.isBoolean ( force ) ) {

        force = toggler && ( !this._toggler || this._toggler && this._toggler[0] !== toggler ) ? true : !this._isOpen;

      }

      this[force ? 'open' : 'close']( toggler );

    }

    open ( toggler ) {

      //FIXME: Add support for opening relative to a point

      if ( !toggler && this._prevToggler ) {

        toggler = this._prevToggler[0];

      }

      if ( !this._isOpen || ( toggler && toggler !== this._toggler[0] ) ) {

        if ( this._toggler ) {

          this._prevToggler = this._toggler;

          this._prevToggler.removeClass ( 'dropdown-toggler-top dropdown-toggler-bottom dropdown-toggler-left dropdown-toggler-right' );

          if ( this._isOpen ) {

            this.$dropdown.addClass ( this.options.classes.moving );

          }

        }

        let $toggler = $(toggler);

        this._toggler = $toggler;

        this._trigger ( 'beforeopen' );

        this.$dropdown.addClass ( 'show' );

        this._positionate ();

        this._frame ( function () {

          this.$dropdown.addClass ( this.options.classes.open );

        });

        if ( this._prevToggler !== this._toggler ) {

          if ( this._isOpen ) {

            this._unbindParentsResizeScroll ();

          }

          this.$togglerParents = $toggler.parents ();

          this._bindParentsResizeScroll ();

        }

        if ( !this._isOpen ) {

          this._delay ( this._bindWindowTap );

        }

        this._isOpen = true;

        this._trigger ( 'open' );

      }

    }

    close () {

      if ( this._isOpen ) {

        this._prevToggler = this._toggler;

        this._prevToggler.removeClass ( 'dropdown-toggler-top dropdown-toggler-bottom dropdown-toggler-left dropdown-toggler-right' );

        delete this._toggler;

        this._frame ( function () {

          this.$dropdown.removeClass ( this.options.classes.open + ' ' + this.options.classes.moving );

          this._delay ( function () {

            this.$dropdown.removeClass ( this.options.classes.show );

          }, this.options.animations.close );

        });

        this._unbindParentsResizeScroll ();

        this._unbindWindowTap ();

        this._isOpen = false;

        this._trigger ( 'close' );

      }

    }

  }

  /* BINDING */

  Svelto.Dropdown = Dropdown;
  Svelto.Dropdown.config = config;

  /* FACTORY */

  $.factory ( Svelto.Dropdown );

}( Svelto.$, Svelto._, window, document ));
