
var gulp = require ( 'gulp' ),
    sourcemaps = require ( 'gulp-sourcemaps' ),
    autoprefixer = require ( 'gulp-autoprefixer' ),
    concat = require ( 'gulp-concat' ),
    flatten = require ( 'gulp-flatten' ),
    jade = require ( 'gulp-jade' ),
    rename = require ( 'gulp-rename' );


/*

  return gulp.src ().pipe ( ... )

  sourcemaps.init ()
  sourcemaps.write ( '.' )

  autoprefixer ({
    browsers: ['last 2 versions'],
    cascade: false
  })

  concat ( '.' )

  flatten ()

  jade ({
    locals: {},
    pretty: false
  })

  gulp.dest ( '.' )

*/

gulp.tast ( 'images', function () {

    'use strict';

    gulp.src ( '/src/components/*/*.jade' )
        .pipe ();


});

gulp.task ( 'default', function () {

  //TODO

});
