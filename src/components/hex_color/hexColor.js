
/* ======================================================================================
 * @PROJECT-NAME v@PROJECT-VERSION - @FILE-NAME-UPPERCASED v0.1.0
 * @PROJECT-REPOSITORY-URL/@PROJECT-BRANCH/@FILE-PATH
 * @PROJECT-WEBSITE/@FILE-NAME
 * ======================================================================================
 * Copyright @PROJECT-START-YEAR-@CURRENT-YEAR @PROJECT-COPYRIGHT-HOLDER
 * Licensed under @PROJECT-LICENSE-NAME (@PROJECT-REPOSITORY-URL/@PROJECT-BRANCH/@PROJECT-LICENSE-FILE-PATH)
 * ======================================================================================
 * @requires ../color_helper/colorHelper.js
 * ====================================================================================== */

;(function ( _, window, document, undefined ) {

    'use strict';

    /* HEX COLOR */

    window.HexColor = function ( value ) {

        if ( _.isString ( value ) ) {

            value = value.replace ( '#', '' );

             if ( /^([0-9a-f]{3}){2}$/i.test ( value ) ) { //INFO: full 6-chars color

                this.hsv = ColorHelper.hex2hsv ({
                    r: value[0] + value[1],
                    g: value[2] + value[3],
                    b: value[4] + value[5]
                });

            } else if ( /^[0-9a-f]{3}$/i.test ( value ) ) { //INFO: shorthand 3-chars color

                this.hsv = ColorHelper.hex2hsv ({
                    r: value[0] + value[0],
                    g: value[1] + value[1],
                    b: value[2] + value[2]
                });

            } else {

                return this;

            }

            this.isValid = true;

        }

    };

    /* HEX COLOR PROTOTYPE */

    HexColor.prototype = {

        isValid: false,

        hsv: {
            h: 0,
            s: 0,
            v: 0
        },

        getHexStr: function () {

            var hex = ColorHelper.hsv2hex ( this.hsv );

            return '#' + hex.r + hex.g + hex.b;

        }

    };

}( _, window, document ));
