
/* PROGRESS BAR */

//TODO: this way of exenting the property erases previous setted styles (synce a array is extended with a copy, we are not extending the childs)
//TODO: make templates DRY

;(function ( $, window, document, undefined ) {

    'use strict';

    /* PRIVATE */

    var generate_options = function ( options, multiple ) {

        if ( !_.isUndefined ( multiple ) ) {

            var new_options = { percentages: Array ( arguments.length ) };

            for ( var i = 0, l = arguments.length; i < l; i++ ) {

                new_options.percentages[i] = _.isNumber ( arguments[i] ) ? { value: arguments[i] } : arguments[i];

            }

        } else {

            var new_options = _.isNumber ( options ) ? { percentages: [{ value: options }] } : ( options.percentages ? options : { percentages: [options] } );

        }

        return new_options;

    };

    /* HELPER */

    $.progressBar = function ( options, multiple ) {

        options = generate_options.apply ( null, arguments );

        return new $.presto.progressBar ( options );

    };

    /* PROGRESS BAR */

    $.widget ( 'presto.progressBar', {

        /* TEMPLATES */

        templates: {
            base: '<div class="progressBar {%=(o.striped ? "striped" : "")%} {%=o.color%} {%=o.size%} {%=o.css%}">' +
                      '<div class="progressBar-unhighlighted">' +
                          '{% include ( "presto.progressBar.percentages" + ( o.labeled ? "_labeled" : "" ), o.percentages ); %}' +
                      '</div>' +
                      '<div class="progressBar-stripes"></div>' +
                  '</div>',
            percentages: '{% for ( var i = 0; i < o.length; i++ ) { %}' +
                             '{% include ( "presto.progressBar.percentage", o[i] ); %}' +
                         '{% } %}',
            percentages_labeled: '{% for ( var i = 0; i < o.length; i++ ) { %}' +
                                     '{% include ( "presto.progressBar.percentage_labeled", o[i] ); %}' +
                                 '{% } %}',
            percentage: '<div class="progressBar-highlighted {%=(o.color || "")%} {%=(o.css || "")%}"></div>',
            percentage_labeled: '<div class="progressBar-highlighted {%=(o.color || "")%} {%=(o.css || "")%}">' +
                                    '{% include ( "presto.progressBar.label", {} ); %}' +
                                '</div>',
            label: '<div class="progressBar-label"></div>'
        },

        /* OPTIONS */

        options: {
            percentages: [],
            /*
                       : [{
                           value: 0,
                           color: '',
                           css: ''
                       }],
            */

            color: '',
            size: '',
            css: '',

            striped: false,
            labeled: false,
            decimals: 0,

            callbacks: {
                update: $.noop,
                full: $.noop
            }
        },

        /* SPECIAL */

        _variables: function () {

            this.$highlighteds = this.$element.find ( '.progressBar-highlighted' );
            this.$stripes = this.$element.find ( '.progressBar-stripes' );

        },

        _init: function () {

            if ( this.initializationType !== 'element' ) {

                this._update ();

            }

        },

        /* PRIVATE */

        _update: function () {

            for ( var i = 0, l = this.options.percentages.length; i < l; i++ ) {

                var $highlighted = this.$highlighteds.eq ( i );

                $highlighted.width ( this.options.percentages[i].value + '%' );

                if ( this.options.labeled ) {

                    var $label = $highlighted.find ( '.progressBar-label' );

                    $label.html ( +(this.options.percentages[i].value).toFixed ( this.options.decimals ) );

                }

            }

            if ( this.options.striped ) {

                //TODO: use the fixed _.sum function instead

                var sum = 0,
                    all = this.get ().slice ( 0, this.$highlighteds.length );

                for ( var i = 0, l = all.length; i < l; i++ ) {

                    sum += all[i];

                }

                this.$stripes.width ( sum + '%' );

                if ( sum === 100 ) {

                    this._trigger ( 'full' ); //TODO: move it, it should be here I think...

                }

            }

        },

        /* PUBLIC */

        get: function () {

            return _.map ( this.options.percentages, function ( percentage ) {

                return percentage.value;

            });

        },

        set: function ( options, multiple ) {

            options = generate_options.apply ( null, arguments );

            _.extend ( this.options, options );

            this._update ();

            this._trigger ( 'update' );

        }

    });

    /* READY */

    $(function () {

        $('.progressBar').each ( function () {

            var $progressBar = $(this),
                options = {
                    percentages: [],
                    striped: $progressBar.hasClass ( 'striped' ),
                    labeled: !!$progressBar.find ( '.progressBar-label' ).length
                };

            $progressBar.find ( '.progressBar-highlighted' ).each ( function () {

                options.percentages.push ({
                    value: parseFloat ( this.style.width )
                });

            });

            $progressBar.progressBar ( options );

        });

    });

}( lQuery, window, document ));
