
var gulp = require ( 'gulp' ),
    sourcemaps = require ( 'gulp-sourcemaps' ),
    autoprefixer = require ( 'gulp-autoprefixer' ),
    concat = require ( 'gulp-concat' ),
    flatten = require ( 'gulp-flatten' ),
    jade = require ( 'gulp-jade' ),
    changed = require ( 'gulp-changed' ),
    watch = require ( 'gulp-watch' ),
    sizediff = require ( 'gulp-sizediff' ),
    bytediff = require ( 'gulp-bytediff' ),
    clean = require ( 'gulp-clean' ),
    rename = require ( 'gulp-rename' ),
    rename = require ( 'gulp-rename' ),
    imagemin = require ( 'gulp-imagemin' ),
    pngquant = require ( 'imagemin-pngquant' ),
    util = require ( 'gulp-util' ),
    filesize = require ( 'gulp-filesize' ),
    uglify = require ( 'gulp-uglify' ),
    resolveDependencies = require ( 'gulp-resolve-dependencies '),
    filelog = require ( 'gulp-filelog' );

/* TASKS */

gulp.task ( 'images', function () {

    'use strict';

    return gulp.src ( 'src/components/**/*.{bmp,gif,jpg,jpeg,png,svg}' )
               .pipe ( bytediff.start () )
               .pipe ( imagemin ({
                 interlaced: true, //INFO: GIF
                 progressive: true, //INFO: JPG
                 optimizationLevel: 7, //INFO: PNG
                 multipass: true, //INFO: SVG
                 svgoPlugins: [{ removeViewBox: false}],
                 use: [pngquant ()]
               }))
               .pipe ( bytediff.stop () )
               .pipe ( flatten () )
               .pipe ( gulp.dest ( 'dist/images' ) );

});

gulp.task ( 'jade', function () {

    'use strict';

    return gulp.src ( 'src/components/**/*.jade' )
           .pipe ( concat ( 'svelto.mixins.jade ') )
           .pipe ( gulp.dest ( 'dist/jade' ) );

});

gulp.task ( 'js', function () {

    'use strict';

    return gulp.src ( 'src/components/**/*.js' )
               .pipe (  )
               .pipe (  )
               .pipe (  )
               .pipe (  )

});

gulp.task ( 'default', function () {

  //TODO

});
