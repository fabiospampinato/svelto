//
// /* =========================================================================
//  * Svelto - Tooltip
//  * =========================================================================
//  * Copyright (c) 2015 Fabio Spampinato
//  * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
//  * =========================================================================
//  * @requires ../widget/factory.js
//  * ========================================================================= */
//
// (function ( $, _, window, document, undefined ) {
//
//   'use strict';
//
//   /* CONFIG */
//
//   let config = {
//     name: 'boilerplate',
//     templates: {
//       base: false
//     },
//     options: {
//       errors: {},
//       datas: {},
//       classes: {},
//       selectors: {},
//       animations: {},
//       callbacks: {}
//     }
//   };
//
//   /* TOOLTIP */
//
//   $.factory ( 'svelto.tooltip', {
//
//     /* OPTIONS */
//
//     options: {
//       hover: {
//         triggerable: true
//       },
//       datas: {
//         element: 'tooltip'
//       },
//       selectors: {
//         closer: '.button, .tooltip-closer',
//         trigger: '.tooltip-trigger'
//       }
//     },
//
//     /* SPECIAL */
//
//     _widgetize ( $root ) {
//
//       $root.find ( '.tooltip' ).tooltip ();
//
//     }
//
//   });
//
//   /* BINDING */
//
//   Svelto.Tooltip = Tooltip;
//   Svelto.Tooltip.config = config;
//
//   /* FACTORY */
//
//   $.factory ( Svelto.Tooltip );
//
// }( jQuery, _, window, document ));
