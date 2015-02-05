
/* FORMS SYNC */

var forms_synced_groups = [];

$.fn.forms_sync = function () {

    return this.each ( function ( node ) {

        var $form = $(node),
            group_name = $form.data ( 'sync-group' );

        if ( _( forms_synced_groups ).contains ( group_name ) ) return;

        forms_synced_groups.push ( group_name );

        var $forms = $('form[data-sync-group="' + group_name + '"]'),
            $eles = $forms.find ( 'input, textarea, select' );

        $eles.each ( function ( node ) {

            var $ele = $(node),
                name = $ele.attr ( 'name' ),
                is_checkable = $ele.is ( '[type="radio"], [type="checkbox"]' ),
                is_radio = is_checkable && $ele.is ( '[type="radio"]' ),
                is_textbox = $ele.is ( 'input, textarea' ),
                events = is_textbox ? 'input change' : 'change',
                $current_form = $ele.parent ( 'form' ),
                $other_forms = $forms.not ( $current_form ),
                $other_eles = $other_forms.find ( '[name="' + name + '"]' );

            $ele.on ( events, function () {

                var current_value = $ele.val (),
                    current_checked = !!$ele.checked ();

                $other_eles.each ( function ( node ) {

                    var $other_ele = $(node),
                        other_value = $other_ele.val (),
                        other_checked = !!$other_ele.checked ();

                    if ( is_radio ) {

                        if ( current_value !== other_value || current_checked === other_checked ) return;

                    } else if ( current_value === other_value && current_checked === other_checked ) {

                        return;

                    }

                    if ( is_checkable ) {

                        $other_ele.checked ( current_checked ).trigger ( 'change' );

                    } else {

                        $other_ele.val ( current_value ).trigger ( 'change' );

                    }

                });

            });

        });

    });

};

/* READY */

$.dom_ready ( function () {

    $('form[data-sync-group]').forms_sync ();

});
