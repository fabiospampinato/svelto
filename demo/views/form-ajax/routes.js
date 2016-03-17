
/* FORM AJAX BASIC */

Router.route ( '/form-ajax-basic', function () {

  let form = new formidable.IncomingForm ();

  form.parse ( this.request, ( err, fields, files ) => {

    setTimeout ( () => {

      this.response.end ( JSON.stringify ({
        msg: 'Form submitted using ajax! What\'s "' + fields.input_1 + '"?'
      }));

    }, 1500 );

  });

}, { where: 'server' });

/* FORM AJAX FILE */

Router.route ( '/form-ajax-file', function () {

  let form = new formidable.IncomingForm ();

  form.parse ( this.request, ( err, fields, files ) => {

    setTimeout ( () => {

      this.response.end ( JSON.stringify ({
        msg: 'Form submitted using ajax! "' + files.file.name + '" has been uploaded too!'
      }));

    }, 1500 );

  });

}, { where: 'server' });
