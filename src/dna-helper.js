import { DNABaseComponent } from './dna-base-component.js';

export const EXCLUDE_ON_EXTEND = [
    'name',
    'length',
    'prototype',
    'arguments',
    'caller',
    'constructor',
];

function createFunctionClass(prototype) {
    let fn = function() {};
    fn.prototype = prototype;
    return fn;
}

function defineProperties(target, props) {
    let blacklistProps = EXCLUDE_ON_EXTEND.slice(0);
    for (let i = 0; i < props.length; i++) {
        let descriptor = props[i];
        if (blacklistProps.indexOf(descriptor.key) === -1) {
            if (typeof descriptor.value === 'function') {
                target[descriptor.key] = descriptor.value;
            } else {
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ('value' in descriptor) {
                    descriptor.writable = true;
                }
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
    }
}

function createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        defineProperties(Constructor.prototype, protoProps);
    }
    if (staticProps) {
        defineProperties(Constructor, staticProps);
    }
    return Constructor;
}

function inherits(subClass, superClass) {
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true,
        },
    });
    if (superClass) {
        Object.setPrototypeOf(subClass, superClass);
    }
}

function getMethods(prototype) {
    let res = [];
    let added = EXCLUDE_ON_EXTEND.slice(0);
    function createProp(propKey) {
        if (added.indexOf(propKey) === -1) {
            let prop = {
                key: propKey,
            };
            if (typeof prototype[propKey] === 'function') {
                prop.value = prototype[propKey];
            } else {
                let descriptor = Object.getOwnPropertyDescriptor(prototype, propKey) || {};
                if (descriptor.get) {
                    prop.get = descriptor.get;
                    prop.set = descriptor.set;
                } else {
                    prop.value = prototype[propKey];
                }
            }
            added.push(propKey);
            return prop;
        }
        return false;
    }
    for (let key in prototype) {
        if (prototype.hasOwnProperty(key)) {
            let prop = createProp(key);
            if (prop) {
                res.push(prop);
            }
        }
    }
    let keys = Object.getOwnPropertyNames(prototype);
    keys.forEach((key) => {
        let prop = createProp(key);
        if (prop) {
            res.push(prop);
        }
    });
    return res;
}

function bindFN(protoFn, superFn) {
    return function(...args) {
        protoFn.apply(this, args);
        superFn.apply(this, args);
    };
}
/**
 * Convert a Class name into HTML tag.
 * @param {Class} fn Grab the tag name from this class.
 * @return {String} The tag name for the Custom Element.
 */
export function classToElement(fn) {
    let name;
    if (fn.name) {
        name = fn.name
            .replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
            .replace(/^\-/, '');
    }
    return name;
}
/**
 * Get an element's property descriptor.
 * @param {Function} ctr The element constructor.
 * @param {string} prop The property to analyze.
 * @return {object} The descriptor of the property.
 */
export function getDescriptor(ctr, prop) {
    let res;
    if (ctr) {
        res = Object.getOwnPropertyDescriptor(ctr, prop);
        let proto = Object.getPrototypeOf(ctr);
        if (!res && proto) {
            res = getDescriptor(proto, prop);
        }
    }
    return res;
}
/**
 * Wrap a property descriptor get function or create a new one.
 * @param {string} prop The property to wrap.
 * @param {object} descriptor The property descriptor.
 * @param {*} value The initial value.
 * @return {Function} The descriptor get function wrapped.
 */
export function wrapDescriptorGet(prop, descriptor, value) {
    let hasGetter = typeof descriptor.get === 'function';
    let propName = `__${prop}`;
    let getter = function() {
        let res;
        if (hasGetter) {
            res = descriptor.get.call(this);
        } else {
            res = (typeof this[propName] !== 'undefined') ? this[propName] : value;
        }
        return res;
    };
    if (!hasGetter) {
        getter.bind = propName;
    }
    return getter;
}
/**
 * Wrap a property descriptor set function or create a new one.
 * @param {string} prop The property to wrap.
 * @param {object} descriptor The property descriptor.
 * @param {Function} callback An optional callback to trigger on set.
 * @return {Function} The descriptor set function wrapped.
 */
export function wrapDescriptorSet(prop, descriptor, callback) {
    if (descriptor && descriptor.set && descriptor.set.callbacks) {
        descriptor.set.callbacks.push(callback);
        return descriptor.set;
    }
    let setter = function(value) {
        if (descriptor.set) {
            descriptor.set.call(this, value);
        } else {
            this[`__${prop}`] = value;
        }
        let res = this[prop];
        setter.callbacks.forEach((clb) => {
            if (typeof clb === 'function') {
                clb.call(this, prop, res);
            }
        });
        return res;
    };
    setter.callbacks = [callback];
    return setter;
}
/**
 * Convert a string from camelCase to dash-case.
 * @param {string} str The string to convert.
 * @return {string} The converted string.
 */
export function camelToDash(str) {
    return str.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
}
/**
 * Convert a string from dash-case to camelCase.
 * @param {string} str The string to convert.
 * @return {string} The converted string.
 */
export function dashToCamel(str) {
    return str.replace(/\W+(.)/g, (x, chr) => chr.toUpperCase());
}
/**
 * Extend a component prototype.
 * @param {function|class|object} superScope The function or the prototype to extend.
 * @param {function|class|object} subScope The function or the prototype to merge.
 * @return {function} A new extended class.
 */
export function extend(superScope, subScope) {
    if (typeof superScope !== 'function' && typeof superScope !== 'object') {
        throw new TypeError(
            `Super expression must be a function or an object, not ${typeof superScope}`
        );
    }
    let _superScope = (typeof superScope !== 'function') ?
        createFunctionClass(superScope) :
        superScope;
    let _subScope = (typeof subScope !== 'function') ?
        createFunctionClass(subScope) :
        subScope;
    let ctr = createFunctionClass({});
    inherits(ctr, _superScope);
    return createClass(ctr, getMethods(_subScope.prototype), getMethods(subScope));
}
/**
 * Normalize the `register` method arguments.
 * @param {Function|String} fn The definition or the tag name of the Custom Element.
 * @param {Object|Function} options A set of options or the Component class
                                    for the registration of the Custom Element.
 * @return {Object} A descriptor of the component with `tagName`, `config` and `scope` keys.
 */
export function digest(fn, options = {}) {
    let scope;
    let config = {};
    let tagName;
    if (typeof fn === 'string') {
        tagName = fn;
        if (typeof options === 'function') {
            scope = options;
            config = {};
        } else {
            if (typeof options === 'object') {
                config = options;
            }
            if (typeof config.prototype !== 'undefined') {
                scope = config.prototype;
            }
        }
    } else {
        scope = fn;
        if (typeof options === 'object') {
            config = options;
        }
    }
    if (typeof scope === 'function') {
        tagName = (
            tagName ||
            config.tagName ||
            (scope.hasOwnProperty('tagName') && scope.tagName) ||
            classToElement(scope)
        );
        config.prototype = scope.prototype;
        if (!config.extends && typeof scope.extends === 'string') {
            config.extends = scope.extends;
        }
    } else if (typeof scope === 'object') {
        config.prototype = scope;
        scope = function(...args) {
            config.prototype.constructor.apply(this, args);
        };
        scope.prototype = config.prototype;
    }
    if (config.prototype) {
        config.prototype = Object.create(config.prototype);
    }
    return {
        tagName,
        config,
        scope,
    };
}

/**
 * Wrap prototype properties in top-level element.
 * @param {Object} main The top-level element which needs the prototype properties.
 * @param {Object} currentProto The current prototype to analyze.
 * @param {Boolean} includeFunctions Should deine methods too.
 * @param {Function} callback A setter callback for the property (optional).
 */
export function wrapPrototype(main, currentProto, includeFunctions = true, callback, handled = []) {
    Object.getOwnPropertyNames(currentProto)
        .filter((prop) =>
            EXCLUDE_ON_EXTEND.indexOf(prop) === -1
        )
        .forEach((prop) => {
            let descriptor = Object.getOwnPropertyDescriptor(currentProto, prop) || {};
            let isFunction = typeof descriptor.value === 'function';
            if (handled.indexOf(prop) === -1) {
                if (typeof descriptor.value === 'undefined' || !isFunction) {
                    handled.push(prop);
                    if (descriptor.configurable !== false) {
                        Object.defineProperty(main, prop, {
                            configurable: true,
                            get: wrapDescriptorGet(prop, descriptor, descriptor.value),
                            set: wrapDescriptorSet(prop, descriptor, callback),
                        });
                    }
                } else if (isFunction && includeFunctions) {
                    handled.push(prop);
                    Object.defineProperty(main, prop, descriptor);
                }
            }
        });
    let nextProto = currentProto.prototype || Object.getPrototypeOf(currentProto);
    if (nextProto && nextProto !== HTMLElement.prototype) {
        wrapPrototype(main, nextProto, includeFunctions, callback, handled);
    }
}

/**
 * A list of registered DNA components.
 * @type {Object}.
 */
export const REGISTRY = {};

/**
 * Add an entry to the DNA registry.
 * @param {String} tagName The tag name of the Component.
 * @param {Function} constructor The Component constructor.
 */
export function registry(tagName, constructor) {
    if (tagName) {
        let lower = tagName.toLowerCase();
        if (constructor) {
            REGISTRY[lower] = constructor;
        }
        return REGISTRY[lower];
    }
    return null;
}

/**
 * Trigger `onRegister` callbacks.
 * @param {Function|String} tagName The definition or the tag name of the Component.
 * @param {Object} options A set of options for the registration of the Component.
 * @return {Function} The Component constructor.
 */
export function register(fn, options = {}) {
    let pre = digest(fn, options);
    let scope = pre.scope;
    let tagName = pre.tagName;
    let config = pre.config;
    if (typeof scope.onRegister === 'function') {
        scope.onRegister.call(scope, tagName);
    }
    let res = function(element) {
        element = element || document.createElement(config.extends ? config.extends : tagName);
        wrapPrototype(element, scope.prototype);
        Object.defineProperty(element, 'is', {
            configurable: false,
            get: () => tagName,
        });
        element.createdCallback();
        return element;
    };
    Object.defineProperty(res.prototype, 'constructor', {
        configurable: false,
        get: () => scope,
    });
    registry(tagName, res);
    return res;
}
/**
 * Create and register a component.
 * @param {string} fn The tag to use for the custom element. (required)
 * @param {object} options A configuration object. (`prototype` key is required)
 * @param {object} pluginOptions Some  generic replacements (optional)
 * @return {function} The Component constructor.
 */
export function create(fn, options = {}, pluginOptions = {}) {
    let pre = digest(fn, options);
    let tagName = pre.tagName;
    let config = pre.config;
    let scope = pre.scope;
    let registerFn = pluginOptions.register || register;
    let baseComponent = pluginOptions.base || DNABaseComponent;
    if (typeof tagName !== 'string') {
        throw new Error('Missing or bad typed `tagName` property');
    }
    if (typeof scope === 'undefined') {
        throw new Error('Missing prototype');
    }
    let newScope = extend(baseComponent, scope);
    for (let k in newScope.prototype) {
        if (newScope.prototype.hasOwnProperty(k)) {
            let callbacks = [
                'createdCallback',
                'attachedCallback',
                'detachedCallback',
                'attributeChangedCallback',
            ];
            if (callbacks.indexOf(k) !== -1) {
                newScope.prototype[k] = bindFN(
                    newScope.prototype[k],
                    baseComponent.prototype[k]
                );
            }
        }
    }
    for (let k in newScope) {
        if (newScope.hasOwnProperty(k)) {
            let callbacks = [
                'onRegister',
            ];
            if (callbacks.indexOf(k) !== -1) {
                newScope[k] = bindFN(
                    newScope[k],
                    baseComponent[k]
                );
            }
        }
    }
    config.prototype = newScope;
    return registerFn(tagName, config);
}
