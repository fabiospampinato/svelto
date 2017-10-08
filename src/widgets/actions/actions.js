
/* =========================================================================
 * Svelto - Widgets - Actions
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before widgets/remote/action/action_helper.js
 * @before widgets/remote/modal/modal_helper.js
 * @before widgets/remote/panel/panel_helper.js
 * @before widgets/remote/popover/popover_helper.js
 * @require widgets/targeter/targeter.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

//FIXME: Shouldn't extend `Targeter`, but `SelectableActions` needs that

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'actions',
    plugin: true,
    selector: '.actions',
    options: {
      $fallback: $.$html, //FIXME: Ugly, but needed in order to extend from `Targeter`
      ajax: {}, // Default values
      actions: {
        action: $.remoteAction,
        modal: $.remoteModal,
        panel: $.remotePanel,
        popover: $.remotePopover,
        page ( ajax ) {
          window.location.href = ajax.url;
        }
      },
      defaultAction: 'page',
      actionsArgs: {
        ajax ( $trigger ) {
          return this._getAjax ( $trigger );
        },
        panel ( $trigger ) {
          return [this._getAjax ( $trigger ), $trigger.data ( Widgets.Panel.config.options.datas.direction ), $trigger.data ( Widgets.Panel.config.options.datas.type )];
        },
        popover ( $trigger ) {
          return [this._getAjax ( $trigger ), $trigger];
        }
      },
      defaultActionArgs: 'ajax',
      characters: {
        separator: ','
      },
      attributes: {
        href: 'href' // In order to better support `a` elements (the data value has higher priority)
      },
      datas: {
        type: 'type',
        url: 'url',
        body: 'body',
        method: 'method'
      },
      selectors: {
        action: '.action'
      },
      callbacks: {
        action: _.noop
      }
    }
  };

  /* ACTIONS */

  class Actions extends Widgets.Targeter {

    /* SPECIAL */

    _variables () {

      super._variables ();

      this.$actions = this.$element.find ( this.options.selectors.action );

    }

    _events () {

      super._events ();

      this.___action ();

    }

    /* UTILITIES */

    _getAjax ( $trigger ) {

      let url = $trigger.data ( this.options.datas.url ) || $trigger.attr ( this.options.attributes.href ) || this.options.ajax.url,
          body = $trigger.data ( this.options.datas.body ) || this.options.ajax.body || {},
          method = $trigger.data ( this.options.datas.method ) || this.options.ajax.method;

      return _.extend ( {}, this.options.ajax, { url, body, method } );

    }

    _getArgs ( type, $trigger ) {

      let fn = this.options.actionsArgs[type] || this.options.actionsArgs[this.options.defaultActionArgs];

      if ( !fn ) return;

      let args = fn.call ( this, $trigger );

      return args ? _.castArray ( args ) : false;

    }

    /* ACTION */

    ___action () {

      this._on ( this.$actions, Pointer.tap, this.__action );

    }

    __action ( event ) {

      let $trigger = $(event.target),
          type = $trigger.data ( this.options.datas.type ) || this.options.defaultAction,
          action = this.options.actions[type];

      if ( !action ) return;

      let args = this._getArgs ( type, $trigger );

      if ( !args ) return;

      action ( ...args );

      this._trigger ( 'action', { type, args } );

    }

  }

  /* FACTORY */

  Factory.make ( Actions, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));
