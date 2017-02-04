
/* =========================================================================
 * Svelto - Widgets - Selectable - Actions
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @before widgets/remote/action/action.js
 * @before widgets/remote/modal/modal.js
 * @before widgets/remote/panel/panel.js
 * @before widgets/remote/popover/popover.js
 * @require ../selectable.js
 * @require widgets/targeter/targeter.js
 * @require widgets/toast/toast.js
 * ========================================================================= */

(function ( $, _, Svelto, Widgets, Factory, Pointer ) {

  'use strict';

  /* CONFIG */

  let config = {
    name: 'selectableActions',
    plugin: true,
    selector: '.selectable-actions',
    options: {
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
      widget: Widgets.Selectable,
      characters: {
        separator: ','
      },
      placeholders: {
        id: '%ID%'
      },
      attributes: {
        href: 'href' // In order to better support `a` elements (the data value has higher priority)
      },
      datas: {
        id: 'id',
        type: 'type',
        url: 'url',
        data: 'data',
        method: 'method'
      },
      selectors: {
        action: '.action',
        id: false // Selects the element containing the id (from its `tr` element), for instance it could be `> td:first-child`. If falsy, `datas.id` will be used
      },
      callbacks: {
        action: _.noop
      }
    }
  };

  /* SELECTABLE ACTIONS */

  class SelectableActions extends Widgets.Targeter {

    /* SPECIAL */

    _variables () {

      super._variables ();

      this.$wrapper = this.$element;
      this.$actions = this.$wrapper.find ( this.options.selectors.action );

    }

    _events () {

      super._events ();

      this.___action ();

    }

    /* UTILITIES */

    _getIds () {

      let $rows = this._targetInstance.get (),
          ids = $rows.get ().map ( row => this.options.selectors.id ? $(row).find ( this.options.selectors.id ).text () : $(row).data ( this.options.datas.id ) );

      return _.compact ( ids );

    }

    _getAjax ( $trigger ) {

      let ids = this._getIds (),
          url = $trigger.data ( this.options.datas.url ) || $trigger.attr ( this.options.attributes.href ) || this.options.ajax.url,
          data = $trigger.data ( this.options.datas.data ) || this.options.ajax.data || {},
          method = $trigger.data ( this.options.datas.method ) || this.options.ajax.method;

      url = url.replace ( this.options.placeholders.id, ids.join ( this.options.characters.separator ) );
      data = _.extend ( {}, data, {ids} );

      return _.extend ( {}, this.options.ajax, { url, data, method } );

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

  Factory.make ( SelectableActions, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Pointer ));
