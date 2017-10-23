
/* =========================================================================
 * Svelto - Widgets - ClassSwitch
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @priority 800
 * @require core/widget/widget.js
 * ========================================================================= */

//TODO: Maybe rename it

(function ( $, _, Svelto, Widgets, Factory, Breakpoints, Breakpoint ) {

  'use strict';

  /* VARIABLES */

  let names = _.filter ( _.values ( Breakpoints ), _.isString ),
      datas = [];

  for ( let name of names ) {

    datas.push ( `${name}-up` );
    datas.push ( `${name}-down` );
    datas.push ( `${name}-only` );
    datas.push ( name );

  }

  let selector = datas.map ( name => `[data-${name}]` ).join ( ',' );

  /* CONFIG */

  let config = {
    name: 'classSwitch',
    plugin: true,
    selector,
    options: {
      switch: { // Classes to attach at specifc breakpoints, every key/val pair should be in the form of `breakpoint-name`: `class`, where `breakpoint-name` is a key of `Breakpoints` and `class` can be any class string. In addition to this every pair must be specified under one of the following keys: `up`, `down`, `only`, mimicking the respective SCSS mixins
        up: {},
        down: {},
        only: {}
      }
    }
  };

  /* CLASS SWITCH */

  class ClassSwitch extends Widgets.Widget {

    /* SPECIAL */

    _init () {

      this.status = { up: {}, down: {}, only: {} };

      this._populate ();

      this.__classSwitch ();

    }

    _events () {

      this.___classSwitch ();

    }

    /* POPULATE */

    _populateBreakpoint ( breakpoint ) {

      let name = Breakpoints[breakpoint];

      /* UP */

      let up = this.$element.data ( `${name}-up` );

      if ( _.isString ( up ) ) {

        this.options.switch.up[breakpoint] = up;

      }

      /* DOWN */

      let down = this.$element.data ( `${name}-down` );

      if ( _.isString ( down ) ) {

        this.options.switch.down[breakpoint] = down;

      }

      /* ONLY */

      let specific = this.$element.data ( `${name}-only` ),
          general = this.$element.data ( name ),
          only = _.isString ( specific ) ? specific : ( _.isString ( general ) ? general : undefined );

      if ( _.isString ( only ) ) {

        this.options.switch.only[breakpoint] = only;

      }

    }

    _populate () {

      for ( let key in Breakpoints ) {

        if ( !Breakpoints.hasOwnProperty ( key ) ) continue;

        if ( !_.isString ( Breakpoints[key] ) ) continue;

        this._populateBreakpoint ( key );

      }

    }

    /* STATUS */

    _getStatus () {

      let status = { up: {}, down: {}, only: {} },
          width = Breakpoints.widths[Breakpoint.current];

      /* UP */

      for ( let breakpoint in this.options.switch.up ) {

        if ( !this.options.switch.up.hasOwnProperty ( breakpoint ) ) continue;

        let active = ( width >= Breakpoints.widths[breakpoint] );

        status.up[breakpoint] = active;

      }

      /* DOWN */

      for ( let breakpoint in this.options.switch.down ) {

        if ( !this.options.switch.down.hasOwnProperty ( breakpoint ) ) continue;

        let active = ( width <= Breakpoints.widths[breakpoint] );

        status.down[breakpoint] = active;

      }

      /* ONLY */

      for ( let breakpoint in this.options.switch.only ) {

        if ( !this.options.switch.only.hasOwnProperty ( breakpoint ) ) continue;

        let active = ( width === Breakpoints.widths[breakpoint] );

        status.only[breakpoint] = active;

      }

      return status;

    }

    _getDeltaStatus ( previous, current ) {

      let delta = { up: {}, down: {}, only: {} };

      for ( let type in current ) {

        if ( !current.hasOwnProperty ( type ) ) continue;

        for ( let breakpoint in current[type] ) {

          if ( !current[type].hasOwnProperty ( breakpoint ) ) continue;

          if ( !!previous[type][breakpoint] !== !!current[type][breakpoint] ) {

            delta[type][breakpoint] = !!current[type][breakpoint];

          }

        }

      }

      return delta;

    }

    /* CLASS SWITCH */

    ___classSwitch () {

      this._on ( true, $.$window, 'breakpoint:change', this.__classSwitch );

    }

    __classSwitch () {

      let status = this._getStatus (),
          delta = this._getDeltaStatus ( this.status, status );

      for ( let type in delta ) {

        if ( !delta.hasOwnProperty ( type ) ) continue;

        for ( let breakpoint in delta[type] ) {

          if ( !delta[type].hasOwnProperty ( breakpoint ) ) continue;

          this.$element.toggleClass ( this.options.switch[type][breakpoint], delta[type][breakpoint] );

        }

      }

      this.status = status;

    }

  }

  /* FACTORY */

  Factory.make ( ClassSwitch, config );

}( Svelto.$, Svelto._, Svelto, Svelto.Widgets, Svelto.Factory, Svelto.Breakpoints, Svelto.Breakpoint ));
