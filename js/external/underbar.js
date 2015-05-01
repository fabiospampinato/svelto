
/* UNDERBAR */

//FIXME: add guard support (take a look at lodash's `isIterateeCall` function) for:
//       - ary, callback, create, curry, curryRight, every, fill, invert, max, min, parseInt, slice, sortBy, template, trunc, random, range and some
//       - assign, defaults, includes, merge, sortByAll, and sortByOrder
//       - reduce
//TODO: add guard tests
//TODO: rewrite methods using isSomething functions
//TODO: add indexOf

;(function ( window, document, undefined ) {

    'use strict';

    /* UNDERBAR */

    var underbar = function ( value ) {

        return new underbar.fn.init ( value );

    };

    /* UNDERBAR PROTOTYPE */

    underbar.fn = underbar.prototype = {

        // VARIABLES

        _wrapped: undefined,

        // INIT

        init: function ( value ) {

            this._wrapped = value;

            return this;

        },

        // METHODS

        value: function () {

            return this._wrapped;

        },

        reverse: function () {

            this._wrapped.reverse ();

            return this;

        }

    };

    /* UNDERBAR PROTOTYPE ALIASES */

    underbar.fn.run = underbar.fn.toJSON = underbar.fn.valueOf = underbar.fn.value;

    /* UNDERBAR FACTORY */

    underbar.factory = function ( name, fn ) {

        if ( isDictionary ( name ) ) {

            for ( var key in name ) {

                underbar.factory ( key, name[key] );

            }

        } else if ( isString ( name ) ) {

            if ( isFunction ( fn ) ) {

                underbar[name] = fn;

                underbar.fn[name] = function () {

                    var result = underbar[name].apply ( this, Array.prototype.concat.apply ( [this._wrapped], underbar.slice ( arguments ) ) );

                    return isCollection ( result ) ? underbar ( result ) : result;

                };

            } else if ( isString ( fn ) ) {

                if ( isFunction ( underbar[fn] ) ) {

                    underbar.factory ( name, underbar[fn] );

                }

            }

        }

    };

    /* PRIVATE VARIABLES */

    var MAX_SAFE_INTEGER = Math.pow ( 2, 53 ) - 1;

    var reWords = (function () {

        var upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]',
            lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';

        return RegExp ( upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g' );

    }());

    var uuid = 0;

    /* PRIVATE LANG FUNCTIONS */

    function isObjectLike ( value ) {

        return !!value && typeof value === 'object';

    }

    function isLength ( value ) {

        return typeof value === 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;

    }

    function isIndex ( value, length ) {

        value = +value;
        length = ( length == null ) ? MAX_SAFE_INTEGER : length;

        return ( value > -1 ) && ( value % 1 === 0 ) && value < length;

    }

    function isArguments ( value ) {

        var length = isObjectLike ( value ) ? value.length : undefined;

        return isLength ( length ) && Object.prototype.toString.call ( value ) === '[object Arguments]';

    }

    var isArray = Array.isArray;

    function isDictionary ( value ) { //TODO: does it work??? Maybe check it with all the types

        return Object.prototype.toString.call ( value ) === '[object Object]';

    }

    function isCollection ( value ) {

        return isArray ( value ) || isDictionary ( value );

    }

    function isBoolean ( value ) {

        return value === true || value === false || ( isObjectLike ( value ) && Object.prototype.toString.call ( value ) === '[object Boolean]' );

    }

    function isDate ( value ) {

        return isObjectLike ( value ) && Object.prototype.toString.call ( value ) === '[object Date]';

    }

    function isElement ( value ) {

        return !!value && value.nodeType === 1 && isObjectLike ( value ) && ( Object.prototype.toString.call ( value ).indexOf ( 'Element' ) > -1 );

    }

    function isEmpty ( value ) {

        if ( value == null ) {

            return true;

        }

        var length = value.length;

        if ( isLength ( length ) && ( isArray ( value ) || isString ( value ) || isArguments ( value ) || ( isObjectLike ( value ) && isFunction ( value.splice ) ) ) ) {

            return !length;

        }

        return !Object.keys ( value ).length;

    }

    function isError ( value ) {

        return isObjectLike ( value ) && typeof value.message === 'string' && Object.prototype.toString.call ( value ) === '[object Error]';

    }

    function isFinite ( value ) {

        return typeof value === 'number' && isFinite ( value );

    }

    function isFunction ( value ) {

        // The use of `Object#toString` avoids issues with the `typeof` operator
        // in older versions of Chrome and Safari which return 'function' for regexes
        // and Safari 8 equivalents which return 'object' for typed array constructors.

        return Object.prototype.toString.call ( value ) === '[object Function]';

    }

    function isObject ( value ) {

        // Avoid a V8 JIT bug in Chrome 19-20.
        // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.

        return typeof value === 'function' || ( !!value && typeof value === 'object' );

    }

    /* //FIXME
    function isNaN ( value ) {

        // An `NaN` primitive is the only value that is not equal to itself.
        // Perform the `toStringTag` check first to avoid errors with some host objects in IE.

        return isNumber ( value ) && value != +value;

    }
    */

    function isNull ( value ) {

        return value === null;

    }

    function isNumber ( value ) {

        return typeof value === 'number' || ( isObjectLike ( value ) && Object.prototype.toString.call ( value ) === '[object Number]' );

    }

    function isRegExp ( value ) {

        return ( isObjectLike ( value ) && Object.prototype.toString.call ( value ) === '[object RegExp]') || false;

    }

    function isString ( value ) {

        return typeof value === 'string' || ( isObjectLike ( value ) && Object.prototype.toString.call ( value ) === '[object String]' );

    }

    function isUndefined ( value ) {

        return typeof value === 'undefined';

    }

    /* PRIVATE ITERATION FUNCTIONS */

    function getIteratee ( iteratee, thisArg ) {

        if ( isFunction ( iteratee ) ) {

            return isUndefined ( thisArg ) ? iteratee : iteratee.bind ( thisArg );

        } else if ( isUndefined ( iteratee ) ) {

            return underbar.identity;

        } else if ( isDictionary ( iteratee ) ) {

            return underbar.matches ( iteratee );

        } else {

            return isUndefined ( thisArg ) ? underbar.property ( iteratee ) : underbar.matchesProperty ( iteratee, thisArg );

        }

    }

    function isIterateeCall ( value, index, object ) {

        if ( !isObject ( object ) ) {

            return false;

        }

        var type = typeof index;

        if ( isNumber ( type ) ) {

            var length = object.length,
                prereq = isLength ( length ) && isIndex ( index, length );

        } else {

            prereq = isString ( type ) && ( index in object );

        }

        if ( prereq ) {

            var other = object[index];

            return ( value === value ) ? ( value === other ) : ( other !== other );

        }

        return false;

    }

    function toIterable ( value ) {

        if ( isUndefined ( value.length ) ) {

            return underbar.values ( value );

        } else {

            return isCollection ( value ) ? value : Object ( value );

        }

    }

    /* PRIVATE SORT FUNCTIONS */

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

            if ( value > other || !valIsReflexive || ( isUndefined ( value ) && othIsReflexive ) ) {

                return 1;

            } else if ( value < other || !othIsReflexive || ( isUndefined ( other ) && valIsReflexive ) ) {

                return -1;

            }

        }

        return 0;

    }

    function compareAscending ( obj, other ) {

        return baseCompareAscending ( obj.criteria, other.criteria ) || ( object.index - other.index );

    }

    /* PRIVATE OTHER FUNCTIONS */

    function extend ( target, obj ) {

        for ( var prop in obj ) {

            if ( Object.prototype.hasOwnProperty.call ( obj, prop ) ) {

                if ( isDictionary ( obj[prop] ) ) {

                    target[prop] = underbar.extend ( target[prop], obj[prop] );

                } else {

                    target[prop] = obj[prop];

                }

            }

        }

    }

    /* METHODS */

    underbar.factory ({

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

        chunk: function ( arr, size, guard ) {

            if ( guard ? isIterateeCall ( arr, size, guard ) : size == null ) {

                size = 1;

            }

            var result = Array ( Math.ceil ( arr.length / size ) );

            for ( var a = 0, i = 0, j = arr.length; i < j; a++, i+= size ) {

                result[a] = underbar.slice ( arr, i, i + size );

            }

            return result;

        },

        /*
         * Creates an array with all falsey values removed. The values `false`, `null`,
         * `0`, `""`, `undefined`, and `NaN` are falsey.
         *
         * _.compact([0, 1, false, 2, '', 3]);
         * // => [1, 2, 3]
         */

        compact: function ( arr ) {

            var result = [];

            for ( var i = 0, l = arr.length; i < l; i++ ) {

                if ( arr[i] ) {

                    result.push ( arr[i] );

                }

            }

            return result;

        },

        /*
         * Creates an array excluding all values of the provided arrays using
         * `SameValueZero` for equality comparisons.
         *
         * _.difference([1, 2, 3], [4, 2]);
         * // => [1, 3]
         */

        difference: function () {

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

        },

        without: 'difference', //FIXME: it should be different, not just an alias...

        /*
         * Creates a slice of `array` with `n` elements dropped from the beginning.
         *
         * _.drop([1, 2, 3]);
         * // => [2, 3]
         *
         * _.drop([1, 2, 3], 2);
         * // => [3]
         *
         * _.drop([1, 2, 3], 5);
         * // => []
         *
         * _.drop([1, 2, 3], 0);
         * // => [1, 2, 3]
         */

        drop: function ( arr, nr, guard ) {

            if ( guard ? isIterateeCall ( arr, nr, guard ) : nr == null ) {

                nr = 1;

            }

            return underbar.slice ( arr, nr );

        },

        /*
         * Creates a slice of `array` with `n` elements dropped from the end.
         *
         * _.dropRight([1, 2, 3]);
         * // => [1, 2]
         *
         * _.dropRight([1, 2, 3], 2);
         * // => [1]
         *
         * _.dropRight([1, 2, 3], 5);
         * // => []
         *
         * _.dropRight([1, 2, 3], 0);
         * // => [1, 2, 3]
         */

        dropRight: function ( arr, nr, guard ) {

            if ( guard ? isIterateeCall ( arr, nr, guard ) : nr == null ) {

                nr = 1;

            }

            return underbar.slice ( arr, 0, arr.length - nr );

        },

        /*
         * Fills elements of `array` with `value` from `start` up to, but not
         * including, `end`.
         *
         * var array = [1, 2, 3];
         *
         * _.fill(array, 'a');
         * console.log(array);
         * // => ['a', 'a', 'a']
         *
         * _.fill(Array(3), 2);
         * // => [2, 2, 2]
         *
         * _.fill([4, 6, 8], '*', 1, 2);
         * // => [4, '*', 8]
         */

        fill: function ( arr, value, start, end ) { //TODO: guard

            start = Math.max ( 0, Math.min ( start || 0, arr.length ) );
            end = Math.min ( arr.length, Math.max ( start, end || arr.length ) );

            for ( ; start < end; start++ ) {

                arr[start] = value;

            }

            return arr;

        },

        /*
         * This method is like `_.find` except that it returns the index of the first
         * element `predicate` returns truthy for instead of the element itself.
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

         */

        findIndex: function ( arr, iteratee, thisArg ) {

            iteratee = getIteratee ( iteratee, thisArg );

            var result = underbar.find ( arr, iteratee );

            return isUndefined ( result ) ? -1 : arr.indexOf ( result );

        },

        /*
         * Gets the first element of `array`.
         *
         * _.first([1, 2, 3]);
         * // => 1
         *
         * _.first([]);
         * // => undefined
         */

        first: function ( arr ) {

          return arr[0];

        },

        head: 'first',

        /*
         * Flattens a nested array. The array is recursively flattened.
         *
         * _.flatten([1, [2, 3, [4]]]);
         * // => [1, 2, 3, 4];
         */

        flatten: function ( arr, isDeep, guard ) {

            if ( guard && isIterateeCall ( arr, isDeep, guard ) ) {

                isDeep = false;

            }

            var result = [],
                value;

            for ( var i = 0, l = arr.length; i < l; i++ ) {

                value = arr[i];

                if ( isArray ( value ) ) {

                    if ( isDeep ) {

                        value = underbar.flatten ( value, isDeep );

                    }

                    for ( var ai = 0, al = value.length; ai < al; ai++ ) {

                        result.push ( value[ai] );

                    }

                } else {

                    result.push ( value );

                }

            }

            return result;

        },

        /*
         * Recursively flattens a nested array.
         *
         * _.flattenDeep([1, [2, 3, [4]]]);
         * // => [1, 2, 3, 4];
         */

        flattenDeep: function ( arr ) {

            return underbar.flatten ( arr, true );

        },

        /*
         * Gets all but the last element of `array`.
         *
         * _.initial([1, 2, 3]);
         * // => [1, 2]
         */

        initial: function ( arr ) {

            return underbar.dropRight ( arr, 1 );

        },

        /*
         * Creates an array of unique values in all provided arrays using `SameValueZero`
         * for equality comparisons.
         *
         * _.intersection([1, 2], [4, 2], [2, 1]);
         * // => [2]
         */

        //TODO: unificare in qualche modo intersection and difference (magari passar eun parametro per fare `===` or `!==`

        intersection: function () {

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

        },

        /*
         * Gets the last element of `array`.
         *
         * _.last([1, 2, 3]);
         * // => 3
         */

        last: function ( arr ) {

            return arr[arr.length - 1];

        },

        /*
         * Removes all provided values from `array`.
         *
         * var array = [1, 2, 3, 1, 2, 3];
         *
         * _.pull(array, 2, 3);
         * console.log(array);
         * // => [1, 1]
         */

        pull: function ( arr ) {

            var pulled = underbar.slice ( arguments, 1 );

            for ( var i = arr.length - 1; i >= 0; i-- ) {

                if ( pulled.indexOf ( arr[i] ) !== -1 ) {

                    arr.splice ( i, 1 );

                }

            }

            return arr;

        },

        /*
         * Gets all but the first element of `array`.
         *
         * _.rest([1, 2, 3]);
         * // => [2, 3]
         */

        rest: function ( arr ) {

            return underbar.drop ( arr, 1 );

        },

        tail: 'rest',

        /*
         * Creates a slice of `array` from `start` up to, but not including, `end`.
         *
         * **Note:** This function is used instead of `Array#slice` to support node
         * lists in IE < 9 and to ensure dense arrays are returned.
         */

        slice: function ( arr, start, end ) { //TODO: guard

            start = Math.max ( 0, Math.min ( start || 0, arr.length ) );
            end = Math.max ( start, Math.min ( isUndefined ( end ) ? arr.length : end, arr.length ) );

            var size = end - start,
                result = Array ( size );

            for ( var i = 0; i < size; i++ ) {

                result[i] = arr[start + i];

            }

            return result;
        },

        /*
         * Creates a slice of `array` with `n` elements taken from the beginning.
         *
         * _.take([1, 2, 3]);
         * // => [1]
         *
         * _.take([1, 2, 3], 2);
         * // => [1, 2]
         *
         * _.take([1, 2, 3], 5);
         * // => [1, 2, 3]
         *
         * _.take([1, 2, 3], 0);
         * // => []
         */

        take: function ( arr, nr, guard ) {

            if ( guard ? isIterateeCall ( arr, nr, guard ) : nr == null ) {

                nr = 1;

            }

            return underbar.slice ( arr, 0, nr );

        },

        /*
         * Creates a slice of `array` with `n` elements taken from the end.
         *
         * _.takeRight([1, 2, 3]);
         * // => [3]
         *
         * _.takeRight([1, 2, 3], 2);
         * // => [2, 3]
         *
         * _.takeRight([1, 2, 3], 5);
         * // => [1, 2, 3]
         *
         * _.takeRight([1, 2, 3], 0);
         * // => []
         */

        takeRight: function ( arr, nr, guard ) {

            if ( guard ? isIterateeCall ( arr, nr, guard ) : nr == null ) {

                nr = 1;

            }

            return underbar.slice ( arr, arr.length - nr );

        },

        /*
         * Creates an array of unique values, in order, of the provided arrays using
         * `SameValueZero` for equality comparisons.
         *
         * _.union([1, 2], [4, 2], [2, 1]);
         * // => [1, 2, 4]
         */

        union: function () {

            return underbar.unique ( underbar.flatten ( arguments ) );

        },

        /*
         * Creates a duplicate-value-free version of an array using `SameValueZero`
         * for equality comparisons.
         *
         * _.unique([1, 2, 1]);
         * // => [1, 2]
         */

        unique: function ( arr, isSorted, guard ) {

            if ( guard && isIterateeCall ( arr, isSorted, guard ) ) {

                isSorted = false;

            }

            var sorted = isSorted ? arr : arr.sort (),
                result = [],
                prev;

            for ( var i = 0, l = sorted.length; i < l; i++ ) {

                if ( sorted[i] !== prev ) {

                    result.push ( sorted[i] );

                    prev = sorted[i];

                }

            }

            return result;

        },

        uniq: 'unique',

        /*
         * This method is like `_.zip` except that it accepts an array of grouped
         * elements and creates an array regrouping the elements to their pre-`_.zip`
         * configuration.
         *
         * var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
         * // => [['fred', 30, true], ['barney', 40, false]]
         *
         * _.unzip(zipped);
         * // => [['fred', 'barney'], [30, 40], [true, false]]
         */

        unzip: function ( arr ) {

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

        },

        /*
         * Creates an array that is the [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
         * of the provided arrays.
         *
         * _.xor([1, 2], [4, 2]);
         * // => [1, 4]
         */

        xor: function () {

            return underbar.difference ( underbar.union.apply ( null, arguments ), underbar.intersection.apply ( null, arguments ) );

        },

        /*
         * Creates an array of grouped elements, the first of which contains the first
         * elements of the given arrays, the second of which contains the second elements
         * of the given arrays, and so on.
         *
         * _.zip(['fred', 'barney'], [30, 40], [true, false]);
         * // => [['fred', 30, true], ['barney', 40, false]]
         */

        zip: function () {

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

        },

        /*
         * Creates an object composed from arrays of property names and values. Provide
         * two arrays, one of property names and one of corresponding values.
         *
         * _.zipObject(['fred', 'barney'], [30, 40]);
         * // => { 'fred': 30, 'barney': 40 }
         */

        zipObject: function ( keys, values ) {

            var result = {};

            if ( isUndefined ( values ) ) {

                for ( var i = 0, l = keys.length; i < l; i++ ) {

                    result[keys[i][0]] = keys[i][1];

                }

            } else {

                for ( var i = 0, l = keys.length; i < l; i++ ) {

                    result[keys[i]] = values[i];

                }

            }

            return result;

        },

        object: 'zipObject',

        /* COLLECTION */

        /*
         * Creates an array of elements corresponding to the given keys, or indexes,
         * of `collection`. Keys may be specified as individual arguments or as arrays
         * of keys.
         *
         * _.at(['a', 'b', 'c'], [0, 2]);
         * // => ['a', 'c']
         *
         * _.at(['barney', 'fred', 'pebbles'], 0, 2);
         * // => ['barney', 'pebbles']
         */

        at: function ( collection ) {

            var collection = toIterable ( collection ),
                index,
                props,
                result = [];

            if ( isArray ( arguments[1] ) ) {

                index = 0;
                props = arguments[1];

            } else {

                index = 1;
                props = arguments;

            }

            for ( var i = index, l = props.length; i < l; i++ ) {

                result.push ( collection[props[i]] );

            }

            return result;

        },

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

        every: function ( collection, iteratee, thisArg ) {

            iteratee = getIteratee ( iteratee, thisArg );

            if ( !isUndefined ( collection.length ) ) {

                for ( var i = 0, l = collection.length; i < l; i++ ) {

                    if ( !iteratee ( collection[i], i, collection ) ) {

                        return false;

                    }

                }

            } else {

                for ( var key in collection ) {

                    if ( !iteratee ( collection[key], key, collection ) ) {

                        return false;

                    }

                }

            }

            return true;

        },

        all: 'every',

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

        filter: function ( collection, iteratee, thisArg ) {

            iteratee = getIteratee ( iteratee, thisArg );

            var result = [];

            if ( !isUndefined ( collection.length ) ) {

                for ( var i = 0, l = collection.length; i < l; i++ ) {

                    if ( !!iteratee ( collection[i], i, collection ) ) {

                        result.push ( collection[i] );

                    }

                }

            } else {

                for ( var key in collection ) {

                    if ( !!iteratee ( collection[key], key, collection ) ) {

                        result.push ( collection[key] );

                    }

                }

            }

            return result;

        },

        select: 'filter',

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

        find: function ( collection, iteratee, thisArg ) {

            iteratee = getIteratee ( iteratee, thisArg );

            if ( !isUndefined ( collection.length ) ) {

                for ( var i = 0, l = collection.length; i < l; i++ ) {

                    if ( !!iteratee ( collection[i], i, collection ) ) {

                        return collection[i];

                    }

                }

            } else {

                for ( var key in collection ) {

                    if ( !!iteratee ( collection[key], key, collection ) ) {

                        return collection[key];

                    }

                }

            }

        },

        detect: 'find',

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

        forEach: function ( collection, iteratee, thisArg ) {

            iteratee = getIteratee ( iteratee, thisArg );

            if ( !isUndefined ( collection.length ) ) {

                for ( var i = 0, l = collection.length; i < l; i++ ) {

                    iteratee ( collection[i], i, collection );

                }

            } else {

                for ( var key in collection ) {

                    iteratee ( collection[key], key, collection );

                }

            }

            return collection;

        },

        each: 'forEach',

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

        map: function ( collection, iteratee, thisArg ) {

            iteratee = getIteratee ( iteratee, thisArg );

            if ( !isUndefined ( collection.length ) ) {

                var result = Array ( collection.length );

                for ( var i = 0, l = collection.length; i < l; i++ ) {

                    result[i] = iteratee ( collection[i], i, collection );

                }

            } else {

                var result = [];

                for ( var key in collection ) {

                    result.push ( iteratee ( collection[key], key, collection ) );

                }

            }

            return result;

        },

        collect: 'map',

        /*
         * Creates an array of elements split into two groups, the first of which
         * contains elements `predicate` returns truthy for, while the second of which
         * contains elements `predicate` returns falsey for. The predicate is bound
         * to `thisArg` and invoked with three arguments: (value, index|key, collection).
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
         * _.partition([1, 2, 3], function(n) {
         *   return n % 2;
         * });
         * // => [[1, 3], [2]]
         *
         * _.partition([1.2, 2.3, 3.4], function(n) {
         *   return this.floor(n) % 2;
         * }, Math);
         * // => [[1.2, 3.4], [2.3]]
         *
         * var users = [
         *   { 'user': 'barney',  'age': 36, 'active': false },
         *   { 'user': 'fred',    'age': 40, 'active': true },
         *   { 'user': 'pebbles', 'age': 1,  'active': false }
         * ];
         *
         * var mapper = function(array) {
         *   return _.pluck(array, 'user');
         * };
         *
         * // using the `_.matches` callback shorthand
         * _.map(_.partition(users, { 'age': 1, 'active': false }), mapper);
         * // => [['pebbles'], ['barney', 'fred']]
         *
         * // using the `_.matchesProperty` callback shorthand
         * _.map(_.partition(users, 'active', false), mapper);
         * // => [['barney', 'pebbles'], ['fred']]
         *
         * // using the `_.property` callback shorthand
         * _.map(_.partition(users, 'active'), mapper);
         * // => [['fred'], ['barney', 'pebbles']]
         */

        partition: function ( collection, iteratee, thisArg ) {

            iteratee = getIteratee ( iteratee, thisArg );

            var truthy = [],
                falsy = [];

            underbar.each ( collection, function ( value, key, collection ) {

                if ( iteratee ( value, key, collection ) ) {

                    truthy.push ( value );

                } else {

                    falsy.push ( value );

                }

            });

            return [truthy, falsy];

        },

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

        pluck: function ( collection, key ) {

          return underbar.map ( collection, key );

        },

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

        reduce: function ( collection, iteratee, accumulator, thisArg ) { //FIXME: accumulator should be the first value, not 0

            accumulator = accumulator || 0;

            iteratee = getIteratee ( iteratee, thisArg );

            if ( !isUndefined ( collection.length ) ) {

                for ( var i = 0, l = collection.length; i < l; i++ ) {

                    accumulator = iteratee ( accumulator, collection[i], i, collection );

                }

            } else {

                for ( var key in collection ) {

                    accumulator = iteratee ( accumulator, collection[key], key, collection );

                }

            }

            return accumulator;

        },

        foldl: 'reduce',

        inject: 'reduce',

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

        reject: function ( collection, iteratee, thisArg ) {

            iteratee = getIteratee ( iteratee, thisArg );

            var result = [];

            if ( !isUndefined ( collection.length ) ) {

                for ( var i = 0, l = collection.length; i < l; i++ ) {

                    if ( !iteratee ( collection[i], i, collection ) ) {

                        result.push ( collection[i] );

                    }

                }

            } else {

                for ( var key in collection ) {

                    if ( !iteratee ( collection[key], key, collection ) ) {

                        result.push ( collection[key] );

                    }

                }

            }

            return result;

        },

        /*
         * Gets a random element or `n` random elements from a collection.
         *
         * _.sample([1, 2, 3, 4]);
         * // => 2
         *
         * _.sample([1, 2, 3, 4], 2);
         * // => [3, 1]
         */

        sample: function ( collection, nr, guard ) {

            if ( guard ? isIterateeCall ( collection, nr, guard ) : nr == null ) {

                nr = 0;

            }

            var result = underbar.shuffle ( collection );

            result.length = Math.max ( 0, Math.min ( nr, result.length ) );

            return result;

        },

        /*
         * Creates an array of shuffled values, using a version of the Fisher-Yates
         * shuffle. See [Wikipedia](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle)
         * for more details.
         *
         * _.shuffle([1, 2, 3, 4]);
         * // => [4, 1, 3, 2]
         */

        shuffle: function ( collection ) {

            collection = toIterable ( collection );

            var index = -1,
                length = collection.length,
                result = Array ( length );

            while ( ++index < length ) {

                var rand = Math.floor ( Math.random () * ( index + 1 ) );

                if ( index !== rand ) {

                    result[index] = result[rand];

                }

                result[rand] = collection[index];

            }

            return result;

        },

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

        size: function ( collection ) {

            return isUndefined ( collection.length ) ? Object.keys ( collection ).length : collection.length;

        },

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

        some: function ( collection, iteratee, thisArg ) {

            iteratee = getIteratee ( iteratee, thisArg );

            if ( !isUndefined ( collection.length ) ) {

                for ( var i = 0, l = collection.length; i < l; i++ ) {

                    if ( !!iteratee ( collection[i], i, collection ) ) {

                        return true;

                    }

                }

            } else {

                for ( var key in collection ) {

                    if ( !!iteratee ( collection[key], key, collection ) ) {

                        return true;

                    }

                }

            }

            return false;

        },

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

        sortBy: function ( collection, iteratee, thisArg ) {

            var result = [];

            iteratee = getIteratee ( iteratee, thisArg );

            underbar.each ( collection, function ( value, index, collection ) {

                result.push ({
                    criteria: iteratee ( value, index, collection ),
                    index: index,
                    value: value
                });

            });

            return baseSortBy ( result, compareAscending );

        },

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

        now: function () {

          return Date.now ();

        },

        /*
         * Gets the number of seconds that have elapsed since the Unix epoch
         * (1 January 1970 00:00:00 UTC).
         *
         * _.defer(function(stamp) {
         *   console.log(_.nowSecs() - stamp);
         * }, _.nowSecs());
         * // => logs the number of seconds it took for the deferred function to be invoked
         */

        nowSecs: function () {

            return Math.round ( Date.now () / 1000 );

        },

        /*
         * Gets a string format of number of seconds elapsed.
         *
         * _.timeAgo ( _.nowSecs () )
         * // => Just now
         */

        timeAgo: function ( timestamp ) {

            var now = underbar.nowSecs (),
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

        },

        /* FUNCTION */

        /*
         * Creates a function that delays invoking `func` until after `wait` milliseconds
         * have elapsed since the last time it was invoked. The created function comes
         * with a `cancel` method to cancel delayed invocations. Provide an options
         * object to indicate that `func` should be invoked on the leading and/or
         * trailing edge of the `wait` timeout. Subsequent calls to the debounced
         * function return the result of the last `func` invocation.
         *
         * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
         * on the trailing edge of the timeout only if the the debounced function is
         * invoked more than once during the `wait` timeout.
         *
         * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
         * for details over the differences between `_.debounce` and `_.throttle`.
         *
         * // avoid costly calculations while the window size is in flux
         * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
         *
         * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
         * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
         *   'leading': true,
         *   'trailing': false
         * }));
         *
         * // ensure `batchLog` is invoked once after 1 second of debounced calls
         * var source = new EventSource('/stream');
         * jQuery(source).on('message', _.debounce(batchLog, 250, {
         *   'maxWait': 1000
         * }));
         *
         * // cancel a debounced call
         * var todoChanges = _.debounce(batchLog, 1000);
         * Object.observe(models.todo, todoChanges);
         *
         * Object.observe(models, function(changes) {
         *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
         *     todoChanges.cancel();
         *   }
         * }, ['delete']);
         *
         * // ...at some point `models.todo` is changed
         * models.todo.completed = true;
         *
         * // ...before 1 second has passed `models.todo` is deleted
         * // which cancels the debounced `todoChanges` call
         * delete models.todo;
         */

        debounce: function ( fn, delay ) {

            var timer = null;

            return function () {

                var context = this,
                    args = arguments;

                clearTimeout ( timer );

                timer = setTimeout ( function () {

                    fn.apply ( context, args );

                }, delay );

            };

        },

       /*
         * Defers invoking the `func` until the current call stack has cleared. Any
         * additional arguments are provided to `func` when it is invoked.
         *
         * _.defer(function(text) {
         *   console.log(text);
         * }, 'deferred');
         * // logs 'deferred' after one or more milliseconds
         */

        defer: function ( fn, args ) {

            return setTimeout ( function () {

                fn.apply ( undefined, args );

            }, 1 );

        },

        /*
         * Invokes `func` after `wait` milliseconds. Any additional arguments are
         * provided to `func` when it is invoked.
         *
         *
         * _.delay(function(text) {
         *   console.log(text);
         * }, 1000, 'later');
         * // => logs 'later' after one second
         */

        delay: function ( fn, wait, args ) {

            return setTimeout ( function () {

                fn.apply ( undefined, args );

            }, wait );

        },

        /*
         * Creates a function that memoizes the result of `func`. If `resolver` is
         * provided it determines the cache key for storing the result based on the
         * arguments provided to the memoized function. By default, the first argument
         * provided to the memoized function is coerced to a string and used as the
         * cache key. The `func` is invoked with the `this` binding of the memoized
         * function.
         *
         * **Note:** The cache is exposed as the `cache` property on the memoized
         * function. Its creation may be customized by replacing the `_.memoize.Cache`
         * constructor with one whose instances implement the [`Map`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-properties-of-the-map-prototype-object)
         * method interface of `get`, `has`, and `set`.
         *
         * var upperCase = _.memoize(function(string) {
         *   return string.toUpperCase();
         * });
         *
         * upperCase('fred');
         * // => 'FRED'
         *
         * // modifying the result cache
         * upperCase.cache.set('fred', 'BARNEY');
         * upperCase('fred');
         * // => 'BARNEY'
         *
         * // replacing `_.memoize.Cache`
         * var object = { 'user': 'fred' };
         * var other = { 'user': 'barney' };
         * var identity = _.memoize(_.identity);
         *
         * identity(object);
         * // => { 'user': 'fred' }
         * identity(other);
         * // => { 'user': 'fred' }
         *
         * _.memoize.Cache = WeakMap;
         * var identity = _.memoize(_.identity);
         *
         * identity(object);
         * // => { 'user': 'fred' }
         * identity(other);
         * // => { 'user': 'barney' }
         */

        memoize: function ( fn ) {

            return function () {

                fn._memoize || ( fn._memoize = {} );

                var args = underbar.slice ( arguments ),
                    hash = '',
                    currentArg = null;

                for ( var i = 0, l = args.length; i < l; i++ ) {

                    currentArg = args[i];

                    hash += ( currentArg === Object ( currentArg ) ) ? JSON.stringify ( currentArg ) : currentArg;

                }

                return ( hash in fn._memoize ) ? fn._memoize[hash] : ( fn._memoize[hash] = fn.apply ( this, args ) );

            };

        },

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

        once: function ( fn ) {

            var called = false;

            return function () {

                if ( called ) {

                    return;

                }

                called = true;

                return fn.apply ( fn, arguments );

            };

        },

        /*
         * Creates a function that only invokes `func` at most once per every `wait`
         * milliseconds. The created function comes with a `cancel` method to cancel
         * delayed invocations. Provide an options object to indicate that `func`
         * should be invoked on the leading and/or trailing edge of the `wait` timeout.
         * Subsequent calls to the throttled function return the result of the last
         * `func` call.
         *
         * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
         * on the trailing edge of the timeout only if the the throttled function is
         * invoked more than once during the `wait` timeout.
         *
         * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
         * for details over the differences between `_.throttle` and `_.debounce`.
         *
         * // avoid excessively updating the position while scrolling
         * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
         *
         * // invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
         * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
         *   'trailing': false
         * }));
         *
         * // cancel a trailing throttled call
         * jQuery(window).on('popstate', throttled.cancel);
         */

        throttle: function ( fn, threshold, scope ) {

            threshold || (threshold = 250);

            var last,
                deferTimer;

            return function () {

                var context = scope || this,
                    now = +new Date,
                    args = arguments;

                if ( last && now < last + threshold ) {

                    clearTimeout ( deferTimer );

                    deferTimer = setTimeout ( function () {

                        last = now;
                        fn.apply ( context, args );

                    }, threshold );

                } else {

                    last = now;
                    fn.apply ( context, args );

                }

            };

        },

        /* LANG */

        /*
         * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
         * otherwise they are assigned by reference. If `customizer` is provided it is
         * invoked to produce the cloned values. If `customizer` returns `undefined`
         * cloning is handled by the method instead. The `customizer` is bound to
         * `thisArg` and invoked with two argument; (value [, index|key, object]).
         *
         * **Note:** This method is loosely based on the
         * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
         * The enumerable properties of `arguments` objects and objects created by
         * constructors other than `Object` are cloned to plain `Object` objects. An
         * empty object is returned for uncloneable values such as functions, DOM nodes,
         * Maps, Sets, and WeakMaps.
         *
         * var users = [
         *   { 'user': 'barney' },
         *   { 'user': 'fred' }
         * ];
         *
         * var shallow = _.clone(users);
         * shallow[0] === users[0];
         * // => true
         *
         * var deep = _.clone(users, true);
         * deep[0] === users[0];
         * // => false
         *
         * // using a customizer callback
         * var el = _.clone(document.body, function(value) {
         *   if (_.isElement(value)) {
         *     return value.cloneNode(false);
         *   }
         * });
         *
         * el === document.body
         * // => false
         * el.nodeName
         * // => BODY
         * el.childNodes.length;
         * // => 0
         */

        clone: function ( value ) {

            return JSON.parse ( JSON.stringify ( value ) );

        },

        cloneDeep: 'clone',

        /*
         * Checks if `value` is classified as an `arguments` object.
         *
         * _.isArguments(function() { return arguments; }());
         * // => true
         *
         * _.isArguments([1, 2, 3]);
         * // => false
         */

        isArguments: isArguments,

        /*
         * Checks if `value` is classified as an `Array` object.
         *
         * _.isArray([1, 2, 3]);
         * // => true
         *
         * _.isArray(function() { return arguments; }());
         * // => false
         */

        isArray: isArray,

        isDictionary: isDictionary, //INFO: not implemented in lodash

        isCollection: isCollection, //INFO: not implemented in lodash

        /*
         * Checks if `value` is classified as a boolean primitive or object.
         *
         * _.isBoolean(false);
         * // => true
         *
         * _.isBoolean(null);
         * // => false
         */

        isBoolean: isBoolean,

        /*
         * Checks if `value` is classified as a `Date` object.
         *
         * _.isDate(new Date);
         * // => true
         *
         * _.isDate('Mon April 23 2012');
         * // => false
         */

        isDate: isDate,

        /*
         * Checks if `value` is a DOM element.
         *
         * _.isElement(document.body);
         * // => true
         *
         * _.isElement('<body>');
         * // => false
         */

        isElement: isElement,

        /*
         * Checks if `value` is empty. A value is considered empty unless it is an
         * `arguments` object, array, string, or jQuery-like collection with a length
         * greater than `0` or an object with own enumerable properties.
         *
         * _.isEmpty(null);
         * // => true
         *
         * _.isEmpty(true);
         * // => true
         *
         * _.isEmpty(1);
         * // => true
         *
         * _.isEmpty([1, 2, 3]);
         * // => false
         *
         * _.isEmpty({ 'a': 1 });
         * // => false
         */

        isEmpty: isEmpty,

        /*
         * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
         * `SyntaxError`, `TypeError`, or `URIError` object.
         *
         * _.isError(new Error);
         * // => true
         *
         * _.isError(Error);
         * // => false
         */

        isError: isError,

        /*
         * Checks if `value` is a finite primitive number.
         *
         * **Note:** This method is based on [`Number.isFinite`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isfinite).
         *
         * _.isFinite(10);
         * // => true
         *
         * _.isFinite('10');
         * // => false
         *
         * _.isFinite(true);
         * // => false
         *
         * _.isFinite(Object(10));
         * // => false
         *
         * _.isFinite(Infinity);
         * // => false
         */

        isFinite: isFinite,

        /*
         * Checks if `value` is classified as a `Function` object.
         *
         * _.isFunction(_);
         * // => true
         *
         * _.isFunction(/abc/);
         * // => false
         */

        isFunction: isFunction,

        /*
         * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
         * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
         *
         * _.isObject({});
         * // => true
         *
         * _.isObject([1, 2, 3]);
         * // => true
         *
         * _.isObject(1);
         * // => false
         */

        isObject: isObject,

        /*
         * Checks if `value` is `NaN`.
         *
         * **Note:** This method is not the same as [`isNaN`](https://es5.github.io/#x15.1.2.4)
         * which returns `true` for `undefined` and other non-numeric values.
         *
         * _.isNaN(NaN);
         * // => true
         *
         * _.isNaN(new Number(NaN));
         * // => true
         *
         * isNaN(undefined);
         * // => true
         *
         * _.isNaN(undefined);
         * // => false
         */

        isNaN: isNaN,

        /*
         * Checks if `value` is `null`.
         *
         * _.isNull(null);
         * // => true
         *
         * _.isNull(void 0);
         * // => false
         */

        isNull: isNull,

        /*
         * Checks if `value` is classified as a `Number` primitive or object.
         *
         * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
         * as numbers, use the `_.isFinite` method.
         *
         * _.isNumber(8.4);
         * // => true
         *
         * _.isNumber(NaN);
         * // => true
         *
         * _.isNumber('8.4');
         * // => false
         */

        isNumber: isNumber,

        /*
         * Checks if `value` is classified as a `RegExp` object.
         *
         * _.isRegExp(/abc/);
         * // => true
         *
         * _.isRegExp('/abc/');
         * // => false
         */

        isRegExp: isRegExp,

        /*
         * Checks if `value` is classified as a `String` primitive or object.
         *
         * _.isString('abc');
         * // => true
         *
         * _.isString(1);
         * // => false
         */

        isString: isString,

        /*
         * Checks if `value` is `undefined`.
         *
         * _.isUndefined(void 0);
         * // => true
         *
         * _.isUndefined(null);
         * // => false
         */

        isUndefined: isUndefined,

        /*
         * Converts `value` to an array.
         *
         * (function() {
         *   return _.toArray(arguments).slice(1);
         * }(1, 2, 3));
         * // => [2, 3]
         */

        toArray: function ( arrLike ) {

            var arr = new Array ( arrLike.length );

            for ( var i = 0, l = arrLike.length; i < l; i++ ) {

                arr[i] = arrLike[i];

            }

            return arr;

        },

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

        max: function ( collection, iteratee, thisArg ) {

            iteratee = getIteratee ( iteratee, thisArg );

            return Math.max.apply ( null, underbar.map ( collection, iteratee ) );

        },

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

        min: function ( collection, iteratee, thisArg ) {

            iteratee = getIteratee ( iteratee, thisArg );

            return Math.min.apply ( null, underbar.map ( collection, iteratee ) );

        },

        /*
         * Gets the sum of the values in `collection`.
         *
         * _.sum([4, 6, 2]);
         * // => 12
         *
         * _.sum({ 'a': 4, 'b': 6, 'c': 2 });
         * // => 12
         */

        sum: function ( collection, iteratee, thisArg ) {

            iteratee = getIteratee ( iteratee, thisArg );

            return underbar.reduce ( underbar.map ( collection, iteratee ), underbar.identity, 0 );

        },

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

        inRange: function ( nr, start, end ) {

            if ( isUndefined ( end ) ) {

                end = start;
                start = 0;

            }

            return ( nr >= start && nr < end );

        },

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

        random: function ( min, max, isFloat ) {

            if ( isBoolean ( min ) ) {

                isFloat = min;
                min = 0;

            } else if ( isUndefined ( min ) ) {

                min = 0;

            }

            if ( isBoolean ( max ) ) {

                isFloat = max;
                max = 1;

            } else if ( isUndefined ( max ) ) {

                max = 0;

            }

            if ( min % 1 !== 0 || max % 1 !== 0 ) {

                isFloat = true;

            }

            return isFloat ? Math.random () * ( max - min ) + min : Math.floor ( Math.random () * ( max - min + 1 ) ) + min;

        },

        /* OBJECT */

        /*
         * Assigns own enumerable properties of source object(s) to the destination
         * object. Subsequent sources overwrite property assignments of previous sources.
         * If `customizer` is provided it is invoked to produce the assigned values.
         * The `customizer` is bound to `thisArg` and invoked with five arguments:
         * (objectValue, sourceValue, key, object, source).
         *
         * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
         * // => { 'user': 'fred', 'age': 40 }
         *
         * // using a customizer callback
         * var defaults = _.partialRight(_.assign, function(value, other) {
         *   return typeof value == 'undefined' ? other : value;
         * });
         *
         * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
         * // => { 'user': 'barney', 'age': 36 }
         */

        extend: function () { //INFO: It's always deep by default

            var target = arguments[0] || {};

            for ( var i = 1, l = arguments.length; i < l; i++ ) {

                extend ( target, arguments[i] );

            }

            return target;

        },

        assign: 'extend',

        /*
         * Checks if `key` exists as a direct property of `object` instead of an
         * inherited property.
         *
         * var object = { 'a': 1, 'b': 2, 'c': 3 };
         *
         * _.has(object, 'b');
         * // => true
         */

        has: function ( obj, key ) {

            return obj.hasOwnProperty ( key );

        },

        /*
         * Creates an object with the same keys as `object` and values generated by
         * running each own enumerable property of `object` through `iteratee`. The
         * iteratee function is bound to `thisArg` and invoked with three arguments:
         * (value, key, object).
         *
         * If a property name is provided for `iteratee` the created `_.property`
         * style callback returns the property value of the given element.
         *
         * If a value is also provided for `thisArg` the created `_.matchesProperty`
         * style callback returns `true` for elements that have a matching property
         * value, else `false`.
         *
         * If an object is provided for `iteratee` the created `_.matches` style
         * callback returns `true` for elements that have the properties of the given
         * object, else `false`.
         *
         * _.mapValues({ 'a': 1, 'b': 2 }, function(n) {
         *   return n * 3;
         * });
         * // => { 'a': 3, 'b': 6 }
         *
         * var users = {
         *   'fred':    { 'user': 'fred',    'age': 40 },
         *   'pebbles': { 'user': 'pebbles', 'age': 1 }
         * };
         *
         * // using the `_.property` callback shorthand
         * _.mapValues(users, 'age');
         * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
         */

        mapValues: function ( obj, iteratee, thisArg ) {

            iteratee = getIteratee ( iteratee, thisArg );

            var result = {};

            for ( var key in obj ) {

                result[key] = iteratee ( obj[key], key, obj );

            }

            return result;

        },

        /*
         * The opposite of `_.pick`; this method creates an object composed of the
         * own and inherited enumerable properties of `object` that are not omitted.
         * Property names may be specified as individual arguments or as arrays of
         * property names. If `predicate` is provided it is invoked for each property
         * of `object` omitting the properties `predicate` returns truthy for. The
         * predicate is bound to `thisArg` and invoked with three arguments:
         * (value, key, object).
         *
         * @static
         * @memberOf _
         * @category Object
         * @param {Object} object The source object.
         * @param {Function|...(string|string[])} [predicate] The function invoked per
         *  iteration or property names to omit, specified as individual property
         *  names or arrays of property names.
         * @param {*} [thisArg] The `this` binding of `predicate`.
         * @returns {Object} Returns the new object.
         * @example
         *
         * var object = { 'user': 'fred', 'age': 40 };
         *
         * _.omit(object, 'age');
         * // => { 'user': 'fred' }
         *
         * _.omit(object, _.isNumber);
         * // => { 'user': 'fred' }
         */

        omit: function ( obj, predicate, thisArg ) {

            if ( isString ( predicate ) ) {

                return underbar.omit ( obj, function ( value, key, obj ) {

                    return ( key === predicate );

                }, thisArg );

            }

            if ( isFunction ( predicate ) ) {

                var result = {};

                for ( var key in obj ) {

                    if ( !predicate.call ( thisArg, obj[key], key, obj ) ) {

                        result[key] = obj[key];

                    }

                }

                return result;

            }

        },

        /*
         * Creates a two dimensional array of the key-value pairs for `object`,
         * e.g. `[[key1, value1], [key2, value2]]`.
         *
         * _.pairs({ 'barney': 36, 'fred': 40 });
         * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
         */

        pairs: function ( obj ) {

            var result = [];

            for ( var key in obj ) {

                result.push ( [key, obj[key]] );

            }

            return result;

        },

        /*
         * Creates an object composed of the picked `object` properties. Property
         * names may be specified as individual arguments or as arrays of property
         * names. If `predicate` is provided it is invoked for each property of `object`
         * picking the properties `predicate` returns truthy for. The predicate is
         * bound to `thisArg` and invoked with three arguments: (value, key, object).
         *
         * var object = { 'user': 'fred', 'age': 40 };
         *
         * _.pick(object, 'user');
         * // => { 'user': 'fred' }
         *
         * _.pick(object, _.isString);
         * // => { 'user': 'fred' }
         */

        pick: function ( obj, predicate, thisArg ) {

            if ( isString ( predicate ) ) {

                var result = {};

                result[predicate] = obj[predicate];

                return result;

            } else if ( isFunction ( predicate ) ) {

                var result = {};

                for ( var key in obj ) {

                    if ( predicate.call ( thisArg, obj[key], key, obj ) ) {

                        result[key] = obj[key];

                    }

                }

                return result;

            }

        },

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

        result: function ( obj, key, defaultValue ) {

            var value = !isUndefined ( obj[key] ) ? obj[key] : defaultValue;

            return isFunction ( value ) ? value.call ( obj ) : value;

        },

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

        values: function ( obj ) {

            var props = Object.keys ( obj ),
                result = Array ( props.length );

            for ( var i = 0, l = props.length; i < l; i++ ) {

                result[i] = obj[props[i]];

            }

            return result;

        },

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

        endsWith: function ( str, target, position ) {

            position = position || str.length;

            for ( var i = 0, l = target.length; i < l; i++ ) {

                if ( str[position-1-i] !== target[l-1-i] ) {

                    i = l + 1;

                }

            }

            return ( i === l );

        },

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

        fuzzyMatch: function ( str, search, isCaseSensitive ) {

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

        },

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

        repeat: function ( str, times ) {

            var result = '';

            if ( times < 1 ) return result;

            while ( times > 1 ) {

                if ( times & 1 ) result += str;
                times >>= 1, str += str;

            }

            return result + str;

        },

        /*
         * Search and replace for string. //FIXME
         */

        replace: function ( str, search, replace ) {

            if ( search.indexOf ( str ) !== -1 ) {

                str = underbar.zipObject ( search, replace )[str]; //FIXME: does it work?

            }

            return str;

        },

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

        startsWith: function ( str, target, position ) {

            position = position || 0;

            for ( var i = 0, l = target.length; i < l; i++ ) {

                if ( str[position + i] !== target[i] ) {

                    i = l + 1;

                }

            }

            return ( i === l );

        },

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

        trim: function ( str, chars, guard ) {

            if ( guard && isIterateeCall ( str, chars, guard ) ) {

                chars = undefined;

            }

            return underbar.trimRight ( underbar.trimLeft ( str, chars ), chars );

        },

        /*
         * Removes leading whitespace or specified characters from `string`.
         *
         * _.trimLeft('  abc  ');
         * // => 'abc  '
         *
         * _.trimLeft('-_-abc-_-', '_-');
         * // => 'abc-_-'
         */

        trimLeft: function ( str, chars, guard ) {

            if ( guard ? isIterateeCall ( str, chars, guard ) : chars == null ) {

                chars = ' \t\n';

            }

            for ( var i = 0, l = str.length; i < l; i++ ) {


                for ( var ci = 0, cl = chars.length; ci < cl; ci++ ) {

                    if ( chars[ci] === str.charAt ( i ) ) {

                        ci = cl + 1;

                    }

                }

                if ( ci === cl ) {

                    return str.substr ( i, l );

                }

            }

            return '';

        },

        /*
         * Removes trailing whitespace or specified characters from `string`.
         *
         * _.trimRight('  abc  ');
         * // => '  abc'
         *
         * _.trimRight('-_-abc-_-', '_-');
         * // => '-_-abc'
         */

        trimRight: function ( str, chars, guard ) {

            if ( guard ? isIterateeCall ( str, chars, guard ) : chars == null ) {

                chars = ' \t\n';

            }

            for ( var i = str.length - 1; i >= 0; i-- ) {

                for ( var ci = 0, cl = chars.length; ci < cl; ci++ ) {

                    if ( chars[ci] === str.charAt ( i ) ) {

                        ci = cl + 1;

                    }

                }

                if ( ci === cl ) {

                    return str.substr ( 0, i + 1 );

                }

            }

            return '';

        },

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

        words: function ( str, pattern, guard ) {

            if ( guard ? isIterateeCall ( str, pattern, guard ) : pattern == null ) {

                pattern = reWords;

            }

            return str.match ( pattern ) || [];

        },

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

        constant: function ( value ) {

            return function () {

                return value;

            };

        },

        /*
         * This method returns the first argument provided to it.
         *
         * var object = { 'user': 'fred' };
         *
         * _.identity(object) === object;
         * // => true
         */

        identity: function ( value ) {

            return value;

        },

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

        matches: function ( obj ) {

            return function ( thisObj ) {

                for ( var key in obj ) {

                    if ( thisObj[key] !== obj[key] ) {

                        return false;

                    }

                }

                return true;

            };

        },

        /*
         * Creates a function which compares the property value of `key` on a given
         * object to `value`.
         *
         * var users = [
         *   { 'user': 'barney' },
         *   { 'user': 'fred' }
         * ];
         *
         * _.find(users, _.matchesProperty('user', 'fred'));
         * // => { 'user': 'fred' }
         */

        matchesProperty: function ( key, value ) {

            return function ( thisObj ) {

                return ( thisObj[key] === value );

            };

        },

        /*
         * A no-operation function which returns `undefined` regardless of the
         * arguments it receives.
         *
         * var object = { 'user': 'fred' };
         *
         * _.noop(object) === undefined;
         * // => true
         */

        noop: function () {},

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

        property: function ( key ) {

            return function ( thisObj ) {

                return thisObj[key];

            };

        },

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

        range: function ( start, end, step ) {

            step = isUndefined ( step ) ? 1 : step;

            if ( isUndefined ( end ) ) {

                end = start || 0;
                start = 0;

            }

            var index = -1,
                length = step ? Math.ceil ( ( end - start ) / step ) : end - start,
                result = Array ( length );

            while ( ++index < length ) {

                result[index] = start;
                start += step;

            }

            return result;

        },

        /*
         * Invokes the iteratee function `n` times, returning an array of the results
         * of each invocation. The `iteratee` is bound to `thisArg` and invoked with
         * one argument; (index).
         *
         * var diceRolls = _.times(3, _.partial(_.random, 1, 6, false));
         * // => [3, 6, 4]
         *
         * _.times(3, function(n) {
         *   mage.castSpell(n);
         * });
         * // => invokes `mage.castSpell(n)` three times with `n` of `0`, `1`, and `2` respectively
         *
         * _.times(3, function(n) {
         *   this.cast(n);
         * }, mage);
         * // => also invokes `mage.castSpell(n)` three times
         */

        times: function ( nr, iteratee, thisArg ) {

            if ( !isFunction ( iteratee ) ) {

                iteratee = underbar.identity;

            }

            var result = Array ( nr );

            for ( var i = 0; i < nr; i++ ) {

                result[i] = iteratee.call ( thisArg, nr );

            }

            return result;

        },

        /*
         * Gets a unique identifier.
         *
         * _.uniqueId();
         * // => "1"
         *
         * _.uniqueId ('test_');
         * // => "test_1"
         */

        uniqueId: function ( prefix ) {

            return ( prefix || '' ) + ( uuid += 1 ).toString ();

        }

    });

    /* PROTOTYPE ASSIGNMENT */

    underbar.fn.init.prototype = underbar.fn;

    /* ALIASES */

    window.underbar = underbar;

    if ( window._ === undefined ) {

        window._ = underbar;

    }

}( window, document ));
