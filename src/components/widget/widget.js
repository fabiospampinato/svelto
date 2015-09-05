
/* =========================================================================
 * Svelto - Widget v0.2.0
 * =========================================================================
 * Copyright (c) 2015 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * =========================================================================
 * @requires ../core/core.js
 * @requires base_widget.js
 * @requires ../tmpl/tmpl.js
 * @requires ../pointer/pointer.js
 *=========================================================================*/

;(function ( $, _, window, document, undefined ) {

  'use strict';

  /* WIDGET FACTORY */

  $.widget = function ( originalName, base, prototype ) {

    // NAME

    var nameParts = originalName.split ( '.' ),
        namespace = nameParts.length > 1 ? nameParts[0] : false,
        name = nameParts.length > 1 ? nameParts[1] : nameParts[0],
        fullName = namespace ? namespace + '-' + name : name;

    // NO BASE -> DEFAULT WIDGET BASE

    if ( !prototype ) {

      prototype = base;
      base = $.Widget;

    }

    // INIT NAMESPACE

    if ( namespace ) {

      $[namespace] = $[namespace] || {};

    }

    // CONSTRUCTOR

    var existingConstructor = namespace ? $[namespace][name] : $[name];

    var constructor = function ( options, element ) {

      if ( !this._create ) {

        console.error ( 'No _create' ); //FIXME: Remove it

        return new constructor ( options, element );

      }

      console.error ( 'There\'s a _create' ); //FIXME: Remove it

      this._create ( options, element );

    };

    // SET CONSTRUCTOR

    if ( namespace ) {

      $[namespace][name] = constructor;

    } else {

      $[name] = constructor;

    }

    // EXTENDING CONSTRUCTOR IN ORDER TO CARRY OVER STATIC PROPERTIES

    _.extend ( constructor, existingConstructor, {
      _proto: _.extend ( {}, prototype ),
      _childConstructors: []
    });

    // BASE PROTOTYPE

    var basePrototype = new base ();

    basePrototype.options = _.extend ( {}, basePrototype.options ); //INFO: We need to make the options hash a property directly on the new instance otherwise we'll modify the options hash on the prototype that we're inheriting from

    // PROXIED PROTOTYPE

    var proxiedPrototype = {};

    for ( var prop in prototype ) {

      if ( !_.isFunction ( prototype[prop] ) ) {

        proxiedPrototype[prop] = prototype[prop];

      } else {

        proxiedPrototype[prop] = (function ( prop ) {

          var _super = function () {
              return base.prototype[prop].apply ( this, arguments );
            },
            _superApply = function ( args ) {
              return base.prototype[prop].apply ( this, args );
            };

          return function () {

            var __super = this._super,
                __superApply = this._superApply,
                returnValue;

            this._super = _super;
            this._superApply = _superApply;

            returnValue = prototype[prop].apply ( this, arguments );

            this._super = __super;
            this._superApply = __superApply;

            return returnValue;

          };

        })( prop );

      }

    }

    // CONSTRUCTOR PROTOTYPE

    constructor.prototype = _.extend ( basePrototype, proxiedPrototype, {
      constructor: constructor,
      namespace: namespace,
      widgetName: name,
      widgetFullName: fullName
    });

    // CACHE TEMPLATES

    for ( var tmpl_name in prototype.templates ) {

      if ( prototype.templates[tmpl_name] ) {

        $.tmpl.cache[fullName + '-' + tmpl_name] = $.tmpl ( prototype.templates[tmpl_name] );

      }

    }

    // UPDATE PROTOTYPE CHAIN

    if ( existingConstructor ) {

      for ( var i = 0, l = existingConstructor._childConstructors.length; i < l; i++ ) {

        var childPrototype = existingConstructor._childConstructors[i].prototype;

        $.widget ( ( childPrototype.namespace ? childPrototype.namespace + '.' + childPrototype.widgetName : childPrototype.widgetName ), constructor, existingConstructor._childConstructors[i]._proto );

      }

      delete existingConstructor._childConstructors;

    } else {

      base._childConstructors.push ( constructor );

    }

    // CONSTRUCT

    $.widget.bridge ( name, constructor );

    // RETURN

    return constructor;

  };

  /* WIDGET BRIDGE */

  $.widget.bridge = function ( name, object ) {

    // VARIABLES

    var fullName = object.prototype.widgetFullName || name;

    // PLUGIN

    $.fn[name] = function ( options ) {

      if ( this.length === 0 && !object.prototype.templates.base ) return; //INFO: nothing to work on

      var isMethodCall = _.isString ( options ),
          args = _.tail ( arguments ),
          returnValue = this;

      if ( isMethodCall ) {

        // METHOD CALL

        this.each ( function () {

          // VARIABLES

          var methodValue,
              instance = $.data ( this, fullName );

          // GETTING INSTANCE

          if ( options === 'instance' ) {

            returnValue = instance;

            return false;

          }

          // CHECKING VALID CALL

          if ( !instance ) return; //INFO: No instance found

          if ( !_.isFunction ( instance[options] ) || options.charAt ( 0 ) === '_' ) return; //INFO: Private method or property

          // CALLING

          methodValue = instance[options].apply ( instance, args );

          if ( methodValue !== instance && !_.isUndefined ( methodValue ) ) {

            returnValue = methodValue;

            return false;

          }

        });

      } else {

        // SUPPORT FOR PASSING MULTIPLE OPTIONS OBJECTS

        if ( args.length ) {

          options = _.extend.apply ( null, [options].concat ( args ) );

        }

        this.each ( function () {

          // GET INSTANCE

          var instance = $.data ( this, fullName );

          if ( instance ) { // SET OPTIONS

            instance.option ( options || {} );

          } else { // INSTANCIATE

            $.data ( this, fullName, new object ( options, this ) );

          }

        });

      }

      return returnValue;

    };

  };

}( jQuery, _, window, document ));
