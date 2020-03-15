
// @require core/colors/colors.js
// @require widgets/modal/modal.js

(function ( $, _, Svelto, Widgets, Factory, Pointer, Colors ) {

  /* CONFIG */

  let config = {
    name: 'dialog',
    plugin: true,
    selector: '.dialog',
    templates: {
      base: _.template ( `
        <div class="card modal dialog <%= o.color %> <%= o.css %>">
          <% if ( o.title ) { %>
            <div class="card-header">
              <%= o.title %>
            </div>
          <% } %>
          <% if ( o.body || o.input.enabled || o.textarea.enabled ) { %>
            <div class="card-block">
              <% if ( o.body ) { %>
                <p><%= o.body %></p>
              <% } %>
              <% if ( o.input.enabled ) { %>
                <input placeholder="<%= o.input.placeholder %>" value="<%= o.input.value %>" type="text" class="autofocus fluid <%= o.input.css %>"" />
              <% } %>
              <% if ( o.textarea.enabled ) { %>
                <textarea placeholder="<%= o.textarea.placeholder %>" rows="<%= o.textarea.rows %>" class="autofocus fluid <%= o.textarea.css %>"><%= o.textarea.value %></textarea>
              <% } %>
            </div>
          <% } %>
          <div class="card-footer text-right">
            <% if ( !o.buttons.length ) { %>
              <% print ( Svelto.Templates.Dialog.button ({ text: 'OK' }) ) %>
            <% } else if ( o.buttons.length === 1 ) { %>
              <% print ( Svelto.Templates.Dialog.button ( o.buttons[0] ) ) %>
            <% } else if ( o.stack || ( o.autostack.enabled && ( o.buttons.length >= o.autostack.thresholds.buttons || o.buttons.map ( function ( btn ) { return btn.text; } ).join ( '' ).length >= o.autostack.thresholds.length ) ) ) { %>
              <div class="multiple stack vertical">
                <% for ( var i = o.buttons.length - 1; i >= 0; i-- ) { %>
                  <% print ( Svelto.Templates.Dialog.button ( o.buttons[i] ) ) %>
                <% } %>
              </div>
            <% } else { %>
              <div class="multiple">
                <% print ( Svelto.Templates.Dialog.button ( o.buttons[0] ) ) %>
                <div class="spacer"></div>
                <% for ( var i = 1; i < o.buttons.length; i++ ) { %>
                  <% print ( Svelto.Templates.Dialog.button ( o.buttons[i] ) ) %>
                <% } %>
              </div>
            <% } %>
          </div>
        </div>
      ` ),
      button: _.template ( `
        <div class="button <%= o.color || '' %> <%= o.size || '' %> <%= o.css || '' %>">
          <%= o.text || '' %>
        </div>
      ` )
    },
    options: {
      title: false,
      body: false,
      input: {
        enabled: false,
        placeholder: '',
        value: '',
        css: 'bordered'
      },
      textarea: {
        enabled: false,
        placeholder: '',
        value: '',
        css: 'bordered',
        rows: 3
      },
      buttons: [],
      /*
             : [{
                color: '',
                size: '',
                css: '',
                text: '',
                onClick: _.noop // If it returns `false` the Dialog won't be closed
             }],
      */
      color: Colors.white,
      css: '',
      stack: false,
      autostack: {
        enabled: true,
        thresholds: {
          buttons: 4,
          length: 30
        }
      },
      selectors: {
        button: '.card-footer .button'
      }
    }
  };

  /* DIALOG */

  class Dialog extends Widgets.Modal {

    /* SPECIAL */

    _variables () {

      super._variables ();

      this.$dialog = this.$element;
      this.$buttons = this.$dialog.find ( this.options.selectors.button );

      this.$dialog.widgetize ();

    }

    /* BUTTON TAP */

    ___buttonTap () {

      this._on ( this.$buttons, Pointer.tap, this.__buttonTap );

    }

    __buttonTap ( event, data = {} ) {

      let $button = $(event.target),
          index = this.$buttons.index ( $button ),
          buttonObj = this.options.buttons[index];

      if ( buttonObj && buttonObj.onClick ) {

        data.value = this.$dialog.find ( 'input, textarea, select').val ();

        if ( buttonObj.onClick.apply ( $button[0], [event, data] ) === false ) return;

      }

      this.close ();

    }

    /* API */

    open () {

      const result = super.open ();

      if ( !_.isUndefined ( result ) ) return result;

      this.___buttonTap ();

    }

  }

  /* FACTORY */

  Factory.make ( Dialog, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer, Svelto.Colors ));
