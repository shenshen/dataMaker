/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dataMaker/dist/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	  var dataMakerModule;
	  __webpack_require__(9);
	  dataMakerModule = __webpack_require__(1);
	  return angular.bootstrap(document, ["dataMaker"]);
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  var _, textData;
	  _ = __webpack_require__(7);
	  textData = __webpack_require__(14);
	  return angular.module("dataMaker", ["ngMaterial"]).controller("AppCtrl", [
	    "$scope", "$mdDialog", function($scope, $mdDialog) {
	      var itemGetter, tempId;
	      tempId = 1;
	      $scope.types = {
	        'array': {
	          name: "数组",
	          category: "数值类型",
	          _hasChildren: function() {
	            return true;
	          },
	          opt: {
	            valuein: ""
	          },
	          getter: function(opt) {
	            return {
	              run: function() {}
	            };
	          }
	        },
	        'object': {
	          name: "对象",
	          category: "数值类型",
	          _hasChildren: function() {
	            return true;
	          },
	          getter: function() {
	            return {
	              run: function() {
	                return {};
	              }
	            };
	          }
	        },
	        'email': {
	          name: "Email",
	          category: "人相关的",
	          example: "example@qq.com",
	          defaultValue: "",
	          getter: function(opt) {
	            debugger;
	          }
	        },
	        'string': {
	          name: "字符串",
	          category: "数值类型",
	          opt: {
	            max: 10,
	            min: 0,
	            valuein: "",
	            textType: 1
	          },
	          getter: function(opt) {
	            var result, text;
	            if (opt.valuein) {
	              result = opt.valuein.split("|");
	            } else {
	              text = textData[opt.textType];
	            }
	            return {
	              run: function() {
	                var max, min, strIndex;
	                if (opt.valuein) {
	                  return result[parseInt(Math.random() * result.length)];
	                } else {
	                  result = "";
	                  while (result.length <= opt.min) {
	                    max = opt.max - result.length;
	                    min = opt.min - result.length;
	                    strIndex = parseInt(Math.random() * (max - min + 1) + min);
	                    result += text.substring(0, strIndex);
	                  }
	                }
	                return result;
	              }
	            };
	          }
	        },
	        'date': {
	          name: "日期",
	          disabled: true
	        },
	        'phone': {
	          name: "手机号",
	          disabled: true
	        },
	        'country': {
	          name: "国家",
	          disabled: true
	        }
	      };
	      $scope.struct = {
	        root: {
	          type: "object",
	          name: "root",
	          level: 0,
	          opt: {},
	          _child: $scope.types['object']._hasChildren,
	          _childItem: {}
	        }
	      };
	      $scope.addStruct = function(node) {
	        node._childItem = node._childItem || {};
	        return node._childItem["data" + tempId] = {
	          level: node.level + 1,
	          name: "data" + (tempId++)
	        };
	      };
	      $scope.delStruct = function(parent, key, value) {
	        return delete parent._childItem[key];
	      };
	      $scope.changeType = function(node) {
	        node._child = $scope.types[node.type]._hasChildren;
	        node._childItem = {};
	        node.opt = {};
	        if (node.type === 'array') {
	          node.opt.childType = 0;
	        }
	        if (node.type === "string") {
	          return node.opt.textType = "chineseText";
	        }
	      };
	      itemGetter = null;
	      $scope.doCreate = function() {
	        var renderArray, renderObject, result;
	        result = "";
	        renderArray = function(obj) {
	          var a, count;
	          a = [];
	          count = obj.opt.childLength;
	          while (count-- > 0) {
	            _.each(obj._childItem, function(value) {
	              if (value.type === "object") {
	                return a.push(renderObject(value));
	              } else if (value.type === "array") {
	                return a.push(renderArray(value));
	              } else {
	                return a.push($scope.types[value.type].getter(value.opt).run());
	              }
	            });
	          }
	          return a;
	        };
	        renderObject = function(obj) {
	          var a;
	          a = {};
	          _.each(obj._childItem, function(value) {
	            if (value.type === "object") {
	              return a[value.name] = renderObject(value);
	            } else if (value.type === "array") {
	              return a[value.name] = renderArray(value);
	            } else {
	              return a[value.name] = $scope.types[value.type].getter(value.opt).run();
	            }
	          });
	          return a;
	        };
	        if ($scope.struct.root.type === "array") {
	          result = renderArray($scope.struct.root);
	        } else if ($scope.struct.root.type === "object") {
	          result = renderObject($scope.struct.root);
	        } else {
	          result = $scope.types[$scope.struct.root.type].getter($scope.struct.root.opt).run();
	        }
	        return result;
	      };
	      $scope.doCreateJson = function(ev) {
	        var result;
	        result = $scope.doCreate();
	        return $mdDialog.show($mdDialog.alert().parent(angular.element(document.body)).title("结果").content(JSON.stringify(result)).ariaLabel("结果").ok("确定").targetEvent(ev));
	      };
	      $scope.doCreateJs = function(ev) {
	        var result;
	        result = $scope.doCreate();
	        return $mdDialog.show($mdDialog.alert().parent(angular.element(document.body)).title("结果").content("var data = " + (JSON.stringify(result))).ariaLabel("结果").ok("确定").targetEvent(ev));
	      };
	      $scope.doCreateMySql = function(ev) {
	        var result;
	        result = $scope.doCreate();
	        return $mdDialog.show($mdDialog.alert().parent(angular.element(document.body)).title("结果").content("DROP TABLE `myTable`; CREATE TABLE `myTable` ( `id` mediumint(8) unsigned NOT NULL auto_increment, `name` varchar(255) default NULL, PRIMARY KEY (`id`) ) AUTO_INCREMENT=1; INSERT INTO `myTable` (`name`) VALUES (\"Len\"),(\"Brendan\"),(\"Allistair\"),(\"Talon\"),(\"Keefe\"),(\"Hilel\"),(\"Ezra\"),(\"Duncan\"),(\"Talon\"),(\"Ezra\"); INSERT INTO `myTable` (`name`) VALUES (\"Tyrone\"),(\"Caleb\"),(\"Gregory\"),(\"Lucas\"),(\"Brenden\"),(\"Dennis\"),(\"Brendan\"),(\"Armand\"),(\"Ezekiel\"),(\"Stephen\"); INSERT INTO `myTable` (`name`) VALUES (\"Joseph\"),(\"Duncan\"),(\"Tyrone\"),(\"Alden\"),(\"Vaughan\"),(\"Macaulay\"),(\"Abraham\"),(\"Thaddeus\"),(\"Brandon\"),(\"Brent\"); INSERT INTO `myTable` (`name`) VALUES (\"Orson\"),(\"Chase\"),(\"Brady\"),(\"Graham\"),(\"Xander\"),(\"Neil\"),(\"Brady\"),(\"Donovan\"),(\"Ahmed\"),(\"Zeph\"); INSERT INTO `myTable` (`name`) VALUES (\"Rudyard\"),(\"Quinlan\"),(\"Neil\"),(\"Rigel\"),(\"Phillip\"),(\"Lucas\"),(\"Quamar\"),(\"Dustin\"),(\"Devin\"),(\"Julian\"); INSERT INTO `myTable` (`name`) VALUES (\"Clarke\"),(\"Ethan\"),(\"Adam\"),(\"Armand\"),(\"Drew\"),(\"George\"),(\"Basil\"),(\"Ignatius\"),(\"Norman\"),(\"Dexter\"); INSERT INTO `myTable` (`name`) VALUES (\"Ian\"),(\"Herrod\"),(\"Ashton\"),(\"August\"),(\"Josiah\"),(\"James\"),(\"Patrick\"),(\"Timothy\"),(\"Phelan\"),(\"Baker\"); INSERT INTO `myTable` (`name`) VALUES (\"Lucius\"),(\"Jameson\"),(\"Nissim\"),(\"Donovan\"),(\"Eagan\"),(\"Caldwell\"),(\"Reed\"),(\"Uriel\"),(\"Griffith\"),(\"Keaton\"); INSERT INTO `myTable` (`name`) VALUES (\"Avram\"),(\"Maxwell\"),(\"Giacomo\"),(\"Aristotle\"),(\"Ivor\"),(\"Clarke\"),(\"Joel\"),(\"Ali\"),(\"Dexter\"),(\"Xenos\"); INSERT INTO `myTable` (`name`) VALUES (\"Plato\"),(\"Colby\"),(\"Rafael\"),(\"Vance\"),(\"Samuel\"),(\"Daquan\"),(\"Tad\"),(\"Isaiah\"),(\"Wayne\"),(\"David\");").ariaLabel("结果").ok("确定").targetEvent(ev));
	      };
	      $scope.changeArrayType = function(node) {
	        return node._childItem = {};
	      };
	      return this;
	    }
	  ]);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };


	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };

	  _.noop = function(){};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };

	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./angular-material.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./angular-material.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(15)();
	exports.push([module.id, "/*!\n * Angular Material Design\n * https://github.com/angular/material\n * @license MIT\n * v0.9.4\n */\n/* mixin definition ; sets LTR and RTL within the same style call */\nhtml, body {\n  height: 100%;\n  color: rgba(0, 0, 0, 0.87);\n  background: white;\n  position: relative; }\n\nbody {\n  margin: 0;\n  padding: 0; }\n\n[tabindex='-1']:focus {\n  outline: none; }\n\n.inset {\n  padding: 10px; }\n\nbutton.md-no-style {\n  font-weight: normal;\n  background-color: inherit;\n  text-align: left;\n  border: none;\n  padding: 0;\n  margin: 0; }\n\nselect, button, textarea, input {\n  vertical-align: baseline; }\n\ninput[type=\"reset\"], input[type=\"submit\"], html input[type=\"button\"], button {\n  cursor: pointer;\n  -webkit-appearance: button; }\n  input[type=\"reset\"][disabled], input[type=\"submit\"][disabled], html input[type=\"button\"][disabled], button[disabled] {\n    cursor: default; }\n\ntextarea {\n  vertical-align: top;\n  overflow: auto; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  box-sizing: content-box;\n  -webkit-box-sizing: content-box; }\n  input[type=\"search\"]::-webkit-search-decoration, input[type=\"search\"]::-webkit-search-cancel-button {\n    -webkit-appearance: none; }\n\n.md-visually-hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  text-transform: none;\n  width: 1px; }\n\n.md-shadow {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  border-radius: inherit;\n  pointer-events: none; }\n\n.md-shadow-bottom-z-1, .md-button.md-raised:not([disabled]), .md-button.md-fab, .md-button.md-raised.md-focused:not([disabled]), .md-button.md-fab.md-focused:not([disabled]) {\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26); }\n\n.md-shadow-bottom-z-2, .md-button.md-raised:not([disabled]):active, .md-button.md-fab:not([disabled]):active {\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4); }\n\n.md-shadow-animated.md-shadow {\n  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1); }\n\n/*\n * A container inside of a rippling element (eg a button),\n * which contains all of the individual ripples\n */\n.md-ripple-container {\n  pointer-events: none;\n  position: absolute;\n  overflow: hidden;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  transition: all 0.55s cubic-bezier(0.25, 0.8, 0.25, 1); }\n\n.md-ripple {\n  position: absolute;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  -webkit-transform-origin: 50% 50%;\n          transform-origin: 50% 50%;\n  opacity: 0;\n  border-radius: 50%; }\n  .md-ripple.md-ripple-placed {\n    transition: left 1.8s cubic-bezier(0.25, 0.8, 0.25, 1), top 1.8s cubic-bezier(0.25, 0.8, 0.25, 1), margin 1.3s cubic-bezier(0.25, 0.8, 0.25, 1), border 1.3s cubic-bezier(0.25, 0.8, 0.25, 1), width 1.3s cubic-bezier(0.25, 0.8, 0.25, 1), height 1.3s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 1.3s cubic-bezier(0.25, 0.8, 0.25, 1), -webkit-transform 1.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n    transition: left 1.8s cubic-bezier(0.25, 0.8, 0.25, 1), top 1.8s cubic-bezier(0.25, 0.8, 0.25, 1), margin 1.3s cubic-bezier(0.25, 0.8, 0.25, 1), border 1.3s cubic-bezier(0.25, 0.8, 0.25, 1), width 1.3s cubic-bezier(0.25, 0.8, 0.25, 1), height 1.3s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 1.3s cubic-bezier(0.25, 0.8, 0.25, 1), transform 1.3s cubic-bezier(0.25, 0.8, 0.25, 1); }\n  .md-ripple.md-ripple-scaled {\n    -webkit-transform: scale(1);\n            transform: scale(1); }\n  .md-ripple.md-ripple-active, .md-ripple.md-ripple-full, .md-ripple.md-ripple-visible {\n    opacity: 0.20; }\n\n.md-padding {\n  padding: 8px; }\n\n.md-margin {\n  margin: 8px; }\n\n.md-scroll-mask {\n  position: absolute;\n  background-color: transparent; }\n  .md-scroll-mask > .md-scroll-mask-bar {\n    display: block;\n    position: absolute;\n    background-color: #fafafa;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    z-index: 65;\n    box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 0.3); }\n\n@media (min-width: 600px) {\n  .md-padding {\n    padding: 16px; } }\n\nhtml, body {\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n  -webkit-text-size-adjust: 100%;\n  -webkit-font-smoothing: antialiased; }\n\nmd-select, md-card, md-list, md-toolbar, ul, ol, p, h1, h2, h3, h4, h5, h6 {\n  text-rendering: optimizeLegibility; }\n\n/************\n * Headings\n ************/\n.md-display-4 {\n  font-size: 112px;\n  font-weight: 300;\n  letter-spacing: -0.01em;\n  line-height: 112px; }\n\n.md-display-3 {\n  font-size: 56px;\n  font-weight: 400;\n  letter-spacing: -0.005em;\n  line-height: 56px; }\n\n.md-display-2 {\n  font-size: 45px;\n  font-weight: 400;\n  line-height: 64px; }\n\n.md-display-1 {\n  font-size: 34px;\n  font-weight: 400;\n  line-height: 40px; }\n\n.md-headline {\n  font-size: 24px;\n  font-weight: 400;\n  line-height: 32px; }\n\n.md-title, .md-toolbar-tools {\n  font-size: 20px;\n  font-weight: 500;\n  letter-spacing: 0.005em; }\n\n.md-subhead, md-list-item.md-2-line .md-list-item-text h3, md-list-item.md-2-line > .md-no-style .md-list-item-text h3, md-list-item.md-3-line .md-list-item-text h3, md-list-item.md-3-line > .md-no-style .md-list-item-text h3 {\n  font-size: 16px;\n  font-weight: 400;\n  letter-spacing: 0.01em;\n  line-height: 24px; }\n\n/************\n * Body Copy\n ************/\n.md-body-1 {\n  font-size: 14px;\n  font-weight: 400;\n  letter-spacing: 0.01em;\n  line-height: 20px; }\n\n.md-body-2, md-list .md-subheader, md-list-item.md-2-line .md-list-item-text h4, md-list-item.md-2-line > .md-no-style .md-list-item-text h4, md-list-item.md-3-line .md-list-item-text h4, md-list-item.md-3-line > .md-no-style .md-list-item-text h4, md-list-item.md-2-line .md-list-item-text p, md-list-item.md-2-line > .md-no-style .md-list-item-text p, md-list-item.md-3-line .md-list-item-text p, md-list-item.md-3-line > .md-no-style .md-list-item-text p {\n  font-size: 14px;\n  font-weight: 500;\n  letter-spacing: 0.01em;\n  line-height: 24px; }\n\n.md-caption {\n  font-size: 12px;\n  letter-spacing: 0.02em; }\n\n.md-button {\n  letter-spacing: 0.01em; }\n\n/************\n * Defaults\n ************/\nbutton, select, html, textarea, input {\n  font-family: RobotoDraft, Roboto, 'Helvetica Neue', sans-serif; }\n\nselect, button, textarea, input {\n  font-size: 100%; }\n\n/* Sizes:\n  0    <= size < 600  Phone\n  600  <= size < 960  Tablet\n  960  <= size < 1200 Tablet-Landscape\n  1200 <= size         PC\n*/\n[layout] {\n  box-sizing: border-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex; }\n\n[layout=column] {\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n\n[layout=row] {\n  -webkit-flex-direction: row;\n      -ms-flex-direction: row;\n          flex-direction: row; }\n\n[layout-padding] > [flex-sm], [layout-padding] > [flex-lt-md] {\n  padding: 4px; }\n\n[layout-padding], [layout-padding] > [flex], [layout-padding] > [flex-gt-sm], [layout-padding] > [flex-md], [layout-padding] > [flex-lt-lg] {\n  padding: 8px; }\n\n[layout-padding] > [flex-gt-md], [layout-padding] > [flex-lg] {\n  padding: 16px; }\n\n[layout-margin] > [flex-sm], [layout-margin] > [flex-lt-md] {\n  margin: 4px; }\n\n[layout-margin], [layout-margin] > [flex], [layout-margin] > [flex-gt-sm], [layout-margin] > [flex-md], [layout-margin] > [flex-lt-lg] {\n  margin: 8px; }\n\n[layout-margin] > [flex-gt-md], [layout-margin] > [flex-lg] {\n  margin: 16px; }\n\n[layout-wrap] {\n  -webkit-flex-wrap: wrap;\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap; }\n\n[layout-fill] {\n  margin: 0;\n  min-height: 100%;\n  width: 100%; }\n\n@-moz-document url-prefix() {\n  [layout-fill] {\n    margin: 0;\n    width: 100%;\n    min-height: auto;\n    height: inherit; } }\n\n[flex] {\n  box-sizing: border-box;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1; }\n\n[flex=\"0\"] {\n  -webkit-flex: 0 0 0%;\n      -ms-flex: 0 0 0%;\n          flex: 0 0 0%; }\n\n[layout=\"row\"] > [flex=\"0\"] {\n  max-width: 0%; }\n\n[layout=\"column\"] > [flex=\"0\"] {\n  max-height: 0%; }\n\n[flex=\"5\"] {\n  -webkit-flex: 0 0 5%;\n      -ms-flex: 0 0 5%;\n          flex: 0 0 5%; }\n\n[layout=\"row\"] > [flex=\"5\"] {\n  max-width: 5%; }\n\n[layout=\"column\"] > [flex=\"5\"] {\n  max-height: 5%; }\n\n[flex=\"10\"] {\n  -webkit-flex: 0 0 10%;\n      -ms-flex: 0 0 10%;\n          flex: 0 0 10%; }\n\n[layout=\"row\"] > [flex=\"10\"] {\n  max-width: 10%; }\n\n[layout=\"column\"] > [flex=\"10\"] {\n  max-height: 10%; }\n\n[flex=\"15\"] {\n  -webkit-flex: 0 0 15%;\n      -ms-flex: 0 0 15%;\n          flex: 0 0 15%; }\n\n[layout=\"row\"] > [flex=\"15\"] {\n  max-width: 15%; }\n\n[layout=\"column\"] > [flex=\"15\"] {\n  max-height: 15%; }\n\n[flex=\"20\"] {\n  -webkit-flex: 0 0 20%;\n      -ms-flex: 0 0 20%;\n          flex: 0 0 20%; }\n\n[layout=\"row\"] > [flex=\"20\"] {\n  max-width: 20%; }\n\n[layout=\"column\"] > [flex=\"20\"] {\n  max-height: 20%; }\n\n[flex=\"25\"] {\n  -webkit-flex: 0 0 25%;\n      -ms-flex: 0 0 25%;\n          flex: 0 0 25%; }\n\n[layout=\"row\"] > [flex=\"25\"] {\n  max-width: 25%; }\n\n[layout=\"column\"] > [flex=\"25\"] {\n  max-height: 25%; }\n\n[flex=\"30\"] {\n  -webkit-flex: 0 0 30%;\n      -ms-flex: 0 0 30%;\n          flex: 0 0 30%; }\n\n[layout=\"row\"] > [flex=\"30\"] {\n  max-width: 30%; }\n\n[layout=\"column\"] > [flex=\"30\"] {\n  max-height: 30%; }\n\n[flex=\"35\"] {\n  -webkit-flex: 0 0 35%;\n      -ms-flex: 0 0 35%;\n          flex: 0 0 35%; }\n\n[layout=\"row\"] > [flex=\"35\"] {\n  max-width: 35%; }\n\n[layout=\"column\"] > [flex=\"35\"] {\n  max-height: 35%; }\n\n[flex=\"40\"] {\n  -webkit-flex: 0 0 40%;\n      -ms-flex: 0 0 40%;\n          flex: 0 0 40%; }\n\n[layout=\"row\"] > [flex=\"40\"] {\n  max-width: 40%; }\n\n[layout=\"column\"] > [flex=\"40\"] {\n  max-height: 40%; }\n\n[flex=\"45\"] {\n  -webkit-flex: 0 0 45%;\n      -ms-flex: 0 0 45%;\n          flex: 0 0 45%; }\n\n[layout=\"row\"] > [flex=\"45\"] {\n  max-width: 45%; }\n\n[layout=\"column\"] > [flex=\"45\"] {\n  max-height: 45%; }\n\n[flex=\"50\"] {\n  -webkit-flex: 0 0 50%;\n      -ms-flex: 0 0 50%;\n          flex: 0 0 50%; }\n\n[layout=\"row\"] > [flex=\"50\"] {\n  max-width: 50%; }\n\n[layout=\"column\"] > [flex=\"50\"] {\n  max-height: 50%; }\n\n[flex=\"55\"] {\n  -webkit-flex: 0 0 55%;\n      -ms-flex: 0 0 55%;\n          flex: 0 0 55%; }\n\n[layout=\"row\"] > [flex=\"55\"] {\n  max-width: 55%; }\n\n[layout=\"column\"] > [flex=\"55\"] {\n  max-height: 55%; }\n\n[flex=\"60\"] {\n  -webkit-flex: 0 0 60%;\n      -ms-flex: 0 0 60%;\n          flex: 0 0 60%; }\n\n[layout=\"row\"] > [flex=\"60\"] {\n  max-width: 60%; }\n\n[layout=\"column\"] > [flex=\"60\"] {\n  max-height: 60%; }\n\n[flex=\"65\"] {\n  -webkit-flex: 0 0 65%;\n      -ms-flex: 0 0 65%;\n          flex: 0 0 65%; }\n\n[layout=\"row\"] > [flex=\"65\"] {\n  max-width: 65%; }\n\n[layout=\"column\"] > [flex=\"65\"] {\n  max-height: 65%; }\n\n[flex=\"70\"] {\n  -webkit-flex: 0 0 70%;\n      -ms-flex: 0 0 70%;\n          flex: 0 0 70%; }\n\n[layout=\"row\"] > [flex=\"70\"] {\n  max-width: 70%; }\n\n[layout=\"column\"] > [flex=\"70\"] {\n  max-height: 70%; }\n\n[flex=\"75\"] {\n  -webkit-flex: 0 0 75%;\n      -ms-flex: 0 0 75%;\n          flex: 0 0 75%; }\n\n[layout=\"row\"] > [flex=\"75\"] {\n  max-width: 75%; }\n\n[layout=\"column\"] > [flex=\"75\"] {\n  max-height: 75%; }\n\n[flex=\"80\"] {\n  -webkit-flex: 0 0 80%;\n      -ms-flex: 0 0 80%;\n          flex: 0 0 80%; }\n\n[layout=\"row\"] > [flex=\"80\"] {\n  max-width: 80%; }\n\n[layout=\"column\"] > [flex=\"80\"] {\n  max-height: 80%; }\n\n[flex=\"85\"] {\n  -webkit-flex: 0 0 85%;\n      -ms-flex: 0 0 85%;\n          flex: 0 0 85%; }\n\n[layout=\"row\"] > [flex=\"85\"] {\n  max-width: 85%; }\n\n[layout=\"column\"] > [flex=\"85\"] {\n  max-height: 85%; }\n\n[flex=\"90\"] {\n  -webkit-flex: 0 0 90%;\n      -ms-flex: 0 0 90%;\n          flex: 0 0 90%; }\n\n[layout=\"row\"] > [flex=\"90\"] {\n  max-width: 90%; }\n\n[layout=\"column\"] > [flex=\"90\"] {\n  max-height: 90%; }\n\n[flex=\"95\"] {\n  -webkit-flex: 0 0 95%;\n      -ms-flex: 0 0 95%;\n          flex: 0 0 95%; }\n\n[layout=\"row\"] > [flex=\"95\"] {\n  max-width: 95%; }\n\n[layout=\"column\"] > [flex=\"95\"] {\n  max-height: 95%; }\n\n[flex=\"100\"] {\n  -webkit-flex: 0 0 100%;\n      -ms-flex: 0 0 100%;\n          flex: 0 0 100%; }\n\n[layout=\"row\"] > [flex=\"100\"] {\n  max-width: 100%; }\n\n[layout=\"column\"] > [flex=\"100\"] {\n  max-height: 100%; }\n\n[flex=\"33\"], [flex=\"34\"] {\n  -webkit-flex: 0 0 33.33%;\n      -ms-flex: 0 0 33.33%;\n          flex: 0 0 33.33%; }\n\n[flex=\"66\"], [flex=\"67\"] {\n  -webkit-flex: 0 0 66.66%;\n      -ms-flex: 0 0 66.66%;\n          flex: 0 0 66.66%; }\n\n[layout=\"row\"] > [flex=\"33\"], [layout=\"row\"] > [flex=\"34\"] {\n  max-width: 33.33%; }\n[layout=\"row\"] > [flex=\"66\"], [layout=\"row\"] > [flex=\"67\"] {\n  max-width: 66.66%; }\n\n[layout=\"column\"] > [flex=\"33\"], [layout=\"column\"] > [flex=\"34\"] {\n  max-height: 33.33%; }\n[layout=\"column\"] > [flex=\"66\"], [layout=\"column\"] > [flex=\"67\"] {\n  max-height: 66.66%; }\n\n[layout-align=\"center\"], [layout-align=\"center center\"], [layout-align=\"center start\"], [layout-align=\"center end\"] {\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n\n[layout-align=\"end\"], [layout-align=\"end center\"], [layout-align=\"end start\"], [layout-align=\"end end\"] {\n  -webkit-justify-content: flex-end;\n      -ms-flex-pack: end;\n          justify-content: flex-end; }\n\n[layout-align=\"space-around\"], [layout-align=\"space-around center\"], [layout-align=\"space-around start\"], [layout-align=\"space-around end\"] {\n  -webkit-justify-content: space-around;\n      -ms-flex-pack: distribute;\n          justify-content: space-around; }\n\n[layout-align=\"space-between\"], [layout-align=\"space-between center\"], [layout-align=\"space-between start\"], [layout-align=\"space-between end\"] {\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between; }\n\n[layout-align=\"center center\"], [layout-align=\"start center\"], [layout-align=\"end center\"], [layout-align=\"space-between center\"], [layout-align=\"space-around center\"] {\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center; }\n\n[layout-align=\"center start\"], [layout-align=\"start start\"], [layout-align=\"end start\"], [layout-align=\"space-between start\"], [layout-align=\"space-around start\"] {\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start; }\n\n[layout-align=\"center end\"], [layout-align=\"start end\"], [layout-align=\"end end\"], [layout-align=\"space-between end\"], [layout-align=\"space-around end\"] {\n  -webkit-align-items: flex-end;\n      -ms-flex-align: end;\n          align-items: flex-end; }\n\n[flex-order=\"0\"] {\n  -webkit-order: 0;\n      -ms-flex-order: 0;\n          order: 0; }\n\n[flex-order=\"1\"] {\n  -webkit-order: 1;\n      -ms-flex-order: 1;\n          order: 1; }\n\n[flex-order=\"2\"] {\n  -webkit-order: 2;\n      -ms-flex-order: 2;\n          order: 2; }\n\n[flex-order=\"3\"] {\n  -webkit-order: 3;\n      -ms-flex-order: 3;\n          order: 3; }\n\n[flex-order=\"4\"] {\n  -webkit-order: 4;\n      -ms-flex-order: 4;\n          order: 4; }\n\n[flex-order=\"5\"] {\n  -webkit-order: 5;\n      -ms-flex-order: 5;\n          order: 5; }\n\n[flex-order=\"6\"] {\n  -webkit-order: 6;\n      -ms-flex-order: 6;\n          order: 6; }\n\n[flex-order=\"7\"] {\n  -webkit-order: 7;\n      -ms-flex-order: 7;\n          order: 7; }\n\n[flex-order=\"8\"] {\n  -webkit-order: 8;\n      -ms-flex-order: 8;\n          order: 8; }\n\n[flex-order=\"9\"] {\n  -webkit-order: 9;\n      -ms-flex-order: 9;\n          order: 9; }\n\n[offset=\"5\"] {\n  margin-left: 5%; }\n\n[offset=\"10\"] {\n  margin-left: 10%; }\n\n[offset=\"15\"] {\n  margin-left: 15%; }\n\n[offset=\"20\"] {\n  margin-left: 20%; }\n\n[offset=\"25\"] {\n  margin-left: 25%; }\n\n[offset=\"30\"] {\n  margin-left: 30%; }\n\n[offset=\"35\"] {\n  margin-left: 35%; }\n\n[offset=\"40\"] {\n  margin-left: 40%; }\n\n[offset=\"45\"] {\n  margin-left: 45%; }\n\n[offset=\"50\"] {\n  margin-left: 50%; }\n\n[offset=\"55\"] {\n  margin-left: 55%; }\n\n[offset=\"60\"] {\n  margin-left: 60%; }\n\n[offset=\"65\"] {\n  margin-left: 65%; }\n\n[offset=\"70\"] {\n  margin-left: 70%; }\n\n[offset=\"75\"] {\n  margin-left: 75%; }\n\n[offset=\"80\"] {\n  margin-left: 80%; }\n\n[offset=\"85\"] {\n  margin-left: 85%; }\n\n[offset=\"90\"] {\n  margin-left: 90%; }\n\n[offset=\"95\"] {\n  margin-left: 95%; }\n\n[offset=\"33\"], [offset=\"34\"] {\n  margin-left: 33.33%; }\n\n[offset=\"66\"], [offset=\"67\"] {\n  margin-left: 66.66%; }\n\n/**\n * `hide-gt-sm show-gt-lg` should hide from 600px to 1200px\n * `show-md hide-gt-sm` should show from 0px to 960px and hide at >960px\n * `hide-gt-md show-gt-sm` should show everywhere (show overrides hide)`\n */\n@media (max-width: 599px) {\n  [hide-sm]:not([show-sm]):not([show]), [hide]:not([show-sm]):not([show]) {\n    display: none; }\n  [flex-order-sm=\"0\"] {\n    -webkit-order: 0;\n        -ms-flex-order: 0;\n            order: 0; }\n  [flex-order-sm=\"1\"] {\n    -webkit-order: 1;\n        -ms-flex-order: 1;\n            order: 1; }\n  [flex-order-sm=\"2\"] {\n    -webkit-order: 2;\n        -ms-flex-order: 2;\n            order: 2; }\n  [flex-order-sm=\"3\"] {\n    -webkit-order: 3;\n        -ms-flex-order: 3;\n            order: 3; }\n  [flex-order-sm=\"4\"] {\n    -webkit-order: 4;\n        -ms-flex-order: 4;\n            order: 4; }\n  [flex-order-sm=\"5\"] {\n    -webkit-order: 5;\n        -ms-flex-order: 5;\n            order: 5; }\n  [flex-order-sm=\"6\"] {\n    -webkit-order: 6;\n        -ms-flex-order: 6;\n            order: 6; }\n  [flex-order-sm=\"7\"] {\n    -webkit-order: 7;\n        -ms-flex-order: 7;\n            order: 7; }\n  [flex-order-sm=\"8\"] {\n    -webkit-order: 8;\n        -ms-flex-order: 8;\n            order: 8; }\n  [flex-order-sm=\"9\"] {\n    -webkit-order: 9;\n        -ms-flex-order: 9;\n            order: 9; }\n  [layout-align-sm=\"center\"], [layout-align-sm=\"center center\"], [layout-align-sm=\"center start\"], [layout-align-sm=\"center end\"] {\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  [layout-align-sm=\"end\"], [layout-align-sm=\"end center\"], [layout-align-sm=\"end start\"], [layout-align-sm=\"end end\"] {\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n  [layout-align-sm=\"space-around\"], [layout-align-sm=\"space-around center\"], [layout-align-sm=\"space-around start\"], [layout-align-sm=\"space-around end\"] {\n    -webkit-justify-content: space-around;\n        -ms-flex-pack: distribute;\n            justify-content: space-around; }\n  [layout-align-sm=\"space-between\"], [layout-align-sm=\"space-between center\"], [layout-align-sm=\"space-between start\"], [layout-align-sm=\"space-between end\"] {\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between; }\n  [layout-align-sm=\"center center\"], [layout-align-sm=\"start center\"], [layout-align-sm=\"end center\"], [layout-align-sm=\"space-between center\"], [layout-align-sm=\"space-around center\"] {\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  [layout-align-sm=\"center start\"], [layout-align-sm=\"start start\"], [layout-align-sm=\"end start\"], [layout-align-sm=\"space-between start\"], [layout-align-sm=\"space-around start\"] {\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start; }\n  [layout-align-sm=\"center end\"], [layout-align-sm=\"start end\"], [layout-align-sm=\"end end\"], [layout-align-sm=\"space-between end\"], [layout-align-sm=\"space-around end\"] {\n    -webkit-align-items: flex-end;\n        -ms-flex-align: end;\n            align-items: flex-end; }\n  [layout-sm] {\n    box-sizing: border-box;\n    display: -webkit-flex;\n    display: -moz-flex;\n    display: -ms-flexbox;\n    display: flex; }\n  [layout-sm=column] {\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n  [layout-sm=row] {\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row; }\n  [offset-sm=\"5\"] {\n    margin-left: 5%; }\n  [offset-sm=\"10\"] {\n    margin-left: 10%; }\n  [offset-sm=\"15\"] {\n    margin-left: 15%; }\n  [offset-sm=\"20\"] {\n    margin-left: 20%; }\n  [offset-sm=\"25\"] {\n    margin-left: 25%; }\n  [offset-sm=\"30\"] {\n    margin-left: 30%; }\n  [offset-sm=\"35\"] {\n    margin-left: 35%; }\n  [offset-sm=\"40\"] {\n    margin-left: 40%; }\n  [offset-sm=\"45\"] {\n    margin-left: 45%; }\n  [offset-sm=\"50\"] {\n    margin-left: 50%; }\n  [offset-sm=\"55\"] {\n    margin-left: 55%; }\n  [offset-sm=\"60\"] {\n    margin-left: 60%; }\n  [offset-sm=\"65\"] {\n    margin-left: 65%; }\n  [offset-sm=\"70\"] {\n    margin-left: 70%; }\n  [offset-sm=\"75\"] {\n    margin-left: 75%; }\n  [offset-sm=\"80\"] {\n    margin-left: 80%; }\n  [offset-sm=\"85\"] {\n    margin-left: 85%; }\n  [offset-sm=\"90\"] {\n    margin-left: 90%; }\n  [offset-sm=\"95\"] {\n    margin-left: 95%; }\n  [offset-sm=\"33\"], [offset-sm=\"34\"] {\n    margin-left: 33.33%; }\n  [offset-sm=\"66\"], [offset-sm=\"67\"] {\n    margin-left: 66.66%; }\n  [flex-sm] {\n    box-sizing: border-box;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1; }\n  [flex-sm=\"0\"] {\n    -webkit-flex: 0 0 0%;\n        -ms-flex: 0 0 0%;\n            flex: 0 0 0%; }\n  [layout=\"row\"] > [flex-sm=\"0\"] {\n    max-width: 0%; }\n  [layout=\"column\"] > [flex-sm=\"0\"] {\n    max-height: 0%; }\n  [flex-sm=\"5\"] {\n    -webkit-flex: 0 0 5%;\n        -ms-flex: 0 0 5%;\n            flex: 0 0 5%; }\n  [layout=\"row\"] > [flex-sm=\"5\"] {\n    max-width: 5%; }\n  [layout=\"column\"] > [flex-sm=\"5\"] {\n    max-height: 5%; }\n  [flex-sm=\"10\"] {\n    -webkit-flex: 0 0 10%;\n        -ms-flex: 0 0 10%;\n            flex: 0 0 10%; }\n  [layout=\"row\"] > [flex-sm=\"10\"] {\n    max-width: 10%; }\n  [layout=\"column\"] > [flex-sm=\"10\"] {\n    max-height: 10%; }\n  [flex-sm=\"15\"] {\n    -webkit-flex: 0 0 15%;\n        -ms-flex: 0 0 15%;\n            flex: 0 0 15%; }\n  [layout=\"row\"] > [flex-sm=\"15\"] {\n    max-width: 15%; }\n  [layout=\"column\"] > [flex-sm=\"15\"] {\n    max-height: 15%; }\n  [flex-sm=\"20\"] {\n    -webkit-flex: 0 0 20%;\n        -ms-flex: 0 0 20%;\n            flex: 0 0 20%; }\n  [layout=\"row\"] > [flex-sm=\"20\"] {\n    max-width: 20%; }\n  [layout=\"column\"] > [flex-sm=\"20\"] {\n    max-height: 20%; }\n  [flex-sm=\"25\"] {\n    -webkit-flex: 0 0 25%;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%; }\n  [layout=\"row\"] > [flex-sm=\"25\"] {\n    max-width: 25%; }\n  [layout=\"column\"] > [flex-sm=\"25\"] {\n    max-height: 25%; }\n  [flex-sm=\"30\"] {\n    -webkit-flex: 0 0 30%;\n        -ms-flex: 0 0 30%;\n            flex: 0 0 30%; }\n  [layout=\"row\"] > [flex-sm=\"30\"] {\n    max-width: 30%; }\n  [layout=\"column\"] > [flex-sm=\"30\"] {\n    max-height: 30%; }\n  [flex-sm=\"35\"] {\n    -webkit-flex: 0 0 35%;\n        -ms-flex: 0 0 35%;\n            flex: 0 0 35%; }\n  [layout=\"row\"] > [flex-sm=\"35\"] {\n    max-width: 35%; }\n  [layout=\"column\"] > [flex-sm=\"35\"] {\n    max-height: 35%; }\n  [flex-sm=\"40\"] {\n    -webkit-flex: 0 0 40%;\n        -ms-flex: 0 0 40%;\n            flex: 0 0 40%; }\n  [layout=\"row\"] > [flex-sm=\"40\"] {\n    max-width: 40%; }\n  [layout=\"column\"] > [flex-sm=\"40\"] {\n    max-height: 40%; }\n  [flex-sm=\"45\"] {\n    -webkit-flex: 0 0 45%;\n        -ms-flex: 0 0 45%;\n            flex: 0 0 45%; }\n  [layout=\"row\"] > [flex-sm=\"45\"] {\n    max-width: 45%; }\n  [layout=\"column\"] > [flex-sm=\"45\"] {\n    max-height: 45%; }\n  [flex-sm=\"50\"] {\n    -webkit-flex: 0 0 50%;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%; }\n  [layout=\"row\"] > [flex-sm=\"50\"] {\n    max-width: 50%; }\n  [layout=\"column\"] > [flex-sm=\"50\"] {\n    max-height: 50%; }\n  [flex-sm=\"55\"] {\n    -webkit-flex: 0 0 55%;\n        -ms-flex: 0 0 55%;\n            flex: 0 0 55%; }\n  [layout=\"row\"] > [flex-sm=\"55\"] {\n    max-width: 55%; }\n  [layout=\"column\"] > [flex-sm=\"55\"] {\n    max-height: 55%; }\n  [flex-sm=\"60\"] {\n    -webkit-flex: 0 0 60%;\n        -ms-flex: 0 0 60%;\n            flex: 0 0 60%; }\n  [layout=\"row\"] > [flex-sm=\"60\"] {\n    max-width: 60%; }\n  [layout=\"column\"] > [flex-sm=\"60\"] {\n    max-height: 60%; }\n  [flex-sm=\"65\"] {\n    -webkit-flex: 0 0 65%;\n        -ms-flex: 0 0 65%;\n            flex: 0 0 65%; }\n  [layout=\"row\"] > [flex-sm=\"65\"] {\n    max-width: 65%; }\n  [layout=\"column\"] > [flex-sm=\"65\"] {\n    max-height: 65%; }\n  [flex-sm=\"70\"] {\n    -webkit-flex: 0 0 70%;\n        -ms-flex: 0 0 70%;\n            flex: 0 0 70%; }\n  [layout=\"row\"] > [flex-sm=\"70\"] {\n    max-width: 70%; }\n  [layout=\"column\"] > [flex-sm=\"70\"] {\n    max-height: 70%; }\n  [flex-sm=\"75\"] {\n    -webkit-flex: 0 0 75%;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%; }\n  [layout=\"row\"] > [flex-sm=\"75\"] {\n    max-width: 75%; }\n  [layout=\"column\"] > [flex-sm=\"75\"] {\n    max-height: 75%; }\n  [flex-sm=\"80\"] {\n    -webkit-flex: 0 0 80%;\n        -ms-flex: 0 0 80%;\n            flex: 0 0 80%; }\n  [layout=\"row\"] > [flex-sm=\"80\"] {\n    max-width: 80%; }\n  [layout=\"column\"] > [flex-sm=\"80\"] {\n    max-height: 80%; }\n  [flex-sm=\"85\"] {\n    -webkit-flex: 0 0 85%;\n        -ms-flex: 0 0 85%;\n            flex: 0 0 85%; }\n  [layout=\"row\"] > [flex-sm=\"85\"] {\n    max-width: 85%; }\n  [layout=\"column\"] > [flex-sm=\"85\"] {\n    max-height: 85%; }\n  [flex-sm=\"90\"] {\n    -webkit-flex: 0 0 90%;\n        -ms-flex: 0 0 90%;\n            flex: 0 0 90%; }\n  [layout=\"row\"] > [flex-sm=\"90\"] {\n    max-width: 90%; }\n  [layout=\"column\"] > [flex-sm=\"90\"] {\n    max-height: 90%; }\n  [flex-sm=\"95\"] {\n    -webkit-flex: 0 0 95%;\n        -ms-flex: 0 0 95%;\n            flex: 0 0 95%; }\n  [layout=\"row\"] > [flex-sm=\"95\"] {\n    max-width: 95%; }\n  [layout=\"column\"] > [flex-sm=\"95\"] {\n    max-height: 95%; }\n  [flex-sm=\"100\"] {\n    -webkit-flex: 0 0 100%;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%; }\n  [layout=\"row\"] > [flex-sm=\"100\"] {\n    max-width: 100%; }\n  [layout=\"column\"] > [flex-sm=\"100\"] {\n    max-height: 100%; }\n  [flex-sm=\"33\"], [flex-sm=\"34\"] {\n    -webkit-flex: 0 0 33.33%;\n        -ms-flex: 0 0 33.33%;\n            flex: 0 0 33.33%; }\n  [flex-sm=\"66\"], [flex-sm=\"67\"] {\n    -webkit-flex: 0 0 66.66%;\n        -ms-flex: 0 0 66.66%;\n            flex: 0 0 66.66%; }\n  [layout=\"row\"] > [flex-sm=\"33\"], [layout=\"row\"] > [flex-sm=\"34\"] {\n    max-width: 33.33%; }\n  [layout=\"row\"] > [flex-sm=\"66\"], [layout=\"row\"] > [flex-sm=\"67\"] {\n    max-width: 66.66%; }\n  [layout=\"column\"] > [flex-sm=\"33\"], [layout=\"column\"] > [flex-sm=\"34\"] {\n    max-height: 33.33%; }\n  [layout=\"column\"] > [flex-sm=\"66\"], [layout=\"column\"] > [flex-sm=\"67\"] {\n    max-height: 66.66%; } }\n\n@media (min-width: 600px) {\n  [flex-order-gt-sm=\"0\"] {\n    -webkit-order: 0;\n        -ms-flex-order: 0;\n            order: 0; }\n  [flex-order-gt-sm=\"1\"] {\n    -webkit-order: 1;\n        -ms-flex-order: 1;\n            order: 1; }\n  [flex-order-gt-sm=\"2\"] {\n    -webkit-order: 2;\n        -ms-flex-order: 2;\n            order: 2; }\n  [flex-order-gt-sm=\"3\"] {\n    -webkit-order: 3;\n        -ms-flex-order: 3;\n            order: 3; }\n  [flex-order-gt-sm=\"4\"] {\n    -webkit-order: 4;\n        -ms-flex-order: 4;\n            order: 4; }\n  [flex-order-gt-sm=\"5\"] {\n    -webkit-order: 5;\n        -ms-flex-order: 5;\n            order: 5; }\n  [flex-order-gt-sm=\"6\"] {\n    -webkit-order: 6;\n        -ms-flex-order: 6;\n            order: 6; }\n  [flex-order-gt-sm=\"7\"] {\n    -webkit-order: 7;\n        -ms-flex-order: 7;\n            order: 7; }\n  [flex-order-gt-sm=\"8\"] {\n    -webkit-order: 8;\n        -ms-flex-order: 8;\n            order: 8; }\n  [flex-order-gt-sm=\"9\"] {\n    -webkit-order: 9;\n        -ms-flex-order: 9;\n            order: 9; }\n  [layout-align-gt-sm=\"center\"], [layout-align-gt-sm=\"center center\"], [layout-align-gt-sm=\"center start\"], [layout-align-gt-sm=\"center end\"] {\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  [layout-align-gt-sm=\"end\"], [layout-align-gt-sm=\"end center\"], [layout-align-gt-sm=\"end start\"], [layout-align-gt-sm=\"end end\"] {\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n  [layout-align-gt-sm=\"space-around\"], [layout-align-gt-sm=\"space-around center\"], [layout-align-gt-sm=\"space-around start\"], [layout-align-gt-sm=\"space-around end\"] {\n    -webkit-justify-content: space-around;\n        -ms-flex-pack: distribute;\n            justify-content: space-around; }\n  [layout-align-gt-sm=\"space-between\"], [layout-align-gt-sm=\"space-between center\"], [layout-align-gt-sm=\"space-between start\"], [layout-align-gt-sm=\"space-between end\"] {\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between; }\n  [layout-align-gt-sm=\"center center\"], [layout-align-gt-sm=\"start center\"], [layout-align-gt-sm=\"end center\"], [layout-align-gt-sm=\"space-between center\"], [layout-align-gt-sm=\"space-around center\"] {\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  [layout-align-gt-sm=\"center start\"], [layout-align-gt-sm=\"start start\"], [layout-align-gt-sm=\"end start\"], [layout-align-gt-sm=\"space-between start\"], [layout-align-gt-sm=\"space-around start\"] {\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start; }\n  [layout-align-gt-sm=\"center end\"], [layout-align-gt-sm=\"start end\"], [layout-align-gt-sm=\"end end\"], [layout-align-gt-sm=\"space-between end\"], [layout-align-gt-sm=\"space-around end\"] {\n    -webkit-align-items: flex-end;\n        -ms-flex-align: end;\n            align-items: flex-end; }\n  [layout-gt-sm] {\n    box-sizing: border-box;\n    display: -webkit-flex;\n    display: -moz-flex;\n    display: -ms-flexbox;\n    display: flex; }\n  [layout-gt-sm=column] {\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n  [layout-gt-sm=row] {\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row; }\n  [offset-gt-sm=\"5\"] {\n    margin-left: 5%; }\n  [offset-gt-sm=\"10\"] {\n    margin-left: 10%; }\n  [offset-gt-sm=\"15\"] {\n    margin-left: 15%; }\n  [offset-gt-sm=\"20\"] {\n    margin-left: 20%; }\n  [offset-gt-sm=\"25\"] {\n    margin-left: 25%; }\n  [offset-gt-sm=\"30\"] {\n    margin-left: 30%; }\n  [offset-gt-sm=\"35\"] {\n    margin-left: 35%; }\n  [offset-gt-sm=\"40\"] {\n    margin-left: 40%; }\n  [offset-gt-sm=\"45\"] {\n    margin-left: 45%; }\n  [offset-gt-sm=\"50\"] {\n    margin-left: 50%; }\n  [offset-gt-sm=\"55\"] {\n    margin-left: 55%; }\n  [offset-gt-sm=\"60\"] {\n    margin-left: 60%; }\n  [offset-gt-sm=\"65\"] {\n    margin-left: 65%; }\n  [offset-gt-sm=\"70\"] {\n    margin-left: 70%; }\n  [offset-gt-sm=\"75\"] {\n    margin-left: 75%; }\n  [offset-gt-sm=\"80\"] {\n    margin-left: 80%; }\n  [offset-gt-sm=\"85\"] {\n    margin-left: 85%; }\n  [offset-gt-sm=\"90\"] {\n    margin-left: 90%; }\n  [offset-gt-sm=\"95\"] {\n    margin-left: 95%; }\n  [offset-gt-sm=\"33\"], [offset-gt-sm=\"34\"] {\n    margin-left: 33.33%; }\n  [offset-gt-sm=\"66\"], [offset-gt-sm=\"67\"] {\n    margin-left: 66.66%; }\n  [flex-gt-sm] {\n    box-sizing: border-box;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1; }\n  [flex-gt-sm=\"0\"] {\n    -webkit-flex: 0 0 0%;\n        -ms-flex: 0 0 0%;\n            flex: 0 0 0%; }\n  [layout=\"row\"] > [flex-gt-sm=\"0\"] {\n    max-width: 0%; }\n  [layout=\"column\"] > [flex-gt-sm=\"0\"] {\n    max-height: 0%; }\n  [flex-gt-sm=\"5\"] {\n    -webkit-flex: 0 0 5%;\n        -ms-flex: 0 0 5%;\n            flex: 0 0 5%; }\n  [layout=\"row\"] > [flex-gt-sm=\"5\"] {\n    max-width: 5%; }\n  [layout=\"column\"] > [flex-gt-sm=\"5\"] {\n    max-height: 5%; }\n  [flex-gt-sm=\"10\"] {\n    -webkit-flex: 0 0 10%;\n        -ms-flex: 0 0 10%;\n            flex: 0 0 10%; }\n  [layout=\"row\"] > [flex-gt-sm=\"10\"] {\n    max-width: 10%; }\n  [layout=\"column\"] > [flex-gt-sm=\"10\"] {\n    max-height: 10%; }\n  [flex-gt-sm=\"15\"] {\n    -webkit-flex: 0 0 15%;\n        -ms-flex: 0 0 15%;\n            flex: 0 0 15%; }\n  [layout=\"row\"] > [flex-gt-sm=\"15\"] {\n    max-width: 15%; }\n  [layout=\"column\"] > [flex-gt-sm=\"15\"] {\n    max-height: 15%; }\n  [flex-gt-sm=\"20\"] {\n    -webkit-flex: 0 0 20%;\n        -ms-flex: 0 0 20%;\n            flex: 0 0 20%; }\n  [layout=\"row\"] > [flex-gt-sm=\"20\"] {\n    max-width: 20%; }\n  [layout=\"column\"] > [flex-gt-sm=\"20\"] {\n    max-height: 20%; }\n  [flex-gt-sm=\"25\"] {\n    -webkit-flex: 0 0 25%;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%; }\n  [layout=\"row\"] > [flex-gt-sm=\"25\"] {\n    max-width: 25%; }\n  [layout=\"column\"] > [flex-gt-sm=\"25\"] {\n    max-height: 25%; }\n  [flex-gt-sm=\"30\"] {\n    -webkit-flex: 0 0 30%;\n        -ms-flex: 0 0 30%;\n            flex: 0 0 30%; }\n  [layout=\"row\"] > [flex-gt-sm=\"30\"] {\n    max-width: 30%; }\n  [layout=\"column\"] > [flex-gt-sm=\"30\"] {\n    max-height: 30%; }\n  [flex-gt-sm=\"35\"] {\n    -webkit-flex: 0 0 35%;\n        -ms-flex: 0 0 35%;\n            flex: 0 0 35%; }\n  [layout=\"row\"] > [flex-gt-sm=\"35\"] {\n    max-width: 35%; }\n  [layout=\"column\"] > [flex-gt-sm=\"35\"] {\n    max-height: 35%; }\n  [flex-gt-sm=\"40\"] {\n    -webkit-flex: 0 0 40%;\n        -ms-flex: 0 0 40%;\n            flex: 0 0 40%; }\n  [layout=\"row\"] > [flex-gt-sm=\"40\"] {\n    max-width: 40%; }\n  [layout=\"column\"] > [flex-gt-sm=\"40\"] {\n    max-height: 40%; }\n  [flex-gt-sm=\"45\"] {\n    -webkit-flex: 0 0 45%;\n        -ms-flex: 0 0 45%;\n            flex: 0 0 45%; }\n  [layout=\"row\"] > [flex-gt-sm=\"45\"] {\n    max-width: 45%; }\n  [layout=\"column\"] > [flex-gt-sm=\"45\"] {\n    max-height: 45%; }\n  [flex-gt-sm=\"50\"] {\n    -webkit-flex: 0 0 50%;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%; }\n  [layout=\"row\"] > [flex-gt-sm=\"50\"] {\n    max-width: 50%; }\n  [layout=\"column\"] > [flex-gt-sm=\"50\"] {\n    max-height: 50%; }\n  [flex-gt-sm=\"55\"] {\n    -webkit-flex: 0 0 55%;\n        -ms-flex: 0 0 55%;\n            flex: 0 0 55%; }\n  [layout=\"row\"] > [flex-gt-sm=\"55\"] {\n    max-width: 55%; }\n  [layout=\"column\"] > [flex-gt-sm=\"55\"] {\n    max-height: 55%; }\n  [flex-gt-sm=\"60\"] {\n    -webkit-flex: 0 0 60%;\n        -ms-flex: 0 0 60%;\n            flex: 0 0 60%; }\n  [layout=\"row\"] > [flex-gt-sm=\"60\"] {\n    max-width: 60%; }\n  [layout=\"column\"] > [flex-gt-sm=\"60\"] {\n    max-height: 60%; }\n  [flex-gt-sm=\"65\"] {\n    -webkit-flex: 0 0 65%;\n        -ms-flex: 0 0 65%;\n            flex: 0 0 65%; }\n  [layout=\"row\"] > [flex-gt-sm=\"65\"] {\n    max-width: 65%; }\n  [layout=\"column\"] > [flex-gt-sm=\"65\"] {\n    max-height: 65%; }\n  [flex-gt-sm=\"70\"] {\n    -webkit-flex: 0 0 70%;\n        -ms-flex: 0 0 70%;\n            flex: 0 0 70%; }\n  [layout=\"row\"] > [flex-gt-sm=\"70\"] {\n    max-width: 70%; }\n  [layout=\"column\"] > [flex-gt-sm=\"70\"] {\n    max-height: 70%; }\n  [flex-gt-sm=\"75\"] {\n    -webkit-flex: 0 0 75%;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%; }\n  [layout=\"row\"] > [flex-gt-sm=\"75\"] {\n    max-width: 75%; }\n  [layout=\"column\"] > [flex-gt-sm=\"75\"] {\n    max-height: 75%; }\n  [flex-gt-sm=\"80\"] {\n    -webkit-flex: 0 0 80%;\n        -ms-flex: 0 0 80%;\n            flex: 0 0 80%; }\n  [layout=\"row\"] > [flex-gt-sm=\"80\"] {\n    max-width: 80%; }\n  [layout=\"column\"] > [flex-gt-sm=\"80\"] {\n    max-height: 80%; }\n  [flex-gt-sm=\"85\"] {\n    -webkit-flex: 0 0 85%;\n        -ms-flex: 0 0 85%;\n            flex: 0 0 85%; }\n  [layout=\"row\"] > [flex-gt-sm=\"85\"] {\n    max-width: 85%; }\n  [layout=\"column\"] > [flex-gt-sm=\"85\"] {\n    max-height: 85%; }\n  [flex-gt-sm=\"90\"] {\n    -webkit-flex: 0 0 90%;\n        -ms-flex: 0 0 90%;\n            flex: 0 0 90%; }\n  [layout=\"row\"] > [flex-gt-sm=\"90\"] {\n    max-width: 90%; }\n  [layout=\"column\"] > [flex-gt-sm=\"90\"] {\n    max-height: 90%; }\n  [flex-gt-sm=\"95\"] {\n    -webkit-flex: 0 0 95%;\n        -ms-flex: 0 0 95%;\n            flex: 0 0 95%; }\n  [layout=\"row\"] > [flex-gt-sm=\"95\"] {\n    max-width: 95%; }\n  [layout=\"column\"] > [flex-gt-sm=\"95\"] {\n    max-height: 95%; }\n  [flex-gt-sm=\"100\"] {\n    -webkit-flex: 0 0 100%;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%; }\n  [layout=\"row\"] > [flex-gt-sm=\"100\"] {\n    max-width: 100%; }\n  [layout=\"column\"] > [flex-gt-sm=\"100\"] {\n    max-height: 100%; }\n  [flex-gt-sm=\"33\"], [flex-gt-sm=\"34\"] {\n    -webkit-flex: 0 0 33.33%;\n        -ms-flex: 0 0 33.33%;\n            flex: 0 0 33.33%; }\n  [flex-gt-sm=\"66\"], [flex-gt-sm=\"67\"] {\n    -webkit-flex: 0 0 66.66%;\n        -ms-flex: 0 0 66.66%;\n            flex: 0 0 66.66%; }\n  [layout=\"row\"] > [flex-gt-sm=\"33\"], [layout=\"row\"] > [flex-gt-sm=\"34\"] {\n    max-width: 33.33%; }\n  [layout=\"row\"] > [flex-gt-sm=\"66\"], [layout=\"row\"] > [flex-gt-sm=\"67\"] {\n    max-width: 66.66%; }\n  [layout=\"column\"] > [flex-gt-sm=\"33\"], [layout=\"column\"] > [flex-gt-sm=\"34\"] {\n    max-height: 33.33%; }\n  [layout=\"column\"] > [flex-gt-sm=\"66\"], [layout=\"column\"] > [flex-gt-sm=\"67\"] {\n    max-height: 66.66%; } }\n\n@media (min-width: 600px) and (max-width: 959px) {\n  [hide]:not([show-gt-sm]):not([show-md]):not([show]), [hide-gt-sm]:not([show-gt-sm]):not([show-md]):not([show]) {\n    display: none; }\n  [hide-md]:not([show-md]):not([show]) {\n    display: none; }\n  [flex-order-md=\"0\"] {\n    -webkit-order: 0;\n        -ms-flex-order: 0;\n            order: 0; }\n  [flex-order-md=\"1\"] {\n    -webkit-order: 1;\n        -ms-flex-order: 1;\n            order: 1; }\n  [flex-order-md=\"2\"] {\n    -webkit-order: 2;\n        -ms-flex-order: 2;\n            order: 2; }\n  [flex-order-md=\"3\"] {\n    -webkit-order: 3;\n        -ms-flex-order: 3;\n            order: 3; }\n  [flex-order-md=\"4\"] {\n    -webkit-order: 4;\n        -ms-flex-order: 4;\n            order: 4; }\n  [flex-order-md=\"5\"] {\n    -webkit-order: 5;\n        -ms-flex-order: 5;\n            order: 5; }\n  [flex-order-md=\"6\"] {\n    -webkit-order: 6;\n        -ms-flex-order: 6;\n            order: 6; }\n  [flex-order-md=\"7\"] {\n    -webkit-order: 7;\n        -ms-flex-order: 7;\n            order: 7; }\n  [flex-order-md=\"8\"] {\n    -webkit-order: 8;\n        -ms-flex-order: 8;\n            order: 8; }\n  [flex-order-md=\"9\"] {\n    -webkit-order: 9;\n        -ms-flex-order: 9;\n            order: 9; }\n  [layout-align-md=\"center\"], [layout-align-md=\"center center\"], [layout-align-md=\"center start\"], [layout-align-md=\"center end\"] {\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  [layout-align-md=\"end\"], [layout-align-md=\"end center\"], [layout-align-md=\"end start\"], [layout-align-md=\"end end\"] {\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n  [layout-align-md=\"space-around\"], [layout-align-md=\"space-around center\"], [layout-align-md=\"space-around start\"], [layout-align-md=\"space-around end\"] {\n    -webkit-justify-content: space-around;\n        -ms-flex-pack: distribute;\n            justify-content: space-around; }\n  [layout-align-md=\"space-between\"], [layout-align-md=\"space-between center\"], [layout-align-md=\"space-between start\"], [layout-align-md=\"space-between end\"] {\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between; }\n  [layout-align-md=\"center center\"], [layout-align-md=\"start center\"], [layout-align-md=\"end center\"], [layout-align-md=\"space-between center\"], [layout-align-md=\"space-around center\"] {\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  [layout-align-md=\"center start\"], [layout-align-md=\"start start\"], [layout-align-md=\"end start\"], [layout-align-md=\"space-between start\"], [layout-align-md=\"space-around start\"] {\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start; }\n  [layout-align-md=\"center end\"], [layout-align-md=\"start end\"], [layout-align-md=\"end end\"], [layout-align-md=\"space-between end\"], [layout-align-md=\"space-around end\"] {\n    -webkit-align-items: flex-end;\n        -ms-flex-align: end;\n            align-items: flex-end; }\n  [layout-md] {\n    box-sizing: border-box;\n    display: -webkit-flex;\n    display: -moz-flex;\n    display: -ms-flexbox;\n    display: flex; }\n  [layout-md=column] {\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n  [layout-md=row] {\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row; }\n  [offset-md=\"5\"] {\n    margin-left: 5%; }\n  [offset-md=\"10\"] {\n    margin-left: 10%; }\n  [offset-md=\"15\"] {\n    margin-left: 15%; }\n  [offset-md=\"20\"] {\n    margin-left: 20%; }\n  [offset-md=\"25\"] {\n    margin-left: 25%; }\n  [offset-md=\"30\"] {\n    margin-left: 30%; }\n  [offset-md=\"35\"] {\n    margin-left: 35%; }\n  [offset-md=\"40\"] {\n    margin-left: 40%; }\n  [offset-md=\"45\"] {\n    margin-left: 45%; }\n  [offset-md=\"50\"] {\n    margin-left: 50%; }\n  [offset-md=\"55\"] {\n    margin-left: 55%; }\n  [offset-md=\"60\"] {\n    margin-left: 60%; }\n  [offset-md=\"65\"] {\n    margin-left: 65%; }\n  [offset-md=\"70\"] {\n    margin-left: 70%; }\n  [offset-md=\"75\"] {\n    margin-left: 75%; }\n  [offset-md=\"80\"] {\n    margin-left: 80%; }\n  [offset-md=\"85\"] {\n    margin-left: 85%; }\n  [offset-md=\"90\"] {\n    margin-left: 90%; }\n  [offset-md=\"95\"] {\n    margin-left: 95%; }\n  [offset-md=\"33\"], [offset-md=\"34\"] {\n    margin-left: 33.33%; }\n  [offset-md=\"66\"], [offset-md=\"67\"] {\n    margin-left: 66.66%; }\n  [flex-md] {\n    box-sizing: border-box;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1; }\n  [flex-md=\"0\"] {\n    -webkit-flex: 0 0 0%;\n        -ms-flex: 0 0 0%;\n            flex: 0 0 0%; }\n  [layout=\"row\"] > [flex-md=\"0\"] {\n    max-width: 0%; }\n  [layout=\"column\"] > [flex-md=\"0\"] {\n    max-height: 0%; }\n  [flex-md=\"5\"] {\n    -webkit-flex: 0 0 5%;\n        -ms-flex: 0 0 5%;\n            flex: 0 0 5%; }\n  [layout=\"row\"] > [flex-md=\"5\"] {\n    max-width: 5%; }\n  [layout=\"column\"] > [flex-md=\"5\"] {\n    max-height: 5%; }\n  [flex-md=\"10\"] {\n    -webkit-flex: 0 0 10%;\n        -ms-flex: 0 0 10%;\n            flex: 0 0 10%; }\n  [layout=\"row\"] > [flex-md=\"10\"] {\n    max-width: 10%; }\n  [layout=\"column\"] > [flex-md=\"10\"] {\n    max-height: 10%; }\n  [flex-md=\"15\"] {\n    -webkit-flex: 0 0 15%;\n        -ms-flex: 0 0 15%;\n            flex: 0 0 15%; }\n  [layout=\"row\"] > [flex-md=\"15\"] {\n    max-width: 15%; }\n  [layout=\"column\"] > [flex-md=\"15\"] {\n    max-height: 15%; }\n  [flex-md=\"20\"] {\n    -webkit-flex: 0 0 20%;\n        -ms-flex: 0 0 20%;\n            flex: 0 0 20%; }\n  [layout=\"row\"] > [flex-md=\"20\"] {\n    max-width: 20%; }\n  [layout=\"column\"] > [flex-md=\"20\"] {\n    max-height: 20%; }\n  [flex-md=\"25\"] {\n    -webkit-flex: 0 0 25%;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%; }\n  [layout=\"row\"] > [flex-md=\"25\"] {\n    max-width: 25%; }\n  [layout=\"column\"] > [flex-md=\"25\"] {\n    max-height: 25%; }\n  [flex-md=\"30\"] {\n    -webkit-flex: 0 0 30%;\n        -ms-flex: 0 0 30%;\n            flex: 0 0 30%; }\n  [layout=\"row\"] > [flex-md=\"30\"] {\n    max-width: 30%; }\n  [layout=\"column\"] > [flex-md=\"30\"] {\n    max-height: 30%; }\n  [flex-md=\"35\"] {\n    -webkit-flex: 0 0 35%;\n        -ms-flex: 0 0 35%;\n            flex: 0 0 35%; }\n  [layout=\"row\"] > [flex-md=\"35\"] {\n    max-width: 35%; }\n  [layout=\"column\"] > [flex-md=\"35\"] {\n    max-height: 35%; }\n  [flex-md=\"40\"] {\n    -webkit-flex: 0 0 40%;\n        -ms-flex: 0 0 40%;\n            flex: 0 0 40%; }\n  [layout=\"row\"] > [flex-md=\"40\"] {\n    max-width: 40%; }\n  [layout=\"column\"] > [flex-md=\"40\"] {\n    max-height: 40%; }\n  [flex-md=\"45\"] {\n    -webkit-flex: 0 0 45%;\n        -ms-flex: 0 0 45%;\n            flex: 0 0 45%; }\n  [layout=\"row\"] > [flex-md=\"45\"] {\n    max-width: 45%; }\n  [layout=\"column\"] > [flex-md=\"45\"] {\n    max-height: 45%; }\n  [flex-md=\"50\"] {\n    -webkit-flex: 0 0 50%;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%; }\n  [layout=\"row\"] > [flex-md=\"50\"] {\n    max-width: 50%; }\n  [layout=\"column\"] > [flex-md=\"50\"] {\n    max-height: 50%; }\n  [flex-md=\"55\"] {\n    -webkit-flex: 0 0 55%;\n        -ms-flex: 0 0 55%;\n            flex: 0 0 55%; }\n  [layout=\"row\"] > [flex-md=\"55\"] {\n    max-width: 55%; }\n  [layout=\"column\"] > [flex-md=\"55\"] {\n    max-height: 55%; }\n  [flex-md=\"60\"] {\n    -webkit-flex: 0 0 60%;\n        -ms-flex: 0 0 60%;\n            flex: 0 0 60%; }\n  [layout=\"row\"] > [flex-md=\"60\"] {\n    max-width: 60%; }\n  [layout=\"column\"] > [flex-md=\"60\"] {\n    max-height: 60%; }\n  [flex-md=\"65\"] {\n    -webkit-flex: 0 0 65%;\n        -ms-flex: 0 0 65%;\n            flex: 0 0 65%; }\n  [layout=\"row\"] > [flex-md=\"65\"] {\n    max-width: 65%; }\n  [layout=\"column\"] > [flex-md=\"65\"] {\n    max-height: 65%; }\n  [flex-md=\"70\"] {\n    -webkit-flex: 0 0 70%;\n        -ms-flex: 0 0 70%;\n            flex: 0 0 70%; }\n  [layout=\"row\"] > [flex-md=\"70\"] {\n    max-width: 70%; }\n  [layout=\"column\"] > [flex-md=\"70\"] {\n    max-height: 70%; }\n  [flex-md=\"75\"] {\n    -webkit-flex: 0 0 75%;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%; }\n  [layout=\"row\"] > [flex-md=\"75\"] {\n    max-width: 75%; }\n  [layout=\"column\"] > [flex-md=\"75\"] {\n    max-height: 75%; }\n  [flex-md=\"80\"] {\n    -webkit-flex: 0 0 80%;\n        -ms-flex: 0 0 80%;\n            flex: 0 0 80%; }\n  [layout=\"row\"] > [flex-md=\"80\"] {\n    max-width: 80%; }\n  [layout=\"column\"] > [flex-md=\"80\"] {\n    max-height: 80%; }\n  [flex-md=\"85\"] {\n    -webkit-flex: 0 0 85%;\n        -ms-flex: 0 0 85%;\n            flex: 0 0 85%; }\n  [layout=\"row\"] > [flex-md=\"85\"] {\n    max-width: 85%; }\n  [layout=\"column\"] > [flex-md=\"85\"] {\n    max-height: 85%; }\n  [flex-md=\"90\"] {\n    -webkit-flex: 0 0 90%;\n        -ms-flex: 0 0 90%;\n            flex: 0 0 90%; }\n  [layout=\"row\"] > [flex-md=\"90\"] {\n    max-width: 90%; }\n  [layout=\"column\"] > [flex-md=\"90\"] {\n    max-height: 90%; }\n  [flex-md=\"95\"] {\n    -webkit-flex: 0 0 95%;\n        -ms-flex: 0 0 95%;\n            flex: 0 0 95%; }\n  [layout=\"row\"] > [flex-md=\"95\"] {\n    max-width: 95%; }\n  [layout=\"column\"] > [flex-md=\"95\"] {\n    max-height: 95%; }\n  [flex-md=\"100\"] {\n    -webkit-flex: 0 0 100%;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%; }\n  [layout=\"row\"] > [flex-md=\"100\"] {\n    max-width: 100%; }\n  [layout=\"column\"] > [flex-md=\"100\"] {\n    max-height: 100%; }\n  [flex-md=\"33\"], [flex-md=\"34\"] {\n    -webkit-flex: 0 0 33.33%;\n        -ms-flex: 0 0 33.33%;\n            flex: 0 0 33.33%; }\n  [flex-md=\"66\"], [flex-md=\"67\"] {\n    -webkit-flex: 0 0 66.66%;\n        -ms-flex: 0 0 66.66%;\n            flex: 0 0 66.66%; }\n  [layout=\"row\"] > [flex-md=\"33\"], [layout=\"row\"] > [flex-md=\"34\"] {\n    max-width: 33.33%; }\n  [layout=\"row\"] > [flex-md=\"66\"], [layout=\"row\"] > [flex-md=\"67\"] {\n    max-width: 66.66%; }\n  [layout=\"column\"] > [flex-md=\"33\"], [layout=\"column\"] > [flex-md=\"34\"] {\n    max-height: 33.33%; }\n  [layout=\"column\"] > [flex-md=\"66\"], [layout=\"column\"] > [flex-md=\"67\"] {\n    max-height: 66.66%; } }\n\n@media (min-width: 960px) {\n  [flex-order-gt-md=\"0\"] {\n    -webkit-order: 0;\n        -ms-flex-order: 0;\n            order: 0; }\n  [flex-order-gt-md=\"1\"] {\n    -webkit-order: 1;\n        -ms-flex-order: 1;\n            order: 1; }\n  [flex-order-gt-md=\"2\"] {\n    -webkit-order: 2;\n        -ms-flex-order: 2;\n            order: 2; }\n  [flex-order-gt-md=\"3\"] {\n    -webkit-order: 3;\n        -ms-flex-order: 3;\n            order: 3; }\n  [flex-order-gt-md=\"4\"] {\n    -webkit-order: 4;\n        -ms-flex-order: 4;\n            order: 4; }\n  [flex-order-gt-md=\"5\"] {\n    -webkit-order: 5;\n        -ms-flex-order: 5;\n            order: 5; }\n  [flex-order-gt-md=\"6\"] {\n    -webkit-order: 6;\n        -ms-flex-order: 6;\n            order: 6; }\n  [flex-order-gt-md=\"7\"] {\n    -webkit-order: 7;\n        -ms-flex-order: 7;\n            order: 7; }\n  [flex-order-gt-md=\"8\"] {\n    -webkit-order: 8;\n        -ms-flex-order: 8;\n            order: 8; }\n  [flex-order-gt-md=\"9\"] {\n    -webkit-order: 9;\n        -ms-flex-order: 9;\n            order: 9; }\n  [layout-align-gt-md=\"center\"], [layout-align-gt-md=\"center center\"], [layout-align-gt-md=\"center start\"], [layout-align-gt-md=\"center end\"] {\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  [layout-align-gt-md=\"end\"], [layout-align-gt-md=\"end center\"], [layout-align-gt-md=\"end start\"], [layout-align-gt-md=\"end end\"] {\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n  [layout-align-gt-md=\"space-around\"], [layout-align-gt-md=\"space-around center\"], [layout-align-gt-md=\"space-around start\"], [layout-align-gt-md=\"space-around end\"] {\n    -webkit-justify-content: space-around;\n        -ms-flex-pack: distribute;\n            justify-content: space-around; }\n  [layout-align-gt-md=\"space-between\"], [layout-align-gt-md=\"space-between center\"], [layout-align-gt-md=\"space-between start\"], [layout-align-gt-md=\"space-between end\"] {\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between; }\n  [layout-align-gt-md=\"center center\"], [layout-align-gt-md=\"start center\"], [layout-align-gt-md=\"end center\"], [layout-align-gt-md=\"space-between center\"], [layout-align-gt-md=\"space-around center\"] {\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  [layout-align-gt-md=\"center start\"], [layout-align-gt-md=\"start start\"], [layout-align-gt-md=\"end start\"], [layout-align-gt-md=\"space-between start\"], [layout-align-gt-md=\"space-around start\"] {\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start; }\n  [layout-align-gt-md=\"center end\"], [layout-align-gt-md=\"start end\"], [layout-align-gt-md=\"end end\"], [layout-align-gt-md=\"space-between end\"], [layout-align-gt-md=\"space-around end\"] {\n    -webkit-align-items: flex-end;\n        -ms-flex-align: end;\n            align-items: flex-end; }\n  [layout-gt-md] {\n    box-sizing: border-box;\n    display: -webkit-flex;\n    display: -moz-flex;\n    display: -ms-flexbox;\n    display: flex; }\n  [layout-gt-md=column] {\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n  [layout-gt-md=row] {\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row; }\n  [offset-gt-md=\"5\"] {\n    margin-left: 5%; }\n  [offset-gt-md=\"10\"] {\n    margin-left: 10%; }\n  [offset-gt-md=\"15\"] {\n    margin-left: 15%; }\n  [offset-gt-md=\"20\"] {\n    margin-left: 20%; }\n  [offset-gt-md=\"25\"] {\n    margin-left: 25%; }\n  [offset-gt-md=\"30\"] {\n    margin-left: 30%; }\n  [offset-gt-md=\"35\"] {\n    margin-left: 35%; }\n  [offset-gt-md=\"40\"] {\n    margin-left: 40%; }\n  [offset-gt-md=\"45\"] {\n    margin-left: 45%; }\n  [offset-gt-md=\"50\"] {\n    margin-left: 50%; }\n  [offset-gt-md=\"55\"] {\n    margin-left: 55%; }\n  [offset-gt-md=\"60\"] {\n    margin-left: 60%; }\n  [offset-gt-md=\"65\"] {\n    margin-left: 65%; }\n  [offset-gt-md=\"70\"] {\n    margin-left: 70%; }\n  [offset-gt-md=\"75\"] {\n    margin-left: 75%; }\n  [offset-gt-md=\"80\"] {\n    margin-left: 80%; }\n  [offset-gt-md=\"85\"] {\n    margin-left: 85%; }\n  [offset-gt-md=\"90\"] {\n    margin-left: 90%; }\n  [offset-gt-md=\"95\"] {\n    margin-left: 95%; }\n  [offset-gt-md=\"33\"], [offset-gt-md=\"34\"] {\n    margin-left: 33.33%; }\n  [offset-gt-md=\"66\"], [offset-gt-md=\"67\"] {\n    margin-left: 66.66%; }\n  [flex-gt-md] {\n    box-sizing: border-box;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1; }\n  [flex-gt-md=\"0\"] {\n    -webkit-flex: 0 0 0%;\n        -ms-flex: 0 0 0%;\n            flex: 0 0 0%; }\n  [layout=\"row\"] > [flex-gt-md=\"0\"] {\n    max-width: 0%; }\n  [layout=\"column\"] > [flex-gt-md=\"0\"] {\n    max-height: 0%; }\n  [flex-gt-md=\"5\"] {\n    -webkit-flex: 0 0 5%;\n        -ms-flex: 0 0 5%;\n            flex: 0 0 5%; }\n  [layout=\"row\"] > [flex-gt-md=\"5\"] {\n    max-width: 5%; }\n  [layout=\"column\"] > [flex-gt-md=\"5\"] {\n    max-height: 5%; }\n  [flex-gt-md=\"10\"] {\n    -webkit-flex: 0 0 10%;\n        -ms-flex: 0 0 10%;\n            flex: 0 0 10%; }\n  [layout=\"row\"] > [flex-gt-md=\"10\"] {\n    max-width: 10%; }\n  [layout=\"column\"] > [flex-gt-md=\"10\"] {\n    max-height: 10%; }\n  [flex-gt-md=\"15\"] {\n    -webkit-flex: 0 0 15%;\n        -ms-flex: 0 0 15%;\n            flex: 0 0 15%; }\n  [layout=\"row\"] > [flex-gt-md=\"15\"] {\n    max-width: 15%; }\n  [layout=\"column\"] > [flex-gt-md=\"15\"] {\n    max-height: 15%; }\n  [flex-gt-md=\"20\"] {\n    -webkit-flex: 0 0 20%;\n        -ms-flex: 0 0 20%;\n            flex: 0 0 20%; }\n  [layout=\"row\"] > [flex-gt-md=\"20\"] {\n    max-width: 20%; }\n  [layout=\"column\"] > [flex-gt-md=\"20\"] {\n    max-height: 20%; }\n  [flex-gt-md=\"25\"] {\n    -webkit-flex: 0 0 25%;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%; }\n  [layout=\"row\"] > [flex-gt-md=\"25\"] {\n    max-width: 25%; }\n  [layout=\"column\"] > [flex-gt-md=\"25\"] {\n    max-height: 25%; }\n  [flex-gt-md=\"30\"] {\n    -webkit-flex: 0 0 30%;\n        -ms-flex: 0 0 30%;\n            flex: 0 0 30%; }\n  [layout=\"row\"] > [flex-gt-md=\"30\"] {\n    max-width: 30%; }\n  [layout=\"column\"] > [flex-gt-md=\"30\"] {\n    max-height: 30%; }\n  [flex-gt-md=\"35\"] {\n    -webkit-flex: 0 0 35%;\n        -ms-flex: 0 0 35%;\n            flex: 0 0 35%; }\n  [layout=\"row\"] > [flex-gt-md=\"35\"] {\n    max-width: 35%; }\n  [layout=\"column\"] > [flex-gt-md=\"35\"] {\n    max-height: 35%; }\n  [flex-gt-md=\"40\"] {\n    -webkit-flex: 0 0 40%;\n        -ms-flex: 0 0 40%;\n            flex: 0 0 40%; }\n  [layout=\"row\"] > [flex-gt-md=\"40\"] {\n    max-width: 40%; }\n  [layout=\"column\"] > [flex-gt-md=\"40\"] {\n    max-height: 40%; }\n  [flex-gt-md=\"45\"] {\n    -webkit-flex: 0 0 45%;\n        -ms-flex: 0 0 45%;\n            flex: 0 0 45%; }\n  [layout=\"row\"] > [flex-gt-md=\"45\"] {\n    max-width: 45%; }\n  [layout=\"column\"] > [flex-gt-md=\"45\"] {\n    max-height: 45%; }\n  [flex-gt-md=\"50\"] {\n    -webkit-flex: 0 0 50%;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%; }\n  [layout=\"row\"] > [flex-gt-md=\"50\"] {\n    max-width: 50%; }\n  [layout=\"column\"] > [flex-gt-md=\"50\"] {\n    max-height: 50%; }\n  [flex-gt-md=\"55\"] {\n    -webkit-flex: 0 0 55%;\n        -ms-flex: 0 0 55%;\n            flex: 0 0 55%; }\n  [layout=\"row\"] > [flex-gt-md=\"55\"] {\n    max-width: 55%; }\n  [layout=\"column\"] > [flex-gt-md=\"55\"] {\n    max-height: 55%; }\n  [flex-gt-md=\"60\"] {\n    -webkit-flex: 0 0 60%;\n        -ms-flex: 0 0 60%;\n            flex: 0 0 60%; }\n  [layout=\"row\"] > [flex-gt-md=\"60\"] {\n    max-width: 60%; }\n  [layout=\"column\"] > [flex-gt-md=\"60\"] {\n    max-height: 60%; }\n  [flex-gt-md=\"65\"] {\n    -webkit-flex: 0 0 65%;\n        -ms-flex: 0 0 65%;\n            flex: 0 0 65%; }\n  [layout=\"row\"] > [flex-gt-md=\"65\"] {\n    max-width: 65%; }\n  [layout=\"column\"] > [flex-gt-md=\"65\"] {\n    max-height: 65%; }\n  [flex-gt-md=\"70\"] {\n    -webkit-flex: 0 0 70%;\n        -ms-flex: 0 0 70%;\n            flex: 0 0 70%; }\n  [layout=\"row\"] > [flex-gt-md=\"70\"] {\n    max-width: 70%; }\n  [layout=\"column\"] > [flex-gt-md=\"70\"] {\n    max-height: 70%; }\n  [flex-gt-md=\"75\"] {\n    -webkit-flex: 0 0 75%;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%; }\n  [layout=\"row\"] > [flex-gt-md=\"75\"] {\n    max-width: 75%; }\n  [layout=\"column\"] > [flex-gt-md=\"75\"] {\n    max-height: 75%; }\n  [flex-gt-md=\"80\"] {\n    -webkit-flex: 0 0 80%;\n        -ms-flex: 0 0 80%;\n            flex: 0 0 80%; }\n  [layout=\"row\"] > [flex-gt-md=\"80\"] {\n    max-width: 80%; }\n  [layout=\"column\"] > [flex-gt-md=\"80\"] {\n    max-height: 80%; }\n  [flex-gt-md=\"85\"] {\n    -webkit-flex: 0 0 85%;\n        -ms-flex: 0 0 85%;\n            flex: 0 0 85%; }\n  [layout=\"row\"] > [flex-gt-md=\"85\"] {\n    max-width: 85%; }\n  [layout=\"column\"] > [flex-gt-md=\"85\"] {\n    max-height: 85%; }\n  [flex-gt-md=\"90\"] {\n    -webkit-flex: 0 0 90%;\n        -ms-flex: 0 0 90%;\n            flex: 0 0 90%; }\n  [layout=\"row\"] > [flex-gt-md=\"90\"] {\n    max-width: 90%; }\n  [layout=\"column\"] > [flex-gt-md=\"90\"] {\n    max-height: 90%; }\n  [flex-gt-md=\"95\"] {\n    -webkit-flex: 0 0 95%;\n        -ms-flex: 0 0 95%;\n            flex: 0 0 95%; }\n  [layout=\"row\"] > [flex-gt-md=\"95\"] {\n    max-width: 95%; }\n  [layout=\"column\"] > [flex-gt-md=\"95\"] {\n    max-height: 95%; }\n  [flex-gt-md=\"100\"] {\n    -webkit-flex: 0 0 100%;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%; }\n  [layout=\"row\"] > [flex-gt-md=\"100\"] {\n    max-width: 100%; }\n  [layout=\"column\"] > [flex-gt-md=\"100\"] {\n    max-height: 100%; }\n  [flex-gt-md=\"33\"], [flex-gt-md=\"34\"] {\n    -webkit-flex: 0 0 33.33%;\n        -ms-flex: 0 0 33.33%;\n            flex: 0 0 33.33%; }\n  [flex-gt-md=\"66\"], [flex-gt-md=\"67\"] {\n    -webkit-flex: 0 0 66.66%;\n        -ms-flex: 0 0 66.66%;\n            flex: 0 0 66.66%; }\n  [layout=\"row\"] > [flex-gt-md=\"33\"], [layout=\"row\"] > [flex-gt-md=\"34\"] {\n    max-width: 33.33%; }\n  [layout=\"row\"] > [flex-gt-md=\"66\"], [layout=\"row\"] > [flex-gt-md=\"67\"] {\n    max-width: 66.66%; }\n  [layout=\"column\"] > [flex-gt-md=\"33\"], [layout=\"column\"] > [flex-gt-md=\"34\"] {\n    max-height: 33.33%; }\n  [layout=\"column\"] > [flex-gt-md=\"66\"], [layout=\"column\"] > [flex-gt-md=\"67\"] {\n    max-height: 66.66%; } }\n\n@media (min-width: 960px) and (max-width: 1199px) {\n  [hide]:not([show-gt-sm]):not([show-gt-md]):not([show-lg]):not([show]), [hide-gt-sm]:not([show-gt-sm]):not([show-gt-md]):not([show-lg]):not([show]), [hide-gt-md]:not([show-gt-sm]):not([show-gt-md]):not([show-lg]):not([show]) {\n    display: none; }\n  [hide-lg]:not([show-lg]):not([show]) {\n    display: none; }\n  [flex-order-lg=\"0\"] {\n    -webkit-order: 0;\n        -ms-flex-order: 0;\n            order: 0; }\n  [flex-order-lg=\"1\"] {\n    -webkit-order: 1;\n        -ms-flex-order: 1;\n            order: 1; }\n  [flex-order-lg=\"2\"] {\n    -webkit-order: 2;\n        -ms-flex-order: 2;\n            order: 2; }\n  [flex-order-lg=\"3\"] {\n    -webkit-order: 3;\n        -ms-flex-order: 3;\n            order: 3; }\n  [flex-order-lg=\"4\"] {\n    -webkit-order: 4;\n        -ms-flex-order: 4;\n            order: 4; }\n  [flex-order-lg=\"5\"] {\n    -webkit-order: 5;\n        -ms-flex-order: 5;\n            order: 5; }\n  [flex-order-lg=\"6\"] {\n    -webkit-order: 6;\n        -ms-flex-order: 6;\n            order: 6; }\n  [flex-order-lg=\"7\"] {\n    -webkit-order: 7;\n        -ms-flex-order: 7;\n            order: 7; }\n  [flex-order-lg=\"8\"] {\n    -webkit-order: 8;\n        -ms-flex-order: 8;\n            order: 8; }\n  [flex-order-lg=\"9\"] {\n    -webkit-order: 9;\n        -ms-flex-order: 9;\n            order: 9; }\n  [layout-align-lg=\"center\"], [layout-align-lg=\"center center\"], [layout-align-lg=\"center start\"], [layout-align-lg=\"center end\"] {\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  [layout-align-lg=\"end\"], [layout-align-lg=\"end center\"], [layout-align-lg=\"end start\"], [layout-align-lg=\"end end\"] {\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n  [layout-align-lg=\"space-around\"], [layout-align-lg=\"space-around center\"], [layout-align-lg=\"space-around start\"], [layout-align-lg=\"space-around end\"] {\n    -webkit-justify-content: space-around;\n        -ms-flex-pack: distribute;\n            justify-content: space-around; }\n  [layout-align-lg=\"space-between\"], [layout-align-lg=\"space-between center\"], [layout-align-lg=\"space-between start\"], [layout-align-lg=\"space-between end\"] {\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between; }\n  [layout-align-lg=\"center center\"], [layout-align-lg=\"start center\"], [layout-align-lg=\"end center\"], [layout-align-lg=\"space-between center\"], [layout-align-lg=\"space-around center\"] {\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  [layout-align-lg=\"center start\"], [layout-align-lg=\"start start\"], [layout-align-lg=\"end start\"], [layout-align-lg=\"space-between start\"], [layout-align-lg=\"space-around start\"] {\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start; }\n  [layout-align-lg=\"center end\"], [layout-align-lg=\"start end\"], [layout-align-lg=\"end end\"], [layout-align-lg=\"space-between end\"], [layout-align-lg=\"space-around end\"] {\n    -webkit-align-items: flex-end;\n        -ms-flex-align: end;\n            align-items: flex-end; }\n  [layout-lg] {\n    box-sizing: border-box;\n    display: -webkit-flex;\n    display: -moz-flex;\n    display: -ms-flexbox;\n    display: flex; }\n  [layout-lg=column] {\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n  [layout-lg=row] {\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row; }\n  [offset-lg=\"5\"] {\n    margin-left: 5%; }\n  [offset-lg=\"10\"] {\n    margin-left: 10%; }\n  [offset-lg=\"15\"] {\n    margin-left: 15%; }\n  [offset-lg=\"20\"] {\n    margin-left: 20%; }\n  [offset-lg=\"25\"] {\n    margin-left: 25%; }\n  [offset-lg=\"30\"] {\n    margin-left: 30%; }\n  [offset-lg=\"35\"] {\n    margin-left: 35%; }\n  [offset-lg=\"40\"] {\n    margin-left: 40%; }\n  [offset-lg=\"45\"] {\n    margin-left: 45%; }\n  [offset-lg=\"50\"] {\n    margin-left: 50%; }\n  [offset-lg=\"55\"] {\n    margin-left: 55%; }\n  [offset-lg=\"60\"] {\n    margin-left: 60%; }\n  [offset-lg=\"65\"] {\n    margin-left: 65%; }\n  [offset-lg=\"70\"] {\n    margin-left: 70%; }\n  [offset-lg=\"75\"] {\n    margin-left: 75%; }\n  [offset-lg=\"80\"] {\n    margin-left: 80%; }\n  [offset-lg=\"85\"] {\n    margin-left: 85%; }\n  [offset-lg=\"90\"] {\n    margin-left: 90%; }\n  [offset-lg=\"95\"] {\n    margin-left: 95%; }\n  [offset-lg=\"33\"], [offset-lg=\"34\"] {\n    margin-left: 33.33%; }\n  [offset-lg=\"66\"], [offset-lg=\"67\"] {\n    margin-left: 66.66%; }\n  [flex-lg] {\n    box-sizing: border-box;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1; }\n  [flex-lg=\"0\"] {\n    -webkit-flex: 0 0 0%;\n        -ms-flex: 0 0 0%;\n            flex: 0 0 0%; }\n  [layout=\"row\"] > [flex-lg=\"0\"] {\n    max-width: 0%; }\n  [layout=\"column\"] > [flex-lg=\"0\"] {\n    max-height: 0%; }\n  [flex-lg=\"5\"] {\n    -webkit-flex: 0 0 5%;\n        -ms-flex: 0 0 5%;\n            flex: 0 0 5%; }\n  [layout=\"row\"] > [flex-lg=\"5\"] {\n    max-width: 5%; }\n  [layout=\"column\"] > [flex-lg=\"5\"] {\n    max-height: 5%; }\n  [flex-lg=\"10\"] {\n    -webkit-flex: 0 0 10%;\n        -ms-flex: 0 0 10%;\n            flex: 0 0 10%; }\n  [layout=\"row\"] > [flex-lg=\"10\"] {\n    max-width: 10%; }\n  [layout=\"column\"] > [flex-lg=\"10\"] {\n    max-height: 10%; }\n  [flex-lg=\"15\"] {\n    -webkit-flex: 0 0 15%;\n        -ms-flex: 0 0 15%;\n            flex: 0 0 15%; }\n  [layout=\"row\"] > [flex-lg=\"15\"] {\n    max-width: 15%; }\n  [layout=\"column\"] > [flex-lg=\"15\"] {\n    max-height: 15%; }\n  [flex-lg=\"20\"] {\n    -webkit-flex: 0 0 20%;\n        -ms-flex: 0 0 20%;\n            flex: 0 0 20%; }\n  [layout=\"row\"] > [flex-lg=\"20\"] {\n    max-width: 20%; }\n  [layout=\"column\"] > [flex-lg=\"20\"] {\n    max-height: 20%; }\n  [flex-lg=\"25\"] {\n    -webkit-flex: 0 0 25%;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%; }\n  [layout=\"row\"] > [flex-lg=\"25\"] {\n    max-width: 25%; }\n  [layout=\"column\"] > [flex-lg=\"25\"] {\n    max-height: 25%; }\n  [flex-lg=\"30\"] {\n    -webkit-flex: 0 0 30%;\n        -ms-flex: 0 0 30%;\n            flex: 0 0 30%; }\n  [layout=\"row\"] > [flex-lg=\"30\"] {\n    max-width: 30%; }\n  [layout=\"column\"] > [flex-lg=\"30\"] {\n    max-height: 30%; }\n  [flex-lg=\"35\"] {\n    -webkit-flex: 0 0 35%;\n        -ms-flex: 0 0 35%;\n            flex: 0 0 35%; }\n  [layout=\"row\"] > [flex-lg=\"35\"] {\n    max-width: 35%; }\n  [layout=\"column\"] > [flex-lg=\"35\"] {\n    max-height: 35%; }\n  [flex-lg=\"40\"] {\n    -webkit-flex: 0 0 40%;\n        -ms-flex: 0 0 40%;\n            flex: 0 0 40%; }\n  [layout=\"row\"] > [flex-lg=\"40\"] {\n    max-width: 40%; }\n  [layout=\"column\"] > [flex-lg=\"40\"] {\n    max-height: 40%; }\n  [flex-lg=\"45\"] {\n    -webkit-flex: 0 0 45%;\n        -ms-flex: 0 0 45%;\n            flex: 0 0 45%; }\n  [layout=\"row\"] > [flex-lg=\"45\"] {\n    max-width: 45%; }\n  [layout=\"column\"] > [flex-lg=\"45\"] {\n    max-height: 45%; }\n  [flex-lg=\"50\"] {\n    -webkit-flex: 0 0 50%;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%; }\n  [layout=\"row\"] > [flex-lg=\"50\"] {\n    max-width: 50%; }\n  [layout=\"column\"] > [flex-lg=\"50\"] {\n    max-height: 50%; }\n  [flex-lg=\"55\"] {\n    -webkit-flex: 0 0 55%;\n        -ms-flex: 0 0 55%;\n            flex: 0 0 55%; }\n  [layout=\"row\"] > [flex-lg=\"55\"] {\n    max-width: 55%; }\n  [layout=\"column\"] > [flex-lg=\"55\"] {\n    max-height: 55%; }\n  [flex-lg=\"60\"] {\n    -webkit-flex: 0 0 60%;\n        -ms-flex: 0 0 60%;\n            flex: 0 0 60%; }\n  [layout=\"row\"] > [flex-lg=\"60\"] {\n    max-width: 60%; }\n  [layout=\"column\"] > [flex-lg=\"60\"] {\n    max-height: 60%; }\n  [flex-lg=\"65\"] {\n    -webkit-flex: 0 0 65%;\n        -ms-flex: 0 0 65%;\n            flex: 0 0 65%; }\n  [layout=\"row\"] > [flex-lg=\"65\"] {\n    max-width: 65%; }\n  [layout=\"column\"] > [flex-lg=\"65\"] {\n    max-height: 65%; }\n  [flex-lg=\"70\"] {\n    -webkit-flex: 0 0 70%;\n        -ms-flex: 0 0 70%;\n            flex: 0 0 70%; }\n  [layout=\"row\"] > [flex-lg=\"70\"] {\n    max-width: 70%; }\n  [layout=\"column\"] > [flex-lg=\"70\"] {\n    max-height: 70%; }\n  [flex-lg=\"75\"] {\n    -webkit-flex: 0 0 75%;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%; }\n  [layout=\"row\"] > [flex-lg=\"75\"] {\n    max-width: 75%; }\n  [layout=\"column\"] > [flex-lg=\"75\"] {\n    max-height: 75%; }\n  [flex-lg=\"80\"] {\n    -webkit-flex: 0 0 80%;\n        -ms-flex: 0 0 80%;\n            flex: 0 0 80%; }\n  [layout=\"row\"] > [flex-lg=\"80\"] {\n    max-width: 80%; }\n  [layout=\"column\"] > [flex-lg=\"80\"] {\n    max-height: 80%; }\n  [flex-lg=\"85\"] {\n    -webkit-flex: 0 0 85%;\n        -ms-flex: 0 0 85%;\n            flex: 0 0 85%; }\n  [layout=\"row\"] > [flex-lg=\"85\"] {\n    max-width: 85%; }\n  [layout=\"column\"] > [flex-lg=\"85\"] {\n    max-height: 85%; }\n  [flex-lg=\"90\"] {\n    -webkit-flex: 0 0 90%;\n        -ms-flex: 0 0 90%;\n            flex: 0 0 90%; }\n  [layout=\"row\"] > [flex-lg=\"90\"] {\n    max-width: 90%; }\n  [layout=\"column\"] > [flex-lg=\"90\"] {\n    max-height: 90%; }\n  [flex-lg=\"95\"] {\n    -webkit-flex: 0 0 95%;\n        -ms-flex: 0 0 95%;\n            flex: 0 0 95%; }\n  [layout=\"row\"] > [flex-lg=\"95\"] {\n    max-width: 95%; }\n  [layout=\"column\"] > [flex-lg=\"95\"] {\n    max-height: 95%; }\n  [flex-lg=\"100\"] {\n    -webkit-flex: 0 0 100%;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%; }\n  [layout=\"row\"] > [flex-lg=\"100\"] {\n    max-width: 100%; }\n  [layout=\"column\"] > [flex-lg=\"100\"] {\n    max-height: 100%; }\n  [flex-lg=\"33\"], [flex-lg=\"34\"] {\n    -webkit-flex: 0 0 33.33%;\n        -ms-flex: 0 0 33.33%;\n            flex: 0 0 33.33%; }\n  [flex-lg=\"66\"], [flex-lg=\"67\"] {\n    -webkit-flex: 0 0 66.66%;\n        -ms-flex: 0 0 66.66%;\n            flex: 0 0 66.66%; }\n  [layout=\"row\"] > [flex-lg=\"33\"], [layout=\"row\"] > [flex-lg=\"34\"] {\n    max-width: 33.33%; }\n  [layout=\"row\"] > [flex-lg=\"66\"], [layout=\"row\"] > [flex-lg=\"67\"] {\n    max-width: 66.66%; }\n  [layout=\"column\"] > [flex-lg=\"33\"], [layout=\"column\"] > [flex-lg=\"34\"] {\n    max-height: 33.33%; }\n  [layout=\"column\"] > [flex-lg=\"66\"], [layout=\"column\"] > [flex-lg=\"67\"] {\n    max-height: 66.66%; } }\n\n@media (min-width: 1200px) {\n  [hide-gt-sm]:not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show]), [hide-gt-md]:not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show]), [hide-gt-lg]:not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show]), [hide]:not([show-gt-sm]):not([show-gt-md]):not([show-gt-lg]):not([show]) {\n    display: none; }\n  [flex-order-gt-lg=\"0\"] {\n    -webkit-order: 0;\n        -ms-flex-order: 0;\n            order: 0; }\n  [flex-order-gt-lg=\"1\"] {\n    -webkit-order: 1;\n        -ms-flex-order: 1;\n            order: 1; }\n  [flex-order-gt-lg=\"2\"] {\n    -webkit-order: 2;\n        -ms-flex-order: 2;\n            order: 2; }\n  [flex-order-gt-lg=\"3\"] {\n    -webkit-order: 3;\n        -ms-flex-order: 3;\n            order: 3; }\n  [flex-order-gt-lg=\"4\"] {\n    -webkit-order: 4;\n        -ms-flex-order: 4;\n            order: 4; }\n  [flex-order-gt-lg=\"5\"] {\n    -webkit-order: 5;\n        -ms-flex-order: 5;\n            order: 5; }\n  [flex-order-gt-lg=\"6\"] {\n    -webkit-order: 6;\n        -ms-flex-order: 6;\n            order: 6; }\n  [flex-order-gt-lg=\"7\"] {\n    -webkit-order: 7;\n        -ms-flex-order: 7;\n            order: 7; }\n  [flex-order-gt-lg=\"8\"] {\n    -webkit-order: 8;\n        -ms-flex-order: 8;\n            order: 8; }\n  [flex-order-gt-lg=\"9\"] {\n    -webkit-order: 9;\n        -ms-flex-order: 9;\n            order: 9; }\n  [layout-align-gt-lg=\"center\"], [layout-align-gt-lg=\"center center\"], [layout-align-gt-lg=\"center start\"], [layout-align-gt-lg=\"center end\"] {\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  [layout-align-gt-lg=\"end\"], [layout-align-gt-lg=\"end center\"], [layout-align-gt-lg=\"end start\"], [layout-align-gt-lg=\"end end\"] {\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n  [layout-align-gt-lg=\"space-around\"], [layout-align-gt-lg=\"space-around center\"], [layout-align-gt-lg=\"space-around start\"], [layout-align-gt-lg=\"space-around end\"] {\n    -webkit-justify-content: space-around;\n        -ms-flex-pack: distribute;\n            justify-content: space-around; }\n  [layout-align-gt-lg=\"space-between\"], [layout-align-gt-lg=\"space-between center\"], [layout-align-gt-lg=\"space-between start\"], [layout-align-gt-lg=\"space-between end\"] {\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between; }\n  [layout-align-gt-lg=\"center center\"], [layout-align-gt-lg=\"start center\"], [layout-align-gt-lg=\"end center\"], [layout-align-gt-lg=\"space-between center\"], [layout-align-gt-lg=\"space-around center\"] {\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  [layout-align-gt-lg=\"center start\"], [layout-align-gt-lg=\"start start\"], [layout-align-gt-lg=\"end start\"], [layout-align-gt-lg=\"space-between start\"], [layout-align-gt-lg=\"space-around start\"] {\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start; }\n  [layout-align-gt-lg=\"center end\"], [layout-align-gt-lg=\"start end\"], [layout-align-gt-lg=\"end end\"], [layout-align-gt-lg=\"space-between end\"], [layout-align-gt-lg=\"space-around end\"] {\n    -webkit-align-items: flex-end;\n        -ms-flex-align: end;\n            align-items: flex-end; }\n  [layout-gt-lg] {\n    box-sizing: border-box;\n    display: -webkit-flex;\n    display: -moz-flex;\n    display: -ms-flexbox;\n    display: flex; }\n  [layout-gt-lg=column] {\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n  [layout-gt-lg=row] {\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row; }\n  [offset-gt-lg=\"5\"] {\n    margin-left: 5%; }\n  [offset-gt-lg=\"10\"] {\n    margin-left: 10%; }\n  [offset-gt-lg=\"15\"] {\n    margin-left: 15%; }\n  [offset-gt-lg=\"20\"] {\n    margin-left: 20%; }\n  [offset-gt-lg=\"25\"] {\n    margin-left: 25%; }\n  [offset-gt-lg=\"30\"] {\n    margin-left: 30%; }\n  [offset-gt-lg=\"35\"] {\n    margin-left: 35%; }\n  [offset-gt-lg=\"40\"] {\n    margin-left: 40%; }\n  [offset-gt-lg=\"45\"] {\n    margin-left: 45%; }\n  [offset-gt-lg=\"50\"] {\n    margin-left: 50%; }\n  [offset-gt-lg=\"55\"] {\n    margin-left: 55%; }\n  [offset-gt-lg=\"60\"] {\n    margin-left: 60%; }\n  [offset-gt-lg=\"65\"] {\n    margin-left: 65%; }\n  [offset-gt-lg=\"70\"] {\n    margin-left: 70%; }\n  [offset-gt-lg=\"75\"] {\n    margin-left: 75%; }\n  [offset-gt-lg=\"80\"] {\n    margin-left: 80%; }\n  [offset-gt-lg=\"85\"] {\n    margin-left: 85%; }\n  [offset-gt-lg=\"90\"] {\n    margin-left: 90%; }\n  [offset-gt-lg=\"95\"] {\n    margin-left: 95%; }\n  [offset-gt-lg=\"33\"], [offset-gt-lg=\"34\"] {\n    margin-left: 33.33%; }\n  [offset-gt-lg=\"66\"], [offset-gt-lg=\"67\"] {\n    margin-left: 66.66%; }\n  [flex-gt-lg] {\n    box-sizing: border-box;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1; }\n  [flex-gt-lg=\"0\"] {\n    -webkit-flex: 0 0 0%;\n        -ms-flex: 0 0 0%;\n            flex: 0 0 0%; }\n  [layout=\"row\"] > [flex-gt-lg=\"0\"] {\n    max-width: 0%; }\n  [layout=\"column\"] > [flex-gt-lg=\"0\"] {\n    max-height: 0%; }\n  [flex-gt-lg=\"5\"] {\n    -webkit-flex: 0 0 5%;\n        -ms-flex: 0 0 5%;\n            flex: 0 0 5%; }\n  [layout=\"row\"] > [flex-gt-lg=\"5\"] {\n    max-width: 5%; }\n  [layout=\"column\"] > [flex-gt-lg=\"5\"] {\n    max-height: 5%; }\n  [flex-gt-lg=\"10\"] {\n    -webkit-flex: 0 0 10%;\n        -ms-flex: 0 0 10%;\n            flex: 0 0 10%; }\n  [layout=\"row\"] > [flex-gt-lg=\"10\"] {\n    max-width: 10%; }\n  [layout=\"column\"] > [flex-gt-lg=\"10\"] {\n    max-height: 10%; }\n  [flex-gt-lg=\"15\"] {\n    -webkit-flex: 0 0 15%;\n        -ms-flex: 0 0 15%;\n            flex: 0 0 15%; }\n  [layout=\"row\"] > [flex-gt-lg=\"15\"] {\n    max-width: 15%; }\n  [layout=\"column\"] > [flex-gt-lg=\"15\"] {\n    max-height: 15%; }\n  [flex-gt-lg=\"20\"] {\n    -webkit-flex: 0 0 20%;\n        -ms-flex: 0 0 20%;\n            flex: 0 0 20%; }\n  [layout=\"row\"] > [flex-gt-lg=\"20\"] {\n    max-width: 20%; }\n  [layout=\"column\"] > [flex-gt-lg=\"20\"] {\n    max-height: 20%; }\n  [flex-gt-lg=\"25\"] {\n    -webkit-flex: 0 0 25%;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%; }\n  [layout=\"row\"] > [flex-gt-lg=\"25\"] {\n    max-width: 25%; }\n  [layout=\"column\"] > [flex-gt-lg=\"25\"] {\n    max-height: 25%; }\n  [flex-gt-lg=\"30\"] {\n    -webkit-flex: 0 0 30%;\n        -ms-flex: 0 0 30%;\n            flex: 0 0 30%; }\n  [layout=\"row\"] > [flex-gt-lg=\"30\"] {\n    max-width: 30%; }\n  [layout=\"column\"] > [flex-gt-lg=\"30\"] {\n    max-height: 30%; }\n  [flex-gt-lg=\"35\"] {\n    -webkit-flex: 0 0 35%;\n        -ms-flex: 0 0 35%;\n            flex: 0 0 35%; }\n  [layout=\"row\"] > [flex-gt-lg=\"35\"] {\n    max-width: 35%; }\n  [layout=\"column\"] > [flex-gt-lg=\"35\"] {\n    max-height: 35%; }\n  [flex-gt-lg=\"40\"] {\n    -webkit-flex: 0 0 40%;\n        -ms-flex: 0 0 40%;\n            flex: 0 0 40%; }\n  [layout=\"row\"] > [flex-gt-lg=\"40\"] {\n    max-width: 40%; }\n  [layout=\"column\"] > [flex-gt-lg=\"40\"] {\n    max-height: 40%; }\n  [flex-gt-lg=\"45\"] {\n    -webkit-flex: 0 0 45%;\n        -ms-flex: 0 0 45%;\n            flex: 0 0 45%; }\n  [layout=\"row\"] > [flex-gt-lg=\"45\"] {\n    max-width: 45%; }\n  [layout=\"column\"] > [flex-gt-lg=\"45\"] {\n    max-height: 45%; }\n  [flex-gt-lg=\"50\"] {\n    -webkit-flex: 0 0 50%;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%; }\n  [layout=\"row\"] > [flex-gt-lg=\"50\"] {\n    max-width: 50%; }\n  [layout=\"column\"] > [flex-gt-lg=\"50\"] {\n    max-height: 50%; }\n  [flex-gt-lg=\"55\"] {\n    -webkit-flex: 0 0 55%;\n        -ms-flex: 0 0 55%;\n            flex: 0 0 55%; }\n  [layout=\"row\"] > [flex-gt-lg=\"55\"] {\n    max-width: 55%; }\n  [layout=\"column\"] > [flex-gt-lg=\"55\"] {\n    max-height: 55%; }\n  [flex-gt-lg=\"60\"] {\n    -webkit-flex: 0 0 60%;\n        -ms-flex: 0 0 60%;\n            flex: 0 0 60%; }\n  [layout=\"row\"] > [flex-gt-lg=\"60\"] {\n    max-width: 60%; }\n  [layout=\"column\"] > [flex-gt-lg=\"60\"] {\n    max-height: 60%; }\n  [flex-gt-lg=\"65\"] {\n    -webkit-flex: 0 0 65%;\n        -ms-flex: 0 0 65%;\n            flex: 0 0 65%; }\n  [layout=\"row\"] > [flex-gt-lg=\"65\"] {\n    max-width: 65%; }\n  [layout=\"column\"] > [flex-gt-lg=\"65\"] {\n    max-height: 65%; }\n  [flex-gt-lg=\"70\"] {\n    -webkit-flex: 0 0 70%;\n        -ms-flex: 0 0 70%;\n            flex: 0 0 70%; }\n  [layout=\"row\"] > [flex-gt-lg=\"70\"] {\n    max-width: 70%; }\n  [layout=\"column\"] > [flex-gt-lg=\"70\"] {\n    max-height: 70%; }\n  [flex-gt-lg=\"75\"] {\n    -webkit-flex: 0 0 75%;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%; }\n  [layout=\"row\"] > [flex-gt-lg=\"75\"] {\n    max-width: 75%; }\n  [layout=\"column\"] > [flex-gt-lg=\"75\"] {\n    max-height: 75%; }\n  [flex-gt-lg=\"80\"] {\n    -webkit-flex: 0 0 80%;\n        -ms-flex: 0 0 80%;\n            flex: 0 0 80%; }\n  [layout=\"row\"] > [flex-gt-lg=\"80\"] {\n    max-width: 80%; }\n  [layout=\"column\"] > [flex-gt-lg=\"80\"] {\n    max-height: 80%; }\n  [flex-gt-lg=\"85\"] {\n    -webkit-flex: 0 0 85%;\n        -ms-flex: 0 0 85%;\n            flex: 0 0 85%; }\n  [layout=\"row\"] > [flex-gt-lg=\"85\"] {\n    max-width: 85%; }\n  [layout=\"column\"] > [flex-gt-lg=\"85\"] {\n    max-height: 85%; }\n  [flex-gt-lg=\"90\"] {\n    -webkit-flex: 0 0 90%;\n        -ms-flex: 0 0 90%;\n            flex: 0 0 90%; }\n  [layout=\"row\"] > [flex-gt-lg=\"90\"] {\n    max-width: 90%; }\n  [layout=\"column\"] > [flex-gt-lg=\"90\"] {\n    max-height: 90%; }\n  [flex-gt-lg=\"95\"] {\n    -webkit-flex: 0 0 95%;\n        -ms-flex: 0 0 95%;\n            flex: 0 0 95%; }\n  [layout=\"row\"] > [flex-gt-lg=\"95\"] {\n    max-width: 95%; }\n  [layout=\"column\"] > [flex-gt-lg=\"95\"] {\n    max-height: 95%; }\n  [flex-gt-lg=\"100\"] {\n    -webkit-flex: 0 0 100%;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%; }\n  [layout=\"row\"] > [flex-gt-lg=\"100\"] {\n    max-width: 100%; }\n  [layout=\"column\"] > [flex-gt-lg=\"100\"] {\n    max-height: 100%; }\n  [flex-gt-lg=\"33\"], [flex-gt-lg=\"34\"] {\n    -webkit-flex: 0 0 33.33%;\n        -ms-flex: 0 0 33.33%;\n            flex: 0 0 33.33%; }\n  [flex-gt-lg=\"66\"], [flex-gt-lg=\"67\"] {\n    -webkit-flex: 0 0 66.66%;\n        -ms-flex: 0 0 66.66%;\n            flex: 0 0 66.66%; }\n  [layout=\"row\"] > [flex-gt-lg=\"33\"], [layout=\"row\"] > [flex-gt-lg=\"34\"] {\n    max-width: 33.33%; }\n  [layout=\"row\"] > [flex-gt-lg=\"66\"], [layout=\"row\"] > [flex-gt-lg=\"67\"] {\n    max-width: 66.66%; }\n  [layout=\"column\"] > [flex-gt-lg=\"33\"], [layout=\"column\"] > [flex-gt-lg=\"34\"] {\n    max-height: 33.33%; }\n  [layout=\"column\"] > [flex-gt-lg=\"66\"], [layout=\"column\"] > [flex-gt-lg=\"67\"] {\n    max-height: 66.66%; } }\n\n@-webkit-keyframes md-autocomplete-list-out {\n  0% {\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear; }\n\n  50% {\n    opacity: 0;\n    height: 40px;\n    -webkit-animation-timing-function: ease-in;\n            animation-timing-function: ease-in; }\n\n  100% {\n    height: 0;\n    opacity: 0; } }\n\n@keyframes md-autocomplete-list-out {\n  0% {\n    -webkit-animation-timing-function: linear;\n            animation-timing-function: linear; }\n\n  50% {\n    opacity: 0;\n    height: 40px;\n    -webkit-animation-timing-function: ease-in;\n            animation-timing-function: ease-in; }\n\n  100% {\n    height: 0;\n    opacity: 0; } }\n\n@-webkit-keyframes md-autocomplete-list-in {\n  0% {\n    opacity: 0;\n    height: 0;\n    -webkit-animation-timing-function: ease-out;\n            animation-timing-function: ease-out; }\n\n  50% {\n    opacity: 0;\n    height: 40px; }\n\n  100% {\n    opacity: 1;\n    height: 40px; } }\n\n@keyframes md-autocomplete-list-in {\n  0% {\n    opacity: 0;\n    height: 0;\n    -webkit-animation-timing-function: ease-out;\n            animation-timing-function: ease-out; }\n\n  50% {\n    opacity: 0;\n    height: 40px; }\n\n  100% {\n    opacity: 1;\n    height: 40px; } }\n\nmd-autocomplete {\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);\n  border-radius: 2px;\n  display: block;\n  height: 40px;\n  position: relative;\n  overflow: visible;\n  min-width: 190px; }\n  md-autocomplete[md-floating-label] {\n    padding-bottom: 26px;\n    box-shadow: none;\n    border-radius: 0;\n    background: transparent;\n    height: auto; }\n    md-autocomplete[md-floating-label] md-input-container {\n      padding-bottom: 0; }\n    md-autocomplete[md-floating-label] md-autocomplete-wrap {\n      height: auto; }\n    md-autocomplete[md-floating-label] button {\n      top: auto;\n      bottom: 5px; }\n  md-autocomplete md-autocomplete-wrap {\n    display: block;\n    position: relative;\n    overflow: visible;\n    height: 40px; }\n    md-autocomplete md-autocomplete-wrap md-progress-linear {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      width: 100%;\n      height: 3px;\n      transition: none; }\n      md-autocomplete md-autocomplete-wrap md-progress-linear .md-container {\n        transition: none;\n        top: auto;\n        height: 3px; }\n      md-autocomplete md-autocomplete-wrap md-progress-linear.ng-enter {\n        transition: opacity 0.15s linear; }\n        md-autocomplete md-autocomplete-wrap md-progress-linear.ng-enter.ng-enter-active {\n          opacity: 1; }\n      md-autocomplete md-autocomplete-wrap md-progress-linear.ng-leave {\n        transition: opacity 0.15s linear; }\n        md-autocomplete md-autocomplete-wrap md-progress-linear.ng-leave.ng-leave-active {\n          opacity: 0; }\n  md-autocomplete input:not(.md-input) {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    box-sizing: border-box;\n    border: none;\n    box-shadow: none;\n    padding: 0 15px;\n    font-size: 14px;\n    line-height: 40px;\n    height: 40px;\n    outline: none;\n    background: transparent; }\n    md-autocomplete input:not(.md-input)::-ms-clear {\n      display: none; }\n  md-autocomplete button {\n    position: absolute;\n    top: 10px;\n    right: 10px;\n    line-height: 20px;\n    text-align: center;\n    width: 20px;\n    height: 20px;\n    cursor: pointer;\n    border: none;\n    border-radius: 50%;\n    padding: 0;\n    font-size: 12px;\n    background: transparent; }\n    md-autocomplete button:after {\n      content: '';\n      position: absolute;\n      top: -6px;\n      right: -6px;\n      bottom: -6px;\n      left: -6px;\n      border-radius: 50%;\n      -webkit-transform: scale(0);\n              transform: scale(0);\n      opacity: 0;\n      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); }\n    md-autocomplete button:focus {\n      outline: none; }\n      md-autocomplete button:focus:after {\n        -webkit-transform: scale(1);\n                transform: scale(1);\n        opacity: 1; }\n    md-autocomplete button md-icon {\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      -webkit-transform: translate3d(-50%, -50%, 0) scale(0.9);\n              transform: translate3d(-50%, -50%, 0) scale(0.9); }\n      md-autocomplete button md-icon path {\n        stroke-width: 0; }\n    md-autocomplete button.ng-enter {\n      -webkit-transform: scale(0);\n              transform: scale(0);\n      transition: -webkit-transform 0.15s ease-out;\n      transition: transform 0.15s ease-out; }\n      md-autocomplete button.ng-enter.ng-enter-active {\n        -webkit-transform: scale(1);\n                transform: scale(1); }\n    md-autocomplete button.ng-leave {\n      transition: -webkit-transform 0.15s ease-out;\n      transition: transform 0.15s ease-out; }\n      md-autocomplete button.ng-leave.ng-leave-active {\n        -webkit-transform: scale(0);\n                transform: scale(0); }\n  @media screen and (-ms-high-contrast: active) {\n    md-autocomplete input {\n      border: 1px solid #fff; }\n    md-autocomplete li:focus {\n      color: #fff; } }\n\n.md-autocomplete-suggestions {\n  position: absolute;\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);\n  margin: 0;\n  list-style: none;\n  padding: 0;\n  overflow: auto;\n  max-height: 225.5px;\n  z-index: 100; }\n  .md-autocomplete-suggestions li {\n    cursor: pointer;\n    font-size: 14px;\n    overflow: hidden;\n    padding: 0 15px;\n    line-height: 48px;\n    height: 48px;\n    transition: background 0.15s linear;\n    margin: 0;\n    white-space: nowrap;\n    text-overflow: ellipsis; }\n    .md-autocomplete-suggestions li.ng-enter, .md-autocomplete-suggestions li.ng-hide-remove {\n      transition: none;\n      -webkit-animation: md-autocomplete-list-in 0.2s;\n              animation: md-autocomplete-list-in 0.2s; }\n    .md-autocomplete-suggestions li.ng-leave, .md-autocomplete-suggestions li.ng-hide-add {\n      transition: none;\n      -webkit-animation: md-autocomplete-list-out 0.2s;\n              animation: md-autocomplete-list-out 0.2s; }\n    .md-autocomplete-suggestions li:focus {\n      outline: none; }\n\nmd-backdrop {\n  z-index: 50;\n  background-color: transparent;\n  position: absolute;\n  height: 100%;\n  left: 0;\n  right: 0; }\n  md-backdrop.md-select-backdrop {\n    z-index: 81; }\n  md-backdrop.md-dialog-backdrop {\n    z-index: 79; }\n  md-backdrop.md-bottom-sheet-backdrop {\n    z-index: 69; }\n  md-backdrop.md-sidenav-backdrop {\n    z-index: 59; }\n  md-backdrop.md-click-catcher {\n    top: 0;\n    position: fixed; }\n  md-backdrop.ng-enter {\n    -webkit-animation: cubic-bezier(0.25, 0.8, 0.25, 1) mdBackdropFadeIn 0.5s both;\n            animation: cubic-bezier(0.25, 0.8, 0.25, 1) mdBackdropFadeIn 0.5s both; }\n  md-backdrop.ng-leave {\n    -webkit-animation: cubic-bezier(0.55, 0, 0.55, 0.2) mdBackdropFadeOut 0.2s both;\n            animation: cubic-bezier(0.55, 0, 0.55, 0.2) mdBackdropFadeOut 0.2s both; }\n\n@-webkit-keyframes mdBackdropFadeIn {\n  from {\n    opacity: 0; }\n\n  to {\n    opacity: 1; } }\n\n@keyframes mdBackdropFadeIn {\n  from {\n    opacity: 0; }\n\n  to {\n    opacity: 1; } }\n\n@-webkit-keyframes mdBackdropFadeOut {\n  from {\n    opacity: 1; }\n\n  to {\n    opacity: 0; } }\n\n@keyframes mdBackdropFadeOut {\n  from {\n    opacity: 1; }\n\n  to {\n    opacity: 0; } }\n\nmd-bottom-sheet {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  padding: 8px 16px 88px 16px;\n  z-index: 70;\n  border-top: 1px solid;\n  -webkit-transform: translate3d(0, 80px, 0);\n          transform: translate3d(0, 80px, 0);\n  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n  transition-property: -webkit-transform;\n  transition-property: transform; }\n  md-bottom-sheet.md-has-header {\n    padding-top: 0; }\n  md-bottom-sheet.ng-enter {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n            transform: translate3d(0, 100%, 0); }\n  md-bottom-sheet.ng-enter-active {\n    opacity: 1;\n    display: block;\n    -webkit-transform: translate3d(0, 80px, 0) !important;\n            transform: translate3d(0, 80px, 0) !important; }\n  md-bottom-sheet.ng-leave-active {\n    -webkit-transform: translate3d(0, 100%, 0) !important;\n            transform: translate3d(0, 100%, 0) !important;\n    transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2); }\n  md-bottom-sheet .md-subheader {\n    background-color: transparent;\n    font-family: RobotoDraft, Roboto, 'Helvetica Neue', sans-serif;\n    line-height: 56px;\n    padding: 0;\n    white-space: nowrap; }\n  md-bottom-sheet md-inline-icon {\n    display: inline-block;\n    height: 24px;\n    width: 24px;\n    fill: #444; }\n  md-bottom-sheet md-list-item {\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    outline: none; }\n    md-bottom-sheet md-list-item:hover {\n      cursor: pointer; }\n  md-bottom-sheet.md-list md-list-item {\n    padding: 0;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    height: 48px; }\n    md-bottom-sheet.md-list md-list-item div.md-icon-container {\n      display: inline-block;\n      height: 24px;\n      margin-right: 32px; }\n  md-bottom-sheet.md-grid {\n    padding-left: 24px;\n    padding-right: 24px;\n    padding-top: 0; }\n    md-bottom-sheet.md-grid md-list {\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-flex-direction: row;\n          -ms-flex-direction: row;\n              flex-direction: row;\n      -webkit-flex-wrap: wrap;\n          -ms-flex-wrap: wrap;\n              flex-wrap: wrap;\n      transition: all 0.5s;\n      -webkit-align-items: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    md-bottom-sheet.md-grid md-list-item {\n      -webkit-flex-direction: column;\n          -ms-flex-direction: column;\n              flex-direction: column;\n      -webkit-align-items: center;\n          -ms-flex-align: center;\n              align-items: center;\n      transition: all 0.5s;\n      height: 96px;\n      margin-top: 8px;\n      margin-bottom: 8px;\n      /* Mixin for how many grid items to show per row */ }\n      @media screen and (max-width: 600px) {\n        md-bottom-sheet.md-grid md-list-item {\n          -webkit-flex: 1 1 33.33333%;\n              -ms-flex: 1 1 33.33333%;\n                  flex: 1 1 33.33333%;\n          max-width: 33.33333%; }\n          md-bottom-sheet.md-grid md-list-item:nth-of-type(3n+1) {\n            -webkit-align-items: flex-start;\n                -ms-flex-align: start;\n                    align-items: flex-start; }\n          md-bottom-sheet.md-grid md-list-item:nth-of-type(3n) {\n            -webkit-align-items: flex-end;\n                -ms-flex-align: end;\n                    align-items: flex-end; } }\n      @media screen and (min-width: 600px) and (max-width: 960px) {\n        md-bottom-sheet.md-grid md-list-item {\n          -webkit-flex: 1 1 25%;\n              -ms-flex: 1 1 25%;\n                  flex: 1 1 25%;\n          max-width: 25%; } }\n      @media screen and (min-width: 960px) and (max-width: 1200px) {\n        md-bottom-sheet.md-grid md-list-item {\n          -webkit-flex: 1 1 16.66667%;\n              -ms-flex: 1 1 16.66667%;\n                  flex: 1 1 16.66667%;\n          max-width: 16.66667%; } }\n      @media screen and (min-width: 1200px) {\n        md-bottom-sheet.md-grid md-list-item {\n          -webkit-flex: 1 1 14.28571%;\n              -ms-flex: 1 1 14.28571%;\n                  flex: 1 1 14.28571%;\n          max-width: 14.28571%; } }\n      md-bottom-sheet.md-grid md-list-item .md-list-item-content {\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-flex-direction: column;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        -webkit-align-items: center;\n            -ms-flex-align: center;\n                align-items: center;\n        width: 48px;\n        padding-bottom: 16px; }\n      md-bottom-sheet.md-grid md-list-item .md-grid-item-content {\n        border: 1px solid transparent;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-flex-direction: column;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        -webkit-align-items: center;\n            -ms-flex-align: center;\n                align-items: center;\n        width: 80px; }\n      md-bottom-sheet.md-grid md-list-item .md-icon-container {\n        display: inline-block;\n        box-sizing: border-box;\n        height: 48px;\n        width: 48px;\n        margin: 0 0; }\n      md-bottom-sheet.md-grid md-list-item .md-grid-text {\n        font-weight: 400;\n        line-height: 16px;\n        font-size: 13px;\n        margin: 0;\n        white-space: nowrap;\n        width: 64px;\n        text-align: center;\n        text-transform: none;\n        padding-top: 8px; }\n\n/**\n * Position a FAB button.\n */\n.md-button {\n  box-sizing: border-box;\n  color: currentColor;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  position: relative;\n  outline: none;\n  border: 0;\n  display: inline-block;\n  padding: 0 6px;\n  margin: 6px 8px;\n  line-height: 36px;\n  min-height: 36px;\n  background: transparent;\n  white-space: nowrap;\n  min-width: 88px;\n  text-align: center;\n  text-transform: uppercase;\n  font-weight: 500;\n  font-size: 14px;\n  font-style: inherit;\n  font-variant: inherit;\n  font-family: inherit;\n  text-decoration: none;\n  cursor: pointer;\n  overflow: hidden;\n  transition: box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), background-color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); }\n  .md-button *, .md-button *:before, .md-button *:after {\n    box-sizing: border-box; }\n  .md-button:focus {\n    outline: none; }\n  .md-button:hover, .md-button:focus {\n    text-decoration: none; }\n  .md-button.ng-hide, .md-button.ng-leave {\n    transition: none; }\n  .md-button.md-cornered {\n    border-radius: 0; }\n  .md-button.md-icon {\n    padding: 0;\n    background: none; }\n  .md-button.md-icon-button {\n    margin: 0 6px;\n    height: 48px;\n    min-width: 0;\n    line-height: 48px;\n    padding-left: 0;\n    padding-right: 0;\n    width: 48px; }\n  .md-button.md-fab {\n    z-index: 20;\n    line-height: 56px;\n    min-width: 0;\n    width: 56px;\n    height: 56px;\n    vertical-align: middle;\n    border-radius: 50%;\n    background-clip: padding-box;\n    overflow: hidden;\n    transition: 0.2s linear;\n    transition-property: background-color, box-shadow; }\n    .md-button.md-fab.md-fab-bottom-right {\n      top: auto;\n      right: 20px;\n      bottom: 20px;\n      left: auto;\n      position: absolute; }\n    .md-button.md-fab.md-fab-bottom-left {\n      top: auto;\n      right: auto;\n      bottom: 20px;\n      left: 20px;\n      position: absolute; }\n    .md-button.md-fab.md-fab-top-right {\n      top: 20px;\n      right: 20px;\n      bottom: auto;\n      left: auto;\n      position: absolute; }\n    .md-button.md-fab.md-fab-top-left {\n      top: 20px;\n      right: auto;\n      bottom: auto;\n      left: 20px;\n      position: absolute; }\n    .md-button.md-fab .md-ripple-container {\n      border-radius: 50%;\n      background-clip: padding-box;\n      overflow: hidden;\n      -webkit-mask-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC'); }\n    .md-button.md-fab md-icon {\n      margin-top: 0; }\n    .md-button.md-fab.md-mini {\n      line-height: 40px;\n      width: 40px;\n      height: 40px; }\n\n.md-toast-open-top .md-button.md-fab-top-left, .md-toast-open-top .md-button.md-fab-top-right {\n  -webkit-transform: translate3d(0, 42px, 0);\n          transform: translate3d(0, 42px, 0); }\n  .md-toast-open-top .md-button.md-fab-top-left:not([disabled]).md-focused, .md-toast-open-top .md-button.md-fab-top-left:not([disabled]):hover, .md-toast-open-top .md-button.md-fab-top-right:not([disabled]).md-focused, .md-toast-open-top .md-button.md-fab-top-right:not([disabled]):hover {\n    -webkit-transform: translate3d(0, 41px, 0);\n            transform: translate3d(0, 41px, 0); }\n\n.md-toast-open-bottom .md-button.md-fab-bottom-left, .md-toast-open-bottom .md-button.md-fab-bottom-right {\n  -webkit-transform: translate3d(0, -42px, 0);\n          transform: translate3d(0, -42px, 0); }\n  .md-toast-open-bottom .md-button.md-fab-bottom-left:not([disabled]).md-focused, .md-toast-open-bottom .md-button.md-fab-bottom-left:not([disabled]):hover, .md-toast-open-bottom .md-button.md-fab-bottom-right:not([disabled]).md-focused, .md-toast-open-bottom .md-button.md-fab-bottom-right:not([disabled]):hover {\n    -webkit-transform: translate3d(0, -43px, 0);\n            transform: translate3d(0, -43px, 0); }\n\n.md-button-group {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  width: 100%; }\n\n.md-button-group > .md-button {\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  display: block;\n  overflow: hidden;\n  width: 0;\n  border-width: 1px 0px 1px 1px;\n  border-radius: 0;\n  text-align: center;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n  .md-button-group > .md-button:first-child {\n    border-radius: 2px 0px 0px 2px; }\n  .md-button-group > .md-button:last-child {\n    border-right-width: 1px;\n    border-radius: 0px 2px 2px 0px; }\n\n@media screen and (-ms-high-contrast: active) {\n  .md-button.md-raised, .md-button.md-fab {\n    border: 1px solid #fff; } }\n\nmd-card {\n  box-sizing: border-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  margin: 8px;\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); }\n  md-card > img, md-card > :not(md-card-content) img {\n    width: 100%; }\n  md-card md-card-content {\n    padding: 16px; }\n  md-card .md-actions {\n    margin: 0; }\n    md-card .md-actions .md-button {\n      margin-bottom: 8px;\n      margin-top: 8px;\n      margin-right: 4px;\n      margin-left: 4px; }\n  md-card md-card-footer {\n    padding: 16px; }\n\n@media screen and (-ms-high-contrast: active) {\n  md-card {\n    border: 1px solid #fff; } }\n\nmd-checkbox {\n  box-sizing: border-box;\n  display: block;\n  margin: 8px;\n  white-space: nowrap;\n  cursor: pointer;\n  outline: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  padding-left: 18px;\n  position: relative;\n  line-height: 26px;\n  min-width: 18px;\n  min-height: 18px; }\n  md-checkbox *, md-checkbox *:before, md-checkbox *:after {\n    box-sizing: border-box; }\n  md-checkbox.md-focused:not([disabled]) .md-container:before {\n    left: -8px;\n    top: -8px;\n    right: -8px;\n    bottom: -8px; }\n  md-checkbox.md-focused:not([disabled]):not(.md-checked) .md-container:before {\n    background-color: rgba(0, 0, 0, 0.12); }\n  md-checkbox .md-container {\n    position: absolute;\n    top: 50%;\n    left: 0;\n    display: inline-block;\n    width: 18px;\n    height: 18px;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n    md-checkbox .md-container:before {\n      background-color: transparent;\n      border-radius: 50%;\n      content: '';\n      position: absolute;\n      display: block;\n      height: auto;\n      left: 0;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      transition: all 0.5s;\n      width: auto; }\n    md-checkbox .md-container:after {\n      content: '';\n      position: absolute;\n      top: -10px;\n      right: -10px;\n      bottom: -10px;\n      left: -10px; }\n    md-checkbox .md-container .md-ripple-container {\n      position: absolute;\n      display: block;\n      width: auto;\n      height: auto;\n      left: -15px;\n      top: -15px;\n      right: -15px;\n      bottom: -15px; }\n  md-checkbox .md-icon {\n    transition: 240ms;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 18px;\n    height: 18px;\n    border: 2px solid;\n    border-radius: 2px; }\n  md-checkbox.md-checked .md-icon {\n    border: none; }\n  md-checkbox[disabled] {\n    cursor: no-drop; }\n  md-checkbox.md-checked .md-icon:after {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg);\n    position: absolute;\n    left: 6px;\n    top: 2px;\n    display: table;\n    width: 6px;\n    height: 12px;\n    border: 2px solid;\n    border-top: 0;\n    border-left: 0;\n    content: ''; }\n  md-checkbox .md-label {\n    position: relative;\n    display: inline-block;\n    vertical-align: middle;\n    white-space: normal;\n    pointer-events: none;\n    -webkit-user-select: text;\n       -moz-user-select: text;\n        -ms-user-select: text;\n            user-select: text; }\n    md-checkbox .md-label span {\n      margin-left: 10px; }\n\n.md-contact-chips .md-chips .md-chip {\n  padding: 0 8px 0 0; }\n  .md-contact-chips .md-chips .md-chip .md-contact-avatar {\n    float: left; }\n    .md-contact-chips .md-chips .md-chip .md-contact-avatar img {\n      height: 32px;\n      border-radius: 16px; }\n  .md-contact-chips .md-chips .md-chip .md-contact-name {\n    display: inline-block;\n    height: 32px;\n    margin-left: 8px; }\n\n.md-contact-suggestion {\n  height: 56px; }\n  .md-contact-suggestion img {\n    height: 40px;\n    border-radius: 20px;\n    margin-top: 8px; }\n  .md-contact-suggestion .md-contact-name {\n    margin-left: 8px;\n    width: 120px; }\n  .md-contact-suggestion .md-contact-name, .md-contact-suggestion .md-contact-email {\n    display: inline-block;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n\n.md-contact-chips-suggestions li {\n  height: 100%; }\n\n.md-chips {\n  display: block;\n  font-family: RobotoDraft, Roboto, 'Helvetica Neue', sans-serif;\n  font-size: 13px;\n  padding: 0 0 8px 0;\n  vertical-align: middle;\n  cursor: text; }\n  .md-chips:after {\n    content: '';\n    display: table;\n    clear: both; }\n  .md-chips .md-chip {\n    cursor: default;\n    border-radius: 16px;\n    display: block;\n    height: 32px;\n    line-height: 32px;\n    margin: 8px 8px 0 0;\n    padding: 0 8px 0 12px;\n    float: left; }\n    .md-chips .md-chip .md-chip-content {\n      display: block;\n      padding-right: 4px;\n      float: left;\n      white-space: nowrap; }\n      .md-chips .md-chip .md-chip-content:focus {\n        outline: none; }\n    .md-chips .md-chip .md-chip-remove-container {\n      display: inline-block;\n      margin-right: -5px; }\n    .md-chips .md-chip .md-chip-remove {\n      text-align: center;\n      width: 32px;\n      height: 32px;\n      min-width: 0;\n      padding: 0;\n      background: transparent;\n      border: none;\n      box-shadow: none;\n      margin: 0;\n      position: relative; }\n      .md-chips .md-chip .md-chip-remove md-icon {\n        height: 18px;\n        width: 18px;\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        -webkit-transform: translate3d(-50%, -50%, 0);\n                transform: translate3d(-50%, -50%, 0); }\n  .md-chips .md-chip-input-container {\n    display: block;\n    line-height: 32px;\n    margin: 8px 8px 0 0;\n    padding: 0 8px 0 12px;\n    float: left; }\n    .md-chips .md-chip-input-container input:not([type]), .md-chips .md-chip-input-container input[type=\"email\"], .md-chips .md-chip-input-container input[type=\"number\"], .md-chips .md-chip-input-container input[type=\"tel\"], .md-chips .md-chip-input-container input[type=\"url\"], .md-chips .md-chip-input-container input[type=\"text\"] {\n      border: 0;\n      height: 32px;\n      line-height: 32px;\n      padding: 0; }\n      .md-chips .md-chip-input-container input:not([type]):focus, .md-chips .md-chip-input-container input[type=\"email\"]:focus, .md-chips .md-chip-input-container input[type=\"number\"]:focus, .md-chips .md-chip-input-container input[type=\"tel\"]:focus, .md-chips .md-chip-input-container input[type=\"url\"]:focus, .md-chips .md-chip-input-container input[type=\"text\"]:focus {\n        outline: none; }\n    .md-chips .md-chip-input-container md-autocomplete, .md-chips .md-chip-input-container md-autocomplete-wrap {\n      background: transparent;\n      height: 32px; }\n    .md-chips .md-chip-input-container md-autocomplete {\n      box-shadow: none; }\n      .md-chips .md-chip-input-container md-autocomplete input {\n        position: relative; }\n    .md-chips .md-chip-input-container input {\n      border: 0;\n      height: 32px;\n      line-height: 32px;\n      padding: 0; }\n      .md-chips .md-chip-input-container input:focus {\n        outline: none; }\n    .md-chips .md-chip-input-container md-autocomplete, .md-chips .md-chip-input-container md-autocomplete-wrap {\n      height: 32px; }\n    .md-chips .md-chip-input-container md-autocomplete {\n      box-shadow: none; }\n      .md-chips .md-chip-input-container md-autocomplete input {\n        position: relative; }\n    .md-chips .md-chip-input-container:not(:first-child) {\n      margin: 8px 8px 0 0; }\n    .md-chips .md-chip-input-container input {\n      background: transparent;\n      border-width: 0; }\n  .md-chips md-autocomplete button {\n    display: none; }\n\nmd-content {\n  display: block;\n  position: relative;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch; }\n  md-content[md-scroll-y] {\n    overflow-y: auto;\n    overflow-x: hidden; }\n  md-content[md-scroll-x] {\n    overflow-x: auto;\n    overflow-y: hidden; }\n  md-content.autoScroll {\n    -webkit-overflow-scrolling: auto; }\n\n.md-dialog-is-showing {\n  max-height: 100%; }\n\n.md-dialog-container {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 80; }\n\nmd-dialog {\n  opacity: 0;\n  min-width: 240px;\n  max-width: 80%;\n  max-height: 80%;\n  position: relative;\n  overflow: hidden;\n  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n  md-dialog.transition-in {\n    opacity: 1;\n    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n    -webkit-transform: translate3d(0, 0, 0) scale(1);\n            transform: translate3d(0, 0, 0) scale(1); }\n  md-dialog.transition-out {\n    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n    -webkit-transform: translate3d(0, 100%, 0) scale(0.2);\n            transform: translate3d(0, 100%, 0) scale(0.2); }\n  md-dialog > form {\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    overflow: auto; }\n  md-dialog md-dialog-content {\n    -webkit-order: 1;\n        -ms-flex-order: 1;\n            order: 1;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    padding: 24px;\n    overflow: auto;\n    -webkit-overflow-scrolling: touch; }\n    md-dialog md-dialog-content:not([layout=row]) > *:first-child:not(.md-subheader) {\n      margin-top: 0; }\n    md-dialog md-dialog-content:focus {\n      outline: none; }\n    md-dialog md-dialog-content .md-subheader {\n      margin: 0; }\n      md-dialog md-dialog-content .md-subheader.sticky-clone {\n        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16); }\n    md-dialog md-dialog-content.sticky-container {\n      padding: 0; }\n      md-dialog md-dialog-content.sticky-container > div {\n        padding: 24px;\n        padding-top: 0; }\n  md-dialog .md-actions {\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-order: 2;\n        -ms-flex-order: 2;\n            order: 2;\n    box-sizing: border-box;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    margin-bottom: 0;\n    padding-right: 8px;\n    padding-left: 16px;\n    min-height: 52px; }\n    md-dialog .md-actions .md-button {\n      margin-bottom: 8px;\n      margin-left: 8px;\n      margin-right: 0;\n      margin-top: 8px; }\n  md-dialog.md-content-overflow .md-actions {\n    border-top: 1px solid; }\n\n@media screen and (-ms-high-contrast: active) {\n  md-dialog {\n    border: 1px solid #fff; } }\n\nmd-divider {\n  display: block;\n  border-top: 1px solid;\n  margin: 0; }\n  md-divider[md-inset] {\n    margin-left: 80px; }\n\nmd-grid-list {\n  box-sizing: border-box;\n  display: block;\n  position: relative; }\n  md-grid-list *, md-grid-list *:before, md-grid-list *:after {\n    box-sizing: border-box; }\n  md-grid-list md-grid-tile {\n    display: block;\n    position: absolute; }\n    md-grid-list md-grid-tile figure {\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-align-items: center;\n          -ms-flex-align: center;\n              align-items: center;\n      -webkit-justify-content: center;\n          -ms-flex-pack: center;\n              justify-content: center;\n      height: 100%;\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      padding: 0;\n      margin: 0; }\n    md-grid-list md-grid-tile md-grid-tile-header, md-grid-list md-grid-tile md-grid-tile-footer {\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-flex-direction: row;\n          -ms-flex-direction: row;\n              flex-direction: row;\n      -webkit-align-items: center;\n          -ms-flex-align: center;\n              align-items: center;\n      height: 48px;\n      color: #fff;\n      background: rgba(0, 0, 0, 0.18);\n      overflow: hidden;\n      position: absolute;\n      left: 0;\n      right: 0; }\n      md-grid-list md-grid-tile md-grid-tile-header h3, md-grid-list md-grid-tile md-grid-tile-header h4, md-grid-list md-grid-tile md-grid-tile-footer h3, md-grid-list md-grid-tile md-grid-tile-footer h4 {\n        font-weight: 400;\n        margin: 0 0 0 16px; }\n      md-grid-list md-grid-tile md-grid-tile-header h3, md-grid-list md-grid-tile md-grid-tile-footer h3 {\n        font-size: 14px; }\n      md-grid-list md-grid-tile md-grid-tile-header h4, md-grid-list md-grid-tile md-grid-tile-footer h4 {\n        font-size: 12px; }\n    md-grid-list md-grid-tile md-grid-tile-header {\n      top: 0; }\n    md-grid-list md-grid-tile md-grid-tile-footer {\n      bottom: 0; }\n\n@media screen and (-ms-high-contrast: active) {\n  md-grid-tile {\n    border: 1px solid #fff; }\n  md-grid-tile-footer {\n    border-top: 1px solid #fff; } }\n\nmd-icon {\n  margin: auto;\n  background-repeat: no-repeat no-repeat;\n  display: inline-block;\n  vertical-align: middle;\n  fill: currentColor;\n  height: 28px;\n  width: 28px; }\n  md-icon svg {\n    pointer-events: none; }\n  md-icon[md-font-icon] {\n    line-height: 1; }\n\nmd-list {\n  display: block;\n  padding: 8px 0px 8px 0px; }\n  md-list .md-subheader {\n    line-height: 0.75em; }\n\nmd-list-item.md-no-proxy, md-list-item .md-no-style {\n  position: relative;\n  padding: 0px 16px;\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  transition: background-color 0.15s linear; }\n  md-list-item.md-no-proxy.md-button, md-list-item .md-no-style.md-button {\n    font-size: inherit;\n    height: inherit;\n    text-align: left;\n    text-transform: none;\n    width: 100%;\n    white-space: normal; }\n  md-list-item.md-no-proxy:focus, md-list-item .md-no-style:focus {\n    outline: none; }\nmd-list-item.md-with-secondary {\n  position: relative; }\nmd-list-item.md-clickable:hover {\n  cursor: pointer; }\nmd-list-item md-divider {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%; }\n  md-list-item md-divider[md-inset] {\n    left: 96px;\n    width: calc(100% - 96px);\n    margin: 0; }\n\nmd-list-item, md-list-item .md-list-item-inner {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  min-height: 48px; }\n  md-list-item > div.md-primary > md-icon, md-list-item > div.md-secondary > md-icon, md-list-item > md-icon:first-child, md-list-item > md-icon.md-secondary, md-list-item .md-list-item-inner > div.md-primary > md-icon, md-list-item .md-list-item-inner > div.md-secondary > md-icon, md-list-item .md-list-item-inner > md-icon:first-child, md-list-item .md-list-item-inner > md-icon.md-secondary {\n    width: 24px;\n    margin-top: 16px;\n    margin-bottom: 12px;\n    box-sizing: content-box; }\n  md-list-item > div.md-primary > md-checkbox, md-list-item > div.md-secondary > md-checkbox, md-list-item > md-checkbox:first-child, md-list-item md-checkbox.md-secondary, md-list-item .md-list-item-inner > div.md-primary > md-checkbox, md-list-item .md-list-item-inner > div.md-secondary > md-checkbox, md-list-item .md-list-item-inner > md-checkbox:first-child, md-list-item .md-list-item-inner md-checkbox.md-secondary {\n    -webkit-align-self: center;\n        -ms-flex-item-align: center;\n            align-self: center; }\n    md-list-item > div.md-primary > md-checkbox .md-label, md-list-item > div.md-secondary > md-checkbox .md-label, md-list-item > md-checkbox:first-child .md-label, md-list-item md-checkbox.md-secondary .md-label, md-list-item .md-list-item-inner > div.md-primary > md-checkbox .md-label, md-list-item .md-list-item-inner > div.md-secondary > md-checkbox .md-label, md-list-item .md-list-item-inner > md-checkbox:first-child .md-label, md-list-item .md-list-item-inner md-checkbox.md-secondary .md-label {\n      display: none; }\n  md-list-item > md-icon:first-child, md-list-item .md-list-item-inner > md-icon:first-child {\n    margin-right: 32px; }\n  md-list-item > md-checkbox:first-child, md-list-item .md-list-item-inner > md-checkbox:first-child {\n    width: 24px;\n    margin-left: 3px;\n    margin-right: 29px; }\n  md-list-item > .md-avatar:first-child, md-list-item .md-list-item-inner > .md-avatar:first-child {\n    width: 40px;\n    height: 40px;\n    margin-top: 8px;\n    margin-bottom: 8px;\n    margin-right: 16px;\n    border-radius: 50%;\n    box-sizing: content-box; }\n  md-list-item md-checkbox.md-secondary, md-list-item md-switch.md-secondary, md-list-item .md-list-item-inner md-checkbox.md-secondary, md-list-item .md-list-item-inner md-switch.md-secondary {\n    margin-right: 0;\n    margin-top: 0;\n    margin-bottom: 0; }\n  md-list-item button.md-button.md-secondary-container, md-list-item .md-list-item-inner button.md-button.md-secondary-container {\n    background-color: transparent;\n    -webkit-align-self: center;\n        -ms-flex-item-align: center;\n            align-self: center;\n    border-radius: 50%;\n    margin: 0px;\n    min-width: 0px; }\n    md-list-item button.md-button.md-secondary-container .md-ripple, md-list-item button.md-button.md-secondary-container .md-ripple-container, md-list-item .md-list-item-inner button.md-button.md-secondary-container .md-ripple, md-list-item .md-list-item-inner button.md-button.md-secondary-container .md-ripple-container {\n      border-radius: 50%; }\n  md-list-item .md-secondary-container, md-list-item .md-secondary, md-list-item .md-list-item-inner .md-secondary-container, md-list-item .md-list-item-inner .md-secondary {\n    margin-left: 16px;\n    position: absolute;\n    right: 16px;\n    top: 50%;\n    -webkit-transform: translate3d(0, -50%, 0);\n            transform: translate3d(0, -50%, 0); }\n  md-list-item > .md-button.md-secondary-container > .md-secondary, md-list-item .md-list-item-inner > .md-button.md-secondary-container > .md-secondary {\n    margin-left: 0px;\n    position: static; }\n  md-list-item > p, md-list-item > .md-list-item-inner > p, md-list-item .md-list-item-inner > p, md-list-item .md-list-item-inner > .md-list-item-inner > p {\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    margin: 0; }\n\nmd-list-item.md-2-line, md-list-item.md-2-line > .md-no-style, md-list-item.md-3-line, md-list-item.md-3-line > .md-no-style {\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start; }\n  md-list-item.md-2-line .md-list-item-text, md-list-item.md-2-line > .md-no-style .md-list-item-text, md-list-item.md-3-line .md-list-item-text, md-list-item.md-3-line > .md-no-style .md-list-item-text {\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    padding: 16px 0;\n    text-overflow: ellipsis; }\n    md-list-item.md-2-line .md-list-item-text.md-offset, md-list-item.md-2-line > .md-no-style .md-list-item-text.md-offset, md-list-item.md-3-line .md-list-item-text.md-offset, md-list-item.md-3-line > .md-no-style .md-list-item-text.md-offset {\n      margin-left: 56px; }\n    md-list-item.md-2-line .md-list-item-text h3, md-list-item.md-2-line > .md-no-style .md-list-item-text h3, md-list-item.md-3-line .md-list-item-text h3, md-list-item.md-3-line > .md-no-style .md-list-item-text h3 {\n      margin: 0 0 6px 0;\n      line-height: 0.75em; }\n    md-list-item.md-2-line .md-list-item-text h4, md-list-item.md-2-line > .md-no-style .md-list-item-text h4, md-list-item.md-3-line .md-list-item-text h4, md-list-item.md-3-line > .md-no-style .md-list-item-text h4 {\n      font-weight: 400;\n      margin: 10px 0 5px 0;\n      line-height: 0.75em; }\n    md-list-item.md-2-line .md-list-item-text p, md-list-item.md-2-line > .md-no-style .md-list-item-text p, md-list-item.md-3-line .md-list-item-text p, md-list-item.md-3-line > .md-no-style .md-list-item-text p {\n      margin: 0 0 0px 0;\n      line-height: 1.6em; }\n\nmd-list-item.md-2-line > .md-avatar:first-child, md-list-item.md-2-line > .md-no-style > .md-avatar:first-child {\n  margin-top: 12px; }\nmd-list-item.md-2-line > md-icon:first-child, md-list-item.md-2-line > .md-no-style > md-icon:first-child {\n  -webkit-align-self: flex-start;\n      -ms-flex-item-align: start;\n          align-self: flex-start; }\nmd-list-item.md-2-line .md-list-item-text, md-list-item.md-2-line > .md-no-style .md-list-item-text {\n  -webkit-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  padding-top: 19px; }\n\nmd-list-item.md-3-line > md-icon:first-child, md-list-item.md-3-line > .md-avatar:first-child, md-list-item.md-3-line > .md-no-style > md-icon:first-child, md-list-item.md-3-line > .md-no-style > .md-avatar:first-child {\n  margin-top: 16px; }\n\nmd-input-container {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding: 2px;\n  padding-bottom: 26px;\n  /*\n   * The .md-input class is added to the input/textarea\n   */ }\n  md-input-container > md-icon {\n    position: absolute;\n    top: 5px;\n    left: 2px; }\n    md-input-container > md-icon + input {\n      margin-left: 36px; }\n  md-input-container textarea, md-input-container input[type=\"text\"], md-input-container input[type=\"password\"], md-input-container input[type=\"datetime\"], md-input-container input[type=\"datetime-local\"], md-input-container input[type=\"date\"], md-input-container input[type=\"month\"], md-input-container input[type=\"time\"], md-input-container input[type=\"week\"], md-input-container input[type=\"number\"], md-input-container input[type=\"email\"], md-input-container input[type=\"url\"], md-input-container input[type=\"search\"], md-input-container input[type=\"tel\"], md-input-container input[type=\"color\"] {\n    /* remove default appearance from all input/textarea */\n    -moz-appearance: none;\n    -webkit-appearance: none; }\n  md-input-container input[type=\"date\"], md-input-container input[type=\"datetime-local\"], md-input-container input[type=\"month\"], md-input-container input[type=\"time\"], md-input-container input[type=\"week\"] {\n    min-height: 26px; }\n  md-input-container textarea {\n    resize: none;\n    overflow: hidden; }\n  md-input-container textarea.md-input {\n    min-height: 56px;\n    -ms-flex-preferred-size: auto; }\n  md-input-container label {\n    position: relative;\n    top: -2px; }\n  md-input-container label:not(.md-no-float), md-input-container .md-placeholder:not(.md-select-label) {\n    -webkit-order: 1;\n        -ms-flex-order: 1;\n            order: 1;\n    pointer-events: none;\n    -webkit-font-smoothing: antialiased;\n    padding-left: 2px;\n    z-index: 1;\n    -webkit-transform: translate3d(0, 30px, 0) scale(1);\n            transform: translate3d(0, 30px, 0) scale(1);\n    transition: -webkit-transform cubic-bezier(0.25, 0.8, 0.25, 1) 0.25s;\n    transition: transform cubic-bezier(0.25, 0.8, 0.25, 1) 0.25s;\n    -webkit-transform-origin: left top;\n            transform-origin: left top; }\n    html[dir=rtl] md-input-container label:not(.md-no-float), html[dir=rtl] md-input-container .md-placeholder:not(.md-select-label) {\n      -webkit-transform-origin: right top;\n              transform-origin: right top; }\n  md-input-container .md-placeholder:not(.md-select-label) {\n    position: absolute;\n    top: 0;\n    opacity: 0;\n    transition-property: opacity, -webkit-transform;\n    transition-property: opacity, transform;\n    -webkit-transform: translate3d(0, 30px, 0);\n            transform: translate3d(0, 30px, 0); }\n  md-input-container.md-input-focused .md-placeholder {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 24px, 0);\n            transform: translate3d(0, 24px, 0); }\n  md-input-container.md-input-has-value .md-placeholder {\n    transition: none;\n    opacity: 0; }\n  md-input-container:not(.md-input-has-value) input:not(:focus) {\n    color: transparent; }\n  md-input-container .md-input {\n    -webkit-flex: 1 1 auto;\n        -ms-flex: 1 1 auto;\n            flex: 1 1 auto;\n    -webkit-order: 2;\n        -ms-flex-order: 2;\n            order: 2;\n    display: block;\n    background: none;\n    padding-top: 2px;\n    padding-bottom: 1px;\n    padding-left: 2px;\n    padding-right: 2px;\n    border-width: 0 0 1px 0;\n    line-height: 26px;\n    -ms-flex-preferred-size: 26px;\n    border-radius: 0; }\n    md-input-container .md-input:focus {\n      outline: none; }\n    md-input-container .md-input:invalid {\n      outline: none;\n      box-shadow: none; }\n  md-input-container ng-messages, md-input-container data-ng-messages, md-input-container x-ng-messages, md-input-container [ng-messages], md-input-container [data-ng-messages], md-input-container [x-ng-messages] {\n    -webkit-order: 3;\n        -ms-flex-order: 3;\n            order: 3;\n    position: relative; }\n  md-input-container ng-message, md-input-container data-ng-message, md-input-container x-ng-message, md-input-container [ng-message], md-input-container [data-ng-message], md-input-container [x-ng-message], md-input-container .md-char-counter {\n    -webkit-font-smoothing: antialiased;\n    position: absolute;\n    font-size: 12px;\n    line-height: 24px; }\n    md-input-container ng-message:not(.md-char-counter), md-input-container data-ng-message:not(.md-char-counter), md-input-container x-ng-message:not(.md-char-counter), md-input-container [ng-message]:not(.md-char-counter), md-input-container [data-ng-message]:not(.md-char-counter), md-input-container [x-ng-message]:not(.md-char-counter), md-input-container .md-char-counter:not(.md-char-counter) {\n      padding-right: 30px; }\n    md-input-container ng-message.ng-enter, md-input-container data-ng-message.ng-enter, md-input-container x-ng-message.ng-enter, md-input-container [ng-message].ng-enter, md-input-container [data-ng-message].ng-enter, md-input-container [x-ng-message].ng-enter, md-input-container .md-char-counter.ng-enter {\n      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n      transition-delay: 0.2s; }\n    md-input-container ng-message.ng-leave, md-input-container data-ng-message.ng-leave, md-input-container x-ng-message.ng-leave, md-input-container [ng-message].ng-leave, md-input-container [data-ng-message].ng-leave, md-input-container [x-ng-message].ng-leave, md-input-container .md-char-counter.ng-leave {\n      transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2); }\n    md-input-container ng-message.ng-enter, md-input-container ng-message.ng-leave.ng-leave-active, md-input-container data-ng-message.ng-enter, md-input-container data-ng-message.ng-leave.ng-leave-active, md-input-container x-ng-message.ng-enter, md-input-container x-ng-message.ng-leave.ng-leave-active, md-input-container [ng-message].ng-enter, md-input-container [ng-message].ng-leave.ng-leave-active, md-input-container [data-ng-message].ng-enter, md-input-container [data-ng-message].ng-leave.ng-leave-active, md-input-container [x-ng-message].ng-enter, md-input-container [x-ng-message].ng-leave.ng-leave-active, md-input-container .md-char-counter.ng-enter, md-input-container .md-char-counter.ng-leave.ng-leave-active {\n      opacity: 0;\n      -webkit-transform: translate3d(0, -20%, 0);\n              transform: translate3d(0, -20%, 0); }\n    md-input-container ng-message.ng-leave, md-input-container ng-message.ng-enter.ng-enter-active, md-input-container data-ng-message.ng-leave, md-input-container data-ng-message.ng-enter.ng-enter-active, md-input-container x-ng-message.ng-leave, md-input-container x-ng-message.ng-enter.ng-enter-active, md-input-container [ng-message].ng-leave, md-input-container [ng-message].ng-enter.ng-enter-active, md-input-container [data-ng-message].ng-leave, md-input-container [data-ng-message].ng-enter.ng-enter-active, md-input-container [x-ng-message].ng-leave, md-input-container [x-ng-message].ng-enter.ng-enter-active, md-input-container .md-char-counter.ng-leave, md-input-container .md-char-counter.ng-enter.ng-enter-active {\n      opacity: 1;\n      -webkit-transform: translate3d(0, 0, 0);\n              transform: translate3d(0, 0, 0); }\n  md-input-container .md-char-counter {\n    bottom: 2px;\n    right: 2px; }\n  md-input-container.md-input-focused label:not(.md-no-float), md-input-container.md-input-has-value label:not(.md-no-float) {\n    -webkit-transform: translate3d(0, 6px, 0) scale(0.75);\n            transform: translate3d(0, 6px, 0) scale(0.75); }\n  md-input-container.md-input-focused .md-input, md-input-container .md-input.ng-invalid.ng-dirty {\n    padding-bottom: 0;\n    border-width: 0 0 2px 0; }\n  md-input-container .md-input[disabled], [disabled] md-input-container .md-input {\n    background-position: 0 bottom;\n    background-size: 3px 1px;\n    background-repeat: repeat-x; }\n\nmd-input-container.md-icon-float {\n  margin-top: -16px;\n  transition: margin-top 0.5s cubic-bezier(0.25, 0.8, 0.25, 1); }\n  md-input-container.md-icon-float > label {\n    pointer-events: none;\n    position: absolute;\n    margin-left: 36px; }\n  md-input-container.md-icon-float > md-icon {\n    top: 26px;\n    left: 2px; }\n    md-input-container.md-icon-float > md-icon + input {\n      margin-left: 36px; }\n  md-input-container.md-icon-float > input {\n    padding-top: 24px; }\n  md-input-container.md-icon-float.md-input-focused, md-input-container.md-icon-float.md-input-has-value {\n    margin-top: -8px; }\n    md-input-container.md-icon-float.md-input-focused label, md-input-container.md-icon-float.md-input-has-value label {\n      -webkit-transform: translate3d(0, 6px, 0) scale(0.75);\n              transform: translate3d(0, 6px, 0) scale(0.75);\n      transition: -webkit-transform cubic-bezier(0.25, 0.8, 0.25, 1) 0.5s;\n      transition: transform cubic-bezier(0.25, 0.8, 0.25, 1) 0.5s; }\n\n@media screen and (-ms-high-contrast: active) {\n  md-input-container.md-default-theme > md-icon {\n    fill: #fff; } }\n\n@-webkit-keyframes outer-rotate {\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes outer-rotate {\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@-webkit-keyframes left-wobble {\n  0%, 100% {\n    -webkit-transform: rotate(130deg);\n            transform: rotate(130deg); }\n\n  50% {\n    -webkit-transform: rotate(-5deg);\n            transform: rotate(-5deg); } }\n\n@keyframes left-wobble {\n  0%, 100% {\n    -webkit-transform: rotate(130deg);\n            transform: rotate(130deg); }\n\n  50% {\n    -webkit-transform: rotate(-5deg);\n            transform: rotate(-5deg); } }\n\n@-webkit-keyframes right-wobble {\n  0%, 100% {\n    -webkit-transform: rotate(-130deg);\n            transform: rotate(-130deg); }\n\n  50% {\n    -webkit-transform: rotate(5deg);\n            transform: rotate(5deg); } }\n\n@keyframes right-wobble {\n  0%, 100% {\n    -webkit-transform: rotate(-130deg);\n            transform: rotate(-130deg); }\n\n  50% {\n    -webkit-transform: rotate(5deg);\n            transform: rotate(5deg); } }\n\n@-webkit-keyframes sporadic-rotate {\n  12.5% {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n\n  25% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg); }\n\n  37.5% {\n    -webkit-transform: rotate(405deg);\n            transform: rotate(405deg); }\n\n  50% {\n    -webkit-transform: rotate(540deg);\n            transform: rotate(540deg); }\n\n  62.5% {\n    -webkit-transform: rotate(675deg);\n            transform: rotate(675deg); }\n\n  75% {\n    -webkit-transform: rotate(810deg);\n            transform: rotate(810deg); }\n\n  87.5% {\n    -webkit-transform: rotate(945deg);\n            transform: rotate(945deg); }\n\n  100% {\n    -webkit-transform: rotate(1080deg);\n            transform: rotate(1080deg); } }\n\n@keyframes sporadic-rotate {\n  12.5% {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n\n  25% {\n    -webkit-transform: rotate(270deg);\n            transform: rotate(270deg); }\n\n  37.5% {\n    -webkit-transform: rotate(405deg);\n            transform: rotate(405deg); }\n\n  50% {\n    -webkit-transform: rotate(540deg);\n            transform: rotate(540deg); }\n\n  62.5% {\n    -webkit-transform: rotate(675deg);\n            transform: rotate(675deg); }\n\n  75% {\n    -webkit-transform: rotate(810deg);\n            transform: rotate(810deg); }\n\n  87.5% {\n    -webkit-transform: rotate(945deg);\n            transform: rotate(945deg); }\n\n  100% {\n    -webkit-transform: rotate(1080deg);\n            transform: rotate(1080deg); } }\n\nmd-progress-circular {\n  width: 50px;\n  height: 50px;\n  display: block;\n  position: relative;\n  padding-top: 0 !important;\n  margin-bottom: 0 !important;\n  overflow: hidden; }\n  md-progress-circular .md-inner {\n    width: 50px;\n    height: 50px;\n    position: relative; }\n    md-progress-circular .md-inner .md-gap {\n      position: absolute;\n      left: 24px;\n      right: 24px;\n      top: 0;\n      bottom: 0;\n      border-top: 5px solid black;\n      box-sizing: border-box; }\n    md-progress-circular .md-inner .md-left, md-progress-circular .md-inner .md-right {\n      position: absolute;\n      top: 0;\n      height: 50px;\n      width: 25px;\n      overflow: hidden; }\n      md-progress-circular .md-inner .md-left .md-half-circle, md-progress-circular .md-inner .md-right .md-half-circle {\n        position: absolute;\n        top: 0;\n        width: 50px;\n        height: 50px;\n        box-sizing: border-box;\n        border: 5px solid black;\n        border-bottom-color: transparent;\n        border-radius: 50%; }\n    md-progress-circular .md-inner .md-left {\n      left: 0; }\n      md-progress-circular .md-inner .md-left .md-half-circle {\n        left: 0;\n        border-right-color: transparent; }\n    md-progress-circular .md-inner .md-right {\n      right: 0; }\n      md-progress-circular .md-inner .md-right .md-half-circle {\n        right: 0;\n        border-left-color: transparent; }\n  md-progress-circular[value=\"0\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"0\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-135deg);\n            transform: rotate(-135deg); }\n  md-progress-circular[value=\"0\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"1\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"1\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-131.4deg);\n            transform: rotate(-131.4deg); }\n  md-progress-circular[value=\"1\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"2\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"2\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-127.8deg);\n            transform: rotate(-127.8deg); }\n  md-progress-circular[value=\"2\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"3\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"3\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-124.2deg);\n            transform: rotate(-124.2deg); }\n  md-progress-circular[value=\"3\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"4\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"4\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-120.6deg);\n            transform: rotate(-120.6deg); }\n  md-progress-circular[value=\"4\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"5\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"5\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-117deg);\n            transform: rotate(-117deg); }\n  md-progress-circular[value=\"5\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"6\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"6\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-113.4deg);\n            transform: rotate(-113.4deg); }\n  md-progress-circular[value=\"6\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"7\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"7\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-109.8deg);\n            transform: rotate(-109.8deg); }\n  md-progress-circular[value=\"7\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"8\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"8\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-106.2deg);\n            transform: rotate(-106.2deg); }\n  md-progress-circular[value=\"8\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"9\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"9\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-102.6deg);\n            transform: rotate(-102.6deg); }\n  md-progress-circular[value=\"9\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"10\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"10\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-99deg);\n            transform: rotate(-99deg); }\n  md-progress-circular[value=\"10\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"11\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"11\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-95.4deg);\n            transform: rotate(-95.4deg); }\n  md-progress-circular[value=\"11\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"12\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"12\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-91.8deg);\n            transform: rotate(-91.8deg); }\n  md-progress-circular[value=\"12\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"13\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"13\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-88.2deg);\n            transform: rotate(-88.2deg); }\n  md-progress-circular[value=\"13\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"14\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"14\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-84.6deg);\n            transform: rotate(-84.6deg); }\n  md-progress-circular[value=\"14\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"15\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"15\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-81deg);\n            transform: rotate(-81deg); }\n  md-progress-circular[value=\"15\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"16\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"16\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-77.4deg);\n            transform: rotate(-77.4deg); }\n  md-progress-circular[value=\"16\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"17\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"17\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-73.8deg);\n            transform: rotate(-73.8deg); }\n  md-progress-circular[value=\"17\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"18\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"18\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-70.2deg);\n            transform: rotate(-70.2deg); }\n  md-progress-circular[value=\"18\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"19\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"19\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-66.6deg);\n            transform: rotate(-66.6deg); }\n  md-progress-circular[value=\"19\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"20\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"20\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-63deg);\n            transform: rotate(-63deg); }\n  md-progress-circular[value=\"20\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"21\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"21\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-59.4deg);\n            transform: rotate(-59.4deg); }\n  md-progress-circular[value=\"21\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"22\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"22\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-55.8deg);\n            transform: rotate(-55.8deg); }\n  md-progress-circular[value=\"22\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"23\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"23\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-52.2deg);\n            transform: rotate(-52.2deg); }\n  md-progress-circular[value=\"23\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"24\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"24\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-48.6deg);\n            transform: rotate(-48.6deg); }\n  md-progress-circular[value=\"24\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"25\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"25\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg); }\n  md-progress-circular[value=\"25\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"26\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"26\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-41.4deg);\n            transform: rotate(-41.4deg); }\n  md-progress-circular[value=\"26\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"27\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"27\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-37.8deg);\n            transform: rotate(-37.8deg); }\n  md-progress-circular[value=\"27\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"28\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"28\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-34.2deg);\n            transform: rotate(-34.2deg); }\n  md-progress-circular[value=\"28\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"29\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"29\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-30.6deg);\n            transform: rotate(-30.6deg); }\n  md-progress-circular[value=\"29\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"30\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"30\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-27deg);\n            transform: rotate(-27deg); }\n  md-progress-circular[value=\"30\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"31\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"31\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-23.4deg);\n            transform: rotate(-23.4deg); }\n  md-progress-circular[value=\"31\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"32\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"32\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-19.8deg);\n            transform: rotate(-19.8deg); }\n  md-progress-circular[value=\"32\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"33\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"33\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-16.2deg);\n            transform: rotate(-16.2deg); }\n  md-progress-circular[value=\"33\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"34\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"34\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-12.6deg);\n            transform: rotate(-12.6deg); }\n  md-progress-circular[value=\"34\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"35\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"35\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-9deg);\n            transform: rotate(-9deg); }\n  md-progress-circular[value=\"35\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"36\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"36\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-5.4deg);\n            transform: rotate(-5.4deg); }\n  md-progress-circular[value=\"36\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"37\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"37\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(-1.8deg);\n            transform: rotate(-1.8deg); }\n  md-progress-circular[value=\"37\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"38\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"38\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(1.8deg);\n            transform: rotate(1.8deg); }\n  md-progress-circular[value=\"38\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"39\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"39\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(5.4deg);\n            transform: rotate(5.4deg); }\n  md-progress-circular[value=\"39\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"40\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"40\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(9deg);\n            transform: rotate(9deg); }\n  md-progress-circular[value=\"40\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"41\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"41\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(12.6deg);\n            transform: rotate(12.6deg); }\n  md-progress-circular[value=\"41\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"42\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"42\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(16.2deg);\n            transform: rotate(16.2deg); }\n  md-progress-circular[value=\"42\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"43\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"43\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(19.8deg);\n            transform: rotate(19.8deg); }\n  md-progress-circular[value=\"43\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"44\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"44\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(23.4deg);\n            transform: rotate(23.4deg); }\n  md-progress-circular[value=\"44\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"45\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"45\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(27deg);\n            transform: rotate(27deg); }\n  md-progress-circular[value=\"45\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"46\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"46\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(30.6deg);\n            transform: rotate(30.6deg); }\n  md-progress-circular[value=\"46\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"47\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"47\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(34.2deg);\n            transform: rotate(34.2deg); }\n  md-progress-circular[value=\"47\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"48\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"48\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(37.8deg);\n            transform: rotate(37.8deg); }\n  md-progress-circular[value=\"48\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"49\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"49\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(41.4deg);\n            transform: rotate(41.4deg); }\n  md-progress-circular[value=\"49\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"50\"] .md-inner .md-left .md-half-circle {\n    -webkit-transform: rotate(135deg);\n            transform: rotate(135deg); }\n  md-progress-circular[value=\"50\"] .md-inner .md-right .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"50\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    border-bottom-color: transparent !important; }\n  md-progress-circular[value=\"51\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(138.6deg);\n            transform: rotate(138.6deg); }\n  md-progress-circular[value=\"51\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"51\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"52\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(142.2deg);\n            transform: rotate(142.2deg); }\n  md-progress-circular[value=\"52\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"52\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"53\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(145.8deg);\n            transform: rotate(145.8deg); }\n  md-progress-circular[value=\"53\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"53\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"54\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(149.4deg);\n            transform: rotate(149.4deg); }\n  md-progress-circular[value=\"54\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"54\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"55\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(153deg);\n            transform: rotate(153deg); }\n  md-progress-circular[value=\"55\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"55\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"56\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(156.6deg);\n            transform: rotate(156.6deg); }\n  md-progress-circular[value=\"56\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"56\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"57\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(160.2deg);\n            transform: rotate(160.2deg); }\n  md-progress-circular[value=\"57\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"57\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"58\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(163.8deg);\n            transform: rotate(163.8deg); }\n  md-progress-circular[value=\"58\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"58\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"59\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(167.4deg);\n            transform: rotate(167.4deg); }\n  md-progress-circular[value=\"59\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"59\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"60\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(171deg);\n            transform: rotate(171deg); }\n  md-progress-circular[value=\"60\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"60\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"61\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(174.6deg);\n            transform: rotate(174.6deg); }\n  md-progress-circular[value=\"61\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"61\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"62\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(178.2deg);\n            transform: rotate(178.2deg); }\n  md-progress-circular[value=\"62\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"62\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"63\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(181.8deg);\n            transform: rotate(181.8deg); }\n  md-progress-circular[value=\"63\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"63\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"64\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(185.4deg);\n            transform: rotate(185.4deg); }\n  md-progress-circular[value=\"64\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"64\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"65\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(189deg);\n            transform: rotate(189deg); }\n  md-progress-circular[value=\"65\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"65\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"66\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(192.6deg);\n            transform: rotate(192.6deg); }\n  md-progress-circular[value=\"66\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"66\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"67\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(196.2deg);\n            transform: rotate(196.2deg); }\n  md-progress-circular[value=\"67\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"67\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"68\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(199.8deg);\n            transform: rotate(199.8deg); }\n  md-progress-circular[value=\"68\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"68\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"69\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(203.4deg);\n            transform: rotate(203.4deg); }\n  md-progress-circular[value=\"69\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"69\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"70\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(207deg);\n            transform: rotate(207deg); }\n  md-progress-circular[value=\"70\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"70\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"71\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(210.6deg);\n            transform: rotate(210.6deg); }\n  md-progress-circular[value=\"71\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"71\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"72\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(214.2deg);\n            transform: rotate(214.2deg); }\n  md-progress-circular[value=\"72\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"72\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"73\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(217.8deg);\n            transform: rotate(217.8deg); }\n  md-progress-circular[value=\"73\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"73\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"74\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(221.4deg);\n            transform: rotate(221.4deg); }\n  md-progress-circular[value=\"74\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"74\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"75\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(225deg);\n            transform: rotate(225deg); }\n  md-progress-circular[value=\"75\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"75\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"76\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(228.6deg);\n            transform: rotate(228.6deg); }\n  md-progress-circular[value=\"76\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"76\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"77\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(232.2deg);\n            transform: rotate(232.2deg); }\n  md-progress-circular[value=\"77\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"77\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"78\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(235.8deg);\n            transform: rotate(235.8deg); }\n  md-progress-circular[value=\"78\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"78\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"79\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(239.4deg);\n            transform: rotate(239.4deg); }\n  md-progress-circular[value=\"79\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"79\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"80\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(243deg);\n            transform: rotate(243deg); }\n  md-progress-circular[value=\"80\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"80\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"81\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(246.6deg);\n            transform: rotate(246.6deg); }\n  md-progress-circular[value=\"81\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"81\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"82\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(250.2deg);\n            transform: rotate(250.2deg); }\n  md-progress-circular[value=\"82\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"82\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"83\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(253.8deg);\n            transform: rotate(253.8deg); }\n  md-progress-circular[value=\"83\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"83\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"84\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(257.4deg);\n            transform: rotate(257.4deg); }\n  md-progress-circular[value=\"84\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"84\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"85\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(261deg);\n            transform: rotate(261deg); }\n  md-progress-circular[value=\"85\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"85\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"86\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(264.6deg);\n            transform: rotate(264.6deg); }\n  md-progress-circular[value=\"86\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"86\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"87\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(268.2deg);\n            transform: rotate(268.2deg); }\n  md-progress-circular[value=\"87\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"87\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"88\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(271.8deg);\n            transform: rotate(271.8deg); }\n  md-progress-circular[value=\"88\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"88\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"89\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(275.4deg);\n            transform: rotate(275.4deg); }\n  md-progress-circular[value=\"89\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"89\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"90\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(279deg);\n            transform: rotate(279deg); }\n  md-progress-circular[value=\"90\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"90\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"91\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(282.6deg);\n            transform: rotate(282.6deg); }\n  md-progress-circular[value=\"91\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"91\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"92\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(286.2deg);\n            transform: rotate(286.2deg); }\n  md-progress-circular[value=\"92\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"92\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"93\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(289.8deg);\n            transform: rotate(289.8deg); }\n  md-progress-circular[value=\"93\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"93\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"94\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(293.4deg);\n            transform: rotate(293.4deg); }\n  md-progress-circular[value=\"94\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"94\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"95\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(297deg);\n            transform: rotate(297deg); }\n  md-progress-circular[value=\"95\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"95\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"96\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(300.6deg);\n            transform: rotate(300.6deg); }\n  md-progress-circular[value=\"96\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"96\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"97\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(304.2deg);\n            transform: rotate(304.2deg); }\n  md-progress-circular[value=\"97\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"97\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"98\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(307.8deg);\n            transform: rotate(307.8deg); }\n  md-progress-circular[value=\"98\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"98\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"99\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(311.4deg);\n            transform: rotate(311.4deg); }\n  md-progress-circular[value=\"99\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"99\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[value=\"100\"] .md-inner .md-left .md-half-circle {\n    transition: -webkit-transform 0.1s linear;\n    transition: transform 0.1s linear;\n    -webkit-transform: rotate(315deg);\n            transform: rotate(315deg); }\n  md-progress-circular[value=\"100\"] .md-inner .md-right .md-half-circle {\n    -webkit-transform: rotate(45deg);\n            transform: rotate(45deg); }\n  md-progress-circular[value=\"100\"] .md-inner .md-gap {\n    border-bottom: 5px solid;\n    transition: border-bottom-color 0.1s linear; }\n  md-progress-circular[md-mode=indeterminate] .md-spinner-wrapper {\n    -webkit-animation: outer-rotate 2.91667s linear infinite;\n            animation: outer-rotate 2.91667s linear infinite; }\n    md-progress-circular[md-mode=indeterminate] .md-spinner-wrapper .md-inner {\n      -webkit-animation: sporadic-rotate 5.25s cubic-bezier(0.35, 0, 0.25, 1) infinite;\n              animation: sporadic-rotate 5.25s cubic-bezier(0.35, 0, 0.25, 1) infinite; }\n      md-progress-circular[md-mode=indeterminate] .md-spinner-wrapper .md-inner .md-left .md-half-circle, md-progress-circular[md-mode=indeterminate] .md-spinner-wrapper .md-inner .md-right .md-half-circle {\n        -webkit-animation-iteration-count: infinite;\n                animation-iteration-count: infinite;\n        -webkit-animation-duration: 1.3125s;\n                animation-duration: 1.3125s;\n        -webkit-animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1);\n                animation-timing-function: cubic-bezier(0.35, 0, 0.25, 1); }\n      md-progress-circular[md-mode=indeterminate] .md-spinner-wrapper .md-inner .md-left .md-half-circle {\n        -webkit-animation-name: left-wobble;\n                animation-name: left-wobble; }\n      md-progress-circular[md-mode=indeterminate] .md-spinner-wrapper .md-inner .md-right .md-half-circle {\n        -webkit-animation-name: right-wobble;\n                animation-name: right-wobble; }\n\n.ng-hide md-progress-circular[md-mode=indeterminate] .md-spinner-wrapper, md-progress-circular.ng-hide[md-mode=indeterminate] .md-spinner-wrapper {\n  -webkit-animation: none;\n          animation: none; }\n  .ng-hide md-progress-circular[md-mode=indeterminate] .md-spinner-wrapper .md-inner, md-progress-circular.ng-hide[md-mode=indeterminate] .md-spinner-wrapper .md-inner {\n    -webkit-animation: none;\n            animation: none; }\n    .ng-hide md-progress-circular[md-mode=indeterminate] .md-spinner-wrapper .md-inner .md-left .md-half-circle, md-progress-circular.ng-hide[md-mode=indeterminate] .md-spinner-wrapper .md-inner .md-left .md-half-circle {\n      -webkit-animation-name: none;\n              animation-name: none; }\n    .ng-hide md-progress-circular[md-mode=indeterminate] .md-spinner-wrapper .md-inner .md-right .md-half-circle, md-progress-circular.ng-hide[md-mode=indeterminate] .md-spinner-wrapper .md-inner .md-right .md-half-circle {\n      -webkit-animation-name: none;\n              animation-name: none; }\n\nmd-progress-linear {\n  display: block;\n  width: 100%;\n  height: 5px; }\n  md-progress-linear .md-container {\n    overflow: hidden;\n    position: relative;\n    height: 5px;\n    top: 5px;\n    -webkit-transform: translate(0, 5px) scale(1, 0);\n            transform: translate(0, 5px) scale(1, 0);\n    transition: all .3s linear; }\n  md-progress-linear .md-container.md-ready {\n    -webkit-transform: translate(0, 0) scale(1, 1);\n            transform: translate(0, 0) scale(1, 1); }\n  md-progress-linear .md-bar {\n    height: 5px;\n    position: absolute;\n    width: 100%; }\n  md-progress-linear .md-bar1, md-progress-linear .md-bar2 {\n    transition: all 0.2s linear; }\n  md-progress-linear[md-mode=determinate] .md-bar1 {\n    display: none; }\n  md-progress-linear[md-mode=indeterminate] .md-bar1 {\n    -webkit-animation: indeterminate1 4s infinite linear;\n            animation: indeterminate1 4s infinite linear; }\n  md-progress-linear[md-mode=indeterminate] .md-bar2 {\n    -webkit-animation: indeterminate2 4s infinite linear;\n            animation: indeterminate2 4s infinite linear; }\n  md-progress-linear[md-mode=buffer] .md-container {\n    background-color: transparent !important; }\n  md-progress-linear[md-mode=buffer] .md-dashed:before {\n    content: \"\";\n    display: block;\n    height: 5px;\n    width: 100%;\n    margin-top: 0;\n    position: absolute;\n    background-color: transparent;\n    background-size: 10px 10px !important;\n    background-position: 0px -23px;\n    -webkit-animation: buffer 3s infinite linear;\n            animation: buffer 3s infinite linear; }\n  md-progress-linear[md-mode=query] .md-bar2 {\n    -webkit-animation: query .8s infinite cubic-bezier(0.39, 0.575, 0.565, 1);\n            animation: query .8s infinite cubic-bezier(0.39, 0.575, 0.565, 1); }\n\n@-webkit-keyframes indeterminate1 {\n  0% {\n    -webkit-transform: translateX(-25%) scale(.5, 1);\n            transform: translateX(-25%) scale(.5, 1); }\n\n  10% {\n    -webkit-transform: translateX(25%) scale(.5, 1);\n            transform: translateX(25%) scale(.5, 1); }\n\n  19.99% {\n    -webkit-transform: translateX(50%) scale(0, 1);\n            transform: translateX(50%) scale(0, 1); }\n\n  20% {\n    -webkit-transform: translateX(-37.5%) scale(.25, 1);\n            transform: translateX(-37.5%) scale(.25, 1); }\n\n  30% {\n    -webkit-transform: translateX(37.5%) scale(.25, 1);\n            transform: translateX(37.5%) scale(.25, 1); }\n\n  34.99% {\n    -webkit-transform: translateX(50%) scale(0, 1);\n            transform: translateX(50%) scale(0, 1); }\n\n  36.99% {\n    -webkit-transform: translateX(50%) scale(0, 1);\n            transform: translateX(50%) scale(0, 1); }\n\n  37% {\n    -webkit-transform: translateX(-37.5%) scale(.25, 1);\n            transform: translateX(-37.5%) scale(.25, 1); }\n\n  47% {\n    -webkit-transform: translateX(20%) scale(.25, 1);\n            transform: translateX(20%) scale(.25, 1); }\n\n  52% {\n    -webkit-transform: translateX(35%) scale(.05, 1);\n            transform: translateX(35%) scale(.05, 1); }\n\n  55% {\n    -webkit-transform: translateX(35%) scale(.1, 1);\n            transform: translateX(35%) scale(.1, 1); }\n\n  58% {\n    -webkit-transform: translateX(50%) scale(.1, 1);\n            transform: translateX(50%) scale(.1, 1); }\n\n  61.99% {\n    -webkit-transform: translateX(50%) scale(0, 1);\n            transform: translateX(50%) scale(0, 1); }\n\n  69.99% {\n    -webkit-transform: translateX(50%) scale(0, 1);\n            transform: translateX(50%) scale(0, 1); }\n\n  70% {\n    -webkit-transform: translateX(-37.5%) scale(.25, 1);\n            transform: translateX(-37.5%) scale(.25, 1); }\n\n  80% {\n    -webkit-transform: translateX(20%) scale(.25, 1);\n            transform: translateX(20%) scale(.25, 1); }\n\n  85% {\n    -webkit-transform: translateX(35%) scale(.05, 1);\n            transform: translateX(35%) scale(.05, 1); }\n\n  88% {\n    -webkit-transform: translateX(35%) scale(.1, 1);\n            transform: translateX(35%) scale(.1, 1); }\n\n  91% {\n    -webkit-transform: translateX(50%) scale(.1, 1);\n            transform: translateX(50%) scale(.1, 1); }\n\n  92.99% {\n    -webkit-transform: translateX(50%) scale(0, 1);\n            transform: translateX(50%) scale(0, 1); }\n\n  93% {\n    -webkit-transform: translateX(-50%) scale(0, 1);\n            transform: translateX(-50%) scale(0, 1); }\n\n  100% {\n    -webkit-transform: translateX(-25%) scale(.5, 1);\n            transform: translateX(-25%) scale(.5, 1); } }\n\n@keyframes indeterminate1 {\n  0% {\n    -webkit-transform: translateX(-25%) scale(.5, 1);\n            transform: translateX(-25%) scale(.5, 1); }\n\n  10% {\n    -webkit-transform: translateX(25%) scale(.5, 1);\n            transform: translateX(25%) scale(.5, 1); }\n\n  19.99% {\n    -webkit-transform: translateX(50%) scale(0, 1);\n            transform: translateX(50%) scale(0, 1); }\n\n  20% {\n    -webkit-transform: translateX(-37.5%) scale(.25, 1);\n            transform: translateX(-37.5%) scale(.25, 1); }\n\n  30% {\n    -webkit-transform: translateX(37.5%) scale(.25, 1);\n            transform: translateX(37.5%) scale(.25, 1); }\n\n  34.99% {\n    -webkit-transform: translateX(50%) scale(0, 1);\n            transform: translateX(50%) scale(0, 1); }\n\n  36.99% {\n    -webkit-transform: translateX(50%) scale(0, 1);\n            transform: translateX(50%) scale(0, 1); }\n\n  37% {\n    -webkit-transform: translateX(-37.5%) scale(.25, 1);\n            transform: translateX(-37.5%) scale(.25, 1); }\n\n  47% {\n    -webkit-transform: translateX(20%) scale(.25, 1);\n            transform: translateX(20%) scale(.25, 1); }\n\n  52% {\n    -webkit-transform: translateX(35%) scale(.05, 1);\n            transform: translateX(35%) scale(.05, 1); }\n\n  55% {\n    -webkit-transform: translateX(35%) scale(.1, 1);\n            transform: translateX(35%) scale(.1, 1); }\n\n  58% {\n    -webkit-transform: translateX(50%) scale(.1, 1);\n            transform: translateX(50%) scale(.1, 1); }\n\n  61.99% {\n    -webkit-transform: translateX(50%) scale(0, 1);\n            transform: translateX(50%) scale(0, 1); }\n\n  69.99% {\n    -webkit-transform: translateX(50%) scale(0, 1);\n            transform: translateX(50%) scale(0, 1); }\n\n  70% {\n    -webkit-transform: translateX(-37.5%) scale(.25, 1);\n            transform: translateX(-37.5%) scale(.25, 1); }\n\n  80% {\n    -webkit-transform: translateX(20%) scale(.25, 1);\n            transform: translateX(20%) scale(.25, 1); }\n\n  85% {\n    -webkit-transform: translateX(35%) scale(.05, 1);\n            transform: translateX(35%) scale(.05, 1); }\n\n  88% {\n    -webkit-transform: translateX(35%) scale(.1, 1);\n            transform: translateX(35%) scale(.1, 1); }\n\n  91% {\n    -webkit-transform: translateX(50%) scale(.1, 1);\n            transform: translateX(50%) scale(.1, 1); }\n\n  92.99% {\n    -webkit-transform: translateX(50%) scale(0, 1);\n            transform: translateX(50%) scale(0, 1); }\n\n  93% {\n    -webkit-transform: translateX(-50%) scale(0, 1);\n            transform: translateX(-50%) scale(0, 1); }\n\n  100% {\n    -webkit-transform: translateX(-25%) scale(.5, 1);\n            transform: translateX(-25%) scale(.5, 1); } }\n\n@-webkit-keyframes indeterminate2 {\n  0% {\n    -webkit-transform: translateX(-50%) scale(0, 1);\n            transform: translateX(-50%) scale(0, 1); }\n\n  25.99% {\n    -webkit-transform: translateX(-50%) scale(0, 1);\n            transform: translateX(-50%) scale(0, 1); }\n\n  28% {\n    -webkit-transform: translateX(-37.5%) scale(.25, 1);\n            transform: translateX(-37.5%) scale(.25, 1); }\n\n  38% {\n    -webkit-transform: translateX(37.5%) scale(.25, 1);\n            transform: translateX(37.5%) scale(.25, 1); }\n\n  42.99% {\n    -webkit-transform: translateX(50%) scale(0, 1);\n            transform: translateX(50%) scale(0, 1); }\n\n  46.99% {\n    -webkit-transform: translateX(50%) scale(0, 1);\n            transform: translateX(50%) scale(0, 1); }\n\n  49.99% {\n    -webkit-transform: translateX(50%) scale(0, 1);\n            transform: translateX(50%) scale(0, 1); }\n\n  50% {\n    -webkit-transform: translateX(-50%) scale(0, 1);\n            transform: translateX(-50%) scale(0, 1); }\n\n  60% {\n    -webkit-transform: translateX(-25%) scale(.5, 1);\n            transform: translateX(-25%) scale(.5, 1); }\n\n  70% {\n    -webkit-transform: translateX(25%) scale(.5, 1);\n            transform: translateX(25%) scale(.5, 1); }\n\n  79.99% {\n    -webkit-transform: translateX(50%) scale(0, 1);\n            transform: translateX(50%) scale(0, 1); } }\n\n@keyframes indeterminate2 {\n  0% {\n    -webkit-transform: translateX(-50%) scale(0, 1);\n            transform: translateX(-50%) scale(0, 1); }\n\n  25.99% {\n    -webkit-transform: translateX(-50%) scale(0, 1);\n            transform: translateX(-50%) scale(0, 1); }\n\n  28% {\n    -webkit-transform: translateX(-37.5%) scale(.25, 1);\n            transform: translateX(-37.5%) scale(.25, 1); }\n\n  38% {\n    -webkit-transform: translateX(37.5%) scale(.25, 1);\n            transform: translateX(37.5%) scale(.25, 1); }\n\n  42.99% {\n    -webkit-transform: translateX(50%) scale(0, 1);\n            transform: translateX(50%) scale(0, 1); }\n\n  46.99% {\n    -webkit-transform: translateX(50%) scale(0, 1);\n            transform: translateX(50%) scale(0, 1); }\n\n  49.99% {\n    -webkit-transform: translateX(50%) scale(0, 1);\n            transform: translateX(50%) scale(0, 1); }\n\n  50% {\n    -webkit-transform: translateX(-50%) scale(0, 1);\n            transform: translateX(-50%) scale(0, 1); }\n\n  60% {\n    -webkit-transform: translateX(-25%) scale(.5, 1);\n            transform: translateX(-25%) scale(.5, 1); }\n\n  70% {\n    -webkit-transform: translateX(25%) scale(.5, 1);\n            transform: translateX(25%) scale(.5, 1); }\n\n  79.99% {\n    -webkit-transform: translateX(50%) scale(0, 1);\n            transform: translateX(50%) scale(0, 1); } }\n\n@-webkit-keyframes query {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateX(35%) scale(.3, 1);\n            transform: translateX(35%) scale(.3, 1); }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(-50%) scale(0, 1);\n            transform: translateX(-50%) scale(0, 1); } }\n\n@keyframes query {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateX(35%) scale(.3, 1);\n            transform: translateX(35%) scale(.3, 1); }\n\n  100% {\n    opacity: 0;\n    -webkit-transform: translateX(-50%) scale(0, 1);\n            transform: translateX(-50%) scale(0, 1); } }\n\n@-webkit-keyframes buffer {\n  0% {\n    opacity: 1;\n    background-position: 0px -23px; }\n\n  50% {\n    opacity: 0; }\n\n  100% {\n    opacity: 1;\n    background-position: -200px -23px; } }\n\n@keyframes buffer {\n  0% {\n    opacity: 1;\n    background-position: 0px -23px; }\n\n  50% {\n    opacity: 0; }\n\n  100% {\n    opacity: 1;\n    background-position: -200px -23px; } }\n\nmd-radio-button, .md-switch-thumb {\n  box-sizing: border-box;\n  display: block;\n  margin: 15px;\n  white-space: nowrap;\n  cursor: pointer; }\n  md-radio-button *, md-radio-button *:before, md-radio-button *:after, .md-switch-thumb *, .md-switch-thumb *:before, .md-switch-thumb *:after {\n    box-sizing: border-box; }\n  md-radio-button input, .md-switch-thumb input {\n    display: none; }\n  md-radio-button .md-container, .md-switch-thumb .md-container {\n    position: relative;\n    top: 4px;\n    display: inline-block;\n    width: 16px;\n    height: 16px;\n    cursor: pointer; }\n    md-radio-button .md-container .md-ripple-container, .md-switch-thumb .md-container .md-ripple-container {\n      position: absolute;\n      display: block;\n      width: 48px;\n      height: 48px;\n      left: -16px;\n      top: -16px; }\n    md-radio-button .md-container:before, .md-switch-thumb .md-container:before {\n      background-color: transparent;\n      border-radius: 50%;\n      content: '';\n      position: absolute;\n      display: block;\n      height: auto;\n      left: 0;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      transition: all 0.5s;\n      width: auto; }\n  md-radio-button .md-off, .md-switch-thumb .md-off {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 16px;\n    height: 16px;\n    border: solid 2px;\n    border-radius: 50%;\n    transition: border-color ease 0.28s; }\n  md-radio-button .md-on, .md-switch-thumb .md-on {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 16px;\n    height: 16px;\n    border-radius: 50%;\n    transition: -webkit-transform ease 0.28s;\n    transition: transform ease 0.28s;\n    -webkit-transform: scale(0);\n            transform: scale(0); }\n  md-radio-button.md-checked .md-on, .md-switch-thumb.md-checked .md-on {\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5); }\n  md-radio-button .md-label, .md-switch-thumb .md-label {\n    position: relative;\n    display: inline-block;\n    margin-left: 10px;\n    margin-right: 10px;\n    vertical-align: middle;\n    white-space: normal;\n    pointer-events: none;\n    width: auto; }\n  md-radio-button .circle, .md-switch-thumb .circle {\n    border-radius: 50%; }\n\nmd-radio-group:focus {\n  outline: none; }\nmd-radio-group.md-focused .md-checked .md-container:before {\n  left: -8px;\n  top: -8px;\n  right: -8px;\n  bottom: -8px; }\n\n@media screen and (-ms-high-contrast: active) {\n  md-radio-button.md-default-theme .md-on {\n    background-color: #fff; } }\n\n.md-select-menu-container {\n  position: fixed;\n  left: 0;\n  top: 0;\n  z-index: 99;\n  opacity: 0; }\n  .md-select-menu-container:not(.md-clickable) {\n    pointer-events: none; }\n  .md-select-menu-container md-progress-circular {\n    display: table;\n    margin: 24px auto !important; }\n  .md-select-menu-container.md-active {\n    opacity: 1; }\n    .md-select-menu-container.md-active md-select-menu {\n      transition: -webkit-transform all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n      transition: transform all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n      transition-duration: 200ms; }\n      .md-select-menu-container.md-active md-select-menu > * {\n        opacity: 1;\n        transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2);\n        transition-duration: 200ms;\n        transition-delay: 100ms; }\n  .md-select-menu-container.md-leave {\n    opacity: 0;\n    transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2);\n    transition-duration: 250ms; }\n\nmd-input-container > md-select {\n  margin: 0;\n  margin-top: 3px; }\n\nmd-select {\n  display: inline-block;\n  margin-top: 0.35em;\n  margin-bottom: 0.8em;\n  margin-left: 2px;\n  margin-right: 2px; }\n  md-select:focus {\n    outline: none; }\n  md-select[disabled]:hover {\n    cursor: default; }\n  md-select:not([disabled]):hover {\n    cursor: pointer; }\n  md-select:not([disabled]).ng-invalid.ng-dirty .md-select-label {\n    border-bottom: 2px solid;\n    padding-bottom: 3px; }\n  md-select:not([disabled]):focus .md-select-label {\n    border-bottom: 2px solid;\n    padding-bottom: 3px; }\n\n.md-select-label {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding-left: 3px;\n  padding-top: 20px;\n  padding-bottom: 4px;\n  border-bottom: 1px solid;\n  position: relative;\n  box-sizing: border-box;\n  min-width: 64px; }\n  .md-select-label *:first-child {\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n    max-width: calc(100% - 2*8px); }\n  .md-select-label .md-select-icon {\n    -webkit-align-items: flex-end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n    text-align: end;\n    width: 24px;\n    margin: 0 4px; }\n  .md-select-label .md-select-icon:after {\n    display: block;\n    content: '\\25BC';\n    position: relative;\n    top: 2px;\n    speak: none;\n    -webkit-transform: scaleY(0.6) scaleX(1);\n            transform: scaleY(0.6) scaleX(1); }\n\nmd-select-menu {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  max-height: 256px;\n  min-height: 48px;\n  overflow-y: hidden;\n  -webkit-transform-origin: left top;\n          transform-origin: left top;\n  -webkit-transform: scale(1);\n          transform: scale(1); }\n  md-select-menu.md-reverse {\n    -webkit-flex-direction: column-reverse;\n        -ms-flex-direction: column-reverse;\n            flex-direction: column-reverse; }\n  md-select-menu:not(.md-overflow) md-content {\n    padding-top: 8px;\n    padding-bottom: 8px; }\n  html[dir=rtl] md-select-menu {\n    -webkit-transform-origin: right top;\n            transform-origin: right top; }\n  md-select-menu md-content {\n    min-width: 136px;\n    min-height: 48px;\n    max-height: 256px;\n    overflow-y: auto; }\n  md-select-menu > * {\n    opacity: 0; }\n\nmd-option {\n  cursor: pointer;\n  position: relative;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  width: auto;\n  padding: 0 16px 0 16px;\n  height: 48px; }\n  md-option:focus {\n    outline: none; }\n  md-option .md-text {\n    width: auto;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 16px; }\n\nmd-optgroup {\n  display: block; }\n  md-optgroup label {\n    display: block;\n    font-size: 16px;\n    text-transform: uppercase;\n    padding: 16px 8px; }\n  md-optgroup md-option {\n    padding-left: 24px; }\n\n@media screen and (-ms-high-contrast: active) {\n  .md-select-backdrop {\n    background-color: transparent; } }\n\nmd-sidenav {\n  box-sizing: border-box;\n  position: absolute;\n  width: 304px;\n  min-width: 304px;\n  max-width: 304px;\n  bottom: 0;\n  z-index: 60;\n  background-color: white;\n  overflow: auto;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n  md-sidenav *, md-sidenav *:before, md-sidenav *:after {\n    box-sizing: border-box; }\n  md-sidenav ul {\n    list-style: none; }\n  md-sidenav.md-closed {\n    display: none; }\n  md-sidenav.md-closed-add, md-sidenav.md-closed-remove {\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    /* this is required as of 1.3x to properly\n       apply all styling in a show/hide animation */\n    transition: 0s all; }\n  md-sidenav.md-closed-add.md-closed-add-active, md-sidenav.md-closed-remove.md-closed-remove-active {\n    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); }\n  md-sidenav.md-locked-open-add, md-sidenav.md-locked-open-remove {\n    position: static;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0); }\n  md-sidenav.md-locked-open {\n    width: 304px;\n    min-width: 304px;\n    max-width: 304px; }\n  md-sidenav.md-locked-open, md-sidenav.md-locked-open.md-closed, md-sidenav.md-locked-open.md-closed.md-sidenav-left, md-sidenav.md-locked-open.md-closed, md-sidenav.md-locked-open.md-closed.md-sidenav-right, md-sidenav.md-locked-open-remove.md-closed {\n    position: static;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0); }\n  md-sidenav.md-locked-open-remove-active {\n    transition: width 0.3s cubic-bezier(0.55, 0, 0.55, 0.2), min-width 0.3s cubic-bezier(0.55, 0, 0.55, 0.2);\n    width: 0;\n    min-width: 0; }\n  md-sidenav.md-closed.md-locked-open-add {\n    width: 0;\n    min-width: 0;\n    -webkit-transform: translate3d(0%, 0, 0);\n            transform: translate3d(0%, 0, 0); }\n  md-sidenav.md-closed.md-locked-open-add-active {\n    transition: width 0.3s cubic-bezier(0.55, 0, 0.55, 0.2), min-width 0.3s cubic-bezier(0.55, 0, 0.55, 0.2);\n    width: 304px;\n    min-width: 304px;\n    -webkit-transform: translate3d(0%, 0, 0);\n            transform: translate3d(0%, 0, 0); }\n\n.md-sidenav-backdrop.md-locked-open {\n  display: none; }\n\n.md-sidenav-left, md-sidenav {\n  left: 0;\n  top: 0;\n  -webkit-transform: translate3d(0%, 0, 0);\n          transform: translate3d(0%, 0, 0); }\n  .md-sidenav-left.md-closed, md-sidenav.md-closed {\n    -webkit-transform: translate3d(-100%, 0, 0);\n            transform: translate3d(-100%, 0, 0); }\n\n.md-sidenav-right {\n  left: 100%;\n  top: 0;\n  -webkit-transform: translate3d(-100%, 0, 0);\n          transform: translate3d(-100%, 0, 0); }\n  .md-sidenav-right.md-closed {\n    -webkit-transform: translate3d(0%, 0, 0);\n            transform: translate3d(0%, 0, 0); }\n\n@media (max-width: 360px) {\n  md-sidenav {\n    width: 85%; } }\n\n@media screen and (-ms-high-contrast: active) {\n  .md-sidenav-left, md-sidenav {\n    border-right: 1px solid #fff; }\n  .md-sidenav-right {\n    border-left: 1px solid #fff; } }\n\n@-webkit-keyframes sliderFocusThumb {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale(0);\n            transform: scale(0); }\n\n  50% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; }\n\n  100% {\n    opacity: 0; } }\n\n@keyframes sliderFocusThumb {\n  0% {\n    opacity: 0;\n    -webkit-transform: scale(0);\n            transform: scale(0); }\n\n  50% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; }\n\n  100% {\n    opacity: 0; } }\n\nmd-slider {\n  height: 48px;\n  position: relative;\n  display: block;\n  margin-left: 4px;\n  margin-right: 4px;\n  padding: 0;\n  /**\n   * Track\n   */\n  /**\n   * Slider thumb\n   */\n  /* The sign that's focused in discrete mode */\n  /**\n   * The border/background that comes in when focused in non-discrete mode\n   */\n  /* Don't animate left/right while panning */ }\n  md-slider *, md-slider *:after {\n    box-sizing: border-box; }\n  md-slider .md-slider-wrapper {\n    position: relative; }\n  md-slider .md-track-container {\n    width: 100%;\n    position: absolute;\n    top: 23px;\n    height: 2px; }\n  md-slider .md-track {\n    position: absolute;\n    left: 0;\n    right: 0;\n    height: 100%; }\n  md-slider .md-track-fill {\n    transition: width 0.05s linear; }\n  md-slider .md-track-ticks {\n    position: absolute;\n    left: 0;\n    right: 0;\n    height: 100%; }\n  md-slider .md-thumb-container {\n    position: absolute;\n    left: 0;\n    top: 50%;\n    -webkit-transform: translate3d(-50%, -50%, 0);\n            transform: translate3d(-50%, -50%, 0);\n    transition: left 0.1s linear; }\n  md-slider .md-thumb {\n    z-index: 1;\n    position: absolute;\n    left: -19px;\n    top: 5px;\n    width: 38px;\n    height: 38px;\n    border-radius: 38px;\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    transition: all 0.1s linear; }\n    md-slider .md-thumb:after {\n      content: '';\n      position: absolute;\n      left: 3px;\n      top: 3px;\n      width: 32px;\n      height: 32px;\n      border-radius: 32px;\n      border: 3px solid; }\n  md-slider .md-sign {\n    /* Center the children (slider-thumb-text) */\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    position: absolute;\n    left: -14px;\n    top: -20px;\n    width: 28px;\n    height: 28px;\n    border-radius: 28px;\n    -webkit-transform: scale(0.4) translate3d(0, 70px, 0);\n            transform: scale(0.4) translate3d(0, 70px, 0);\n    transition: all 0.2s ease-in-out;\n    /* The arrow pointing down under the sign */ }\n    md-slider .md-sign:after {\n      position: absolute;\n      content: '';\n      left: 0px;\n      border-radius: 16px;\n      top: 19px;\n      border-left: 14px solid transparent;\n      border-right: 14px solid transparent;\n      border-top: 16px solid;\n      opacity: 0;\n      -webkit-transform: translate3d(0, -8px, 0);\n              transform: translate3d(0, -8px, 0);\n      transition: all 0.2s ease-in-out; }\n    md-slider .md-sign .md-thumb-text {\n      z-index: 1;\n      font-size: 12px;\n      font-weight: bold; }\n  md-slider .md-focus-thumb {\n    position: absolute;\n    left: -24px;\n    top: 0px;\n    width: 48px;\n    height: 48px;\n    border-radius: 48px;\n    display: none;\n    opacity: 0;\n    background-color: #C0C0C0;\n    -webkit-animation: sliderFocusThumb 0.4s linear;\n            animation: sliderFocusThumb 0.4s linear; }\n  md-slider .md-focus-ring {\n    position: absolute;\n    left: -24px;\n    top: 0px;\n    width: 48px;\n    height: 48px;\n    border-radius: 48px;\n    border: 2px solid #D6D6D6;\n    background-color: transparent;\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    transition: all 0.2s linear; }\n  md-slider .md-disabled-thumb {\n    position: absolute;\n    left: -22px;\n    top: 2px;\n    width: 44px;\n    height: 44px;\n    border-radius: 44px;\n    -webkit-transform: scale(0.35);\n            transform: scale(0.35);\n    border: 6px solid;\n    display: none; }\n  md-slider.md-min .md-thumb:after {\n    background-color: white; }\n  md-slider.md-min .md-sign {\n    opacity: 0; }\n  md-slider:focus {\n    outline: none; }\n  md-slider.dragging .md-thumb-container, md-slider.dragging .md-track-fill {\n    transition: none; }\n  md-slider:not([md-discrete]) {\n    /* Hide the sign and ticks in non-discrete mode */ }\n    md-slider:not([md-discrete]) .md-track-ticks, md-slider:not([md-discrete]) .md-sign {\n      display: none; }\n    md-slider:not([md-discrete]):not([disabled]):hover .md-thumb {\n      -webkit-transform: scale(0.6);\n              transform: scale(0.6); }\n    md-slider:not([md-discrete]):not([disabled]):focus .md-focus-thumb, md-slider:not([md-discrete]):not([disabled]).active .md-focus-thumb {\n      display: block; }\n    md-slider:not([md-discrete]):not([disabled]):focus .md-focus-ring, md-slider:not([md-discrete]):not([disabled]).active .md-focus-ring {\n      -webkit-transform: scale(1);\n              transform: scale(1); }\n    md-slider:not([md-discrete]):not([disabled]):focus .md-thumb, md-slider:not([md-discrete]):not([disabled]).active .md-thumb {\n      -webkit-transform: scale(0.85);\n              transform: scale(0.85); }\n  md-slider[md-discrete] {\n    /* Hide the focus thumb in discrete mode */ }\n    md-slider[md-discrete] .md-focus-thumb, md-slider[md-discrete] .md-focus-ring {\n      display: none; }\n    md-slider[md-discrete]:not([disabled]):focus .md-sign, md-slider[md-discrete]:not([disabled]):focus .md-sign:after, md-slider[md-discrete]:not([disabled]).active .md-sign, md-slider[md-discrete]:not([disabled]).active .md-sign:after {\n      opacity: 1;\n      -webkit-transform: translate3d(0, 0, 0) scale(1);\n              transform: translate3d(0, 0, 0) scale(1); }\n  md-slider[disabled] .md-track-fill {\n    display: none; }\n  md-slider[disabled] .md-sign {\n    display: none; }\n  md-slider[disabled] .md-thumb {\n    -webkit-transform: scale(0.35);\n            transform: scale(0.35); }\n  md-slider[disabled] .md-disabled-thumb {\n    display: block; }\n\n@media screen and (-ms-high-contrast: active) {\n  md-slider.md-default-theme .md-track {\n    border-bottom: 1px solid #fff; } }\n\n.md-sticky-clone {\n  z-index: 2;\n  top: 0;\n  left: 0;\n  right: 0;\n  position: absolute !important;\n  -webkit-transform: translate3d(-9999px, -9999px, 0);\n          transform: translate3d(-9999px, -9999px, 0); }\n  .md-sticky-clone[sticky-state=\"active\"] {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0); }\n    .md-sticky-clone[sticky-state=\"active\"]:not(.md-sticky-no-effect) .md-subheader-inner {\n      -webkit-animation: subheaderStickyHoverIn 0.3s ease-out both;\n              animation: subheaderStickyHoverIn 0.3s ease-out both; }\n\n@-webkit-keyframes subheaderStickyHoverIn {\n  0% {\n    box-shadow: 0 0 0 0 transparent; }\n\n  100% {\n    box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.16); } }\n\n@keyframes subheaderStickyHoverIn {\n  0% {\n    box-shadow: 0 0 0 0 transparent; }\n\n  100% {\n    box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.16); } }\n\n@-webkit-keyframes subheaderStickyHoverOut {\n  0% {\n    box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.16); }\n\n  100% {\n    box-shadow: 0 0 0 0 transparent; } }\n\n@keyframes subheaderStickyHoverOut {\n  0% {\n    box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.16); }\n\n  100% {\n    box-shadow: 0 0 0 0 transparent; } }\n\n.md-subheader {\n  display: block;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 1em;\n  margin: 0 0 0 0;\n  margin-right: 16px;\n  position: relative; }\n  .md-subheader .md-subheader-inner {\n    padding: 16px 0px 16px 16px; }\n  .md-subheader:not(.md-sticky-no-effect) {\n    transition: 0.2s ease-out margin; }\n    .md-subheader:not(.md-sticky-no-effect):after {\n      position: absolute;\n      left: 0;\n      bottom: 0;\n      top: 0;\n      right: -16px;\n      content: ''; }\n    .md-subheader:not(.md-sticky-no-effect).md-sticky-clone {\n      z-index: 2; }\n    .md-subheader:not(.md-sticky-no-effect)[sticky-state=\"active\"] {\n      margin-top: -2px; }\n    .md-subheader:not(.md-sticky-no-effect):not(.md-sticky-clone)[sticky-prev-state=\"active\"] .md-subheader-inner:after {\n      -webkit-animation: subheaderStickyHoverOut 0.3s ease-out both;\n              animation: subheaderStickyHoverOut 0.3s ease-out both; }\n  .md-subheader .md-subheader-content {\n    z-index: 1;\n    position: relative; }\n\nmd-switch {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin: 15px;\n  white-space: nowrap;\n  cursor: pointer;\n  outline: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none; }\n  md-switch .md-container {\n    cursor: -webkit-grab;\n    cursor: grab;\n    width: 36px;\n    height: 24px;\n    position: relative;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n    margin-right: 8px; }\n  md-switch:not([disabled]) .md-dragging, md-switch:not([disabled]).md-dragging .md-container {\n    cursor: -webkit-grabbing;\n    cursor: grabbing; }\n  md-switch.md-focused:not([disabled]) .md-thumb:before {\n    left: -8px;\n    top: -8px;\n    right: -8px;\n    bottom: -8px; }\n  md-switch.md-focused:not([disabled]):not(.md-checked) .md-thumb:before {\n    background-color: rgba(0, 0, 0, 0.12); }\n  md-switch .md-label {\n    border-color: transparent;\n    border-width: 0; }\n  md-switch .md-bar {\n    left: 1px;\n    width: 34px;\n    top: 5px;\n    height: 14px;\n    border-radius: 8px;\n    position: absolute; }\n  md-switch .md-thumb-container {\n    top: 2px;\n    left: 0;\n    width: 16px;\n    position: absolute;\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n    z-index: 1; }\n  md-switch.md-checked .md-thumb-container {\n    -webkit-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0); }\n  md-switch .md-thumb {\n    position: absolute;\n    margin: 0;\n    left: 0;\n    top: 0;\n    outline: none;\n    height: 20px;\n    width: 20px;\n    border-radius: 50%;\n    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); }\n    md-switch .md-thumb:before {\n      background-color: transparent;\n      border-radius: 50%;\n      content: '';\n      position: absolute;\n      display: block;\n      height: auto;\n      left: 0;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      transition: all 0.5s;\n      width: auto; }\n    md-switch .md-thumb .md-ripple-container {\n      position: absolute;\n      display: block;\n      width: auto;\n      height: auto;\n      left: -20px;\n      top: -20px;\n      right: -20px;\n      bottom: -20px; }\n  md-switch:not(.md-dragging) .md-bar, md-switch:not(.md-dragging) .md-thumb-container, md-switch:not(.md-dragging) .md-thumb {\n    transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n    transition-property: -webkit-transform, background-color;\n    transition-property: transform, background-color; }\n  md-switch:not(.md-dragging) .md-bar, md-switch:not(.md-dragging) .md-thumb {\n    transition-delay: 0.05s; }\n\n@media screen and (-ms-high-contrast: active) {\n  md-switch.md-default-theme .md-bar {\n    background-color: #666; }\n  md-switch.md-default-theme.md-checked .md-bar {\n    background-color: #9E9E9E; }\n  md-switch.md-default-theme .md-thumb {\n    background-color: #fff; } }\n\n@-webkit-keyframes md-tab-content-hide {\n  0% {\n    opacity: 1; }\n\n  50% {\n    opacity: 1; }\n\n  100% {\n    opacity: 0; } }\n\n@keyframes md-tab-content-hide {\n  0% {\n    opacity: 1; }\n\n  50% {\n    opacity: 1; }\n\n  100% {\n    opacity: 0; } }\n\nmd-tab-data {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: -1;\n  opacity: 0; }\n\nmd-tabs {\n  display: block;\n  margin: 0;\n  border-radius: 2px;\n  overflow: hidden;\n  position: relative; }\n  md-tabs.ng-animate {\n    transition: height 0.5s cubic-bezier(0.35, 0, 0.25, 1); }\n  md-tabs:not(.md-no-tab-content):not([md-dynamic-height]) {\n    min-height: 248px; }\n  md-tabs[md-align-tabs=\"bottom\"] md-tabs-wrapper {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    height: 48px; }\n  md-tabs[md-align-tabs=\"bottom\"] md-tabs-content-wrapper {\n    top: 0;\n    bottom: 48px; }\n  md-tabs[md-dynamic-height] md-tabs-content-wrapper {\n    min-height: 0;\n    position: relative;\n    top: auto;\n    left: auto;\n    right: auto;\n    bottom: auto;\n    overflow: visible; }\n  md-tabs[md-dynamic-height] md-tab-content.md-active {\n    position: relative; }\n  md-tabs[md-border-bottom] md-tabs-wrapper {\n    border-width: 0 0 1px;\n    border-style: solid; }\n    md-tabs[md-border-bottom] md-tabs-wrapper .md-tab {\n      padding-bottom: 11px; }\n\nmd-tabs-wrapper {\n  display: block;\n  position: relative; }\n  md-tabs-wrapper md-prev-button, md-tabs-wrapper md-next-button {\n    height: 100%;\n    width: 32px;\n    position: absolute;\n    top: 50%;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%);\n    line-height: 1em;\n    z-index: 2;\n    cursor: pointer;\n    font-size: 16px;\n    background: transparent no-repeat center center;\n    transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1); }\n    md-tabs-wrapper md-prev-button:focus, md-tabs-wrapper md-next-button:focus {\n      outline: none; }\n    md-tabs-wrapper md-prev-button.md-disabled, md-tabs-wrapper md-next-button.md-disabled {\n      opacity: 0.25;\n      cursor: default; }\n    md-tabs-wrapper md-prev-button.ng-leave, md-tabs-wrapper md-next-button.ng-leave {\n      transition: none; }\n    md-tabs-wrapper md-prev-button md-icon, md-tabs-wrapper md-next-button md-icon {\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      -webkit-transform: translate3d(-50%, -50%, 0);\n              transform: translate3d(-50%, -50%, 0); }\n  md-tabs-wrapper md-prev-button {\n    left: 0;\n    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE3LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPiA8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPiA8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjQgMjQiIHhtbDpzcGFjZT0icHJlc2VydmUiPiA8ZyBpZD0iSGVhZGVyIj4gPGc+IDxyZWN0IHg9Ii02MTgiIHk9Ii0xMjA4IiBmaWxsPSJub25lIiB3aWR0aD0iMTQwMCIgaGVpZ2h0PSIzNjAwIi8+IDwvZz4gPC9nPiA8ZyBpZD0iTGFiZWwiPiA8L2c+IDxnIGlkPSJJY29uIj4gPGc+IDxwb2x5Z29uIHBvaW50cz0iMTUuNCw3LjQgMTQsNiA4LDEyIDE0LDE4IDE1LjQsMTYuNiAxMC44LDEyIAkJIiBzdHlsZT0iZmlsbDp3aGl0ZTsiLz4gPHJlY3QgZmlsbD0ibm9uZSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ii8+IDwvZz4gPC9nPiA8ZyBpZD0iR3JpZCIgZGlzcGxheT0ibm9uZSI+IDxnIGRpc3BsYXk9ImlubGluZSI+IDwvZz4gPC9nPiA8L3N2Zz4NCg=='); }\n  md-tabs-wrapper md-next-button {\n    right: 0;\n    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE3LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPiA8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPiA8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjQgMjQiIHhtbDpzcGFjZT0icHJlc2VydmUiPiA8ZyBpZD0iSGVhZGVyIj4gPGc+IDxyZWN0IHg9Ii02MTgiIHk9Ii0xMzM2IiBmaWxsPSJub25lIiB3aWR0aD0iMTQwMCIgaGVpZ2h0PSIzNjAwIi8+IDwvZz4gPC9nPiA8ZyBpZD0iTGFiZWwiPiA8L2c+IDxnIGlkPSJJY29uIj4gPGc+IDxwb2x5Z29uIHBvaW50cz0iMTAsNiA4LjYsNy40IDEzLjIsMTIgOC42LDE2LjYgMTAsMTggMTYsMTIgCQkiIHN0eWxlPSJmaWxsOndoaXRlOyIvPiA8cmVjdCBmaWxsPSJub25lIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiLz4gPC9nPiA8L2c+IDxnIGlkPSJHcmlkIiBkaXNwbGF5PSJub25lIj4gPGcgZGlzcGxheT0iaW5saW5lIj4gPC9nPiA8L2c+IDwvc3ZnPg0K'); }\n    md-tabs-wrapper md-next-button md-icon {\n      -webkit-transform: translate3d(-50%, -50%, 0) rotate(180deg);\n              transform: translate3d(-50%, -50%, 0) rotate(180deg); }\n  md-tabs-wrapper.md-stretch-tabs md-pagination-wrapper {\n    width: 100%;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row; }\n    md-tabs-wrapper.md-stretch-tabs md-pagination-wrapper md-tab-item {\n      -webkit-flex: 1;\n          -ms-flex: 1;\n              flex: 1; }\n\nmd-tabs-canvas {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  height: 48px; }\n  md-tabs-canvas:after {\n    content: '';\n    display: table;\n    clear: both; }\n  md-tabs-canvas .md-dummy-wrapper {\n    position: absolute;\n    top: 0;\n    left: 0; }\n  md-tabs-canvas.md-paginated {\n    margin: 0 32px; }\n  md-tabs-canvas.md-center-tabs {\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n\nmd-pagination-wrapper {\n  height: 48px;\n  display: block;\n  transition: left 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n  position: absolute;\n  width: 999999px;\n  left: 0;\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0); }\n  md-pagination-wrapper:after {\n    content: '';\n    display: table;\n    clear: both; }\n  md-pagination-wrapper.md-center-tabs {\n    position: relative;\n    width: initial;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    margin: 0 auto; }\n\nmd-tabs-content-wrapper {\n  display: block;\n  position: absolute;\n  top: 48px;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow: hidden; }\n\nmd-tab-content {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  -webkit-transform: translateX(0);\n          transform: translateX(0);\n  transition: -webkit-transform 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n  transition: transform 0.5s cubic-bezier(0.35, 0, 0.25, 1);\n  overflow: auto; }\n  md-tab-content.md-no-scroll {\n    bottom: auto;\n    overflow: hidden; }\n  md-tab-content.ng-leave, md-tab-content.md-no-transition {\n    transition: none; }\n  md-tab-content.md-left {\n    -webkit-transform: translateX(-100%);\n            transform: translateX(-100%);\n    -webkit-animation: 1s md-tab-content-hide;\n            animation: 1s md-tab-content-hide;\n    opacity: 0; }\n    md-tab-content.md-left * {\n      transition: visibility 0s linear;\n      transition-delay: 0.5s;\n      visibility: hidden; }\n  md-tab-content.md-right {\n    -webkit-transform: translateX(100%);\n            transform: translateX(100%);\n    -webkit-animation: 1s md-tab-content-hide;\n            animation: 1s md-tab-content-hide;\n    opacity: 0; }\n    md-tab-content.md-right * {\n      transition: visibility 0s linear;\n      transition-delay: 0.5s;\n      visibility: hidden; }\n\nmd-ink-bar {\n  position: absolute;\n  left: auto;\n  right: auto;\n  bottom: 0;\n  height: 2px; }\n  md-ink-bar.md-left {\n    transition: left 0.225s cubic-bezier(0.35, 0, 0.25, 1), right 0.5s cubic-bezier(0.35, 0, 0.25, 1); }\n  md-ink-bar.md-right {\n    transition: left 0.5s cubic-bezier(0.35, 0, 0.25, 1), right 0.225s cubic-bezier(0.35, 0, 0.25, 1); }\n\nmd-tab {\n  padding: 12px 24px 14px;\n  position: absolute;\n  z-index: -1;\n  white-space: nowrap;\n  box-shadow: none;\n  border: none;\n  left: -9999px;\n  text-transform: uppercase;\n  font-size: 14px; }\n  md-tab:after {\n    content: attr(label); }\n\n.md-tab {\n  font-size: 14px;\n  text-align: center;\n  line-height: 24px;\n  padding: 12px 24px;\n  transition: background-color 0.35s cubic-bezier(0.35, 0, 0.25, 1);\n  cursor: pointer;\n  white-space: nowrap;\n  position: relative;\n  text-transform: uppercase;\n  float: left;\n  font-weight: 500; }\n  .md-tab.md-focused {\n    box-shadow: none;\n    outline: none; }\n  .md-tab.md-active {\n    cursor: default; }\n  .md-tab.md-disabled {\n    pointer-events: none;\n    -ms-touch-action: pan-y;\n        touch-action: pan-y;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n    -webkit-user-drag: none;\n    opacity: 0.5;\n    cursor: default; }\n  .md-tab.ng-leave {\n    transition: none; }\n\nmd-toolbar + md-tabs {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0; }\n\nmd-toast {\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  position: absolute;\n  box-sizing: border-box;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  min-height: 48px;\n  padding-left: 24px;\n  padding-right: 24px;\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\n  border-radius: 2px;\n  font-size: 14px;\n  cursor: default;\n  max-width: 100%;\n  max-height: 40px;\n  height: 24px;\n  z-index: 90;\n  opacity: 1;\n  -webkit-transform: translate3d(0, 0, 0) rotateZ(0deg);\n          transform: translate3d(0, 0, 0) rotateZ(0deg);\n  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n  /* Transition differently when swiping */ }\n  md-toast.md-capsule {\n    border-radius: 24px; }\n  md-toast.ng-leave-active {\n    transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2); }\n  md-toast.md-swipeleft, md-toast.md-swiperight, md-toast.md-swipeup, md-toast.md-swipedown {\n    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); }\n  md-toast.ng-enter {\n    -webkit-transform: translate3d(0, 100%, 0);\n            transform: translate3d(0, 100%, 0);\n    opacity: 0; }\n    md-toast.ng-enter.md-top {\n      -webkit-transform: translate3d(0, -100%, 0);\n              transform: translate3d(0, -100%, 0); }\n    md-toast.ng-enter.ng-enter-active {\n      -webkit-transform: translate3d(0, 0, 0);\n              transform: translate3d(0, 0, 0);\n      opacity: 1; }\n  md-toast.ng-leave.ng-leave-active {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n            transform: translate3d(0, 100%, 0); }\n    md-toast.ng-leave.ng-leave-active.md-top {\n      -webkit-transform: translate3d(0, -100%, 0);\n              transform: translate3d(0, -100%, 0); }\n    md-toast.ng-leave.ng-leave-active.md-swipeleft {\n      -webkit-transform: translate3d(-100%, 0%, 0);\n              transform: translate3d(-100%, 0%, 0); }\n    md-toast.ng-leave.ng-leave-active.md-swiperight {\n      -webkit-transform: translate3d(100%, 0%, 0);\n              transform: translate3d(100%, 0%, 0); }\n  md-toast .md-action {\n    line-height: 19px;\n    margin-left: 24px;\n    cursor: pointer;\n    text-transform: uppercase;\n    float: right; }\n    md-toast .md-action.md-button {\n      min-width: 0; }\n\n@media (max-width: 600px) {\n  md-toast {\n    left: 0;\n    right: 0;\n    width: 100%;\n    max-width: 100%;\n    min-width: 0;\n    border-radius: 0;\n    bottom: 0; }\n    md-toast.md-top {\n      bottom: auto;\n      top: 0; } }\n\n@media (min-width: 600px) {\n  md-toast {\n    min-width: 288px;\n    /*\n     * When the toast doesn't take up the whole screen,\n     * make it rotate when the user swipes it away\n     */ }\n    md-toast.md-bottom {\n      bottom: 8px; }\n    md-toast.md-left {\n      left: 8px; }\n    md-toast.md-right {\n      right: 8px; }\n    md-toast.md-top {\n      top: 8px; }\n    md-toast.ng-leave.ng-leave-active.md-swipeleft {\n      -webkit-transform: translate3d(-100%, 25%, 0) rotateZ(-15deg);\n              transform: translate3d(-100%, 25%, 0) rotateZ(-15deg); }\n    md-toast.ng-leave.ng-leave-active.md-swiperight {\n      -webkit-transform: translate3d(100%, 25%, 0) rotateZ(15deg);\n              transform: translate3d(100%, 25%, 0) rotateZ(15deg); }\n    md-toast.ng-leave.ng-leave-active.md-top.md-swipeleft {\n      -webkit-transform: translate3d(-100%, 0, 0) rotateZ(-15deg);\n              transform: translate3d(-100%, 0, 0) rotateZ(-15deg); }\n    md-toast.ng-leave.ng-leave-active.md-top.md-swiperight {\n      -webkit-transform: translate3d(100%, 0, 0) rotateZ(15deg);\n              transform: translate3d(100%, 0, 0) rotateZ(15deg); } }\n\n@media (min-width: 1200px) {\n  md-toast {\n    max-width: 568px; } }\n\n@media screen and (-ms-high-contrast: active) {\n  md-toast {\n    border: 1px solid #fff; } }\n\nmd-toolbar {\n  box-sizing: border-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  position: relative;\n  z-index: 2;\n  font-size: 20px;\n  min-height: 64px;\n  width: 100%; }\n  md-toolbar.md-whiteframe-z1-add, md-toolbar.md-whiteframe-z1-remove {\n    transition: box-shadow 0.5s linear; }\n  md-toolbar *, md-toolbar *:before, md-toolbar *:after {\n    box-sizing: border-box; }\n  md-toolbar.md-tall {\n    height: 128px;\n    min-height: 128px;\n    max-height: 128px; }\n  md-toolbar.md-medium-tall {\n    height: 88px;\n    min-height: 88px;\n    max-height: 88px; }\n    md-toolbar.md-medium-tall .md-toolbar-tools {\n      height: 48px;\n      min-height: 48px;\n      max-height: 48px; }\n  md-toolbar .md-indent {\n    margin-left: 64px; }\n\n.md-toolbar-tools {\n  font-weight: 400;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-flex-direction: row;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  width: 100%;\n  height: 64px;\n  max-height: 64px;\n  padding: 0 16px;\n  margin: 0; }\n  .md-toolbar-tools h2, .md-toolbar-tools h3 {\n    font-size: inherit;\n    font-weight: inherit;\n    margin: inherit; }\n  .md-toolbar-tools a {\n    color: inherit;\n    text-decoration: none; }\n  .md-toolbar-tools .fill-height {\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  .md-toolbar-tools .md-button {\n    margin-top: 0;\n    margin-bottom: 0; }\n  .md-toolbar-tools > .md-button:first-child {\n    margin-left: -8px; }\n  .md-toolbar-tools > .md-button:last-child {\n    margin-right: -8px; }\n  @media screen and (-ms-high-contrast: active) {\n    .md-toolbar-tools {\n      border-bottom: 1px solid #fff; } }\n\nmd-tooltip {\n  position: absolute;\n  z-index: 100;\n  overflow: hidden;\n  pointer-events: none;\n  border-radius: 4px;\n  font-weight: 500;\n  font-size: 14px; }\n  @media screen and (min-width: 600px) {\n    md-tooltip {\n      font-size: 10px; } }\n  md-tooltip .md-background {\n    position: absolute;\n    border-radius: 50%;\n    -webkit-transform: translate(-50%, -50%) scale(0);\n            transform: translate(-50%, -50%) scale(0);\n    opacity: 1; }\n    md-tooltip .md-background.md-show-add {\n      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n      -webkit-transform: translate(-50%, -50%) scale(0);\n              transform: translate(-50%, -50%) scale(0);\n      opacity: 0; }\n    md-tooltip .md-background.md-show, md-tooltip .md-background.md-show-add-active {\n      -webkit-transform: translate(-50%, -50%) scale(1);\n              transform: translate(-50%, -50%) scale(1);\n      opacity: 1; }\n    md-tooltip .md-background.md-show-remove {\n      transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2); }\n      md-tooltip .md-background.md-show-remove.md-show-remove-active {\n        -webkit-transform: translate(-50%, -50%) scale(0);\n                transform: translate(-50%, -50%) scale(0);\n        opacity: 0; }\n  md-tooltip .md-content {\n    position: relative;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    background: transparent;\n    opacity: 0;\n    height: 32px;\n    line-height: 32px;\n    padding-left: 16px;\n    padding-right: 16px; }\n    @media screen and (min-width: 600px) {\n      md-tooltip .md-content {\n        height: 22px;\n        line-height: 22px;\n        padding-left: 8px;\n        padding-right: 8px; } }\n    md-tooltip .md-content.md-show-add {\n      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n      opacity: 0; }\n    md-tooltip .md-content.md-show, md-tooltip .md-content.md-show-add-active {\n      opacity: 1; }\n    md-tooltip .md-content.md-show-remove {\n      transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2); }\n      md-tooltip .md-content.md-show-remove.md-show-remove-active {\n        opacity: 0; }\n  md-tooltip.md-hide {\n    transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2); }\n  md-tooltip.md-show {\n    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n    pointer-events: auto;\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0); }\n\n.md-whiteframe-z1 {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-z2 {\n  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-z3 {\n  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-z4 {\n  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12); }\n\n.md-whiteframe-z5 {\n  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12); }\n\n@media screen and (-ms-high-contrast: active) {\n  md-whiteframe {\n    border: 1px solid #fff; } }\n", ""]);

/***/ },
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  chineseText: "前端开发工程师是Web前端开发工程师的简称，是近五年才真正开始受到重视的一个新兴职业。Web前端开发技术是一个先易后难的过程，主要包括三个要素：HTML（标准通用标记语言下的一个应用）、级联样式表和JavaScript，这就要求前端开发工程师不仅要掌握基本的Web前端开发技术，网站性能优化、SEO和服务器端的基础知识，而且要学会运用各种工具进行辅助开发以及理论层面的知识，包括代码的可维护性、组件的易用性、分层语义模板和浏览器分级支持等。 前端开发工程师是一个很新的职业，在国内乃至国际上真正开始受到重视的时间是从2005年开始的，是指Web前端开发工程师的简称。 Web前端开发是从美工演变而来的，名称上有很明显的时代特征。在互联网的演化进程中，Web 1.0时代，网站的主要内容都是静态的，用户使用网站的行为也以浏览为主。2005年以后，互联网进入Web 2.0时代，各种类似桌面软件的Web应用大量涌现，网站的前端由此发生了翻天覆地的变化。网页不再只是承载单一的文字和图片，各种富媒体让网页的内容更加生动，网页上软件化的交互形式为用户提供了更好的使用体验，这些都是基于前端技术实现的。 随着Web 2.0概念的普及和W3C组织的推广，网站重构的影响力正以惊人的速度增长。XHTML+CSS布局、DHTML和Ajax像一阵旋风，铺天盖地席卷而来，包括新浪、搜狐、网易、腾讯、淘宝等在内的各种规模的IT企业都对自己的网站进行了重构。",
	  englishText: "Front-End Engineering (FEE), or Front-End Engineering Design (FEED), is an engineering design approach used to control project expenses and thoroughly plan a project before a fix bid quote is submitted.[1] It may also be referred to as Pre-project planning (PPP), front-end loading (FEL), feasibility analysis, or early project planning. The FEE is basic engineering which comes after the Conceptual design or Feasibility study. The FEE design focuses the technical requirements as well as rough investment cost for the project. The FEE can be divided into separate packages covering different portions of the project. The FEE package is used as the basis for bidding the Execution Phase Contracts (EPC, EPCI, etc) and is used as the design basis. A good FEE will reflect all of the client's project-specific requirements and avoid significant changes during the execution phase. FEE contracts usually take around 1 year to complete for larger-sized projects. During the FEE phase there is close communication between Project Owners and Operators and the Engineering Contractor to work up the project-specific requirements. Front-End Engineering focuses on technical requirements and identifying main costs for a proposed project.[2] It is used to establish a price for the execution phase of the project and evaluate potential risks. It is typically followed by Detailed Design (or Detailed Engineering). The amount of time invested in Front-End Engineering is higher than a traditional quote, because project specifications are thoroughly extracted and the following typically developed in detail",
	  englishSingle: "abcdefghijklmnopqrstuvwxyz"
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }
/******/ ]);