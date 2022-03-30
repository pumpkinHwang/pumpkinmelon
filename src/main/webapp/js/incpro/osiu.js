if (typeof jQuery != 'undefined') { // 濡쒕뱶媛� �섏� �딆븯�꾨븣 援щ텇 �묒꽦
    /*!
 * Select2 4.0.11
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */
    ;(function (factory) {
        if (typeof define === 'function' && define.amd) {
            // AMD. Register as an anonymous module.
            define(['jquery'], factory);
        } else if (typeof module === 'object' && module.exports) {
            // Node/CommonJS
            module.exports = function (root, jQuery) {
                if (jQuery === undefined) {
                    // require('jQuery') returns a factory that requires window to
                    // build a jQuery instance, we normalize how we use modules
                    // that require this pattern but the window provided is a noop
                    // if it's defined (how jquery works)
                    if (typeof window !== 'undefined') {
                        jQuery = require('jquery');
                    }
                    else {
                        jQuery = require('jquery')(root);
                    }
                }
                factory(jQuery);
                return jQuery;
            };
        } else {
            // Browser globals
            factory(jQuery);
        }
    } (function (jQuery) {
        // This is needed so we can catch the AMD loader configuration and use it
        // The inner file should be wrapped (by `banner.start.js`) in a function that
        // returns the AMD loader references.
        var S2 =(function () {
            // Restore the Select2 AMD loader so it can be used
            // Needed mostly in the language files, where the loader is not inserted
            if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
                var S2 = jQuery.fn.select2.amd;
            }
            var S2;(function () { if (!S2 || !S2.requirejs) {
                if (!S2) { S2 = {}; } else { require = S2; }
                /**
                 * @license almond 0.3.3 Copyright jQuery Foundation and other contributors.
                 * Released under MIT license, http://github.com/requirejs/almond/LICENSE
                 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
                /*global setTimeout: false */

                var requirejs, require, define;
                (function (undef) {
                    var main, req, makeMap, handlers,
                        defined = {},
                        waiting = {},
                        config = {},
                        defining = {},
                        hasOwn = Object.prototype.hasOwnProperty,
                        aps = [].slice,
                        jsSuffixRegExp = /\.js$/;

                    function hasProp(obj, prop) {
                        return hasOwn.call(obj, prop);
                    }

                    /**
                     * Given a relative module name, like ./something, normalize it to
                     * a real name that can be mapped to a path.
                     * @param {String} name the relative name
                     * @param {String} baseName a real name that the name arg is relative
                     * to.
                     * @returns {String} normalized name
                     */
                    function normalize(name, baseName) {
                        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
                            foundI, foundStarMap, starI, i, j, part, normalizedBaseParts,
                            baseParts = baseName && baseName.split("/"),
                            map = config.map,
                            starMap = (map && map['*']) || {};

                        //Adjust any relative paths.
                        if (name) {
                            name = name.split('/');
                            lastIndex = name.length - 1;

                            // If wanting node ID compatibility, strip .js from end
                            // of IDs. Have to do this here, and not in nameToUrl
                            // because node allows either .js or non .js to map
                            // to same file.
                            if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                                name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                            }

                            // Starts with a '.' so need the baseName
                            if (name[0].charAt(0) === '.' && baseParts) {
                                //Convert baseName to array, and lop off the last part,
                                //so that . matches that 'directory' and not name of the baseName's
                                //module. For instance, baseName of 'one/two/three', maps to
                                //'one/two/three.js', but we want the directory, 'one/two' for
                                //this normalization.
                                normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                                name = normalizedBaseParts.concat(name);
                            }

                            //start trimDots
                            for (i = 0; i < name.length; i++) {
                                part = name[i];
                                if (part === '.') {
                                    name.splice(i, 1);
                                    i -= 1;
                                } else if (part === '..') {
                                    // If at the start, or previous value is still ..,
                                    // keep them so that when converted to a path it may
                                    // still work when converted to a path, even though
                                    // as an ID it is less than ideal. In larger point
                                    // releases, may be better to just kick out an error.
                                    if (i === 0 || (i === 1 && name[2] === '..') || name[i - 1] === '..') {
                                        continue;
                                    } else if (i > 0) {
                                        name.splice(i - 1, 2);
                                        i -= 2;
                                    }
                                }
                            }
                            //end trimDots

                            name = name.join('/');
                        }

                        //Apply map config if available.
                        if ((baseParts || starMap) && map) {
                            nameParts = name.split('/');

                            for (i = nameParts.length; i > 0; i -= 1) {
                                nameSegment = nameParts.slice(0, i).join("/");

                                if (baseParts) {
                                    //Find the longest baseName segment match in the config.
                                    //So, do joins on the biggest to smallest lengths of baseParts.
                                    for (j = baseParts.length; j > 0; j -= 1) {
                                        mapValue = map[baseParts.slice(0, j).join('/')];

                                        //baseName segment has  config, find if it has one for
                                        //this name.
                                        if (mapValue) {
                                            mapValue = mapValue[nameSegment];
                                            if (mapValue) {
                                                //Match, update name to the new value.
                                                foundMap = mapValue;
                                                foundI = i;
                                                break;
                                            }
                                        }
                                    }
                                }

                                if (foundMap) {
                                    break;
                                }

                                //Check for a star map match, but just hold on to it,
                                //if there is a shorter segment match later in a matching
                                //config, then favor over this star map.
                                if (!foundStarMap && starMap && starMap[nameSegment]) {
                                    foundStarMap = starMap[nameSegment];
                                    starI = i;
                                }
                            }

                            if (!foundMap && foundStarMap) {
                                foundMap = foundStarMap;
                                foundI = starI;
                            }

                            if (foundMap) {
                                nameParts.splice(0, foundI, foundMap);
                                name = nameParts.join('/');
                            }
                        }

                        return name;
                    }

                    function makeRequire(relName, forceSync) {
                        return function () {
                            //A version of a require function that passes a moduleName
                            //value for items that may need to
                            //look up paths relative to the moduleName
                            var args = aps.call(arguments, 0);

                            //If first arg is not require('string'), and there is only
                            //one arg, it is the array form without a callback. Insert
                            //a null so that the following concat is correct.
                            if (typeof args[0] !== 'string' && args.length === 1) {
                                args.push(null);
                            }
                            return req.apply(undef, args.concat([relName, forceSync]));
                        };
                    }

                    function makeNormalize(relName) {
                        return function (name) {
                            return normalize(name, relName);
                        };
                    }

                    function makeLoad(depName) {
                        return function (value) {
                            defined[depName] = value;
                        };
                    }

                    function callDep(name) {
                        if (hasProp(waiting, name)) {
                            var args = waiting[name];
                            delete waiting[name];
                            defining[name] = true;
                            main.apply(undef, args);
                        }

                        if (!hasProp(defined, name) && !hasProp(defining, name)) {
                            throw new Error('No ' + name);
                        }
                        return defined[name];
                    }

                    //Turns a plugin!resource to [plugin, resource]
                    //with the plugin being undefined if the name
                    //did not have a plugin prefix.
                    function splitPrefix(name) {
                        var prefix,
                            index = name ? name.indexOf('!') : -1;
                        if (index > -1) {
                            prefix = name.substring(0, index);
                            name = name.substring(index + 1, name.length);
                        }
                        return [prefix, name];
                    }

                    //Creates a parts array for a relName where first part is plugin ID,
                    //second part is resource ID. Assumes relName has already been normalized.
                    function makeRelParts(relName) {
                        return relName ? splitPrefix(relName) : [];
                    }

                    /**
                     * Makes a name map, normalizing the name, and using a plugin
                     * for normalization if necessary. Grabs a ref to plugin
                     * too, as an optimization.
                     */
                    makeMap = function (name, relParts) {
                        var plugin,
                            parts = splitPrefix(name),
                            prefix = parts[0],
                            relResourceName = relParts[1];

                        name = parts[1];

                        if (prefix) {
                            prefix = normalize(prefix, relResourceName);
                            plugin = callDep(prefix);
                        }

                        //Normalize according
                        if (prefix) {
                            if (plugin && plugin.normalize) {
                                name = plugin.normalize(name, makeNormalize(relResourceName));
                            } else {
                                name = normalize(name, relResourceName);
                            }
                        } else {
                            name = normalize(name, relResourceName);
                            parts = splitPrefix(name);
                            prefix = parts[0];
                            name = parts[1];
                            if (prefix) {
                                plugin = callDep(prefix);
                            }
                        }

                        //Using ridiculous property names for space reasons
                        return {
                            f: prefix ? prefix + '!' + name : name, //fullName
                            n: name,
                            pr: prefix,
                            p: plugin
                        };
                    };

                    function makeConfig(name) {
                        return function () {
                            return (config && config.config && config.config[name]) || {};
                        };
                    }

                    handlers = {
                        require: function (name) {
                            return makeRequire(name);
                        },
                        exports: function (name) {
                            var e = defined[name];
                            if (typeof e !== 'undefined') {
                                return e;
                            } else {
                                return (defined[name] = {});
                            }
                        },
                        module: function (name) {
                            return {
                                id: name,
                                uri: '',
                                exports: defined[name],
                                config: makeConfig(name)
                            };
                        }
                    };

                    main = function (name, deps, callback, relName) {
                        var cjsModule, depName, ret, map, i, relParts,
                            args = [],
                            callbackType = typeof callback,
                            usingExports;

                        //Use name if no relName
                        relName = relName || name;
                        relParts = makeRelParts(relName);

                        //Call the callback to define the module, if necessary.
                        if (callbackType === 'undefined' || callbackType === 'function') {
                            //Pull out the defined dependencies and pass the ordered
                            //values to the callback.
                            //Default to [require, exports, module] if no deps
                            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
                            for (i = 0; i < deps.length; i += 1) {
                                map = makeMap(deps[i], relParts);
                                depName = map.f;

                                //Fast path CommonJS standard dependencies.
                                if (depName === "require") {
                                    args[i] = handlers.require(name);
                                } else if (depName === "exports") {
                                    //CommonJS module spec 1.1
                                    args[i] = handlers.exports(name);
                                    usingExports = true;
                                } else if (depName === "module") {
                                    //CommonJS module spec 1.1
                                    cjsModule = args[i] = handlers.module(name);
                                } else if (hasProp(defined, depName) ||
                                    hasProp(waiting, depName) ||
                                    hasProp(defining, depName)) {
                                    args[i] = callDep(depName);
                                } else if (map.p) {
                                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                                    args[i] = defined[depName];
                                } else {
                                    throw new Error(name + ' missing ' + depName);
                                }
                            }

                            ret = callback ? callback.apply(defined[name], args) : undefined;

                            if (name) {
                                //If setting exports via "module" is in play,
                                //favor that over return value and exports. After that,
                                //favor a non-undefined return value over exports use.
                                if (cjsModule && cjsModule.exports !== undef &&
                                    cjsModule.exports !== defined[name]) {
                                    defined[name] = cjsModule.exports;
                                } else if (ret !== undef || !usingExports) {
                                    //Use the return value from the function.
                                    defined[name] = ret;
                                }
                            }
                        } else if (name) {
                            //May just be an object definition for the module. Only
                            //worry about defining if have a module name.
                            defined[name] = callback;
                        }
                    };

                    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
                        if (typeof deps === "string") {
                            if (handlers[deps]) {
                                //callback in this case is really relName
                                return handlers[deps](callback);
                            }
                            //Just return the module wanted. In this scenario, the
                            //deps arg is the module name, and second arg (if passed)
                            //is just the relName.
                            //Normalize module name, if it contains . or ..
                            return callDep(makeMap(deps, makeRelParts(callback)).f);
                        } else if (!deps.splice) {
                            //deps is a config object, not an array.
                            config = deps;
                            if (config.deps) {
                                req(config.deps, config.callback);
                            }
                            if (!callback) {
                                return;
                            }

                            if (callback.splice) {
                                //callback is an array, which means it is a dependency list.
                                //Adjust args if there are dependencies
                                deps = callback;
                                callback = relName;
                                relName = null;
                            } else {
                                deps = undef;
                            }
                        }

                        //Support require(['a'])
                        callback = callback || function () {};

                        //If relName is a function, it is an errback handler,
                        //so remove it.
                        if (typeof relName === 'function') {
                            relName = forceSync;
                            forceSync = alt;
                        }

                        //Simulate async callback;
                        if (forceSync) {
                            main(undef, deps, callback, relName);
                        } else {
                            //Using a non-zero value because of concern for what old browsers
                            //do, and latest browsers "upgrade" to 4 if lower value is used:
                            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
                            //If want a value immediately, use require('id') instead -- something
                            //that works in almond on the global level, but not guaranteed and
                            //unlikely to work in other AMD implementations.
                            setTimeout(function () {
                                main(undef, deps, callback, relName);
                            }, 4);
                        }

                        return req;
                    };

                    /**
                     * Just drops the config on the floor, but returns req in case
                     * the config return value is used.
                     */
                    req.config = function (cfg) {
                        return req(cfg);
                    };

                    /**
                     * Expose module registry for debugging and tooling
                     */
                    requirejs._defined = defined;

                    define = function (name, deps, callback) {
                        if (typeof name !== 'string') {
                            throw new Error('See almond README: incorrect module build, no module name');
                        }

                        //This module may not have dependencies
                        if (!deps.splice) {
                            //deps is not an array, so probably means
                            //an object literal or factory function for
                            //the value. Adjust args.
                            callback = deps;
                            deps = [];
                        }

                        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
                            waiting[name] = [name, deps, callback];
                        }
                    };

                    define.amd = {
                        jQuery: true
                    };
                }());

                S2.requirejs = requirejs;S2.require = require;S2.define = define;
            }
            }());
            S2.define("almond", function(){});

            /* global jQuery:false, $:false */
            S2.define('jquery',[],function () {
                var _$ = jQuery || $;

                if (_$ == null && console && console.error) {
                    console.error(
                        'Select2: An instance of jQuery or a jQuery-compatible library was not ' +
                        'found. Make sure that you are including jQuery before Select2 on your ' +
                        'web page.'
                    );
                }

                return _$;
            });

            S2.define('select2/utils',[
                'jquery'
            ], function ($) {
                var Utils = {};

                Utils.Extend = function (ChildClass, SuperClass) {
                    var __hasProp = {}.hasOwnProperty;

                    function BaseConstructor () {
                        this.constructor = ChildClass;
                    }

                    for (var key in SuperClass) {
                        if (__hasProp.call(SuperClass, key)) {
                            ChildClass[key] = SuperClass[key];
                        }
                    }

                    BaseConstructor.prototype = SuperClass.prototype;
                    ChildClass.prototype = new BaseConstructor();
                    ChildClass.__super__ = SuperClass.prototype;

                    return ChildClass;
                };

                function getMethods (theClass) {
                    var proto = theClass.prototype;

                    var methods = [];

                    for (var methodName in proto) {
                        var m = proto[methodName];

                        if (typeof m !== 'function') {
                            continue;
                        }

                        if (methodName === 'constructor') {
                            continue;
                        }

                        methods.push(methodName);
                    }

                    return methods;
                }

                Utils.Decorate = function (SuperClass, DecoratorClass) {
                    var decoratedMethods = getMethods(DecoratorClass);
                    var superMethods = getMethods(SuperClass);

                    function DecoratedClass () {
                        var unshift = Array.prototype.unshift;

                        var argCount = DecoratorClass.prototype.constructor.length;

                        var calledConstructor = SuperClass.prototype.constructor;

                        if (argCount > 0) {
                            unshift.call(arguments, SuperClass.prototype.constructor);

                            calledConstructor = DecoratorClass.prototype.constructor;
                        }

                        calledConstructor.apply(this, arguments);
                    }

                    DecoratorClass.displayName = SuperClass.displayName;

                    function ctr () {
                        this.constructor = DecoratedClass;
                    }

                    DecoratedClass.prototype = new ctr();

                    for (var m = 0; m < superMethods.length; m++) {
                        var superMethod = superMethods[m];

                        DecoratedClass.prototype[superMethod] =
                            SuperClass.prototype[superMethod];
                    }

                    var calledMethod = function (methodName) {
                        // Stub out the original method if it's not decorating an actual method
                        var originalMethod = function () {};

                        if (methodName in DecoratedClass.prototype) {
                            originalMethod = DecoratedClass.prototype[methodName];
                        }

                        var decoratedMethod = DecoratorClass.prototype[methodName];

                        return function () {
                            var unshift = Array.prototype.unshift;

                            unshift.call(arguments, originalMethod);

                            return decoratedMethod.apply(this, arguments);
                        };
                    };

                    for (var d = 0; d < decoratedMethods.length; d++) {
                        var decoratedMethod = decoratedMethods[d];

                        DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
                    }

                    return DecoratedClass;
                };

                var Observable = function () {
                    this.listeners = {};
                };

                Observable.prototype.on = function (event, callback) {
                    this.listeners = this.listeners || {};

                    if (event in this.listeners) {
                        this.listeners[event].push(callback);
                    } else {
                        this.listeners[event] = [callback];
                    }
                };

                Observable.prototype.trigger = function (event) {
                    var slice = Array.prototype.slice;
                    var params = slice.call(arguments, 1);

                    this.listeners = this.listeners || {};

                    // Params should always come in as an array
                    if (params == null) {
                        params = [];
                    }

                    // If there are no arguments to the event, use a temporary object
                    if (params.length === 0) {
                        params.push({});
                    }

                    // Set the `_type` of the first object to the event
                    params[0]._type = event;

                    if (event in this.listeners) {
                        this.invoke(this.listeners[event], slice.call(arguments, 1));
                    }

                    if ('*' in this.listeners) {
                        this.invoke(this.listeners['*'], arguments);
                    }
                };

                Observable.prototype.invoke = function (listeners, params) {
                    for (var i = 0, len = listeners.length; i < len; i++) {
                        listeners[i].apply(this, params);
                    }
                };

                Utils.Observable = Observable;

                Utils.generateChars = function (length) {
                    var chars = '';

                    for (var i = 0; i < length; i++) {
                        var randomChar = Math.floor(Math.random() * 36);
                        chars += randomChar.toString(36);
                    }

                    return chars;
                };

                Utils.bind = function (func, context) {
                    return function () {
                        func.apply(context, arguments);
                    };
                };

                Utils._convertData = function (data) {
                    for (var originalKey in data) {
                        var keys = originalKey.split('-');

                        var dataLevel = data;

                        if (keys.length === 1) {
                            continue;
                        }

                        for (var k = 0; k < keys.length; k++) {
                            var key = keys[k];

                            // Lowercase the first letter
                            // By default, dash-separated becomes camelCase
                            key = key.substring(0, 1).toLowerCase() + key.substring(1);

                            if (!(key in dataLevel)) {
                                dataLevel[key] = {};
                            }

                            if (k == keys.length - 1) {
                                dataLevel[key] = data[originalKey];
                            }

                            dataLevel = dataLevel[key];
                        }

                        delete data[originalKey];
                    }

                    return data;
                };

                Utils.hasScroll = function (index, el) {
                    // Adapted from the function created by @ShadowScripter
                    // and adapted by @BillBarry on the Stack Exchange Code Review website.
                    // The original code can be found at
                    // http://codereview.stackexchange.com/q/13338
                    // and was designed to be used with the Sizzle selector engine.

                    var $el = $(el);
                    var overflowX = el.style.overflowX;
                    var overflowY = el.style.overflowY;

                    //Check both x and y declarations
                    if (overflowX === overflowY &&
                        (overflowY === 'hidden' || overflowY === 'visible')) {
                        return false;
                    }

                    if (overflowX === 'scroll' || overflowY === 'scroll') {
                        return true;
                    }

                    return ($el.innerHeight() < el.scrollHeight ||
                        $el.innerWidth() < el.scrollWidth);
                };

                Utils.escapeMarkup = function (markup) {
                    var replaceMap = {
                        '\\': '&#92;',
                        '&': '&amp;',
                        '<': '&lt;',
                        '>': '&gt;',
                        '"': '&quot;',
                        '\'': '&#39;',
                        '/': '&#47;'
                    };

                    // Do not try to escape the markup if it's not a string
                    if (typeof markup !== 'string') {
                        return markup;
                    }

                    return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
                        return replaceMap[match];
                    });
                };

                // Append an array of jQuery nodes to a given element.
                Utils.appendMany = function ($element, $nodes) {
                    // jQuery 1.7.x does not support $.fn.append() with an array
                    // Fall back to a jQuery object collection using $.fn.add()
                    if ($.fn.jquery.substr(0, 3) === '1.7') {
                        var $jqNodes = $();

                        $.map($nodes, function (node) {
                            $jqNodes = $jqNodes.add(node);
                        });

                        $nodes = $jqNodes;
                    }

                    $element.append($nodes);
                };

                // Cache objects in Utils.__cache instead of $.data (see #4346)
                Utils.__cache = {};

                var id = 0;
                Utils.GetUniqueElementId = function (element) {
                    // Get a unique element Id. If element has no id,
                    // creates a new unique number, stores it in the id
                    // attribute and returns the new id.
                    // If an id already exists, it simply returns it.

                    var select2Id = element.getAttribute('data-select2-id');
                    if (select2Id == null) {
                        // If element has id, use it.
                        if (element.id) {
                            select2Id = element.id;
                            element.setAttribute('data-select2-id', select2Id);
                        } else {
                            element.setAttribute('data-select2-id', ++id);
                            select2Id = id.toString();
                        }
                    }
                    return select2Id;
                };

                Utils.StoreData = function (element, name, value) {
                    // Stores an item in the cache for a specified element.
                    // name is the cache key.
                    var id = Utils.GetUniqueElementId(element);
                    if (!Utils.__cache[id]) {
                        Utils.__cache[id] = {};
                    }

                    Utils.__cache[id][name] = value;
                };

                Utils.GetData = function (element, name) {
                    // Retrieves a value from the cache by its key (name)
                    // name is optional. If no name specified, return
                    // all cache items for the specified element.
                    // and for a specified element.
                    var id = Utils.GetUniqueElementId(element);
                    if (name) {
                        if (Utils.__cache[id]) {
                            if (Utils.__cache[id][name] != null) {
                                return Utils.__cache[id][name];
                            }
                            return $(element).data(name); // Fallback to HTML5 data attribs.
                        }
                        return $(element).data(name); // Fallback to HTML5 data attribs.
                    } else {
                        return Utils.__cache[id];
                    }
                };

                Utils.RemoveData = function (element) {
                    // Removes all cached items for a specified element.
                    var id = Utils.GetUniqueElementId(element);
                    if (Utils.__cache[id] != null) {
                        delete Utils.__cache[id];
                    }

                    element.removeAttribute('data-select2-id');
                };

                return Utils;
            });

            S2.define('select2/results',[
                'jquery',
                './utils'
            ], function ($, Utils) {
                function Results ($element, options, dataAdapter) {
                    this.$element = $element;
                    this.data = dataAdapter;
                    this.options = options;

                    Results.__super__.constructor.call(this);
                }

                Utils.Extend(Results, Utils.Observable);

                Results.prototype.render = function () {
                    var $results = $(
                        '<ul class="select2-results__options" role="listbox"></ul>'
                    );

                    if (this.options.get('multiple')) {
                        $results.attr('aria-multiselectable', 'true');
                    }

                    this.$results = $results;

                    return $results;
                };

                Results.prototype.clear = function () {
                    this.$results.empty();
                };

                Results.prototype.displayMessage = function (params) {
                    var escapeMarkup = this.options.get('escapeMarkup');

                    this.clear();
                    this.hideLoading();

                    var $message = $(
                        '<li role="alert" aria-live="assertive"' +
                        ' class="select2-results__option"></li>'
                    );

                    var message = this.options.get('translations').get(params.message);

                    $message.append(
                        escapeMarkup(
                            message(params.args)
                        )
                    );

                    $message[0].className += ' select2-results__message';

                    this.$results.append($message);
                };

                Results.prototype.hideMessages = function () {
                    this.$results.find('.select2-results__message').remove();
                };

                Results.prototype.append = function (data) {
                    this.hideLoading();

                    var $options = [];

                    if (data.results == null || data.results.length === 0) {
                        if (this.$results.children().length === 0) {
                            this.trigger('results:message', {
                                message: 'noResults'
                            });
                        }

                        return;
                    }

                    data.results = this.sort(data.results);

                    for (var d = 0; d < data.results.length; d++) {
                        var item = data.results[d];

                        var $option = this.option(item);

                        $options.push($option);
                    }

                    this.$results.append($options);
                };

                Results.prototype.position = function ($results, $dropdown) {
                    var $resultsContainer = $dropdown.find('.select2-results');
                    $resultsContainer.append($results);
                };

                Results.prototype.sort = function (data) {
                    var sorter = this.options.get('sorter');

                    return sorter(data);
                };

                Results.prototype.highlightFirstItem = function () {
                    var $options = this.$results
                        .find('.select2-results__option[aria-selected]');

                    var $selected = $options.filter('[aria-selected=true]');

                    // Check if there are any selected options
                    if ($selected.length > 0) {
                        // If there are selected options, highlight the first
                        $selected.first().trigger('mouseenter');
                    } else {
                        // If there are no selected options, highlight the first option
                        // in the dropdown
                        $options.first().trigger('mouseenter');
                    }

                    this.ensureHighlightVisible();
                };

                Results.prototype.setClasses = function () {
                    var self = this;

                    this.data.current(function (selected) {
                        var selectedIds = $.map(selected, function (s) {
                            return s.id.toString();
                        });

                        var $options = self.$results
                            .find('.select2-results__option[aria-selected]');

                        $options.each(function () {
                            var $option = $(this);

                            var item = Utils.GetData(this, 'data');

                            // id needs to be converted to a string when comparing
                            var id = '' + item.id;

                            if ((item.element != null && item.element.selected) ||
                                (item.element == null && $.inArray(id, selectedIds) > -1)) {
                                $option.attr('aria-selected', 'true');
                            } else {
                                $option.attr('aria-selected', 'false');
                            }
                        });

                    });
                };

                Results.prototype.showLoading = function (params) {
                    this.hideLoading();

                    var loadingMore = this.options.get('translations').get('searching');

                    var loading = {
                        disabled: true,
                        loading: true,
                        text: loadingMore(params)
                    };
                    var $loading = this.option(loading);
                    $loading.className += ' loading-results';

                    this.$results.prepend($loading);
                };

                Results.prototype.hideLoading = function () {
                    this.$results.find('.loading-results').remove();
                };

                Results.prototype.option = function (data) {
                    var option = document.createElement('li');
                    option.className = 'select2-results__option';

                    var attrs = {
                        'role': 'option',
                        'aria-selected': 'false'
                    };

                    var matches = window.Element.prototype.matches ||
                        window.Element.prototype.msMatchesSelector ||
                        window.Element.prototype.webkitMatchesSelector;

                    if ((data.element != null && matches.call(data.element, ':disabled')) ||
                        (data.element == null && data.disabled)) {
                        delete attrs['aria-selected'];
                        attrs['aria-disabled'] = 'true';
                    }

                    if (data.id == null) {
                        delete attrs['aria-selected'];
                    }

                    if (data._resultId != null) {
                        option.id = data._resultId;
                    }

                    if (data.title) {
                        option.title = data.title;
                    }

                    if (data.children) {
                        attrs.role = 'group';
                        attrs['aria-label'] = data.text;
                        delete attrs['aria-selected'];
                    }

                    for (var attr in attrs) {
                        var val = attrs[attr];

                        option.setAttribute(attr, val);
                    }

                    if (data.children) {
                        var $option = $(option);

                        var label = document.createElement('strong');
                        label.className = 'select2-results__group';

                        var $label = $(label);
                        this.template(data, label);

                        var $children = [];

                        for (var c = 0; c < data.children.length; c++) {
                            var child = data.children[c];

                            var $child = this.option(child);

                            $children.push($child);
                        }

                        var $childrenContainer = $('<ul></ul>', {
                            'class': 'select2-results__options select2-results__options--nested'
                        });

                        $childrenContainer.append($children);

                        $option.append(label);
                        $option.append($childrenContainer);
                    } else {
                        this.template(data, option);
                    }

                    Utils.StoreData(option, 'data', data);

                    return option;
                };

                Results.prototype.bind = function (container, $container) {
                    var self = this;

                    var id = container.id + '-results';

                    this.$results.attr('id', id);

                    container.on('results:all', function (params) {
                        self.clear();
                        self.append(params.data);

                        if (container.isOpen()) {
                            self.setClasses();
                            self.highlightFirstItem();
                        }
                    });

                    container.on('results:append', function (params) {
                        self.append(params.data);

                        if (container.isOpen()) {
                            self.setClasses();
                        }
                    });

                    container.on('query', function (params) {
                        self.hideMessages();
                        self.showLoading(params);
                    });

                    container.on('select', function () {
                        if (!container.isOpen()) {
                            return;
                        }

                        self.setClasses();

                        if (self.options.get('scrollAfterSelect')) {
                            self.highlightFirstItem();
                        }
                    });

                    container.on('unselect', function () {
                        if (!container.isOpen()) {
                            return;
                        }

                        self.setClasses();

                        if (self.options.get('scrollAfterSelect')) {
                            self.highlightFirstItem();
                        }
                    });

                    container.on('open', function () {
                        // When the dropdown is open, aria-expended="true"
                        self.$results.attr('aria-expanded', 'true');
                        self.$results.attr('aria-hidden', 'false');

                        self.setClasses();
                        self.ensureHighlightVisible();
                    });

                    container.on('close', function () {
                        // When the dropdown is closed, aria-expended="false"
                        self.$results.attr('aria-expanded', 'false');
                        self.$results.attr('aria-hidden', 'true');
                        self.$results.removeAttr('aria-activedescendant');
                    });

                    container.on('results:toggle', function () {
                        var $highlighted = self.getHighlightedResults();

                        if ($highlighted.length === 0) {
                            return;
                        }

                        $highlighted.trigger('mouseup');
                    });

                    container.on('results:select', function () {
                        var $highlighted = self.getHighlightedResults();

                        if ($highlighted.length === 0) {
                            return;
                        }

                        var data = Utils.GetData($highlighted[0], 'data');

                        if ($highlighted.attr('aria-selected') == 'true') {
                            self.trigger('close', {});
                        } else {
                            self.trigger('select', {
                                data: data
                            });
                        }
                    });

                    container.on('results:previous', function () {
                        var $highlighted = self.getHighlightedResults();

                        var $options = self.$results.find('[aria-selected]');

                        var currentIndex = $options.index($highlighted);

                        // If we are already at the top, don't move further
                        // If no options, currentIndex will be -1
                        if (currentIndex <= 0) {
                            return;
                        }

                        var nextIndex = currentIndex - 1;

                        // If none are highlighted, highlight the first
                        if ($highlighted.length === 0) {
                            nextIndex = 0;
                        }

                        var $next = $options.eq(nextIndex);

                        $next.trigger('mouseenter');

                        var currentOffset = self.$results.offset().top;
                        var nextTop = $next.offset().top;
                        var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);

                        if (nextIndex === 0) {
                            self.$results.scrollTop(0);
                        } else if (nextTop - currentOffset < 0) {
                            self.$results.scrollTop(nextOffset);
                        }
                    });

                    container.on('results:next', function () {
                        var $highlighted = self.getHighlightedResults();

                        var $options = self.$results.find('[aria-selected]');

                        var currentIndex = $options.index($highlighted);

                        var nextIndex = currentIndex + 1;

                        // If we are at the last option, stay there
                        if (nextIndex >= $options.length) {
                            return;
                        }

                        var $next = $options.eq(nextIndex);

                        $next.trigger('mouseenter');

                        var currentOffset = self.$results.offset().top +
                            self.$results.outerHeight(false);
                        var nextBottom = $next.offset().top + $next.outerHeight(false);
                        var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;

                        if (nextIndex === 0) {
                            self.$results.scrollTop(0);
                        } else if (nextBottom > currentOffset) {
                            self.$results.scrollTop(nextOffset);
                        }
                    });

                    container.on('results:focus', function (params) {
                        params.element.addClass('select2-results__option--highlighted');
                    });

                    container.on('results:message', function (params) {
                        self.displayMessage(params);
                    });

                    if ($.fn.mousewheel) {
                        this.$results.on('mousewheel', function (e) {
                            var top = self.$results.scrollTop();

                            var bottom = self.$results.get(0).scrollHeight - top + e.deltaY;

                            var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
                            var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();

                            if (isAtTop) {
                                self.$results.scrollTop(0);

                                e.preventDefault();
                                e.stopPropagation();
                            } else if (isAtBottom) {
                                self.$results.scrollTop(
                                    self.$results.get(0).scrollHeight - self.$results.height()
                                );

                                e.preventDefault();
                                e.stopPropagation();
                            }
                        });
                    }

                    this.$results.on('mouseup', '.select2-results__option[aria-selected]',
                        function (evt) {
                            var $this = $(this);

                            var data = Utils.GetData(this, 'data');

                            if ($this.attr('aria-selected') === 'true') {
                                if (self.options.get('multiple')) {
                                    self.trigger('unselect', {
                                        originalEvent: evt,
                                        data: data
                                    });
                                } else {
                                    self.trigger('close', {});
                                }

                                return;
                            }

                            self.trigger('select', {
                                originalEvent: evt,
                                data: data
                            });
                        });

                    this.$results.on('mouseenter', '.select2-results__option[aria-selected]',
                        function (evt) {
                            var data = Utils.GetData(this, 'data');

                            self.getHighlightedResults()
                                .removeClass('select2-results__option--highlighted');

                            self.trigger('results:focus', {
                                data: data,
                                element: $(this)
                            });
                        });
                };

                Results.prototype.getHighlightedResults = function () {
                    var $highlighted = this.$results
                        .find('.select2-results__option--highlighted');

                    return $highlighted;
                };

                Results.prototype.destroy = function () {
                    this.$results.remove();
                };

                Results.prototype.ensureHighlightVisible = function () {
                    var $highlighted = this.getHighlightedResults();

                    if ($highlighted.length === 0) {
                        return;
                    }

                    var $options = this.$results.find('[aria-selected]');

                    var currentIndex = $options.index($highlighted);

                    var currentOffset = this.$results.offset().top;
                    var nextTop = $highlighted.offset().top;
                    var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);

                    var offsetDelta = nextTop - currentOffset;
                    nextOffset -= $highlighted.outerHeight(false) * 2;

                    if (currentIndex <= 2) {
                        this.$results.scrollTop(0);
                    } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
                        this.$results.scrollTop(nextOffset);
                    }
                };

                Results.prototype.template = function (result, container) {
                    var template = this.options.get('templateResult');
                    var escapeMarkup = this.options.get('escapeMarkup');

                    var content = template(result, container);

                    if (content == null) {
                        container.style.display = 'none';
                    } else if (typeof content === 'string') {
                        container.innerHTML = escapeMarkup(content);
                    } else {
                        $(container).append(content);
                    }
                };

                return Results;
            });

            S2.define('select2/keys',[

            ], function () {
                var KEYS = {
                    BACKSPACE: 8,
                    TAB: 9,
                    ENTER: 13,
                    SHIFT: 16,
                    CTRL: 17,
                    ALT: 18,
                    ESC: 27,
                    SPACE: 32,
                    PAGE_UP: 33,
                    PAGE_DOWN: 34,
                    END: 35,
                    HOME: 36,
                    LEFT: 37,
                    UP: 38,
                    RIGHT: 39,
                    DOWN: 40,
                    DELETE: 46
                };

                return KEYS;
            });

            S2.define('select2/selection/base',[
                'jquery',
                '../utils',
                '../keys'
            ], function ($, Utils, KEYS) {
                function BaseSelection ($element, options) {
                    this.$element = $element;
                    this.options = options;

                    BaseSelection.__super__.constructor.call(this);
                }

                Utils.Extend(BaseSelection, Utils.Observable);

                BaseSelection.prototype.render = function () {
                    var $selection = $(
                        '<span class="select2-selection" role="combobox" ' +
                        ' aria-haspopup="true" aria-expanded="false">' +
                        '</span>'
                    );

                    this._tabindex = 0;

                    if (Utils.GetData(this.$element[0], 'old-tabindex') != null) {
                        this._tabindex = Utils.GetData(this.$element[0], 'old-tabindex');
                    } else if (this.$element.attr('tabindex') != null) {
                        this._tabindex = this.$element.attr('tabindex');
                    }

                    $selection.attr('title', this.$element.attr('title'));
                    $selection.attr('tabindex', this._tabindex);
                    $selection.attr('aria-disabled', 'false');

                    this.$selection = $selection;

                    return $selection;
                };

                BaseSelection.prototype.bind = function (container, $container) {
                    var self = this;

                    var resultsId = container.id + '-results';

                    this.container = container;

                    this.$selection.on('focus', function (evt) {
                        self.trigger('focus', evt);
                    });

                    this.$selection.on('blur', function (evt) {
                        self._handleBlur(evt);
                    });

                    this.$selection.on('keydown', function (evt) {
                        self.trigger('keypress', evt);

                        if (evt.which === KEYS.SPACE) {
                            evt.preventDefault();
                        }
                    });

                    container.on('results:focus', function (params) {
                        self.$selection.attr('aria-activedescendant', params.data._resultId);
                    });

                    container.on('selection:update', function (params) {
                        self.update(params.data);
                    });

                    container.on('open', function () {
                        // When the dropdown is open, aria-expanded="true"
                        self.$selection.attr('aria-expanded', 'true');
                        self.$selection.attr('aria-owns', resultsId);

                        self._attachCloseHandler(container);
                    });

                    container.on('close', function () {
                        // When the dropdown is closed, aria-expanded="false"
                        self.$selection.attr('aria-expanded', 'false');
                        self.$selection.removeAttr('aria-activedescendant');
                        self.$selection.removeAttr('aria-owns');

                        self.$selection.trigger('focus');

                        self._detachCloseHandler(container);
                    });

                    container.on('enable', function () {
                        self.$selection.attr('tabindex', self._tabindex);
                        self.$selection.attr('aria-disabled', 'false');
                    });

                    container.on('disable', function () {
                        self.$selection.attr('tabindex', '-1');
                        self.$selection.attr('aria-disabled', 'true');
                    });
                };

                BaseSelection.prototype._handleBlur = function (evt) {
                    var self = this;

                    // This needs to be delayed as the active element is the body when the tab
                    // key is pressed, possibly along with others.
                    window.setTimeout(function () {
                        // Don't trigger `blur` if the focus is still in the selection
                        if (
                            (document.activeElement == self.$selection[0]) ||
                            ($.contains(self.$selection[0], document.activeElement))
                        ) {
                            return;
                        }

                        self.trigger('blur', evt);
                    }, 1);
                };

                BaseSelection.prototype._attachCloseHandler = function (container) {

                    $(document.body).on('mousedown.select2.' + container.id, function (e) {
                        var $target = $(e.target);

                        var $select = $target.closest('.select2');

                        var $all = $('.select2.select2-container--open');

                        $all.each(function () {
                            if (this == $select[0]) {
                                return;
                            }

                            var $element = Utils.GetData(this, 'element');

                            $element.select2('close');
                        });
                    });
                };

                BaseSelection.prototype._detachCloseHandler = function (container) {
                    $(document.body).off('mousedown.select2.' + container.id);
                };

                BaseSelection.prototype.position = function ($selection, $container) {
                    var $selectionContainer = $container.find('.selection');
                    $selectionContainer.append($selection);
                };

                BaseSelection.prototype.destroy = function () {
                    this._detachCloseHandler(this.container);
                };

                BaseSelection.prototype.update = function (data) {
                    throw new Error('The `update` method must be defined in child classes.');
                };

                return BaseSelection;
            });

            S2.define('select2/selection/single',[
                'jquery',
                './base',
                '../utils',
                '../keys'
            ], function ($, BaseSelection, Utils, KEYS) {
                function SingleSelection () {
                    SingleSelection.__super__.constructor.apply(this, arguments);
                }

                Utils.Extend(SingleSelection, BaseSelection);

                SingleSelection.prototype.render = function () {
                    var $selection = SingleSelection.__super__.render.call(this);

                    $selection.addClass('select2-selection--single');

                    $selection.html(
                        '<span class="select2-selection__rendered"></span>' +
                        '<span class="select2-selection__arrow" role="presentation">' +
                        '<b role="presentation"></b>' +
                        '</span>'
                    );

                    return $selection;
                };

                SingleSelection.prototype.bind = function (container, $container) {
                    var self = this;

                    SingleSelection.__super__.bind.apply(this, arguments);

                    var id = container.id + '-container';

                    this.$selection.find('.select2-selection__rendered')
                        .attr('id', id)
                        .attr('role', 'textbox')
                        .attr('aria-readonly', 'true');
                    this.$selection.attr('aria-labelledby', id);

                    this.$selection.on('mousedown', function (evt) {
                        // Only respond to left clicks
                        if (evt.which !== 1) {
                            return;
                        }

                        self.trigger('toggle', {
                            originalEvent: evt
                        });
                    });

                    this.$selection.on('focus', function (evt) {
                        // User focuses on the container
                    });

                    this.$selection.on('blur', function (evt) {
                        // User exits the container
                    });

                    container.on('focus', function (evt) {
                        if (!container.isOpen()) {
                            self.$selection.trigger('focus');
                        }
                    });
                };

                SingleSelection.prototype.clear = function () {
                    var $rendered = this.$selection.find('.select2-selection__rendered');
                    $rendered.empty();
                    $rendered.removeAttr('title'); // clear tooltip on empty
                };

                SingleSelection.prototype.display = function (data, container) {
                    var template = this.options.get('templateSelection');
                    var escapeMarkup = this.options.get('escapeMarkup');

                    return escapeMarkup(template(data, container));
                };

                SingleSelection.prototype.selectionContainer = function () {
                    return $('<span></span>');
                };

                SingleSelection.prototype.update = function (data) {
                    if (data.length === 0) {
                        this.clear();
                        return;
                    }

                    var selection = data[0];

                    var $rendered = this.$selection.find('.select2-selection__rendered');
                    var formatted = this.display(selection, $rendered);

                    $rendered.empty().append(formatted);

                    var title = selection.title || selection.text;

                    if (title) {
                        $rendered.attr('title', title);
                    } else {
                        $rendered.removeAttr('title');
                    }
                };

                return SingleSelection;
            });

            S2.define('select2/selection/multiple',[
                'jquery',
                './base',
                '../utils'
            ], function ($, BaseSelection, Utils) {
                function MultipleSelection ($element, options) {
                    MultipleSelection.__super__.constructor.apply(this, arguments);
                }

                Utils.Extend(MultipleSelection, BaseSelection);

                MultipleSelection.prototype.render = function () {
                    var $selection = MultipleSelection.__super__.render.call(this);

                    $selection.addClass('select2-selection--multiple');

                    $selection.html(
                        '<ul class="select2-selection__rendered"></ul>'
                    );

                    return $selection;
                };

                MultipleSelection.prototype.bind = function (container, $container) {
                    var self = this;

                    MultipleSelection.__super__.bind.apply(this, arguments);

                    this.$selection.on('click', function (evt) {
                        self.trigger('toggle', {
                            originalEvent: evt
                        });
                    });

                    this.$selection.on(
                        'click',
                        '.select2-selection__choice__remove',
                        function (evt) {
                            // Ignore the event if it is disabled
                            if (self.options.get('disabled')) {
                                return;
                            }

                            var $remove = $(this);
                            var $selection = $remove.parent();

                            var data = Utils.GetData($selection[0], 'data');

                            self.trigger('unselect', {
                                originalEvent: evt,
                                data: data
                            });
                        }
                    );
                };

                MultipleSelection.prototype.clear = function () {
                    var $rendered = this.$selection.find('.select2-selection__rendered');
                    $rendered.empty();
                    $rendered.removeAttr('title');
                };

                MultipleSelection.prototype.display = function (data, container) {
                    var template = this.options.get('templateSelection');
                    var escapeMarkup = this.options.get('escapeMarkup');

                    return escapeMarkup(template(data, container));
                };

                MultipleSelection.prototype.selectionContainer = function () {
                    var $container = $(
                        '<li class="select2-selection__choice">' +
                        '<span class="select2-selection__choice__remove" role="presentation">' +
                        '&times;' +
                        '</span>' +
                        '</li>'
                    );

                    return $container;
                };

                MultipleSelection.prototype.update = function (data) {
                    this.clear();

                    if (data.length === 0) {
                        return;
                    }

                    var $selections = [];

                    for (var d = 0; d < data.length; d++) {
                        var selection = data[d];

                        var $selection = this.selectionContainer();
                        var formatted = this.display(selection, $selection);

                        $selection.append(formatted);

                        var title = selection.title || selection.text;

                        if (title) {
                            $selection.attr('title', title);
                        }

                        Utils.StoreData($selection[0], 'data', selection);

                        $selections.push($selection);
                    }

                    var $rendered = this.$selection.find('.select2-selection__rendered');

                    Utils.appendMany($rendered, $selections);
                };

                return MultipleSelection;
            });

            S2.define('select2/selection/placeholder',[
                '../utils'
            ], function (Utils) {
                function Placeholder (decorated, $element, options) {
                    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

                    decorated.call(this, $element, options);
                }

                Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {
                    if (typeof placeholder === 'string') {
                        placeholder = {
                            id: '',
                            text: placeholder
                        };
                    }

                    return placeholder;
                };

                Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {
                    var $placeholder = this.selectionContainer();

                    $placeholder.html(this.display(placeholder));
                    $placeholder.addClass('select2-selection__placeholder')
                        .removeClass('select2-selection__choice');

                    return $placeholder;
                };

                Placeholder.prototype.update = function (decorated, data) {
                    var singlePlaceholder = (
                        data.length == 1 && data[0].id != this.placeholder.id
                    );
                    var multipleSelections = data.length > 1;

                    if (multipleSelections || singlePlaceholder) {
                        return decorated.call(this, data);
                    }

                    this.clear();

                    var $placeholder = this.createPlaceholder(this.placeholder);

                    this.$selection.find('.select2-selection__rendered').append($placeholder);
                };

                return Placeholder;
            });

            S2.define('select2/selection/allowClear',[
                'jquery',
                '../keys',
                '../utils'
            ], function ($, KEYS, Utils) {
                function AllowClear () { }

                AllowClear.prototype.bind = function (decorated, container, $container) {
                    var self = this;

                    decorated.call(this, container, $container);

                    if (this.placeholder == null) {
                        if (this.options.get('debug') && window.console && console.error) {
                            console.error(
                                'Select2: The `allowClear` option should be used in combination ' +
                                'with the `placeholder` option.'
                            );
                        }
                    }

                    this.$selection.on('mousedown', '.select2-selection__clear',
                        function (evt) {
                            self._handleClear(evt);
                        });

                    container.on('keypress', function (evt) {
                        self._handleKeyboardClear(evt, container);
                    });
                };

                AllowClear.prototype._handleClear = function (_, evt) {
                    // Ignore the event if it is disabled
                    if (this.options.get('disabled')) {
                        return;
                    }

                    var $clear = this.$selection.find('.select2-selection__clear');

                    // Ignore the event if nothing has been selected
                    if ($clear.length === 0) {
                        return;
                    }

                    evt.stopPropagation();

                    var data = Utils.GetData($clear[0], 'data');

                    var previousVal = this.$element.val();
                    this.$element.val(this.placeholder.id);

                    var unselectData = {
                        data: data
                    };
                    this.trigger('clear', unselectData);
                    if (unselectData.prevented) {
                        this.$element.val(previousVal);
                        return;
                    }

                    for (var d = 0; d < data.length; d++) {
                        unselectData = {
                            data: data[d]
                        };

                        // Trigger the `unselect` event, so people can prevent it from being
                        // cleared.
                        this.trigger('unselect', unselectData);

                        // If the event was prevented, don't clear it out.
                        if (unselectData.prevented) {
                            this.$element.val(previousVal);
                            return;
                        }
                    }

                    this.$element.trigger('change');

                    this.trigger('toggle', {});
                };

                AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {
                    if (container.isOpen()) {
                        return;
                    }

                    if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
                        this._handleClear(evt);
                    }
                };

                AllowClear.prototype.update = function (decorated, data) {
                    decorated.call(this, data);

                    if (this.$selection.find('.select2-selection__placeholder').length > 0 ||
                        data.length === 0) {
                        return;
                    }

                    var removeAll = this.options.get('translations').get('removeAllItems');

                    var $remove = $(
                        '<span class="select2-selection__clear" title="' + removeAll() +'">' +
                        '&times;' +
                        '</span>'
                    );
                    Utils.StoreData($remove[0], 'data', data);

                    this.$selection.find('.select2-selection__rendered').prepend($remove);
                };

                return AllowClear;
            });

            S2.define('select2/selection/search',[
                'jquery',
                '../utils',
                '../keys'
            ], function ($, Utils, KEYS) {
                function Search (decorated, $element, options) {
                    decorated.call(this, $element, options);
                }

                Search.prototype.render = function (decorated) {
                    var $search = $(
                        '<li class="select2-search select2-search--inline">' +
                        '<input class="select2-search__field" type="search" tabindex="-1"' +
                        ' autocomplete="off" autocorrect="off" autocapitalize="none"' +
                        ' spellcheck="false" role="searchbox" aria-autocomplete="list" />' +
                        '</li>'
                    );

                    this.$searchContainer = $search;
                    this.$search = $search.find('input');

                    var $rendered = decorated.call(this);

                    this._transferTabIndex();

                    return $rendered;
                };

                Search.prototype.bind = function (decorated, container, $container) {
                    var self = this;

                    var resultsId = container.id + '-results';

                    decorated.call(this, container, $container);

                    container.on('open', function () {
                        self.$search.attr('aria-controls', resultsId);
                        self.$search.trigger('focus');
                    });

                    container.on('close', function () {
                        self.$search.val('');
                        self.$search.removeAttr('aria-controls');
                        self.$search.removeAttr('aria-activedescendant');
                        self.$search.trigger('focus');
                    });

                    container.on('enable', function () {
                        self.$search.prop('disabled', false);

                        self._transferTabIndex();
                    });

                    container.on('disable', function () {
                        self.$search.prop('disabled', true);
                    });

                    container.on('focus', function (evt) {
                        self.$search.trigger('focus');
                    });

                    container.on('results:focus', function (params) {
                        if (params.data._resultId) {
                            self.$search.attr('aria-activedescendant', params.data._resultId);
                        } else {
                            self.$search.removeAttr('aria-activedescendant');
                        }
                    });

                    this.$selection.on('focusin', '.select2-search--inline', function (evt) {
                        self.trigger('focus', evt);
                    });

                    this.$selection.on('focusout', '.select2-search--inline', function (evt) {
                        self._handleBlur(evt);
                    });

                    this.$selection.on('keydown', '.select2-search--inline', function (evt) {
                        evt.stopPropagation();

                        self.trigger('keypress', evt);

                        self._keyUpPrevented = evt.isDefaultPrevented();

                        var key = evt.which;

                        if (key === KEYS.BACKSPACE && self.$search.val() === '') {
                            var $previousChoice = self.$searchContainer
                                .prev('.select2-selection__choice');

                            if ($previousChoice.length > 0) {
                                var item = Utils.GetData($previousChoice[0], 'data');

                                self.searchRemoveChoice(item);

                                evt.preventDefault();
                            }
                        }
                    });

                    this.$selection.on('click', '.select2-search--inline', function (evt) {
                        if (self.$search.val()) {
                            evt.stopPropagation();
                        }
                    });

                    // Try to detect the IE version should the `documentMode` property that
                    // is stored on the document. This is only implemented in IE and is
                    // slightly cleaner than doing a user agent check.
                    // This property is not available in Edge, but Edge also doesn't have
                    // this bug.
                    var msie = document.documentMode;
                    var disableInputEvents = msie && msie <= 11;

                    // Workaround for browsers which do not support the `input` event
                    // This will prevent double-triggering of events for browsers which support
                    // both the `keyup` and `input` events.
                    this.$selection.on(
                        'input.searchcheck',
                        '.select2-search--inline',
                        function (evt) {
                            // IE will trigger the `input` event when a placeholder is used on a
                            // search box. To get around this issue, we are forced to ignore all
                            // `input` events in IE and keep using `keyup`.
                            if (disableInputEvents) {
                                self.$selection.off('input.search input.searchcheck');
                                return;
                            }

                            // Unbind the duplicated `keyup` event
                            self.$selection.off('keyup.search');
                        }
                    );

                    this.$selection.on(
                        'keyup.search input.search',
                        '.select2-search--inline',
                        function (evt) {
                            // IE will trigger the `input` event when a placeholder is used on a
                            // search box. To get around this issue, we are forced to ignore all
                            // `input` events in IE and keep using `keyup`.
                            if (disableInputEvents && evt.type === 'input') {
                                self.$selection.off('input.search input.searchcheck');
                                return;
                            }

                            var key = evt.which;

                            // We can freely ignore events from modifier keys
                            if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
                                return;
                            }

                            // Tabbing will be handled during the `keydown` phase
                            if (key == KEYS.TAB) {
                                return;
                            }

                            self.handleSearch(evt);
                        }
                    );
                };

                /**
                 * This method will transfer the tabindex attribute from the rendered
                 * selection to the search box. This allows for the search box to be used as
                 * the primary focus instead of the selection container.
                 *
                 * @private
                 */
                Search.prototype._transferTabIndex = function (decorated) {
                    this.$search.attr('tabindex', this.$selection.attr('tabindex'));
                    this.$selection.attr('tabindex', '-1');
                };

                Search.prototype.createPlaceholder = function (decorated, placeholder) {
                    this.$search.attr('placeholder', placeholder.text);
                };

                Search.prototype.update = function (decorated, data) {
                    var searchHadFocus = this.$search[0] == document.activeElement;

                    this.$search.attr('placeholder', '');

                    decorated.call(this, data);

                    this.$selection.find('.select2-selection__rendered')
                        .append(this.$searchContainer);

                    this.resizeSearch();
                    if (searchHadFocus) {
                        this.$search.trigger('focus');
                    }
                };

                Search.prototype.handleSearch = function () {
                    this.resizeSearch();

                    if (!this._keyUpPrevented) {
                        var input = this.$search.val();

                        this.trigger('query', {
                            term: input
                        });
                    }

                    this._keyUpPrevented = false;
                };

                Search.prototype.searchRemoveChoice = function (decorated, item) {
                    this.trigger('unselect', {
                        data: item
                    });

                    this.$search.val(item.text);
                    this.handleSearch();
                };

                Search.prototype.resizeSearch = function () {
                    this.$search.css('width', '25px');

                    var width = '';

                    if (this.$search.attr('placeholder') !== '') {
                        width = this.$selection.find('.select2-selection__rendered').width();
                    } else {
                        var minimumWidth = this.$search.val().length + 1;

                        width = (minimumWidth * 0.75) + 'em';
                    }

                    this.$search.css('width', width);
                };

                return Search;
            });

            S2.define('select2/selection/eventRelay',[
                'jquery'
            ], function ($) {
                function EventRelay () { }

                EventRelay.prototype.bind = function (decorated, container, $container) {
                    var self = this;
                    var relayEvents = [
                        'open', 'opening',
                        'close', 'closing',
                        'select', 'selecting',
                        'unselect', 'unselecting',
                        'clear', 'clearing'
                    ];

                    var preventableEvents = [
                        'opening', 'closing', 'selecting', 'unselecting', 'clearing'
                    ];

                    decorated.call(this, container, $container);

                    container.on('*', function (name, params) {
                        // Ignore events that should not be relayed
                        if ($.inArray(name, relayEvents) === -1) {
                            return;
                        }

                        // The parameters should always be an object
                        params = params || {};

                        // Generate the jQuery event for the Select2 event
                        var evt = $.Event('select2:' + name, {
                            params: params
                        });

                        self.$element.trigger(evt);

                        // Only handle preventable events if it was one
                        if ($.inArray(name, preventableEvents) === -1) {
                            return;
                        }

                        params.prevented = evt.isDefaultPrevented();
                    });
                };

                return EventRelay;
            });

            S2.define('select2/translation',[
                'jquery',
                'require'
            ], function ($, require) {
                function Translation (dict) {
                    this.dict = dict || {};
                }

                Translation.prototype.all = function () {
                    return this.dict;
                };

                Translation.prototype.get = function (key) {
                    return this.dict[key];
                };

                Translation.prototype.extend = function (translation) {
                    this.dict = $.extend({}, translation.all(), this.dict);
                };

                // Static functions

                Translation._cache = {};

                Translation.loadPath = function (path) {
                    if (!(path in Translation._cache)) {
                        var translations = require(path);

                        Translation._cache[path] = translations;
                    }

                    return new Translation(Translation._cache[path]);
                };

                return Translation;
            });

            S2.define('select2/diacritics',[

            ], function () {
                var diacritics = {
                    '\u24B6': 'A',
                    '\uFF21': 'A',
                    '\u00C0': 'A',
                    '\u00C1': 'A',
                    '\u00C2': 'A',
                    '\u1EA6': 'A',
                    '\u1EA4': 'A',
                    '\u1EAA': 'A',
                    '\u1EA8': 'A',
                    '\u00C3': 'A',
                    '\u0100': 'A',
                    '\u0102': 'A',
                    '\u1EB0': 'A',
                    '\u1EAE': 'A',
                    '\u1EB4': 'A',
                    '\u1EB2': 'A',
                    '\u0226': 'A',
                    '\u01E0': 'A',
                    '\u00C4': 'A',
                    '\u01DE': 'A',
                    '\u1EA2': 'A',
                    '\u00C5': 'A',
                    '\u01FA': 'A',
                    '\u01CD': 'A',
                    '\u0200': 'A',
                    '\u0202': 'A',
                    '\u1EA0': 'A',
                    '\u1EAC': 'A',
                    '\u1EB6': 'A',
                    '\u1E00': 'A',
                    '\u0104': 'A',
                    '\u023A': 'A',
                    '\u2C6F': 'A',
                    '\uA732': 'AA',
                    '\u00C6': 'AE',
                    '\u01FC': 'AE',
                    '\u01E2': 'AE',
                    '\uA734': 'AO',
                    '\uA736': 'AU',
                    '\uA738': 'AV',
                    '\uA73A': 'AV',
                    '\uA73C': 'AY',
                    '\u24B7': 'B',
                    '\uFF22': 'B',
                    '\u1E02': 'B',
                    '\u1E04': 'B',
                    '\u1E06': 'B',
                    '\u0243': 'B',
                    '\u0182': 'B',
                    '\u0181': 'B',
                    '\u24B8': 'C',
                    '\uFF23': 'C',
                    '\u0106': 'C',
                    '\u0108': 'C',
                    '\u010A': 'C',
                    '\u010C': 'C',
                    '\u00C7': 'C',
                    '\u1E08': 'C',
                    '\u0187': 'C',
                    '\u023B': 'C',
                    '\uA73E': 'C',
                    '\u24B9': 'D',
                    '\uFF24': 'D',
                    '\u1E0A': 'D',
                    '\u010E': 'D',
                    '\u1E0C': 'D',
                    '\u1E10': 'D',
                    '\u1E12': 'D',
                    '\u1E0E': 'D',
                    '\u0110': 'D',
                    '\u018B': 'D',
                    '\u018A': 'D',
                    '\u0189': 'D',
                    '\uA779': 'D',
                    '\u01F1': 'DZ',
                    '\u01C4': 'DZ',
                    '\u01F2': 'Dz',
                    '\u01C5': 'Dz',
                    '\u24BA': 'E',
                    '\uFF25': 'E',
                    '\u00C8': 'E',
                    '\u00C9': 'E',
                    '\u00CA': 'E',
                    '\u1EC0': 'E',
                    '\u1EBE': 'E',
                    '\u1EC4': 'E',
                    '\u1EC2': 'E',
                    '\u1EBC': 'E',
                    '\u0112': 'E',
                    '\u1E14': 'E',
                    '\u1E16': 'E',
                    '\u0114': 'E',
                    '\u0116': 'E',
                    '\u00CB': 'E',
                    '\u1EBA': 'E',
                    '\u011A': 'E',
                    '\u0204': 'E',
                    '\u0206': 'E',
                    '\u1EB8': 'E',
                    '\u1EC6': 'E',
                    '\u0228': 'E',
                    '\u1E1C': 'E',
                    '\u0118': 'E',
                    '\u1E18': 'E',
                    '\u1E1A': 'E',
                    '\u0190': 'E',
                    '\u018E': 'E',
                    '\u24BB': 'F',
                    '\uFF26': 'F',
                    '\u1E1E': 'F',
                    '\u0191': 'F',
                    '\uA77B': 'F',
                    '\u24BC': 'G',
                    '\uFF27': 'G',
                    '\u01F4': 'G',
                    '\u011C': 'G',
                    '\u1E20': 'G',
                    '\u011E': 'G',
                    '\u0120': 'G',
                    '\u01E6': 'G',
                    '\u0122': 'G',
                    '\u01E4': 'G',
                    '\u0193': 'G',
                    '\uA7A0': 'G',
                    '\uA77D': 'G',
                    '\uA77E': 'G',
                    '\u24BD': 'H',
                    '\uFF28': 'H',
                    '\u0124': 'H',
                    '\u1E22': 'H',
                    '\u1E26': 'H',
                    '\u021E': 'H',
                    '\u1E24': 'H',
                    '\u1E28': 'H',
                    '\u1E2A': 'H',
                    '\u0126': 'H',
                    '\u2C67': 'H',
                    '\u2C75': 'H',
                    '\uA78D': 'H',
                    '\u24BE': 'I',
                    '\uFF29': 'I',
                    '\u00CC': 'I',
                    '\u00CD': 'I',
                    '\u00CE': 'I',
                    '\u0128': 'I',
                    '\u012A': 'I',
                    '\u012C': 'I',
                    '\u0130': 'I',
                    '\u00CF': 'I',
                    '\u1E2E': 'I',
                    '\u1EC8': 'I',
                    '\u01CF': 'I',
                    '\u0208': 'I',
                    '\u020A': 'I',
                    '\u1ECA': 'I',
                    '\u012E': 'I',
                    '\u1E2C': 'I',
                    '\u0197': 'I',
                    '\u24BF': 'J',
                    '\uFF2A': 'J',
                    '\u0134': 'J',
                    '\u0248': 'J',
                    '\u24C0': 'K',
                    '\uFF2B': 'K',
                    '\u1E30': 'K',
                    '\u01E8': 'K',
                    '\u1E32': 'K',
                    '\u0136': 'K',
                    '\u1E34': 'K',
                    '\u0198': 'K',
                    '\u2C69': 'K',
                    '\uA740': 'K',
                    '\uA742': 'K',
                    '\uA744': 'K',
                    '\uA7A2': 'K',
                    '\u24C1': 'L',
                    '\uFF2C': 'L',
                    '\u013F': 'L',
                    '\u0139': 'L',
                    '\u013D': 'L',
                    '\u1E36': 'L',
                    '\u1E38': 'L',
                    '\u013B': 'L',
                    '\u1E3C': 'L',
                    '\u1E3A': 'L',
                    '\u0141': 'L',
                    '\u023D': 'L',
                    '\u2C62': 'L',
                    '\u2C60': 'L',
                    '\uA748': 'L',
                    '\uA746': 'L',
                    '\uA780': 'L',
                    '\u01C7': 'LJ',
                    '\u01C8': 'Lj',
                    '\u24C2': 'M',
                    '\uFF2D': 'M',
                    '\u1E3E': 'M',
                    '\u1E40': 'M',
                    '\u1E42': 'M',
                    '\u2C6E': 'M',
                    '\u019C': 'M',
                    '\u24C3': 'N',
                    '\uFF2E': 'N',
                    '\u01F8': 'N',
                    '\u0143': 'N',
                    '\u00D1': 'N',
                    '\u1E44': 'N',
                    '\u0147': 'N',
                    '\u1E46': 'N',
                    '\u0145': 'N',
                    '\u1E4A': 'N',
                    '\u1E48': 'N',
                    '\u0220': 'N',
                    '\u019D': 'N',
                    '\uA790': 'N',
                    '\uA7A4': 'N',
                    '\u01CA': 'NJ',
                    '\u01CB': 'Nj',
                    '\u24C4': 'O',
                    '\uFF2F': 'O',
                    '\u00D2': 'O',
                    '\u00D3': 'O',
                    '\u00D4': 'O',
                    '\u1ED2': 'O',
                    '\u1ED0': 'O',
                    '\u1ED6': 'O',
                    '\u1ED4': 'O',
                    '\u00D5': 'O',
                    '\u1E4C': 'O',
                    '\u022C': 'O',
                    '\u1E4E': 'O',
                    '\u014C': 'O',
                    '\u1E50': 'O',
                    '\u1E52': 'O',
                    '\u014E': 'O',
                    '\u022E': 'O',
                    '\u0230': 'O',
                    '\u00D6': 'O',
                    '\u022A': 'O',
                    '\u1ECE': 'O',
                    '\u0150': 'O',
                    '\u01D1': 'O',
                    '\u020C': 'O',
                    '\u020E': 'O',
                    '\u01A0': 'O',
                    '\u1EDC': 'O',
                    '\u1EDA': 'O',
                    '\u1EE0': 'O',
                    '\u1EDE': 'O',
                    '\u1EE2': 'O',
                    '\u1ECC': 'O',
                    '\u1ED8': 'O',
                    '\u01EA': 'O',
                    '\u01EC': 'O',
                    '\u00D8': 'O',
                    '\u01FE': 'O',
                    '\u0186': 'O',
                    '\u019F': 'O',
                    '\uA74A': 'O',
                    '\uA74C': 'O',
                    '\u0152': 'OE',
                    '\u01A2': 'OI',
                    '\uA74E': 'OO',
                    '\u0222': 'OU',
                    '\u24C5': 'P',
                    '\uFF30': 'P',
                    '\u1E54': 'P',
                    '\u1E56': 'P',
                    '\u01A4': 'P',
                    '\u2C63': 'P',
                    '\uA750': 'P',
                    '\uA752': 'P',
                    '\uA754': 'P',
                    '\u24C6': 'Q',
                    '\uFF31': 'Q',
                    '\uA756': 'Q',
                    '\uA758': 'Q',
                    '\u024A': 'Q',
                    '\u24C7': 'R',
                    '\uFF32': 'R',
                    '\u0154': 'R',
                    '\u1E58': 'R',
                    '\u0158': 'R',
                    '\u0210': 'R',
                    '\u0212': 'R',
                    '\u1E5A': 'R',
                    '\u1E5C': 'R',
                    '\u0156': 'R',
                    '\u1E5E': 'R',
                    '\u024C': 'R',
                    '\u2C64': 'R',
                    '\uA75A': 'R',
                    '\uA7A6': 'R',
                    '\uA782': 'R',
                    '\u24C8': 'S',
                    '\uFF33': 'S',
                    '\u1E9E': 'S',
                    '\u015A': 'S',
                    '\u1E64': 'S',
                    '\u015C': 'S',
                    '\u1E60': 'S',
                    '\u0160': 'S',
                    '\u1E66': 'S',
                    '\u1E62': 'S',
                    '\u1E68': 'S',
                    '\u0218': 'S',
                    '\u015E': 'S',
                    '\u2C7E': 'S',
                    '\uA7A8': 'S',
                    '\uA784': 'S',
                    '\u24C9': 'T',
                    '\uFF34': 'T',
                    '\u1E6A': 'T',
                    '\u0164': 'T',
                    '\u1E6C': 'T',
                    '\u021A': 'T',
                    '\u0162': 'T',
                    '\u1E70': 'T',
                    '\u1E6E': 'T',
                    '\u0166': 'T',
                    '\u01AC': 'T',
                    '\u01AE': 'T',
                    '\u023E': 'T',
                    '\uA786': 'T',
                    '\uA728': 'TZ',
                    '\u24CA': 'U',
                    '\uFF35': 'U',
                    '\u00D9': 'U',
                    '\u00DA': 'U',
                    '\u00DB': 'U',
                    '\u0168': 'U',
                    '\u1E78': 'U',
                    '\u016A': 'U',
                    '\u1E7A': 'U',
                    '\u016C': 'U',
                    '\u00DC': 'U',
                    '\u01DB': 'U',
                    '\u01D7': 'U',
                    '\u01D5': 'U',
                    '\u01D9': 'U',
                    '\u1EE6': 'U',
                    '\u016E': 'U',
                    '\u0170': 'U',
                    '\u01D3': 'U',
                    '\u0214': 'U',
                    '\u0216': 'U',
                    '\u01AF': 'U',
                    '\u1EEA': 'U',
                    '\u1EE8': 'U',
                    '\u1EEE': 'U',
                    '\u1EEC': 'U',
                    '\u1EF0': 'U',
                    '\u1EE4': 'U',
                    '\u1E72': 'U',
                    '\u0172': 'U',
                    '\u1E76': 'U',
                    '\u1E74': 'U',
                    '\u0244': 'U',
                    '\u24CB': 'V',
                    '\uFF36': 'V',
                    '\u1E7C': 'V',
                    '\u1E7E': 'V',
                    '\u01B2': 'V',
                    '\uA75E': 'V',
                    '\u0245': 'V',
                    '\uA760': 'VY',
                    '\u24CC': 'W',
                    '\uFF37': 'W',
                    '\u1E80': 'W',
                    '\u1E82': 'W',
                    '\u0174': 'W',
                    '\u1E86': 'W',
                    '\u1E84': 'W',
                    '\u1E88': 'W',
                    '\u2C72': 'W',
                    '\u24CD': 'X',
                    '\uFF38': 'X',
                    '\u1E8A': 'X',
                    '\u1E8C': 'X',
                    '\u24CE': 'Y',
                    '\uFF39': 'Y',
                    '\u1EF2': 'Y',
                    '\u00DD': 'Y',
                    '\u0176': 'Y',
                    '\u1EF8': 'Y',
                    '\u0232': 'Y',
                    '\u1E8E': 'Y',
                    '\u0178': 'Y',
                    '\u1EF6': 'Y',
                    '\u1EF4': 'Y',
                    '\u01B3': 'Y',
                    '\u024E': 'Y',
                    '\u1EFE': 'Y',
                    '\u24CF': 'Z',
                    '\uFF3A': 'Z',
                    '\u0179': 'Z',
                    '\u1E90': 'Z',
                    '\u017B': 'Z',
                    '\u017D': 'Z',
                    '\u1E92': 'Z',
                    '\u1E94': 'Z',
                    '\u01B5': 'Z',
                    '\u0224': 'Z',
                    '\u2C7F': 'Z',
                    '\u2C6B': 'Z',
                    '\uA762': 'Z',
                    '\u24D0': 'a',
                    '\uFF41': 'a',
                    '\u1E9A': 'a',
                    '\u00E0': 'a',
                    '\u00E1': 'a',
                    '\u00E2': 'a',
                    '\u1EA7': 'a',
                    '\u1EA5': 'a',
                    '\u1EAB': 'a',
                    '\u1EA9': 'a',
                    '\u00E3': 'a',
                    '\u0101': 'a',
                    '\u0103': 'a',
                    '\u1EB1': 'a',
                    '\u1EAF': 'a',
                    '\u1EB5': 'a',
                    '\u1EB3': 'a',
                    '\u0227': 'a',
                    '\u01E1': 'a',
                    '\u00E4': 'a',
                    '\u01DF': 'a',
                    '\u1EA3': 'a',
                    '\u00E5': 'a',
                    '\u01FB': 'a',
                    '\u01CE': 'a',
                    '\u0201': 'a',
                    '\u0203': 'a',
                    '\u1EA1': 'a',
                    '\u1EAD': 'a',
                    '\u1EB7': 'a',
                    '\u1E01': 'a',
                    '\u0105': 'a',
                    '\u2C65': 'a',
                    '\u0250': 'a',
                    '\uA733': 'aa',
                    '\u00E6': 'ae',
                    '\u01FD': 'ae',
                    '\u01E3': 'ae',
                    '\uA735': 'ao',
                    '\uA737': 'au',
                    '\uA739': 'av',
                    '\uA73B': 'av',
                    '\uA73D': 'ay',
                    '\u24D1': 'b',
                    '\uFF42': 'b',
                    '\u1E03': 'b',
                    '\u1E05': 'b',
                    '\u1E07': 'b',
                    '\u0180': 'b',
                    '\u0183': 'b',
                    '\u0253': 'b',
                    '\u24D2': 'c',
                    '\uFF43': 'c',
                    '\u0107': 'c',
                    '\u0109': 'c',
                    '\u010B': 'c',
                    '\u010D': 'c',
                    '\u00E7': 'c',
                    '\u1E09': 'c',
                    '\u0188': 'c',
                    '\u023C': 'c',
                    '\uA73F': 'c',
                    '\u2184': 'c',
                    '\u24D3': 'd',
                    '\uFF44': 'd',
                    '\u1E0B': 'd',
                    '\u010F': 'd',
                    '\u1E0D': 'd',
                    '\u1E11': 'd',
                    '\u1E13': 'd',
                    '\u1E0F': 'd',
                    '\u0111': 'd',
                    '\u018C': 'd',
                    '\u0256': 'd',
                    '\u0257': 'd',
                    '\uA77A': 'd',
                    '\u01F3': 'dz',
                    '\u01C6': 'dz',
                    '\u24D4': 'e',
                    '\uFF45': 'e',
                    '\u00E8': 'e',
                    '\u00E9': 'e',
                    '\u00EA': 'e',
                    '\u1EC1': 'e',
                    '\u1EBF': 'e',
                    '\u1EC5': 'e',
                    '\u1EC3': 'e',
                    '\u1EBD': 'e',
                    '\u0113': 'e',
                    '\u1E15': 'e',
                    '\u1E17': 'e',
                    '\u0115': 'e',
                    '\u0117': 'e',
                    '\u00EB': 'e',
                    '\u1EBB': 'e',
                    '\u011B': 'e',
                    '\u0205': 'e',
                    '\u0207': 'e',
                    '\u1EB9': 'e',
                    '\u1EC7': 'e',
                    '\u0229': 'e',
                    '\u1E1D': 'e',
                    '\u0119': 'e',
                    '\u1E19': 'e',
                    '\u1E1B': 'e',
                    '\u0247': 'e',
                    '\u025B': 'e',
                    '\u01DD': 'e',
                    '\u24D5': 'f',
                    '\uFF46': 'f',
                    '\u1E1F': 'f',
                    '\u0192': 'f',
                    '\uA77C': 'f',
                    '\u24D6': 'g',
                    '\uFF47': 'g',
                    '\u01F5': 'g',
                    '\u011D': 'g',
                    '\u1E21': 'g',
                    '\u011F': 'g',
                    '\u0121': 'g',
                    '\u01E7': 'g',
                    '\u0123': 'g',
                    '\u01E5': 'g',
                    '\u0260': 'g',
                    '\uA7A1': 'g',
                    '\u1D79': 'g',
                    '\uA77F': 'g',
                    '\u24D7': 'h',
                    '\uFF48': 'h',
                    '\u0125': 'h',
                    '\u1E23': 'h',
                    '\u1E27': 'h',
                    '\u021F': 'h',
                    '\u1E25': 'h',
                    '\u1E29': 'h',
                    '\u1E2B': 'h',
                    '\u1E96': 'h',
                    '\u0127': 'h',
                    '\u2C68': 'h',
                    '\u2C76': 'h',
                    '\u0265': 'h',
                    '\u0195': 'hv',
                    '\u24D8': 'i',
                    '\uFF49': 'i',
                    '\u00EC': 'i',
                    '\u00ED': 'i',
                    '\u00EE': 'i',
                    '\u0129': 'i',
                    '\u012B': 'i',
                    '\u012D': 'i',
                    '\u00EF': 'i',
                    '\u1E2F': 'i',
                    '\u1EC9': 'i',
                    '\u01D0': 'i',
                    '\u0209': 'i',
                    '\u020B': 'i',
                    '\u1ECB': 'i',
                    '\u012F': 'i',
                    '\u1E2D': 'i',
                    '\u0268': 'i',
                    '\u0131': 'i',
                    '\u24D9': 'j',
                    '\uFF4A': 'j',
                    '\u0135': 'j',
                    '\u01F0': 'j',
                    '\u0249': 'j',
                    '\u24DA': 'k',
                    '\uFF4B': 'k',
                    '\u1E31': 'k',
                    '\u01E9': 'k',
                    '\u1E33': 'k',
                    '\u0137': 'k',
                    '\u1E35': 'k',
                    '\u0199': 'k',
                    '\u2C6A': 'k',
                    '\uA741': 'k',
                    '\uA743': 'k',
                    '\uA745': 'k',
                    '\uA7A3': 'k',
                    '\u24DB': 'l',
                    '\uFF4C': 'l',
                    '\u0140': 'l',
                    '\u013A': 'l',
                    '\u013E': 'l',
                    '\u1E37': 'l',
                    '\u1E39': 'l',
                    '\u013C': 'l',
                    '\u1E3D': 'l',
                    '\u1E3B': 'l',
                    '\u017F': 'l',
                    '\u0142': 'l',
                    '\u019A': 'l',
                    '\u026B': 'l',
                    '\u2C61': 'l',
                    '\uA749': 'l',
                    '\uA781': 'l',
                    '\uA747': 'l',
                    '\u01C9': 'lj',
                    '\u24DC': 'm',
                    '\uFF4D': 'm',
                    '\u1E3F': 'm',
                    '\u1E41': 'm',
                    '\u1E43': 'm',
                    '\u0271': 'm',
                    '\u026F': 'm',
                    '\u24DD': 'n',
                    '\uFF4E': 'n',
                    '\u01F9': 'n',
                    '\u0144': 'n',
                    '\u00F1': 'n',
                    '\u1E45': 'n',
                    '\u0148': 'n',
                    '\u1E47': 'n',
                    '\u0146': 'n',
                    '\u1E4B': 'n',
                    '\u1E49': 'n',
                    '\u019E': 'n',
                    '\u0272': 'n',
                    '\u0149': 'n',
                    '\uA791': 'n',
                    '\uA7A5': 'n',
                    '\u01CC': 'nj',
                    '\u24DE': 'o',
                    '\uFF4F': 'o',
                    '\u00F2': 'o',
                    '\u00F3': 'o',
                    '\u00F4': 'o',
                    '\u1ED3': 'o',
                    '\u1ED1': 'o',
                    '\u1ED7': 'o',
                    '\u1ED5': 'o',
                    '\u00F5': 'o',
                    '\u1E4D': 'o',
                    '\u022D': 'o',
                    '\u1E4F': 'o',
                    '\u014D': 'o',
                    '\u1E51': 'o',
                    '\u1E53': 'o',
                    '\u014F': 'o',
                    '\u022F': 'o',
                    '\u0231': 'o',
                    '\u00F6': 'o',
                    '\u022B': 'o',
                    '\u1ECF': 'o',
                    '\u0151': 'o',
                    '\u01D2': 'o',
                    '\u020D': 'o',
                    '\u020F': 'o',
                    '\u01A1': 'o',
                    '\u1EDD': 'o',
                    '\u1EDB': 'o',
                    '\u1EE1': 'o',
                    '\u1EDF': 'o',
                    '\u1EE3': 'o',
                    '\u1ECD': 'o',
                    '\u1ED9': 'o',
                    '\u01EB': 'o',
                    '\u01ED': 'o',
                    '\u00F8': 'o',
                    '\u01FF': 'o',
                    '\u0254': 'o',
                    '\uA74B': 'o',
                    '\uA74D': 'o',
                    '\u0275': 'o',
                    '\u0153': 'oe',
                    '\u01A3': 'oi',
                    '\u0223': 'ou',
                    '\uA74F': 'oo',
                    '\u24DF': 'p',
                    '\uFF50': 'p',
                    '\u1E55': 'p',
                    '\u1E57': 'p',
                    '\u01A5': 'p',
                    '\u1D7D': 'p',
                    '\uA751': 'p',
                    '\uA753': 'p',
                    '\uA755': 'p',
                    '\u24E0': 'q',
                    '\uFF51': 'q',
                    '\u024B': 'q',
                    '\uA757': 'q',
                    '\uA759': 'q',
                    '\u24E1': 'r',
                    '\uFF52': 'r',
                    '\u0155': 'r',
                    '\u1E59': 'r',
                    '\u0159': 'r',
                    '\u0211': 'r',
                    '\u0213': 'r',
                    '\u1E5B': 'r',
                    '\u1E5D': 'r',
                    '\u0157': 'r',
                    '\u1E5F': 'r',
                    '\u024D': 'r',
                    '\u027D': 'r',
                    '\uA75B': 'r',
                    '\uA7A7': 'r',
                    '\uA783': 'r',
                    '\u24E2': 's',
                    '\uFF53': 's',
                    '\u00DF': 's',
                    '\u015B': 's',
                    '\u1E65': 's',
                    '\u015D': 's',
                    '\u1E61': 's',
                    '\u0161': 's',
                    '\u1E67': 's',
                    '\u1E63': 's',
                    '\u1E69': 's',
                    '\u0219': 's',
                    '\u015F': 's',
                    '\u023F': 's',
                    '\uA7A9': 's',
                    '\uA785': 's',
                    '\u1E9B': 's',
                    '\u24E3': 't',
                    '\uFF54': 't',
                    '\u1E6B': 't',
                    '\u1E97': 't',
                    '\u0165': 't',
                    '\u1E6D': 't',
                    '\u021B': 't',
                    '\u0163': 't',
                    '\u1E71': 't',
                    '\u1E6F': 't',
                    '\u0167': 't',
                    '\u01AD': 't',
                    '\u0288': 't',
                    '\u2C66': 't',
                    '\uA787': 't',
                    '\uA729': 'tz',
                    '\u24E4': 'u',
                    '\uFF55': 'u',
                    '\u00F9': 'u',
                    '\u00FA': 'u',
                    '\u00FB': 'u',
                    '\u0169': 'u',
                    '\u1E79': 'u',
                    '\u016B': 'u',
                    '\u1E7B': 'u',
                    '\u016D': 'u',
                    '\u00FC': 'u',
                    '\u01DC': 'u',
                    '\u01D8': 'u',
                    '\u01D6': 'u',
                    '\u01DA': 'u',
                    '\u1EE7': 'u',
                    '\u016F': 'u',
                    '\u0171': 'u',
                    '\u01D4': 'u',
                    '\u0215': 'u',
                    '\u0217': 'u',
                    '\u01B0': 'u',
                    '\u1EEB': 'u',
                    '\u1EE9': 'u',
                    '\u1EEF': 'u',
                    '\u1EED': 'u',
                    '\u1EF1': 'u',
                    '\u1EE5': 'u',
                    '\u1E73': 'u',
                    '\u0173': 'u',
                    '\u1E77': 'u',
                    '\u1E75': 'u',
                    '\u0289': 'u',
                    '\u24E5': 'v',
                    '\uFF56': 'v',
                    '\u1E7D': 'v',
                    '\u1E7F': 'v',
                    '\u028B': 'v',
                    '\uA75F': 'v',
                    '\u028C': 'v',
                    '\uA761': 'vy',
                    '\u24E6': 'w',
                    '\uFF57': 'w',
                    '\u1E81': 'w',
                    '\u1E83': 'w',
                    '\u0175': 'w',
                    '\u1E87': 'w',
                    '\u1E85': 'w',
                    '\u1E98': 'w',
                    '\u1E89': 'w',
                    '\u2C73': 'w',
                    '\u24E7': 'x',
                    '\uFF58': 'x',
                    '\u1E8B': 'x',
                    '\u1E8D': 'x',
                    '\u24E8': 'y',
                    '\uFF59': 'y',
                    '\u1EF3': 'y',
                    '\u00FD': 'y',
                    '\u0177': 'y',
                    '\u1EF9': 'y',
                    '\u0233': 'y',
                    '\u1E8F': 'y',
                    '\u00FF': 'y',
                    '\u1EF7': 'y',
                    '\u1E99': 'y',
                    '\u1EF5': 'y',
                    '\u01B4': 'y',
                    '\u024F': 'y',
                    '\u1EFF': 'y',
                    '\u24E9': 'z',
                    '\uFF5A': 'z',
                    '\u017A': 'z',
                    '\u1E91': 'z',
                    '\u017C': 'z',
                    '\u017E': 'z',
                    '\u1E93': 'z',
                    '\u1E95': 'z',
                    '\u01B6': 'z',
                    '\u0225': 'z',
                    '\u0240': 'z',
                    '\u2C6C': 'z',
                    '\uA763': 'z',
                    '\u0386': '\u0391',
                    '\u0388': '\u0395',
                    '\u0389': '\u0397',
                    '\u038A': '\u0399',
                    '\u03AA': '\u0399',
                    '\u038C': '\u039F',
                    '\u038E': '\u03A5',
                    '\u03AB': '\u03A5',
                    '\u038F': '\u03A9',
                    '\u03AC': '\u03B1',
                    '\u03AD': '\u03B5',
                    '\u03AE': '\u03B7',
                    '\u03AF': '\u03B9',
                    '\u03CA': '\u03B9',
                    '\u0390': '\u03B9',
                    '\u03CC': '\u03BF',
                    '\u03CD': '\u03C5',
                    '\u03CB': '\u03C5',
                    '\u03B0': '\u03C5',
                    '\u03CE': '\u03C9',
                    '\u03C2': '\u03C3',
                    '\u2019': '\''
                };

                return diacritics;
            });

            S2.define('select2/data/base',[
                '../utils'
            ], function (Utils) {
                function BaseAdapter ($element, options) {
                    BaseAdapter.__super__.constructor.call(this);
                }

                Utils.Extend(BaseAdapter, Utils.Observable);

                BaseAdapter.prototype.current = function (callback) {
                    throw new Error('The `current` method must be defined in child classes.');
                };

                BaseAdapter.prototype.query = function (params, callback) {
                    throw new Error('The `query` method must be defined in child classes.');
                };

                BaseAdapter.prototype.bind = function (container, $container) {
                    // Can be implemented in subclasses
                };

                BaseAdapter.prototype.destroy = function () {
                    // Can be implemented in subclasses
                };

                BaseAdapter.prototype.generateResultId = function (container, data) {
                    var id = container.id + '-result-';

                    id += Utils.generateChars(4);

                    if (data.id != null) {
                        id += '-' + data.id.toString();
                    } else {
                        id += '-' + Utils.generateChars(4);
                    }
                    return id;
                };

                return BaseAdapter;
            });

            S2.define('select2/data/select',[
                './base',
                '../utils',
                'jquery'
            ], function (BaseAdapter, Utils, $) {
                function SelectAdapter ($element, options) {
                    this.$element = $element;
                    this.options = options;

                    SelectAdapter.__super__.constructor.call(this);
                }

                Utils.Extend(SelectAdapter, BaseAdapter);

                SelectAdapter.prototype.current = function (callback) {
                    var data = [];
                    var self = this;

                    this.$element.find(':selected').each(function () {
                        var $option = $(this);

                        var option = self.item($option);

                        data.push(option);
                    });

                    callback(data);
                };

                SelectAdapter.prototype.select = function (data) {
                    var self = this;

                    data.selected = true;

                    // If data.element is a DOM node, use it instead
                    if ($(data.element).is('option')) {
                        data.element.selected = true;

                        this.$element.trigger('change');

                        return;
                    }

                    if (this.$element.prop('multiple')) {
                        this.current(function (currentData) {
                            var val = [];

                            data = [data];
                            data.push.apply(data, currentData);

                            for (var d = 0; d < data.length; d++) {
                                var id = data[d].id;

                                if ($.inArray(id, val) === -1) {
                                    val.push(id);
                                }
                            }

                            self.$element.val(val);
                            self.$element.trigger('change');
                        });
                    } else {
                        var val = data.id;

                        this.$element.val(val);
                        this.$element.trigger('change');
                    }
                };

                SelectAdapter.prototype.unselect = function (data) {
                    var self = this;

                    if (!this.$element.prop('multiple')) {
                        return;
                    }

                    data.selected = false;

                    if ($(data.element).is('option')) {
                        data.element.selected = false;

                        this.$element.trigger('change');

                        return;
                    }

                    this.current(function (currentData) {
                        var val = [];

                        for (var d = 0; d < currentData.length; d++) {
                            var id = currentData[d].id;

                            if (id !== data.id && $.inArray(id, val) === -1) {
                                val.push(id);
                            }
                        }

                        self.$element.val(val);

                        self.$element.trigger('change');
                    });
                };

                SelectAdapter.prototype.bind = function (container, $container) {
                    var self = this;

                    this.container = container;

                    container.on('select', function (params) {
                        self.select(params.data);
                    });

                    container.on('unselect', function (params) {
                        self.unselect(params.data);
                    });
                };

                SelectAdapter.prototype.destroy = function () {
                    // Remove anything added to child elements
                    this.$element.find('*').each(function () {
                        // Remove any custom data set by Select2
                        Utils.RemoveData(this);
                    });
                };

                SelectAdapter.prototype.query = function (params, callback) {
                    var data = [];
                    var self = this;

                    var $options = this.$element.children();

                    $options.each(function () {
                        var $option = $(this);

                        if (!$option.is('option') && !$option.is('optgroup')) {
                            return;
                        }

                        var option = self.item($option);

                        var matches = self.matches(params, option);

                        if (matches !== null) {
                            data.push(matches);
                        }
                    });

                    callback({
                        results: data
                    });
                };

                SelectAdapter.prototype.addOptions = function ($options) {
                    Utils.appendMany(this.$element, $options);
                };

                SelectAdapter.prototype.option = function (data) {
                    var option;

                    if (data.children) {
                        option = document.createElement('optgroup');
                        option.label = data.text;
                    } else {
                        option = document.createElement('option');

                        if (option.textContent !== undefined) {
                            option.textContent = data.text;
                        } else {
                            option.innerText = data.text;
                        }
                    }

                    if (data.id !== undefined) {
                        option.value = data.id;
                    }

                    if (data.disabled) {
                        option.disabled = true;
                    }

                    if (data.selected) {
                        option.selected = true;
                    }

                    if (data.title) {
                        option.title = data.title;
                    }

                    var $option = $(option);

                    var normalizedData = this._normalizeItem(data);
                    normalizedData.element = option;

                    // Override the option's data with the combined data
                    Utils.StoreData(option, 'data', normalizedData);

                    return $option;
                };

                SelectAdapter.prototype.item = function ($option) {
                    var data = {};

                    data = Utils.GetData($option[0], 'data');

                    if (data != null) {
                        return data;
                    }

                    if ($option.is('option')) {
                        data = {
                            id: $option.val(),
                            text: $option.text(),
                            disabled: $option.prop('disabled'),
                            selected: $option.prop('selected'),
                            title: $option.prop('title')
                        };
                    } else if ($option.is('optgroup')) {
                        data = {
                            text: $option.prop('label'),
                            children: [],
                            title: $option.prop('title')
                        };

                        var $children = $option.children('option');
                        var children = [];

                        for (var c = 0; c < $children.length; c++) {
                            var $child = $($children[c]);

                            var child = this.item($child);

                            children.push(child);
                        }

                        data.children = children;
                    }

                    data = this._normalizeItem(data);
                    data.element = $option[0];

                    Utils.StoreData($option[0], 'data', data);

                    return data;
                };

                SelectAdapter.prototype._normalizeItem = function (item) {
                    if (item !== Object(item)) {
                        item = {
                            id: item,
                            text: item
                        };
                    }

                    item = $.extend({}, {
                        text: ''
                    }, item);

                    var defaults = {
                        selected: false,
                        disabled: false
                    };

                    if (item.id != null) {
                        item.id = item.id.toString();
                    }

                    if (item.text != null) {
                        item.text = item.text.toString();
                    }

                    if (item._resultId == null && item.id && this.container != null) {
                        item._resultId = this.generateResultId(this.container, item);
                    }

                    return $.extend({}, defaults, item);
                };

                SelectAdapter.prototype.matches = function (params, data) {
                    var matcher = this.options.get('matcher');

                    return matcher(params, data);
                };

                return SelectAdapter;
            });

            S2.define('select2/data/array',[
                './select',
                '../utils',
                'jquery'
            ], function (SelectAdapter, Utils, $) {
                function ArrayAdapter ($element, options) {
                    this._dataToConvert = options.get('data') || [];

                    ArrayAdapter.__super__.constructor.call(this, $element, options);
                }

                Utils.Extend(ArrayAdapter, SelectAdapter);

                ArrayAdapter.prototype.bind = function (container, $container) {
                    ArrayAdapter.__super__.bind.call(this, container, $container);

                    this.addOptions(this.convertToOptions(this._dataToConvert));
                };

                ArrayAdapter.prototype.select = function (data) {
                    var $option = this.$element.find('option').filter(function (i, elm) {
                        return elm.value == data.id.toString();
                    });

                    if ($option.length === 0) {
                        $option = this.option(data);

                        this.addOptions($option);
                    }

                    ArrayAdapter.__super__.select.call(this, data);
                };

                ArrayAdapter.prototype.convertToOptions = function (data) {
                    var self = this;

                    var $existing = this.$element.find('option');
                    var existingIds = $existing.map(function () {
                        return self.item($(this)).id;
                    }).get();

                    var $options = [];

                    // Filter out all items except for the one passed in the argument
                    function onlyItem (item) {
                        return function () {
                            return $(this).val() == item.id;
                        };
                    }

                    for (var d = 0; d < data.length; d++) {
                        var item = this._normalizeItem(data[d]);

                        // Skip items which were pre-loaded, only merge the data
                        if ($.inArray(item.id, existingIds) >= 0) {
                            var $existingOption = $existing.filter(onlyItem(item));

                            var existingData = this.item($existingOption);
                            var newData = $.extend(true, {}, item, existingData);

                            var $newOption = this.option(newData);

                            $existingOption.replaceWith($newOption);

                            continue;
                        }

                        var $option = this.option(item);

                        if (item.children) {
                            var $children = this.convertToOptions(item.children);

                            Utils.appendMany($option, $children);
                        }

                        $options.push($option);
                    }

                    return $options;
                };

                return ArrayAdapter;
            });

            S2.define('select2/data/ajax',[
                './array',
                '../utils',
                'jquery'
            ], function (ArrayAdapter, Utils, $) {
                function AjaxAdapter ($element, options) {
                    this.ajaxOptions = this._applyDefaults(options.get('ajax'));

                    if (this.ajaxOptions.processResults != null) {
                        this.processResults = this.ajaxOptions.processResults;
                    }

                    AjaxAdapter.__super__.constructor.call(this, $element, options);
                }

                Utils.Extend(AjaxAdapter, ArrayAdapter);

                AjaxAdapter.prototype._applyDefaults = function (options) {
                    var defaults = {
                        data: function (params) {
                            return $.extend({}, params, {
                                q: params.term
                            });
                        },
                        transport: function (params, success, failure) {
                            var $request = $.ajax(params);

                            $request.then(success);
                            $request.fail(failure);

                            return $request;
                        }
                    };

                    return $.extend({}, defaults, options, true);
                };

                AjaxAdapter.prototype.processResults = function (results) {
                    return results;
                };

                AjaxAdapter.prototype.query = function (params, callback) {
                    var matches = [];
                    var self = this;

                    if (this._request != null) {
                        // JSONP requests cannot always be aborted
                        if ($.isFunction(this._request.abort)) {
                            this._request.abort();
                        }

                        this._request = null;
                    }

                    var options = $.extend({
                        type: 'GET'
                    }, this.ajaxOptions);

                    if (typeof options.url === 'function') {
                        options.url = options.url.call(this.$element, params);
                    }

                    if (typeof options.data === 'function') {
                        options.data = options.data.call(this.$element, params);
                    }

                    function request () {
                        var $request = options.transport(options, function (data) {
                            var results = self.processResults(data, params);

                            if (self.options.get('debug') && window.console && console.error) {
                                // Check to make sure that the response included a `results` key.
                                if (!results || !results.results || !$.isArray(results.results)) {
                                    console.error(
                                        'Select2: The AJAX results did not return an array in the ' +
                                        '`results` key of the response.'
                                    );
                                }
                            }

                            callback(results);
                        }, function () {
                            // Attempt to detect if a request was aborted
                            // Only works if the transport exposes a status property
                            if ('status' in $request &&
                                ($request.status === 0 || $request.status === '0')) {
                                return;
                            }

                            self.trigger('results:message', {
                                message: 'errorLoading'
                            });
                        });

                        self._request = $request;
                    }

                    if (this.ajaxOptions.delay && params.term != null) {
                        if (this._queryTimeout) {
                            window.clearTimeout(this._queryTimeout);
                        }

                        this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
                    } else {
                        request();
                    }
                };

                return AjaxAdapter;
            });

            S2.define('select2/data/tags',[
                'jquery'
            ], function ($) {
                function Tags (decorated, $element, options) {
                    var tags = options.get('tags');

                    var createTag = options.get('createTag');

                    if (createTag !== undefined) {
                        this.createTag = createTag;
                    }

                    var insertTag = options.get('insertTag');

                    if (insertTag !== undefined) {
                        this.insertTag = insertTag;
                    }

                    decorated.call(this, $element, options);

                    if ($.isArray(tags)) {
                        for (var t = 0; t < tags.length; t++) {
                            var tag = tags[t];
                            var item = this._normalizeItem(tag);

                            var $option = this.option(item);

                            this.$element.append($option);
                        }
                    }
                }

                Tags.prototype.query = function (decorated, params, callback) {
                    var self = this;

                    this._removeOldTags();

                    if (params.term == null || params.page != null) {
                        decorated.call(this, params, callback);
                        return;
                    }

                    function wrapper (obj, child) {
                        var data = obj.results;

                        for (var i = 0; i < data.length; i++) {
                            var option = data[i];

                            var checkChildren = (
                                option.children != null &&
                                !wrapper({
                                    results: option.children
                                }, true)
                            );

                            var optionText = (option.text || '').toUpperCase();
                            var paramsTerm = (params.term || '').toUpperCase();

                            var checkText = optionText === paramsTerm;

                            if (checkText || checkChildren) {
                                if (child) {
                                    return false;
                                }

                                obj.data = data;
                                callback(obj);

                                return;
                            }
                        }

                        if (child) {
                            return true;
                        }

                        var tag = self.createTag(params);

                        if (tag != null) {
                            var $option = self.option(tag);
                            $option.attr('data-select2-tag', true);

                            self.addOptions([$option]);

                            self.insertTag(data, tag);
                        }

                        obj.results = data;

                        callback(obj);
                    }

                    decorated.call(this, params, wrapper);
                };

                Tags.prototype.createTag = function (decorated, params) {
                    var term = $.trim(params.term);

                    if (term === '') {
                        return null;
                    }

                    return {
                        id: term,
                        text: term
                    };
                };

                Tags.prototype.insertTag = function (_, data, tag) {
                    data.unshift(tag);
                };

                Tags.prototype._removeOldTags = function (_) {
                    var $options = this.$element.find('option[data-select2-tag]');

                    $options.each(function () {
                        if (this.selected) {
                            return;
                        }

                        $(this).remove();
                    });
                };

                return Tags;
            });

            S2.define('select2/data/tokenizer',[
                'jquery'
            ], function ($) {
                function Tokenizer (decorated, $element, options) {
                    var tokenizer = options.get('tokenizer');

                    if (tokenizer !== undefined) {
                        this.tokenizer = tokenizer;
                    }

                    decorated.call(this, $element, options);
                }

                Tokenizer.prototype.bind = function (decorated, container, $container) {
                    decorated.call(this, container, $container);

                    this.$search =  container.dropdown.$search || container.selection.$search ||
                        $container.find('.select2-search__field');
                };

                Tokenizer.prototype.query = function (decorated, params, callback) {
                    var self = this;

                    function createAndSelect (data) {
                        // Normalize the data object so we can use it for checks
                        var item = self._normalizeItem(data);

                        // Check if the data object already exists as a tag
                        // Select it if it doesn't
                        var $existingOptions = self.$element.find('option').filter(function () {
                            return $(this).val() === item.id;
                        });

                        // If an existing option wasn't found for it, create the option
                        if (!$existingOptions.length) {
                            var $option = self.option(item);
                            $option.attr('data-select2-tag', true);

                            self._removeOldTags();
                            self.addOptions([$option]);
                        }

                        // Select the item, now that we know there is an option for it
                        select(item);
                    }

                    function select (data) {
                        self.trigger('select', {
                            data: data
                        });
                    }

                    params.term = params.term || '';

                    var tokenData = this.tokenizer(params, this.options, createAndSelect);

                    if (tokenData.term !== params.term) {
                        // Replace the search term if we have the search box
                        if (this.$search.length) {
                            this.$search.val(tokenData.term);
                            this.$search.trigger('focus');
                        }

                        params.term = tokenData.term;
                    }

                    decorated.call(this, params, callback);
                };

                Tokenizer.prototype.tokenizer = function (_, params, options, callback) {
                    var separators = options.get('tokenSeparators') || [];
                    var term = params.term;
                    var i = 0;

                    var createTag = this.createTag || function (params) {
                        return {
                            id: params.term,
                            text: params.term
                        };
                    };

                    while (i < term.length) {
                        var termChar = term[i];

                        if ($.inArray(termChar, separators) === -1) {
                            i++;

                            continue;
                        }

                        var part = term.substr(0, i);
                        var partParams = $.extend({}, params, {
                            term: part
                        });

                        var data = createTag(partParams);

                        if (data == null) {
                            i++;
                            continue;
                        }

                        callback(data);

                        // Reset the term to not include the tokenized portion
                        term = term.substr(i + 1) || '';
                        i = 0;
                    }

                    return {
                        term: term
                    };
                };

                return Tokenizer;
            });

            S2.define('select2/data/minimumInputLength',[

            ], function () {
                function MinimumInputLength (decorated, $e, options) {
                    this.minimumInputLength = options.get('minimumInputLength');

                    decorated.call(this, $e, options);
                }

                MinimumInputLength.prototype.query = function (decorated, params, callback) {
                    params.term = params.term || '';

                    if (params.term.length < this.minimumInputLength) {
                        this.trigger('results:message', {
                            message: 'inputTooShort',
                            args: {
                                minimum: this.minimumInputLength,
                                input: params.term,
                                params: params
                            }
                        });

                        return;
                    }

                    decorated.call(this, params, callback);
                };

                return MinimumInputLength;
            });

            S2.define('select2/data/maximumInputLength',[

            ], function () {
                function MaximumInputLength (decorated, $e, options) {
                    this.maximumInputLength = options.get('maximumInputLength');

                    decorated.call(this, $e, options);
                }

                MaximumInputLength.prototype.query = function (decorated, params, callback) {
                    params.term = params.term || '';

                    if (this.maximumInputLength > 0 &&
                        params.term.length > this.maximumInputLength) {
                        this.trigger('results:message', {
                            message: 'inputTooLong',
                            args: {
                                maximum: this.maximumInputLength,
                                input: params.term,
                                params: params
                            }
                        });

                        return;
                    }

                    decorated.call(this, params, callback);
                };

                return MaximumInputLength;
            });

            S2.define('select2/data/maximumSelectionLength',[

            ], function (){
                function MaximumSelectionLength (decorated, $e, options) {
                    this.maximumSelectionLength = options.get('maximumSelectionLength');

                    decorated.call(this, $e, options);
                }

                MaximumSelectionLength.prototype.bind =
                    function (decorated, container, $container) {
                        var self = this;

                        decorated.call(this, container, $container);

                        container.on('select', function () {
                            self._checkIfMaximumSelected();
                        });
                    };

                MaximumSelectionLength.prototype.query =
                    function (decorated, params, callback) {
                        var self = this;

                        this._checkIfMaximumSelected(function () {
                            decorated.call(self, params, callback);
                        });
                    };

                MaximumSelectionLength.prototype._checkIfMaximumSelected =
                    function (_, successCallback) {
                        var self = this;

                        this.current(function (currentData) {
                            var count = currentData != null ? currentData.length : 0;
                            if (self.maximumSelectionLength > 0 &&
                                count >= self.maximumSelectionLength) {
                                self.trigger('results:message', {
                                    message: 'maximumSelected',
                                    args: {
                                        maximum: self.maximumSelectionLength
                                    }
                                });
                                return;
                            }

                            if (successCallback) {
                                successCallback();
                            }
                        });
                    };

                return MaximumSelectionLength;
            });

            S2.define('select2/dropdown',[
                'jquery',
                './utils'
            ], function ($, Utils) {
                function Dropdown ($element, options) {
                    this.$element = $element;
                    this.options = options;

                    Dropdown.__super__.constructor.call(this);
                }

                Utils.Extend(Dropdown, Utils.Observable);

                Dropdown.prototype.render = function () {
                    var $dropdown = $(
                        '<span class="select2-dropdown">' +
                        '<span class="select2-results"></span>' +
                        '</span>'
                    );

                    $dropdown.attr('dir', this.options.get('dir'));

                    this.$dropdown = $dropdown;

                    return $dropdown;
                };

                Dropdown.prototype.bind = function () {
                    // Should be implemented in subclasses
                };

                Dropdown.prototype.position = function ($dropdown, $container) {
                    // Should be implemented in subclasses
                };

                Dropdown.prototype.destroy = function () {
                    // Remove the dropdown from the DOM
                    this.$dropdown.remove();
                };

                return Dropdown;
            });

            S2.define('select2/dropdown/search',[
                'jquery',
                '../utils'
            ], function ($, Utils) {
                function Search () { }

                Search.prototype.render = function (decorated) {
                    var $rendered = decorated.call(this);

                    var $search = $(
                        '<span class="select2-search select2-search--dropdown">' +
                        '<input class="select2-search__field" type="search" tabindex="-1"' +
                        ' autocomplete="off" autocorrect="off" autocapitalize="none"' +
                        ' spellcheck="false" role="searchbox" aria-autocomplete="list" />' +
                        '</span>'
                    );

                    this.$searchContainer = $search;
                    this.$search = $search.find('input');

                    $rendered.prepend($search);

                    return $rendered;
                };

                Search.prototype.bind = function (decorated, container, $container) {
                    var self = this;

                    var resultsId = container.id + '-results';

                    decorated.call(this, container, $container);

                    this.$search.on('keydown', function (evt) {
                        self.trigger('keypress', evt);

                        self._keyUpPrevented = evt.isDefaultPrevented();
                    });

                    // Workaround for browsers which do not support the `input` event
                    // This will prevent double-triggering of events for browsers which support
                    // both the `keyup` and `input` events.
                    this.$search.on('input', function (evt) {
                        // Unbind the duplicated `keyup` event
                        $(this).off('keyup');
                    });

                    this.$search.on('keyup input', function (evt) {
                        self.handleSearch(evt);
                    });

                    container.on('open', function () {
                        self.$search.attr('tabindex', 0);
                        self.$search.attr('aria-controls', resultsId);

                        self.$search.trigger('focus');

                        window.setTimeout(function () {
                            self.$search.trigger('focus');
                        }, 0);
                    });

                    container.on('close', function () {
                        self.$search.attr('tabindex', -1);
                        self.$search.removeAttr('aria-controls');
                        self.$search.removeAttr('aria-activedescendant');

                        self.$search.val('');
                        self.$search.trigger('blur');
                    });

                    container.on('focus', function () {
                        if (!container.isOpen()) {
                            self.$search.trigger('focus');
                        }
                    });

                    container.on('results:all', function (params) {
                        if (params.query.term == null || params.query.term === '') {
                            var showSearch = self.showSearch(params);

                            if (showSearch) {
                                self.$searchContainer.removeClass('select2-search--hide');
                            } else {
                                self.$searchContainer.addClass('select2-search--hide');
                            }
                        }
                    });

                    container.on('results:focus', function (params) {
                        if (params.data._resultId) {
                            self.$search.attr('aria-activedescendant', params.data._resultId);
                        } else {
                            self.$search.removeAttr('aria-activedescendant');
                        }
                    });
                };

                Search.prototype.handleSearch = function (evt) {
                    if (!this._keyUpPrevented) {
                        var input = this.$search.val();

                        this.trigger('query', {
                            term: input
                        });
                    }

                    this._keyUpPrevented = false;
                };

                Search.prototype.showSearch = function (_, params) {
                    return true;
                };

                return Search;
            });

            S2.define('select2/dropdown/hidePlaceholder',[

            ], function () {
                function HidePlaceholder (decorated, $element, options, dataAdapter) {
                    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

                    decorated.call(this, $element, options, dataAdapter);
                }

                HidePlaceholder.prototype.append = function (decorated, data) {
                    data.results = this.removePlaceholder(data.results);

                    decorated.call(this, data);
                };

                HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {
                    if (typeof placeholder === 'string') {
                        placeholder = {
                            id: '',
                            text: placeholder
                        };
                    }

                    return placeholder;
                };

                HidePlaceholder.prototype.removePlaceholder = function (_, data) {
                    var modifiedData = data.slice(0);

                    for (var d = data.length - 1; d >= 0; d--) {
                        var item = data[d];

                        if (this.placeholder.id === item.id) {
                            modifiedData.splice(d, 1);
                        }
                    }

                    return modifiedData;
                };

                return HidePlaceholder;
            });

            S2.define('select2/dropdown/infiniteScroll',[
                'jquery'
            ], function ($) {
                function InfiniteScroll (decorated, $element, options, dataAdapter) {
                    this.lastParams = {};

                    decorated.call(this, $element, options, dataAdapter);

                    this.$loadingMore = this.createLoadingMore();
                    this.loading = false;
                }

                InfiniteScroll.prototype.append = function (decorated, data) {
                    this.$loadingMore.remove();
                    this.loading = false;

                    decorated.call(this, data);

                    if (this.showLoadingMore(data)) {
                        this.$results.append(this.$loadingMore);
                        this.loadMoreIfNeeded();
                    }
                };

                InfiniteScroll.prototype.bind = function (decorated, container, $container) {
                    var self = this;

                    decorated.call(this, container, $container);

                    container.on('query', function (params) {
                        self.lastParams = params;
                        self.loading = true;
                    });

                    container.on('query:append', function (params) {
                        self.lastParams = params;
                        self.loading = true;
                    });

                    this.$results.on('scroll', this.loadMoreIfNeeded.bind(this));
                };

                InfiniteScroll.prototype.loadMoreIfNeeded = function () {
                    var isLoadMoreVisible = $.contains(
                        document.documentElement,
                        this.$loadingMore[0]
                    );

                    if (this.loading || !isLoadMoreVisible) {
                        return;
                    }

                    var currentOffset = this.$results.offset().top +
                        this.$results.outerHeight(false);
                    var loadingMoreOffset = this.$loadingMore.offset().top +
                        this.$loadingMore.outerHeight(false);

                    if (currentOffset + 50 >= loadingMoreOffset) {
                        this.loadMore();
                    }
                };

                InfiniteScroll.prototype.loadMore = function () {
                    this.loading = true;

                    var params = $.extend({}, {page: 1}, this.lastParams);

                    params.page++;

                    this.trigger('query:append', params);
                };

                InfiniteScroll.prototype.showLoadingMore = function (_, data) {
                    return data.pagination && data.pagination.more;
                };

                InfiniteScroll.prototype.createLoadingMore = function () {
                    var $option = $(
                        '<li ' +
                        'class="select2-results__option select2-results__option--load-more"' +
                        'role="option" aria-disabled="true"></li>'
                    );

                    var message = this.options.get('translations').get('loadingMore');

                    $option.html(message(this.lastParams));

                    return $option;
                };

                return InfiniteScroll;
            });

            S2.define('select2/dropdown/attachBody',[
                'jquery',
                '../utils'
            ], function ($, Utils) {
                function AttachBody (decorated, $element, options) {
                    this.$dropdownParent = $(options.get('dropdownParent') || document.body);

                    decorated.call(this, $element, options);
                }

                AttachBody.prototype.bind = function (decorated, container, $container) {
                    var self = this;

                    decorated.call(this, container, $container);

                    container.on('open', function () {
                        self._showDropdown();
                        self._attachPositioningHandler(container);

                        // Must bind after the results handlers to ensure correct sizing
                        self._bindContainerResultHandlers(container);
                    });

                    container.on('close', function () {
                        self._hideDropdown();
                        self._detachPositioningHandler(container);
                    });

                    this.$dropdownContainer.on('mousedown', function (evt) {
                        evt.stopPropagation();
                    });
                };

                AttachBody.prototype.destroy = function (decorated) {
                    decorated.call(this);

                    this.$dropdownContainer.remove();
                };

                AttachBody.prototype.position = function (decorated, $dropdown, $container) {
                    // Clone all of the container classes
                    $dropdown.attr('class', $container.attr('class'));

                    $dropdown.removeClass('select2');
                    $dropdown.addClass('select2-container--open');

                    $dropdown.css({
                        position: 'absolute',
                        top: -999999
                    });

                    this.$container = $container;
                };

                AttachBody.prototype.render = function (decorated) {
                    var $container = $('<span></span>');

                    var $dropdown = decorated.call(this);
                    $container.append($dropdown);

                    this.$dropdownContainer = $container;

                    return $container;
                };

                AttachBody.prototype._hideDropdown = function (decorated) {
                    this.$dropdownContainer.detach();
                };

                AttachBody.prototype._bindContainerResultHandlers =
                    function (decorated, container) {

                        // These should only be bound once
                        if (this._containerResultsHandlersBound) {
                            return;
                        }

                        var self = this;

                        container.on('results:all', function () {
                            self._positionDropdown();
                            self._resizeDropdown();
                        });

                        container.on('results:append', function () {
                            self._positionDropdown();
                            self._resizeDropdown();
                        });

                        container.on('results:message', function () {
                            self._positionDropdown();
                            self._resizeDropdown();
                        });

                        container.on('select', function () {
                            self._positionDropdown();
                            self._resizeDropdown();
                        });

                        container.on('unselect', function () {
                            self._positionDropdown();
                            self._resizeDropdown();
                        });

                        this._containerResultsHandlersBound = true;
                    };

                AttachBody.prototype._attachPositioningHandler =
                    function (decorated, container) {
                        var self = this;

                        var scrollEvent = 'scroll.select2.' + container.id;
                        var resizeEvent = 'resize.select2.' + container.id;
                        var orientationEvent = 'orientationchange.select2.' + container.id;

                        var $watchers = this.$container.parents().filter(Utils.hasScroll);
                        $watchers.each(function () {
                            Utils.StoreData(this, 'select2-scroll-position', {
                                x: $(this).scrollLeft(),
                                y: $(this).scrollTop()
                            });
                        });

                        $watchers.on(scrollEvent, function (ev) {
                            var position = Utils.GetData(this, 'select2-scroll-position');
                            $(this).scrollTop(position.y);
                        });

                        $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent,
                            function (e) {
                                self._positionDropdown();
                                self._resizeDropdown();
                            });
                    };

                AttachBody.prototype._detachPositioningHandler =
                    function (decorated, container) {
                        var scrollEvent = 'scroll.select2.' + container.id;
                        var resizeEvent = 'resize.select2.' + container.id;
                        var orientationEvent = 'orientationchange.select2.' + container.id;

                        var $watchers = this.$container.parents().filter(Utils.hasScroll);
                        $watchers.off(scrollEvent);

                        $(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
                    };

                AttachBody.prototype._positionDropdown = function () {
                    var $window = $(window);

                    var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
                    var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');

                    var newDirection = null;

                    var offset = this.$container.offset();

                    offset.bottom = offset.top + this.$container.outerHeight(false);

                    var container = {
                        height: this.$container.outerHeight(false)
                    };

                    container.top = offset.top;
                    container.bottom = offset.top + container.height;

                    var dropdown = {
                        height: this.$dropdown.outerHeight(false)
                    };

                    var viewport = {
                        top: $window.scrollTop(),
                        bottom: $window.scrollTop() + $window.height()
                    };

                    var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
                    var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);

                    var css = {
                        //left: offset.left,
                        top: container.bottom
                    };

                    // Determine what the parent element is to use for calculating the offset
                    var $offsetParent = this.$dropdownParent;

                    // For statically positioned elements, we need to get the element
                    // that is determining the offset
                    if ($offsetParent.css('position') === 'static') {
                        $offsetParent = $offsetParent.offsetParent();
                    }

                    var parentOffset = {
                        top: 0,
                        left: 0
                    };

                    if ($.contains(document.body, $offsetParent[0])) {
                        parentOffset = $offsetParent.offset();
                    }

                    css.top -= parentOffset.top;
                    css.left -= parentOffset.left;

                    if (!isCurrentlyAbove && !isCurrentlyBelow) {
                        newDirection = 'below';
                    }

                    if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
                        newDirection = 'above';
                    } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
                        newDirection = 'below';
                    }

                    if (newDirection == 'above' ||
                        (isCurrentlyAbove && newDirection !== 'below')) {
                        css.top = container.top - parentOffset.top - dropdown.height;
                    }

                    if (newDirection != null) {
                        this.$dropdown
                            .removeClass('select2-dropdown--below select2-dropdown--above')
                            .addClass('select2-dropdown--' + newDirection);
                        this.$container
                            .removeClass('select2-container--below select2-container--above')
                            .addClass('select2-container--' + newDirection);
                    }

                    this.$dropdownContainer.css(css);
                };

                AttachBody.prototype._resizeDropdown = function () {
                    var css = {
                        width: this.$container.outerWidth(false) + 'px'
                    };

                    if (this.options.get('dropdownAutoWidth')) {
                        css.minWidth = css.width;
                        css.position = 'relative';
                        css.width = 'auto';
                    }

                    this.$dropdown.css(css);
                };

                AttachBody.prototype._showDropdown = function (decorated) {
                    this.$dropdownContainer.appendTo(this.$dropdownParent);

                    this._positionDropdown();
                    this._resizeDropdown();
                };

                return AttachBody;
            });

            S2.define('select2/dropdown/minimumResultsForSearch',[

            ], function () {
                function countResults (data) {
                    var count = 0;

                    for (var d = 0; d < data.length; d++) {
                        var item = data[d];

                        if (item.children) {
                            count += countResults(item.children);
                        } else {
                            count++;
                        }
                    }

                    return count;
                }

                function MinimumResultsForSearch (decorated, $element, options, dataAdapter) {
                    this.minimumResultsForSearch = options.get('minimumResultsForSearch');

                    if (this.minimumResultsForSearch < 0) {
                        this.minimumResultsForSearch = Infinity;
                    }

                    decorated.call(this, $element, options, dataAdapter);
                }

                MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {
                    if (countResults(params.data.results) < this.minimumResultsForSearch) {
                        return false;
                    }

                    return decorated.call(this, params);
                };

                return MinimumResultsForSearch;
            });

            S2.define('select2/dropdown/selectOnClose',[
                '../utils'
            ], function (Utils) {
                function SelectOnClose () { }

                SelectOnClose.prototype.bind = function (decorated, container, $container) {
                    var self = this;

                    decorated.call(this, container, $container);

                    container.on('close', function (params) {
                        self._handleSelectOnClose(params);
                    });
                };

                SelectOnClose.prototype._handleSelectOnClose = function (_, params) {
                    if (params && params.originalSelect2Event != null) {
                        var event = params.originalSelect2Event;

                        // Don't select an item if the close event was triggered from a select or
                        // unselect event
                        if (event._type === 'select' || event._type === 'unselect') {
                            return;
                        }
                    }

                    var $highlightedResults = this.getHighlightedResults();

                    // Only select highlighted results
                    if ($highlightedResults.length < 1) {
                        return;
                    }

                    var data = Utils.GetData($highlightedResults[0], 'data');

                    // Don't re-select already selected resulte
                    if (
                        (data.element != null && data.element.selected) ||
                        (data.element == null && data.selected)
                    ) {
                        return;
                    }

                    this.trigger('select', {
                        data: data
                    });
                };

                return SelectOnClose;
            });

            S2.define('select2/dropdown/closeOnSelect',[

            ], function () {
                function CloseOnSelect () { }

                CloseOnSelect.prototype.bind = function (decorated, container, $container) {
                    var self = this;

                    decorated.call(this, container, $container);

                    container.on('select', function (evt) {
                        self._selectTriggered(evt);
                    });

                    container.on('unselect', function (evt) {
                        self._selectTriggered(evt);
                    });
                };

                CloseOnSelect.prototype._selectTriggered = function (_, evt) {
                    var originalEvent = evt.originalEvent;

                    // Don't close if the control key is being held
                    if (originalEvent && (originalEvent.ctrlKey || originalEvent.metaKey)) {
                        return;
                    }

                    this.trigger('close', {
                        originalEvent: originalEvent,
                        originalSelect2Event: evt
                    });
                };

                return CloseOnSelect;
            });

            S2.define('select2/i18n/en',[],function () {
                // English
                return {
                    errorLoading: function () {
                        return 'The results could not be loaded.';
                    },
                    inputTooLong: function (args) {
                        var overChars = args.input.length - args.maximum;

                        var message = 'Please delete ' + overChars + ' character';

                        if (overChars != 1) {
                            message += 's';
                        }

                        return message;
                    },
                    inputTooShort: function (args) {
                        var remainingChars = args.minimum - args.input.length;

                        var message = 'Please enter ' + remainingChars + ' or more characters';

                        return message;
                    },
                    loadingMore: function () {
                        return 'Loading more results��';
                    },
                    maximumSelected: function (args) {
                        var message = 'You can only select ' + args.maximum + ' item';

                        if (args.maximum != 1) {
                            message += 's';
                        }

                        return message;
                    },
                    noResults: function () {
                        return 'No results found';
                    },
                    searching: function () {
                        return 'Searching��';
                    },
                    removeAllItems: function () {
                        return 'Remove all items';
                    }
                };
            });

            S2.define('select2/defaults',[
                'jquery',
                'require',

                './results',

                './selection/single',
                './selection/multiple',
                './selection/placeholder',
                './selection/allowClear',
                './selection/search',
                './selection/eventRelay',

                './utils',
                './translation',
                './diacritics',

                './data/select',
                './data/array',
                './data/ajax',
                './data/tags',
                './data/tokenizer',
                './data/minimumInputLength',
                './data/maximumInputLength',
                './data/maximumSelectionLength',

                './dropdown',
                './dropdown/search',
                './dropdown/hidePlaceholder',
                './dropdown/infiniteScroll',
                './dropdown/attachBody',
                './dropdown/minimumResultsForSearch',
                './dropdown/selectOnClose',
                './dropdown/closeOnSelect',

                './i18n/en'
            ], function ($, require,

                         ResultsList,

                         SingleSelection, MultipleSelection, Placeholder, AllowClear,
                         SelectionSearch, EventRelay,

                         Utils, Translation, DIACRITICS,

                         SelectData, ArrayData, AjaxData, Tags, Tokenizer,
                         MinimumInputLength, MaximumInputLength, MaximumSelectionLength,

                         Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll,
                         AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect,

                         EnglishTranslation) {
                function Defaults () {
                    this.reset();
                }

                Defaults.prototype.apply = function (options) {
                    options = $.extend(true, {}, this.defaults, options);

                    if (options.dataAdapter == null) {
                        if (options.ajax != null) {
                            options.dataAdapter = AjaxData;
                        } else if (options.data != null) {
                            options.dataAdapter = ArrayData;
                        } else {
                            options.dataAdapter = SelectData;
                        }

                        if (options.minimumInputLength > 0) {
                            options.dataAdapter = Utils.Decorate(
                                options.dataAdapter,
                                MinimumInputLength
                            );
                        }

                        if (options.maximumInputLength > 0) {
                            options.dataAdapter = Utils.Decorate(
                                options.dataAdapter,
                                MaximumInputLength
                            );
                        }

                        if (options.maximumSelectionLength > 0) {
                            options.dataAdapter = Utils.Decorate(
                                options.dataAdapter,
                                MaximumSelectionLength
                            );
                        }

                        if (options.tags) {
                            options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
                        }

                        if (options.tokenSeparators != null || options.tokenizer != null) {
                            options.dataAdapter = Utils.Decorate(
                                options.dataAdapter,
                                Tokenizer
                            );
                        }

                        if (options.query != null) {
                            var Query = require(options.amdBase + 'compat/query');

                            options.dataAdapter = Utils.Decorate(
                                options.dataAdapter,
                                Query
                            );
                        }

                        if (options.initSelection != null) {
                            var InitSelection = require(options.amdBase + 'compat/initSelection');

                            options.dataAdapter = Utils.Decorate(
                                options.dataAdapter,
                                InitSelection
                            );
                        }
                    }

                    if (options.resultsAdapter == null) {
                        options.resultsAdapter = ResultsList;

                        if (options.ajax != null) {
                            options.resultsAdapter = Utils.Decorate(
                                options.resultsAdapter,
                                InfiniteScroll
                            );
                        }

                        if (options.placeholder != null) {
                            options.resultsAdapter = Utils.Decorate(
                                options.resultsAdapter,
                                HidePlaceholder
                            );
                        }

                        if (options.selectOnClose) {
                            options.resultsAdapter = Utils.Decorate(
                                options.resultsAdapter,
                                SelectOnClose
                            );
                        }
                    }

                    if (options.dropdownAdapter == null) {
                        if (options.multiple) {
                            options.dropdownAdapter = Dropdown;
                        } else {
                            var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);

                            options.dropdownAdapter = SearchableDropdown;
                        }

                        if (options.minimumResultsForSearch !== 0) {
                            options.dropdownAdapter = Utils.Decorate(
                                options.dropdownAdapter,
                                MinimumResultsForSearch
                            );
                        }

                        if (options.closeOnSelect) {
                            options.dropdownAdapter = Utils.Decorate(
                                options.dropdownAdapter,
                                CloseOnSelect
                            );
                        }

                        if (
                            options.dropdownCssClass != null ||
                            options.dropdownCss != null ||
                            options.adaptDropdownCssClass != null
                        ) {
                            var DropdownCSS = require(options.amdBase + 'compat/dropdownCss');

                            options.dropdownAdapter = Utils.Decorate(
                                options.dropdownAdapter,
                                DropdownCSS
                            );
                        }

                        options.dropdownAdapter = Utils.Decorate(
                            options.dropdownAdapter,
                            AttachBody
                        );
                    }

                    if (options.selectionAdapter == null) {
                        if (options.multiple) {
                            options.selectionAdapter = MultipleSelection;
                        } else {
                            options.selectionAdapter = SingleSelection;
                        }

                        // Add the placeholder mixin if a placeholder was specified
                        if (options.placeholder != null) {
                            options.selectionAdapter = Utils.Decorate(
                                options.selectionAdapter,
                                Placeholder
                            );
                        }

                        if (options.allowClear) {
                            options.selectionAdapter = Utils.Decorate(
                                options.selectionAdapter,
                                AllowClear
                            );
                        }

                        if (options.multiple) {
                            options.selectionAdapter = Utils.Decorate(
                                options.selectionAdapter,
                                SelectionSearch
                            );
                        }

                        if (
                            options.containerCssClass != null ||
                            options.containerCss != null ||
                            options.adaptContainerCssClass != null
                        ) {
                            var ContainerCSS = require(options.amdBase + 'compat/containerCss');

                            options.selectionAdapter = Utils.Decorate(
                                options.selectionAdapter,
                                ContainerCSS
                            );
                        }

                        options.selectionAdapter = Utils.Decorate(
                            options.selectionAdapter,
                            EventRelay
                        );
                    }

                    // If the defaults were not previously applied from an element, it is
                    // possible for the language option to have not been resolved
                    options.language = this._resolveLanguage(options.language);

                    // Always fall back to English since it will always be complete
                    options.language.push('en');

                    var uniqueLanguages = [];

                    for (var l = 0; l < options.language.length; l++) {
                        var language = options.language[l];

                        if (uniqueLanguages.indexOf(language) === -1) {
                            uniqueLanguages.push(language);
                        }
                    }

                    options.language = uniqueLanguages;

                    options.translations = this._processTranslations(
                        options.language,
                        options.debug
                    );

                    return options;
                };

                Defaults.prototype.reset = function () {
                    function stripDiacritics (text) {
                        // Used 'uni range + named function' from http://jsperf.com/diacritics/18
                        function match(a) {
                            return DIACRITICS[a] || a;
                        }

                        return text.replace(/[^\u0000-\u007E]/g, match);
                    }

                    function matcher (params, data) {
                        // Always return the object if there is nothing to compare
                        if ($.trim(params.term) === '') {
                            return data;
                        }

                        // Do a recursive check for options with children
                        if (data.children && data.children.length > 0) {
                            // Clone the data object if there are children
                            // This is required as we modify the object to remove any non-matches
                            var match = $.extend(true, {}, data);

                            // Check each child of the option
                            for (var c = data.children.length - 1; c >= 0; c--) {
                                var child = data.children[c];

                                var matches = matcher(params, child);

                                // If there wasn't a match, remove the object in the array
                                if (matches == null) {
                                    match.children.splice(c, 1);
                                }
                            }

                            // If any children matched, return the new object
                            if (match.children.length > 0) {
                                return match;
                            }

                            // If there were no matching children, check just the plain object
                            return matcher(params, match);
                        }

                        var original = stripDiacritics(data.text).toUpperCase();
                        var term = stripDiacritics(params.term).toUpperCase();

                        // Check if the text contains the term
                        if (original.indexOf(term) > -1) {
                            return data;
                        }

                        // If it doesn't contain the term, don't return anything
                        return null;
                    }

                    this.defaults = {
                        amdBase: './',
                        amdLanguageBase: './i18n/',
                        closeOnSelect: true,
                        debug: false,
                        dropdownAutoWidth: false,
                        escapeMarkup: Utils.escapeMarkup,
                        language: {},
                        matcher: matcher,
                        minimumInputLength: 0,
                        maximumInputLength: 0,
                        maximumSelectionLength: 0,
                        minimumResultsForSearch: 0,
                        selectOnClose: false,
                        scrollAfterSelect: false,
                        sorter: function (data) {
                            return data;
                        },
                        templateResult: function (result) {
                            return result.text;
                        },
                        templateSelection: function (selection) {
                            return selection.text;
                        },
                        theme: 'default',
                        width: 'resolve'
                    };
                };

                Defaults.prototype.applyFromElement = function (options, $element) {
                    var optionLanguage = options.language;
                    var defaultLanguage = this.defaults.language;
                    var elementLanguage = $element.prop('lang');
                    var parentLanguage = $element.closest('[lang]').prop('lang');

                    var languages = Array.prototype.concat.call(
                        this._resolveLanguage(elementLanguage),
                        this._resolveLanguage(optionLanguage),
                        this._resolveLanguage(defaultLanguage),
                        this._resolveLanguage(parentLanguage)
                    );

                    options.language = languages;

                    return options;
                };

                Defaults.prototype._resolveLanguage = function (language) {
                    if (!language) {
                        return [];
                    }

                    if ($.isEmptyObject(language)) {
                        return [];
                    }

                    if ($.isPlainObject(language)) {
                        return [language];
                    }

                    var languages;

                    if (!$.isArray(language)) {
                        languages = [language];
                    } else {
                        languages = language;
                    }

                    var resolvedLanguages = [];

                    for (var l = 0; l < languages.length; l++) {
                        resolvedLanguages.push(languages[l]);

                        if (typeof languages[l] === 'string' && languages[l].indexOf('-') > 0) {
                            // Extract the region information if it is included
                            var languageParts = languages[l].split('-');
                            var baseLanguage = languageParts[0];

                            resolvedLanguages.push(baseLanguage);
                        }
                    }

                    return resolvedLanguages;
                };

                Defaults.prototype._processTranslations = function (languages, debug) {
                    var translations = new Translation();

                    for (var l = 0; l < languages.length; l++) {
                        var languageData = new Translation();

                        var language = languages[l];

                        if (typeof language === 'string') {
                            try {
                                // Try to load it with the original name
                                languageData = Translation.loadPath(language);
                            } catch (e) {
                                try {
                                    // If we couldn't load it, check if it wasn't the full path
                                    language = this.defaults.amdLanguageBase + language;
                                    languageData = Translation.loadPath(language);
                                } catch (ex) {
                                    // The translation could not be loaded at all. Sometimes this is
                                    // because of a configuration problem, other times this can be
                                    // because of how Select2 helps load all possible translation files
                                    if (debug && window.console && console.warn) {
                                        console.warn(
                                            'Select2: The language file for "' + language + '" could ' +
                                            'not be automatically loaded. A fallback will be used instead.'
                                        );
                                    }
                                }
                            }
                        } else if ($.isPlainObject(language)) {
                            languageData = new Translation(language);
                        } else {
                            languageData = language;
                        }

                        translations.extend(languageData);
                    }

                    return translations;
                };

                Defaults.prototype.set = function (key, value) {
                    var camelKey = $.camelCase(key);

                    var data = {};
                    data[camelKey] = value;

                    var convertedData = Utils._convertData(data);

                    $.extend(true, this.defaults, convertedData);
                };

                var defaults = new Defaults();

                return defaults;
            });

            S2.define('select2/options',[
                'require',
                'jquery',
                './defaults',
                './utils'
            ], function (require, $, Defaults, Utils) {
                function Options (options, $element) {
                    this.options = options;

                    if ($element != null) {
                        this.fromElement($element);
                    }

                    if ($element != null) {
                        this.options = Defaults.applyFromElement(this.options, $element);
                    }

                    this.options = Defaults.apply(this.options);

                    if ($element && $element.is('input')) {
                        var InputCompat = require(this.get('amdBase') + 'compat/inputData');

                        this.options.dataAdapter = Utils.Decorate(
                            this.options.dataAdapter,
                            InputCompat
                        );
                    }
                }

                Options.prototype.fromElement = function ($e) {
                    var excludedData = ['select2'];

                    if (this.options.multiple == null) {
                        this.options.multiple = $e.prop('multiple');
                    }

                    if (this.options.disabled == null) {
                        this.options.disabled = $e.prop('disabled');
                    }

                    if (this.options.dir == null) {
                        if ($e.prop('dir')) {
                            this.options.dir = $e.prop('dir');
                        } else if ($e.closest('[dir]').prop('dir')) {
                            this.options.dir = $e.closest('[dir]').prop('dir');
                        } else {
                            this.options.dir = 'ltr';
                        }
                    }

                    $e.prop('disabled', this.options.disabled);
                    $e.prop('multiple', this.options.multiple);

                    if (Utils.GetData($e[0], 'select2Tags')) {
                        if (this.options.debug && window.console && console.warn) {
                            console.warn(
                                'Select2: The `data-select2-tags` attribute has been changed to ' +
                                'use the `data-data` and `data-tags="true"` attributes and will be ' +
                                'removed in future versions of Select2.'
                            );
                        }

                        Utils.StoreData($e[0], 'data', Utils.GetData($e[0], 'select2Tags'));
                        Utils.StoreData($e[0], 'tags', true);
                    }

                    if (Utils.GetData($e[0], 'ajaxUrl')) {
                        if (this.options.debug && window.console && console.warn) {
                            console.warn(
                                'Select2: The `data-ajax-url` attribute has been changed to ' +
                                '`data-ajax--url` and support for the old attribute will be removed' +
                                ' in future versions of Select2.'
                            );
                        }

                        $e.attr('ajax--url', Utils.GetData($e[0], 'ajaxUrl'));
                        Utils.StoreData($e[0], 'ajax-Url', Utils.GetData($e[0], 'ajaxUrl'));
                    }

                    var dataset = {};

                    function upperCaseLetter(_, letter) {
                        return letter.toUpperCase();
                    }

                    // Pre-load all of the attributes which are prefixed with `data-`
                    for (var attr = 0; attr < $e[0].attributes.length; attr++) {
                        var attributeName = $e[0].attributes[attr].name;
                        var prefix = 'data-';

                        if (attributeName.substr(0, prefix.length) == prefix) {
                            // Get the contents of the attribute after `data-`
                            var dataName = attributeName.substring(prefix.length);

                            // Get the data contents from the consistent source
                            // This is more than likely the jQuery data helper
                            var dataValue = Utils.GetData($e[0], dataName);

                            // camelCase the attribute name to match the spec
                            var camelDataName = dataName.replace(/-([a-z])/g, upperCaseLetter);

                            // Store the data attribute contents into the dataset since
                            dataset[camelDataName] = dataValue;
                        }
                    }

                    // Prefer the element's `dataset` attribute if it exists
                    // jQuery 1.x does not correctly handle data attributes with multiple dashes
                    if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {
                        dataset = $.extend(true, {}, $e[0].dataset, dataset);
                    }

                    // Prefer our internal data cache if it exists
                    var data = $.extend(true, {}, Utils.GetData($e[0]), dataset);

                    data = Utils._convertData(data);

                    for (var key in data) {
                        if ($.inArray(key, excludedData) > -1) {
                            continue;
                        }

                        if ($.isPlainObject(this.options[key])) {
                            $.extend(this.options[key], data[key]);
                        } else {
                            this.options[key] = data[key];
                        }
                    }

                    return this;
                };

                Options.prototype.get = function (key) {
                    return this.options[key];
                };

                Options.prototype.set = function (key, val) {
                    this.options[key] = val;
                };

                return Options;
            });

            S2.define('select2/core',[
                'jquery',
                './options',
                './utils',
                './keys'
            ], function ($, Options, Utils, KEYS) {
                var Select2 = function ($element, options) {
                    if (Utils.GetData($element[0], 'select2') != null) {
                        Utils.GetData($element[0], 'select2').destroy();
                    }

                    this.$element = $element;

                    this.id = this._generateId($element);

                    options = options || {};

                    this.options = new Options(options, $element);

                    Select2.__super__.constructor.call(this);

                    // Set up the tabindex

                    var tabindex = $element.attr('tabindex') || 0;
                    Utils.StoreData($element[0], 'old-tabindex', tabindex);
                    $element.attr('tabindex', '-1');

                    // Set up containers and adapters

                    var DataAdapter = this.options.get('dataAdapter');
                    this.dataAdapter = new DataAdapter($element, this.options);

                    var $container = this.render();

                    this._placeContainer($container);

                    var SelectionAdapter = this.options.get('selectionAdapter');
                    this.selection = new SelectionAdapter($element, this.options);
                    this.$selection = this.selection.render();

                    this.selection.position(this.$selection, $container);

                    var DropdownAdapter = this.options.get('dropdownAdapter');
                    this.dropdown = new DropdownAdapter($element, this.options);
                    this.$dropdown = this.dropdown.render();

                    this.dropdown.position(this.$dropdown, $container);

                    var ResultsAdapter = this.options.get('resultsAdapter');
                    this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
                    this.$results = this.results.render();

                    this.results.position(this.$results, this.$dropdown);

                    // Bind events

                    var self = this;

                    // Bind the container to all of the adapters
                    this._bindAdapters();

                    // Register any DOM event handlers
                    this._registerDomEvents();

                    // Register any internal event handlers
                    this._registerDataEvents();
                    this._registerSelectionEvents();
                    this._registerDropdownEvents();
                    this._registerResultsEvents();
                    this._registerEvents();

                    // Set the initial state
                    this.dataAdapter.current(function (initialData) {
                        self.trigger('selection:update', {
                            data: initialData
                        });
                    });

                    // Hide the original select
                    $element.addClass('select2-hidden-accessible');
                    $element.attr('aria-hidden', 'true');

                    // Synchronize any monitored attributes
                    this._syncAttributes();

                    Utils.StoreData($element[0], 'select2', this);

                    // Ensure backwards compatibility with $element.data('select2').
                    $element.data('select2', this);
                };

                Utils.Extend(Select2, Utils.Observable);

                Select2.prototype._generateId = function ($element) {
                    var id = '';

                    if ($element.attr('id') != null) {
                        id = $element.attr('id');
                    } else if ($element.attr('name') != null) {
                        id = $element.attr('name') + '-' + Utils.generateChars(2);
                    } else {
                        id = Utils.generateChars(4);
                    }

                    id = id.replace(/(:|\.|\[|\]|,)/g, '');
                    id = 'select2-' + id;

                    return id;
                };

                Select2.prototype._placeContainer = function ($container) {
                    $container.insertAfter(this.$element);

                    var width = this._resolveWidth(this.$element, this.options.get('width'));

                    if (width != null) {
                        $container.css('width', width);
                    }
                };

                Select2.prototype._resolveWidth = function ($element, method) {
                    var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;

                    if (method == 'resolve') {
                        var styleWidth = this._resolveWidth($element, 'style');

                        if (styleWidth != null) {
                            return styleWidth;
                        }

                        return this._resolveWidth($element, 'element');
                    }

                    if (method == 'element') {
                        var elementWidth = $element.outerWidth(false);

                        if (elementWidth <= 0) {
                            return 'auto';
                        }

                        return elementWidth + 'px';
                    }

                    if (method == 'style') {
                        var style = $element.attr('style');

                        if (typeof(style) !== 'string') {
                            return null;
                        }

                        var attrs = style.split(';');

                        for (var i = 0, l = attrs.length; i < l; i = i + 1) {
                            var attr = attrs[i].replace(/\s/g, '');
                            var matches = attr.match(WIDTH);

                            if (matches !== null && matches.length >= 1) {
                                return matches[1];
                            }
                        }

                        return null;
                    }

                    if (method == 'computedstyle') {
                        var computedStyle = window.getComputedStyle($element[0]);

                        return computedStyle.width;
                    }

                    return method;
                };

                Select2.prototype._bindAdapters = function () {
                    this.dataAdapter.bind(this, this.$container);
                    this.selection.bind(this, this.$container);

                    this.dropdown.bind(this, this.$container);
                    this.results.bind(this, this.$container);
                };

                Select2.prototype._registerDomEvents = function () {
                    var self = this;

                    this.$element.on('change.select2', function () {
                        self.dataAdapter.current(function (data) {
                            self.trigger('selection:update', {
                                data: data
                            });
                        });
                    });

                    this.$element.on('focus.select2', function (evt) {
                        self.trigger('focus', evt);
                    });

                    this._syncA = Utils.bind(this._syncAttributes, this);
                    this._syncS = Utils.bind(this._syncSubtree, this);

                    if (this.$element[0].attachEvent) {
                        this.$element[0].attachEvent('onpropertychange', this._syncA);
                    }

                    var observer = window.MutationObserver ||
                        window.WebKitMutationObserver ||
                        window.MozMutationObserver
                    ;

                    if (observer != null) {
                        this._observer = new observer(function (mutations) {
                            $.each(mutations, self._syncA);
                            $.each(mutations, self._syncS);
                        });
                        this._observer.observe(this.$element[0], {
                            attributes: true,
                            childList: true,
                            subtree: false
                        });
                    } else if (this.$element[0].addEventListener) {
                        this.$element[0].addEventListener(
                            'DOMAttrModified',
                            self._syncA,
                            false
                        );
                        this.$element[0].addEventListener(
                            'DOMNodeInserted',
                            self._syncS,
                            false
                        );
                        this.$element[0].addEventListener(
                            'DOMNodeRemoved',
                            self._syncS,
                            false
                        );
                    }
                };

                Select2.prototype._registerDataEvents = function () {
                    var self = this;

                    this.dataAdapter.on('*', function (name, params) {
                        self.trigger(name, params);
                    });
                };

                Select2.prototype._registerSelectionEvents = function () {
                    var self = this;
                    var nonRelayEvents = ['toggle', 'focus'];

                    this.selection.on('toggle', function () {
                        self.toggleDropdown();
                    });

                    this.selection.on('focus', function (params) {
                        self.focus(params);
                    });

                    this.selection.on('*', function (name, params) {
                        if ($.inArray(name, nonRelayEvents) !== -1) {
                            return;
                        }

                        self.trigger(name, params);
                    });
                };

                Select2.prototype._registerDropdownEvents = function () {
                    var self = this;

                    this.dropdown.on('*', function (name, params) {
                        self.trigger(name, params);
                    });
                };

                Select2.prototype._registerResultsEvents = function () {
                    var self = this;

                    this.results.on('*', function (name, params) {
                        self.trigger(name, params);
                    });
                };

                Select2.prototype._registerEvents = function () {
                    var self = this;

                    this.on('open', function () {
                        self.$container.addClass('select2-container--open');
                    });

                    this.on('close', function () {
                        self.$container.removeClass('select2-container--open');
                    });

                    this.on('enable', function () {
                        self.$container.removeClass('select2-container--disabled');
                    });

                    this.on('disable', function () {
                        self.$container.addClass('select2-container--disabled');
                    });

                    this.on('blur', function () {
                        self.$container.removeClass('select2-container--focus');
                    });

                    this.on('query', function (params) {
                        if (!self.isOpen()) {
                            self.trigger('open', {});
                        }

                        this.dataAdapter.query(params, function (data) {
                            self.trigger('results:all', {
                                data: data,
                                query: params
                            });
                        });
                    });

                    this.on('query:append', function (params) {
                        this.dataAdapter.query(params, function (data) {
                            self.trigger('results:append', {
                                data: data,
                                query: params
                            });
                        });
                    });

                    this.on('keypress', function (evt) {
                        var key = evt.which;

                        if (self.isOpen()) {
                            if (key === KEYS.ESC || key === KEYS.TAB ||
                                (key === KEYS.UP && evt.altKey)) {
                                self.close();

                                evt.preventDefault();
                            } else if (key === KEYS.ENTER) {
                                self.trigger('results:select', {});

                                evt.preventDefault();
                            } else if ((key === KEYS.SPACE && evt.ctrlKey)) {
                                self.trigger('results:toggle', {});

                                evt.preventDefault();
                            } else if (key === KEYS.UP) {
                                self.trigger('results:previous', {});

                                evt.preventDefault();
                            } else if (key === KEYS.DOWN) {
                                self.trigger('results:next', {});

                                evt.preventDefault();
                            }
                        } else {
                            if (key === KEYS.ENTER || key === KEYS.SPACE ||
                                (key === KEYS.DOWN && evt.altKey)) {
                                self.open();

                                evt.preventDefault();
                            }
                        }
                    });
                };

                Select2.prototype._syncAttributes = function () {
                    this.options.set('disabled', this.$element.prop('disabled'));

                    if (this.options.get('disabled')) {
                        if (this.isOpen()) {
                            this.close();
                        }

                        this.trigger('disable', {});
                    } else {
                        this.trigger('enable', {});
                    }
                };

                Select2.prototype._syncSubtree = function (evt, mutations) {
                    var changed = false;
                    var self = this;

                    // Ignore any mutation events raised for elements that aren't options or
                    // optgroups. This handles the case when the select element is destroyed
                    if (
                        evt && evt.target && (
                            evt.target.nodeName !== 'OPTION' && evt.target.nodeName !== 'OPTGROUP'
                        )
                    ) {
                        return;
                    }

                    if (!mutations) {
                        // If mutation events aren't supported, then we can only assume that the
                        // change affected the selections
                        changed = true;
                    } else if (mutations.addedNodes && mutations.addedNodes.length > 0) {
                        for (var n = 0; n < mutations.addedNodes.length; n++) {
                            var node = mutations.addedNodes[n];

                            if (node.selected) {
                                changed = true;
                            }
                        }
                    } else if (mutations.removedNodes && mutations.removedNodes.length > 0) {
                        changed = true;
                    }

                    // Only re-pull the data if we think there is a change
                    if (changed) {
                        this.dataAdapter.current(function (currentData) {
                            self.trigger('selection:update', {
                                data: currentData
                            });
                        });
                    }
                };

                /**
                 * Override the trigger method to automatically trigger pre-events when
                 * there are events that can be prevented.
                 */
                Select2.prototype.trigger = function (name, args) {
                    var actualTrigger = Select2.__super__.trigger;
                    var preTriggerMap = {
                        'open': 'opening',
                        'close': 'closing',
                        'select': 'selecting',
                        'unselect': 'unselecting',
                        'clear': 'clearing'
                    };

                    if (args === undefined) {
                        args = {};
                    }

                    if (name in preTriggerMap) {
                        var preTriggerName = preTriggerMap[name];
                        var preTriggerArgs = {
                            prevented: false,
                            name: name,
                            args: args
                        };

                        actualTrigger.call(this, preTriggerName, preTriggerArgs);

                        if (preTriggerArgs.prevented) {
                            args.prevented = true;

                            return;
                        }
                    }

                    actualTrigger.call(this, name, args);
                };

                Select2.prototype.toggleDropdown = function () {
                    if (this.options.get('disabled')) {
                        return;
                    }

                    if (this.isOpen()) {
                        this.close();
                    } else {
                        this.open();
                    }
                };

                Select2.prototype.open = function () {
                    if (this.isOpen()) {
                        return;
                    }

                    this.trigger('query', {});
                };

                Select2.prototype.close = function () {
                    if (!this.isOpen()) {
                        return;
                    }

                    this.trigger('close', {});
                };

                Select2.prototype.isOpen = function () {
                    return this.$container.hasClass('select2-container--open');
                };

                Select2.prototype.hasFocus = function () {
                    return this.$container.hasClass('select2-container--focus');
                };

                Select2.prototype.focus = function (data) {
                    // No need to re-trigger focus events if we are already focused
                    if (this.hasFocus()) {
                        return;
                    }

                    this.$container.addClass('select2-container--focus');
                    this.trigger('focus', {});
                };

                Select2.prototype.enable = function (args) {
                    if (this.options.get('debug') && window.console && console.warn) {
                        console.warn(
                            'Select2: The `select2("enable")` method has been deprecated and will' +
                            ' be removed in later Select2 versions. Use $element.prop("disabled")' +
                            ' instead.'
                        );
                    }

                    if (args == null || args.length === 0) {
                        args = [true];
                    }

                    var disabled = !args[0];

                    this.$element.prop('disabled', disabled);
                };

                Select2.prototype.data = function () {
                    if (this.options.get('debug') &&
                        arguments.length > 0 && window.console && console.warn) {
                        console.warn(
                            'Select2: Data can no longer be set using `select2("data")`. You ' +
                            'should consider setting the value instead using `$element.val()`.'
                        );
                    }

                    var data = [];

                    this.dataAdapter.current(function (currentData) {
                        data = currentData;
                    });

                    return data;
                };

                Select2.prototype.val = function (args) {
                    if (this.options.get('debug') && window.console && console.warn) {
                        console.warn(
                            'Select2: The `select2("val")` method has been deprecated and will be' +
                            ' removed in later Select2 versions. Use $element.val() instead.'
                        );
                    }

                    if (args == null || args.length === 0) {
                        return this.$element.val();
                    }

                    var newVal = args[0];

                    if ($.isArray(newVal)) {
                        newVal = $.map(newVal, function (obj) {
                            return obj.toString();
                        });
                    }

                    this.$element.val(newVal).trigger('change');
                };

                Select2.prototype.destroy = function () {
                    this.$container.remove();

                    if (this.$element[0].detachEvent) {
                        this.$element[0].detachEvent('onpropertychange', this._syncA);
                    }

                    if (this._observer != null) {
                        this._observer.disconnect();
                        this._observer = null;
                    } else if (this.$element[0].removeEventListener) {
                        this.$element[0]
                            .removeEventListener('DOMAttrModified', this._syncA, false);
                        this.$element[0]
                            .removeEventListener('DOMNodeInserted', this._syncS, false);
                        this.$element[0]
                            .removeEventListener('DOMNodeRemoved', this._syncS, false);
                    }

                    this._syncA = null;
                    this._syncS = null;

                    this.$element.off('.select2');
                    this.$element.attr('tabindex',
                        Utils.GetData(this.$element[0], 'old-tabindex'));

                    this.$element.removeClass('select2-hidden-accessible');
                    this.$element.attr('aria-hidden', 'false');
                    Utils.RemoveData(this.$element[0]);
                    this.$element.removeData('select2');

                    this.dataAdapter.destroy();
                    this.selection.destroy();
                    this.dropdown.destroy();
                    this.results.destroy();

                    this.dataAdapter = null;
                    this.selection = null;
                    this.dropdown = null;
                    this.results = null;
                };

                Select2.prototype.render = function () {
                    var $container = $(
                        '<span class="select2 select2-container">' +
                        '<span class="selection"></span>' +
                        '<span class="dropdown-wrapper" aria-hidden="true"></span>' +
                        '</span>'
                    );

                    $container.attr('dir', this.options.get('dir'));

                    this.$container = $container;

                    this.$container.addClass('select2-container--' + this.options.get('theme'));

                    Utils.StoreData($container[0], 'element', this.$element);

                    return $container;
                };

                return Select2;
            });

            S2.define('jquery-mousewheel',[
                'jquery'
            ], function ($) {
                // Used to shim jQuery.mousewheel for non-full builds.
                return $;
            });

            S2.define('jquery.select2',[
                'jquery',
                'jquery-mousewheel',

                './select2/core',
                './select2/defaults',
                './select2/utils'
            ], function ($, _, Select2, Defaults, Utils) {
                if ($.fn.select2 == null) {
                    // All methods that should return the element
                    var thisMethods = ['open', 'close', 'destroy'];

                    $.fn.select2 = function (options) {
                        options = options || {};

                        if (typeof options === 'object') {
                            this.each(function () {
                                var instanceOptions = $.extend(true, {}, options);

                                var instance = new Select2($(this), instanceOptions);
                            });

                            return this;
                        } else if (typeof options === 'string') {
                            var ret;
                            var args = Array.prototype.slice.call(arguments, 1);

                            this.each(function () {
                                var instance = Utils.GetData(this, 'select2');

                                if (instance == null && window.console && console.error) {
                                    console.error(
                                        'The select2(\'' + options + '\') method was called on an ' +
                                        'element that is not using Select2.'
                                    );
                                }

                                ret = instance[options].apply(instance, args);
                            });

                            // Check if we should be returning `this`
                            if ($.inArray(options, thisMethods) > -1) {
                                return this;
                            }

                            return ret;
                        } else {
                            throw new Error('Invalid arguments for Select2: ' + options);
                        }
                    };
                }

                if ($.fn.select2.defaults == null) {
                    $.fn.select2.defaults = Defaults;
                }

                return Select2;
            });

            // Return the AMD loader configuration so it can be used outside of this file
            return {
                define: S2.define,
                require: S2.require
            };
        }());

        // Autoload the jQuery bindings
        // We know that all of the modules exist above this, so we're safe
        var select2 = S2.require('jquery.select2');

        // Hold the AMD module references on the jQuery function that was just loaded
        // This allows Select2 to use the internal loader outside of this file, such
        // as in the language files.
        jQuery.fn.select2.amd = S2;

        // Return the Select2 instance for anyone who is importing it.
        return select2;
    }));
    $.fn.hoverSlide = function( options ) {
        var settings = $.extend({
            position: "fixed",
            color: "white",
            backgroundColor: "#abc",
            padding: "10px 5px",
            font:"400 15px Lato, sans-serif",
            lineHeight: "1.8",
            left: "",
            right: "-120px",
            width: "150px",
            borderRadius: "5px",
            top: "60px",
            zIndex: 99,
            opacity: "",
            cursor: "pointer"
        }, options );

        return this.css({
            position: settings.position,
            color: settings.color,
            backgroundColor: settings.backgroundColor,
            padding: settings.padding,
            font: settings.font,
            lineHeight: settings.lineHeight,
            left: settings.left,
            right: settings.right,
            width: settings.width,
            borderRadius: settings.borderRadius,
            top: settings.top,
            zIndex: settings.zIndex,
            opacity: settings.opacity,
            cursor: settings.cursor
        });
    };
    /*!
 * html2canvas 1.0.0-rc.5 <https://html2canvas.hertzen.com>
 * Copyright (c) 2019 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
    !function(A,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(A=A||self).html2canvas=e()}(this,function(){"use strict";
        /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */var r=function(A,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(A,e){A.__proto__=e}||function(A,e){for(var t in e)e.hasOwnProperty(t)&&(A[t]=e[t])})(A,e)};function A(A,e){function t(){this.constructor=A}r(A,e),A.prototype=null===e?Object.create(e):(t.prototype=e.prototype,new t)}var K=function(){return(K=Object.assign||function(A){for(var e,t=1,r=arguments.length;t<r;t++)for(var n in e=arguments[t])Object.prototype.hasOwnProperty.call(e,n)&&(A[n]=e[n]);return A}).apply(this,arguments)};function a(B,s,o,i){return new(o||(o=Promise))(function(A,e){function t(A){try{n(i.next(A))}catch(A){e(A)}}function r(A){try{n(i.throw(A))}catch(A){e(A)}}function n(e){e.done?A(e.value):new o(function(A){A(e.value)}).then(t,r)}n((i=i.apply(B,s||[])).next())})}function S(t,r){var n,B,s,A,o={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return A={next:e(0),throw:e(1),return:e(2)},"function"==typeof Symbol&&(A[Symbol.iterator]=function(){return this}),A;function e(e){return function(A){return function(e){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,B&&(s=2&e[0]?B.return:e[0]?B.throw||((s=B.return)&&s.call(B),0):B.next)&&!(s=s.call(B,e[1])).done)return s;switch(B=0,s&&(e=[2&e[0],s.value]),e[0]){case 0:case 1:s=e;break;case 4:return o.label++,{value:e[1],done:!1};case 5:o.label++,B=e[1],e=[0];continue;case 7:e=o.ops.pop(),o.trys.pop();continue;default:if(!(s=0<(s=o.trys).length&&s[s.length-1])&&(6===e[0]||2===e[0])){o=0;continue}if(3===e[0]&&(!s||e[1]>s[0]&&e[1]<s[3])){o.label=e[1];break}if(6===e[0]&&o.label<s[1]){o.label=s[1],s=e;break}if(s&&o.label<s[2]){o.label=s[2],o.ops.push(e);break}s[2]&&o.ops.pop(),o.trys.pop();continue}e=r.call(t,o)}catch(A){e=[6,A],B=0}finally{n=s=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}([e,A])}}}var I=(n.prototype.add=function(A,e,t,r){return new n(this.left+A,this.top+e,this.width+t,this.height+r)},n.fromClientRect=function(A){return new n(A.left,A.top,A.width,A.height)},n);function n(A,e,t,r){this.left=A,this.top=e,this.width=t,this.height=r}for(var T=function(A){return I.fromClientRect(A.getBoundingClientRect())},c=function(A){for(var e=[],t=0,r=A.length;t<r;){var n=A.charCodeAt(t++);if(55296<=n&&n<=56319&&t<r){var B=A.charCodeAt(t++);56320==(64512&B)?e.push(((1023&n)<<10)+(1023&B)+65536):(e.push(n),t--)}else e.push(n)}return e},l=function(){for(var A=[],e=0;e<arguments.length;e++)A[e]=arguments[e];if(String.fromCodePoint)return String.fromCodePoint.apply(String,A);var t=A.length;if(!t)return"";for(var r=[],n=-1,B="";++n<t;){var s=A[n];s<=65535?r.push(s):(s-=65536,r.push(55296+(s>>10),s%1024+56320)),(n+1===t||16384<r.length)&&(B+=String.fromCharCode.apply(String,r),r.length=0)}return B},e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Q="undefined"==typeof Uint8Array?[]:new Uint8Array(256),t=0;t<e.length;t++)Q[e.charCodeAt(t)]=t;function B(A,e,t){return A.slice?A.slice(e,t):new Uint16Array(Array.prototype.slice.call(A,e,t))}var s=(o.prototype.get=function(A){var e;if(0<=A){if(A<55296||56319<A&&A<=65535)return e=((e=this.index[A>>5])<<2)+(31&A),this.data[e];if(A<=65535)return e=((e=this.index[2048+(A-55296>>5)])<<2)+(31&A),this.data[e];if(A<this.highStart)return e=2080+(A>>11),e=this.index[e],e+=A>>5&63,e=((e=this.index[e])<<2)+(31&A),this.data[e];if(A<=1114111)return this.data[this.highValueIndex]}return this.errorValue},o);function o(A,e,t,r,n,B){this.initialValue=A,this.errorValue=e,this.highStart=t,this.highValueIndex=r,this.index=n,this.data=B}function C(A,e,t,r){var n=r[t];if(Array.isArray(A)?-1!==A.indexOf(n):A===n)for(var B=t;B<=r.length;){if((i=r[++B])===e)return!0;if(i!==H)break}if(n===H)for(B=t;0<B;){var s=r[--B];if(Array.isArray(A)?-1!==A.indexOf(s):A===s)for(var o=t;o<=r.length;){var i;if((i=r[++o])===e)return!0;if(i!==H)break}if(s!==H)break}return!1}function g(A,e){for(var t=A;0<=t;){var r=e[t];if(r!==H)return r;t--}return 0}function w(A,e,t,r,n){if(0===t[r])return Y;var B=r-1;if(Array.isArray(n)&&!0===n[B])return Y;var s=B-1,o=1+B,i=e[B],a=0<=s?e[s]:0,c=e[o];if(2===i&&3===c)return Y;if(-1!==j.indexOf(i))return"!";if(-1!==j.indexOf(c))return Y;if(-1!==$.indexOf(c))return Y;if(8===g(B,e))return"첨";if(11===q.get(A[B])&&(c===X||c===P||c===x))return Y;if(7===i||7===c)return Y;if(9===i)return Y;if(-1===[H,d,f].indexOf(i)&&9===c)return Y;if(-1!==[p,N,m,O,y].indexOf(c))return Y;if(g(B,e)===v)return Y;if(C(23,v,B,e))return Y;if(C([p,N],L,B,e))return Y;if(C(12,12,B,e))return Y;if(i===H)return"첨";if(23===i||23===c)return Y;if(16===c||16===i)return"첨";if(-1!==[d,f,L].indexOf(c)||14===i)return Y;if(36===a&&-1!==rA.indexOf(i))return Y;if(i===y&&36===c)return Y;if(c===R&&-1!==Z.concat(R,m,D,X,P,x).indexOf(i))return Y;if(-1!==Z.indexOf(c)&&i===D||-1!==Z.indexOf(i)&&c===D)return Y;if(i===M&&-1!==[X,P,x].indexOf(c)||-1!==[X,P,x].indexOf(i)&&c===b)return Y;if(-1!==Z.indexOf(i)&&-1!==AA.indexOf(c)||-1!==AA.indexOf(i)&&-1!==Z.indexOf(c))return Y;if(-1!==[M,b].indexOf(i)&&(c===D||-1!==[v,f].indexOf(c)&&e[1+o]===D)||-1!==[v,f].indexOf(i)&&c===D||i===D&&-1!==[D,y,O].indexOf(c))return Y;if(-1!==[D,y,O,p,N].indexOf(c))for(var Q=B;0<=Q;){if((w=e[Q])===D)return Y;if(-1===[y,O].indexOf(w))break;Q--}if(-1!==[M,b].indexOf(c))for(Q=-1!==[p,N].indexOf(i)?s:B;0<=Q;){var w;if((w=e[Q])===D)return Y;if(-1===[y,O].indexOf(w))break;Q--}if(J===i&&-1!==[J,G,V,z].indexOf(c)||-1!==[G,V].indexOf(i)&&-1!==[G,k].indexOf(c)||-1!==[k,z].indexOf(i)&&c===k)return Y;if(-1!==tA.indexOf(i)&&-1!==[R,b].indexOf(c)||-1!==tA.indexOf(c)&&i===M)return Y;if(-1!==Z.indexOf(i)&&-1!==Z.indexOf(c))return Y;if(i===O&&-1!==Z.indexOf(c))return Y;if(-1!==Z.concat(D).indexOf(i)&&c===v||-1!==Z.concat(D).indexOf(c)&&i===N)return Y;if(41===i&&41===c){for(var u=t[B],U=1;0<u&&41===e[--u];)U++;if(U%2!=0)return Y}return i===P&&c===x?Y:"첨"}function u(t,A){A||(A={lineBreak:"normal",wordBreak:"normal"});var e=function(A,n){void 0===n&&(n="strict");var B=[],s=[],o=[];return A.forEach(function(A,e){var t=q.get(A);if(50<t?(o.push(!0),t-=50):o.push(!1),-1!==["normal","auto","loose"].indexOf(n)&&-1!==[8208,8211,12316,12448].indexOf(A))return s.push(e),B.push(16);if(4!==t&&11!==t)return s.push(e),31===t?B.push("strict"===n?L:X):t===W?B.push(_):29===t?B.push(_):43===t?131072<=A&&A<=196605||196608<=A&&A<=262141?B.push(X):B.push(_):void B.push(t);if(0===e)return s.push(e),B.push(_);var r=B[e-1];return-1===eA.indexOf(r)?(s.push(s[e-1]),B.push(r)):(s.push(e),B.push(_))}),[s,B,o]}(t,A.lineBreak),r=e[0],n=e[1],B=e[2];return"break-all"!==A.wordBreak&&"break-word"!==A.wordBreak||(n=n.map(function(A){return-1!==[D,_,W].indexOf(A)?X:A})),[r,n,"keep-all"===A.wordBreak?B.map(function(A,e){return A&&19968<=t[e]&&t[e]<=40959}):void 0]}var i,U,E,F,h,H=10,d=13,f=15,p=17,N=18,m=19,R=20,L=21,v=22,O=24,D=25,b=26,M=27,y=28,_=30,P=32,x=33,V=34,z=35,X=37,J=38,G=39,k=40,W=42,Y="횞",q=(i=function(A){var e,t,r,n,B,s=.75*A.length,o=A.length,i=0;"="===A[A.length-1]&&(s--,"="===A[A.length-2]&&s--);var a="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array&&void 0!==Uint8Array.prototype.slice?new ArrayBuffer(s):new Array(s),c=Array.isArray(a)?a:new Uint8Array(a);for(e=0;e<o;e+=4)t=Q[A.charCodeAt(e)],r=Q[A.charCodeAt(e+1)],n=Q[A.charCodeAt(e+2)],B=Q[A.charCodeAt(e+3)],c[i++]=t<<2|r>>4,c[i++]=(15&r)<<4|n>>2,c[i++]=(3&n)<<6|63&B;return a}("KwAAAAAAAAAACA4AIDoAAPAfAAACAAAAAAAIABAAGABAAEgAUABYAF4AZgBeAGYAYABoAHAAeABeAGYAfACEAIAAiACQAJgAoACoAK0AtQC9AMUAXgBmAF4AZgBeAGYAzQDVAF4AZgDRANkA3gDmAOwA9AD8AAQBDAEUARoBIgGAAIgAJwEvATcBPwFFAU0BTAFUAVwBZAFsAXMBewGDATAAiwGTAZsBogGkAawBtAG8AcIBygHSAdoB4AHoAfAB+AH+AQYCDgIWAv4BHgImAi4CNgI+AkUCTQJTAlsCYwJrAnECeQKBAk0CiQKRApkCoQKoArACuALAAsQCzAIwANQC3ALkAjAA7AL0AvwCAQMJAxADGAMwACADJgMuAzYDPgOAAEYDSgNSA1IDUgNaA1oDYANiA2IDgACAAGoDgAByA3YDfgOAAIQDgACKA5IDmgOAAIAAogOqA4AAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAK8DtwOAAIAAvwPHA88D1wPfAyAD5wPsA/QD/AOAAIAABAQMBBIEgAAWBB4EJgQuBDMEIAM7BEEEXgBJBCADUQRZBGEEaQQwADAAcQQ+AXkEgQSJBJEEgACYBIAAoASoBK8EtwQwAL8ExQSAAIAAgACAAIAAgACgAM0EXgBeAF4AXgBeAF4AXgBeANUEXgDZBOEEXgDpBPEE+QQBBQkFEQUZBSEFKQUxBTUFPQVFBUwFVAVcBV4AYwVeAGsFcwV7BYMFiwWSBV4AmgWgBacFXgBeAF4AXgBeAKsFXgCyBbEFugW7BcIFwgXIBcIFwgXQBdQF3AXkBesF8wX7BQMGCwYTBhsGIwYrBjMGOwZeAD8GRwZNBl4AVAZbBl4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAGMGXgBqBnEGXgBeAF4AXgBeAF4AXgBeAF4AXgB5BoAG4wSGBo4GkwaAAIADHgR5AF4AXgBeAJsGgABGA4AAowarBrMGswagALsGwwbLBjAA0wbaBtoG3QbaBtoG2gbaBtoG2gblBusG8wb7BgMHCwcTBxsHCwcjBysHMAc1BzUHOgdCB9oGSgdSB1oHYAfaBloHaAfaBlIH2gbaBtoG2gbaBtoG2gbaBjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHbQdeAF4ANQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQd1B30HNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B4MH2gaKB68EgACAAIAAgACAAIAAgACAAI8HlwdeAJ8HpweAAIAArwe3B14AXgC/B8UHygcwANAH2AfgB4AA6AfwBz4B+AcACFwBCAgPCBcIogEYAR8IJwiAAC8INwg/CCADRwhPCFcIXwhnCEoDGgSAAIAAgABvCHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIhAiLCI4IMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAANQc1BzUHNQc1BzUHNQc1BzUHNQc1B54INQc1B6II2gaqCLIIugiAAIAAvgjGCIAAgACAAIAAgACAAIAAgACAAIAAywiHAYAA0wiAANkI3QjlCO0I9Aj8CIAAgACAAAIJCgkSCRoJIgknCTYHLwk3CZYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiAAIAAAAFAAXgBeAGAAcABeAHwAQACQAKAArQC9AJ4AXgBeAE0A3gBRAN4A7AD8AMwBGgEAAKcBNwEFAUwBXAF4QkhCmEKnArcCgAHHAsABz4LAAcABwAHAAd+C6ABoAG+C/4LAAcABwAHAAc+DF4MAAcAB54M3gweDV4Nng3eDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEeDqABVg6WDqABoQ6gAaABoAHXDvcONw/3DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DncPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB7cPPwlGCU4JMACAAIAAgABWCV4JYQmAAGkJcAl4CXwJgAkwADAAMAAwAIgJgACLCZMJgACZCZ8JowmrCYAAswkwAF4AXgB8AIAAuwkABMMJyQmAAM4JgADVCTAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAqwYWBNkIMAAwADAAMADdCeAJ6AnuCR4E9gkwAP4JBQoNCjAAMACAABUK0wiAAB0KJAosCjQKgAAwADwKQwqAAEsKvQmdCVMKWwowADAAgACAALcEMACAAGMKgABrCjAAMAAwADAAMAAwADAAMAAwADAAMAAeBDAAMAAwADAAMAAwADAAMAAwADAAMAAwAIkEPQFzCnoKiQSCCooKkAqJBJgKoAqkCokEGAGsCrQKvArBCjAAMADJCtEKFQHZCuEK/gHpCvEKMAAwADAAMACAAIwE+QowAIAAPwEBCzAAMAAwADAAMACAAAkLEQswAIAAPwEZCyELgAAOCCkLMAAxCzkLMAAwADAAMAAwADAAXgBeAEELMAAwADAAMAAwADAAMAAwAEkLTQtVC4AAXAtkC4AAiQkwADAAMAAwADAAMAAwADAAbAtxC3kLgAuFC4sLMAAwAJMLlwufCzAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAApwswADAAMACAAIAAgACvC4AAgACAAIAAgACAALcLMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAvwuAAMcLgACAAIAAgACAAIAAyguAAIAAgACAAIAA0QswADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAANkLgACAAIAA4AswADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACJCR4E6AswADAAhwHwC4AA+AsADAgMEAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMACAAIAAGAwdDCUMMAAwAC0MNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQw1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHPQwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADUHNQc1BzUHNQc1BzUHNQc2BzAAMAA5DDUHNQc1BzUHNQc1BzUHNQc1BzUHNQdFDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAATQxSDFoMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAF4AXgBeAF4AXgBeAF4AYgxeAGoMXgBxDHkMfwxeAIUMXgBeAI0MMAAwADAAMAAwAF4AXgCVDJ0MMAAwADAAMABeAF4ApQxeAKsMswy7DF4Awgy9DMoMXgBeAF4AXgBeAF4AXgBeAF4AXgDRDNkMeQBqCeAM3Ax8AOYM7Az0DPgMXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgCgAAANoAAHDQ4NFg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAeDSYNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAC4NMABeAF4ANg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAD4NRg1ODVYNXg1mDTAAbQ0wADAAMAAwADAAMAAwADAA2gbaBtoG2gbaBtoG2gbaBnUNeg3CBYANwgWFDdoGjA3aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gaUDZwNpA2oDdoG2gawDbcNvw3HDdoG2gbPDdYN3A3fDeYN2gbsDfMN2gbaBvoN/g3aBgYODg7aBl4AXgBeABYOXgBeACUG2gYeDl4AJA5eACwO2w3aBtoGMQ45DtoG2gbaBtoGQQ7aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B1EO2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQdZDjUHNQc1BzUHNQc1B2EONQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHaA41BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B3AO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B2EO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBkkOeA6gAKAAoAAwADAAMAAwAKAAoACgAKAAoACgAKAAgA4wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAD//wQABAAEAAQABAAEAAQABAAEAA0AAwABAAEAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAKABMAFwAeABsAGgAeABcAFgASAB4AGwAYAA8AGAAcAEsASwBLAEsASwBLAEsASwBLAEsAGAAYAB4AHgAeABMAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAFgAbABIAHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYADQARAB4ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkAFgAaABsAGwAbAB4AHQAdAB4ATwAXAB4ADQAeAB4AGgAbAE8ATwAOAFAAHQAdAB0ATwBPABcATwBPAE8AFgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwArAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAAQABAANAA0ASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAUAArACsAKwArACsAKwArACsABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAGgAaAFAAUABQAFAAUABMAB4AGwBQAB4AKwArACsABAAEAAQAKwBQAFAAUABQAFAAUAArACsAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUAArAFAAUAArACsABAArAAQABAAEAAQABAArACsAKwArAAQABAArACsABAAEAAQAKwArACsABAArACsAKwArACsAKwArAFAAUABQAFAAKwBQACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwAEAAQAUABQAFAABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQAKwArAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeABsAKwArACsAKwArACsAKwBQAAQABAAEAAQABAAEACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAKwArACsAKwArACsAKwArAAQABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwAEAFAAKwBQAFAAUABQAFAAUAArACsAKwBQAFAAUAArAFAAUABQAFAAKwArACsAUABQACsAUAArAFAAUAArACsAKwBQAFAAKwArACsAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQAKwArACsABAAEAAQAKwAEAAQABAAEACsAKwBQACsAKwArACsAKwArAAQAKwArACsAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAB4AHgAeAB4AHgAeABsAHgArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArAFAAUABQACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAB4AUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArACsAKwArACsAKwArAFAAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwArAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAKwBcAFwAKwBcACsAKwBcACsAKwArACsAKwArAFwAXABcAFwAKwBcAFwAXABcAFwAXABcACsAXABcAFwAKwBcACsAXAArACsAXABcACsAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgArACoAKgBcACsAKwBcAFwAXABcAFwAKwBcACsAKgAqACoAKgAqACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAFwAXABcAFwAUAAOAA4ADgAOAB4ADgAOAAkADgAOAA0ACQATABMAEwATABMACQAeABMAHgAeAB4ABAAEAB4AHgAeAB4AHgAeAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUAANAAQAHgAEAB4ABAAWABEAFgARAAQABABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAAQABAAEAAQABAANAAQABABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsADQANAB4AHgAeAB4AHgAeAAQAHgAeAB4AHgAeAB4AKwAeAB4ADgAOAA0ADgAeAB4AHgAeAB4ACQAJACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgAeAB4AHgBcAFwAXABcAFwAXAAqACoAKgAqAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAKgAqACoAKgAqACoAKgBcAFwAXAAqACoAKgAqAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAXAAqAEsASwBLAEsASwBLAEsASwBLAEsAKgAqACoAKgAqACoAUABQAFAAUABQAFAAKwBQACsAKwArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQACsAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwAEAAQABAAeAA0AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAEQArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAADQANAA0AUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAA0ADQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoADQANABUAXAANAB4ADQAbAFwAKgArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAB4AHgATABMADQANAA4AHgATABMAHgAEAAQABAAJACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAUABQAFAAUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwAeACsAKwArABMAEwBLAEsASwBLAEsASwBLAEsASwBLAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwBcAFwAXABcAFwAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcACsAKwArACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwAeAB4AXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsABABLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKgAqACoAKgAqACoAKgBcACoAKgAqACoAKgAqACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAUABQAFAAUABQAFAAUAArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4ADQANAA0ADQAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAHgAeAB4AHgBQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwANAA0ADQANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwBQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsABAAEAAQAHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAABABQAFAAUABQAAQABAAEAFAAUAAEAAQABAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAKwBQACsAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAKwArAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAKwAeAB4AHgAeAB4AHgAeAA4AHgArAA0ADQANAA0ADQANAA0ACQANAA0ADQAIAAQACwAEAAQADQAJAA0ADQAMAB0AHQAeABcAFwAWABcAFwAXABYAFwAdAB0AHgAeABQAFAAUAA0AAQABAAQABAAEAAQABAAJABoAGgAaABoAGgAaABoAGgAeABcAFwAdABUAFQAeAB4AHgAeAB4AHgAYABYAEQAVABUAFQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgANAB4ADQANAA0ADQAeAA0ADQANAAcAHgAeAB4AHgArAAQABAAEAAQABAAEAAQABAAEAAQAUABQACsAKwBPAFAAUABQAFAAUAAeAB4AHgAWABEATwBQAE8ATwBPAE8AUABQAFAAUABQAB4AHgAeABYAEQArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGgAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgBQABoAHgAdAB4AUAAeABoAHgAeAB4AHgAeAB4AHgAeAB4ATwAeAFAAGwAeAB4AUABQAFAAUABQAB4AHgAeAB0AHQAeAFAAHgBQAB4AUAAeAFAATwBQAFAAHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AUABQAFAAUABPAE8AUABQAFAAUABQAE8AUABQAE8AUABPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAE8ATwBPAE8ATwBPAE8ATwBPAE8AUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAATwAeAB4AKwArACsAKwAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB0AHQAeAB4AHgAdAB0AHgAeAB0AHgAeAB4AHQAeAB0AGwAbAB4AHQAeAB4AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB0AHgAdAB4AHQAdAB0AHQAdAB0AHgAdAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAdAB0AHQAdAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAlACUAHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB0AHQAeAB4AHgAeAB0AHQAdAB4AHgAdAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB0AHQAeAB4AHQAeAB4AHgAeAB0AHQAeAB4AHgAeACUAJQAdAB0AJQAeACUAJQAlACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHQAdAB0AHgAdACUAHQAdAB4AHQAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHQAdAB0AHQAlAB4AJQAlACUAHQAlACUAHQAdAB0AJQAlAB0AHQAlAB0AHQAlACUAJQAeAB0AHgAeAB4AHgAdAB0AJQAdAB0AHQAdAB0AHQAlACUAJQAlACUAHQAlACUAIAAlAB0AHQAlACUAJQAlACUAJQAlACUAHgAeAB4AJQAlACAAIAAgACAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeABcAFwAXABcAFwAXAB4AEwATACUAHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACUAJQBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwArACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAE8ATwBPAE8ATwBPAE8ATwAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeACsAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUAArACsAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQBQAFAAUABQACsAKwArACsAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAABAAEAAQAKwAEAAQAKwArACsAKwArAAQABAAEAAQAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsABAAEAAQAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsADQANAA0ADQANAA0ADQANAB4AKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAUABQAFAAUABQAA0ADQANAA0ADQANABQAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwANAA0ADQANAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAeAAQABAAEAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLACsADQArAB4AKwArAAQABAAEAAQAUABQAB4AUAArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwAEAAQABAAEAAQABAAEAAQABAAOAA0ADQATABMAHgAeAB4ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0AUABQAFAAUAAEAAQAKwArAAQADQANAB4AUAArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXABcAA0ADQANACoASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUAArACsAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANACsADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEcARwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwAeAAQABAANAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAEAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUAArACsAUAArACsAUABQACsAKwBQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAeAB4ADQANAA0ADQAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAArAAQABAArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAEAAQABAAEAAQABAAEACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAFgAWAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAKwBQACsAKwArACsAKwArAFAAKwArACsAKwBQACsAUAArAFAAKwBQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQACsAUAArAFAAKwBQACsAUABQACsAUAArACsAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAUABQAFAAUAArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUAArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAlACUAJQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeACUAJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeACUAJQAlACUAJQAeACUAJQAlACUAJQAgACAAIAAlACUAIAAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIQAhACEAIQAhACUAJQAgACAAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAIAAlACUAJQAlACAAJQAgACAAIAAgACAAIAAgACAAIAAlACUAJQAgACUAJQAlACUAIAAgACAAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeACUAHgAlAB4AJQAlACUAJQAlACAAJQAlACUAJQAeACUAHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAIAAgACAAIAAgAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFwAXABcAFQAVABUAHgAeAB4AHgAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAlACAAIAAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsA"),U=Array.isArray(i)?function(A){for(var e=A.length,t=[],r=0;r<e;r+=4)t.push(A[r+3]<<24|A[r+2]<<16|A[r+1]<<8|A[r]);return t}(i):new Uint32Array(i),E=Array.isArray(i)?function(A){for(var e=A.length,t=[],r=0;r<e;r+=2)t.push(A[r+1]<<8|A[r]);return t}(i):new Uint16Array(i),F=B(E,12,U[4]/2),h=2===U[5]?B(E,(24+U[4])/2):function(A,e,t){return A.slice?A.slice(e,t):new Uint32Array(Array.prototype.slice.call(A,e,t))}(U,Math.ceil((24+U[4])/4)),new s(U[0],U[1],U[2],U[3],F,h)),Z=[_,36],j=[1,2,3,5],$=[H,8],AA=[M,b],eA=j.concat($),tA=[J,G,k,V,z],rA=[f,d],nA=(BA.prototype.slice=function(){return l.apply(void 0,this.codePoints.slice(this.start,this.end))},BA);function BA(A,e,t,r){this.codePoints=A,this.required="!"===e,this.start=t,this.end=r}var sA,oA;(oA=sA||(sA={}))[oA.STRING_TOKEN=0]="STRING_TOKEN",oA[oA.BAD_STRING_TOKEN=1]="BAD_STRING_TOKEN",oA[oA.LEFT_PARENTHESIS_TOKEN=2]="LEFT_PARENTHESIS_TOKEN",oA[oA.RIGHT_PARENTHESIS_TOKEN=3]="RIGHT_PARENTHESIS_TOKEN",oA[oA.COMMA_TOKEN=4]="COMMA_TOKEN",oA[oA.HASH_TOKEN=5]="HASH_TOKEN",oA[oA.DELIM_TOKEN=6]="DELIM_TOKEN",oA[oA.AT_KEYWORD_TOKEN=7]="AT_KEYWORD_TOKEN",oA[oA.PREFIX_MATCH_TOKEN=8]="PREFIX_MATCH_TOKEN",oA[oA.DASH_MATCH_TOKEN=9]="DASH_MATCH_TOKEN",oA[oA.INCLUDE_MATCH_TOKEN=10]="INCLUDE_MATCH_TOKEN",oA[oA.LEFT_CURLY_BRACKET_TOKEN=11]="LEFT_CURLY_BRACKET_TOKEN",oA[oA.RIGHT_CURLY_BRACKET_TOKEN=12]="RIGHT_CURLY_BRACKET_TOKEN",oA[oA.SUFFIX_MATCH_TOKEN=13]="SUFFIX_MATCH_TOKEN",oA[oA.SUBSTRING_MATCH_TOKEN=14]="SUBSTRING_MATCH_TOKEN",oA[oA.DIMENSION_TOKEN=15]="DIMENSION_TOKEN",oA[oA.PERCENTAGE_TOKEN=16]="PERCENTAGE_TOKEN",oA[oA.NUMBER_TOKEN=17]="NUMBER_TOKEN",oA[oA.FUNCTION=18]="FUNCTION",oA[oA.FUNCTION_TOKEN=19]="FUNCTION_TOKEN",oA[oA.IDENT_TOKEN=20]="IDENT_TOKEN",oA[oA.COLUMN_TOKEN=21]="COLUMN_TOKEN",oA[oA.URL_TOKEN=22]="URL_TOKEN",oA[oA.BAD_URL_TOKEN=23]="BAD_URL_TOKEN",oA[oA.CDC_TOKEN=24]="CDC_TOKEN",oA[oA.CDO_TOKEN=25]="CDO_TOKEN",oA[oA.COLON_TOKEN=26]="COLON_TOKEN",oA[oA.SEMICOLON_TOKEN=27]="SEMICOLON_TOKEN",oA[oA.LEFT_SQUARE_BRACKET_TOKEN=28]="LEFT_SQUARE_BRACKET_TOKEN",oA[oA.RIGHT_SQUARE_BRACKET_TOKEN=29]="RIGHT_SQUARE_BRACKET_TOKEN",oA[oA.UNICODE_RANGE_TOKEN=30]="UNICODE_RANGE_TOKEN",oA[oA.WHITESPACE_TOKEN=31]="WHITESPACE_TOKEN",oA[oA.EOF_TOKEN=32]="EOF_TOKEN";function iA(A){return 48<=A&&A<=57}function aA(A){return iA(A)||65<=A&&A<=70||97<=A&&A<=102}function cA(A){return 10===A||9===A||32===A}function QA(A){return function(A){return function(A){return 97<=A&&A<=122}(A)||function(A){return 65<=A&&A<=90}(A)}(A)||function(A){return 128<=A}(A)||95===A}function wA(A){return QA(A)||iA(A)||45===A}function uA(A,e){return 92===A&&10!==e}function UA(A,e,t){return 45===A?QA(e)||uA(e,t):!!QA(A)||!(92!==A||!uA(A,e))}function lA(A,e,t){return 43===A||45===A?!!iA(e)||46===e&&iA(t):iA(46===A?e:A)}var CA={type:sA.LEFT_PARENTHESIS_TOKEN},gA={type:sA.RIGHT_PARENTHESIS_TOKEN},EA={type:sA.COMMA_TOKEN},FA={type:sA.SUFFIX_MATCH_TOKEN},hA={type:sA.PREFIX_MATCH_TOKEN},HA={type:sA.COLUMN_TOKEN},dA={type:sA.DASH_MATCH_TOKEN},fA={type:sA.INCLUDE_MATCH_TOKEN},pA={type:sA.LEFT_CURLY_BRACKET_TOKEN},NA={type:sA.RIGHT_CURLY_BRACKET_TOKEN},KA={type:sA.SUBSTRING_MATCH_TOKEN},IA={type:sA.BAD_URL_TOKEN},TA={type:sA.BAD_STRING_TOKEN},mA={type:sA.CDO_TOKEN},RA={type:sA.CDC_TOKEN},LA={type:sA.COLON_TOKEN},vA={type:sA.SEMICOLON_TOKEN},OA={type:sA.LEFT_SQUARE_BRACKET_TOKEN},DA={type:sA.RIGHT_SQUARE_BRACKET_TOKEN},bA={type:sA.WHITESPACE_TOKEN},SA={type:sA.EOF_TOKEN},MA=(yA.prototype.write=function(A){this._value=this._value.concat(c(A))},yA.prototype.read=function(){for(var A=[],e=this.consumeToken();e!==SA;)A.push(e),e=this.consumeToken();return A},yA.prototype.consumeToken=function(){var A=this.consumeCodePoint();switch(A){case 34:return this.consumeStringToken(34);case 35:var e=this.peekCodePoint(0),t=this.peekCodePoint(1),r=this.peekCodePoint(2);if(wA(e)||uA(t,r)){var n=UA(e,t,r)?2:1,B=this.consumeName();return{type:sA.HASH_TOKEN,value:B,flags:n}}break;case 36:if(61===this.peekCodePoint(0))return this.consumeCodePoint(),FA;break;case 39:return this.consumeStringToken(39);case 40:return CA;case 41:return gA;case 42:if(61===this.peekCodePoint(0))return this.consumeCodePoint(),KA;break;case 43:if(lA(A,this.peekCodePoint(0),this.peekCodePoint(1)))return this.reconsumeCodePoint(A),this.consumeNumericToken();break;case 44:return EA;case 45:var s=A,o=this.peekCodePoint(0),i=this.peekCodePoint(1);if(lA(s,o,i))return this.reconsumeCodePoint(A),this.consumeNumericToken();if(UA(s,o,i))return this.reconsumeCodePoint(A),this.consumeIdentLikeToken();if(45===o&&62===i)return this.consumeCodePoint(),this.consumeCodePoint(),RA;break;case 46:if(lA(A,this.peekCodePoint(0),this.peekCodePoint(1)))return this.reconsumeCodePoint(A),this.consumeNumericToken();break;case 47:if(42===this.peekCodePoint(0))for(this.consumeCodePoint();;){var a=this.consumeCodePoint();if(42===a&&47===(a=this.consumeCodePoint()))return this.consumeToken();if(-1===a)return this.consumeToken()}break;case 58:return LA;case 59:return vA;case 60:if(33===this.peekCodePoint(0)&&45===this.peekCodePoint(1)&&45===this.peekCodePoint(2))return this.consumeCodePoint(),this.consumeCodePoint(),mA;break;case 64:var c=this.peekCodePoint(0),Q=this.peekCodePoint(1),w=this.peekCodePoint(2);if(UA(c,Q,w))return B=this.consumeName(),{type:sA.AT_KEYWORD_TOKEN,value:B};break;case 91:return OA;case 92:if(uA(A,this.peekCodePoint(0)))return this.reconsumeCodePoint(A),this.consumeIdentLikeToken();break;case 93:return DA;case 61:if(61===this.peekCodePoint(0))return this.consumeCodePoint(),hA;break;case 123:return pA;case 125:return NA;case 117:case 85:var u=this.peekCodePoint(0),U=this.peekCodePoint(1);return 43!==u||!aA(U)&&63!==U||(this.consumeCodePoint(),this.consumeUnicodeRangeToken()),this.reconsumeCodePoint(A),this.consumeIdentLikeToken();case 124:if(61===this.peekCodePoint(0))return this.consumeCodePoint(),dA;if(124===this.peekCodePoint(0))return this.consumeCodePoint(),HA;break;case 126:if(61===this.peekCodePoint(0))return this.consumeCodePoint(),fA;break;case-1:return SA}return cA(A)?(this.consumeWhiteSpace(),bA):iA(A)?(this.reconsumeCodePoint(A),this.consumeNumericToken()):QA(A)?(this.reconsumeCodePoint(A),this.consumeIdentLikeToken()):{type:sA.DELIM_TOKEN,value:l(A)}},yA.prototype.consumeCodePoint=function(){var A=this._value.shift();return void 0===A?-1:A},yA.prototype.reconsumeCodePoint=function(A){this._value.unshift(A)},yA.prototype.peekCodePoint=function(A){return A>=this._value.length?-1:this._value[A]},yA.prototype.consumeUnicodeRangeToken=function(){for(var A=[],e=this.consumeCodePoint();aA(e)&&A.length<6;)A.push(e),e=this.consumeCodePoint();for(var t=!1;63===e&&A.length<6;)A.push(e),e=this.consumeCodePoint(),t=!0;if(t){var r=parseInt(l.apply(void 0,A.map(function(A){return 63===A?48:A})),16),n=parseInt(l.apply(void 0,A.map(function(A){return 63===A?70:A})),16);return{type:sA.UNICODE_RANGE_TOKEN,start:r,end:n}}var B=parseInt(l.apply(void 0,A),16);if(45===this.peekCodePoint(0)&&aA(this.peekCodePoint(1))){this.consumeCodePoint(),e=this.consumeCodePoint();for(var s=[];aA(e)&&s.length<6;)s.push(e),e=this.consumeCodePoint();return n=parseInt(l.apply(void 0,s),16),{type:sA.UNICODE_RANGE_TOKEN,start:B,end:n}}return{type:sA.UNICODE_RANGE_TOKEN,start:B,end:B}},yA.prototype.consumeIdentLikeToken=function(){var A=this.consumeName();return"url"===A.toLowerCase()&&40===this.peekCodePoint(0)?(this.consumeCodePoint(),this.consumeUrlToken()):40===this.peekCodePoint(0)?(this.consumeCodePoint(),{type:sA.FUNCTION_TOKEN,value:A}):{type:sA.IDENT_TOKEN,value:A}},yA.prototype.consumeUrlToken=function(){var A=[];if(this.consumeWhiteSpace(),-1===this.peekCodePoint(0))return{type:sA.URL_TOKEN,value:""};var e,t=this.peekCodePoint(0);if(39===t||34===t){var r=this.consumeStringToken(this.consumeCodePoint());return r.type===sA.STRING_TOKEN&&(this.consumeWhiteSpace(),-1===this.peekCodePoint(0)||41===this.peekCodePoint(0))?(this.consumeCodePoint(),{type:sA.URL_TOKEN,value:r.value}):(this.consumeBadUrlRemnants(),IA)}for(;;){var n=this.consumeCodePoint();if(-1===n||41===n)return{type:sA.URL_TOKEN,value:l.apply(void 0,A)};if(cA(n))return this.consumeWhiteSpace(),-1===this.peekCodePoint(0)||41===this.peekCodePoint(0)?(this.consumeCodePoint(),{type:sA.URL_TOKEN,value:l.apply(void 0,A)}):(this.consumeBadUrlRemnants(),IA);if(34===n||39===n||40===n||0<=(e=n)&&e<=8||11===e||14<=e&&e<=31||127===e)return this.consumeBadUrlRemnants(),IA;if(92===n){if(!uA(n,this.peekCodePoint(0)))return this.consumeBadUrlRemnants(),IA;A.push(this.consumeEscapedCodePoint())}else A.push(n)}},yA.prototype.consumeWhiteSpace=function(){for(;cA(this.peekCodePoint(0));)this.consumeCodePoint()},yA.prototype.consumeBadUrlRemnants=function(){for(;;){var A=this.consumeCodePoint();if(41===A||-1===A)return;uA(A,this.peekCodePoint(0))&&this.consumeEscapedCodePoint()}},yA.prototype.consumeStringSlice=function(A){for(var e="";0<A;){var t=Math.min(6e4,A);e+=l.apply(void 0,this._value.splice(0,t)),A-=t}return this._value.shift(),e},yA.prototype.consumeStringToken=function(A){for(var e="",t=0;;){var r=this._value[t];if(-1===r||void 0===r||r===A)return e+=this.consumeStringSlice(t),{type:sA.STRING_TOKEN,value:e};if(10===r)return this._value.splice(0,t),TA;if(92===r){var n=this._value[t+1];-1!==n&&void 0!==n&&(10===n?(e+=this.consumeStringSlice(t),t=-1,this._value.shift()):uA(r,n)&&(e+=this.consumeStringSlice(t),e+=l(this.consumeEscapedCodePoint()),t=-1))}t++}},yA.prototype.consumeNumber=function(){var A=[],e=4,t=this.peekCodePoint(0);for(43!==t&&45!==t||A.push(this.consumeCodePoint());iA(this.peekCodePoint(0));)A.push(this.consumeCodePoint());t=this.peekCodePoint(0);var r=this.peekCodePoint(1);if(46===t&&iA(r))for(A.push(this.consumeCodePoint(),this.consumeCodePoint()),e=8;iA(this.peekCodePoint(0));)A.push(this.consumeCodePoint());t=this.peekCodePoint(0),r=this.peekCodePoint(1);var n=this.peekCodePoint(2);if((69===t||101===t)&&((43===r||45===r)&&iA(n)||iA(r)))for(A.push(this.consumeCodePoint(),this.consumeCodePoint()),e=8;iA(this.peekCodePoint(0));)A.push(this.consumeCodePoint());return[function(A){var e=0,t=1;43!==A[e]&&45!==A[e]||(45===A[e]&&(t=-1),e++);for(var r=[];iA(A[e]);)r.push(A[e++]);var n=r.length?parseInt(l.apply(void 0,r),10):0;46===A[e]&&e++;for(var B=[];iA(A[e]);)B.push(A[e++]);var s=B.length,o=s?parseInt(l.apply(void 0,B),10):0;69!==A[e]&&101!==A[e]||e++;var i=1;43!==A[e]&&45!==A[e]||(45===A[e]&&(i=-1),e++);for(var a=[];iA(A[e]);)a.push(A[e++]);var c=a.length?parseInt(l.apply(void 0,a),10):0;return t*(n+o*Math.pow(10,-s))*Math.pow(10,i*c)}(A),e]},yA.prototype.consumeNumericToken=function(){var A=this.consumeNumber(),e=A[0],t=A[1],r=this.peekCodePoint(0),n=this.peekCodePoint(1),B=this.peekCodePoint(2);if(UA(r,n,B)){var s=this.consumeName();return{type:sA.DIMENSION_TOKEN,number:e,flags:t,unit:s}}return 37===r?(this.consumeCodePoint(),{type:sA.PERCENTAGE_TOKEN,number:e,flags:t}):{type:sA.NUMBER_TOKEN,number:e,flags:t}},yA.prototype.consumeEscapedCodePoint=function(){var A=this.consumeCodePoint();if(aA(A)){for(var e=l(A);aA(this.peekCodePoint(0))&&e.length<6;)e+=l(this.consumeCodePoint());cA(this.peekCodePoint(0))&&this.consumeCodePoint();var t=parseInt(e,16);return 0===t||function(A){return 55296<=A&&A<=57343}(t)||1114111<t?65533:t}return-1===A?65533:A},yA.prototype.consumeName=function(){for(var A="";;){var e=this.consumeCodePoint();if(wA(e))A+=l(e);else{if(!uA(e,this.peekCodePoint(0)))return this.reconsumeCodePoint(e),A;A+=l(this.consumeEscapedCodePoint())}}},yA);function yA(){this._value=[]}var _A=(PA.create=function(A){var e=new MA;return e.write(A),new PA(e.read())},PA.parseValue=function(A){return PA.create(A).parseComponentValue()},PA.parseValues=function(A){return PA.create(A).parseComponentValues()},PA.prototype.parseComponentValue=function(){for(var A=this.consumeToken();A.type===sA.WHITESPACE_TOKEN;)A=this.consumeToken();if(A.type===sA.EOF_TOKEN)throw new SyntaxError("Error parsing CSS component value, unexpected EOF");this.reconsumeToken(A);for(var e=this.consumeComponentValue();(A=this.consumeToken()).type===sA.WHITESPACE_TOKEN;);if(A.type===sA.EOF_TOKEN)return e;throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one")},PA.prototype.parseComponentValues=function(){for(var A=[];;){var e=this.consumeComponentValue();if(e.type===sA.EOF_TOKEN)return A;A.push(e),A.push()}},PA.prototype.consumeComponentValue=function(){var A=this.consumeToken();switch(A.type){case sA.LEFT_CURLY_BRACKET_TOKEN:case sA.LEFT_SQUARE_BRACKET_TOKEN:case sA.LEFT_PARENTHESIS_TOKEN:return this.consumeSimpleBlock(A.type);case sA.FUNCTION_TOKEN:return this.consumeFunction(A)}return A},PA.prototype.consumeSimpleBlock=function(A){for(var e={type:A,values:[]},t=this.consumeToken();;){if(t.type===sA.EOF_TOKEN||Be(t,A))return e;this.reconsumeToken(t),e.values.push(this.consumeComponentValue()),t=this.consumeToken()}},PA.prototype.consumeFunction=function(A){for(var e={name:A.value,values:[],type:sA.FUNCTION};;){var t=this.consumeToken();if(t.type===sA.EOF_TOKEN||t.type===sA.RIGHT_PARENTHESIS_TOKEN)return e;this.reconsumeToken(t),e.values.push(this.consumeComponentValue())}},PA.prototype.consumeToken=function(){var A=this._tokens.shift();return void 0===A?SA:A},PA.prototype.reconsumeToken=function(A){this._tokens.unshift(A)},PA);function PA(A){this._tokens=A}function xA(A){return A.type===sA.DIMENSION_TOKEN}function VA(A){return A.type===sA.NUMBER_TOKEN}function zA(A){return A.type===sA.IDENT_TOKEN}function XA(A){return A.type===sA.STRING_TOKEN}function JA(A,e){return zA(A)&&A.value===e}function GA(A){return A.type!==sA.WHITESPACE_TOKEN}function kA(A){return A.type!==sA.WHITESPACE_TOKEN&&A.type!==sA.COMMA_TOKEN}function WA(A){var e=[],t=[];return A.forEach(function(A){if(A.type===sA.COMMA_TOKEN){if(0===t.length)throw new Error("Error parsing function args, zero tokens for arg");return e.push(t),void(t=[])}A.type!==sA.WHITESPACE_TOKEN&&t.push(A)}),t.length&&e.push(t),e}function YA(A){return A.type===sA.NUMBER_TOKEN||A.type===sA.DIMENSION_TOKEN}function qA(A){return A.type===sA.PERCENTAGE_TOKEN||YA(A)}function ZA(A){return 1<A.length?[A[0],A[1]]:[A[0]]}function jA(A,e,t){var r=A[0],n=A[1];return[ae(r,e),ae(void 0!==n?n:r,t)]}function $A(A){return A.type===sA.DIMENSION_TOKEN&&("deg"===A.unit||"grad"===A.unit||"rad"===A.unit||"turn"===A.unit)}function Ae(A){switch(A.filter(zA).map(function(A){return A.value}).join(" ")){case"to bottom right":case"to right bottom":case"left top":case"top left":return[se,se];case"to top":case"bottom":return Qe(0);case"to bottom left":case"to left bottom":case"right top":case"top right":return[se,ie];case"to right":case"left":return Qe(90);case"to top left":case"to left top":case"right bottom":case"bottom right":return[ie,ie];case"to bottom":case"top":return Qe(180);case"to top right":case"to right top":case"left bottom":case"bottom left":return[ie,se];case"to left":case"right":return Qe(270)}return 0}function ee(A){return 0==(255&A)}function te(A){var e=255&A,t=255&A>>8,r=255&A>>16,n=255&A>>24;return e<255?"rgba("+n+","+r+","+t+","+e/255+")":"rgb("+n+","+r+","+t+")"}function re(A,e){if(A.type===sA.NUMBER_TOKEN)return A.number;if(A.type!==sA.PERCENTAGE_TOKEN)return 0;var t=3===e?1:255;return 3===e?A.number/100*t:Math.round(A.number/100*t)}function ne(A){var e=A.filter(kA);if(3===e.length){var t=e.map(re),r=t[0],n=t[1],B=t[2];return ue(r,n,B,1)}if(4!==e.length)return 0;var s=e.map(re),o=(r=s[0],n=s[1],B=s[2],s[3]);return ue(r,n,B,o)}var Be=function(A,e){return e===sA.LEFT_CURLY_BRACKET_TOKEN&&A.type===sA.RIGHT_CURLY_BRACKET_TOKEN||(e===sA.LEFT_SQUARE_BRACKET_TOKEN&&A.type===sA.RIGHT_SQUARE_BRACKET_TOKEN||e===sA.LEFT_PARENTHESIS_TOKEN&&A.type===sA.RIGHT_PARENTHESIS_TOKEN)},se={type:sA.NUMBER_TOKEN,number:0,flags:4},oe={type:sA.PERCENTAGE_TOKEN,number:50,flags:4},ie={type:sA.PERCENTAGE_TOKEN,number:100,flags:4},ae=function(A,e){if(A.type===sA.PERCENTAGE_TOKEN)return A.number/100*e;if(xA(A))switch(A.unit){case"rem":case"em":return 16*A.number;case"px":default:return A.number}return A.number},ce=function(A){if(A.type===sA.DIMENSION_TOKEN)switch(A.unit){case"deg":return Math.PI*A.number/180;case"grad":return Math.PI/200*A.number;case"rad":return A.number;case"turn":return 2*Math.PI*A.number}throw new Error("Unsupported angle type")},Qe=function(A){return Math.PI*A/180},we=function(A){if(A.type===sA.FUNCTION){var e=he[A.name];if(void 0===e)throw new Error('Attempting to parse an unsupported color function "'+A.name+'"');return e(A.values)}if(A.type===sA.HASH_TOKEN){if(3===A.value.length){var t=A.value.substring(0,1),r=A.value.substring(1,2),n=A.value.substring(2,3);return ue(parseInt(t+t,16),parseInt(r+r,16),parseInt(n+n,16),1)}if(4===A.value.length){t=A.value.substring(0,1),r=A.value.substring(1,2),n=A.value.substring(2,3);var B=A.value.substring(3,4);return ue(parseInt(t+t,16),parseInt(r+r,16),parseInt(n+n,16),parseInt(B+B,16)/255)}if(6===A.value.length){t=A.value.substring(0,2),r=A.value.substring(2,4),n=A.value.substring(4,6);return ue(parseInt(t,16),parseInt(r,16),parseInt(n,16),1)}if(8===A.value.length){t=A.value.substring(0,2),r=A.value.substring(2,4),n=A.value.substring(4,6),B=A.value.substring(6,8);return ue(parseInt(t,16),parseInt(r,16),parseInt(n,16),parseInt(B,16)/255)}}if(A.type===sA.IDENT_TOKEN){var s=He[A.value.toUpperCase()];if(void 0!==s)return s}return He.TRANSPARENT},ue=function(A,e,t,r){return(A<<24|e<<16|t<<8|Math.round(255*r)<<0)>>>0};function Ue(A,e,t){return t<0&&(t+=1),1<=t&&(t-=1),t<1/6?(e-A)*t*6+A:t<.5?e:t<2/3?6*(e-A)*(2/3-t)+A:A}function le(A){var e=A.filter(kA),t=e[0],r=e[1],n=e[2],B=e[3],s=(t.type===sA.NUMBER_TOKEN?Qe(t.number):ce(t))/(2*Math.PI),o=qA(r)?r.number/100:0,i=qA(n)?n.number/100:0,a=void 0!==B&&qA(B)?ae(B,1):1;if(0==o)return ue(255*i,255*i,255*i,1);var c=i<=.5?i*(1+o):i+o-i*o,Q=2*i-c,w=Ue(Q,c,s+1/3),u=Ue(Q,c,s),U=Ue(Q,c,s-1/3);return ue(255*w,255*u,255*U,a)}var Ce,ge,Ee,Fe,he={hsl:le,hsla:le,rgb:ne,rgba:ne},He={ALICEBLUE:4042850303,ANTIQUEWHITE:4209760255,AQUA:16777215,AQUAMARINE:2147472639,AZURE:4043309055,BEIGE:4126530815,BISQUE:4293182719,BLACK:255,BLANCHEDALMOND:4293643775,BLUE:65535,BLUEVIOLET:2318131967,BROWN:2771004159,BURLYWOOD:3736635391,CADETBLUE:1604231423,CHARTREUSE:2147418367,CHOCOLATE:3530104575,CORAL:4286533887,CORNFLOWERBLUE:1687547391,CORNSILK:4294499583,CRIMSON:3692313855,CYAN:16777215,DARKBLUE:35839,DARKCYAN:9145343,DARKGOLDENROD:3095837695,DARKGRAY:2846468607,DARKGREEN:6553855,DARKGREY:2846468607,DARKKHAKI:3182914559,DARKMAGENTA:2332068863,DARKOLIVEGREEN:1433087999,DARKORANGE:4287365375,DARKORCHID:2570243327,DARKRED:2332033279,DARKSALMON:3918953215,DARKSEAGREEN:2411499519,DARKSLATEBLUE:1211993087,DARKSLATEGRAY:793726975,DARKSLATEGREY:793726975,DARKTURQUOISE:13554175,DARKVIOLET:2483082239,DEEPPINK:4279538687,DEEPSKYBLUE:12582911,DIMGRAY:1768516095,DIMGREY:1768516095,DODGERBLUE:512819199,FIREBRICK:2988581631,FLORALWHITE:4294635775,FORESTGREEN:579543807,FUCHSIA:4278255615,GAINSBORO:3705462015,GHOSTWHITE:4177068031,GOLD:4292280575,GOLDENROD:3668254975,GRAY:2155905279,GREEN:8388863,GREENYELLOW:2919182335,GREY:2155905279,HONEYDEW:4043305215,HOTPINK:4285117695,INDIANRED:3445382399,INDIGO:1258324735,IVORY:4294963455,KHAKI:4041641215,LAVENDER:3873897215,LAVENDERBLUSH:4293981695,LAWNGREEN:2096890111,LEMONCHIFFON:4294626815,LIGHTBLUE:2916673279,LIGHTCORAL:4034953471,LIGHTCYAN:3774873599,LIGHTGOLDENRODYELLOW:4210742015,LIGHTGRAY:3553874943,LIGHTGREEN:2431553791,LIGHTGREY:3553874943,LIGHTPINK:4290167295,LIGHTSALMON:4288707327,LIGHTSEAGREEN:548580095,LIGHTSKYBLUE:2278488831,LIGHTSLATEGRAY:2005441023,LIGHTSLATEGREY:2005441023,LIGHTSTEELBLUE:2965692159,LIGHTYELLOW:4294959359,LIME:16711935,LIMEGREEN:852308735,LINEN:4210091775,MAGENTA:4278255615,MAROON:2147483903,MEDIUMAQUAMARINE:1724754687,MEDIUMBLUE:52735,MEDIUMORCHID:3126187007,MEDIUMPURPLE:2473647103,MEDIUMSEAGREEN:1018393087,MEDIUMSLATEBLUE:2070474495,MEDIUMSPRINGGREEN:16423679,MEDIUMTURQUOISE:1221709055,MEDIUMVIOLETRED:3340076543,MIDNIGHTBLUE:421097727,MINTCREAM:4127193855,MISTYROSE:4293190143,MOCCASIN:4293178879,NAVAJOWHITE:4292783615,NAVY:33023,OLDLACE:4260751103,OLIVE:2155872511,OLIVEDRAB:1804477439,ORANGE:4289003775,ORANGERED:4282712319,ORCHID:3664828159,PALEGOLDENROD:4008225535,PALEGREEN:2566625535,PALETURQUOISE:2951671551,PALEVIOLETRED:3681588223,PAPAYAWHIP:4293907967,PEACHPUFF:4292524543,PERU:3448061951,PINK:4290825215,PLUM:3718307327,POWDERBLUE:2967529215,PURPLE:2147516671,REBECCAPURPLE:1714657791,RED:4278190335,ROSYBROWN:3163525119,ROYALBLUE:1097458175,SADDLEBROWN:2336560127,SALMON:4202722047,SANDYBROWN:4104413439,SEAGREEN:780883967,SEASHELL:4294307583,SIENNA:2689740287,SILVER:3233857791,SKYBLUE:2278484991,SLATEBLUE:1784335871,SLATEGRAY:1887473919,SLATEGREY:1887473919,SNOW:4294638335,SPRINGGREEN:16744447,STEELBLUE:1182971135,TAN:3535047935,TEAL:8421631,THISTLE:3636451583,TOMATO:4284696575,TRANSPARENT:0,TURQUOISE:1088475391,VIOLET:4001558271,WHEAT:4125012991,WHITE:4294967295,WHITESMOKE:4126537215,YELLOW:4294902015,YELLOWGREEN:2597139199};(ge=Ce||(Ce={}))[ge.VALUE=0]="VALUE",ge[ge.LIST=1]="LIST",ge[ge.IDENT_VALUE=2]="IDENT_VALUE",ge[ge.TYPE_VALUE=3]="TYPE_VALUE",ge[ge.TOKEN_VALUE=4]="TOKEN_VALUE",(Fe=Ee||(Ee={}))[Fe.BORDER_BOX=0]="BORDER_BOX",Fe[Fe.PADDING_BOX=1]="PADDING_BOX";function de(A){var e=we(A[0]),t=A[1];return t&&qA(t)?{color:e,stop:t}:{color:e,stop:null}}function fe(A,t){var e=A[0],r=A[A.length-1];null===e.stop&&(e.stop=se),null===r.stop&&(r.stop=ie);for(var n=[],B=0,s=0;s<A.length;s++){var o=A[s].stop;if(null!==o){var i=ae(o,t);B<i?n.push(i):n.push(B),B=i}else n.push(null)}var a=null;for(s=0;s<n.length;s++){var c=n[s];if(null===c)null===a&&(a=s);else if(null!==a){for(var Q=s-a,w=(c-n[a-1])/(1+Q),u=1;u<=Q;u++)n[a+u-1]=w*u;a=null}}return A.map(function(A,e){return{color:A.color,stop:Math.max(Math.min(1,n[e]/t),0)}})}function pe(A,e,t){var r="number"==typeof A?A:function(A,e,t){var r=e/2,n=t/2,B=ae(A[0],e)-r,s=n-ae(A[1],t);return(Math.atan2(s,B)+2*Math.PI)%(2*Math.PI)}(A,e,t),n=Math.abs(e*Math.sin(r))+Math.abs(t*Math.cos(r)),B=e/2,s=t/2,o=n/2,i=Math.sin(r-Math.PI/2)*o,a=Math.cos(r-Math.PI/2)*o;return[n,B-a,B+a,s-i,s+i]}function Ne(A,e){return Math.sqrt(A*A+e*e)}function Ke(A,e,B,s,o){return[[0,0],[0,e],[A,0],[A,e]].reduce(function(A,e){var t=e[0],r=e[1],n=Ne(B-t,s-r);return(o?n<A.optimumDistance:n>A.optimumDistance)?{optimumCorner:e,optimumDistance:n}:A},{optimumDistance:o?1/0:-1/0,optimumCorner:null}).optimumCorner}function Ie(A){var n=Qe(180),B=[];return WA(A).forEach(function(A,e){if(0===e){var t=A[0];if(t.type===sA.IDENT_TOKEN&&-1!==["top","left","right","bottom"].indexOf(t.value))return void(n=Ae(A));if($A(t))return void(n=(ce(t)+Qe(270))%Qe(360))}var r=de(A);B.push(r)}),{angle:n,stops:B,type:xe.LINEAR_GRADIENT}}function Te(A){return 0===A[0]&&255===A[1]&&0===A[2]&&255===A[3]}var me={name:"background-clip",initialValue:"border-box",prefix:!(Fe[Fe.CONTENT_BOX=2]="CONTENT_BOX"),type:Ce.LIST,parse:function(A){return A.map(function(A){if(zA(A))switch(A.value){case"padding-box":return Ee.PADDING_BOX;case"content-box":return Ee.CONTENT_BOX}return Ee.BORDER_BOX})}},Re={name:"background-color",initialValue:"transparent",prefix:!1,type:Ce.TYPE_VALUE,format:"color"},Le=function(A,e,t,r,n){var B="http://www.w3.org/2000/svg",s=document.createElementNS(B,"svg"),o=document.createElementNS(B,"foreignObject");return s.setAttributeNS(null,"width",A.toString()),s.setAttributeNS(null,"height",e.toString()),o.setAttributeNS(null,"width","100%"),o.setAttributeNS(null,"height","100%"),o.setAttributeNS(null,"x",t.toString()),o.setAttributeNS(null,"y",r.toString()),o.setAttributeNS(null,"externalResourcesRequired","true"),s.appendChild(o),o.appendChild(n),s},ve=function(r){return new Promise(function(A,e){var t=new Image;t.onload=function(){return A(t)},t.onerror=e,t.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent((new XMLSerializer).serializeToString(r))})},Oe={get SUPPORT_RANGE_BOUNDS(){var A=function(A){if(A.createRange){var e=A.createRange();if(e.getBoundingClientRect){var t=A.createElement("boundtest");t.style.height="123px",t.style.display="block",A.body.appendChild(t),e.selectNode(t);var r=e.getBoundingClientRect(),n=Math.round(r.height);if(A.body.removeChild(t),123===n)return!0}}return!1}(document);return Object.defineProperty(Oe,"SUPPORT_RANGE_BOUNDS",{value:A}),A},get SUPPORT_SVG_DRAWING(){var A=function(A){var e=new Image,t=A.createElement("canvas"),r=t.getContext("2d");if(!r)return!1;e.src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";try{r.drawImage(e,0,0),t.toDataURL()}catch(A){return!1}return!0}(document);return Object.defineProperty(Oe,"SUPPORT_SVG_DRAWING",{value:A}),A},get SUPPORT_FOREIGNOBJECT_DRAWING(){var A="function"==typeof Array.from&&"function"==typeof window.fetch?function(r){var A=r.createElement("canvas"),n=100;A.width=n,A.height=n;var B=A.getContext("2d");if(!B)return Promise.reject(!1);B.fillStyle="rgb(0, 255, 0)",B.fillRect(0,0,n,n);var e=new Image,s=A.toDataURL();e.src=s;var t=Le(n,n,0,0,e);return B.fillStyle="red",B.fillRect(0,0,n,n),ve(t).then(function(A){B.drawImage(A,0,0);var e=B.getImageData(0,0,n,n).data;B.fillStyle="red",B.fillRect(0,0,n,n);var t=r.createElement("div");return t.style.backgroundImage="url("+s+")",t.style.height="100px",Te(e)?ve(Le(n,n,0,0,t)):Promise.reject(!1)}).then(function(A){return B.drawImage(A,0,0),Te(B.getImageData(0,0,n,n).data)}).catch(function(){return!1})}(document):Promise.resolve(!1);return Object.defineProperty(Oe,"SUPPORT_FOREIGNOBJECT_DRAWING",{value:A}),A},get SUPPORT_CORS_IMAGES(){var A=void 0!==(new Image).crossOrigin;return Object.defineProperty(Oe,"SUPPORT_CORS_IMAGES",{value:A}),A},get SUPPORT_RESPONSE_TYPE(){var A="string"==typeof(new XMLHttpRequest).responseType;return Object.defineProperty(Oe,"SUPPORT_RESPONSE_TYPE",{value:A}),A},get SUPPORT_CORS_XHR(){var A="withCredentials"in new XMLHttpRequest;return Object.defineProperty(Oe,"SUPPORT_CORS_XHR",{value:A}),A}},De=(be.prototype.debug=function(){for(var A=[],e=0;e<arguments.length;e++)A[e]=arguments[e];this.enabled&&("undefined"!=typeof window&&window.console&&"function"==typeof console.debug?console.debug.apply(console,[this.id,this.getTime()+"ms"].concat(A)):this.info.apply(this,A))},be.prototype.getTime=function(){return Date.now()-this.start},be.create=function(A){be.instances[A.id]=new be(A)},be.destroy=function(A){delete be.instances[A]},be.getInstance=function(A){var e=be.instances[A];if(void 0===e)throw new Error("No logger instance found with id "+A);return e},be.prototype.info=function(){for(var A=[],e=0;e<arguments.length;e++)A[e]=arguments[e];this.enabled&&"undefined"!=typeof window&&window.console&&"function"==typeof console.info&&console.info.apply(console,[this.id,this.getTime()+"ms"].concat(A))},be.prototype.error=function(){for(var A=[],e=0;e<arguments.length;e++)A[e]=arguments[e];this.enabled&&("undefined"!=typeof window&&window.console&&"function"==typeof console.error?console.error.apply(console,[this.id,this.getTime()+"ms"].concat(A)):this.info.apply(this,A))},be.instances={},be);function be(A){var e=A.id,t=A.enabled;this.id=e,this.enabled=t,this.start=Date.now()}var Se=(Me.create=function(A,e){return Me._caches[A]=new ye(A,e)},Me.destroy=function(A){delete Me._caches[A]},Me.open=function(A){var e=Me._caches[A];if(void 0!==e)return e;throw new Error('Cache with key "'+A+'" not found')},Me.getOrigin=function(A){var e=Me._link;return e?(e.href=A,e.href=e.href,e.protocol+e.hostname+e.port):"about:blank"},Me.isSameOrigin=function(A){return Me.getOrigin(A)===Me._origin},Me.setContext=function(A){Me._link=A.document.createElement("a"),Me._origin=Me.getOrigin(A.location.href)},Me.getInstance=function(){var A=Me._current;if(null===A)throw new Error("No cache instance attached");return A},Me.attachInstance=function(A){Me._current=A},Me.detachInstance=function(){Me._current=null},Me._caches={},Me._origin="about:blank",Me._current=null,Me);function Me(){}var ye=(_e.prototype.addImage=function(A){var e=Promise.resolve();return this.has(A)||(Ye(A)||Ge(A))&&(this._cache[A]=this.loadImage(A)),e},_e.prototype.match=function(A){return this._cache[A]},_e.prototype.loadImage=function(s){return a(this,void 0,void 0,function(){var e,r,t,n,B=this;return S(this,function(A){switch(A.label){case 0:return e=Se.isSameOrigin(s),r=!ke(s)&&!0===this._options.useCORS&&Oe.SUPPORT_CORS_IMAGES&&!e,t=!ke(s)&&!e&&"string"==typeof this._options.proxy&&Oe.SUPPORT_CORS_XHR&&!r,e||!1!==this._options.allowTaint||ke(s)||t||r?(n=s,t?[4,this.proxy(n)]:[3,2]):[2];case 1:n=A.sent(),A.label=2;case 2:return De.getInstance(this.id).debug("Added image "+s.substring(0,256)),[4,new Promise(function(A,e){var t=new Image;t.onload=function(){return A(t)},t.onerror=e,(We(n)||r)&&(t.crossOrigin="anonymous"),t.src=n,!0===t.complete&&setTimeout(function(){return A(t)},500),0<B._options.imageTimeout&&setTimeout(function(){return e("Timed out ("+B._options.imageTimeout+"ms) loading image")},B._options.imageTimeout)})];case 3:return[2,A.sent()]}})})},_e.prototype.has=function(A){return void 0!==this._cache[A]},_e.prototype.keys=function(){return Promise.resolve(Object.keys(this._cache))},_e.prototype.proxy=function(B){var s=this,o=this._options.proxy;if(!o)throw new Error("No proxy defined");var i=B.substring(0,256);return new Promise(function(e,t){var r=Oe.SUPPORT_RESPONSE_TYPE?"blob":"text",n=new XMLHttpRequest;if(n.onload=function(){if(200===n.status)if("text"==r)e(n.response);else{var A=new FileReader;A.addEventListener("load",function(){return e(A.result)},!1),A.addEventListener("error",function(A){return t(A)},!1),A.readAsDataURL(n.response)}else t("Failed to proxy resource "+i+" with status code "+n.status)},n.onerror=t,n.open("GET",o+"?url="+encodeURIComponent(B)+"&responseType="+r),"text"!=r&&n instanceof XMLHttpRequest&&(n.responseType=r),s._options.imageTimeout){var A=s._options.imageTimeout;n.timeout=A,n.ontimeout=function(){return t("Timed out ("+A+"ms) proxying "+i)}}n.send()})},_e);function _e(A,e){this.id=A,this._options=e,this._cache={}}function Pe(A){var n=rt.CIRCLE,B=Bt.FARTHEST_CORNER,s=[],o=[];return WA(A).forEach(function(A,e){var t=!0;if(0===e?t=A.reduce(function(A,e){if(zA(e))switch(e.value){case"center":return o.push(oe),!1;case"top":case"left":return o.push(se),!1;case"right":case"bottom":return o.push(ie),!1}else if(qA(e)||YA(e))return o.push(e),!1;return A},t):1===e&&(t=A.reduce(function(A,e){if(zA(e))switch(e.value){case"circle":return n=rt.CIRCLE,!1;case et:return n=rt.ELLIPSE,!1;case tt:case Ze:return B=Bt.CLOSEST_SIDE,!1;case je:return B=Bt.FARTHEST_SIDE,!1;case $e:return B=Bt.CLOSEST_CORNER,!1;case"cover":case At:return B=Bt.FARTHEST_CORNER,!1}else if(YA(e)||qA(e))return Array.isArray(B)||(B=[]),B.push(e),!1;return A},t)),t){var r=de(A);s.push(r)}}),{size:B,shape:n,stops:s,position:o,type:xe.RADIAL_GRADIENT}}var xe,Ve,ze=/^data:image\/svg\+xml/i,Xe=/^data:image\/.*;base64,/i,Je=/^data:image\/.*/i,Ge=function(A){return Oe.SUPPORT_SVG_DRAWING||!qe(A)},ke=function(A){return Je.test(A)},We=function(A){return Xe.test(A)},Ye=function(A){return"blob"===A.substr(0,4)},qe=function(A){return"svg"===A.substr(-3).toLowerCase()||ze.test(A)},Ze="closest-side",je="farthest-side",$e="closest-corner",At="farthest-corner",et="ellipse",tt="contain";(Ve=xe||(xe={}))[Ve.URL=0]="URL",Ve[Ve.LINEAR_GRADIENT=1]="LINEAR_GRADIENT",Ve[Ve.RADIAL_GRADIENT=2]="RADIAL_GRADIENT";var rt,nt,Bt,st;(nt=rt||(rt={}))[nt.CIRCLE=0]="CIRCLE",nt[nt.ELLIPSE=1]="ELLIPSE",(st=Bt||(Bt={}))[st.CLOSEST_SIDE=0]="CLOSEST_SIDE",st[st.FARTHEST_SIDE=1]="FARTHEST_SIDE",st[st.CLOSEST_CORNER=2]="CLOSEST_CORNER",st[st.FARTHEST_CORNER=3]="FARTHEST_CORNER";var ot=function(A){if(A.type===sA.URL_TOKEN){var e={url:A.value,type:xe.URL};return Se.getInstance().addImage(A.value),e}if(A.type!==sA.FUNCTION)throw new Error("Unsupported image type");var t=ct[A.name];if(void 0===t)throw new Error('Attempting to parse an unsupported image function "'+A.name+'"');return t(A.values)};var it,at,ct={"linear-gradient":function(A){var n=Qe(180),B=[];return WA(A).forEach(function(A,e){if(0===e){var t=A[0];if(t.type===sA.IDENT_TOKEN&&"to"===t.value)return void(n=Ae(A));if($A(t))return void(n=ce(t))}var r=de(A);B.push(r)}),{angle:n,stops:B,type:xe.LINEAR_GRADIENT}},"-moz-linear-gradient":Ie,"-ms-linear-gradient":Ie,"-o-linear-gradient":Ie,"-webkit-linear-gradient":Ie,"radial-gradient":function(A){var B=rt.CIRCLE,s=Bt.FARTHEST_CORNER,o=[],i=[];return WA(A).forEach(function(A,e){var t=!0;if(0===e){var r=!1;t=A.reduce(function(A,e){if(r)if(zA(e))switch(e.value){case"center":return i.push(oe),A;case"top":case"left":return i.push(se),A;case"right":case"bottom":return i.push(ie),A}else(qA(e)||YA(e))&&i.push(e);else if(zA(e))switch(e.value){case"circle":return B=rt.CIRCLE,!1;case et:return B=rt.ELLIPSE,!1;case"at":return!(r=!0);case Ze:return s=Bt.CLOSEST_SIDE,!1;case"cover":case je:return s=Bt.FARTHEST_SIDE,!1;case tt:case $e:return s=Bt.CLOSEST_CORNER,!1;case At:return s=Bt.FARTHEST_CORNER,!1}else if(YA(e)||qA(e))return Array.isArray(s)||(s=[]),s.push(e),!1;return A},t)}if(t){var n=de(A);o.push(n)}}),{size:s,shape:B,stops:o,position:i,type:xe.RADIAL_GRADIENT}},"-moz-radial-gradient":Pe,"-ms-radial-gradient":Pe,"-o-radial-gradient":Pe,"-webkit-radial-gradient":Pe,"-webkit-gradient":function(A){var e=Qe(180),s=[],o=xe.LINEAR_GRADIENT,t=rt.CIRCLE,r=Bt.FARTHEST_CORNER;return WA(A).forEach(function(A,e){var t=A[0];if(0===e){if(zA(t)&&"linear"===t.value)return void(o=xe.LINEAR_GRADIENT);if(zA(t)&&"radial"===t.value)return void(o=xe.RADIAL_GRADIENT)}if(t.type===sA.FUNCTION)if("from"===t.name){var r=we(t.values[0]);s.push({stop:se,color:r})}else if("to"===t.name)r=we(t.values[0]),s.push({stop:ie,color:r});else if("color-stop"===t.name){var n=t.values.filter(kA);if(2===n.length){r=we(n[1]);var B=n[0];VA(B)&&s.push({stop:{type:sA.PERCENTAGE_TOKEN,number:100*B.number,flags:B.flags},color:r})}}}),o===xe.LINEAR_GRADIENT?{angle:(e+Qe(180))%Qe(360),stops:s,type:o}:{size:r,shape:t,stops:s,position:[],type:o}}},Qt={name:"background-image",initialValue:"none",type:Ce.LIST,prefix:!1,parse:function(A){if(0===A.length)return[];var e=A[0];return e.type===sA.IDENT_TOKEN&&"none"===e.value?[]:A.filter(function(A){return kA(A)&&function(A){return A.type!==sA.FUNCTION||ct[A.name]}(A)}).map(ot)}},wt={name:"background-origin",initialValue:"border-box",prefix:!1,type:Ce.LIST,parse:function(A){return A.map(function(A){if(zA(A))switch(A.value){case"padding-box":return 1;case"content-box":return 2}return 0})}},ut={name:"background-position",initialValue:"0% 0%",type:Ce.LIST,prefix:!1,parse:function(A){return WA(A).map(function(A){return A.filter(qA)}).map(ZA)}};(at=it||(it={}))[at.REPEAT=0]="REPEAT",at[at.NO_REPEAT=1]="NO_REPEAT",at[at.REPEAT_X=2]="REPEAT_X";var Ut,lt,Ct={name:"background-repeat",initialValue:"repeat",prefix:!(at[at.REPEAT_Y=3]="REPEAT_Y"),type:Ce.LIST,parse:function(A){return WA(A).map(function(A){return A.filter(zA).map(function(A){return A.value}).join(" ")}).map(gt)}},gt=function(A){switch(A){case"no-repeat":return it.NO_REPEAT;case"repeat-x":case"repeat no-repeat":return it.REPEAT_X;case"repeat-y":case"no-repeat repeat":return it.REPEAT_Y;case"repeat":default:return it.REPEAT}};(lt=Ut||(Ut={})).AUTO="auto",lt.CONTAIN="contain";function Et(A){return{name:"border-"+A+"-color",initialValue:"transparent",prefix:!1,type:Ce.TYPE_VALUE,format:"color"}}function Ft(A){return{name:"border-radius-"+A,initialValue:"0 0",prefix:!1,type:Ce.LIST,parse:function(A){return ZA(A.filter(qA))}}}var ht,Ht,dt={name:"background-size",initialValue:"0",prefix:!(lt.COVER="cover"),type:Ce.LIST,parse:function(A){return WA(A).map(function(A){return A.filter(ft)})}},ft=function(A){return zA(A)||qA(A)},pt=Et("top"),Nt=Et("right"),Kt=Et("bottom"),It=Et("left"),Tt=Ft("top-left"),mt=Ft("top-right"),Rt=Ft("bottom-right"),Lt=Ft("bottom-left");(Ht=ht||(ht={}))[Ht.NONE=0]="NONE",Ht[Ht.SOLID=1]="SOLID";function vt(A){return{name:"border-"+A+"-style",initialValue:"solid",prefix:!1,type:Ce.IDENT_VALUE,parse:function(A){switch(A){case"none":return ht.NONE}return ht.SOLID}}}function Ot(A){return{name:"border-"+A+"-width",initialValue:"0",type:Ce.VALUE,prefix:!1,parse:function(A){return xA(A)?A.number:0}}}var Dt,bt,St=vt("top"),Mt=vt("right"),yt=vt("bottom"),_t=vt("left"),Pt=Ot("top"),xt=Ot("right"),Vt=Ot("bottom"),zt=Ot("left"),Xt={name:"color",initialValue:"transparent",prefix:!1,type:Ce.TYPE_VALUE,format:"color"},Jt={name:"display",initialValue:"inline-block",prefix:!1,type:Ce.LIST,parse:function(A){return A.filter(zA).reduce(function(A,e){return A|Gt(e.value)},0)}},Gt=function(A){switch(A){case"block":return 2;case"inline":return 4;case"run-in":return 8;case"flow":return 16;case"flow-root":return 32;case"table":return 64;case"flex":case"-webkit-flex":return 128;case"grid":case"-ms-grid":return 256;case"ruby":return 512;case"subgrid":return 1024;case"list-item":return 2048;case"table-row-group":return 4096;case"table-header-group":return 8192;case"table-footer-group":return 16384;case"table-row":return 32768;case"table-cell":return 65536;case"table-column-group":return 131072;case"table-column":return 262144;case"table-caption":return 524288;case"ruby-base":return 1048576;case"ruby-text":return 2097152;case"ruby-base-container":return 4194304;case"ruby-text-container":return 8388608;case"contents":return 16777216;case"inline-block":return 33554432;case"inline-list-item":return 67108864;case"inline-table":return 134217728;case"inline-flex":return 268435456;case"inline-grid":return 536870912}return 0};(bt=Dt||(Dt={}))[bt.NONE=0]="NONE",bt[bt.LEFT=1]="LEFT",bt[bt.RIGHT=2]="RIGHT",bt[bt.INLINE_START=3]="INLINE_START";var kt,Wt,Yt,qt,Zt={name:"float",initialValue:"none",prefix:!(bt[bt.INLINE_END=4]="INLINE_END"),type:Ce.IDENT_VALUE,parse:function(A){switch(A){case"left":return Dt.LEFT;case"right":return Dt.RIGHT;case"inline-start":return Dt.INLINE_START;case"inline-end":return Dt.INLINE_END}return Dt.NONE}},jt={name:"letter-spacing",initialValue:"0",prefix:!1,type:Ce.VALUE,parse:function(A){return A.type===sA.IDENT_TOKEN&&"normal"===A.value?0:A.type===sA.NUMBER_TOKEN?A.number:A.type===sA.DIMENSION_TOKEN?A.number:0}},$t={name:"line-break",initialValue:(Wt=kt||(kt={})).NORMAL="normal",prefix:!(Wt.STRICT="strict"),type:Ce.IDENT_VALUE,parse:function(A){switch(A){case"strict":return kt.STRICT;case"normal":default:return kt.NORMAL}}},Ar={name:"line-height",initialValue:"normal",prefix:!1,type:Ce.TOKEN_VALUE},er={name:"list-style-image",initialValue:"none",type:Ce.VALUE,prefix:!1,parse:function(A){return A.type===sA.IDENT_TOKEN&&"none"===A.value?null:ot(A)}};(qt=Yt||(Yt={}))[qt.INSIDE=0]="INSIDE";var tr,rr,nr={name:"list-style-position",initialValue:"outside",prefix:!(qt[qt.OUTSIDE=1]="OUTSIDE"),type:Ce.IDENT_VALUE,parse:function(A){switch(A){case"inside":return Yt.INSIDE;case"outside":default:return Yt.OUTSIDE}}};(rr=tr||(tr={}))[rr.NONE=-1]="NONE",rr[rr.DISC=0]="DISC",rr[rr.CIRCLE=1]="CIRCLE",rr[rr.SQUARE=2]="SQUARE",rr[rr.DECIMAL=3]="DECIMAL",rr[rr.CJK_DECIMAL=4]="CJK_DECIMAL",rr[rr.DECIMAL_LEADING_ZERO=5]="DECIMAL_LEADING_ZERO",rr[rr.LOWER_ROMAN=6]="LOWER_ROMAN",rr[rr.UPPER_ROMAN=7]="UPPER_ROMAN",rr[rr.LOWER_GREEK=8]="LOWER_GREEK",rr[rr.LOWER_ALPHA=9]="LOWER_ALPHA",rr[rr.UPPER_ALPHA=10]="UPPER_ALPHA",rr[rr.ARABIC_INDIC=11]="ARABIC_INDIC",rr[rr.ARMENIAN=12]="ARMENIAN",rr[rr.BENGALI=13]="BENGALI",rr[rr.CAMBODIAN=14]="CAMBODIAN",rr[rr.CJK_EARTHLY_BRANCH=15]="CJK_EARTHLY_BRANCH",rr[rr.CJK_HEAVENLY_STEM=16]="CJK_HEAVENLY_STEM",rr[rr.CJK_IDEOGRAPHIC=17]="CJK_IDEOGRAPHIC",rr[rr.DEVANAGARI=18]="DEVANAGARI",rr[rr.ETHIOPIC_NUMERIC=19]="ETHIOPIC_NUMERIC",rr[rr.GEORGIAN=20]="GEORGIAN",rr[rr.GUJARATI=21]="GUJARATI",rr[rr.GURMUKHI=22]="GURMUKHI",rr[rr.HEBREW=22]="HEBREW",rr[rr.HIRAGANA=23]="HIRAGANA",rr[rr.HIRAGANA_IROHA=24]="HIRAGANA_IROHA",rr[rr.JAPANESE_FORMAL=25]="JAPANESE_FORMAL",rr[rr.JAPANESE_INFORMAL=26]="JAPANESE_INFORMAL",rr[rr.KANNADA=27]="KANNADA",rr[rr.KATAKANA=28]="KATAKANA",rr[rr.KATAKANA_IROHA=29]="KATAKANA_IROHA",rr[rr.KHMER=30]="KHMER",rr[rr.KOREAN_HANGUL_FORMAL=31]="KOREAN_HANGUL_FORMAL",rr[rr.KOREAN_HANJA_FORMAL=32]="KOREAN_HANJA_FORMAL",rr[rr.KOREAN_HANJA_INFORMAL=33]="KOREAN_HANJA_INFORMAL",rr[rr.LAO=34]="LAO",rr[rr.LOWER_ARMENIAN=35]="LOWER_ARMENIAN",rr[rr.MALAYALAM=36]="MALAYALAM",rr[rr.MONGOLIAN=37]="MONGOLIAN",rr[rr.MYANMAR=38]="MYANMAR",rr[rr.ORIYA=39]="ORIYA",rr[rr.PERSIAN=40]="PERSIAN",rr[rr.SIMP_CHINESE_FORMAL=41]="SIMP_CHINESE_FORMAL",rr[rr.SIMP_CHINESE_INFORMAL=42]="SIMP_CHINESE_INFORMAL",rr[rr.TAMIL=43]="TAMIL",rr[rr.TELUGU=44]="TELUGU",rr[rr.THAI=45]="THAI",rr[rr.TIBETAN=46]="TIBETAN",rr[rr.TRAD_CHINESE_FORMAL=47]="TRAD_CHINESE_FORMAL",rr[rr.TRAD_CHINESE_INFORMAL=48]="TRAD_CHINESE_INFORMAL",rr[rr.UPPER_ARMENIAN=49]="UPPER_ARMENIAN",rr[rr.DISCLOSURE_OPEN=50]="DISCLOSURE_OPEN";function Br(A){return{name:"margin-"+A,initialValue:"0",prefix:!1,type:Ce.TOKEN_VALUE}}var sr,or,ir={name:"list-style-type",initialValue:"none",prefix:!(rr[rr.DISCLOSURE_CLOSED=51]="DISCLOSURE_CLOSED"),type:Ce.IDENT_VALUE,parse:function(A){switch(A){case"disc":return tr.DISC;case"circle":return tr.CIRCLE;case"square":return tr.SQUARE;case"decimal":return tr.DECIMAL;case"cjk-decimal":return tr.CJK_DECIMAL;case"decimal-leading-zero":return tr.DECIMAL_LEADING_ZERO;case"lower-roman":return tr.LOWER_ROMAN;case"upper-roman":return tr.UPPER_ROMAN;case"lower-greek":return tr.LOWER_GREEK;case"lower-alpha":return tr.LOWER_ALPHA;case"upper-alpha":return tr.UPPER_ALPHA;case"arabic-indic":return tr.ARABIC_INDIC;case"armenian":return tr.ARMENIAN;case"bengali":return tr.BENGALI;case"cambodian":return tr.CAMBODIAN;case"cjk-earthly-branch":return tr.CJK_EARTHLY_BRANCH;case"cjk-heavenly-stem":return tr.CJK_HEAVENLY_STEM;case"cjk-ideographic":return tr.CJK_IDEOGRAPHIC;case"devanagari":return tr.DEVANAGARI;case"ethiopic-numeric":return tr.ETHIOPIC_NUMERIC;case"georgian":return tr.GEORGIAN;case"gujarati":return tr.GUJARATI;case"gurmukhi":return tr.GURMUKHI;case"hebrew":return tr.HEBREW;case"hiragana":return tr.HIRAGANA;case"hiragana-iroha":return tr.HIRAGANA_IROHA;case"japanese-formal":return tr.JAPANESE_FORMAL;case"japanese-informal":return tr.JAPANESE_INFORMAL;case"kannada":return tr.KANNADA;case"katakana":return tr.KATAKANA;case"katakana-iroha":return tr.KATAKANA_IROHA;case"khmer":return tr.KHMER;case"korean-hangul-formal":return tr.KOREAN_HANGUL_FORMAL;case"korean-hanja-formal":return tr.KOREAN_HANJA_FORMAL;case"korean-hanja-informal":return tr.KOREAN_HANJA_INFORMAL;case"lao":return tr.LAO;case"lower-armenian":return tr.LOWER_ARMENIAN;case"malayalam":return tr.MALAYALAM;case"mongolian":return tr.MONGOLIAN;case"myanmar":return tr.MYANMAR;case"oriya":return tr.ORIYA;case"persian":return tr.PERSIAN;case"simp-chinese-formal":return tr.SIMP_CHINESE_FORMAL;case"simp-chinese-informal":return tr.SIMP_CHINESE_INFORMAL;case"tamil":return tr.TAMIL;case"telugu":return tr.TELUGU;case"thai":return tr.THAI;case"tibetan":return tr.TIBETAN;case"trad-chinese-formal":return tr.TRAD_CHINESE_FORMAL;case"trad-chinese-informal":return tr.TRAD_CHINESE_INFORMAL;case"upper-armenian":return tr.UPPER_ARMENIAN;case"disclosure-open":return tr.DISCLOSURE_OPEN;case"disclosure-closed":return tr.DISCLOSURE_CLOSED;case"none":default:return tr.NONE}}},ar=Br("top"),cr=Br("right"),Qr=Br("bottom"),wr=Br("left");(or=sr||(sr={}))[or.VISIBLE=0]="VISIBLE",or[or.HIDDEN=1]="HIDDEN",or[or.SCROLL=2]="SCROLL";function ur(A){return{name:"padding-"+A,initialValue:"0",prefix:!1,type:Ce.TYPE_VALUE,format:"length-percentage"}}var Ur,lr,Cr,gr,Er={name:"overflow",initialValue:"visible",prefix:!(or[or.AUTO=3]="AUTO"),type:Ce.LIST,parse:function(A){return A.filter(zA).map(function(A){switch(A.value){case"hidden":return sr.HIDDEN;case"scroll":return sr.SCROLL;case"auto":return sr.AUTO;case"visible":default:return sr.VISIBLE}})}},Fr={name:"overflow-wrap",initialValue:(lr=Ur||(Ur={})).NORMAL="normal",prefix:!(lr.BREAK_WORD="break-word"),type:Ce.IDENT_VALUE,parse:function(A){switch(A){case"break-word":return Ur.BREAK_WORD;case"normal":default:return Ur.NORMAL}}},hr=ur("top"),Hr=ur("right"),dr=ur("bottom"),fr=ur("left");(gr=Cr||(Cr={}))[gr.LEFT=0]="LEFT",gr[gr.CENTER=1]="CENTER";var pr,Nr,Kr={name:"text-align",initialValue:"left",prefix:!(gr[gr.RIGHT=2]="RIGHT"),type:Ce.IDENT_VALUE,parse:function(A){switch(A){case"right":return Cr.RIGHT;case"center":case"justify":return Cr.CENTER;case"left":default:return Cr.LEFT}}};(Nr=pr||(pr={}))[Nr.STATIC=0]="STATIC",Nr[Nr.RELATIVE=1]="RELATIVE",Nr[Nr.ABSOLUTE=2]="ABSOLUTE",Nr[Nr.FIXED=3]="FIXED";var Ir,Tr,mr={name:"position",initialValue:"static",prefix:!(Nr[Nr.STICKY=4]="STICKY"),type:Ce.IDENT_VALUE,parse:function(A){switch(A){case"relative":return pr.RELATIVE;case"absolute":return pr.ABSOLUTE;case"fixed":return pr.FIXED;case"sticky":return pr.STICKY}return pr.STATIC}},Rr={name:"text-shadow",initialValue:"none",type:Ce.LIST,prefix:!1,parse:function(A){return 1===A.length&&JA(A[0],"none")?[]:WA(A).map(function(A){for(var e={color:He.TRANSPARENT,offsetX:se,offsetY:se,blur:se},t=0,r=0;r<A.length;r++){var n=A[r];YA(n)?(0===t?e.offsetX=n:1===t?e.offsetY=n:e.blur=n,t++):e.color=we(n)}return e})}};(Tr=Ir||(Ir={}))[Tr.NONE=0]="NONE",Tr[Tr.LOWERCASE=1]="LOWERCASE",Tr[Tr.UPPERCASE=2]="UPPERCASE";var Lr,vr,Or={name:"text-transform",initialValue:"none",prefix:!(Tr[Tr.CAPITALIZE=3]="CAPITALIZE"),type:Ce.IDENT_VALUE,parse:function(A){switch(A){case"uppercase":return Ir.UPPERCASE;case"lowercase":return Ir.LOWERCASE;case"capitalize":return Ir.CAPITALIZE}return Ir.NONE}},Dr={name:"transform",initialValue:"none",prefix:!0,type:Ce.VALUE,parse:function(A){if(A.type===sA.IDENT_TOKEN&&"none"===A.value)return null;if(A.type!==sA.FUNCTION)return null;var e=br[A.name];if(void 0===e)throw new Error('Attempting to parse an unsupported transform function "'+A.name+'"');return e(A.values)}},br={matrix:function(A){var e=A.filter(function(A){return A.type===sA.NUMBER_TOKEN}).map(function(A){return A.number});return 6===e.length?e:null},matrix3d:function(A){var e=A.filter(function(A){return A.type===sA.NUMBER_TOKEN}).map(function(A){return A.number}),t=e[0],r=e[1],n=(e[2],e[3],e[4]),B=e[5],s=(e[6],e[7],e[8],e[9],e[10],e[11],e[12]),o=e[13];e[14],e[15];return 16===e.length?[t,r,n,B,s,o]:null}},Sr={type:sA.PERCENTAGE_TOKEN,number:50,flags:4},Mr=[Sr,Sr],yr={name:"transform-origin",initialValue:"50% 50%",prefix:!0,type:Ce.LIST,parse:function(A){var e=A.filter(qA);return 2!==e.length?Mr:[e[0],e[1]]}};(vr=Lr||(Lr={}))[vr.VISIBLE=0]="VISIBLE",vr[vr.HIDDEN=1]="HIDDEN";var _r,Pr,xr={name:"visible",initialValue:"none",prefix:!(vr[vr.COLLAPSE=2]="COLLAPSE"),type:Ce.IDENT_VALUE,parse:function(A){switch(A){case"hidden":return Lr.HIDDEN;case"collapse":return Lr.COLLAPSE;case"visible":default:return Lr.VISIBLE}}};(Pr=_r||(_r={})).NORMAL="normal",Pr.BREAK_ALL="break-all";var Vr,zr,Xr={name:"word-break",initialValue:"normal",prefix:!(Pr.KEEP_ALL="keep-all"),type:Ce.IDENT_VALUE,parse:function(A){switch(A){case"break-all":return _r.BREAK_ALL;case"keep-all":return _r.KEEP_ALL;case"normal":default:return _r.NORMAL}}},Jr={name:"z-index",initialValue:"auto",prefix:!1,type:Ce.VALUE,parse:function(A){if(A.type===sA.IDENT_TOKEN)return{auto:!0,order:0};if(VA(A))return{auto:!1,order:A.number};throw new Error("Invalid z-index number parsed")}},Gr={name:"opacity",initialValue:"1",type:Ce.VALUE,prefix:!1,parse:function(A){return VA(A)?A.number:1}},kr={name:"text-decoration-color",initialValue:"transparent",prefix:!1,type:Ce.TYPE_VALUE,format:"color"},Wr={name:"text-decoration-line",initialValue:"none",prefix:!1,type:Ce.LIST,parse:function(A){return A.filter(zA).map(function(A){switch(A.value){case"underline":return 1;case"overline":return 2;case"line-through":return 3;case"none":return 4}return 0}).filter(function(A){return 0!==A})}},Yr={name:"font-family",initialValue:"",prefix:!1,type:Ce.LIST,parse:function(A){return A.filter(qr).map(function(A){return A.value})}},qr=function(A){return A.type===sA.STRING_TOKEN||A.type===sA.IDENT_TOKEN},Zr={name:"font-size",initialValue:"0",prefix:!1,type:Ce.TYPE_VALUE,format:"length"},jr={name:"font-weight",initialValue:"normal",type:Ce.VALUE,prefix:!1,parse:function(A){if(VA(A))return A.number;if(zA(A))switch(A.value){case"bold":return 700;case"normal":default:return 400}return 400}},$r={name:"font-variant",initialValue:"none",type:Ce.LIST,prefix:!1,parse:function(A){return A.filter(zA).map(function(A){return A.value})}};(zr=Vr||(Vr={})).NORMAL="normal",zr.ITALIC="italic";function An(A,e){return 0!=(A&e)}function en(A,e,t){if(!A)return"";var r=A[Math.min(e,A.length-1)];return r?t?r.open:r.close:""}var tn={name:"font-style",initialValue:"normal",prefix:!(zr.OBLIQUE="oblique"),type:Ce.IDENT_VALUE,parse:function(A){switch(A){case"oblique":return Vr.OBLIQUE;case"italic":return Vr.ITALIC;case"normal":default:return Vr.NORMAL}}},rn={name:"content",initialValue:"none",type:Ce.LIST,prefix:!1,parse:function(A){if(0===A.length)return[];var e=A[0];return e.type===sA.IDENT_TOKEN&&"none"===e.value?[]:A}},nn={name:"counter-increment",initialValue:"none",prefix:!0,type:Ce.LIST,parse:function(A){if(0===A.length)return null;var e=A[0];if(e.type===sA.IDENT_TOKEN&&"none"===e.value)return null;for(var t=[],r=A.filter(GA),n=0;n<r.length;n++){var B=r[n],s=r[n+1];if(B.type===sA.IDENT_TOKEN){var o=s&&VA(s)?s.number:1;t.push({counter:B.value,increment:o})}}return t}},Bn={name:"counter-reset",initialValue:"none",prefix:!0,type:Ce.LIST,parse:function(A){if(0===A.length)return[];for(var e=[],t=A.filter(GA),r=0;r<t.length;r++){var n=t[r],B=t[r+1];if(zA(n)&&"none"!==n.value){var s=B&&VA(B)?B.number:0;e.push({counter:n.value,reset:s})}}return e}},sn={name:"quotes",initialValue:"none",prefix:!0,type:Ce.LIST,parse:function(A){if(0===A.length)return null;var e=A[0];if(e.type===sA.IDENT_TOKEN&&"none"===e.value)return null;var t=[],r=A.filter(XA);if(r.length%2!=0)return null;for(var n=0;n<r.length;n+=2){var B=r[n].value,s=r[n+1].value;t.push({open:B,close:s})}return t}},on={name:"box-shadow",initialValue:"none",type:Ce.LIST,prefix:!1,parse:function(A){return 1===A.length&&JA(A[0],"none")?[]:WA(A).map(function(A){for(var e={color:255,offsetX:se,offsetY:se,blur:se,spread:se,inset:!1},t=0,r=0;r<A.length;r++){var n=A[r];JA(n,"inset")?e.inset=!0:YA(n)?(0===t?e.offsetX=n:1===t?e.offsetY=n:2===t?e.blur=n:e.spread=n,t++):e.color=we(n)}return e})}},an=(cn.prototype.isVisible=function(){return 0<this.display&&0<this.opacity&&this.visibility===Lr.VISIBLE},cn.prototype.isTransparent=function(){return ee(this.backgroundColor)},cn.prototype.isTransformed=function(){return null!==this.transform},cn.prototype.isPositioned=function(){return this.position!==pr.STATIC},cn.prototype.isPositionedWithZIndex=function(){return this.isPositioned()&&!this.zIndex.auto},cn.prototype.isFloating=function(){return this.float!==Dt.NONE},cn.prototype.isInlineLevel=function(){return An(this.display,4)||An(this.display,33554432)||An(this.display,268435456)||An(this.display,536870912)||An(this.display,67108864)||An(this.display,134217728)},cn);function cn(A){this.backgroundClip=Un(me,A.backgroundClip),this.backgroundColor=Un(Re,A.backgroundColor),this.backgroundImage=Un(Qt,A.backgroundImage),this.backgroundOrigin=Un(wt,A.backgroundOrigin),this.backgroundPosition=Un(ut,A.backgroundPosition),this.backgroundRepeat=Un(Ct,A.backgroundRepeat),this.backgroundSize=Un(dt,A.backgroundSize),this.borderTopColor=Un(pt,A.borderTopColor),this.borderRightColor=Un(Nt,A.borderRightColor),this.borderBottomColor=Un(Kt,A.borderBottomColor),this.borderLeftColor=Un(It,A.borderLeftColor),this.borderTopLeftRadius=Un(Tt,A.borderTopLeftRadius),this.borderTopRightRadius=Un(mt,A.borderTopRightRadius),this.borderBottomRightRadius=Un(Rt,A.borderBottomRightRadius),this.borderBottomLeftRadius=Un(Lt,A.borderBottomLeftRadius),this.borderTopStyle=Un(St,A.borderTopStyle),this.borderRightStyle=Un(Mt,A.borderRightStyle),this.borderBottomStyle=Un(yt,A.borderBottomStyle),this.borderLeftStyle=Un(_t,A.borderLeftStyle),this.borderTopWidth=Un(Pt,A.borderTopWidth),this.borderRightWidth=Un(xt,A.borderRightWidth),this.borderBottomWidth=Un(Vt,A.borderBottomWidth),this.borderLeftWidth=Un(zt,A.borderLeftWidth),this.boxShadow=Un(on,A.boxShadow),this.color=Un(Xt,A.color),this.display=Un(Jt,A.display),this.float=Un(Zt,A.cssFloat),this.fontFamily=Un(Yr,A.fontFamily),this.fontSize=Un(Zr,A.fontSize),this.fontStyle=Un(tn,A.fontStyle),this.fontVariant=Un($r,A.fontVariant),this.fontWeight=Un(jr,A.fontWeight),this.letterSpacing=Un(jt,A.letterSpacing),this.lineBreak=Un($t,A.lineBreak),this.lineHeight=Un(Ar,A.lineHeight),this.listStyleImage=Un(er,A.listStyleImage),this.listStylePosition=Un(nr,A.listStylePosition),this.listStyleType=Un(ir,A.listStyleType),this.marginTop=Un(ar,A.marginTop),this.marginRight=Un(cr,A.marginRight),this.marginBottom=Un(Qr,A.marginBottom),this.marginLeft=Un(wr,A.marginLeft),this.opacity=Un(Gr,A.opacity);var e=Un(Er,A.overflow);this.overflowX=e[0],this.overflowY=e[1<e.length?1:0],this.overflowWrap=Un(Fr,A.overflowWrap),this.paddingTop=Un(hr,A.paddingTop),this.paddingRight=Un(Hr,A.paddingRight),this.paddingBottom=Un(dr,A.paddingBottom),this.paddingLeft=Un(fr,A.paddingLeft),this.position=Un(mr,A.position),this.textAlign=Un(Kr,A.textAlign),this.textDecorationColor=Un(kr,A.textDecorationColor||A.color),this.textDecorationLine=Un(Wr,A.textDecorationLine),this.textShadow=Un(Rr,A.textShadow),this.textTransform=Un(Or,A.textTransform),this.transform=Un(Dr,A.transform),this.transformOrigin=Un(yr,A.transformOrigin),this.visibility=Un(xr,A.visibility),this.wordBreak=Un(Xr,A.wordBreak),this.zIndex=Un(Jr,A.zIndex)}var Qn,wn=function(A){this.content=Un(rn,A.content),this.quotes=Un(sn,A.quotes)},un=function(A){this.counterIncrement=Un(nn,A.counterIncrement),this.counterReset=Un(Bn,A.counterReset)},Un=function(A,e){var t=new MA,r=null!=e?e.toString():A.initialValue;t.write(r);var n=new _A(t.read());switch(A.type){case Ce.IDENT_VALUE:var B=n.parseComponentValue();return A.parse(zA(B)?B.value:A.initialValue);case Ce.VALUE:return A.parse(n.parseComponentValue());case Ce.LIST:return A.parse(n.parseComponentValues());case Ce.TOKEN_VALUE:return n.parseComponentValue();case Ce.TYPE_VALUE:switch(A.format){case"angle":return ce(n.parseComponentValue());case"color":return we(n.parseComponentValue());case"image":return ot(n.parseComponentValue());case"length":var s=n.parseComponentValue();return YA(s)?s:se;case"length-percentage":var o=n.parseComponentValue();return qA(o)?o:se}}throw new Error("Attempting to parse unsupported css format type "+A.format)},ln=function(A){this.styles=new an(window.getComputedStyle(A,null)),this.textNodes=[],this.elements=[],null!==this.styles.transform&&uB(A)&&(A.style.transform="none"),this.bounds=T(A),this.flags=0},Cn=function(A,e){this.text=A,this.bounds=e},gn=function(A){var e=A.ownerDocument;if(e){var t=e.createElement("html2canvaswrapper");t.appendChild(A.cloneNode(!0));var r=A.parentNode;if(r){r.replaceChild(t,A);var n=T(t);return t.firstChild&&r.replaceChild(t.firstChild,t),n}}return new I(0,0,0,0)},En=function(A,e,t){var r=A.ownerDocument;if(!r)throw new Error("Node has no owner document");var n=r.createRange();return n.setStart(A,e),n.setEnd(A,e+t),I.fromClientRect(n.getBoundingClientRect())},Fn=function(A,e){return 0!==e.letterSpacing?c(A).map(function(A){return l(A)}):hn(A,e)},hn=function(A,e){for(var t,r=function(A,e){var t=c(A),r=u(t,e),n=r[0],B=r[1],s=r[2],o=t.length,i=0,a=0;return{next:function(){if(o<=a)return{done:!0,value:null};for(var A=Y;a<o&&(A=w(t,B,n,++a,s))===Y;);if(A===Y&&a!==o)return{done:!0,value:null};var e=new nA(t,A,i,a);return i=a,{value:e,done:!1}}}}(A,{lineBreak:e.lineBreak,wordBreak:e.overflowWrap===Ur.BREAK_WORD?"break-word":e.wordBreak}),n=[];!(t=r.next()).done;)t.value&&n.push(t.value.slice());return n},Hn=function(A,e){this.text=dn(A.data,e.textTransform),this.textBounds=function(A,t,r){var e=Fn(A,t),n=[],B=0;return e.forEach(function(A){if(t.textDecorationLine.length||0<A.trim().length)if(Oe.SUPPORT_RANGE_BOUNDS)n.push(new Cn(A,En(r,B,A.length)));else{var e=r.splitText(A.length);n.push(new Cn(A,gn(r))),r=e}else Oe.SUPPORT_RANGE_BOUNDS||(r=r.splitText(A.length));B+=A.length}),n}(this.text,e,A)},dn=function(A,e){switch(e){case Ir.LOWERCASE:return A.toLowerCase();case Ir.CAPITALIZE:return A.replace(fn,pn);case Ir.UPPERCASE:return A.toUpperCase();default:return A}},fn=/(^|\s|:|-|\(|\))([a-z])/g,pn=function(A,e,t){return 0<A.length?e+t.toUpperCase():A},Nn=(A(Kn,Qn=ln),Kn);function Kn(A){var e=Qn.call(this,A)||this;return e.src=A.currentSrc||A.src,e.intrinsicWidth=A.naturalWidth,e.intrinsicHeight=A.naturalHeight,Se.getInstance().addImage(e.src),e}var In,Tn=(A(mn,In=ln),mn);function mn(A){var e=In.call(this,A)||this;return e.canvas=A,e.intrinsicWidth=A.width,e.intrinsicHeight=A.height,e}var Rn,Ln=(A(vn,Rn=ln),vn);function vn(A){var e=Rn.call(this,A)||this,t=new XMLSerializer;return e.svg="data:image/svg+xml,"+encodeURIComponent(t.serializeToString(A)),e.intrinsicWidth=A.width.baseVal.value,e.intrinsicHeight=A.height.baseVal.value,Se.getInstance().addImage(e.svg),e}var On,Dn=(A(bn,On=ln),bn);function bn(A){var e=On.call(this,A)||this;return e.value=A.value,e}var Sn,Mn=(A(yn,Sn=ln),yn);function yn(A){var e=Sn.call(this,A)||this;return e.start=A.start,e.reversed="boolean"==typeof A.reversed&&!0===A.reversed,e}var _n,Pn=[{type:sA.DIMENSION_TOKEN,flags:0,unit:"px",number:3}],xn=[{type:sA.PERCENTAGE_TOKEN,flags:0,number:50}],Vn="checkbox",zn="radio",Xn="password",Jn=707406591,Gn=(A(kn,_n=ln),kn);function kn(A){var e=_n.call(this,A)||this;switch(e.type=A.type.toLowerCase(),e.checked=A.checked,e.value=function(A){var e=A.type===Xn?new Array(A.value.length+1).join("��"):A.value;return 0===e.length?A.placeholder||"":e}(A),e.type!==Vn&&e.type!==zn||(e.styles.backgroundColor=3739148031,e.styles.borderTopColor=e.styles.borderRightColor=e.styles.borderBottomColor=e.styles.borderLeftColor=2779096575,e.styles.borderTopWidth=e.styles.borderRightWidth=e.styles.borderBottomWidth=e.styles.borderLeftWidth=1,e.styles.borderTopStyle=e.styles.borderRightStyle=e.styles.borderBottomStyle=e.styles.borderLeftStyle=ht.SOLID,e.styles.backgroundClip=[Ee.BORDER_BOX],e.styles.backgroundOrigin=[0],e.bounds=function(A){return A.width>A.height?new I(A.left+(A.width-A.height)/2,A.top,A.height,A.height):A.width<A.height?new I(A.left,A.top+(A.height-A.width)/2,A.width,A.width):A}(e.bounds)),e.type){case Vn:e.styles.borderTopRightRadius=e.styles.borderTopLeftRadius=e.styles.borderBottomRightRadius=e.styles.borderBottomLeftRadius=Pn;break;case zn:e.styles.borderTopRightRadius=e.styles.borderTopLeftRadius=e.styles.borderBottomRightRadius=e.styles.borderBottomLeftRadius=xn}return e}var Wn,Yn=(A(qn,Wn=ln),qn);function qn(A){var e=Wn.call(this,A)||this,t=A.options[A.selectedIndex||0];return e.value=t&&t.text||"",e}var Zn,jn=(A($n,Zn=ln),$n);function $n(A){var e=Zn.call(this,A)||this;return e.value=A.value,e}function AB(A){return we(_A.create(A).parseComponentValue())}var eB,tB=(A(rB,eB=ln),rB);function rB(A){var e=eB.call(this,A)||this;e.src=A.src,e.width=parseInt(A.width,10)||0,e.height=parseInt(A.height,10)||0,e.backgroundColor=e.styles.backgroundColor;try{if(A.contentWindow&&A.contentWindow.document&&A.contentWindow.document.documentElement){e.tree=iB(A.contentWindow.document.documentElement);var t=A.contentWindow.document.documentElement?AB(getComputedStyle(A.contentWindow.document.documentElement).backgroundColor):He.TRANSPARENT,r=A.contentWindow.document.body?AB(getComputedStyle(A.contentWindow.document.body).backgroundColor):He.TRANSPARENT;e.backgroundColor=ee(t)?ee(r)?e.styles.backgroundColor:r:t}}catch(A){}return e}function nB(A){return"STYLE"===A.tagName}var BB=["OL","UL","MENU"],sB=function(A,e,t){for(var r=A.firstChild,n=void 0;r;r=n)if(n=r.nextSibling,QB(r)&&0<r.data.trim().length)e.textNodes.push(new Hn(r,e.styles));else if(wB(r)){var B=oB(r);B.styles.isVisible()&&(aB(r,B,t)?B.flags|=4:cB(B.styles)&&(B.flags|=2),-1!==BB.indexOf(r.tagName)&&(B.flags|=8),e.elements.push(B),dB(r)||gB(r)||fB(r)||sB(r,B,t))}},oB=function(A){return hB(A)?new Nn(A):FB(A)?new Tn(A):gB(A)?new Ln(A):UB(A)?new Dn(A):lB(A)?new Mn(A):CB(A)?new Gn(A):fB(A)?new Yn(A):dB(A)?new jn(A):HB(A)?new tB(A):new ln(A)},iB=function(A){var e=oB(A);return e.flags|=4,sB(A,e,e),e},aB=function(A,e,t){return e.styles.isPositionedWithZIndex()||e.styles.opacity<1||e.styles.isTransformed()||EB(A)&&t.styles.isTransparent()},cB=function(A){return A.isPositioned()||A.isFloating()},QB=function(A){return A.nodeType===Node.TEXT_NODE},wB=function(A){return A.nodeType===Node.ELEMENT_NODE},uB=function(A){return void 0!==A.style},UB=function(A){return"LI"===A.tagName},lB=function(A){return"OL"===A.tagName},CB=function(A){return"INPUT"===A.tagName},gB=function(A){return"svg"===A.tagName},EB=function(A){return"BODY"===A.tagName},FB=function(A){return"CANVAS"===A.tagName},hB=function(A){return"IMG"===A.tagName},HB=function(A){return"IFRAME"===A.tagName},dB=function(A){return"TEXTAREA"===A.tagName},fB=function(A){return"SELECT"===A.tagName},pB=(NB.prototype.getCounterValue=function(A){var e=this.counters[A];return e&&e.length?e[e.length-1]:1},NB.prototype.getCounterValues=function(A){var e=this.counters[A];return e||[]},NB.prototype.pop=function(A){var e=this;A.forEach(function(A){return e.counters[A].pop()})},NB.prototype.parse=function(A){var t=this,e=A.counterIncrement,r=A.counterReset,n=!0;null!==e&&e.forEach(function(A){var e=t.counters[A.counter];e&&0!==A.increment&&(n=!1,e[Math.max(0,e.length-1)]+=A.increment)});var B=[];return n&&r.forEach(function(A){var e=t.counters[A.counter];B.push(A.counter),e||(e=t.counters[A.counter]=[]),e.push(A.reset)}),B},NB);function NB(){this.counters={}}function KB(r,A,e,n,t,B){return r<A||e<r?yB(r,t,0<B.length):n.integers.reduce(function(A,e,t){for(;e<=r;)r-=e,A+=n.values[t];return A},"")+B}function IB(A,e,t,r){for(var n="";t||A--,n=r(A)+n,e<=(A/=e)*e;);return n}function TB(A,e,t,r,n){var B=t-e+1;return(A<0?"-":"")+(IB(Math.abs(A),B,r,function(A){return l(Math.floor(A%B)+e)})+n)}function mB(A,e,t){void 0===t&&(t=". ");var r=e.length;return IB(Math.abs(A),r,!1,function(A){return e[Math.floor(A%r)]})+t}function RB(A,e,t,r,n,B){if(A<-9999||9999<A)return yB(A,tr.CJK_DECIMAL,0<n.length);var s=Math.abs(A),o=n;if(0===s)return e[0]+o;for(var i=0;0<s&&i<=4;i++){var a=s%10;0==a&&An(B,1)&&""!==o?o=e[a]+o:1<a||1==a&&0===i||1==a&&1===i&&An(B,2)||1==a&&1===i&&An(B,4)&&100<A||1==a&&1<i&&An(B,8)?o=e[a]+(0<i?t[i-1]:"")+o:1==a&&0<i&&(o=t[i-1]+o),s=Math.floor(s/10)}return(A<0?r:"")+o}var LB,vB,OB={integers:[1e3,900,500,400,100,90,50,40,10,9,5,4,1],values:["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]},DB={integers:[9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,900,800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1],values:["�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","�","篤","禿","督","獨","犢","牘","瀆","毒","韜","陶","鍍","都","道","途","逃"]},bB={integers:[1e4,9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,400,300,200,100,90,80,70,60,50,40,30,20,19,18,17,16,15,10,9,8,7,6,5,4,3,2,1],values:["�柳","�柳","�柳","�柳","�柳","�柳","�柳","�柳","�柳","�柳","瘻","漏","淚","樓","屢","壘","鬧","遼","�","�","�","�","��","��","��","��","��","�","�","�","�","�","�","�","�","�","�"]},SB={integers:[1e4,9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,900,800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1],values:["��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��","��"]},MB="留덉씠�덉뒪",yB=function(A,e,t){var r=t?". ":"",n=t?"��":"",B=t?", ":"",s=t?" ":"";switch(e){case tr.DISC:return"��"+s;case tr.CIRCLE:return"��"+s;case tr.SQUARE:return"��"+s;case tr.DECIMAL_LEADING_ZERO:var o=TB(A,48,57,!0,r);return o.length<4?"0"+o:o;case tr.CJK_DECIMAL:return mB(A,"�뉏�雅뚥툒�쎽틪��툋�ヤ튉",n);case tr.LOWER_ROMAN:return KB(A,1,3999,OB,tr.DECIMAL,r).toLowerCase();case tr.UPPER_ROMAN:return KB(A,1,3999,OB,tr.DECIMAL,r);case tr.LOWER_GREEK:return TB(A,945,969,!1,r);case tr.LOWER_ALPHA:return TB(A,97,122,!1,r);case tr.UPPER_ALPHA:return TB(A,65,90,!1,r);case tr.ARABIC_INDIC:return TB(A,1632,1641,!0,r);case tr.ARMENIAN:case tr.UPPER_ARMENIAN:return KB(A,1,9999,DB,tr.DECIMAL,r);case tr.LOWER_ARMENIAN:return KB(A,1,9999,DB,tr.DECIMAL,r).toLowerCase();case tr.BENGALI:return TB(A,2534,2543,!0,r);case tr.CAMBODIAN:case tr.KHMER:return TB(A,6112,6121,!0,r);case tr.CJK_EARTHLY_BRANCH:return mB(A,"耶먧툚野끻뜱渦겼럼�덃쑋�녜뀎�뚥벤",n);case tr.CJK_HEAVENLY_STEM:return mB(A,"�꿜튃訝쇾툈�듿런佯싪풘鶯х쇅",n);case tr.CJK_IDEOGRAPHIC:case tr.TRAD_CHINESE_INFORMAL:return RB(A,"�뜸�雅뚥툒�쎽틪��툋�ヤ튉","�곭쇍�껇맟","縕�",n,14);case tr.TRAD_CHINESE_FORMAL:return RB(A,"�뜹９縕녑룂�녵펾�멩윊�뚨럷","�얌쉼餓잒맟","縕�",n,15);case tr.SIMP_CHINESE_INFORMAL:return RB(A,"�뜸�雅뚥툒�쎽틪��툋�ヤ튉","�곭쇍�껇맟","兀�",n,14);case tr.SIMP_CHINESE_FORMAL:return RB(A,"�뜹９兀겼뢾�녵펾�녷윊�뚨럷","�얌쉼餓잒맟","兀�",n,15);case tr.JAPANESE_INFORMAL:return RB(A,"�뉏�雅뚥툒�쎽틪��툋�ヤ튉","�곭쇍�껂툏","�욁궎�듽궧",n,0);case tr.JAPANESE_FORMAL:return RB(A,"�뜹１凉먨뢿�쎽펾��툋�ヤ튉","�양쇍�껂툏","�욁궎�듽궧",n,7);case tr.KOREAN_HANGUL_FORMAL:return RB(A,"�곸씪�댁궪�ъ삤�≪튌�붽뎄","��갚泥쒕쭔",MB,B,7);case tr.KOREAN_HANJA_INFORMAL:return RB(A,"�뜸�雅뚥툒�쎽틪��툋�ヤ튉","�곭쇍�껇맟",MB,B,0);case tr.KOREAN_HANJA_FORMAL:return RB(A,"�뜹９縕녑룂�쎽틪��툋�ヤ튉","�양쇍��",MB,B,7);case tr.DEVANAGARI:return TB(A,2406,2415,!0,r);case tr.GEORGIAN:return KB(A,1,19999,SB,tr.DECIMAL,r);case tr.GUJARATI:return TB(A,2790,2799,!0,r);case tr.GURMUKHI:return TB(A,2662,2671,!0,r);case tr.HEBREW:return KB(A,1,10999,bB,tr.DECIMAL,r);case tr.HIRAGANA:return mB(A,"�귙걚�녴걟�듽걢�띲걦�묆걪�뺛걮�쇻걵�앫걼�▲겇�╉겏�ゃ겓�с겖��겘�꿔겣�멥겭�얇겳���곥굚�꾠굞�덀굢�듽굥�뚣굧�뤵굪�묆굮��");case tr.HIRAGANA_IROHA:return mB(A,"�꾠굧��겓�삠겦�ⓦ걾�듽겕�뗣굮�뤵걢�덀걼�뚣걹�ㅳ겖�ゃ굢���녴굪��걡�뤵굜�얇걨�듐걪�덀겍�귙걬�띲굞�곥겳�쀣굫�꿔굚�쎼걲");case tr.KANNADA:return TB(A,3302,3311,!0,r);case tr.KATAKANA:return mB(A,"�㏂궎�╉궓�ゃ궖��궚�긱궠�듐궥�밤궩�썬궭�곥깂�녴깉�듽깑�뚣깓�롢깗�믡깢�섅깫�욁깱�졼깳�㏂깶�╉깿�⒲꺁�ャ꺃��꺈�겹꺊�꿔꺍",n);case tr.KATAKANA_IROHA:return mB(A,"�ㅳ꺆�뤵깑�쎼깦�덀긽�ゃ깒�ャ꺋��궖�ⓦ궭�с궫�꾠깓�듽꺀�졼궑�겹깕�ゃ궚�ㅳ깯�긱깢�녈궓�녴궋�듐궘�╉깳�잆궥�긱깚�㏂궩��",n);case tr.LAO:return TB(A,3792,3801,!0,r);case tr.MONGOLIAN:return TB(A,6160,6169,!0,r);case tr.MYANMAR:return TB(A,4160,4169,!0,r);case tr.ORIYA:return TB(A,2918,2927,!0,r);case tr.PERSIAN:return TB(A,1776,1785,!0,r);case tr.TAMIL:return TB(A,3046,3055,!0,r);case tr.TELUGU:return TB(A,3174,3183,!0,r);case tr.THAI:return TB(A,3664,3673,!0,r);case tr.TIBETAN:return TB(A,3872,3881,!0,r);case tr.DECIMAL:default:return TB(A,48,57,!0,r)}},_B="data-html2canvas-ignore",PB=(xB.prototype.toIFrame=function(A,t){var e=this,r=XB(A,t);if(!r.contentWindow)return Promise.reject("Unable to find iframe window");var n=A.defaultView.pageXOffset,B=A.defaultView.pageYOffset,s=r.contentWindow,o=s.document,i=JB(r).then(function(){return a(e,void 0,void 0,function(){var e;return S(this,function(A){switch(A.label){case 0:return this.scrolledElements.forEach(YB),s&&(s.scrollTo(t.left,t.top),!/(iPad|iPhone|iPod)/g.test(navigator.userAgent)||s.scrollY===t.top&&s.scrollX===t.left||(o.documentElement.style.top=-t.top+"px",o.documentElement.style.left=-t.left+"px",o.documentElement.style.position="absolute")),e=this.options.onclone,void 0===this.clonedReferenceElement?[2,Promise.reject("Error finding the "+this.referenceElement.nodeName+" in the cloned document")]:o.fonts&&o.fonts.ready?[4,o.fonts.ready]:[3,2];case 1:A.sent(),A.label=2;case 2:return"function"==typeof e?[2,Promise.resolve().then(function(){return e(o)}).then(function(){return r})]:[2,r]}})})});return o.open(),o.write(kB(document.doctype)+"<html></html>"),WB(this.referenceElement.ownerDocument,n,B),o.replaceChild(o.adoptNode(this.documentElement),o.documentElement),o.close(),i},xB.prototype.createElementClone=function(A){return FB(A)?this.createCanvasClone(A):nB(A)?this.createStyleClone(A):A.cloneNode(!1)},xB.prototype.createStyleClone=function(A){try{var e=A.sheet;if(e&&e.cssRules){var t=[].slice.call(e.cssRules,0).reduce(function(A,e){return e&&"string"==typeof e.cssText?A+e.cssText:A},""),r=A.cloneNode(!1);return r.textContent=t,r}}catch(A){if(De.getInstance(this.options.id).error("Unable to access cssRules property",A),"SecurityError"!==A.name)throw A}return A.cloneNode(!1)},xB.prototype.createCanvasClone=function(A){if(this.options.inlineImages&&A.ownerDocument){var e=A.ownerDocument.createElement("img");try{return e.src=A.toDataURL(),e}catch(A){De.getInstance(this.options.id).info("Unable to clone canvas contents, canvas is tainted")}}var t=A.cloneNode(!1);try{t.width=A.width,t.height=A.height;var r=A.getContext("2d"),n=t.getContext("2d");return n&&(r?n.putImageData(r.getImageData(0,0,A.width,A.height),0,0):n.drawImage(A,0,0)),t}catch(A){}return t},xB.prototype.cloneNode=function(A){if(QB(A))return document.createTextNode(A.data);if(!A.ownerDocument)return A.cloneNode(!1);var e=A.ownerDocument.defaultView;if(uB(A)&&e){var t=this.createElementClone(A),r=e.getComputedStyle(A),n=e.getComputedStyle(A,":before"),B=e.getComputedStyle(A,":after");this.referenceElement===A&&(this.clonedReferenceElement=t),EB(t)&&$B(t);for(var s=this.counters.parse(new un(r)),o=this.resolvePseudoContent(A,t,n,LB.BEFORE),i=A.firstChild;i;i=i.nextSibling)wB(i)&&("SCRIPT"===i.tagName||i.hasAttribute(_B)||"function"==typeof this.options.ignoreElements&&this.options.ignoreElements(i))||this.options.copyStyles&&wB(i)&&nB(i)||t.appendChild(this.cloneNode(i));o&&t.insertBefore(o,t.firstChild);var a=this.resolvePseudoContent(A,t,B,LB.AFTER);return a&&t.appendChild(a),this.counters.pop(s),r&&this.options.copyStyles&&!HB(A)&&GB(r,t),0===A.scrollTop&&0===A.scrollLeft||this.scrolledElements.push([t,A.scrollLeft,A.scrollTop]),(dB(A)||fB(A))&&(dB(t)||fB(t))&&(t.value=A.value),t}return A.cloneNode(!1)},xB.prototype.resolvePseudoContent=function(U,A,e,t){var l=this;if(e){var r=e.content,C=A.ownerDocument;if(C&&r&&"none"!==r&&"-moz-alt-content"!==r&&"none"!==e.display){this.counters.parse(new un(e));var g=new wn(e),E=C.createElement("html2canvaspseudoelement");GB(e,E),g.content.forEach(function(A){if(A.type===sA.STRING_TOKEN)E.appendChild(C.createTextNode(A.value));else if(A.type===sA.URL_TOKEN){var e=C.createElement("img");e.src=A.value,e.style.opacity="1",E.appendChild(e)}else if(A.type===sA.FUNCTION){if("attr"===A.name){var t=A.values.filter(zA);t.length&&E.appendChild(C.createTextNode(U.getAttribute(t[0].value)||""))}else if("counter"===A.name){var r=A.values.filter(kA),n=r[0],B=r[1];if(n&&zA(n)){var s=l.counters.getCounterValue(n.value),o=B&&zA(B)?ir.parse(B.value):tr.DECIMAL;E.appendChild(C.createTextNode(yB(s,o,!1)))}}else if("counters"===A.name){var i=A.values.filter(kA),a=(n=i[0],i[1]);if(B=i[2],n&&zA(n)){var c=l.counters.getCounterValues(n.value),Q=B&&zA(B)?ir.parse(B.value):tr.DECIMAL,w=a&&a.type===sA.STRING_TOKEN?a.value:"",u=c.map(function(A){return yB(A,Q,!1)}).join(w);E.appendChild(C.createTextNode(u))}}}else if(A.type===sA.IDENT_TOKEN)switch(A.value){case"open-quote":E.appendChild(C.createTextNode(en(g.quotes,l.quoteDepth++,!0)));break;case"close-quote":E.appendChild(C.createTextNode(en(g.quotes,--l.quoteDepth,!1)));break;default:E.appendChild(C.createTextNode(A.value))}}),E.className=qB+" "+ZB;var n=t===LB.BEFORE?" "+qB:" "+ZB;return function(A){return"object"==typeof A.className}(A)?A.className.baseValue+=n:A.className+=n,E}}},xB.destroy=function(A){return!!A.parentNode&&(A.parentNode.removeChild(A),!0)},xB);function xB(A,e){if(this.options=e,this.scrolledElements=[],this.referenceElement=A,this.counters=new pB,this.quoteDepth=0,!A.ownerDocument)throw new Error("Cloned element does not have an owner document");this.documentElement=this.cloneNode(A.ownerDocument.documentElement)}(vB=LB||(LB={}))[vB.BEFORE=0]="BEFORE",vB[vB.AFTER=1]="AFTER";var VB,zB,XB=function(A,e){var t=A.createElement("iframe");return t.className="html2canvas-container",t.style.visibility="hidden",t.style.position="fixed",t.style.left="-10000px",t.style.top="0px",t.style.border="0",t.width=e.width.toString(),t.height=e.height.toString(),t.scrolling="no",t.setAttribute(_B,"true"),A.body.appendChild(t),t},JB=function(n){return new Promise(function(e,A){var t=n.contentWindow;if(!t)return A("No window assigned for iframe");var r=t.document;t.onload=n.onload=r.onreadystatechange=function(){t.onload=n.onload=r.onreadystatechange=null;var A=setInterval(function(){0<r.body.childNodes.length&&"complete"===r.readyState&&(clearInterval(A),e(n))},50)}})},GB=function(A,e){for(var t=A.length-1;0<=t;t--){var r=A.item(t);"content"!==r&&e.style.setProperty(r,A.getPropertyValue(r))}return e},kB=function(A){var e="";return A&&(e+="<!DOCTYPE ",A.name&&(e+=A.name),A.internalSubset&&(e+=A.internalSubset),A.publicId&&(e+='"'+A.publicId+'"'),A.systemId&&(e+='"'+A.systemId+'"'),e+=">"),e},WB=function(A,e,t){A&&A.defaultView&&(e!==A.defaultView.pageXOffset||t!==A.defaultView.pageYOffset)&&A.defaultView.scrollTo(e,t)},YB=function(A){var e=A[0],t=A[1],r=A[2];e.scrollLeft=t,e.scrollTop=r},qB="___html2canvas___pseudoelement_before",ZB="___html2canvas___pseudoelement_after",jB='{\n    content: "" !important;\n    display: none !important;\n}',$B=function(A){As(A,"."+qB+":before"+jB+"\n         ."+ZB+":after"+jB)},As=function(A,e){var t=A.ownerDocument;if(t){var r=t.createElement("style");r.textContent=e,A.appendChild(r)}};(zB=VB||(VB={}))[zB.VECTOR=0]="VECTOR",zB[zB.BEZIER_CURVE=1]="BEZIER_CURVE";function es(A,t){return A.length===t.length&&A.some(function(A,e){return A===t[e]})}var ts=(rs.prototype.add=function(A,e){return new rs(this.x+A,this.y+e)},rs);function rs(A,e){this.type=VB.VECTOR,this.x=A,this.y=e}function ns(A,e,t){return new ts(A.x+(e.x-A.x)*t,A.y+(e.y-A.y)*t)}var Bs=(ss.prototype.subdivide=function(A,e){var t=ns(this.start,this.startControl,A),r=ns(this.startControl,this.endControl,A),n=ns(this.endControl,this.end,A),B=ns(t,r,A),s=ns(r,n,A),o=ns(B,s,A);return e?new ss(this.start,t,B,o):new ss(o,s,n,this.end)},ss.prototype.add=function(A,e){return new ss(this.start.add(A,e),this.startControl.add(A,e),this.endControl.add(A,e),this.end.add(A,e))},ss.prototype.reverse=function(){return new ss(this.end,this.endControl,this.startControl,this.start)},ss);function ss(A,e,t,r){this.type=VB.BEZIER_CURVE,this.start=A,this.startControl=e,this.endControl=t,this.end=r}function os(A){return A.type===VB.BEZIER_CURVE}var is,as,cs=function(A){var e=A.styles,t=A.bounds,r=jA(e.borderTopLeftRadius,t.width,t.height),n=r[0],B=r[1],s=jA(e.borderTopRightRadius,t.width,t.height),o=s[0],i=s[1],a=jA(e.borderBottomRightRadius,t.width,t.height),c=a[0],Q=a[1],w=jA(e.borderBottomLeftRadius,t.width,t.height),u=w[0],U=w[1],l=[];l.push((n+o)/t.width),l.push((u+c)/t.width),l.push((B+U)/t.height),l.push((i+Q)/t.height);var C=Math.max.apply(Math,l);1<C&&(n/=C,B/=C,o/=C,i/=C,c/=C,Q/=C,u/=C,U/=C);var g=t.width-o,E=t.height-Q,F=t.width-c,h=t.height-U,H=e.borderTopWidth,d=e.borderRightWidth,f=e.borderBottomWidth,p=e.borderLeftWidth,N=ae(e.paddingTop,A.bounds.width),K=ae(e.paddingRight,A.bounds.width),I=ae(e.paddingBottom,A.bounds.width),T=ae(e.paddingLeft,A.bounds.width);this.topLeftBorderBox=0<n||0<B?us(t.left,t.top,n,B,is.TOP_LEFT):new ts(t.left,t.top),this.topRightBorderBox=0<o||0<i?us(t.left+g,t.top,o,i,is.TOP_RIGHT):new ts(t.left+t.width,t.top),this.bottomRightBorderBox=0<c||0<Q?us(t.left+F,t.top+E,c,Q,is.BOTTOM_RIGHT):new ts(t.left+t.width,t.top+t.height),this.bottomLeftBorderBox=0<u||0<U?us(t.left,t.top+h,u,U,is.BOTTOM_LEFT):new ts(t.left,t.top+t.height),this.topLeftPaddingBox=0<n||0<B?us(t.left+p,t.top+H,Math.max(0,n-p),Math.max(0,B-H),is.TOP_LEFT):new ts(t.left+p,t.top+H),this.topRightPaddingBox=0<o||0<i?us(t.left+Math.min(g,t.width+p),t.top+H,g>t.width+p?0:o-p,i-H,is.TOP_RIGHT):new ts(t.left+t.width-d,t.top+H),this.bottomRightPaddingBox=0<c||0<Q?us(t.left+Math.min(F,t.width-p),t.top+Math.min(E,t.height+H),Math.max(0,c-d),Q-f,is.BOTTOM_RIGHT):new ts(t.left+t.width-d,t.top+t.height-f),this.bottomLeftPaddingBox=0<u||0<U?us(t.left+p,t.top+h,Math.max(0,u-p),U-f,is.BOTTOM_LEFT):new ts(t.left+p,t.top+t.height-f),this.topLeftContentBox=0<n||0<B?us(t.left+p+T,t.top+H+N,Math.max(0,n-(p+T)),Math.max(0,B-(H+N)),is.TOP_LEFT):new ts(t.left+p+T,t.top+H+N),this.topRightContentBox=0<o||0<i?us(t.left+Math.min(g,t.width+p+T),t.top+H+N,g>t.width+p+T?0:o-p+T,i-(H+N),is.TOP_RIGHT):new ts(t.left+t.width-(d+K),t.top+H+N),this.bottomRightContentBox=0<c||0<Q?us(t.left+Math.min(F,t.width-(p+T)),t.top+Math.min(E,t.height+H+N),Math.max(0,c-(d+K)),Q-(f+I),is.BOTTOM_RIGHT):new ts(t.left+t.width-(d+K),t.top+t.height-(f+I)),this.bottomLeftContentBox=0<u||0<U?us(t.left+p+T,t.top+h,Math.max(0,u-(p+T)),U-(f+I),is.BOTTOM_LEFT):new ts(t.left+p+T,t.top+t.height-(f+I))};(as=is||(is={}))[as.TOP_LEFT=0]="TOP_LEFT",as[as.TOP_RIGHT=1]="TOP_RIGHT",as[as.BOTTOM_RIGHT=2]="BOTTOM_RIGHT",as[as.BOTTOM_LEFT=3]="BOTTOM_LEFT";function Qs(A){return[A.topLeftBorderBox,A.topRightBorderBox,A.bottomRightBorderBox,A.bottomLeftBorderBox]}function ws(A){return[A.topLeftPaddingBox,A.topRightPaddingBox,A.bottomRightPaddingBox,A.bottomLeftPaddingBox]}var us=function(A,e,t,r,n){var B=(Math.sqrt(2)-1)/3*4,s=t*B,o=r*B,i=A+t,a=e+r;switch(n){case is.TOP_LEFT:return new Bs(new ts(A,a),new ts(A,a-o),new ts(i-s,e),new ts(i,e));case is.TOP_RIGHT:return new Bs(new ts(A,e),new ts(A+s,e),new ts(i,a-o),new ts(i,a));case is.BOTTOM_RIGHT:return new Bs(new ts(i,e),new ts(i,e+o),new ts(A+s,a),new ts(A,a));case is.BOTTOM_LEFT:default:return new Bs(new ts(i,a),new ts(i-s,a),new ts(A,e+o),new ts(A,e))}},Us=function(A,e,t){this.type=0,this.offsetX=A,this.offsetY=e,this.matrix=t,this.target=6},ls=function(A,e){this.type=1,this.target=e,this.path=A},Cs=function(A){this.element=A,this.inlineLevel=[],this.nonInlineLevel=[],this.negativeZIndex=[],this.zeroOrAutoZIndexOrTransformedOrOpacity=[],this.positiveZIndex=[],this.nonPositionedFloats=[],this.nonPositionedInlineLevel=[]},gs=(Es.prototype.getParentEffects=function(){var A=this.effects.slice(0);if(this.container.styles.overflowX!==sr.VISIBLE){var e=Qs(this.curves),t=ws(this.curves);es(e,t)||A.push(new ls(t,6))}return A},Es);function Es(A,e){if(this.container=A,this.effects=e.slice(0),this.curves=new cs(A),null!==A.styles.transform){var t=A.bounds.left+A.styles.transformOrigin[0].number,r=A.bounds.top+A.styles.transformOrigin[1].number,n=A.styles.transform;this.effects.push(new Us(t,r,n))}if(A.styles.overflowX!==sr.VISIBLE){var B=Qs(this.curves),s=ws(this.curves);es(B,s)?this.effects.push(new ls(B,6)):(this.effects.push(new ls(B,2)),this.effects.push(new ls(s,4)))}}function Fs(A){var e=A.bounds,t=A.styles;return e.add(t.borderLeftWidth,t.borderTopWidth,-(t.borderRightWidth+t.borderLeftWidth),-(t.borderTopWidth+t.borderBottomWidth))}function hs(A){var e=A.styles,t=A.bounds,r=ae(e.paddingLeft,t.width),n=ae(e.paddingRight,t.width),B=ae(e.paddingTop,t.width),s=ae(e.paddingBottom,t.width);return t.add(r+e.borderLeftWidth,B+e.borderTopWidth,-(e.borderRightWidth+e.borderLeftWidth+r+n),-(e.borderTopWidth+e.borderBottomWidth+B+s))}function Hs(A,e,t){var r=function(A,e){return 0===A?e.bounds:2===A?hs(e):Fs(e)}(Ts(A.styles.backgroundOrigin,e),A),n=function(A,e){return A===Ee.BORDER_BOX?e.bounds:A===Ee.CONTENT_BOX?hs(e):Fs(e)}(Ts(A.styles.backgroundClip,e),A),B=Is(Ts(A.styles.backgroundSize,e),t,r),s=B[0],o=B[1],i=jA(Ts(A.styles.backgroundPosition,e),r.width-s,r.height-o);return[ms(Ts(A.styles.backgroundRepeat,e),i,B,r,n),Math.round(r.left+i[0]),Math.round(r.top+i[1]),s,o]}function ds(A){return zA(A)&&A.value===Ut.AUTO}function fs(A){return"number"==typeof A}var ps=function(c,Q,w,u){c.container.elements.forEach(function(A){var e=An(A.flags,4),t=An(A.flags,2),r=new gs(A,c.getParentEffects());An(A.styles.display,2048)&&u.push(r);var n=An(A.flags,8)?[]:u;if(e||t){var B=e||A.styles.isPositioned()?w:Q,s=new Cs(r);if(A.styles.isPositioned()||A.styles.opacity<1||A.styles.isTransformed()){var o=A.styles.zIndex.order;if(o<0){var i=0;B.negativeZIndex.some(function(A,e){return o>A.element.container.styles.zIndex.order?(i=e,!1):0<i}),B.negativeZIndex.splice(i,0,s)}else if(0<o){var a=0;B.positiveZIndex.some(function(A,e){return o>A.element.container.styles.zIndex.order?(a=e+1,!1):0<a}),B.positiveZIndex.splice(a,0,s)}else B.zeroOrAutoZIndexOrTransformedOrOpacity.push(s)}else A.styles.isFloating()?B.nonPositionedFloats.push(s):B.nonPositionedInlineLevel.push(s);ps(r,s,e?s:w,n)}else A.styles.isInlineLevel()?Q.inlineLevel.push(r):Q.nonInlineLevel.push(r),ps(r,Q,w,n);An(A.flags,8)&&Ns(A,n)})},Ns=function(A,e){for(var t=A instanceof Mn?A.start:1,r=A instanceof Mn&&A.reversed,n=0;n<e.length;n++){var B=e[n];B.container instanceof Dn&&"number"==typeof B.container.value&&0!==B.container.value&&(t=B.container.value),B.listValue=yB(t,B.container.styles.listStyleType,!0),t+=r?-1:1}},Ks=function(A,e,t,r){var n=[];return os(A)?n.push(A.subdivide(.5,!1)):n.push(A),os(t)?n.push(t.subdivide(.5,!0)):n.push(t),os(r)?n.push(r.subdivide(.5,!0).reverse()):n.push(r),os(e)?n.push(e.subdivide(.5,!1).reverse()):n.push(e),n},Is=function(A,e,t){var r=e[0],n=e[1],B=e[2],s=A[0],o=A[1];if(qA(s)&&o&&qA(o))return[ae(s,t.width),ae(o,t.height)];var i=fs(B);if(zA(s)&&(s.value===Ut.CONTAIN||s.value===Ut.COVER))return fs(B)?t.width/t.height<B!=(s.value===Ut.COVER)?[t.width,t.width/B]:[t.height*B,t.height]:[t.width,t.height];var a=fs(r),c=fs(n),Q=a||c;if(ds(s)&&(!o||ds(o)))return a&&c?[r,n]:i||Q?Q&&i?[a?r:n*B,c?n:r/B]:[a?r:t.width,c?n:t.height]:[t.width,t.height];if(i){var w=0,u=0;return qA(s)?w=ae(s,t.width):qA(o)&&(u=ae(o,t.height)),ds(s)?w=u*B:o&&!ds(o)||(u=w/B),[w,u]}var U=null,l=null;if(qA(s)?U=ae(s,t.width):o&&qA(o)&&(l=ae(o,t.height)),null===U||o&&!ds(o)||(l=a&&c?U/r*n:t.height),null!==l&&ds(s)&&(U=a&&c?l/n*r:t.width),null!==U&&null!==l)return[U,l];throw new Error("Unable to calculate background-size for element")},Ts=function(A,e){var t=A[e];return void 0===t?A[0]:t},ms=function(A,e,t,r,n){var B=e[0],s=e[1],o=t[0],i=t[1];switch(A){case it.REPEAT_X:return[new ts(Math.round(r.left),Math.round(r.top+s)),new ts(Math.round(r.left+r.width),Math.round(r.top+s)),new ts(Math.round(r.left+r.width),Math.round(i+r.top+s)),new ts(Math.round(r.left),Math.round(i+r.top+s))];case it.REPEAT_Y:return[new ts(Math.round(r.left+B),Math.round(r.top)),new ts(Math.round(r.left+B+o),Math.round(r.top)),new ts(Math.round(r.left+B+o),Math.round(r.height+r.top)),new ts(Math.round(r.left+B),Math.round(r.height+r.top))];case it.NO_REPEAT:return[new ts(Math.round(r.left+B),Math.round(r.top+s)),new ts(Math.round(r.left+B+o),Math.round(r.top+s)),new ts(Math.round(r.left+B+o),Math.round(r.top+s+i)),new ts(Math.round(r.left+B),Math.round(r.top+s+i))];default:return[new ts(Math.round(n.left),Math.round(n.top)),new ts(Math.round(n.left+n.width),Math.round(n.top)),new ts(Math.round(n.left+n.width),Math.round(n.height+n.top)),new ts(Math.round(n.left),Math.round(n.height+n.top))]}},Rs="Hidden Text",Ls=(vs.prototype.parseMetrics=function(A,e){var t=this._document.createElement("div"),r=this._document.createElement("img"),n=this._document.createElement("span"),B=this._document.body;t.style.visibility="hidden",t.style.fontFamily=A,t.style.fontSize=e,t.style.margin="0",t.style.padding="0",B.appendChild(t),r.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",r.width=1,r.height=1,r.style.margin="0",r.style.padding="0",r.style.verticalAlign="baseline",n.style.fontFamily=A,n.style.fontSize=e,n.style.margin="0",n.style.padding="0",n.appendChild(this._document.createTextNode(Rs)),t.appendChild(n),t.appendChild(r);var s=r.offsetTop-n.offsetTop+2;t.removeChild(n),t.appendChild(this._document.createTextNode(Rs)),t.style.lineHeight="normal",r.style.verticalAlign="super";var o=r.offsetTop-t.offsetTop+2;return B.removeChild(t),{baseline:s,middle:o}},vs.prototype.getMetrics=function(A,e){var t=A+" "+e;return void 0===this._data[t]&&(this._data[t]=this.parseMetrics(A,e)),this._data[t]},vs);function vs(A){this._data={},this._document=A}var Os=(Ds.prototype.applyEffects=function(A,e){for(var t=this;this._activeEffects.length;)this.popEffect();A.filter(function(A){return An(A.target,e)}).forEach(function(A){return t.applyEffect(A)})},Ds.prototype.applyEffect=function(A){this.ctx.save(),function(A){return 0===A.type}(A)&&(this.ctx.translate(A.offsetX,A.offsetY),this.ctx.transform(A.matrix[0],A.matrix[1],A.matrix[2],A.matrix[3],A.matrix[4],A.matrix[5]),this.ctx.translate(-A.offsetX,-A.offsetY)),function(A){return 1===A.type}(A)&&(this.path(A.path),this.ctx.clip()),this._activeEffects.push(A)},Ds.prototype.popEffect=function(){this._activeEffects.pop(),this.ctx.restore()},Ds.prototype.renderStack=function(t){return a(this,void 0,void 0,function(){var e;return S(this,function(A){switch(A.label){case 0:return(e=t.element.container.styles).isVisible()?(this.ctx.globalAlpha=e.opacity,[4,this.renderStackContent(t)]):[3,2];case 1:A.sent(),A.label=2;case 2:return[2]}})})},Ds.prototype.renderNode=function(e){return a(this,void 0,void 0,function(){return S(this,function(A){switch(A.label){case 0:return e.container.styles.isVisible()?[4,this.renderNodeBackgroundAndBorders(e)]:[3,3];case 1:return A.sent(),[4,this.renderNodeContent(e)];case 2:A.sent(),A.label=3;case 3:return[2]}})})},Ds.prototype.renderTextWithLetterSpacing=function(t,A){var r=this;0===A?this.ctx.fillText(t.text,t.bounds.left,t.bounds.top+t.bounds.height):c(t.text).map(function(A){return l(A)}).reduce(function(A,e){return r.ctx.fillText(e,A,t.bounds.top+t.bounds.height),A+r.ctx.measureText(e).width},t.bounds.left)},Ds.prototype.createFontStyle=function(A){var e=A.fontVariant.filter(function(A){return"normal"===A||"small-caps"===A}).join(""),t=A.fontFamily.join(", "),r=xA(A.fontSize)?""+A.fontSize.number+A.fontSize.unit:A.fontSize.number+"px";return[[A.fontStyle,e,A.fontWeight,r,t].join(" "),t,r]},Ds.prototype.renderTextNode=function(r,o){return a(this,void 0,void 0,function(){var e,t,n,B,s=this;return S(this,function(A){return e=this.createFontStyle(o),t=e[0],n=e[1],B=e[2],this.ctx.font=t,r.textBounds.forEach(function(r){s.ctx.fillStyle=te(o.color),s.renderTextWithLetterSpacing(r,o.letterSpacing);var A=o.textShadow;A.length&&r.text.trim().length&&(A.slice(0).reverse().forEach(function(A){s.ctx.shadowColor=te(A.color),s.ctx.shadowOffsetX=A.offsetX.number*s.options.scale,s.ctx.shadowOffsetY=A.offsetY.number*s.options.scale,s.ctx.shadowBlur=A.blur.number,s.ctx.fillText(r.text,r.bounds.left,r.bounds.top+r.bounds.height)}),s.ctx.shadowColor="",s.ctx.shadowOffsetX=0,s.ctx.shadowOffsetY=0,s.ctx.shadowBlur=0),o.textDecorationLine.length&&(s.ctx.fillStyle=te(o.textDecorationColor||o.color),o.textDecorationLine.forEach(function(A){switch(A){case 1:var e=s.fontMetrics.getMetrics(n,B).baseline;s.ctx.fillRect(r.bounds.left,Math.round(r.bounds.top+e),r.bounds.width,1);break;case 2:s.ctx.fillRect(r.bounds.left,Math.round(r.bounds.top),r.bounds.width,1);break;case 3:var t=s.fontMetrics.getMetrics(n,B).middle;s.ctx.fillRect(r.bounds.left,Math.ceil(r.bounds.top+t),r.bounds.width,1)}}))}),[2]})})},Ds.prototype.renderReplacedElement=function(A,e,t){if(t&&0<A.intrinsicWidth&&0<A.intrinsicHeight){var r=hs(A),n=ws(e);this.path(n),this.ctx.save(),this.ctx.clip(),this.ctx.drawImage(t,0,0,A.intrinsicWidth,A.intrinsicHeight,r.left,r.top,r.width,r.height),this.ctx.restore()}},Ds.prototype.renderNodeContent=function(l){return a(this,void 0,void 0,function(){var e,t,r,n,B,s,o,i,a,c,Q,w,u,U;return S(this,function(A){switch(A.label){case 0:this.applyEffects(l.effects,4),e=l.container,t=l.curves,r=e.styles,n=0,B=e.textNodes,A.label=1;case 1:return n<B.length?(s=B[n],[4,this.renderTextNode(s,r)]):[3,4];case 2:A.sent(),A.label=3;case 3:return n++,[3,1];case 4:if(!(e instanceof Nn))return[3,8];A.label=5;case 5:return A.trys.push([5,7,,8]),[4,this.options.cache.match(e.src)];case 6:return w=A.sent(),this.renderReplacedElement(e,t,w),[3,8];case 7:return A.sent(),De.getInstance(this.options.id).error("Error loading image "+e.src),[3,8];case 8:if(e instanceof Tn&&this.renderReplacedElement(e,t,e.canvas),!(e instanceof Ln))return[3,12];A.label=9;case 9:return A.trys.push([9,11,,12]),[4,this.options.cache.match(e.svg)];case 10:return w=A.sent(),this.renderReplacedElement(e,t,w),[3,12];case 11:return A.sent(),De.getInstance(this.options.id).error("Error loading svg "+e.svg.substring(0,255)),[3,12];case 12:return e instanceof tB&&e.tree?[4,new Ds({id:this.options.id,scale:this.options.scale,backgroundColor:e.backgroundColor,x:0,y:0,scrollX:0,scrollY:0,width:e.width,height:e.height,cache:this.options.cache,windowWidth:e.width,windowHeight:e.height}).render(e.tree)]:[3,14];case 13:o=A.sent(),e.width&&e.height&&this.ctx.drawImage(o,0,0,e.width,e.height,e.bounds.left,e.bounds.top,e.bounds.width,e.bounds.height),A.label=14;case 14:if(e instanceof Gn&&(i=Math.min(e.bounds.width,e.bounds.height),e.type===Vn?e.checked&&(this.ctx.save(),this.path([new ts(e.bounds.left+.39363*i,e.bounds.top+.79*i),new ts(e.bounds.left+.16*i,e.bounds.top+.5549*i),new ts(e.bounds.left+.27347*i,e.bounds.top+.44071*i),new ts(e.bounds.left+.39694*i,e.bounds.top+.5649*i),new ts(e.bounds.left+.72983*i,e.bounds.top+.23*i),new ts(e.bounds.left+.84*i,e.bounds.top+.34085*i),new ts(e.bounds.left+.39363*i,e.bounds.top+.79*i)]),this.ctx.fillStyle=te(Jn),this.ctx.fill(),this.ctx.restore()):e.type===zn&&e.checked&&(this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(e.bounds.left+i/2,e.bounds.top+i/2,i/4,0,2*Math.PI,!0),this.ctx.fillStyle=te(Jn),this.ctx.fill(),this.ctx.restore())),bs(e)&&e.value.length){switch(this.ctx.font=this.createFontStyle(r)[0],this.ctx.fillStyle=te(r.color),this.ctx.textBaseline="middle",this.ctx.textAlign=Ms(e.styles.textAlign),U=hs(e),a=0,e.styles.textAlign){case Cr.CENTER:a+=U.width/2;break;case Cr.RIGHT:a+=U.width}c=U.add(a,0,0,-U.height/2+1),this.ctx.save(),this.path([new ts(U.left,U.top),new ts(U.left+U.width,U.top),new ts(U.left+U.width,U.top+U.height),new ts(U.left,U.top+U.height)]),this.ctx.clip(),this.renderTextWithLetterSpacing(new Cn(e.value,c),r.letterSpacing),this.ctx.restore(),this.ctx.textBaseline="bottom",this.ctx.textAlign="left"}if(!An(e.styles.display,2048))return[3,20];if(null===e.styles.listStyleImage)return[3,19];if((Q=e.styles.listStyleImage).type!==xe.URL)return[3,18];w=void 0,u=Q.url,A.label=15;case 15:return A.trys.push([15,17,,18]),[4,this.options.cache.match(u)];case 16:return w=A.sent(),this.ctx.drawImage(w,e.bounds.left-(w.width+10),e.bounds.top),[3,18];case 17:return A.sent(),De.getInstance(this.options.id).error("Error loading list-style-image "+u),[3,18];case 18:return[3,20];case 19:l.listValue&&e.styles.listStyleType!==tr.NONE&&(this.ctx.font=this.createFontStyle(r)[0],this.ctx.fillStyle=te(r.color),this.ctx.textBaseline="middle",this.ctx.textAlign="right",U=new I(e.bounds.left,e.bounds.top+ae(e.styles.paddingTop,e.bounds.width),e.bounds.width,function(A,e){return zA(A)&&"normal"===A.value?1.2*e:A.type===sA.NUMBER_TOKEN?e*A.number:qA(A)?ae(A,e):e}(r.lineHeight,r.fontSize.number)/2+1),this.renderTextWithLetterSpacing(new Cn(l.listValue,U),r.letterSpacing),this.ctx.textBaseline="bottom",this.ctx.textAlign="left"),A.label=20;case 20:return[2]}})})},Ds.prototype.renderStackContent=function(C){return a(this,void 0,void 0,function(){var e,t,r,n,B,s,o,i,a,c,Q,w,u,U,l;return S(this,function(A){switch(A.label){case 0:return[4,this.renderNodeBackgroundAndBorders(C.element)];case 1:A.sent(),e=0,t=C.negativeZIndex,A.label=2;case 2:return e<t.length?(l=t[e],[4,this.renderStack(l)]):[3,5];case 3:A.sent(),A.label=4;case 4:return e++,[3,2];case 5:return[4,this.renderNodeContent(C.element)];case 6:A.sent(),r=0,n=C.nonInlineLevel,A.label=7;case 7:return r<n.length?(l=n[r],[4,this.renderNode(l)]):[3,10];case 8:A.sent(),A.label=9;case 9:return r++,[3,7];case 10:B=0,s=C.nonPositionedFloats,A.label=11;case 11:return B<s.length?(l=s[B],[4,this.renderStack(l)]):[3,14];case 12:A.sent(),A.label=13;case 13:return B++,[3,11];case 14:o=0,i=C.nonPositionedInlineLevel,A.label=15;case 15:return o<i.length?(l=i[o],[4,this.renderStack(l)]):[3,18];case 16:A.sent(),A.label=17;case 17:return o++,[3,15];case 18:a=0,c=C.inlineLevel,A.label=19;case 19:return a<c.length?(l=c[a],[4,this.renderNode(l)]):[3,22];case 20:A.sent(),A.label=21;case 21:return a++,[3,19];case 22:Q=0,w=C.zeroOrAutoZIndexOrTransformedOrOpacity,A.label=23;case 23:return Q<w.length?(l=w[Q],[4,this.renderStack(l)]):[3,26];case 24:A.sent(),A.label=25;case 25:return Q++,[3,23];case 26:u=0,U=C.positiveZIndex,A.label=27;case 27:return u<U.length?(l=U[u],[4,this.renderStack(l)]):[3,30];case 28:A.sent(),A.label=29;case 29:return u++,[3,27];case 30:return[2]}})})},Ds.prototype.mask=function(A){this.ctx.beginPath(),this.ctx.moveTo(0,0),this.ctx.lineTo(this.canvas.width,0),this.ctx.lineTo(this.canvas.width,this.canvas.height),this.ctx.lineTo(0,this.canvas.height),this.ctx.lineTo(0,0),this.formatPath(A.slice(0).reverse()),this.ctx.closePath()},Ds.prototype.path=function(A){this.ctx.beginPath(),this.formatPath(A),this.ctx.closePath()},Ds.prototype.formatPath=function(A){var r=this;A.forEach(function(A,e){var t=os(A)?A.start:A;0===e?r.ctx.moveTo(t.x,t.y):r.ctx.lineTo(t.x,t.y),os(A)&&r.ctx.bezierCurveTo(A.startControl.x,A.startControl.y,A.endControl.x,A.endControl.y,A.end.x,A.end.y)})},Ds.prototype.renderRepeat=function(A,e,t,r){this.path(A),this.ctx.fillStyle=e,this.ctx.translate(t,r),this.ctx.fill(),this.ctx.translate(-t,-r)},Ds.prototype.resizeImage=function(A,e,t){if(A.width===e&&A.height===t)return A;var r=this.canvas.ownerDocument.createElement("canvas");return r.width=e,r.height=t,r.getContext("2d").drawImage(A,0,0,A.width,A.height,0,0,e,t),r},Ds.prototype.renderBackgroundImage=function(b){return a(this,void 0,void 0,function(){var O,e,D,t,r,n;return S(this,function(A){switch(A.label){case 0:O=b.styles.backgroundImage.length-1,e=function(e){var t,r,n,B,s,o,i,a,c,Q,w,u,U,l,C,g,E,F,h,H,d,f,p,N,K,I,T,m,R,L,v;return S(this,function(A){switch(A.label){case 0:if(e.type!==xe.URL)return[3,5];t=void 0,r=e.url,A.label=1;case 1:return A.trys.push([1,3,,4]),[4,D.options.cache.match(r)];case 2:return t=A.sent(),[3,4];case 3:return A.sent(),De.getInstance(D.options.id).error("Error loading background-image "+r),[3,4];case 4:return t&&(n=Hs(b,O,[t.width,t.height,t.width/t.height]),g=n[0],f=n[1],p=n[2],h=n[3],H=n[4],l=D.ctx.createPattern(D.resizeImage(t,h,H),"repeat"),D.renderRepeat(g,l,f,p)),[3,6];case 5:!function(A){return A.type===xe.LINEAR_GRADIENT}(e)?function(A){return A.type===xe.RADIAL_GRADIENT}(e)&&(C=Hs(b,O,[null,null,null]),g=C[0],E=C[1],F=C[2],h=C[3],H=C[4],d=0===e.position.length?[oe]:e.position,f=ae(d[0],h),p=ae(d[d.length-1],H),N=function(A,e,t,r,n){var B=0,s=0;switch(A.size){case Bt.CLOSEST_SIDE:A.shape===rt.CIRCLE?B=s=Math.min(Math.abs(e),Math.abs(e-r),Math.abs(t),Math.abs(t-n)):A.shape===rt.ELLIPSE&&(B=Math.min(Math.abs(e),Math.abs(e-r)),s=Math.min(Math.abs(t),Math.abs(t-n)));break;case Bt.CLOSEST_CORNER:if(A.shape===rt.CIRCLE)B=s=Math.min(Ne(e,t),Ne(e,t-n),Ne(e-r,t),Ne(e-r,t-n));else if(A.shape===rt.ELLIPSE){var o=Math.min(Math.abs(t),Math.abs(t-n))/Math.min(Math.abs(e),Math.abs(e-r)),i=Ke(r,n,e,t,!0),a=i[0],c=i[1];s=o*(B=Ne(a-e,(c-t)/o))}break;case Bt.FARTHEST_SIDE:A.shape===rt.CIRCLE?B=s=Math.max(Math.abs(e),Math.abs(e-r),Math.abs(t),Math.abs(t-n)):A.shape===rt.ELLIPSE&&(B=Math.max(Math.abs(e),Math.abs(e-r)),s=Math.max(Math.abs(t),Math.abs(t-n)));break;case Bt.FARTHEST_CORNER:if(A.shape===rt.CIRCLE)B=s=Math.max(Ne(e,t),Ne(e,t-n),Ne(e-r,t),Ne(e-r,t-n));else if(A.shape===rt.ELLIPSE){o=Math.max(Math.abs(t),Math.abs(t-n))/Math.max(Math.abs(e),Math.abs(e-r));var Q=Ke(r,n,e,t,!1);a=Q[0],c=Q[1],s=o*(B=Ne(a-e,(c-t)/o))}}return Array.isArray(A.size)&&(B=ae(A.size[0],r),s=2===A.size.length?ae(A.size[1],n):B),[B,s]}(e,f,p,h,H),K=N[0],I=N[1],0<K&&0<K&&(T=D.ctx.createRadialGradient(E+f,F+p,0,E+f,F+p,K),fe(e.stops,2*K).forEach(function(A){return T.addColorStop(A.stop,te(A.color))}),D.path(g),D.ctx.fillStyle=T,K!==I?(m=b.bounds.left+.5*b.bounds.width,R=b.bounds.top+.5*b.bounds.height,v=1/(L=I/K),D.ctx.save(),D.ctx.translate(m,R),D.ctx.transform(1,0,0,L,0,0),D.ctx.translate(-m,-R),D.ctx.fillRect(E,v*(F-R)+R,h,H*v),D.ctx.restore()):D.ctx.fill())):(B=Hs(b,O,[null,null,null]),g=B[0],f=B[1],p=B[2],h=B[3],H=B[4],s=pe(e.angle,h,H),o=s[0],i=s[1],a=s[2],c=s[3],Q=s[4],(w=document.createElement("canvas")).width=h,w.height=H,u=w.getContext("2d"),U=u.createLinearGradient(i,c,a,Q),fe(e.stops,o).forEach(function(A){return U.addColorStop(A.stop,te(A.color))}),u.fillStyle=U,u.fillRect(0,0,h,H),0<h&&0<H&&(l=D.ctx.createPattern(w,"repeat"),D.renderRepeat(g,l,f,p))),A.label=6;case 6:return O--,[2]}})},D=this,t=0,r=b.styles.backgroundImage.slice(0).reverse(),A.label=1;case 1:return t<r.length?(n=r[t],[5,e(n)]):[3,4];case 2:A.sent(),A.label=3;case 3:return t++,[3,1];case 4:return[2]}})})},Ds.prototype.renderBorder=function(e,t,r){return a(this,void 0,void 0,function(){return S(this,function(A){return this.path(function(A,e){switch(e){case 0:return Ks(A.topLeftBorderBox,A.topLeftPaddingBox,A.topRightBorderBox,A.topRightPaddingBox);case 1:return Ks(A.topRightBorderBox,A.topRightPaddingBox,A.bottomRightBorderBox,A.bottomRightPaddingBox);case 2:return Ks(A.bottomRightBorderBox,A.bottomRightPaddingBox,A.bottomLeftBorderBox,A.bottomLeftPaddingBox);case 3:default:return Ks(A.bottomLeftBorderBox,A.bottomLeftPaddingBox,A.topLeftBorderBox,A.topLeftPaddingBox)}}(r,t)),this.ctx.fillStyle=te(e),this.ctx.fill(),[2]})})},Ds.prototype.renderNodeBackgroundAndBorders=function(c){return a(this,void 0,void 0,function(){var e,t,r,n,B,s,o,i,a=this;return S(this,function(A){switch(A.label){case 0:return this.applyEffects(c.effects,2),e=c.container.styles,t=!ee(e.backgroundColor)||e.backgroundImage.length,r=[{style:e.borderTopStyle,color:e.borderTopColor},{style:e.borderRightStyle,color:e.borderRightColor},{style:e.borderBottomStyle,color:e.borderBottomColor},{style:e.borderLeftStyle,color:e.borderLeftColor}],n=Ss(Ts(e.backgroundClip,0),c.curves),t||e.boxShadow.length?(this.ctx.save(),this.path(n),this.ctx.clip(),ee(e.backgroundColor)||(this.ctx.fillStyle=te(e.backgroundColor),this.ctx.fill()),[4,this.renderBackgroundImage(c.container)]):[3,2];case 1:A.sent(),this.ctx.restore(),e.boxShadow.slice(0).reverse().forEach(function(A){a.ctx.save();var e=Qs(c.curves),t=A.inset?0:1e4,r=function(A,t,r,n,B){return A.map(function(A,e){switch(e){case 0:return A.add(t,r);case 1:return A.add(t+n,r);case 2:return A.add(t+n,r+B);case 3:return A.add(t,r+B)}return A})}(e,-t+(A.inset?1:-1)*A.spread.number,(A.inset?1:-1)*A.spread.number,A.spread.number*(A.inset?-2:2),A.spread.number*(A.inset?-2:2));A.inset?(a.path(e),a.ctx.clip(),a.mask(r)):(a.mask(e),a.ctx.clip(),a.path(r)),a.ctx.shadowOffsetX=A.offsetX.number+t,a.ctx.shadowOffsetY=A.offsetY.number,a.ctx.shadowColor=te(A.color),a.ctx.shadowBlur=A.blur.number,a.ctx.fillStyle=A.inset?te(A.color):"rgba(0,0,0,1)",a.ctx.fill(),a.ctx.restore()}),A.label=2;case 2:s=B=0,o=r,A.label=3;case 3:return s<o.length?(i=o[s]).style===ht.NONE||ee(i.color)?[3,5]:[4,this.renderBorder(i.color,B,c.curves)]:[3,7];case 4:A.sent(),A.label=5;case 5:B++,A.label=6;case 6:return s++,[3,3];case 7:return[2]}})})},Ds.prototype.render=function(t){return a(this,void 0,void 0,function(){var e;return S(this,function(A){switch(A.label){case 0:return this.options.backgroundColor&&(this.ctx.fillStyle=te(this.options.backgroundColor),this.ctx.fillRect(this.options.x-this.options.scrollX,this.options.y-this.options.scrollY,this.options.width,this.options.height)),e=function(A){var e=new gs(A,[]),t=new Cs(e),r=[];return ps(e,t,t,r),Ns(e.container,r),t}(t),[4,this.renderStack(e)];case 1:return A.sent(),this.applyEffects([],2),[2,this.canvas]}})})},Ds);function Ds(A){this._activeEffects=[],this.canvas=A.canvas?A.canvas:document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),(this.options=A).canvas||(this.canvas.width=Math.floor(A.width*A.scale),this.canvas.height=Math.floor(A.height*A.scale),this.canvas.style.width=A.width+"px",this.canvas.style.height=A.height+"px"),this.fontMetrics=new Ls(document),this.ctx.scale(this.options.scale,this.options.scale),this.ctx.translate(-A.x+A.scrollX,-A.y+A.scrollY),this.ctx.textBaseline="bottom",this._activeEffects=[],De.getInstance(A.id).debug("Canvas renderer initialized ("+A.width+"x"+A.height+" at "+A.x+","+A.y+") with scale "+A.scale)}var bs=function(A){return A instanceof jn||(A instanceof Yn||A instanceof Gn&&A.type!==zn&&A.type!==Vn)},Ss=function(A,e){switch(A){case Ee.BORDER_BOX:return Qs(e);case Ee.CONTENT_BOX:return function(A){return[A.topLeftContentBox,A.topRightContentBox,A.bottomRightContentBox,A.bottomLeftContentBox]}(e);case Ee.PADDING_BOX:default:return ws(e)}},Ms=function(A){switch(A){case Cr.CENTER:return"center";case Cr.RIGHT:return"right";case Cr.LEFT:default:return"left"}},ys=(_s.prototype.render=function(r){return a(this,void 0,void 0,function(){var e,t;return S(this,function(A){switch(A.label){case 0:return e=Le(Math.max(this.options.windowWidth,this.options.width)*this.options.scale,Math.max(this.options.windowHeight,this.options.height)*this.options.scale,this.options.scrollX*this.options.scale,this.options.scrollY*this.options.scale,r),[4,xs(e)];case 1:return t=A.sent(),this.options.backgroundColor&&(this.ctx.fillStyle=te(this.options.backgroundColor),this.ctx.fillRect(0,0,this.options.width*this.options.scale,this.options.height*this.options.scale)),this.ctx.drawImage(t,-this.options.x*this.options.scale,-this.options.y*this.options.scale),[2,this.canvas]}})})},_s);function _s(A){this.canvas=A.canvas?A.canvas:document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.options=A,this.canvas.width=Math.floor(A.width*A.scale),this.canvas.height=Math.floor(A.height*A.scale),this.canvas.style.width=A.width+"px",this.canvas.style.height=A.height+"px",this.ctx.scale(this.options.scale,this.options.scale),this.ctx.translate(-A.x+A.scrollX,-A.y+A.scrollY),De.getInstance(A.id).debug("EXPERIMENTAL ForeignObject renderer initialized ("+A.width+"x"+A.height+" at "+A.x+","+A.y+") with scale "+A.scale)}function Ps(A){return we(_A.create(A).parseComponentValue())}var xs=function(r){return new Promise(function(A,e){var t=new Image;t.onload=function(){A(t)},t.onerror=e,t.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent((new XMLSerializer).serializeToString(r))})};"undefined"!=typeof window&&Se.setContext(window);var Vs=function(p,N){return a(void 0,void 0,void 0,function(){var e,t,r,n,B,s,o,i,a,c,Q,w,u,U,l,C,g,E,F,h,H,d,f;return S(this,function(A){switch(A.label){case 0:if(!(e=p.ownerDocument))throw new Error("Element is not attached to a Document");if(!(t=e.defaultView))throw new Error("Document is not attached to a Window");return r=(Math.round(1e3*Math.random())+Date.now()).toString(16),n=EB(p)||function(A){return"HTML"===A.tagName}(p)?function(A){var e=A.body,t=A.documentElement;if(!e||!t)throw new Error("Unable to get document size");var r=Math.max(Math.max(e.scrollWidth,t.scrollWidth),Math.max(e.offsetWidth,t.offsetWidth),Math.max(e.clientWidth,t.clientWidth)),n=Math.max(Math.max(e.scrollHeight,t.scrollHeight),Math.max(e.offsetHeight,t.offsetHeight),Math.max(e.clientHeight,t.clientHeight));return new I(0,0,r,n)}(e):T(p),B=n.width,s=n.height,o=n.left,i=n.top,a=K({},{allowTaint:!1,imageTimeout:15e3,proxy:void 0,useCORS:!1},N),c={backgroundColor:"#ffffff",cache:N.cache?N.cache:Se.create(r,a),logging:!0,removeContainer:!0,foreignObjectRendering:!1,scale:t.devicePixelRatio||1,windowWidth:t.innerWidth,windowHeight:t.innerHeight,scrollX:t.pageXOffset,scrollY:t.pageYOffset,x:o,y:i,width:Math.ceil(B),height:Math.ceil(s),id:r},Q=K({},c,a,N),w=new I(Q.scrollX,Q.scrollY,Q.windowWidth,Q.windowHeight),De.create({id:r,enabled:Q.logging}),De.getInstance(r).debug("Starting document clone"),u=new PB(p,{id:r,onclone:Q.onclone,ignoreElements:Q.ignoreElements,inlineImages:Q.foreignObjectRendering,copyStyles:Q.foreignObjectRendering}),(U=u.clonedReferenceElement)?[4,u.toIFrame(e,w)]:[2,Promise.reject("Unable to find element in cloned iframe")];case 1:return l=A.sent(),C=e.documentElement?Ps(getComputedStyle(e.documentElement).backgroundColor):He.TRANSPARENT,g=e.body?Ps(getComputedStyle(e.body).backgroundColor):He.TRANSPARENT,E=N.backgroundColor,F="string"==typeof E?Ps(E):null===E?He.TRANSPARENT:4294967295,h=p===e.documentElement?ee(C)?ee(g)?F:g:C:F,H={id:r,cache:Q.cache,canvas:Q.canvas,backgroundColor:h,scale:Q.scale,x:Q.x,y:Q.y,scrollX:Q.scrollX,scrollY:Q.scrollY,width:Q.width,height:Q.height,windowWidth:Q.windowWidth,windowHeight:Q.windowHeight},Q.foreignObjectRendering?(De.getInstance(r).debug("Document cloned, using foreign object rendering"),[4,new ys(H).render(U)]):[3,3];case 2:return d=A.sent(),[3,5];case 3:return De.getInstance(r).debug("Document cloned, using computed rendering"),Se.attachInstance(Q.cache),De.getInstance(r).debug("Starting DOM parsing"),f=iB(U),Se.detachInstance(),h===f.styles.backgroundColor&&(f.styles.backgroundColor=He.TRANSPARENT),De.getInstance(r).debug("Starting renderer"),[4,new Os(H).render(f)];case 4:d=A.sent(),A.label=5;case 5:return!0===Q.removeContainer&&(PB.destroy(l)||De.getInstance(r).error("Cannot detach cloned iframe as it is not in the DOM anymore")),De.getInstance(r).debug("Finished rendering"),De.destroy(r),Se.destroy(r),[2,d]}})})};return function(A,e){return void 0===e&&(e={}),Vs(A,e)}});
//Including jquery.facedetection
    !function(n){function p(n,p){if(n.length>1){for(var z={},y=0;y<p.length;y++)z[p[y]]=n[y];return z}return 1==n.length?n[0]:{}}var z={count:16,width:24,height:24,stage_classifier:[{count:4,threshold:-4.57753,feature:[{size:4,px:[3,5,8,11],py:[2,2,6,3],pz:[2,1,1,0],nx:[8,4,0,0],ny:[4,4,0,0],nz:[1,1,-1,-1]},{size:3,px:[3,6,7],py:[7,13,0],pz:[1,0,-1],nx:[2,3,4],ny:[5,4,4],nz:[2,1,1]},{size:5,px:[5,3,10,13,11],py:[1,0,3,2,2],pz:[1,2,0,0,0],nx:[0,11,0,11,11],ny:[0,2,3,1,1],nz:[1,1,0,1,-1]},{size:5,px:[6,12,12,9,12],py:[4,13,12,7,11],pz:[1,0,0,1,0],nx:[8,0,8,2,11],ny:[4,0,8,5,1],nz:[1,-1,-1,-1,-1]}],alpha:[-2.879683,2.879683,-1.569341,1.569341,-1.286131,1.286131,-1.157626,1.157626]},{count:4,threshold:-4.339908,feature:[{size:5,px:[13,12,3,11,17],py:[3,3,1,4,13],pz:[0,0,2,0,0],nx:[4,3,8,15,15],ny:[4,5,4,8,8],nz:[1,2,1,0,-1]},{size:5,px:[6,7,6,3,3],py:[13,13,4,2,7],pz:[0,0,1,2,1],nx:[4,8,3,0,15],ny:[4,4,4,3,8],nz:[1,1,-1,-1,-1]},{size:3,px:[2,2,11],py:[3,2,5],pz:[2,2,0],nx:[3,8,3],ny:[4,4,4],nz:[1,-1,-1]},{size:5,px:[15,13,9,11,7],py:[2,1,2,1,0],pz:[0,0,0,0,1],nx:[23,11,23,22,23],ny:[1,0,2,0,0],nz:[0,1,0,0,0]}],alpha:[-2.466029,2.466029,-1.83951,1.83951,-1.060559,1.060559,-1.094927,1.094927]},{count:7,threshold:-5.052474,feature:[{size:5,px:[17,13,3,11,10],py:[13,2,1,4,3],pz:[0,0,2,0,0],nx:[4,8,8,3,7],ny:[2,8,4,5,4],nz:[2,0,1,2,1]},{size:5,px:[6,7,3,6,6],py:[4,12,2,13,14],pz:[1,0,2,0,0],nx:[8,3,4,4,3],ny:[4,4,2,0,2],nz:[1,1,-1,-1,-1]},{size:5,px:[7,4,5,3,3],py:[2,1,3,1,1],pz:[0,1,0,1,-1],nx:[1,0,1,1,0],ny:[1,3,2,0,4],nz:[0,0,0,0,0]},{size:5,px:[11,11,11,3,2],py:[11,13,10,7,2],pz:[0,0,0,1,2],nx:[4,1,8,2,0],ny:[4,1,12,0,4],nz:[1,-1,-1,-1,-1]},{size:3,px:[9,13,1],py:[7,19,4],pz:[1,-1,-1],nx:[4,7,4],ny:[5,8,2],nz:[2,1,2]},{size:5,px:[12,8,16,4,4],py:[12,1,2,0,0],pz:[0,1,0,2,-1],nx:[11,22,11,23,23],ny:[2,0,1,1,5],nz:[1,0,1,0,0]},{size:3,px:[11,17,17],py:[6,11,12],pz:[0,0,0],nx:[15,1,11],ny:[9,1,1],nz:[0,-1,-1]}],alpha:[-2.15689,2.15689,-1.718246,1.718246,-.9651329,.9651329,-.994809,.994809,-.8802466,.8802466,-.8486741,.8486741,-.8141777,.8141777]},{count:13,threshold:-5.7744,feature:[{size:5,px:[6,10,3,12,14],py:[5,3,1,2,2],pz:[1,0,2,0,0],nx:[3,4,14,8,4],ny:[5,4,8,4,2],nz:[2,1,0,1,2]},{size:5,px:[10,6,11,5,12],py:[4,13,4,2,4],pz:[0,0,0,1,0],nx:[1,4,8,1,1],ny:[2,4,4,4,3],nz:[0,1,1,0,0]},{size:3,px:[18,6,12],py:[12,4,8],pz:[0,1,0],nx:[7,4,8],ny:[4,2,4],nz:[1,-1,-1]},{size:5,px:[7,5,6,3,17],py:[13,12,3,8,13],pz:[0,0,1,1,0],nx:[3,3,0,1,8],ny:[4,5,5,10,4],nz:[1,-1,-1,-1,-1]},{size:5,px:[16,7,16,7,7],py:[1,1,2,0,0],pz:[0,1,0,1,-1],nx:[23,23,23,11,5],ny:[2,14,1,2,1],nz:[0,0,0,1,2]},{size:3,px:[9,18,16],py:[7,14,2],pz:[1,0,-1],nx:[8,4,9],ny:[10,2,4],nz:[1,2,1]},{size:4,px:[3,16,1,22],py:[7,4,5,11],pz:[1,-1,-1,-1],nx:[3,9,4,2],ny:[4,9,7,5],nz:[1,0,1,2]},{size:5,px:[4,7,8,8,9],py:[0,2,2,1,1],pz:[1,0,0,0,0],nx:[0,0,1,0,0],ny:[15,16,19,0,14],nz:[0,0,0,1,0]},{size:5,px:[4,4,7,8,12],py:[2,5,6,7,10],pz:[2,2,1,1,0],nx:[8,5,10,0,0],ny:[4,2,5,3,14],nz:[1,-1,-1,-1,-1]},{size:2,px:[11,0],py:[13,4],pz:[0,-1],nx:[3,14],ny:[4,16],nz:[1,0]},{size:5,px:[17,8,18,4,4],py:[3,1,3,0,0],pz:[0,1,0,2,-1],nx:[21,22,5,11,22],ny:[0,1,0,1,2],nz:[0,0,2,1,0]},{size:4,px:[7,8,2,11],py:[13,12,2,7],pz:[0,0,2,0],nx:[4,0,23,3],ny:[4,1,1,11],nz:[1,-1,-1,-1]},{size:5,px:[4,18,8,9,15],py:[4,16,7,7,23],pz:[2,0,1,1,0],nx:[0,1,1,1,1],ny:[10,21,23,22,22],nz:[1,0,0,0,-1]}],alpha:[-1.956565,1.956565,-1.262438,1.262438,-1.056941,1.056941,-.9712509,.9712509,-.8261028,.8261028,-.8456506,.8456506,-.6652113,.6652113,-.6026287,.6026287,-.6915425,.6915425,-.5539286,.5539286,-.5515072,.5515072,-.6685884,.6685884,-.465607,.465607]},{count:20,threshold:-5.606853,feature:[{size:5,px:[17,11,6,14,9],py:[13,4,4,3,3],pz:[0,0,1,0,0],nx:[14,4,8,7,8],ny:[8,4,4,4,8],nz:[0,1,1,1,0]},{size:5,px:[3,9,10,11,11],py:[7,2,2,3,3],pz:[1,0,0,0,-1],nx:[3,8,4,2,5],ny:[4,4,10,2,8],nz:[1,1,1,2,1]},{size:5,px:[12,12,12,5,12],py:[12,9,10,12,11],pz:[0,0,0,0,0],nx:[0,0,0,0,0],ny:[2,1,3,0,0],nz:[0,0,0,0,-1]},{size:5,px:[9,18,9,9,12],py:[7,14,19,5,11],pz:[1,-1,-1,-1,-1],nx:[23,4,23,23,8],ny:[13,5,14,16,4],nz:[0,2,0,0,1]},{size:5,px:[12,12,12,6,1],py:[13,11,12,6,5],pz:[0,0,0,-1,-1],nx:[4,6,8,4,9],ny:[2,8,4,4,4],nz:[2,1,1,1,1]},{size:4,px:[12,11,11,6],py:[5,5,6,13],pz:[0,0,0,0],nx:[8,3,2,8],ny:[4,4,17,2],nz:[1,1,-1,-1]},{size:5,px:[3,14,12,15,13],py:[0,2,2,2,2],pz:[2,0,0,0,0],nx:[22,23,22,23,7],ny:[0,3,1,2,4],nz:[0,0,0,0,1]},{size:5,px:[16,15,18,19,9],py:[12,11,12,12,9],pz:[0,0,0,0,1],nx:[8,2,22,23,21],ny:[4,1,1,2,20],nz:[1,-1,-1,-1,-1]},{size:3,px:[4,7,7],py:[0,2,2],pz:[1,0,-1],nx:[1,2,2],ny:[2,0,2],nz:[1,0,0]},{size:3,px:[4,11,11],py:[6,9,8],pz:[1,0,0],nx:[9,2,8],ny:[9,4,5],nz:[0,-1,-1]},{size:4,px:[2,7,6,6],py:[4,23,21,22],pz:[2,0,0,0],nx:[9,3,8,17],ny:[21,2,5,1],nz:[0,-1,-1,-1]},{size:2,px:[2,8],py:[4,12],pz:[2,0],nx:[3,0],ny:[4,4],nz:[1,-1]},{size:5,px:[4,5,1,8,4],py:[15,12,3,23,12],pz:[0,0,2,0,0],nx:[0,0,0,0,0],ny:[23,10,22,21,11],nz:[0,1,0,0,-1]},{size:2,px:[21,5],py:[13,4],pz:[0,2],nx:[23,4],ny:[23,5],nz:[0,-1]},{size:2,px:[15,17],py:[2,3],pz:[0,0],nx:[19,20],ny:[2,1],nz:[0,0]},{size:5,px:[12,1,8,17,4],py:[14,2,13,6,12],pz:[0,-1,-1,-1,-1],nx:[8,13,15,15,7],ny:[10,9,15,14,8],nz:[1,0,0,0,1]},{size:2,px:[8,5],py:[7,4],pz:[1,-1],nx:[4,13],ny:[2,21],nz:[2,0]},{size:2,px:[3,4],py:[7,0],pz:[1,-1],nx:[4,2],ny:[7,5],nz:[1,2]},{size:4,px:[4,14,3,11],py:[3,23,2,5],pz:[2,0,2,0],nx:[7,8,2,16],ny:[8,0,1,15],nz:[0,-1,-1,-1]},{size:2,px:[9,8],py:[0,0],pz:[0,0],nx:[2,2],ny:[3,5],nz:[2,2]}],alpha:[-1.95797,1.95797,-1.225984,1.225984,-.8310246,.8310246,-.8315741,.8315741,-.7973616,.7973616,-.7661959,.7661959,-.6042118,.6042118,-.6506833,.6506833,-.4808219,.4808219,-.6079504,.6079504,-.5163994,.5163994,-.5268142,.5268142,-.4935685,.4935685,-.4427544,.4427544,-.4053949,.4053949,-.4701274,.4701274,-.4387648,.4387648,-.4305499,.4305499,-.4042607,.4042607,-.4372088,.4372088]},{count:22,threshold:-5.679317,feature:[{size:5,px:[11,3,17,14,13],py:[4,0,13,2,3],pz:[0,2,0,0,0],nx:[7,4,14,23,11],ny:[8,4,8,4,0],nz:[1,1,0,0,1]},{size:5,px:[7,12,6,12,12],py:[12,8,3,10,9],pz:[0,0,1,0,0],nx:[4,9,8,15,15],ny:[4,8,4,8,8],nz:[1,0,1,0,-1]},{size:3,px:[4,2,10],py:[1,4,1],pz:[1,2,0],nx:[2,3,8],ny:[5,4,4],nz:[2,1,-1]},{size:5,px:[3,17,6,6,16],py:[2,12,4,14,12],pz:[2,0,1,0,0],nx:[8,3,7,5,15],ny:[4,4,4,4,8],nz:[1,1,-1,-1,-1]},{size:5,px:[5,6,7,4,8],py:[3,3,3,1,3],pz:[0,0,0,1,0],nx:[0,0,0,0,1],ny:[5,4,3,2,0],nz:[0,0,0,0,0]},{size:3,px:[18,9,0],py:[14,7,0],pz:[0,1,-1],nx:[8,14,8],ny:[10,9,4],nz:[1,0,1]},{size:2,px:[9,5],py:[18,13],pz:[0,0],nx:[10,3],ny:[16,4],nz:[0,-1]},{size:5,px:[11,11,11,11,6],py:[10,12,11,13,6],pz:[0,0,0,0,-1],nx:[5,21,22,22,22],ny:[4,22,17,19,18],nz:[2,0,0,0,0]},{size:4,px:[8,9,15,4],py:[7,7,23,4],pz:[1,1,0,2],nx:[8,5,0,3],ny:[4,18,4,9],nz:[1,-1,-1,-1]},{size:5,px:[11,10,12,11,11],py:[4,4,4,5,5],pz:[0,0,0,0,-1],nx:[4,6,8,2,8],ny:[4,9,9,2,4],nz:[1,1,0,2,1]},{size:5,px:[2,2,3,3,4],py:[10,9,14,13,15],pz:[1,1,0,0,0],nx:[0,0,0,0,0],ny:[5,9,10,19,18],nz:[2,1,1,0,-1]},{size:2,px:[11,11],py:[13,12],pz:[0,0],nx:[9,2],ny:[15,2],nz:[0,-1]},{size:5,px:[2,4,3,3,4],py:[5,11,6,9,12],pz:[1,0,1,0,0],nx:[6,2,11,11,0],ny:[9,1,5,20,18],nz:[0,-1,-1,-1,-1]},{size:5,px:[18,9,17,19,16],py:[2,0,2,2,1],pz:[0,1,0,0,0],nx:[22,23,11,23,23],ny:[0,2,0,1,1],nz:[0,0,1,0,-1]},{size:5,px:[5,5,6,7,6],py:[17,16,15,23,22],pz:[0,0,0,0,0],nx:[7,6,2,5,23],ny:[8,1,2,3,1],nz:[0,-1,-1,-1,-1]},{size:5,px:[12,12,11,10,6],py:[14,13,18,4,22],pz:[0,-1,-1,-1,-1],nx:[3,2,4,1,2],ny:[19,4,23,13,16],nz:[0,0,0,0,0]},{size:4,px:[11,16,11,17],py:[7,11,8,12],pz:[0,0,0,0],nx:[7,14,10,4],ny:[4,7,10,4],nz:[1,0,-1,-1]},{size:2,px:[3,3],py:[8,7],pz:[1,1],nx:[4,2],ny:[10,2],nz:[1,-1]},{size:2,px:[3,9],py:[0,1],pz:[1,0],nx:[4,5],ny:[1,0],nz:[0,0]},{size:2,px:[14,16],py:[3,3],pz:[0,0],nx:[9,14],ny:[4,21],nz:[1,0]},{size:2,px:[9,1],py:[7,1],pz:[1,-1],nx:[8,9],ny:[7,4],nz:[1,1]},{size:2,px:[1,0],py:[8,3],pz:[0,2],nx:[20,0],ny:[3,3],nz:[0,-1]}],alpha:[-1.581077,1.581077,-1.389689,1.389689,-.8733094,.8733094,-.8525177,.8525177,-.7416304,.7416304,-.6609002,.6609002,-.7119043,.7119043,-.6204438,.6204438,-.6638519,.6638519,-.5518876,.5518876,-.4898991,.4898991,-.5508243,.5508243,-.4635525,.4635525,-.5163159,.5163159,-.4495338,.4495338,-.4515036,.4515036,-.5130473,.5130473,-.4694233,.4694233,-.4022514,.4022514,-.405569,.405569,-.4151817,.4151817,-.3352302,.3352302]},{count:32,threshold:-5.363782,feature:[{size:5,px:[12,9,6,8,14],py:[4,2,13,3,3],pz:[0,0,0,0,0],nx:[0,15,0,9,5],ny:[2,7,3,8,8],nz:[0,0,0,0,1]},{size:5,px:[13,16,3,6,11],py:[3,13,1,4,3],pz:[0,0,2,1,0],nx:[7,4,8,14,14],ny:[4,4,4,8,8],nz:[1,1,1,0,-1]},{size:5,px:[10,19,18,19,19],py:[6,13,13,12,12],pz:[1,0,0,0,-1],nx:[23,5,23,23,11],ny:[12,2,13,14,8],nz:[0,2,0,0,1]},{size:5,px:[12,12,12,12,6],py:[11,13,12,10,6],pz:[0,0,0,0,1],nx:[6,8,3,9,9],ny:[8,4,4,4,4],nz:[1,1,1,1,-1]},{size:5,px:[5,3,5,8,11],py:[12,8,3,11,8],pz:[0,1,1,0,0],nx:[4,0,1,1,9],ny:[4,3,4,3,4],nz:[1,-1,-1,-1,-1]},{size:5,px:[13,3,12,14,12],py:[1,0,1,2,3],pz:[0,2,0,0,0],nx:[7,9,8,4,4],ny:[5,4,10,2,2],nz:[1,1,1,2,-1]},{size:5,px:[18,16,12,15,8],py:[12,23,7,11,8],pz:[0,0,0,0,1],nx:[8,6,10,12,4],ny:[4,4,10,6,3],nz:[1,-1,-1,-1,-1]},{size:5,px:[4,4,5,2,2],py:[13,14,14,7,7],pz:[0,0,0,1,-1],nx:[0,0,0,0,1],ny:[15,4,14,13,17],nz:[0,2,0,0,0]},{size:2,px:[9,9],py:[7,7],pz:[1,-1],nx:[4,7],ny:[5,8],nz:[2,1]},{size:5,px:[3,4,6,5,4],py:[2,2,14,6,9],pz:[1,1,0,1,1],nx:[23,23,23,23,11],ny:[0,3,2,1,0],nz:[0,0,0,0,-1]},{size:3,px:[10,2,3],py:[23,4,7],pz:[0,2,1],nx:[10,21,23],ny:[21,9,2],nz:[0,-1,-1]},{size:5,px:[20,21,21,10,12],py:[13,12,8,8,12],pz:[0,0,0,1,0],nx:[8,16,3,3,11],ny:[4,8,4,3,0],nz:[1,-1,-1,-1,-1]},{size:2,px:[2,21],py:[4,12],pz:[2,-1],nx:[2,3],ny:[5,4],nz:[2,1]},{size:5,px:[8,5,6,8,7],py:[0,2,1,1,1],pz:[0,0,0,0,0],nx:[3,2,2,2,2],ny:[0,0,1,2,2],nz:[0,0,0,0,-1]},{size:5,px:[11,2,2,11,10],py:[10,12,8,11,12],pz:[0,0,0,0,0],nx:[3,5,2,4,2],ny:[4,1,4,2,2],nz:[1,-1,-1,-1,-1]},{size:4,px:[15,16,8,17],py:[2,1,0,2],pz:[0,0,1,0],nx:[19,20,0,8],ny:[1,2,11,10],nz:[0,0,-1,-1]},{size:2,px:[17,16],py:[12,12],pz:[0,0],nx:[8,9],ny:[5,1],nz:[1,-1]},{size:4,px:[11,11,0,0],py:[12,13,0,0],pz:[0,0,-1,-1],nx:[10,10,9,10],ny:[10,12,13,11],nz:[0,0,0,0]},{size:3,px:[11,10,8],py:[5,2,6],pz:[0,-1,-1],nx:[8,12,4],ny:[4,17,4],nz:[1,0,1]},{size:5,px:[10,21,10,20,20],py:[11,13,7,13,14],pz:[1,0,1,0,0],nx:[23,23,11,23,17],ny:[23,22,11,21,21],nz:[0,0,1,-1,-1]},{size:2,px:[4,7],py:[3,9],pz:[2,1],nx:[9,23],ny:[4,22],nz:[1,-1]},{size:4,px:[3,2,2,5],py:[11,5,4,20],pz:[1,2,2,0],nx:[4,23,11,23],ny:[10,22,11,21],nz:[1,-1,-1,-1]},{size:2,px:[7,5],py:[13,4],pz:[0,-1],nx:[4,4],ny:[8,6],nz:[1,1]},{size:2,px:[2,5],py:[4,9],pz:[2,1],nx:[10,10],ny:[16,16],nz:[0,-1]},{size:2,px:[4,2],py:[6,3],pz:[1,2],nx:[3,0],ny:[4,0],nz:[1,-1]},{size:5,px:[7,3,12,13,6],py:[11,5,23,23,7],pz:[1,2,0,0,1],nx:[1,0,0,0,0],ny:[23,20,19,21,21],nz:[0,0,0,0,-1]},{size:5,px:[0,0,0,0,0],py:[10,9,6,13,13],pz:[0,0,1,0,-1],nx:[8,8,4,4,9],ny:[4,11,5,4,5],nz:[1,1,2,2,1]},{size:2,px:[9,18],py:[8,15],pz:[1,0],nx:[15,4],ny:[15,2],nz:[0,-1]},{size:2,px:[5,13],py:[6,17],pz:[1,-1],nx:[1,2],ny:[2,4],nz:[2,1]},{size:5,px:[19,10,20,18,18],py:[2,0,2,2,2],pz:[0,1,0,0,-1],nx:[22,23,22,11,23],ny:[1,3,0,1,2],nz:[0,0,0,1,0]},{size:5,px:[4,2,2,2,6],py:[7,2,5,4,14],pz:[1,2,2,2,0],nx:[16,7,9,15,23],ny:[8,0,3,11,2],nz:[0,-1,-1,-1,-1]},{size:5,px:[10,10,9,9,5],py:[2,0,0,1,0],pz:[0,0,0,0,1],nx:[3,2,3,2,2],ny:[11,3,9,5,5],nz:[1,2,1,2,-1]}],alpha:[-1.490426,1.490426,-1.21428,1.21428,-.8124863,.8124863,-.7307594,.7307594,-.7377259,.7377259,-.5982859,.5982859,-.6451736,.6451736,-.6117417,.6117417,-.5438949,.5438949,-.4563701,.4563701,-.4975362,.4975362,-.4707373,.4707373,-.5013868,.5013868,-.5139018,.5139018,-.4728007,.4728007,-.4839748,.4839748,-.4852528,.4852528,-.5768956,.5768956,-.3635091,.3635091,-.419009,.419009,-.3854715,.3854715,-.3409591,.3409591,-.3440222,.3440222,-.3375895,.3375895,-.3367032,.3367032,-.3708106,.3708106,-.3260956,.3260956,-.3657681,.3657681,-.35188,.35188,-.3845758,.3845758,-.2832236,.2832236,-.2865156,.2865156]},{count:45,threshold:-5.479836,feature:[{size:5,px:[15,6,17,6,9],py:[2,13,13,4,3],pz:[0,0,0,1,0],nx:[3,9,4,8,14],ny:[5,8,4,4,8],nz:[2,0,1,1,0]},{size:5,px:[9,8,11,6,7],py:[1,2,3,14,2],pz:[0,0,0,0,0],nx:[0,0,4,0,0],ny:[4,2,4,1,0],nz:[0,0,1,0,0]},{size:5,px:[2,2,11,11,11],py:[2,4,10,8,6],pz:[2,2,0,0,0],nx:[8,4,3,23,23],ny:[4,4,4,16,18],nz:[1,1,-1,-1,-1]},{size:5,px:[18,16,17,15,9],py:[2,2,2,2,1],pz:[0,0,0,0,1],nx:[22,22,21,23,23],ny:[1,2,0,5,4],nz:[0,0,0,0,0]},{size:5,px:[15,3,17,18,6],py:[11,2,11,11,4],pz:[0,2,0,0,1],nx:[3,8,1,4,23],ny:[4,4,3,9,4],nz:[1,1,-1,-1,-1]},{size:2,px:[4,5],py:[4,0],pz:[2,-1],nx:[7,4],ny:[8,5],nz:[1,2]},{size:2,px:[11,5],py:[12,5],pz:[0,-1],nx:[4,9],ny:[10,15],nz:[1,0]},{size:4,px:[2,2,7,1],py:[7,7,3,4],pz:[1,-1,-1,-1],nx:[0,2,1,2],ny:[6,20,14,16],nz:[1,0,0,0]},{size:5,px:[14,12,12,13,9],py:[23,5,6,5,7],pz:[0,0,0,0,1],nx:[8,18,2,8,14],ny:[4,9,0,12,7],nz:[1,-1,-1,-1,-1]},{size:5,px:[3,10,13,11,9],py:[0,3,2,3,2],pz:[2,0,0,0,0],nx:[3,11,22,22,22],ny:[2,6,15,2,0],nz:[2,1,0,0,0]},{size:5,px:[8,7,5,8,5],py:[23,12,12,12,13],pz:[0,0,0,0,0],nx:[3,18,3,1,22],ny:[4,4,4,2,0],nz:[1,-1,-1,-1,-1]},{size:5,px:[22,22,22,21,22],py:[9,11,10,14,12],pz:[0,0,0,0,0],nx:[23,23,11,1,22],ny:[23,23,11,2,0],nz:[0,-1,-1,-1,-1]},{size:2,px:[9,3],py:[18,7],pz:[0,1],nx:[10,8],ny:[16,19],nz:[0,-1]},{size:5,px:[10,12,11,6,6],py:[4,4,4,2,2],pz:[0,0,0,1,-1],nx:[3,8,7,8,4],ny:[5,4,4,10,4],nz:[2,1,1,0,1]},{size:4,px:[12,12,4,15],py:[13,12,0,11],pz:[0,0,-1,-1],nx:[13,14,13,14],ny:[9,12,10,13],nz:[0,0,0,0]},{size:2,px:[4,4],py:[3,3],pz:[2,-1],nx:[9,4],ny:[4,2],nz:[1,2]},{size:3,px:[9,7,0],py:[7,5,5],pz:[1,-1,-1],nx:[4,15,9],ny:[5,14,9],nz:[2,0,1]},{size:5,px:[15,20,7,10,16],py:[17,12,6,4,23],pz:[0,0,1,1,0],nx:[1,2,2,1,1],ny:[3,0,1,2,2],nz:[0,0,0,0,-1]},{size:5,px:[2,1,1,11,2],py:[16,4,5,12,14],pz:[0,1,1,0,0],nx:[4,6,3,19,1],ny:[4,2,5,19,2],nz:[1,-1,-1,-1,-1]},{size:3,px:[15,14,14],py:[1,1,0],pz:[0,0,0],nx:[4,8,4],ny:[3,4,2],nz:[2,1,2]},{size:5,px:[2,3,1,2,7],py:[8,12,4,9,13],pz:[1,0,2,1,0],nx:[1,1,0,0,0],ny:[21,20,18,17,9],nz:[0,0,0,0,1]},{size:5,px:[17,15,17,16,16],py:[12,12,22,23,12],pz:[0,0,0,0,0],nx:[7,3,16,1,0],ny:[8,6,8,3,9],nz:[0,-1,-1,-1,-1]},{size:5,px:[9,17,18,18,18],py:[6,12,12,13,13],pz:[1,0,0,0,-1],nx:[23,23,20,11,11],ny:[12,13,23,7,8],nz:[0,0,0,1,1]},{size:2,px:[2,4],py:[4,7],pz:[2,1],nx:[4,4],ny:[10,5],nz:[1,-1]},{size:4,px:[4,22,19,12],py:[5,8,14,9],pz:[2,0,0,0],nx:[8,4,4,2],ny:[4,4,1,2],nz:[1,-1,-1,-1]},{size:2,px:[3,21],py:[7,14],pz:[1,-1],nx:[4,2],ny:[7,2],nz:[1,2]},{size:3,px:[7,4,17],py:[3,1,6],pz:[0,1,-1],nx:[3,4,5],ny:[0,2,1],nz:[1,0,0]},{size:4,px:[15,7,14,0],py:[3,1,3,7],pz:[0,1,0,-1],nx:[8,18,17,18],ny:[0,1,1,2],nz:[1,0,0,0]},{size:5,px:[12,12,12,12,6],py:[10,11,12,13,6],pz:[0,0,0,0,-1],nx:[8,15,15,4,8],ny:[10,10,9,2,4],nz:[0,0,0,2,1]},{size:2,px:[17,12],py:[13,11],pz:[0,-1],nx:[9,8],ny:[4,10],nz:[1,1]},{size:5,px:[0,0,0,0,0],py:[10,9,12,11,4],pz:[0,0,0,0,1],nx:[8,9,8,9,9],ny:[10,4,4,5,5],nz:[1,1,1,1,-1]},{size:3,px:[7,0,1],py:[1,9,8],pz:[0,-1,-1],nx:[4,3,3],ny:[7,15,16],nz:[0,0,0]},{size:2,px:[4,7],py:[15,23],pz:[0,0],nx:[9,18],ny:[21,3],nz:[0,-1]},{size:5,px:[17,4,19,18,8],py:[12,3,12,17,6],pz:[0,2,0,0,1],nx:[23,23,11,22,16],ny:[0,1,0,21,-1],nz:[0,0,-1,-1,-1]},{size:2,px:[7,4],py:[13,5],pz:[0,-1],nx:[4,2],ny:[4,2],nz:[1,2]},{size:5,px:[21,20,10,10,21],py:[13,14,10,7,11],pz:[0,0,1,1,0],nx:[4,4,4,5,5],ny:[18,17,19,20,20],nz:[0,0,0,0,-1]},{size:2,px:[2,3],py:[11,13],pz:[1,0],nx:[12,4],ny:[17,17],nz:[0,-1]},{size:2,px:[11,5],py:[13,1],pz:[0,-1],nx:[1,2],ny:[1,4],nz:[2,1]},{size:2,px:[15,7],py:[17,7],pz:[0,1],nx:[14,4],ny:[15,3],nz:[0,-1]},{size:2,px:[3,11],py:[3,8],pz:[2,0],nx:[13,13],ny:[9,8],nz:[0,0]},{size:2,px:[8,3],py:[11,2],pz:[0,-1],nx:[8,4],ny:[9,5],nz:[0,1]},{size:3,px:[12,6,9],py:[9,10,11],pz:[0,-1,-1],nx:[2,1,5],ny:[2,1,6],nz:[2,2,1]},{size:4,px:[4,5,5,1],py:[11,11,11,3],pz:[1,0,1,2],nx:[0,0,5,4],ny:[23,22,0,0],nz:[0,0,-1,-1]},{size:5,px:[15,7,17,15,16],py:[1,0,2,2,0],pz:[0,1,0,0,0],nx:[7,4,7,4,8],ny:[5,2,4,3,4],nz:[1,2,1,2,-1]},{size:2,px:[6,12],py:[11,23],pz:[1,0],nx:[12,4],ny:[21,2],nz:[0,-1]}],alpha:[-1.5358,1.5358,-.8580514,.8580514,-.862521,.862521,-.71775,.71775,-.6832222,.6832222,-.5736298,.5736298,-.5028217,.5028217,-.5091788,.5091788,-.579194,.579194,-.4924942,.4924942,-.5489055,.5489055,-.452819,.452819,-.4748324,.4748324,-.4150403,.4150403,-.4820464,.4820464,-.4840212,.4840212,-.3941872,.3941872,-.3663507,.3663507,-.3814835,.3814835,-.3936426,.3936426,-.304997,.304997,-.3604256,.3604256,-.3974041,.3974041,-.4203486,.4203486,-.3174435,.3174435,-.3426336,.3426336,-.449215,.449215,-.3538784,.3538784,-.3679703,.3679703,-.3985452,.3985452,-.2884028,.2884028,-.2797264,.2797264,-.2664214,.2664214,-.2484857,.2484857,-.2581492,.2581492,-.2943778,.2943778,-.2315507,.2315507,-.2979337,.2979337,-.2976173,.2976173,-.2847965,.2847965,-.2814763,.2814763,-.2489068,.2489068,-.2632427,.2632427,-.3308292,.3308292,-.279017,.279017]},{count:61,threshold:-5.239104,feature:[{size:5,px:[8,8,11,15,6],py:[3,6,5,3,4],pz:[0,1,0,0,1],nx:[3,9,14,8,4],ny:[4,8,8,7,2],nz:[1,0,0,0,2]},{size:5,px:[11,12,10,6,9],py:[3,3,2,13,2],pz:[0,0,0,0,0],nx:[0,0,5,2,2],ny:[13,1,8,5,2],nz:[0,1,1,2,2]},{size:5,px:[11,5,11,11,4],py:[9,13,10,11,6],pz:[0,0,0,0,1],nx:[4,15,9,3,3],ny:[5,8,9,4,4],nz:[1,0,0,1,-1]},{size:5,px:[15,16,8,17,17],py:[1,2,0,2,2],pz:[0,0,1,0,-1],nx:[23,23,23,23,23],ny:[4,0,2,3,1],nz:[0,0,0,0,0]},{size:4,px:[9,18,17,18],py:[7,13,13,14],pz:[1,0,0,0],nx:[9,7,4,8],ny:[4,10,2,4],nz:[1,1,2,1]},{size:5,px:[12,11,12,12,6],py:[6,5,14,5,3],pz:[0,0,0,0,1],nx:[13,8,14,7,7],ny:[16,4,7,4,4],nz:[0,1,0,1,-1]},{size:5,px:[12,6,3,7,12],py:[7,12,7,11,8],pz:[0,0,1,0,0],nx:[16,4,4,4,7],ny:[8,4,4,4,4],nz:[0,1,-1,-1,-1]},{size:5,px:[6,4,5,3,3],py:[2,3,2,0,0],pz:[0,0,0,1,-1],nx:[1,0,1,0,0],ny:[0,3,1,1,2],nz:[0,0,0,1,0]},{size:2,px:[15,9],py:[11,6],pz:[0,1],nx:[14,5],ny:[9,11],nz:[0,-1]},{size:5,px:[10,19,19,10,20],py:[7,20,14,6,12],pz:[1,0,0,1,0],nx:[23,22,11,23,23],ny:[21,23,9,20,20],nz:[0,0,1,0,-1]},{size:5,px:[1,1,5,1,1],py:[8,6,6,9,4],pz:[0,1,1,0,2],nx:[3,3,3,2,5],ny:[4,4,2,5,4],nz:[1,-1,-1,-1,-1]},{size:5,px:[13,12,3,11,11],py:[2,2,0,1,2],pz:[0,0,2,0,0],nx:[3,6,8,4,3],ny:[2,9,4,4,5],nz:[2,1,1,1,-1]},{size:3,px:[12,12,6],py:[11,12,9],pz:[0,0,-1],nx:[2,1,9],ny:[6,1,14],nz:[0,2,0]},{size:5,px:[6,3,17,16,16],py:[4,2,14,23,13],pz:[1,2,0,0,0],nx:[8,10,21,5,1],ny:[4,10,11,0,0],nz:[1,-1,-1,-1,-1]},{size:5,px:[5,6,1,3,3],py:[15,14,4,7,7],pz:[0,0,2,1,-1],nx:[1,0,0,1,1],ny:[5,8,7,18,17],nz:[2,1,1,0,0]},{size:4,px:[6,12,5,3],py:[6,12,2,7],pz:[1,-1,-1,-1],nx:[14,13,13,7],ny:[12,10,9,8],nz:[0,0,0,1]},{size:2,px:[3,6],py:[7,15],pz:[1,0],nx:[3,3],ny:[4,2],nz:[1,-1]},{size:4,px:[11,10,12,2],py:[18,18,18,3],pz:[0,0,0,2],nx:[11,17,4,16],ny:[16,4,4,21],nz:[0,-1,-1,-1]},{size:5,px:[9,8,8,5,2],py:[4,4,4,2,3],pz:[0,0,-1,-1,-1],nx:[2,2,4,4,2],ny:[1,2,10,5,4],nz:[2,2,1,1,2]},{size:4,px:[8,18,14,18],py:[7,16,23,15],pz:[1,0,0,0],nx:[14,3,1,0],ny:[21,1,9,3],nz:[0,-1,-1,-1]},{size:2,px:[12,3],py:[9,5],pz:[0,2],nx:[8,1],ny:[4,4],nz:[1,-1]},{size:2,px:[9,9],py:[1,1],pz:[1,-1],nx:[19,20],ny:[1,2],nz:[0,0]},{size:3,px:[10,10,10],py:[6,6,8],pz:[1,-1,-1],nx:[22,21,22],ny:[13,18,12],nz:[0,0,0]},{size:2,px:[2,2],py:[4,1],pz:[2,-1],nx:[2,4],ny:[5,4],nz:[2,1]},{size:5,px:[21,21,21,21,21],py:[19,17,18,15,16],pz:[0,0,0,0,0],nx:[11,21,6,1,21],ny:[17,1,10,0,2],nz:[0,-1,-1,-1,-1]},{size:5,px:[7,3,4,4,4],py:[23,13,14,16,13],pz:[0,0,0,0,0],nx:[21,22,22,22,22],ny:[23,21,20,19,19],nz:[0,0,0,0,-1]},{size:2,px:[11,8],py:[6,6],pz:[0,1],nx:[8,4],ny:[4,2],nz:[1,-1]},{size:5,px:[23,23,11,23,23],py:[8,12,6,11,10],pz:[0,0,1,0,0],nx:[4,4,3,8,8],ny:[3,8,4,4,4],nz:[1,1,1,1,-1]},{size:5,px:[8,9,4,7,10],py:[2,1,0,2,1],pz:[0,0,1,0,0],nx:[5,5,6,4,4],ny:[1,0,0,2,1],nz:[0,0,0,0,-1]},{size:2,px:[12,2],py:[13,6],pz:[0,-1],nx:[15,9],ny:[15,4],nz:[0,1]},{size:2,px:[2,4],py:[4,9],pz:[2,1],nx:[3,13],ny:[4,1],nz:[1,-1]},{size:3,px:[3,6,2],py:[10,22,4],pz:[1,0,2],nx:[4,2,1],ny:[10,4,3],nz:[1,-1,-1]},{size:2,px:[1,0],py:[9,7],pz:[0,1],nx:[0,0],ny:[23,22],nz:[0,0]},{size:2,px:[8,7],py:[0,1],pz:[0,0],nx:[4,4],ny:[8,8],nz:[1,-1]},{size:5,px:[7,4,4,6,3],py:[8,4,5,5,3],pz:[1,2,2,1,2],nx:[1,0,2,0,0],ny:[1,0,0,2,4],nz:[0,2,0,1,-1]},{size:3,px:[10,4,4],py:[6,1,5],pz:[1,-1,-1],nx:[5,23,22],ny:[4,13,7],nz:[2,0,0]},{size:2,px:[2,2],py:[6,5],pz:[1,1],nx:[6,0],ny:[9,2],nz:[0,-1]},{size:5,px:[0,1,1,0,0],py:[5,18,19,16,6],pz:[2,0,0,0,1],nx:[5,9,4,8,8],ny:[8,7,3,7,7],nz:[1,0,1,0,-1]},{size:2,px:[13,12],py:[23,23],pz:[0,0],nx:[7,6],ny:[8,10],nz:[0,-1]},{size:2,px:[14,19],py:[12,8],pz:[0,0],nx:[18,5],ny:[8,11],nz:[0,-1]},{size:5,px:[2,8,6,4,4],py:[3,23,14,6,9],pz:[2,0,0,1,1],nx:[0,0,0,0,1],ny:[21,20,5,19,23],nz:[0,0,2,0,0]},{size:2,px:[11,22],py:[4,14],pz:[0,-1],nx:[3,8],ny:[1,4],nz:[2,1]},{size:5,px:[1,1,0,1,1],py:[6,8,3,12,7],pz:[1,1,2,0,1],nx:[21,21,19,10,10],ny:[14,16,23,9,9],nz:[0,0,0,1,-1]},{size:2,px:[10,3],py:[23,2],pz:[0,2],nx:[10,3],ny:[21,5],nz:[0,-1]},{size:2,px:[9,9],py:[7,0],pz:[1,-1],nx:[9,9],ny:[11,10],nz:[1,1]},{size:5,px:[23,11,23,23,23],py:[18,10,19,20,16],pz:[0,1,0,0,0],nx:[3,3,2,3,2],ny:[15,16,10,17,9],nz:[0,0,1,0,-1]},{size:2,px:[9,14],py:[7,18],pz:[1,0],nx:[7,10],ny:[8,8],nz:[1,-1]},{size:2,px:[12,5],py:[6,4],pz:[0,-1],nx:[8,4],ny:[4,2],nz:[1,2]},{size:2,px:[4,5],py:[13,4],pz:[0,-1],nx:[4,4],ny:[17,19],nz:[0,0]},{size:3,px:[2,3,3],py:[11,17,19],pz:[1,0,0],nx:[7,7,4],ny:[8,8,5],nz:[1,-1,-1]},{size:2,px:[6,6],py:[6,5],pz:[1,-1],nx:[2,9],ny:[4,12],nz:[1,0]},{size:5,px:[8,8,9,2,2],py:[18,13,12,3,3],pz:[0,0,0,2,-1],nx:[23,11,23,11,11],ny:[13,6,14,7,8],nz:[0,1,0,1,1]},{size:2,px:[9,11],py:[6,13],pz:[1,-1],nx:[4,8],ny:[2,4],nz:[2,1]},{size:2,px:[8,10],py:[0,6],pz:[1,1],nx:[9,4],ny:[6,7],nz:[1,-1]},{size:3,px:[3,10,9],py:[8,6,0],pz:[1,-1,-1],nx:[2,2,2],ny:[15,16,9],nz:[0,0,1]},{size:3,px:[14,15,0],py:[2,2,5],pz:[0,0,-1],nx:[17,17,18],ny:[0,1,2],nz:[0,0,0]},{size:2,px:[11,5],py:[14,1],pz:[0,-1],nx:[10,9],ny:[12,14],nz:[0,0]},{size:2,px:[8,8],py:[7,8],pz:[1,1],nx:[8,4],ny:[4,4],nz:[1,-1]},{size:5,px:[0,0,0,0,0],py:[19,18,10,5,20],pz:[0,0,1,2,0],nx:[4,8,2,4,4],ny:[4,15,5,10,10],nz:[1,0,2,1,-1]},{size:2,px:[7,0],py:[13,18],pz:[0,-1],nx:[4,3],ny:[4,4],nz:[1,1]},{size:5,px:[23,22,22,11,22],py:[16,13,7,6,14],pz:[0,0,0,1,0],nx:[13,7,15,14,14],ny:[6,3,7,6,6],nz:[0,1,0,0,-1]}],alpha:[-1.428861,1.428861,-.8591837,.8591837,-.7734305,.7734305,-.653446,.653446,-.6262547,.6262547,-.5231782,.5231782,-.4984303,.4984303,-.4913187,.4913187,-.4852198,.4852198,-.4906681,.4906681,-.4126248,.4126248,-.4590814,.4590814,-.4653825,.4653825,-.41796,.41796,-.4357392,.4357392,-.4087982,.4087982,-.4594812,.4594812,-.4858794,.4858794,-.371358,.371358,-.3894534,.3894534,-.3127168,.3127168,-.4012654,.4012654,-.3370552,.3370552,-.3534712,.3534712,-.384345,.384345,-.2688805,.2688805,-.3500203,.3500203,-.282712,.282712,-.3742119,.3742119,-.3219074,.3219074,-.2544953,.2544953,-.3355513,.3355513,-.267267,.267267,-.2932047,.2932047,-.2404618,.2404618,-.2354372,.2354372,-.2657955,.2657955,-.2293701,.2293701,-.2708918,.2708918,-.2340181,.2340181,-.2464815,.2464815,-.2944239,.2944239,-.240796,.240796,-.3029642,.3029642,-.2684602,.2684602,-.2495078,.2495078,-.2539708,.2539708,-.2989293,.2989293,-.2391309,.2391309,-.2531372,.2531372,-.250039,.250039,-.2295077,.2295077,-.2526125,.2526125,-.2337182,.2337182,-.1984756,.1984756,-.3089996,.3089996,-.2589053,.2589053,-.296249,.296249,-.245866,.245866,-.2515206,.2515206,-.2637299,.2637299]},{count:80,threshold:-5.185898,feature:[{size:5,px:[12,17,13,10,15],py:[9,13,3,3,2],pz:[0,0,0,0,0],nx:[8,14,6,9,4],ny:[10,9,8,8,2],nz:[1,0,1,0,2]},{size:5,px:[3,11,8,10,9],py:[7,4,3,3,3],pz:[1,0,0,0,0],nx:[2,1,5,0,0],ny:[2,15,8,4,13],nz:[2,0,1,0,0]},{size:5,px:[11,11,11,4,17],py:[7,9,8,6,11],pz:[0,0,0,1,0],nx:[8,8,8,3,0],ny:[4,8,8,8,13],nz:[1,0,-1,-1,-1]},{size:5,px:[14,15,7,16,16],py:[3,3,1,3,3],pz:[0,0,1,0,-1],nx:[23,22,23,22,22],ny:[6,2,14,3,4],nz:[0,0,0,0,0]},{size:4,px:[6,4,7,15],py:[4,2,6,17],pz:[1,2,1,0],nx:[3,8,3,14],ny:[4,4,10,22],nz:[1,1,-1,-1]},{size:3,px:[3,5,22],py:[7,7,5],pz:[1,-1,-1],nx:[2,2,4],ny:[5,2,7],nz:[2,2,1]},{size:5,px:[7,6,5,6,3],py:[0,1,2,2,0],pz:[0,0,0,0,1],nx:[0,1,1,0,1],ny:[0,2,1,2,0],nz:[2,0,0,1,0]},{size:5,px:[11,11,11,11,5],py:[11,10,13,12,6],pz:[0,0,0,0,-1],nx:[15,14,5,2,8],ny:[9,8,10,2,10],nz:[0,0,1,2,0]},{size:5,px:[8,5,6,8,7],py:[12,12,12,23,12],pz:[0,0,0,0,0],nx:[3,17,5,2,8],ny:[4,0,10,2,10],nz:[1,-1,-1,-1,-1]},{size:5,px:[10,10,10,19,20],py:[8,10,9,15,13],pz:[1,1,1,0,0],nx:[23,11,5,23,23],ny:[20,10,5,19,19],nz:[0,1,2,0,-1]},{size:5,px:[9,13,3,10,12],py:[2,0,0,1,1],pz:[0,0,2,0,0],nx:[3,3,6,7,7],ny:[5,2,11,4,4],nz:[2,2,1,1,-1]},{size:2,px:[15,7],py:[17,6],pz:[0,1],nx:[14,0],ny:[16,10],nz:[0,-1]},{size:5,px:[17,15,18,12,19],py:[22,12,13,7,15],pz:[0,0,0,0,0],nx:[8,15,6,1,7],ny:[4,8,22,5,4],nz:[1,-1,-1,-1,-1]},{size:5,px:[10,9,18,19,8],py:[2,1,3,3,1],pz:[1,1,0,0,1],nx:[23,23,23,11,11],ny:[0,1,2,0,1],nz:[0,0,0,1,-1]},{size:5,px:[12,23,0,1,8],py:[14,5,0,17,1],pz:[0,-1,-1,-1,-1],nx:[8,14,15,18,14],ny:[10,11,14,19,10],nz:[1,0,0,0,0]},{size:2,px:[4,6],py:[6,13],pz:[1,0],nx:[4,12],ny:[10,14],nz:[1,-1]},{size:5,px:[5,23,11,23,13],py:[3,10,4,11,12],pz:[2,0,1,0,0],nx:[7,4,9,8,8],ny:[4,2,4,4,4],nz:[1,2,1,1,-1]},{size:3,px:[9,5,11],py:[4,2,4],pz:[0,1,-1],nx:[5,2,4],ny:[0,1,2],nz:[0,2,0]},{size:5,px:[5,2,2,5,8],py:[12,4,4,6,13],pz:[0,2,1,1,0],nx:[3,9,4,4,8],ny:[4,0,2,2,4],nz:[1,-1,-1,-1,-1]},{size:3,px:[9,5,22],py:[7,4,20],pz:[1,-1,-1],nx:[8,19,4],ny:[4,18,5],nz:[1,0,2]},{size:5,px:[2,3,3,3,3],py:[10,16,15,14,13],pz:[1,0,0,0,0],nx:[0,0,0,1,0],ny:[10,20,5,23,21],nz:[1,0,2,0,0]},{size:2,px:[12,11],py:[4,18],pz:[0,0],nx:[11,23],ny:[17,13],nz:[0,-1]},{size:2,px:[17,8],py:[16,7],pz:[0,1],nx:[8,3],ny:[4,6],nz:[1,-1]},{size:5,px:[13,5,14,12,3],py:[4,7,4,5,3],pz:[0,1,0,0,1],nx:[21,20,21,21,21],ny:[2,0,4,3,3],nz:[0,0,0,0,-1]},{size:4,px:[20,20,20,10],py:[21,19,20,8],pz:[0,0,0,1],nx:[8,11,0,2],ny:[10,8,1,3],nz:[1,-1,-1,-1]},{size:4,px:[6,7,12,8],py:[12,12,8,11],pz:[0,0,0,0],nx:[9,5,5,18],ny:[9,2,0,20],nz:[0,-1,-1,-1]},{size:3,px:[11,5,9],py:[0,0,0],pz:[0,1,0],nx:[2,6,3],ny:[3,7,4],nz:[2,0,1]},{size:5,px:[18,18,9,17,17],py:[15,14,7,14,14],pz:[0,0,1,0,-1],nx:[21,21,21,22,20],ny:[15,21,17,14,23],nz:[0,0,0,0,0]},{size:5,px:[9,12,12,7,4],py:[4,11,12,6,5],pz:[1,0,0,1,2],nx:[16,11,9,6,20],ny:[8,4,11,10,23],nz:[0,-1,-1,-1,-1]},{size:5,px:[12,11,10,11,11],py:[23,4,4,5,23],pz:[0,0,0,0,0],nx:[11,11,7,3,20],ny:[21,21,11,1,23],nz:[0,-1,-1,-1,-1]},{size:2,px:[12,1],py:[12,3],pz:[0,-1],nx:[10,10],ny:[3,2],nz:[1,1]},{size:5,px:[9,4,15,9,9],py:[8,4,23,7,7],pz:[1,2,0,1,-1],nx:[5,3,3,3,2],ny:[23,19,17,18,15],nz:[0,0,0,0,0]},{size:2,px:[2,0],py:[16,3],pz:[0,2],nx:[9,4],ny:[15,2],nz:[0,-1]},{size:2,px:[2,3],py:[3,7],pz:[2,1],nx:[3,8],ny:[4,10],nz:[1,-1]},{size:3,px:[9,4,3],py:[18,0,14],pz:[0,-1,-1],nx:[3,5,2],ny:[5,8,5],nz:[2,1,2]},{size:3,px:[1,1,10],py:[2,1,7],pz:[1,-1,-1],nx:[0,0,0],ny:[3,5,1],nz:[0,0,1]},{size:4,px:[11,11,5,2],py:[12,13,7,3],pz:[0,0,-1,-1],nx:[5,10,10,9],ny:[6,9,10,13],nz:[1,0,0,0]},{size:2,px:[4,8],py:[3,6],pz:[2,1],nx:[9,1],ny:[4,3],nz:[1,-1]},{size:5,px:[0,0,1,1,0],py:[4,10,12,13,5],pz:[1,0,0,0,1],nx:[4,4,8,7,7],ny:[3,2,10,4,4],nz:[2,2,1,1,-1]},{size:3,px:[3,4,3],py:[1,1,2],pz:[1,-1,-1],nx:[4,5,3],ny:[1,0,2],nz:[0,0,0]},{size:2,px:[9,2],py:[6,4],pz:[1,-1],nx:[8,4],ny:[6,2],nz:[1,2]},{size:5,px:[12,13,15,16,7],py:[1,1,2,2,1],pz:[0,0,0,0,1],nx:[4,4,4,3,7],ny:[2,2,4,2,4],nz:[2,-1,-1,-1,-1]},{size:5,px:[9,3,2,11,5],py:[23,7,4,10,6],pz:[0,1,2,0,1],nx:[21,20,11,21,21],ny:[21,23,8,20,20],nz:[0,0,1,0,-1]},{size:4,px:[12,6,13,12],py:[7,3,5,6],pz:[0,1,0,0],nx:[3,0,5,10],ny:[4,6,5,1],nz:[1,-1,-1,-1]},{size:2,px:[10,4],py:[4,0],pz:[0,-1],nx:[12,11],ny:[2,1],nz:[0,0]},{size:4,px:[2,3,22,5],py:[6,1,18,5],pz:[1,-1,-1,-1],nx:[0,0,0,3],ny:[14,3,12,18],nz:[0,2,0,0]},{size:3,px:[10,20,21],py:[10,18,15],pz:[1,0,0],nx:[15,1,2],ny:[7,0,8],nz:[0,-1,-1]},{size:5,px:[0,0,0,0,0],py:[4,7,13,4,6],pz:[1,1,0,2,1],nx:[5,9,8,4,4],ny:[3,7,7,3,3],nz:[1,0,0,1,-1]},{size:3,px:[13,12,14],py:[2,2,2],pz:[0,0,0],nx:[4,4,4],ny:[2,2,5],nz:[2,-1,-1]},{size:5,px:[5,4,6,2,12],py:[7,9,7,4,10],pz:[0,1,0,2,0],nx:[6,1,2,5,2],ny:[9,2,4,13,4],nz:[0,-1,-1,-1,-1]},{size:2,px:[11,1],py:[12,5],pz:[0,-1],nx:[1,0],ny:[7,2],nz:[0,2]},{size:5,px:[8,8,1,16,6],py:[6,6,4,8,11],pz:[1,-1,-1,-1,-1],nx:[13,5,4,4,13],ny:[12,1,2,5,11],nz:[0,2,2,2,0]},{size:2,px:[5,6],py:[4,14],pz:[1,0],nx:[9,5],ny:[7,1],nz:[0,-1]},{size:2,px:[2,6],py:[4,14],pz:[2,0],nx:[9,2],ny:[15,1],nz:[0,-1]},{size:5,px:[10,19,20,10,9],py:[1,2,3,0,0],pz:[1,0,0,1,-1],nx:[11,23,23,11,23],ny:[0,3,1,1,2],nz:[1,0,0,1,0]},{size:2,px:[2,9],py:[3,12],pz:[2,0],nx:[2,6],ny:[4,6],nz:[1,-1]},{size:5,px:[0,0,0,0,0],py:[4,10,11,9,9],pz:[1,0,0,0,-1],nx:[16,2,17,8,4],ny:[10,2,9,4,4],nz:[0,2,0,1,1]},{size:2,px:[12,0],py:[5,4],pz:[0,-1],nx:[7,8],ny:[4,8],nz:[1,1]},{size:2,px:[21,21],py:[9,10],pz:[0,0],nx:[11,8],ny:[18,8],nz:[0,-1]},{size:2,px:[14,7],py:[23,9],pz:[0,1],nx:[7,13],ny:[10,4],nz:[1,-1]},{size:5,px:[12,12,12,6,2],py:[11,13,12,6,4],pz:[0,0,0,-1,-1],nx:[0,0,0,0,0],ny:[14,13,6,12,11],nz:[0,0,1,0,0]},{size:2,px:[8,9],py:[6,11],pz:[1,-1],nx:[15,15],ny:[11,10],nz:[0,0]},{size:4,px:[4,6,7,2],py:[8,4,23,7],pz:[1,-1,-1,-1],nx:[4,20,19,17],ny:[0,3,1,1],nz:[2,0,0,0]},{size:2,px:[7,0],py:[6,0],pz:[1,-1],nx:[7,4],ny:[8,2],nz:[1,2]},{size:2,px:[10,0],py:[7,0],pz:[1,-1],nx:[15,15],ny:[15,14],nz:[0,0]},{size:5,px:[6,2,5,2,4],py:[23,7,21,8,16],pz:[0,1,0,1,0],nx:[18,2,10,0,11],ny:[9,3,23,5,3],nz:[0,-1,-1,-1,-1]},{size:5,px:[9,9,8,10,4],py:[0,2,2,1,1],pz:[0,0,0,0,1],nx:[4,3,2,2,5],ny:[7,3,4,2,17],nz:[0,1,2,2,0]},{size:2,px:[10,7],py:[5,6],pz:[1,-1],nx:[11,11],ny:[6,5],nz:[1,1]},{size:5,px:[11,11,5,6,11],py:[8,10,5,5,9],pz:[0,0,1,1,0],nx:[13,16,11,14,4],ny:[9,13,11,20,23],nz:[0,-1,-1,-1,-1]},{size:2,px:[7,14],py:[14,22],pz:[0,-1],nx:[3,4],ny:[4,4],nz:[1,1]},{size:2,px:[4,11],py:[4,5],pz:[2,-1],nx:[2,4],ny:[5,7],nz:[2,1]},{size:2,px:[1,0],py:[0,0],pz:[0,1],nx:[0,4],ny:[0,2],nz:[0,-1]},{size:5,px:[11,11,11,4,9],py:[5,5,2,9,23],pz:[0,-1,-1,-1,-1],nx:[11,12,10,9,5],ny:[2,2,2,2,1],nz:[0,0,0,0,1]},{size:3,px:[16,14,15],py:[1,1,0],pz:[0,0,0],nx:[4,7,4],ny:[2,4,4],nz:[2,1,-1]},{size:2,px:[5,0],py:[14,5],pz:[0,-1],nx:[2,4],ny:[5,17],nz:[2,0]},{size:5,px:[18,7,16,19,4],py:[13,6,23,13,3],pz:[0,1,0,0,2],nx:[5,2,3,4,4],ny:[1,1,4,1,3],nz:[0,1,0,0,0]},{size:2,px:[8,8],py:[7,6],pz:[1,-1],nx:[8,4],ny:[4,2],nz:[1,2]},{size:2,px:[2,1],py:[10,4],pz:[1,2],nx:[4,4],ny:[3,3],nz:[2,-1]},{size:2,px:[10,5],py:[19,1],pz:[0,-1],nx:[4,12],ny:[10,17],nz:[1,0]},{size:5,px:[12,6,2,4,11],py:[14,4,2,1,5],pz:[0,-1,-1,-1,-1],nx:[3,4,3,4,3],ny:[13,17,14,16,15],nz:[0,0,0,0,0]}],alpha:[-1.368326,1.368326,-.7706897,.7706897,-.8378147,.8378147,-.6120624,.6120624,-.5139189,.5139189,-.475913,.475913,-.5161374,.5161374,-.5407743,.5407743,-.4216105,.4216105,-.4418693,.4418693,-.4435335,.4435335,-.4052076,.4052076,-.429305,.429305,-.3431154,.3431154,-.4231203,.4231203,-.39171,.39171,-.362345,.362345,-.320267,.320267,-.3331602,.3331602,-.3552034,.3552034,-.3784556,.3784556,-.3295428,.3295428,-.3587038,.3587038,-.2861332,.2861332,-.3403258,.3403258,-.3989002,.3989002,-.2631159,.2631159,-.3272156,.3272156,-.2816567,.2816567,-.3125926,.3125926,-.3146982,.3146982,-.2521825,.2521825,-.2434554,.2434554,-.3435378,.3435378,-.3161172,.3161172,-.2805027,.2805027,-.3303579,.3303579,-.2725089,.2725089,-.2575051,.2575051,-.3210646,.3210646,-.2986997,.2986997,-.2408925,.2408925,-.2456291,.2456291,-.283655,.283655,-.246986,.246986,-.29159,.29159,-.2513559,.2513559,-.2433728,.2433728,-.2377905,.2377905,-.2089327,.2089327,-.1978434,.1978434,-.3017699,.3017699,-.2339661,.2339661,-.193256,.193256,-.2278285,.2278285,-.24382,.24382,-.2216769,.2216769,-.1941995,.1941995,-.2129081,.2129081,-.2270319,.2270319,-.2393942,.2393942,-.2132518,.2132518,-.1867741,.1867741,-.2394237,.2394237,-.2005917,.2005917,-.2445217,.2445217,-.2229078,.2229078,-.2342967,.2342967,-.2481784,.2481784,-.2735603,.2735603,-.2187604,.2187604,-.1677239,.1677239,-.2248867,.2248867,-.2505358,.2505358,-.1867706,.1867706,-.1904305,.1904305,-.1939881,.1939881,-.2249474,.2249474,-.1762483,.1762483,-.2299974,.2299974]
        },{count:115,threshold:-5.15192,feature:[{size:5,px:[7,14,7,10,6],py:[3,3,12,4,4],pz:[0,0,0,0,1],nx:[14,3,14,9,3],ny:[7,4,8,8,5],nz:[0,1,0,0,2]},{size:5,px:[13,18,16,17,15],py:[1,13,1,2,0],pz:[0,0,0,0,0],nx:[23,23,8,11,22],ny:[3,4,4,8,0],nz:[0,0,1,1,0]},{size:5,px:[16,6,6,7,12],py:[12,13,4,12,5],pz:[0,0,1,0,0],nx:[0,0,8,4,0],ny:[0,2,4,4,2],nz:[0,0,1,1,-1]},{size:3,px:[12,13,7],py:[13,18,6],pz:[0,0,1],nx:[13,5,6],ny:[16,3,8],nz:[0,-1,-1]},{size:5,px:[10,12,9,13,11],py:[3,3,3,3,3],pz:[0,0,0,0,0],nx:[3,4,15,4,4],ny:[2,5,10,4,4],nz:[2,1,0,1,-1]},{size:5,px:[12,12,12,3,12],py:[7,9,8,3,10],pz:[0,0,0,2,0],nx:[4,8,15,9,9],ny:[4,4,8,8,8],nz:[1,1,0,0,-1]},{size:5,px:[6,3,4,4,2],py:[22,12,13,14,7],pz:[0,0,0,0,1],nx:[2,0,1,1,1],ny:[23,5,22,21,21],nz:[0,2,0,0,-1]},{size:2,px:[3,3],py:[8,8],pz:[1,-1],nx:[3,4],ny:[4,10],nz:[1,1]},{size:5,px:[11,11,11,11,0],py:[10,12,11,13,2],pz:[0,0,0,-1,-1],nx:[8,13,13,13,13],ny:[10,8,9,11,10],nz:[1,0,0,0,0]},{size:5,px:[16,16,15,17,18],py:[12,23,11,12,12],pz:[0,0,0,0,0],nx:[8,8,9,3,13],ny:[4,4,12,3,10],nz:[1,-1,-1,-1,-1]},{size:4,px:[17,16,6,5],py:[14,13,4,5],pz:[0,0,-1,-1],nx:[8,15,4,7],ny:[10,14,4,8],nz:[1,0,2,1]},{size:5,px:[20,10,20,21,19],py:[14,7,13,12,22],pz:[0,1,0,0,0],nx:[22,23,11,23,23],ny:[23,22,11,21,20],nz:[0,0,1,0,-1]},{size:4,px:[12,13,1,18],py:[14,23,3,5],pz:[0,-1,-1,-1],nx:[2,10,5,9],ny:[2,9,8,14],nz:[2,0,1,0]},{size:5,px:[10,4,7,9,8],py:[1,0,2,0,1],pz:[0,1,0,0,0],nx:[2,3,5,3,3],ny:[2,4,8,3,3],nz:[2,1,1,1,-1]},{size:4,px:[11,2,2,11],py:[6,4,5,7],pz:[0,2,2,0],nx:[3,0,5,3],ny:[4,9,8,3],nz:[1,-1,-1,-1]},{size:5,px:[12,10,9,12,12],py:[11,2,1,10,10],pz:[0,1,1,0,-1],nx:[22,11,5,22,23],ny:[1,1,0,0,3],nz:[0,1,2,0,0]},{size:4,px:[5,10,7,11],py:[14,3,0,4],pz:[0,-1,-1,-1],nx:[4,4,4,4],ny:[17,18,15,16],nz:[0,0,0,0]},{size:5,px:[2,2,3,2,2],py:[16,12,20,15,17],pz:[0,0,0,0,0],nx:[12,8,4,15,15],ny:[17,4,4,8,8],nz:[0,1,1,0,-1]},{size:5,px:[12,12,1,6,12],py:[11,10,3,6,10],pz:[0,0,-1,-1,-1],nx:[0,0,1,0,2],ny:[4,0,2,1,0],nz:[0,2,0,1,0]},{size:5,px:[21,20,21,21,14],py:[9,16,11,8,12],pz:[0,0,0,0,0],nx:[17,6,15,0,2],ny:[8,23,13,2,0],nz:[0,-1,-1,-1,-1]},{size:4,px:[6,9,9,5],py:[14,18,23,14],pz:[0,0,0,0],nx:[9,5,5,12],ny:[21,5,3,1],nz:[0,-1,-1,-1]},{size:2,px:[12,13],py:[4,4],pz:[0,0],nx:[4,3],ny:[4,1],nz:[1,2]},{size:5,px:[7,8,11,4,10],py:[3,3,2,1,2],pz:[0,0,0,1,0],nx:[19,20,19,20,20],ny:[0,3,1,2,2],nz:[0,0,0,0,-1]},{size:2,px:[9,1],py:[7,4],pz:[1,-1],nx:[4,7],ny:[5,9],nz:[2,1]},{size:5,px:[11,10,1,5,1],py:[10,12,6,6,5],pz:[0,0,1,1,1],nx:[16,3,2,4,4],ny:[10,4,2,4,4],nz:[0,1,2,1,-1]},{size:2,px:[15,0],py:[17,0],pz:[0,-1],nx:[7,4],ny:[8,5],nz:[1,2]},{size:5,px:[8,10,9,9,9],py:[2,2,2,1,1],pz:[0,0,0,0,-1],nx:[4,2,3,3,2],ny:[0,3,2,1,4],nz:[0,0,0,0,0]},{size:4,px:[11,15,17,16],py:[8,10,11,11],pz:[0,0,0,0],nx:[14,1,1,2],ny:[9,5,7,0],nz:[0,-1,-1,-1]},{size:3,px:[3,5,9],py:[8,6,12],pz:[0,1,0],nx:[3,4,18],ny:[4,2,22],nz:[1,-1,-1]},{size:5,px:[6,1,7,3,3],py:[13,4,13,7,7],pz:[0,2,0,1,-1],nx:[0,0,0,0,0],ny:[16,15,8,13,14],nz:[0,0,1,0,0]},{size:2,px:[5,16],py:[13,10],pz:[0,-1],nx:[3,4],ny:[4,5],nz:[1,1]},{size:5,px:[5,23,11,23,23],py:[5,12,4,16,15],pz:[2,0,1,0,0],nx:[3,2,4,5,5],ny:[4,2,4,11,11],nz:[1,2,1,1,-1]},{size:4,px:[10,10,3,23],py:[7,7,3,16],pz:[1,-1,-1,-1],nx:[5,23,11,22],ny:[4,13,7,16],nz:[2,0,1,0]},{size:5,px:[15,14,13,15,16],py:[1,0,0,0,1],pz:[0,0,0,0,0],nx:[4,9,8,8,8],ny:[2,4,9,4,4],nz:[2,1,1,1,-1]},{size:2,px:[10,4],py:[5,5],pz:[0,-1],nx:[3,15],ny:[1,8],nz:[2,0]},{size:2,px:[6,12],py:[6,9],pz:[1,0],nx:[10,10],ny:[10,10],nz:[0,-1]},{size:5,px:[1,0,0,0,0],py:[5,4,11,9,12],pz:[0,1,0,0,0],nx:[9,8,2,4,7],ny:[7,7,2,4,7],nz:[0,0,2,1,0]},{size:2,px:[4,8],py:[4,7],pz:[2,1],nx:[9,8],ny:[4,7],nz:[1,-1]},{size:2,px:[5,6],py:[4,1],pz:[2,-1],nx:[8,6],ny:[7,3],nz:[1,1]},{size:5,px:[8,5,7,6,11],py:[12,5,13,13,22],pz:[0,1,0,0,0],nx:[23,23,23,22,22],ny:[20,19,21,23,23],nz:[0,0,0,0,-1]},{size:2,px:[3,17],py:[6,9],pz:[1,-1],nx:[3,3],ny:[10,9],nz:[1,1]},{size:2,px:[14,11],py:[23,5],pz:[0,0],nx:[7,3],ny:[10,20],nz:[1,-1]},{size:2,px:[3,4],py:[8,8],pz:[1,1],nx:[9,4],ny:[15,4],nz:[0,-1]},{size:2,px:[2,4],py:[4,7],pz:[2,1],nx:[2,4],ny:[4,4],nz:[1,-1]},{size:2,px:[23,11],py:[21,10],pz:[0,1],nx:[2,3],ny:[11,14],nz:[1,0]},{size:4,px:[11,11,11,3],py:[13,12,11,4],pz:[0,0,0,-1],nx:[14,13,13,6],ny:[13,11,10,5],nz:[0,0,0,1]},{size:2,px:[4,7],py:[3,6],pz:[2,1],nx:[9,19],ny:[4,14],nz:[1,-1]},{size:3,px:[10,5,7],py:[5,0,6],pz:[1,-1,-1],nx:[10,21,5],ny:[0,5,3],nz:[1,0,2]},{size:2,px:[16,13],py:[3,15],pz:[0,-1],nx:[17,7],ny:[23,8],nz:[0,1]},{size:3,px:[4,2,2],py:[15,7,19],pz:[0,1,-1],nx:[2,8,4],ny:[5,14,9],nz:[2,0,1]},{size:3,px:[8,3,6],py:[10,2,4],pz:[0,2,1],nx:[3,8,4],ny:[4,14,9],nz:[1,-1,-1]},{size:2,px:[14,3],py:[18,3],pz:[0,-1],nx:[12,14],ny:[17,9],nz:[0,0]},{size:3,px:[7,1,10],py:[14,10,10],pz:[0,-1,-1],nx:[9,6,2],ny:[13,18,2],nz:[0,0,2]},{size:2,px:[11,8],py:[13,11],pz:[0,-1],nx:[2,4],ny:[7,18],nz:[1,0]},{size:2,px:[5,4],py:[21,17],pz:[0,0],nx:[9,3],ny:[5,1],nz:[1,-1]},{size:2,px:[6,6],py:[4,0],pz:[0,-1],nx:[4,3],ny:[2,0],nz:[0,1]},{size:2,px:[2,1],py:[1,5],pz:[0,-1],nx:[0,1],ny:[1,0],nz:[1,0]},{size:2,px:[18,1],py:[13,5],pz:[0,-1],nx:[8,4],ny:[4,2],nz:[1,2]},{size:5,px:[0,0,0,0,1],py:[4,3,2,12,15],pz:[1,1,2,0,0],nx:[5,9,4,8,8],ny:[3,6,3,6,6],nz:[1,0,1,0,-1]},{size:2,px:[2,5],py:[0,2],pz:[1,-1],nx:[2,1],ny:[0,1],nz:[0,1]},{size:4,px:[7,15,4,20],py:[8,23,4,8],pz:[1,0,2,0],nx:[6,0,3,4],ny:[9,2,13,6],nz:[0,-1,-1,-1]},{size:4,px:[11,11,10,20],py:[10,9,11,8],pz:[0,0,0,-1],nx:[21,20,21,21],ny:[18,23,19,17],nz:[0,0,0,0]},{size:2,px:[3,8],py:[7,5],pz:[1,-1],nx:[3,4],ny:[4,4],nz:[1,1]},{size:2,px:[5,11],py:[3,4],pz:[2,1],nx:[8,7],ny:[5,12],nz:[1,0]},{size:2,px:[4,1],py:[1,3],pz:[1,-1],nx:[3,6],ny:[0,0],nz:[1,0]},{size:2,px:[19,9],py:[16,8],pz:[0,1],nx:[14,6],ny:[15,1],nz:[0,-1]},{size:2,px:[12,6],py:[13,5],pz:[0,-1],nx:[5,5],ny:[1,2],nz:[2,2]},{size:5,px:[16,14,4,15,12],py:[1,1,1,2,1],pz:[0,0,2,0,0],nx:[6,4,3,2,10],ny:[22,8,2,1,7],nz:[0,1,1,2,0]},{size:5,px:[6,8,6,5,5],py:[1,0,0,1,0],pz:[0,0,0,0,0],nx:[4,4,4,4,8],ny:[4,3,2,5,10],nz:[2,2,2,2,1]},{size:2,px:[9,8],py:[17,0],pz:[0,-1],nx:[2,5],ny:[5,8],nz:[2,1]},{size:2,px:[8,0],py:[7,3],pz:[1,-1],nx:[8,4],ny:[4,2],nz:[1,2]},{size:2,px:[10,21],py:[11,20],pz:[1,0],nx:[11,4],ny:[17,1],nz:[0,-1]},{size:5,px:[5,10,4,17,10],py:[3,6,3,11,5],pz:[1,0,1,0,0],nx:[21,20,9,19,10],ny:[4,3,0,2,1],nz:[0,0,1,0,-1]},{size:2,px:[23,23],py:[10,10],pz:[0,-1],nx:[23,23],ny:[21,22],nz:[0,0]},{size:5,px:[9,20,19,20,20],py:[0,3,1,2,2],pz:[1,0,0,0,-1],nx:[11,23,11,23,5],ny:[1,2,0,1,0],nz:[1,0,1,0,2]},{size:3,px:[6,8,7],py:[4,10,11],pz:[1,0,0],nx:[8,3,4],ny:[9,4,4],nz:[0,-1,-1]},{size:4,px:[13,13,10,4],py:[14,23,1,5],pz:[0,-1,-1,-1],nx:[15,14,8,8],ny:[13,12,8,9],nz:[0,0,1,1]},{size:2,px:[11,9],py:[5,8],pz:[0,-1],nx:[7,8],ny:[7,4],nz:[0,1]},{size:5,px:[4,8,4,7,7],py:[2,3,3,11,11],pz:[2,1,2,1,-1],nx:[0,0,1,0,0],ny:[4,6,15,3,2],nz:[1,1,0,2,2]},{size:2,px:[6,1],py:[12,1],pz:[0,-1],nx:[1,10],ny:[2,11],nz:[2,0]},{size:5,px:[0,0,2,3,7],py:[0,1,4,3,11],pz:[0,-1,-1,-1,-1],nx:[9,11,9,6,12],ny:[2,1,1,0,2],nz:[0,0,0,1,0]},{size:2,px:[10,11],py:[4,4],pz:[0,0],nx:[8,4],ny:[4,2],nz:[1,-1]},{size:5,px:[1,1,1,1,1],py:[15,10,19,16,18],pz:[0,1,0,0,0],nx:[4,5,3,5,6],ny:[4,19,9,18,19],nz:[1,0,1,0,-1]},{size:5,px:[12,12,12,12,20],py:[11,12,13,13,18],pz:[0,0,0,-1,-1],nx:[0,0,0,0,0],ny:[4,2,7,6,12],nz:[1,2,1,1,0]},{size:2,px:[0,0],py:[9,11],pz:[0,0],nx:[10,4],ny:[5,3],nz:[1,-1]},{size:2,px:[11,8],py:[9,6],pz:[0,1],nx:[13,13],ny:[10,10],nz:[0,-1]},{size:2,px:[6,3],py:[5,3],pz:[1,2],nx:[3,3],ny:[5,5],nz:[2,-1]},{size:2,px:[19,9],py:[10,6],pz:[0,1],nx:[4,1],ny:[2,2],nz:[2,-1]},{size:2,px:[14,4],py:[19,12],pz:[0,-1],nx:[14,8],ny:[17,10],nz:[0,1]},{size:4,px:[4,2,13,2],py:[12,6,9,3],pz:[0,1,-1,-1],nx:[1,0,1,0],ny:[16,14,11,15],nz:[0,0,1,0]},{size:2,px:[3,3],py:[8,7],pz:[1,1],nx:[4,4],ny:[4,8],nz:[1,-1]},{size:5,px:[9,11,12,6,10],py:[2,1,2,1,2],pz:[0,0,0,1,0],nx:[4,6,4,6,2],ny:[4,0,9,1,8],nz:[0,0,1,0,1]},{size:5,px:[4,4,7,2,2],py:[19,20,23,8,9],pz:[0,0,0,1,1],nx:[7,0,5,6,2],ny:[10,5,4,1,8],nz:[1,-1,-1,-1,-1]},{size:5,px:[18,18,17,18,18],py:[15,16,14,20,17],pz:[0,0,0,0,0],nx:[15,2,2,5,2],ny:[8,0,2,9,4],nz:[0,-1,-1,-1,-1]},{size:4,px:[13,13,13,18],py:[11,12,12,20],pz:[0,0,-1,-1],nx:[1,3,10,10],ny:[1,6,12,11],nz:[2,0,0,0]},{size:2,px:[8,9],py:[0,1],pz:[1,1],nx:[19,4],ny:[2,2],nz:[0,-1]},{size:2,px:[6,3],py:[4,2],pz:[1,2],nx:[8,4],ny:[4,0],nz:[1,-1]},{size:5,px:[23,11,22,13,13],py:[8,3,3,12,12],pz:[0,1,0,0,-1],nx:[15,7,14,13,8],ny:[7,3,6,6,3],nz:[0,1,0,0,1]},{size:3,px:[9,11,19],py:[7,3,0],pz:[1,-1,-1],nx:[23,23,11],ny:[16,12,7],nz:[0,0,1]},{size:2,px:[15,8],py:[23,7],pz:[0,-1],nx:[4,3],ny:[5,4],nz:[2,2]},{size:2,px:[4,10],py:[6,13],pz:[1,-1],nx:[2,3],ny:[4,10],nz:[2,1]},{size:2,px:[4,1],py:[11,2],pz:[1,2],nx:[9,2],ny:[5,2],nz:[1,-1]},{size:2,px:[22,22],py:[22,21],pz:[0,0],nx:[3,0],ny:[5,3],nz:[1,-1]},{size:2,px:[20,10],py:[12,6],pz:[0,1],nx:[20,10],ny:[23,11],nz:[0,-1]},{size:4,px:[10,3,3,4],py:[5,3,4,9],pz:[0,-1,-1,-1],nx:[14,4,3,11],ny:[2,1,1,3],nz:[0,2,2,0]},{size:3,px:[15,15,3],py:[1,1,4],pz:[0,-1,-1],nx:[7,4,4],ny:[8,2,3],nz:[1,2,2]},{size:3,px:[0,0,0],py:[3,4,6],pz:[2,2,1],nx:[0,21,4],ny:[23,14,3],nz:[0,-1,-1]},{size:5,px:[4,4,5,3,4],py:[9,11,8,4,8],pz:[1,1,1,2,1],nx:[21,21,10,19,19],ny:[3,4,1,0,0],nz:[0,0,1,0,-1]},{size:4,px:[21,20,20,21],py:[18,21,20,17],pz:[0,0,0,0],nx:[8,1,4,2],ny:[10,0,2,4],nz:[1,-1,-1,-1]},{size:2,px:[3,6],py:[7,14],pz:[1,0],nx:[3,5],ny:[4,5],nz:[1,-1]},{size:3,px:[12,0,23],py:[20,2,13],pz:[0,-1,-1],nx:[12,2,9],ny:[19,2,7],nz:[0,2,0]},{size:2,px:[0,6],py:[22,11],pz:[0,-1],nx:[20,18],ny:[12,23],nz:[0,0]},{size:5,px:[9,15,15,16,8],py:[2,1,2,2,1],pz:[1,0,0,0,1],nx:[1,1,1,1,1],ny:[16,10,17,18,18],nz:[0,1,0,0,-1]},{size:5,px:[10,5,3,5,8],py:[14,2,1,4,1],pz:[0,-1,-1,-1,-1],nx:[23,23,23,23,23],ny:[18,15,16,14,17],nz:[0,0,0,0,0]},{size:5,px:[2,2,2,3,2],py:[16,17,15,20,11],pz:[0,0,0,0,1],nx:[8,22,2,1,23],ny:[20,11,5,0,17],nz:[0,-1,-1,-1,-1]}],alpha:[-1.299972,1.299972,-.7630804,.7630804,-.5530378,.5530378,-.5444703,.5444703,-.5207701,.5207701,-.5035143,.5035143,-.4514416,.4514416,-.4897723,.4897723,-.5006264,.5006264,-.4626049,.4626049,-.4375402,.4375402,-.3742565,.3742565,-.3873996,.3873996,-.3715484,.3715484,-.356248,.356248,-.3216189,.3216189,-.3983409,.3983409,-.3191891,.3191891,-.3242173,.3242173,-.352804,.352804,-.3562318,.3562318,-.3592398,.3592398,-.2557584,.2557584,-.2747951,.2747951,-.2747554,.2747554,-.2980481,.2980481,-.288767,.288767,-.3895318,.3895318,-.2786896,.2786896,-.2763841,.2763841,-.2704816,.2704816,-.2075489,.2075489,-.3104773,.3104773,-.2580337,.2580337,-.2448334,.2448334,-.3054279,.3054279,-.2335804,.2335804,-.2972322,.2972322,-.2270521,.2270521,-.2134621,.2134621,-.2261655,.2261655,-.2091024,.2091024,-.2478928,.2478928,-.2468972,.2468972,-.1919746,.1919746,-.2756623,.2756623,-.2629717,.2629717,-.2198653,.2198653,-.2174434,.2174434,-.2193626,.2193626,-.1956262,.1956262,-.1720459,.1720459,-.1781067,.1781067,-.1773484,.1773484,-.1793871,.1793871,-.1973396,.1973396,-.2397262,.2397262,-.2164685,.2164685,-.2214348,.2214348,-.2265941,.2265941,-.2075436,.2075436,-.224407,.224407,-.2291992,.2291992,-.2223506,.2223506,-.1639398,.1639398,-.1732374,.1732374,-.1808631,.1808631,-.1860962,.1860962,-.1781604,.1781604,-.2108322,.2108322,-.238639,.238639,-.1942083,.1942083,-.1949161,.1949161,-.1953729,.1953729,-.2317591,.2317591,-.2335136,.2335136,-.2282835,.2282835,-.2148716,.2148716,-.1588127,.1588127,-.1566765,.1566765,-.1644839,.1644839,-.2386947,.2386947,-.1704126,.1704126,-.2213945,.2213945,-.1740398,.1740398,-.2451678,.2451678,-.2120524,.2120524,-.1886646,.1886646,-.2824447,.2824447,-.1900364,.1900364,-.2179183,.2179183,-.2257696,.2257696,-.2023404,.2023404,-.1886901,.1886901,-.1850663,.1850663,-.2035414,.2035414,-.1930174,.1930174,-.1898282,.1898282,-.166664,.166664,-.1646143,.1646143,-.1543475,.1543475,-.1366289,.1366289,-.1636837,.1636837,-.2547716,.2547716,-.1281869,.1281869,-.1509159,.1509159,-.1447827,.1447827,-.1626126,.1626126,-.2387014,.2387014,-.257116,.257116,-.1719175,.1719175,-.1646742,.1646742,-.1717041,.1717041,-.2039217,.2039217,-.1796907,.1796907]},{count:153,threshold:-4.971032,feature:[{size:5,px:[14,13,18,10,16],py:[2,2,13,3,12],pz:[0,0,0,0,0],nx:[21,7,14,23,23],ny:[16,7,8,3,13],nz:[0,1,0,0,0]},{size:5,px:[12,12,12,15,14],py:[9,10,11,3,3],pz:[0,0,0,0,0],nx:[9,9,8,14,3],ny:[9,8,5,9,5],nz:[0,0,1,0,2]},{size:5,px:[5,11,7,6,8],py:[12,8,12,12,11],pz:[0,0,0,0,0],nx:[8,4,3,9,9],ny:[4,4,4,9,9],nz:[1,1,1,0,-1]},{size:5,px:[9,8,4,10,6],py:[2,2,1,3,13],pz:[0,0,1,0,0],nx:[1,1,5,1,1],ny:[2,3,8,4,16],nz:[0,0,1,0,0]},{size:5,px:[3,16,6,17,15],py:[2,17,4,12,12],pz:[2,0,1,0,0],nx:[4,8,15,1,1],ny:[4,4,8,16,16],nz:[1,1,-1,-1,-1]},{size:4,px:[18,15,8,17],py:[12,23,6,12],pz:[0,0,1,0],nx:[15,4,10,5],ny:[21,8,14,3],nz:[0,-1,-1,-1]},{size:5,px:[18,17,9,19,19],py:[3,1,0,3,3],pz:[0,0,1,0,-1],nx:[22,11,23,23,23],ny:[0,1,2,3,4],nz:[0,1,0,0,0]},{size:4,px:[9,5,5,10],py:[18,15,14,18],pz:[0,0,0,0],nx:[10,11,2,0],ny:[16,7,12,7],nz:[0,-1,-1,-1]},{size:2,px:[2,12],py:[4,6],pz:[2,0],nx:[3,12],ny:[4,19],nz:[1,-1]},{size:5,px:[3,4,5,2,2],py:[3,3,3,1,1],pz:[0,0,0,1,-1],nx:[0,0,1,0,0],ny:[3,4,0,1,2],nz:[0,0,0,1,0]},{size:5,px:[12,12,12,8,10],py:[13,12,12,1,18],pz:[0,0,-1,-1,-1],nx:[13,8,7,14,9],ny:[10,10,7,13,4],nz:[0,1,1,0,1]},{size:5,px:[15,4,12,14,12],py:[12,3,9,10,8],pz:[0,2,0,0,0],nx:[14,7,11,2,9],ny:[8,4,7,5,4],nz:[0,1,-1,-1,-1]},{size:3,px:[3,9,7],py:[7,23,15],pz:[1,-1,-1],nx:[4,4,2],ny:[9,7,5],nz:[1,1,2]},{size:3,px:[5,17,5],py:[3,23,4],pz:[2,0,2],nx:[23,2,4],ny:[23,16,4],nz:[0,-1,-1]},{size:5,px:[4,9,9,10,8],py:[1,0,1,0,2],pz:[1,0,0,0,0],nx:[2,5,4,2,2],ny:[2,19,11,4,1],nz:[2,0,1,2,2]},{size:5,px:[8,3,8,4,7],py:[23,9,13,8,16],pz:[0,1,0,1,0],nx:[8,2,5,3,2],ny:[8,15,1,1,1],nz:[0,-1,-1,-1,-1]},{size:2,px:[11,5],py:[14,5],pz:[0,-1],nx:[1,9],ny:[3,13],nz:[2,0]},{size:5,px:[5,8,1,8,6],py:[12,12,3,23,12],pz:[0,0,2,0,0],nx:[1,1,2,1,1],ny:[22,21,23,20,20],nz:[0,0,0,0,-1]},{size:5,px:[14,21,19,21,20],py:[13,8,20,10,7],pz:[0,0,0,0,0],nx:[16,0,14,23,1],ny:[8,1,23,10,20],nz:[0,-1,-1,-1,-1]},{size:5,px:[15,16,13,14,14],py:[3,3,3,3,3],pz:[0,0,0,0,-1],nx:[18,19,18,9,17],ny:[2,2,1,1,0],nz:[0,0,0,1,0]},{size:2,px:[17,9],py:[14,4],pz:[0,-1],nx:[9,18],ny:[4,18],nz:[1,0]},{size:2,px:[21,20],py:[17,21],pz:[0,0],nx:[12,3],ny:[17,10],nz:[0,-1]},{size:2,px:[2,1],py:[10,4],pz:[1,2],nx:[4,1],ny:[10,5],nz:[1,-1]},{size:5,px:[7,8,4,9,9],py:[2,2,0,2,2],pz:[0,0,1,0,-1],nx:[5,5,4,6,3],ny:[0,1,2,0,0],nz:[0,0,0,0,1]},{size:2,px:[2,5],py:[3,5],pz:[2,-1],nx:[3,2],ny:[4,2],nz:[1,2]},{size:5,px:[0,0,0,0,0],py:[0,1,3,4,4],pz:[2,2,1,1,-1],nx:[20,20,19,20,19],ny:[21,20,23,19,22],nz:[0,0,0,0,0]},{size:2,px:[9,18],py:[8,16],pz:[1,0],nx:[14,6],ny:[15,16],nz:[0,-1]},{size:3,px:[3,4,7],py:[3,3,9],pz:[2,2,1],nx:[8,9,7],ny:[4,11,4],nz:[1,-1,-1]},{size:5,px:[6,14,4,7,7],py:[4,23,3,6,6],pz:[1,0,2,1,-1],nx:[2,0,2,1,3],ny:[20,4,21,10,23],nz:[0,2,0,1,0]},{size:5,px:[2,4,8,9,10],py:[3,8,13,23,23],pz:[2,1,0,0,0],nx:[10,4,0,3,3],ny:[21,3,0,3,23],nz:[0,-1,-1,-1,-1]},{size:3,px:[11,10,11],py:[6,5,5],pz:[0,0,0],nx:[14,6,1],ny:[7,9,5],nz:[0,1,-1]},{size:5,px:[11,11,11,11,6],py:[11,12,10,13,6],pz:[0,0,0,0,1],nx:[9,13,13,13,4],ny:[4,9,10,11,2],nz:[1,0,0,0,-1]},{size:2,px:[2,4],py:[3,6],pz:[2,1],nx:[3,11],ny:[4,7],nz:[1,-1]},{size:2,px:[1,2],py:[4,11],pz:[2,0],nx:[8,8],ny:[15,15],nz:[0,-1]},{size:5,px:[12,12,13,12,12],py:[10,11,13,12,12],pz:[0,0,0,0,-1],nx:[0,0,0,1,0],ny:[13,2,12,5,14],nz:[0,2,0,0,0]},{size:5,px:[0,0,0,1,1],py:[4,3,11,15,13],pz:[1,2,0,0,0],nx:[2,3,3,1,0],ny:[2,4,4,5,14],nz:[2,1,-1,-1,-1]},{size:2,px:[4,11],py:[12,10],pz:[0,-1],nx:[1,2],ny:[2,4],nz:[2,1]},{size:5,px:[18,8,9,9,9],py:[15,7,8,10,7],pz:[0,1,1,1,1],nx:[22,23,21,22,11],ny:[20,16,23,19,9],nz:[0,0,0,0,1]},{size:5,px:[14,12,13,14,15],py:[1,0,0,0,1],pz:[0,0,0,0,0],nx:[4,9,4,7,7],ny:[2,3,1,8,8],nz:[2,1,2,1,-1]},{size:2,px:[13,9],py:[14,19],pz:[0,-1],nx:[6,10],ny:[0,2],nz:[1,0]},{size:2,px:[13,12],py:[4,4],pz:[0,0],nx:[3,3],ny:[1,1],nz:[2,-1]},{size:3,px:[14,5,5],py:[18,3,4],pz:[0,-1,-1],nx:[8,7,8],ny:[4,8,10],nz:[1,1,1]},{size:2,px:[8,18],py:[6,11],pz:[1,0],nx:[9,1],ny:[4,0],nz:[1,-1]},{size:2,px:[16,11],py:[9,7],pz:[0,0],nx:[7,7],ny:[4,4],nz:[1,-1]},{size:5,px:[23,11,23,11,23],py:[13,4,12,7,10],pz:[0,1,0,1,0],nx:[7,4,8,15,15],ny:[9,2,4,8,8],nz:[0,2,1,0,-1]},{size:2,px:[6,3],py:[1,0],pz:[0,1],nx:[4,1],ny:[1,2],nz:[0,-1]},{size:2,px:[5,5],py:[7,6],pz:[0,1],nx:[6,4],ny:[9,11],nz:[0,-1]},{size:4,px:[5,6,5,5],py:[8,6,11,6],pz:[1,1,1,0],nx:[23,0,4,5],ny:[0,2,2,1],nz:[0,-1,-1,-1]},{size:2,px:[18,4],py:[13,3],pz:[0,-1],nx:[15,4],ny:[11,2],nz:[0,2]},{size:2,px:[4,0],py:[8,0],pz:[1,-1],nx:[9,2],ny:[15,5],nz:[0,2]},{size:5,px:[15,15,16,14,14],py:[0,1,1,0,0],pz:[0,0,0,0,-1],nx:[4,4,8,8,15],ny:[4,5,4,11,23],nz:[2,2,1,1,0]},{size:4,px:[12,11,3,14],py:[14,22,1,0],pz:[0,-1,-1,-1],nx:[8,15,7,16],ny:[2,3,1,3],nz:[1,0,1,0]},{size:2,px:[5,12],py:[6,17],pz:[1,-1],nx:[2,1],ny:[4,2],nz:[1,2]},{size:5,px:[13,12,12,7,7],py:[5,6,5,14,14],pz:[0,0,0,0,-1],nx:[10,3,10,1,10],ny:[13,8,11,3,10],nz:[0,0,0,1,0]},{size:2,px:[4,4],py:[15,0],pz:[0,-1],nx:[4,4],ny:[16,17],nz:[0,0]},{size:5,px:[1,4,2,1,2],py:[4,0,1,1,0],pz:[1,1,1,2,1],nx:[4,9,1,5,1],ny:[3,4,4,5,5],nz:[1,-1,-1,-1,-1]},{size:2,px:[10,3],py:[3,1],pz:[0,2],nx:[8,8],ny:[4,4],nz:[1,-1]},{size:2,px:[16,0],py:[21,0],pz:[0,-1],nx:[6,8],ny:[8,4],nz:[1,1]},{size:2,px:[7,11],py:[4,18],pz:[0,-1],nx:[5,7],ny:[0,2],nz:[2,0]},{size:2,px:[9,7],py:[0,3],pz:[1,-1],nx:[20,10],ny:[0,1],nz:[0,1]},{size:4,px:[10,4,1,5],py:[0,6,8,4],pz:[1,-1,-1,-1],nx:[6,15,4,14],ny:[3,5,1,5],nz:[1,0,2,0]},{size:2,px:[4,4],py:[3,4],pz:[2,2],nx:[9,2],ny:[4,0],nz:[1,-1]},{size:2,px:[8,4],py:[3,4],pz:[0,-1],nx:[8,6],ny:[2,1],nz:[0,0]},{size:2,px:[2,0],py:[6,3],pz:[1,2],nx:[0,7],ny:[7,8],nz:[1,-1]},{size:2,px:[10,0],py:[7,3],pz:[1,-1],nx:[15,4],ny:[14,4],nz:[0,2]},{size:4,px:[3,1,2,2],py:[20,7,18,17],pz:[0,1,0,0],nx:[9,5,5,4],ny:[5,4,18,4],nz:[1,-1,-1,-1]},{size:2,px:[5,4],py:[3,1],pz:[2,-1],nx:[23,23],ny:[14,13],nz:[0,0]},{size:2,px:[12,4],py:[6,1],pz:[0,-1],nx:[8,4],ny:[4,4],nz:[1,1]},{size:5,px:[22,22,11,11,11],py:[12,13,4,6,6],pz:[0,0,1,1,-1],nx:[4,4,4,4,3],ny:[16,15,18,14,11],nz:[0,0,0,0,1]},{size:2,px:[4,10],py:[0,1],pz:[1,0],nx:[2,2],ny:[2,2],nz:[2,-1]},{size:2,px:[15,6],py:[4,4],pz:[0,-1],nx:[15,4],ny:[2,1],nz:[0,2]},{size:2,px:[11,2],py:[10,20],pz:[0,-1],nx:[4,9],ny:[1,2],nz:[2,1]},{size:2,px:[4,19],py:[3,8],pz:[2,0],nx:[8,21],ny:[4,20],nz:[1,-1]},{size:5,px:[4,6,7,6,2],py:[6,15,13,14,3],pz:[1,0,0,0,-1],nx:[21,22,19,21,10],ny:[6,12,0,3,2],nz:[0,0,0,0,1]},{size:5,px:[8,12,15,14,13],py:[0,0,0,0,0],pz:[1,0,0,0,0],nx:[4,3,1,3,4],ny:[19,16,3,15,4],nz:[0,0,2,0,1]},{size:2,px:[3,3],py:[2,3],pz:[2,2],nx:[8,4],ny:[4,1],nz:[1,-1]},{size:4,px:[0,0,0,5],py:[10,9,11,21],pz:[1,1,-1,-1],nx:[12,4,3,11],ny:[3,1,1,3],nz:[0,2,2,0]},{size:2,px:[3,1],py:[0,0],pz:[1,2],nx:[1,4],ny:[2,1],nz:[1,-1]},{size:5,px:[2,5,1,0,1],py:[14,23,7,5,9],pz:[0,0,1,1,1],nx:[0,0,7,9,11],ny:[23,22,4,9,3],nz:[0,-1,-1,-1,-1]},{size:2,px:[8,9],py:[7,1],pz:[1,-1],nx:[8,8],ny:[8,9],nz:[1,1]},{size:2,px:[11,9],py:[11,3],pz:[1,-1],nx:[3,2],ny:[14,10],nz:[0,1]},{size:4,px:[2,4,5,4],py:[8,20,22,16],pz:[1,0,0,0],nx:[8,2,11,3],ny:[7,4,15,4],nz:[0,-1,-1,-1]},{size:3,px:[1,2,3],py:[2,1,0],pz:[0,0,0],nx:[0,0,15],ny:[1,0,11],nz:[0,0,-1]},{size:2,px:[12,22],py:[6,7],pz:[0,-1],nx:[4,8],ny:[2,4],nz:[2,1]},{size:3,px:[13,0,5],py:[19,10,2],pz:[0,-1,-1],nx:[3,4,6],ny:[5,5,9],nz:[2,2,1]},{size:2,px:[8,15],py:[8,22],pz:[1,0],nx:[7,4],ny:[10,7],nz:[1,-1]},{size:2,px:[10,10],py:[7,6],pz:[1,1],nx:[10,1],ny:[9,0],nz:[1,-1]},{size:2,px:[9,11],py:[4,3],pz:[0,-1],nx:[5,9],ny:[0,1],nz:[1,0]},{size:5,px:[14,13,14,12,15],py:[1,2,2,2,2],pz:[0,0,0,0,0],nx:[4,8,4,7,4],ny:[2,4,3,4,4],nz:[2,1,2,1,-1]},{size:3,px:[13,8,2],py:[14,5,8],pz:[0,-1,-1],nx:[6,8,9],ny:[3,2,2],nz:[0,0,0]},{size:3,px:[3,6,8],py:[7,4,12],pz:[1,1,0],nx:[3,8,9],ny:[5,2,2],nz:[1,-1,-1]},{size:2,px:[13,4],py:[16,3],pz:[0,2],nx:[13,7],ny:[15,5],nz:[0,-1]},{size:2,px:[3,0],py:[7,9],pz:[1,-1],nx:[2,8],ny:[2,4],nz:[2,1]},{size:5,px:[3,6,8,7,7],py:[0,1,0,0,0],pz:[1,0,0,0,-1],nx:[7,9,4,3,4],ny:[9,7,4,2,2],nz:[1,1,1,2,2]},{size:3,px:[3,4,16],py:[4,4,6],pz:[1,2,0],nx:[2,2,2],ny:[0,0,1],nz:[0,-1,-1]},{size:2,px:[0,0],py:[1,0],pz:[2,2],nx:[5,5],ny:[2,2],nz:[1,-1]},{size:2,px:[9,3],py:[7,20],pz:[1,-1],nx:[4,8],ny:[2,4],nz:[2,1]},{size:2,px:[8,21],py:[10,18],pz:[0,-1],nx:[9,4],ny:[10,4],nz:[0,1]},{size:2,px:[6,13],py:[6,23],pz:[1,-1],nx:[10,10],ny:[11,12],nz:[0,0]},{size:5,px:[10,9,5,10,10],py:[9,13,6,10,10],pz:[0,0,1,0,-1],nx:[21,21,21,10,21],ny:[18,20,19,11,17],nz:[0,0,0,1,0]},{size:2,px:[8,8],py:[7,6],pz:[1,1],nx:[8,1],ny:[4,4],nz:[1,-1]},{size:2,px:[11,4],py:[14,7],pz:[0,-1],nx:[13,13],ny:[13,11],nz:[0,0]},{size:2,px:[4,4],py:[4,5],pz:[2,2],nx:[12,5],ny:[16,2],nz:[0,-1]},{size:3,px:[1,3,20],py:[3,9,2],pz:[2,-1,-1],nx:[0,0,0],ny:[7,4,13],nz:[1,2,0]},{size:2,px:[0,0],py:[4,2],pz:[1,2],nx:[1,0],ny:[4,4],nz:[1,-1]},{size:3,px:[8,9,11],py:[2,1,2],pz:[0,0,0],nx:[2,2,0],ny:[2,2,13],nz:[2,-1,-1]},{size:2,px:[1,10],py:[23,5],pz:[0,-1],nx:[3,6],ny:[1,1],nz:[2,1]},{size:4,px:[13,6,3,4],py:[8,6,4,2],pz:[0,-1,-1,-1],nx:[1,1,1,4],ny:[9,7,8,20],nz:[1,1,1,0]},{size:5,px:[11,4,4,10,3],py:[9,16,13,12,7],pz:[0,0,0,0,0],nx:[7,11,3,17,4],ny:[8,11,9,0,4],nz:[0,-1,-1,-1,-1]},{size:2,px:[6,6],py:[6,8],pz:[1,-1],nx:[0,0],ny:[1,2],nz:[2,2]},{size:2,px:[10,5],py:[7,2],pz:[0,-1],nx:[4,13],ny:[5,9],nz:[2,0]},{size:2,px:[10,5],py:[8,2],pz:[1,-1],nx:[16,4],ny:[14,5],nz:[0,2]},{size:2,px:[1,1],py:[16,15],pz:[0,0],nx:[1,20],ny:[23,1],nz:[0,-1]},{size:2,px:[2,3],py:[4,7],pz:[2,1],nx:[2,3],ny:[5,4],nz:[2,-1]},{size:2,px:[19,8],py:[5,4],pz:[0,-1],nx:[10,10],ny:[1,3],nz:[1,1]},{size:2,px:[21,21],py:[18,16],pz:[0,0],nx:[10,3],ny:[17,5],nz:[0,-1]},{size:2,px:[9,2],py:[23,4],pz:[0,2],nx:[5,11],ny:[3,7],nz:[2,1]},{size:2,px:[7,0],py:[3,2],pz:[0,-1],nx:[3,6],ny:[1,1],nz:[1,0]},{size:4,px:[5,9,8,9],py:[8,12,13,18],pz:[0,0,0,0],nx:[6,5,2,5],ny:[8,4,7,11],nz:[0,-1,-1,-1]},{size:2,px:[7,2],py:[0,0],pz:[0,2],nx:[5,5],ny:[3,4],nz:[1,-1]},{size:2,px:[11,11],py:[12,13],pz:[0,0],nx:[9,1],ny:[14,3],nz:[0,-1]},{size:5,px:[8,16,9,4,15],py:[11,13,8,4,12],pz:[1,0,1,2,0],nx:[3,3,3,3,4],ny:[4,2,1,3,0],nz:[0,0,0,0,0]},{size:2,px:[9,5],py:[7,6],pz:[1,-1],nx:[19,8],ny:[17,11],nz:[0,1]},{size:5,px:[14,15,12,13,13],py:[2,2,2,2,2],pz:[0,0,0,0,-1],nx:[20,9,19,20,4],ny:[14,2,5,15,1],nz:[0,1,0,0,2]},{size:2,px:[18,8],py:[20,7],pz:[0,1],nx:[4,9],ny:[2,2],nz:[2,-1]},{size:2,px:[6,3],py:[11,5],pz:[1,2],nx:[13,19],ny:[20,20],nz:[0,-1]},{size:3,px:[12,11,3],py:[20,20,5],pz:[0,0,-1],nx:[11,12,6],ny:[21,21,10],nz:[0,0,1]},{size:2,px:[3,6],py:[7,14],pz:[1,0],nx:[3,13],ny:[4,8],nz:[1,-1]},{size:2,px:[0,0],py:[5,9],pz:[2,1],nx:[2,11],ny:[8,6],nz:[1,-1]},{size:2,px:[2,2],py:[5,5],pz:[1,-1],nx:[0,0],ny:[6,3],nz:[1,2]},{size:2,px:[11,23],py:[5,9],pz:[1,0],nx:[8,2],ny:[11,0],nz:[0,-1]},{size:2,px:[11,23],py:[12,9],pz:[0,-1],nx:[11,22],ny:[10,21],nz:[1,0]},{size:2,px:[12,12],py:[7,7],pz:[0,-1],nx:[5,4],ny:[7,10],nz:[1,1]},{size:2,px:[9,8],py:[18,1],pz:[0,-1],nx:[5,4],ny:[8,10],nz:[1,1]},{size:2,px:[16,17],py:[11,11],pz:[0,0],nx:[15,2],ny:[9,4],nz:[0,-1]},{size:2,px:[0,1],py:[3,0],pz:[2,-1],nx:[9,10],ny:[6,5],nz:[1,1]},{size:2,px:[13,13],py:[20,21],pz:[0,-1],nx:[2,2],ny:[6,5],nz:[1,1]},{size:5,px:[20,20,4,18,19],py:[17,16,5,22,20],pz:[0,0,2,0,0],nx:[8,11,5,6,2],ny:[10,15,11,10,1],nz:[1,-1,-1,-1,-1]},{size:2,px:[11,11],py:[4,4],pz:[0,-1],nx:[8,4],ny:[4,4],nz:[1,1]},{size:3,px:[6,5,6],py:[8,10,10],pz:[1,1,1],nx:[11,8,22],ny:[19,2,15],nz:[0,-1,-1]},{size:3,px:[5,2,13],py:[7,10,10],pz:[1,-1,-1],nx:[11,11,23],ny:[8,9,14],nz:[1,1,0]},{size:5,px:[3,6,1,5,10],py:[7,14,1,9,2],pz:[1,-1,-1,-1,-1],nx:[11,0,1,5,1],ny:[14,12,18,5,19],nz:[0,0,0,1,0]},{size:3,px:[21,21,10],py:[16,17,10],pz:[0,0,1],nx:[5,5,1],ny:[9,9,18],nz:[1,-1,-1]},{size:2,px:[6,21],py:[6,17],pz:[1,-1],nx:[20,10],ny:[7,4],nz:[0,1]},{size:2,px:[10,11],py:[0,0],pz:[1,-1],nx:[6,13],ny:[2,4],nz:[1,0]},{size:4,px:[4,4,7,9],py:[3,4,10,3],pz:[2,2,1,1],nx:[21,2,15,5],ny:[0,0,0,2],nz:[0,-1,-1,-1]},{size:3,px:[11,11,11],py:[7,6,9],pz:[1,1,1],nx:[23,4,9],ny:[23,5,6],nz:[0,-1,-1]},{size:2,px:[14,15],py:[1,1],pz:[0,0],nx:[8,4],ny:[4,2],nz:[1,2]},{size:5,px:[11,23,11,23,23],py:[11,22,10,21,20],pz:[1,0,1,0,0],nx:[10,9,19,10,10],ny:[10,11,20,9,9],nz:[1,1,0,1,-1]},{size:2,px:[7,23],py:[13,22],pz:[0,-1],nx:[8,4],ny:[4,4],nz:[1,1]},{size:2,px:[12,1],py:[19,0],pz:[0,-1],nx:[11,12],ny:[22,17],nz:[0,0]},{size:2,px:[10,8],py:[4,3],pz:[1,-1],nx:[5,23],ny:[2,7],nz:[2,0]},{size:2,px:[9,10],py:[6,20],pz:[1,-1],nx:[8,8],ny:[4,6],nz:[1,1]}],alpha:[-1.135386,1.135386,-.90908,.90908,-.591378,.591378,-.5556534,.5556534,-.508415,.508415,-.4464489,.4464489,-.4463241,.4463241,-.4985226,.4985226,-.4424638,.4424638,-.4300093,.4300093,-.4231341,.4231341,-.4087428,.4087428,-.337448,.337448,-.3230151,.3230151,-.3084427,.3084427,-.3235494,.3235494,-.2589281,.2589281,-.2970292,.2970292,-.2957065,.2957065,-.3997619,.3997619,-.3535901,.3535901,-.2725396,.2725396,-.2649725,.2649725,-.3103888,.3103888,-.3117775,.3117775,-.258962,.258962,-.2689202,.2689202,-.2127024,.2127024,-.2436322,.2436322,-.3120574,.3120574,-.278601,.278601,-.2649072,.2649072,-.2766509,.2766509,-.2367237,.2367237,-.2658049,.2658049,-.2103463,.2103463,-.1911522,.1911522,-.2535425,.2535425,-.2434696,.2434696,-.2180788,.2180788,-.2496873,.2496873,-.2700969,.2700969,-.2565479,.2565479,-.2737741,.2737741,-.1675507,.1675507,-.2551417,.2551417,-.2067648,.2067648,-.1636834,.1636834,-.2129306,.2129306,-.1656758,.1656758,-.1919369,.1919369,-.2031763,.2031763,-.2062327,.2062327,-.257795,.257795,-.2951823,.2951823,-.202316,.202316,-.2022234,.2022234,-.2132906,.2132906,-.1653278,.1653278,-.1648474,.1648474,-.1593352,.1593352,-.173565,.173565,-.1688778,.1688778,-.1519705,.1519705,-.1812202,.1812202,-.1967481,.1967481,-.1852954,.1852954,-.231778,.231778,-.2036251,.2036251,-.1609324,.1609324,-.2160205,.2160205,-.202619,.202619,-.1854761,.1854761,-.1832038,.1832038,-.2001141,.2001141,-.1418333,.1418333,-.1704773,.1704773,-.1586261,.1586261,-.1587582,.1587582,-.1899489,.1899489,-.147716,.147716,-.2260467,.2260467,-.2393598,.2393598,-.1582373,.1582373,-.1702498,.1702498,-.1737398,.1737398,-.1462529,.1462529,-.1396517,.1396517,-.1629625,.1629625,-.1446933,.1446933,-.1811657,.1811657,-.1336427,.1336427,-.1924813,.1924813,-.145752,.145752,-.1600259,.1600259,-.1297,.1297,-.2076199,.2076199,-.151006,.151006,-.1914568,.1914568,-.2138162,.2138162,-.1856916,.1856916,-.1843047,.1843047,-.1526846,.1526846,-.132832,.132832,-.1751311,.1751311,-.1643908,.1643908,-.1482706,.1482706,-.1622298,.1622298,-.1884979,.1884979,-.1633604,.1633604,-.1554166,.1554166,-.1405332,.1405332,-.1772398,.1772398,-.1410008,.1410008,-.1362301,.1362301,-.1709087,.1709087,-.1584613,.1584613,-.1188814,.1188814,-.1423888,.1423888,-.1345565,.1345565,-.1835986,.1835986,-.1445329,.1445329,-.1385826,.1385826,-.1558917,.1558917,-.1476053,.1476053,-.1370722,.1370722,-.2362666,.2362666,-.2907774,.2907774,-.165636,.165636,-.1644407,.1644407,-.1443394,.1443394,-.1438823,.1438823,-.1476964,.1476964,-.1956593,.1956593,-.2417519,.2417519,-.1659315,.1659315,-.1466254,.1466254,-.2034909,.2034909,-.2128771,.2128771,-.1665429,.1665429,-.1387131,.1387131,-.1298823,.1298823,-.1329495,.1329495,-.1769587,.1769587,-.136653,.136653,-.1254359,.1254359,-.1673022,.1673022,-.1602519,.1602519,-.1897245,.1897245,-.1893579,.1893579,-.157935,.157935,-.1472589,.1472589,-.1614193,.1614193]},{count:203,threshold:-4.769677,feature:[{size:5,px:[12,5,14,9,7],py:[9,13,3,1,3],pz:[0,0,0,0,0],nx:[1,0,5,14,9],ny:[5,3,8,8,9],nz:[2,0,1,0,0]},{size:5,px:[14,13,11,17,12],py:[2,2,4,13,3],pz:[0,0,0,0,0],nx:[7,22,8,23,22],ny:[8,15,11,12,3],nz:[1,0,1,0,0]},{size:5,px:[9,11,11,11,16],py:[4,8,7,9,12],pz:[0,0,0,0,0],nx:[4,8,14,9,9],ny:[4,4,8,8,8],nz:[1,1,0,0,-1]},{size:5,px:[6,12,12,8,3],py:[11,7,8,10,2],pz:[0,0,0,0,2],nx:[8,4,4,4,0],ny:[4,4,4,11,0],nz:[1,1,-1,-1,-1]},{size:5,px:[19,17,18,9,9],py:[3,2,3,1,1],pz:[0,0,0,1,-1],nx:[21,21,10,22,22],ny:[1,2,0,4,3],nz:[0,0,1,0,0]},{size:2,px:[4,7],py:[4,6],pz:[2,1],nx:[8,7],ny:[4,10],nz:[1,1]},{size:5,px:[14,17,17,13,12],py:[18,15,16,18,18],pz:[0,0,0,0,0],nx:[13,19,5,20,6],ny:[16,4,1,19,0],nz:[0,-1,-1,-1,-1]},{size:5,px:[6,7,4,5,5],py:[15,23,6,12,16],pz:[0,0,1,0,0],nx:[3,14,14,6,6],ny:[4,11,11,9,0],nz:[1,-1,-1,-1,-1]},{size:5,px:[16,9,6,3,11],py:[2,2,5,3,2],pz:[0,0,1,2,0],nx:[3,4,2,5,5],ny:[4,11,2,8,8],nz:[1,1,2,1,-1]},{size:5,px:[6,1,5,3,3],py:[14,4,15,7,7],pz:[0,2,0,1,-1],nx:[0,0,1,1,1],ny:[7,8,18,17,5],nz:[1,1,0,0,2]},{size:5,px:[12,12,9,5,3],py:[14,14,0,3,7],pz:[0,-1,-1,-1,-1],nx:[7,7,14,8,13],ny:[7,8,13,10,10],nz:[1,1,0,1,0]},{size:2,px:[3,4],py:[7,9],pz:[1,-1],nx:[2,4],ny:[5,4],nz:[2,1]},{size:3,px:[10,21,17],py:[7,11,23],pz:[1,0,0],nx:[21,9,3],ny:[23,5,5],nz:[0,-1,-1]},{size:5,px:[8,11,9,10,11],py:[2,0,1,1,2],pz:[0,0,0,0,0],nx:[4,5,6,4,3],ny:[8,4,18,7,4],nz:[1,1,0,1,-1]},{size:5,px:[20,22,3,19,10],py:[20,9,4,22,3],pz:[0,0,2,0,1],nx:[8,20,8,3,2],ny:[4,3,6,4,3],nz:[1,-1,-1,-1,-1]},{size:2,px:[4,4],py:[8,7],pz:[1,1],nx:[9,2],ny:[15,5],nz:[0,-1]},{size:2,px:[11,13],py:[13,4],pz:[0,-1],nx:[20,21],ny:[1,4],nz:[0,0]},{size:5,px:[1,2,7,6,8],py:[0,2,3,3,3],pz:[2,1,0,0,0],nx:[1,2,1,1,1],ny:[0,0,4,3,3],nz:[1,0,0,0,-1]},{size:2,px:[3,10],py:[9,11],pz:[0,0],nx:[6,3],ny:[9,2],nz:[0,-1]},{size:5,px:[12,12,12,12,6],py:[10,11,13,12,6],pz:[0,0,0,0,-1],nx:[10,2,1,10,10],ny:[10,4,2,11,9],nz:[0,1,2,0,0]},{size:5,px:[16,18,11,17,15],py:[11,12,8,12,11],pz:[0,0,0,0,0],nx:[14,0,19,0,10],ny:[9,3,14,8,9],nz:[0,-1,-1,-1,-1]},{size:4,px:[5,9,5,8],py:[21,18,20,23],pz:[0,0,0,0],nx:[8,4,3,1],ny:[20,3,4,3],nz:[0,-1,-1,-1]},{size:2,px:[2,3],py:[3,2],pz:[2,2],nx:[3,12],ny:[4,23],nz:[1,-1]},{size:5,px:[0,1,1,1,1],py:[2,16,14,13,12],pz:[2,0,0,0,0],nx:[8,4,9,4,7],ny:[9,3,4,2,9],nz:[1,2,1,2,1]},{size:2,px:[4,9],py:[3,7],pz:[2,-1],nx:[4,9],ny:[2,4],nz:[2,1]},{size:5,px:[15,16,17,15,8],py:[3,3,3,18,1],pz:[0,0,0,0,1],nx:[1,2,2,1,3],ny:[5,3,2,6,0],nz:[0,0,0,0,0]},{size:2,px:[4,17],py:[4,14],pz:[2,0],nx:[15,7],ny:[15,10],nz:[0,-1]},{size:3,px:[14,12,3],py:[3,13,3],pz:[0,-1,-1],nx:[4,17,4],ny:[3,19,4],nz:[2,0,2]},{size:4,px:[4,5,12,2],py:[9,6,19,4],pz:[1,1,0,2],nx:[12,17,4,4],ny:[18,19,4,4],nz:[0,-1,-1,-1]},{size:5,px:[10,19,20,20,19],py:[7,14,13,14,13],pz:[1,0,0,0,-1],nx:[11,23,23,23,23],ny:[9,15,13,16,14],nz:[1,0,0,0,0]},{size:4,px:[0,0,0,2],py:[5,6,5,14],pz:[1,1,2,0],nx:[0,3,3,17],ny:[23,5,5,9],nz:[0,-1,-1,-1]},{size:2,px:[15,4],py:[23,5],pz:[0,2],nx:[9,3],ny:[4,4],nz:[1,-1]},{size:4,px:[6,5,10,12],py:[3,3,23,23],pz:[1,1,0,0],nx:[11,1,1,4],ny:[21,3,5,5],nz:[0,-1,-1,-1]},{size:2,px:[5,2],py:[9,4],pz:[1,2],nx:[4,9],ny:[4,2],nz:[1,-1]},{size:5,px:[23,23,23,23,23],py:[14,9,13,11,12],pz:[0,0,0,0,0],nx:[6,13,7,8,8],ny:[9,6,3,3,3],nz:[1,0,1,1,-1]},{size:2,px:[10,3],py:[4,5],pz:[0,-1],nx:[3,8],ny:[1,3],nz:[2,1]},{size:2,px:[3,12],py:[4,18],pz:[2,0],nx:[12,0],ny:[16,3],nz:[0,-1]},{size:2,px:[16,2],py:[4,4],pz:[0,-1],nx:[16,4],ny:[1,0],nz:[0,2]},{size:2,px:[3,4],py:[7,1],pz:[1,-1],nx:[5,3],ny:[19,9],nz:[0,1]},{size:4,px:[20,19,20,21],py:[2,0,1,3],pz:[0,0,0,0],nx:[11,5,23,11],ny:[0,0,1,1],nz:[1,2,0,1]},{size:2,px:[12,13],py:[7,5],pz:[0,0],nx:[8,5],ny:[3,5],nz:[1,-1]},{size:5,px:[22,21,22,22,22],py:[20,22,18,19,16],pz:[0,0,0,0,0],nx:[2,3,3,15,15],ny:[4,5,4,7,7],nz:[1,2,1,0,-1]},{size:3,px:[15,14,14],py:[1,1,1],pz:[0,0,-1],nx:[17,18,16],ny:[1,2,1],nz:[0,0,0]},{size:4,px:[17,16,16,15],py:[2,1,0,0],pz:[0,0,0,0],nx:[7,4,2,11],ny:[11,2,1,4],nz:[1,2,-1,-1]},{size:4,px:[18,0,0,0],py:[14,6,5,4],pz:[0,-1,-1,-1],nx:[19,19,19,19],ny:[16,19,17,18],nz:[0,0,0,0]},{size:4,px:[11,5,5,0],py:[14,1,4,4],pz:[0,-1,-1,-1],nx:[11,8,2,15],ny:[17,14,1,9],nz:[0,0,2,0]},{size:2,px:[4,5],py:[19,21],pz:[0,0],nx:[10,2],ny:[15,4],nz:[0,-1]},{size:2,px:[6,4],py:[4,6],pz:[1,1],nx:[3,3],ny:[4,5],nz:[1,-1]},{size:2,px:[2,7],py:[1,13],pz:[2,0],nx:[7,2],ny:[1,4],nz:[1,-1]},{size:4,px:[15,10,4,7],py:[23,3,1,7],pz:[0,1,2,1],nx:[0,4,1,1],ny:[0,2,0,-1900147915],nz:[0,-1,-1,-1]},{size:2,px:[7,2],py:[12,11],pz:[0,-1],nx:[2,4],ny:[2,5],nz:[2,1]},{size:5,px:[0,0,0,1,0],
                py:[9,4,3,2,6],pz:[0,1,2,1,1],nx:[9,4,2,16,16],ny:[7,4,2,8,8],nz:[0,1,2,0,-1]},{size:5,px:[18,4,9,4,4],py:[12,5,6,3,4],pz:[0,2,1,2,-1],nx:[4,3,3,2,3],ny:[23,19,21,16,18],nz:[0,0,0,0,0]},{size:2,px:[6,6],py:[14,13],pz:[0,0],nx:[3,10],ny:[4,7],nz:[1,-1]},{size:5,px:[3,4,4,2,2],py:[8,11,7,4,4],pz:[1,1,1,2,-1],nx:[20,18,19,20,19],ny:[4,0,2,3,1],nz:[0,0,0,0,0]},{size:5,px:[17,12,14,8,16],py:[2,0,0,0,0],pz:[0,0,0,1,0],nx:[3,15,3,2,2],ny:[2,9,7,2,2],nz:[2,0,1,2,-1]},{size:5,px:[11,10,11,11,11],py:[10,12,11,12,12],pz:[0,0,0,0,-1],nx:[13,13,20,10,13],ny:[9,11,8,4,10],nz:[0,0,0,1,0]},{size:2,px:[8,16],py:[7,13],pz:[1,0],nx:[8,13],ny:[4,11],nz:[1,-1]},{size:2,px:[6,7],py:[20,3],pz:[0,-1],nx:[3,4],ny:[10,10],nz:[1,1]},{size:3,px:[13,10,17],py:[9,3,5],pz:[0,-1,-1],nx:[1,3,1],ny:[5,16,6],nz:[2,0,1]},{size:2,px:[0,0],py:[5,5],pz:[2,-1],nx:[8,3],ny:[14,10],nz:[0,1]},{size:4,px:[11,9,12,10],py:[2,2,2,2],pz:[0,0,0,0],nx:[4,4,4,10],ny:[5,5,0,16],nz:[1,-1,-1,-1]},{size:3,px:[7,9,12],py:[2,2,2],pz:[1,-1,-1],nx:[4,7,2],ny:[3,1,0],nz:[0,0,2]},{size:2,px:[2,4],py:[3,12],pz:[2,0],nx:[7,4],ny:[6,5],nz:[1,2]},{size:4,px:[12,12,6,3],py:[12,11,21,7],pz:[0,0,-1,-1],nx:[1,0,0,0],ny:[13,3,6,5],nz:[0,2,1,1]},{size:3,px:[3,1,3],py:[21,8,18],pz:[0,1,0],nx:[11,20,0],ny:[17,17,6],nz:[0,-1,-1]},{size:2,px:[2,8],py:[3,12],pz:[2,0],nx:[2,20],ny:[4,17],nz:[1,-1]},{size:5,px:[2,3,4,3,2],py:[10,14,14,15,13],pz:[1,0,0,0,0],nx:[0,0,1,0,0],ny:[21,20,23,19,19],nz:[0,0,0,0,-1]},{size:2,px:[2,15],py:[7,4],pz:[1,-1],nx:[3,8],ny:[4,14],nz:[1,0]},{size:5,px:[19,14,12,15,4],py:[8,12,10,16,2],pz:[0,0,0,0,2],nx:[8,0,12,4,0],ny:[4,1,12,2,19],nz:[1,-1,-1,-1,-1]},{size:2,px:[18,9],py:[15,3],pz:[0,-1],nx:[8,15],ny:[9,14],nz:[1,0]},{size:5,px:[4,2,3,4,9],py:[9,4,3,8,23],pz:[1,2,1,1,0],nx:[11,23,23,11,11],ny:[0,2,3,1,1],nz:[1,0,0,1,-1]},{size:2,px:[6,7],py:[1,1],pz:[0,0],nx:[3,4],ny:[10,5],nz:[1,-1]},{size:4,px:[11,9,8,5],py:[12,15,13,3],pz:[0,-1,-1,-1],nx:[3,12,14,13],ny:[0,3,3,3],nz:[2,0,0,0]},{size:2,px:[11,11],py:[6,5],pz:[0,0],nx:[8,11],ny:[4,20],nz:[1,-1]},{size:5,px:[21,20,21,21,21],py:[18,21,17,19,19],pz:[0,0,0,0,-1],nx:[2,5,4,4,5],ny:[5,12,11,10,10],nz:[1,0,0,0,0]},{size:5,px:[1,1,1,1,1],py:[10,11,7,9,8],pz:[0,0,0,0,0],nx:[11,23,23,23,23],ny:[10,20,21,19,19],nz:[1,0,0,0,-1]},{size:5,px:[7,8,7,3,1],py:[14,13,13,2,2],pz:[0,0,-1,-1,-1],nx:[1,10,2,2,10],ny:[2,13,4,16,12],nz:[2,0,1,0,0]},{size:2,px:[17,18],py:[12,12],pz:[0,0],nx:[8,8],ny:[4,4],nz:[1,-1]},{size:2,px:[17,0],py:[5,20],pz:[0,-1],nx:[4,9],ny:[0,2],nz:[2,1]},{size:5,px:[22,22,22,11,23],py:[16,15,14,6,13],pz:[0,0,0,1,0],nx:[16,15,7,9,9],ny:[15,8,4,10,10],nz:[0,0,1,1,-1]},{size:2,px:[13,3],py:[3,1],pz:[0,2],nx:[8,3],ny:[4,2],nz:[1,-1]},{size:2,px:[5,6],py:[4,1],pz:[1,-1],nx:[6,3],ny:[4,2],nz:[1,2]},{size:3,px:[4,2,6],py:[6,3,4],pz:[1,2,1],nx:[10,0,4],ny:[9,4,3],nz:[0,-1,-1]},{size:4,px:[2,8,4,10],py:[4,23,7,23],pz:[2,0,1,0],nx:[9,4,11,9],ny:[21,5,16,0],nz:[0,-1,-1,-1]},{size:2,px:[6,3],py:[13,0],pz:[0,-1],nx:[8,2],ny:[11,2],nz:[0,2]},{size:2,px:[3,3],py:[1,4],pz:[1,-1],nx:[3,5],ny:[0,1],nz:[1,0]},{size:2,px:[7,2],py:[0,0],pz:[0,2],nx:[2,10],ny:[1,6],nz:[2,0]},{size:2,px:[10,2],py:[7,0],pz:[1,-1],nx:[21,5],ny:[15,4],nz:[0,2]},{size:2,px:[1,1],py:[10,9],pz:[0,0],nx:[0,3],ny:[13,11],nz:[0,-1]},{size:2,px:[11,9],py:[13,0],pz:[0,-1],nx:[3,3],ny:[4,3],nz:[1,1]},{size:5,px:[14,13,13,14,14],py:[12,10,11,13,13],pz:[0,0,0,0,-1],nx:[9,8,4,5,7],ny:[4,4,2,2,4],nz:[0,0,1,1,0]},{size:3,px:[2,4,1],py:[2,0,0],pz:[0,0,1],nx:[0,7,4],ny:[0,3,2],nz:[1,-1,-1]},{size:2,px:[11,4],py:[5,0],pz:[0,-1],nx:[8,6],ny:[4,9],nz:[1,1]},{size:3,px:[0,0,0],py:[20,2,4],pz:[0,-1,-1],nx:[12,3,10],ny:[3,1,3],nz:[0,2,0]},{size:5,px:[5,11,10,13,13],py:[0,0,0,2,2],pz:[1,0,0,0,-1],nx:[4,5,5,4,5],ny:[14,0,2,6,1],nz:[0,0,0,0,0]},{size:2,px:[2,4],py:[3,6],pz:[2,1],nx:[3,11],ny:[4,1],nz:[1,-1]},{size:2,px:[14,-1715597992],py:[19,9],pz:[0,-1],nx:[7,14],ny:[10,17],nz:[1,0]},{size:2,px:[11,1],py:[9,0],pz:[0,-1],nx:[1,12],ny:[2,10],nz:[2,0]},{size:2,px:[17,9],py:[13,17],pz:[0,-1],nx:[8,4],ny:[4,4],nz:[1,1]},{size:2,px:[0,7],py:[1,9],pz:[1,-1],nx:[18,4],ny:[14,2],nz:[0,2]},{size:2,px:[14,7],py:[23,9],pz:[0,-1],nx:[4,8],ny:[5,10],nz:[2,1]},{size:2,px:[8,7],py:[17,9],pz:[0,-1],nx:[3,2],ny:[0,3],nz:[0,0]},{size:2,px:[13,4],py:[20,1],pz:[0,-1],nx:[5,3],ny:[21,17],nz:[0,0]},{size:3,px:[0,0,1],py:[3,6,15],pz:[2,1,0],nx:[10,8,3],ny:[6,4,2],nz:[0,-1,-1]},{size:2,px:[8,8],py:[18,8],pz:[0,-1],nx:[5,4],ny:[8,10],nz:[1,1]},{size:2,px:[6,5],py:[2,2],pz:[1,1],nx:[8,9],ny:[4,3],nz:[1,-1]},{size:2,px:[6,3],py:[11,5],pz:[1,2],nx:[13,3],ny:[19,2],nz:[0,-1]},{size:2,px:[4,6],py:[1,11],pz:[2,-1],nx:[3,2],ny:[1,0],nz:[1,2]},{size:2,px:[9,4],py:[10,5],pz:[1,2],nx:[8,4],ny:[10,4],nz:[1,-1]},{size:2,px:[12,12],py:[11,20],pz:[0,-1],nx:[0,0],ny:[6,10],nz:[1,0]},{size:2,px:[7,12],py:[2,20],pz:[0,-1],nx:[2,2],ny:[2,3],nz:[2,2]},{size:2,px:[0,15],py:[5,21],pz:[1,-1],nx:[10,9],ny:[3,3],nz:[0,1]},{size:2,px:[15,9],py:[1,0],pz:[0,1],nx:[19,3],ny:[0,3],nz:[0,-1]},{size:2,px:[21,5],py:[13,5],pz:[0,2],nx:[23,6],ny:[23,5],nz:[0,-1]},{size:2,px:[5,8],py:[3,1],pz:[2,-1],nx:[9,9],ny:[6,5],nz:[1,1]},{size:2,px:[2,2],py:[7,7],pz:[1,-1],nx:[5,3],ny:[23,17],nz:[0,0]},{size:2,px:[11,3],py:[6,4],pz:[0,-1],nx:[2,4],ny:[2,4],nz:[2,1]},{size:3,px:[14,0,17],py:[20,3,21],pz:[0,-1,-1],nx:[11,11,11],ny:[7,9,10],nz:[1,1,1]},{size:5,px:[11,11,23,23,12],py:[10,11,21,20,12],pz:[1,1,0,0,0],nx:[8,3,6,7,7],ny:[4,5,11,11,11],nz:[1,2,1,1,-1]},{size:2,px:[11,11],py:[11,10],pz:[0,0],nx:[9,3],ny:[2,5],nz:[1,-1]},{size:2,px:[12,14],py:[19,19],pz:[0,0],nx:[12,13],ny:[18,17],nz:[0,-1]},{size:5,px:[13,14,12,15,14],py:[0,0,1,1,1],pz:[0,0,0,0,0],nx:[4,8,4,7,7],ny:[3,4,2,5,5],nz:[2,1,2,1,-1]},{size:2,px:[17,5],py:[10,2],pz:[0,-1],nx:[4,9],ny:[2,3],nz:[2,1]},{size:2,px:[18,10],py:[6,10],pz:[0,-1],nx:[8,4],ny:[4,2],nz:[1,2]},{size:5,px:[8,18,8,4,16],py:[6,12,9,4,13],pz:[1,0,1,2,0],nx:[3,4,3,5,5],ny:[0,2,3,1,1],nz:[1,0,0,0,-1]},{size:2,px:[3,6],py:[2,4],pz:[2,1],nx:[8,0],ny:[4,0],nz:[1,-1]},{size:2,px:[0,0],py:[4,5],pz:[2,-1],nx:[4,2],ny:[14,7],nz:[0,1]},{size:4,px:[3,4,4,3],py:[11,12,12,2],pz:[0,0,-1,-1],nx:[1,2,1,2],ny:[11,14,12,16],nz:[0,0,0,0]},{size:2,px:[6,0],py:[11,0],pz:[0,-1],nx:[3,4],ny:[4,5],nz:[1,1]},{size:2,px:[3,2],py:[21,11],pz:[0,1],nx:[3,2],ny:[10,0],nz:[1,-1]},{size:3,px:[10,3,13],py:[2,0,2],pz:[0,2,0],nx:[7,16,1],ny:[10,4,1],nz:[0,-1,-1]},{size:2,px:[6,12],py:[2,5],pz:[1,0],nx:[6,18],ny:[1,19],nz:[1,-1]},{size:2,px:[3,16],py:[0,16],pz:[1,-1],nx:[11,2],ny:[5,1],nz:[0,2]},{size:2,px:[11,10],py:[13,1],pz:[0,-1],nx:[1,1],ny:[22,21],nz:[0,0]},{size:2,px:[11,10],py:[18,18],pz:[0,0],nx:[5,8],ny:[9,0],nz:[1,-1]},{size:2,px:[3,2],py:[20,18],pz:[0,0],nx:[8,3],ny:[5,1],nz:[1,-1]},{size:2,px:[14,2],py:[17,1],pz:[0,-1],nx:[14,13],ny:[15,15],nz:[0,0]},{size:2,px:[3,4],py:[2,3],pz:[2,2],nx:[8,3],ny:[4,0],nz:[1,-1]},{size:5,px:[8,18,18,8,7],py:[6,11,11,7,9],pz:[1,0,-1,-1,-1],nx:[5,13,5,11,5],ny:[3,11,0,8,2],nz:[2,0,2,1,2]},{size:5,px:[12,0,5,4,7],py:[15,0,4,0,9],pz:[0,-1,-1,-1,-1],nx:[8,7,4,16,6],ny:[17,12,9,10,12],nz:[0,0,1,0,0]},{size:2,px:[6,7],py:[14,1],pz:[0,-1],nx:[5,4],ny:[9,4],nz:[1,1]},{size:4,px:[8,0,22,4],py:[4,4,23,0],pz:[0,-1,-1,-1],nx:[2,4,2,5],ny:[0,1,2,9],nz:[2,1,2,1]},{size:5,px:[9,9,10,10,8],py:[0,1,1,2,0],pz:[1,1,1,1,1],nx:[4,16,16,16,6],ny:[2,11,11,11,12],nz:[2,0,-1,-1,-1]},{size:2,px:[6,6],py:[6,5],pz:[1,1],nx:[0,4],ny:[3,2],nz:[1,-1]},{size:3,px:[10,3,4],py:[5,9,8],pz:[1,-1,-1],nx:[11,23,23],ny:[7,12,11],nz:[1,0,0]},{size:3,px:[13,12,7],py:[19,19,10],pz:[0,0,1],nx:[13,5,19],ny:[20,15,22],nz:[0,-1,-1]},{size:2,px:[12,12],py:[12,13],pz:[0,0],nx:[9,10],ny:[4,4],nz:[1,-1]},{size:2,px:[0,12],py:[1,13],pz:[2,-1],nx:[2,7],ny:[2,13],nz:[2,0]},{size:2,px:[10,10],py:[8,9],pz:[1,1],nx:[19,7],ny:[23,13],nz:[0,-1]},{size:4,px:[8,7,23,15],py:[11,12,4,21],pz:[0,0,-1,-1],nx:[2,5,1,10],ny:[6,6,2,13],nz:[0,1,1,0]},{size:2,px:[10,9],py:[3,3],pz:[0,0],nx:[2,3],ny:[2,4],nz:[2,-1]},{size:2,px:[5,2],py:[3,4],pz:[2,-1],nx:[3,6],ny:[1,2],nz:[2,1]},{size:2,px:[7,11],py:[20,16],pz:[0,-1],nx:[2,4],ny:[5,20],nz:[2,0]},{size:2,px:[9,7],py:[7,5],pz:[1,-1],nx:[8,4],ny:[4,2],nz:[1,2]},{size:2,px:[4,2],py:[11,3],pz:[1,2],nx:[5,5],ny:[3,5],nz:[2,-1]},{size:2,px:[11,3],py:[11,5],pz:[1,-1],nx:[4,1],ny:[12,3],nz:[0,2]},{size:2,px:[9,11],py:[6,4],pz:[1,-1],nx:[10,20],ny:[9,18],nz:[1,0]},{size:5,px:[2,2,2,2,1],py:[15,13,16,14,7],pz:[0,0,0,0,1],nx:[15,8,9,8,4],ny:[11,6,5,5,4],nz:[0,1,1,1,-1]},{size:2,px:[12,2],py:[5,5],pz:[0,-1],nx:[3,2],ny:[7,2],nz:[1,2]},{size:2,px:[5,11],py:[1,3],pz:[2,1],nx:[10,10],ny:[3,3],nz:[1,-1]},{size:2,px:[17,11],py:[13,18],pz:[0,-1],nx:[6,9],ny:[9,4],nz:[1,1]},{size:5,px:[5,1,2,5,6],py:[14,4,9,15,23],pz:[0,2,1,0,0],nx:[4,9,18,16,17],ny:[0,1,1,0,0],nz:[2,1,0,0,0]},{size:2,px:[16,17],py:[0,0],pz:[0,0],nx:[23,23],ny:[5,4],nz:[0,-1]},{size:2,px:[13,8],py:[20,6],pz:[0,-1],nx:[5,6],ny:[12,10],nz:[0,1]},{size:2,px:[6,15],py:[15,0],pz:[0,-1],nx:[6,3],ny:[16,4],nz:[0,1]},{size:2,px:[18,20],py:[7,8],pz:[0,0],nx:[18,11],ny:[9,14],nz:[0,-1]},{size:2,px:[9,4],py:[12,6],pz:[0,1],nx:[3,15],ny:[4,4],nz:[1,-1]},{size:2,px:[0,0],py:[5,2],pz:[1,2],nx:[5,5],ny:[2,2],nz:[1,-1]},{size:2,px:[5,20],py:[1,20],pz:[1,-1],nx:[15,17],ny:[1,2],nz:[0,0]},{size:2,px:[7,2],py:[16,4],pz:[0,2],nx:[4,0],ny:[10,6],nz:[1,-1]},{size:2,px:[3,8],py:[5,0],pz:[1,-1],nx:[1,1],ny:[10,18],nz:[1,0]},{size:2,px:[22,0],py:[3,0],pz:[0,-1],nx:[23,11],ny:[4,1],nz:[0,1]},{size:3,px:[19,10,20],py:[21,8,18],pz:[0,1,0],nx:[3,6,20],ny:[5,11,14],nz:[2,-1,-1]},{size:4,px:[2,1,6,5],py:[7,4,23,22],pz:[1,2,0,0],nx:[9,19,20,4],ny:[8,11,9,2],nz:[0,-1,-1,-1]},{size:2,px:[3,6],py:[2,11],pz:[2,1],nx:[12,10],ny:[21,9],nz:[0,-1]},{size:4,px:[6,0,2,2],py:[6,1,4,1],pz:[1,-1,-1,-1],nx:[0,0,0,0],ny:[5,8,9,4],nz:[1,0,0,1]},{size:5,px:[3,13,6,11,9],py:[0,3,1,1,2],pz:[2,0,1,0,0],nx:[7,20,16,4,7],ny:[7,2,19,2,6],nz:[1,0,0,2,1]},{size:4,px:[7,5,2,6],py:[7,7,4,11],pz:[0,0,2,1],nx:[7,1,21,0],ny:[8,4,11,3],nz:[0,-1,-1,-1]},{size:2,px:[2,2],py:[3,2],pz:[2,2],nx:[8,9],ny:[3,11],nz:[1,-1]},{size:2,px:[7,13],py:[3,5],pz:[1,0],nx:[4,3],ny:[2,2],nz:[1,-1]},{size:4,px:[3,12,13,11],py:[0,1,1,1],pz:[2,0,0,0],nx:[8,9,13,0],ny:[4,1,16,3],nz:[1,-1,-1,-1]},{size:2,px:[10,1],py:[4,14],pz:[0,-1],nx:[5,10],ny:[1,2],nz:[1,0]},{size:2,px:[11,12],py:[21,21],pz:[0,0],nx:[10,11],ny:[19,19],nz:[0,0]},{size:2,px:[8,12],py:[6,21],pz:[1,-1],nx:[4,8],ny:[2,4],nz:[2,1]},{size:2,px:[11,7],py:[19,0],pz:[0,-1],nx:[6,5],ny:[9,11],nz:[1,1]},{size:5,px:[11,11,11,10,10],py:[10,12,11,13,13],pz:[0,0,0,0,-1],nx:[7,13,6,12,7],ny:[10,6,3,6,11],nz:[0,0,1,0,0]},{size:2,px:[12,11],py:[6,12],pz:[0,-1],nx:[4,8],ny:[4,4],nz:[1,1]},{size:5,px:[16,15,16,15,17],py:[1,0,0,1,1],pz:[0,0,0,0,0],nx:[13,7,6,12,12],ny:[5,4,3,6,6],nz:[0,1,1,0,-1]},{size:2,px:[2,3],py:[1,3],pz:[2,1],nx:[1,5],ny:[1,3],nz:[2,-1]},{size:2,px:[6,3],py:[13,6],pz:[0,1],nx:[4,9],ny:[4,4],nz:[1,-1]},{size:2,px:[0,3],py:[4,3],pz:[1,-1],nx:[4,8],ny:[3,6],nz:[2,1]},{size:2,px:[6,3],py:[2,1],pz:[0,1],nx:[5,5],ny:[7,21],nz:[1,-1]},{size:2,px:[8,4],py:[0,0],pz:[1,-1],nx:[19,17],ny:[1,0],nz:[0,0]},{size:4,px:[8,11,5,0],py:[6,1,1,22],pz:[1,-1,-1,-1],nx:[0,10,10,1],ny:[6,12,13,4],nz:[1,0,0,1]},{size:2,px:[8,17],py:[6,13],pz:[1,0],nx:[14,17],ny:[9,3],nz:[0,-1]},{size:2,px:[5,8],py:[0,4],pz:[2,-1],nx:[9,8],ny:[1,1],nz:[0,0]},{size:2,px:[11,14],py:[13,9],pz:[0,-1],nx:[23,23],ny:[21,19],nz:[0,0]},{size:2,px:[10,9],py:[9,3],pz:[0,-1],nx:[6,3],ny:[2,1],nz:[1,2]},{size:2,px:[11,1],py:[4,4],pz:[0,-1],nx:[2,4],ny:[2,4],nz:[2,1]},{size:2,px:[5,9],py:[3,3],pz:[2,-1],nx:[17,9],ny:[12,5],nz:[0,1]},{size:2,px:[9,7],py:[18,16],pz:[0,-1],nx:[5,2],ny:[9,5],nz:[1,2]},{size:2,px:[3,6],py:[0,1],pz:[1,-1],nx:[4,5],ny:[1,0],nz:[0,0]}],alpha:[-1.149973,1.149973,-.6844773,.6844773,-.6635048,.6635048,-.4888349,.4888349,-.4267976,.4267976,-.42581,.42581,-.4815853,.4815853,-.4091859,.4091859,-.3137414,.3137414,-.333986,.333986,-.3891196,.3891196,-.4167691,.4167691,-.3186609,.3186609,-.2957171,.2957171,-.3210062,.3210062,-.2725684,.2725684,-.2452176,.2452176,-.2812662,.2812662,-.3029622,.3029622,-.3293745,.3293745,-.3441536,.3441536,-.2946918,.2946918,-.2890545,.2890545,-.1949205,.1949205,-.2176102,.2176102,-.259519,.259519,-.2690931,.2690931,-.2130294,.2130294,-.2316308,.2316308,-.2798562,.2798562,-.2146988,.2146988,-.2332089,.2332089,-.2470614,.2470614,-.22043,.22043,-.2272045,.2272045,-.2583686,.2583686,-.2072299,.2072299,-.1834971,.1834971,-.2332656,.2332656,-.3271297,.3271297,-.2401937,.2401937,-.2006316,.2006316,-.2401947,.2401947,-.2475346,.2475346,-.2579532,.2579532,-.2466235,.2466235,-.1787582,.1787582,-.2036892,.2036892,-.1665028,.1665028,-.157651,.157651,-.2036997,.2036997,-.2040734,.2040734,-.1792532,.1792532,-.2174767,.2174767,-.1876948,.1876948,-.1883137,.1883137,-.1923872,.1923872,-.2620218,.2620218,-.1659873,.1659873,-.1475948,.1475948,-.1731607,.1731607,-.2059256,.2059256,-.1586309,.1586309,-.1607668,.1607668,-.1975101,.1975101,-.2130745,.2130745,-.1898872,.1898872,-.2052598,.2052598,-.1599397,.1599397,-.1770134,.1770134,-.1888249,.1888249,-.1515406,.1515406,-.1907771,.1907771,-.1698406,.1698406,-.2079535,.2079535,-.1966967,.1966967,-.1631391,.1631391,-.2158666,.2158666,-.2891774,.2891774,-.1581556,.1581556,-.1475359,.1475359,-.1806169,.1806169,-.1782238,.1782238,-.166044,.166044,-.1576919,.1576919,-.1741775,.1741775,-.1427265,.1427265,-.169588,.169588,-.1486712,.1486712,-.1533565,.1533565,-.1601464,.1601464,-.1978414,.1978414,-.1746566,.1746566,-.1794736,.1794736,-.1896567,.1896567,-.1666197,.1666197,-.1969351,.1969351,-.2321735,.2321735,-.1592485,.1592485,-.1671464,.1671464,-.1688885,.1688885,-.1868042,.1868042,-.1301138,.1301138,-.1330094,.1330094,-.1268423,.1268423,-.1820868,.1820868,-.188102,.188102,-.1580814,.1580814,-.1302653,.1302653,-.1787262,.1787262,-.1658453,.1658453,-.1240772,.1240772,-.1315621,.1315621,-.1756341,.1756341,-.1429438,.1429438,-.1351775,.1351775,-.2035692,.2035692,-.126767,.126767,-.128847,.128847,-.1393648,.1393648,-.1755962,.1755962,-.1308445,.1308445,-.1703894,.1703894,-.1461334,.1461334,-.1368683,.1368683,-.1244085,.1244085,-.1718163,.1718163,-.1415624,.1415624,-.1752024,.1752024,-.1666463,.1666463,-.1407325,.1407325,-.1258317,.1258317,-.1416511,.1416511,-.1420816,.1420816,-.1562547,.1562547,-.1542952,.1542952,-.1158829,.1158829,-.1392875,.1392875,-.1610095,.1610095,-.154644,.154644,-.1416235,.1416235,-.2028817,.2028817,-.1106779,.1106779,-.0923166,.0923166,-.116446,.116446,-.1701578,.1701578,-.1277995,.1277995,-.1946177,.1946177,-.1394509,.1394509,-.1370145,.1370145,-.1446031,.1446031,-.1665215,.1665215,-.1435822,.1435822,-.1559354,.1559354,-.159186,.159186,-.1193338,.1193338,-.1236954,.1236954,-.1209139,.1209139,-.1267385,.1267385,-.1232397,.1232397,-.1299632,.1299632,-.130202,.130202,-.1202975,.1202975,-.1525378,.1525378,-.1123073,.1123073,-.1605678,.1605678,-.1406867,.1406867,-.1354273,.1354273,-.1393192,.1393192,-.1278263,.1278263,-.1172073,.1172073,-.1153493,.1153493,-.1356318,.1356318,-.1316614,.1316614,-.1374489,.1374489,-.1018254,.1018254,-.1473336,.1473336,-.1289687,.1289687,-.1299183,.1299183,-.1178391,.1178391,-.1619059,.1619059,-.1842569,.1842569,-.1829095,.1829095,-.1939918,.1939918,-.1395362,.1395362,-.1774673,.1774673,-.1688216,.1688216,-.1671747,.1671747,-.1850178,.1850178,-.1106695,.1106695,-.1258323,.1258323,-.1246819,.1246819,-.09892193,.09892193,-.1399638,.1399638,-.1228375,.1228375,-.1756236,.1756236,-.1360307,.1360307,-.1266574,.1266574,-.1372135,.1372135,-.1175947,.1175947,-.1330075,.1330075,-.1396152,.1396152,-.2088443,.2088443]},{count:301,threshold:-4.887516,feature:[{size:5,px:[8,11,8,14,10],py:[6,9,3,3,4],pz:[1,0,0,0,0],nx:[8,7,19,7,13],ny:[11,8,8,5,8],nz:[1,1,0,1,0]},{size:5,px:[14,3,13,12,12],py:[4,6,4,4,8],pz:[0,1,0,0,0],nx:[2,5,2,10,10],ny:[2,8,5,8,8],nz:[2,1,2,0,-1]},{size:5,px:[6,5,3,7,7],py:[2,3,1,2,2],pz:[0,0,1,0,-1],nx:[2,2,1,2,1],ny:[3,1,2,2,2],nz:[0,0,2,0,1]},{size:5,px:[3,3,6,12,8],py:[4,2,4,10,17],pz:[2,2,1,0,0],nx:[4,8,8,2,1],ny:[4,4,4,2,2],nz:[1,1,-1,-1,-1]},{size:5,px:[18,19,17,9,16],py:[1,2,2,0,2],pz:[0,0,0,1,0],nx:[23,23,22,22,22],ny:[4,3,1,0,2],nz:[0,0,0,0,0]},{size:3,px:[15,4,14],py:[23,4,18],pz:[0,2,0],nx:[7,0,5],ny:[10,4,9],nz:[1,-1,-1]},{size:5,px:[11,11,16,11,17],py:[8,6,11,7,11],pz:[0,0,0,0,0],nx:[8,4,14,14,1],ny:[4,4,8,8,5],nz:[1,1,0,-1,-1]},{size:5,px:[12,12,12,12,12],py:[13,10,11,12,12],pz:[0,0,0,0,-1],nx:[4,4,1,2,9],ny:[8,10,2,4,15],nz:[0,1,2,1,0]},{size:2,px:[19,0],py:[14,17],pz:[0,-1],nx:[20,19],ny:[15,22],nz:[0,0]},{size:5,px:[3,3,1,3,5],py:[13,15,6,14,22],pz:[0,0,1,0,0],nx:[0,0,1,0,0],ny:[11,21,23,5,5],nz:[1,0,0,2,-1]},{size:5,px:[4,2,10,4,3],py:[19,4,13,16,13],pz:[0,1,0,0,0],nx:[3,20,7,4,0],ny:[4,19,5,1,5],nz:[1,-1,-1,-1,-1]},{size:2,px:[11,5],py:[4,4],pz:[0,-1],nx:[15,3],ny:[15,1],nz:[0,2]},{size:4,px:[17,17,12,11],py:[14,15,18,18],pz:[0,0,0,0],nx:[11,4,1,0],ny:[17,20,8,5],nz:[0,-1,-1,-1]},{size:5,px:[6,2,1,2,11],py:[14,4,1,1,18],pz:[0,-1,-1,-1,-1],nx:[5,5,3,5,2],ny:[18,17,7,9,2],nz:[0,0,1,1,2]},{size:5,px:[20,19,20,15,20],py:[17,20,12,12,8],pz:[0,0,0,0,0],nx:[17,0,5,2,2],ny:[8,4,9,2,2],nz:[0,-1,-1,-1,-1]},{size:2,px:[6,8],py:[7,11],pz:[1,-1],nx:[7,8],ny:[7,10],nz:[1,1]},{size:5,px:[15,16,14,8,8],py:[2,2,2,0,0],pz:[0,0,0,1,-1],nx:[20,11,21,18,19],ny:[3,6,5,1,2],nz:[0,1,0,0,0]},{size:4,px:[17,18,9,8],py:[23,21,7,8],pz:[0,0,1,1],nx:[8,17,10,18],ny:[4,12,2,1],nz:[1,-1,-1,-1]},{size:5,px:[2,2,9,4,8],py:[7,3,12,12,23],pz:[1,1,0,0,0],nx:[0,0,0,0,0],ny:[3,1,2,4,4],nz:[0,0,0,0,-1]},{size:3,px:[7,8,5],py:[22,23,9],pz:[0,0,1],nx:[9,4,2],ny:[21,4,0],nz:[0,-1,-1]},{size:2,px:[3,3],py:[7,7],pz:[1,-1],nx:[3,2],ny:[4,2],nz:[1,2]},{size:5,px:[15,11,10,3,17],py:[0,1,2,3,1],pz:[0,0,0,2,0],nx:[5,8,4,3,3],ny:[9,4,7,10,10],nz:[1,1,1,1,-1]},{size:3,px:[22,11,22],py:[12,5,14],pz:[0,1,0],nx:[23,23,3],ny:[22,23,8],nz:[0,0,-1]},{size:2,px:[3,11],py:[7,5],pz:[1,-1],nx:[8,2],ny:[14,5],nz:[0,2]},{size:4,px:[17,16,2,4],py:[14,13,5,0],pz:[0,0,-1,-1],nx:[8,9,15,8],ny:[8,9,14,7],nz:[1,1,0,1]},{size:2,px:[5,16],py:[6,13],pz:[1,-1],nx:[2,1],ny:[4,2],nz:[1,2]},{size:5,px:[1,0,1,2,1],py:[15,2,16,19,12],pz:[0,2,0,0,0],nx:[8,7,4,9,9],ny:[5,11,4,5,5],nz:[1,1,1,1,-1]},{size:2,px:[8,7],py:[11,12],pz:[0,0],nx:[9,1],ny:[10,16],nz:[0,-1]},{size:2,px:[15,13],py:[17,10],pz:[0,-1],nx:[7,4],ny:[8,4],nz:[1,2]},{size:5,px:[11,10,7,8,9],py:[0,0,1,1,1],pz:[0,0,0,0,0],nx:[4,5,4,5,6],ny:[1,0,2,1,0],nz:[0,0,0,0,-1]},{size:2,px:[2,2],py:[4,3],pz:[2,2],nx:[3,21],ny:[4,20],nz:[1,-1]},{size:5,px:[10,11,5,2,11],py:[12,10,6,11,11],pz:[0,0,1,0,0],nx:[4,15,16,7,7],ny:[5,10,11,10,10],nz:[1,0,0,0,-1]},{size:5,px:[13,14,1,11,11],py:[2,2,3,2,2],pz:[0,0,2,0,-1],nx:[3,0,0,1,0],ny:[23,15,14,9,8],nz:[0,0,0,1,1]},{size:2,px:[17,2],py:[13,5],pz:[0,-1],nx:[4,9],ny:[2,4],nz:[2,1]},{size:2,px:[10,5],py:[4,1],pz:[0,-1],nx:[11,3],ny:[3,0],nz:[0,2]},{size:2,px:[5,3],py:[3,3],pz:[2,-1],nx:[11,23],ny:[8,14],nz:[1,0]},{size:3,px:[22,22,22],py:[16,18,9],pz:[0,0,0],nx:[13,2,0],ny:[17,3,5],nz:[0,-1,-1]},{size:5,px:[13,10,13,14,11],py:[2,2,1,2,1],pz:[0,0,0,0,0],nx:[3,3,8,6,6],ny:[2,5,4,11,11],nz:[2,2,1,1,-1]},{size:3,px:[12,1,1],py:[14,0,1],pz:[0,-1,-1],nx:[8,15,7],ny:[1,2,0],nz:[1,0,1]},{size:2,px:[4,5],py:[20,23],pz:[0,0],nx:[3,3],ny:[10,2],nz:[1,-1]},{size:2,px:[2,4],py:[7,2],pz:[1,-1],nx:[4,3],ny:[23,16],nz:[0,0]},{size:3,px:[3,3,6],py:[5,2,4],pz:[2,2,1],nx:[3,1,2],ny:[5,17,0],nz:[1,-1,-1]},{size:2,px:[14,8],py:[17,6],pz:[0,1],nx:[13,10],ny:[16,9],nz:[0,-1]},{size:5,px:[15,7,14,13,14],py:[1,0,0,0,1],pz:[0,1,0,0,0],nx:[4,4,4,8,8],ny:[5,3,2,10,10],nz:[2,2,2,1,-1]},{size:5,px:[8,9,4,5,4],py:[13,12,9,5,7],pz:[0,0,1,1,1],nx:[22,21,22,22,22],ny:[4,0,3,2,2],nz:[0,0,0,0,-1]},{size:2,px:[17,17],py:[16,13],pz:[0,0],nx:[14,21],ny:[8,0],nz:[0,-1]},{size:2,px:[16,10],py:[4,9],pz:[0,-1],nx:[16,10],ny:[3,3],nz:[0,1]},{size:5,px:[1,1,0,1,0],py:[17,16,7,15,8],pz:[0,0,1,0,0],nx:[4,3,8,9,7],ny:[3,3,6,6,6],nz:[1,1,0,0,-1]},{size:2,px:[3,3],py:[2,3],pz:[2,2],nx:[8,3],ny:[4,3],nz:[1,-1]},{size:2,px:[10,2],py:[17,4],pz:[0,2],nx:[10,12],ny:[15,14],nz:[0,-1]},{size:2,px:[11,11],py:[14,12],pz:[0,0],nx:[9,10],ny:[13,11],nz:[0,0]},{size:2,px:[12,13],py:[5,5],pz:[0,0],nx:[3,4],ny:[4,1],nz:[1,-1]},{size:5,px:[7,10,8,11,11],py:[13,2,12,2,2],pz:[0,0,0,0,-1],nx:[10,1,1,10,1],ny:[12,5,3,13,1],nz:[0,1,1,0,2]},{size:2,px:[6,10],py:[4,2],pz:[1,-1],nx:[4,6],ny:[4,9],nz:[1,1]},{size:2,px:[20,20],py:[21,22],pz:[0,0],nx:[15,8],ny:[5,5],nz:[0,-1]},{size:2,px:[4,3],py:[3,3],pz:[2,2],nx:[9,17],ny:[4,15],nz:[1,-1]},{size:3,px:[2,2,4],py:[3,3,7],pz:[2,-1,-1],nx:[7,4,4],ny:[6,5,4],nz:[1,2,2]},{size:5,px:[8,9,16,17,17],py:[1,2,1,1,1],pz:[1,1,0,0,-1],nx:[2,2,4,2,4],ny:[16,14,22,15,21],nz:[0,0,0,0,0]},{size:2,px:[9,9],py:[18,0],pz:[0,-1],nx:[2,5],ny:[5,8],nz:[2,1]},{size:2,px:[7,8],py:[11,11],pz:[0,0],nx:[15,5],ny:[8,8],nz:[0,-1]},{size:2,px:[0,3],py:[4,3],pz:[2,-1],nx:[1,6],ny:[4,14],nz:[2,0]},{size:2,px:[6,12],py:[7,11],pz:[1,-1],nx:[0,0],ny:[7,12],nz:[1,0]},{size:2,px:[3,7],py:[10,22],pz:[1,0],nx:[4,3],ny:[10,0],nz:[1,-1]},{size:2,px:[5,19],py:[4,21],pz:[2,-1],nx:[11,11],ny:[8,9],nz:[1,1]},{size:2,px:[3,3],py:[8,7],pz:[1,1],nx:[4,20],ny:[4,5],nz:[1,-1]},{size:5,px:[11,23,23,23,23],py:[7,13,19,20,21],pz:[1,0,0,0,0],nx:[4,3,2,8,8],ny:[11,5,5,23,23],nz:[1,1,2,0,-1]},{size:2,px:[4,1],py:[0,2],pz:[0,0],nx:[0,6],ny:[0,11],nz:[0,-1]},{size:2,px:[11,8],py:[12,1],pz:[0,-1],nx:[23,23],ny:[13,12],nz:[0,0]},{size:5,px:[23,11,23,11,11],py:[13,7,12,5,6],pz:[0,1,0,1,1],nx:[6,3,8,7,7],ny:[12,4,4,11,11],nz:[0,1,1,0,-1]},{size:2,px:[20,5],py:[15,5],pz:[0,-1],nx:[10,10],ny:[11,10],nz:[1,1]},{size:2,px:[11,4],py:[19,8],pz:[0,1],nx:[11,19],ny:[18,2],nz:[0,-1]},{size:2,px:[14,6],py:[3,4],pz:[0,-1],nx:[8,15],ny:[1,0],nz:[1,0]},{size:4,px:[14,5,13,12],py:[23,3,23,23],pz:[0,1,0,0],nx:[12,0,1,4],ny:[21,3,2,4],nz:[0,-1,-1,-1]},{size:2,px:[19,5],py:[12,2],pz:[0,-1],nx:[4,7],ny:[3,5],nz:[2,1]},{size:2,px:[0,8],py:[5,3],pz:[2,-1],nx:[5,22],ny:[3,11],nz:[2,0]},{size:2,px:[2,6],py:[3,12],pz:[2,0],nx:[3,5],ny:[4,2],nz:[1,-1]},{size:2,px:[5,5],py:[0,6],pz:[2,-1],nx:[14,6],ny:[4,2],nz:[0,1]},{size:2,px:[16,11],py:[1,0],pz:[0,-1],nx:[4,8],ny:[4,10],nz:[2,1]},{size:2,px:[9,4],py:[4,3],pz:[1,1],nx:[5,8],ny:[0,10],nz:[2,-1]},{size:2,px:[16,1],py:[22,1],pz:[0,-1],nx:[2,2],ny:[4,2],nz:[2,2]},{size:2,px:[12,2],py:[11,2],pz:[0,-1],nx:[5,5],ny:[1,0],nz:[2,2]},{size:2,px:[11,11],py:[4,3],pz:[1,1],nx:[7,5],ny:[4,0],nz:[1,-1]},{size:2,px:[9,2],py:[22,3],pz:[0,2],nx:[4,9],ny:[10,11],nz:[1,-1]},{size:2,px:[2,4],py:[8,10],pz:[1,-1],nx:[5,3],ny:[23,18],nz:[0,0]},{size:2,px:[12,6],py:[21,9],pz:[0,-1],nx:[11,23],ny:[6,10],nz:[1,0]},{size:2,px:[9,9],py:[8,7],pz:[1,1],nx:[18,8],ny:[18,6],nz:[0,-1]},{size:2,px:[13,3],py:[19,0],pz:[0,-1],nx:[6,5],ny:[9,11],nz:[1,1]},{size:5,px:[2,10,9,7,8],py:[0,1,0,1,0],pz:[2,0,0,0,0],nx:[3,4,6,8,8],ny:[2,4,9,4,4],nz:[2,1,1,1,-1]},{size:2,px:[8,4],py:[6,3],pz:[1,2],nx:[9,4],ny:[4,2],nz:[1,-1]},{size:2,px:[0,4],py:[23,3],pz:[0,-1],nx:[12,9],ny:[2,2],nz:[0,0]},{size:2,px:[4,2],py:[10,3],pz:[1,2],nx:[0,2],ny:[23,5],nz:[0,-1]},{size:2,px:[12,14],py:[18,0],pz:[0,-1],nx:[12,8],ny:[16,10],nz:[0,1]},{size:4,px:[10,18,7,5],py:[14,8,0,3],pz:[0,-1,-1,-1],nx:[8,6,8,5],ny:[11,12,5,5],nz:[0,0,1,1]},{size:2,px:[6,5],py:[2,2],pz:[1,1],nx:[8,8],ny:[4,2],nz:[1,-1]},{size:2,px:[12,10],py:[20,20],pz:[0,0],nx:[11,10],ny:[19,19],nz:[0,0]},{size:2,px:[17,10],py:[16,20],pz:[0,-1],nx:[8,7],ny:[4,8],nz:[1,1]},{size:3,px:[2,1,3],py:[20,4,21],pz:[0,2,0],nx:[3,4,0],ny:[10,1,0],nz:[1,-1,-1]},{size:5,px:[6,7,3,6,6],py:[15,14,7,16,19],pz:[0,0,1,0,0],nx:[0,0,0,0,0],ny:[18,19,16,17,17],nz:[0,0,0,0,-1]},{size:2,px:[8,16],py:[6,12],pz:[1,0],nx:[8,15],ny:[4,10],nz:[1,-1]},{size:5,px:[0,0,0,0,0],py:[1,3,2,0,4],pz:[2,2,2,2,1],nx:[13,8,14,4,7],ny:[23,6,23,3,9],nz:[0,1,0,2,-1]},{size:2,px:[3,6],py:[3,5],pz:[2,1],nx:[10,8],ny:[11,6],nz:[0,-1]},{size:2,px:[11,10],py:[4,4],pz:[0,0],nx:[8,5],ny:[4,9],nz:[1,-1]},{size:5,px:[15,18,9,16,4],py:[12,13,6,23,3],pz:[0,0,1,0,2],nx:[6,3,6,2,7],ny:[2,3,0,1,0],nz:[0,0,0,1,0]},{size:2,px:[4,18],py:[12,13],pz:[0,-1],nx:[2,8],ny:[3,4],nz:[2,1]},{size:2,px:[4,2],py:[10,4],pz:[1,2],nx:[3,3],ny:[5,0],nz:[2,-1]},{size:2,px:[9,19],py:[7,8],pz:[1,0],nx:[8,3],ny:[4,0],nz:[1,-1]},{size:2,px:[6,0],py:[6,0],pz:[0,-1],nx:[0,0],ny:[7,2],nz:[1,2]},{size:2,px:[8,8],py:[0,0],pz:[1,-1],nx:[17,18],ny:[0,2],nz:[0,0]},{size:4,px:[13,4,4,1],py:[14,7,3,5],pz:[0,-1,-1,-1],nx:[3,16,3,7],ny:[1,15,5,13],nz:[2,0,2,0]},{size:2,px:[4,9],py:[6,11],pz:[1,0],nx:[3,23],ny:[4,8],nz:[1,-1]},{size:5,px:[9,17,4,16,16],py:[2,3,1,3,3],pz:[1,0,2,0,-1],nx:[2,3,3,2,3],ny:[1,7,2,3,3],nz:[2,1,1,1,1]},{size:2,px:[10,5],py:[22,9],pz:[0,1],nx:[10,3],ny:[21,2],nz:[0,-1]},{size:2,px:[11,11],py:[6,3],pz:[0,-1],nx:[8,5],ny:[4,3],nz:[1,1]},{size:2,px:[10,5],py:[8,3],pz:[0,-1],nx:[14,5],ny:[14,2],nz:[0,2]},{size:2,px:[7,8],py:[3,2],pz:[0,-1],nx:[8,2],ny:[18,2],nz:[0,2]},{size:2,px:[1,1],py:[19,11],pz:[0,1],nx:[9,4],ny:[5,1],nz:[0,-1]},{size:2,px:[2,4],py:[3,6],pz:[2,1],nx:[3,3],ny:[4,4],nz:[1,-1]},{size:5,px:[7,15,13,14,4],py:[6,12,9,11,4],pz:[1,0,0,0,2],nx:[7,3,8,4,5],ny:[0,3,0,2,1],nz:[0,0,0,0,0]},{size:5,px:[10,13,7,8,9],py:[0,1,1,0,1],pz:[0,0,0,0,0],nx:[7,4,4,4,8],ny:[8,3,4,2,4],nz:[1,2,2,2,1]},{size:2,px:[6,1],py:[6,0],pz:[1,-1],nx:[11,7],ny:[3,2],nz:[0,1]},{size:2,px:[13,0],py:[13,2],pz:[0,-1],nx:[0,1],ny:[13,16],nz:[0,0]},{size:2,px:[8,17],py:[6,13],pz:[1,0],nx:[8,1],ny:[4,16],nz:[1,-1]},{size:5,px:[12,11,3,6,17],py:[4,4,1,2,14],pz:[0,0,2,1,0],nx:[6,23,23,6,23],ny:[5,7,6,6,14],nz:[1,0,0,1,0]},{size:2,px:[5,22],py:[4,17],pz:[2,-1],nx:[4,8],ny:[5,7],nz:[2,1]},{size:2,px:[15,14],py:[1,1],pz:[0,0],nx:[4,7],ny:[2,4],nz:[2,-1]},{size:2,px:[15,17],py:[12,7],pz:[0,-1],nx:[14,10],ny:[11,4],nz:[0,1]},{size:4,px:[10,2,9,15],py:[5,11,1,13],pz:[0,-1,-1,-1],nx:[11,3,3,13],ny:[1,1,0,1],nz:[0,2,2,0]},{size:2,px:[7,21],py:[15,22],pz:[0,-1],nx:[4,9],ny:[8,14],nz:[1,0]},{size:2,px:[6,5],py:[21,2],pz:[0,-1],nx:[3,5],ny:[11,21],nz:[1,0]},{size:2,px:[17,7],py:[2,0],pz:[0,-1],nx:[4,8],ny:[5,11],nz:[2,1]},{size:2,px:[11,8],py:[10,4],pz:[0,-1],nx:[13,12],ny:[3,3],nz:[0,0]},{size:2,px:[6,5],py:[2,2],pz:[1,1],nx:[7,1],ny:[8,2],nz:[0,-1]},{size:5,px:[0,0,1,0,0],py:[12,4,14,0,2],pz:[0,1,0,2,2],nx:[9,5,8,4,4],ny:[6,3,6,3,3],nz:[0,1,0,1,-1]},{size:5,px:[8,0,0,3,2],py:[6,5,0,8,2],pz:[1,-1,-1,-1,-1],nx:[23,7,22,11,4],ny:[12,6,14,4,3],nz:[0,1,0,1,2]},{size:4,px:[12,12,4,8],py:[12,11,3,10],pz:[0,0,-1,-1],nx:[0,0,0,0],ny:[2,1,0,3],nz:[1,2,2,1]},{size:2,px:[10,6],py:[7,6],pz:[1,-1],nx:[16,4],ny:[12,2],nz:[0,2]},{size:5,px:[2,1,3,3,3],py:[14,8,20,21,21],pz:[0,1,0,0,-1],nx:[20,10,21,21,21],ny:[23,11,21,23,20],nz:[0,1,0,0,0]},{size:2,px:[6,13],py:[2,4],pz:[1,0],nx:[7,21],ny:[8,0],nz:[0,-1]},{size:2,px:[12,3],py:[17,4],pz:[0,2],nx:[11,10],ny:[15,7],nz:[0,-1]},{size:4,px:[11,0,19,2],py:[15,2,23,10],pz:[0,-1,-1,-1],nx:[6,8,16,2],ny:[13,11,10,2],nz:[0,0,0,2]},{size:2,px:[6,3],py:[14,7],pz:[0,1],nx:[3,1],ny:[4,1],nz:[1,-1]},{size:4,px:[12,17,5,10],py:[19,15,14,3],pz:[0,-1,-1,-1],nx:[4,12,6,12],ny:[4,18,9,22],nz:[1,0,1,0]},{size:2,px:[8,3],py:[13,5],pz:[0,-1],nx:[3,4],ny:[4,9],nz:[1,1]},{size:5,px:[6,5,4,5,3],py:[2,1,2,2,0],pz:[0,0,0,0,1],nx:[7,4,9,18,18],ny:[4,4,7,14,14],nz:[1,1,1,0,-1]},{size:4,px:[8,3,20,1],py:[6,3,18,0],pz:[1,-1,-1,-1],nx:[13,11,5,22],ny:[12,6,2,17],nz:[0,1,2,0]},{size:2,px:[6,3],py:[6,3],pz:[1,2],nx:[8,5],ny:[4,2],nz:[1,-1]},{size:2,px:[21,7],py:[14,7],pz:[0,1],nx:[16,11],ny:[14,6],nz:[0,-1]},{size:2,px:[10,4],py:[3,1],pz:[0,-1],nx:[9,5],ny:[0,0],nz:[0,1]},{size:2,px:[4,10],py:[5,8],pz:[2,1],nx:[5,14],ny:[9,7],nz:[1,-1]},{size:2,px:[9,2],py:[23,4],pz:[0,2],nx:[2,2],ny:[5,5],nz:[2,-1]},{size:5,px:[10,9,11,10,10],py:[2,2,1,1,1],pz:[0,0,0,0,-1],nx:[2,3,2,4,5],ny:[4,10,2,4,3],nz:[2,1,1,0,0]},{size:2,px:[11,4],py:[13,4],pz:[0,-1],nx:[8,4],ny:[4,1],nz:[1,2]},{size:2,px:[17,5],py:[15,1],pz:[0,-1],nx:[20,19],ny:[14,14],nz:[0,0]},{size:2,px:[2,2],py:[20,18],pz:[0,0],nx:[2,1],ny:[23,5],nz:[0,-1]},{size:2,px:[10,1],py:[18,3],pz:[0,2],nx:[11,3],ny:[16,5],nz:[0,-1]},{size:2,px:[3,8],py:[6,10],pz:[1,0],nx:[9,0],ny:[9,3],nz:[0,-1]},{size:2,px:[20,10],py:[21,7],pz:[0,1],nx:[7,2],ny:[3,5],nz:[1,-1]},{size:2,px:[10,6],py:[4,7],pz:[1,-1],nx:[23,5],ny:[9,2],nz:[0,2]},{size:5,px:[2,4,5,3,4],py:[0,1,1,2,2],pz:[1,0,0,0,0],nx:[1,0,1,1,1],ny:[2,1,0,1,1],nz:[0,1,0,0,-1]},{size:2,px:[8,16],py:[7,13],pz:[1,0],nx:[8,3],ny:[4,16],nz:[1,-1]},{size:2,px:[17,15],py:[7,19],pz:[0,-1],nx:[4,8],ny:[2,4],nz:[2,1]},{size:2,px:[4,3],py:[11,5],pz:[1,2],nx:[7,8],ny:[9,4],nz:[1,-1]},{size:2,px:[23,11],py:[9,6],pz:[0,1],nx:[22,22],ny:[23,23],nz:[0,-1]},{size:2,px:[23,23],py:[21,20],pz:[0,0],nx:[2,2],ny:[5,4],nz:[1,-1]},{size:2,px:[17,4],py:[12,2],pz:[0,-1],nx:[9,8],ny:[4,5],nz:[1,1]},{size:2,px:[6,14],py:[2,4],pz:[1,0],nx:[7,18],ny:[1,1],nz:[1,-1]},{size:2,px:[20,22],py:[1,2],pz:[0,0],nx:[23,23],ny:[1,1],nz:[0,-1]},{size:2,px:[0,1],py:[9,10],pz:[1,1],nx:[8,0],ny:[15,0],nz:[0,-1]},{size:3,px:[11,11,6],py:[10,11,11],pz:[0,0,-1],nx:[23,23,23],ny:[19,21,20],nz:[0,0,0]},{size:5,px:[23,23,23,6,6],py:[21,22,22,3,6],pz:[0,0,-1,-1,-1],nx:[8,8,8,17,4],ny:[7,10,8,16,5],nz:[1,1,1,0,2]},{size:2,px:[10,23],py:[1,22],pz:[0,-1],nx:[7,2],ny:[11,2],nz:[0,2]},{size:2,px:[7,14],py:[3,10],pz:[1,-1],nx:[5,3],ny:[2,1],nz:[0,1]},{size:2,px:[5,3],py:[13,7],pz:[0,1],nx:[4,10],ny:[4,0],nz:[1,-1]},{size:2,px:[10,0],py:[15,6],pz:[0,-1],nx:[3,6],ny:[1,2],nz:[2,1]},{size:2,px:[13,4],py:[18,17],pz:[0,-1],nx:[7,6],ny:[10,7],nz:[1,1]},{size:2,px:[12,11],py:[3,8],pz:[0,-1],nx:[7,8],ny:[4,4],nz:[1,1]},{size:2,px:[17,4],py:[5,7],pz:[0,1],nx:[17,10],ny:[4,0],nz:[0,-1]},{size:5,px:[16,8,16,15,15],py:[0,0,1,0,1],pz:[0,1,0,0,0],nx:[7,4,7,4,4],ny:[7,5,8,1,1],nz:[1,2,1,2,-1]},{size:2,px:[13,11],py:[5,6],pz:[0,-1],nx:[4,5],ny:[2,2],nz:[1,1]},{size:2,px:[3,6],py:[3,6],pz:[2,1],nx:[8,4],ny:[4,3],nz:[1,-1]},{size:2,px:[10,16],py:[8,10],pz:[0,0],nx:[7,2],ny:[3,3],nz:[1,-1]},{size:2,px:[6,8],py:[4,11],pz:[1,0],nx:[10,1],ny:[9,20],nz:[0,-1]},{size:2,px:[5,1],py:[4,2],pz:[2,-1],nx:[23,23],ny:[15,16],nz:[0,0]},{size:5,px:[9,8,2,4,9],py:[1,1,0,1,2],pz:[0,0,2,1,0],nx:[8,3,8,4,4],ny:[6,2,4,2,2],nz:[1,2,1,2,-1]},{size:2,px:[13,6],py:[10,5],pz:[0,-1],nx:[13,7],ny:[6,3],nz:[0,1]},{size:2,px:[11,5],py:[10,5],pz:[1,2],nx:[10,8],ny:[10,9],nz:[1,-1]},{size:2,px:[7,4],py:[6,3],pz:[1,2],nx:[9,14],ny:[4,9],nz:[1,-1]},{size:3,px:[5,2,15],py:[3,1,22],pz:[1,-1,-1],nx:[15,9,4],ny:[0,1,0],nz:[0,1,2]},{size:2,px:[10,19],py:[9,21],pz:[1,0],nx:[2,17],ny:[5,14],nz:[2,-1]},{size:3,px:[16,2,1],py:[2,10,4],pz:[0,-1,-1],nx:[4,4,9],ny:[3,2,6],nz:[2,2,1]},{size:2,px:[10,2],py:[6,10],pz:[1,-1],nx:[21,22],ny:[16,12],nz:[0,0]},{size:2,px:[7,16],py:[4,23],pz:[0,-1],nx:[7,3],ny:[3,3],nz:[0,1]},{size:2,px:[1,1],py:[13,14],pz:[0,0],nx:[1,2],ny:[18,3],nz:[0,-1]},{size:2,px:[18,5],py:[13,4],pz:[0,-1],nx:[4,13],ny:[2,11],nz:[2,0]},{size:2,px:[18,17],py:[3,3],pz:[0,0],nx:[19,19],ny:[1,1],nz:[0,-1]},{size:2,px:[9,5],py:[0,5],pz:[1,-1],nx:[12,3],ny:[5,1],nz:[0,2]},{size:2,px:[5,3],py:[2,1],pz:[1,2],nx:[18,4],ny:[4,1],nz:[0,-1]},{size:5,px:[13,13,2,10,15],py:[11,12,13,17,23],pz:[0,-1,-1,-1,-1],nx:[12,13,4,3,8],ny:[4,4,1,0,3],nz:[0,0,2,2,1]},{size:2,px:[9,3],py:[2,2],pz:[0,-1],nx:[4,2],ny:[7,2],nz:[1,2]},{size:2,px:[13,4],py:[5,1],pz:[0,-1],nx:[18,4],ny:[12,2],nz:[0,2]},{size:2,px:[19,4],py:[11,1],pz:[0,-1],nx:[4,7],ny:[2,2],nz:[2,1]},{size:2,px:[4,2],py:[6,3],pz:[1,2],nx:[3,2],ny:[4,5],nz:[1,-1]},{size:2,px:[4,0],py:[7,7],pz:[0,-1],nx:[4,9],ny:[0,2],nz:[2,1]},{size:2,px:[4,9],py:[0,2],pz:[2,1],nx:[6,4],ny:[3,4],nz:[0,-1]},{size:2,px:[4,2],py:[9,4],pz:[1,2],nx:[13,5],ny:[18,2],nz:[0,-1]},{size:3,px:[5,23,23],py:[2,8,7],pz:[2,0,0],nx:[10,12,1],ny:[4,1,0],nz:[1,-1,-1]},{size:2,px:[13,0],py:[3,3],pz:[0,-1],nx:[4,4],ny:[2,3],nz:[2,2]},{size:2,px:[6,5],py:[10,5],pz:[0,-1],nx:[0,0],ny:[4,11],nz:[1,0]},{size:2,px:[11,2],py:[14,11],pz:[0,-1],nx:[10,11],ny:[4,13],nz:[1,0]},{size:2,px:[5,6],py:[21,23],pz:[0,0],nx:[7,0],ny:[21,3],nz:[0,-1]},{size:2,px:[8,4],py:[6,3],pz:[1,2],nx:[8,5],ny:[4,2],nz:[1,-1]},{size:2,px:[7,6],py:[8,8],pz:[0,0],nx:[6,14],ny:[9,15],nz:[0,-1]},{size:2,px:[16,6],py:[4,8],pz:[0,-1],nx:[16,8],ny:[0,1],nz:[0,1]},{size:4,px:[3,6,0,9],
                py:[0,8,5,23],pz:[1,-1,-1,-1],nx:[12,2,6,10],ny:[5,0,3,5],nz:[0,2,1,0]},{size:2,px:[3,6],py:[7,13],pz:[1,0],nx:[3,9],ny:[4,9],nz:[1,-1]},{size:2,px:[2,5],py:[8,23],pz:[1,0],nx:[8,9],ny:[15,0],nz:[0,-1]},{size:2,px:[13,18],py:[8,0],pz:[0,-1],nx:[1,1],ny:[9,8],nz:[1,1]},{size:2,px:[2,7],py:[4,21],pz:[2,0],nx:[13,11],ny:[8,9],nz:[0,-1]},{size:2,px:[5,4],py:[8,8],pz:[0,0],nx:[6,1],ny:[8,5],nz:[0,-1]},{size:2,px:[7,3],py:[20,7],pz:[0,-1],nx:[4,3],ny:[10,4],nz:[1,1]},{size:2,px:[9,9],py:[8,7],pz:[1,-1],nx:[1,2],ny:[4,9],nz:[2,1]},{size:2,px:[5,10],py:[5,13],pz:[1,-1],nx:[3,6],ny:[1,2],nz:[2,1]},{size:2,px:[12,5],py:[6,3],pz:[0,-1],nx:[8,4],ny:[4,4],nz:[1,1]},{size:2,px:[10,10],py:[4,4],pz:[1,-1],nx:[5,11],ny:[2,5],nz:[2,1]},{size:5,px:[11,23,11,23,11],py:[4,9,5,10,6],pz:[1,0,1,0,1],nx:[7,14,13,7,3],ny:[9,5,6,4,4],nz:[0,0,0,1,-1]},{size:2,px:[8,5],py:[0,0],pz:[1,-1],nx:[9,20],ny:[1,4],nz:[1,0]},{size:2,px:[19,20],py:[0,3],pz:[0,0],nx:[4,6],ny:[11,3],nz:[1,-1]},{size:4,px:[13,5,20,5],py:[14,3,23,4],pz:[0,-1,-1,-1],nx:[8,15,7,16],ny:[8,14,6,15],nz:[1,0,1,0]},{size:2,px:[10,20],py:[5,17],pz:[0,-1],nx:[7,3],ny:[10,1],nz:[0,2]},{size:3,px:[1,12,7],py:[3,7,10],pz:[2,0,0],nx:[2,2,3],ny:[3,2,2],nz:[1,-1,-1]},{size:3,px:[10,5,7],py:[7,10,10],pz:[1,-1,-1],nx:[10,10,18],ny:[10,9,23],nz:[1,1,0]},{size:3,px:[14,14,4],py:[3,3,4],pz:[0,-1,-1],nx:[4,4,8],ny:[3,2,6],nz:[2,2,1]},{size:2,px:[4,12],py:[4,17],pz:[2,0],nx:[13,1],ny:[15,4],nz:[0,-1]},{size:2,px:[10,20],py:[9,22],pz:[0,-1],nx:[9,4],ny:[2,0],nz:[1,2]},{size:2,px:[11,2],py:[3,6],pz:[0,-1],nx:[2,4],ny:[2,4],nz:[2,1]},{size:3,px:[15,10,1],py:[12,2,3],pz:[0,-1,-1],nx:[7,5,10],ny:[2,1,1],nz:[0,1,0]},{size:5,px:[9,11,10,12,12],py:[0,0,0,0,0],pz:[0,0,0,0,-1],nx:[8,4,16,5,10],ny:[4,4,10,3,6],nz:[1,1,0,1,0]},{size:2,px:[0,10],py:[3,5],pz:[2,-1],nx:[3,6],ny:[0,1],nz:[2,1]},{size:5,px:[7,8,7,2,12],py:[14,13,13,16,0],pz:[0,0,-1,-1,-1],nx:[10,1,10,1,1],ny:[13,2,12,4,9],nz:[0,2,0,1,0]},{size:3,px:[6,14,13],py:[1,2,1],pz:[1,0,0],nx:[8,21,10],ny:[4,23,12],nz:[1,-1,-1]},{size:2,px:[19,19],py:[22,21],pz:[0,0],nx:[20,1],ny:[22,5],nz:[0,-1]},{size:2,px:[13,12],py:[19,22],pz:[0,-1],nx:[2,3],ny:[0,1],nz:[2,1]},{size:4,px:[11,9,21,4],py:[13,3,19,5],pz:[0,-1,-1,-1],nx:[9,9,9,5],ny:[13,14,12,6],nz:[0,0,0,1]},{size:4,px:[11,12,13,14],py:[22,22,22,22],pz:[0,0,0,0],nx:[13,2,4,5],ny:[20,0,0,6],nz:[0,-1,-1,-1]},{size:2,px:[4,2],py:[6,3],pz:[1,2],nx:[3,1],ny:[4,3],nz:[1,-1]},{size:2,px:[0,0],py:[0,1],pz:[2,2],nx:[9,4],ny:[6,5],nz:[1,-1]},{size:2,px:[17,0],py:[10,1],pz:[0,-1],nx:[9,4],ny:[3,2],nz:[1,2]},{size:2,px:[10,4],py:[3,1],pz:[1,2],nx:[12,18],ny:[17,4],nz:[0,-1]},{size:3,px:[2,3,4],py:[4,3,9],pz:[2,2,1],nx:[0,3,17],ny:[0,1,18],nz:[0,-1,-1]},{size:2,px:[7,3],py:[12,6],pz:[0,1],nx:[5,1],ny:[11,1],nz:[1,-1]},{size:2,px:[10,17],py:[20,6],pz:[0,-1],nx:[5,2],ny:[9,5],nz:[1,2]},{size:2,px:[8,11],py:[18,2],pz:[0,-1],nx:[5,4],ny:[9,9],nz:[1,1]},{size:2,px:[16,15],py:[2,2],pz:[0,0],nx:[17,12],ny:[2,2],nz:[0,-1]},{size:2,px:[18,4],py:[5,5],pz:[0,-1],nx:[7,5],ny:[23,19],nz:[0,0]},{size:2,px:[12,13],py:[23,23],pz:[0,0],nx:[7,11],ny:[10,20],nz:[1,-1]},{size:2,px:[5,10],py:[3,18],pz:[2,-1],nx:[9,9],ny:[5,6],nz:[1,1]},{size:2,px:[5,10],py:[2,4],pz:[1,0],nx:[4,23],ny:[4,20],nz:[1,-1]},{size:2,px:[2,3],py:[8,1],pz:[1,-1],nx:[15,12],ny:[2,1],nz:[0,0]},{size:2,px:[4,7],py:[3,10],pz:[2,1],nx:[10,1],ny:[20,4],nz:[0,-1]},{size:2,px:[11,11],py:[10,11],pz:[0,0],nx:[22,3],ny:[5,4],nz:[0,-1]},{size:5,px:[8,17,17,9,18],py:[0,1,0,1,0],pz:[1,0,0,1,0],nx:[11,8,9,4,4],ny:[23,4,6,2,2],nz:[0,1,0,2,-1]},{size:2,px:[5,5],py:[4,4],pz:[1,-1],nx:[13,4],ny:[9,2],nz:[0,2]},{size:5,px:[9,4,8,7,7],py:[3,1,3,3,3],pz:[0,1,0,0,-1],nx:[4,2,5,3,2],ny:[1,15,1,4,13],nz:[0,0,0,0,0]},{size:2,px:[17,7],py:[13,7],pz:[0,-1],nx:[4,8],ny:[4,4],nz:[1,1]},{size:2,px:[1,2],py:[1,12],pz:[2,0],nx:[9,21],ny:[5,4],nz:[0,-1]},{size:2,px:[12,0],py:[14,1],pz:[0,-1],nx:[1,1],ny:[19,10],nz:[0,1]},{size:2,px:[16,1],py:[5,9],pz:[0,-1],nx:[16,15],ny:[3,3],nz:[0,0]},{size:2,px:[4,8],py:[3,6],pz:[2,1],nx:[8,4],ny:[4,0],nz:[1,-1]},{size:2,px:[11,6],py:[17,15],pz:[0,0],nx:[11,0],ny:[16,4],nz:[0,-1]},{size:4,px:[12,11,0,3],py:[16,8,7,1],pz:[0,-1,-1,-1],nx:[10,5,10,5],ny:[11,9,10,8],nz:[0,1,0,1]},{size:2,px:[3,6],py:[7,13],pz:[1,0],nx:[4,14],ny:[4,16],nz:[1,-1]},{size:2,px:[7,17],py:[6,13],pz:[0,-1],nx:[4,8],ny:[4,9],nz:[2,1]},{size:2,px:[15,11],py:[3,2],pz:[0,-1],nx:[4,15],ny:[1,2],nz:[2,0]},{size:2,px:[10,11],py:[18,4],pz:[0,-1],nx:[5,5],ny:[8,9],nz:[1,1]},{size:2,px:[8,4],py:[7,4],pz:[1,2],nx:[4,3],ny:[5,7],nz:[2,-1]},{size:2,px:[12,4],py:[15,4],pz:[0,-1],nx:[11,8],ny:[14,19],nz:[0,0]},{size:2,px:[18,13],py:[13,20],pz:[0,0],nx:[13,4],ny:[18,2],nz:[0,-1]},{size:2,px:[12,4],py:[6,3],pz:[0,-1],nx:[8,4],ny:[4,2],nz:[1,2]},{size:5,px:[21,5,11,5,10],py:[1,1,3,0,0],pz:[0,2,1,2,1],nx:[7,14,15,4,8],ny:[3,6,11,3,4],nz:[1,-1,-1,-1,-1]},{size:2,px:[10,6],py:[15,10],pz:[0,-1],nx:[21,22],ny:[14,12],nz:[0,0]},{size:2,px:[18,0],py:[20,0],pz:[0,-1],nx:[2,3],ny:[2,4],nz:[2,1]},{size:5,px:[12,6,13,11,7],py:[1,1,1,2,1],pz:[0,1,0,0,1],nx:[7,6,8,5,5],ny:[4,15,4,16,16],nz:[1,0,1,0,-1]},{size:3,px:[22,21,21],py:[14,15,17],pz:[0,0,0],nx:[5,9,4],ny:[0,5,0],nz:[2,-1,-1]},{size:2,px:[10,2],py:[14,1],pz:[0,-1],nx:[23,11],ny:[16,8],nz:[0,1]},{size:4,px:[21,21,0,18],py:[14,15,5,4],pz:[0,0,-1,-1],nx:[8,8,9,4],ny:[7,8,10,5],nz:[1,1,1,2]},{size:2,px:[15,5],py:[18,1],pz:[0,-1],nx:[23,23],ny:[16,18],nz:[0,0]},{size:2,px:[15,14],py:[1,1],pz:[0,0],nx:[4,4],ny:[2,3],nz:[2,-1]},{size:2,px:[2,6],py:[6,5],pz:[1,-1],nx:[14,11],ny:[1,1],nz:[0,0]},{size:2,px:[3,17],py:[2,8],pz:[2,0],nx:[8,3],ny:[4,9],nz:[1,-1]},{size:2,px:[17,8],py:[13,10],pz:[0,-1],nx:[8,4],ny:[4,2],nz:[1,2]},{size:2,px:[0,0],py:[8,3],pz:[0,1],nx:[1,11],ny:[4,7],nz:[1,-1]},{size:2,px:[6,8],py:[5,0],pz:[1,-1],nx:[0,0],ny:[3,1],nz:[1,2]},{size:2,px:[0,0],py:[5,3],pz:[1,2],nx:[1,18],ny:[5,7],nz:[1,-1]},{size:2,px:[7,3],py:[6,6],pz:[0,1],nx:[7,12],ny:[5,20],nz:[0,-1]},{size:2,px:[8,1],py:[0,5],pz:[0,-1],nx:[4,2],ny:[9,3],nz:[1,2]},{size:2,px:[0,0],py:[10,11],pz:[0,0],nx:[0,5],ny:[5,9],nz:[0,-1]},{size:2,px:[8,1],py:[23,4],pz:[0,2],nx:[0,0],ny:[13,2],nz:[0,-1]},{size:2,px:[4,1],py:[6,4],pz:[0,-1],nx:[4,4],ny:[4,5],nz:[2,2]},{size:2,px:[7,6],py:[6,5],pz:[1,1],nx:[3,9],ny:[4,16],nz:[1,-1]},{size:2,px:[5,3],py:[9,13],pz:[0,-1],nx:[4,10],ny:[3,7],nz:[1,0]},{size:5,px:[13,9,6,10,10],py:[2,2,1,2,2],pz:[0,0,1,0,-1],nx:[7,5,6,5,6],ny:[0,2,2,1,1],nz:[0,0,0,0,0]}],alpha:[-1.119615,1.119615,-.8169953,.8169953,-.5291213,.5291213,-.4904488,.4904488,-.4930982,.4930982,-.4106179,.4106179,-.4246842,.4246842,-.3802383,.3802383,-.3364358,.3364358,-.3214186,.3214186,-.3210798,.3210798,-.2993167,.2993167,-.3426336,.3426336,-.3199184,.3199184,-.3061071,.3061071,-.2758972,.2758972,-.307559,.307559,-.3009565,.3009565,-.2015739,.2015739,-.2603266,.2603266,-.2772993,.2772993,-.2184913,.2184913,-.2306681,.2306681,-.1983223,.1983223,-.219476,.219476,-.2528421,.2528421,-.2436416,.2436416,-.3032886,.3032886,-.2556071,.2556071,-.256217,.256217,-.1930298,.1930298,-.2735898,.2735898,-.1814703,.1814703,-.2054824,.2054824,-.1986146,.1986146,-.1769226,.1769226,-.1775257,.1775257,-.2167927,.2167927,-.1823633,.1823633,-.158428,.158428,-.1778321,.1778321,-.1826777,.1826777,-.1979903,.1979903,-.1898326,.1898326,-.1835506,.1835506,-.196786,.196786,-.1871528,.1871528,-.1772414,.1772414,-.1985514,.1985514,-.2144078,.2144078,-.2742303,.2742303,-.224055,.224055,-.2132534,.2132534,-.1552127,.1552127,-.1568276,.1568276,-.1630086,.1630086,-.1458232,.1458232,-.1559541,.1559541,-.1720131,.1720131,-.1708434,.1708434,-.1624431,.1624431,-.1814161,.1814161,-.1552639,.1552639,-.1242354,.1242354,-.1552139,.1552139,-.1694359,.1694359,-.1801481,.1801481,-.1387182,.1387182,-.1409679,.1409679,-.1486724,.1486724,-.1779553,.1779553,-.1524595,.1524595,-.1788086,.1788086,-.1671479,.1671479,-.1376197,.1376197,-.1511808,.1511808,-.1524632,.1524632,-.1198986,.1198986,-.1382641,.1382641,-.1148901,.1148901,-.1131803,.1131803,-.1273508,.1273508,-.1405125,.1405125,-.1322132,.1322132,-.1386966,.1386966,-.1275621,.1275621,-.1180573,.1180573,-.1238803,.1238803,-.1428389,.1428389,-.1694437,.1694437,-.1290855,.1290855,-.152026,.152026,-.1398282,.1398282,-.1890736,.1890736,-.2280428,.2280428,-.1325099,.1325099,-.1342873,.1342873,-.1463841,.1463841,-.1983567,.1983567,-.1585711,.1585711,-.1260154,.1260154,-.1426774,.1426774,-.1554278,.1554278,-.1361201,.1361201,-.1181856,.1181856,-.1255941,.1255941,-.1113275,.1113275,-.1506576,.1506576,-.1202859,.1202859,-.2159751,.2159751,-.144315,.144315,-.1379194,.1379194,-.1805758,.1805758,-.1465612,.1465612,-.1328856,.1328856,-.1532173,.1532173,-.1590635,.1590635,-.1462229,.1462229,-.1350012,.1350012,-.1195634,.1195634,-.1173221,.1173221,-.1192867,.1192867,-.1595013,.1595013,-.1209751,.1209751,-.157129,.157129,-.1527274,.1527274,-.1373708,.1373708,-.1318313,.1318313,-.1273391,.1273391,-.1271365,.1271365,-.1528693,.1528693,-.1590476,.1590476,-.1581911,.1581911,-.1183023,.1183023,-.1559822,.1559822,-.1214999,.1214999,-.1283378,.1283378,-.1542583,.1542583,-.1336377,.1336377,-.1800416,.1800416,-.1710931,.1710931,-.1621737,.1621737,-.1239002,.1239002,-.1432928,.1432928,-.1392447,.1392447,-.1383938,.1383938,-.1357633,.1357633,-.1175842,.1175842,-.1085318,.1085318,-.1148885,.1148885,-.1320396,.1320396,-.1351204,.1351204,-.1581518,.1581518,-.1459574,.1459574,-.1180068,.1180068,-.1464196,.1464196,-.1179543,.1179543,-.1004204,.1004204,-.129466,.129466,-.1534244,.1534244,-.137897,.137897,-.1226545,.1226545,-.1281182,.1281182,-.1201471,.1201471,-.1448701,.1448701,-.129098,.129098,-.1388764,.1388764,-.09605773,.09605773,-.1411021,.1411021,-.1295693,.1295693,-.1371739,.1371739,-.1167579,.1167579,-.1400486,.1400486,-.1214224,.1214224,-.1287835,.1287835,-.1197646,.1197646,-.1192358,.1192358,-.1218651,.1218651,-.1564816,.1564816,-.1172391,.1172391,-.1342268,.1342268,-.1492471,.1492471,-.1157299,.1157299,-.1046703,.1046703,-.1255571,.1255571,-.1100135,.1100135,-.1501592,.1501592,-.1155712,.1155712,-.1145563,.1145563,-.1013425,.1013425,-.1145783,.1145783,-.1328031,.1328031,-.1077413,.1077413,-.1064996,.1064996,-.119117,.119117,-.1213217,.1213217,-.1260969,.1260969,-.1156494,.1156494,-.1268126,.1268126,-.1070999,.1070999,-.1112365,.1112365,-.1243916,.1243916,-.1283152,.1283152,-.1166925,.1166925,-.08997633,.08997633,-.158384,.158384,-.1211178,.1211178,-.109083,.109083,-.1030818,.1030818,-.14406,.14406,-.1458713,.1458713,-.1559082,.1559082,-.1058868,.1058868,-.101013,.101013,-.1642301,.1642301,-.123685,.123685,-.1467589,.1467589,-.1109359,.1109359,-.1673655,.1673655,-.1239984,.1239984,-.1039509,.1039509,-.1089378,.1089378,-.1545085,.1545085,-.1200862,.1200862,-.1105608,.1105608,-.1235262,.1235262,-.08496153,.08496153,-.1181372,.1181372,-.1139467,.1139467,-.1189317,.1189317,-.1266519,.1266519,-.09470736,.09470736,-.1336735,.1336735,-.08726601,.08726601,-.1304782,.1304782,-.1186529,.1186529,-.1355944,.1355944,-.09568801,.09568801,-.1282618,.1282618,-.1625632,.1625632,-.1167652,.1167652,-.1001301,.1001301,-.1292419,.1292419,-.1904213,.1904213,-.1511542,.1511542,-.09814394,.09814394,-.1171564,.1171564,-.09806486,.09806486,-.09217615,.09217615,-.08505645,.08505645,-.1573637,.1573637,-.1419174,.1419174,-.1298601,.1298601,-.1120613,.1120613,-.1158363,.1158363,-.1090957,.1090957,-.1204516,.1204516,-.1139852,.1139852,-.09642479,.09642479,-.1410872,.1410872,-.1142779,.1142779,-.1043991,.1043991,-.09736463,.09736463,-.1451046,.1451046,-.1205668,.1205668,-.09881445,.09881445,-.1612822,.1612822,-.1175681,.1175681,-.1522528,.1522528,-.161752,.161752,-.1582938,.1582938,-.1208202,.1208202,-.1016003,.1016003,-.1232059,.1232059,-.09583025,.09583025,-.101399,.101399,-.1178752,.1178752,-.1215972,.1215972,-.1294932,.1294932,-.115827,.115827,-.1008645,.1008645,-.0969919,.0969919,-.1022144,.1022144,-.09878768,.09878768,-.1339052,.1339052,-.09279961,.09279961,-.1047606,.1047606,-.1141163,.1141163,-.12676,.12676,-.1252763,.1252763,-.09775003,.09775003,-.09169116,.09169116,-.1006496,.1006496,-.09493293,.09493293,-.1213694,.1213694,-.1109243,.1109243,-.1115973,.1115973,-.07979327,.07979327,-.09220953,.09220953,-.1028913,.1028913,-.125351,.125351]},{count:391,threshold:-4.665692,feature:[{size:5,px:[14,9,11,17,12],py:[2,3,9,13,3],pz:[0,0,0,0,0],nx:[21,8,7,20,13],ny:[16,10,7,7,9],nz:[0,1,1,0,0]},{size:5,px:[12,10,6,11,13],py:[9,3,13,3,4],pz:[0,0,0,0,0],nx:[10,4,5,10,2],ny:[9,10,8,8,2],nz:[0,1,1,0,2]},{size:5,px:[6,9,7,8,8],py:[3,3,3,3,3],pz:[0,0,0,0,-1],nx:[0,0,0,4,9],ny:[4,2,3,10,8],nz:[0,0,0,1,0]},{size:5,px:[6,2,16,6,8],py:[16,2,11,4,11],pz:[0,2,0,1,0],nx:[3,8,4,1,1],ny:[4,4,4,5,13],nz:[1,1,-1,-1,-1]},{size:3,px:[16,13,9],py:[23,18,10],pz:[0,0,1],nx:[14,15,8],ny:[21,22,3],nz:[0,-1,-1]},{size:5,px:[9,16,19,17,17],py:[1,2,3,2,2],pz:[1,0,0,0,-1],nx:[23,23,23,23,23],ny:[6,2,1,3,5],nz:[0,0,0,0,0]},{size:5,px:[12,12,12,12,12],py:[10,11,12,13,13],pz:[0,0,0,0,-1],nx:[4,8,14,4,6],ny:[2,4,7,4,8],nz:[2,1,0,1,1]},{size:5,px:[1,2,3,6,4],py:[6,10,12,23,13],pz:[1,1,0,0,0],nx:[2,0,0,1,1],ny:[23,5,10,21,21],nz:[0,2,1,0,-1]},{size:5,px:[12,16,12,4,12],py:[6,17,7,2,8],pz:[0,0,0,2,0],nx:[8,8,12,0,6],ny:[4,4,16,0,8],nz:[1,-1,-1,-1,-1]},{size:2,px:[9,2],py:[18,4],pz:[0,-1],nx:[4,9],ny:[10,16],nz:[1,0]},{size:5,px:[9,9,2,0,12],py:[6,6,21,4,8],pz:[1,-1,-1,-1,-1],nx:[8,4,9,7,7],ny:[10,2,4,5,8],nz:[1,2,1,1,1]},{size:5,px:[10,10,10,18,19],py:[10,8,7,14,14],pz:[1,1,1,0,0],nx:[21,23,22,22,11],ny:[23,19,21,22,10],nz:[0,0,0,0,-1]},{size:5,px:[12,3,15,4,19],py:[14,0,5,5,14],pz:[0,-1,-1,-1,-1],nx:[12,17,15,3,8],ny:[18,18,14,2,10],nz:[0,0,0,2,0]},{size:5,px:[8,11,3,11,4],py:[23,7,9,8,8],pz:[0,0,1,0,1],nx:[8,0,10,0,8],ny:[8,2,8,4,10],nz:[0,-1,-1,-1,-1]},{size:5,px:[10,11,12,8,4],py:[3,0,0,1,1],pz:[0,0,0,0,1],nx:[2,3,4,3,3],ny:[14,5,0,1,2],nz:[0,0,0,0,0]},{size:2,px:[3,11],py:[7,0],pz:[1,-1],nx:[5,2],ny:[9,5],nz:[1,2]},{size:5,px:[7,1,0,10,1],py:[0,0,2,12,6],pz:[0,2,2,0,1],nx:[4,6,2,8,8],ny:[4,11,2,4,4],nz:[1,1,2,1,-1]},{size:2,px:[4,15],py:[4,12],pz:[2,0],nx:[4,6],ny:[5,11],nz:[2,-1]},{size:5,px:[9,4,16,14,14],py:[8,4,23,18,18],pz:[1,2,0,0,-1],nx:[0,2,1,1,0],ny:[2,0,3,2,3],nz:[1,0,0,0,1]},{size:5,px:[17,7,7,18,19],py:[7,11,8,7,7],pz:[0,1,1,0,0],nx:[17,5,8,2,0],ny:[8,0,7,5,3],nz:[0,-1,-1,-1,-1]},{size:2,px:[5,14],py:[12,3],pz:[0,-1],nx:[4,3],ny:[5,4],nz:[1,1]},{size:5,px:[10,8,16,11,11],py:[5,6,12,4,4],pz:[0,1,0,0,-1],nx:[14,13,5,9,5],ny:[13,10,1,4,2],nz:[0,0,2,1,2]},{size:5,px:[15,14,16,8,8],py:[2,2,2,0,0],pz:[0,0,0,1,-1],nx:[9,18,19,18,17],ny:[0,0,2,1,0],nz:[1,0,0,0,0]},{size:2,px:[17,15],py:[12,11],pz:[0,0],nx:[14,4],ny:[9,15],nz:[0,-1]},{size:3,px:[5,11,11],py:[3,4,5],pz:[2,1,1],nx:[14,3,18],ny:[6,5,0],nz:[0,1,-1]},{size:5,px:[16,14,17,15,9],py:[2,2,2,2,1],pz:[0,0,0,0,1],nx:[21,20,11,21,21],ny:[2,0,7,3,3],nz:[0,0,1,0,-1]},{size:5,px:[2,1,1,1,5],py:[12,9,7,3,6],pz:[0,0,1,1,1],nx:[4,8,3,4,17],ny:[4,4,0,8,0],nz:[1,-1,-1,-1,-1]},{size:2,px:[8,4],py:[6,3],pz:[1,2],nx:[9,2],ny:[4,17],nz:[1,-1]},{size:2,px:[8,5],py:[16,9],pz:[0,1],nx:[10,17],ny:[16,8],nz:[0,-1]},{size:4,px:[11,5,9,15],py:[14,9,11,5],pz:[0,-1,-1,-1],nx:[10,1,9,4],ny:[9,2,13,7],nz:[0,2,0,1]},{size:5,px:[2,5,10,7,10],py:[7,12,2,13,3],pz:[1,-1,-1,-1,-1],nx:[5,2,3,3,2],ny:[23,15,17,16,14],nz:[0,0,0,0,0]},{size:2,px:[11,7],py:[8,10],pz:[0,-1],nx:[7,14],ny:[5,8],nz:[1,0]},{size:2,px:[9,16],py:[7,23],pz:[1,0],nx:[4,4],ny:[2,1],nz:[2,-1]},{size:5,px:[16,14,18,4,17],py:[0,0,4,0,1],pz:[0,0,0,2,0],nx:[8,8,16,9,9],ny:[5,4,11,7,7],nz:[1,1,0,0,-1]},{size:5,px:[12,13,7,8,4],py:[9,12,6,11,5],pz:[0,0,1,1,2],nx:[23,23,16,9,9],ny:[0,1,11,7,7],nz:[0,-1,-1,-1,-1]},{size:3,px:[6,7,2],py:[21,23,4],pz:[0,0,2],nx:[4,1,16],ny:[10,5,11],nz:[1,-1,-1]},{size:2,px:[2,2],py:[3,4],pz:[2,2],nx:[3,1],ny:[4,5],nz:[1,-1]},{size:5,px:[1,2,1,0,1],py:[7,13,12,4,13],pz:[0,0,0,2,0],nx:[18,9,9,19,19],ny:[23,5,11,19,19],nz:[0,1,1,0,-1]},{size:3,px:[4,10,12],py:[6,2,5],pz:[1,-1,-1],nx:[10,0,0],ny:[12,1,3],nz:[0,2,2]},{size:2,px:[2,4],py:[3,6],pz:[2,1],nx:[3,0],ny:[4,3],nz:[1,-1]},{size:5,px:[19,17,10,14,18],py:[2,1,7,0,1],pz:[0,0,1,0,0],nx:[3,3,3,7,5],ny:[9,10,7,23,18],nz:[1,1,1,0,0]},{size:2,px:[10,10],py:[8,7],pz:[1,1],nx:[14,4],ny:[15,6],nz:[0,-1]},{size:2,px:[7,15],py:[1,3],pz:[1,0],nx:[16,19],ny:[1,3],nz:[0,-1]},{size:5,px:[11,11,1,2,11],py:[11,12,1,13,12],pz:[0,0,-1,-1,-1],nx:[12,17,8,16,8],ny:[7,12,11,16,6],nz:[0,0,0,0,1]},{size:5,px:[13,11,10,12,5],py:[0,0,0,0,0],pz:[0,0,0,0,1],nx:[8,4,3,4,4],ny:[4,5,2,4,4],nz:[1,1,2,1,-1]},{size:5,px:[6,1,3,2,3],py:[13,3,3,4,10],pz:[0,2,1,1,1],nx:[0,1,0,0,0],ny:[2,0,5,4,4],nz:[0,0,0,0,-1]},{size:2,px:[15,1],py:[4,3],pz:[0,-1],nx:[16,15],ny:[2,2],nz:[0,0]},{size:2,px:[3,7],py:[7,13],pz:[1,0],nx:[3,0],ny:[4,2],nz:[1,-1]},{size:2,px:[14,15],py:[18,14],pz:[0,-1],nx:[4,14],ny:[4,16],nz:[1,0]},{size:2,px:[4,6],py:[3,4],pz:[2,1],nx:[9,5],ny:[14,2],nz:[0,-1]},{size:2,px:[16,6],py:[1,5],pz:[0,-1],nx:[4,9],ny:[0,4],nz:[2,1]},{size:2,px:[9,0],py:[4,2],pz:[0,-1],nx:[5,3],ny:[1,0],nz:[1,2]},{size:5,px:[1,1,1,0,0],py:[16,15,17,6,9],pz:[0,0,0,1,0],nx:[9,5,4,9,8],ny:[7,3,3,6,7],nz:[0,1,1,0,-1]},{size:2,px:[9,1],py:[8,15],pz:[1,-1],nx:[9,8],ny:[9,4],nz:[1,1]},{size:2,px:[20,19],py:[19,22],pz:[0,0],nx:[7,0],ny:[3,0],nz:[1,-1]},{size:5,px:[8,4,2,5,5],py:[12,6,3,5,5],pz:[0,1,2,1,-1],nx:[22,21,20,21,22],ny:[17,20,22,19,16],nz:[0,0,0,0,0]},{size:2,px:[6,12],py:[2,6],pz:[1,0],nx:[8,3],ny:[3,2],nz:[1,-1]},{size:2,px:[11,11],py:[9,4],pz:[1,1],nx:[12,4],ny:[17,5],nz:[0,-1]},{size:3,px:[0,1,0],py:[5,13,3],pz:[2,0,2],nx:[0,4,11],ny:[23,5,1],nz:[0,-1,-1]},{size:2,px:[10,5],py:[6,3],pz:[0,1],nx:[4,4],ny:[3,0],nz:[1,-1]},{size:2,px:[6,5],py:[7,3],pz:[0,-1],nx:[0,1],ny:[4,10],nz:[2,1]},{size:5,px:[12,13,12,12,12],py:[12,13,11,10,10],pz:[0,0,0,0,-1],nx:[10,8,8,16,15],ny:[7,4,10,11,10],nz:[0,1,0,0,0]},{size:2,px:[4,8],py:[3,6],pz:[2,1],nx:[4,2],ny:[5,5],nz:[2,-1]},{size:2,px:[9,17],py:[17,7],pz:[0,-1],nx:[5,2],ny:[9,4],nz:[1,2]},{size:2,px:[4,4],py:[3,5],pz:[2,2],nx:[12,8],ny:[16,2],nz:[0,-1]},{size:2,px:[1,1],py:[2,0],pz:[1,1],nx:[0,4],ny:[0,1],nz:[2,-1]},{size:2,px:[11,1],py:[5,0],pz:[0,-1],nx:[2,3],ny:[2,4],nz:[2,1]},{size:4,px:[0,6,4,22],py:[23,2,4,12],pz:[0,-1,-1,-1],nx:[7,6,8,5],ny:[1,1,2,1],nz:[1,1,1,1]},{size:2,px:[4,10],py:[0,9],pz:[1,-1],nx:[2,4],ny:[3,10],nz:[2,1]},{size:2,px:[11,8],py:[15,13],pz:[0,-1],nx:[23,11],ny:[13,5],nz:[0,1]},{size:2,px:[18,4],py:[5,4],pz:[0,-1],nx:[18,20],ny:[4,7],nz:[0,0]},{size:5,px:[21,20,20,10,20],py:[17,22,19,10,21],pz:[0,0,0,1,0],nx:[5,5,3,14,7],ny:[9,9,0,8,4],nz:[0,-1,-1,-1,-1]},{size:5,px:[3,7,13,7,3],py:[6,12,3,0,3],pz:[1,-1,-1,-1,-1],nx:[1,5,0,0,2],ny:[16,6,13,5,4],nz:[0,1,0,1,0]},{size:2,px:[7,4],py:[6,3],pz:[1,2],nx:[9,5],ny:[4,6],nz:[1,-1]},{size:3,px:[14,9,13],py:[19,22,8],pz:[0,-1,-1],nx:[13,4,4],ny:[17,2,5],nz:[0,2,2]},{size:2,px:[16,4],py:[9,3],pz:[0,2],nx:[7,4],ny:[4,5],nz:[1,-1]},{size:4,px:[10,2,4,2],py:[23,4,8,3],pz:[0,2,1,2],nx:[14,0,4,11],ny:[19,3,5,3],nz:[0,-1,-1,-1]},{size:5,px:[9,10,8,7,11],py:[2,2,2,2,2],pz:[0,0,0,0,0],nx:[6,5,3,4,4],ny:[0,1,0,2,2],nz:[0,0,1,0,-1]},{size:2,px:[6,4],py:[13,6],pz:[0,-1],nx:[15,4],ny:[8,4],nz:[0,1]},{size:2,px:[0,8],py:[1,2],pz:[2,-1],nx:[5,4],ny:[2,2],nz:[1,1]},{size:5,px:[16,13,14,15,15],py:[1,0,0,0,0],pz:[0,0,0,0,-1],nx:[4,9,4,18,8],ny:[5,9,4,18,11],nz:[2,1,2,0,1]},{size:2,px:[5,6],py:[2,6],pz:[2,1],nx:[22,9],ny:[23,9],nz:[0,-1]},{size:2,px:[19,19],py:[5,5],pz:[0,-1],nx:[21,22],ny:[2,4],nz:[0,0]},{size:2,px:[2,5],py:[8,6],pz:[0,1],nx:[3,4],ny:[4,9],nz:[1,-1]},{size:2,px:[18,14],py:[13,17],pz:[0,0],nx:[14,4],ny:[16,3],nz:[0,-1]},{size:2,px:[6,6],py:[6,3],pz:[1,-1],nx:[1,0],ny:[2,2],nz:[1,2]},{size:2,px:[23,21],py:[21,14],pz:[0,-1],nx:[7,5],ny:[0,0],nz:[0,1]},{size:2,px:[15,10],py:[23,7],pz:[0,-1],nx:[9,4],ny:[4,5],nz:[1,2]},{size:2,px:[4,18],py:[3,8],pz:[2,0],nx:[8,4],ny:[4,5],nz:[1,-1]},{size:2,px:[13,7],py:[2,11],pz:[0,-1],nx:[8,4],ny:[4,2],nz:[1,2]},{size:5,px:[2,3,5,6,1],py:[7,14,2,2,4],pz:[1,0,0,0,2],nx:[8,4,4,7,7],ny:[7,5,4,9,9],nz:[1,2,2,1,-1]},{size:2,px:[5,3],py:[6,3],pz:[1,-1],nx:[1,2],ny:[2,4],nz:[2,1]},{size:5,px:[7,20,4,10,10],py:[9,16,4,10,8],pz:[1,0,2,1,1],nx:[4,2,3,5,3],ny:[11,5,6,12,5],nz:[0,1,1,0,-1]},{size:2,px:[6,11],py:[4,18],pz:[1,-1],nx:[8,6],ny:[4,9],nz:[1,1]},{size:2,px:[2,8],py:[5,23],pz:[2,0],nx:[9,4],ny:[0,2],nz:[1,-1]},{size:5,px:[3,1,2,2,2],py:[12,6,12,11,11],pz:[0,1,0,0,-1],nx:[0,0,0,0,0],ny:[13,12,11,14,7],nz:[0,0,0,0,1]},{size:2,px:[3,6],py:[1,2],pz:[2,1],nx:[8,4],ny:[4,14],nz:[1,-1]},{size:5,px:[11,23,23,22,22],py:[8,12,6,13,14],pz:[1,0,0,0,0],nx:[13,8,7,6,6],ny:[6,3,3,9,9],nz:[0,1,1,0,-1]},{size:4,px:[9,23,23,22],py:[7,12,6,13],pz:[1,-1,-1,-1],nx:[11,23,23,23],ny:[6,13,17,10],nz:[1,0,0,0]},{size:5,px:[0,0,0,0,0],py:[19,5,9,16,10],pz:[0,2,1,0,1],nx:[5,2,1,2,2],ny:[18,10,5,9,9],nz:[0,1,2,1,-1]},{size:2,px:[11,5],py:[10,4],pz:[1,2],nx:[23,14],ny:[23,3],nz:[0,-1]},{size:2,px:[2,4],py:[3,6],pz:[2,1],nx:[3,1],ny:[4,4],nz:[1,-1]},{size:2,px:[8,10],py:[4,8],pz:[0,-1],nx:[8,8],ny:[2,3],nz:[0,0]},{size:3,px:[7,10,11],py:[1,6,13],pz:[0,-1,-1],nx:[4,4,2],ny:[3,8,2],nz:[1,1,2]},{size:2,px:[8,4],py:[8,2],pz:[1,2],nx:[10,5],ny:[10,0],nz:[0,-1]},{size:2,px:[7,16],py:[20,21],pz:[0,-1],nx:[2,4],ny:[5,10],nz:[2,1]},{size:2,px:[3,10],py:[7,8],pz:[1,-1],nx:[7,4],ny:[20,7],nz:[0,1]},{size:5,px:[11,11,11,11,11],py:[10,12,13,11,11],pz:[0,0,0,0,-1],nx:[11,12,16,3,8],ny:[6,6,10,1,8],nz:[0,0,0,2,0]},{size:2,px:[12,6],py:[4,2],pz:[0,1],nx:[7,7],ny:[8,1],nz:[0,-1]},{size:5,px:[23,23,23,23,23],py:[22,20,21,19,19],pz:[0,0,0,0,-1],nx:[4,6,3,4,3],ny:[19,23,15,20,16],nz:[0,0,0,0,0]},{size:3,px:[8,4,14],py:[12,3,8],pz:[0,-1,-1],nx:[4,2,10],ny:[10,3,13],nz:[1,2,0]},{size:2,px:[11,18],py:[13,23],pz:[0,-1],nx:[5,5],ny:[1,2],nz:[2,2]},{size:3,px:[11,2,10],py:[17,4,17],pz:[0,2,0],nx:[11,0,22],ny:[15,2,4],nz:[0,-1,-1]},{size:3,px:[11,3,0],py:[15,4,8],pz:[0,-1,-1],nx:[14,11,4],ny:[9,17,7],nz:[0,0,1]},{size:2,px:[17,16],py:[2,1],pz:[0,0],nx:[9,11],ny:[4,6],nz:[1,-1]},{size:2,px:[3,4],py:[21,23],pz:[0,0],nx:[4,0],ny:[3,3],nz:[1,-1]},{size:2,px:[18,2],py:[20,0],pz:[0,-1],nx:[4,9],ny:[5,10],nz:[2,1]},{size:2,px:[9,1],py:[19,3],pz:[0,-1],nx:[0,0],ny:[9,21],nz:[1,0]},{size:2,px:[19,19],py:[21,22],pz:[0,0],nx:[19,0],ny:[23,0],nz:[0,-1]},{size:4,px:[11,2,3,2],py:[6,6,9,4],pz:[0,-1,-1,-1],nx:[4,9,19,19],ny:[5,10,17,18],nz:[2,1,0,0]},{size:2,px:[2,4],py:[4,8],pz:[2,1],nx:[4,9],ny:[10,10],nz:[1,-1]},{size:2,px:[23,22],py:[8,12],pz:[0,-1],nx:[7,4],ny:[11,2],nz:[0,2]},{size:2,px:[12,1],py:[5,2],pz:[0,-1],nx:[9,11],ny:[2,1],nz:[0,0]},{size:2,px:[4,4],py:[2,2],pz:[0,-1],nx:[3,2],ny:[1,2],nz:[0,0]},{size:2,px:[17,9],py:[13,7],pz:[0,1],nx:[9,5],ny:[4,0],nz:[1,-1]},{size:4,px:[0,0,9,13],py:[3,3,7,3],pz:[2,-1,-1,-1],nx:[2,4,4,11],ny:[1,2,8,5],nz:[2,1,1,0]},{size:5,px:[3,6,5,6,6],py:[0,0,2,1,1],pz:[1,0,0,0,-1],nx:[2,2,2,1,1],ny:[21,19,20,16,17],nz:[0,0,0,0,0]},{size:2,px:[13,3],py:[22,10],pz:[0,-1],nx:[7,4],ny:[10,5],nz:[1,2]},{size:2,px:[3,2],py:[7,3],pz:[1,2],nx:[8,4],ny:[4,5],nz:[1,-1]},{size:5,px:[17,8,15,7,15],py:[13,6,16,5,12],pz:[0,1,0,1,0],nx:[5,4,6,3,4],ny:[1,2,1,0,3],nz:[0,0,0,1,-1]},{size:5,px:[12,9,11,12,10],py:[0,1,2,2,0],pz:[0,0,0,0,0],nx:[8,16,7,4,4],ny:[9,23,9,3,2],nz:[1,0,1,2,-1]},{size:2,px:[4,11],py:[1,4],pz:[2,-1],nx:[8,7],ny:[4,4],nz:[0,0]},{size:4,px:[7,4,5,8],py:[13,2,1,3],pz:[0,-1,-1,-1],nx:[9,4,9,9],ny:[9,5,10,11],nz:[0,1,0,0]},{size:2,px:[10,11],py:[10,11],pz:[0,-1],nx:[2,6],ny:[2,2],nz:[2,1]},{size:2,px:[21,3],py:[11,2],pz:[0,-1],nx:[22,22],ny:[20,18],nz:[0,0]},{size:2,px:[7,6],py:[1,2],pz:[0,0],nx:[5,10],ny:[1,0],nz:[0,-1]},{size:2,px:[21,3],py:[18,1],pz:[0,-1],nx:[16,15],ny:[4,4],nz:[0,0]},{size:2,px:[12,7],py:[4,1],pz:[0,-1],nx:[4,8],ny:[2,4],nz:[2,1]},{size:2,px:[13,11],py:[23,17],pz:[0,0],nx:[11,21],ny:[16,0],nz:[0,-1]},{size:2,px:[1,2],py:[0,6],pz:[1,-1],nx:[16,16],ny:[9,11],nz:[0,0]},{size:2,px:[12,13],py:[20,20],pz:[0,0],nx:[11,3],ny:[21,7],nz:[0,-1]},{size:3,px:[19,20,9],py:[21,18,11],pz:[0,0,1],nx:[17,4,11],ny:[19,2,0],nz:[0,-1,-1]},{size:2,px:[12,5],py:[5,2],pz:[0,1],nx:[7,9],ny:[7,8],nz:[0,-1]},{size:5,px:[8,4,4,8,4],py:[4,4,5,10,3],pz:[1,1,2,0,2],nx:[11,22,11,23,23],ny:[0,0,1,3,3],nz:[1,0,1,0,-1]},{size:2,px:[8,14],py:[10,23],pz:[1,0],nx:[7,2],ny:[10,9],nz:[1,-1]},{size:2,px:[5,14],py:[6,23],pz:[1,-1],nx:[1,2],ny:[2,4],nz:[2,1]},{size:2,px:[11,2],py:[19,3],pz:[0,-1],nx:[10,12],ny:[18,18],nz:[0,0]},{size:2,px:[12,3],py:[4,1],pz:[0,2],nx:[6,6],ny:[11,11],nz:[1,-1]},{size:5,px:[0,0,0,0,0],py:[18,10,20,19,19],pz:[0,1,0,0,-1],nx:[11,10,14,12,13],ny:[2,2,2,2,2],nz:[0,0,0,0,0]},{size:3,px:[12,2,9],py:[14,5,10],pz:[0,-1,-1],nx:[11,10,5],ny:[10,13,5],nz:[0,0,1]},{size:2,px:[2,3],py:[3,7],pz:[2,1],nx:[3,10],ny:[4,13],nz:[1,-1]},{size:2,px:[9,3],py:[21,7],pz:[0,-1],nx:[10,21],ny:[7,15],nz:[1,0]},{size:2,px:[21,10],py:[16,8],pz:[0,1],nx:[8,2],ny:[10,8],nz:[1,-1]},{size:2,px:[8,8],py:[6,7],pz:[1,-1],nx:[12,11],ny:[11,7],nz:[0,1]},{size:2,px:[3,11],py:[4,20],pz:[2,0],nx:[11,10],ny:[19,1],nz:[0,-1]},{size:2,px:[17,5],py:[13,3],pz:[0,-1],nx:[7,8],ny:[4,4],nz:[1,1]},{size:2,px:[7,1],py:[23,3],pz:[0,2],nx:[14,6],ny:[12,9],nz:[0,-1]},{size:2,px:[12,5],py:[11,2],pz:[0,-1],nx:[11,7],ny:[3,1],nz:[0,1]},{size:2,px:[9,6],py:[2,17],pz:[0,-1],nx:[4,6],ny:[4,12],nz:[1,0]},{size:2,px:[14,19],py:[5,6],pz:[0,-1],nx:[9,3],ny:[9,1],nz:[0,2]},{size:5,px:[12,13,13,13,12],py:[9,11,12,13,10],pz:[0,0,0,0,0],nx:[2,4,4,4,4],ny:[7,18,17,14,14],nz:[1,0,0,0,-1]},{size:2,px:[10,10],py:[6,6],pz:[1,-1],nx:[20,18],ny:[18,23],nz:[0,0]},{size:2,px:[5,6],py:[4,14],pz:[1,-1],nx:[9,4],ny:[2,1],nz:[1,2]},{size:2,px:[11,9],py:[4,18],pz:[0,-1],nx:[4,8],ny:[4,4],nz:[1,1]},{size:2,px:[15,0],py:[18,4],pz:[0,-1],nx:[3,4],ny:[5,4],nz:[2,2]},{size:4,px:[7,3,6,6],py:[8,4,6,5],pz:[1,2,1,1],nx:[10,4,13,0],ny:[10,4,9,22],nz:[0,-1,-1,-1]},{size:2,px:[10,8],py:[18,11],pz:[0,-1],nx:[5,4],ny:[8,10],nz:[1,1]},{size:4,px:[17,2,10,2],py:[14,1,10,3],pz:[0,-1,-1,-1],nx:[8,8,17,8],ny:[4,5,12,6],nz:[1,1,0,1]},{size:5,px:[9,11,9,4,10],py:[1,1,0,0,1],pz:[0,0,0,1,0],nx:[8,4,7,15,15],ny:[7,2,4,17,17],nz:[1,2,1,0,-1]},{size:2,px:[4,3],py:[11,8],pz:[0,-1],nx:[2,2],ny:[1,2],nz:[2,2]},{size:2,px:[11,3],py:[13,8],pz:[0,-1],nx:[1,1],ny:[5,2],nz:[1,2]},{size:2,px:[6,2],py:[8,3],pz:[0,2],nx:[3,1],ny:[5,2],nz:[1,-1]},{size:5,px:[10,5,7,8,6],py:[9,7,7,7,7],pz:[0,0,0,0,0],nx:[7,3,0,2,15],ny:[8,0,1,18,17],nz:[0,-1,-1,-1,-1]},{size:2,px:[17,8],py:[12,6],pz:[0,1],nx:[8,8],ny:[4,4],nz:[1,-1]},{size:5,px:[3,11,8,10,12],py:[0,2,10,2,3],pz:[2,0,0,0,0],nx:[3,2,10,2,2],ny:[6,4,11,3,3],nz:[0,1,0,1,-1]},{size:2,px:[3,6],py:[2,4],pz:[2,1],nx:[8,19],ny:[4,16],nz:[1,-1]},{size:2,px:[2,2],py:[1,1],pz:[2,-1],nx:[7,17],ny:[1,2],nz:[1,0]},{size:5,px:[16,15,14,13,7],py:[0,0,0,0,0],pz:[0,0,0,0,-1],nx:[6,4,8,3,11],ny:[3,4,4,1,6],nz:[1,1,1,2,0]},{size:2,px:[11,1],py:[8,5],pz:[0,-1],nx:[13,4],ny:[10,2],nz:[0,2]},{size:2,px:[4,9],py:[0,2],pz:[2,1],nx:[4,11],ny:[0,2],nz:[0,-1]},{size:2,px:[15,15],py:[2,2],pz:[0,-1],nx:[8,4],ny:[4,2],nz:[1,2]},{size:2,px:[8,17],py:[9,22],pz:[1,0],nx:[8,20],ny:[10,2],nz:[1,-1]},{size:2,px:[10,10],py:[14,22],pz:[0,-1],nx:[3,11],ny:[3,3],nz:[1,0]},{size:2,px:[4,2],py:[1,0],pz:[1,2],nx:[5,8],ny:[3,9],nz:[0,-1]},{size:2,px:[2,3],py:[4,8],pz:[2,1],nx:[9,5],ny:[15,19],nz:[0,-1]},{size:2,px:[5,2],py:[1,1],pz:[0,1],nx:[10,10],ny:[6,6],nz:[0,-1]},{size:2,px:[17,6],py:[10,2],pz:[0,-1],nx:[4,8],ny:[2,4],nz:[2,1]},{size:3,px:[13,7,3],py:[5,2,6],pz:[0,1,-1],nx:[17,16,17],ny:[1,1,2],nz:[0,0,0]},{size:2,px:[11,10],py:[3,3],pz:[0,0],nx:[8,4],ny:[4,4],nz:[1,-1]},{size:2,px:[4,8],py:[0,8],pz:[2,-1],nx:[3,4],ny:[0,0],nz:[1,1]},{size:5,px:[9,2,4,1,2],py:[13,3,9,2,5],pz:[0,2,1,2,2],nx:[9,5,10,4,10],ny:[5,1,3,0,0],nz:[1,-1,-1,-1,-1]},{size:2,px:[6,12],py:[5,9],pz:[1,0],nx:[0,2],ny:[23,9],nz:[0,-1]},{size:2,px:[22,11],py:[21,8],pz:[0,1],nx:[10,0],ny:[17,2],nz:[0,-1]},{size:2,px:[3,1],py:[22,9],pz:[0,1],nx:[22,5],ny:[11,2],nz:[0,2]},{size:2,px:[4,2],py:[6,3],pz:[1,2],nx:[5,6],ny:[10,9],nz:[1,-1]},{size:4,px:[7,3,17,7],py:[8,2,10,11],pz:[0,2,0,1],nx:[6,10,5,23],ny:[9,21,1,23],nz:[0,-1,-1,-1]},{size:2,px:[8,3],py:[7,2],pz:[1,2],nx:[8,9],ny:[4,9],nz:[1,-1]},{size:2,px:[9,5],py:[14,6],pz:[0,1],nx:[8,8],ny:[13,13],nz:[0,-1]},{size:3,px:[11,6,8],py:[20,3,20],pz:[0,-1,-1],nx:[5,3,12],ny:[9,5,18],nz:[1,2,0]},{size:2,px:[3,9],py:[1,3],pz:[1,0],nx:[2,8],ny:[5,8],nz:[0,-1]},{size:2,px:[15,9],py:[21,3],pz:[0,-1],nx:[3,4],ny:[5,5],nz:[2,2]},{size:2,px:[2,9],py:[7,11],pz:[1,-1],nx:[2,2],ny:[8,9],nz:[1,1]},{size:4,px:[3,4,3,1],py:[14,21,19,6],pz:[0,0,0,1],nx:[10,16,4,5],ny:[8,1,7,6],nz:[0,-1,-1,-1]},{size:4,px:[10,4,3,1],py:[5,21,19,6],pz:[1,-1,-1,-1],nx:[21,10,5,11],ny:[4,2,3,4],nz:[0,1,2,1]},{size:2,px:[4,17],py:[3,8],pz:[2,0],nx:[17,2],ny:[9,22],nz:[0,-1]},{size:2,px:[17,12],py:[14,20],pz:[0,-1],nx:[7,8],ny:[4,4],nz:[1,1]},{size:2,px:[10,12],py:[9,20],pz:[0,-1],nx:[11,23],ny:[8,18],nz:[1,0]},{size:2,px:[5,11],py:[4,7],pz:[2,1],nx:[8,15],ny:[7,5],nz:[1,-1]},{size:2,px:[11,15],py:[13,8],pz:[0,-1],nx:[11,11],ny:[6,7],nz:[1,1]},{size:2,px:[6,15],py:[14,8],pz:[0,-1],nx:[4,4],ny:[12,13],nz:[0,0]},{size:2,px:[5,5],py:[0,1],pz:[2,2],nx:[15,4],ny:[5,5],nz:[0,-1]},{size:2,px:[16,17],py:[2,2],pz:[0,0],nx:[20,8],ny:[3,7],nz:[0,-1]},{size:3,px:[6,3,2],py:[10,6,1],pz:[0,-1,-1],nx:[4,3,2],ny:[3,4,2],nz:[1,1,2]},{size:2,px:[10,6],py:[4,6],pz:[0,-1],nx:[6,13],ny:[0,1],nz:[1,0]},{size:2,px:[10,10],py:[8,7],pz:[1,1],nx:[8,2],ny:[7,2],nz:[1,-1]},{size:2,px:[7,1],py:[12,4],pz:[0,-1],nx:[3,4],ny:[5,5],nz:[1,1]},{size:2,px:[11,15],py:[15,14],pz:[0,-1],nx:[3,11],ny:[4,13],nz:[1,0]},{size:5,px:[13,9,11,14,12],py:[0,2,0,0,2],pz:[0,0,0,0,0],nx:[5,4,4,3,4],ny:[4,4,18,7,17],nz:[1,1,0,1,0]},{size:3,px:[13,12,11],py:[22,22,22],pz:[0,0,0],nx:[11,12,13],ny:[20,20,20],nz:[0,0,0]},{size:2,px:[6,13],py:[2,4],pz:[1,0],nx:[7,6],ny:[8,9],nz:[0,-1]},{size:2,px:[0,0],py:[23,4],pz:[0,-1],nx:[5,9],ny:[1,1],nz:[1,0]},{size:2,px:[14,14],py:[19,19],pz:[0,-1],nx:[11,11],ny:[10,9],nz:[1,1]},{size:2,px:[23,23],py:[11,9],pz:[0,0],nx:[23,23],ny:[0,11],nz:[0,-1]},{size:2,px:[23,3],py:[23,5],pz:[0,-1],nx:[4,1],ny:[23,10],nz:[0,1]},{size:2,px:[9,1],py:[7,4],pz:[1,-1],nx:[19,10],ny:[20,9],nz:[0,1]},{size:2,px:[16,1],py:[9,4],pz:[0,-1],nx:[7,8],ny:[3,3],nz:[1,1]},{size:2,px:[7,6],py:[13,13],pz:[0,0],nx:[4,5],ny:[4,11],nz:[1,-1]},{size:5,px:[19,20,20,10,10],py:[0,0,2,0,1],pz:[0,0,0,1,1],nx:[7,7,15,4,4],ny:[4,13,7,4,4],nz:[1,0,0,1,-1]},{size:2,px:[12,23],py:[6,5],pz:[0,-1],nx:[18,18],ny:[17,16],nz:[0,0]},{size:2,px:[6,3],py:[9,2],pz:[1,2],nx:[14,18],ny:[9,1],nz:[0,-1]},{size:2,px:[9,13],py:[16,5],pz:[0,-1],nx:[5,4],ny:[7,9],nz:[1,1]},{size:2,px:[10,10],py:[8,10],pz:[1,1],nx:[4,1],ny:[5,3],nz:[2,-1]},{size:2,px:[12,11],py:[13,4],pz:[0,-1],nx:[0,0],ny:[14,15],nz:[0,0]},{size:2,px:[2,1],py:[20,17],pz:[0,0],nx:[12,12],ny:[22,2],nz:[0,-1]},{size:2,px:[2,3],py:[6,7],pz:[1,-1],nx:[21,21],ny:[13,12],nz:[0,0]},{size:2,px:[3,10],py:[4,23],pz:[2,0],nx:[10,2],ny:[21,5],nz:[0,-1]},{size:2,px:[6,12],py:[3,6],pz:[1,0],nx:[11,0],ny:[17,1],nz:[0,-1]},{size:2,px:[11,4],py:[21,9],pz:[0,-1],nx:[2,3],ny:[18,22],nz:[0,0]},{size:2,px:[13,5],py:[18,9],pz:[0,-1],nx:[6,7],ny:[8,9],nz:[1,1]},{size:2,px:[21,4],py:[16,3],pz:[0,-1],nx:[23,23],ny:[16,15],nz:[0,0]},{size:2,px:[2,0],py:[7,4],pz:[1,-1],nx:[3,8],ny:[7,4],nz:[1,1]},{size:2,px:[15,16],py:[11,12],pz:[0,0],nx:[8,5],ny:[4,5],nz:[1,-1]},{size:2,px:[0,0],py:[7,5],pz:[0,0],nx:[17,17],ny:[11,10],nz:[0,-1]},{size:5,px:[8,13,12,3,3],py:[6,23,23,3,3],pz:[1,0,0,2,-1],nx:[0,1,0,0,0],ny:[2,13,4,5,6],nz:[2,0,1,1,1]},{size:2,px:[0,1],py:[7,8],pz:[1,-1],nx:[0,0],ny:[1,0],nz:[2,2]},{size:2,px:[2,12],py:[1,7],pz:[1,-1],nx:[0,0],ny:[12,14],nz:[0,0]},{size:2,px:[5,1],py:[7,4],pz:[1,2],nx:[8,0],ny:[15,14],nz:[0,-1]},{size:2,px:[7,4],py:[14,8],pz:[0,-1],nx:[2,4],ny:[1,4],nz:[2,1]},{size:2,px:[5,3],py:[3,1],pz:[2,-1],nx:[9,9],ny:[5,6],nz:[1,1]},{size:2,px:[4,5],py:[2,3],pz:[1,-1],nx:[11,12],ny:[23,23],nz:[0,0]},{size:2,px:[10,5],py:[7,0],pz:[1,-1],nx:[22,22],ny:[19,18],nz:[0,0]},{size:3,px:[10,2,9],py:[20,9,4],pz:[0,-1,-1],nx:[1,10,11],ny:[2,11,9],nz:[2,0,0]},{size:2,px:[4,8],py:[3,6],pz:[2,1],nx:[9,3],ny:[4,2],nz:[1,-1]},{size:2,px:[17,6],py:[7,16],pz:[0,-1],nx:[17,17],ny:[9,6],
                nz:[0,0]},{size:3,px:[8,1,9],py:[6,3,4],pz:[1,-1,-1],nx:[2,9,2],ny:[5,13,3],nz:[2,0,2]},{size:4,px:[10,10,9,2],py:[12,11,2,10],pz:[0,0,-1,-1],nx:[6,11,3,13],ny:[2,4,1,4],nz:[1,0,2,0]},{size:2,px:[3,3],py:[7,1],pz:[1,-1],nx:[4,3],ny:[4,4],nz:[1,1]},{size:2,px:[0,0],py:[4,8],pz:[2,1],nx:[4,4],ny:[15,5],nz:[0,-1]},{size:2,px:[5,0],py:[4,8],pz:[1,-1],nx:[13,13],ny:[9,10],nz:[0,0]},{size:2,px:[6,3],py:[2,1],pz:[1,2],nx:[8,17],ny:[4,12],nz:[1,-1]},{size:2,px:[15,16],py:[11,6],pz:[0,0],nx:[16,17],ny:[5,12],nz:[0,-1]},{size:2,px:[13,11],py:[9,7],pz:[0,-1],nx:[0,1],ny:[9,20],nz:[1,0]},{size:3,px:[16,11,20],py:[4,7,23],pz:[0,-1,-1],nx:[8,9,4],ny:[4,6,4],nz:[1,1,2]},{size:2,px:[1,1],py:[18,17],pz:[0,0],nx:[9,6],ny:[7,11],nz:[0,-1]},{size:3,px:[4,4,19],py:[3,2,9],pz:[2,2,0],nx:[2,14,11],ny:[5,3,9],nz:[1,-1,-1]},{size:2,px:[11,19],py:[13,9],pz:[0,-1],nx:[11,11],ny:[4,5],nz:[1,1]},{size:2,px:[13,7],py:[19,2],pz:[0,-1],nx:[3,5],ny:[6,12],nz:[1,0]},{size:4,px:[9,4,4,2],py:[13,9,8,4],pz:[0,1,1,2],nx:[13,0,0,14],ny:[18,11,6,1],nz:[0,-1,-1,-1]},{size:2,px:[11,15],py:[8,10],pz:[0,0],nx:[14,11],ny:[9,2],nz:[0,-1]},{size:2,px:[3,2],py:[8,5],pz:[1,2],nx:[4,4],ny:[10,10],nz:[1,-1]},{size:4,px:[4,6,16,14],py:[1,1,1,7],pz:[2,1,0,0],nx:[10,1,1,2],ny:[8,5,10,3],nz:[0,-1,-1,-1]},{size:4,px:[2,3,1,2],py:[3,1,0,2],pz:[0,0,1,0],nx:[0,0,0,0],ny:[1,1,2,0],nz:[0,1,0,1]},{size:2,px:[8,8],py:[6,7],pz:[1,1],nx:[8,0],ny:[4,1],nz:[1,-1]},{size:2,px:[0,0],py:[3,0],pz:[0,1],nx:[2,2],ny:[1,16],nz:[1,-1]},{size:2,px:[6,6],py:[19,18],pz:[0,0],nx:[2,10],ny:[5,8],nz:[2,-1]},{size:2,px:[8,5],py:[21,11],pz:[0,-1],nx:[3,2],ny:[11,5],nz:[1,2]},{size:2,px:[4,9],py:[4,7],pz:[2,1],nx:[8,7],ny:[10,4],nz:[1,-1]},{size:5,px:[4,18,19,16,19],py:[3,12,12,23,13],pz:[2,0,0,0,0],nx:[2,8,3,2,2],ny:[4,23,10,5,5],nz:[2,0,1,2,-1]},{size:2,px:[4,8],py:[6,11],pz:[1,0],nx:[8,3],ny:[4,7],nz:[1,-1]},{size:2,px:[3,12],py:[4,13],pz:[2,0],nx:[10,5],ny:[15,21],nz:[0,-1]},{size:2,px:[2,9],py:[4,23],pz:[2,0],nx:[19,4],ny:[9,3],nz:[0,2]},{size:2,px:[3,6],py:[8,15],pz:[1,0],nx:[6,1],ny:[18,5],nz:[0,-1]},{size:2,px:[9,0],py:[20,3],pz:[0,-1],nx:[2,10],ny:[5,17],nz:[2,0]},{size:3,px:[10,6,3],py:[2,7,3],pz:[0,-1,-1],nx:[5,4,2],ny:[9,7,2],nz:[1,1,2]},{size:2,px:[14,6],py:[12,7],pz:[0,-1],nx:[2,10],ny:[0,1],nz:[2,0]},{size:3,px:[10,5,1],py:[15,5,4],pz:[0,-1,-1],nx:[9,4,18],ny:[2,0,4],nz:[1,2,0]},{size:2,px:[17,2],py:[12,6],pz:[0,-1],nx:[8,16],ny:[4,11],nz:[1,0]},{size:3,px:[7,13,4],py:[0,0,1],pz:[1,0,-1],nx:[18,4,4],ny:[13,2,3],nz:[0,2,2]},{size:2,px:[1,11],py:[10,6],pz:[0,-1],nx:[0,1],ny:[15,17],nz:[0,0]},{size:3,px:[9,12,8],py:[8,17,11],pz:[1,0,1],nx:[12,0,20],ny:[16,9,13],nz:[0,-1,-1]},{size:2,px:[11,4],py:[5,8],pz:[0,-1],nx:[8,4],ny:[4,2],nz:[1,2]},{size:2,px:[16,3],py:[9,8],pz:[0,-1],nx:[4,8],ny:[2,4],nz:[2,1]},{size:2,px:[6,3],py:[11,5],pz:[1,2],nx:[11,5],ny:[21,5],nz:[0,-1]},{size:2,px:[11,13],py:[1,1],pz:[0,0],nx:[4,4],ny:[5,5],nz:[1,-1]},{size:2,px:[14,4],py:[4,3],pz:[0,-1],nx:[12,10],ny:[2,2],nz:[0,0]},{size:2,px:[3,6],py:[2,4],pz:[2,1],nx:[9,7],ny:[9,7],nz:[0,-1]},{size:3,px:[5,6,6],py:[4,4,4],pz:[1,-1,-1],nx:[13,8,7],ny:[8,3,4],nz:[0,1,1]},{size:2,px:[5,5],py:[2,11],pz:[1,1],nx:[10,11],ny:[22,22],nz:[0,0]},{size:2,px:[16,9],py:[13,7],pz:[0,1],nx:[8,14],ny:[4,12],nz:[1,-1]},{size:2,px:[13,5],py:[13,3],pz:[0,2],nx:[16,22],ny:[13,6],nz:[0,-1]},{size:4,px:[4,4,3,4],py:[4,3,4,5],pz:[2,2,2,2],nx:[21,5,17,7],ny:[0,2,5,23],nz:[0,-1,-1,-1]},{size:2,px:[4,16],py:[0,1],pz:[2,0],nx:[15,1],ny:[23,10],nz:[0,-1]},{size:2,px:[4,6],py:[11,2],pz:[0,-1],nx:[15,6],ny:[2,1],nz:[0,1]},{size:2,px:[6,3],py:[2,1],pz:[1,2],nx:[8,8],ny:[4,4],nz:[1,-1]},{size:3,px:[13,14,5],py:[9,15,2],pz:[0,-1,-1],nx:[11,1,11],ny:[10,3,11],nz:[0,1,0]},{size:2,px:[5,1],py:[6,2],pz:[1,-1],nx:[1,1],ny:[2,5],nz:[2,1]},{size:2,px:[11,5],py:[1,0],pz:[1,2],nx:[10,4],ny:[2,3],nz:[1,-1]},{size:2,px:[11,11],py:[8,9],pz:[1,1],nx:[23,4],ny:[23,2],nz:[0,-1]},{size:2,px:[5,2],py:[10,2],pz:[0,-1],nx:[18,10],ny:[0,1],nz:[0,1]},{size:2,px:[20,4],py:[7,3],pz:[0,2],nx:[8,4],ny:[4,0],nz:[1,-1]},{size:2,px:[10,4],py:[5,4],pz:[1,-1],nx:[11,11],ny:[5,6],nz:[1,1]},{size:3,px:[14,15,16],py:[0,0,1],pz:[0,0,0],nx:[8,5,15],ny:[7,2,10],nz:[1,-1,-1]},{size:2,px:[2,2],py:[1,1],pz:[2,-1],nx:[17,18],ny:[2,2],nz:[0,0]},{size:2,px:[13,8],py:[15,7],pz:[0,-1],nx:[9,4],ny:[5,2],nz:[0,1]},{size:2,px:[4,0],py:[6,17],pz:[1,-1],nx:[3,2],ny:[4,2],nz:[1,2]},{size:2,px:[14,8],py:[17,9],pz:[0,-1],nx:[7,6],ny:[8,8],nz:[1,1]},{size:2,px:[10,4],py:[7,1],pz:[1,-1],nx:[15,6],ny:[14,4],nz:[0,1]},{size:2,px:[3,12],py:[8,19],pz:[1,0],nx:[13,10],ny:[17,9],nz:[0,-1]},{size:2,px:[7,12],py:[2,4],pz:[1,0],nx:[6,11],ny:[3,2],nz:[0,-1]},{size:4,px:[2,1,6,1],py:[10,3,23,8],pz:[1,2,0,1],nx:[17,10,23,0],ny:[9,2,20,3],nz:[0,-1,-1,-1]},{size:2,px:[9,9],py:[2,8],pz:[0,-1],nx:[2,2],ny:[4,2],nz:[2,2]},{size:2,px:[3,16],py:[1,6],pz:[2,0],nx:[8,4],ny:[2,5],nz:[1,-1]},{size:2,px:[3,6],py:[1,2],pz:[2,1],nx:[8,8],ny:[4,4],nz:[1,-1]},{size:2,px:[5,6],py:[3,0],pz:[2,-1],nx:[9,5],ny:[2,1],nz:[0,1]},{size:2,px:[3,16],py:[5,23],pz:[1,-1],nx:[0,0],ny:[6,3],nz:[1,2]},{size:4,px:[0,0,0,0],py:[3,2,12,5],pz:[2,2,0,1],nx:[2,3,2,13],ny:[5,5,2,19],nz:[1,-1,-1,-1]},{size:2,px:[11,11],py:[10,11],pz:[0,0],nx:[5,5],ny:[1,1],nz:[2,-1]},{size:2,px:[5,2],py:[0,4],pz:[2,-1],nx:[2,2],ny:[10,8],nz:[1,1]},{size:4,px:[16,2,8,4],py:[14,0,11,5],pz:[0,-1,-1,-1],nx:[18,14,7,7],ny:[13,14,8,6],nz:[0,0,1,1]},{size:2,px:[8,9],py:[2,2],pz:[0,0],nx:[5,14],ny:[4,14],nz:[1,-1]},{size:2,px:[3,5],py:[11,20],pz:[1,0],nx:[11,4],ny:[0,2],nz:[0,-1]},{size:2,px:[2,2],py:[3,4],pz:[2,2],nx:[3,4],ny:[4,2],nz:[1,-1]},{size:3,px:[10,4,3],py:[5,5,3],pz:[0,-1,-1],nx:[11,3,10],ny:[2,0,2],nz:[0,2,0]},{size:2,px:[15,15],py:[1,1],pz:[0,-1],nx:[7,4],ny:[5,2],nz:[1,2]},{size:4,px:[9,5,2,6],py:[22,8,4,19],pz:[0,1,2,0],nx:[9,5,0,3],ny:[20,5,22,4],nz:[0,-1,-1,-1]},{size:3,px:[1,4,10],py:[3,9,12],pz:[2,1,0],nx:[0,10,0],ny:[0,5,0],nz:[0,-1,-1]},{size:2,px:[1,6],py:[0,7],pz:[0,-1],nx:[20,19],ny:[14,14],nz:[0,0]},{size:2,px:[13,4],py:[14,15],pz:[0,-1],nx:[2,1],ny:[5,7],nz:[0,0]},{size:2,px:[17,7],py:[9,11],pz:[0,-1],nx:[8,4],ny:[4,2],nz:[1,2]},{size:2,px:[17,9],py:[12,6],pz:[0,1],nx:[15,10],ny:[9,8],nz:[0,-1]},{size:2,px:[0,0],py:[0,1],pz:[2,2],nx:[9,7],ny:[6,17],nz:[1,-1]},{size:3,px:[3,3,15],py:[3,4,6],pz:[2,1,0],nx:[0,2,22],ny:[5,8,9],nz:[0,-1,-1]},{size:4,px:[15,15,15,1],py:[12,6,6,1],pz:[0,-1,-1,-1],nx:[4,7,13,4],ny:[4,7,12,2],nz:[2,1,0,2]},{size:2,px:[3,15],py:[12,6],pz:[0,-1],nx:[9,1],ny:[14,2],nz:[0,2]},{size:2,px:[12,12],py:[11,12],pz:[0,0],nx:[9,5],ny:[4,4],nz:[1,-1]},{size:3,px:[23,6,7],py:[23,3,4],pz:[0,-1,-1],nx:[19,16,17],ny:[17,14,15],nz:[0,0,0]},{size:2,px:[9,5],py:[2,7],pz:[1,-1],nx:[11,23],ny:[10,18],nz:[1,0]},{size:3,px:[0,0,0],py:[4,9,2],pz:[1,0,2],nx:[2,0,0],ny:[9,2,1],nz:[0,-1,-1]},{size:2,px:[12,0],py:[11,9],pz:[0,-1],nx:[1,0],ny:[18,5],nz:[0,2]},{size:2,px:[5,4],py:[10,6],pz:[0,1],nx:[10,6],ny:[10,18],nz:[0,-1]},{size:2,px:[13,12],py:[13,13],pz:[0,-1],nx:[5,11],ny:[1,3],nz:[2,1]},{size:2,px:[10,19],py:[5,22],pz:[1,-1],nx:[4,12],ny:[1,5],nz:[2,0]},{size:2,px:[8,6],py:[0,0],pz:[0,0],nx:[3,12],ny:[0,3],nz:[0,-1]},{size:2,px:[9,6],py:[7,0],pz:[1,-1],nx:[12,12],ny:[10,11],nz:[0,0]},{size:4,px:[3,1,3,2],py:[20,9,21,19],pz:[0,1,0,0],nx:[20,20,5,12],ny:[10,15,2,10],nz:[0,-1,-1,-1]},{size:2,px:[2,4],py:[3,6],pz:[2,1],nx:[3,1],ny:[4,6],nz:[1,-1]},{size:3,px:[5,11,11],py:[1,3,4],pz:[2,1,1],nx:[3,3,7],ny:[5,5,0],nz:[1,-1,-1]},{size:3,px:[8,6,7],py:[10,5,6],pz:[1,1,1],nx:[23,3,7],ny:[0,5,0],nz:[0,-1,-1]},{size:2,px:[2,7],py:[2,14],pz:[1,-1],nx:[7,3],ny:[12,4],nz:[0,1]},{size:2,px:[5,3],py:[6,3],pz:[1,2],nx:[13,3],ny:[12,4],nz:[0,-1]},{size:2,px:[11,18],py:[11,4],pz:[0,-1],nx:[23,11],ny:[19,10],nz:[0,1]},{size:2,px:[7,2],py:[12,3],pz:[0,-1],nx:[8,4],ny:[11,5],nz:[0,1]},{size:2,px:[11,11],py:[0,11],pz:[1,-1],nx:[3,3],ny:[19,18],nz:[0,0]},{size:2,px:[11,1],py:[11,11],pz:[1,-1],nx:[13,15],ny:[6,5],nz:[0,0]},{size:2,px:[8,8],py:[9,9],pz:[0,-1],nx:[5,11],ny:[1,3],nz:[2,1]},{size:4,px:[6,4,8,3],py:[6,2,4,3],pz:[0,2,1,2],nx:[7,0,15,8],ny:[8,8,16,7],nz:[0,-1,-1,-1]},{size:2,px:[4,3],py:[22,20],pz:[0,0],nx:[2,8],ny:[5,4],nz:[2,-1]},{size:2,px:[12,6],py:[11,0],pz:[0,-1],nx:[0,0],ny:[3,1],nz:[1,2]},{size:2,px:[0,0],py:[12,7],pz:[0,1],nx:[3,1],ny:[23,9],nz:[0,-1]},{size:2,px:[7,0],py:[11,5],pz:[1,-1],nx:[0,0],ny:[2,3],nz:[2,2]},{size:2,px:[8,8],py:[10,10],pz:[0,-1],nx:[4,3],ny:[5,4],nz:[2,2]},{size:2,px:[13,3],py:[2,4],pz:[0,-1],nx:[4,3],ny:[3,5],nz:[2,2]},{size:2,px:[1,1],py:[23,22],pz:[0,0],nx:[9,0],ny:[7,3],nz:[0,-1]},{size:2,px:[1,0],py:[16,15],pz:[0,0],nx:[0,14],ny:[23,12],nz:[0,-1]},{size:2,px:[13,8],py:[22,0],pz:[0,-1],nx:[5,3],ny:[0,1],nz:[1,1]},{size:2,px:[13,13],py:[7,7],pz:[0,-1],nx:[3,2],ny:[17,10],nz:[0,1]},{size:2,px:[20,20],py:[15,16],pz:[0,0],nx:[7,3],ny:[9,17],nz:[1,-1]},{size:5,px:[10,12,11,13,11],py:[2,2,1,2,2],pz:[0,0,0,0,0],nx:[10,18,21,21,19],ny:[3,1,13,11,2],nz:[1,0,0,0,0]},{size:2,px:[16,3],py:[6,1],pz:[0,2],nx:[15,18],ny:[8,1],nz:[0,-1]},{size:2,px:[19,3],py:[8,1],pz:[0,-1],nx:[9,8],ny:[4,4],nz:[1,1]},{size:2,px:[10,3],py:[15,18],pz:[0,-1],nx:[3,3],ny:[0,1],nz:[2,2]},{size:2,px:[3,3],py:[2,3],pz:[2,2],nx:[7,3],ny:[11,1],nz:[1,-1]},{size:2,px:[11,10],py:[17,9],pz:[0,-1],nx:[11,10],ny:[15,15],nz:[0,0]},{size:2,px:[5,10],py:[2,4],pz:[1,0],nx:[8,8],ny:[4,4],nz:[1,-1]},{size:2,px:[9,10],py:[3,4],pz:[0,-1],nx:[9,10],ny:[2,1],nz:[0,0]},{size:2,px:[23,11],py:[13,10],pz:[0,1],nx:[14,7],ny:[5,14],nz:[0,-1]},{size:2,px:[4,4],py:[5,4],pz:[2,2],nx:[9,8],ny:[3,3],nz:[1,-1]},{size:3,px:[12,4,15],py:[5,4,7],pz:[0,-1,-1],nx:[3,4,2],ny:[7,11,5],nz:[1,1,2]},{size:2,px:[11,4],py:[15,4],pz:[0,-1],nx:[5,9],ny:[7,15],nz:[1,0]},{size:2,px:[9,7],py:[0,1],pz:[1,-1],nx:[11,11],ny:[8,7],nz:[1,1]},{size:5,px:[1,1,1,1,1],py:[11,12,10,9,9],pz:[0,0,0,0,-1],nx:[4,5,8,16,11],ny:[4,3,8,8,6],nz:[1,1,0,0,0]}],alpha:[-1.059083,1.059083,-.7846122,.7846122,-.445116,.445116,-.4483277,.4483277,-.3905999,.3905999,-.378925,.378925,-.387461,.387461,-.3110541,.3110541,-.3565056,.3565056,-.3812617,.3812617,-.3325142,.3325142,-.2787282,.2787282,-.3238869,.3238869,-.2993499,.2993499,-.2807737,.2807737,-.2855285,.2855285,-.227755,.227755,-.2031261,.2031261,-.2071574,.2071574,-.2534142,.2534142,-.2266871,.2266871,-.2229078,.2229078,-.2716325,.2716325,-.3046938,.3046938,-.2271601,.2271601,-.1987651,.1987651,-.1953664,.1953664,-.2178737,.2178737,-.2285148,.2285148,-.1891073,.1891073,-.2926469,.2926469,-.2094783,.2094783,-.1478037,.1478037,-.1707579,.1707579,-.146439,.146439,-.2462321,.2462321,-.2319978,.2319978,-.1781651,.1781651,-.1471349,.1471349,-.1953006,.1953006,-.2145108,.2145108,-.1567881,.1567881,-.2024617,.2024617,-.1883198,.1883198,-.1996976,.1996976,-.129233,.129233,-.2142242,.2142242,-.2473748,.2473748,-.1880902,.1880902,-.1874572,.1874572,-.1495984,.1495984,-.1608525,.1608525,-.1698402,.1698402,-.1898871,.1898871,-.1350238,.1350238,-.1727032,.1727032,-.1593352,.1593352,-.1476968,.1476968,-.1428431,.1428431,-.1766261,.1766261,-.1453226,.1453226,-.1929885,.1929885,-.1337582,.1337582,-.1629078,.1629078,-.09973085,.09973085,-.117276,.117276,-.1399242,.1399242,-.1613189,.1613189,-.1145695,.1145695,-.1191093,.1191093,-.12259,.12259,-.1641114,.1641114,-.1419878,.1419878,-.2183465,.2183465,-.1566968,.1566968,-.1288216,.1288216,-.1422831,.1422831,-.2000107,.2000107,-.1817265,.1817265,-.1793796,.1793796,-.1428926,.1428926,-.1182032,.1182032,-.1150421,.1150421,-.1336584,.1336584,-.1656178,.1656178,-.1386549,.1386549,-.1387461,.1387461,-.1313023,.1313023,-.1360391,.1360391,-.1305505,.1305505,-.1323399,.1323399,-.1502891,.1502891,-.1488859,.1488859,-.1126628,.1126628,-.1233623,.1233623,-.1702106,.1702106,-.1629639,.1629639,-.1337706,.1337706,-.1290384,.1290384,-.1165519,.1165519,-.1412778,.1412778,-.1470204,.1470204,-.221378,.221378,-.1472619,.1472619,-.1357071,.1357071,-.1416513,.1416513,-.1050208,.1050208,-.1480033,.1480033,-.1899871,.1899871,-.1466249,.1466249,-.1076952,.1076952,-.1035096,.1035096,-.156697,.156697,-.1364115,.1364115,-.1512889,.1512889,-.1252851,.1252851,-.12063,.12063,-.1059134,.1059134,-.1140398,.1140398,-.1359912,.1359912,-.1231201,.1231201,-.1231867,.1231867,-.09789923,.09789923,-.1590213,.1590213,-.1002206,.1002206,-.1518339,.1518339,-.1055203,.1055203,-.1012579,.1012579,-.1094956,.1094956,-.1429592,.1429592,-.1108838,.1108838,-.1116475,.1116475,-.1735371,.1735371,-.1067758,.1067758,-.1290406,.1290406,-.1156822,.1156822,-.09668217,.09668217,-.1170053,.1170053,-.1252092,.1252092,-.1135158,.1135158,-.1105896,.1105896,-.1038175,.1038175,-.1210459,.1210459,-.1078878,.1078878,-.1050808,.1050808,-.1428227,.1428227,-.16646,.16646,-.1013508,.1013508,-.120693,.120693,-.1088972,.1088972,-.1381026,.1381026,-.1109115,.1109115,-.07921549,.07921549,-.1057832,.1057832,-.09385827,.09385827,-.1486035,.1486035,-.1247401,.1247401,-.09451327,.09451327,-.1272805,.1272805,-.09616206,.09616206,-.09051084,.09051084,-.1138458,.1138458,-.1047581,.1047581,-.1382394,.1382394,-.1122203,.1122203,-.1052936,.1052936,-.1239318,.1239318,-.1241439,.1241439,-.1259012,.1259012,-.1211701,.1211701,-.1344131,.1344131,-.1127778,.1127778,-.1609745,.1609745,-.1901382,.1901382,-.1618962,.1618962,-.1230398,.1230398,-.1319311,.1319311,-.143141,.143141,-.1143306,.1143306,-.09390938,.09390938,-.1154161,.1154161,-.1141205,.1141205,-.1098048,.1098048,-.08870072,.08870072,-.1122444,.1122444,-.1114147,.1114147,-.118571,.118571,-.1107775,.1107775,-.1259167,.1259167,-.1105176,.1105176,-.1020691,.1020691,-.09607863,.09607863,-.095737,.095737,-.1054349,.1054349,-.1137856,.1137856,-.1192043,.1192043,-.1113264,.1113264,-.1093137,.1093137,-.1010919,.1010919,-.09625901,.09625901,-.09338459,.09338459,-.1142944,.1142944,-.1038877,.1038877,-.09772862,.09772862,-.1375298,.1375298,-.1394776,.1394776,-.09454765,.09454765,-.1203246,.1203246,-.08684943,.08684943,-.1135622,.1135622,-.1058181,.1058181,-.1082152,.1082152,-.1411355,.1411355,-.09978846,.09978846,-.1057874,.1057874,-.1415366,.1415366,-.09981014,.09981014,-.09261151,.09261151,-.1737173,.1737173,-.1580335,.1580335,-.09594668,.09594668,-.09336013,.09336013,-.1102373,.1102373,-.08546557,.08546557,-.09945057,.09945057,-.1146358,.1146358,-.1324734,.1324734,-.1422296,.1422296,-.0993799,.0993799,-.08381049,.08381049,-.1270714,.1270714,-.1091738,.1091738,-.1314881,.1314881,-.1085159,.1085159,-.09247554,.09247554,-.08121645,.08121645,-.1059589,.1059589,-.08307793,.08307793,-.1033103,.1033103,-.1056706,.1056706,-.1032803,.1032803,-.126684,.126684,-.09341601,.09341601,-.0768357,.0768357,-.103053,.103053,-.1051872,.1051872,-.09114946,.09114946,-.1329341,.1329341,-.0927083,.0927083,-.114175,.114175,-.09889318,.09889318,-.08856485,.08856485,-.105421,.105421,-.1092704,.1092704,-.08729085,.08729085,-.1141057,.1141057,-.1530774,.1530774,-.0812972,.0812972,-.1143335,.1143335,-.1175777,.1175777,-.1371729,.1371729,-.1394356,.1394356,-.1016308,.1016308,-.1125547,.1125547,-.096726,.096726,-.1036631,.1036631,-.08702514,.08702514,-.1264807,.1264807,-.1465688,.1465688,-.08781464,.08781464,-.08552605,.08552605,-.1145072,.1145072,-.1378489,.1378489,-.1013312,.1013312,-.1020083,.1020083,-.1015816,.1015816,-.08407101,.08407101,-.08296485,.08296485,-.08033655,.08033655,-.09003615,.09003615,-.07504954,.07504954,-.1224941,.1224941,-.09347814,.09347814,-.09555575,.09555575,-.09810025,.09810025,-.1237068,.1237068,-.1283586,.1283586,-.1082763,.1082763,-.1018145,.1018145,-.1175161,.1175161,-.1252279,.1252279,-.1370559,.1370559,-.09941339,.09941339,-.08506938,.08506938,-.1260902,.1260902,-.1014152,.1014152,-.09728694,.09728694,-.0937491,.0937491,-.09587429,.09587429,-.09516036,.09516036,-.07375173,.07375173,-.09332487,.09332487,-.09020733,.09020733,-.1133381,.1133381,-.154218,.154218,-.09692168,.09692168,-.07960904,.07960904,-.08947089,.08947089,-.07830286,.07830286,-.0990005,.0990005,-.1041293,.1041293,-.09572501,.09572501,-.08230575,.08230575,-.09194901,.09194901,-.1076971,.1076971,-.1027782,.1027782,-.1028538,.1028538,-.1013992,.1013992,-.09087585,.09087585,-.1100706,.1100706,-.1094934,.1094934,-.1107879,.1107879,-.1026915,.1026915,-.1017572,.1017572,-.07984776,.07984776,-.09015413,.09015413,-.129987,.129987,-.09164982,.09164982,-.1062788,.1062788,-.1160203,.1160203,-.08858603,.08858603,-.09762964,.09762964,-.1070694,.1070694,-.09549046,.09549046,-.1533034,.1533034,-.08663316,.08663316,-.09303018,.09303018,-.09853582,.09853582,-.09733371,.09733371,-.1048555,.1048555,-.09056041,.09056041,-.07552283,.07552283,-.08780631,.08780631,-.1123953,.1123953,-.1452948,.1452948,-.1156423,.1156423,-.08701142,.08701142,-.09713334,.09713334,-.09970888,.09970888,-.08614129,.08614129,-.07459861,.07459861,-.09253517,.09253517,-.09570092,.09570092,-.09485535,.09485535,-.1148365,.1148365,-.1063193,.1063193,-.09986686,.09986686,-.07523412,.07523412,-.1005881,.1005881,-.08249716,.08249716,-.1055866,.1055866,-.134305,.134305,-.1371056,.1371056,-.09604689,.09604689,-.1224268,.1224268,-.09211478,.09211478,-.1108371,.1108371,-.1100547,.1100547,-.0893897,.0893897,-.08655951,.08655951,-.07085816,.07085816,-.08101028,.08101028,-.08338046,.08338046,-.08309588,.08309588,-.09090584,.09090584,-.08124564,.08124564,-.09367843,.09367843,-.1011747,.1011747,-.09885045,.09885045,-.08944266,.08944266,-.08453859,.08453859,-.08308847,.08308847,-.136728,.136728,-.1295144,.1295144,-.1063965,.1063965,-.07752328,.07752328,-.09681524,.09681524,-.07862345,.07862345,-.08767746,.08767746,-.09198041,.09198041,-.09686489,.09686489]},{count:564,threshold:-4.517456,feature:[{size:5,px:[15,9,8,12,11],py:[3,6,3,0,8],pz:[0,1,0,0,0],nx:[6,14,9,22,23],ny:[8,7,8,17,3],nz:[1,0,0,0,0]},{size:5,px:[12,13,11,14,12],py:[9,4,4,4,5],pz:[0,0,0,0,0],nx:[4,6,10,4,15],ny:[3,8,7,10,9],nz:[1,1,0,1,0]},{size:5,px:[7,5,6,8,8],py:[2,13,2,1,1],pz:[0,0,0,0,-1],nx:[3,0,4,1,0],ny:[4,3,10,3,13],nz:[1,1,1,0,0]},{size:5,px:[11,2,2,11,16],py:[9,4,2,7,11],pz:[0,2,2,0,0],nx:[8,4,1,14,0],ny:[4,4,16,5,13],nz:[1,1,-1,-1,-1]},{size:2,px:[14,14],py:[18,18],pz:[0,-1],nx:[8,13],ny:[10,16],nz:[1,0]},{size:5,px:[15,17,16,8,18],py:[1,2,1,0,2],pz:[0,0,0,1,0],nx:[21,22,22,22,22],ny:[1,5,3,4,2],nz:[0,0,0,0,-1]},{size:2,px:[15,4],py:[23,3],pz:[0,2],nx:[7,3],ny:[10,6],nz:[1,-1]},{size:5,px:[3,6,4,3,11],py:[10,11,8,3,8],pz:[1,0,1,1,0],nx:[3,5,6,3,0],ny:[4,9,9,9,0],nz:[1,-1,-1,-1,-1]},{size:3,px:[11,11,2],py:[11,13,16],pz:[0,0,-1],nx:[10,10,9],ny:[10,11,14],nz:[0,0,0]},{size:2,px:[8,4],py:[12,6],pz:[0,1],nx:[4,5],ny:[11,11],nz:[1,-1]},{size:5,px:[10,11,13,3,12],py:[3,4,3,0,1],pz:[0,0,0,2,0],nx:[14,18,20,19,15],ny:[13,1,15,2,18],nz:[0,0,0,0,0]},{size:5,px:[20,14,10,12,12],py:[12,12,4,10,11],pz:[0,0,1,0,0],nx:[9,2,9,9,9],ny:[4,12,5,9,14],nz:[1,-1,-1,-1,-1]},{size:5,px:[3,3,3,4,2],py:[15,16,14,21,12],pz:[0,0,0,0,0],nx:[0,0,0,0,0],ny:[20,10,5,21,21],nz:[0,1,2,0,-1]},{size:2,px:[18,8],py:[16,7],pz:[0,1],nx:[14,0],ny:[8,10],nz:[0,-1]},{size:4,px:[12,4,16,1],py:[14,3,8,3],pz:[0,-1,-1,-1],nx:[14,10,20,13],ny:[13,5,16,9],nz:[0,1,0,0]},{size:5,px:[3,8,2,3,3],py:[7,2,1,2,4],pz:[1,-1,-1,-1,-1],nx:[1,9,2,1,1],ny:[3,14,9,7,2],nz:[1,0,1,1,1]},{size:5,px:[4,1,3,2,3],py:[2,1,2,4,3],pz:[0,1,0,0,0],nx:[0,0,0,0,0],ny:[3,1,2,0,0],nz:[0,1,0,2,-1]},{size:4,px:[4,8,7,9],py:[6,11,11,10],pz:[1,0,0,0],nx:[3,10,2,20],ny:[4,4,4,8],nz:[1,-1,-1,-1]},{size:2,px:[1,8],py:[3,11],pz:[2,-1],nx:[8,2],ny:[15,5],nz:[0,2]},{size:2,px:[17,0],py:[13,10],pz:[0,-1],nx:[14,14],ny:[11,10],nz:[0,0]},{size:5,px:[22,22,22,5,22],py:[16,18,17,2,15],pz:[0,0,0,2,0],nx:[8,4,15,6,6],ny:[4,2,7,11,11],nz:[1,2,0,1,-1]},{size:5,px:[16,9,8,17,15],py:[12,6,6,22,12],pz:[0,1,1,0,0],nx:[11,23,23,23,22],ny:[11,23,22,21,23],nz:[1,0,0,0,-1]},{size:5,px:[5,2,4,4,9],py:[22,3,15,20,18],pz:[0,2,0,0,0],nx:[9,4,23,7,22],ny:[8,4,22,19,23],nz:[0,-1,-1,-1,-1]},{size:5,px:[8,6,9,7,3],py:[3,3,3,3,1],pz:[0,0,0,0,1],nx:[5,5,4,4,4],ny:[0,1,1,2,0],nz:[0,0,0,0,-1]},{size:2,px:[2,3],py:[3,3],pz:[2,2],nx:[3,6],ny:[4,6],nz:[1,-1]},{size:5,px:[1,1,0,1,0],py:[17,15,6,16,10],pz:[0,0,1,0,0],nx:[4,4,7,4,8],ny:[2,5,9,4,4],nz:[2,2,1,2,-1]},{size:5,px:[12,12,12,13,13],py:[10,9,11,13,13],pz:[0,0,0,0,-1],nx:[4,3,3,5,3],ny:[21,18,17,23,16],nz:[0,0,0,0,0]},{size:4,px:[5,6,5,9],py:[13,7,9,23],pz:[0,0,1,0],nx:[6,15,7,5],ny:[9,20,7,23],nz:[0,-1,-1,-1]},{size:2,px:[6,3],py:[4,2],pz:[1,2],nx:[8,23],ny:[4,2],nz:[1,-1]},{size:2,px:[9,7],py:[18,0],pz:[0,0],nx:[5,7],ny:[8,10],nz:[1,1]},{size:2,px:[4,6],py:[11,16],pz:[1,0],nx:[10,9],ny:[16,7],nz:[0,-1]},{size:4,px:[11,11,11,11],py:[11,10,12,13],pz:[0,0,0,0],nx:[13,13,13,9],ny:[11,9,10,4],nz:[0,0,0,1]},{size:4,px:[12,6,7,6],py:[7,11,8,4],pz:[0,1,1,1],nx:[10,0,19,7],ny:[21,3,12,11],nz:[0,-1,-1,-1]},{size:2,px:[4,4],py:[3,4],pz:[2,2],nx:[9,1],ny:[4,7],nz:[1,-1]},{size:2,px:[19,19],py:[21,20],pz:[0,0],nx:[7,7],ny:[3,13],nz:[1,-1]},{size:5,px:[12,9,13,11,5],py:[0,2,2,0,0],pz:[0,0,0,0,1],nx:[6,4,5,5,5],ny:[1,3,5,2,6],nz:[0,0,1,0,1]},{size:5,px:[4,3,2,5,7],py:[11,3,3,7,17],pz:[1,2,2,0,0],nx:[23,5,11,5,5],ny:[0,4,10,2,6],nz:[0,-1,-1,-1,-1]},{size:2,px:[20,17],py:[12,3],pz:[0,-1],nx:[20,19],ny:[21,23],nz:[0,0]},{size:2,px:[2,1],py:[12,8],pz:[0,0],nx:[2,8],ny:[2,16],nz:[2,-1]},{size:2,px:[16,5],py:[4,5],pz:[0,-1],nx:[7,8],ny:[9,1],nz:[1,1]},{size:2,px:[2,2],py:[0,1],pz:[1,1],nx:[1,8],ny:[5,1],nz:[0,-1]},{size:2,px:[1,1],py:[12,10],pz:[0,1],nx:[2,20],ny:[23,9],nz:[0,-1]},{size:4,px:[11,0,0,2],py:[14,3,9,22],pz:[0,-1,-1,-1],nx:[13,14,7,3],ny:[6,7,11,1],nz:[0,0,0,2]},{size:2,px:[14,0],py:[2,3],pz:[0,-1],nx:[4,4],ny:[4,3],nz:[2,2]},{size:2,px:[23,11],py:[18,11],pz:[0,1],nx:[3,2],ny:[1,21],nz:[1,-1]},{size:2,px:[9,9],py:[17,14],pz:[0,-1],nx:[4,5],ny:[10,8],nz:[1,1]},{size:2,px:[9,18],py:[7,14],pz:[1,0],nx:[18,9],ny:[17,8],nz:[0,-1]},{size:2,px:[2,8],py:[4,22],pz:[2,0],nx:[4,3],ny:[10,1],nz:[1,-1]},{size:2,px:[5,22],py:[4,9],pz:[2,-1],nx:[11,23],ny:[8,14],nz:[1,0]},{size:3,px:[23,5,5],py:[8,2,1],pz:[0,2,2],nx:[10,10,2],ny:[4,4,2],nz:[1,-1,-1]},{size:2,px:[11,11],py:[14,23],pz:[0,-1],nx:[3,11],ny:[4,13],nz:[1,0]},{size:2,px:[3,2],py:[7,0],pz:[1,-1],nx:[4,3],ny:[4,4],nz:[1,1]},{size:2,px:[12,1],py:[19,13],pz:[0,-1],nx:[9,12],ny:[10,18],nz:[1,0]},{size:2,px:[10,10],py:[11,10],pz:[1,1],nx:[4,1],ny:[5,11],nz:[2,-1]},{size:5,px:[9,12,4,8,8],py:[3,5,2,9,8],pz:[1,0,2,1,1],nx:[23,23,23,23,23],ny:[3,4,6,5,5],nz:[0,0,0,0,-1]},{size:2,px:[2,4],py:[3,6],pz:[2,1],nx:[3,9],ny:[4,6],nz:[1,-1]},{size:5,px:[13,13,13,7,7],py:[11,10,9,6,6],pz:[0,0,0,1,-1],nx:[5,5,15,5,2],ny:[5,15,9,9,1],nz:[0,0,0,1,2]},{size:2,px:[19,7],py:[21,7],pz:[0,1],nx:[14,10],ny:[15,4],nz:[0,-1]},{size:2,px:[5,5],py:[3,4],pz:[2,2],nx:[21,0],ny:[23,5],nz:[0,-1]},{size:2,px:[2,0],py:[0,0],pz:[1,-1],nx:[3,2],ny:[1,2],nz:[0,0]},{size:2,px:[9,0],py:[4,0],pz:[0,-1],nx:[5,12],ny:[0,1],nz:[1,0]},{size:5,px:[14,16,12,15,13],py:[0,1,0,0,0],pz:[0,0,0,0,0],nx:[4,8,8,4,9],ny:[2,3,4,1,3],nz:[2,1,1,2,-1]},{size:3,px:[4,17,2],py:[11,14,1],pz:[1,-1,-1],nx:[9,8,17],ny:[1,4,0],nz:[1,1,0]},{size:2,px:[18,9],py:[17,7],pz:[0,1],nx:[8,4],ny:[4,7],nz:[1,-1]},{size:2,px:[0,0],py:[3,0],pz:[1,2],nx:[10,11],ny:[6,5],nz:[1,-1]},{size:5,px:[21,21,21,21,20],py:[17,16,19,18,21],pz:[0,0,0,0,0],nx:[0,0,0,0,0],ny:[4,9,11,6,6],nz:[1,0,0,1,-1]},{size:2,px:[12,0],py:[7,1],pz:[0,-1],nx:[8,11],ny:[4,17],nz:[1,0]},{size:4,px:[13,0,0,0],py:[15,0,0,0],pz:[0,-1,-1,-1],nx:[3,7,4,6],ny:[2,7,5,9],nz:[2,1,2,1]},{size:2,px:[2,9],py:[3,12],pz:[2,0],nx:[2,0],ny:[4,0],nz:[1,-1]},{size:2,px:[10,3],py:[6,1],pz:[1,-1],nx:[20,21],ny:[19,14],nz:[0,0]},{size:5,px:[5,22,22,11,22],py:[1,4,3,3,2],pz:[2,0,0,1,-1],nx:[7,13,14,8,15],ny:[3,6,6,3,7],nz:[1,0,0,1,0]},{size:2,px:[12,19],py:[5,15],pz:[0,-1],nx:[16,4],ny:[8,2],nz:[0,2]},{size:2,px:[1,0],py:[11,9],pz:[1,1],nx:[5,0],ny:[3,3],nz:[1,-1]},{size:4,px:[8,3,4,2],py:[6,7,5,3],pz:[1,-1,-1,-1],nx:[13,14,11,11],ny:[11,13,3,5],nz:[0,0,1,1]},{size:2,px:[11,11],py:[5,6],pz:[0,0],nx:[8,4],ny:[4,2],nz:[1,-1]},{size:2,px:[5,9],py:[6,17],pz:[1,0],nx:[9,4],ny:[15,11],nz:[0,-1]},{size:3,px:[6,3,6],py:[6,3,5],pz:[1,2,1],nx:[11,10,4],ny:[8,11,5],nz:[0,0,-1]},{size:2,px:[8,16],py:[0,1],pz:[1,-1],nx:[19,17],ny:[1,0],nz:[0,0]},{size:2,px:[21,20],py:[4,1],pz:[0,0],nx:[11,5],ny:[0,0],nz:[1,2]},{size:2,px:[8,4],py:[6,3],pz:[1,2],nx:[8,9],ny:[4,10],nz:[1,-1]},{size:2,px:[10,1],py:[0,0],pz:[1,-1],nx:[13,12],ny:[6,5],nz:[0,0]},{size:2,px:[5,4],py:[3,11],pz:[1,-1],nx:[3,17],ny:[1,3],nz:[2,0]},{size:2,px:[12,13],py:[4,4],pz:[0,0],nx:[3,3],ny:[1,1],nz:[2,-1]},{size:2,px:[3,18],py:[2,7],pz:[2,0],nx:[8,1],ny:[4,4],nz:[1,-1]},{size:2,px:[16,6],py:[8,2],pz:[0,1],nx:[8,9],ny:[4,19],nz:[1,-1]},{size:3,px:[12,3,14],py:[13,3,15],pz:[0,-1,-1],nx:[0,1,0],ny:[16,18,15],nz:[0,0,0]},{size:2,px:[3,1],py:[3,4],pz:[2,-1],nx:[7,14],ny:[10,14],nz:[1,0]},{size:2,px:[9,16],py:[6,10],pz:[1,0],nx:[8,8],ny:[4,4],nz:[1,-1]},{size:2,px:[7,11],py:[4,4],pz:[0,0],nx:[7,23],ny:[3,11],nz:[0,-1]},{size:5,px:[2,4,3,4,4],py:[1,2,0,1,1],pz:[1,0,1,0,-1],nx:[11,9,4,9,5],ny:[6,5,3,6,3],nz:[0,0,1,0,1]},{size:2,px:[6,0],py:[14,1],pz:[0,-1],nx:[2,5],ny:[2,9],nz:[2,1]},{size:2,px:[6,7],py:[7,12],pz:[0,0],nx:[3,22],ny:[3,16],nz:[1,-1]},{size:2,px:[10,4],py:[1,1],pz:[0,1],nx:[2,6],ny:[2,21],nz:[2,-1]},{size:2,px:[13,1],py:[11,6],pz:[0,-1],nx:[12,6],ny:[5,2],nz:[0,1]},{size:5,px:[10,5,11,10,10],py:[4,3,4,6,5],pz:[0,1,0,0,0],nx:[4,7,13,8,4],ny:[2,8,9,4,4],nz:[2,1,0,1,-1]},{size:4,px:[7,8,7,8],py:[11,3,4,7],pz:[1,1,1,1],nx:[0,7,3,8],ny:[0,12,2,4],nz:[0,-1,-1,-1]},{size:2,px:[0,0],py:[4,7],pz:[2,1],nx:[10,1],ny:[7,0],nz:[0,-1]},{size:2,px:[11,5],py:[19,5],pz:[0,-1],nx:[11,5],ny:[17,10],nz:[0,1]},{size:2,px:[11,12],py:[4,4],pz:[0,0],nx:[7,5],ny:[8,3],nz:[0,-1]},{size:3,px:[4,8,4],py:[2,9,4],pz:[2,1,2],nx:[3,19,3],ny:[1,16,5],nz:[1,-1,-1]},{size:2,px:[3,7],py:[0,1],pz:[1,0],nx:[2,3],ny:[15,2],nz:[0,-1]},{size:2,px:[0,4],py:[2,0],pz:[2,-1],nx:[9,16],ny:[5,11],nz:[1,0]},{size:2,px:[14,15],py:[23,16],pz:[0,0],nx:[13,3],ny:[15,1],nz:[0,-1]},{size:2,px:[4,3],py:[0,1],pz:[1,-1],nx:[3,7],ny:[0,0],nz:[1,0]},{size:2,px:[7,6],py:[12,12],pz:[0,0],nx:[4,8],ny:[5,4],nz:[1,-1]},{size:5,px:[4,1,2,4,5],py:[1,0,0,0,6],pz:[0,2,1,0,1],nx:[4,8,7,8,6],ny:[4,10,11,4,4],nz:[1,0,0,1,1]},{size:2,px:[12,12],py:[15,8],pz:[0,-1],nx:[7,15],ny:[16,14],nz:[0,0]},{size:2,px:[4,8],py:[3,6],pz:[2,1],nx:[4,6],ny:[2,8],nz:[2,-1]},{size:2,px:[14,4],py:[19,23],pz:[0,-1],nx:[7,14],ny:[11,18],nz:[1,0]},{size:2,px:[4,2],py:[7,4],pz:[1,2],nx:[2,22],ny:[5,19],nz:[2,-1]},{size:2,px:[8,15],py:[7,17],pz:[1,0],nx:[14,4],ny:[15,5],nz:[0,2]},{size:2,px:[10,11],py:[9,8],pz:[1,-1],nx:[23,5],ny:[19,4],nz:[0,2]},{size:2,px:[11,1],py:[7,9],pz:[0,-1],nx:[4,4],ny:[4,5],nz:[1,1]},{size:2,px:[14,7],py:[6,9],pz:[0,0],nx:[4,11],ny:[4,0],nz:[1,-1]},{size:2,px:[5,4],py:[0,5],pz:[0,-1],nx:[2,2],ny:[0,4],nz:[1,0]},{size:2,px:[10,22],py:[5,20],pz:[0,-1],nx:[3,4],ny:[1,2],nz:[2,2]},{size:3,px:[23,11,11],py:[17,9,8],pz:[0,1,1],nx:[13,8,8],ny:[5,3,3],nz:[0,1,-1]},{size:2,px:[18,9],py:[0,21],pz:[0,-1],nx:[10,10],ny:[2,1],nz:[1,1]},{size:5,px:[11,10,11,11,11],py:[11,13,10,12,12],pz:[0,0,0,0,-1],nx:[11,13,12,3,8],ny:[5,5,5,1,10],nz:[0,0,0,2,0]},{size:2,px:[7,8],py:[11,11],pz:[0,0],nx:[9,16],ny:[9,19],nz:[0,-1]},{size:2,px:[9,18],py:[23,7],pz:[0,-1],nx:[21,21],ny:[7,13],nz:[0,0]},{size:2,px:[8,8],py:[7,8],pz:[1,1],nx:[5,21],ny:[9,13],nz:[1,-1]},{size:2,px:[17,8],py:[22,8],pz:[0,-1],nx:[4,8],ny:[5,10],nz:[2,1]},{size:5,px:[2,5,8,8,4],py:[3,9,13,23,7],pz:[2,1,0,0,1],nx:[9,17,18,19,20],ny:[0,0,0,2,3],nz:[1,0,0,0,0]},{size:3,px:[16,15,2],py:[3,3,13],pz:[0,0,-1],nx:[4,8,4],ny:[3,6,2],nz:[2,1,2]},{size:2,px:[4,7],py:[3,7],pz:[2,1],nx:[15,1],ny:[15,0],nz:[0,-1]},{size:2,px:[3,6],py:[2,3],pz:[2,1],nx:[3,18],ny:[4,2],nz:[1,-1]},{size:2,px:[2,4],py:[2,4],pz:[2,1],nx:[3,0],ny:[5,0],nz:[1,-1]},{size:2,px:[10,0],py:[10,0],pz:[0,-1],nx:[9,4],ny:[2,0],nz:[1,2]},{size:2,px:[2,0],py:[8,3],pz:[1,-1],nx:[4,8],ny:[4,14],nz:[1,0]},{size:2,px:[13,18],py:[14,14],pz:[0,-1],nx:[1,1],ny:[15,13],nz:[0,0]},{size:3,px:[3,2,2],py:[17,10,15],pz:[0,1,0],nx:[13,2,7],ny:[19,11,0],nz:[0,-1,-1]},{size:2,px:[4,17],py:[0,2],pz:[2,0],nx:[8,5],ny:[11,3],nz:[1,-1]},{size:2,px:[15,21],py:[5,4],pz:[0,-1],nx:[15,10],ny:[3,0],nz:[0,1]},{size:2,px:[7,3],py:[13,8],pz:[0,-1],nx:[8,4],ny:[4,4],nz:[1,1]},{size:2,px:[7,22],py:[3,4],pz:[1,-1],nx:[4,2],ny:[2,3],nz:[1,1]},{size:4,px:[6,2,6,5],py:[21,10,22,20],pz:[0,1,0,0],nx:[2,3,4,4],ny:[11,21,23,23],nz:[1,0,0,-1]},{size:2,px:[7,2],py:[6,8],pz:[1,-1],nx:[8,4],ny:[4,2],nz:[1,2]},{size:4,px:[11,11,5,11],py:[6,5,2,4],pz:[1,1,2,1],nx:[13,7,8,3],ny:[7,3,5,2],nz:[0,1,-1,-1]},{size:2,px:[3,3],py:[7,8],pz:[1,0],nx:[3,11],ny:[4,2],nz:[1,-1]},{size:3,px:[16,1,5],py:[3,3,11],pz:[0,-1,-1],nx:[16,4,8],ny:[2,0,1],nz:[0,2,1]},{size:2,px:[10,0],py:[8,1],pz:[0,-1],nx:[19,18],ny:[20,23],nz:[0,0]},{size:2,px:[17,4],py:[10,4],pz:[0,-1],nx:[4,14],ny:[2,9],nz:[2,0]},{size:5,px:[11,12,9,10,11],py:[2,3,2,2,3],pz:[0,0,0,0,0],nx:[6,4,2,2,2],ny:[18,9,3,2,2],nz:[0,1,2,2,-1]},{size:2,px:[0,1],py:[6,16],pz:[1,0],nx:[8,16],ny:[5,16],nz:[0,-1]},{size:2,px:[3,3],py:[2,3],pz:[2,2],nx:[8,17],ny:[4,9],nz:[1,-1]},{size:3,px:[2,5,2],py:[5,6,4],pz:[1,-1,-1],nx:[0,0,0],ny:[3,5,6],nz:[2,1,1]},{size:5,px:[0,0,0,0,0],py:[6,15,16,13,14],pz:[1,0,0,0,0],nx:[4,5,8,6,8],ny:[4,16,8,15,4],nz:[1,0,0,0,-1]},{size:2,px:[4,2],py:[6,3],pz:[1,2],nx:[3,5],ny:[4,16],nz:[1,-1]},{size:5,px:[21,19,21,21,21],py:[17,23,18,19,20],pz:[0,0,0,0,0],nx:[5,2,3,6,6],ny:[12,5,5,12,12],nz:[0,1,1,0,-1]},{size:2,px:[5,2],py:[11,1],pz:[1,-1],nx:[5,11],ny:[3,5],nz:[2,1]},{size:2,px:[10,5],py:[5,3],pz:[0,1],nx:[6,15],ny:[11,5],nz:[1,-1]},{size:2,px:[6,2],py:[4,2],pz:[1,-1],nx:[4,3],ny:[4,2],nz:[1,2]},{size:2,px:[10,6],py:[20,6],pz:[0,-1],nx:[5,10],ny:[11,17],nz:[1,0]},{size:4,px:[8,4,7,11],py:[7,4,5,8],pz:[1,2,1,0],nx:[13,10,5,21],ny:[9,3,5,4],nz:[0,-1,-1,-1]},{size:2,px:[7,13],py:[10,7],pz:[0,0],nx:[10,8],ny:[9,18],nz:[0,-1]},{size:2,px:[3,3],py:[1,0],pz:[2,2],nx:[8,5],ny:[4,2],nz:[1,-1]},{size:5,px:[5,2,5,8,4],py:[8,4,14,23,7],pz:[1,2,0,0,1],nx:[18,4,16,17,17],ny:[1,0,0,1,1],nz:[0,2,0,0,-1]},{size:2,px:[6,2],py:[2,4],pz:[1,-1],nx:[8,8],ny:[4,3],nz:[1,1]},{size:2,px:[6,1],py:[8,15],pz:[0,-1],nx:[8,3],ny:[4,4],nz:[1,1]},{size:2,px:[10,1],py:[7,2],pz:[1,-1],nx:[6,6],ny:[9,4],nz:[1,1]},{size:2,px:[4,1],py:[6,2],pz:[1,-1],nx:[1,10],ny:[16,12],nz:[0,0]},{size:2,px:[8,4],py:[7,2],pz:[1,-1],nx:[8,9],ny:[8,10],nz:[1,1]},{size:5,px:[4,8,7,6,6],py:[0,0,0,1,1],pz:[1,0,0,0,-1],nx:[11,5,8,4,10],ny:[5,3,4,4,5],nz:[0,1,1,1,0]},{size:2,px:[5,6],py:[8,5],pz:[0,0],nx:[6,6],ny:[8,3],nz:[0,-1]},{size:2,px:[18,5],py:[19,5],pz:[0,-1],nx:[4,21],ny:[5,19],nz:[2,0]},{size:2,px:[9,5],py:[13,6],pz:[0,1],nx:[2,2],ny:[4,2],nz:[1,-1]},{size:2,px:[10,4],py:[17,6],pz:[0,1],nx:[10,2],ny:[15,4],nz:[0,-1]},{size:3,px:[13,13,19],py:[11,12,8],pz:[0,0,-1],nx:[12,3,8],ny:[4,1,4],nz:[0,2,1]},{size:3,px:[11,7,4],py:[5,2,1],pz:[0,-1,-1],nx:[9,2,4],ny:[11,3,6],nz:[0,2,1]},{size:2,px:[10,7],py:[15,2],pz:[0,-1],nx:[4,4],ny:[0,1],nz:[2,2]},{size:5,px:[8,9,16,18,18],py:[0,1,1,1,1],pz:[1,1,0,0,-1],nx:[5,5,6,4,4],ny:[21,20,23,17,18],nz:[0,0,0,0,0]},{size:2,px:[6,7],py:[1,1],pz:[1,1],nx:[20,19],ny:[2,1],nz:[0,0]},{size:2,px:[2,2],py:[10,11],pz:[1,1],nx:[3,3],ny:[10,10],nz:[1,-1]},{size:2,px:[9,5],py:[23,1],pz:[0,-1],nx:[4,3],ny:[10,4],nz:[1,1]},{size:2,px:[1,10],py:[4,7],pz:[2,-1],nx:[4,3],ny:[23,21],nz:[0,0]},{size:2,px:[10,21],py:[11,18],pz:[1,0],nx:[10,4],ny:[18,1],nz:[0,-1]},{size:2,px:[11,23],py:[11,15],pz:[0,-1],nx:[11,11],ny:[7,9],nz:[1,1]},{size:2,px:[10,1],py:[7,7],pz:[1,-1],nx:[15,4],ny:[14,4],nz:[0,2]},{size:2,px:[1,2],py:[9,20],pz:[1,0],nx:[21,3],ny:[12,20],nz:[0,-1]},{size:2,px:[7,4],py:[0,0],pz:[1,2],nx:[4,2],ny:[0,19],nz:[0,-1]},{size:2,px:[2,4],py:[3,6],pz:[2,1],nx:[3,0],ny:[4,0],nz:[1,-1]},{size:2,px:[5,1],py:[5,0],pz:[1,-1],nx:[12,10],ny:[11,4],nz:[0,1]},{size:2,px:[11,12],py:[11,14],pz:[1,-1],nx:[18,16],ny:[21,15],nz:[0,0]},{size:2,px:[3,18],py:[1,5],pz:[2,-1],nx:[4,8],ny:[4,4],nz:[1,1]},{size:2,px:[9,10],py:[18,7],pz:[0,-1],nx:[3,6],ny:[0,0],nz:[2,1]},{size:2,px:[19,2],py:[1,4],pz:[0,-1],nx:[22,22],ny:[13,15],nz:[0,0]},{size:3,px:[13,15,20],py:[14,21,10],pz:[0,-1,-1],nx:[15,7,7],ny:[13,6,8],nz:[0,1,1]},{size:2,px:[9,9],py:[6,7],pz:[1,1],nx:[8,7],ny:[4,8],nz:[1,-1]
            },{size:2,px:[0,0],py:[5,3],pz:[1,2],nx:[5,10],ny:[2,9],nz:[1,-1]},{size:2,px:[14,11],py:[7,16],pz:[0,-1],nx:[1,0],ny:[17,4],nz:[0,2]},{size:2,px:[14,18],py:[17,18],pz:[0,-1],nx:[8,14],ny:[10,16],nz:[1,0]},{size:2,px:[6,11],py:[13,11],pz:[0,-1],nx:[8,9],ny:[12,9],nz:[0,0]},{size:2,px:[8,9],py:[2,2],pz:[0,0],nx:[3,3],ny:[2,2],nz:[2,-1]},{size:3,px:[21,21,21],py:[14,16,15],pz:[0,0,0],nx:[14,12,0],ny:[5,12,6],nz:[0,-1,-1]},{size:2,px:[4,21],py:[6,15],pz:[1,-1],nx:[5,1],ny:[6,5],nz:[1,1]},{size:2,px:[6,3],py:[2,1],pz:[1,2],nx:[8,0],ny:[4,20],nz:[1,-1]},{size:2,px:[13,2],py:[9,1],pz:[0,-1],nx:[3,5],ny:[1,2],nz:[2,1]},{size:2,px:[16,1],py:[5,4],pz:[0,-1],nx:[17,8],ny:[3,2],nz:[0,1]},{size:2,px:[9,2],py:[7,1],pz:[1,-1],nx:[20,20],ny:[17,16],nz:[0,0]},{size:2,px:[5,7],py:[3,6],pz:[2,-1],nx:[9,9],ny:[6,5],nz:[1,1]},{size:2,px:[11,17],py:[4,1],pz:[0,-1],nx:[8,4],ny:[4,2],nz:[1,2]},{size:2,px:[15,2],py:[11,0],pz:[0,-1],nx:[5,14],ny:[1,12],nz:[2,0]},{size:2,px:[22,19],py:[3,0],pz:[0,-1],nx:[9,4],ny:[6,4],nz:[1,1]},{size:2,px:[1,22],py:[3,21],pz:[0,-1],nx:[0,0],ny:[1,0],nz:[2,2]},{size:2,px:[11,11],py:[11,12],pz:[0,0],nx:[1,2],ny:[1,4],nz:[2,-1]},{size:2,px:[18,3],py:[8,1],pz:[0,2],nx:[13,1],ny:[8,5],nz:[0,-1]},{size:2,px:[13,6],py:[21,3],pz:[0,-1],nx:[11,11],ny:[6,5],nz:[1,1]},{size:2,px:[15,14],py:[4,4],pz:[0,0],nx:[17,1],ny:[12,5],nz:[0,-1]},{size:2,px:[11,3],py:[12,1],pz:[0,-1],nx:[1,2],ny:[2,4],nz:[2,1]},{size:2,px:[3,2],py:[7,3],pz:[0,1],nx:[16,2],ny:[3,5],nz:[0,-1]},{size:2,px:[10,5],py:[7,20],pz:[1,-1],nx:[9,8],ny:[4,6],nz:[1,1]},{size:2,px:[19,2],py:[10,2],pz:[0,-1],nx:[9,4],ny:[3,1],nz:[1,2]},{size:2,px:[14,9],py:[0,23],pz:[0,-1],nx:[4,4],ny:[3,2],nz:[2,2]},{size:2,px:[6,9],py:[4,10],pz:[1,0],nx:[10,9],ny:[9,0],nz:[0,-1]},{size:4,px:[6,9,10,8],py:[20,23,18,23],pz:[0,0,0,0],nx:[9,22,1,2],ny:[21,14,2,5],nz:[0,-1,-1,-1]},{size:2,px:[17,18],py:[13,6],pz:[0,-1],nx:[6,7],ny:[9,11],nz:[1,1]},{size:5,px:[18,19,20,19,20],py:[15,19,16,20,17],pz:[0,0,0,0,0],nx:[11,22,23,23,23],ny:[10,22,20,19,19],nz:[1,0,0,0,-1]},{size:2,px:[10,10],py:[1,0],pz:[1,1],nx:[21,11],ny:[0,4],nz:[0,-1]},{size:2,px:[11,0],py:[9,3],pz:[0,-1],nx:[9,4],ny:[2,1],nz:[1,2]},{size:2,px:[14,23],py:[2,18],pz:[0,-1],nx:[15,18],ny:[1,2],nz:[0,0]},{size:2,px:[9,3],py:[0,0],pz:[1,-1],nx:[3,12],ny:[1,5],nz:[2,0]},{size:2,px:[8,8],py:[7,8],pz:[1,1],nx:[8,8],ny:[4,4],nz:[1,-1]},{size:2,px:[1,0],py:[1,3],pz:[2,-1],nx:[7,19],ny:[9,15],nz:[1,0]},{size:3,px:[16,6,4],py:[21,5,4],pz:[0,-1,-1],nx:[4,19,8],ny:[5,21,11],nz:[2,0,1]},{size:2,px:[5,5],py:[6,6],pz:[1,-1],nx:[10,10],ny:[10,12],nz:[0,0]},{size:2,px:[6,11],py:[2,5],pz:[1,0],nx:[3,4],ny:[4,7],nz:[1,-1]},{size:3,px:[8,6,2],py:[4,10,2],pz:[1,1,2],nx:[2,18,5],ny:[0,11,5],nz:[0,-1,-1]},{size:2,px:[11,7],py:[9,7],pz:[0,-1],nx:[12,3],ny:[9,5],nz:[0,1]},{size:2,px:[14,13],py:[20,20],pz:[0,0],nx:[13,3],ny:[21,5],nz:[0,-1]},{size:2,px:[13,7],py:[5,3],pz:[0,-1],nx:[3,4],ny:[1,4],nz:[2,1]},{size:2,px:[6,2],py:[21,5],pz:[0,-1],nx:[2,3],ny:[5,10],nz:[2,1]},{size:2,px:[23,5],py:[6,0],pz:[0,2],nx:[21,4],ny:[6,1],nz:[0,-1]},{size:2,px:[9,9],py:[7,6],pz:[1,1],nx:[8,2],ny:[4,2],nz:[1,-1]},{size:2,px:[22,11],py:[20,9],pz:[0,1],nx:[8,8],ny:[10,10],nz:[1,-1]},{size:2,px:[8,16],py:[21,12],pz:[0,-1],nx:[2,7],ny:[5,23],nz:[2,0]},{size:5,px:[0,1,1,1,1],py:[3,1,9,4,7],pz:[2,2,1,1,1],nx:[11,22,22,23,23],ny:[10,21,22,19,20],nz:[1,0,0,0,-1]},{size:2,px:[17,5],py:[12,4],pz:[0,-1],nx:[8,8],ny:[4,5],nz:[1,1]},{size:2,px:[16,4],py:[7,10],pz:[0,-1],nx:[9,15],ny:[4,6],nz:[1,0]},{size:2,px:[3,6],py:[3,5],pz:[2,1],nx:[11,12],ny:[11,23],nz:[0,-1]},{size:2,px:[5,2],py:[14,7],pz:[0,1],nx:[4,17],ny:[18,16],nz:[0,-1]},{size:3,px:[10,1,1],py:[12,5,4],pz:[0,-1,-1],nx:[7,11,5],ny:[1,2,1],nz:[1,0,1]},{size:2,px:[7,6],py:[3,9],pz:[0,-1],nx:[2,2],ny:[2,3],nz:[2,2]},{size:2,px:[13,6],py:[22,9],pz:[0,-1],nx:[8,4],ny:[4,3],nz:[1,2]},{size:5,px:[12,9,10,11,11],py:[0,0,0,0,0],pz:[0,0,0,0,-1],nx:[16,5,10,4,8],ny:[10,3,6,4,4],nz:[0,1,0,1,1]},{size:2,px:[18,19],py:[23,20],pz:[0,0],nx:[8,5],ny:[11,3],nz:[1,-1]},{size:2,px:[8,3],py:[7,2],pz:[1,2],nx:[8,4],ny:[4,3],nz:[1,-1]},{size:5,px:[8,14,8,7,4],py:[6,12,8,6,3],pz:[1,0,1,1,2],nx:[2,6,6,7,7],ny:[0,1,2,0,0],nz:[2,0,0,0,-1]},{size:3,px:[1,2,3],py:[15,18,21],pz:[0,0,0],nx:[19,5,18],ny:[23,5,8],nz:[0,-1,-1]},{size:2,px:[6,2],py:[6,1],pz:[1,-1],nx:[0,0],ny:[12,4],nz:[0,1]},{size:2,px:[3,5],py:[5,11],pz:[2,1],nx:[14,5],ny:[19,5],nz:[0,-1]},{size:2,px:[10,4],py:[4,4],pz:[1,-1],nx:[11,5],ny:[4,2],nz:[1,2]},{size:2,px:[18,4],py:[6,4],pz:[0,-1],nx:[4,8],ny:[5,4],nz:[1,1]},{size:2,px:[6,12],py:[2,4],pz:[1,0],nx:[8,8],ny:[3,4],nz:[1,-1]},{size:2,px:[1,0],py:[1,1],pz:[1,2],nx:[7,2],ny:[4,7],nz:[0,-1]},{size:2,px:[8,0],py:[20,0],pz:[0,-1],nx:[4,5],ny:[10,11],nz:[1,1]},{size:2,px:[6,14],py:[5,2],pz:[1,-1],nx:[0,0],ny:[0,2],nz:[1,0]},{size:2,px:[5,15],py:[4,7],pz:[1,-1],nx:[4,7],ny:[1,2],nz:[2,1]},{size:2,px:[7,5],py:[2,1],pz:[0,1],nx:[3,1],ny:[4,1],nz:[1,-1]},{size:2,px:[8,9],py:[4,2],pz:[0,-1],nx:[11,9],ny:[1,3],nz:[0,0]},{size:2,px:[6,3],py:[2,4],pz:[1,-1],nx:[4,8],ny:[4,4],nz:[1,1]},{size:2,px:[3,7],py:[3,7],pz:[2,1],nx:[6,8],ny:[14,4],nz:[0,-1]},{size:2,px:[3,0],py:[21,3],pz:[0,2],nx:[20,8],ny:[10,4],nz:[0,-1]},{size:2,px:[6,3],py:[5,8],pz:[0,-1],nx:[4,3],ny:[4,2],nz:[0,1]},{size:2,px:[3,6],py:[7,13],pz:[1,0],nx:[3,2],ny:[4,3],nz:[1,-1]},{size:2,px:[16,10],py:[9,7],pz:[0,1],nx:[7,9],ny:[3,10],nz:[1,-1]},{size:2,px:[13,10],py:[6,7],pz:[0,-1],nx:[8,17],ny:[4,12],nz:[1,0]},{size:2,px:[5,10],py:[4,10],pz:[2,1],nx:[5,4],ny:[9,2],nz:[1,-1]},{size:4,px:[15,3,5,0],py:[12,4,2,3],pz:[0,-1,-1,-1],nx:[13,7,5,7],ny:[12,6,0,7],nz:[0,1,2,1]},{size:4,px:[2,3,16,17],py:[3,4,6,6],pz:[2,1,0,0],nx:[16,16,8,16],ny:[8,3,10,13],nz:[0,-1,-1,-1]},{size:2,px:[16,8],py:[1,4],pz:[0,-1],nx:[8,4],ny:[4,2],nz:[1,2]},{size:2,px:[9,14],py:[6,2],pz:[1,-1],nx:[8,8],ny:[6,4],nz:[1,1]},{size:2,px:[8,4],py:[10,4],pz:[1,2],nx:[10,0],ny:[5,7],nz:[1,-1]},{size:2,px:[9,10],py:[4,4],pz:[0,0],nx:[9,7],ny:[3,5],nz:[0,-1]},{size:5,px:[11,10,13,6,12],py:[2,2,2,1,2],pz:[0,0,0,1,0],nx:[4,18,18,13,13],ny:[2,18,19,7,7],nz:[2,0,0,0,-1]},{size:4,px:[13,13,13,2],py:[13,12,11,3],pz:[0,0,0,-1],nx:[4,6,8,11],ny:[2,2,4,4],nz:[2,1,1,0]},{size:2,px:[4,7],py:[6,13],pz:[1,0],nx:[8,10],ny:[4,22],nz:[1,-1]},{size:2,px:[0,7],py:[4,17],pz:[1,-1],nx:[0,1],ny:[5,21],nz:[2,0]},{size:2,px:[12,13],py:[22,22],pz:[0,0],nx:[2,2],ny:[13,13],nz:[0,-1]},{size:3,px:[4,4,3],py:[22,23,19],pz:[0,0,0],nx:[8,12,3],ny:[22,15,2],nz:[0,-1,-1]},{size:2,px:[10,12],py:[3,13],pz:[0,-1],nx:[15,2],ny:[10,2],nz:[0,2]},{size:2,px:[1,1],py:[3,3],pz:[2,-1],nx:[8,4],ny:[0,0],nz:[1,2]},{size:2,px:[6,12],py:[6,18],pz:[1,0],nx:[12,19],ny:[17,16],nz:[0,-1]},{size:2,px:[10,5],py:[2,1],pz:[0,1],nx:[5,4],ny:[4,17],nz:[0,-1]},{size:3,px:[3,12,11],py:[5,23,23],pz:[2,0,0],nx:[12,4,4],ny:[21,17,1],nz:[0,-1,-1]},{size:2,px:[12,0],py:[21,5],pz:[0,-1],nx:[0,0],ny:[7,9],nz:[1,1]},{size:2,px:[17,17],py:[12,11],pz:[0,0],nx:[8,11],ny:[4,11],nz:[1,-1]},{size:2,px:[11,0],py:[22,1],pz:[0,-1],nx:[4,6],ny:[1,0],nz:[1,1]},{size:2,px:[11,11],py:[9,5],pz:[1,1],nx:[23,11],ny:[23,20],nz:[0,-1]},{size:5,px:[4,12,11,9,8],py:[0,1,1,0,1],pz:[1,0,0,0,0],nx:[4,17,8,7,7],ny:[2,13,4,4,4],nz:[2,0,1,1,-1]},{size:2,px:[11,13],py:[12,12],pz:[0,-1],nx:[1,1],ny:[4,2],nz:[1,2]},{size:2,px:[23,4],py:[23,2],pz:[0,-1],nx:[5,2],ny:[23,6],nz:[0,1]},{size:3,px:[8,16,0],py:[5,15,6],pz:[1,-1,-1],nx:[23,23,11],ny:[18,17,8],nz:[0,0,1]},{size:2,px:[1,16],py:[4,15],pz:[2,-1],nx:[2,2],ny:[3,2],nz:[2,2]},{size:2,px:[3,8],py:[7,9],pz:[1,-1],nx:[4,2],ny:[10,5],nz:[1,2]},{size:3,px:[22,1,9],py:[23,2,3],pz:[0,-1,-1],nx:[2,2,5],ny:[5,4,19],nz:[2,2,0]},{size:2,px:[2,20],py:[5,15],pz:[1,-1],nx:[2,1],ny:[1,2],nz:[2,2]},{size:2,px:[4,8],py:[1,19],pz:[1,-1],nx:[2,2],ny:[5,4],nz:[2,2]},{size:2,px:[9,10],py:[21,0],pz:[0,-1],nx:[6,5],ny:[1,1],nz:[1,1]},{size:2,px:[4,8],py:[3,6],pz:[2,1],nx:[9,2],ny:[4,1],nz:[1,-1]},{size:3,px:[17,3,10],py:[8,0,2],pz:[0,2,0],nx:[13,2,6],ny:[15,5,1],nz:[0,-1,-1]},{size:2,px:[9,6],py:[20,21],pz:[0,-1],nx:[4,2],ny:[10,5],nz:[1,2]},{size:2,px:[3,7],py:[0,1],pz:[2,1],nx:[7,20],ny:[1,19],nz:[0,-1]},{size:2,px:[4,5],py:[0,1],pz:[1,0],nx:[3,2],ny:[4,2],nz:[0,-1]},{size:2,px:[2,7],py:[4,19],pz:[2,0],nx:[5,2],ny:[10,2],nz:[1,-1]},{size:5,px:[3,3,4,7,7],py:[1,0,0,0,1],pz:[1,1,1,0,0],nx:[5,4,10,8,8],ny:[3,3,5,4,4],nz:[1,1,0,1,-1]},{size:2,px:[1,5],py:[0,3],pz:[1,-1],nx:[1,0],ny:[0,1],nz:[0,1]},{size:2,px:[10,0],py:[5,5],pz:[0,-1],nx:[8,4],ny:[4,2],nz:[1,2]},{size:2,px:[0,9],py:[0,4],pz:[2,-1],nx:[13,10],ny:[0,0],nz:[0,0]},{size:2,px:[13,4],py:[14,5],pz:[0,-1],nx:[4,2],ny:[0,0],nz:[0,1]},{size:2,px:[17,4],py:[13,3],pz:[0,-1],nx:[4,2],ny:[4,2],nz:[1,2]},{size:2,px:[1,0],py:[6,2],pz:[1,-1],nx:[1,6],ny:[2,12],nz:[2,0]},{size:2,px:[12,4],py:[6,0],pz:[0,-1],nx:[3,3],ny:[8,9],nz:[1,1]},{size:2,px:[1,5],py:[1,5],pz:[1,-1],nx:[17,17],ny:[13,7],nz:[0,0]},{size:2,px:[7,3],py:[12,6],pz:[0,1],nx:[3,4],ny:[4,11],nz:[1,-1]},{size:2,px:[6,17],py:[2,8],pz:[1,0],nx:[3,3],ny:[1,2],nz:[1,-1]},{size:3,px:[13,6,6],py:[22,11,10],pz:[0,1,1],nx:[13,12,11],ny:[20,20,20],nz:[0,0,0]},{size:2,px:[4,2],py:[6,3],pz:[1,2],nx:[3,12],ny:[4,20],nz:[1,-1]},{size:2,px:[5,2],py:[1,1],pz:[1,-1],nx:[13,6],ny:[0,0],nz:[0,1]},{size:2,px:[2,8],py:[3,9],pz:[2,0],nx:[8,16],ny:[5,17],nz:[0,-1]},{size:2,px:[16,15],py:[1,1],pz:[0,0],nx:[7,11],ny:[8,0],nz:[1,-1]},{size:2,px:[11,18],py:[21,23],pz:[0,-1],nx:[1,1],ny:[4,3],nz:[1,2]},{size:2,px:[1,5],py:[0,2],pz:[1,-1],nx:[15,11],ny:[8,7],nz:[0,0]},{size:2,px:[5,4],py:[7,8],pz:[1,-1],nx:[9,10],ny:[13,11],nz:[0,0]},{size:2,px:[7,4],py:[10,4],pz:[1,2],nx:[22,4],ny:[0,2],nz:[0,-1]},{size:2,px:[11,3],py:[3,1],pz:[0,2],nx:[8,0],ny:[4,0],nz:[1,-1]},{size:2,px:[5,21],py:[11,22],pz:[0,-1],nx:[10,11],ny:[11,9],nz:[0,0]},{size:2,px:[5,5],py:[0,1],pz:[2,2],nx:[2,21],ny:[6,14],nz:[0,-1]},{size:3,px:[10,10,1],py:[11,0,5],pz:[0,-1,-1],nx:[6,12,5],ny:[2,5,2],nz:[1,0,1]},{size:2,px:[9,10],py:[5,6],pz:[0,0],nx:[12,19],ny:[23,5],nz:[0,-1]},{size:2,px:[11,5],py:[9,6],pz:[0,1],nx:[21,0],ny:[23,0],nz:[0,-1]},{size:2,px:[13,12],py:[19,15],pz:[0,0],nx:[13,0],ny:[17,0],nz:[0,-1]},{size:2,px:[14,0],py:[17,3],pz:[0,-1],nx:[7,16],ny:[8,19],nz:[1,0]},{size:2,px:[3,6],py:[2,4],pz:[2,1],nx:[8,1],ny:[4,4],nz:[1,-1]},{size:2,px:[13,10],py:[23,20],pz:[0,-1],nx:[4,7],ny:[5,10],nz:[2,1]},{size:2,px:[16,9],py:[22,5],pz:[0,-1],nx:[4,2],ny:[10,3],nz:[1,2]},{size:4,px:[3,1,1,5],py:[4,2,1,2],pz:[0,2,2,1],nx:[13,5,8,0],ny:[22,2,9,2],nz:[0,-1,-1,-1]},{size:2,px:[9,9],py:[0,0],pz:[1,-1],nx:[19,20],ny:[1,2],nz:[0,0]},{size:2,px:[7,22],py:[6,8],pz:[1,0],nx:[4,4],ny:[2,4],nz:[2,-1]},{size:2,px:[3,6],py:[4,4],pz:[2,1],nx:[10,20],ny:[10,6],nz:[0,-1]},{size:2,px:[6,12],py:[6,15],pz:[1,-1],nx:[0,0],ny:[2,5],nz:[2,1]},{size:2,px:[2,7],py:[4,10],pz:[2,-1],nx:[3,6],ny:[4,8],nz:[2,1]},{size:3,px:[11,11,4],py:[0,5,7],pz:[1,-1,-1],nx:[6,12,12],ny:[1,1,2],nz:[1,0,0]},{size:2,px:[11,17],py:[4,18],pz:[0,-1],nx:[8,2],ny:[10,2],nz:[0,2]},{size:2,px:[17,17],py:[10,18],pz:[0,-1],nx:[8,8],ny:[2,3],nz:[1,1]},{size:2,px:[9,9],py:[7,7],pz:[1,-1],nx:[7,4],ny:[6,3],nz:[1,2]},{size:2,px:[18,21],py:[0,0],pz:[0,-1],nx:[11,6],ny:[5,3],nz:[0,1]},{size:2,px:[5,2],py:[8,4],pz:[0,2],nx:[5,8],ny:[9,16],nz:[0,-1]},{size:2,px:[12,2],py:[5,4],pz:[0,-1],nx:[4,15],ny:[4,8],nz:[1,0]},{size:2,px:[1,1],py:[4,6],pz:[1,1],nx:[11,3],ny:[7,9],nz:[0,-1]},{size:2,px:[2,1],py:[3,3],pz:[2,2],nx:[2,2],ny:[15,16],nz:[0,0]},{size:2,px:[17,18],py:[5,5],pz:[0,0],nx:[9,21],ny:[2,10],nz:[1,-1]},{size:2,px:[6,3],py:[14,7],pz:[0,1],nx:[3,4],ny:[4,5],nz:[1,-1]},{size:2,px:[0,3],py:[3,1],pz:[1,-1],nx:[19,10],ny:[12,4],nz:[0,1]},{size:2,px:[6,16],py:[3,8],pz:[1,0],nx:[8,10],ny:[20,4],nz:[0,-1]},{size:3,px:[5,5,2],py:[21,8,4],pz:[0,1,2],nx:[10,6,3],ny:[15,2,1],nz:[0,-1,-1]},{size:2,px:[11,10],py:[10,12],pz:[0,0],nx:[11,11],ny:[2,1],nz:[1,-1]},{size:2,px:[10,10],py:[3,2],pz:[1,1],nx:[8,11],ny:[3,5],nz:[1,-1]},{size:2,px:[13,3],py:[5,8],pz:[0,-1],nx:[12,3],ny:[3,1],nz:[0,2]},{size:2,px:[13,7],py:[2,1],pz:[0,1],nx:[5,5],ny:[1,1],nz:[0,-1]},{size:2,px:[11,10],py:[10,8],pz:[0,-1],nx:[14,16],ny:[10,15],nz:[0,0]},{size:2,px:[2,10],py:[7,8],pz:[1,-1],nx:[2,6],ny:[5,6],nz:[2,1]},{size:2,px:[10,10],py:[1,8],pz:[0,-1],nx:[2,2],ny:[3,2],nz:[2,2]},{size:2,px:[4,0],py:[5,2],pz:[1,-1],nx:[1,2],ny:[2,3],nz:[2,1]},{size:2,px:[1,12],py:[1,9],pz:[2,-1],nx:[16,17],ny:[3,3],nz:[0,0]},{size:2,px:[12,6],py:[5,8],pz:[0,-1],nx:[3,4],ny:[7,4],nz:[1,1]},{size:2,px:[14,3],py:[11,5],pz:[0,-1],nx:[11,4],ny:[0,0],nz:[0,1]},{size:2,px:[6,10],py:[6,6],pz:[1,-1],nx:[0,0],ny:[1,0],nz:[2,2]},{size:2,px:[3,7],py:[0,7],pz:[1,-1],nx:[15,13],ny:[8,4],nz:[0,0]},{size:2,px:[18,1],py:[15,0],pz:[0,-1],nx:[18,18],ny:[18,17],nz:[0,0]},{size:2,px:[5,2],py:[4,4],pz:[0,-1],nx:[4,18],ny:[4,15],nz:[1,0]},{size:3,px:[3,14,13],py:[2,7,8],pz:[2,0,0],nx:[10,0,2],ny:[8,3,2],nz:[0,-1,-1]},{size:2,px:[16,0],py:[14,3],pz:[0,-1],nx:[18,3],ny:[12,5],nz:[0,2]},{size:2,px:[5,3],py:[8,3],pz:[1,2],nx:[13,4],ny:[10,4],nz:[0,-1]},{size:2,px:[3,6],py:[1,2],pz:[2,1],nx:[8,1],ny:[4,20],nz:[1,-1]},{size:2,px:[10,10],py:[8,3],pz:[1,-1],nx:[12,7],ny:[2,1],nz:[0,1]},{size:2,px:[17,3],py:[9,2],pz:[0,2],nx:[7,6],ny:[4,0],nz:[1,-1]},{size:2,px:[12,1],py:[2,1],pz:[0,-1],nx:[4,4],ny:[2,3],nz:[2,2]},{size:2,px:[22,5],py:[15,3],pz:[0,2],nx:[16,17],ny:[14,2],nz:[0,-1]},{size:2,px:[8,11],py:[19,13],pz:[0,-1],nx:[0,0],ny:[2,4],nz:[2,1]},{size:2,px:[8,11],py:[8,1],pz:[1,-1],nx:[3,3],ny:[2,5],nz:[1,2]},{size:3,px:[3,8,0],py:[7,7,5],pz:[1,-1,-1],nx:[11,5,1],ny:[11,7,5],nz:[0,1,1]},{size:2,px:[12,6],py:[12,6],pz:[0,1],nx:[9,0],ny:[4,2],nz:[1,-1]},{size:2,px:[16,12],py:[7,1],pz:[0,-1],nx:[16,7],ny:[6,4],nz:[0,1]},{size:2,px:[13,5],py:[14,0],pz:[0,-1],nx:[13,10],ny:[0,0],nz:[0,0]},{size:5,px:[11,12,13,12,7],py:[0,1,0,0,0],pz:[0,0,0,0,1],nx:[13,16,14,4,4],ny:[18,23,18,5,5],nz:[0,0,0,2,-1]},{size:2,px:[14,5],py:[12,4],pz:[0,-1],nx:[7,7],ny:[8,2],nz:[1,1]},{size:2,px:[19,3],py:[2,5],pz:[0,-1],nx:[11,23],ny:[7,13],nz:[1,0]},{size:2,px:[0,0],py:[19,20],pz:[0,0],nx:[9,4],ny:[5,2],nz:[0,-1]},{size:2,px:[15,4],py:[12,3],pz:[0,2],nx:[9,5],ny:[4,5],nz:[1,-1]},{size:4,px:[8,0,1,21],py:[6,0,7,16],pz:[1,-1,-1,-1],nx:[11,6,11,5],ny:[8,6,4,3],nz:[1,1,1,2]},{size:2,px:[11,11],py:[7,5],pz:[0,-1],nx:[9,10],ny:[6,7],nz:[0,0]},{size:2,px:[2,4],py:[1,2],pz:[2,1],nx:[16,6],ny:[0,1],nz:[0,-1]},{size:2,px:[0,0],py:[5,3],pz:[1,2],nx:[1,21],ny:[23,8],nz:[0,-1]},{size:2,px:[10,0],py:[7,0],pz:[0,-1],nx:[4,13],ny:[4,10],nz:[1,0]},{size:2,px:[11,4],py:[0,4],pz:[1,-1],nx:[4,2],ny:[16,8],nz:[0,1]},{size:2,px:[5,3],py:[12,6],pz:[0,1],nx:[3,3],ny:[4,2],nz:[1,-1]},{size:2,px:[10,0],py:[19,11],pz:[0,-1],nx:[9,5],ny:[21,9],nz:[0,1]},{size:2,px:[0,0],py:[17,9],pz:[0,1],nx:[0,5],ny:[0,9],nz:[2,-1]},{size:2,px:[4,5],py:[2,4],pz:[0,-1],nx:[4,4],ny:[5,6],nz:[1,1]},{size:2,px:[8,4],py:[1,0],pz:[1,2],nx:[4,3],ny:[3,6],nz:[0,-1]},{size:2,px:[11,0],py:[7,2],pz:[1,-1],nx:[5,5],ny:[1,0],nz:[2,2]},{size:2,px:[13,0],py:[17,2],pz:[0,-1],nx:[3,6],ny:[5,8],nz:[2,1]},{size:2,px:[2,1],py:[0,5],pz:[2,-1],nx:[4,9],ny:[2,7],nz:[2,1]},{size:2,px:[12,5],py:[13,8],pz:[0,-1],nx:[23,11],ny:[13,7],nz:[0,1]},{size:2,px:[0,0],py:[0,2],pz:[1,0],nx:[3,6],ny:[11,18],nz:[0,-1]},{size:2,px:[4,3],py:[6,5],pz:[0,-1],nx:[1,1],ny:[1,3],nz:[2,1]},{size:4,px:[3,6,3,6],py:[3,6,2,5],pz:[2,1,2,1],nx:[0,4,1,1],ny:[0,22,17,0],nz:[0,-1,-1,-1]},{size:2,px:[8,4],py:[6,3],pz:[1,2],nx:[9,15],ny:[4,8],nz:[1,-1]},{size:2,px:[8,18],py:[7,8],pz:[1,0],nx:[8,5],ny:[4,0],nz:[1,-1]},{size:2,px:[0,0],py:[4,5],pz:[1,-1],nx:[5,6],ny:[0,0],nz:[1,1]},{size:2,px:[13,18],py:[23,19],pz:[0,0],nx:[7,13],ny:[10,20],nz:[1,-1]},{size:2,px:[10,6],py:[2,0],pz:[0,1],nx:[4,1],ny:[5,1],nz:[1,-1]},{size:2,px:[1,1],py:[5,4],pz:[2,2],nx:[0,20],ny:[4,4],nz:[2,-1]},{size:2,px:[5,5],py:[1,0],pz:[2,2],nx:[12,6],ny:[18,11],nz:[0,-1]},{size:5,px:[2,1,3,1,5],py:[3,3,7,4,9],pz:[2,2,1,2,1],nx:[9,3,8,16,10],ny:[5,3,10,6,7],nz:[1,-1,-1,-1,-1]},{size:2,px:[4,1],py:[12,3],pz:[0,-1],nx:[10,1],ny:[11,2],nz:[0,2]},{size:2,px:[19,0],py:[10,7],pz:[0,-1],nx:[14,7],ny:[6,3],nz:[0,1]},{size:2,px:[7,4],py:[2,1],pz:[1,2],nx:[6,0],ny:[2,18],nz:[0,-1]},{size:2,px:[14,8],py:[3,0],pz:[0,1],nx:[17,1],ny:[1,4],nz:[0,-1]},{size:2,px:[18,19],py:[1,17],pz:[0,-1],nx:[5,11],ny:[2,5],nz:[2,1]},{size:5,px:[12,12,12,6,12],py:[10,11,12,6,9],pz:[0,0,0,1,0],nx:[13,3,12,6,6],ny:[4,1,4,2,2],nz:[0,2,0,1,-1]},{size:2,px:[11,10],py:[3,3],pz:[0,0],nx:[4,9],ny:[4,17],nz:[1,-1]},{size:2,px:[11,0],py:[13,5],pz:[0,2],nx:[8,18],ny:[15,15],nz:[0,-1]},{size:2,px:[3,4],py:[6,5],pz:[1,1],nx:[0,0],ny:[9,4],nz:[1,-1]},{size:2,px:[0,0],py:[1,0],pz:[2,2],nx:[2,15],ny:[2,1],nz:[2,-1]},{size:3,px:[2,4,2],py:[4,9,5],pz:[2,1,2],nx:[2,5,14],ny:[0,1,4],nz:[0,-1,-1]},{size:2,px:[11,12],py:[20,20],pz:[0,0],nx:[6,10],ny:[9,19],nz:[1,-1]},{size:2,px:[7,0],py:[16,8],pz:[0,-1],nx:[2,3],ny:[2,4],nz:[2,1]},{size:5,px:[16,17,15,16,15],py:[1,1,1,0,0],pz:[0,0,0,0,0],nx:[8,8,4,12,12],ny:[8,7,2,23,23],nz:[1,1,2,0,-1]},{size:2,px:[2,4],py:[6,12],pz:[1,-1],nx:[8,13],ny:[1,1],nz:[1,0]},{size:2,px:[9,2],py:[3,2],pz:[0,-1],nx:[3,4],ny:[6,5],nz:[1,1]},{size:2,px:[10,8],py:[6,1],pz:[1,-1],nx:[11,8],ny:[2,2],nz:[0,0]},{size:2,px:[9,3],py:[7,0],pz:[1,-1],nx:[19,19],ny:[18,16],nz:[0,0]},{size:2,px:[3,2],py:[1,1],pz:[2,2],nx:[22,11],ny:[4,0],nz:[0,-1]},{size:2,px:[10,10],py:[9,8],pz:[1,1],nx:[4,4],ny:[10,2],nz:[1,-1]},{size:2,px:[0,1],py:[0,5],pz:[0,-1],nx:[10,8],ny:[2,2],nz:[0,0]},{size:2,px:[3,3],py:[8,7],pz:[1,1],nx:[8,2],ny:[8,3],nz:[0,-1]},{size:2,px:[13,5],py:[21,3],pz:[0,-1],nx:[13,3],ny:[20,5],nz:[0,2]},{size:2,px:[12,5],py:[11,2],pz:[0,-1],nx:[1,0],ny:[19,9],nz:[0,1]},{size:2,px:[7,10],py:[9,10],pz:[1,1],nx:[8,4],ny:[10,2],nz:[1,-1]},{size:2,px:[0,0],py:[5,9],pz:[2,1],nx:[2,11],ny:[9,19],nz:[1,-1]},{size:2,px:[3,5],py:[1,2],pz:[2,1],nx:[8,23],ny:[4,9],nz:[1,-1]},{size:2,px:[3,4],py:[2,4],pz:[2,1],nx:[5,9],ny:[2,5],nz:[2,-1]},{size:2,px:[11,11],py:[2,3],pz:[1,1],nx:[19,9],ny:[6,5],nz:[0,-1]},{size:2,px:[9,4],py:[5,10],pz:[1,-1],nx:[10,22],ny:[0,16],nz:[1,0]},{size:3,px:[19,9,19],py:[3,1,2],pz:[0,1,0],nx:[6,3,6],ny:[10,3,0],nz:[1,-1,-1]},{size:2,px:[8,3],py:[10,3],pz:[1,2],nx:[23,14],ny:[3,18],nz:[0,-1]},{size:2,px:[11,11],py:[19,0],pz:[0,-1],nx:[4,16],ny:[4,11],nz:[1,0]},{size:2,px:[22,23],py:[3,22],pz:[0,-1],nx:[9,3],ny:[4,2],nz:[1,2]},{size:2,px:[7,2],py:[12,4],pz:[0,-1],nx:[8,4],ny:[10,5],nz:[0,1]},{size:2,px:[12,13],py:[5,13],pz:[0,-1],nx:[11,3],ny:[2,0],nz:[0,2]},{size:2,px:[3,17],py:[0,16],pz:[1,-1],nx:[12,12],ny:[5,6],nz:[0,0]},{size:2,px:[4,3],py:[1,0],pz:[2,2],nx:[4,3],ny:[0,3],nz:[0,-1]},{size:2,px:[10,3],py:[12,0],pz:[0,-1],nx:[12,12],ny:[13,12],nz:[0,0]},{size:2,px:[13,4],py:[11,14],pz:[0,-1],nx:[0,0],ny:[4,6],nz:[1,0]},{size:2,px:[8,7],py:[7,8],pz:[1,1],nx:[3,0],ny:[5,21],nz:[2,-1]},{size:2,px:[1,3],py:[4,14],pz:[2,0],nx:[8,8],ny:[7,7],nz:[1,-1]},{size:2,px:[13,11],py:[20,7],pz:[0,-1],nx:[21,21],ny:[20,18],nz:[0,0]},{size:2,px:[2,1],py:[11,0],pz:[0,-1],nx:[2,2],ny:[15,14],nz:[0,0]},{size:2,px:[10,1],py:[8,0],pz:[1,-1],nx:[8,4],ny:[7,4],nz:[1,2]},{size:2,px:[17,6],py:[13,1],pz:[0,-1],nx:[4,8],ny:[2,4],nz:[2,1]},{size:2,px:[7,15],py:[1,3],pz:[1,0],nx:[15,5],ny:[1,8],nz:[0,-1]},{size:2,px:[16,1],py:[20,10],pz:[0,-1],nx:[6,8],ny:[11,10],nz:[1,1]},{size:2,px:[7,14],py:[0,0],pz:[1,0],nx:[7,8],ny:[7,3],nz:[1,-1]},{size:2,px:[12,5],py:[17,4],pz:[0,-1],nx:[12,5],ny:[16,10],nz:[0,1]},{size:2,px:[13,3],py:[15,0],pz:[0,-1],nx:[12,7],ny:[17,8],nz:[0,1]},{size:2,px:[7,1],py:[14,1],pz:[0,-1],nx:[4,6],ny:[6,12],nz:[1,0]},{size:2,px:[8,7],py:[0,0],pz:[0,0],nx:[6,20],ny:[5,5],nz:[0,-1]},{size:2,px:[10,2],py:[22,5],pz:[0,-1],nx:[4,8],ny:[4,9],nz:[2,1]},{size:4,px:[8,2,2,9],py:[6,5,3,11],pz:[1,-1,-1,-1],nx:[2,7,4,3],ny:[2,1,0,2],nz:[2,0,1,2]},{size:2,px:[12,6],py:[12,6],pz:[0,1],nx:[8,2],ny:[4,1],nz:[1,-1]},{size:2,px:[13,11],py:[19,8],pz:[0,-1],nx:[13,13],ny:[20,17],nz:[0,0]},{size:2,px:[11,19],py:[5,14],pz:[0,-1],nx:[3,4],ny:[8,4],nz:[1,1]},{size:2,px:[10,0],py:[8,6],pz:[1,-1],nx:[21,21],ny:[16,15],nz:[0,0]},{size:2,px:[1,12],py:[7,6],pz:[1,-1],nx:[2,7],ny:[5,14],nz:[2,0]},{size:2,px:[2,9],py:[7,5],pz:[1,-1],nx:[2,5],ny:[5,9],nz:[2,1]},{size:2,px:[12,5],py:[15,6],pz:[0,-1],nx:[3,12],ny:[0,2],nz:[2,0]},{size:2,px:[23,22],py:[23,1],pz:[0,-1],nx:[0,0],ny:[2,3],nz:[2,2]},{size:2,px:[3,6],py:[1,2],pz:[2,1],nx:[8,0],ny:[4,3],nz:[1,-1]},{size:2,px:[5,1],py:[9,1],pz:[0,-1],nx:[4,2],ny:[4,2],nz:[1,2]},{size:2,px:[0,1],py:[0,0],pz:[2,0],nx:[2,3],ny:[9,10],nz:[0,-1]},{size:2,px:[6,0],py:[16,14],pz:[0,-1],nx:[6,3],ny:[23,14],nz:[0,0]},{size:2,px:[3,3],py:[2,3],pz:[2,1],nx:[13,3],ny:[19,14],nz:[0,-1]},{size:2,px:[11,5],py:[8,18],pz:[0,-1],nx:[4,7],ny:[1,2],nz:[2,1]},{size:2,px:[4,4],py:[5,6],pz:[1,1],nx:[2,2],ny:[5,3],nz:[2,-1]},{size:2,px:[7,3],py:[13,7],pz:[0,1],nx:[4,3],ny:[4,1],nz:[1,-1]},{size:2,px:[0,0],py:[5,6],pz:[1,0],nx:[2,1],ny:[5,1],nz:[1,-1]},{size:2,px:[7,14],py:[3,5],pz:[1,0],nx:[5,0],ny:[16,7],nz:[0,-1]},{size:2,px:[11,2],py:[18,5],pz:[0,2],nx:[11,4],ny:[16,4],nz:[0,-1]},{size:2,px:[6,16],py:[19,20],pz:[0,-1],nx:[3,2],ny:[10,5],nz:[1,2]},{size:2,px:[5,3],py:[3,1],pz:[0,1],nx:[1,3],ny:[4,8],nz:[0,-1]},{size:2,px:[12,6],py:[13,6],pz:[0,1],nx:[10,1],ny:[12,2],nz:[0,-1]},{size:2,px:[8,3],py:[6,2],pz:[1,-1],nx:[4,8],ny:[2,4],nz:[2,1]},{size:2,px:[9,3],py:[21,2],pz:[0,-1],nx:[8,4],ny:[1,0],nz:[1,2]},{size:2,px:[8,4],py:[1,0],pz:[1,-1],nx:[8,6],ny:[4,2],nz:[1,1]},{size:2,px:[2,7],py:[1,6],pz:[2,-1],nx:[7,9],ny:[6,4],nz:[1,1]},{size:2,px:[6,3],py:[8,3],pz:[1,2],nx:[10,5],ny:[19,11],nz:[0,-1]},{size:2,px:[2,2],py:[3,4],pz:[2,2],nx:[3,6],ny:[4,6],nz:[1,-1]},{size:2,px:[3,11],py:[5,20],pz:[2,0],nx:[11,5],ny:[21,8],nz:[0,-1]},{size:3,px:[5,9,5],py:[4,7,5],pz:[2,0,2],nx:[23,10,4],ny:[23,3,22],nz:[0,-1,-1]},{size:4,px:[11,9,7,1],py:[13,8,11,10],pz:[0,-1,-1,-1],nx:[8,2,11,12],ny:[4,2,4,4],nz:[1,2,0,0]},{size:2,px:[0,0],py:[7,6],pz:[1,1],nx:[0,4],ny:[1,0],nz:[2,-1]},{size:2,px:[19,20],py:[0,1],pz:[0,0],nx:[21,1],ny:[0,2],nz:[0,-1]},{size:2,px:[8,5],py:[11,0],pz:[0,-1],nx:[11,0],ny:[12,1],nz:[0,2]},{size:2,px:[11,11],py:[1,1],pz:[0,-1],nx:[4,7],ny:[5,4],nz:[1,1]},{size:2,px:[5,12],py:[4,23],pz:[2,-1],nx:[13,15],ny:[5,4],nz:[0,0]},{size:2,px:[12,20],py:[4,16],pz:[0,-1],nx:[9,4],ny:[2,1],nz:[0,1]},{size:2,px:[12,13],py:[2,2],pz:[0,0],nx:[4,16],ny:[2,11],nz:[2,0]},{size:2,px:[19,14],py:[10,17],pz:[0,-1],nx:[3,8],ny:[0,2],nz:[2,0]},{size:2,px:[8,12],py:[1,2],pz:[1,0],nx:[19,10],ny:[3,1],nz:[0,-1]},{size:4,px:[17,2,3,10],py:[8,6,2,12],pz:[0,1,2,0],nx:[17,9,12,2],ny:[9,22,13,5],nz:[0,-1,-1,-1]},{size:2,px:[20,10],py:[15,7],pz:[0,1],nx:[13,9],ny:[7,3],nz:[0,-1]},{size:2,px:[0,0],py:[1,0],pz:[2,2],nx:[10,3],ny:[9,2],nz:[1,-1]},{size:2,px:[4,3],py:[1,0],pz:[2,2],nx:[0,22],ny:[14,6],nz:[0,-1]},{size:2,px:[16,3],py:[4,0],pz:[0,2],nx:[16,3],ny:[2,0],nz:[0,-1]},{size:2,px:[8,16],py:[6,12],pz:[1,0],nx:[8,12],ny:[4,7],nz:[1,-1]},{size:2,px:[5,11],py:[0,5],pz:[2,1],nx:[10,1],ny:[5,5],nz:[1,-1]},{size:2,px:[7,4],py:[5,5],pz:[0,-1],nx:[3,6],ny:[2,3],nz:[1,0]},{size:2,px:[11,11],py:[11,12],pz:[0,0],nx:[23,7],ny:[20,2],nz:[0,-1]},{size:2,px:[16,8],py:[12,5],pz:[0,1],nx:[8,2],ny:[2,1],nz:[1,-1]},{size:3,px:[6,11,11],py:[11,23,20],pz:[1,0,0],nx:[11,3,22],ny:[21,3,16],nz:[0,-1,-1]},{size:2,px:[17,15],py:[3,2],pz:[0,-1],nx:[4,4],ny:[3,2],nz:[2,2]},{size:2,px:[21,21],py:[11,10],pz:[0,0],nx:[11,3],ny:[6,2],nz:[1,-1]},{size:2,px:[23,21],py:[22,10],pz:[0,-1],nx:[20,10],ny:[18,10],nz:[0,1]},{size:2,px:[4,2],py:[6,3],pz:[1,2],nx:[3,2],ny:[4,3],nz:[1,-1]},{size:2,px:[16,0],py:[18,11],pz:[0,-1],nx:[8,7],ny:[4,4],nz:[0,0]},{size:2,px:[6,21],py:[3,16],pz:[0,-1],nx:[1,8],ny:[2,14],nz:[2,0]},{size:2,px:[8,1],py:[3,0],pz:[0,-1],nx:[11,11],ny:[2,1],nz:[0,0]},{size:3,px:[11,11,11],py:[9,10,8],pz:[1,1,1],nx:[23,1,0],ny:[23,9,11],nz:[0,-1,-1]},{size:2,px:[6,3],py:[2,1],pz:[1,2],nx:[7,1],ny:[8,2],nz:[0,-1]},{size:2,px:[10,17],py:[17,19],pz:[0,-1],nx:[10,4],ny:[16,9],nz:[0,1]},{size:2,px:[3,6],py:[7,1],pz:[1,-1],nx:[11,0],ny:[11,8],nz:[0,1]},{size:2,px:[10,5],py:[11,4],pz:[1,2],nx:[5,5],ny:[0,0],nz:[2,-1]},{size:2,px:[3,6],py:[3,6],pz:[2,1],nx:[8,0],ny:[4,16],nz:[1,-1]},{size:2,px:[14,1],py:[20,2],pz:[0,-1],nx:[7,7],ny:[11,9],nz:[1,1]},{size:3,px:[11,13,4],py:[16,21,3],pz:[0,0,2],nx:[14,16,5],ny:[20,14,9],nz:[0,-1,-1]},{size:2,px:[7,0],py:[1,1],pz:[1,-1],nx:[4,7],ny:[2,4],nz:[2,1]},{size:2,px:[23,11],py:[9,4],pz:[0,1],nx:[11,3],ny:[1,3],nz:[0,-1]},{size:2,px:[11,13],py:[23,23],pz:[0,0],nx:[13,13],ny:[20,20],nz:[0,-1]},{size:2,px:[10,8],py:[5,11],pz:[0,-1],nx:[20,19],ny:[18,20],nz:[0,0]},{size:2,px:[19,5],py:[22,4],pz:[0,-1],nx:[2,9],ny:[3,17],nz:[1,0]},{size:2,px:[15,2],py:[13,7],pz:[0,-1],nx:[8,4],ny:[4,2],nz:[1,2]},{size:2,px:[14,13],py:[17,2],pz:[0,-1],nx:[15,13],ny:[19,15],nz:[0,0]},{size:2,px:[12,23],py:[8,22],pz:[0,-1],nx:[7,10],ny:[5,9],nz:[1,0]},{size:2,px:[2,6],py:[21,10],pz:[0,-1],nx:[3,4],ny:[3,3],nz:[1,1]},{size:2,px:[15,11],py:[5,0],pz:[0,-1],nx:[3,4],ny:[17,16],nz:[0,0]},{size:2,px:[3,1],py:[18,8],pz:[0,1],nx:[14,4],ny:[17,7],nz:[0,-1]},{size:2,px:[15,3],py:[18,3],pz:[0,2],nx:[1,22],ny:[0,1],nz:[0,-1]},{size:2,px:[13,3],py:[9,3],pz:[0,-1],nx:[0,1],ny:[9,20],nz:[1,0]},{size:2,px:[1,1],py:[1,0],pz:[2,2],nx:[9,23],ny:[10,12],nz:[1,-1]},{size:4,px:[9,0,9,1],py:[8,0,0,10],pz:[1,-1,-1,-1],nx:[23,7,5,23],ny:[20,7,5,19],nz:[0,1,2,0]},{size:2,px:[18,18],py:[12,12],pz:[0,-1],nx:[8,4],ny:[4,2],nz:[1,2]},{size:3,px:[0,4,1],py:[3,5,3],pz:[1,-1,-1],nx:[16,11,8],ny:[8,5,6],nz:[0,0,0]},{size:5,px:[9,10,14,11,11],py:[0,0,0,0,0],pz:[0,0,0,0,-1],nx:[8,3,4,6,2],ny:[22,9,5,4,0],nz:[0,1,0,0,2]},{size:2,px:[6,5],py:[2,2],pz:[1,1],nx:[7,3],ny:[8,7],nz:[0,-1]},{size:2,px:[11,5],py:[15,2],pz:[0,-1],nx:[3,10],ny:[0,1],nz:[2,0]},{size:2,px:[0,11],py:[11,12],pz:[1,-1],nx:[22,22],ny:[14,13],nz:[0,0]},{size:2,px:[2,2],py:[15,14],pz:[0,0],nx:[1,2],ny:[11,8],nz:[1,-1]},{size:2,px:[11,6],py:[0,7],pz:[1,-1],nx:[19,5],ny:[3,0],nz:[0,2]},{size:2,px:[2,3],py:[3,7],pz:[2,1],nx:[1,5],ny:[5,0],nz:[1,-1]},{size:2,px:[10,14],py:[4,5],pz:[0,-1],nx:[4,18],ny:[2,12],nz:[2,0]},{size:2,px:[19,10],py:[12,2],pz:[0,-1],nx:[13,4],ny:[10,2],nz:[0,2]},{size:2,px:[6,1],py:[21,6],pz:[0,-1],nx:[6,5],ny:[0,0],nz:[1,1]}],alpha:[-1.044179,1.044179,-.6003138,.6003138,-.4091282,.4091282,-.4590148,.4590148,-.4294004,.4294004,-.3360846,.3360846,-.3054186,.3054186,-.2901743,.2901743,-.3522417,.3522417,-.3195838,.3195838,-.2957309,.2957309,-.2876727,.2876727,-.263746,.263746,-.26079,.26079,-.2455714,.2455714,-.2749847,.2749847,-.2314217,.2314217,-.2540871,.2540871,-.2143416,.2143416,-.2565697,.2565697,-.1901272,.1901272,-.2259981,.2259981,-.2012333,.2012333,-.244846,.244846,-.2192845,.2192845,-.2005951,.2005951,-.2259,.2259,-.1955758,.1955758,-.2235332,.2235332,-.170449,.170449,-.1584628,.1584628,-.216771,.216771,-.1592909,.1592909,-.1967292,.1967292,-.1432268,.1432268,-.2039949,.2039949,-.1404068,.1404068,-.1788201,.1788201,-.1498714,.1498714,-.1282541,.1282541,-.1630182,.1630182,-.1398111,.1398111,-.1464143,.1464143,-.1281712,.1281712,-.1417014,.1417014,-.1779164,.1779164,-.2067174,.2067174,-.1344947,.1344947,-.1357351,.1357351,-.1683191,.1683191,-.1821768,.1821768,-.2158307,.2158307,-.1812857,.1812857,-.1635445,.1635445,-.1474934,.1474934,-.1771993,.1771993,-.151762,.151762,-.1283184,.1283184,-.1862675,.1862675,-.1420491,.1420491,-.1232165,.1232165,-.1472696,.1472696,-.1192156,.1192156,-.1602034,.1602034,-.1321473,.1321473,-.1358101,.1358101,-.1295821,.1295821,-.1289102,.1289102,-.123252,.123252,-.1332227,.1332227,-.1358887,.1358887,-.1179559,.1179559,-.1263694,.1263694,-.1444876,.1444876,-.1933141,.1933141,-.1917886,.1917886,-.119976,.119976,-.1359937,.1359937,-.1690073,.1690073,-.1894222,.1894222,-.1699422,.1699422,-.1340361,.1340361,-.1840622,.1840622,-.1277397,.1277397,-.138161,.138161,-.1282241,.1282241,-.1211334,.1211334,-.1264628,.1264628,-.137301,.137301,-.1363356,.1363356,-.1562568,.1562568,-.1268735,.1268735,-.1037859,.1037859,-.1394322,.1394322,-.1449225,.1449225,-.1109657,.1109657,-.1086931,.1086931,-.1379135,.1379135,-.1881974,.1881974,-.1304956,.1304956,-.09921777,.09921777,-.1398624,.1398624,-.1216469,.1216469,-.1272741,.1272741,-.1878236,.1878236,-.1336894,.1336894,-.1256289,.1256289,-.1247231,.1247231,-.18534,.18534,-.1087805,.1087805,-.1205676,.1205676,-.1023182,.1023182,-.1268422,.1268422,-.14229,.14229,-.1098174,.1098174,-.1317018,.1317018,-.1378142,.1378142,-.127455,.127455,-.1142944,.1142944,-.1713488,.1713488,-.1103035,.1103035,-.1045221,.1045221,-.1293015,.1293015,-.09763183,.09763183,-.1387213,.1387213,-.09031167,.09031167,-.1283052,.1283052,-.1133462,.1133462,-.09370681,.09370681,-.1079269,.1079269,-.1331913,.1331913,-.08969902,.08969902,-.104456,.104456,-.09387466,.09387466,-.1208988,.1208988,-.1252011,.1252011,-.1401277,.1401277,-.1461381,.1461381,-.1323763,.1323763,-.09923889,.09923889,-.1142899,.1142899,-.09110853,.09110853,-.1106607,.1106607,-.125314,.125314,-.09657895,.09657895,-.103001,.103001,-.1348857,.1348857,-.1237793,.1237793,-.1296943,.1296943,-.1323385,.1323385,-.08331554,.08331554,-.08417589,.08417589,-.1104431,.1104431,-.117071,.117071,-.1391725,.1391725,-.1485189,.1485189,-.1840393,.1840393,-.123825,.123825,-.1095287,.1095287,-.1177869,.1177869,-.1036409,.1036409,-.09802581,.09802581,-.09364054,.09364054,-.09936022,.09936022,-.1117201,.1117201,-.10813,.10813,-.1331861,.1331861,-.1192122,.1192122,-.09889761,.09889761,-.1173456,.1173456,-.1032917,.1032917,-.09268551,.09268551,-.1178563,.1178563,-.1215065,.1215065,-.1060437,.1060437,-.1010044,.1010044,-.1021683,.1021683,-.09974968,.09974968,-.1161528,.1161528,-.08686721,.08686721,-.08145259,.08145259,-.0993706,.0993706,-.1170885,.1170885,-.07693779,.07693779,-.09047233,.09047233,-.09168442,.09168442,-.1054105,.1054105,-.09036177,.09036177,-.1251949,.1251949,-.09523847,.09523847,-.103893,.103893,-.143366,.143366,-.148983,.148983,-.08393174,.08393174,-.08888026,.08888026,-.09347861,.09347861,-.1044838,.1044838,-.1102144,.1102144,-.1383415,.1383415,-.1466476,.1466476,-.1129741,.1129741,-.1310915,.1310915,-.1070648,.1070648,-.07559007,.07559007,-.08812082,.08812082,-.1234272,.1234272,-.1088022,.1088022,-.08388703,.08388703,-.07179593,.07179593,-.1008961,.1008961,-.0903007,.0903007,-.08581345,.08581345,-.09023431,.09023431,-.09807321,.09807321,-.09621402,.09621402,-.1730195,.1730195,-.08984631,.08984631,-.09556661,.09556661,-.1047576,.1047576,-.07854313,.07854313,-.08682118,.08682118,-.1159761,.1159761,-.133954,.133954,-.1003048,.1003048,-.09747544,.09747544,-.09501058,.09501058,-.1321566,.1321566,-.09194706,.09194706,-.09359276,.09359276,-.1015916,.1015916,-.1174192,.1174192,-.1039931,.1039931,-.09746733,.09746733,-.128612,.128612,-.1044899,.1044899,-.1066385,.1066385,-.08368626,.08368626,-.1271919,.1271919,-.1055946,.1055946,-.08272876,.08272876,-.1370564,.1370564,-.08539379,.08539379,-.1100343,.1100343,-.0810217,.0810217,-.1028728,.1028728,-.1305065,.1305065,-.1059506,.1059506,-.1264646,.1264646,-.08383843,.08383843,-.09357698,.09357698,-.074744,.074744,-.07814045,.07814045,-.0860097,.0860097,-.120609,.120609,-.09986512,.09986512,-.08516476,.08516476,-.07198783,.07198783,-.07838409,.07838409,-.1005142,.1005142,-.09951857,.09951857,-.07253998,.07253998,-.09913739,.09913739,-.0750036,.0750036,-.0925809,.0925809,-.1400287,.1400287,-.1044404,.1044404,-.07404339,.07404339,-.07256833,.07256833,-.1006995,.1006995,-.1426043,.1426043,-.1036529,.1036529,-.1208443,.1208443,-.1074245,.1074245,-.1141448,.1141448,-.1015809,.1015809,-.1028822,.1028822,-.1055682,.1055682,-.09468699,.09468699,-.1010098,.1010098,-.1205054,.1205054,-.08392956,.08392956,-.08052297,.08052297,-.09576507,.09576507,-.09515692,.09515692,-.1564745,.1564745,-.07357238,.07357238,-.1129262,.1129262,-.1013265,.1013265,-.08760761,.08760761,-.08714771,.08714771,-.09605039,.09605039,-.09064677,.09064677,-.08243857,.08243857,-.08495858,.08495858,-.08350249,.08350249,-.07423234,.07423234,-.07930799,.07930799,-.06620023,.06620023,-.07311919,.07311919,-.1237938,.1237938,-.1086814,.1086814,-.06379798,.06379798,-.07526021,.07526021,-.08297097,.08297097,-.08186337,.08186337,-.07627362,.07627362,-.1061638,.1061638,-.08328494,.08328494,-.1040895,.1040895,-.07649056,.07649056,-.07299058,.07299058,-.09195198,.09195198,-.0799088,.0799088,-.07429346,.07429346,-.09991702,.09991702,-.09755385,.09755385,-.1344138,.1344138,-.1707917,.1707917,-.0832545,.0832545,-.08137793,.08137793,-.08308659,.08308659,-.07440414,.07440414,-.07012744,.07012744,-.08122943,.08122943,-.08845462,.08845462,-.0880345,.0880345,-.09653392,.09653392,-.08795691,.08795691,-.1119045,.1119045,-.1068308,.1068308,-.08406359,.08406359,-.1220414,.1220414,-.1024235,.1024235,-.1252897,.1252897,-.1121234,.1121234,-.0905415,.0905415,-.08974435,.08974435,-.1351578,.1351578,-.1106442,.1106442,-.08093913,.08093913,-.09800762,.09800762,-.07012823,.07012823,-.07434949,.07434949,-.08684816,.08684816,-.08916388,.08916388,-.08773159,.08773159,-.07709608,.07709608,-.07230518,.07230518,-.09662156,.09662156,-.07957632,.07957632,-.07628441,.07628441,-.08050202,.08050202,-.1290593,.1290593,-.09246182,.09246182,-.09703662,.09703662,-.07866445,.07866445,-.1064783,.1064783,-.1012339,.1012339,-.06828389,.06828389,-.1005039,.1005039,-.07559687,.07559687,-.06359878,.06359878,-.08387002,.08387002,-.07851323,.07851323,-.08878569,.08878569,-.07767654,.07767654,-.08033338,.08033338,-.09142797,.09142797,-.08590585,.08590585,-.1052318,.1052318,-.08760062,.08760062,-.09222192,.09222192,-.07548828,.07548828,-.08003344,.08003344,-.1177076,.1177076,-.1064964,.1064964,-.08655553,.08655553,-.09418112,.09418112,-.07248163,.07248163,-.07120974,.07120974,-.06393114,.06393114,-.07997487,.07997487,-.1220941,.1220941,-.09892518,.09892518,-.08270271,.08270271,-.10694,.10694,-.05860771,.05860771,-.091266,.091266,-.06212559,.06212559,-.09397538,.09397538,-.08070447,.08070447,-.08415587,.08415587,-.08564455,.08564455,-.07791811,.07791811,-.06642259,.06642259,-.08266167,.08266167,-.1134986,.1134986,-.1045267,.1045267,-.07122085,.07122085,-.07979415,.07979415,-.07922347,.07922347,-.09003421,.09003421,-.08796449,.08796449,-.07933279,.07933279,-.08307947,.08307947,-.08946349,.08946349,-.07643384,.07643384,-.07818534,.07818534,-.07990991,.07990991,-.09885664,.09885664,-.08071329,.08071329,-.06952112,.06952112,-.06429706,.06429706,-.06307229,.06307229,-.08100137,.08100137,-.07693623,.07693623,-.06906625,.06906625,-.07390462,.07390462,-.06487217,.06487217,-.1233681,.1233681,-.06979273,.06979273,-.08358669,.08358669,-.109542,.109542,-.08519717,.08519717,-.07599857,.07599857,-.06042816,.06042816,-.06546304,.06546304,-.1016245,.1016245,-.08308787,.08308787,-.07385708,.07385708,-.0675163,.0675163,-.09036695,.09036695,-.09371335,.09371335,-.1116088,.1116088,-.05693741,.05693741,-.06383983,.06383983,-.05389843,.05389843,-.08383191,.08383191,-.07820822,.07820822,-.07067557,.07067557,-.07971948,.07971948,-.07360668,.07360668,-.07008027,.07008027,-.08013378,.08013378,-.08331605,.08331605,-.07145702,.07145702,-.0786394,.0786394,-.06992679,.06992679,-.05716495,.05716495,-.05306006,.05306006,-.08855639,.08855639,-.07656397,.07656397,-.06939272,.06939272,-.07523742,.07523742,-.08472299,.08472299,-.08114341,.08114341,-.06795517,.06795517,-.0789013,.0789013,-.07488741,.07488741,-.09281972,.09281972,-.09325498,.09325498,-.1401587,.1401587,-.1176284,.1176284,-.08867597,.08867597,-.08124232,.08124232,-.09441235,.09441235,-.08029452,.08029452,-.08581848,.08581848,-.1029819,.1029819,-.09569118,.09569118,-.07690893,.07690893,-.09018228,.09018228,-.1049209,.1049209,-.08969413,.08969413,-.08651891,.08651891,-.08613331,.08613331,-.07120468,.07120468,-.08743959,.08743959,-.07607158,.07607158,-.1015547,.1015547,-.08090879,.08090879,-.07114079,.07114079,-.08744835,.08744835,-.06074904,.06074904,-.06919871,.06919871,-.07607774,.07607774,-.094446,.094446,-.07833429,.07833429,-.06817555,.06817555,-.0899739,.0899739,-.09845223,.09845223,-.0789418,.0789418,-.07921373,.07921373,-.07448032,.07448032,-.1178165,.1178165,-.08216686,.08216686,-.08103286,.08103286,-.0698147,.0698147,-.08709008,.08709008,-.08336259,.08336259,-.06213589,.06213589,-.07068045,.07068045,-.06915676,.06915676,-.07103416,.07103416,-.06523849,.06523849,-.0763476,.0763476,-.07263038,.07263038,-.07164396,.07164396,-.08745559,.08745559,-.06960181,.06960181,-.08500098,.08500098,-.0652326,.0652326,-.07319714,.07319714,-.06268125,.06268125,-.07083135,.07083135,-.07984517,.07984517,-.1256265,.1256265,-.1065412,.1065412,-.08524323,.08524323,-.09291364,.09291364,-.07936567,.07936567,-.08607723,.08607723,-.07583416,.07583416,-.07931928,.07931928,-.07408357,.07408357,-.1034404,.1034404,-.1012127,.1012127,-.07916689,.07916689,-.08753651,.08753651,-.06090366,.06090366,-.07500103,.07500103,-.1228709,.1228709,-.06318201,.06318201,-.0758542,.0758542,-.0708909,.0708909,-.1053542,.1053542,-.08549521,.08549521,-.07906308,.07906308,-.0633878,.0633878,-.0841791,.0841791,-.07115511,.07115511,-.07693949,.07693949,-.07446749,.07446749,-.1037929,.1037929,-.07991005,.07991005,-.07119439,.07119439,-.0707134,.0707134,-.08587362,.08587362,-.07001236,.07001236,-.07567115,.07567115,-.0711893,.0711893,-.06844895,.06844895,-.1035118,.1035118,-.08156618,.08156618,-.07449593,.07449593,-.0815436,.0815436,-.09110878,.09110878,-.06222534,.06222534,-.1033841,.1033841,-.06811687,.06811687,-.06828443,.06828443,-.05769408,.05769408,-.05917684,.05917684,-.08358868,.08358868]
        }]};try{var y=function(){"use strict";for(var n=document.getElementsByTagName("script"),p=0;p<n.length;p++)if(n[p].src.match(/(jquery\.facedetection(\.min)?\.js)|\/ccv\.js/))return n[p].src},x=y()}catch(n){}if(void 0===e){var e=function(n,p){"use strict";return e.core[p.toString()]=p().core,function(){var z,y,x,e;if(arguments.length>1)for(y=arguments[arguments.length-2],x=arguments[arguments.length-1],e=new Array(arguments.length-2),z=0;z<arguments.length-2;z++)e[z]=arguments[z];else y=arguments[0].async,x=arguments[0].worker,e=arguments[0],delete e.async,delete e.worker,e=[e];var i={shared:{}},s=p.apply(i,e);return y?function(y,t){var a=0,r=new Array(x),h=s.pre.apply(i,[x]);for(z in i.shared)"function"==typeof i.shared[z]?delete i.shared[z]:void 0!==i.shared[z].tagName&&delete i.shared[z];for(z=0;z<x;z++){var o=new Worker(n);o.onmessage=function(n){return function(p){r[n]="string"==typeof p.data?JSON.parse(p.data):p.data,a++,a==x&&y(s.post.apply(i,[r]))}}(z);var d={input:h[z],name:p.toString(),shared:i.shared,id:z,worker:e.worker_num};try{o.postMessage(d)}catch(n){o.postMessage(JSON.stringify(d))}}}:s.post.apply(i,[[s.core.apply(i,[s.pre.apply(i,[1])[0],0,1])]])}};e.core={}}var i={pre:function(n){if("img"==n.tagName.toLowerCase()){var p=document.createElement("canvas");document.body.appendChild(n),p.width=n.offsetWidth,p.style.width=n.offsetWidth.toString()+"px",p.height=n.offsetHeight,p.style.height=n.offsetHeight.toString()+"px",document.body.removeChild(n);var z=p.getContext("2d");return z.drawImage(n,0,0),p}return n},grayscale:function(n){for(var p,z,y=n.getContext("2d"),x=y.getImageData(0,0,n.width,n.height),e=x.data,i=n.width*n.height*4;i>0;)e[i-=4]=e[p=i+1]=e[z=i+2]=.3*e[i]+.59*e[p]+.11*e[z];return y.putImageData(x,0,0),n},array_group:function(n,p){var z,y,x=new Array(n.length);for(z=0;z<n.length;z++)x[z]={parent:-1,element:n[z],rank:0};for(z=0;z<n.length;z++)if(x[z].element){for(var e=z;x[e].parent!=-1;)e=x[e].parent;for(y=0;y<n.length;y++)if(z!=y&&x[y].element&&p(x[z].element,x[y].element)){for(var i=y;x[i].parent!=-1;)i=x[i].parent;if(i!=e){x[e].rank>x[i].rank?x[i].parent=e:(x[e].parent=i,x[e].rank==x[i].rank&&x[i].rank++,e=i);for(var s,t=y;x[t].parent!=-1;)s=t,t=x[t].parent,x[s].parent=e;for(t=z;x[t].parent!=-1;)s=t,t=x[t].parent,x[s].parent=e}}}var a=new Array(n.length),r=0;for(z=0;z<n.length;z++){y=-1;var h=z;if(x[h].element){for(;x[h].parent!=-1;)h=x[h].parent;x[h].rank>=0&&(x[h].rank=~r++),y=~x[h].rank}a[z]=y}return{index:a,cat:r}},detect_objects:e(x,function(n,z,y,x){function e(n){var p=this.shared.canvas,z=this.shared.interval,y=this.shared.scale,x=this.shared.next,e=this.shared.scale_upto,i=new Array(4*(e+2*x)),s=new Array(4*(e+2*x));i[0]=p,s[0]={width:i[0].width,height:i[0].height,data:i[0].getContext("2d").getImageData(0,0,i[0].width,i[0].height).data};var t;for(t=1;t<=z;t++)i[4*t]=document.createElement("canvas"),i[4*t].width=Math.floor(i[0].width/Math.pow(y,t)),i[4*t].height=Math.floor(i[0].height/Math.pow(y,t)),i[4*t].getContext("2d").drawImage(i[0],0,0,i[0].width,i[0].height,0,0,i[4*t].width,i[4*t].height),s[4*t]={width:i[4*t].width,height:i[4*t].height,data:i[4*t].getContext("2d").getImageData(0,0,i[4*t].width,i[4*t].height).data};for(t=x;t<e+2*x;t++)i[4*t]=document.createElement("canvas"),i[4*t].width=Math.floor(i[4*t-4*x].width/2),i[4*t].height=Math.floor(i[4*t-4*x].height/2),i[4*t].getContext("2d").drawImage(i[4*t-4*x],0,0,i[4*t-4*x].width,i[4*t-4*x].height,0,0,i[4*t].width,i[4*t].height),s[4*t]={width:i[4*t].width,height:i[4*t].height,data:i[4*t].getContext("2d").getImageData(0,0,i[4*t].width,i[4*t].height).data};for(t=2*x;t<e+2*x;t++)i[4*t+1]=document.createElement("canvas"),i[4*t+1].width=Math.floor(i[4*t-4*x].width/2),i[4*t+1].height=Math.floor(i[4*t-4*x].height/2),i[4*t+1].getContext("2d").drawImage(i[4*t-4*x],1,0,i[4*t-4*x].width-1,i[4*t-4*x].height,0,0,i[4*t+1].width-2,i[4*t+1].height),s[4*t+1]={width:i[4*t+1].width,height:i[4*t+1].height,data:i[4*t+1].getContext("2d").getImageData(0,0,i[4*t+1].width,i[4*t+1].height).data},i[4*t+2]=document.createElement("canvas"),i[4*t+2].width=Math.floor(i[4*t-4*x].width/2),i[4*t+2].height=Math.floor(i[4*t-4*x].height/2),i[4*t+2].getContext("2d").drawImage(i[4*t-4*x],0,1,i[4*t-4*x].width,i[4*t-4*x].height-1,0,0,i[4*t+2].width,i[4*t+2].height-2),s[4*t+2]={width:i[4*t+2].width,height:i[4*t+2].height,data:i[4*t+2].getContext("2d").getImageData(0,0,i[4*t+2].width,i[4*t+2].height).data},i[4*t+3]=document.createElement("canvas"),i[4*t+3].width=Math.floor(i[4*t-4*x].width/2),i[4*t+3].height=Math.floor(i[4*t-4*x].height/2),i[4*t+3].getContext("2d").drawImage(i[4*t-4*x],1,1,i[4*t-4*x].width-1,i[4*t-4*x].height-1,0,0,i[4*t+3].width-2,i[4*t+3].height-2),s[4*t+3]={width:i[4*t+3].width,height:i[4*t+3].height,data:i[4*t+3].getContext("2d").getImageData(0,0,i[4*t+3].width,i[4*t+3].height).data};return[s]}function s(n,p,z){var y,x,e,i,s,t,a=this.shared.cascade,r=(this.shared.interval,this.shared.scale),h=this.shared.next,o=this.shared.scale_upto,d=1,c=1,g=[0,1,0,1],f=[0,0,1,1],l=[];for(y=0;y<o;y++){var u=n[4*y+8*h].width-Math.floor(a.width/4),w=n[4*y+8*h].height-Math.floor(a.height/4),v=[4*n[4*y].width,4*n[4*y+4*h].width,4*n[4*y+8*h].width],m=[16*n[4*y].width-16*u,8*n[4*y+4*h].width-8*u,4*n[4*y+8*h].width-4*u];for(x=0;x<a.stage_classifier.length;x++){var _=a.stage_classifier[x].orig_feature,b=a.stage_classifier[x].feature=new Array(a.stage_classifier[x].count);for(e=0;e<a.stage_classifier[x].count;e++)for(b[e]={size:_[e].size,px:new Array(_[e].size),pz:new Array(_[e].size),nx:new Array(_[e].size),nz:new Array(_[e].size)},t=0;t<_[e].size;t++)b[e].px[t]=4*_[e].px[t]+_[e].py[t]*v[_[e].pz[t]],b[e].pz[t]=_[e].pz[t],b[e].nx[t]=4*_[e].nx[t]+_[e].ny[t]*v[_[e].nz[t]],b[e].nz[t]=_[e].nz[t]}for(t=0;t<4;t++){var M=[n[4*y].data,n[4*y+4*h].data,n[4*y+8*h+t].data],k=[8*g[t]+f[t]*n[4*y].width*8,4*g[t]+f[t]*n[4*y+4*h].width*4,0];for(s=0;s<w;s++){for(i=0;i<u;i++){var C=0,I=!0;for(x=0;x<a.stage_classifier.length;x++){C=0;var A=a.stage_classifier[x].alpha,b=a.stage_classifier[x].feature;for(e=0;e<a.stage_classifier[x].count;e++){var D,N,j=b[e],E=M[j.pz[0]][k[j.pz[0]]+j.px[0]],S=M[j.nz[0]][k[j.nz[0]]+j.nx[0]];if(E<=S)C+=A[2*e];else{var W,H=!0;for(W=0;W<j.size;W++){if(j.pz[W]>=0&&(D=M[j.pz[W]][k[j.pz[W]]+j.px[W]],D<E)){if(D<=S){H=!1;break}E=D}if(j.nz[W]>=0&&(N=M[j.nz[W]][k[j.nz[W]]+j.nx[W]],N>S)){if(E<=N){H=!1;break}S=N}}C+=H?A[2*e+1]:A[2*e]}}if(C<a.stage_classifier[x].threshold){I=!1;break}}I&&l.push({x:(4*i+2*g[t])*d,y:(4*s+2*f[t])*c,width:a.width*d,height:a.height*c,neighbor:1,confidence:C}),k[0]+=16,k[1]+=8,k[2]+=4}k[0]+=m[0],k[1]+=m[1],k[2]+=m[2]}}d*=r,c*=r}return l}function t(n){var p,z,y=this.shared.min_neighbors,x=this.shared.cascade;this.shared.interval,this.shared.scale,this.shared.next,this.shared.scale_upto;for(p=0;p<x.stage_classifier.length;p++)x.stage_classifier[p].feature=x.stage_classifier[p].orig_feature;if(n=n[0],y>0){var e=i.array_group(n,function(n,p){var z=Math.floor(.25*n.width+.5);return p.x<=n.x+z&&p.x>=n.x-z&&p.y<=n.y+z&&p.y>=n.y-z&&p.width<=Math.floor(1.5*n.width+.5)&&Math.floor(1.5*p.width+.5)>=n.width}),s=e.cat,t=e.index,a=new Array(s+1);for(p=0;p<a.length;p++)a[p]={neighbors:0,x:0,y:0,width:0,height:0,confidence:0};for(p=0;p<n.length;p++){var r=n[p],h=t[p];0==a[h].neighbors&&(a[h].confidence=r.confidence),++a[h].neighbors,a[h].x+=r.x,a[h].y+=r.y,a[h].width+=r.width,a[h].height+=r.height,a[h].confidence=Math.max(a[h].confidence,r.confidence)}var o=[];for(p=0;p<s;p++){var d=a[p].neighbors;d>=y&&o.push({x:(2*a[p].x+d)/(2*d),y:(2*a[p].y+d)/(2*d),width:(2*a[p].width+d)/(2*d),height:(2*a[p].height+d)/(2*d),neighbors:a[p].neighbors,confidence:a[p].confidence})}var c=[];for(p=0;p<o.length;p++){var r=o[p],g=!0;for(z=0;z<o.length;z++){var f=o[z],l=Math.floor(.25*f.width+.5);if(p!=z&&r.x>=f.x-l&&r.y>=f.y-l&&r.x+r.width<=f.x+f.width+l&&r.y+r.height<=f.y+f.height+l&&(f.neighbors>Math.max(3,r.neighbors)||r.neighbors<3)){g=!1;break}}g&&c.push(r)}return c}return n}if(void 0!==this.shared){var a=p(arguments,["canvas","cascade","interval","min_neighbors"]);this.shared.canvas=a.canvas,this.shared.interval=a.interval,this.shared.min_neighbors=a.min_neighbors,this.shared.cascade=a.cascade,this.shared.scale=Math.pow(2,1/(a.interval+1)),this.shared.next=a.interval+1,this.shared.scale_upto=Math.floor(Math.log(Math.min(a.canvas.width/a.cascade.width,a.canvas.height/a.cascade.height))/Math.log(this.shared.scale));var r;for(r=0;r<this.shared.cascade.stage_classifier.length;r++)this.shared.cascade.stage_classifier[r].orig_feature=this.shared.cascade.stage_classifier[r].feature}return{pre:e,core:s,post:t}})};onmessage=function(n){var p="string"==typeof n.data?JSON.parse(n.data):n.data,z={shared:p.shared},y=e.core[p.name].apply(z,[p.input,p.id,p.worker]);try{postMessage(y)}catch(n){postMessage(JSON.stringify(y))}},n.fn.faceDetection=function(p){"use strict";var y,x={interval:4,minNeighbors:1,grayscale:!0,confidence:null,async:!1,complete:function(){},error:function(){}};return n.isFunction(p)?x.complete=p:n.extend(x,p),this.each(function(){function p(){var n,p;if(y=(new Date).getTime(),s.is("img"))n=new Image,n.src=s.attr("src"),n.crossOrigin=s.attr("crossorigin"),p=i.pre(n);else if(s.is("video")||s.is("canvas")){var t,a;n=s[0],t=document.createElement("canvas"),t.setAttribute("width",n.videoWidth||n.width),t.setAttribute("height",n.videoHeight||n.height),a=t.getContext("2d"),a.drawImage(n,0,0),p=i.pre(t)}x.grayscale&&(p=i.grayscale(p));try{x.async&&window.Worker?i.detect_objects({canvas:p,cascade:z,interval:x.interval,min_neighbors:x.minNeighbors,worker:1,async:!0})(e):e(i.detect_objects({canvas:p,cascade:z,interval:x.interval,min_neighbors:x.minNeighbors}))}catch(n){x.error.apply(s,[2,n.message]),x.complete.apply(s,[!1])}}function e(n){for(var p=n.length,z=[],e=0;e<p;++e)null!==x.confidence&&n[e].confidence<=x.confidence||(n[e].positionX=a.left+n[e].x,n[e].positionY=a.top+n[e].y,n[e].offsetX=t.left+n[e].x,n[e].offsetY=t.top+n[e].y,n[e].scaleX=r,n[e].scaleY=h,z.push(n[e]));z.time=(new Date).getTime()-y,x.complete.apply(s,[z])}var s=n(this),t=s.offset(),a=s.position(),r=s.width()/(this.naturalWidth||this.videoWidth)||1,h=s.height()/(this.naturalHeight||this.videoHeight)||1;return s.is("img, video, canvas")?p():(x.error.apply(s,[1,"Face detection is possible on images, videos and canvas only."]),void x.complete.apply(s,[[]]))})}}("function"==typeof jQuery?jQuery:"function"==typeof Zepto?Zepto:{fn:{}});

    $(document).ready(function(){

        function windowOffset(elem){
            var iTop = elem.offset().top;
            var iLeft = elem.offset().left;
            var res = {
                top: iTop - $(window).scrollTop(),
                left: iLeft - $(window).scrollLeft()
            }
            return res;
        }


        //Inserting required elements.
        var pixelarityHTML = `<div class="pixelarity-img-edit">
    <canvas class="pixelarity-img-edit-can"></canvas>
    <canvas class="pixelarity-img-edit-process-can"></canvas>
    <div class="pixelarity-img-edit-select">
        <div class="pixelarity-img-edit-select-resize"></div>
    </div>
    <div id="pixelarity-side-opt-holder">
        <div class="pixelarity-side-opt pixelarity-active-side-opt" id="pixelarity-side-opt-crop"> �먮Ⅴ湲�</div>
        <div class="pixelarity-side-opt" id="pixelarity-side-opt-draw"> 洹몃━湲�</div>
    </div>
    <div id="pixelarity-draw-opt-color-cont">
    	<div class="pixelarity-draw-opt-title">�곗꽑�쒖쐞 or </div>
    	<div class="pixelarity-draw-opt-title">洹몃━湲고겢由� / �됱긽�좏깮 / 洹몃┫�섏엳��</div>
        <div class="pixelarity-draw-opt-color pixelarity-active-draw-opt-color" id="pixelarity-draw-opt-color-3">10</div>
        <div class="pixelarity-draw-opt-color" id="pixelarity-draw-opt-color-6">20</div>
        <div class="pixelarity-draw-opt-color" id="pixelarity-draw-opt-color-2">30</div>
        
        <div class="pixelarity-draw-opt-color" id="pixelarity-draw-opt-color-4">40</div>
        <div class="pixelarity-draw-opt-color" id="pixelarity-draw-opt-color-5">50</div>
        
        <div class="pixelarity-draw-opt-color" id="pixelarity-draw-opt-color-1">60</div>
    </div>
    <div id="pixelarity-filter-opt-cont">
        <div class="pixelarity-filter-opt pixelarity-active-filter-opt" id="pixelarity-filter-opt-1">None</div>
        <div class="pixelarity-filter-opt" id="pixelarity-filter-opt-2">Grayscale</div>
        <div class="pixelarity-filter-opt" id="pixelarity-filter-opt-3">Chrome</div>
        <div class="pixelarity-filter-opt" id="pixelarity-filter-opt-4">Nova</div>
        <div class="pixelarity-filter-opt" id="pixelarity-filter-opt-5">Blur</div>
    </div>
    <div class="pixelarity-img-edit-act-area">
    	<p>�댁뒋援щ텇 : 
    	<select id="isu_gubun" style="width:70%;">
    	<option value="isu_gubun01">怨듯넻�댁뒋</option>
    	<option value="isu_gubun02">�щ━�곗뺄</option>
    	<option value="isu_gubun03">�쇰툝�댁뒋</option>
    	<option value="isu_gubun04">媛쒕컻�댁뒋</option>
    	<option value="isu_gubun05">留덉씠��</option>
		</select>
		</p>
		<p>�대�吏� 二쇱꽍 : <input type="text" id="osiu-img" style="width:70%;height:18px;"/> 
		</p>
		<p>�대떦�� : <input type="text" id="isu-name" style="width:70%;height:18px;"/> 
		</p>
    	<p>�댁뒋�댁슜(�먯꽭�� �곸뼱二쇱꽭��) �댁뒋�뺤씤�� osiu.kr�먯꽌�� �뺤씤�섏떎�섏엳�듬땲��. : <textarea type="text" id="isu-text" style="font-size:11px;height:50px;"  />
    	</textarea>
    	</p>
	</div>
    <div class="pixelarity-img-edit-act pixelarity-img-edit-save"> �댁뒋�깅줉</div>
    <div class="pixelarity-img-edit-act pixelarity-img-edit-cancel"> 痍⑥냼
    </div>
</div>`;
        $("body").append(pixelarityHTML);

        //Main Image Editor Object
        window.pixelarity = {

            //Caching Selectors
            can: $('.pixelarity-img-edit-can')[0],
            ctx: null,
            processCan: $('.pixelarity-img-edit-process-can')[0],

            selectionBox: $('.pixelarity-img-edit-select'),
            container: $('.pixelarity-img-edit'),

            saveBtn: $(".pixelarity-img-edit-save"),
            cancelBtn: $('.pixelarity-img-edit-cancel'),

            sideOpts: $(".pixelarity-side-opt"),
            sideOptCrop: $("#pixelarity-side-opt-crop"),
            sideOptDraw: $("#pixelarity-side-opt-draw"),
            sideOptFilter: $("#pixelarity-side-opt-filter"),

            drawOptsColorsContainer: $("#pixelarity-draw-opt-color-cont"),
            drawOptsColors: $(".pixelarity-draw-opt-color"),
            drawOptColor1: $("#pixelarity-draw-opt-color-1"),
            drawOptColor1: $("#pixelarity-draw-opt-color-2"),
            drawOptColor1: $("#pixelarity-draw-opt-color-3"),
            drawOptColor1: $("#pixelarity-draw-opt-color-4"),
            drawOptColor1: $("#pixelarity-draw-opt-color-5"),
            drawOptColor1: $("#pixelarity-draw-opt-color-6"),

            filterOptsContainer: $("#pixelarity-filter-opt-cont"),
            filterOpts: $(".pixelarity-filter-opt"),
            filterOptNone: $("#pixelarity-filter-opt-1"),
            filterOptGray: $("#pixelarity-filter-opt-2"),
            filterOptChrome: $("#pixelarity-filter-opt-3"),
            filterOptNova: $("#pixelarity-filter-opt-4"),
            filterOptBlur: $("#pixelarity-filter-opt-5"),

            //Internal Properties
            face: false,

            drag: false,
            resize: false,

            square: true,
            status: false,

            grcx: null,
            grcy: null,

            callback: null,

            imageType: null,
            imageQuality: 1,

            tool: "crop",

            drawing: false,
            colors: ["000000", "ffffff", "2795f3", "ec5454", "2ecc71", "efd244"],
            drawColor: "2795f3",

            //Open the Image Editor with appropriate settings
            open: function(imgObj, square, callback, imageType, imageQuality, face){

                // if(imgObj.constructor !== File || !imgObj.type.match('image.*')){
                // 	return false;
                // }

                this.drag = false;
                this.resize = false;
                this.face = face || false;

                this.changeTool("draw");

                //Using the supplied settings or using defaults in case of invalid settings

                this.square = (square === true) ? true : false;
                this.imageQuality = (Number(imageQuality) > 0 && Number(imageQuality) <= 1) ? Number(imageQuality) : 1;

                if(imageType == "jpeg" || imageType == "png" || imageType == "gif" || imageType == "bmp"){ //JPG and any other would default to JPEG//
                    this.imageType = imageType;
                }else{
                    this.imageType = "jpeg";
                }

                //false: Not In Use
                this.grcx = false;
                this.grcy = false;

                //Checking if callback is a valid function
                var getType = {};
                this.callback = (callback && getType.toString.call(callback) === '[object Function]') ? callback : false;

                this.status = true;

                this.ctx = this.can.getContext("2d");

                //Shwoing the conatiner on screen
                pixelarity.container.css("display","block").stop().animate({"opacity":"1"});

                var img = new Image();
                var that =  this;

                //Draw the image on the visible canvas depending on the aspect ratio of the image.
                $(img).on("load", function(){

                    if(img.width > img.height){

                        that.can.width = img.width;
                        that.can.height = img.height;

                        that.can.style.width = ($(window).width()/2*1)+"px";
                        that.can.style.height = (img.height*(($(window).width()/2*1)/img.width))+"px";


                        pixelarity.ctx.fillStyle = '#fff';
                        pixelarity.ctx.fillRect(0, 0, that.can.width, that.can.height);

                        pixelarity.ctx.drawImage(img, 0, 0, that.can.width, that.can.height);

                        pixelarity.selectionBox.height($(that.can).height()-10);
                        pixelarity.selectionBox.width($(that.can).height()+120);

                        pixelarity.selectionBox.css({'left': (($(window).width()/2) - ($(that.can).height()+120)/2) + 10  + 'px' ,'top': $(window).height()/2 - ($(that.can).height())/2 - 20 + 'px' });

                    }else if(img.width < img.height){

                        that.can.width = img.width;
                        that.can.height = img.height;

                        that.can.style.width = (img.width*(($(window).height()/3*2)/img.height)) + "px";
                        that.can.style.height = ($(window).height()/4*2) + "px";

                        pixelarity.ctx.fillStyle = '#fff';
                        pixelarity.ctx.fillRect(0, 0, that.can.width, that.can.height);

                        pixelarity.ctx.drawImage(img, 0, 0, that.can.width, that.can.height);

                        pixelarity.selectionBox.height($(that.can).height());
                        pixelarity.selectionBox.width($(that.can).width());

                        pixelarity.selectionBox.css({'left': (($(window).width()/2) - $(that.can).width()/2)  + 'px' ,'top': $(window).height()/3 - $(that.can).width()/4 - 15 + 'px' });


                    }else{
//alert(3);
                        that.can.width = img.width;
                        that.can.height = img.height;

                        that.can.style.width = ($(window).height()/4.8*3.3) + "px";
                        that.can.style.height = ($(window).height()/4.8*3.3) + "px";


                        pixelarity.ctx.fillStyle = '#fff';
                        pixelarity.ctx.fillRect(0, 0, that.can.width, that.can.height);

                        pixelarity.ctx.drawImage(img, 0, 0, that.can.width, that.can.height);

                        pixelarity.selectionBox.height($(that.can).width()-20);
                        pixelarity.selectionBox.width($(that.can).width()-20);

                        pixelarity.selectionBox.css({'left': (($(window).width()/2) - $(that.can).width()/2) + 10  + 'px' ,'top': $(window).height()/2 - $(that.can).width()/2 - 15 + 'px' });
                    }

                    var ratio = pixelarity.can.width/$(pixelarity.can).width();
                    var h = pixelarity.can.height * ratio;
                    var w = pixelarity.can.width * ratio;

                    pixelarity.processCan.height = h;
                    pixelarity.processCan.width = w;

                    var pCtx = pixelarity.processCan.getContext("2d");
                    pCtx.drawImage(pixelarity.can, 0, 0, w, h);

                });

                img.src = URL.createObjectURL(imgObj);
                return true;
            },

            changeTool: function(tool){

                if(tool == "crop"){
                    this.selectionBox.css("display", "block");

                    this.tool = "crop";
                    this.sideOpts.removeClass("pixelarity-active-side-opt");
                    this.sideOptCrop.addClass("pixelarity-active-side-opt");

                    //this.drawOptsColorsContainer.css("display", "none");
                    this.filterOptsContainer.css("display", "none");


                    return true;

                }else if(tool == "draw"){

                    this.tool = "draw";
                    this.sideOpts.removeClass("pixelarity-active-side-opt");
                    this.sideOptDraw.addClass("pixelarity-active-side-opt");

                    this.selectionBox.css("display", "none");
                    this.filterOptsContainer.css("display", "none");

                    this.drawOptsColorsContainer.css("display", "block");

                    return true;

                }else if(tool == "filter"){
                    this.tool = "filter";
                    this.sideOpts.removeClass("pixelarity-active-side-opt");
                    this.sideOptFilter.addClass("pixelarity-active-side-opt");

                    this.drawOptsColorsContainer.css("display", "none");
                    this.selectionBox.css("display", "none");

                    this.filterOptsContainer.css("display", "block");
                }

            },

            changeFilter: function(filter){

                pixelarity.filterOpts.removeClass("pixelarity-active-filter-opt");
                $("#pixelarity-filter-opt-"+filter).addClass("pixelarity-active-filter-opt");

                if(filter == 1){
                    pixelarity.ctx.filter = "none";
                }else if(filter == 2){
                    pixelarity.ctx.filter = "grayscale(1)";
                }else if(filter == 3){
                    pixelarity.ctx.filter = "sepia(0.42) saturate(1.4) contrast(1.1)";
                }else if(filter == 4){
                    pixelarity.ctx.filter = "grayscale(0.25) saturate(0.75) contrast(1.5)";
                }else if(filter == 5){
                    pixelarity.ctx.filter = "blur(14px)";
                }
                this.ctx.height = this.ctx.height;
                this.ctx.drawImage(pixelarity.processCan, 0, 0, pixelarity.can.width,  pixelarity.can.height);
            },

            //Close the image editor and reset the settings.
            close: function(){
                this.drag = false;
                this.resize = false;
                this.square = true;
                this.status = false;
                this.grcx = undefined;
                this.grcy = undefined;
                this.callback = undefined;

                this.can.height = 0;
                this.can.width = 0;

                this.processCan.height = 0;
                this.processCan.width = 0;


                pixelarity.ctx.filter = "none";
                pixelarity.filterOpts.removeClass("pixelarity-active-filter-opt");
                pixelarity.filterOptNone.addClass("pixelarity-active-filter-opt");

                var pCtx = this.processCan.getContext("2d");

                pixelarity.ctx.clearRect(0, 0, 0, 0);
                pCtx.clearRect(0, 0, 0, 0);

                pixelarity.selectionBox.css({
                    "height":'0px',
                    "width":'0px',
                });

                pixelarity.container.stop().animate({
                    "opacity":"0"
                }, 300);

                setTimeout(function(){
                    pixelarity.container.css({"display":"none"});
                }, 300);

            }
        }

        //Set flags to stop tracking mouse movement.
        $(document).on("mouseup",function(){
            pixelarity.drag = false;
            pixelarity.resize = false;
            pixelarity.grcx = false;
            pixelarity.grcy = false;
            pixelarity.drawing = false;
        });


        //Set flags to start trachong mouse movement.
        pixelarity.selectionBox.on("mousedown", function(e){
            var that = $(this);

            var rcx = e.clientX - windowOffset(that).left;
            var rcy = e.clientY - windowOffset(that).top;

            pixelarity.grcx = false;
            pixelarity.grcy = false;

            if( (pixelarity.selectionBox.width() - rcx <= 28) && (pixelarity.selectionBox.height() - rcy <= 28)){
                pixelarity.drag = false;
                pixelarity.resize = true;
            }else{
                pixelarity.drag = true;
                pixelarity.resize = false;
            }

        });

        $(pixelarity.can).on("mousedown", function(e){
            if(pixelarity.tool == "draw"){
                pixelarity.drawing = true;
                var ratio = pixelarity.can.width/$(pixelarity.can).width();
                pixelarity.lastDrawX = (e.clientX - windowOffset($(pixelarity.can)).left) * ratio;
                pixelarity.lastDrawY = (e.clientY - windowOffset($(pixelarity.can)).top) * ratio;

            }
        });


        //Track mouse movements when the flags are set.
        $(document).on('mousemove', function(e){

            var rcx = e.clientX - windowOffset(pixelarity.selectionBox).left;
            var rcy = e.clientY - windowOffset(pixelarity.selectionBox).top;

            if(pixelarity.drag === true && pixelarity.status){

                if(pixelarity.grcx === false){
                    pixelarity.grcx = rcx;
                }

                if(pixelarity.grcy === false){
                    pixelarity.grcy = rcy;
                }

                var xMove = e.clientX - pixelarity.grcx;
                var yMove = e.clientY - pixelarity.grcy;


                if( (xMove + pixelarity.selectionBox.width() >= $(pixelarity.can).width() + windowOffset($(pixelarity.can)).left) || xMove <= windowOffset($(pixelarity.can)).left){
                    if(xMove <= windowOffset($(pixelarity.can)).left){
                        pixelarity.selectionBox.css({"left":windowOffset($(pixelarity.can)).left+"px"});
                    }else{
                        pixelarity.selectionBox.css({"left":windowOffset($(pixelarity.can)).left + $(pixelarity.can).width() - pixelarity.selectionBox.width() + "px"});
                    }
                }else{
                    pixelarity.selectionBox.css({"left":xMove+"px"});
                }


                if((yMove + pixelarity.selectionBox.height() >= $(pixelarity.can).height() + windowOffset($(pixelarity.can)).top) || (yMove <= windowOffset($(pixelarity.can)).top) ){
                    if(yMove <= windowOffset($(pixelarity.can)).top){
                        pixelarity.selectionBox.css({"top":windowOffset($(pixelarity.can)).top+"px"});
                    }else{
                        pixelarity.selectionBox.css({"top":windowOffset($(pixelarity.can)).top + $(pixelarity.can).height() - pixelarity.selectionBox.height() + "px"});
                    }
                }else{
                    pixelarity.selectionBox.css({"top":yMove+"px"});
                }

            }else if(pixelarity.resize === true && pixelarity.status){

                var nWidth = rcx;
                var nHeight = rcy;

                if(pixelarity.square){
                    if(nWidth >= nHeight){//Width is the dominating dimension;
                        nHeight = nWidth;
                        if(nWidth < 100){
                            nWidth = 100;
                            nHeight = 100;
                        }
                    }else{//Height is the dominating dimension;
                        nWidth = nHeight;
                        if(nHeight < 100){
                            nWidth = 100;
                            nHeight = 100;
                        }
                    }

                    if((nWidth + windowOffset(pixelarity.selectionBox).left) >= $(pixelarity.can).width() + windowOffset($(pixelarity.can)).left){
                        nWidth = (windowOffset($(pixelarity.can)).left + $(pixelarity.can).width()) - (windowOffset(pixelarity.selectionBox).left);
                        if(windowOffset(pixelarity.selectionBox).top + nWidth > $(pixelarity.can).height() + windowOffset($(pixelarity.can)).top){
                            nWidth = (windowOffset($(pixelarity.can)).top + $(pixelarity.can).height()) - (windowOffset(pixelarity.selectionBox).top);
                        }
                        nHeight = nWidth;
                    }else if((nHeight + windowOffset(pixelarity.selectionBox).top) >= $(pixelarity.can).height() + windowOffset($(pixelarity.can)).top){
                        nHeight = (windowOffset($(pixelarity.can)).top + $(pixelarity.can).height()) - (windowOffset(pixelarity.selectionBox).top);
                        if(windowOffset(pixelarity.selectionBox).left + nHeight > $(pixelarity.can).width() + windowOffset($(pixelarity.can)).left){
                            nHeight = (windowOffset($(pixelarity.can)).left + $(pixelarity.can).width()) - (windowOffset(pixelarity.selectionBox).left);
                        }
                        nWidth = nHeight;
                    }


                }else{

                    if(nWidth <= 100){
                        nWidth = 100;
                    }
                    if(nHeight <= 100){
                        nHeight = 100;
                    }
                    if(e.clientX >= $(pixelarity.can).width() + windowOffset($(pixelarity.can)).left){    //REASON: nWidth + windowOffset(pixelarity.selectionBox).left = e.clientX;
                        nWidth = (windowOffset($(pixelarity.can)).left + $(pixelarity.can).width()) - (windowOffset(pixelarity.selectionBox).left);
                    }
                    if(e.clientY >= $(pixelarity.can).height() + windowOffset($(pixelarity.can)).top){	//REASON: Same logic as nWidth
                        nHeight = (windowOffset($(pixelarity.can)).top + $(pixelarity.can).height()) - (windowOffset(pixelarity.selectionBox).top);
                    }
                }

                pixelarity.selectionBox.css({
                    "width":nWidth+"px",
                    "height":nHeight+"px",
                });

            }else if(pixelarity.drawing && pixelarity.status){

                var ratio = pixelarity.can.width/$(pixelarity.can).width();
                var x = (e.clientX - windowOffset($(pixelarity.can)).left) * ratio;
                var y = (e.clientY - windowOffset($(pixelarity.can)).top) * ratio;

                var n = 4;

                pixelarity.ctx.fillStyle = "#"+pixelarity.drawColor;
                var pCtx = pixelarity.processCan.getContext("2d");
                pCtx.fillStyle = "#"+pixelarity.drawColor;

                var xMove = (x-pixelarity.lastDrawX) / n, yMove = (y-pixelarity.lastDrawY) / n;

                for(var i = 1; i <= n; i++){
                    pixelarity.ctx.beginPath();
                    pixelarity.ctx.arc(x - (xMove*i), y - (yMove*i), ratio*3 , 0, 0.5 * Math.PI, false);
                    pixelarity.ctx.fill();

                    pCtx.beginPath();
                    pCtx.arc((x-xMove*i)*ratio, (y-yMove*i)*ratio, ratio * ratio * 3 , 0, 0.5 * Math.PI, false);
                    pCtx.fill();
                }

                pixelarity.lastDrawX = x;
                pixelarity.lastDrawY = y;

            }

        });

        //Process the selected region and return it as an image to the user defined callback.
        pixelarity.saveBtn.on("click", function(){

            if(!pixelarity.callback){
                pixelarity.close();
                return;
            }



            if(pixelarity.tool != "crop"){
                pixelarity.changeTool("crop");
            }

            var ratio = pixelarity.can.width/$(pixelarity.can).width();

            var h = pixelarity.selectionBox.height() * ratio;
            var w = pixelarity.selectionBox.width() * ratio;
            var x = (windowOffset(pixelarity.selectionBox).left - windowOffset($(pixelarity.can)).left) * ratio;
            var y = (windowOffset(pixelarity.selectionBox).top - windowOffset($(pixelarity.can)).top) * ratio;

            pixelarity.processCan.height = h;
            pixelarity.processCan.width = w;

            var pCtx = pixelarity.processCan.getContext("2d");

            pCtx.drawImage(pixelarity.can, x, y, w, h, 0, 0, w, h);

            if(pixelarity.face){
                $(pixelarity.processCan).faceDetection({
                    complete: function (f) {
                        var faces = [];
                        for(var i = 0; i < f.length; i++){
                            faces.push({
                                x: f[i].x,
                                y: f[i].y,
                                height: f[i].x,
                                width: f[i].width,
                            });
                        }
                        pixelarity.callback(pixelarity.processCan.toDataURL("image/"+pixelarity.imageType, pixelarity.imageQuality), faces);
                    }
                });
            }else{
                pixelarity.callback(pixelarity.processCan.toDataURL("image/"+pixelarity.imageType, pixelarity.imageQuality));
            }

            pixelarity.close();

        });

        //Close the canvas without processing the image on cancel.
        pixelarity.cancelBtn.on("click", function(){
            pixelarity.close();
        });


        pixelarity.sideOpts.click(function(){
            var t = $(this).attr("id").substr(20);
            pixelarity.changeTool(t);
        });

        //Setup canvas when window is resized.
        $(window).on("resize", function(){
            if(pixelarity.status){
                pixelarity.selectionBox.css({'left': (($(window).width()/2) - $(pixelarity.can).height()/2) + 10  + 'px' ,'top': $(window).height()/2 - $(pixelarity.can).height()/2 + 10 + 'px' });
            }
        });

        pixelarity.drawOptsColors.on("click", function(){
            var n = Number($(this).attr("id").substr(26)) - 1;
            pixelarity.drawColor = pixelarity.colors[n];
            pixelarity.drawOptsColors.removeClass("pixelarity-active-draw-opt-color");
            $(this).addClass("pixelarity-active-draw-opt-color");
        });

        pixelarity.filterOpts.on("click", function(){
            var n = Number($(this).attr("id").substr(22));
            pixelarity.changeFilter(n);
        });

    });
    $(document).ready(function(){



        var html =`<diiv class="osiu-tab-area" style="z-index:1;">
    <input type="hidden" id="osiu-sub_id" value="431"/>
    <input type="hidden" id="osiu-sub_url" value="/main"/>
    <div class="osiu-wrapper tab">
          <div id="osiu-tab-line-wrapper" class="line-wrapper">
            <div id="osiu-tab-line-top" class="osiu-line"></div>
            <div id="osiu-tab-line-mid" class="osiu-line"></div>
            <div id="osiu-tab-line-bot" class="osiu-line"></div>
          </div>
        </div>
        <div class="osiu-save" style="position:absolute;font-size:15px;left:55px;top:10px;">
            <button class="button-7" role="button">����</button>

        </div>

        <div class="osiu-tab osiu-tab4" style="background: #f0dfaf;padding:5px 0;">
            <a href="javascript:;" class="osiu-ifrme" src="http://osiu.kr/incpro/issue/JIdFJ42ifCptqhZgimF3ig%3D%3D/1639750043">
            <span title="�꾩껜 : 0">�댁뒋  0</span>
            <div><span title="(吏꾪뻾以� : 0 / �깅줉 : 0) 洹몄쇅   ">( 0 / 0 )</span><span>
            </a>
            <br/><button class="button-9" role="button">�깅줉</button></span></div>
        </div>

        <div class="osiu-tab osiu-tab4">WBS硫붾돱�곌껐
            <div>O-PAGE-�곕룞�꾨즺</div>
            <div>O-WBS-�곕룞�꾨즺</div>
            <select id="osiu-id" style="font-size:10px;"><option value="1639749256">愿�由ъ옄</option><option value="1639749573">愿�由ъ옄 > �붾（�� 愿�由�</option><option value="1639749664">愿�由ъ옄 > �붾（�� 愿�由� > �ㅼ튂�뚯씪</option><option value="1639749663">愿�由ъ옄 > �붾（�� 愿�由� > 留ㅻ돱��</option><option value="1642565926">愿�由ъ옄 > �붾（�� 愿�由� > 湲곗닠�뺣낫 怨듭쑀</option><option value="1639749670">愿�由ъ옄 > �붾（�� 愿�由� > �숈쁺��</option><option value="1639749673">愿�由ъ옄 > �붾（�� 愿�由� > 留덉��� �먮즺</option><option value="1642565900">愿�由ъ옄 > �붾（�� 愿�由� > 怨좉컼�щ퀎 �ㅼ튂�뺣낫</option><option value="1639749665">愿�由ъ옄 > �붾（�� 愿�由� > 留ㅻ돱��</option><option value="1639749668">愿�由ъ옄 > �붾（�� 愿�由� > 湲곗닠�뺣낫 怨듭쑀</option><option value="1643074427">愿�由ъ옄 > �붾（�� 愿�由� > �ㅼ튂�뚯씪</option><option value="1643333333">愿�由ъ옄 > 怨듯넻</option><option value="1643332201">愿�由ъ옄 > 怨듯넻 > GNB</option><option value="1642566616">愿�由ъ옄 > 怨듯넻 > 濡쒓렇��</option><option value="1643074213">愿�由ъ옄 > 怨듯넻 > 濡쒓렇�� > 濡쒓렇��</option><option value="1643074188">愿�由ъ옄 > 怨듯넻 > 濡쒓렇�� > �꾩씠��/鍮꾨�踰덊샇 李얘린</option><option value="1643074230">愿�由ъ옄 > 怨듯넻 > 濡쒓렇�� > �꾩씠��/鍮꾨�踰덊샇 李얘린 > 寃곌낵�뺣낫 �대찓�� 諛쒖넚</option><option value="1643074221">愿�由ъ옄 > 怨듯넻 > 濡쒓렇�� > 鍮꾨�踰덊샇蹂�寃�</option><option value="1642566561">愿�由ъ옄 > 怨듯넻 > 濡쒓렇�� > �묎렐沅뚰븳愿�由�</option><option value="1642566570">愿�由ъ옄 > 怨듯넻 > 濡쒓렇�� > �묎렐沅뚰븳愿�由� > �묎렐沅뚰븳愿�由�</option><option value="1642566577">愿�由ъ옄 > 怨듯넻 > 濡쒓렇�� > �묎렐沅뚰븳愿�由� > �묎렐怨꾩젙愿�由�</option><option value="1642566107">愿�由ъ옄 > �곸긽/�ъ쭊 愿�由�</option><option value="1642566113">愿�由ъ옄 > �곸긽/�ъ쭊 愿�由� > �뚯썾��/�뚰봽�몄썾��</option><option value="1642566120">愿�由ъ옄 > �곸긽/�ъ쭊 愿�由� > 留ㅻ돱��</option><option value="1642566125">愿�由ъ옄 > �곸긽/�ъ쭊 愿�由� > 湲곗닠�뺣낫 怨듭쑀</option><option value="1642733203">愿�由ъ옄 > �곸긽/�ъ쭊 愿�由� > 遺��덈찓�댁뼹</option><option value="1642567828">愿�由ъ옄 > �쒖뒪�쒓�由�</option><option value="1642567839">愿�由ъ옄 > �쒖뒪�쒓�由� > 沅뚰븳</option><option value="1643074293">愿�由ъ옄 > �쒖뒪�쒓�由� > 沅뚰븳 > 沅뚰븳移댄뀒怨좊━ 愿�由�</option><option value="1643074300">愿�由ъ옄 > �쒖뒪�쒓�由� > 沅뚰븳 > 沅뚰븳愿�由�</option><option value="1643074310">愿�由ъ옄 > �쒖뒪�쒓�由� > 硫붾돱</option><option value="1643074316">愿�由ъ옄 > �쒖뒪�쒓�由� > 硫붾돱 > 硫붾돱移댄뀒怨좊━ 愿�由�</option><option value="1643074320">愿�由ъ옄 > �쒖뒪�쒓�由� > 硫붾돱 > 硫붾돱愿�由�</option><option value="1639749640">愿�由ъ옄 > �듦퀎/濡쒓렇�뺣낫 愿�由�</option><option value="1639749696">愿�由ъ옄 > �듦퀎/濡쒓렇�뺣낫 愿�由� > �듦퀎�뺣낫愿�由�</option><option value="1643074664">愿�由ъ옄 > �듦퀎/濡쒓렇�뺣낫 愿�由� > 濡쒓렇�뺣낫愿�由�</option><option value="1639749574">愿�由ъ옄 > 吏��먯슂泥� 愿�由�</option><option value="1639749678">愿�由ъ옄 > 吏��먯슂泥� 愿�由� > �쇱씠�좎뒪 蹂�寃�/�щ컻��</option><option value="1643074530">愿�由ъ옄 > 吏��먯슂泥� 愿�由� > �쇱씠�좎뒪 蹂�寃�/�щ컻�� > �쇱씠�좎뒪 蹂�寃�/�щ컻�� 蹂�寃쎌��� �낅Т</option><option value="1639749679">愿�由ъ옄 > 吏��먯슂泥� 愿�由� > 湲곗닠吏��먯떊泥�</option><option value="1643074546">愿�由ъ옄 > 吏��먯슂泥� 愿�由� > 湲곗닠吏��먯떊泥� > 吏��먯뾽臾� �꾪솴�깅줉</option><option value="1639749898">愿�由ъ옄 > 吏��먯슂泥� 愿�由� > �뚰듃�덇린�좎��먯뾽臾닿�由�</option><option value="1639749575">愿�由ъ옄 > 怨꾩젙愿�由�</option><option value="1639749700">愿�由ъ옄 > 怨꾩젙愿�由� > 愿�由ъ옄</option><option value="1642566358">愿�由ъ옄 > 怨꾩젙愿�由� > �ъ슜��</option><option value="1642566233">愿�由ъ옄 > 而ㅻ��덊떚 愿�由�</option><option value="1642566240">愿�由ъ옄 > 而ㅻ��덊떚 愿�由� > 怨듭��ы빆</option><option value="1642566260">愿�由ъ옄 > 而ㅻ��덊떚 愿�由� > �먯쑀寃뚯떆��</option><option value="1642566246">愿�由ъ옄 > 而ㅻ��덊떚 愿�由� > 吏곸“吏� �먯쑀寃뚯떆��</option><option value="1642566252">愿�由ъ옄 > 而ㅻ��덊떚 愿�由� > 吏곸“吏� �듬챸寃뚯떆��</option><option value="1639749570">愿�由ъ옄 > �쒕퉬�� 愿�由�</option><option value="1639749843">愿�由ъ옄 > �쒕퉬�� 愿�由� > �숈뒿�먮즺</option><option value="1639749650">愿�由ъ옄 > �쒕퉬�� 愿�由� > 遺��� 留ㅻ돱��</option><option value="1639749652">愿�由ъ옄 > �쒕퉬�� 愿�由� > 留ㅻ돱��</option><option value="1639749653">愿�由ъ옄 > �쒕퉬�� 愿�由� > 湲곗닠�뺣낫 怨듭쑀</option><option value="1639749655">愿�由ъ옄 > �쒕퉬�� 愿�由� > �숈쁺��</option><option value="1639749656">愿�由ъ옄 > �쒕퉬�� 愿�由� > �뚯썾�� 怨듭쑀</option><option value="1639749836">愿�由ъ옄 > �쒕퉬�� 愿�由� > �먮윭肄붾뱶</option><option value="1639749654">愿�由ъ옄 > �쒕퉬�� 愿�由� > 湲곗닠�뺣낫 怨듭쑀愿�由�</option><option value="1642566271">愿�由ъ옄 > �묎렐沅뚰븳愿�由�</option><option value="1639749576">愿�由ъ옄 > �뺣낫�묎렐沅뚰븳 愿�由�</option><option value="1639749691">愿�由ъ옄 > �뺣낫�묎렐沅뚰븳 愿�由� > �뺣낫�묎렐 沅뚰븳愿�由�</option><option value="1639749692">愿�由ъ옄 > �뺣낫�묎렐沅뚰븳 愿�由� > 紐⑤뜽�뺣낫愿�由�</option><option value="1639749589">愿�由ъ옄 > 寃뚯떆�� �듯빀愿�由�</option><option value="1639749694">愿�由ъ옄 > 寃뚯떆�� �듯빀愿�由� > 怨듭��ы빆 愿�由�</option><option value="1639749739">愿�由ъ옄 > 寃뚯떆�� �듯빀愿�由� > �먯쑀寃뚯떆�� 愿�由�</option><option value="1642567941">愿�由ъ옄 > ���곷え�� 寃��� �앹뾽</option><option value="1639749265">�ъ슜��</option><option value="1642567094">�ъ슜�� > 硫붿씤 �섏씠吏�</option><option value="1642567360">�ъ슜�� > 硫붿씤 �섏씠吏� > 湲곗닠吏��먯떊泥�</option><option value="1642567367">�ъ슜�� > 硫붿씤 �섏씠吏� > 怨듭��ы빆</option><option value="1642567214">�ъ슜�� > 硫붿씤 �섏씠吏� > �쇱씠�좎뒪</option><option value="1642567313">�ъ슜�� > 硫붿씤 �섏씠吏� > �쇱씠�좎뒪 > �좉퇋諛쒗뻾</option><option value="1642567320">�ъ슜�� > 硫붿씤 �섏씠吏� > �쇱씠�좎뒪 > �щ컻��</option><option value="1642567440">�ъ슜�� > 硫붿씤 �섏씠吏� > GNB</option><option value="1642567111">�ъ슜�� > 硫붿씤 �섏씠吏� > 濡쒓렇�� �뺣낫</option><option value="1642567116">�ъ슜�� > 硫붿씤 �섏씠吏� > 濡쒓렇�꾩썐</option><option value="1642567374">�ъ슜�� > 硫붿씤 �섏씠吏� > Footer</option><option value="1642567389">�ъ슜�� > 硫붿씤 �섏씠吏� > Footer > �댁슜�쎄�</option><option value="1642567383">�ъ슜�� > 硫붿씤 �섏씠吏� > Footer > 媛쒖씤�뺣낫痍④툒諛⑹묠</option><option value="1643331167">�ъ슜�� > 硫붿씤 �섏씠吏� > 媛쒖씤�뺣낫蹂�寃�</option><option value="1642567123">�ъ슜�� > 硫붿씤 �섏씠吏� > �듯빀寃���</option><option value="1642567140">�ъ슜�� > 硫붿씤 �섏씠吏� > �듯빀寃��� > �듯빀寃��� 寃곌낵 �섏씠吏�</option><option value="1643073088">�ъ슜�� > 硫붿씤 �섏씠吏� > �듯빀寃��� > �듯빀寃��� 硫붾돱蹂� �섏씠吏�</option><option value="1642567161">�ъ슜�� > 硫붿씤 �섏씠吏� > �듭꽌移�</option><option value="1642567181">�ъ슜�� > 硫붿씤 �섏씠吏� > �듭꽌移� > �듯빀�뺣낫 �쒓났 �섏씠吏�</option><option value="1642567193">�ъ슜�� > 硫붿씤 �섏씠吏� > �쒕퉬��/�붾（��/�곸긽&�ъ쭊</option><option value="1642567352">�ъ슜�� > 硫붿씤 �섏씠吏� > �쇱씠�좎뒪 �щ컻��</option><option value="1643333233">�ъ슜�� > 怨듯넻</option><option value="1643333240">�ъ슜�� > 怨듯넻 > �듯빀寃���</option><option value="1643333244">�ъ슜�� > 怨듯넻 > �듭꽌移�</option><option value="1643333251">�ъ슜�� > 怨듯넻 > 媛쒖씤�뺣낫痍④툒諛⑹묠</option><option value="1643333256">�ъ슜�� > 怨듯넻 > �댁슜�쎄�</option><option value="1642567007">�ъ슜�� > 怨듯넻 > 濡쒓렇��</option><option value="1642567028">�ъ슜�� > 怨듯넻 > 濡쒓렇�� > �꾩씠��/鍮꾨�踰덊샇 李얘린</option><option value="1643073218">�ъ슜�� > 怨듯넻 > 濡쒓렇�� > �꾩씠��/鍮꾨�踰덊샇 李얘린 > 寃곌낵�뺣낫 �대찓�� 諛쒖넚</option><option value="1642567020">�ъ슜�� > 怨듯넻 > 濡쒓렇�� > 濡쒓렇��</option><option value="1643073196">�ъ슜�� > 怨듯넻 > 濡쒓렇�� > 媛쒖씤�뺣낫蹂�寃�</option><option value="1642567040">�ъ슜�� > 怨듯넻 > 濡쒓렇�� > 鍮꾨�踰덊샇蹂�寃�</option><option value="1639749992">�ъ슜�� > �쒕퉬��</option><option value="1640308120">�ъ슜�� > �쒕퉬�� > 遺��� 留ㅻ돱��</option><option value="1640308127">�ъ슜�� > �쒕퉬�� > 留ㅻ돱��</option><option value="1640308134">�ъ슜�� > �쒕퉬�� > 湲곗닠�뺣낫 怨듭쑀</option><option value="1640308139">�ъ슜�� > �쒕퉬�� > �숈쁺��</option><option value="1640308145">�ъ슜�� > �쒕퉬�� > �뚯썾�닿났��</option><option value="1640308152">�ъ슜�� > �쒕퉬�� > �먮윭肄붾뱶</option><option value="1640308157">�ъ슜�� > �쒕퉬�� > �숈뒿�먮즺</option><option value="1639750001">�ъ슜�� > �먯쑀寃뚯떆��</option><option value="1640308375">�ъ슜�� > �먯쑀寃뚯떆�� > �먯쑀寃뚯떆��</option><option value="1639749977">�ъ슜�� > 怨듭��ы빆</option><option value="1639750043">�ъ슜�� > 怨듭��ы빆 > 怨듭��ы빆</option><option value="1639749998">�ъ슜�� > 吏��먯슂泥�</option><option value="1640308216">�ъ슜�� > 吏��먯슂泥� > �쇱씠�좎뒪諛쒗뻾</option><option value="1640308224">�ъ슜�� > 吏��먯슂泥� > �쇱씠�좎뒪 蹂�寃�/�щ컻��</option><option value="1640308230">�ъ슜�� > 吏��먯슂泥� > 湲곗닠吏��먯떊泥�</option><option value="1639749994">�ъ슜�� > �붾（��</option><option value="1640308165">�ъ슜�� > �붾（�� > �ㅼ튂�뚯씪</option><option value="1640308170">�ъ슜�� > �붾（�� > 留ㅻ돱��</option><option value="1640308176">�ъ슜�� > �붾（�� > 湲곗닠�뺣낫 怨듭쑀</option><option value="1640308184">�ъ슜�� > �붾（�� > �숈쁺��</option><option value="1640308190">�ъ슜�� > �붾（�� > 留덉��� �먮즺</option><option value="1643073307">�ъ슜�� > �붾（�� > 怨좉컼�щ퀎 �ㅼ튂�뺣낫</option><option value="1643074098">�ъ슜�� > 而ㅻ��덊떚</option><option value="1643074107">�ъ슜�� > 而ㅻ��덊떚 > 怨듭��ы빆</option><option value="1643074113">�ъ슜�� > 而ㅻ��덊떚 > �먯쑀寃뚯떆��</option><option value="1642565430">�ъ슜�� > 吏곸“吏� 而ㅻ��덊떚</option><option value="1642565444">�ъ슜�� > 吏곸“吏� 而ㅻ��덊떚 > 移�갔寃뚯떆��</option><option value="1642565436">�ъ슜�� > 吏곸“吏� 而ㅻ��덊떚 > �먯쑀寃뚯떆��</option><option value="1642565448">�ъ슜�� > 吏곸“吏� 而ㅻ��덊떚 > �듬챸寃뚯떆��</option><option value="1642567422">�ъ슜�� > GNB-硫붿씤�섏씠吏�</option><option value="1642567927">�ъ슜�� > ���곷え�� 寃��� �앹뾽</option><option value="1642565006">�ъ슜�� > �곸긽/�ъ쭊</option><option value="1642565072">�ъ슜�� > �곸긽/�ъ쭊 > 留ㅻ돱��</option><option value="1642565378">�ъ슜�� > �곸긽/�ъ쭊 > 湲곗닠�뺣낫 怨듭쑀</option><option value="1642733419">�ъ슜�� > �곸긽/�ъ쭊 > 遺��덈찓�댁뼹</option><option value="1642565023">�ъ슜�� > �곸긽/�ъ쭊 > �뚯썾��/�뚰봽�몄썾��</option><option value="1642733478">�덉벐嫄곕굹��젣</option><option value="1640308239">�덉벐嫄곕굹��젣 > �뚰듃�� 湲곗닠吏��먯떊泥�</option></select>
        </div>
        <div id="osiu-click2-tab" class="osiu-tab osiu-tab2"> �쒖옉��<input type="text" id="osiu-start_date" value="2022-02-08" /></div>
        <div id="osiu-click3-tab" class="osiu-tab osiu-tab3"> 醫낅즺��<input type="text" id="osiu-end_date" value="" /></div>
        <div id="osiu-click31-tab" class="osiu-tab osiu-tab3"> �대떦��
            <select id="osiu-mem_id">
                <option value="">誘몄꽑��</option>
                                    <option value="2">황장운(�띿닚援����)</option>
                                        <option value="5">kaddn(源�蹂묒삤留ㅻ땲��)</option>
                                        <option value="6">hwang33244(�⑹옣�대ℓ�덉�)</option>
                                        <option value="8">gdyong123(�댁쑀吏꾨ℓ�덉�)</option>
                                        <option value="3">pym428(諛뺤쑄誘몃ℓ�덉�)</option>
                                        <option value="4">yklee(�댁쑄寃쎈ℓ�덉�)</option>
                                        <option value="7">ssohyuny(諛뺤냼�꾨ℓ�덉�)</option>
                                </select>
        </div>
        <div id="osiu-click4-tab" class="osiu-tab osiu-tab4"> 吏꾪뻾瑜�
            <select id="osiu-sub_progress">
                <option value="0">0%</option>
                <option value="0.1">10%</option>
                <option value="0.2">20%</option>
                <option value="0.3">30%</option>
                <option value="0.4">40%</option>
                <option value="0.5">50%</option>
                <option value="0.6">60%</option>
                <option value="0.7">70%</option>
                <option value="0.8">80%</option>
            </select>
        </div>
        <div id="osiu-click5-tab" class="osiu-tab osiu-tab45"> �뱀씠�ы빆
            <textarea id="osiu-sub_note"></textarea>
        </div>

        <div id="osiu-click6-tab" class="osiu-tab osiu-tab45"> DB�꾧뎄,而щ읆紐⑸줉�� 遺숈뿬�ｊ린
            <input type="text" id="osiu-db"></input>
        </div>
        <div id="osiu-click6-tab" class="osiu-tab osiu-tab45"> Data諛붿씤��
            <textarea id="osiu-view-data"></textarea>
        </div>
    </diiv>`;

        var htmlisu = `<img id="osiu-isu-result">
<div id="osiu-dialog" title="Basic dialog">
  <div id="osiu-dialog-iframe"></div>
</div>
`;

        var apiUrl = location.port==81?location.pathname.split('/',3).join('/'):'';
//alert(apiUrl);
        console.log(location);
        var html2 =`<diiv class="osiu-tree-area">
        <div class="osiu-wrapper tree">
          <div id="osiu-tree-line-wrapper"  class="line-wrapper left">
            <div id="osiu-tree-line-top" class="osiu-line"></div>
            <div id="osiu-tree-line-mid" class="osiu-line"></div>
            <div id="osiu-tree-line-bot" class="osiu-line"></div>
          </div>
        </div>
        <div class="osiu-tree-title osiu-tree-title-action">硫붾돱�몃━</div>
        <div class="osiu-tree-search">
            寃��� :<input type="text" id="osiu-tree-search-input"/>
        </div>
        <div class="osiu-tree" style="height:500px;overflow: auto;">
            <table style="width:100%;">
                                    <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/usr/member/memberLogin user 濡쒓렇�� . 濡쒓렇�� �섏씠吏� . 濡쒓렇��" href="`+(apiUrl)+`/usr/member/memberLogin">[user][�띿닚援�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/usr/member/memberLogin                                <br />濡쒓렇�� > 濡쒓렇�� �섏씠吏� > 濡쒓렇��                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/usr/member/memberfindId user 濡쒓렇�� . �꾩씠�� 李얘린 . �꾩씠�� 李얘린" href="`+(apiUrl)+`/usr/member/memberfindId">[user][]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/usr/member/memberfindId                                <br />濡쒓렇�� > �꾩씠�� 李얘린 > �꾩씠�� 李얘린                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/usr/member/memberfindPw user 濡쒓렇�� . 鍮꾨�踰덊샇 李얘린 . 鍮꾨�踰덊샇 李얘린" href="`+(apiUrl)+`/usr/member/memberfindPw">[user][]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/usr/member/memberfindPw                                <br />濡쒓렇�� > 鍮꾨�踰덊샇 李얘린 > 鍮꾨�踰덊샇 李얘린                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/usr/member/memberChangePasswordForm user �먯쑀寃뚯떆�� . 鍮꾨�踰덊샇蹂�寃� . 鍮꾨�踰덊샇蹂�寃� �붾㈃" href="`+(apiUrl)+`/usr/member/memberChangePasswordForm">[user][源�蹂묒삤]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/usr/member/memberChangePasswordForm                                <br />�먯쑀寃뚯떆�� > 鍮꾨�踰덊샇蹂�寃� > 鍮꾨�踰덊샇蹂�寃� �붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/main user 硫붿씤 . 硫붿씤 �섏씠吏� . 硫붿씤 �섏씠吏�" href="`+(apiUrl)+`/main">[user][�댁쑄寃�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/main                                <br />硫붿씤 > 硫붿씤 �섏씠吏� > 硫붿씤 �섏씠吏�                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/notice/noticeList user 怨듭��ы빆 . 怨듭��ы빆 . 怨듭��ы빆 紐⑸줉" href="`+(apiUrl)+`/notice/noticeList">[user][�댁쑄寃�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 100%]<br/>/notice/noticeList                                <br />怨듭��ы빆 > 怨듭��ы빆 > 怨듭��ы빆 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/notice/noticeDetail user 怨듭��ы빆 . 怨듭��ы빆 . 怨듭��ы빆 �곸꽭" href="`+(apiUrl)+`/notice/noticeDetail">[user][�댁쑄寃�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 100%]<br/>/notice/noticeDetail                                <br />怨듭��ы빆 > 怨듭��ы빆 > 怨듭��ы빆 �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/service/partsCatalogList user �쒕퉬�� �뺣낫�쇳꽣 . �뚯툩 & HTML 留ㅻ돱�� . 紐⑸줉" href="`+(apiUrl)+`/service/partsCatalogList">[user][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/service/partsCatalogList                                <br />�쒕퉬�� �뺣낫�쇳꽣 > �뚯툩 & HTML 留ㅻ돱�� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/service/manualList user �쒕퉬�� �뺣낫�쇳꽣 . 留ㅻ돱�� . 紐⑸줉" href="`+(apiUrl)+`/service/manualList">[user][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/service/manualList                                <br />�쒕퉬�� �뺣낫�쇳꽣 > 留ㅻ돱�� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/service/techShareList user �쒕퉬�� �뺣낫�쇳꽣 . 湲곗닠�뺣낫 怨듭쑀 . 紐⑸줉" href="`+(apiUrl)+`/service/techShareList">[user][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/service/techShareList                                <br />�쒕퉬�� �뺣낫�쇳꽣 > 湲곗닠�뺣낫 怨듭쑀 > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/service/techShareDetail user �쒕퉬�� �뺣낫�쇳꽣 . 湲곗닠�뺣낫 怨듭쑀 . �곸꽭" href="`+(apiUrl)+`/service/techShareDetail">[user][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/service/techShareDetail                                <br />�쒕퉬�� �뺣낫�쇳꽣 > 湲곗닠�뺣낫 怨듭쑀 > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/service/techShareReplyForm user �쒕퉬�� �뺣낫�쇳꽣 . 湲곗닠�뺣낫 怨듭쑀 . �듬��ш린 �붾㈃" href="`+(apiUrl)+`/service/techShareReplyForm">[user][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/service/techShareReplyForm                                <br />�쒕퉬�� �뺣낫�쇳꽣 > 湲곗닠�뺣낫 怨듭쑀 > �듬��ш린 �붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/service/techShareRegistForm user �쒕퉬�� �뺣낫�쇳꽣 . 湲곗닠�뺣낫 怨듭쑀 . �좉퇋 �깅줉 �붾㈃" href="`+(apiUrl)+`/service/techShareRegistForm">[user][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/service/techShareRegistForm                                <br />�쒕퉬�� �뺣낫�쇳꽣 > 湲곗닠�뺣낫 怨듭쑀 > �좉퇋 �깅줉 �붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/service/videoList user �쒕퉬�� �뺣낫�쇳꽣 . �숈쁺�� . 紐⑸줉" href="`+(apiUrl)+`/service/videoList">[user][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/service/videoList                                <br />�쒕퉬�� �뺣낫�쇳꽣 > �숈쁺�� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/service/videoDetail user �쒕퉬�� �뺣낫�쇳꽣 . �숈쁺�� . �곸꽭" href="`+(apiUrl)+`/service/videoDetail">[user][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/service/videoDetail                                <br />�쒕퉬�� �뺣낫�쇳꽣 > �숈쁺�� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/service/firmwareList user �쒕퉬�� �뺣낫�쇳꽣 . �뚯썾�� . 紐⑸줉" href="`+(apiUrl)+`/service/firmwareList">[user][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/service/firmwareList                                <br />�쒕퉬�� �뺣낫�쇳꽣 > �뚯썾�� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/service/firmwareDetail user �쒕퉬�� �뺣낫�쇳꽣 . �뚯썾�� . �곸꽭" href="`+(apiUrl)+`/service/firmwareDetail">[user][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/service/firmwareDetail                                <br />�쒕퉬�� �뺣낫�쇳꽣 > �뚯썾�� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/service/errorcodeList user �쒕퉬�� �뺣낫�쇳꽣 . �먮윭肄붾뱶 . 紐⑸줉" href="`+(apiUrl)+`/service/errorcodeList">[user][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/service/errorcodeList                                <br />�쒕퉬�� �뺣낫�쇳꽣 > �먮윭肄붾뱶 > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/service/learningMaterialList user �쒕퉬�� �뺣낫�쇳꽣 . �숈뒿�먮즺 . 紐⑸줉" href="`+(apiUrl)+`/service/learningMaterialList">[user][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/service/learningMaterialList                                <br />�쒕퉬�� �뺣낫�쇳꽣 > �숈뒿�먮즺 > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/solution/installationfileList user �붾（�� �뺣낫�쇳꽣 . �ㅼ튂�뚯씪 . 紐⑸줉" href="`+(apiUrl)+`/solution/installationfileList">[user][諛뺤쑄誘�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/solution/installationfileList                                <br />�붾（�� �뺣낫�쇳꽣 > �ㅼ튂�뚯씪 > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/solution/installationfileDetail user �붾（�� �뺣낫�쇳꽣 . �ㅼ튂�뚯씪 . �곸꽭" href="`+(apiUrl)+`/solution/installationfileDetail">[user][諛뺤쑄誘�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/solution/installationfileDetail                                <br />�붾（�� �뺣낫�쇳꽣 > �ㅼ튂�뚯씪 > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/solution/manualsList user �붾（�� �뺣낫�쇳꽣 . 留ㅻ돱�� . 紐⑸줉" href="`+(apiUrl)+`/solution/manualsList">[user][諛뺤냼��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/solution/manualsList                                <br />�붾（�� �뺣낫�쇳꽣 > 留ㅻ돱�� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/solution/techshareList user �붾（�� �뺣낫�쇳꽣 . 湲곗닠�뺣낫 怨듭쑀 . 紐⑸줉" href="`+(apiUrl)+`/solution/techshareList">[user][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/solution/techshareList                                <br />�붾（�� �뺣낫�쇳꽣 > 湲곗닠�뺣낫 怨듭쑀 > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/solution/techshareDetail user �붾（�� �뺣낫�쇳꽣 . 湲곗닠�뺣낫 怨듭쑀 . �곸꽭" href="`+(apiUrl)+`/solution/techshareDetail">[user][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/solution/techshareDetail                                <br />�붾（�� �뺣낫�쇳꽣 > 湲곗닠�뺣낫 怨듭쑀 > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/solution/techshareReplyForm user �붾（�� �뺣낫�쇳꽣 . 湲곗닠�뺣낫 怨듭쑀 . �듬��ш린 �붾㈃" href="`+(apiUrl)+`/solution/techshareReplyForm">[user][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/solution/techshareReplyForm                                <br />�붾（�� �뺣낫�쇳꽣 > 湲곗닠�뺣낫 怨듭쑀 > �듬��ш린 �붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/solution/techshareRegistForm user �붾（�� �뺣낫�쇳꽣 . 湲곗닠�뺣낫 怨듭쑀 . �좉퇋 �깅줉 �붾㈃" href="`+(apiUrl)+`/solution/techshareRegistForm">[user][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/solution/techshareRegistForm                                <br />�붾（�� �뺣낫�쇳꽣 > 湲곗닠�뺣낫 怨듭쑀 > �좉퇋 �깅줉 �붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/solution/videoList user �붾（�� �뺣낫�쇳꽣 . �숈쁺�� . 紐⑸줉" href="`+(apiUrl)+`/solution/videoList">[user][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/solution/videoList                                <br />�붾（�� �뺣낫�쇳꽣 > �숈쁺�� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/solution/videoDetail user �붾（�� �뺣낫�쇳꽣 . �숈쁺�� . �곸꽭" href="`+(apiUrl)+`/solution/videoDetail">[user][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/solution/videoDetail                                <br />�붾（�� �뺣낫�쇳꽣 > �숈쁺�� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/solution/marketingList user �붾（�� �뺣낫�쇳꽣 . 留덉��� �먮즺 . 紐⑸줉" href="`+(apiUrl)+`/solution/marketingList">[user][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/solution/marketingList                                <br />�붾（�� �뺣낫�쇳꽣 > 留덉��� �먮즺 > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/solution/marketingDetail user �붾（�� �뺣낫�쇳꽣 . 留덉��� �먮즺 . �곸꽭" href="`+(apiUrl)+`/solution/marketingDetail">[user][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/solution/marketingDetail                                <br />�붾（�� �뺣낫�쇳꽣 > 留덉��� �먮즺 > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/support/licenseRegistFormPopup user 吏��먯슂泥� . �쇱씠�좎뒪 諛쒗뻾 . �깅줉 �앹뾽" href="`+(apiUrl)+`/support/licenseRegistFormPopup">[user][諛뺤냼��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/support/licenseRegistFormPopup                                <br />吏��먯슂泥� > �쇱씠�좎뒪 諛쒗뻾 > �깅줉 �앹뾽                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/support/licenseRequestList user 吏��먯슂泥� . �쇱씠�쇱뒪 蹂�寃�/�щ컻�� . 紐⑸줉" href="`+(apiUrl)+`/support/licenseRequestList">[user][諛뺤냼��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/support/licenseRequestList                                <br />吏��먯슂泥� > �쇱씠�쇱뒪 蹂�寃�/�щ컻�� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/support/licenseRequestDetail user 吏��먯슂泥� . �쇱씠�쇱뒪 蹂�寃�/�щ컻�� . �곸꽭" href="`+(apiUrl)+`/support/licenseRequestDetail">[user][諛뺤냼��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/support/licenseRequestDetail                                <br />吏��먯슂泥� > �쇱씠�쇱뒪 蹂�寃�/�щ컻�� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/support/licenseRequestRegistForm user 吏��먯슂泥� . �쇱씠�쇱뒪 蹂�寃�/�щ컻�� . �좎껌�� �묒꽦" href="`+(apiUrl)+`/support/licenseRequestRegistForm">[user][諛뺤냼��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/support/licenseRequestRegistForm                                <br />吏��먯슂泥� > �쇱씠�쇱뒪 蹂�寃�/�щ컻�� > �좎껌�� �묒꽦                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/common/searchModelPopup user �쒕퉬�� �뺣낫�쇳꽣 愿�由� . �듯빀�뺣낫 愿�由� . ���곷え�멸��� �앹뾽" href="`+(apiUrl)+`/common/searchModelPopup">[user][]<span style="color:#ff8a15">[誘몄뿰��]</span>[吏꾪뻾 : 0%]<br/>/common/searchModelPopup                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > �듯빀�뺣낫 愿�由� > ���곷え�멸��� �앹뾽                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/common/PrivacyPopup user �듦퀎�뺣낫愿�由� . 媛쒖씤�뺣낫痍④툒諛⑹묠 . 媛쒖씤�뺣낫痍④툒諛⑹묠" href="`+(apiUrl)+`/common/PrivacyPopup">[user][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/common/PrivacyPopup                                <br />�듦퀎�뺣낫愿�由� > 媛쒖씤�뺣낫痍④툒諛⑹묠 > 媛쒖씤�뺣낫痍④툒諛⑹묠                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/common/TermsPopup user �듦퀎�뺣낫愿�由� . �댁슜�쎄� . �댁슜�쎄�" href="`+(apiUrl)+`/common/TermsPopup">[user][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/common/TermsPopup                                <br />�듦퀎�뺣낫愿�由� > �댁슜�쎄� > �댁슜�쎄�                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/common/SearchModelPopup user �뺣낫�묎렐沅뚰븳 愿�由� . �뺣낫�묎렐沅뚰븳 愿�由� . ���곷え�� 寃��� �앹뾽" href="`+(apiUrl)+`/common/SearchModelPopup">[user][]<span style="color:#ff8a15">[誘몄뿰��]</span>[吏꾪뻾 : 0%]<br/>/common/SearchModelPopup                                <br />�뺣낫�묎렐沅뚰븳 愿�由� > �뺣낫�묎렐沅뚰븳 愿�由� > ���곷え�� 寃��� �앹뾽                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/common/SearchMenuPopup user �뺣낫�묎렐沅뚰븳 愿�由� . �뺣낫�묎렐沅뚰븳 愿�由� . ���곷찓�� 寃��� �앹뾽" href="`+(apiUrl)+`/common/SearchMenuPopup">[user][]<span style="color:#ff8a15">[誘몄뿰��]</span>[吏꾪뻾 : 0%]<br/>/common/SearchMenuPopup                                <br />�뺣낫�묎렐沅뚰븳 愿�由� > �뺣낫�묎렐沅뚰븳 愿�由� > ���곷찓�� 寃��� �앹뾽                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/support/techSupportList user 吏��먯슂泥� . 湲곗닠吏��먯떊泥� . 紐⑸줉" href="`+(apiUrl)+`/support/techSupportList">[user][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/support/techSupportList                                <br />吏��먯슂泥� > 湲곗닠吏��먯떊泥� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/support/techSupportDetail user 吏��먯슂泥� . 湲곗닠吏��먯떊泥� . �곸꽭" href="`+(apiUrl)+`/support/techSupportDetail">[user][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/support/techSupportDetail                                <br />吏��먯슂泥� > 湲곗닠吏��먯떊泥� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/support/techSupportResultDetail user 吏��먯슂泥� . 湲곗닠吏��먯떊泥� . 寃곌낵蹂닿린" href="`+(apiUrl)+`/support/techSupportResultDetail">[user][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/support/techSupportResultDetail                                <br />吏��먯슂泥� > 湲곗닠吏��먯떊泥� > 寃곌낵蹂닿린                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/support/techSupportRegistForm user 吏��먯슂泥� . 湲곗닠吏��먯떊泥� . �깅줉 �붾㈃" href="`+(apiUrl)+`/support/techSupportRegistForm">[user][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/support/techSupportRegistForm                                <br />吏��먯슂泥� > 湲곗닠吏��먯떊泥� > �깅줉 �붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/board/freeList user �먯쑀寃뚯떆�� . �먯쑀寃뚯떆�� . 紐⑸줉" href="`+(apiUrl)+`/board/freeList">[user][�댁쑄寃�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 100%]<br/>/board/freeList                                <br />�먯쑀寃뚯떆�� > �먯쑀寃뚯떆�� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/board/freeDetail user �먯쑀寃뚯떆�� . �먯쑀寃뚯떆�� . �곸꽭" href="`+(apiUrl)+`/board/freeDetail">[user][�댁쑄寃�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 100%]<br/>/board/freeDetail                                <br />�먯쑀寃뚯떆�� > �먯쑀寃뚯떆�� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/board/freeReplyForm user �먯쑀寃뚯떆�� . �먯쑀寃뚯떆�� . �듬��ш린 �붾㈃" href="`+(apiUrl)+`/board/freeReplyForm">[user][�댁쑄寃�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 100%]<br/>/board/freeReplyForm                                <br />�먯쑀寃뚯떆�� > �먯쑀寃뚯떆�� > �듬��ш린 �붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/board/freeRegistForm user �먯쑀寃뚯떆�� . �먯쑀寃뚯떆�� . �좉퇋 �깅줉 �붾㈃" href="`+(apiUrl)+`/board/freeRegistForm">[user][�댁쑄寃�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 100%]<br/>/board/freeRegistForm                                <br />�먯쑀寃뚯떆�� > �먯쑀寃뚯떆�� > �좉퇋 �깅줉 �붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/member/memberLogin mng 濡쒓렇�� . 濡쒓렇�� �섏씠吏� . 濡쒓렇�� �섏씠吏�" href="`+(apiUrl)+`/mng/member/memberLogin">[mng][]<span style="color:#ff8a15">[誘몄뿰��]</span>[吏꾪뻾 : 0%]<br/>/mng/member/memberLogin                                <br />濡쒓렇�� > 濡쒓렇�� �섏씠吏� > 濡쒓렇�� �섏씠吏�                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/member/UserList mng �뚯썝�뺣낫 愿�由� . �뚯썝�뺣낫 愿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/member/UserList">[mng][�띿닚援�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/member/UserList                                <br />�뚯썝�뺣낫 愿�由� > �뚯썝�뺣낫 愿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/member/UserDetail mng �뚯썝�뺣낫 愿�由� . �뚯썝�뺣낫 愿�由� . �곸꽭" href="`+(apiUrl)+`/mng/member/UserDetail">[mng][�띿닚援�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/member/UserDetail                                <br />�뚯썝�뺣낫 愿�由� > �뚯썝�뺣낫 愿�由� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/member/UserRegistForm mng �뚯썝�뺣낫 愿�由� . �뚯썝�뺣낫 愿�由� . �좉퇋�깅줉�붾㈃" href="`+(apiUrl)+`/mng/member/UserRegistForm">[mng][�띿닚援�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/member/UserRegistForm                                <br />�뚯썝�뺣낫 愿�由� > �뚯썝�뺣낫 愿�由� > �좉퇋�깅줉�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/member/UserEditForm mng �뚯썝�뺣낫 愿�由� . �뚯썝�뺣낫 愿�由� . �섏젙�붾㈃" href="`+(apiUrl)+`/mng/member/UserEditForm">[mng][�띿닚援�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/member/UserEditForm                                <br />�뚯썝�뺣낫 愿�由� > �뚯썝�뺣낫 愿�由� > �섏젙�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/totalInformationList mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . �듯빀�뺣낫 愿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/service/totalInformationList">[mng][]<span style="color:#ff8a15">[誘몄뿰��]</span>[吏꾪뻾 : 0%]<br/>/mng/service/totalInformationList                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > �듯빀�뺣낫 愿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/totalInformationDetail mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . �듯빀�뺣낫 愿�由� . �곸꽭" href="`+(apiUrl)+`/mng/service/totalInformationDetail">[mng][]<span style="color:#ff8a15">[誘몄뿰��]</span>[吏꾪뻾 : 0%]<br/>/mng/service/totalInformationDetail                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > �듯빀�뺣낫 愿�由� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/partsCatalogList mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . Parts Catalog愿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/service/partsCatalogList">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 10%]<br/>/mng/service/partsCatalogList                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > Parts Catalog愿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/partsCatalogDetail mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . Parts Catalog愿�由� . �곸꽭" href="`+(apiUrl)+`/mng/service/partsCatalogDetail">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/partsCatalogDetail                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > Parts Catalog愿�由� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/partsCatalogRegistForm mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . Parts Catalog愿�由� . �좉퇋�깅줉�붾㈃" href="`+(apiUrl)+`/mng/service/partsCatalogRegistForm">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/partsCatalogRegistForm                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > Parts Catalog愿�由� > �좉퇋�깅줉�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/partsCatalogEditForm mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . Parts Catalog愿�由� . �섏젙�붾㈃" href="`+(apiUrl)+`/mng/service/partsCatalogEditForm">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/partsCatalogEditForm                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > Parts Catalog愿�由� > �섏젙�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/manualList mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . 留ㅻ돱�� 愿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/service/manualList">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/manualList                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > 留ㅻ돱�� 愿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/manualDetail mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . 留ㅻ돱�� 愿�由� . �곸꽭" href="`+(apiUrl)+`/mng/service/manualDetail">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/manualDetail                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > 留ㅻ돱�� 愿�由� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/manualRegistForm mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . 留ㅻ돱�� 愿�由� . �좉퇋�깅줉�붾㈃" href="`+(apiUrl)+`/mng/service/manualRegistForm">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/manualRegistForm                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > 留ㅻ돱�� 愿�由� > �좉퇋�깅줉�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/manualEditForm mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . 留ㅻ돱�� 愿�由� . �섏젙�붾㈃" href="`+(apiUrl)+`/mng/service/manualEditForm">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/manualEditForm                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > 留ㅻ돱�� 愿�由� > �섏젙�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/techShareList mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . 湲곗닠�뺣낫 怨듭쑀愿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/service/techShareList">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/techShareList                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > 湲곗닠�뺣낫 怨듭쑀愿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/techShareDetail mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . 湲곗닠�뺣낫 怨듭쑀愿�由� . �곸꽭" href="`+(apiUrl)+`/mng/service/techShareDetail">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/techShareDetail                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > 湲곗닠�뺣낫 怨듭쑀愿�由� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/techShareReplyForm mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . 湲곗닠�뺣낫 怨듭쑀愿�由� . �듬��ш린�붾㈃" href="`+(apiUrl)+`/mng/service/techShareReplyForm">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/techShareReplyForm                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > 湲곗닠�뺣낫 怨듭쑀愿�由� > �듬��ш린�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/techShareRegistForm mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . 湲곗닠�뺣낫 怨듭쑀愿�由� . �좉퇋�깅줉�붾㈃" href="`+(apiUrl)+`/mng/service/techShareRegistForm">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/techShareRegistForm                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > 湲곗닠�뺣낫 怨듭쑀愿�由� > �좉퇋�깅줉�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/techShareEditForm mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . 湲곗닠�뺣낫 怨듭쑀愿�由� . �섏젙�붾㈃" href="`+(apiUrl)+`/mng/service/techShareEditForm">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/techShareEditForm                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > 湲곗닠�뺣낫 怨듭쑀愿�由� > �섏젙�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/videoList mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . �숈쁺�� 愿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/service/videoList">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/videoList                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > �숈쁺�� 愿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/videoDetail mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . �숈쁺�� 愿�由� . �곸꽭" href="`+(apiUrl)+`/mng/service/videoDetail">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/videoDetail                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > �숈쁺�� 愿�由� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/videoRegistForm mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . �숈쁺�� 愿�由� . �좉퇋�깅줉�붾㈃" href="`+(apiUrl)+`/mng/service/videoRegistForm">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/videoRegistForm                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > �숈쁺�� 愿�由� > �좉퇋�깅줉�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/videoEditForm mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . �숈쁺�� 愿�由� . �섏젙�붾㈃" href="`+(apiUrl)+`/mng/service/videoEditForm">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/videoEditForm                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > �숈쁺�� 愿�由� > �섏젙�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/firmwareList mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . �뚯썾�� 愿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/service/firmwareList">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/firmwareList                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > �뚯썾�� 愿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/firmwareDetail mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . �뚯썾�� 愿�由� . �곸꽭" href="`+(apiUrl)+`/mng/service/firmwareDetail">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/firmwareDetail                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > �뚯썾�� 愿�由� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/firmwareRegistForm mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . �뚯썾�� 愿�由� . �좉퇋�깅줉�붾㈃" href="`+(apiUrl)+`/mng/service/firmwareRegistForm">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/firmwareRegistForm                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > �뚯썾�� 愿�由� > �좉퇋�깅줉�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/firmwareEditForm mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . �뚯썾�� 愿�由� . �섏젙�붾㈃" href="`+(apiUrl)+`/mng/service/firmwareEditForm">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/firmwareEditForm                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > �뚯썾�� 愿�由� > �섏젙�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/errorCodeList mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . �먮윭肄붾뱶 愿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/service/errorCodeList">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/errorCodeList                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > �먮윭肄붾뱶 愿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/errorCodeDetail mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . �먮윭肄붾뱶 愿�由� . �곸꽭" href="`+(apiUrl)+`/mng/service/errorCodeDetail">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/errorCodeDetail                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > �먮윭肄붾뱶 愿�由� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/errorCodeRegistForm mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . �먮윭肄붾뱶 愿�由� . �좉퇋�깅줉�붾㈃" href="`+(apiUrl)+`/mng/service/errorCodeRegistForm">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/errorCodeRegistForm                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > �먮윭肄붾뱶 愿�由� > �좉퇋�깅줉�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/errorCodeEditForm mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . �먮윭肄붾뱶 愿�由� . �섏젙�붾㈃" href="`+(apiUrl)+`/mng/service/errorCodeEditForm">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/errorCodeEditForm                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > �먮윭肄붾뱶 愿�由� > �섏젙�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/learningMaterialList mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . �숈뒿�먮즺 愿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/service/learningMaterialList">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/learningMaterialList                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > �숈뒿�먮즺 愿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/learningMaterialDetail mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . �숈뒿�먮즺 愿�由� . �곸꽭" href="`+(apiUrl)+`/mng/service/learningMaterialDetail">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/learningMaterialDetail                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > �숈뒿�먮즺 愿�由� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/learningMaterialRegistForm mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . �숈뒿�먮즺 愿�由� . �좉퇋�깅줉�붾㈃" href="`+(apiUrl)+`/mng/service/learningMaterialRegistForm">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/learningMaterialRegistForm                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > �숈뒿�먮즺 愿�由� > �좉퇋�깅줉�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/service/learningMaterialEditForm mng �쒕퉬�� �뺣낫�쇳꽣 愿�由� . �숈뒿�먮즺 愿�由� . �섏젙�붾㈃" href="`+(apiUrl)+`/mng/service/learningMaterialEditForm">[mng][�댁쑀吏�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/service/learningMaterialEditForm                                <br />�쒕퉬�� �뺣낫�쇳꽣 愿�由� > �숈뒿�먮즺 愿�由� > �섏젙�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/totalInformationList mng �붾（�� �뺣낫�쇳꽣 愿�由� . �듯빀�뺣낫 愿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/solution/totalInformationList">[mng][]<span style="color:#ff8a15">[誘몄뿰��]</span>[吏꾪뻾 : 0%]<br/>/mng/solution/totalInformationList                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > �듯빀�뺣낫 愿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/totalInformationDetail mng �붾（�� �뺣낫�쇳꽣 愿�由� . �듯빀�뺣낫 愿�由� . �곸꽭" href="`+(apiUrl)+`/mng/solution/totalInformationDetail">[mng][]<span style="color:#ff8a15">[誘몄뿰��]</span>[吏꾪뻾 : 0%]<br/>/mng/solution/totalInformationDetail                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > �듯빀�뺣낫 愿�由� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/installationFileList mng �붾（�� �뺣낫�쇳꽣 愿�由� . �ㅼ튂�뚯씪 愿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/solution/installationFileList">[mng][諛뺤쑄誘�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/mng/solution/installationFileList                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > �ㅼ튂�뚯씪 愿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/installationFileDetail mng �붾（�� �뺣낫�쇳꽣 愿�由� . �ㅼ튂�뚯씪 愿�由� . �곸꽭" href="`+(apiUrl)+`/mng/solution/installationFileDetail">[mng][諛뺤쑄誘�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/mng/solution/installationFileDetail                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > �ㅼ튂�뚯씪 愿�由� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/installationFileRegistForm mng �붾（�� �뺣낫�쇳꽣 愿�由� . �ㅼ튂�뚯씪 愿�由� . �좉퇋�깅줉�붾㈃" href="`+(apiUrl)+`/mng/solution/installationFileRegistForm">[mng][諛뺤쑄誘�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/mng/solution/installationFileRegistForm                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > �ㅼ튂�뚯씪 愿�由� > �좉퇋�깅줉�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/installationFileEditForm mng �붾（�� �뺣낫�쇳꽣 愿�由� . �ㅼ튂�뚯씪 愿�由� . �섏젙�붾㈃" href="`+(apiUrl)+`/mng/solution/installationFileEditForm">[mng][諛뺤쑄誘�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/mng/solution/installationFileEditForm                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > �ㅼ튂�뚯씪 愿�由� > �섏젙�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/manualList mng �붾（�� �뺣낫�쇳꽣 愿�由� . 留ㅻ돱�� 愿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/solution/manualList">[mng][諛뺤쑄誘�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/mng/solution/manualList                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > 留ㅻ돱�� 愿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/manualDetail mng �붾（�� �뺣낫�쇳꽣 愿�由� . 留ㅻ돱�� 愿�由� . �곸꽭" href="`+(apiUrl)+`/mng/solution/manualDetail">[mng][諛뺤쑄誘�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/mng/solution/manualDetail                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > 留ㅻ돱�� 愿�由� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/manualRegistForm mng �붾（�� �뺣낫�쇳꽣 愿�由� . 留ㅻ돱�� 愿�由� . �좉퇋�깅줉�붾㈃" href="`+(apiUrl)+`/mng/solution/manualRegistForm">[mng][諛뺤쑄誘�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/mng/solution/manualRegistForm                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > 留ㅻ돱�� 愿�由� > �좉퇋�깅줉�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/manualEditForm mng �붾（�� �뺣낫�쇳꽣 愿�由� . 留ㅻ돱�� 愿�由� . �섏젙�붾㈃" href="`+(apiUrl)+`/mng/solution/manualEditForm">[mng][諛뺤쑄誘�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/mng/solution/manualEditForm                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > 留ㅻ돱�� 愿�由� > �섏젙�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/techShareList mng �붾（�� �뺣낫�쇳꽣 愿�由� . 湲곗닠�뺣낫 怨듭쑀 愿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/solution/techShareList">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/mng/solution/techShareList                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > 湲곗닠�뺣낫 怨듭쑀 愿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/techShareDetail mng �붾（�� �뺣낫�쇳꽣 愿�由� . 湲곗닠�뺣낫 怨듭쑀 愿�由� . �곸꽭" href="`+(apiUrl)+`/mng/solution/techShareDetail">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/mng/solution/techShareDetail                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > 湲곗닠�뺣낫 怨듭쑀 愿�由� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/techShareReplyForm mng �붾（�� �뺣낫�쇳꽣 愿�由� . 湲곗닠�뺣낫 怨듭쑀 愿�由� . �듬��ш린�붾㈃" href="`+(apiUrl)+`/mng/solution/techShareReplyForm">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/solution/techShareReplyForm                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > 湲곗닠�뺣낫 怨듭쑀 愿�由� > �듬��ш린�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/techShareRegistForm mng �붾（�� �뺣낫�쇳꽣 愿�由� . 湲곗닠�뺣낫 怨듭쑀 愿�由� . �좉퇋�깅줉�붾㈃" href="`+(apiUrl)+`/mng/solution/techShareRegistForm">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/mng/solution/techShareRegistForm                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > 湲곗닠�뺣낫 怨듭쑀 愿�由� > �좉퇋�깅줉�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/techShareEditForm mng �붾（�� �뺣낫�쇳꽣 愿�由� . 湲곗닠�뺣낫 怨듭쑀 愿�由� . �섏젙�붾㈃" href="`+(apiUrl)+`/mng/solution/techShareEditForm">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/mng/solution/techShareEditForm                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > 湲곗닠�뺣낫 怨듭쑀 愿�由� > �섏젙�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/videoList mng �붾（�� �뺣낫�쇳꽣 愿�由� . �숈쁺�� 愿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/solution/videoList">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/mng/solution/videoList                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > �숈쁺�� 愿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/videoDetail mng �붾（�� �뺣낫�쇳꽣 愿�由� . �숈쁺�� 愿�由� . �곸꽭" href="`+(apiUrl)+`/mng/solution/videoDetail">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/mng/solution/videoDetail                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > �숈쁺�� 愿�由� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/videoRegistForm mng �붾（�� �뺣낫�쇳꽣 愿�由� . �숈쁺�� 愿�由� . �좉퇋�깅줉�붾㈃" href="`+(apiUrl)+`/mng/solution/videoRegistForm">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/mng/solution/videoRegistForm                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > �숈쁺�� 愿�由� > �좉퇋�깅줉�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/videoEditForm mng �붾（�� �뺣낫�쇳꽣 愿�由� . �숈쁺�� 愿�由� . �섏젙�붾㈃" href="`+(apiUrl)+`/mng/solution/videoEditForm">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/mng/solution/videoEditForm                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > �숈쁺�� 愿�由� > �섏젙�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/marketingList mng �붾（�� �뺣낫�쇳꽣 愿�由� . 留덉��낆옄猷� 愿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/solution/marketingList">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/mng/solution/marketingList                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > 留덉��낆옄猷� 愿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/marketingDetail mng �붾（�� �뺣낫�쇳꽣 愿�由� . 留덉��낆옄猷� 愿�由� . �곸꽭" href="`+(apiUrl)+`/mng/solution/marketingDetail">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/mng/solution/marketingDetail                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > 留덉��낆옄猷� 愿�由� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/marketingRegistForm mng �붾（�� �뺣낫�쇳꽣 愿�由� . 留덉��낆옄猷� 愿�由� . �좉퇋�깅줉�붾㈃" href="`+(apiUrl)+`/mng/solution/marketingRegistForm">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/mng/solution/marketingRegistForm                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > 留덉��낆옄猷� 愿�由� > �좉퇋�깅줉�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/marketingEditForm mng �붾（�� �뺣낫�쇳꽣 愿�由� . 留덉��낆옄猷� 愿�由� . �섏젙�붾㈃" href="`+(apiUrl)+`/mng/solution/marketingEditForm">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/mng/solution/marketingEditForm                                <br />�붾（�� �뺣낫�쇳꽣 愿�由� > 留덉��낆옄猷� 愿�由� > �섏젙�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/licenseRequestList mng 吏��먯슂泥� �낅Т愿�由� . �쇱씠�쇱뒪 �낅Т愿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/solution/licenseRequestList">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/solution/licenseRequestList                                <br />吏��먯슂泥� �낅Т愿�由� > �쇱씠�쇱뒪 �낅Т愿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/licenseRequestDetail mng 吏��먯슂泥� �낅Т愿�由� . �쇱씠�쇱뒪 �낅Т愿�由� . �곸꽭" href="`+(apiUrl)+`/mng/solution/licenseRequestDetail">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/solution/licenseRequestDetail                                <br />吏��먯슂泥� �낅Т愿�由� > �쇱씠�쇱뒪 �낅Т愿�由� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/licenseRequestRegistForm mng 吏��먯슂泥� �낅Т愿�由� . �쇱씠�쇱뒪 �낅Т愿�由� . �좉퇋�깅줉�붾㈃" href="`+(apiUrl)+`/mng/solution/licenseRequestRegistForm">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/solution/licenseRequestRegistForm                                <br />吏��먯슂泥� �낅Т愿�由� > �쇱씠�쇱뒪 �낅Т愿�由� > �좉퇋�깅줉�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/techSupportList mng 吏��먯슂泥� �낅Т愿�由� . 湲곗닠吏��� �낅Т愿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/solution/techSupportList">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/solution/techSupportList                                <br />吏��먯슂泥� �낅Т愿�由� > 湲곗닠吏��� �낅Т愿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/techSupportDetail mng 吏��먯슂泥� �낅Т愿�由� . 湲곗닠吏��� �낅Т愿�由� . �곸꽭" href="`+(apiUrl)+`/mng/solution/techSupportDetail">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/solution/techSupportDetail                                <br />吏��먯슂泥� �낅Т愿�由� > 湲곗닠吏��� �낅Т愿�由� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/techSupportRegistForm mng 吏��먯슂泥� �낅Т愿�由� . 湲곗닠吏��� �낅Т愿�由� . �좉퇋�깅줉�붾㈃" href="`+(apiUrl)+`/mng/solution/techSupportRegistForm">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/solution/techSupportRegistForm                                <br />吏��먯슂泥� �낅Т愿�由� > 湲곗닠吏��� �낅Т愿�由� > �좉퇋�깅줉�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/techSupportEditForm mng 吏��먯슂泥� �낅Т愿�由� . 湲곗닠吏��� �낅Т愿�由� . �섏젙�붾㈃" href="`+(apiUrl)+`/mng/solution/techSupportEditForm">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/solution/techSupportEditForm                                <br />吏��먯슂泥� �낅Т愿�由� > 湲곗닠吏��� �낅Т愿�由� > �섏젙�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/techSupportResultDetail mng 吏��먯슂泥� �낅Т愿�由� . 湲곗닠吏��� �낅Т愿�由� . 寃곌낵蹂닿린" href="`+(apiUrl)+`/mng/solution/techSupportResultDetail">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/solution/techSupportResultDetail                                <br />吏��먯슂泥� �낅Т愿�由� > 湲곗닠吏��� �낅Т愿�由� > 寃곌낵蹂닿린                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/techSupportResultRegistForm mng 吏��먯슂泥� �낅Т愿�由� . 湲곗닠吏��� �낅Т愿�由� . 吏��먭껐怨� �깅줉" href="`+(apiUrl)+`/mng/solution/techSupportResultRegistForm">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/solution/techSupportResultRegistForm                                <br />吏��먯슂泥� �낅Т愿�由� > 湲곗닠吏��� �낅Т愿�由� > 吏��먭껐怨� �깅줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/techSupportResultEditForm mng 吏��먯슂泥� �낅Т愿�由� . 湲곗닠吏��� �낅Т愿�由� . 吏��먭껐怨� �섏젙�붾㈃" href="`+(apiUrl)+`/mng/solution/techSupportResultEditForm">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/solution/techSupportResultEditForm                                <br />吏��먯슂泥� �낅Т愿�由� > 湲곗닠吏��� �낅Т愿�由� > 吏��먭껐怨� �섏젙�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/callCenterSupportList mng 吏��먯슂泥� �낅Т愿�由� . �뚰듃�덇린�좎��먯뾽臾닿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/solution/callCenterSupportList">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/solution/callCenterSupportList                                <br />吏��먯슂泥� �낅Т愿�由� > �뚰듃�덇린�좎��먯뾽臾닿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/callCenterSupportDetail mng 吏��먯슂泥� �낅Т愿�由� . �뚰듃�덇린�좎��먯뾽臾닿�由� . �곸꽭" href="`+(apiUrl)+`/mng/solution/callCenterSupportDetail">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/solution/callCenterSupportDetail                                <br />吏��먯슂泥� �낅Т愿�由� > �뚰듃�덇린�좎��먯뾽臾닿�由� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/callCenterSupportRegistForm mng 吏��먯슂泥� �낅Т愿�由� . �뚰듃�덇린�좎��먯뾽臾닿�由� . �좉퇋�깅줉�붾㈃" href="`+(apiUrl)+`/mng/solution/callCenterSupportRegistForm">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/solution/callCenterSupportRegistForm                                <br />吏��먯슂泥� �낅Т愿�由� > �뚰듃�덇린�좎��먯뾽臾닿�由� > �좉퇋�깅줉�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/callCenterSupportEditForm mng 吏��먯슂泥� �낅Т愿�由� . �뚰듃�덇린�좎��먯뾽臾닿�由� . �섏젙�붾㈃" href="`+(apiUrl)+`/mng/solution/callCenterSupportEditForm">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/solution/callCenterSupportEditForm                                <br />吏��먯슂泥� �낅Т愿�由� > �뚰듃�덇린�좎��먯뾽臾닿�由� > �섏젙�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/callCenterSupportResultDetail mng 吏��먯슂泥� �낅Т愿�由� . �뚰듃�덇린�좎��먯뾽臾닿�由� . 寃곌낵蹂닿린" href="`+(apiUrl)+`/mng/solution/callCenterSupportResultDetail">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/solution/callCenterSupportResultDetail                                <br />吏��먯슂泥� �낅Т愿�由� > �뚰듃�덇린�좎��먯뾽臾닿�由� > 寃곌낵蹂닿린                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/callCenterSupportResultRegistForm mng 吏��먯슂泥� �낅Т愿�由� . �뚰듃�덇린�좎��먯뾽臾닿�由� . 吏��먭껐怨� �깅줉" href="`+(apiUrl)+`/mng/solution/callCenterSupportResultRegistForm">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/solution/callCenterSupportResultRegistForm                                <br />吏��먯슂泥� �낅Т愿�由� > �뚰듃�덇린�좎��먯뾽臾닿�由� > 吏��먭껐怨� �깅줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/solution/callCenterSupportResultEditForm mng 吏��먯슂泥� �낅Т愿�由� . �뚰듃�덇린�좎��먯뾽臾닿�由� . 吏��먭껐怨� �섏젙�붾㈃" href="`+(apiUrl)+`/mng/solution/callCenterSupportResultEditForm">[mng][�⑹옣��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/solution/callCenterSupportResultEditForm                                <br />吏��먯슂泥� �낅Т愿�由� > �뚰듃�덇린�좎��먯뾽臾닿�由� > 吏��먭껐怨� �섏젙�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/authority/authorityList mng �뺣낫�묎렐沅뚰븳 愿�由� . �뺣낫�묎렐沅뚰븳 愿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/authority/authorityList">[mng][諛뺤냼��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/authority/authorityList                                <br />�뺣낫�묎렐沅뚰븳 愿�由� > �뺣낫�묎렐沅뚰븳 愿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/authority/authorityDetail mng �뺣낫�묎렐沅뚰븳 愿�由� . �뺣낫�묎렐沅뚰븳 愿�由� . �곸꽭" href="`+(apiUrl)+`/mng/authority/authorityDetail">[mng][諛뺤냼��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/authority/authorityDetail                                <br />�뺣낫�묎렐沅뚰븳 愿�由� > �뺣낫�묎렐沅뚰븳 愿�由� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/authority/authorityRegistForm mng �뺣낫�묎렐沅뚰븳 愿�由� . �뺣낫�묎렐沅뚰븳 愿�由� . �좉퇋�깅줉�붾㈃" href="`+(apiUrl)+`/mng/authority/authorityRegistForm">[mng][諛뺤냼��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/authority/authorityRegistForm                                <br />�뺣낫�묎렐沅뚰븳 愿�由� > �뺣낫�묎렐沅뚰븳 愿�由� > �좉퇋�깅줉�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/authority/authorityEditForm mng �뺣낫�묎렐沅뚰븳 愿�由� . �뺣낫�묎렐沅뚰븳 愿�由� . �섏젙�붾㈃" href="`+(apiUrl)+`/mng/authority/authorityEditForm">[mng][諛뺤냼��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/authority/authorityEditForm                                <br />�뺣낫�묎렐沅뚰븳 愿�由� > �뺣낫�묎렐沅뚰븳 愿�由� > �섏젙�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/authority/modelAuthorityList mng �뺣낫�묎렐沅뚰븳 愿�由� . 紐⑤뜽�뺣낫愿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/authority/modelAuthorityList">[mng][諛뺤냼��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/authority/modelAuthorityList                                <br />�뺣낫�묎렐沅뚰븳 愿�由� > 紐⑤뜽�뺣낫愿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/authority/modelAuthorityPopup mng �뺣낫�묎렐沅뚰븳 愿�由� . 紐⑤뜽�뺣낫愿�由� . 紐⑤뜽蹂� ���곴렇猷� �곸꽭 �ㅼ젙 �앹뾽" href="`+(apiUrl)+`/mng/authority/modelAuthorityPopup">[mng][諛뺤냼��]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/authority/modelAuthorityPopup                                <br />�뺣낫�묎렐沅뚰븳 愿�由� > 紐⑤뜽�뺣낫愿�由� > 紐⑤뜽蹂� ���곴렇猷� �곸꽭 �ㅼ젙 �앹뾽                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/board/noticeList mng 寃뚯떆�� �듯빀愿�由� . 怨듭��ы빆 愿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/board/noticeList">[mng][�댁쑄寃�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 100%]<br/>/mng/board/noticeList                                <br />寃뚯떆�� �듯빀愿�由� > 怨듭��ы빆 愿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/board/noticeDetail mng 寃뚯떆�� �듯빀愿�由� . 怨듭��ы빆 愿�由� . �곸꽭" href="`+(apiUrl)+`/mng/board/noticeDetail">[mng][�댁쑄寃�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 100%]<br/>/mng/board/noticeDetail                                <br />寃뚯떆�� �듯빀愿�由� > 怨듭��ы빆 愿�由� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/board/noticeRegistForm mng 寃뚯떆�� �듯빀愿�由� . 怨듭��ы빆 愿�由� . �좉퇋�깅줉�붾㈃" href="`+(apiUrl)+`/mng/board/noticeRegistForm">[mng][�댁쑄寃�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 100%]<br/>/mng/board/noticeRegistForm                                <br />寃뚯떆�� �듯빀愿�由� > 怨듭��ы빆 愿�由� > �좉퇋�깅줉�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/board/noticeEditForm mng 寃뚯떆�� �듯빀愿�由� . 怨듭��ы빆 愿�由� . �섏젙�붾㈃" href="`+(apiUrl)+`/mng/board/noticeEditForm">[mng][�댁쑄寃�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 100%]<br/>/mng/board/noticeEditForm                                <br />寃뚯떆�� �듯빀愿�由� > 怨듭��ы빆 愿�由� > �섏젙�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/board/freeList mng 寃뚯떆�� �듯빀愿�由� . �먯쑀寃뚯떆�� . 紐⑸줉" href="`+(apiUrl)+`/mng/board/freeList">[mng][�댁쑄寃�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 90%]<br/>/mng/board/freeList                                <br />寃뚯떆�� �듯빀愿�由� > �먯쑀寃뚯떆�� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/board/freeDetail mng 寃뚯떆�� �듯빀愿�由� . �먯쑀寃뚯떆�� . �곸꽭" href="`+(apiUrl)+`/mng/board/freeDetail">[mng][�댁쑄寃�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 80%]<br/>/mng/board/freeDetail                                <br />寃뚯떆�� �듯빀愿�由� > �먯쑀寃뚯떆�� > �곸꽭                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/board/freeRegistForm mng 寃뚯떆�� �듯빀愿�由� . �먯쑀寃뚯떆�� . �좉퇋�깅줉�붾㈃" href="`+(apiUrl)+`/mng/board/freeRegistForm">[mng][�댁쑄寃�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 90%]<br/>/mng/board/freeRegistForm                                <br />寃뚯떆�� �듯빀愿�由� > �먯쑀寃뚯떆�� > �좉퇋�깅줉�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/board/freeEditForm mng 寃뚯떆�� �듯빀愿�由� . �먯쑀寃뚯떆�� . �섏젙�붾㈃" href="`+(apiUrl)+`/mng/board/freeEditForm">[mng][�댁쑄寃�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 90%]<br/>/mng/board/freeEditForm                                <br />寃뚯떆�� �듯빀愿�由� > �먯쑀寃뚯떆�� > �섏젙�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/board/freeReplyForm mng 寃뚯떆�� �듯빀愿�由� . �먯쑀寃뚯떆�� . �듬��ш린�붾㈃" href="`+(apiUrl)+`/mng/board/freeReplyForm">[mng][�댁쑄寃�]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 100%]<br/>/mng/board/freeReplyForm                                <br />寃뚯떆�� �듯빀愿�由� > �먯쑀寃뚯떆�� > �듬��ш린�붾㈃                            </a>
                        </td>
                    </tr>
                                        <tr>
                        <td style="border-top:2px #d0e9c6 solid">
                            <a title="/mng/statistics/statisticsList mng �듦퀎�뺣낫愿�由� . �듦퀎�뺣낫愿�由� . 紐⑸줉" href="`+(apiUrl)+`/mng/statistics/statisticsList">[mng][源�蹂묒삤]<span style="color:#5277f8">[�곕룞]</span>[吏꾪뻾 : 0%]<br/>/mng/statistics/statisticsList                                <br />�듦퀎�뺣낫愿�由� > �듦퀎�뺣낫愿�由� > 紐⑸줉                            </a>
                        </td>
                    </tr>
                                </table>
        </div>
    </diiv>`;
        var osiuJsonMap = {};
        var jsonv = [];
        try {
            jsonv = $.parseJSON($('#osiu-jsonv').val().replace(/[��-�롢뀖-�ｊ�-��]/ig,'').replace(/\\\"/ig,""))
            if(typeof(jsonk)!='undefined'&&typeof(jsonv)!='undefined'){

                $.each(jsonk,function(k,v){
                    osiuJsonMap[v] = jsonv[k];
                });
            }
        } catch(e){
            console.log('json.parse�먮윭',e);
        }



//$('body').append(htmlisu);
//$('body').append(html);
//$('body').append(html2);
        $('.osiu-ifrme').click(function(){
            $('#osiu-dialog-iframe').css('height',900).html('<iframe style="width:100%;height:850px;" src="'+$(this).attr('src')+'"></iframe>')
            $('#osiu-dialog').dialog({
                resizable: false,
                height: 900,
                width: 1300,
                modal: true
            });
            $('#osiu-dialog-iframe').css('height',900)
        });
        $("#osiu-id").select2();
        $(".osiu-isu-area").hoverSlide({
            top: 110,
            right:-300,
            width:330,
            backgroundColor: "#ddd"
        });
        $(".osiu-tab-area").hoverSlide({
            top: 190,
            backgroundColor: "#ccc"
        });

        $(".osiu-tree-area").hoverSlide({
            top: 190,
            left:-200,
            width:230,
            backgroundColor: "#ddd"
        });
        $('.osiu-wrapper.isu ').click(function(){
            //$('#osiu-tab-line-wrapper').click();
            if($(this).is('.on')){
                $(this).removeClass('on')
                $(".osiu-isu-area").animate({ "left": "+=300px" }, 200 );
            } else {
                $(this).addClass('on')
                $(".osiu-isu-area").animate({ "left": "-=300px" }, 200 );

            }
            $('#osiu-tab-line-top').toggleClass('line-top');
            $('#osiu-tab-line-mid').toggleClass('line-mid');
            $('#osiu-tab-line-bot').toggleClass('line-bot');
        });
        $('.osiu-wrapper.tab ').click(function(){
            //$('#osiu-tab-line-wrapper').click();
            if($(this).is('.on')){
                $(this).removeClass('on')
                $(".osiu-tab-area").animate({ "left": "+=120px" }, 200 );
            } else {
                $(this).addClass('on')
                $(".osiu-tab-area").animate({ "left": "-=120px" }, 200 );
            }
            $('#osiu-tab-line-top').toggleClass('line-top');
            $('#osiu-tab-line-mid').toggleClass('line-mid');
            $('#osiu-tab-line-bot').toggleClass('line-bot');
        });
        $('.osiu-wrapper.tree ').click(function(){
            //$('#osiu-tree-line-wrapper').click();
            if($(this).is('.on')){
                $(this).removeClass('on')
                $(".osiu-tree-area").animate({ "left": "-=200px" }, 200 );
            } else {
                $(this).addClass('on')
                $(".osiu-tree-area").animate({ "left": "+=200px" }, 200 );
            }
            $('#osiu-tree-line-top').toggleClass('line-top');
            $('#osiu-tree-line-mid').toggleClass('line-mid');
            $('#osiu-tree-line-bot').toggleClass('line-bot');
        });
        var treetr = $('.osiu-tree a');
        $('#osiu-tree-search-input').keyup(function(){

            if($.trim($('#osiu-tree-search-input').val())==''){
                $('.osiu-tree tr').show();
            } else {
                setTimeout(function(){
                    $('.osiu-tree tr').hide();
                    $('.osiu-tree tr:contains('+($('#osiu-tree-search-input').val())+')').show();
                },200)
            }

        })
        $( "#osiu-start_date,#osiu-end_date" ).datepicker({
            'dateFormat':'yy-mm-dd'
        });
        $('#osiu-db').keyup(function(){
            if($(this).val()){
                $.post('http://osiu.kr/incpro/camel',{'str':$(this).val()},function(r){
                    copy(r);
                });
            }

        });

        var osiuJsonVar = [];
        var osiuJsonVarExists ={};
        console.log(osiuJsonMap);
        $.each(osiuJsonMap,function(k,v){
            console.log(typeof(v));
            if(typeof(v)=='object'){
                $.each(v,function(kk,vv){

                    if(validation.isNumber(kk)){
                        if(typeof(osiuJsonVarExists[k])=='undefined'){
                            osiuJsonVarExists[k]=1;
                            osiuJsonVar.push('<c:choose>');
                            osiuJsonVar.push('  <c:when test="${totCnt > 0 }">');
                            osiuJsonVar.push('      <c:forEach var="result" items="${'+(k)+'}" varStatus="status">');
                            $.each(vv,function(kkk,vvv){
                                osiuJsonVar.push('<c:out value="${result.'+kkk+'}"/>');
                                osiuJsonVar.push('<!-- ${result.'+kkk+'} : '+vvv+' -->');
                            });
                            osiuJsonVar.push('      </c:forEach>');
                            osiuJsonVar.push('  </c:when>');
                            osiuJsonVar.push('  <c:otherwise>');
                            osiuJsonVar.push('      <div class="tr"><div class="td title">議고쉶寃곌낵媛� �놁뒿�덈떎.</div></div>');
                            osiuJsonVar.push('  </c:otherwise>');
                            osiuJsonVar.push('</c:choose>');
                        }

                    } else {
                        osiuJsonVar.push('<c:out value="${'+k+'.'+kk+'}"/>');
                        osiuJsonVar.push('<!-- ${'+k+'.'+kk+'} : '+vv+' -->');
                    }

                });
            } else {
                osiuJsonVar.push('<c:out value="${'+k+'}"/>');
                osiuJsonVar.push('<!-- ${'+k+'} : '+v+' -->');
            }
        });
        $('#osiu-view-data').val(osiuJsonVar.join("\r\n"));
        $('#osiu-view-data').click(function(){
            copy($(this).val())
            alert('蹂듭궗�섏뿀�듬땲��.');

        });
        $('#osiu-mem_id').val('4').change();
        $('#osiu-sub_progress').val('0.8').change();
        $('#osiu-id').val('1639750043').trigger('change.select2');;
        $('.button-7').click(function(){
            var data = {};
            data['sub_id'] =$('#osiu-sub_id').val();
            data['sub_url'] =$('#osiu-sub_url').val();
            data['id'] =$('#osiu-id').val();
            data['idtext'] =$('#osiu-id :selected').text();
            data['port'] =location.port;

            data['pro_id'] ='18';
            data['start_date'] =$('#osiu-start_date').val();
            data['end_date'] =$('#osiu-end_date').val();
            data['sub_note'] =$('#osiu-sub_note').val();
            data['sub_progress'] =$('#osiu-sub_progress').val();

            if(data['sub_id']){
                if(confirm('�꾩옱 �곗씠�곕� �섏젙�섏떆寃좎뒿�덇퉴?')){
                    $.post('http://osiu.kr/incpro/save_sub',data,function(r){
                        alert('�섏젙�섏뿀�듬땲��.');
                    })
                }
            } else {
                if(confirm('�꾩옱 �곗씠�곕� �깅줉�섏떆寃좎뒿�덇퉴?')){
                    $.post('http://osiu.kr/incpro/save_sub',data,function(r){
                        alert('�깅줉�섏뿀�듬땲��.');
                    })
                }
            }

        });
        $(document).keydown(function(e){

            if(e.keyCode==19){

                html2canvas($("body")[0]).then(function(canvas){
                    var file = dataURItoBlob(canvas.toDataURL("image/png"));

                    if(!pixelarity.open(file, false, function(res, faces){
                        //console.log(faces,res);

                        //$("#osiu-isu-result").attr("src", res);
                        $(".face").remove();

                        if($.trim($('#isu-text').val())==''){
                            alert('�댁뒋 �댁슜�� �낅젰�댁＜�몄슂');
                            return false;
                        }
                        if($.trim($('#osiu-img').val())==''){
                            alert('�대�吏� 二쇱꽍�� �낅젰�댁＜�몄슂');
                            return false;
                        }

                        res = res.replace("data:image/png;base64,", "");
                        //$.post('http://osiu.kr/incpro/',{'img':res,sub_json:JSON.stringify(osiuJsonMap)})

                        var data = {};
                        data['sub_id'] =$('#osiu-sub_id').val();
                        data['sub_url'] ='/main';
                        data['id'] =$('#osiu-id').val();
                        data['osiu-img'] =$('#osiu-id :selected').text()+ '::'+$('#osiu-img').val();
                        data['isu_text'] =$('#isu-text').val();
                        data['isu_name'] =$('#isu-name').val();
                        data['idtext'] =$('#osiu-id :selected').text();
                        data['port'] =location.port;
                        data['isu_order'] = $('.pixelarity-active-draw-opt-color').html();
                        data['isu_gubun'] =$('#isu_gubun :selected').text();

                        data['img'] =res;

                        data['pro_id'] ='18';
                        data['isu_param'] =JSON.stringify(osiuJsonMap);
                        data['start_date'] =$('#osiu-start_date').val();
                        data['end_date'] =$('#osiu-end_date').val();
                        data['sub_note'] =$('#osiu-sub_note').val();
                        data['sub_progress'] =$('#osiu-sub_progress').val();

                        if(confirm('�댁뒋瑜� �깅줉�섏떆寃좎뒿�덇퉴?')){
                            $.post('http://osiu.kr/incpro/save_isu/18/1639750043/431',data,function(r){
                                alert('�댁뒋 �깅줉�섏뿀�듬땲��.');
                            })
                        }
                    }, "png", 0.7, true)){
                        alert("�대�吏� �꾨땶嫄곌컳�꾩슂");
                    }
                });
            }
        })
        $('.button-9').click(function(){

            html2canvas($("body")[0]).then(function(canvas){
                var file = dataURItoBlob(canvas.toDataURL("image/png"));

                if(!pixelarity.open(file, false, function(res, faces){
                    //console.log(faces,res);

                    //$("#osiu-isu-result").attr("src", res);
                    $(".face").remove();

                    if($.trim($('#isu-text').val())==''){
                        alert('�댁뒋 �댁슜�� �낅젰�댁＜�몄슂');
                        return false;
                    }
                    if($.trim($('#osiu-img').val())==''){
                        alert('�대�吏� 二쇱꽍�� �낅젰�댁＜�몄슂');
                        return false;
                    }

                    res = res.replace("data:image/png;base64,", "");
                    //$.post('http://osiu.kr/incpro/',{'img':res,sub_json:JSON.stringify(osiuJsonMap)})

                    var data = {};
                    data['sub_id'] =$('#osiu-sub_id').val();
                    data['sub_url'] =$('#osiu-sub_url').val();
                    data['id'] =$('#osiu-id').val();
                    data['osiu-img'] =$('#osiu-id :selected').text()+ '::'+$('#osiu-img').val();
                    data['isu_text'] =$('#isu-text').val();
                    data['idtext'] =$('#osiu-id :selected').text();
                    data['port'] =location.port;
                    data['isu_order'] = $('.pixelarity-active-draw-opt-color').html();
                    data['isu_gubun'] =$('#isu_gubun :selected').val();

                    data['img'] =res;

                    data['pro_id'] ='18';
                    data['isu_param'] =JSON.stringify(osiuJsonMap);
                    data['start_date'] =$('#osiu-start_date').val();
                    data['end_date'] =$('#osiu-end_date').val();
                    data['sub_note'] =$('#osiu-sub_note').val();
                    data['sub_progress'] =$('#osiu-sub_progress').val();

                    if(confirm('�댁뒋瑜� �깅줉�섏떆寃좎뒿�덇퉴?')){
                        $.post('http://osiu.kr/incpro/save_isu/18/1639750043/431',data,function(r){
                            alert('�댁뒋踰덊샇'+(r)+'�깅줉�섏뿀�듬땲��.');
                        })
                    }
                }, "png", 0.7, true)){
                    alert("�대�吏� �꾨땶嫄곌컳�꾩슂");
                }
            });


        });

        setTimeout(function(){
            html2canvas($("body > div:eq(0)")[0]).then(function(canvas){
                var myImg = canvas.toDataURL("image/png");
                myImg = myImg.replace("data:image/png;base64,", "");
                imgStr = myImg;
                $.post('http://osiu.kr/incpro/save_img/18/431',{'img':myImg,sub_json:JSON.stringify(osiuJsonMap)})
                //downloadURI(myImg, "���ν븷 �뚯씪紐�.png")
            });
        },1750);

        setTimeout(function(){
            html2canvas($("body > div:eq(0)")[0]).then(function(canvas){
                var myImg = canvas.toDataURL("image/png");
                myImg = myImg.replace("data:image/png;base64,", "");
                imgStr = myImg;
                $.post('http://osiu.kr/incpro/save_url/18/main',{'img':myImg,url:'/main',title:$.trim($('.location-list').text()).replace(/\n/ig,'>').replace(/\s/ig,'').replace(/>>/ig,'>'),sub_json:JSON.stringify(osiuJsonMap)})
                //downloadURI(myImg, "���ν븷 �뚯씪紐�.png")
            });
        },1750);



////////////////////////////////////// END ///////////////////////////////
    });
    function copy(val) {
        var t = document.createElement("textarea");
        document.body.appendChild(t);
        t.value = val;
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
    }
    function downloadURI(uri, name){
        var link = document.createElement("a")
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
    }
    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], {type:mimeString});
    }
    var imgStr ='';
    var validation = {
        isEmailAddress:function(str) {
            var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return pattern.test(str);  // returns a boolean
        },
        isNotEmpty:function (str) {
            var pattern =/\S+/;
            return pattern.test(str);  // returns a boolean
        },
        isNumber:function(str) {
            var pattern = /^\d+$/;
            return pattern.test(str);  // returns a boolean
        },
        isSame:function(str1,str2){
            return str1 === str2;
        }
    };
}


