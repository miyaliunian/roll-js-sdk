
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ncz = factory());
})(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var fails$e = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$d = fails$e;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$d(function () {
	  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var fails$c = fails$e;

	var functionBindNative = !fails$c(function () {
	  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$2 = functionBindNative;

	var FunctionPrototype$2 = Function.prototype;
	var bind = FunctionPrototype$2.bind;
	var call$a = FunctionPrototype$2.call;
	var uncurryThis$e = NATIVE_BIND$2 && bind.bind(call$a, call$a);

	var functionUncurryThis = NATIVE_BIND$2 ? function (fn) {
	  return fn && uncurryThis$e(fn);
	} : function (fn) {
	  return fn && function () {
	    return call$a.apply(fn, arguments);
	  };
	};

	var $TypeError$6 = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$4 = function (it) {
	  if (it == undefined) throw $TypeError$6("Can't call method on " + it);
	  return it;
	};

	var requireObjectCoercible$3 = requireObjectCoercible$4;

	var $Object$3 = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$1 = function (argument) {
	  return $Object$3(requireObjectCoercible$3(argument));
	};

	var uncurryThis$d = functionUncurryThis;
	var toObject = toObject$1;

	var hasOwnProperty = uncurryThis$d({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es-x/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject(it), key);
	};

	var DESCRIPTORS$7 = descriptors;
	var hasOwn$7 = hasOwnProperty_1;

	var FunctionPrototype$1 = Function.prototype;
	// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$7 && Object.getOwnPropertyDescriptor;

	var EXISTS$1 = hasOwn$7(FunctionPrototype$1, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS$1 && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE$1 = EXISTS$1 && (!DESCRIPTORS$7 || (DESCRIPTORS$7 && getDescriptor(FunctionPrototype$1, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS$1,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE$1
	};

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable$d = function (argument) {
	  return typeof argument == 'function';
	};

	var objectDefineProperty = {};

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$d =
	  // eslint-disable-next-line es-x/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var isCallable$c = isCallable$d;

	var isObject$6 = function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$c(it);
	};

	var global$c = global$d;
	var isObject$5 = isObject$6;

	var document$1 = global$c.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject$5(document$1) && isObject$5(document$1.createElement);

	var documentCreateElement$1 = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$6 = descriptors;
	var fails$b = fails$e;
	var createElement = documentCreateElement$1;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$6 && !fails$b(function () {
	  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$5 = descriptors;
	var fails$a = fails$e;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$5 && fails$a(function () {
	  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype != 42;
	});

	var isObject$4 = isObject$6;

	var $String$2 = String;
	var $TypeError$5 = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$8 = function (argument) {
	  if (isObject$4(argument)) return argument;
	  throw $TypeError$5($String$2(argument) + ' is not an object');
	};

	var NATIVE_BIND$1 = functionBindNative;

	var call$9 = Function.prototype.call;

	var functionCall = NATIVE_BIND$1 ? call$9.bind(call$9) : function () {
	  return call$9.apply(call$9, arguments);
	};

	var global$b = global$d;
	var isCallable$b = isCallable$d;

	var aFunction = function (argument) {
	  return isCallable$b(argument) ? argument : undefined;
	};

	var getBuiltIn$5 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(global$b[namespace]) : global$b[namespace] && global$b[namespace][method];
	};

	var uncurryThis$c = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$c({}.isPrototypeOf);

	var getBuiltIn$4 = getBuiltIn$5;

	var engineUserAgent = getBuiltIn$4('navigator', 'userAgent') || '';

	var global$a = global$d;
	var userAgent = engineUserAgent;

	var process = global$a.process;
	var Deno = global$a.Deno;
	var versions = process && process.versions || Deno && Deno.version;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version && userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var engineV8Version = version;

	/* eslint-disable es-x/no-symbol -- required for testing */

	var V8_VERSION = engineV8Version;
	var fails$9 = fails$e;

	// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$9(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
	});

	/* eslint-disable es-x/no-symbol -- required for testing */

	var NATIVE_SYMBOL$2 = nativeSymbol;

	var useSymbolAsUid = NATIVE_SYMBOL$2
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var getBuiltIn$3 = getBuiltIn$5;
	var isCallable$a = isCallable$d;
	var isPrototypeOf$1 = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var $Object$2 = Object;

	var isSymbol$3 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$3('Symbol');
	  return isCallable$a($Symbol) && isPrototypeOf$1($Symbol.prototype, $Object$2(it));
	};

	var $String$1 = String;

	var tryToString$1 = function (argument) {
	  try {
	    return $String$1(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var isCallable$9 = isCallable$d;
	var tryToString = tryToString$1;

	var $TypeError$4 = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$1 = function (argument) {
	  if (isCallable$9(argument)) return argument;
	  throw $TypeError$4(tryToString(argument) + ' is not a function');
	};

	var aCallable = aCallable$1;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$2 = function (V, P) {
	  var func = V[P];
	  return func == null ? undefined : aCallable(func);
	};

	var call$8 = functionCall;
	var isCallable$8 = isCallable$d;
	var isObject$3 = isObject$6;

	var $TypeError$3 = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$8(fn = input.toString) && !isObject$3(val = call$8(fn, input))) return val;
	  if (isCallable$8(fn = input.valueOf) && !isObject$3(val = call$8(fn, input))) return val;
	  if (pref !== 'string' && isCallable$8(fn = input.toString) && !isObject$3(val = call$8(fn, input))) return val;
	  throw $TypeError$3("Can't convert object to primitive value");
	};

	var shared$4 = {exports: {}};

	var global$9 = global$d;

	// eslint-disable-next-line es-x/no-object-defineproperty -- safe
	var defineProperty$1 = Object.defineProperty;

	var defineGlobalProperty$3 = function (key, value) {
	  try {
	    defineProperty$1(global$9, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$9[key] = value;
	  } return value;
	};

	var global$8 = global$d;
	var defineGlobalProperty$2 = defineGlobalProperty$3;

	var SHARED = '__core-js_shared__';
	var store$3 = global$8[SHARED] || defineGlobalProperty$2(SHARED, {});

	var sharedStore = store$3;

	var store$2 = sharedStore;

	(shared$4.exports = function (key, value) {
	  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.24.1',
	  mode: 'global',
	  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.24.1/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var uncurryThis$b = functionUncurryThis;

	var id = 0;
	var postfix = Math.random();
	var toString$5 = uncurryThis$b(1.0.toString);

	var uid$2 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$5(++id + postfix, 36);
	};

	var global$7 = global$d;
	var shared$3 = shared$4.exports;
	var hasOwn$6 = hasOwnProperty_1;
	var uid$1 = uid$2;
	var NATIVE_SYMBOL$1 = nativeSymbol;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var WellKnownSymbolsStore = shared$3('wks');
	var Symbol$1 = global$7.Symbol;
	var symbolFor = Symbol$1 && Symbol$1['for'];
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

	var wellKnownSymbol$4 = function (name) {
	  if (!hasOwn$6(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL$1 || typeof WellKnownSymbolsStore[name] == 'string')) {
	    var description = 'Symbol.' + name;
	    if (NATIVE_SYMBOL$1 && hasOwn$6(Symbol$1, name)) {
	      WellKnownSymbolsStore[name] = Symbol$1[name];
	    } else if (USE_SYMBOL_AS_UID && symbolFor) {
	      WellKnownSymbolsStore[name] = symbolFor(description);
	    } else {
	      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
	    }
	  } return WellKnownSymbolsStore[name];
	};

	var call$7 = functionCall;
	var isObject$2 = isObject$6;
	var isSymbol$2 = isSymbol$3;
	var getMethod$1 = getMethod$2;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$3 = wellKnownSymbol$4;

	var $TypeError$2 = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol$3('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$1 = function (input, pref) {
	  if (!isObject$2(input) || isSymbol$2(input)) return input;
	  var exoticToPrim = getMethod$1(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$7(exoticToPrim, input, pref);
	    if (!isObject$2(result) || isSymbol$2(result)) return result;
	    throw $TypeError$2("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive = toPrimitive$1;
	var isSymbol$1 = isSymbol$3;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$2 = function (argument) {
	  var key = toPrimitive(argument, 'string');
	  return isSymbol$1(key) ? key : key + '';
	};

	var DESCRIPTORS$4 = descriptors;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$7 = anObject$8;
	var toPropertyKey$1 = toPropertyKey$2;

	var $TypeError$1 = TypeError;
	// eslint-disable-next-line es-x/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;
	// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$4 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
	  anObject$7(O);
	  P = toPropertyKey$1(P);
	  anObject$7(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor$1(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty(O, P, Attributes);
	} : $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject$7(O);
	  P = toPropertyKey$1(P);
	  anObject$7(Attributes);
	  if (IE8_DOM_DEFINE$1) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw $TypeError$1('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var makeBuiltIn$2 = {exports: {}};

	var uncurryThis$a = functionUncurryThis;
	var isCallable$7 = isCallable$d;
	var store$1 = sharedStore;

	var functionToString = uncurryThis$a(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$7(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	var inspectSource$2 = store$1.inspectSource;

	var global$6 = global$d;
	var isCallable$6 = isCallable$d;
	var inspectSource$1 = inspectSource$2;

	var WeakMap$1 = global$6.WeakMap;

	var nativeWeakMap = isCallable$6(WeakMap$1) && /native code/.test(inspectSource$1(WeakMap$1));

	var createPropertyDescriptor$2 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var DESCRIPTORS$3 = descriptors;
	var definePropertyModule$3 = objectDefineProperty;
	var createPropertyDescriptor$1 = createPropertyDescriptor$2;

	var createNonEnumerableProperty$3 = DESCRIPTORS$3 ? function (object, key, value) {
	  return definePropertyModule$3.f(object, key, createPropertyDescriptor$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var shared$2 = shared$4.exports;
	var uid = uid$2;

	var keys = shared$2('keys');

	var sharedKey$2 = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys$4 = {};

	var NATIVE_WEAK_MAP = nativeWeakMap;
	var global$5 = global$d;
	var uncurryThis$9 = functionUncurryThis;
	var isObject$1 = isObject$6;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$3;
	var hasOwn$5 = hasOwnProperty_1;
	var shared$1 = sharedStore;
	var sharedKey$1 = sharedKey$2;
	var hiddenKeys$3 = hiddenKeys$4;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$1 = global$5.TypeError;
	var WeakMap = global$5.WeakMap;
	var set, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$1(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError$1('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared$1.state) {
	  var store = shared$1.state || (shared$1.state = new WeakMap());
	  var wmget = uncurryThis$9(store.get);
	  var wmhas = uncurryThis$9(store.has);
	  var wmset = uncurryThis$9(store.set);
	  set = function (it, metadata) {
	    if (wmhas(store, it)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    wmset(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget(store, it) || {};
	  };
	  has = function (it) {
	    return wmhas(store, it);
	  };
	} else {
	  var STATE = sharedKey$1('state');
	  hiddenKeys$3[STATE] = true;
	  set = function (it, metadata) {
	    if (hasOwn$5(it, STATE)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$2(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return hasOwn$5(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$5(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var fails$8 = fails$e;
	var isCallable$5 = isCallable$d;
	var hasOwn$4 = hasOwnProperty_1;
	var DESCRIPTORS$2 = descriptors;
	var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
	var inspectSource = inspectSource$2;
	var InternalStateModule = internalState;

	var enforceInternalState = InternalStateModule.enforce;
	var getInternalState$1 = InternalStateModule.get;
	// eslint-disable-next-line es-x/no-object-defineproperty -- safe
	var defineProperty = Object.defineProperty;

	var CONFIGURABLE_LENGTH = DESCRIPTORS$2 && !fails$8(function () {
	  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
	});

	var TEMPLATE = String(String).split('String');

	var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
	  if (String(name).slice(0, 7) === 'Symbol(') {
	    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
	  }
	  if (options && options.getter) name = 'get ' + name;
	  if (options && options.setter) name = 'set ' + name;
	  if (!hasOwn$4(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
	    if (DESCRIPTORS$2) defineProperty(value, 'name', { value: name, configurable: true });
	    else value.name = name;
	  }
	  if (CONFIGURABLE_LENGTH && options && hasOwn$4(options, 'arity') && value.length !== options.arity) {
	    defineProperty(value, 'length', { value: options.arity });
	  }
	  try {
	    if (options && hasOwn$4(options, 'constructor') && options.constructor) {
	      if (DESCRIPTORS$2) defineProperty(value, 'prototype', { writable: false });
	    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
	    } else if (value.prototype) value.prototype = undefined;
	  } catch (error) { /* empty */ }
	  var state = enforceInternalState(value);
	  if (!hasOwn$4(state, 'source')) {
	    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
	  } return value;
	};

	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	// eslint-disable-next-line no-extend-native -- required
	Function.prototype.toString = makeBuiltIn$1(function toString() {
	  return isCallable$5(this) && getInternalState$1(this).source || inspectSource(this);
	}, 'toString');

	var isCallable$4 = isCallable$d;
	var definePropertyModule$2 = objectDefineProperty;
	var makeBuiltIn = makeBuiltIn$2.exports;
	var defineGlobalProperty$1 = defineGlobalProperty$3;

	var defineBuiltIn$3 = function (O, key, value, options) {
	  if (!options) options = {};
	  var simple = options.enumerable;
	  var name = options.name !== undefined ? options.name : key;
	  if (isCallable$4(value)) makeBuiltIn(value, name, options);
	  if (options.global) {
	    if (simple) O[key] = value;
	    else defineGlobalProperty$1(key, value);
	  } else {
	    try {
	      if (!options.unsafe) delete O[key];
	      else if (O[key]) simple = true;
	    } catch (error) { /* empty */ }
	    if (simple) O[key] = value;
	    else definePropertyModule$2.f(O, key, {
	      value: value,
	      enumerable: false,
	      configurable: !options.nonConfigurable,
	      writable: !options.nonWritable
	    });
	  } return O;
	};

	var wellKnownSymbol$2 = wellKnownSymbol$4;

	var TO_STRING_TAG$1 = wellKnownSymbol$2('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var uncurryThis$8 = functionUncurryThis;

	var toString$4 = uncurryThis$8({}.toString);
	var stringSlice$2 = uncurryThis$8(''.slice);

	var classofRaw$1 = function (it) {
	  return stringSlice$2(toString$4(it), 8, -1);
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var isCallable$3 = isCallable$d;
	var classofRaw = classofRaw$1;
	var wellKnownSymbol$1 = wellKnownSymbol$4;

	var TO_STRING_TAG = wellKnownSymbol$1('toStringTag');
	var $Object$1 = Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$4 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = $Object$1(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && isCallable$3(O.callee) ? 'Arguments' : result;
	};

	var classof$3 = classof$4;

	var $String = String;

	var toString$3 = function (argument) {
	  if (classof$3(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return $String(argument);
	};

	var anObject$6 = anObject$8;

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags$1 = function () {
	  var that = anObject$6(this);
	  var result = '';
	  if (that.hasIndices) result += 'd';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.unicodeSets) result += 'v';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var call$6 = functionCall;
	var hasOwn$3 = hasOwnProperty_1;
	var isPrototypeOf = objectIsPrototypeOf;
	var regExpFlags = regexpFlags$1;

	var RegExpPrototype$2 = RegExp.prototype;

	var regexpGetFlags = function (R) {
	  var flags = R.flags;
	  return flags === undefined && !('flags' in RegExpPrototype$2) && !hasOwn$3(R, 'flags') && isPrototypeOf(RegExpPrototype$2, R)
	    ? call$6(regExpFlags, R) : flags;
	};

	var PROPER_FUNCTION_NAME = functionName.PROPER;
	var defineBuiltIn$2 = defineBuiltIn$3;
	var anObject$5 = anObject$8;
	var $toString = toString$3;
	var fails$7 = fails$e;
	var getRegExpFlags = regexpGetFlags;

	var TO_STRING = 'toString';
	var RegExpPrototype$1 = RegExp.prototype;
	var n$ToString = RegExpPrototype$1[TO_STRING];

	var NOT_GENERIC = fails$7(function () { return n$ToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING;

	// `RegExp.prototype.toString` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  defineBuiltIn$2(RegExp.prototype, TO_STRING, function toString() {
	    var R = anObject$5(this);
	    var pattern = $toString(R.source);
	    var flags = $toString(getRegExpFlags(R));
	    return '/' + pattern + '/' + flags;
	  }, { unsafe: true });
	}

	var objectGetOwnPropertyDescriptor = {};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$1(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;

	var uncurryThis$7 = functionUncurryThis;
	var fails$6 = fails$e;
	var classof$2 = classofRaw$1;

	var $Object = Object;
	var split = uncurryThis$7(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$6(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$2(it) == 'String' ? split(it, '') : $Object(it);
	} : $Object;

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject = indexedObject;
	var requireObjectCoercible$2 = requireObjectCoercible$4;

	var toIndexedObject$4 = function (it) {
	  return IndexedObject(requireObjectCoercible$2(it));
	};

	var DESCRIPTORS$1 = descriptors;
	var call$5 = functionCall;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var createPropertyDescriptor = createPropertyDescriptor$2;
	var toIndexedObject$3 = toIndexedObject$4;
	var toPropertyKey = toPropertyKey$2;
	var hasOwn$2 = hasOwnProperty_1;
	var IE8_DOM_DEFINE = ie8DomDefine;

	// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$1 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$3(O);
	  P = toPropertyKey(P);
	  if (IE8_DOM_DEFINE) try {
	    return $getOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$2(O, P)) return createPropertyDescriptor(!call$5(propertyIsEnumerableModule.f, O, P), O[P]);
	};

	var objectGetOwnPropertyNames = {};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es-x/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor : ceil)(n);
	};

	var trunc = mathTrunc;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$3 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};

	var toIntegerOrInfinity$2 = toIntegerOrInfinity$3;

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$1 = function (index, length) {
	  var integer = toIntegerOrInfinity$2(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	var toIntegerOrInfinity$1 = toIntegerOrInfinity$3;

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$2 = function (argument) {
	  return argument > 0 ? min(toIntegerOrInfinity$1(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength$1 = toLength$2;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$1 = function (obj) {
	  return toLength$1(obj.length);
	};

	var toIndexedObject$2 = toIndexedObject$4;
	var toAbsoluteIndex = toAbsoluteIndex$1;
	var lengthOfArrayLike = lengthOfArrayLike$1;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$1 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$2($this);
	    var length = lengthOfArrayLike(O);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod$1(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$1(false)
	};

	var uncurryThis$6 = functionUncurryThis;
	var hasOwn$1 = hasOwnProperty_1;
	var toIndexedObject$1 = toIndexedObject$4;
	var indexOf$1 = arrayIncludes.indexOf;
	var hiddenKeys$2 = hiddenKeys$4;

	var push = uncurryThis$6([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$1(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$1(hiddenKeys$2, key) && hasOwn$1(O, key) && push(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$1(O, key = names[i++])) {
	    ~indexOf$1(result, key) || push(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys$3 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$2 = enumBugKeys$3;

	var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys$1(O, hiddenKeys$1);
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn$2 = getBuiltIn$5;
	var uncurryThis$5 = functionUncurryThis;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var anObject$4 = anObject$8;

	var concat = uncurryThis$5([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys$1 = getBuiltIn$2('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject$4(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
	};

	var hasOwn = hasOwnProperty_1;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule$1 = objectDefineProperty;

	var copyConstructorProperties$1 = function (target, source, exceptions) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule$1.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var fails$5 = fails$e;
	var isCallable$2 = isCallable$d;

	var replacement = /#|\.prototype\./;

	var isForced$1 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : isCallable$2(detection) ? fails$5(detection)
	    : !!detection;
	};

	var normalize = isForced$1.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$1.data = {};
	var NATIVE = isForced$1.NATIVE = 'N';
	var POLYFILL = isForced$1.POLYFILL = 'P';

	var isForced_1 = isForced$1;

	var global$4 = global$d;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$3;
	var defineBuiltIn$1 = defineBuiltIn$3;
	var defineGlobalProperty = defineGlobalProperty$3;
	var copyConstructorProperties = copyConstructorProperties$1;
	var isForced = isForced_1;

	/*
	  options.target         - name of the target object
	  options.global         - target is the global object
	  options.stat           - export as static methods of target
	  options.proto          - export as prototype methods of target
	  options.real           - real prototype method for the `pure` version
	  options.forced         - export even if the native feature is available
	  options.bind           - bind methods to the target, required for the `pure` version
	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
	  options.sham           - add a flag to not completely full polyfills
	  options.enumerable     - export as enumerable property
	  options.dontCallGetSet - prevent calling a getter on target
	  options.name           - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global$4;
	  } else if (STATIC) {
	    target = global$4[TARGET] || defineGlobalProperty(TARGET, {});
	  } else {
	    target = (global$4[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$1(sourceProperty, 'sham', true);
	    }
	    defineBuiltIn$1(target, key, sourceProperty, options);
	  }
	};

	var fails$4 = fails$e;
	var global$3 = global$d;

	// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	var $RegExp$2 = global$3.RegExp;

	var UNSUPPORTED_Y$1 = fails$4(function () {
	  var re = $RegExp$2('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	// UC Browser bug
	// https://github.com/zloirock/core-js/issues/1008
	var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$4(function () {
	  return !$RegExp$2('a', 'y').sticky;
	});

	var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$4(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = $RegExp$2('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var regexpStickyHelpers = {
	  BROKEN_CARET: BROKEN_CARET,
	  MISSED_STICKY: MISSED_STICKY,
	  UNSUPPORTED_Y: UNSUPPORTED_Y$1
	};

	var objectDefineProperties = {};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys$1 = enumBugKeys$3;

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es-x/no-object-keys -- safe
	var objectKeys$1 = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys$1);
	};

	var DESCRIPTORS = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule = objectDefineProperty;
	var anObject$3 = anObject$8;
	var toIndexedObject = toIndexedObject$4;
	var objectKeys = objectKeys$1;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es-x/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$3(O);
	  var props = toIndexedObject(Properties);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn$1 = getBuiltIn$5;

	var html$1 = getBuiltIn$1('document', 'documentElement');

	/* global ActiveXObject -- old IE, WSH */

	var anObject$2 = anObject$8;
	var definePropertiesModule = objectDefineProperties;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys = hiddenKeys$4;
	var html = html$1;
	var documentCreateElement = documentCreateElement$1;
	var sharedKey = sharedKey$2;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    activeXDocument = new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = typeof document != 'undefined'
	    ? document.domain && activeXDocument
	      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
	      : NullProtoObjectViaIFrame()
	    : NullProtoObjectViaActiveX(activeXDocument); // WSH
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	// eslint-disable-next-line es-x/no-object-create -- safe
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject$2(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
	};

	var fails$3 = fails$e;
	var global$2 = global$d;

	// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
	var $RegExp$1 = global$2.RegExp;

	var regexpUnsupportedDotAll = fails$3(function () {
	  var re = $RegExp$1('.', 's');
	  return !(re.dotAll && re.exec('\n') && re.flags === 's');
	});

	var fails$2 = fails$e;
	var global$1 = global$d;

	// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
	var $RegExp = global$1.RegExp;

	var regexpUnsupportedNcg = fails$2(function () {
	  var re = $RegExp('(?<a>b)', 'g');
	  return re.exec('b').groups.a !== 'b' ||
	    'b'.replace(re, '$<a>c') !== 'bc';
	});

	/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
	/* eslint-disable regexp/no-useless-quantifier -- testing */
	var call$4 = functionCall;
	var uncurryThis$4 = functionUncurryThis;
	var toString$2 = toString$3;
	var regexpFlags = regexpFlags$1;
	var stickyHelpers = regexpStickyHelpers;
	var shared = shared$4.exports;
	var create = objectCreate;
	var getInternalState = internalState.get;
	var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
	var UNSUPPORTED_NCG = regexpUnsupportedNcg;

	var nativeReplace = shared('native-string-replace', String.prototype.replace);
	var nativeExec = RegExp.prototype.exec;
	var patchedExec = nativeExec;
	var charAt$3 = uncurryThis$4(''.charAt);
	var indexOf = uncurryThis$4(''.indexOf);
	var replace$1 = uncurryThis$4(''.replace);
	var stringSlice$1 = uncurryThis$4(''.slice);

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  call$4(nativeExec, re1, 'a');
	  call$4(nativeExec, re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

	if (PATCH) {
	  patchedExec = function exec(string) {
	    var re = this;
	    var state = getInternalState(re);
	    var str = toString$2(string);
	    var raw = state.raw;
	    var result, reCopy, lastIndex, match, i, object, group;

	    if (raw) {
	      raw.lastIndex = re.lastIndex;
	      result = call$4(patchedExec, raw, str);
	      re.lastIndex = raw.lastIndex;
	      return result;
	    }

	    var groups = state.groups;
	    var sticky = UNSUPPORTED_Y && re.sticky;
	    var flags = call$4(regexpFlags, re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = replace$1(flags, 'y', '');
	      if (indexOf(flags, 'g') === -1) {
	        flags += 'g';
	      }

	      strCopy = stringSlice$1(str, re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$3(str, re.lastIndex - 1) !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = call$4(nativeExec, sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = stringSlice$1(match.input, charsAdded);
	        match[0] = stringSlice$1(match[0], charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
	      call$4(nativeReplace, match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    if (match && groups) {
	      match.groups = object = create(null);
	      for (i = 0; i < groups.length; i++) {
	        group = groups[i];
	        object[group[0]] = match[group[1]];
	      }
	    }

	    return match;
	  };
	}

	var regexpExec$2 = patchedExec;

	var $$1 = _export;
	var exec$1 = regexpExec$2;

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	$$1({ target: 'RegExp', proto: true, forced: /./.exec !== exec$1 }, {
	  exec: exec$1
	});

	// TODO: Remove from `core-js@4` since it's moved to entry points

	var uncurryThis$3 = functionUncurryThis;
	var defineBuiltIn = defineBuiltIn$3;
	var regexpExec$1 = regexpExec$2;
	var fails$1 = fails$e;
	var wellKnownSymbol = wellKnownSymbol$4;
	var createNonEnumerableProperty = createNonEnumerableProperty$3;

	var SPECIES = wellKnownSymbol('species');
	var RegExpPrototype = RegExp.prototype;

	var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
	  var SYMBOL = wellKnownSymbol(KEY);

	  var DELEGATES_TO_SYMBOL = !fails$1(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$1(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {};
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () { execCalled = true; return null; };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    FORCED
	  ) {
	    var uncurriedNativeRegExpMethod = uncurryThis$3(/./[SYMBOL]);
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      var uncurriedNativeMethod = uncurryThis$3(nativeMethod);
	      var $exec = regexp.exec;
	      if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
	        }
	        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
	      }
	      return { done: false };
	    });

	    defineBuiltIn(String.prototype, KEY, methods[0]);
	    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
	  }

	  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
	};

	var uncurryThis$2 = functionUncurryThis;
	var toIntegerOrInfinity = toIntegerOrInfinity$3;
	var toString$1 = toString$3;
	var requireObjectCoercible$1 = requireObjectCoercible$4;

	var charAt$2 = uncurryThis$2(''.charAt);
	var charCodeAt$1 = uncurryThis$2(''.charCodeAt);
	var stringSlice = uncurryThis$2(''.slice);

	var createMethod = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString$1(requireObjectCoercible$1($this));
	    var position = toIntegerOrInfinity(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt$1(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt$1(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt$2(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod(true)
	};

	var charAt$1 = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.es/ecma262/#sec-advancestringindex
	var advanceStringIndex$1 = function (S, index, unicode) {
	  return index + (unicode ? charAt$1(S, index).length : 1);
	};

	var call$3 = functionCall;
	var anObject$1 = anObject$8;
	var isCallable$1 = isCallable$d;
	var classof$1 = classofRaw$1;
	var regexpExec = regexpExec$2;

	var $TypeError = TypeError;

	// `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (isCallable$1(exec)) {
	    var result = call$3(exec, R, S);
	    if (result !== null) anObject$1(result);
	    return result;
	  }
	  if (classof$1(R) === 'RegExp') return call$3(regexpExec, R, S);
	  throw $TypeError('RegExp#exec called on incompatible receiver');
	};

	var call$2 = functionCall;
	var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
	var anObject = anObject$8;
	var toLength = toLength$2;
	var toString = toString$3;
	var requireObjectCoercible = requireObjectCoercible$4;
	var getMethod = getMethod$2;
	var advanceStringIndex = advanceStringIndex$1;
	var regExpExec = regexpExecAbstract;

	// @@match logic
	fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.es/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = requireObjectCoercible(this);
	      var matcher = regexp == undefined ? undefined : getMethod(regexp, MATCH);
	      return matcher ? call$2(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
	    function (string) {
	      var rx = anObject(this);
	      var S = toString(string);
	      var res = maybeCallNative(nativeMatch, rx, S);

	      if (res.done) return res.value;

	      if (!rx.global) return regExpExec(rx, S);

	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = regExpExec(rx, S)) !== null) {
	        var matchStr = toString(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	var NATIVE_BIND = functionBindNative;

	var FunctionPrototype = Function.prototype;
	var apply$1 = FunctionPrototype.apply;
	var call$1 = FunctionPrototype.call;

	// eslint-disable-next-line es-x/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call$1.bind(apply$1) : function () {
	  return call$1.apply(apply$1, arguments);
	});

	var classof = classofRaw$1;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es-x/no-array-isarray -- safe
	var isArray$1 = Array.isArray || function isArray(argument) {
	  return classof(argument) == 'Array';
	};

	var uncurryThis$1 = functionUncurryThis;

	var arraySlice$1 = uncurryThis$1([].slice);

	var $ = _export;
	var getBuiltIn = getBuiltIn$5;
	var apply = functionApply;
	var call = functionCall;
	var uncurryThis = functionUncurryThis;
	var fails = fails$e;
	var isArray = isArray$1;
	var isCallable = isCallable$d;
	var isObject = isObject$6;
	var isSymbol = isSymbol$3;
	var arraySlice = arraySlice$1;
	var NATIVE_SYMBOL = nativeSymbol;

	var $stringify = getBuiltIn('JSON', 'stringify');
	var exec = uncurryThis(/./.exec);
	var charAt = uncurryThis(''.charAt);
	var charCodeAt = uncurryThis(''.charCodeAt);
	var replace = uncurryThis(''.replace);
	var numberToString = uncurryThis(1.0.toString);

	var tester = /[\uD800-\uDFFF]/g;
	var low = /^[\uD800-\uDBFF]$/;
	var hi = /^[\uDC00-\uDFFF]$/;

	var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails(function () {
	  var symbol = getBuiltIn('Symbol')();
	  // MS Edge converts symbol values to JSON as {}
	  return $stringify([symbol]) != '[null]'
	    // WebKit converts symbol values to JSON as null
	    || $stringify({ a: symbol }) != '{}'
	    // V8 throws on boxed symbols
	    || $stringify(Object(symbol)) != '{}';
	});

	// https://github.com/tc39/proposal-well-formed-stringify
	var ILL_FORMED_UNICODE = fails(function () {
	  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
	    || $stringify('\uDEAD') !== '"\\udead"';
	});

	var stringifyWithSymbolsFix = function (it, replacer) {
	  var args = arraySlice(arguments);
	  var $replacer = replacer;
	  if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	  if (!isArray(replacer)) replacer = function (key, value) {
	    if (isCallable($replacer)) value = call($replacer, this, key, value);
	    if (!isSymbol(value)) return value;
	  };
	  args[1] = replacer;
	  return apply($stringify, null, args);
	};

	var fixIllFormed = function (match, offset, string) {
	  var prev = charAt(string, offset - 1);
	  var next = charAt(string, offset + 1);
	  if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {
	    return '\\u' + numberToString(charCodeAt(match, 0), 16);
	  } return match;
	};

	if ($stringify) {
	  // `JSON.stringify` method
	  // https://tc39.es/ecma262/#sec-json.stringify
	  $({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var args = arraySlice(arguments);
	      var result = apply(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
	      return ILL_FORMED_UNICODE && typeof result == 'string' ? replace(result, tester, fixIllFormed) : result;
	    }
	  });
	}

	const u = navigator.userAgent;
	const isAndroid = () => {
	  return u.indexOf("android") > -1 || u.indexOf("Adr") > -1 || u.indexOf("Android") > -1;
	};
	const isIOS = () => {
	  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	};
	const printLog = function printLog(params) {
	  let is_alert = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	  if (is_alert) alert(JSON.stringify(params));
	};
	const checkDebug = sdk => {
	  return "undefined" !== typeof sdk.apiConfig.debug && sdk.apiConfig.debug === true ? true : false;
	};
	const isFunction = p => {
	  return Object.prototype.toString.call(p) === "[object Function]";
	};

	const initBridge = callback => {
	  if (window.WebViewJavascriptBridge) {
	    return callback(WebViewJavascriptBridge);
	  }

	  if (isIOS()) {
	    if (window.WVJBCallbacks) {
	      return window.WVJBCallbacks.push(callback);
	    }

	    window.WVJBCallbacks = [callback];
	    const WVJBIframe = document.createElement("iframe");
	    WVJBIframe.style.display = "none";
	    WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
	    document.documentElement.appendChild(WVJBIframe);
	    setTimeout(function () {
	      document.documentElement.removeChild(WVJBIframe);
	    }, 0);
	  }
	};
	const iniAndBridge = callback => {
	  setTimeout(() => {
	    if (window.WebViewJavascriptBridge) {
	      callback(WebViewJavascriptBridge);
	    } else {
	      document.addEventListener("WebViewJavascriptBridgeReady", function () {
	        callback(WebViewJavascriptBridge);
	      }, false);
	    }
	  }, 1);
	};
	const bridgeRegisterHandler = option => {
	  initBridge(function (bridge) {
	    bridge.registerHandler(option.method, function (data, responseCallback) {
	      if (option.callback) {
	        option.callback(isAndroid() ? JSON.parse(data) : data);
	      }
	    });
	  });
	};
	const bridgeCallHandler = option => {
	  initBridge(function (bridge) {
	    try {
	      bridge.callHandler(option.method, option.data || {}, function (responseData) {
	        if (option.callback) {
	          option.callback(isAndroid() ? JSON.parse(responseData) : responseData);
	        }
	      });
	    } catch (e) {
	      alert(e);
	    }
	  });
	};
	const invoke = option => {
	  option.data.method = option.method;
	  initBridge(function (bridge) {
	    bridge.callHandler("invoke", option.data || {}, function (responseData) {
	      if (option.callback) {
	        option.callback(isAndroid() ? JSON.parse(responseData) : responseData);
	      }
	    });
	    bridge.registerHandler("invoke", function (data, responseCallback) {
	      responseCallback("tNative ".concat(data));
	    });
	  });
	};

	if (isAndroid()) {
	  iniAndBridge(bridge => bridge.init());
	}

	const jssdk = {
	  config: params => {
	    const data = {
	      debug: params !== null && params !== void 0 && params.debug ? params.debug : false,
	      appid: params !== null && params !== void 0 && params.appid ? params.appid : "",
	      timestamp: params !== null && params !== void 0 && params.timestamp ? params.timestamp : "",
	      nonce: params !== null && params !== void 0 && params.nonce ? params.nonce : "",
	      signType: params !== null && params !== void 0 && params.signType ? params.signType : "",
	      sign: params !== null && params !== void 0 && params.sign ? params.sign : "",
	      jsApiList: params !== null && params !== void 0 && params.jsApiList ? params.jsApiList : []
	    };
	    jssdk.apiConfig = data;
	    bridgeCallHandler({
	      method: "jsApiConfig",
	      data: data,
	      callback: responseData => {
	        if (checkDebug(jssdk)) printLog(responseData, true);

	        if (responseData.errno) {
	          if (isFunction(jssdk.readyFun)) {
	            jssdk.readyFun();
	          }
	        } else {
	          if (isFunction(jssdk.errorFun)) {
	            jssdk.errorFun(responseData);
	          }
	        }
	      }
	    });
	  },
	  ready: fun => {
	    jssdk.readyFun = fun;
	  },
	  error: fun => {
	    jssdk.errorFun = fun;
	  },
	  uniteFaceVerify: params => {
	    if ((params === null || params === void 0 ? void 0 : params.pre_verify_id) === undefined || params.pre_verify_id === "" || params.pre_verify_id === null) {
	      alert("预认证标识为空");
	    }

	    bridgeRegisterHandler({
	      method: "successFaceVerify",
	      callback: isFunction(params.success) ? params.success : res => {}
	    });
	    bridgeRegisterHandler({
	      method: "failFaceVerify",
	      callback: isFunction(params.fail) ? params.fail : res => {}
	    });
	    bridgeRegisterHandler({
	      method: "cancelFaceVerify",
	      callback: isFunction(params.cancel) ? params.cancel : res => {}
	    });
	    invoke({
	      method: "uniteFaceVerify",
	      data: {
	        pre_verify_id: params.pre_verify_id
	      },
	      callback: responseData => {}
	    });
	  },
	  getUserToken: function getUserToken() {
	    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    const callback = {
	      success: isFunction(params.success) ? params.success : {},
	      error: isFunction(params.error) ? params.error : {}
	    };
	    invoke({
	      method: "getUserToken",
	      data: {},
	      callback: function (_callback) {
	        function callback(_x) {
	          return _callback.apply(this, arguments);
	        }

	        callback.toString = function () {
	          return _callback.toString();
	        };

	        return callback;
	      }(responseData => {
	        if (checkDebug(jssdk)) printLog(responseData, true);

	        if (responseData.errno) {
	          if (callback.success) {
	            callback.success(responseData);
	          }
	        } else {
	          if (callback.error) {
	            callback.error(responseData);
	          }
	        }
	      })
	    });
	  },
	  myczScan: function myczScan() {
	    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    bridgeRegisterHandler({
	      method: "successScan",
	      callback: isFunction(params.success) ? params.success : res => {}
	    });
	    bridgeRegisterHandler({
	      method: "cancelScan",
	      callback: isFunction(params.cancel) ? params.cancel : res => {}
	    });
	    invoke({
	      method: "myczScan",
	      data: {},
	      callback: responseData => {
	        if (checkDebug(jssdk)) printLog(responseData, true);
	      }
	    });
	  },
	  updateShareData: function updateShareData() {
	    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    if (params.shareMenu === undefined) ; else if (params.shareMenu instanceof Array) {
	      params.shareMenu;
	    } else ;

	    const shareParams = {
	      shareType: shareType,
	      title: params.title || document.title,
	      desc: params.desc || "",
	      link: params.link || location.href,
	      icon: params.icon || ""
	    };
	    const callback = {
	      success: isFunction(params.success) ? params.success : {},
	      error: isFunction(params.error) ? params.error : {},
	      cancel: isFunction(params.cancel) ? params.cancel : {}
	    };
	    invoke({
	      method: "updateShareData",
	      data: shareParams,
	      callback: function (_callback2) {
	        function callback(_x2) {
	          return _callback2.apply(this, arguments);
	        }

	        callback.toString = function () {
	          return _callback2.toString();
	        };

	        return callback;
	      }(responseData => {
	        if (checkDebug(jssdk)) printLog(responseData, true);

	        if (responseData.errno) {
	          if (callback.success) {
	            callback.success(responseData);
	          }
	        } else {
	          if (callback.error) {
	            callback.error(responseData);
	          }
	        }
	      })
	    });
	  },
	  downloadFile: function downloadFile() {
	    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    const callback = {
	      error: isFunction(params.error) ? params.error : {}
	    };

	    if (params.url === undefined || params.url === "") {
	      callback.error({
	        errno: 10000,
	        message: "链接无效"
	      });
	    }

	    invoke({
	      method: "downloadFile",
	      data: params,
	      callback: function (_callback3) {
	        function callback(_x3) {
	          return _callback3.apply(this, arguments);
	        }

	        callback.toString = function () {
	          return _callback3.toString();
	        };

	        return callback;
	      }(responseData => {
	        if (checkDebug(jssdk)) printLog(responseData, true);

	        if (responseData.errno) {
	          if (callback.success) {
	            callback.success(responseData);
	          }
	        } else {
	          if (callback.error) {
	            callback.error(responseData);
	          }
	        }
	      })
	    });
	  },
	  closeWebView: function closeWebView() {
	    invoke({
	      method: "closeWebView",
	      data: {},
	      callback: function (_callback4) {
	        function callback(_x4) {
	          return _callback4.apply(this, arguments);
	        }

	        callback.toString = function () {
	          return _callback4.toString();
	        };

	        return callback;
	      }(responseData => {
	        if (checkDebug(jssdk)) printLog(responseData, true);

	        if (responseData.errno) {
	          if (callback.success) {
	            callback.success(responseData);
	          }
	        } else {
	          if (callback.error) {
	            callback.error(responseData);
	          }
	        }
	      })
	    });
	  },
	  showPictures: params => {
	    invoke({
	      method: "showPictures",
	      data: params
	    });
	  },

	  /*************************** 内部桥 ***************************/
	  // 获取最近使用
	  fetchUsedService: function fetchUsedService() {
	    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    const callback = {
	      success: isFunction(params.success) ? params.success : {},
	      error: isFunction(params.error) ? params.error : {}
	    };
	    invoke({
	      method: "fetchUsedService",
	      data: params,
	      callback: function (_callback5) {
	        function callback(_x5) {
	          return _callback5.apply(this, arguments);
	        }

	        callback.toString = function () {
	          return _callback5.toString();
	        };

	        return callback;
	      }(responseData => {
	        if (responseData.errno) {
	          if (callback.success) {
	            callback.success(responseData);
	          }
	        } else {
	          if (callback.error) {
	            callback.error(responseData);
	          }
	        }
	      })
	    });
	  },
	  // 打开模态 **********************
	  openModule: function openModule() {
	    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    bridgeRegisterHandler({
	      method: "successOpenModule",
	      callback: isFunction(params.success) ? params.success : res => {}
	    });
	    bridgeRegisterHandler({
	      method: "cancelOpenModule",
	      callback: isFunction(params.cancel) ? params.cancel : res => {}
	    });
	    bridgeRegisterHandler({
	      method: "errorOpenModule",
	      callback: isFunction(params.error) ? params.error : res => {}
	    });
	    invoke({
	      method: "openModule",
	      data: params,
	      callback: responseData => {}
	    });
	  },
	  // 获取accessToken
	  fetchAccessToken: function fetchAccessToken() {
	    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    const callback = {
	      success: isFunction(params.success) ? params.success : {},
	      error: isFunction(params.error) ? params.error : {}
	    };
	    invoke({
	      method: "fetchAccessToken",
	      data: params,
	      callback: function (_callback6) {
	        function callback(_x6) {
	          return _callback6.apply(this, arguments);
	        }

	        callback.toString = function () {
	          return _callback6.toString();
	        };

	        return callback;
	      }(responseData => {
	        if (responseData.errno) {
	          if (callback.success) {
	            callback.success(responseData);
	          }
	        } else {
	          if (callback.error) {
	            callback.error(responseData);
	          }
	        }
	      })
	    });
	  }
	};

	return jssdk;

}));
