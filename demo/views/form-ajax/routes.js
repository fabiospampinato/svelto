
/* FORM AJAX */

Router.route ( '/form-ajax-test', function () {

  let form = new formidable.IncomingForm ();

  form.parse ( this.request, ( err, fields, files ) => {

    setTimeout ( () => {

      this.response.end ( JSON.stringify ({
        msg: 'Form submitted using ajax! What\'s "' + fields.input_1 + '"?'
      }));

    }, 1500 );

  });

}, { where: 'server' });
