
// @require ./popover_helper.js

(function ( $, _, Svelto, Factory, Pointer ) {

  /* CONFIG */

  let config = {
    name: 'emojipickerPopoverTrigger',
    plugin: true,
    selector: '.emojipicker-popover-trigger',
    options: {
      callbacks: {
        beforetrigger: _.noop,
        trigger: _.noop
      }
    }
  };

  /* EMOJIPICKER POPOVER TRIGGER */

  class EmojipickerPopoverTrigger extends Svelto.Widget {

    /* SPECIAL */

    _events () {

      this.___tap ();

    }

    /* TAP */

    ___tap () {

      this._on ( Pointer.tap, this.trigger );

    }

    /* API */

    trigger () {

      this._trigger ( 'beforetrigger' );

      $.emojipickerPopover ( this.element );

      this._trigger ( 'trigger' );

    }

  }

  /* FACTORY */

  Factory.make ( EmojipickerPopoverTrigger, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Factory, Svelto.Pointer ));
