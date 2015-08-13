
/* ANIMATE */

//FIXME: does it work with units different than pixels???
//TODO: add support for easing

;(function ( $, _, window, document, undefined ) {

    'use strict';

    /* VARIABLES */

    var ms_60fps = 16.5; //INFO: Approximately, it should be a periodic 16.666666

    /* ANIMATE */

    $.fn.animate = function ( properties, duration, easing, complete, delay ) {

        // Support for partial arguments

        if ( !_.isNumber ( duration ) ) {

            delay = complete;
            complete = easing;
            easing = duration;
            duration = 400;

        }

        if ( !_.isString ( easing ) ) {

            complete = easing;
            easing = 'easeOutQuad';

        }

        if ( !_.isFunction ( complete ) ) {

            delay = complete;
            complete = $.noop;

        }

        if ( !_.isNumber ( delay ) ) {

            delay = 0;

        }

        for ( var i = 0, l = this.length; i < l; i++ ) {

            (function ( instance, i ){ //INFO: Avoiding variables overriding when the length is greater than 1

                var ele = instance.nodes[i],
                    $ele = $(ele);

                // Sanitize and create the new_properties (properties that changes)

                var current_properties = {},
                    new_properties = {};

                for ( var prop in properties ) {

                    current_properties[prop] = parseInt ( getComputedStyle ( ele )[prop], 10 );
                    properties[prop] = parseInt ( properties[prop], 10 );

                    if ( properties[prop] !== current_properties[prop] ) { //INFO: checking if something actually changed

                        new_properties[prop] = properties[prop];

                    }

                }

                // If something changes

                if ( _.size ( new_properties ) > 0 ) {

                    setTimeout ( function () {

                        // Populating delta properties (the values to set per each step)

                        var steps_nr = duration / ms_60fps, //TODO: maybe parseInt... pros? cons?
                            delta_properties = {};

                        for ( var prop in new_properties ) {

                            delta_properties[prop] = []; //TODO: Array(steps_nr)

                            var order = current_properties[prop] > new_properties[prop];

                            for ( var step_nr = 0; step_nr < steps_nr; step_nr++ ) {

                                delta_properties[prop][step_nr] = $.easing[easing]( step_nr * ms_60fps, order ? new_properties[prop] : current_properties[prop], order ? current_properties[prop] : new_properties[prop], duration );

                            }

                            if ( order ) delta_properties[prop] = delta_properties[prop].reverse ();

                        }

                        // Scheduling delta properties

                        for ( var prop in new_properties ) {

                            for ( var step_nr = 0; step_nr < steps_nr; step_nr++ ) {

                                setTimeout ( (function ( step_nr ) {

                                    return function () {

                                        $.css_set ( ele, prop, delta_properties[prop][step_nr] );

                                    };

                                })( step_nr ), ms_60fps * step_nr );

                            }

                        }

                        // If the steps are not exactly accurate do the remaining extra change, but do it alsways...

                        setTimeout ( function () {

                            for ( var prop in properties ) {

                                $.css_set ( ele, prop, properties[prop] );

                            };

                        }, duration );

                        // Fire the complete callback

                        if ( i === 0 ) {

                            setTimeout ( function () {

                                complete (); //FIXME: not exactly accurate...

                            }, duration );

                        }

                    }, delay );

                }

            })( this, i );

        }

        return this;

    };

}( jQuery, _, window, document ));
