
/* =========================================================================
 * Svelto - Widgets - Popover
 * =========================================================================
 * Copyright (c) 2015-2016 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @require core/widget/widget.js
 * @require lib/embedded_css/embedded_css.js
 * @require lib/positionate/positionate.js
 * @require lib/touching/touching.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer, EmbeddedCSS, Animations ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'popover',
    plugin: true,
    selector: '.popover',
    options: {
      positionate: {}, // Extending `$.positionate` options
      spacing: {
        affixed: 0,
        noTip: 5,
        normal: 12
      },
      classes: {
        anchorDirection: 'popover-anchor-$1',
        noTip: 'no-tip',
        affixed: 'affixed',
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

  /* POPOVER */

  class Popover extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$popover = this.$element;

      this.$popover.addClass ( this.guc );

      this.hasTip = !this.$popover.hasClass ( this.options.classes.noTip );
      this.isAffixed = this.$popover.hasClass ( this.options.classes.affixed );

      this._isOpen = false;

    }

    _events () {

      if ( this._isOpen ) {

        this.___resize ();
        this.___parentsScroll ();
        this.___layoutTap ();

      }

    }

    _destroy () {

      this.close ();

    }

    /* PARENTS SCROLL */

    ___parentsScroll () {

      let $parents = this.$popover.parents ().add ( this.$anchor ? this.$anchor.parents () : undefined ).add ( this.$window );

      this._on ( true, $parents, 'scroll', this._throttle ( this._positionate, 100 ) );

    }

    /* RESIZE */

    ___resize () {

      this._on ( true, this.$window, 'resize', this._throttle ( this._positionate, 100 ) ); //FIXME: It should handle a generic parent `resize`-like event, not just on `this.$window`

    }

    /* LAYOUT TAP */

    ___layoutTap () {

      this._on ( true, this.$layout, Pointer.tap, this.__layoutTap );

    }

    __layoutTap ( event ) {

      if ( event === this._openEvent || this.$popover.touching ({ point: $.eventXY ( event )} ).length ) return;

      this.close ();

    }

    /* POSITIONATE */

    _positionate () {

      /* VARIABLES */

      let noTip = ( this.$anchor && this.$anchor.hasClass ( this.options.classes.noTip ) ) || !this.hasTip || this.isAffixed,
          spacing = this.isAffixed ? this.options.spacing.affixed : ( noTip ? this.options.spacing.noTip : this.options.spacing.normal );

      /* POSITIONATE */

      this.$popover.positionate ( _.extend ({
        $anchor: this.$anchor,
        pointer: noTip ? false : 'auto',
        spacing: spacing,
        callbacks: {
          change: this.__positionChange.bind ( this )
        }
      }, this.options.positionate ));

    }

    _toggleAnchorDirectionClass ( direction, force ) {

      if ( !this.$anchor ) return;

      this.$anchor.toggleClass ( _.format ( this.options.classes.anchorDirection, direction ), force );

    }

    __positionChange ( data ) {

      /* ANCHOR CLASS */

      if ( this._prevDirection !== data.direction ) {

        if ( this._prevDirection ) {

          this._toggleAnchorDirectionClass ( this._prevDirection, false );

        }

        this._toggleAnchorDirectionClass ( data.direction, true );

        this._prevDirection = data.direction;

      }

    }

    /* API */

    isOpen () {

      return this._isOpen;

    }

    toggle ( force, anchor, event ) {

      if ( !_.isBoolean ( force ) ) {

        force = anchor && ( !this.$anchor || this.$anchor && this.$anchor[0] !== anchor ) ? true : ( this.$prevAnchor || this.$anchor || 'point' in this.options.positionate ? !this._isOpen : false );

      }

      this[force ? 'open' : 'close']( anchor, event );

    }

    open ( anchor, event ) {

      /* RESTORING ANCHOR */

      if ( !anchor && this.$prevAnchor && !('point' in this.options.positionate) ) {

        anchor = this.$prevAnchor[0];

      }

      /* CHECKING */

      if ( this._lock || ( ( !anchor || ( this._isOpen && this.$anchor && anchor === this.$anchor[0] ) ) && !('point' in this.options.positionate) ) ) return;

      /* VARIABLES */

      this._lock = true;
      this._isOpen = true;

      this._openEvent = event;
      this._wasMoving = false;

      /* PREVIOUS ANCHOR */

      if ( this.$anchor ) {

        this._toggleAnchorDirectionClass ( this._prevDirection, false );
        this._prevDirection = false;

        this.$prevAnchor = this.$anchor;

        if ( this._isOpen ) {

          this._wasMoving = true;

          this.$popover.addClass ( this.options.classes.moving );

        }

      }

      /* ANCHOR */

      this.$anchor = anchor ? $(anchor) : false;

      /* BEFORE OPENING */

      this._trigger ( 'beforeopen' );

      /* OPENING */

      this._frame ( function () {

        this.$popover.addClass ( 'show' );

        this._positionate ();

        this._frame ( function () {

          this.$popover.addClass ( this.options.classes.open );

          this._lock = false;

          this._trigger ( 'open' );

        });

      });

      /* EVENTS */

      this._reset ();

      this.___layoutTap ();
      this.___resize ();
      this.___parentsScroll ();

    }

    close () {

      if ( this._lock || !this._isOpen ) return;

      /* VARIABLES */

      this._lock = true;
      this._isOpen = false;

      /* ANCHOR */

      this._toggleAnchorDirectionClass ( this._prevDirection, false );
      this._prevDirection = false;

      this.$prevAnchor = this.$anchor;
      this.$anchor = false;

      /* CLOSING */

      this._frame ( function () {

        this.$popover.removeClass ( this.options.classes.open  );

        if ( this._wasMoving ) {

          this.$popover.removeClass ( this.options.classes.moving );

        }

        this._delay ( function () {

          this.$popover.removeClass ( this.options.classes.show );

          this._lock = false;

          this._trigger ( 'close' );

        }, this.options.animations.close );

      });

      /* RESETTING */

      this._reset ();

    }

  }

  /* FACTORY */

  Factory.init ( Popover, config, Widgets );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.EmbeddedCSS, Svelto.Animations ));
