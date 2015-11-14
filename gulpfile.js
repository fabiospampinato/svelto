
/* =========================================================================
* Svelto - Gulpfile
* =========================================================================
* Copyright (c) 2015 Fabio Spampinato
* Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
* ========================================================================= */

/* REQUIRES */

var _           = require ( 'lodash' ),
    argv        = require ( 'yargs' ).argv,
    fs          = require ( 'fs' ),
    merge       = require ( 'merge-stream' ),
    path        = require ( 'path' ),
    pngquant    = require ( 'imagemin-pngquant' ),
    svgo        = require ( 'imagemin-svgo' );

/* GULP */

var gulp = require ( 'gulp' );

/* GULP PLUGINS */

var autoprefixer = require ( 'gulp-autoprefixer' ),
    babel        = require ( 'gulp-babel' ),
    bytediff     = require ( 'gulp-bytediff' ),
    clean        = require ( 'gulp-clean' ),
    concat       = require ( 'gulp-concat' ),
    csso         = require ( 'gulp-csso' ),
    dependencies = require ( 'gulp-resolve-dependencies' ),
    filelog      = require ( 'gulp-filelog' ),
    flatten      = require ( 'gulp-flatten' ),
    foreach      = require ( 'gulp-foreach' ),
    gulpif       = require ( 'gulp-if' ),
    gutil        = require ( 'gulp-util' ),
    imagemin     = require ( 'gulp-imagemin' ),
    minify_css   = require ( 'gulp-minify-css' ),
    newer        = require ( 'gulp-newer' ),
    rename       = require ( 'gulp-rename' ),
    sass         = require ( 'gulp-sass' ),
    sort         = require ( 'gulp-sort' ),
    sourcemaps   = require ( 'gulp-sourcemaps' ),
    uglify       = require ( 'gulp-uglify' );

/* FLAGS */

var isProduction  = !!argv.production,
    isDevelopment = !isProduction;

/* FONTS */

gulp.task ( 'fonts', function () {

  return gulp.src ( 'src/**/*.{eot,ttf,woff,woff2}' )
             .pipe ( flatten () )
             .pipe ( gulp.dest ( 'dist/fonts' ) );

});

/* IMAGES */

//FIXME: We shoudn't compress images lossly
//FIXME: It doesn't work with SVGs, the blur.svg doesn't work anymore after

gulp.task ( 'images', function () {

  return gulp.src ( 'src/**/*.{bmp,gif,ico,jpg,jpeg,png,svg}' )
             .pipe ( newer ({
               dest: 'dist/images',
               map: path.basename
             }))
             .pipe ( gulpif ( isProduction, bytediff.start () ) )
             .pipe ( gulpif ( isProduction && !isProduction, imagemin ({ //TODO: Reenable, but fix the svg compression, right not it strips out pretty much everything, even the image
               interlaced: true, //INFO: Affects GIF images
               progressive: true, //INFO: Affects JPG images
               optimizationLevel: 7, //INFO: Affects PNG images
               multipass: true, //INFO: Affects SVG images
               svgoPlugins: [{
                 removeViewBox: false
               }],
               use: [pngquant (), svgo ()]
             })))
             .pipe ( gulpif ( isProduction, bytediff.stop () ) )
             .pipe ( flatten () )
             .pipe ( gulp.dest ( 'dist/images' ) );

});

/* JS */

//TODO: Add support for sourcemaps

gulp.task ( 'js-temp', function () {

  if ( isDevelopment ) {

    var dependencyIndex = 0;

    return gulp.src ( 'src/**/*.js' )
               .pipe ( sort () )
               .pipe ( dependencies ({
                 pattern: /\* @requires [\s-]*(.*\.js)/g
               }))
               .pipe ( foreach ( function ( stream, file ) {
                 var basename = path.basename ( file.path );
                 file.path = file.path.replace ( basename, _.padLeft ( dependencyIndex, 3, 0 ) + '-' + basename );
                 dependencyIndex++;
                 return stream;
               }))
               .pipe ( newer ({
                 dest: '.temp/js',
                 map: path.basename
               }))
               .pipe ( flatten () )
               .pipe ( babel ( JSON.parse ( fs.readFileSync ( '.babelrc' ) ) ) )
               .on ( 'error', function ( err ) {
                 gutil.log ( err.message );
               })
               .pipe ( gulp.dest ( '.temp/js' ) );

  }

});

gulp.task ( 'js', ['js-temp'], function () {

  if ( isDevelopment ) {

    return gulp.src ( '.temp/js/*.js' )
               .pipe ( newer ( 'dist/js/svelto.js' ) )
               .pipe ( sort () )
               .pipe ( concat ( 'svelto.js' ) )
               .pipe ( gulp.dest ( 'dist/js' ) )
               .pipe ( rename ( 'svelto.min.js' ) )
               .pipe ( gulp.dest ( 'dist/js' ) );

  } else {

    return gulp.src ( 'src/**/*.js' )
              //  .pipe ( newer ( 'dist/js/svelto.js' ) ) //FIXME: Maybe nothing is changed in the files, but we switched between development and production so we should recompile
               .pipe ( sort () )
               .pipe ( dependencies ({
                 pattern: /\* @requires [\s-]*(.*\.js)/g
               }))
               .pipe ( flatten () )
               .pipe ( concat ( 'svelto.js' ) )
               .pipe ( babel ( JSON.parse ( fs.readFileSync ( '.babelrc' ) ) ) )
               .on ( 'error', function ( err ) {
                 gutil.log ( err.message );
               })
               .pipe ( gulp.dest ( 'dist/js' ) )
               .pipe ( uglify () )
               .pipe ( rename ( 'svelto.min.js' ) )
               .pipe ( gulp.dest ( 'dist/js' ) );

  }

});

/* CSS */

//TODO: Add partial compilation
//TODO: Add support for sourcemaps

gulp.task ( 'css', ['scss-full'], function () {

 return gulp.src ( 'dist/scss/svelto.scss' )
            .pipe ( newer ( 'dist/css/svelto.css' ) )
            .pipe ( sass ({
              outputStyle: 'expanded',
              precision: 10
            }).on ( 'error', sass.logError ) )
            .pipe ( gulpif ( isProduction, autoprefixer ({
              browsers: ['ie >= 10', 'ie_mob >= 10', 'ff >= 30', 'chrome >= 34', 'safari >= 7', 'opera >= 23', 'ios >= 7', 'android >= 4.4', 'bb >= 10'], //INFO: Pointer events is available on IE 11+
              cascade: true,
              remove: true
            })))
            .pipe ( rename ( 'svelto.css' ) )
            .pipe ( gulp.dest ( 'dist/css' ) )
            .pipe ( gulpif ( isProduction, csso () ) )
            .pipe ( gulpif ( isProduction, minify_css ({
              keepSpecialComments: 0,
              roundingPrecision: -1
            })))
            .pipe ( rename ( 'svelto.min.css' ) )
            .pipe ( gulp.dest ( 'dist/css' ) );

});

gulp.task ( 'scss-full', ['scss-parts'], function () {

 return gulp.src ( ['dist/scss/svelto.variables.scss', 'dist/scss/svelto.mixins.scss', 'dist/scss/svelto.components.scss'] )
            .pipe ( newer ( 'dist/scss/svelto.scss' ) )
            .pipe ( concat ( 'svelto.scss' ) )
            .pipe ( gulp.dest ( 'dist/scss' ) );

});

gulp.task ( 'scss-parts', function () {

  var stream_variables = gulp.src ( ['src/**/variables.scss', 'src/variables/**/*.scss'] )
                             .pipe ( newer ( 'dist/scss/svelto.variables.scss' ) )
                             .pipe ( sort () )
                             .pipe ( dependencies ({
                               pattern: /\* @requires [\s-]*(.*\.scss)/g
                             }))
                             .pipe ( concat ( 'svelto.variables.scss' ) )
                             .pipe ( gulp.dest ( 'dist/scss' ) );

  var stream_mixins = gulp.src ( ['src/**/mixins.scss', 'src/mixins/**/*.scss'] )
                          .pipe ( newer ( 'dist/scss/svelto.mixins.scss' ) )
                          .pipe ( sort () )
                          .pipe ( dependencies ({
                            pattern: /\* @requires [\s-]*(.*\.scss)/g
                          }))
                          .pipe ( concat ( 'svelto.mixins.scss' ) )
                          .pipe ( gulp.dest ( 'dist/scss' ) );

  var stream_others = gulp.src ( ['src/**/*.scss', '!src/**/variables.scss', '!src/variables/**/*.scss', '!src/**/mixins.scss', '!src/mixins/**/*.scss'] )
                          .pipe ( newer ( 'dist/scss/svelto.components.scss' ) )
                          .pipe ( sort () )
                          .pipe ( dependencies ({
                            pattern: /\* @requires [\s-]*(.*\.scss)/g
                          }))
                          .pipe ( concat ( 'svelto.components.scss' ) )
                          .pipe ( gulp.dest ( 'dist/scss' ) );

  return merge ( stream_variables, stream_mixins, stream_others );

});

/* CLEAN */

gulp.task ( 'clean', function () {

  return gulp.src ( ['.temp', 'dist'] )
             .pipe ( clean () );

});

/* BUILD */

gulp.task ( 'build', ['fonts', 'images', 'js', 'css'] );

/* WATCH */

var watcher = function () {

  gulp.watch ( 'src/**/*.{eot,ttf,woff,woff2}', ['fonts'] );
  gulp.watch ( 'src/**/*.{bmp,gif,ico,jpg,jpeg,png,svg}', ['images'] );
  gulp.watch ( 'src/**/*.js', ['js'] );
  gulp.watch ( 'src/**/*.scss', ['css'] );

};

gulp.task ( 'watch', watcher );

/* DEFAULT */

gulp.task ( 'default', ['build'] );
