
// @require core/widget/helpers.js

//TODO: Add support for plain functions

(function ( $, _, Svelto ) {

  /* PLUGIN */

  let Plugin = {

    call ( Widget, $ele, args ) {

      let options = args[0],
          isMethodCall = ( _.isString ( options ) && options.charAt ( 0 ) !== '_' ); // Methods starting with '_' are private

      for ( let i = 0, l = $ele.length; i < l; i++ ) {

        let instance = $.widget.get ( $ele[i], Widget, options );

        if ( isMethodCall && _.isFunction ( instance[options] ) ) {

          let returnValue = args.length > 1 ? instance[options]( ...Array.prototype.slice.call ( args, 1 ) ) : instance[options]();

          if ( !_.isNil ( returnValue ) ) return returnValue;

        }

      }

      return $ele;

    },

    make ( Widget ) {

      if ( !Widget.config.plugin ) return;

      $.fn[Widget.config.name] = function () {
        return Plugin.call ( Widget, this, arguments );
      };

    },

    unmake ( Widget ) {

      if ( !Widget.config.plugin ) return;

      delete $.fn[Widget.config.name];

    }

  };

  /* EXPORT */

  Svelto.Plugin = Plugin;

}( Svelto.$, Svelto._, Svelto ));
