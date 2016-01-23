
/* =========================================================================
 * Svelto - Dropdown
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../widget/widget.js
 * @requires ../positionate/positionate.js
 * @requires ../embedded_css/embedded_css.js
 * ========================================================================= */

//TODO: Add support for opening the dropdown relative to a point

(function ( $, _, Svelto, Widgets, Factory, Pointer, EmbeddedCSS, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'dropdown',
    plugin: true,
    selector: '.dropdown',
    options: {
      positionate: {}, //INFO: Extending `$.positionate` options
      spacing: {
        attached: 0,
        noTip: 7,
        normal: 14
      },
      classes: {
        anchorDirection: 'dropdown-anchor-$2',
        noTip: 'no-tip',
        attached: 'attached',
        moving: 'moving',
        show: 'show',
        open: 'open'
      },
      animations: {
        open: Animations.fast,
        close: Animations.fast
      },
      callbacks: {
        beforeopen: _.noop,
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* DROPDOWN */

  class Dropdown extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$dropdown = this.$element;

      this.$dropdown.addClass ( this.guc );

      this.hasTip = !this.$dropdown.hasClass ( this.options.classes.noTip );
      this.isAttached = this.$dropdown.hasClass ( this.options.classes.attached );

      this._isOpen = false;

    }

    _events () {

      if ( this._isOpen ) {

        this.___resize ();
        this.___parentsScroll ();
        this.___windowTap ();

      }

    }

    _destroy () {

      this.close ();

    }

    /* PARENTS SCROLL */

    ___parentsScroll () {

      let $parents = this.$dropdown.parents ().add ( this.$anchor.parents () ).add ( $window );

      this._on ( true, $parents, 'scroll', this._throttle ( this._positionate, 100 ) );

    }

    /* RESIZE */

    ___resize () {

      this._on ( true, $window, 'resize', this._throttle ( this._positionate, 100 ) ); //FIXME: It should handle a generic parent `resize`-like event, not just on `$window`

    }

    /* WINDOW TAP */

    ___windowTap () {

      this._on ( true, $window, Pointer.tap, this.__windowTap );

    }

    __windowTap ( event ) {

      if ( event === this._openEvent || this.$dropdown.touching ({ point: $.eventXY ( event )} ).length ) return;

      this.close ();

    }

    /* POSITIONATE */

    _positionate () {

      /* VARIABLES */

      let noTip = this.$anchor.hasClass ( this.options.classes.noTip ) || !this.hasTip || this.isAttached,
          spacing = this.isAttached ? this.options.spacing.attached : ( noTip ? this.options.spacing.noTip : this.options.spacing.normal );

      this.$mockTip = noTip ? false : $('<div>');

      /* POSITIONATE */

      this.$dropdown.positionate ( _.extend ({
        $anchor: this.$anchor,
        $pointer: this.$mockTip,
        spacing: spacing,
        callbacks: {
          change: this.__positionChange.bind ( this )
        }
      }, this.options.positionate ));

    }

    _toggleAnchorDirectonClass ( direction, force ) {

      this.$anchor.toggleClass ( _.format ( this.options.classes.anchorDirection, direction ), force );

    }

    __positionChange ( data ) {

      /* ANCHOR CLASS */

      if ( this._prevDirection !== data.direction ) {

        if ( this._prevDirection ) {

          this._toggleAnchorDirectonClass ( this._prevDirection, false );

        }

        this._toggleAnchorDirectonClass ( data.direction, true );

        this._prevDirection = data.direction;

      }

      /* PSEUDO ELEMENT TIP */

      if ( this.$mockTip ) {

        EmbeddedCSS.set ( '.' + this.guc + ':before', this.$mockTip.attr ( 'style' ).slice ( 0, -1 ) + ' rotate(45deg)' ); //FIXME: Too hacky, expecially that `rotate(45deg)`

      }

    }

    /* API */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force, anchor, event ) {

      if ( !_.isBoolean ( force ) ) {

        force = anchor && ( !this.$anchor || this.$anchor && this.$anchor[0] !== anchor ) ? true : ( this.$prevAnchor || this.$anchor ? !this._isOpen : false );

      }

      this[force ? 'open' : 'close']( anchor, event );

    }

    open ( anchor, event ) {

      /* RESTORING ANCHOR */

      if ( !anchor && this.$prevAnchor ) {

        anchor = this.$prevAnchor[0];

      }

      /* CHECKING */

      if ( this._lock || !anchor || ( this._isOpen && this.$anchor && anchor === this.$anchor[0] ) ) return;

      /* VARIABLES */

      this._lock = true;
      this._isOpen = true;

      this._openEvent = event;
      this._wasMoving = false;

      /* PREVIOUS ANCHOR */

      if ( this.$anchor ) {

        this._toggleAnchorDirectonClass ( this._prevDirection, false );
        this._prevDirection = false;

        this.$prevAnchor = this.$anchor;

        if ( this._isOpen ) {

          this._wasMoving = true;

          this.$dropdown.addClass ( this.options.classes.moving );

        }

      }

      /* ANCHOR */

      this.$anchor = $(anchor);

      /* BEFORE OPENING */

      this._trigger ( 'beforeopen' );

      /* OPENING */

      this._frame ( function () {

        this.$dropdown.addClass ( 'show' );

        this._positionate ();

        this._frame ( function () {

          this.$dropdown.addClass ( this.options.classes.open );

          this._lock = false;

          this._trigger ( 'open' );

        });

      });

      /* EVENTS */

      this._reset ();

      this.___windowTap ();
      this.___resize ();
      this.___parentsScroll ();

    }

    close () {

      if ( this._lock || !this._isOpen ) return;

      /* VARIABLES */

      this._lock = true;
      this._isOpen = false;

      /* ANCHOR */

      this._toggleAnchorDirectonClass ( this._prevDirection, false );
      this._prevDirection = false;

      this.$prevAnchor = this.$anchor;
      this.$anchor = false;

      /* CLOSING */

      this._frame ( function () {

        this.$dropdown.removeClass ( this.options.classes.open  );

        if ( this._wasMoving ) {

          this.$dropdown.removeClass ( this.options.classes.moving );

        }

        this._delay ( function () {

          this.$dropdown.removeClass ( this.options.classes.show );

          this._lock = false;

          this._trigger ( 'close' );

        }, this.options.animations.close );

      });

      /* RESETTING */

      this._reset ();

    }

  }

  /* FACTORY */

  Factory.init ( Dropdown, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.EmbeddedCSS, Svelto.Animations ));
