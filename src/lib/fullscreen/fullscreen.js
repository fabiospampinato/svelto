
// @require core/svelto/svelto.js

(function ( $, _, Svelto ) {

  /* VARIABLES */

  let html = document.documentElement,
      keyboardAllowed = ( typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element ),
      apis = [
        ['requestFullscreen',       'exitFullscreen',       'fullscreenElement',       'fullscreenEnabled',       'fullscreenchange',       'fullscreenerror'],
        ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'],
        ['mozRequestFullScreen',    'mozCancelFullScreen',  'mozFullScreenElement',    'mozFullScreenEnabled',    'mozfullscreenchange',    'mozfullscreenerror'],
        ['msRequestFullscreen',     'msExitFullscreen',     'msFullscreenElement',     'msFullscreenEnabled',     'MSFullscreenChange',     'MSFullscreenError']
      ],
      api = apis.find ( methods => methods[1] in document ),
      raw = {};

  if ( api ) api.forEach ( ( method, index ) => raw[apis[0][index]] = method );

  /* FULLSCREEN */

  let Fullscreen = {
    request ( ele = html ) {
      if ( !raw.requestFullscreen ) return;
      ele[raw.requestFullscreen]( keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT );
    },
    exit () {
      if ( !raw.exitFullscreen ) return;
      document[raw.exitFullscreen]();
    },
    toggle ( ele ) {
      Fullscreen.isFullscreen ? Fullscreen.exit () : Fullscreen.request ( ele );
    },
    get isFullscreen () {
      return !!Fullscreen.element;
    },
    get element () {
      return document[raw.fullscreenElement];
    },
    get enabled () {
      return !!document[raw.fullscreenEnabled];
    },
    raw
  };

  /* EXPORT */

  Svelto.Fullscreen = Fullscreen;

}( Svelto.$, Svelto._, Svelto ));
