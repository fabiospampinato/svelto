
/* =========================================================================
* Svelto - Gulpfile
* =========================================================================
* Copyright (c) 2015 Fabio Spampinato
* Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
* ========================================================================= */

/* REQUIRES */

var _           = require ( 'lodash' ),
    argv        = require ( 'yargs' ).argv,
    browserSync = require ( 'browser-sync' ).create (),
    fs          = require ( 'fs' ),
    merge       = require ( 'merge-stream' ),
    path        = require ( 'path' ),
    pngquant    = require ( 'imagemin-pngquant' );

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
    ignore       = require ( 'gulp-ignore' ),
    imagemin     = require ( 'gulp-imagemin' ),
    jade         = require ( 'gulp-jade' ),
    minify_css   = require ( 'gulp-minify-css' ),
    minify_html  = require ( 'gulp-minify-html' ),
    newer        = require ( 'gulp-newer' ),
    rename       = require ( 'gulp-rename' ),
    sass         = require ( 'gulp-sass' ),
    sequence     = require ( 'gulp-sequence' ),
    sort         = require ( 'gulp-sort' ),
    sourcemaps   = require ( 'gulp-sourcemaps' ),
    uglify       = require ( 'gulp-uglify' );

/* FLAGS */

var isProduction  = !!argv.production,
    isDevelopment = !isProduction,
    browserOpen   = !!argv.open;

/* IMAGES */

//FIXME: We shoudn't compress images lossly
//FIXME: It doesn't work with SVGs, the blur.svg doesn't work anymore after

gulp.task ( 'images', function () {

  return gulp.src ( 'src/components/**/*.{bmp,gif,ico,jpg,jpeg,png,svg}' )
             .pipe ( newer ({
               dest: 'dist/images',
               map: path.basename
             }))
             .pipe ( gulpif ( isProduction, bytediff.start () ) )
             .pipe ( gulpif ( isProduction, imagemin ({
               interlaced: true, //INFO: Affects GIF images
               progressive: true, //INFO: Affects JPG images
               optimizationLevel: 7, //INFO: Affects PNG images
               multipass: true, //INFO: Affects SVG images
               svgoPlugins: [{ removeViewBox: false }],
               use: [pngquant ()]
             })))
             .pipe ( gulpif ( isProduction, bytediff.stop () ) )
             .pipe ( flatten () )
             .pipe ( gulp.dest ( 'dist/images' ) )
             .pipe ( gulpif ( browserSync.active, browserSync.stream () ) );

});

/* EXAMPLES */

gulp.task ( 'examples-clean', function () {

  return gulp.src ( 'examples/**/*.html' )
             .pipe ( clean () );

});

gulp.task ( 'examples', function () {

  return gulp.src ( 'examples/**/*.jade' )
             .pipe ( ignore.exclude ( '**/layout.jade' ) )
             .pipe ( newer ({
               dest: 'examples',
               ext: '.html'
             }))
             .pipe ( jade ({
               locals: {},
               pretty: false //INFO: Otherwise there are some bugs for example when outputting a block inside a textarea, it gets unneeed extra whitespaces at the beginning
             }))
             .on ( 'error', function ( err ) {
               gutil.log ( err.message );
             })
             .pipe ( gulp.dest ( 'examples' ) )
             .pipe ( gulpif ( browserSync.active, browserSync.stream () ) );

});

/* JADE */

gulp.task ( 'jade', ['examples-clean'], function () {

  //TODO: Only perform `examples-clean` if we update the mixins file

  return gulp.src ( 'src/components/**/*.jade' )
             .pipe ( newer ( 'dist/jade/svelto.mixins.jade' ) )
             .pipe ( concat ( 'svelto.mixins.jade' ) )
             .pipe ( gulp.dest ( 'dist/jade' ) );

});

/* JS */

//TODO: Add support for sourcemaps

gulp.task ( 'js-temp', function () {

  if ( isDevelopment ) {

    var dependencyIndex = 0;

    return gulp.src ( 'src/components/**/*.js' )
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
               .pipe ( gulp.dest ( 'dist/js' ) )
               .pipe ( gulpif ( browserSync.active, gutil.noop () ) );

  } else {

    return gulp.src ( 'src/components/**/*.js' )
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
               .pipe ( gulp.dest ( 'dist/js' ) )
               .pipe ( gulpif ( browserSync.active, gutil.noop () ) );

  }

});

/* CSS */

//TODO: Add partial compilation
//TODO: Add support for sourcemaps

gulp.task ( 'scss', function () {

  return gulp.src ( 'src/components/**/*.scss' )
             .pipe ( newer ( 'dist/css/svelto.css' ) )
             .pipe ( sort () )
             .pipe ( dependencies ({
               pattern: /\* @requires [\s-]*(.*\.scss)/g
             }))
             .pipe ( concat ( 'svelto.scss' ) )
             .pipe ( gulp.dest ( 'dist/scss' ) )
             .pipe ( sass ({
               outputStyle: 'expanded',
               precision: 10
             }))
             .on ( 'error', function ( err ) {
               gutil.log ( err.message );
             })
            .pipe ( gulpif ( isProduction, autoprefixer ({
               browsers: ['ie >= 11', 'ie_mob >= 11', 'ff >= 30', 'chrome >= 34', 'safari >= 7', 'opera >= 23', 'ios >= 7', 'android >= 4.4', 'bb >= 10'], //INFO: Pointer events is available on IE 11+
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
             .pipe ( gulp.dest ( 'dist/css' ) )
             .pipe ( browserSync.active ? browserSync.stream () : gutil.noop () );

});

/* CLEAN */

gulp.task ( 'clean', function () {

  return gulp.src ( ['.temp', 'dist', 'examples/**/*.html'] )
             .pipe ( clean () );

});

/* BUILD */

gulp.task ( 'build', sequence ( 'jade', ['images', 'js', 'scss', 'examples'] ) );

/* WATCH */

var watcher = function () {

  gulp.watch ( 'src/components/**/*.{bmp,gif,ico,jpg,jpeg,png,svg}', ['images'] );
  gulp.watch ( 'src/components/**/*.jade', ['jade'] );
  gulp.watch ( 'src/components/**/*.js', ['js'] );
  gulp.watch ( 'src/components/**/*.scss', ['scss'] );
  gulp.watch ( ['dist/jade/svelto.mixins.jade', 'examples/**/*.jade'], ['examples'] );

};

gulp.task ( 'watch', watcher );

/* SERVE */

gulp.task ( 'serve', function () {

  browserSync.init ({
    browser: 'google chrome',
    open: browserOpen,
    server: 'examples',
    serveStatic: ['dist/images', 'dist/css', 'dist/js'],
    notify: false
  });

  watcher ();

});

/* DEFAULT */

gulp.task ( 'default', ['build'] );
