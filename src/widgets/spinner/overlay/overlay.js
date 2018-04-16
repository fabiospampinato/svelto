
// @require core/colors/colors.js
// @require widgets/overlay/overlay.js

(function ( $, _, Svelto, Widgets, Factory, Colors ) {

  /* CONFIG */

  let config = {
    name: 'spinnerOverlay',
    plugin: true,
    templates: {
      overlay: _.template ( `
        <div class="overlay spinner-overlay <%= o.dimmer ? 'dimmer' : '' %> <%= o.blurrer ? 'blurrer' : '' %>">
          <% if ( o.labeled ) { %>
            <div class="spinner-label <%= o.colors.labeled %>">
          <% } %>
            <svg class="spinner <%= ( o.multicolor ? 'multicolor' : ( o.labeled ? '' : o.unlabeled ) ) %>">
              <circle cx="1.625em" cy="1.625em" r="1.25em">
            </svg>
          <% if ( o.labeled ) { %>
            </div>
          <% } %>
        </div>
      ` )
    },
    options: {
      labeled: true,
      blurrer: false,
      dimmer: true,
      multicolor: false,
      colors: {
        labeled: Colors.white,
        unlabeled: Colors.secondary
      },
      callbacks: {
        open: _.noop,
        close: _.noop
      }
    }
  };

  /* SPINNER OVERLAY */

  class SpinnerOverlay extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.$overlayed = this.$element;
      this.$overlay = $(this._template ( 'overlay', this.options ));

      this.instance = this.$overlay.overlay ( 'instance' );

    }

    /* API */

    isOpen () {

      return this.instance.isOpen ();

    }

    toggle ( force = !this.isOpen () ) {

      return this[force ? 'open' : 'close']();

    }

    open () {

      if ( this.isOpen () ) return null;

      if ( this.isLocked () ) return this.whenUnlocked ( this.open.bind ( this ) );

      if ( this.instance.isLocked () ) return this.instance.whenUnlocked ( this.open.bind ( this ) );

      this.$overlay.prependTo ( this.$overlayed );

      this.instance.open ();

      this._trigger ( 'open' );

    }

    close () {

      if ( !this.isOpen () ) return null;

      if ( this.isLocked () ) return this.whenUnlocked ( this.close.bind ( this ) );

      if ( this.instance.isLocked () ) return this.instance.whenUnlocked ( this.close.bind ( this ) );

      this.lock ();

      this.instance.close ();

      this._delay ( function () {

        this.$overlay.detach ();

        this.unlock ();

        this._trigger ( 'close' );

      }, Widgets.Overlay.config.options.animations.close );

    }

  }

  /* FACTORY */

  Factory.make ( SpinnerOverlay, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Colors ));
