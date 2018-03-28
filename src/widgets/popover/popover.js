
// @require lib/embedded_css/embedded_css.js
// @require lib/positionate/positionate.js
// @require lib/touching/touching.js
// @require widgets/autofocusable/autofocusable.js

//FIXME: Close it if after a `route` event if the trigger element is no longer visible

(function ( $, _, Svelto, Widgets, Factory, Pointer, EmbeddedCSS, Animations ) {

  /* CONFIG */

  let config = {
    name: 'popover',
    plugin: true,
    selector: '.popover',
    options: {
      contentChangeEvents: 'change datepicker:change editor:fullscreen editor:unfullscreen editor:preview editor:unpreview inputautogrow:change tabs:change tablehelper:change tagbox:change textareaautogrow:change timeago:change', // When one of these events are triggered update the position because the content probably changed
      mustCloseEvents: 'modal:beforeopen modal:beforeclose panel:beforeopen panel:beforeclose', //FIXME: This way opening/closing a modal/panel from inside a popover while still keeping it open is not supported
      parentChangeEvents: 'popover:close modal:close panel:close editor:fullscreen editor:unfullscreen', // When one of these events happen, and the target is an anchestor of the anchor, we close the popover //FIXME: Ugly
      positionate: {}, // Extending `$.positionate` options
      spacing: {
        affixed: 0,
        fullscreen: 0,
        noTip: 5,
        normal: 12
      },
      classes: {
        anchorDirection: 'popover-anchor-$1',
        noTip: 'no-tip',
        affixed: 'affixed',
        fullscreen: 'fullscreen',
        fullscreenRequest: 'fullscreen-request',
        moving: 'moving',
        show: 'show',
        open: 'open'
      },
      animations: {
        open: Animations.fast,
        close: Animations.fast
      },
      keystrokes: {
        'esc': '__esc'
      },
      callbacks: {
        beforeopen: _.noop,
        open: _.noop,
        beforeclose: _.noop,
        close: _.noop
      }
    }
  };

  /* POPOVER */

  class Popover extends Widgets.Autofocusable {

    /* SPECIAL */

    _variables () {

      this.$popover = this.$element;
      this.popover = this.$popover[0];

      this.$popover.addClass ( this.guc );

      this.hasTip = !this.$popover.hasClass ( this.options.classes.noTip );
      this.isAffixed = this.$popover.hasClass ( this.options.classes.affixed );
      this.isFullscreen = this.$popover.hasClass ( this.options.classes.fullscreen );

      this._isOpen = this.$popover.hasClass ( this.options.classes.open );

    }

    _events () {

      if ( this._isOpen ) {

        this.___contentChange ();
        this.___mustClose ();
        this.___parentChange ();
        this.___resize ();
        this.___parentsScroll ();
        this.___layoutTap ();
        this.___keydown ();

      }

    }

    _destroy () {

      this.close ();

    }

    /* CONTENT CHANGE */

    ___contentChange () {

      this._on ( true, this.options.contentChangeEvents, this._positionate );

    }

    /* MUST CLOSE */

    ___mustClose () {

      this._on ( true, this.$layout, this.options.mustCloseEvents, this.close );

    }

    /* PARENT CHANGE */

    ___parentChange () {

      this._on ( true, $.$document, this.options.parentChangeEvents, this.__parentChange );

    }

    __parentChange ( event ) {

      if ( !this.$anchor || !$.contains ( event.target, this.$anchor[0] ) ) return;

      if ( this.$anchor.isVisible () ) {

        this._positionate ();

      } else {

        this.close ();

      }

    }

    /* RESIZE */

    ___resize () {

      this._on ( true, $.$window, 'resize', this._frames ( this._positionate.bind ( this ) ) ); //FIXME: It should handle a generic parent `resize`-like event, not just on `$.$window`

    }

    /* PARENTS SCROLL */

    ___parentsScroll () {

      let $parents = this.$popover.parents ().add ( this.$anchor ? this.$anchor.parents () : undefined ).add ( $.$window );

      this._on ( true, $parents, 'scroll', this._frames ( this._positionate.bind ( this ) ) );

    }

    /* LAYOUT TAP */

    ___layoutTap () {

      this._on ( true, this.$layout, Pointer.tap, this.__layoutTap );

    }

    __layoutTap ( event ) {

      if ( event.isDefaultPrevented () || event.isPropagationStopped () ) return;

      if ( event === this._openEvent || this.$popover.touching ({ point: $.eventXY ( event, 'clientX', 'clientY' )} ).length ) return event.stopImmediatePropagation ();

      this.close ();

    }

    /* ESC */

    ___keydown () { //TODO: Listen to `keydown` only within the layout, so maybe just if the layout is hovered or focused (right?)

      this._on ( true, $.$document, 'keydown', this.__keydown );

    }

    __esc () {

      this.close ();

    }

    /* POSITIONATE */

    _positionate () {

      /* VARIABLES */

      let isFullscreenRequested = this.$popover.hasClass ( this.options.classes.fullscreenRequest ),
          noTip = ( this.$anchor && this.$anchor.hasClass ( this.options.classes.noTip ) ) || !this.hasTip || this.isAffixed || this.isFullscreen || isFullscreenRequested,
          spacing = this.isAffixed
                      ? this.options.spacing.affixed
                      : this.isFullscreen || isFullscreenRequested
                        ? this.options.spacing.fullscreen
                        : noTip
                          ? this.options.spacing.noTip
                          : this.options.spacing.normal;

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

      if ( !anchor && this.$prevAnchor && !('point' in this.options.positionate) && !('$anchor' in this.options.positionate) ) {

        anchor = this.$prevAnchor[0];

      }

      /* CHECKING */

      if ( this.isLocked () || ( ( !anchor || ( this._isOpen && this.$anchor && anchor === this.$anchor[0] ) ) && !('point' in this.options.positionate) && !('$anchor' in this.options.positionate) ) ) return;

      /* VARIABLES */

      this.lock ();

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

      this.$anchor = anchor ? $(anchor) : this.options.positionate.$anchor || false;

      /* BEFORE OPENING */

      this._trigger ( 'beforeopen' );

      /* OPENING */

      this._frame ( function () {

        this.$popover.addClass ( 'show' );

        this._positionate ();

        this._frame ( function () {

          this.$popover.addClass ( this.options.classes.open );

          this.autofocus ();

          this.unlock ();

          this._trigger ( 'open' );

        });

      });

      /* EVENTS */

      this._reset ();

      this.___layoutTap ();
      this.___keydown ();
      this.___contentChange ();
      this.___mustClose ();
      this.___parentChange ();
      this.___resize ();
      this.___parentsScroll ();

    }

    close () {

      if ( this.isLocked () || !this._isOpen ) return;

      /* VARIABLES */

      this.lock ();

      this._isOpen = false;

      /* ANCHOR */

      this._toggleAnchorDirectionClass ( this._prevDirection, false );
      this._prevDirection = false;

      this.$prevAnchor = this.$anchor;
      this.$anchor = false;

      /* CLOSING */

      this._trigger ( 'beforeclose' );

      this._frame ( function () {

        this.$popover.removeClass ( this.options.classes.open  );

        if ( this._wasMoving ) {

          this.$popover.removeClass ( this.options.classes.moving );

        }

        this._delay ( function () {

          this.$popover.removeClass ( this.options.classes.show );

          this.autoblur ();

          this.unlock ();

          this._trigger ( 'close' );

        }, this.options.animations.close );

      });

      /* RESETTING */

      this._reset ();

    }

  }

  /* FACTORY */

  Factory.make ( Popover, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.EmbeddedCSS, Svelto.Animations ));
