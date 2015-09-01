
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
    rename = require ( 'gulp-rename' ),
    imagemin = require ( 'gulp-imagemin' ),
    pngquant = require ( 'imagemin-pngquant' ),
    util = require ( 'gulp-util' ),
    history = require ( 'connect-history-api-fallback' ),
    filesize = require ( 'gulp-filesize' ),
    uglify = require ( 'gulp-uglify' ),
    browserSync = require ( 'browser-sync' ).create (),
    resolveDependencies = require ( 'gulp-resolve-dependencies' ),
    filelog = require ( 'gulp-filelog' );

/* IMAGES */

gulp.task ( 'images-clean', function () {

    'use strict';

    return gulp.src ( 'dist/images', { read: false } )
               .pipe ( clean () );

});

gulp.task ( 'images', ['images-clean'], function () {

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
               .pipe ( gulp.dest ( 'dist/images' ) )
               .pipe ( browserSync.stream () );

});

/* EXAMPLES */

gulp.task ( 'examples-clean', function () {

  'use strict';

  return gulp.src ( 'examples/**/*.html', { read: false } )
             .pipe ( clean () );

});

gulp.task ( 'examples', ['examples-clean', 'jade'], function () {

  'use strict';

  return gulp.src ( 'examples/**/*.jade' )
             .pipe ( ignore.exclude ( '**/layout.jade' ) )
             .pipe ( jade ({
               locals: {}
             }))
             .pipe ( minify_html ({
               considtionals: true
             }))
             .pipe ( gulp.dest ( 'examples' ) )
             .pipe ( browserSync.stream () );

});

/* JADE */

gulp.task ( 'jade-clean', function () {

    'use strict';

    return gulp.src ( 'dist/jade', { read: false } )
               .pipe ( clean () );

});

gulp.task ( 'jade', ['jade-clean'], function () {

    'use strict';

    return gulp.src ( 'src/components/**/*.jade' )
           .pipe ( concat ( 'svelto.mixins.jade ') )
           .pipe ( gulp.dest ( 'dist/jade' ) );

});

/* JAVASCRIPT */

gulp.task ( 'js-clean', function () {

    'use strict';

    return gulp.src ( 'dist/js', { read: false } )
               .pipe ( clean () );

});

gulp.task ( 'js', ['js-clean'], function () {

    'use strict';

    return gulp.src ( 'src/components/**/*.js' )
               .pipe ( resolveDependencies ({
                 pattern: /\* @requires [\s-]*(.*\.js)/g
               }))
               .pipe ( sourcemaps.init () )
               .pipe ( concat ( 'svelto.js' ) )
               .pipe ( gulp.dest ( 'dist/js' ) )
               .pipe ( uglify () )
               .pipe ( rename ( 'svelto.min.js' ) )
               .pipe ( gulp.dest ( 'dist/js' ) )
               .pipe ( sourcemaps.write () )
               .pipe ( rename ( 'svelto.min.js.map' ) )
               .pipe ( gulp.dest ( 'dist/js' ) )
               .pipe ( browserSync.stream () );

});

/* CSS */

gulp.task ( 'css-clean', function () {

    'use strict';

    return gulp.src ( 'dist/css', { read: false } )
               .pipe ( clean () );

});

gulp.task ( 'css', ['css-clean'], function () {

  'use strict';

  return gulp.src ( 'src/components/**/*.{sass,scss}' )
             .pipe ( resolveDependencies ({
                 pattern: /\* @requires [\s-]*(.*\.(sass|scss))/g
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
             .pipe ( browserSync.stream () );

});

/* CLEAN */

gulp.task ( 'clean', ['images-clean', 'jade-clean', 'js-clean', 'css-clean', 'examples-clean'] );

/* BUILD */

gulp.task ( 'build', ['images', 'js', 'css', 'examples'] );

/* SERVE */

gulp.task ( 'serve', function () {

    'use strict';

    browserSync.init ({
      server: 'examples',
      serveStatic: ['dist/images', 'dist/css', 'dist/js'],
      notify: false
    });

    gulp.watch ( 'dist/jade/svelto.mixins.jade', ['examples'] );
    gulp.watch ( 'src/components/**/*.jade', ['jade'] );
    gulp.watch ( 'src/components/**/*.js', ['js'] );
    gulp.watch ( 'src/components/**/*.{sass,scss}', ['css'] );

    gulp.watch ( 'examples/**/*.html' ).on ( 'change', browserSync.reload );

});

/* DEFAULT */

gulp.task ( 'default', ['build'] );
