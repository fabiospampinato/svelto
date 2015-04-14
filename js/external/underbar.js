
/* UNDERBAR */

//FIXME: This only works if the value passed to Underbar is 1, maybe it's not always this
//TODO: add a factory method for adding helpers here
//TODO: make optimizations by pre allocating memory with Array(length);

;(function ( window, document, undefined ) {

    'use strict';

    /* UNDERBAR */

    window.Underbar = function ( value ) {

        return new Underbar.fn.init ( value );

    };

    /* PROTOTYPE */

    Underbar.fn = Underbar.prototype = {

        // VARIABLES

        wrapped: undefined,

        // INIT

        init: function ( value ) {

            this.wrapped = value;

            return this;

        },

        // METHODS

        value: function () {

            return this.wrapped;

        },









        // EVENTS

        get_event_pageXY: function ( event ) {

            var pageXY = {
                pageX : 0,
                pageY : 0
            };

            if ( event.originalEvent === undefined ) {

                event = event.originalEvent;

            }

            if ( event.touches === undefined && event.touches[0] === undefined ) {

                pageXY.pageX = event.touches[0].pageX;
                pageXY.pageY = event.touches[0].pageY;

            } else if ( event.changedTouches === undefined && event.changedTouches[0] === undefined ) {

                pageXY.pageX = event.changedTouches[0].pageX;
                pageXY.pageY = event.changedTouches[0].pageY;

            } else if ( event.pageX === undefined ) {

                pageXY.pageX = event.pageX;
                pageXY.pageY = event.pageY;

            }

            return pageXY;

        },

        // STRING

        search_and_replace: function ( str, search, replace ) {

            if ( search.indexOf ( str ) !== -1 ) {

                str = _.zipObject ( search, replace )[str]; //TODO

            }

            return str;

        },

        // OTHER

        arguments_hash: function () {

            return _.flatten ( arguments ).join (); //TODO

        }

    };

    /* FACTORY */

    Underbar.factory = function ( name, fn ) {

        Underbar[name] = fn;

        Underbar.fn[name] = function () {

            var result = Underbar[name].apply ( this, [this.wrapped].concat ( Array.prototype.slice.call ( arguments, 0 ) ) );

            return ( result.length !== undefined || typeof result === 'object' ) ? Underbar ( result ) : result;

        };

    };










    /* PRIVATE */

    function getIteratee ( iteratee, thisArg ) {

        if ( typeof iteratee === 'function' ) {

            return ( thisArg === undefined ) ? iteratee : iteratee.bind ( thisArg );

        } else if ( iteratee === undefined ) {

            return identity;

        } else if ( typeof iteratee === 'object' ) {

            return matches ( iteratee );

        } else {

            return ( thisArg === undefined ) ? property ( iteratee ) : matchesProperty ( iteratee, thisArg );

        }

    }

    function toIterable ( value ) {

        if ( value == null ) { //INFO: null or undefined

            return [];

        } else if ( value.length === undefined ) {

            var props = keys ( value ),
                index = -1,
                length = props.length,
                result = Array ( length );

            while ( ++index < length ) {

                result[index] = value[props[index]];

            }

            return result;

        } else {

            return ( typeof value === 'object' ) ? value : Object ( value );

        }

    }

    /* ARRAY */

    /*
     * Creates an array of elements split into groups the length of `size`.
     * If `collection` can't be split evenly, the final chunk will be the remaining
     * elements.
     *
     * _.chunk(['a', 'b', 'c', 'd'], 2);
     * // => [['a', 'b'], ['c', 'd']]
     *
     * _.chunk(['a', 'b', 'c', 'd'], 3);
     * // => [['a', 'b', 'c'], ['d']]
     */

    function chunk ( arr, size ) {

        size = size || 1;

        var result = [],
            chunk = [];

        for ( var i = 0, l = arr.length; i < l; i++ ) {

            chunk.push ( arr[i] );

            if ( chunk.length === size ) {

                result.push ( chunk );

                chunk = [];

            }

        }

        if ( chunk.length > 0 ) {

            result.push ( chunk );

        }

        return result;

    }

    Underbar.factory ( 'chunk', chunk );

    /*
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are falsey.
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */

    function compact ( arr ) {

        var result = [];

        for ( var i = 0, l = arr.length; i < l; i++ ) {

            if ( arr[i] ) {

                result.push ( arr[i] );

            }

        }

        return result;

    }

    Underbar.factory ( 'compact', compact );

    /*
     * Creates an array excluding all values of the provided arrays using
     * `SameValueZero` for equality comparisons.
     *
     * _.difference([1, 2, 3], [4, 2]);
     * // => [1, 3]
     */

    function difference () {

        var result = [];

        for ( var i = 0, l = arguments[0].length; i < l; i++ ) {

            for ( var ai = 1, al = arguments.length; ai < al; ai++ ) {

                if ( arguments[ai].indexOf ( arguments[0][i] ) !== -1 ) {

                    ai = al + 1;

                }

            }

            if ( ai === al ) {

                result.push ( arguments[0][i] );

            }

        }

        return result;

    }

    Underbar.factory ( 'difference', difference );

    /*
     * Fills elements of `array` with `value` from `start` up to, but not
     * including, `end`.
     */

    function fill ( arr, value, start, end ) { //TODO: it should mutate the array

        var result = arr.slice ();

        for ( var i = start || 0, l = end || result.length; i < l; i++ ) {

            result[i] = value;

        }

        return result;

    }

    Underbar.factory ( 'fill', fill );

    /*
     * Gets the first element of `array`.
     *
     * _.first([1, 2, 3]);
     * // => 1
     *
     * _.first([]);
     * // => undefined
     */

    function first ( arr ) {

      return arr[0];

    }

    Underbar.factory ( 'first', first );
    Underbar.factory ( 'head', first );

    /*
     * Flattens a nested array. The array is recursively flattened.
     *
     * _.flatten([1, [2, 3, [4]]]);
     * // => [1, 2, 3, 4];
     */

    function flatten ( arr, isDeep ) {

        isDeep = ( isDeep === undefined ) ? 1 : isDeep;

        var result = arr.slice (),
            levels_flattened = 0;

        for ( var i = 0, l = result.length; i < l; i++ ) {

            if ( result[i] instanceof Array ) {

                if ( isDeep !== true && levels_flattened === isDeep ) {

                    break;

                }

                result = Array.prototype.concat.apply ( [], result );

                l = result.length;
                i--;

                levels_flattened++;

            }

        }

        return result;

    }

    Underbar.factory ( 'flatten', flatten );

    /*
     * Recursively flattens a nested array.
     *
     * _.flattenDeep([1, [2, 3, [4]]]);
     * // => [1, 2, 3, 4];
     */

    function flattenDeep ( arr ) {

        return flatten ( arr, true );

    }

    Underbar.factory ( 'flattenDeep', flattenDeep );

    /*
     * Creates an array of unique values in all provided arrays using `SameValueZero`
     * for equality comparisons.
     *
     * _.intersection([1, 2], [4, 2], [2, 1]);
     * // => [2]
     */

    function intersection () {

        var result = [];

        for ( var i = 0, l = arguments[0].length; i < l; i++ ) {

            for ( var ai = 1, al = arguments.length; ai < al; ai++ ) {

                if ( arguments[ai].indexOf ( arguments[0][i] ) === -1 ) {

                    ai = al + 1;

                }

            }

            if ( ai === al ) {

                result.push ( arguments[0][i] );

            }

        }

        return result;

    }

    Underbar.factory ( 'intersection', intersection );

    /*
     * Gets the last element of `array`.
     *
     * _.last([1, 2, 3]);
     * // => 3
     */

    function last ( arr ) {

        return arr[arr.length - 1];

    }

    Underbar.factory ( 'last', last );

    /*
     * Removes all provided values from `array`.
     *
     * var array = [1, 2, 3, 1, 2, 3];
     *
     * _.pull(array, 2, 3);
     * console.log(array);
     * // => [1, 1]
     */

    function pull ( arr ) { //TODO: it should mutate the array

        var result = [],
            pulled = Array.prototype.slice.call ( arguments, 1 );

        for ( var i = 0, l = arr.length; i < l; i++ ) {

            if ( pulled.indexOf ( arr[i] ) === -1 ) {

                result.push ( arr[i] );

            }

        }

        return result;

    }

    Underbar.factory ( 'pull', pull );

    /*
     * Creates an array of unique values, in order, of the provided arrays using
     * `SameValueZero` for equality comparisons.
     *
     * _.union([1, 2], [4, 2], [2, 1]);
     * // => [1, 2, 4]
     */

    function union () {

        return unique ( flatten ( Array.prototype.slice.call ( arguments, 0 ) ) ); //FIXME: flatten just 1 layer

    }

    Underbar.factory ( 'union', union );

    /*
     * Creates a duplicate-value-free version of an array using `SameValueZero`
     * for equality comparisons.
     *
     * _.unique([1, 2, 1]);
     * // => [1, 2]
     */

    function unique ( arr, isSorted ) { //TODO some unimplemented stuff

        arr = arr.slice ();

        var sorted = isSorted ? arr : arr.sort (),
            prev;

        for ( var i = sorted.length - 1; i >= 0; i-- ) {

            if ( sorted[i] === prev ) sorted.splice ( i, 1 );
            else prev = sorted[i];

        }

        return sorted;

    }

    Underbar.factory ( 'unique', unique );
    Underbar.factory ( 'uniq', unique );

    /*
     * This method is like `_.zip` except that it accepts an array of grouped
     * elements and creates an array regrouping the elements to their pre-`_.zip`
     * configuration.
     *
     * _.unzip(zipped);
     * // => [['fred', 'barney'], [30, 40], [true, false]]
     */

    function unzip ( arr ) {

        var result = [],
            nr = arr[0].length,
            l = arr.length,
            temp;

        for ( var i = 0; i < nr; i++ ) {

            temp = Array ( l );

            for ( var ti = 0; ti < l; ti++ ) {

                temp[ti] = arr[ti][i];

            }

            result.push ( temp );

        }

        return result;

    }

    Underbar.factory ( 'unzip', unzip );

    /*
     * Creates an array of grouped elements, the first of which contains the first
     * elements of the given arrays, the second of which contains the second elements
     * of the given arrays, and so on.
     *
     * _.zip(['fred', 'barney'], [30, 40], [true, false]);
     * // => [['fred', 30, true], ['barney', 40, false]]
     */

    function zip () {

        var result = [],
            nr = arguments.length,
            temp;

        for ( var i = 0, l = arguments[0].length; i < l; i++ ) {

            temp = Array ( nr );

            for ( var ti = 0; ti < nr; ti++ ) {

                temp[ti] = arguments[ti][i];

            }

            result.push ( temp );

        }

        return result;

    }

    Underbar.factory ( 'zip', zip );

    /*
     * Creates an object composed from arrays of property names and values. Provide
     * two arrays, one of property names and one of corresponding values.
     *
     * _.zipObject(['fred', 'barney'], [30, 40]);
     * // => { 'fred': 30, 'barney': 40 }
     */

    function zipObject ( keys, values ) { //TODO: unimplemented stuff

        var result = {};

        for ( var i = 0, l = keys.length; i < l; i++ ) {

            result[keys[i]] = values[i];

        }

        return result;

    }

    Underbar.factory ( 'zipObject', zipObject );
    Underbar.factory ( 'object', zipObject );

    /* COLLECTION */

    /*
     * Checks if `predicate` returns truthy for **all** elements of `collection`.
     * The predicate is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * _.every([true, 1, null, 'yes'], Boolean);
     * // => false
     *
     * var users = [
     *   { 'user': 'barney', 'active': false },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.every(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.every(users, 'active', false);
     * // => true
     *
     * // using the `_.property` callback shorthand
     * _.every(users, 'active');
     * // => false
     */

    function arrEvery ( arr, iteratee ) {

        for ( var i = 0, l = arr.length; i < l; i++ ) {

            if ( !iteratee ( arr[i], i, arr ) ) {

                return false;

            }

        }

        return true;

    }

    function objEvery ( obj, iteratee ) {

        for ( var key in obj ) {

            if ( !iteratee ( obj[key], key, obj ) ) {

                return false;

            }

        }

        return true;

    }

    function every ( collection, iteratee, thisArg ) {

        iteratee = getIteratee ( iteratee, thisArg );

        return ( collection.length !== undefined ) ? arrEvery ( collection, iteratee ) : objEvery ( collection, iteratee );

    }

    Underbar.factory ( 'every', every );
    Underbar.factory ( 'all', every );

    /*
     * Iterates over elements of `collection`, returning an array of all elements
     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
     * invoked with three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * _.filter([4, 5, 6], function(n) {
     *   return n % 2 == 0;
     * });
     * // => [4, 6]
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
     * // => ['barney']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.filter(users, 'active', false), 'user');
     * // => ['fred']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.filter(users, 'active'), 'user');
     * // => ['barney']
     */

    function arrFilter ( arr, iteratee ) {

        var result = [];

        for ( var i = 0, l = arr.length; i < l; i++ ) {

            if ( !!iteratee ( arr[i], i, arr ) ) {

                result.push ( arr[i] );

            }

        }

        return result;

    }

    function objFilter ( obj, iteratee ) {

        var result = [];

        for ( var key in obj ) {

            if ( !!iteratee ( obj[key], key, obj ) ) {

                result.push ( obj[key] );

            }

        }

        return result;

    }

    function filter ( collection, iteratee, thisArg ) {

        iteratee = getIteratee ( iteratee, thisArg );

        return ( collection.length !== undefined ) ? arrFilter ( collection, iteratee ) : objFilter ( collection, iteratee );

    }

    Underbar.factory ( 'filter', filter );
    Underbar.factory ( 'select', filter );

    /*
     * Iterates over elements of `collection`, returning the first element
     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
     * invoked with three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': true },
     *   { 'user': 'fred',    'age': 40, 'active': false },
     *   { 'user': 'pebbles', 'age': 1,  'active': true }
     * ];
     *
     * _.result(_.find(users, function(chr) {
     *   return chr.age < 40;
     * }), 'user');
     * // => 'barney'
     *
     * // using the `_.matches` callback shorthand
     * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
     * // => 'pebbles'
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.result(_.find(users, 'active', false), 'user');
     * // => 'fred'
     *
     * // using the `_.property` callback shorthand
     * _.result(_.find(users, 'active'), 'user');
     * // => 'barney'
     */

    function arrFind ( arr, iteratee ) {

        for ( var i = 0, l = arr.length; i < l; i++ ) {

            if ( !!iteratee ( arr[i], i, arr ) ) {

                return arr[i];

            }

        }

    }

    function objFind ( obj, iteratee ) {

        for ( var key in obj ) {

            if ( !!iteratee ( obj[key], key, obj ) ) {

                return obj[key];

            }

        }

    }

    function find ( collection, iteratee, thisArg ) {

        iteratee = getIteratee ( iteratee, thisArg );

        return ( collection.length !== undefined ) ? arrFind ( collection, iteratee ) : objFind ( collection, iteratee );

    }

    Underbar.factory ( 'find', find );
    Underbar.factory ( 'detect', find );

    /*
     * Iterates over elements of `collection` invoking `iteratee` for each element.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection). Iterator functions may exit iteration early
     * by explicitly returning `false`.
     *
     * **Note:** As with other "Collections" methods, objects with a `length` property
     * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
     * may be used for object iteration.
     *
     * _([1, 2]).forEach(function(n) {
     *   console.log(n);
     * }).value();
     * // => logs each value from left to right and returns the array
     *
     * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
     *   console.log(n, key);
     * });
     * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
     */

    function arrEach ( arr, iteratee ) {

        for ( var i = 0, l = arr.length; i < l; i++ ) {

            iteratee ( arr[i], i, arr );

        }

    }

    function objEach ( obj, iteratee ) {

        for ( var key in obj ) {

            iteratee ( obj[key], key, obj );

        }

    }

    function forEach ( collection, iteratee, thisArg ) {

        iteratee = getIteratee ( iteratee, thisArg );

        ( collection.length !== undefined ) ? arrEach ( collection, iteratee ) : objEach ( collection, iteratee );

        return collection;

    }

    Underbar.factory ( 'forEach', forEach );
    Underbar.factory ( 'each', forEach );

    /*
     * Creates an array of values by running each element in `collection` through
     * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments; (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * Many lodash methods are guarded to work as interatees for methods like
     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
     *
     * The guarded methods are:
     * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`, `drop`,
     * `dropRight`, `fill`, `flatten`, `invert`, `max`, `min`, `parseInt`, `slice`,
     * `sortBy`, `take`, `takeRight`, `template`, `trim`, `trimLeft`, `trimRight`,
     * `trunc`, `random`, `range`, `sample`, `uniq`, and `words`
     *
     * function timesThree(n) {
     *   return n * 3;
     * }
     *
     * _.map([1, 2], timesThree);
     * // => [3, 6]
     *
     * _.map({ 'a': 1, 'b': 2 }, timesThree);
     * // => [3, 6] (iteration order is not guaranteed)
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * // using the `_.property` callback shorthand
     * _.map(users, 'user');
     * // => ['barney', 'fred']
     */

    function arrMap ( arr, iteratee ) {

        var result = Array ( arr.length );

        for ( var i = 0, l = arr.length; i < l; i++ ) {

            result[i] = iteratee ( arr[i], i, arr );

        }

        return result;

    }

    function objMap ( obj, iteratee ) {

        var result = [];

        for ( var key in obj ) {

            result.push ( iteratee ( obj[key], key, obj ) );

        }

        return result;

    }

    function map ( collection, iteratee, thisArg ) {

        iteratee = getIteratee ( iteratee, thisArg );

        return ( collection.length !== undefined ) ? arrMap ( collection, iteratee ) : objMap ( collection, iteratee );

    }

    Underbar.factory ( 'map', map );
    Underbar.factory ( 'collect', map );

    // partition

    /*
     * Gets the value of `key` from all elements in `collection`.
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * _.pluck(users, 'user');
     * // => ['barney', 'fred']
     *
     * var userIndex = _.indexBy(users, 'user');
     * _.pluck(userIndex, 'age');
     * // => [36, 40] (iteration order is not guaranteed)
     */

    function pluck ( collection, key ) {

      return map ( collection, key );

    }

    Underbar.factory ( 'pluck', pluck );

    /*
     * Reduces `collection` to a value which is the accumulated result of running
     * each element in `collection` through `iteratee`, where each successive
     * invocation is supplied the return value of the previous. If `accumulator`
     * is not provided the first element of `collection` is used as the initial
     * value. The `iteratee` is bound to `thisArg`and invoked with four arguments;
     * (accumulator, value, index|key, collection).
     *
     * Many lodash methods are guarded to work as interatees for methods like
     * `_.reduce`, `_.reduceRight`, and `_.transform`.
     *
     * The guarded methods are:
     * `assign`, `defaults`, `merge`, and `sortAllBy`
     *
     * _.reduce([1, 2], function(sum, n) {
     *   return sum + n;
     * });
     * // => 3
     *
     * _.reduce({ 'a': 1, 'b': 2 }, function(result, n, key) {
     *   result[key] = n * 3;
     *   return result;
     * }, {});
     * // => { 'a': 3, 'b': 6 } (iteration order is not guaranteed)
     */

    function arrReduce ( arr, iteratee, accumulator ) {

        for ( var i = 0, l = arr.length; i < l; i++ ) {

            accumulator = iteratee ( accumulator, arr[i], i, arr );

        }

        return accumulator;

    }

    function objReduce ( obj, iteratee, accumulator ) {

        for ( var key in obj ) {

            accumulator = iteratee ( accumulator, obj[key], key, obj );

        }

        return accumulator;

    }

    function reduce ( collection, iteratee, accumulator, thisArg ) { //TODO: accumulator should be the first value, not 0

        accumulator = accumulator || 0;

        iteratee = getIteratee ( iteratee, thisArg );

        return ( collection.length !== undefined ) ? arrReduce ( collection, iteratee, accumulator ) : objReduce ( collection, iteratee, accumulator );

    }

    Underbar.factory ( 'reduce', reduce );
    Underbar.factory ( 'foldl', reduce );
    Underbar.factory ( 'inject', reduce );

    /*
     * The opposite of `_.filter`; this method returns the elements of `collection`
     * that `predicate` does **not** return truthy for.
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * _.reject([1, 2, 3, 4], function(n) {
     *   return n % 2 == 0;
     * });
     * // => [1, 3]
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': true }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.reject(users, { 'age': 40, 'active': true }), 'user');
     * // => ['barney']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.reject(users, 'active', false), 'user');
     * // => ['fred']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.reject(users, 'active'), 'user');
     * // => ['barney']
     */

    function arrReject ( arr, iteratee ) {

        var result = [];

        for ( var i = 0, l = arr.length; i < l; i++ ) {

            if ( !iteratee ( arr[i], i, arr ) ) {

                result.push ( arr[i] );

            }

        }

        return result;

    }

    function objReject ( obj, iteratee ) {

        var result = [];

        for ( var key in obj ) {

            if ( !iteratee ( obj[key], key, obj ) ) {

                result.push ( obj[key] );

            }

        }

        return result;

    }

    function reject ( collection, iteratee, thisArg ) {

        iteratee = getIteratee ( iteratee, thisArg );

        return ( collection.length !== undefined ) ? arrReject ( collection, iteratee ) : objReject ( collection, iteratee );

    }

    Underbar.factory ( 'reject', reject );

    /*
     * Gets a random element or `n` random elements from a collection.
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     *
     * _.sample([1, 2, 3, 4], 2);
     * // => [3, 1]
     */

    function sample ( collection, nr ) {

        var result = shuffle ( collection );

        result.length = Math.min ( nr || 0, result.length );

        return result;

    }

    Underbar.factory ( 'sample', sample );

    /*
     * Creates an array of shuffled values, using a version of the Fisher-Yates
     * shuffle. See [Wikipedia](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle)
     * for more details.
     *
     * _.shuffle([1, 2, 3, 4]);
     * // => [4, 1, 3, 2]
     */

    function shuffle ( collection ) { //FIXME

        collection = toIterable ( collection );

        var index = -1,
            length = collection.length,
            result = Array ( length );

        while ( ++index < length ) {

            var rand = random ( 0, index );

            if ( index !== rand ) {

                result[index] = result[random];

            }

            result[random] = collection[index];

        }

        return result;

    }

    Underbar.factory ( 'shuffle', shuffle );

    /*
     * Gets the size of `collection` by returning its length for array-like
     * values or the number of own enumerable properties for objects.
     *
     * _.size([1, 2, 3]);
     * // => 3
     *
     * _.size({ 'a': 1, 'b': 2 });
     * // => 2
     *
     * _.size('pebbles');
     * // => 7
     */

    function size ( collection ) {

        return ( collection.length === undefined ) ? keys ( collection ).length : collection.length;

    }

    Underbar.factory ( 'size', size );

    /*
     * Checks if `predicate` returns truthy for **any** element of `collection`.
     * The function returns as soon as it finds a passing value and does not iterate
     * over the entire collection. The predicate is bound to `thisArg` and invoked
     * with three arguments; (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var users = [
     *   { 'user': 'barney', 'active': true },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.some(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.some(users, 'active', false);
     * // => true
     *
     * // using the `_.property` callback shorthand
     * _.some(users, 'active');
     * // => true
     */

    function arrSome ( arr, iteratee ) {

        var result = [];

        for ( var i = 0, l = arr.length; i < l; i++ ) {

            if ( !!iteratee ( arr[i], i, arr ) ) {

                return true;

            }

        }

        return false;

    }

    function objSome ( obj, iteratee ) {

        var result = [];

        for ( var key in obj ) {

            if ( !!iteratee ( obj[key], key, obj ) ) {

                return true;

            }

        }

        return false;

    }

    function some ( collection, iteratee, thisArg ) {

        iteratee = getIteratee ( iteratee, thisArg );

        return ( collection.length !== undefined ) ? arrSome ( collection, iteratee ) : objSome ( collection, iteratee );

    }

    Underbar.factory ( 'some', some );

    /*
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection through `iteratee`. This method performs
     * a stable sort, that is, it preserves the original sort order of equal elements.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments;
     * (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * _.sortBy([1, 2, 3], function(n) {
     *   return Math.sin(n);
     * });
     * // => [3, 1, 2]
     *
     * _.sortBy([1, 2, 3], function(n) {
     *   return this.sin(n);
     * }, Math);
     * // => [3, 1, 2]
     *
     * var users = [
     *   { 'user': 'fred' },
     *   { 'user': 'pebbles' },
     *   { 'user': 'barney' }
     * ];
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.sortBy(users, 'user'), 'user');
     * // => ['barney', 'fred', 'pebbles']
     */

    function baseSortBy ( arr, comparer ) {

        var length = arr.length;

        arr.sort ( comparer );

        while ( length-- ) {

            arr[length] = arr[length].value;

        }

        return arr;

    }

    function baseCompareAscending ( value, other ) {

        if ( value !== other ) {

            var valIsReflexive = ( value === value ),
                othIsReflexive = ( other === other );

            if ( value > other || !valIsReflexive || ( typeof value === 'undefined' && othIsReflexive ) ) {

                return 1;

            } else if ( value < other || !othIsReflexive || ( typeof other === 'undefined' && valIsReflexive ) ) {

                return -1;

            }

        }

        return 0;

    }

    function compareAscending ( obj, other ) {

        return baseCompareAscending ( obj.criteria, other.criteria ) || ( object.index - other.index );

    }

    function sortBy ( collection, iteratee, thisArg ) {

        var result = [];

        iteratee = getIteratee ( iteratee, thisArg );

        forEach ( collection, function ( value, key, collection ) {

            result.push ({
                criteria: iteratee ( value, key, collection ),
                index: index,
                value: value
            });

        });

        return baseSortBy ( result, compareAscending );

    }

    Underbar.factory ( 'sortBy', sortBy );

    /* DATE */

    /*
     * Gets the number of milliseconds that have elapsed since the Unix epoch
     * (1 January 1970 00:00:00 UTC).
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => logs the number of milliseconds it took for the deferred function to be invoked
     */

    function now () {

      return new Date ().getTime ();

    }

    Underbar.factory ( 'now', now );

    /*
     * Gets the number of seconds that have elapsed since the Unix epoch
     * (1 January 1970 00:00:00 UTC).
     *
     * _.defer(function(stamp) {
     *   console.log(_.nowSecs() - stamp);
     * }, _.nowSecs());
     * // => logs the number of seconds it took for the deferred function to be invoked
     */

    function nowSecs () {

        return Math.round ( new Date ().getTime () / 1000 );

    }

    Underbar.factory ( 'nowSecs', nowSecs );

    /*
     * Gets a string format of number of seconds elapsed.
     *
     * _.timeAgo ( _.nowSecs () )
     * // => Just now
     */

    function timeAgo ( timestamp ) {

        var now = nowSecs (),
            elapsed = now - timestamp,
            just_now_window = 5;

        var times = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
        };

        if ( elapsed < just_now_window ) {

            return {
                str: 'Just now',
                next: just_now_window - elapsed
            };

        } else {

            for ( var name in times ) {

                var secs = times[name];

                if ( elapsed / secs >= 1 ) {

                    var number = Math.floor ( elapsed / secs );

                    return {
                        str: ( number > 1 ) ? number + ' ' + name + 's ago' : number + ' ' + name + ' ago',
                        next: secs - ( elapsed - ( number * secs ) )
                    };

                }

            }

        }

    }

    Underbar.factory ( 'timeAgo', timeAgo );

    /* FUNCTION */

    // debounce

    // defer

    // delay

    // memoize

    /*
     * Creates a function that is restricted to invoking `func` once. Repeat calls
     * to the function return the value of the first call. The `func` is invoked
     * with the `this` binding of the created function.
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // `initialize` invokes `createApplication` once
     */

    function once ( fn ) { //FIXME

        return function wrapper () {

            var result = fn.apply ( fn, arguments );

            wrapper = function () {

                return result;

            };

            return result;

        };

    }

    Underbar.factory ( 'once', once );

    // throttle

    /* LANG */

    // clone

    // cloneDeep

    /* MATH */

    /*
     * Gets the maximum value of `collection`. If `collection` is empty or falsey
     * `-Infinity` is returned. If an iteratee function is provided it is invoked
     * for each value in `collection` to generate the criterion by which the value
     * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments; (value, index, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * _.max([]);
     * // => -Infinity
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * _.max(users, function(chr) {
     *   return chr.age;
     * });
     * // => { 'user': 'fred', 'age': 40 };
     *
     * // using the `_.property` callback shorthand
     * _.max(users, 'age');
     * // => { 'user': 'fred', 'age': 40 };
     */

    function max ( collection, iteratee, thisArg ) {

        iteratee = getIteratee ( iteratee, thisArg );

        return Math.max ( map ( collection, iteratee ) );

    }

    Underbar.factory ( 'max', max );

    /*
     * Gets the minimum value of `collection`. If `collection` is empty or falsey
     * `Infinity` is returned. If an iteratee function is provided it is invoked
     * for each value in `collection` to generate the criterion by which the value
     * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments; (value, index, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * _.min([]);
     * // => Infinity
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * _.min(users, function(chr) {
     *   return chr.age;
     * });
     * // => { 'user': 'barney', 'age': 36 };
     *
     * // using the `_.property` callback shorthand
     * _.min(users, 'age');
     * // => { 'user': 'barney', 'age': 36 };
     */

    function min ( collection, iteratee, thisArg ) {

        iteratee = getIteratee ( iteratee, thisArg );

        return Math.min ( map ( collection, iteratee ) );

    }

    Underbar.factory ( 'min', min );

    /*
     * Gets the sum of the values in `collection`.
     *
     * _.sum([4, 6, 2]);
     * // => 12
     *
     * _.sum({ 'a': 4, 'b': 6, 'c': 2 });
     * // => 12
     */

    function sum ( collection, iteratee, thisArg ) {

        iteratee = getIteratee ( iteratee, thisArg );

        collection = toIterable ( collection );

        return reduce ( map ( collection, iteratee ), identity, 0 );

    }

    Underbar.factory ( 'min', min );

    /* NUMBER */

    /*
     * Checks if `n` is between `start` and up to but not including, `end`. If
     * `end` is not specified it is set to `start` with `start` then set to `0`.
     *
     * _.inRange(3, 2, 4);
     * // => true
     *
     * _.inRange(4, 8);
     * // => true
     *
     * _.inRange(4, 2);
     * // => false
     *
     * _.inRange(2, 2);
     * // => false
     *
     * _.inRange(1.2, 2);
     * // => true
     *
     * _.inRange(5.2, 4);
     * // => false
     */

    function inRange ( nr, start, end ) {

        if ( end === undefined ) {

            end = start;
            start = 0;

        }

        return ( nr >= start && nr < end );

    }

    Underbar.factory ( 'inRange', inRange );

    /*
     * Produces a random number between `min` and `max` (inclusive). If only one
     * argument is provided a number between `0` and the given number is returned.
     * If `isFloat` is `true`, or either `min` or `max` are floats, a floating-point
     * number is returned instead of an integer.
     *
     * _.random(0, 5);
     * // => an integer between 0 and 5
     *
     * _.random(5);
     * // => also an integer between 0 and 5
     *
     * _.random(5, true);
     * // => a floating-point number between 0 and 5
     *
     * _.random(1.2, 5.2);
     * // => a floating-point number between 1.2 and 5.2
     */

    function random ( min, max, isFloat ) {

        if ( typeof min === 'boolean' ) {

            isFloat = min;
            min = 0;

        } else if ( min === undefined ) {

            min = 0;

        }

        if ( typeof max === 'boolean' ) {

            isFloat = max;
            max = 1;

        } else if ( max === undefined ) {

            max = 0;

        }

        if ( min % 1 !== 0 || max % 1 !== 0 ) {

            isFloat = true;

        }

        return isFloat ? Math.random () * ( max - min ) + min : Math.floor ( Math.random () * ( max - min + 1 ) ) + min;

    }

    Underbar.factory ( 'range', range );

    /* OBJECT */

    // extend

    /*
     * Checks if `key` exists as a direct property of `object` instead of an
     * inherited property.
     *
     * var object = { 'a': 1, 'b': 2, 'c': 3 };
     *
     * _.has(object, 'b');
     * // => true
     */

    function has ( obj, key ) {

        return obj.hasOwnProperty ( key );

    }

    Underbar.factory ( 'has', has );

    // mapValues

    // omit

    /*
     * Creates a two dimensional array of the key-value pairs for `object`,
     * e.g. `[[key1, value1], [key2, value2]]`.
     *
     * _.pairs({ 'barney': 36, 'fred': 40 });
     * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
     */

    function pairs ( obj ) {

        var result = [];

        for ( var key in obj ) {

            result.push ( [key, obj[key]] );

        }

        return result;

    }

    Underbar.factory ( 'pairs', pairs );

    // pick

   /*
     * Resolves the value of property `key` on `object`. If the value of `key` is
     * a function it is invoked with the `this` binding of `object` and its result
     * is returned, else the property value is returned. If the property value is
     * `undefined` the `defaultValue` is used in its place.
     *
     * var object = { 'user': 'fred', 'age': _.constant(40) };
     *
     * _.result(object, 'user');
     * // => 'fred'
     *
     * _.result(object, 'age');
     * // => 40
     *
     * _.result(object, 'status', 'busy');
     * // => 'busy'
     *
     * _.result(object, 'status', _.constant('busy'));
     * // => 'busy'
     */

    function result ( obj, key, defaultValue ) {

        var value = ( key in obj ) ? obj[key] : defaultValue;

        return ( value instanceof Function ) ? value.call ( obj ) : value;

    }

    Underbar.factory ( 'result', result );

    // transform

    /*
     * Creates an array of the own enumerable property values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.values(new Foo);
     * // => [1, 2] (iteration order is not guaranteed)
     *
     * _.values('hi');
     * // => ['h', 'i']
     */

    function values ( obj ) {

        var result = [];

        for ( var key in obj ) {

            result.push ( key );

        }

        return result;

    }

    Underbar.factory ( 'values', values );

    /* STRING */

    /*
     * Checks if `string` ends with the given target string.
     *
     * _.endsWith('abc', 'c');
     * // => true
     *
     * _.endsWith('abc', 'b');
     * // => false
     *
     * _.endsWith('abc', 'b', 2);
     * // => true
     */

    function endsWith ( string, target, position ) {

        position = position || string.length;

        for ( var i = 0, l = target.length; i < l; i++ ) {

            if ( string[position-1-i] !== target[l-1-i] ) {

                i = l + 1;

            }

        }

        return ( i === l );

    }

    Underbar.factory ( 'endsWith', endsWith );

    /*
     * Return a boolean if the string is fuzzy matched with the search string.
     *
     * _.fuzzyMatch ( 'something', 'smTng' );
     * // => true
     *
     * _.fuzzyMatch ( 'something', 'smTng', false );
     * // => false
     *
     * _.fuzzyMatch ( 'something', 'semthing' );
     * // => false
     */

    function fuzzyMatch ( str, search, isCaseSensitive ) {

        if ( isCaseSensitive !== false ) {

            str = str.toLowerCase ();
            search = search.toLowerCase ();

        }

        var current_index = -1,
            str_l = str.length;

        for ( var search_i = 0, search_l = search.length; search_i < search_l; search_i++ ) {

            for ( var str_i = current_index + 1; str_i < str_l; str_i++ ) {

                if ( str[str_i] === search[search_i] ) {

                    current_index = str_i;
                    str_i = str_l + 1;

                }

            }

            if ( str_i === str_l ) {

                return false;

            }

        }

        return true;

    }

    Underbar.factory ( 'fuzzyMatch', fuzzyMatch );

    /*
     * Repeats the given string `n` times.
     *
     * _.repeat('*', 3);
     * // => '***'
     *
     * _.repeat('abc', 2);
     * // => 'abcabc'
     *
     * _.repeat('abc', 0);
     * // => ''
     */

    function repeat ( str, times ) {

        var result = '';

        if ( times < 1 ) return result;

        while ( times > 1 ) {

            if ( times & 1 ) result += str;
            times >>= 1, str += str;

        }

        return result + str;

    }

    Underbar.factory ( 'repeat', repeat );

    /*
     * Checks if `string` starts with the given target string.
     *
     * _.startsWith('abc', 'a');
     * // => true
     *
     * _.startsWith('abc', 'b');
     * // => false
     *
     * _.startsWith('abc', 'b', 1);
     * // => true
     */

    function startsWith ( string, target, position ) {

        position = position || 0;

        for ( var i = 0, l = target.length; i < l; i++ ) {

            if ( string[position + i] !== target[i] ) {

                i = l + 1;

            }

        }

        return ( i === l );

    }

    Underbar.factory ( 'startsWith', startsWith );

    /*
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar]
     */

    function trim ( string, chars ) {

        return trimLeft ( trimRight ( string, chars ), chars );

    }

    Underbar.factory ( 'trim', trim );

    /*
     * Removes leading whitespace or specified characters from `string`.
     *
     * _.trimLeft('  abc  ');
     * // => 'abc  '
     *
     * _.trimLeft('-_-abc-_-', '_-');
     * // => 'abc-_-'
     */

    function trimLeft ( str, chars ) {

        chars = chars || ' \t\n';

        chars = chars.split ( '' );

        for ( var i = 0, l = str.length; i < l; i++ ) {

            if ( chars.indexOf ( str[i] ) === -1 ) {

                return str.substr ( i, l );

            }

        }

        return '';

    }

    Underbar.factory ( 'trimLeft', trimLeft );

    /*
     * Removes trailing whitespace or specified characters from `string`.
     *
     * _.trimRight('  abc  ');
     * // => '  abc'
     *
     * _.trimRight('-_-abc-_-', '_-');
     * // => '-_-abc'
     */

    function trimRight ( str, chars ) {

        chars = chars || ' \t\n';

        chars = chars.split ( '' );

        for ( var i = 0, l = str.length; i < l; i++ ) {

            if ( chars.indexOf ( str[l-1-i] ) === -1 ) {

                return str.substr ( 0, l-i );

            }

        }

        return '';

    }

    Underbar.factory ( 'trimRight', trimRight );

    /*
     * Splits `string` into an array of its words.
     *
     *
     * _.words('fred, barney, & pebbles');
     * // => ['fred', 'barney', 'pebbles']
     *
     * _.words('fred, barney, & pebbles', /[^, ]+/g);
     * // => ['fred', 'barney', '&', 'pebbles']
     */

    var reWords = (function () {

        var upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]',
            lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';

        return RegExp ( upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g' );

    }());

    function words ( string, pattern ) {

      return string.match ( pattern || reWords ) || [];

    }

    Underbar.factory ( 'words', words );

    /* UTILITY */

    /*
     * Creates a function that returns `value`.
     *
     * var object = { 'user': 'fred' };
     * var getter = _.constant(object);
     *
     * getter() === object;
     * // => true
     */

    function constant ( value ) {

      return function () {

        return value;

      };

    }

    Underbar.factory ( 'constant', constant );

    /*
     * This method returns the first argument provided to it.
     *
     * var object = { 'user': 'fred' };
     *
     * _.identity(object) === object;
     * // => true
     */

    function identity ( value ) {

        return value;

    }

    Underbar.factory ( 'identity', identity );

    /*
     * Creates a function which performs a deep comparison between a given object
     * and `source`, returning `true` if the given object has equivalent property
     * values, else `false`.
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.filter(users, _.matches({ 'age': 40, 'active': false }));
     * // => [{ 'user': 'fred', 'age': 40, 'active': false }]
     */

    function matches ( obj ) {

        return function ( thisObj ) {

            for ( var key in obj ) {

                if ( thisObj[key] !== obj[key] ) {

                    return false;

                }

            }

            return true;

        };

    }

    Underbar.factory ( 'matches', matches );

    /*
     * Creates a function which compares the property value of `key` on a given
     * object to `value`.
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' },
     *   { 'user': 'pebbles' }
     * ];
     *
     * _.find(users, _.matchesProperty('user', 'fred'));
     * // => { 'user': 'fred', 'age': 40 }
     */

    function matchesProperty ( key, value ) {

        return function ( thisObj ) {

            return ( thisObj[key] === value );

        };

    }

    Underbar.factory ( 'matchesProperty', matchesProperty );

    /*
     * A no-operation function which returns `undefined` regardless of the
     * arguments it receives.
     *
     * var object = { 'user': 'fred' };
     *
     * _.noop(object) === undefined;
     * // => true
     */

    function noop () {}

    Underbar.factory ( 'noop', noop );

    /*
     * Creates a function which returns the property value of `key` on a given object.
     *
     * var users = [
     *   { 'user': 'fred' },
     *   { 'user': 'barney' }
     * ];
     *
     * var getName = _.property('user');
     *
     * _.map(users, getName);
     * // => ['fred', barney']
     *
     * _.pluck(_.sortBy(users, getName), 'user');
     * // => ['barney', 'fred']
     */

    function property ( key ) {

      return function ( thisObj ) {

        return thisObj[key];

      };

    }

    Underbar.factory ( 'property', property );

    /*
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to, but not including, `end`. If `end` is not specified it is
     * set to `start` with `start` then set to `0`. If `start` is less than `end`
     * a zero-length range is created unless a negative `step` is specified.
     *
     * _.range(4);
     * // => [0, 1, 2, 3]
     *
     * _.range(1, 5);
     * // => [1, 2, 3, 4]
     *
     * _.range(0, 20, 5);
     * // => [0, 5, 10, 15]
     *
     * _.range(0, -4, -1);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.range(0);
     * // => []
     */

    function range ( start, end, step ) {

        step = ( step === undefined ) ? 1 : step;

        if ( end === undefined ) {

            end = start || 0;
            start = 0;

        }

        var index = -1,
            length = step ? Math.ceil ( ( end - start ) / step, 0 ) : end - start,
            result = Array ( length );

        while ( ++index < length ) {

            result[index] = start;
            start += step;

        }

        return result;

    }

    Underbar.factory ( 'range', range );

    // times

    /*
     * Gets a unique identifier.
     *
     * _.uniqueId();
     * // => "1"
     *
     * _.uniqueId ('test_');
     * // => "test_1"
     */

    var uId = 0;

    function uniqueId ( prefix ) {

        return ( prefix || '' ) + ( uId += 1 )

    }

    Underbar.factory ( 'uniqueId', uniqueId );

    /* PROTOTYPE ASSIGNMENT */

    Underbar.fn.init.prototype = Underbar.fn;

    /* ALIAS */

    if ( window._ === undefined ) {

        window._ = Underbar;

    }

}( window, document ));
