
/* ======================================================================================
 * @PROJECT-NAME v@PROJECT-VERSION - @FILE-NAME-UPPERCASED v0.1.0
 * @PROJECT-REPOSITORY-URL/@PROJECT-BRANCH/@FILE-PATH
 * @PROJECT-WEBSITE/@FILE-NAME
 * ======================================================================================
 * Copyright @PROJECT-START-YEAR-@CURRENT-YEAR @PROJECT-COPYRIGHT-HOLDER
 * Licensed under @PROJECT-LICENSE-NAME (@PROJECT-REPOSITORY-URL/@PROJECT-BRANCH/@PROJECT-LICENSE-FILE-PATH)
 * ====================================================================================== */

var gulp = require ( 'gulp' ),
    sourcemaps = require ( 'gulp-sourcemaps' ),
    autoprefixer = require ( 'gulp-autoprefixer' ),
    concat = require ( 'gulp-concat' ),
    flatten = require ( 'gulp-flatten' ),
    jade = require ( 'gulp-jade' ),
    path = require ( 'path' ),
    newer = require ( 'gulp-newer' ),
    babel = require ( 'gulp-babel' ),
    // changed = require ( 'gulp-changed' ),
    ignore = require ( 'gulp-ignore' ),
    // rimraf = require ( 'gulp-rimraf' ),
    // watch = require ( 'gulp-watch' ),
    minify_css = require ( 'gulp-minify-css' ),
    // sizediff = require ( 'gulp-sizediff' ),
    bytediff = require ( 'gulp-bytediff' ),
    // minify_html = require ( 'gulp-minify-html' ),
    sass = require ( 'gulp-sass' ),
    clean = require ( 'gulp-clean' ),
    rename = require ( 'gulp-rename' ),
    imagemin = require ( 'gulp-imagemin' ),
    pngquant = require ( 'imagemin-pngquant' ),
    util = require ( 'gulp-util' ),
    // history = require ( 'connect-history-api-fallback' ),
    // filesize = require ( 'gulp-filesize' ),
    uglify = require ( 'gulp-uglify' ),
    browserSync = require ( 'browser-sync' ).create (),
    browserSync_inited = false,
    resolveDependencies = require ( 'gulp-resolve-dependencies' ),
    filelog = require ( 'gulp-filelog' );

/* IMAGES */

gulp.task ( 'images', function () {

    return gulp.src ( 'src/components/**/*.{bmp,gif,jpg,jpeg,png,svg}' )
               .pipe ( newer ({
                 dest: 'dist/images',
                 map: function ( relativePath ) {
                    return path.basename ( relativePath );
                 }
               }))
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
               .pipe ( gulp.dest ( 'dist/images' ) )
               .pipe ( browserSync_inited ? browserSync.reload () : util.noop () );

});

/* EXAMPLES */

gulp.task ( 'examples', ['jade'], function () {

  return gulp.src ( 'examples/**/*.jade' )
             .pipe ( ignore.exclude ( '**/layout.jade' ) )
             .pipe ( jade ({
               locals: {},
               pretty: true
             }))
            //  .pipe ( minify_html ({
            //    considtionals: true
            //  }))
             .pipe ( gulp.dest ( 'examples' ) )
             .pipe ( browserSync_inited ? browserSync.reload () : util.noop () );

});

/* JADE */

gulp.task ( 'jade', function () {

    return gulp.src ( 'src/components/**/*.jade' )
           .pipe ( concat ( 'svelto.mixins.jade' ) )
           .pipe ( gulp.dest ( 'dist/jade' ) );

});

/* JAVASCRIPT */

gulp.task ( 'js', function () {

    return gulp.src ( 'src/components/**/*.js' )
               .pipe ( resolveDependencies ({
                 pattern: /\* @requires [\s-]*(.*\.js)/g
               }))
               .pipe ( sourcemaps.init () )
               .pipe ( babel () )
               .pipe ( concat ( 'svelto.js' ) )
               .pipe ( gulp.dest ( 'dist/js' ) )
               .pipe ( uglify () )
               .pipe ( rename ( 'svelto.min.js' ) )
               .pipe ( gulp.dest ( 'dist/js' ) )
               .pipe ( sourcemaps.write () )
               .pipe ( rename ( 'svelto.min.js.map' ) )
               .pipe ( gulp.dest ( 'dist/js' ) )
               .pipe ( browserSync_inited ? browserSync.stream ({ match: '**/*.{js,js.map}' }) : util.noop () );

});

/* CSS */

gulp.task ( 'css', function () {

  return gulp.src ( 'src/components/**/*.scss' )
             .pipe ( resolveDependencies ({
                 pattern: /\* @requires [\s-]*(.*\.scss)/g
             }))
             .pipe ( sourcemaps.init () )
             .pipe ( concat ( 'all' ) )
             .pipe ( sass ({
               outputStyle: 'expanded',
               precision: 10
             }))
             .pipe ( autoprefixer ({
               browsers: ['Android >= 4', 'Chrome >= 21', 'Firefox >= 28', 'Explorer >= 10', 'Edge >= 1', 'iOS >= 7.1', 'Safari >= 7'],
               cascade: true,
               remove: true
             }))
             .pipe ( rename ( 'svelto.css' ) )
             .pipe ( gulp.dest ( 'dist/css' ) )
             .pipe ( minify_css ({
               keepSpecialComments: 0,
               roundingPrecision: -1
             }))
             .pipe ( rename ( 'svelto.min.css' ) )
             .pipe ( gulp.dest ( 'dist/css' ) )
             .pipe ( sourcemaps.write () )
             .pipe ( rename ( 'svelto.min.css.map' ) )
             .pipe ( gulp.dest ( 'dist/css' ) )
             .pipe ( browserSync_inited ? browserSync.stream ({ match: '**/*.{css,css.map}' }) : util.noop () );

});

/* CLEAN */

gulp.task ( 'clean', function () {

  return gulp.src ( ['dist/*', 'examples/**/*.html'] )
             .pipe ( clean () );

});

/* BUILD */

gulp.task ( 'build', ['images', 'js', 'css', 'examples'] );

/* WATCH */

var watcher = function () {

  gulp.watch ( 'src/components/**/*.{bmp,gif,jpg,jpeg,png,svg}', ['images'] );
  gulp.watch ( 'src/components/**/*.jade', ['jade'] );
  gulp.watch ( 'src/components/**/*.js', ['js'] );
  gulp.watch ( 'src/components/**/*.scss', ['css'] );
  gulp.watch ( 'dist/jade/svelto.mixins.jade', ['examples'] );

};

gulp.task ( 'watch', watcher );

/* SERVE */

gulp.task ( 'serve', function () {

    browserSync.init ({
      server: 'examples',
      serveStatic: ['dist/images', 'dist/css', 'dist/js'],
      notify: false
    });

    browserSync_inited = true;

    watcher ();

});

/* DEFAULT */

gulp.task ( 'default', ['build'] );
