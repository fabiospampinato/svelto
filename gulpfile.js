
/* =========================================================================
 * Svelto - Gulpfile
 * =========================================================================
 * Copyright (c) 2015-2017 Fabio Spampinato
 * Licensed under MIT (https://github.com/svelto/svelto/blob/master/LICENSE)
 * ========================================================================= */

/* REQUIRE */

require ( './tasks/admin/bump/npm' );
require ( './tasks/admin/bump/scss' );
require ( './tasks/admin/bump/javascript' );
require ( './tasks/admin/bump/meteor' );
require ( './tasks/admin/bump' );

require ( './tasks/admin/publish/npm' );
require ( './tasks/admin/publish/meteor' );
require ( './tasks/admin/publish' );

require ( './tasks/admin/release' );

require ( './tasks/clean/fonts' );
require ( './tasks/clean/images' );
require ( './tasks/clean/javascript' );
require ( './tasks/clean/javascript_temp' );
require ( './tasks/clean/scss' );
require ( './tasks/clean/css' );
require ( './tasks/clean/style' );
require ( './tasks/clean' );

require ( './tasks/build/fonts' );
require ( './tasks/build/images' );
require ( './tasks/build/scss/parts/functions' );
require ( './tasks/build/scss/parts/keyframes' );
require ( './tasks/build/scss/parts/mixins' );
require ( './tasks/build/scss/parts/style' );
require ( './tasks/build/scss/parts/variables' );
require ( './tasks/build/scss/parts' );
require ( './tasks/build/scss' );
require ( './tasks/build/css' );
require ( './tasks/build/style' );
require ( './tasks/build/javascript/temp' );
require ( './tasks/build/javascript/development' );
require ( './tasks/build/javascript/production' );
require ( './tasks/build/javascript' );
require ( './tasks/build' );

require ( './tasks/watch/fonts' );
require ( './tasks/watch/images' );
require ( './tasks/watch/scss' );
require ( './tasks/watch/javascript' );
require ( './tasks/watch' );

require ( './tasks/demo/meteor' );
require ( './tasks/demo/browser_sync' );
require ( './tasks/demo' );

require ( './tasks/help' );
require ( './tasks/version' );
require ( './tasks/default' );
