
/* =========================================================================
 * Svelto - Widgets - Form - Ajax
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before ../validate/validate.js
 * @require core/svelto/svelto.js
 * @require lib/fetch/fetch.js
 * @require widgets/toast/toast.js
 * @require widgets/spinner/overlay/overlay.js
 * ========================================================================= */

//TODO: Add a way to abort it, maybe hovering the spinner a clickable X will be displayed and abort the request if tapped (or something more intuitive and easier to implement...)

(function ( $, _, Svelto, Widgets, Factory, fetch ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'formAjax',
    plugin: true,
    selector: 'form.ajax',
    options: {
      spinnerOverlay: true, // Enable/disable the `spinnerOverlay`, if disabled one can use the triggered events in order to provide a different visual feedback to the user
      timeout: 31000, // 1 second more than the default value of PHP's `max_execution_time` setting
      autoclose: { // Close the form (or its container) on success
        enabled: true,
        selectors: ['.modal', '.panel', '.popover', '.overlay', '.expander'], // Possible selectors for the container that needs to be closed
        plugins: ['modal', 'panel', 'popover', 'overlay', 'expander'], // Maps each selector to its jQuery plugin name
        methods: 'close' // Maps each plugin with a method to call. Can also be a string if all the plugins have the same method name
      },
      messages: {
        success: 'Done! A page refresh may be needed',
        refreshing: 'Done! Refreshing the page...',
        redirecting: 'Done! Redirecting...'
      },
      callbacks: {
        beforesend: _.noop,
        error: _.noop,
        success: _.noop,
        complete: _.noop
      }
    }
  };

  /* FORM AJAX */

  class FormAjax extends Widgets.Widget {

    /* SPECIAL */

    _variables () {

      this.form = this.element;
      this.$form = this.$element;

    }

    _events () {

      this.___submit ();

    }

    /* AUTOCLOSE */

    _autoclose () {

      let {selectors, plugins, methods} = this.options.autoclose;

      for ( let i = 0, l = selectors.length; i < l; i++ ) {

        let $closable = this.$form.closest ( selectors[i] );

        if ( !$closable.length ) continue;

        let method = _.isArray ( methods ) ? methods[i] : methods;

        if ( this.options.spinnerOverlay ) {

          this._on ( 'spinneroverlay:close', () => $closable[plugins[i]]( method ) );

        } else {

          $closable[plugins[i]]( method );

        }

        break;

      }

    }

    /* SUBMIT */

    ___submit () {

      this._on ( true, 'submit', this.__submit );

    }

    __submit ( event ) {

      event.preventDefault ();
      event.stopImmediatePropagation ();

      fetch ({
        url: this.$form.attr ( 'action' ),
        method: this.$form.attr ( 'method' ) || 'post',
        body: new FormData ( this.form ),
        cache: false,
        timeout: this.options.timeout,
        beforesend: this.__beforesend.bind ( this ),
        error: this.__error.bind ( this ),
        success: this.__success.bind ( this ),
        complete: this.__complete.bind ( this )
      });

    }

    /* REQUEST HANDLERS */

    __beforesend ( req ) {

      if ( this.options.spinnerOverlay ) {

        this.$form.spinnerOverlay ( 'open' );

      }

      this._trigger ( 'beforesend', req );

    }

    async __error ( res ) {

      let message = await fetch.getValue ( res, 'message' ) || this.options.messages.error;

      $.toast ( message );

      this._trigger ( 'error', res );

    }

    async __success ( res ) {

      let resj = await fetch.getValue ( res );

      if ( resj ) {

        if ( resj.refresh || resj.url === window.location.href || ( _.isString ( resj.url ) && _.trim ( resj.url, '/' ) === _.trim ( window.location.pathname, '/' ) ) ) {

          $.toast ( resj.message || this.options.messages.refreshing );

          location.reload ();

        } else if ( resj.url ) {

          // In order to redirect to another domain the protocol must be provided. For instance `http://www.domain.tld` will work while `www.domain.tld` won't

          $.toast ( resj.message || this.options.messages.redirecting );

          location.assign ( resj.url );

        } else if ( !resj.noop ) {

          $.toast ( resj.message || this.options.messages.success );

        }

        if ( this.options.autoclose.enabled ) this._autoclose ();

      } else {

        $.toast ( this.options.messages.success );

      }

      this._trigger ( 'success', res );

    }

    __complete ( res ) {

      if ( this.options.spinnerOverlay ) {

        this.$form.spinnerOverlay ( 'close' );

      }

      this._trigger ( 'complete', res );

    }

  }

  /* FACTORY */

  Factory.make ( FormAjax, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.fetch ));
