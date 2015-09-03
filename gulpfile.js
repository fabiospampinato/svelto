
/* ======================================================================================
 * @PROJECT-NAME v@PROJECT-VERSION - @FILE-NAME-UPPERCASED v0.1.0
 * @PROJECT-REPOSITORY-URL/@PROJECT-BRANCH/@FILE-PATH
 * @PROJECT-WEBSITE/@FILE-NAME
 * ======================================================================================
 * Copyright @PROJECT-START-YEAR-@CURRENT-YEAR @PROJECT-COPYRIGHT-HOLDER
 * Licensed under @PROJECT-LICENSE-NAME (@PROJECT-REPOSITORY-URL/@PROJECT-BRANCH/@PROJECT-LICENSE-FILE-PATH)
 * ====================================================================================== */

var gulp = require ( 'gulp' ),
    fs = require('fs'),
    sourcemaps = require ( 'gulp-sourcemaps' ),
    autoprefixer = require ( 'gulp-autoprefixer' ),
    merge = require ( 'merge-stream' ),
    concat = require ( 'gulp-concat' ),
    _ = require ( 'lodash' ),
    foreach = require ( 'gulp-foreach' ),
    flatten = require ( 'gulp-flatten' ),
    sort = require ( 'gulp-sort' ),
    jade = require ( 'gulp-jade' ),
    path = require ( 'path' ),
    newer = require ( 'gulp-newer' ),
    babel = require ( 'gulp-babel' ),
    sequence = require ( 'gulp-sequence' ),
    changed = require ( 'gulp-changed' ),
    ignore = require ( 'gulp-ignore' ),
    rimraf = require ( 'gulp-rimraf' ),
    watch = require ( 'gulp-watch' ),
    minify_css = require ( 'gulp-minify-css' ),
    sizediff = require ( 'gulp-sizediff' ),
    bytediff = require ( 'gulp-bytediff' ),
    minify_html = require ( 'gulp-minify-html' ),
    sass = require ( 'gulp-sass' ),
    clean = require ( 'gulp-clean' ),
    rename = require ( 'gulp-rename' ),
    imagemin = require ( 'gulp-imagemin' ),
    pngquant = require ( 'imagemin-pngquant' ),
    util = require ( 'gulp-util' ),
    history = require ( 'connect-history-api-fallback' ),
    filesize = require ( 'gulp-filesize' ),
    uglify = require ( 'gulp-uglify' ),
    browserSync = require ( 'browser-sync' ).create (),
    browserSync_inited = false,
    resolveDependencies = require ( 'gulp-resolve-dependencies' ),
    filelog = require ( 'gulp-filelog' );

/* IMAGES */

//FIXME: It doesn't work with SVGs, the blur.svg doesn't work anymore after

gulp.task ( 'images', function () {

    return gulp.src ( 'src/components/**/*.{bmp,gif,jpg,jpeg,png,svg}' )
               .pipe ( newer ({
                 dest: 'dist/images',
                 map: path.basename
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
               .pipe ( browserSync_inited ? browserSync.stream () : util.noop () );

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
             }) )
             .pipe ( jade ({
               locals: {},
               pretty: true
             }))
            //  .pipe ( minify_html ({
            //    considtionals: true
            //  }))
             .pipe ( gulp.dest ( 'examples' ) )
             .pipe ( browserSync_inited ? browserSync.stream () : util.noop () );

});

/* JADE */

gulp.task ( 'jade', ['examples-clean'], function () {

  //TODO: Only perform `examples-clean` if we update the mixins file

    return gulp.src ( 'src/components/**/*.jade' )
               .pipe ( newer ( 'dist/jade/svelto.mixins.jade' ) )
               .pipe ( concat ( 'svelto.mixins.jade' ) )
               .pipe ( gulp.dest ( 'dist/jade' ) );

});

/* JAVASCRIPT */

//TODO: Add support for sourcemaps

gulp.task ( 'js-temp', function () {

  var dependencyIndex = 0,
      mtimes = {};

  return gulp.src ( 'src/components/**/*.js' )
             .pipe ( foreach ( function ( stream, file ) {
               mtimes[file.path] = _.cloneDeep ( file.stat.mtime );
               return stream;
             }))
             .pipe ( sort () )
             .pipe ( resolveDependencies ({
               pattern: /\* @requires [\s-]*(.*\.js)/g
             }))
             .pipe ( foreach ( function ( stream, file ) {
               file.stat = {
                 mtime: mtimes[file.path]
               };
               var basename = path.basename ( file.path );
               file.path = file.path.replace ( basename, _.padLeft ( dependencyIndex, 3, 0 ) + '-' + basename );
               dependencyIndex++;
               return stream;
             }))
             .pipe ( newer ({
               dest: '.temp/js',
               map: path.basename
             }) )
             .pipe ( flatten () )
             .pipe ( gulp.dest ( '.temp/js' ) )
             .pipe ( babel () )
             .pipe ( uglify () )
             .pipe ( gulp.dest ( '.temp/js/min' ) );

});

gulp.task ( 'js', ['js-temp'], function () {

    var unminified = gulp.src ( '.temp/js/*.js' )
                         .pipe ( sort () )
                         .pipe ( concat ( 'svelto.js' ) )
                         .pipe ( gulp.dest ( 'dist/js' ) )
                         .pipe ( browserSync_inited ? browserSync.stream ({ match: '**/*.{js,js.map}' }) : util.noop () );

    var minified = gulp.src ( '.temp/js/min/*.js' )
                     .pipe ( sort () )
                     .pipe ( concat ( 'svelto.min.js' ) )
                     .pipe ( gulp.dest ( 'dist/js' ) )
                     .pipe ( browserSync_inited ? browserSync.stream ({ match: '**/*.min.{js,js.map}' }) : util.noop () );

    return merge ( unminified, minified );

});

/* CSS */

//TODO: Add support for sourcemaps

gulp.task ( 'css', function () {

  return gulp.src ( 'src/components/**/*.scss' )
             .pipe ( newer ( 'dist/css/svelto.css' ) )
             .pipe ( sort () )
             .pipe ( resolveDependencies ({
                 pattern: /\* @requires [\s-]*(.*\.scss)/g
             }))
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
             .pipe ( browserSync_inited ? browserSync.stream () : util.noop () )
             .pipe ( minify_css ({
               keepSpecialComments: 0,
               roundingPrecision: -1
             }))
             .pipe ( rename ( 'svelto.min.css' ) )
             .pipe ( gulp.dest ( 'dist/css' ) )
             .pipe ( browserSync_inited ? browserSync.stream () : util.noop () );

});

/* CLEAN */

gulp.task ( 'clean', function () {

  return gulp.src ( ['.temp', 'dist', 'examples/**/*.html'] )
             .pipe ( clean () );

});

/* BUILD */

gulp.task ( 'build', sequence ( 'jade', ['images', 'js', 'css', 'examples'] ) );

/* WATCH */

var watcher = function () {

  gulp.watch ( 'src/components/**/*.{bmp,gif,jpg,jpeg,png,svg}', ['images'] );
  gulp.watch ( 'src/components/**/*.jade', ['jade'] );
  gulp.watch ( 'src/components/**/*.js', ['js'] );
  gulp.watch ( 'src/components/**/*.scss', ['css'] );
  gulp.watch ( ['dist/jade/svelto.mixins.jade', 'examples/**/*.jade'], ['examples'] );

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
