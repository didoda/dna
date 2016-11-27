(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.DNA = global.DNA || {})));
}(this, (function (exports) { 'use strict';

/**
 * Check if an value is a function.
 * @method isFunction
 * @memberof! DNA.
 * @static
 *
 * @param {*} obj The value to check.
 * @return {Boolean}
 */
function isFunction(obj) {
  return typeof obj === 'function';
}
/**
 * Check if an value is a string.
 * @method isString
 * @memberof! DNA.
 * @static
 *
 * @param {*} obj The value to check.
 * @return {Boolean}
 */
function isString(obj) {
  return typeof obj === 'string';
}
/**
 * Check if an value is an object.
 * @method isObject
 * @memberof! DNA.
 * @static
 *
 * @param {*} obj The value to check.
 * @return {Boolean}
 */
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
/**
 * Check if an value is undefined.
 * @method isUndefined
 * @memberof! DNA.
 * @static
 *
 * @param {*} obj The value to check.
 * @return {Boolean}
 */
function isUndefined(obj) {
  return typeof obj === 'undefined';
}
/**
 * Check if an value is an array.
 * @method isArray
 * @memberof! DNA.
 * @static
 *
 * @param {*} obj The value to check.
 * @return {Boolean}
 */
function isArray(obj) {
  return Array.isArray(obj);
}

/**
 * A custom components registry.
 * It replicates the [CustomElementRegistry interface](https://www.w3.org/TR/custom-elements/#custom-elements-api).
 * @name registry
 * @namespace registry
 * @memberof! DNA.
 * @static
 */
var registry = {
    /**
     * The list of defined components.
     * @type {Object}
     */
    components: {},
    /**
     * Register a new component.
     * @param {String} name The id of the component.
     * @param {Function} Ctr The component constructor.
     * @param {Object} config Optional component configuration.
     */
    define: function define(name, Ctr) {
        var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        this.components[name.toLowerCase()] = {
            is: name,
            Ctr: Ctr,
            config: config
        };
    },

    /**
     * Retrieve a component descriptor by id.
     * @private
     * @param {String} name The component id.
     * @return {Object} The component descriptor.
     */
    getDescriptor: function getDescriptor(name) {
        if (isString(name)) {
            return this.components[name.toLowerCase()];
        } else if (isFunction(name)) {
            for (var k in this.components) {
                var desc = this.components[k];
                if (desc.Ctr === name) {
                    return desc;
                }
            }
        }
    },

    /**
     * Retrieve a component constructor by id.
     * @param {String} name The component id.
     * @return {Function} The component constructor.
     */
    get: function get(name) {
        var desc = this.getDescriptor(name);
        if (desc) {
            return desc.Ctr;
        }
    }
};

var COMPONENT_SYMBOL = '__component';

/**
 * The `connectedCallback` name.
 * @private
 *
 * @type {String}
 * @see [W3C spec](https://www.w3.org/TR/custom-elements/#custom-element-reactions)
 */
var CONNECTED = 'connectedCallback';
/**
 * The `disconnectedCallback` name.
 * @private
 *
 * @type {String}
 * @see [W3C spec](https://www.w3.org/TR/custom-elements/#custom-element-reactions)
 */
var DISCONNECTED = 'disconnectedCallback';
/**
 * The `attributeChangedCallback` name.
 * @private
 *
 * @type {String}
 * @see [W3C spec](https://www.w3.org/TR/custom-elements/#custom-element-reactions)
 */
var UPDATED = 'attributeChangedCallback';
/**
 * Retrieve a component constructor from an Element or from a tag name.
 * @method getComponent
 * @memberof DNA.DOM
 * @static
 *
 * @param {Component|String} element The element or the tag name.
 * @param {Boolean} full Retrieve full component information.
 * @return {Function} The component constructor for the given param.
 */
function getComponent(element) {
    var full = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (element.node) {
        element = element.node;
    }
    if (element.nodeType === Node.ELEMENT_NODE) {
        element = element.getAttribute('is') || element.tagName;
    }
    return full ? registry.getDescriptor(element) : registry.get(element);
}
/**
 * Check if a node is an instance of a component.
 * @method isComponent
 * @memberof DNA.DOM
 * @static
 *
 * @param {Component} element The element to check.
 * @return {Boolean}
 */
function isComponent(element) {
    var Ctr = getComponent(element);
    return Ctr && element instanceof Ctr;
}
/**
 * An helper for dynamically trigger the `connectedCallback` reaction on components.
 * @method connect
 * @memberof DNA.DOM
 * @static
 *
 * @param {Component} element The attached node.
 * @return {Boolean} The callback has been triggered.
 */
function connect(element) {
    if (isComponent(element)) {
        element[CONNECTED].call(element);
        return true;
    }
}
/**
 * An helper for dynamically trigger the `disconnectedCallback` reaction on components.
 * @method disconnect
 * @memberof DNA.DOM
 * @static
 *
 * @param {Component} element The detached node.
 * @return {Boolean} The callback has been triggered.
 */
function disconnect(element) {
    if (isComponent(element)) {
        element[DISCONNECTED].call(element);
        return true;
    }
}
/**
 * An helper for dynamically trigger the `attributeChangedCallback` reaction on components.
 * @method update
 * @memberof DNA.DOM
 * @static
 *
 * @param {Component} element The updated element.
 * @return {Boolean} The callback has been triggered.
 */
function update(element, name, oldValue, newValue) {
    if (isComponent(element)) {
        element[UPDATED].call(element, name, oldValue, newValue);
        return true;
    }
}
/**
 * Attach a component prototype to an already instantiated HTMLElement.
 * @method bind
 * @memberof DNA.DOM
 * @static
 *
 * @param {HTMLElement} node The node to update.
 * @param {Function} Ctr The component class to use (leave empty for auto detect).
 * @return {Boolean} The prototype has been attached.
 */
function bind(node, Ctr) {
    if (!isFunction(Ctr)) {
        Ctr = getComponent(node);
    }
    if (isFunction(Ctr)) {
        node.__proto__ = Ctr.prototype;
        Object.defineProperty(node, 'constructor', {
            value: Ctr,
            configurable: true,
            writable: true
        });
        Ctr.call(node);
        return true;
    }
    return false;
}
/**
 * Create a component instance.
 * @method createElement
 * @memberof DNA.DOM
 * @static
 *
 * @param {String} is The component tag name.
 * @return {HTMLElement} The component instance.
 */
function createElement(is) {
    var Ctr = getComponent(is);
    if (Ctr) {
        return new Ctr();
    }
}
/**
 * Dynamically append a node and call the `connectedCallback`.
 * - disconnect the node if already in the tree
 * - connect the node after the insertion
 * @method appendChild
 * @memberof DNA.DOM
 * @static
 *
 * @param {HTMLElement} parent The parent element.
 * @param {Component} element The element to append.
 * @return {Boolean} The node has been appended.
 */
function appendChild(parent, element) {
    if (element.node) {
        var node = element.node;
        if (parent !== node.parentNode || parent.lastElementChild !== node) {
            if (node.parentNode) {
                removeChild(node.parentNode, element);
            }
            parent.appendChild(node);
            return connect(element);
        }
    }
    return false;
}
/**
 * Dynamically remove a node and call the `disconnectedCallback`.
 * @method removeChild
 * @memberof DNA.DOM
 * @static
 *
 * @param {HTMLElement} parent The parent element.
 * @param {Component} element The element to remove.
 * @return {Boolean} The node has been removed.
 */
function removeChild(parent, element) {
    if (element.node) {
        parent.removeChild(element.node);
        return disconnect(element);
    }
}
/**
 * Dynamically insert a node before another and call all the reactions.
 * - disconnect the node if already in the tree
 * - connect the node after the insertion
 * @method insertBefore
 * @memberof DNA.DOM
 * @static
 *
 * @param {HTMLElement} parent The parent element.
 * @param {Component} element The element to insert.
 * @param {HTMLElement} refNode The node for positioning.
 * @return {Boolean} The node has been appended.
 */
function insertBefore(parent, element, refNode) {
    if (element.node) {
        var node = element.node;
        if (node.nextSibling !== refNode) {
            if (node.parentNode) {
                disconnect(element);
            }
            parent.insertBefore(node, refNode);
            return connect(element);
        }
    }
}
/**
 * Dynamically replace a node with another and call all the reactions.
 * - disconnect the node if already in the tree
 * - disconnect the replaced node
 * - connect the first node after the insertion
 * @method replaceChild
 * @memberof DNA.DOM
 * @static
 *
 * @param {HTMLElement} parent The parent element.
 * @param {Component} element The element to insert.
 * @param {HTMLElement} refNode The node to replace.
 * @return {Boolean} The node has been appended.
 */
function replaceChild(parent, element, refNode) {
    if (element.node) {
        var node = element.node;
        if (node.parentNode) {
            disconnect(element);
        }
        parent.replaceChild(node, refNode);
        if (refNode[COMPONENT_SYMBOL]) {
            disconnect(refNode[COMPONENT_SYMBOL]);
        }
        return connect(node);
    }
}
/**
 * Dynamically update a node attribute and call all the reactions.
 * @method setAttribute
 * @memberof DNA.DOM
 * @static
 *
 * @param {Component} element The element to update.
 * @param {String} name The attribute name.
 * @param {String} value The attribute value.
 * @return {Boolean} The node has been updated.
 */
function setAttribute(element, name, value) {
    if (element.node) {
        var node = element.node;
        var oldValue = node.getAttribute(name);
        node.setAttribute(name, value);
        var attrs = element.constructor.observedAttributes || [];
        if (attrs.indexOf(name) !== -1) {
            return update(element, name, oldValue, value);
        }
    }
}
/**
 * Dynamically remove a node attribute and call all the reactions.
 * @method removeAttribute
 * @memberof DNA.DOM
 * @static
 *
 * @param {Component} element The element to update.
 * @param {String} name The attribute name.
 * @return {Boolean} The node has been updated.
 */
function removeAttribute(element, name) {
    if (element.node) {
        var node = element.node;
        var oldValue = node.getAttribute(name);
        node.removeAttribute(name);
        var attrs = element.constructor.observedAttributes || [];
        if (attrs.indexOf(name) !== -1) {
            return update(element, name, oldValue, null);
        }
    }
}

var DOM_HELPERS = Object.freeze({
	getComponent: getComponent,
	isComponent: isComponent,
	connect: connect,
	disconnect: disconnect,
	update: update,
	bind: bind,
	createElement: createElement,
	appendChild: appendChild,
	removeChild: removeChild,
	insertBefore: insertBefore,
	replaceChild: replaceChild,
	setAttribute: setAttribute,
	removeAttribute: removeAttribute
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/**
 * THe base custom component mixins. Just add life cycles callback and `is` getter.
 * @mixin ComponentMixin
 * @memberof DNA.MIXINS
 * @static
 */
var ComponentMixin = function ComponentMixin(SuperClass) {
  return function (_SuperClass) {
    inherits(_class, _SuperClass);

    function _class() {
      classCallCheck(this, _class);
      return possibleConstructorReturn(this, _SuperClass.apply(this, arguments));
    }

    /**
     * Fires when an instance was inserted into the document.
     * @method connectedCallback
     * @memberof DNA.MIXINS.ComponentMixin
     * @instance
     */
    _class.prototype.connectedCallback = function connectedCallback() {
      this.node[COMPONENT_SYMBOL] = this;
    };
    /**
     * Fires when an instance was detached from the document.
     * @method disconnectedCallback
     * @memberof DNA.MIXINS.ComponentMixin
     * @instance
     */


    _class.prototype.disconnectedCallback = function disconnectedCallback() {};
    /**
     * Fires when an attribute was added, removed, or updated.
     * @method attributeChangedCallback
     * @memberof DNA.MIXINS.ComponentMixin
     * @instance
     *
     * @param {String} attrName The changed attribute name.
     * @param {String} oldVal The value of the attribute before the change.
     * @param {String} newVal The value of the attribute after the change.
     */


    _class.prototype.attributeChangedCallback = function attributeChangedCallback() {};

    createClass(_class, [{
      key: 'is',

      /**
       * @property {String} is Get component id.
       * @name is
       * @type {String}
       * @memberof DNA.MIXINS.ComponentMixin
       * @instance
       */
      get: function get() {
        return (this.getAttribute('is') || this.localName).toLowerCase();
      }
    }, {
      key: 'node',
      get: function get() {
        return this;
      }
    }]);
    return _class;
  }(SuperClass);
};

var CustomEvent = void 0;

try {
    // eslint-disable-next-line
    var ev = new self.CustomEvent('test');
    CustomEvent = self.CustomEvent;
} catch (ex) {
    CustomEvent = function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    };
    CustomEvent.prototype = self.CustomEvent.prototype;
}

/**
 * Trigger a custom DOM Event.
 * @private
 *
 * @param {Node} node The event target.
 * @param {String} evName The custom event name.
 * @param {Object} data Extra data to pass to the event.
 * @param {Boolean} bubbles Enable event bubbling.
 * @param {Boolean} cancelable Make event cancelable.
 * @return {Boolean} True if event propagation has not be stopped.
 */
function dispatch$1(node, evName, data) {
    var bubbles = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var cancelable = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

    if (!isString(evName)) {
        throw new TypeError('Event name is undefined');
    }
    var ev = new CustomEvent(evName, {
        detail: data,
        bubbles: bubbles,
        cancelable: cancelable
    });
    return node.dispatchEvent(ev);
}

/**
 * Shortcut to `Object.defineProperty`.
 * @type {Function}
 * @private
 */
var define$1 = Object.defineProperty;

/**
 * Power to the component's properties.
 * Type checking, validation, callbacks, events and attribute syncing.
 * @private
 */

var Property = function () {
    /**
     * Create a Property instance.
     * @param {Function|Array} A single or a list of valid constructors for the property value.
     * @return {Property}
     */
    function Property(ctrs) {
        var _this = this;

        classCallCheck(this, Property);

        this._ = [];
        ctrs = ctrs || [];
        if (!isArray(ctrs)) {
            ctrs = [ctrs];
        }
        this.ctrs = ctrs;
        this.validator = function () {
            return true;
        };
        this._setter = function (val) {
            return val;
        };
        this.getterFn = function () {
            return _this.value;
        };
        this.setterFn = function (val) {
            val = _this._setter(val);
            if (val === null || val === undefined || _this.validateType(val) && _this.validator(val)) {
                var oldValue = _this.value;
                if (oldValue !== val) {
                    _this.value = val;
                    _this.changed(val, oldValue);
                }
            } else {
                // eslint-disable-next-line
                throw new TypeError('Invalid `' + val + '` value for `' + _this.name + '` property for `' + _this.scope.is + '`.');
            }
        };
    }
    /**
     * Add a callback when the property changes.
     * @param {Function} callback The callback to trigger.
     * @return {Property} The property instance for chaining.
     */


    Property.prototype.observe = function observe(callback) {
        if (isFunction(callback) || isString(callback)) {
            this._.push(callback);
        }
        return this;
    };
    /**
     * Remove a callback on property changes.
     * @param {Function} callback The callback to remove.
     * @return {Property} The property instance for chaining.
     */


    Property.prototype.unobserve = function unobserve(callback) {
        var io = this._.indexOf(callback);
        if (io !== -1) {
            this._.splice(io, 1);
        }
        return this;
    };
    /**
     * Trigger callbacks after a change.
     * @private
     * @param {*} newValue The current property value.
     * @param {*} oldValue The previous property value.
     */


    Property.prototype.changed = function changed(newValue, oldValue) {
        for (var i = 0, len = this._.length; i < len; i++) {
            var clb = this._[i];
            if (isString(clb)) {
                this.scope[clb].call(this.scope, this, newValue, oldValue);
            } else {
                clb(this, newValue, oldValue);
            }
        }
    };
    /**
     * Check if a property accepts a given type as value.
     * @param {Function} Ctr The constructor for the given type.
     * @return {Boolean}
     */


    Property.prototype.accepts = function accepts(Ctr) {
        return this.ctrs.indexOf(Ctr) !== -1;
    };
    /**
     * Set the property name.
     * It also set the attrName if `.attribute` method as been previously
     * invoked without arguments.
     * @param {String} name The property name.
     * @return {Property} The property instance for chaining.
     */


    Property.prototype.named = function named(name) {
        this.name = name;
        if (this.attrRequested === true) {
            this.attrName = this.name;
        }
        return this;
    };
    /**
     * Set the property initial value.
     * @param {*} initValue The property initial value.
     * @return {Property} The property instance for chaining.
     */


    Property.prototype.default = function _default(initValue) {
        this.defaultValue = isObject(initValue) ? Object.freeze(initValue) : initValue;
        return this;
    };
    /**
     * Set the attribute name to sync.
     * Invoked without arguments, it retrieve the name of the property.
     * @param {String} attrName The attribute name.
     * @return {Property} The property instance for chaining.
     */


    Property.prototype.attribute = function attribute() {
        var attrName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (isString(attrName)) {
            this.attrRequested = false;
            this.attrName = attrName;
        } else {
            this.attrRequested = !!attrName;
            this.attrName = this.name;
        }
        return this;
    };
    /**
     * Add a DOM event name to dispatch on changes.
     * @param {String} evName The event name.
     * @return {Property} The property instance for chaining.
     */


    Property.prototype.dispatch = function dispatch(evName) {
        this.eventName = evName;
        return this;
    };
    /**
     * Set a getter function for the property.
     * By default, the property value will be return.
     * @param {Function} callback The property getter.
     * @return {Property} The property instance for chaining.
     */


    Property.prototype.getter = function getter(callback) {
        var _this2 = this;

        if (isFunction(callback)) {
            this.getterFn = function () {
                return callback(_this2.value);
            };
        }
        return this;
    };
    /**
     * Set a setter function for the property.
     * By default, the property value will be updated with given value
     * without any modification.
     * @param {Function} callback The property setter.
     * @return {Property} The property instance for chaining.
     */


    Property.prototype.setter = function setter(callback) {
        if (isFunction(callback)) {
            this._setter = callback;
        }
        return this;
    };
    /**
     * Set the property validator.
     * A validator should return `true` if the value is acceptable
     * or `false` if unaccaptable.
     * @param {Function} callback The property validtor.
     * @return {Property} The property instance for chaining.
     */


    Property.prototype.validate = function validate(callback) {
        if (isFunction(callback)) {
            this.validator = callback;
        }
        return this;
    };
    /**
     * Check if the given value is a valid type.
     * @private
     * @param {*} val The value to check.
     * @return {Boolean}
     */


    Property.prototype.validateType = function validateType(val) {
        var i = 0;
        var ctrs = this.ctrs;
        if (ctrs.length === 0) {
            return true;
        }
        while (i < ctrs.length) {
            if (val instanceof ctrs[i] || val.constructor && val.constructor === ctrs[i]) {
                return true;
            }
            i++;
        }
        return false;
    };
    /**
     * Attach the property to a scope (a component instance).
     * Set the default value if provided.
     * @param {Object} scope The scope which needs to be bound with the property.
     */


    Property.prototype.init = function init(scope) {
        this.scope = scope;
        define$1(scope, this.name, {
            get: this.getterFn.bind(this),
            set: this.setterFn.bind(this),
            configurable: true
        });
        if (!isUndefined(this.defaultValue)) {
            scope[this.name] = this.defaultValue;
        }
    };

    return Property;
}();

/**
 * Helper method for Property creation.
 * @method prop
 * @memberof! DNA.
 * @static
 *
 * @property {Property} ANY A property without type validation.
 * @property {Property} STRING A property which accepts only strings.
 * @property {Property} BOOLEAN A property which accepts only booleans.
 * @property {Property} NUMBER A property which accepts only numbers.
 *
 * @param {Property|Function|Array} ctrs A Property to clone or a single or a list of valid constructors for the property value.
 * @return {Property} The new property.
 */


function prop(ctrs) {
    if (ctrs instanceof Property) {
        return ctrs;
    }
    return new Property(ctrs);
}

// Define some helpers for default types
define$1(prop, 'ANY', {
    get: function get() {
        return prop();
    }
});
define$1(prop, 'STRING', {
    get: function get() {
        return prop(String);
    }
});
define$1(prop, 'BOOLEAN', {
    get: function get() {
        return prop(Boolean);
    }
});
define$1(prop, 'NUMBER', {
    get: function get() {
        return prop(Number);
    }
});

/**
 * Try to parse attribute value checking the property validation types.
 * @private
 *
 * @param {Property} property The property to update.
 * @param {String} attrVal The attribute value.
 * @return {*} The parsed value.
 */
function getValue(property, attrVal) {
    if (attrVal === '' && property.accepts(Boolean)) {
        return true;
    }
    if (!property.accepts(String)) {
        try {
            return JSON.parse(attrVal);
        } catch (ex) {
            //
        }
    }
    return attrVal;
}

/**
 * Set an attribute value checking its type.
 * @private
 *
 * @param {HTMLElement} context The node to update.
 * @param {String} attr The attribute name to update.
 * @param {*} value The value to set.
 */
function setAttribute$1(context, attr, value) {
    var currentAttrValue = context.getAttribute(attr);
    if (currentAttrValue !== value) {
        if (value !== null && value !== undefined && value !== false) {
            switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
                case 'string':
                case 'number':
                    context.setAttribute(attr, value);
                    break;
                case 'boolean':
                    context.setAttribute(attr, '');
            }
        } else if (currentAttrValue !== null) {
            context.removeAttribute(attr);
        }
    }
}

/**
 * Simple Custom Component for properties initialization via attributes.
 * @mixin PropertiesMixin
 * @memberof DNA.MIXINS
 * @static
 *
 * @example
 * ```js
 * // my-component.js
 * import { BaseComponent } from '@dnajs/core';
 * export class MyComponent extends BaseComponent {
 *   get properties() {
 *     return { name: String };
 *   }
 * }
 * ```
 * ```js
 * // app.js
 * import { define } from '@dnajs/core';
 * import { MyComponent } from './my-component.js';
 * define('my-component', MyComponent);
 * var temp = document.createElement('div');
 * temp.innerHTML = '<my-component name="Albert"></my-component>';
 * var element = temp.firstChild;
 * console.log(element.name); // logs "Albert"
 * ```
 */
var PropertiesMixin = function PropertiesMixin(SuperClass) {
    return function (_SuperClass) {
        inherits(_class, _SuperClass);

        /**
         * Attach properties on component creation.
         * @method constructor
         * @memberof DNA.MIXINS.PropertiesMixin
         * @instance
         */
        function _class() {
            classCallCheck(this, _class);

            var _this = possibleConstructorReturn(this, _SuperClass.call(this));

            var props = _this.properties;
            if (props) {
                if (!isArray(props)) {
                    props = [props];
                }
                props = props.reduce(function (res, partialProps) {
                    for (var k in partialProps) {
                        res[k] = prop(partialProps[k]);
                    }
                    return res;
                }, {});
            } else {
                props = {};
            }
            Object.defineProperty(_this, 'properties', {
                value: props,
                writable: false,
                configurable: true
            });
            var observed = _this.constructor.observedAttributes || [];

            var _loop = function _loop(k) {
                var prop$$1 = props[k];
                prop$$1.named(k).init(_this);
                var attrName = prop$$1.attrName,
                    eventName = prop$$1.eventName;

                if (!attrName && observed.indexOf(k) !== -1) {
                    prop$$1.attribute();
                    attrName = k;
                }
                if (attrName || eventName) {
                    prop$$1.observe(function () {
                        if (attrName) {
                            setAttribute$1(_this.node, attrName, _this[prop$$1.name]);
                        }
                        if (eventName) {
                            dispatch$1(_this.node, eventName);
                        }
                    });
                }
            };

            for (var k in props) {
                _loop(k);
            }
            return _this;
        }
        /**
         * Sync initial attributes with properties.
         * @method connectedCallback
         * @memberof DNA.MIXINS.PropertiesMixin
         * @instance
         */


        _class.prototype.connectedCallback = function connectedCallback() {
            _SuperClass.prototype.connectedCallback.call(this);
            var props = this.properties;
            for (var k in props) {
                var _prop = props[k];
                var _attrName = _prop.attrName;

                if (_attrName) {
                    if (isUndefined(this[_prop.name])) {
                        if (this.node.hasAttribute(_attrName)) {
                            this[_prop.name] = getValue(_prop, this.node.getAttribute(_attrName));
                        }
                    } else {
                        setAttribute$1(this.node, _attrName, this[_prop.name]);
                    }
                }
            }
        };
        /**
         * Sync attributes with properties.
         * @method attributeChangedCallback
         * @memberof DNA.MIXINS.PropertiesMixin
         * @instance
         *
         * @param {String} attrName The changed attribute name.
         * @param {String} oldVal The value of the attribute before the change.
         * @param {String} newVal The value of the attribute after the change.
         */


        _class.prototype.attributeChangedCallback = function attributeChangedCallback(attr, oldVal, newVal) {
            _SuperClass.prototype.attributeChangedCallback.call(this, attr, oldVal, newVal);
            var props = this.properties;
            for (var k in props) {
                var _prop2 = props[k];
                if (_prop2.attrName === attr) {
                    this[_prop2.name] = getValue(_prop2, newVal);
                    return;
                }
            }
        };
        /**
         * Create a listener for node's property changes.
         * @method observeProperty
         * @memberof DNA.MIXINS.PropertiesMixin
         * @instance
         *
         * @param {string} propName The property name to observe.
         * @param {Function} callback The callback to fire.
         * @return {Object} An object with `cancel` method.
         */


        _class.prototype.observeProperty = function observeProperty(propName, callback) {
            return this.properties[propName].observe(callback);
        };
        /**
         * Remove a listener for node's property changes.
         * @method unobserveProperty
         * @memberof DNA.MIXINS.PropertiesMixin
         * @instance
         *
         * @param {string} propName The property name to unobserve.
         * @param {Function} callback The callback to remove.
         */


        _class.prototype.unobserveProperty = function unobserveProperty(propName, callback) {
            this.properties[propName].unobserve(callback);
        };

        return _class;
    }(SuperClass);
};

var ELEM_PROTO = Element.prototype;

var matches = ELEM_PROTO.matches || ELEM_PROTO.matchesSelector || ELEM_PROTO.mozMatchesSelector || ELEM_PROTO.msMatchesSelector || ELEM_PROTO.oMatchesSelector || ELEM_PROTO.webkitMatchesSelector;

var SPLIT_SELECTOR = /([^\s]+)(.*)?/;

/**
 * Simple Custom Component with events delegation,
 * It also implement a `dispatchEvent` wrapper named `trigger`.
 * @mixin EventsMixin
 * @memberof DNA.MIXINS.
 * @static
 *
 * @example
 * ```js
 * // my-component.js
 * import { BaseComponent } from '@dnajs/core';
 * export class MyComponent extends BaseComponent {
 *   get events() {
 *     return {
 *       'click button': 'onButtonClick'
 *     }
 *   }
 *   onButtonClick() {
 *     console.log('button clicked');
 *   }
 * }
 * ```
 * ```js
 * // app.js
 * import { define } from '@dnajs/core';
 * import { MyComponent } from './my-component.js';
 * define('my-component', MyComponent);
 * var element = new MyComponent();
 * var button = document.createElement('button');
 * button.innerText = 'Click me';
 * element.appendChild(button);
 * button.click(); // logs "button clicked"
 * ```
 */
var EventsMixin = function EventsMixin(SuperClass) {
    return function (_SuperClass) {
        inherits(_class, _SuperClass);

        /**
         * Attach and delegate events to the component.
         * @method constructor
         * @memberof DNA.MIXINS.EventsMixin
         * @instance
         */
        function _class() {
            classCallCheck(this, _class);

            // bind events
            var _this = possibleConstructorReturn(this, _SuperClass.call(this));

            var events = _this.events || {};

            var _loop = function _loop(k) {
                var callback = isString(events[k]) ? _this[events[k]] : events[k];
                if (isFunction(callback)) {
                    var rule = k.match(SPLIT_SELECTOR);
                    var evName = rule[1];
                    var selector = (rule[2] || '').trim();
                    if (selector) {
                        _this.delegate(evName, selector, callback);
                    } else {
                        _this.node.addEventListener(evName, function (ev) {
                            callback.call(_this, ev, _this);
                        });
                    }
                } else {
                    throw new TypeError('Invalid callback for event.');
                }
            };

            for (var k in events) {
                _loop(k);
            }
            return _this;
        }
        /**
         * Delegate events to the component descendents.
         * @method delegate
         * @memberof DNA.MIXINS.EventsMixin
         * @instance
         *
         * @param {String} evName The name of the event to delegate.
         * @param {String} selector A CSS selector for descendents.
         * @param {Function} callback The callback to fire when the event fires.
         */


        _class.prototype.delegate = function delegate(evName, selector, callback) {
            var _this2 = this;

            this.node.addEventListener(evName, function (event) {
                var target = event.target;
                while (target && target !== _this2) {
                    if (matches.call(target, selector)) {
                        callback.call(_this2, event, target);
                    }
                    target = target.parentNode;
                }
            });
        };
        /**
         * `Node.prototype.dispatchEvent` wrapper.
         * @method trigger
         * @memberof DNA.MIXINS.EventsMixin
         * @instance
         *
         * @param {String} evName The name of the event to fire.
         * @param {Object} data A set of custom data to pass to the event.
         * @param {Boolean} bubbles Should the event bubble throw the DOM tree.
         * @param {Boolean} cancelable Can be the event cancel by a callback.
         * @return {Boolean} True if event propagation has not be stopped.
         */


        _class.prototype.trigger = function trigger(evName, data) {
            var bubbles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
            var cancelable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

            return dispatch$1(this, evName, data, bubbles, cancelable);
        };

        return _class;
    }(SuperClass);
};

var rootDoc = document;
/**
 * Create and attach a style element for a component.
 * @private
 *
 * @param {HTMLElement} node A component instance.
 * @return {HTMLElement} The created style element.
 */
function createStyle(node) {
    var doc = node.ownerDocument || rootDoc;
    var styleElem = doc.createElement('style');
    styleElem.type = 'text/css';
    styleElem.setAttribute('id', 'style-' + node.is);
    var head = doc.head;
    /* istanbul ignore else */
    if (head.firstElementChild) {
        head.insertBefore(styleElem, head.firstElementChild);
    } else {
        head.appendChild(styleElem);
    }
    return styleElem;
}

/**
 * Simple Custom Component with css style handling using the `css` property.
 * @mixin StyleMixin
 * @memberof DNA.MIXINS
 * @static
 *
 * @example
 * ```js
 * // my-component.js
 * import { BaseComponent } from '@dnajs/core';
 * export class MyComponent extends BaseComponent {
 *   get css() {
 *     return '.my-component p { color: red; }'
 *   }
 * }
 * ```
 * ```js
 * // app.js
 * import { define } from '@dnajs/core';
 * import { MyComponent } from './my-component.js';
 * define('my-component', MyComponent);
 * var element = new MyComponent();
 * var p = document.createElement('p');
 * p.innerText = 'Paragraph';
 * element.appendChild(p); // text inside `p` gets the red color
 * ```
 */
var StyleMixin = function StyleMixin(SuperClass) {
    return function (_SuperClass) {
        inherits(_class, _SuperClass);

        /**
         * Fires when an instance of the element is created.
         */
        function _class() {
            classCallCheck(this, _class);

            var _this = possibleConstructorReturn(this, _SuperClass.call(this));

            if (!_this.constructor.styleElem) {
                var Ctr = _this.constructor;
                Object.defineProperty(Ctr, 'styleElem', {
                    value: createStyle(_this)
                });
            }
            _this.updateCSS();
            return _this;
        }

        _class.prototype.connectedCallback = function connectedCallback() {
            _SuperClass.prototype.connectedCallback.call(this);
            this.node.classList.add(this.is);
        };

        _class.prototype.updateCSS = function updateCSS() {
            var style = this.css;
            if (isString(style)) {
                this.constructor.styleElem.textContent = style;
            }
        };

        return _class;
    }(SuperClass);
};

/**
 * Simple Custom Component with template handling using the `template` property.
 * @memberof DNA.MIXINS
 * @mixin TemplateMixin
 * @static
 *
 * @param {Function} SuperClass The class to extend.
 * @return {Function} The extended class.
 *
 * @example
 * ```js
 * // my-component.js
 * import { BaseComponent } from '@dnajs/core';
 * export class MyComponent extends BaseComponent {
 *   get template() {
 *     return `<h1>${this.name}</h1>`;
 *   }
 *   get name() {
 *     return 'Newton';
 *   }
 * }
 * ```
 * ```js
 * // app.js
 * import { define } from '@dnajs/core';
 * import { MyComponent } from './my-component.js';
 * define('my-component', MyComponent);
 * var element = new MyComponent();
 * console.log(element.innerHTML); // logs "<h1>Newton</h1>"
 * ```
 */
var TemplateMixin = function TemplateMixin(SuperClass) {
    return function (_SuperClass) {
        inherits(_class, _SuperClass);
        createClass(_class, [{
            key: 'autoRender',
            get: function get() {
                return true;
            }
            /**
             * Attach properties observers in order to update children.
             * @method constructor
             * @memberof DNA.MIXINS.TemplateMixin
             * @instance
             */

        }]);

        function _class() {
            classCallCheck(this, _class);

            var _this = possibleConstructorReturn(this, _SuperClass.call(this));

            if (_this.autoRender && !isUndefined(_this.template)) {
                var props = _this.properties;
                if (props) {
                    var callback = function callback() {
                        _this.render();
                    };
                    for (var k in props) {
                        props[k].observe(callback);
                    }
                }
            }
            return _this;
        }
        /**
         * Render the component when connected.
         * @method connectedCallback
         * @memberof DNA.MIXINS.TemplateMixin
         * @instance
         */


        _class.prototype.connectedCallback = function connectedCallback() {
            _SuperClass.prototype.connectedCallback.call(this);
            if (!isUndefined(this.template)) {
                this.render();
            }
        };
        /**
         * Update Component child nodes.
         * @method render
         * @memberof DNA.MIXINS.TemplateMixin
         * @instance
         *
         * @param {Function|string} tpl A template to use instead of `this.template`.
         *
         * @throws {TypeError} Will throw if the template type is not supported.
         */


        _class.prototype.render = function render(tpl) {
            tpl = tpl || this.template;
            /* istanbul ignore else */
            if (isFunction(tpl)) {
                tpl.call(this);
            } else if (isString(tpl)) {
                this.node.innerHTML = tpl;
            } else {
                throw new TypeError('Invalid template property.');
            }
        };

        return _class;
    }(SuperClass);
};

/* eslint-disable prefer-rest-params */
var reduce = Array.prototype.reduce || function (callback /*, initialValue*/) {
    'use strict';

    var t = this;
    var len = t.length;
    var k = 0;
    var value = void 0;
    if (arguments.length === 2) {
        value = arguments[1];
    } else {
        while (k < len && !(k in t)) {
            k++;
        }
        value = t[k++];
    }
    for (; k < len; k++) {
        if (k in t) {
            value = callback(value, t[k], k, t);
        }
    }
    return value;
};

/**
 * @author Justin Fagnani
 * @see https://github.com/justinfagnani/mixwith.js
 */
/**
 * Mix a class with a mixin.
 * @method mix(...).with(...)
 * @memberof! DNA.
 * @static
 *
 * @param {Function} superClass The class to extend.
 * @return {Function} A mixed class.
 *
 * @example
 * ```js
 * // my-super.js
 * export class MySuperClass {
 *     constructor() {
 *         // do something
 *     }
 * }
 * ```
 * ```js
 * // mixin.js
 * export const Mixin = (superClass) => class extend superClass {
 *     constructor() {
 *         super();
 *         // do something else
 *     }
 * };
 * ```
 * ```js
 * import { mix } from '@dnajs/core';
 * import { MySuperClass } from './my-super.js';
 * import { Mixin } from './mixin.js';
 *
 * export class MixedClass extends mix(MySuperClass).with(Mixin) {
 *     ...
 * }
 * ```
 */

/**
 * A Mixin helper class.
 * @ignore
 */

var Mixin = function () {
  /**
   * Create a mixable class.
   * @param {Function} superClass The class to extend.
   */
  function Mixin(superclass) {
    classCallCheck(this, Mixin);

    superclass = superclass || function () {
      function _class() {
        classCallCheck(this, _class);
      }

      return _class;
    }();
    this.superclass = superclass;
  }
  /**
   * Mix the super class with a list of mixins.
   * @param {...Function} mixins *N* mixin functions.
   * @return {Function} The extended class.
   */


  Mixin.prototype.with = function _with() {
    // eslint-disable-next-line
    var args = [].slice.call(arguments, 0);
    return reduce.call(args, function (c, mixin) {
      return mixin(c);
    }, this.superclass);
  };

  return Mixin;
}();

/**
 * Create a Mixin instance.
 * @ignore
 */


var mix = function mix(superClass) {
  return new Mixin(superClass);
};

/**
 * Check if a node is already instantiated HTMLElement for programmatically `constructor` calls.
 * @private
 * @param {HTMLElement} node The node to check.
 * @return {Boolean} The node should be instantiated.
 */
function isNew(node) {
    try {
        return !isString(node.outerHTML);
    } catch (ex) {
        return true;
    }
}

/**
 * Shim original Element constructors in order to be used with `new`.
 * @method shim
 * @memberof! DNA.
 * @static
 *
 * @param {Function} Original The original constructor to shim.
 * @return {Function} The shimmed constructor.
 *
 * @example
 * ```js
 * // shim audio element
 * import { shim } from '@dnajs/core';
 *
 * class MyAudio extends shim(HTMLAudioElement) {
 *     ...
 * }
 *
 * let audio = new MyAudio();
 * ```
 */
function shim(Original) {
    var Polyfilled = function Polyfilled() {
        classCallCheck(this, Polyfilled);

        if (!isNew(this)) {
            return this;
        }
        var desc = registry.getDescriptor(this.constructor);
        var config = desc.config;
        // Find the tagname of the constructor and create a new element with it
        var element = document.createElement(config.extends ? config.extends : desc.is);
        element.__proto__ = desc.Ctr.prototype;
        if (config.extends) {
            element.setAttribute('is', desc.is);
        }
        return element;
    };
    // Clone the prototype overriding the constructor.


    Polyfilled.prototype = Object.create(Original.prototype, {
        constructor: {
            value: Polyfilled,
            configurable: true,
            writable: true
        }
    });
    return Polyfilled;
}

/**
 * A set of DOM helpers for callbacks trigger when Custom Elements
 * are not supported by the browser.
 * @name DOM
 * @namespace DOM
 * @memberof! DNA.
 * @static
 */
var DOM = DOM_HELPERS;
/**
 * A set of core mixins.
 * @name MIXINS
 * @namespace MIXINS
 * @memberof! DNA.
 * @static
 */
var MIXINS = {
  ComponentMixin: ComponentMixin,
  PropertiesMixin: PropertiesMixin,
  EventsMixin: EventsMixin,
  StyleMixin: StyleMixin,
  TemplateMixin: TemplateMixin
};

/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A cached reference to the hasOwnProperty function.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * A constructor function that will create blank objects.
 * @constructor
 */
function Blank() {}

Blank.prototype = Object.create(null);

/**
 * Used to prevent property collisions between our "map" and its prototype.
 * @param {!Object<string, *>} map The map to check.
 * @param {string} property The property to check.
 * @return {boolean} Whether map has property.
 */
var has = function has(map, property) {
  return hasOwnProperty.call(map, property);
};

/**
 * Creates an map object without a prototype.
 * @return {!Object}
 */
var createMap = function createMap() {
  return new Blank();
};

/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Keeps track of information needed to perform diffs for a given DOM node.
 * @param {!string} nodeName
 * @param {?string=} key
 * @constructor
 */
function NodeData(nodeName, key) {
  /**
   * The attributes and their values.
   * @const {!Object<string, *>}
   */
  this.attrs = createMap();

  /**
   * An array of attribute name/value pairs, used for quickly diffing the
   * incomming attributes to see if the DOM node's attributes need to be
   * updated.
   * @const {Array<*>}
   */
  this.attrsArr = [];

  /**
   * The incoming attributes for this Node, before they are updated.
   * @const {!Object<string, *>}
   */
  this.newAttrs = createMap();

  /**
   * Whether or not the statics have been applied for the node yet.
   * {boolean}
   */
  this.staticsApplied = false;

  /**
   * The key used to identify this node, used to preserve DOM nodes when they
   * move within their parent.
   * @const
   */
  this.key = key;

  /**
   * Keeps track of children within this node by their key.
   * {!Object<string, !Element>}
   */
  this.keyMap = createMap();

  /**
   * Whether or not the keyMap is currently valid.
   * @type {boolean}
   */
  this.keyMapValid = true;

  /**
   * Whether or the associated node is, or contains, a focused Element.
   * @type {boolean}
   */
  this.focused = false;

  /**
   * The node name for this node.
   * @const {string}
   */
  this.nodeName = nodeName;

  /**
   * @type {?string}
   */
  this.text = null;
}

/**
 * Initializes a NodeData object for a Node.
 *
 * @param {Node} node The node to initialize data for.
 * @param {string} nodeName The node name of node.
 * @param {?string=} key The key that identifies the node.
 * @return {!NodeData} The newly initialized data object
 */
var initData = function initData(node, nodeName, key) {
  var data = new NodeData(nodeName, key);
  node['__incrementalDOMData'] = data;
  return data;
};

/**
 * Retrieves the NodeData object for a Node, creating it if necessary.
 *
 * @param {?Node} node The Node to retrieve the data for.
 * @return {!NodeData} The NodeData for this Node.
 */
var getData = function getData(node) {
  importNode(node);
  return node['__incrementalDOMData'];
};

/**
 * Imports node and its subtree, initializing caches.
 *
 * @param {?Node} node The Node to import.
 */
var importNode = function importNode(node) {
  if (node['__incrementalDOMData']) {
    return;
  }

  var isElement = node instanceof Element;
  var nodeName = isElement ? node.localName : node.nodeName;
  var key = isElement ? node.getAttribute('key') : null;
  var data = initData(node, nodeName, key);

  if (key) {
    getData(node.parentNode).keyMap[key] = node;
  }

  if (isElement) {
    var attributes = node.attributes;
    var attrs = data.attrs;
    var newAttrs = data.newAttrs;
    var attrsArr = data.attrsArr;

    for (var i = 0; i < attributes.length; i += 1) {
      var attr = attributes[i];
      var name = attr.name;
      var value = attr.value;

      attrs[name] = value;
      newAttrs[name] = undefined;
      attrsArr.push(name);
      attrsArr.push(value);
    }
  }

  for (var child = node.firstChild; child; child = child.nextSibling) {
    importNode(child);
  }
};

/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Gets the namespace to create an element (of a given tag) in.
 * @param {string} tag The tag to get the namespace for.
 * @param {?Node} parent
 * @return {?string} The namespace to create the tag in.
 */
var getNamespaceForTag = function getNamespaceForTag(tag, parent) {
  if (tag === 'svg') {
    return 'http://www.w3.org/2000/svg';
  }

  if (getData(parent).nodeName === 'foreignObject') {
    return null;
  }

  return parent.namespaceURI;
};

/**
 * Creates an Element.
 * @param {Document} doc The document with which to create the Element.
 * @param {?Node} parent
 * @param {string} tag The tag for the Element.
 * @param {?string=} key A key to identify the Element.
 * @return {!Element}
 */
var createElement$1 = function createElement$1(doc, parent, tag, key) {
  var namespace = getNamespaceForTag(tag, parent);
  var el = void 0;

  if (namespace) {
    el = doc.createElementNS(namespace, tag);
  } else {
    el = doc.createElement(tag);
  }

  initData(el, tag, key);

  return el;
};

/**
 * Creates a Text Node.
 * @param {Document} doc The document with which to create the Element.
 * @return {!Text}
 */
var createText = function createText(doc) {
  var node = doc.createTextNode('');
  initData(node, '#text', null);
  return node;
};

/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @const */
var notifications = {
  /**
   * Called after patch has compleated with any Nodes that have been created
   * and added to the DOM.
   * @type {?function(Array<!Node>)}
   */
  nodesCreated: null,

  /**
   * Called after patch has compleated with any Nodes that have been removed
   * from the DOM.
   * Note it's an applications responsibility to handle any childNodes.
   * @type {?function(Array<!Node>)}
   */
  nodesDeleted: null
};

/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Keeps track of the state of a patch.
 * @constructor
 */
function Context() {
  /**
   * @type {(Array<!Node>|undefined)}
   */
  this.created = notifications.nodesCreated && [];

  /**
   * @type {(Array<!Node>|undefined)}
   */
  this.deleted = notifications.nodesDeleted && [];
}

/**
 * @param {!Node} node
 */
Context.prototype.markCreated = function (node) {
  if (this.created) {
    this.created.push(node);
  }
};

/**
 * @param {!Node} node
 */
Context.prototype.markDeleted = function (node) {
  if (this.deleted) {
    this.deleted.push(node);
  }
};

/**
 * Notifies about nodes that were created during the patch opearation.
 */
Context.prototype.notifyChanges = function () {
  if (this.created && this.created.length > 0) {
    notifications.nodesCreated(this.created);
  }

  if (this.deleted && this.deleted.length > 0) {
    notifications.nodesDeleted(this.deleted);
  }
};

/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
  * Keeps track whether or not we are in an attributes declaration (after
  * elementOpenStart, but before elementOpenEnd).
  * @type {boolean}
  */
var inAttributes = false;

/**
  * Keeps track whether or not we are in an element that should not have its
  * children cleared.
  * @type {boolean}
  */
var inSkip = false;

/**
 * Makes sure that a patch closes every node that it opened.
 * @param {?Node} openElement
 * @param {!Node|!DocumentFragment} root
 */
var assertNoUnclosedTags = function assertNoUnclosedTags(openElement, root) {
  if (openElement === root) {
    return;
  }

  var currentElement = openElement;
  var openTags = [];
  while (currentElement && currentElement !== root) {
    openTags.push(currentElement.nodeName.toLowerCase());
    currentElement = currentElement.parentNode;
  }

  throw new Error('One or more tags were not closed:\n' + openTags.join('\n'));
};

/**
 * Makes sure that the caller is not where attributes are expected.
 * @param {string} functionName
 */
var assertNotInAttributes = function assertNotInAttributes(functionName) {
  if (inAttributes) {
    throw new Error(functionName + '() can not be called between ' + 'elementOpenStart() and elementOpenEnd().');
  }
};

/**
 * Makes sure that the caller is not inside an element that has declared skip.
 * @param {string} functionName
 */
var assertNotInSkip = function assertNotInSkip(functionName) {
  if (inSkip) {
    throw new Error(functionName + '() may not be called inside an element ' + 'that has called skip().');
  }
};

/**
 * Makes sure that the caller is where attributes are expected.
 * @param {string} functionName
 */
var assertInAttributes = function assertInAttributes(functionName) {
  if (!inAttributes) {
    throw new Error(functionName + '() can only be called after calling ' + 'elementOpenStart().');
  }
};

/**
 * Makes sure the patch closes virtual attributes call
 */
var assertVirtualAttributesClosed = function assertVirtualAttributesClosed() {
  if (inAttributes) {
    throw new Error('elementOpenEnd() must be called after calling ' + 'elementOpenStart().');
  }
};

/**
  * Makes sure that tags are correctly nested.
  * @param {string} nodeName
  * @param {string} tag
  */
var assertCloseMatchesOpenTag = function assertCloseMatchesOpenTag(nodeName, tag) {
  if (nodeName !== tag) {
    throw new Error('Received a call to close "' + tag + '" but "' + nodeName + '" was open.');
  }
};

/**
 * Makes sure that no children elements have been declared yet in the current
 * element.
 * @param {string} functionName
 * @param {?Node} previousNode
 */
var assertNoChildrenDeclaredYet = function assertNoChildrenDeclaredYet(functionName, previousNode) {
  if (previousNode !== null) {
    throw new Error(functionName + '() must come before any child ' + 'declarations inside the current element.');
  }
};

/**
 * Checks that a call to patchOuter actually patched the element.
 * @param {?Node} startNode The value for the currentNode when the patch
 *     started.
 * @param {?Node} currentNode The currentNode when the patch finished.
 * @param {?Node} expectedNextNode The Node that is expected to follow the
 *    currentNode after the patch;
 * @param {?Node} expectedPrevNode The Node that is expected to preceed the
 *    currentNode after the patch.
 */
var assertPatchElementNoExtras = function assertPatchElementNoExtras(startNode, currentNode, expectedNextNode, expectedPrevNode) {
  var wasUpdated = currentNode.nextSibling === expectedNextNode && currentNode.previousSibling === expectedPrevNode;
  var wasChanged = currentNode.nextSibling === startNode.nextSibling && currentNode.previousSibling === expectedPrevNode;
  var wasRemoved = currentNode === startNode;

  if (!wasUpdated && !wasChanged && !wasRemoved) {
    throw new Error('There must be exactly one top level call corresponding ' + 'to the patched element.');
  }
};

/**
 * Updates the state of being in an attribute declaration.
 * @param {boolean} value
 * @return {boolean} the previous value.
 */
var setInAttributes = function setInAttributes(value) {
  var previous = inAttributes;
  inAttributes = value;
  return previous;
};

/**
 * Updates the state of being in a skip element.
 * @param {boolean} value
 * @return {boolean} the previous value.
 */
var setInSkip = function setInSkip(value) {
  var previous = inSkip;
  inSkip = value;
  return previous;
};

/**
 * Copyright 2016 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @param {!Node} node
 * @return {boolean} True if the node the root of a document, false otherwise.
 */
var isDocumentRoot = function isDocumentRoot(node) {
  // For ShadowRoots, check if they are a DocumentFragment instead of if they
  // are a ShadowRoot so that this can work in 'use strict' if ShadowRoots are
  // not supported.
  return node instanceof Document || node instanceof DocumentFragment;
};

/**
 * @param {!Node} node The node to start at, inclusive.
 * @param {?Node} root The root ancestor to get until, exclusive.
 * @return {!Array<!Node>} The ancestry of DOM nodes.
 */
var getAncestry = function getAncestry(node, root) {
  var ancestry = [];
  var cur = node;

  while (cur !== root) {
    ancestry.push(cur);
    cur = cur.parentNode;
  }

  return ancestry;
};

/**
 * @param {!Node} node
 * @return {!Node} The root node of the DOM tree that contains node.
 */
var getRoot = function getRoot(node) {
  var cur = node;
  var prev = cur;

  while (cur) {
    prev = cur;
    cur = cur.parentNode;
  }

  return prev;
};

/**
 * @param {!Node} node The node to get the activeElement for.
 * @return {?Element} The activeElement in the Document or ShadowRoot
 *     corresponding to node, if present.
 */
var getActiveElement = function getActiveElement(node) {
  var root = getRoot(node);
  return isDocumentRoot(root) ? root.activeElement : null;
};

/**
 * Gets the path of nodes that contain the focused node in the same document as
 * a reference node, up until the root.
 * @param {!Node} node The reference node to get the activeElement for.
 * @param {?Node} root The root to get the focused path until.
 * @return {!Array<Node>}
 */
var getFocusedPath = function getFocusedPath(node, root) {
  var activeElement = getActiveElement(node);

  if (!activeElement || !node.contains(activeElement)) {
    return [];
  }

  return getAncestry(activeElement, root);
};

/**
 * Like insertBefore, but instead instead of moving the desired node, instead
 * moves all the other nodes after.
 * @param {?Node} parentNode
 * @param {!Node} node
 * @param {?Node} referenceNode
 */
var moveBefore = function moveBefore(parentNode, node, referenceNode) {
  var insertReferenceNode = node.nextSibling;
  var cur = referenceNode;

  while (cur !== node) {
    var next = cur.nextSibling;
    parentNode.insertBefore(cur, insertReferenceNode);
    cur = next;
  }
};

/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @type {?Context} */
var context = null;

/** @type {?Node} */
var currentNode = null;

/** @type {?Node} */
var currentParent = null;

/** @type {?Document} */
var doc = null;

/**
 * @param {!Array<Node>} focusPath The nodes to mark.
 * @param {boolean} focused Whether or not they are focused.
 */
var markFocused = function markFocused(focusPath, focused) {
  for (var i = 0; i < focusPath.length; i += 1) {
    getData(focusPath[i]).focused = focused;
  }
};

/**
 * Returns a patcher function that sets up and restores a patch context,
 * running the run function with the provided data.
 * @param {function((!Element|!DocumentFragment),!function(T),T=): ?Node} run
 * @return {function((!Element|!DocumentFragment),!function(T),T=): ?Node}
 * @template T
 */
var patchFactory = function patchFactory(run) {
  /**
   * TODO(moz): These annotations won't be necessary once we switch to Closure
   * Compiler's new type inference. Remove these once the switch is done.
   *
   * @param {(!Element|!DocumentFragment)} node
   * @param {!function(T)} fn
   * @param {T=} data
   * @return {?Node} node
   * @template T
   */
  var f = function f(node, fn, data) {
    var prevContext = context;
    var prevDoc = doc;
    var prevCurrentNode = currentNode;
    var prevCurrentParent = currentParent;
    var previousInAttributes = false;
    var previousInSkip = false;

    context = new Context();
    doc = node.ownerDocument;
    currentParent = node.parentNode;

    {
      previousInAttributes = setInAttributes(false);
      previousInSkip = setInSkip(false);
    }

    var focusPath = getFocusedPath(node, currentParent);
    markFocused(focusPath, true);
    var retVal = run(node, fn, data);
    markFocused(focusPath, false);

    {
      assertVirtualAttributesClosed();
      setInAttributes(previousInAttributes);
      setInSkip(previousInSkip);
    }

    context.notifyChanges();

    context = prevContext;
    doc = prevDoc;
    currentNode = prevCurrentNode;
    currentParent = prevCurrentParent;

    return retVal;
  };
  return f;
};

/**
 * Patches the document starting at node with the provided function. This
 * function may be called during an existing patch operation.
 * @param {!Element|!DocumentFragment} node The Element or Document
 *     to patch.
 * @param {!function(T)} fn A function containing elementOpen/elementClose/etc.
 *     calls that describe the DOM.
 * @param {T=} data An argument passed to fn to represent DOM state.
 * @return {!Node} The patched node.
 * @template T
 */
var patchInner = patchFactory(function (node, fn, data) {
  currentNode = node;

  enterNode();
  fn(data);
  exitNode();

  {
    assertNoUnclosedTags(currentNode, node);
  }

  return node;
});

/**
 * Checks whether or not the current node matches the specified nodeName and
 * key.
 *
 * @param {!Node} matchNode A node to match the data to.
 * @param {?string} nodeName The nodeName for this node.
 * @param {?string=} key An optional key that identifies a node.
 * @return {boolean} True if the node matches, false otherwise.
 */
var matches$1 = function matches$1(matchNode, nodeName, key) {
  var data = getData(matchNode);

  // Key check is done using double equals as we want to treat a null key the
  // same as undefined. This should be okay as the only values allowed are
  // strings, null and undefined so the == semantics are not too weird.
  return nodeName === data.nodeName && key == data.key;
};

/**
 * Aligns the virtual Element definition with the actual DOM, moving the
 * corresponding DOM node to the correct location or creating it if necessary.
 * @param {string} nodeName For an Element, this should be a valid tag string.
 *     For a Text, this should be #text.
 * @param {?string=} key The key used to identify this element.
 */
var alignWithDOM = function alignWithDOM(nodeName, key) {
  if (currentNode && matches$1(currentNode, nodeName, key)) {
    return;
  }

  var parentData = getData(currentParent);
  var currentNodeData = currentNode && getData(currentNode);
  var keyMap = parentData.keyMap;
  var node = void 0;

  // Check to see if the node has moved within the parent.
  if (key) {
    var keyNode = keyMap[key];
    if (keyNode) {
      if (matches$1(keyNode, nodeName, key)) {
        node = keyNode;
      } else if (keyNode === currentNode) {
        context.markDeleted(keyNode);
      } else {
        removeChild$1(currentParent, keyNode, keyMap);
      }
    }
  }

  // Create the node if it doesn't exist.
  if (!node) {
    if (nodeName === '#text') {
      node = createText(doc);
    } else {
      node = createElement$1(doc, currentParent, nodeName, key);
    }

    if (key) {
      keyMap[key] = node;
    }

    context.markCreated(node);
  }

  // Re-order the node into the right position, preserving focus if either
  // node or currentNode are focused by making sure that they are not detached
  // from the DOM.
  if (getData(node).focused) {
    // Move everything else before the node.
    moveBefore(currentParent, node, currentNode);
  } else if (currentNodeData && currentNodeData.key && !currentNodeData.focused) {
    // Remove the currentNode, which can always be added back since we hold a
    // reference through the keyMap. This prevents a large number of moves when
    // a keyed item is removed or moved backwards in the DOM.
    currentParent.replaceChild(node, currentNode);
    parentData.keyMapValid = false;
  } else {
    currentParent.insertBefore(node, currentNode);
  }

  currentNode = node;
};

/**
 * @param {?Node} node
 * @param {?Node} child
 * @param {?Object<string, !Element>} keyMap
 */
var removeChild$1 = function removeChild$1(node, child, keyMap) {
  node.removeChild(child);
  context.markDeleted( /** @type {!Node}*/child);

  var key = getData(child).key;
  if (key) {
    delete keyMap[key];
  }
};

/**
 * Clears out any unvisited Nodes, as the corresponding virtual element
 * functions were never called for them.
 */
var clearUnvisitedDOM = function clearUnvisitedDOM() {
  var node = currentParent;
  var data = getData(node);
  var keyMap = data.keyMap;
  var keyMapValid = data.keyMapValid;
  var child = node.lastChild;
  var key = void 0;

  if (child === currentNode && keyMapValid) {
    return;
  }

  while (child !== currentNode) {
    removeChild$1(node, child, keyMap);
    child = node.lastChild;
  }

  // Clean the keyMap, removing any unusued keys.
  if (!keyMapValid) {
    for (key in keyMap) {
      child = keyMap[key];
      if (child.parentNode !== node) {
        context.markDeleted(child);
        delete keyMap[key];
      }
    }

    data.keyMapValid = true;
  }
};

/**
 * Changes to the first child of the current node.
 */
var enterNode = function enterNode() {
  currentParent = currentNode;
  currentNode = null;
};

/**
 * @return {?Node} The next Node to be patched.
 */
var getNextNode = function getNextNode() {
  if (currentNode) {
    return currentNode.nextSibling;
  } else {
    return currentParent.firstChild;
  }
};

/**
 * Changes to the next sibling of the current node.
 */
var nextNode = function nextNode() {
  currentNode = getNextNode();
};

/**
 * Changes to the parent of the current node, removing any unvisited children.
 */
var exitNode = function exitNode() {
  clearUnvisitedDOM();

  currentNode = currentParent;
  currentParent = currentParent.parentNode;
};

/**
 * Makes sure that the current node is an Element with a matching tagName and
 * key.
 *
 * @param {string} tag The element's tag.
 * @param {?string=} key The key used to identify this element. This can be an
 *     empty string, but performance may be better if a unique value is used
 *     when iterating over an array of items.
 * @return {!Element} The corresponding Element.
 */
var elementOpen = function elementOpen(tag, key) {
  nextNode();
  alignWithDOM(tag, key);
  enterNode();
  return (/** @type {!Element} */currentParent
  );
};

/**
 * Closes the currently open Element, removing any unvisited children if
 * necessary.
 *
 * @return {!Element} The corresponding Element.
 */
var elementClose = function elementClose() {
  {
    setInSkip(false);
  }

  exitNode();
  return (/** @type {!Element} */currentNode
  );
};

/**
 * Makes sure the current node is a Text node and creates a Text node if it is
 * not.
 *
 * @return {!Text} The corresponding Text Node.
 */
var text = function text() {
  nextNode();
  alignWithDOM('#text', null);
  return (/** @type {!Text} */currentNode
  );
};

/**
 * Skips the children in a subtree, allowing an Element to be closed without
 * clearing out the children.
 */
var skip = function skip() {
  {
    assertNoChildrenDeclaredYet('skip', currentNode);
    setInSkip(true);
  }
  currentNode = currentParent.lastChild;
};

/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @const */
var symbols = {
  default: '__default'
};

/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @param {string} name
 * @return {string|undefined} The namespace to use for the attribute.
 */
var getNamespace = function getNamespace(name) {
  if (name.lastIndexOf('xml:', 0) === 0) {
    return 'http://www.w3.org/XML/1998/namespace';
  }

  if (name.lastIndexOf('xlink:', 0) === 0) {
    return 'http://www.w3.org/1999/xlink';
  }
};

/**
 * Applies an attribute or property to a given Element. If the value is null
 * or undefined, it is removed from the Element. Otherwise, the value is set
 * as an attribute.
 * @param {!Element} el
 * @param {string} name The attribute's name.
 * @param {?(boolean|number|string)=} value The attribute's value.
 */
var applyAttr = function applyAttr(el, name, value) {
  if (value == null) {
    el.removeAttribute(name);
  } else {
    var attrNS = getNamespace(name);
    if (attrNS) {
      el.setAttributeNS(attrNS, name, value);
    } else {
      el.setAttribute(name, value);
    }
  }
};

/**
 * Applies a property to a given Element.
 * @param {!Element} el
 * @param {string} name The property's name.
 * @param {*} value The property's value.
 */
var applyProp = function applyProp(el, name, value) {
  el[name] = value;
};

/**
 * Applies a value to a style declaration. Supports CSS custom properties by
 * setting properties containing a dash using CSSStyleDeclaration.setProperty.
 * @param {CSSStyleDeclaration} style
 * @param {!string} prop
 * @param {*} value
 */
var setStyleValue = function setStyleValue(style, prop, value) {
  if (prop.indexOf('-') >= 0) {
    style.setProperty(prop, /** @type {string} */value);
  } else {
    style[prop] = value;
  }
};

/**
 * Applies a style to an Element. No vendor prefix expansion is done for
 * property names/values.
 * @param {!Element} el
 * @param {string} name The attribute's name.
 * @param {*} style The style to set. Either a string of css or an object
 *     containing property-value pairs.
 */
var applyStyle = function applyStyle(el, name, style) {
  if (typeof style === 'string') {
    el.style.cssText = style;
  } else {
    el.style.cssText = '';
    var elStyle = el.style;
    var obj = /** @type {!Object<string,string>} */style;

    for (var prop in obj) {
      if (has(obj, prop)) {
        setStyleValue(elStyle, prop, obj[prop]);
      }
    }
  }
};

/**
 * Updates a single attribute on an Element.
 * @param {!Element} el
 * @param {string} name The attribute's name.
 * @param {*} value The attribute's value. If the value is an object or
 *     function it is set on the Element, otherwise, it is set as an HTML
 *     attribute.
 */
var applyAttributeTyped = function applyAttributeTyped(el, name, value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

  if (type === 'object' || type === 'function') {
    applyProp(el, name, value);
  } else {
    applyAttr(el, name, /** @type {?(boolean|number|string)} */value);
  }
};

/**
 * Calls the appropriate attribute mutator for this attribute.
 * @param {!Element} el
 * @param {string} name The attribute's name.
 * @param {*} value The attribute's value.
 */
var updateAttribute = function updateAttribute(el, name, value) {
  var data = getData(el);
  var attrs = data.attrs;

  if (attrs[name] === value) {
    return;
  }

  var mutator = attributes[name] || attributes[symbols.default];
  mutator(el, name, value);

  attrs[name] = value;
};

/**
 * A publicly mutable object to provide custom mutators for attributes.
 * @const {!Object<string, function(!Element, string, *)>}
 */
var attributes = createMap();

// Special generic mutator that's called for any attribute that does not
// have a specific mutator.
attributes[symbols.default] = applyAttributeTyped;

attributes['style'] = applyStyle;

/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The offset in the virtual element declaration where the attributes are
 * specified.
 * @const
 */
var ATTRIBUTES_OFFSET = 3;

/**
 * Builds an array of arguments for use with elementOpenStart, attr and
 * elementOpenEnd.
 * @const {Array<*>}
 */
var argsBuilder = [];

/**
 * @param {string} tag The element's tag.
 * @param {?string=} key The key used to identify this element. This can be an
 *     empty string, but performance may be better if a unique value is used
 *     when iterating over an array of items.
 * @param {?Array<*>=} statics An array of attribute name/value pairs of the
 *     static attributes for the Element. These will only be set once when the
 *     Element is created.
 * @param {...*} var_args, Attribute name/value pairs of the dynamic attributes
 *     for the Element.
 * @return {!Element} The corresponding Element.
 */
var elementOpen$1 = function elementOpen$1(tag, key, statics, var_args) {
  {
    assertNotInAttributes('elementOpen');
    assertNotInSkip('elementOpen');
  }

  var node = elementOpen(tag, key);
  var data = getData(node);

  if (!data.staticsApplied) {
    if (statics) {
      for (var _i = 0; _i < statics.length; _i += 2) {
        var name = /** @type {string} */statics[_i];
        var value = statics[_i + 1];
        updateAttribute(node, name, value);
      }
    }
    // Down the road, we may want to keep track of the statics array to use it
    // as an additional signal about whether a node matches or not. For now,
    // just use a marker so that we do not reapply statics.
    data.staticsApplied = true;
  }

  /*
   * Checks to see if one or more attributes have changed for a given Element.
   * When no attributes have changed, this is much faster than checking each
   * individual argument. When attributes have changed, the overhead of this is
   * minimal.
   */
  var attrsArr = data.attrsArr;
  var newAttrs = data.newAttrs;
  var isNew = !attrsArr.length;
  var i = ATTRIBUTES_OFFSET;
  var j = 0;

  for (; i < arguments.length; i += 2, j += 2) {
    var _attr = arguments[i];
    if (isNew) {
      attrsArr[j] = _attr;
      newAttrs[_attr] = undefined;
    } else if (attrsArr[j] !== _attr) {
      break;
    }

    var _value = arguments[i + 1];
    if (isNew || attrsArr[j + 1] !== _value) {
      attrsArr[j + 1] = _value;
      updateAttribute(node, _attr, _value);
    }
  }

  if (i < arguments.length || j < attrsArr.length) {
    for (; i < arguments.length; i += 1, j += 1) {
      attrsArr[j] = arguments[i];
    }

    if (j < attrsArr.length) {
      attrsArr.length = j;
    }

    /*
     * Actually perform the attribute update.
     */
    for (i = 0; i < attrsArr.length; i += 2) {
      var _name = /** @type {string} */attrsArr[i];
      var _value2 = attrsArr[i + 1];
      newAttrs[_name] = _value2;
    }

    for (var _attr2 in newAttrs) {
      updateAttribute(node, _attr2, newAttrs[_attr2]);
      newAttrs[_attr2] = undefined;
    }
  }

  return node;
};

/**
 * Declares a virtual Element at the current location in the document. This
 * corresponds to an opening tag and a elementClose tag is required. This is
 * like elementOpen, but the attributes are defined using the attr function
 * rather than being passed as arguments. Must be folllowed by 0 or more calls
 * to attr, then a call to elementOpenEnd.
 * @param {string} tag The element's tag.
 * @param {?string=} key The key used to identify this element. This can be an
 *     empty string, but performance may be better if a unique value is used
 *     when iterating over an array of items.
 * @param {?Array<*>=} statics An array of attribute name/value pairs of the
 *     static attributes for the Element. These will only be set once when the
 *     Element is created.
 */
var elementOpenStart = function elementOpenStart(tag, key, statics) {
  {
    assertNotInAttributes('elementOpenStart');
    setInAttributes(true);
  }

  argsBuilder[0] = tag;
  argsBuilder[1] = key;
  argsBuilder[2] = statics;
};

/***
 * Defines a virtual attribute at this point of the DOM. This is only valid
 * when called between elementOpenStart and elementOpenEnd.
 *
 * @param {string} name
 * @param {*} value
 */
var attr = function attr(name, value) {
  {
    assertInAttributes('attr');
  }

  argsBuilder.push(name);
  argsBuilder.push(value);
};

/**
 * Closes an open tag started with elementOpenStart.
 * @return {!Element} The corresponding Element.
 */
var elementOpenEnd = function elementOpenEnd() {
  {
    assertInAttributes('elementOpenEnd');
    setInAttributes(false);
  }

  var node = elementOpen$1.apply(null, argsBuilder);
  argsBuilder.length = 0;
  return node;
};

/**
 * Closes an open virtual Element.
 *
 * @param {string} tag The element's tag.
 * @return {!Element} The corresponding Element.
 */
var elementClose$1 = function elementClose$1(tag) {
  {
    assertNotInAttributes('elementClose');
  }

  var node = elementClose();

  {
    assertCloseMatchesOpenTag(getData(node).nodeName, tag);
  }

  return node;
};

/**
 * Declares a virtual Text at this point in the document.
 *
 * @param {string|number|boolean} value The value of the Text.
 * @param {...(function((string|number|boolean)):string)} var_args
 *     Functions to format the value which are called only when the value has
 *     changed.
 * @return {!Text} The corresponding text node.
 */
var text$1 = function text$1(value, var_args) {
  {
    assertNotInAttributes('text');
    assertNotInSkip('text');
  }

  var node = text();
  var data = getData(node);

  if (data.text !== value) {
    data.text = /** @type {string} */value;

    var formatted = value;
    for (var i = 1; i < arguments.length; i += 1) {
      /*
       * Call the formatter function directly to prevent leaking arguments.
       * https://github.com/google/incremental-dom/pull/204#issuecomment-178223574
       */
      var fn = arguments[i];
      formatted = fn(formatted);
    }

    node.data = formatted;
  }

  return node;
};

/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function handleChildren(children) {
    children.forEach(function (child) {
        if (isFunction(child)) {
            child();
        } else if (isArray(child)) {
            handleChildren(child);
        } else if (child) {
            text$1(child);
        }
    });
}

function interpolate(template, data) {
    var _this = this;

    if (isFunction(template)) {
        var res = template.call(this, data);
        interpolate.call(this, res);
    } else if (isArray(template)) {
        template.forEach(function (chunk) {
            interpolate.call(_this, chunk);
        });
    }
}

function h(element, props) {
    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
    }

    return function () {
        elementOpenStart(element);

        if (!isObject(props)) {
            if (props) {
                children.unshift(props);
            }
            props = {};
        }

        for (var k in props) {
            attr(k, props[k]);
        }

        var node = elementOpenEnd(element);
        var isComponent = DOM.getComponent(node);

        if (isComponent) {
            skip();
        } else {
            handleChildren(children);
        }
        elementClose$1(element);
        return node;
    };
}

function patch$$1(scope, fn, data) {
    return patchInner(scope, interpolate.bind(this, fn, data));
}



var idom = Object.freeze({
	h: h,
	patch: patch$$1,
	text: text$1
});

var IDOMTemplateMixin = function IDOMTemplateMixin(superClass) {
    return function (_superClass) {
        inherits(_class, _superClass);

        function _class() {
            classCallCheck(this, _class);
            return possibleConstructorReturn(this, _superClass.apply(this, arguments));
        }

        _class.prototype.render = function render(template) {
            var _this2 = this;

            template = template || this.template;
            if (isFunction(template)) {
                (function () {
                    var tpl = template.bind(_this2);
                    template = function template() {
                        return patch$$1(_this2, tpl);
                    };
                })();
            }
            _superClass.prototype.render.call(this, template);
        };

        return _class;
    }(superClass);
};

/**
 * DNA
 * (c) 2015-2016 Chialab (http://www.chialab.com) <dev@chialab.io>
 * http://dna.chialab.io
 *
 * Just another components pattern.
 * Use with Custom Elements specs.
 */
/**
 * Register a new component.
 * @method define
 * @memberof! DNA.
 * @static
 *
 * @param {String} name The id of the component.
 * @param {Function} Ctr The component constructor.
 * @param {Object} config Optional component configuration.
 */
function define$2(tagName, Component, config) {
  return registry.define(tagName, Component, config);
}
/**
 * Create and append a new component instance.
 * @method render
 * @memberof! DNA.
 * @static
 *
 * @param {HTMLElement} node The parent node.
 * @param {Function} Component The component constructor.
 * @param {Object} props Optional set of properties to set to the component.
 * @return {HTMLElement} The new component instance.
 */
function render$1(node, Component, props) {
  var element = new Component();
  for (var k in props) {
    element[k] = props[k];
  }
  DOM.appendChild(node, element);
  return element;
}

/**
 * Simple Custom Component with some behaviors.
 * @class BaseComponent
 * @extends HTMLElement
 * @memberof DNA.
 * @static
 *
 * @example
 * ```js
 * // my-component.js
 * import { BaseComponent } from '@dnajs/core';
 * export class MyComponent extends BaseComponent {
 *   static get observedAttributes() {
 *     return ['...', '...'];
 *   }
 *   get css() {
 *     return '...';
 *   }
 *   get events() {
 *     return {
 *       '...': '...'
 *     };
 *   }
 *   get template() {
 *     return '...';
 *   }
 *   get properties() {
 *     return { ... };
 *   }
 * }
 * ```
 */
var BaseComponent$1 = function (_mix$with) {
  inherits(BaseComponent, _mix$with);

  function BaseComponent() {
    classCallCheck(this, BaseComponent);
    return possibleConstructorReturn(this, _mix$with.apply(this, arguments));
  }

  return BaseComponent;
}(mix(shim(self.HTMLElement)).with(MIXINS.ComponentMixin, MIXINS.PropertiesMixin, MIXINS.StyleMixin, MIXINS.EventsMixin, MIXINS.TemplateMixin));

/**
 * DNA
 * (c) 2015-2016 Chialab (http://www.chialab.com) <dev@chialab.io>
 * http://dna.chialab.io
 *
 * Just another components pattern with IncrementalDOM templates.
 */
MIXINS.IDOMTemplateMixin = IDOMTemplateMixin;

var BaseComponent$$1 = function (_mix$with) {
  inherits(BaseComponent$$1, _mix$with);

  function BaseComponent$$1() {
    classCallCheck(this, BaseComponent$$1);
    return possibleConstructorReturn(this, _mix$with.apply(this, arguments));
  }

  return BaseComponent$$1;
}(mix(BaseComponent$1).with(IDOMTemplateMixin));

var _created = notifications.nodesCreated;
var _removed = notifications.nodesDeleted;
var _changed = attributes[symbols.default];

notifications.nodesCreated = function (nodes) {
    nodes.forEach(function (node) {
        if (!DOM.isComponent(node)) {
            if (DOM.bind(node)) {
                DOM.connect(node);
            }
        }
    });
    /* istanbul ignore if */
    if (_created) {
        _created(nodes);
    }
};

notifications.nodesDeleted = function (nodes) {
    nodes.forEach(function (node) {
        return DOM.disconnect(node);
    });
    /* istanbul ignore if */
    if (_removed) {
        _removed(nodes);
    }
};

attributes[symbols.default] = function (node, attrName, attrValue) {
    var oldValue = node.getAttribute(attrName);
    /* istanbul ignore if */
    if (_changed) {
        _changed(node, attrName, attrValue);
    }
    if (DOM.isComponent(node)) {
        var attrs = node.constructor.observedAttributes || [];
        if (attrs.indexOf(attrName) !== -1) {
            attrValue = attrValue === undefined ? null : attrValue;
            DOM.update(node, attrName, oldValue, attrValue);
        }
    }
};

exports.mix = mix;
exports.prop = prop;
exports.shim = shim;
exports.DOM = DOM;
exports.MIXINS = MIXINS;
exports.IDOM = idom;
exports.BaseComponent = BaseComponent$$1;
exports.registry = registry;
exports.render = render$1;
exports.define = define$2;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi9Vc2Vycy9lZG9hcmRvY2F2YXp6YS9Qcm9qZWN0cy9kbmEvZG5hLWNvbXBvbmVudHMvbm9kZV9tb2R1bGVzL0BkbmFqcy9jb3JlL3NyYy9saWIvdHlwZW9mLmpzIiwiL1VzZXJzL2Vkb2FyZG9jYXZhenphL1Byb2plY3RzL2RuYS9kbmEtY29tcG9uZW50cy9ub2RlX21vZHVsZXMvQGRuYWpzL2NvcmUvc3JjL2xpYi9yZWdpc3RyeS5qcyIsIi9Vc2Vycy9lZG9hcmRvY2F2YXp6YS9Qcm9qZWN0cy9kbmEvZG5hLWNvbXBvbmVudHMvbm9kZV9tb2R1bGVzL0BkbmFqcy9jb3JlL3NyYy9saWIvc3ltYm9scy5qcyIsIi9Vc2Vycy9lZG9hcmRvY2F2YXp6YS9Qcm9qZWN0cy9kbmEvZG5hLWNvbXBvbmVudHMvbm9kZV9tb2R1bGVzL0BkbmFqcy9jb3JlL3NyYy9saWIvZG9tLmpzIiwiL1VzZXJzL2Vkb2FyZG9jYXZhenphL1Byb2plY3RzL2RuYS9kbmEtY29tcG9uZW50cy9ub2RlX21vZHVsZXMvQGRuYWpzL2NvcmUvc3JjL21peGlucy9jb21wb25lbnQuanMiLCIvVXNlcnMvZWRvYXJkb2NhdmF6emEvUHJvamVjdHMvZG5hL2RuYS1jb21wb25lbnRzL25vZGVfbW9kdWxlcy9AZG5hanMvY29yZS9zcmMvcG9seWZpbGxzL2N1c3RvbS1ldmVudC5qcyIsIi9Vc2Vycy9lZG9hcmRvY2F2YXp6YS9Qcm9qZWN0cy9kbmEvZG5hLWNvbXBvbmVudHMvbm9kZV9tb2R1bGVzL0BkbmFqcy9jb3JlL3NyYy9saWIvZGlzcGF0Y2guanMiLCIvVXNlcnMvZWRvYXJkb2NhdmF6emEvUHJvamVjdHMvZG5hL2RuYS1jb21wb25lbnRzL25vZGVfbW9kdWxlcy9AZG5hanMvY29yZS9zcmMvbGliL3Byb3BlcnR5LmpzIiwiL1VzZXJzL2Vkb2FyZG9jYXZhenphL1Byb2plY3RzL2RuYS9kbmEtY29tcG9uZW50cy9ub2RlX21vZHVsZXMvQGRuYWpzL2NvcmUvc3JjL21peGlucy9wcm9wZXJ0aWVzLWNvbXBvbmVudC5qcyIsIi9Vc2Vycy9lZG9hcmRvY2F2YXp6YS9Qcm9qZWN0cy9kbmEvZG5hLWNvbXBvbmVudHMvbm9kZV9tb2R1bGVzL0BkbmFqcy9jb3JlL3NyYy9wb2x5ZmlsbHMvbWF0Y2hlcy5qcyIsIi9Vc2Vycy9lZG9hcmRvY2F2YXp6YS9Qcm9qZWN0cy9kbmEvZG5hLWNvbXBvbmVudHMvbm9kZV9tb2R1bGVzL0BkbmFqcy9jb3JlL3NyYy9taXhpbnMvZXZlbnRzLWNvbXBvbmVudC5qcyIsIi9Vc2Vycy9lZG9hcmRvY2F2YXp6YS9Qcm9qZWN0cy9kbmEvZG5hLWNvbXBvbmVudHMvbm9kZV9tb2R1bGVzL0BkbmFqcy9jb3JlL3NyYy9saWIvc3R5bGUuanMiLCIvVXNlcnMvZWRvYXJkb2NhdmF6emEvUHJvamVjdHMvZG5hL2RuYS1jb21wb25lbnRzL25vZGVfbW9kdWxlcy9AZG5hanMvY29yZS9zcmMvbWl4aW5zL3N0eWxlLWNvbXBvbmVudC5qcyIsIi9Vc2Vycy9lZG9hcmRvY2F2YXp6YS9Qcm9qZWN0cy9kbmEvZG5hLWNvbXBvbmVudHMvbm9kZV9tb2R1bGVzL0BkbmFqcy9jb3JlL3NyYy9taXhpbnMvdGVtcGxhdGUtY29tcG9uZW50LmpzIiwiL1VzZXJzL2Vkb2FyZG9jYXZhenphL1Byb2plY3RzL2RuYS9kbmEtY29tcG9uZW50cy9ub2RlX21vZHVsZXMvQGRuYWpzL2NvcmUvc3JjL3BvbHlmaWxscy9yZWR1Y2UuanMiLCIvVXNlcnMvZWRvYXJkb2NhdmF6emEvUHJvamVjdHMvZG5hL2RuYS1jb21wb25lbnRzL25vZGVfbW9kdWxlcy9AZG5hanMvY29yZS9zcmMvbGliL21peGlucy5qcyIsIi9Vc2Vycy9lZG9hcmRvY2F2YXp6YS9Qcm9qZWN0cy9kbmEvZG5hLWNvbXBvbmVudHMvbm9kZV9tb2R1bGVzL0BkbmFqcy9jb3JlL3NyYy9saWIvc2hpbS5qcyIsIi9Vc2Vycy9lZG9hcmRvY2F2YXp6YS9Qcm9qZWN0cy9kbmEvZG5hLWNvbXBvbmVudHMvbm9kZV9tb2R1bGVzL0BkbmFqcy9jb3JlL3NyYy9jb3JlLmpzIiwiL1VzZXJzL2Vkb2FyZG9jYXZhenphL1Byb2plY3RzL2RuYS9kbmEtY29tcG9uZW50cy9ub2RlX21vZHVsZXMvaW5jcmVtZW50YWwtZG9tL3NyYy91dGlsLmpzIiwiL1VzZXJzL2Vkb2FyZG9jYXZhenphL1Byb2plY3RzL2RuYS9kbmEtY29tcG9uZW50cy9ub2RlX21vZHVsZXMvaW5jcmVtZW50YWwtZG9tL3NyYy9ub2RlX2RhdGEuanMiLCIvVXNlcnMvZWRvYXJkb2NhdmF6emEvUHJvamVjdHMvZG5hL2RuYS1jb21wb25lbnRzL25vZGVfbW9kdWxlcy9pbmNyZW1lbnRhbC1kb20vc3JjL25vZGVzLmpzIiwiL1VzZXJzL2Vkb2FyZG9jYXZhenphL1Byb2plY3RzL2RuYS9kbmEtY29tcG9uZW50cy9ub2RlX21vZHVsZXMvaW5jcmVtZW50YWwtZG9tL3NyYy9ub3RpZmljYXRpb25zLmpzIiwiL1VzZXJzL2Vkb2FyZG9jYXZhenphL1Byb2plY3RzL2RuYS9kbmEtY29tcG9uZW50cy9ub2RlX21vZHVsZXMvaW5jcmVtZW50YWwtZG9tL3NyYy9jb250ZXh0LmpzIiwiL1VzZXJzL2Vkb2FyZG9jYXZhenphL1Byb2plY3RzL2RuYS9kbmEtY29tcG9uZW50cy9ub2RlX21vZHVsZXMvaW5jcmVtZW50YWwtZG9tL3NyYy9hc3NlcnRpb25zLmpzIiwiL1VzZXJzL2Vkb2FyZG9jYXZhenphL1Byb2plY3RzL2RuYS9kbmEtY29tcG9uZW50cy9ub2RlX21vZHVsZXMvaW5jcmVtZW50YWwtZG9tL3NyYy9kb21fdXRpbC5qcyIsIi9Vc2Vycy9lZG9hcmRvY2F2YXp6YS9Qcm9qZWN0cy9kbmEvZG5hLWNvbXBvbmVudHMvbm9kZV9tb2R1bGVzL2luY3JlbWVudGFsLWRvbS9zcmMvY29yZS5qcyIsIi9Vc2Vycy9lZG9hcmRvY2F2YXp6YS9Qcm9qZWN0cy9kbmEvZG5hLWNvbXBvbmVudHMvbm9kZV9tb2R1bGVzL2luY3JlbWVudGFsLWRvbS9zcmMvc3ltYm9scy5qcyIsIi9Vc2Vycy9lZG9hcmRvY2F2YXp6YS9Qcm9qZWN0cy9kbmEvZG5hLWNvbXBvbmVudHMvbm9kZV9tb2R1bGVzL2luY3JlbWVudGFsLWRvbS9zcmMvYXR0cmlidXRlcy5qcyIsIi9Vc2Vycy9lZG9hcmRvY2F2YXp6YS9Qcm9qZWN0cy9kbmEvZG5hLWNvbXBvbmVudHMvbm9kZV9tb2R1bGVzL2luY3JlbWVudGFsLWRvbS9zcmMvdmlydHVhbF9lbGVtZW50cy5qcyIsIi9Vc2Vycy9lZG9hcmRvY2F2YXp6YS9Qcm9qZWN0cy9kbmEvZG5hLWNvbXBvbmVudHMvbm9kZV9tb2R1bGVzL2luY3JlbWVudGFsLWRvbS9pbmRleC5qcyIsIi9Vc2Vycy9lZG9hcmRvY2F2YXp6YS9Qcm9qZWN0cy9kbmEvZG5hLWNvbXBvbmVudHMvcGFja2FnZXMvZG5hLWlkb20vc3JjL2xpYi9pZG9tLmpzIiwiL1VzZXJzL2Vkb2FyZG9jYXZhenphL1Byb2plY3RzL2RuYS9kbmEtY29tcG9uZW50cy9wYWNrYWdlcy9kbmEtaWRvbS9zcmMvbWl4aW5zL2lkb20uanMiLCIvVXNlcnMvZWRvYXJkb2NhdmF6emEvUHJvamVjdHMvZG5hL2RuYS1jb21wb25lbnRzL25vZGVfbW9kdWxlcy9AZG5hanMvY29yZS9pbmRleC5qcyIsIi9Vc2Vycy9lZG9hcmRvY2F2YXp6YS9Qcm9qZWN0cy9kbmEvZG5hLWNvbXBvbmVudHMvcGFja2FnZXMvZG5hLWlkb20vaW5kZXguanMiLCIvVXNlcnMvZWRvYXJkb2NhdmF6emEvUHJvamVjdHMvZG5hL2RuYS1jb21wb25lbnRzL3BhY2thZ2VzL2RuYS1pZG9tL29ic2VydmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ2hlY2sgaWYgYW4gdmFsdWUgaXMgYSBmdW5jdGlvbi5cbiAqIEBtZXRob2QgaXNGdW5jdGlvblxuICogQG1lbWJlcm9mISBETkEuXG4gKiBAc3RhdGljXG4gKlxuICogQHBhcmFtIHsqfSBvYmogVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbic7XG59XG4vKipcbiAqIENoZWNrIGlmIGFuIHZhbHVlIGlzIGEgc3RyaW5nLlxuICogQG1ldGhvZCBpc1N0cmluZ1xuICogQG1lbWJlcm9mISBETkEuXG4gKiBAc3RhdGljXG4gKlxuICogQHBhcmFtIHsqfSBvYmogVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJztcbn1cbi8qKlxuICogQ2hlY2sgaWYgYW4gdmFsdWUgaXMgYW4gb2JqZWN0LlxuICogQG1ldGhvZCBpc09iamVjdFxuICogQG1lbWJlcm9mISBETkEuXG4gKiBAc3RhdGljXG4gKlxuICogQHBhcmFtIHsqfSBvYmogVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG59XG4vKipcbiAqIENoZWNrIGlmIGFuIHZhbHVlIGlzIHVuZGVmaW5lZC5cbiAqIEBtZXRob2QgaXNVbmRlZmluZWRcbiAqIEBtZW1iZXJvZiEgRE5BLlxuICogQHN0YXRpY1xuICpcbiAqIEBwYXJhbSB7Kn0gb2JqIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZChvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCc7XG59XG4vKipcbiAqIENoZWNrIGlmIGFuIHZhbHVlIGlzIGFuIGFycmF5LlxuICogQG1ldGhvZCBpc0FycmF5XG4gKiBAbWVtYmVyb2YhIEROQS5cbiAqIEBzdGF0aWNcbiAqXG4gKiBAcGFyYW0geyp9IG9iaiBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheShvYmopIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShvYmopO1xufVxuIiwiaW1wb3J0IHsgaXNGdW5jdGlvbiwgaXNTdHJpbmcgfSBmcm9tICcuL3R5cGVvZi5qcyc7XG5cbi8qKlxuICogQSBjdXN0b20gY29tcG9uZW50cyByZWdpc3RyeS5cbiAqIEl0IHJlcGxpY2F0ZXMgdGhlIFtDdXN0b21FbGVtZW50UmVnaXN0cnkgaW50ZXJmYWNlXShodHRwczovL3d3dy53My5vcmcvVFIvY3VzdG9tLWVsZW1lbnRzLyNjdXN0b20tZWxlbWVudHMtYXBpKS5cbiAqIEBuYW1lIHJlZ2lzdHJ5XG4gKiBAbmFtZXNwYWNlIHJlZ2lzdHJ5XG4gKiBAbWVtYmVyb2YhIEROQS5cbiAqIEBzdGF0aWNcbiAqL1xuZXhwb3J0IGNvbnN0IHJlZ2lzdHJ5ID0ge1xuICAgIC8qKlxuICAgICAqIFRoZSBsaXN0IG9mIGRlZmluZWQgY29tcG9uZW50cy5cbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIGNvbXBvbmVudHM6IHt9LFxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGEgbmV3IGNvbXBvbmVudC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgaWQgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBDdHIgVGhlIGNvbXBvbmVudCBjb25zdHJ1Y3Rvci5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIE9wdGlvbmFsIGNvbXBvbmVudCBjb25maWd1cmF0aW9uLlxuICAgICAqL1xuICAgIGRlZmluZShuYW1lLCBDdHIsIGNvbmZpZyA9IHt9KSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50c1tuYW1lLnRvTG93ZXJDYXNlKCldID0ge1xuICAgICAgICAgICAgaXM6IG5hbWUsXG4gICAgICAgICAgICBDdHIsXG4gICAgICAgICAgICBjb25maWcsXG4gICAgICAgIH07XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZSBhIGNvbXBvbmVudCBkZXNjcmlwdG9yIGJ5IGlkLlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgVGhlIGNvbXBvbmVudCBpZC5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBjb21wb25lbnQgZGVzY3JpcHRvci5cbiAgICAgKi9cbiAgICBnZXREZXNjcmlwdG9yKG5hbWUpIHtcbiAgICAgICAgaWYgKGlzU3RyaW5nKG5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRzW25hbWUudG9Mb3dlckNhc2UoKV07XG4gICAgICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbihuYW1lKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgayBpbiB0aGlzLmNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGVzYyA9IHRoaXMuY29tcG9uZW50c1trXTtcbiAgICAgICAgICAgICAgICBpZiAoZGVzYy5DdHIgPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlc2M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZSBhIGNvbXBvbmVudCBjb25zdHJ1Y3RvciBieSBpZC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgY29tcG9uZW50IGlkLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY29tcG9uZW50IGNvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGdldChuYW1lKSB7XG4gICAgICAgIGxldCBkZXNjID0gdGhpcy5nZXREZXNjcmlwdG9yKG5hbWUpO1xuICAgICAgICBpZiAoZGVzYykge1xuICAgICAgICAgICAgcmV0dXJuIGRlc2MuQ3RyO1xuICAgICAgICB9XG4gICAgfSxcbn07XG4iLCJleHBvcnQgY29uc3QgQ09NUE9ORU5UX1NZTUJPTCA9ICdfX2NvbXBvbmVudCc7XG4iLCJpbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi90eXBlb2YuanMnO1xuaW1wb3J0IHsgcmVnaXN0cnkgfSBmcm9tICcuL3JlZ2lzdHJ5LmpzJztcbmltcG9ydCB7IENPTVBPTkVOVF9TWU1CT0wgfSBmcm9tICcuL3N5bWJvbHMuanMnO1xuXG4vKipcbiAqIFRoZSBgY29ubmVjdGVkQ2FsbGJhY2tgIG5hbWUuXG4gKiBAcHJpdmF0ZVxuICpcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAc2VlIFtXM0Mgc3BlY10oaHR0cHM6Ly93d3cudzMub3JnL1RSL2N1c3RvbS1lbGVtZW50cy8jY3VzdG9tLWVsZW1lbnQtcmVhY3Rpb25zKVxuICovXG5jb25zdCBDT05ORUNURUQgPSAnY29ubmVjdGVkQ2FsbGJhY2snO1xuLyoqXG4gKiBUaGUgYGRpc2Nvbm5lY3RlZENhbGxiYWNrYCBuYW1lLlxuICogQHByaXZhdGVcbiAqXG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQHNlZSBbVzNDIHNwZWNdKGh0dHBzOi8vd3d3LnczLm9yZy9UUi9jdXN0b20tZWxlbWVudHMvI2N1c3RvbS1lbGVtZW50LXJlYWN0aW9ucylcbiAqL1xuY29uc3QgRElTQ09OTkVDVEVEID0gJ2Rpc2Nvbm5lY3RlZENhbGxiYWNrJztcbi8qKlxuICogVGhlIGBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2tgIG5hbWUuXG4gKiBAcHJpdmF0ZVxuICpcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAc2VlIFtXM0Mgc3BlY10oaHR0cHM6Ly93d3cudzMub3JnL1RSL2N1c3RvbS1lbGVtZW50cy8jY3VzdG9tLWVsZW1lbnQtcmVhY3Rpb25zKVxuICovXG5jb25zdCBVUERBVEVEID0gJ2F0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayc7XG4vKipcbiAqIFJldHJpZXZlIGEgY29tcG9uZW50IGNvbnN0cnVjdG9yIGZyb20gYW4gRWxlbWVudCBvciBmcm9tIGEgdGFnIG5hbWUuXG4gKiBAbWV0aG9kIGdldENvbXBvbmVudFxuICogQG1lbWJlcm9mIEROQS5ET01cbiAqIEBzdGF0aWNcbiAqXG4gKiBAcGFyYW0ge0NvbXBvbmVudHxTdHJpbmd9IGVsZW1lbnQgVGhlIGVsZW1lbnQgb3IgdGhlIHRhZyBuYW1lLlxuICogQHBhcmFtIHtCb29sZWFufSBmdWxsIFJldHJpZXZlIGZ1bGwgY29tcG9uZW50IGluZm9ybWF0aW9uLlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjb21wb25lbnQgY29uc3RydWN0b3IgZm9yIHRoZSBnaXZlbiBwYXJhbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvbXBvbmVudChlbGVtZW50LCBmdWxsID0gZmFsc2UpIHtcbiAgICBpZiAoZWxlbWVudC5ub2RlKSB7XG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50Lm5vZGU7XG4gICAgfVxuICAgIGlmIChlbGVtZW50Lm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2lzJykgfHwgZWxlbWVudC50YWdOYW1lO1xuICAgIH1cbiAgICByZXR1cm4gZnVsbCA/IHJlZ2lzdHJ5LmdldERlc2NyaXB0b3IoZWxlbWVudCkgOiByZWdpc3RyeS5nZXQoZWxlbWVudCk7XG59XG4vKipcbiAqIENoZWNrIGlmIGEgbm9kZSBpcyBhbiBpbnN0YW5jZSBvZiBhIGNvbXBvbmVudC5cbiAqIEBtZXRob2QgaXNDb21wb25lbnRcbiAqIEBtZW1iZXJvZiBETkEuRE9NXG4gKiBAc3RhdGljXG4gKlxuICogQHBhcmFtIHtDb21wb25lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gY2hlY2suXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNDb21wb25lbnQoZWxlbWVudCkge1xuICAgIGxldCBDdHIgPSBnZXRDb21wb25lbnQoZWxlbWVudCk7XG4gICAgcmV0dXJuIEN0ciAmJiAoZWxlbWVudCBpbnN0YW5jZW9mIEN0cik7XG59XG4vKipcbiAqIEFuIGhlbHBlciBmb3IgZHluYW1pY2FsbHkgdHJpZ2dlciB0aGUgYGNvbm5lY3RlZENhbGxiYWNrYCByZWFjdGlvbiBvbiBjb21wb25lbnRzLlxuICogQG1ldGhvZCBjb25uZWN0XG4gKiBAbWVtYmVyb2YgRE5BLkRPTVxuICogQHN0YXRpY1xuICpcbiAqIEBwYXJhbSB7Q29tcG9uZW50fSBlbGVtZW50IFRoZSBhdHRhY2hlZCBub2RlLlxuICogQHJldHVybiB7Qm9vbGVhbn0gVGhlIGNhbGxiYWNrIGhhcyBiZWVuIHRyaWdnZXJlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbm5lY3QoZWxlbWVudCkge1xuICAgIGlmIChpc0NvbXBvbmVudChlbGVtZW50KSkge1xuICAgICAgICBlbGVtZW50W0NPTk5FQ1RFRF0uY2FsbChlbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuLyoqXG4gKiBBbiBoZWxwZXIgZm9yIGR5bmFtaWNhbGx5IHRyaWdnZXIgdGhlIGBkaXNjb25uZWN0ZWRDYWxsYmFja2AgcmVhY3Rpb24gb24gY29tcG9uZW50cy5cbiAqIEBtZXRob2QgZGlzY29ubmVjdFxuICogQG1lbWJlcm9mIEROQS5ET01cbiAqIEBzdGF0aWNcbiAqXG4gKiBAcGFyYW0ge0NvbXBvbmVudH0gZWxlbWVudCBUaGUgZGV0YWNoZWQgbm9kZS5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IFRoZSBjYWxsYmFjayBoYXMgYmVlbiB0cmlnZ2VyZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkaXNjb25uZWN0KGVsZW1lbnQpIHtcbiAgICBpZiAoaXNDb21wb25lbnQoZWxlbWVudCkpIHtcbiAgICAgICAgZWxlbWVudFtESVNDT05ORUNURURdLmNhbGwoZWxlbWVudCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbi8qKlxuICogQW4gaGVscGVyIGZvciBkeW5hbWljYWxseSB0cmlnZ2VyIHRoZSBgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrYCByZWFjdGlvbiBvbiBjb21wb25lbnRzLlxuICogQG1ldGhvZCB1cGRhdGVcbiAqIEBtZW1iZXJvZiBETkEuRE9NXG4gKiBAc3RhdGljXG4gKlxuICogQHBhcmFtIHtDb21wb25lbnR9IGVsZW1lbnQgVGhlIHVwZGF0ZWQgZWxlbWVudC5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IFRoZSBjYWxsYmFjayBoYXMgYmVlbiB0cmlnZ2VyZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUoZWxlbWVudCwgbmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgaWYgKGlzQ29tcG9uZW50KGVsZW1lbnQpKSB7XG4gICAgICAgIGVsZW1lbnRbVVBEQVRFRF0uY2FsbChlbGVtZW50LCBuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4vKipcbiAqIEF0dGFjaCBhIGNvbXBvbmVudCBwcm90b3R5cGUgdG8gYW4gYWxyZWFkeSBpbnN0YW50aWF0ZWQgSFRNTEVsZW1lbnQuXG4gKiBAbWV0aG9kIGJpbmRcbiAqIEBtZW1iZXJvZiBETkEuRE9NXG4gKiBAc3RhdGljXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZSBUaGUgbm9kZSB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBDdHIgVGhlIGNvbXBvbmVudCBjbGFzcyB0byB1c2UgKGxlYXZlIGVtcHR5IGZvciBhdXRvIGRldGVjdCkuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBUaGUgcHJvdG90eXBlIGhhcyBiZWVuIGF0dGFjaGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZChub2RlLCBDdHIpIHtcbiAgICBpZiAoIWlzRnVuY3Rpb24oQ3RyKSkge1xuICAgICAgICBDdHIgPSBnZXRDb21wb25lbnQobm9kZSk7XG4gICAgfVxuICAgIGlmIChpc0Z1bmN0aW9uKEN0cikpIHtcbiAgICAgICAgbm9kZS5fX3Byb3RvX18gPSBDdHIucHJvdG90eXBlO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobm9kZSwgJ2NvbnN0cnVjdG9yJywge1xuICAgICAgICAgICAgdmFsdWU6IEN0cixcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgQ3RyLmNhbGwobm9kZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG4vKipcbiAqIENyZWF0ZSBhIGNvbXBvbmVudCBpbnN0YW5jZS5cbiAqIEBtZXRob2QgY3JlYXRlRWxlbWVudFxuICogQG1lbWJlcm9mIEROQS5ET01cbiAqIEBzdGF0aWNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaXMgVGhlIGNvbXBvbmVudCB0YWcgbmFtZS5cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSBUaGUgY29tcG9uZW50IGluc3RhbmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChpcykge1xuICAgIGxldCBDdHIgPSBnZXRDb21wb25lbnQoaXMpO1xuICAgIGlmIChDdHIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDdHIoKTtcbiAgICB9XG59XG4vKipcbiAqIER5bmFtaWNhbGx5IGFwcGVuZCBhIG5vZGUgYW5kIGNhbGwgdGhlIGBjb25uZWN0ZWRDYWxsYmFja2AuXG4gKiAtIGRpc2Nvbm5lY3QgdGhlIG5vZGUgaWYgYWxyZWFkeSBpbiB0aGUgdHJlZVxuICogLSBjb25uZWN0IHRoZSBub2RlIGFmdGVyIHRoZSBpbnNlcnRpb25cbiAqIEBtZXRob2QgYXBwZW5kQ2hpbGRcbiAqIEBtZW1iZXJvZiBETkEuRE9NXG4gKiBAc3RhdGljXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50IFRoZSBwYXJlbnQgZWxlbWVudC5cbiAqIEBwYXJhbSB7Q29tcG9uZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIGFwcGVuZC5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IFRoZSBub2RlIGhhcyBiZWVuIGFwcGVuZGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ2hpbGQocGFyZW50LCBlbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQubm9kZSkge1xuICAgICAgICBsZXQgbm9kZSA9IGVsZW1lbnQubm9kZTtcbiAgICAgICAgaWYgKHBhcmVudCAhPT0gbm9kZS5wYXJlbnROb2RlIHx8IHBhcmVudC5sYXN0RWxlbWVudENoaWxkICE9PSBub2RlKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2hpbGQobm9kZS5wYXJlbnROb2RlLCBlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgICAgIHJldHVybiBjb25uZWN0KGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbi8qKlxuICogRHluYW1pY2FsbHkgcmVtb3ZlIGEgbm9kZSBhbmQgY2FsbCB0aGUgYGRpc2Nvbm5lY3RlZENhbGxiYWNrYC5cbiAqIEBtZXRob2QgcmVtb3ZlQ2hpbGRcbiAqIEBtZW1iZXJvZiBETkEuRE9NXG4gKiBAc3RhdGljXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50IFRoZSBwYXJlbnQgZWxlbWVudC5cbiAqIEBwYXJhbSB7Q29tcG9uZW50fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIHJlbW92ZS5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IFRoZSBub2RlIGhhcyBiZWVuIHJlbW92ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDaGlsZChwYXJlbnQsIGVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudC5ub2RlKSB7XG4gICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChlbGVtZW50Lm5vZGUpO1xuICAgICAgICByZXR1cm4gZGlzY29ubmVjdChlbGVtZW50KTtcbiAgICB9XG59XG4vKipcbiAqIER5bmFtaWNhbGx5IGluc2VydCBhIG5vZGUgYmVmb3JlIGFub3RoZXIgYW5kIGNhbGwgYWxsIHRoZSByZWFjdGlvbnMuXG4gKiAtIGRpc2Nvbm5lY3QgdGhlIG5vZGUgaWYgYWxyZWFkeSBpbiB0aGUgdHJlZVxuICogLSBjb25uZWN0IHRoZSBub2RlIGFmdGVyIHRoZSBpbnNlcnRpb25cbiAqIEBtZXRob2QgaW5zZXJ0QmVmb3JlXG4gKiBAbWVtYmVyb2YgRE5BLkRPTVxuICogQHN0YXRpY1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudCBUaGUgcGFyZW50IGVsZW1lbnQuXG4gKiBAcGFyYW0ge0NvbXBvbmVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byBpbnNlcnQuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByZWZOb2RlIFRoZSBub2RlIGZvciBwb3NpdGlvbmluZy5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IFRoZSBub2RlIGhhcyBiZWVuIGFwcGVuZGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKHBhcmVudCwgZWxlbWVudCwgcmVmTm9kZSkge1xuICAgIGlmIChlbGVtZW50Lm5vZGUpIHtcbiAgICAgICAgbGV0IG5vZGUgPSBlbGVtZW50Lm5vZGU7XG4gICAgICAgIGlmIChub2RlLm5leHRTaWJsaW5nICE9PSByZWZOb2RlKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgZGlzY29ubmVjdChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUobm9kZSwgcmVmTm9kZSk7XG4gICAgICAgICAgICByZXR1cm4gY29ubmVjdChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogRHluYW1pY2FsbHkgcmVwbGFjZSBhIG5vZGUgd2l0aCBhbm90aGVyIGFuZCBjYWxsIGFsbCB0aGUgcmVhY3Rpb25zLlxuICogLSBkaXNjb25uZWN0IHRoZSBub2RlIGlmIGFscmVhZHkgaW4gdGhlIHRyZWVcbiAqIC0gZGlzY29ubmVjdCB0aGUgcmVwbGFjZWQgbm9kZVxuICogLSBjb25uZWN0IHRoZSBmaXJzdCBub2RlIGFmdGVyIHRoZSBpbnNlcnRpb25cbiAqIEBtZXRob2QgcmVwbGFjZUNoaWxkXG4gKiBAbWVtYmVyb2YgRE5BLkRPTVxuICogQHN0YXRpY1xuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudCBUaGUgcGFyZW50IGVsZW1lbnQuXG4gKiBAcGFyYW0ge0NvbXBvbmVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byBpbnNlcnQuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByZWZOb2RlIFRoZSBub2RlIHRvIHJlcGxhY2UuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBUaGUgbm9kZSBoYXMgYmVlbiBhcHBlbmRlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VDaGlsZChwYXJlbnQsIGVsZW1lbnQsIHJlZk5vZGUpIHtcbiAgICBpZiAoZWxlbWVudC5ub2RlKSB7XG4gICAgICAgIGxldCBub2RlID0gZWxlbWVudC5ub2RlO1xuICAgICAgICBpZiAobm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBkaXNjb25uZWN0KGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQobm9kZSwgcmVmTm9kZSk7XG4gICAgICAgIGlmIChyZWZOb2RlW0NPTVBPTkVOVF9TWU1CT0xdKSB7XG4gICAgICAgICAgICBkaXNjb25uZWN0KHJlZk5vZGVbQ09NUE9ORU5UX1NZTUJPTF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25uZWN0KG5vZGUpO1xuICAgIH1cbn1cbi8qKlxuICogRHluYW1pY2FsbHkgdXBkYXRlIGEgbm9kZSBhdHRyaWJ1dGUgYW5kIGNhbGwgYWxsIHRoZSByZWFjdGlvbnMuXG4gKiBAbWV0aG9kIHNldEF0dHJpYnV0ZVxuICogQG1lbWJlcm9mIEROQS5ET01cbiAqIEBzdGF0aWNcbiAqXG4gKiBAcGFyYW0ge0NvbXBvbmVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgYXR0cmlidXRlIG5hbWUuXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgVGhlIGF0dHJpYnV0ZSB2YWx1ZS5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IFRoZSBub2RlIGhhcyBiZWVuIHVwZGF0ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRBdHRyaWJ1dGUoZWxlbWVudCwgbmFtZSwgdmFsdWUpIHtcbiAgICBpZiAoZWxlbWVudC5ub2RlKSB7XG4gICAgICAgIGxldCBub2RlID0gZWxlbWVudC5ub2RlO1xuICAgICAgICBsZXQgb2xkVmFsdWUgPSBub2RlLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgICBsZXQgYXR0cnMgPSBlbGVtZW50LmNvbnN0cnVjdG9yLm9ic2VydmVkQXR0cmlidXRlcyB8fCBbXTtcbiAgICAgICAgaWYgKGF0dHJzLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdXBkYXRlKGVsZW1lbnQsIG5hbWUsIG9sZFZhbHVlLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIER5bmFtaWNhbGx5IHJlbW92ZSBhIG5vZGUgYXR0cmlidXRlIGFuZCBjYWxsIGFsbCB0aGUgcmVhY3Rpb25zLlxuICogQG1ldGhvZCByZW1vdmVBdHRyaWJ1dGVcbiAqIEBtZW1iZXJvZiBETkEuRE9NXG4gKiBAc3RhdGljXG4gKlxuICogQHBhcmFtIHtDb21wb25lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgVGhlIGF0dHJpYnV0ZSBuYW1lLlxuICogQHJldHVybiB7Qm9vbGVhbn0gVGhlIG5vZGUgaGFzIGJlZW4gdXBkYXRlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUF0dHJpYnV0ZShlbGVtZW50LCBuYW1lKSB7XG4gICAgaWYgKGVsZW1lbnQubm9kZSkge1xuICAgICAgICBsZXQgbm9kZSA9IGVsZW1lbnQubm9kZTtcbiAgICAgICAgbGV0IG9sZFZhbHVlID0gbm9kZS5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgICBsZXQgYXR0cnMgPSBlbGVtZW50LmNvbnN0cnVjdG9yLm9ic2VydmVkQXR0cmlidXRlcyB8fCBbXTtcbiAgICAgICAgaWYgKGF0dHJzLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdXBkYXRlKGVsZW1lbnQsIG5hbWUsIG9sZFZhbHVlLCBudWxsKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IENPTVBPTkVOVF9TWU1CT0wgfSBmcm9tICcuLi9saWIvc3ltYm9scy5qcyc7XG5cbi8qKlxuICogVEhlIGJhc2UgY3VzdG9tIGNvbXBvbmVudCBtaXhpbnMuIEp1c3QgYWRkIGxpZmUgY3ljbGVzIGNhbGxiYWNrIGFuZCBgaXNgIGdldHRlci5cbiAqIEBtaXhpbiBDb21wb25lbnRNaXhpblxuICogQG1lbWJlcm9mIEROQS5NSVhJTlNcbiAqIEBzdGF0aWNcbiAqL1xuZXhwb3J0IGNvbnN0IENvbXBvbmVudE1peGluID0gKFN1cGVyQ2xhc3MpID0+IGNsYXNzIGV4dGVuZHMgU3VwZXJDbGFzcyB7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IGlzIEdldCBjb21wb25lbnQgaWQuXG4gICAgICogQG5hbWUgaXNcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqIEBtZW1iZXJvZiBETkEuTUlYSU5TLkNvbXBvbmVudE1peGluXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgZ2V0IGlzKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuZ2V0QXR0cmlidXRlKCdpcycpIHx8IHRoaXMubG9jYWxOYW1lKS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICBnZXQgbm9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpcmVzIHdoZW4gYW4gaW5zdGFuY2Ugd2FzIGluc2VydGVkIGludG8gdGhlIGRvY3VtZW50LlxuICAgICAqIEBtZXRob2QgY29ubmVjdGVkQ2FsbGJhY2tcbiAgICAgKiBAbWVtYmVyb2YgRE5BLk1JWElOUy5Db21wb25lbnRNaXhpblxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLm5vZGVbQ09NUE9ORU5UX1NZTUJPTF0gPSB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaXJlcyB3aGVuIGFuIGluc3RhbmNlIHdhcyBkZXRhY2hlZCBmcm9tIHRoZSBkb2N1bWVudC5cbiAgICAgKiBAbWV0aG9kIGRpc2Nvbm5lY3RlZENhbGxiYWNrXG4gICAgICogQG1lbWJlcm9mIEROQS5NSVhJTlMuQ29tcG9uZW50TWl4aW5cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHt9XG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiBhbiBhdHRyaWJ1dGUgd2FzIGFkZGVkLCByZW1vdmVkLCBvciB1cGRhdGVkLlxuICAgICAqIEBtZXRob2QgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrXG4gICAgICogQG1lbWJlcm9mIEROQS5NSVhJTlMuQ29tcG9uZW50TWl4aW5cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyTmFtZSBUaGUgY2hhbmdlZCBhdHRyaWJ1dGUgbmFtZS5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2xkVmFsIFRoZSB2YWx1ZSBvZiB0aGUgYXR0cmlidXRlIGJlZm9yZSB0aGUgY2hhbmdlLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuZXdWYWwgVGhlIHZhbHVlIG9mIHRoZSBhdHRyaWJ1dGUgYWZ0ZXIgdGhlIGNoYW5nZS5cbiAgICAgKi9cbiAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soKSB7fVxufTtcbiIsImxldCBDdXN0b21FdmVudDtcblxudHJ5IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICBsZXQgZXYgPSBuZXcgc2VsZi5DdXN0b21FdmVudCgndGVzdCcpO1xuICAgIEN1c3RvbUV2ZW50ID0gc2VsZi5DdXN0b21FdmVudDtcbn0gY2F0Y2goZXgpIHtcbiAgICBDdXN0b21FdmVudCA9IGZ1bmN0aW9uKGV2ZW50LCBwYXJhbXMpIHtcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHtcbiAgICAgICAgICAgIGJ1YmJsZXM6IGZhbHNlLFxuICAgICAgICAgICAgY2FuY2VsYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBkZXRhaWw6IHVuZGVmaW5lZCxcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuICAgICAgICByZXR1cm4gZXZ0O1xuICAgIH07XG4gICAgQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gc2VsZi5DdXN0b21FdmVudC5wcm90b3R5cGU7XG59XG5cbmV4cG9ydCB7IEN1c3RvbUV2ZW50IH07XG4iLCJpbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4vdHlwZW9mLmpzJztcbmltcG9ydCB7IEN1c3RvbUV2ZW50IH0gZnJvbSAnLi4vcG9seWZpbGxzL2N1c3RvbS1ldmVudC5qcyc7XG5cbi8qKlxuICogVHJpZ2dlciBhIGN1c3RvbSBET00gRXZlbnQuXG4gKiBAcHJpdmF0ZVxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSBUaGUgZXZlbnQgdGFyZ2V0LlxuICogQHBhcmFtIHtTdHJpbmd9IGV2TmFtZSBUaGUgY3VzdG9tIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSBFeHRyYSBkYXRhIHRvIHBhc3MgdG8gdGhlIGV2ZW50LlxuICogQHBhcmFtIHtCb29sZWFufSBidWJibGVzIEVuYWJsZSBldmVudCBidWJibGluZy5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gY2FuY2VsYWJsZSBNYWtlIGV2ZW50IGNhbmNlbGFibGUuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBUcnVlIGlmIGV2ZW50IHByb3BhZ2F0aW9uIGhhcyBub3QgYmUgc3RvcHBlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpc3BhdGNoKG5vZGUsIGV2TmFtZSwgZGF0YSwgYnViYmxlcyA9IHRydWUsIGNhbmNlbGFibGUgPSB0cnVlKSB7XG4gICAgaWYgKCFpc1N0cmluZyhldk5hbWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V2ZW50IG5hbWUgaXMgdW5kZWZpbmVkJyk7XG4gICAgfVxuICAgIGxldCBldiA9IG5ldyBDdXN0b21FdmVudChldk5hbWUsIHtcbiAgICAgICAgZGV0YWlsOiBkYXRhLFxuICAgICAgICBidWJibGVzLFxuICAgICAgICBjYW5jZWxhYmxlLFxuICAgIH0pO1xuICAgIHJldHVybiBub2RlLmRpc3BhdGNoRXZlbnQoZXYpO1xufVxuIiwiaW1wb3J0IHsgaXNVbmRlZmluZWQsIGlzRnVuY3Rpb24sIGlzQXJyYXksIGlzT2JqZWN0LCBpc1N0cmluZyB9IGZyb20gJy4vdHlwZW9mLmpzJztcblxuLyoqXG4gKiBTaG9ydGN1dCB0byBgT2JqZWN0LmRlZmluZVByb3BlcnR5YC5cbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGRlZmluZSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuLyoqXG4gKiBQb3dlciB0byB0aGUgY29tcG9uZW50J3MgcHJvcGVydGllcy5cbiAqIFR5cGUgY2hlY2tpbmcsIHZhbGlkYXRpb24sIGNhbGxiYWNrcywgZXZlbnRzIGFuZCBhdHRyaWJ1dGUgc3luY2luZy5cbiAqIEBwcml2YXRlXG4gKi9cbmNsYXNzIFByb3BlcnR5IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBQcm9wZXJ0eSBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufEFycmF5fSBBIHNpbmdsZSBvciBhIGxpc3Qgb2YgdmFsaWQgY29uc3RydWN0b3JzIGZvciB0aGUgcHJvcGVydHkgdmFsdWUuXG4gICAgICogQHJldHVybiB7UHJvcGVydHl9XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY3Rycykge1xuICAgICAgICB0aGlzLl8gPSBbXTtcbiAgICAgICAgY3RycyA9IGN0cnMgfHwgW107XG4gICAgICAgIGlmICghaXNBcnJheShjdHJzKSkge1xuICAgICAgICAgICAgY3RycyA9IFtjdHJzXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN0cnMgPSBjdHJzO1xuICAgICAgICB0aGlzLnZhbGlkYXRvciA9ICgpID0+IHRydWU7XG4gICAgICAgIHRoaXMuX3NldHRlciA9ICh2YWwpID0+IHZhbDtcbiAgICAgICAgdGhpcy5nZXR0ZXJGbiA9ICgpID0+IHRoaXMudmFsdWU7XG4gICAgICAgIHRoaXMuc2V0dGVyRm4gPSAodmFsKSA9PiB7XG4gICAgICAgICAgICB2YWwgPSB0aGlzLl9zZXR0ZXIodmFsKTtcbiAgICAgICAgICAgIGlmICgodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB8fFxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVUeXBlKHZhbCkgJiYgdGhpcy52YWxpZGF0b3IodmFsKSkge1xuICAgICAgICAgICAgICAgIGxldCBvbGRWYWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKG9sZFZhbHVlICE9PSB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VkKHZhbCwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgYEludmFsaWQgXFxgJHt2YWx9XFxgIHZhbHVlIGZvciBcXGAke3RoaXMubmFtZX1cXGAgcHJvcGVydHkgZm9yIFxcYCR7dGhpcy5zY29wZS5pc31cXGAuYFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhIGNhbGxiYWNrIHdoZW4gdGhlIHByb3BlcnR5IGNoYW5nZXMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIHRyaWdnZXIuXG4gICAgICogQHJldHVybiB7UHJvcGVydHl9IFRoZSBwcm9wZXJ0eSBpbnN0YW5jZSBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgb2JzZXJ2ZShjYWxsYmFjaykge1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihjYWxsYmFjaykgfHwgaXNTdHJpbmcoY2FsbGJhY2spKSB7XG4gICAgICAgICAgICB0aGlzLl8ucHVzaChjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIGNhbGxiYWNrIG9uIHByb3BlcnR5IGNoYW5nZXMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJuIHtQcm9wZXJ0eX0gVGhlIHByb3BlcnR5IGluc3RhbmNlIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICB1bm9ic2VydmUoY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IGlvID0gdGhpcy5fLmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgICBpZiAoaW8gIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl8uc3BsaWNlKGlvLCAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJpZ2dlciBjYWxsYmFja3MgYWZ0ZXIgYSBjaGFuZ2UuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0geyp9IG5ld1ZhbHVlIFRoZSBjdXJyZW50IHByb3BlcnR5IHZhbHVlLlxuICAgICAqIEBwYXJhbSB7Kn0gb2xkVmFsdWUgVGhlIHByZXZpb3VzIHByb3BlcnR5IHZhbHVlLlxuICAgICAqL1xuICAgIGNoYW5nZWQobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLl8ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjbGIgPSB0aGlzLl9baV07XG4gICAgICAgICAgICBpZiAoaXNTdHJpbmcoY2xiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NvcGVbY2xiXS5jYWxsKHRoaXMuc2NvcGUsIHRoaXMsIG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsYih0aGlzLCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGEgcHJvcGVydHkgYWNjZXB0cyBhIGdpdmVuIHR5cGUgYXMgdmFsdWUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gQ3RyIFRoZSBjb25zdHJ1Y3RvciBmb3IgdGhlIGdpdmVuIHR5cGUuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBhY2NlcHRzKEN0cikge1xuICAgICAgICByZXR1cm4gdGhpcy5jdHJzLmluZGV4T2YoQ3RyKSAhPT0gLTE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgcHJvcGVydHkgbmFtZS5cbiAgICAgKiBJdCBhbHNvIHNldCB0aGUgYXR0ck5hbWUgaWYgYC5hdHRyaWJ1dGVgIG1ldGhvZCBhcyBiZWVuIHByZXZpb3VzbHlcbiAgICAgKiBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIFRoZSBwcm9wZXJ0eSBuYW1lLlxuICAgICAqIEByZXR1cm4ge1Byb3BlcnR5fSBUaGUgcHJvcGVydHkgaW5zdGFuY2UgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIG5hbWVkKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgaWYgKHRoaXMuYXR0clJlcXVlc3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5hdHRyTmFtZSA9IHRoaXMubmFtZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBwcm9wZXJ0eSBpbml0aWFsIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7Kn0gaW5pdFZhbHVlIFRoZSBwcm9wZXJ0eSBpbml0aWFsIHZhbHVlLlxuICAgICAqIEByZXR1cm4ge1Byb3BlcnR5fSBUaGUgcHJvcGVydHkgaW5zdGFuY2UgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIGRlZmF1bHQoaW5pdFZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdFZhbHVlID0gaXNPYmplY3QoaW5pdFZhbHVlKSA/XG4gICAgICAgICAgICBPYmplY3QuZnJlZXplKGluaXRWYWx1ZSkgOlxuICAgICAgICAgICAgaW5pdFZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBhdHRyaWJ1dGUgbmFtZSB0byBzeW5jLlxuICAgICAqIEludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGl0IHJldHJpZXZlIHRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eS5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYXR0ck5hbWUgVGhlIGF0dHJpYnV0ZSBuYW1lLlxuICAgICAqIEByZXR1cm4ge1Byb3BlcnR5fSBUaGUgcHJvcGVydHkgaW5zdGFuY2UgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIGF0dHJpYnV0ZShhdHRyTmFtZSA9IHRydWUpIHtcbiAgICAgICAgaWYgKGlzU3RyaW5nKGF0dHJOYW1lKSkge1xuICAgICAgICAgICAgdGhpcy5hdHRyUmVxdWVzdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmF0dHJOYW1lID0gYXR0ck5hbWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmF0dHJSZXF1ZXN0ZWQgPSAhIWF0dHJOYW1lO1xuICAgICAgICAgICAgdGhpcy5hdHRyTmFtZSA9IHRoaXMubmFtZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGEgRE9NIGV2ZW50IG5hbWUgdG8gZGlzcGF0Y2ggb24gY2hhbmdlcy5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZOYW1lIFRoZSBldmVudCBuYW1lLlxuICAgICAqIEByZXR1cm4ge1Byb3BlcnR5fSBUaGUgcHJvcGVydHkgaW5zdGFuY2UgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIGRpc3BhdGNoKGV2TmFtZSkge1xuICAgICAgICB0aGlzLmV2ZW50TmFtZSA9IGV2TmFtZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCBhIGdldHRlciBmdW5jdGlvbiBmb3IgdGhlIHByb3BlcnR5LlxuICAgICAqIEJ5IGRlZmF1bHQsIHRoZSBwcm9wZXJ0eSB2YWx1ZSB3aWxsIGJlIHJldHVybi5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgcHJvcGVydHkgZ2V0dGVyLlxuICAgICAqIEByZXR1cm4ge1Byb3BlcnR5fSBUaGUgcHJvcGVydHkgaW5zdGFuY2UgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIGdldHRlcihjYWxsYmFjaykge1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihjYWxsYmFjaykpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0dGVyRm4gPSAoKSA9PiBjYWxsYmFjayh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IGEgc2V0dGVyIGZ1bmN0aW9uIGZvciB0aGUgcHJvcGVydHkuXG4gICAgICogQnkgZGVmYXVsdCwgdGhlIHByb3BlcnR5IHZhbHVlIHdpbGwgYmUgdXBkYXRlZCB3aXRoIGdpdmVuIHZhbHVlXG4gICAgICogd2l0aG91dCBhbnkgbW9kaWZpY2F0aW9uLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBwcm9wZXJ0eSBzZXR0ZXIuXG4gICAgICogQHJldHVybiB7UHJvcGVydHl9IFRoZSBwcm9wZXJ0eSBpbnN0YW5jZSBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgc2V0dGVyKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGVyID0gY2FsbGJhY2s7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgcHJvcGVydHkgdmFsaWRhdG9yLlxuICAgICAqIEEgdmFsaWRhdG9yIHNob3VsZCByZXR1cm4gYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBhY2NlcHRhYmxlXG4gICAgICogb3IgYGZhbHNlYCBpZiB1bmFjY2FwdGFibGUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIHByb3BlcnR5IHZhbGlkdG9yLlxuICAgICAqIEByZXR1cm4ge1Byb3BlcnR5fSBUaGUgcHJvcGVydHkgaW5zdGFuY2UgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHZhbGlkYXRlKGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBjYWxsYmFjaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIGdpdmVuIHZhbHVlIGlzIGEgdmFsaWQgdHlwZS5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIHZhbGlkYXRlVHlwZSh2YWwpIHtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBsZXQgY3RycyA9IHRoaXMuY3RycztcbiAgICAgICAgaWYgKGN0cnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoaSA8IGN0cnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAodmFsIGluc3RhbmNlb2YgY3Ryc1tpXSB8fCAoXG4gICAgICAgICAgICAgICAgdmFsLmNvbnN0cnVjdG9yICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gY3Ryc1tpXVxuICAgICAgICAgICAgKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXR0YWNoIHRoZSBwcm9wZXJ0eSB0byBhIHNjb3BlIChhIGNvbXBvbmVudCBpbnN0YW5jZSkuXG4gICAgICogU2V0IHRoZSBkZWZhdWx0IHZhbHVlIGlmIHByb3ZpZGVkLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZSBUaGUgc2NvcGUgd2hpY2ggbmVlZHMgdG8gYmUgYm91bmQgd2l0aCB0aGUgcHJvcGVydHkuXG4gICAgICovXG4gICAgaW5pdChzY29wZSkge1xuICAgICAgICB0aGlzLnNjb3BlID0gc2NvcGU7XG4gICAgICAgIGRlZmluZShzY29wZSwgdGhpcy5uYW1lLCB7XG4gICAgICAgICAgICBnZXQ6IHRoaXMuZ2V0dGVyRm4uYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHNldDogdGhpcy5zZXR0ZXJGbi5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLmRlZmF1bHRWYWx1ZSkpIHtcbiAgICAgICAgICAgIHNjb3BlW3RoaXMubmFtZV0gPSB0aGlzLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBIZWxwZXIgbWV0aG9kIGZvciBQcm9wZXJ0eSBjcmVhdGlvbi5cbiAqIEBtZXRob2QgcHJvcFxuICogQG1lbWJlcm9mISBETkEuXG4gKiBAc3RhdGljXG4gKlxuICogQHByb3BlcnR5IHtQcm9wZXJ0eX0gQU5ZIEEgcHJvcGVydHkgd2l0aG91dCB0eXBlIHZhbGlkYXRpb24uXG4gKiBAcHJvcGVydHkge1Byb3BlcnR5fSBTVFJJTkcgQSBwcm9wZXJ0eSB3aGljaCBhY2NlcHRzIG9ubHkgc3RyaW5ncy5cbiAqIEBwcm9wZXJ0eSB7UHJvcGVydHl9IEJPT0xFQU4gQSBwcm9wZXJ0eSB3aGljaCBhY2NlcHRzIG9ubHkgYm9vbGVhbnMuXG4gKiBAcHJvcGVydHkge1Byb3BlcnR5fSBOVU1CRVIgQSBwcm9wZXJ0eSB3aGljaCBhY2NlcHRzIG9ubHkgbnVtYmVycy5cbiAqXG4gKiBAcGFyYW0ge1Byb3BlcnR5fEZ1bmN0aW9ufEFycmF5fSBjdHJzIEEgUHJvcGVydHkgdG8gY2xvbmUgb3IgYSBzaW5nbGUgb3IgYSBsaXN0IG9mIHZhbGlkIGNvbnN0cnVjdG9ycyBmb3IgdGhlIHByb3BlcnR5IHZhbHVlLlxuICogQHJldHVybiB7UHJvcGVydHl9IFRoZSBuZXcgcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9wKGN0cnMpIHtcbiAgICBpZiAoY3RycyBpbnN0YW5jZW9mIFByb3BlcnR5KSB7XG4gICAgICAgIHJldHVybiBjdHJzO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFByb3BlcnR5KGN0cnMpO1xufVxuXG4vLyBEZWZpbmUgc29tZSBoZWxwZXJzIGZvciBkZWZhdWx0IHR5cGVzXG5kZWZpbmUocHJvcCwgJ0FOWScsIHsgZ2V0KCkgeyByZXR1cm4gcHJvcCgpOyB9IH0pO1xuZGVmaW5lKHByb3AsICdTVFJJTkcnLCB7IGdldCgpIHsgcmV0dXJuIHByb3AoU3RyaW5nKTsgfSB9KTtcbmRlZmluZShwcm9wLCAnQk9PTEVBTicsIHsgZ2V0KCkgeyByZXR1cm4gcHJvcChCb29sZWFuKTsgfSB9KTtcbmRlZmluZShwcm9wLCAnTlVNQkVSJywgeyBnZXQoKSB7IHJldHVybiBwcm9wKE51bWJlcik7IH0gfSk7XG4iLCJpbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAnLi4vbGliL3R5cGVvZi5qcyc7XG5pbXBvcnQgeyBkaXNwYXRjaCB9IGZyb20gJy4uL2xpYi9kaXNwYXRjaC5qcyc7XG5pbXBvcnQgeyBpc1VuZGVmaW5lZCB9IGZyb20gJy4uL2xpYi90eXBlb2YuanMnO1xuaW1wb3J0IHsgcHJvcCB9IGZyb20gJy4uL2xpYi9wcm9wZXJ0eS5qcyc7XG5cbi8qKlxuICogVHJ5IHRvIHBhcnNlIGF0dHJpYnV0ZSB2YWx1ZSBjaGVja2luZyB0aGUgcHJvcGVydHkgdmFsaWRhdGlvbiB0eXBlcy5cbiAqIEBwcml2YXRlXG4gKlxuICogQHBhcmFtIHtQcm9wZXJ0eX0gcHJvcGVydHkgVGhlIHByb3BlcnR5IHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyVmFsIFRoZSBhdHRyaWJ1dGUgdmFsdWUuXG4gKiBAcmV0dXJuIHsqfSBUaGUgcGFyc2VkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShwcm9wZXJ0eSwgYXR0clZhbCkge1xuICAgIGlmIChhdHRyVmFsID09PSAnJyAmJiBwcm9wZXJ0eS5hY2NlcHRzKEJvb2xlYW4pKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoIXByb3BlcnR5LmFjY2VwdHMoU3RyaW5nKSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoYXR0clZhbCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAvL1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhdHRyVmFsO1xufVxuXG4vKipcbiAqIFNldCBhbiBhdHRyaWJ1dGUgdmFsdWUgY2hlY2tpbmcgaXRzIHR5cGUuXG4gKiBAcHJpdmF0ZVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRleHQgVGhlIG5vZGUgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtTdHJpbmd9IGF0dHIgVGhlIGF0dHJpYnV0ZSBuYW1lIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlKGNvbnRleHQsIGF0dHIsIHZhbHVlKSB7XG4gICAgbGV0IGN1cnJlbnRBdHRyVmFsdWUgPSBjb250ZXh0LmdldEF0dHJpYnV0ZShhdHRyKTtcbiAgICBpZiAoY3VycmVudEF0dHJWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xuICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgICAgY29udGV4dC5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICAgICAgY29udGV4dC5zZXRBdHRyaWJ1dGUoYXR0ciwgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRBdHRyVmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRleHQucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIFNpbXBsZSBDdXN0b20gQ29tcG9uZW50IGZvciBwcm9wZXJ0aWVzIGluaXRpYWxpemF0aW9uIHZpYSBhdHRyaWJ1dGVzLlxuICogQG1peGluIFByb3BlcnRpZXNNaXhpblxuICogQG1lbWJlcm9mIEROQS5NSVhJTlNcbiAqIEBzdGF0aWNcbiAqXG4gKiBAZXhhbXBsZVxuICogYGBganNcbiAqIC8vIG15LWNvbXBvbmVudC5qc1xuICogaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJ0BkbmFqcy9jb3JlJztcbiAqIGV4cG9ydCBjbGFzcyBNeUNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuICogICBnZXQgcHJvcGVydGllcygpIHtcbiAqICAgICByZXR1cm4geyBuYW1lOiBTdHJpbmcgfTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKiBgYGBqc1xuICogLy8gYXBwLmpzXG4gKiBpbXBvcnQgeyBkZWZpbmUgfSBmcm9tICdAZG5hanMvY29yZSc7XG4gKiBpbXBvcnQgeyBNeUNvbXBvbmVudCB9IGZyb20gJy4vbXktY29tcG9uZW50LmpzJztcbiAqIGRlZmluZSgnbXktY29tcG9uZW50JywgTXlDb21wb25lbnQpO1xuICogdmFyIHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAqIHRlbXAuaW5uZXJIVE1MID0gJzxteS1jb21wb25lbnQgbmFtZT1cIkFsYmVydFwiPjwvbXktY29tcG9uZW50Pic7XG4gKiB2YXIgZWxlbWVudCA9IHRlbXAuZmlyc3RDaGlsZDtcbiAqIGNvbnNvbGUubG9nKGVsZW1lbnQubmFtZSk7IC8vIGxvZ3MgXCJBbGJlcnRcIlxuICogYGBgXG4gKi9cbmV4cG9ydCBjb25zdCBQcm9wZXJ0aWVzTWl4aW4gPSAoU3VwZXJDbGFzcykgPT4gY2xhc3MgZXh0ZW5kcyBTdXBlckNsYXNzIHtcbiAgICAvKipcbiAgICAgKiBBdHRhY2ggcHJvcGVydGllcyBvbiBjb21wb25lbnQgY3JlYXRpb24uXG4gICAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxuICAgICAqIEBtZW1iZXJvZiBETkEuTUlYSU5TLlByb3BlcnRpZXNNaXhpblxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBsZXQgcHJvcHMgPSB0aGlzLnByb3BlcnRpZXM7XG4gICAgICAgIGlmIChwcm9wcykge1xuICAgICAgICAgICAgaWYgKCFpc0FycmF5KHByb3BzKSkge1xuICAgICAgICAgICAgICAgIHByb3BzID0gW3Byb3BzXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb3BzID0gcHJvcHMucmVkdWNlKChyZXMsIHBhcnRpYWxQcm9wcykgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgaW4gcGFydGlhbFByb3BzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc1trXSA9IHByb3AocGFydGlhbFByb3BzW2tdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb3BzID0ge307XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdwcm9wZXJ0aWVzJywge1xuICAgICAgICAgICAgdmFsdWU6IHByb3BzLFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IG9ic2VydmVkID0gdGhpcy5jb25zdHJ1Y3Rvci5vYnNlcnZlZEF0dHJpYnV0ZXMgfHwgW107XG4gICAgICAgIGZvciAobGV0IGsgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgIGxldCBwcm9wID0gcHJvcHNba107XG4gICAgICAgICAgICBwcm9wLm5hbWVkKGspLmluaXQodGhpcyk7XG4gICAgICAgICAgICBsZXQgeyBhdHRyTmFtZSwgZXZlbnROYW1lIH0gPSBwcm9wO1xuICAgICAgICAgICAgaWYgKCFhdHRyTmFtZSAmJiBvYnNlcnZlZC5pbmRleE9mKGspICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHByb3AuYXR0cmlidXRlKCk7XG4gICAgICAgICAgICAgICAgYXR0ck5hbWUgPSBrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGF0dHJOYW1lIHx8IGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgICAgIHByb3Aub2JzZXJ2ZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhdHRyTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXR0cmlidXRlKHRoaXMubm9kZSwgYXR0ck5hbWUsIHRoaXNbcHJvcC5uYW1lXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2godGhpcy5ub2RlLCBldmVudE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU3luYyBpbml0aWFsIGF0dHJpYnV0ZXMgd2l0aCBwcm9wZXJ0aWVzLlxuICAgICAqIEBtZXRob2QgY29ubmVjdGVkQ2FsbGJhY2tcbiAgICAgKiBAbWVtYmVyb2YgRE5BLk1JWElOUy5Qcm9wZXJ0aWVzTWl4aW5cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICAgICAgbGV0IHByb3BzID0gdGhpcy5wcm9wZXJ0aWVzO1xuICAgICAgICBmb3IgKGxldCBrIGluIHByb3BzKSB7XG4gICAgICAgICAgICBsZXQgcHJvcCA9IHByb3BzW2tdO1xuICAgICAgICAgICAgbGV0IHsgYXR0ck5hbWUgfSA9IHByb3A7XG4gICAgICAgICAgICBpZiAoYXR0ck5hbWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNVbmRlZmluZWQodGhpc1twcm9wLm5hbWVdKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLmhhc0F0dHJpYnV0ZShhdHRyTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbcHJvcC5uYW1lXSA9IGdldFZhbHVlKHByb3AsIHRoaXMubm9kZS5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEF0dHJpYnV0ZSh0aGlzLm5vZGUsIGF0dHJOYW1lLCB0aGlzW3Byb3AubmFtZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTeW5jIGF0dHJpYnV0ZXMgd2l0aCBwcm9wZXJ0aWVzLlxuICAgICAqIEBtZXRob2QgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrXG4gICAgICogQG1lbWJlcm9mIEROQS5NSVhJTlMuUHJvcGVydGllc01peGluXG4gICAgICogQGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYXR0ck5hbWUgVGhlIGNoYW5nZWQgYXR0cmlidXRlIG5hbWUuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9sZFZhbCBUaGUgdmFsdWUgb2YgdGhlIGF0dHJpYnV0ZSBiZWZvcmUgdGhlIGNoYW5nZS5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmV3VmFsIFRoZSB2YWx1ZSBvZiB0aGUgYXR0cmlidXRlIGFmdGVyIHRoZSBjaGFuZ2UuXG4gICAgICovXG4gICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGF0dHIsIG9sZFZhbCwgbmV3VmFsKSB7XG4gICAgICAgIHN1cGVyLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyLCBvbGRWYWwsIG5ld1ZhbCk7XG4gICAgICAgIGxldCBwcm9wcyA9IHRoaXMucHJvcGVydGllcztcbiAgICAgICAgZm9yIChsZXQgayBpbiBwcm9wcykge1xuICAgICAgICAgICAgbGV0IHByb3AgPSBwcm9wc1trXTtcbiAgICAgICAgICAgIGlmIChwcm9wLmF0dHJOYW1lID09PSBhdHRyKSB7XG4gICAgICAgICAgICAgICAgdGhpc1twcm9wLm5hbWVdID0gZ2V0VmFsdWUocHJvcCwgbmV3VmFsKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbGlzdGVuZXIgZm9yIG5vZGUncyBwcm9wZXJ0eSBjaGFuZ2VzLlxuICAgICAqIEBtZXRob2Qgb2JzZXJ2ZVByb3BlcnR5XG4gICAgICogQG1lbWJlcm9mIEROQS5NSVhJTlMuUHJvcGVydGllc01peGluXG4gICAgICogQGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcE5hbWUgVGhlIHByb3BlcnR5IG5hbWUgdG8gb2JzZXJ2ZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gZmlyZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCB3aXRoIGBjYW5jZWxgIG1ldGhvZC5cbiAgICAgKi9cbiAgICBvYnNlcnZlUHJvcGVydHkocHJvcE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXNbcHJvcE5hbWVdLm9ic2VydmUoY2FsbGJhY2spO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSBsaXN0ZW5lciBmb3Igbm9kZSdzIHByb3BlcnR5IGNoYW5nZXMuXG4gICAgICogQG1ldGhvZCB1bm9ic2VydmVQcm9wZXJ0eVxuICAgICAqIEBtZW1iZXJvZiBETkEuTUlYSU5TLlByb3BlcnRpZXNNaXhpblxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BOYW1lIFRoZSBwcm9wZXJ0eSBuYW1lIHRvIHVub2JzZXJ2ZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gcmVtb3ZlLlxuICAgICAqL1xuICAgIHVub2JzZXJ2ZVByb3BlcnR5KHByb3BOYW1lLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLnByb3BlcnRpZXNbcHJvcE5hbWVdLnVub2JzZXJ2ZShjYWxsYmFjayk7XG4gICAgfVxufTtcbiIsImNvbnN0IEVMRU1fUFJPVE8gPSBFbGVtZW50LnByb3RvdHlwZTtcblxuZXhwb3J0IGNvbnN0IG1hdGNoZXMgPSBFTEVNX1BST1RPLm1hdGNoZXMgfHxcbiAgICBFTEVNX1BST1RPLm1hdGNoZXNTZWxlY3RvciB8fFxuICAgIEVMRU1fUFJPVE8ubW96TWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgRUxFTV9QUk9UTy5tc01hdGNoZXNTZWxlY3RvciB8fFxuICAgIEVMRU1fUFJPVE8ub01hdGNoZXNTZWxlY3RvciB8fFxuICAgIEVMRU1fUFJPVE8ud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xuIiwiaW1wb3J0IHsgaXNTdHJpbmcsIGlzRnVuY3Rpb24gfSBmcm9tICcuLi9saWIvdHlwZW9mLmpzJztcbmltcG9ydCB7IG1hdGNoZXMgfSBmcm9tICcuLi9wb2x5ZmlsbHMvbWF0Y2hlcy5qcyc7XG5pbXBvcnQgeyBkaXNwYXRjaCB9IGZyb20gJy4uL2xpYi9kaXNwYXRjaC5qcyc7XG5cbmNvbnN0IFNQTElUX1NFTEVDVE9SID0gLyhbXlxcc10rKSguKik/LztcblxuLyoqXG4gKiBTaW1wbGUgQ3VzdG9tIENvbXBvbmVudCB3aXRoIGV2ZW50cyBkZWxlZ2F0aW9uLFxuICogSXQgYWxzbyBpbXBsZW1lbnQgYSBgZGlzcGF0Y2hFdmVudGAgd3JhcHBlciBuYW1lZCBgdHJpZ2dlcmAuXG4gKiBAbWl4aW4gRXZlbnRzTWl4aW5cbiAqIEBtZW1iZXJvZiBETkEuTUlYSU5TLlxuICogQHN0YXRpY1xuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogLy8gbXktY29tcG9uZW50LmpzXG4gKiBpbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnQGRuYWpzL2NvcmUnO1xuICogZXhwb3J0IGNsYXNzIE15Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gKiAgIGdldCBldmVudHMoKSB7XG4gKiAgICAgcmV0dXJuIHtcbiAqICAgICAgICdjbGljayBidXR0b24nOiAnb25CdXR0b25DbGljaydcbiAqICAgICB9XG4gKiAgIH1cbiAqICAgb25CdXR0b25DbGljaygpIHtcbiAqICAgICBjb25zb2xlLmxvZygnYnV0dG9uIGNsaWNrZWQnKTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKiBgYGBqc1xuICogLy8gYXBwLmpzXG4gKiBpbXBvcnQgeyBkZWZpbmUgfSBmcm9tICdAZG5hanMvY29yZSc7XG4gKiBpbXBvcnQgeyBNeUNvbXBvbmVudCB9IGZyb20gJy4vbXktY29tcG9uZW50LmpzJztcbiAqIGRlZmluZSgnbXktY29tcG9uZW50JywgTXlDb21wb25lbnQpO1xuICogdmFyIGVsZW1lbnQgPSBuZXcgTXlDb21wb25lbnQoKTtcbiAqIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAqIGJ1dHRvbi5pbm5lclRleHQgPSAnQ2xpY2sgbWUnO1xuICogZWxlbWVudC5hcHBlbmRDaGlsZChidXR0b24pO1xuICogYnV0dG9uLmNsaWNrKCk7IC8vIGxvZ3MgXCJidXR0b24gY2xpY2tlZFwiXG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNvbnN0IEV2ZW50c01peGluID0gKFN1cGVyQ2xhc3MpID0+IGNsYXNzIGV4dGVuZHMgU3VwZXJDbGFzcyB7XG4gICAgLyoqXG4gICAgICogQXR0YWNoIGFuZCBkZWxlZ2F0ZSBldmVudHMgdG8gdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAbWV0aG9kIGNvbnN0cnVjdG9yXG4gICAgICogQG1lbWJlcm9mIEROQS5NSVhJTlMuRXZlbnRzTWl4aW5cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgLy8gYmluZCBldmVudHNcbiAgICAgICAgbGV0IGV2ZW50cyA9IHRoaXMuZXZlbnRzIHx8IHt9O1xuICAgICAgICBmb3IgKGxldCBrIGluIGV2ZW50cykge1xuICAgICAgICAgICAgbGV0IGNhbGxiYWNrID0gaXNTdHJpbmcoZXZlbnRzW2tdKSA/XG4gICAgICAgICAgICAgICAgdGhpc1tldmVudHNba11dIDpcbiAgICAgICAgICAgICAgICBldmVudHNba107XG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihjYWxsYmFjaykpIHtcbiAgICAgICAgICAgICAgICBsZXQgcnVsZSA9IGsubWF0Y2goU1BMSVRfU0VMRUNUT1IpO1xuICAgICAgICAgICAgICAgIGxldCBldk5hbWUgPSBydWxlWzFdO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RvciA9IChydWxlWzJdIHx8ICcnKS50cmltKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsZWdhdGUoZXZOYW1lLCBzZWxlY3RvciwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRFdmVudExpc3RlbmVyKGV2TmFtZSwgKGV2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGV2LCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNhbGxiYWNrIGZvciBldmVudC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWxlZ2F0ZSBldmVudHMgdG8gdGhlIGNvbXBvbmVudCBkZXNjZW5kZW50cy5cbiAgICAgKiBAbWV0aG9kIGRlbGVnYXRlXG4gICAgICogQG1lbWJlcm9mIEROQS5NSVhJTlMuRXZlbnRzTWl4aW5cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldk5hbWUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGRlbGVnYXRlLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciBBIENTUyBzZWxlY3RvciBmb3IgZGVzY2VuZGVudHMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIGZpcmUgd2hlbiB0aGUgZXZlbnQgZmlyZXMuXG4gICAgICovXG4gICAgZGVsZWdhdGUoZXZOYW1lLCBzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZOYW1lLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICB3aGlsZSAodGFyZ2V0ICYmIHRhcmdldCAhPT0gdGhpcykge1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzLmNhbGwodGFyZ2V0LCBzZWxlY3RvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBldmVudCwgdGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBgTm9kZS5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudGAgd3JhcHBlci5cbiAgICAgKiBAbWV0aG9kIHRyaWdnZXJcbiAgICAgKiBAbWVtYmVyb2YgRE5BLk1JWElOUy5FdmVudHNNaXhpblxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2TmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gZmlyZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSBBIHNldCBvZiBjdXN0b20gZGF0YSB0byBwYXNzIHRvIHRoZSBldmVudC5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGJ1YmJsZXMgU2hvdWxkIHRoZSBldmVudCBidWJibGUgdGhyb3cgdGhlIERPTSB0cmVlLlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gY2FuY2VsYWJsZSBDYW4gYmUgdGhlIGV2ZW50IGNhbmNlbCBieSBhIGNhbGxiYWNrLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFRydWUgaWYgZXZlbnQgcHJvcGFnYXRpb24gaGFzIG5vdCBiZSBzdG9wcGVkLlxuICAgICAqL1xuICAgIHRyaWdnZXIoZXZOYW1lLCBkYXRhLCBidWJibGVzID0gdHJ1ZSwgY2FuY2VsYWJsZSA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGRpc3BhdGNoKHRoaXMsIGV2TmFtZSwgZGF0YSwgYnViYmxlcywgY2FuY2VsYWJsZSk7XG4gICAgfVxufTtcbiIsImNvbnN0IHJvb3REb2MgPSBkb2N1bWVudDtcbi8qKlxuICogQ3JlYXRlIGFuZCBhdHRhY2ggYSBzdHlsZSBlbGVtZW50IGZvciBhIGNvbXBvbmVudC5cbiAqIEBwcml2YXRlXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZSBBIGNvbXBvbmVudCBpbnN0YW5jZS5cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSBUaGUgY3JlYXRlZCBzdHlsZSBlbGVtZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3R5bGUobm9kZSkge1xuICAgIGxldCBkb2MgPSBub2RlLm93bmVyRG9jdW1lbnQgfHwgcm9vdERvYztcbiAgICBsZXQgc3R5bGVFbGVtID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGVFbGVtLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIHN0eWxlRWxlbS5zZXRBdHRyaWJ1dGUoJ2lkJywgYHN0eWxlLSR7bm9kZS5pc31gKTtcbiAgICBsZXQgaGVhZCA9IGRvYy5oZWFkO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKGhlYWQuZmlyc3RFbGVtZW50Q2hpbGQpIHtcbiAgICAgICAgaGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtLCBoZWFkLmZpcnN0RWxlbWVudENoaWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbSk7XG4gICAgfVxuICAgIHJldHVybiBzdHlsZUVsZW07XG59XG4iLCJpbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4uL2xpYi90eXBlb2YuanMnO1xuaW1wb3J0IHsgY3JlYXRlU3R5bGUgfSBmcm9tICcuLi9saWIvc3R5bGUuanMnO1xuXG4vKipcbiAqIFNpbXBsZSBDdXN0b20gQ29tcG9uZW50IHdpdGggY3NzIHN0eWxlIGhhbmRsaW5nIHVzaW5nIHRoZSBgY3NzYCBwcm9wZXJ0eS5cbiAqIEBtaXhpbiBTdHlsZU1peGluXG4gKiBAbWVtYmVyb2YgRE5BLk1JWElOU1xuICogQHN0YXRpY1xuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogLy8gbXktY29tcG9uZW50LmpzXG4gKiBpbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnQGRuYWpzL2NvcmUnO1xuICogZXhwb3J0IGNsYXNzIE15Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gKiAgIGdldCBjc3MoKSB7XG4gKiAgICAgcmV0dXJuICcubXktY29tcG9uZW50IHAgeyBjb2xvcjogcmVkOyB9J1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqIGBgYGpzXG4gKiAvLyBhcHAuanNcbiAqIGltcG9ydCB7IGRlZmluZSB9IGZyb20gJ0BkbmFqcy9jb3JlJztcbiAqIGltcG9ydCB7IE15Q29tcG9uZW50IH0gZnJvbSAnLi9teS1jb21wb25lbnQuanMnO1xuICogZGVmaW5lKCdteS1jb21wb25lbnQnLCBNeUNvbXBvbmVudCk7XG4gKiB2YXIgZWxlbWVudCA9IG5ldyBNeUNvbXBvbmVudCgpO1xuICogdmFyIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gKiBwLmlubmVyVGV4dCA9ICdQYXJhZ3JhcGgnO1xuICogZWxlbWVudC5hcHBlbmRDaGlsZChwKTsgLy8gdGV4dCBpbnNpZGUgYHBgIGdldHMgdGhlIHJlZCBjb2xvclxuICogYGBgXG4gKi9cbmV4cG9ydCBjb25zdCBTdHlsZU1peGluID0gKFN1cGVyQ2xhc3MpID0+IGNsYXNzIGV4dGVuZHMgU3VwZXJDbGFzcyB7XG4gICAgLyoqXG4gICAgICogRmlyZXMgd2hlbiBhbiBpbnN0YW5jZSBvZiB0aGUgZWxlbWVudCBpcyBjcmVhdGVkLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpZiAoIXRoaXMuY29uc3RydWN0b3Iuc3R5bGVFbGVtKSB7XG4gICAgICAgICAgICBsZXQgQ3RyID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDdHIsICdzdHlsZUVsZW0nLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGNyZWF0ZVN0eWxlKHRoaXMpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVDU1MoKTtcbiAgICB9XG5cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICAgICAgdGhpcy5ub2RlLmNsYXNzTGlzdC5hZGQodGhpcy5pcyk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ1NTKCkge1xuICAgICAgICBsZXQgc3R5bGUgPSB0aGlzLmNzcztcbiAgICAgICAgaWYgKGlzU3RyaW5nKHN0eWxlKSkge1xuICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5zdHlsZUVsZW0udGV4dENvbnRlbnQgPSBzdHlsZTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJpbXBvcnQgeyBpc1VuZGVmaW5lZCwgaXNGdW5jdGlvbiwgaXNTdHJpbmcgfSBmcm9tICcuLi9saWIvdHlwZW9mLmpzJztcblxuLyoqXG4gKiBTaW1wbGUgQ3VzdG9tIENvbXBvbmVudCB3aXRoIHRlbXBsYXRlIGhhbmRsaW5nIHVzaW5nIHRoZSBgdGVtcGxhdGVgIHByb3BlcnR5LlxuICogQG1lbWJlcm9mIEROQS5NSVhJTlNcbiAqIEBtaXhpbiBUZW1wbGF0ZU1peGluXG4gKiBAc3RhdGljXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gU3VwZXJDbGFzcyBUaGUgY2xhc3MgdG8gZXh0ZW5kLlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBleHRlbmRlZCBjbGFzcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBganNcbiAqIC8vIG15LWNvbXBvbmVudC5qc1xuICogaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJ0BkbmFqcy9jb3JlJztcbiAqIGV4cG9ydCBjbGFzcyBNeUNvbXBvbmVudCBleHRlbmRzIEJhc2VDb21wb25lbnQge1xuICogICBnZXQgdGVtcGxhdGUoKSB7XG4gKiAgICAgcmV0dXJuIGA8aDE+JHt0aGlzLm5hbWV9PC9oMT5gO1xuICogICB9XG4gKiAgIGdldCBuYW1lKCkge1xuICogICAgIHJldHVybiAnTmV3dG9uJztcbiAqICAgfVxuICogfVxuICogYGBgXG4gKiBgYGBqc1xuICogLy8gYXBwLmpzXG4gKiBpbXBvcnQgeyBkZWZpbmUgfSBmcm9tICdAZG5hanMvY29yZSc7XG4gKiBpbXBvcnQgeyBNeUNvbXBvbmVudCB9IGZyb20gJy4vbXktY29tcG9uZW50LmpzJztcbiAqIGRlZmluZSgnbXktY29tcG9uZW50JywgTXlDb21wb25lbnQpO1xuICogdmFyIGVsZW1lbnQgPSBuZXcgTXlDb21wb25lbnQoKTtcbiAqIGNvbnNvbGUubG9nKGVsZW1lbnQuaW5uZXJIVE1MKTsgLy8gbG9ncyBcIjxoMT5OZXd0b248L2gxPlwiXG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNvbnN0IFRlbXBsYXRlTWl4aW4gPSAoU3VwZXJDbGFzcykgPT4gY2xhc3MgZXh0ZW5kcyBTdXBlckNsYXNzIHtcbiAgICBnZXQgYXV0b1JlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0dGFjaCBwcm9wZXJ0aWVzIG9ic2VydmVycyBpbiBvcmRlciB0byB1cGRhdGUgY2hpbGRyZW4uXG4gICAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxuICAgICAqIEBtZW1iZXJvZiBETkEuTUlYSU5TLlRlbXBsYXRlTWl4aW5cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgaWYgKHRoaXMuYXV0b1JlbmRlciAmJiAhaXNVbmRlZmluZWQodGhpcy50ZW1wbGF0ZSkpIHtcbiAgICAgICAgICAgIGxldCBwcm9wcyA9IHRoaXMucHJvcGVydGllcztcbiAgICAgICAgICAgIGlmIChwcm9wcykge1xuICAgICAgICAgICAgICAgIGxldCBjYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcHNba10ub2JzZXJ2ZShjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbmRlciB0aGUgY29tcG9uZW50IHdoZW4gY29ubmVjdGVkLlxuICAgICAqIEBtZXRob2QgY29ubmVjdGVkQ2FsbGJhY2tcbiAgICAgKiBAbWVtYmVyb2YgRE5BLk1JWElOUy5UZW1wbGF0ZU1peGluXG4gICAgICogQGluc3RhbmNlXG4gICAgICovXG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHN1cGVyLmNvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgICAgIGlmICghaXNVbmRlZmluZWQodGhpcy50ZW1wbGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIENvbXBvbmVudCBjaGlsZCBub2Rlcy5cbiAgICAgKiBAbWV0aG9kIHJlbmRlclxuICAgICAqIEBtZW1iZXJvZiBETkEuTUlYSU5TLlRlbXBsYXRlTWl4aW5cbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258c3RyaW5nfSB0cGwgQSB0ZW1wbGF0ZSB0byB1c2UgaW5zdGVhZCBvZiBgdGhpcy50ZW1wbGF0ZWAuXG4gICAgICpcbiAgICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9IFdpbGwgdGhyb3cgaWYgdGhlIHRlbXBsYXRlIHR5cGUgaXMgbm90IHN1cHBvcnRlZC5cbiAgICAgKi9cbiAgICByZW5kZXIodHBsKSB7XG4gICAgICAgIHRwbCA9IHRwbCB8fCB0aGlzLnRlbXBsYXRlO1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih0cGwpKSB7XG4gICAgICAgICAgICB0cGwuY2FsbCh0aGlzKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1N0cmluZyh0cGwpKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuaW5uZXJIVE1MID0gdHBsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCB0ZW1wbGF0ZSBwcm9wZXJ0eS4nKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItcmVzdC1wYXJhbXMgKi9cbmV4cG9ydCBjb25zdCByZWR1Y2UgPSBBcnJheS5wcm90b3R5cGUucmVkdWNlIHx8IGZ1bmN0aW9uKGNhbGxiYWNrIC8qLCBpbml0aWFsVmFsdWUqLyApIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgbGV0IHQgPSB0aGlzO1xuICAgIGxldCBsZW4gPSB0Lmxlbmd0aDtcbiAgICBsZXQgayA9IDA7XG4gICAgbGV0IHZhbHVlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHZhbHVlID0gYXJndW1lbnRzWzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHdoaWxlIChrIDwgbGVuICYmICEoayBpbiB0KSkge1xuICAgICAgICAgICAgaysrO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlID0gdFtrKytdO1xuICAgIH1cbiAgICBmb3IgKDsgayA8IGxlbjsgaysrKSB7XG4gICAgICAgIGlmIChrIGluIHQpIHtcbiAgICAgICAgICAgIHZhbHVlID0gY2FsbGJhY2sodmFsdWUsIHRba10sIGssIHQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn07XG4iLCIvKipcbiAqIEBhdXRob3IgSnVzdGluIEZhZ25hbmlcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2p1c3RpbmZhZ25hbmkvbWl4d2l0aC5qc1xuICovXG5pbXBvcnQgeyByZWR1Y2UgfSBmcm9tICcuLi9wb2x5ZmlsbHMvcmVkdWNlLmpzJztcblxuLyoqXG4gKiBNaXggYSBjbGFzcyB3aXRoIGEgbWl4aW4uXG4gKiBAbWV0aG9kIG1peCguLi4pLndpdGgoLi4uKVxuICogQG1lbWJlcm9mISBETkEuXG4gKiBAc3RhdGljXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3VwZXJDbGFzcyBUaGUgY2xhc3MgdG8gZXh0ZW5kLlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbWl4ZWQgY2xhc3MuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiAvLyBteS1zdXBlci5qc1xuICogZXhwb3J0IGNsYXNzIE15U3VwZXJDbGFzcyB7XG4gKiAgICAgY29uc3RydWN0b3IoKSB7XG4gKiAgICAgICAgIC8vIGRvIHNvbWV0aGluZ1xuICogICAgIH1cbiAqIH1cbiAqIGBgYFxuICogYGBganNcbiAqIC8vIG1peGluLmpzXG4gKiBleHBvcnQgY29uc3QgTWl4aW4gPSAoc3VwZXJDbGFzcykgPT4gY2xhc3MgZXh0ZW5kIHN1cGVyQ2xhc3Mge1xuICogICAgIGNvbnN0cnVjdG9yKCkge1xuICogICAgICAgICBzdXBlcigpO1xuICogICAgICAgICAvLyBkbyBzb21ldGhpbmcgZWxzZVxuICogICAgIH1cbiAqIH07XG4gKiBgYGBcbiAqIGBgYGpzXG4gKiBpbXBvcnQgeyBtaXggfSBmcm9tICdAZG5hanMvY29yZSc7XG4gKiBpbXBvcnQgeyBNeVN1cGVyQ2xhc3MgfSBmcm9tICcuL215LXN1cGVyLmpzJztcbiAqIGltcG9ydCB7IE1peGluIH0gZnJvbSAnLi9taXhpbi5qcyc7XG4gKlxuICogZXhwb3J0IGNsYXNzIE1peGVkQ2xhc3MgZXh0ZW5kcyBtaXgoTXlTdXBlckNsYXNzKS53aXRoKE1peGluKSB7XG4gKiAgICAgLi4uXG4gKiB9XG4gKiBgYGBcbiAqL1xuXG4vKipcbiAqIEEgTWl4aW4gaGVscGVyIGNsYXNzLlxuICogQGlnbm9yZVxuICovXG5jbGFzcyBNaXhpbiB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbWl4YWJsZSBjbGFzcy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdXBlckNsYXNzIFRoZSBjbGFzcyB0byBleHRlbmQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Ioc3VwZXJjbGFzcykge1xuICAgICAgICBzdXBlcmNsYXNzID0gc3VwZXJjbGFzcyB8fCBjbGFzcyB7fTtcbiAgICAgICAgdGhpcy5zdXBlcmNsYXNzID0gc3VwZXJjbGFzcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWl4IHRoZSBzdXBlciBjbGFzcyB3aXRoIGEgbGlzdCBvZiBtaXhpbnMuXG4gICAgICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gbWl4aW5zICpOKiBtaXhpbiBmdW5jdGlvbnMuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBleHRlbmRlZCBjbGFzcy5cbiAgICAgKi9cbiAgICB3aXRoKCkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgbGV0IGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgIHJldHVybiByZWR1Y2UuY2FsbChhcmdzLCAoYywgbWl4aW4pID0+IG1peGluKGMpLCB0aGlzLnN1cGVyY2xhc3MpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBNaXhpbiBpbnN0YW5jZS5cbiAqIEBpZ25vcmVcbiAqL1xuZXhwb3J0IGNvbnN0IG1peCA9IChzdXBlckNsYXNzKSA9PiBuZXcgTWl4aW4oc3VwZXJDbGFzcyk7XG4iLCJpbXBvcnQgeyByZWdpc3RyeSB9IGZyb20gJy4vcmVnaXN0cnkuanMnO1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuL3R5cGVvZi5qcyc7XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBub2RlIGlzIGFscmVhZHkgaW5zdGFudGlhdGVkIEhUTUxFbGVtZW50IGZvciBwcm9ncmFtbWF0aWNhbGx5IGBjb25zdHJ1Y3RvcmAgY2FsbHMuXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZSBUaGUgbm9kZSB0byBjaGVjay5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IFRoZSBub2RlIHNob3VsZCBiZSBpbnN0YW50aWF0ZWQuXG4gKi9cbmZ1bmN0aW9uIGlzTmV3KG5vZGUpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gIWlzU3RyaW5nKG5vZGUub3V0ZXJIVE1MKTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbi8qKlxuICogU2hpbSBvcmlnaW5hbCBFbGVtZW50IGNvbnN0cnVjdG9ycyBpbiBvcmRlciB0byBiZSB1c2VkIHdpdGggYG5ld2AuXG4gKiBAbWV0aG9kIHNoaW1cbiAqIEBtZW1iZXJvZiEgRE5BLlxuICogQHN0YXRpY1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IE9yaWdpbmFsIFRoZSBvcmlnaW5hbCBjb25zdHJ1Y3RvciB0byBzaGltLlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBzaGltbWVkIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogLy8gc2hpbSBhdWRpbyBlbGVtZW50XG4gKiBpbXBvcnQgeyBzaGltIH0gZnJvbSAnQGRuYWpzL2NvcmUnO1xuICpcbiAqIGNsYXNzIE15QXVkaW8gZXh0ZW5kcyBzaGltKEhUTUxBdWRpb0VsZW1lbnQpIHtcbiAqICAgICAuLi5cbiAqIH1cbiAqXG4gKiBsZXQgYXVkaW8gPSBuZXcgTXlBdWRpbygpO1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaGltKE9yaWdpbmFsKSB7XG4gICAgY2xhc3MgUG9seWZpbGxlZCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgaWYgKCFpc05ldyh0aGlzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGRlc2MgPSByZWdpc3RyeS5nZXREZXNjcmlwdG9yKHRoaXMuY29uc3RydWN0b3IpO1xuICAgICAgICAgICAgbGV0IGNvbmZpZyA9IGRlc2MuY29uZmlnO1xuICAgICAgICAgICAgLy8gRmluZCB0aGUgdGFnbmFtZSBvZiB0aGUgY29uc3RydWN0b3IgYW5kIGNyZWF0ZSBhIG5ldyBlbGVtZW50IHdpdGggaXRcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICBjb25maWcuZXh0ZW5kcyA/IGNvbmZpZy5leHRlbmRzIDogZGVzYy5pc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGVsZW1lbnQuX19wcm90b19fID0gZGVzYy5DdHIucHJvdG90eXBlO1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5leHRlbmRzKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lzJywgZGVzYy5pcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBDbG9uZSB0aGUgcHJvdG90eXBlIG92ZXJyaWRpbmcgdGhlIGNvbnN0cnVjdG9yLlxuICAgIFBvbHlmaWxsZWQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShPcmlnaW5hbC5wcm90b3R5cGUsIHtcbiAgICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgICAgIHZhbHVlOiBQb2x5ZmlsbGVkLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgfSk7XG4gICAgcmV0dXJuIFBvbHlmaWxsZWQ7XG59XG4iLCJpbXBvcnQgKiBhcyBET01fSEVMUEVSUyBmcm9tICcuL2xpYi9kb20uanMnO1xuaW1wb3J0IHsgQ29tcG9uZW50TWl4aW4gfSBmcm9tICcuL21peGlucy9jb21wb25lbnQuanMnO1xuaW1wb3J0IHsgUHJvcGVydGllc01peGluIH0gZnJvbSAnLi9taXhpbnMvcHJvcGVydGllcy1jb21wb25lbnQuanMnO1xuaW1wb3J0IHsgRXZlbnRzTWl4aW4gfSBmcm9tICcuL21peGlucy9ldmVudHMtY29tcG9uZW50LmpzJztcbmltcG9ydCB7IFN0eWxlTWl4aW4gfSBmcm9tICcuL21peGlucy9zdHlsZS1jb21wb25lbnQuanMnO1xuaW1wb3J0IHsgVGVtcGxhdGVNaXhpbiB9IGZyb20gJy4vbWl4aW5zL3RlbXBsYXRlLWNvbXBvbmVudC5qcyc7XG5cbi8qKlxuICogQSBzZXQgb2YgRE9NIGhlbHBlcnMgZm9yIGNhbGxiYWNrcyB0cmlnZ2VyIHdoZW4gQ3VzdG9tIEVsZW1lbnRzXG4gKiBhcmUgbm90IHN1cHBvcnRlZCBieSB0aGUgYnJvd3Nlci5cbiAqIEBuYW1lIERPTVxuICogQG5hbWVzcGFjZSBET01cbiAqIEBtZW1iZXJvZiEgRE5BLlxuICogQHN0YXRpY1xuICovXG5leHBvcnQgY29uc3QgRE9NID0gRE9NX0hFTFBFUlM7XG4vKipcbiAqIEEgc2V0IG9mIGNvcmUgbWl4aW5zLlxuICogQG5hbWUgTUlYSU5TXG4gKiBAbmFtZXNwYWNlIE1JWElOU1xuICogQG1lbWJlcm9mISBETkEuXG4gKiBAc3RhdGljXG4gKi9cbmV4cG9ydCBjb25zdCBNSVhJTlMgPSB7XG4gICAgQ29tcG9uZW50TWl4aW4sXG4gICAgUHJvcGVydGllc01peGluLFxuICAgIEV2ZW50c01peGluLFxuICAgIFN0eWxlTWl4aW4sXG4gICAgVGVtcGxhdGVNaXhpbixcbn07XG5leHBvcnQgeyBtaXggfSBmcm9tICcuL2xpYi9taXhpbnMuanMnO1xuZXhwb3J0IHsgcHJvcCB9IGZyb20gJy4vbGliL3Byb3BlcnR5LmpzJztcbmV4cG9ydCB7IHNoaW0gfSBmcm9tICcuL2xpYi9zaGltLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL3N5bWJvbHMuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9saWIvdHlwZW9mLmpzJztcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTUgVGhlIEluY3JlbWVudGFsIERPTSBBdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMtSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuXG4vKipcbiAqIEEgY2FjaGVkIHJlZmVyZW5jZSB0byB0aGUgaGFzT3duUHJvcGVydHkgZnVuY3Rpb24uXG4gKi9cbmNvbnN0IGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuXG4vKipcbiAqIEEgY29uc3RydWN0b3IgZnVuY3Rpb24gdGhhdCB3aWxsIGNyZWF0ZSBibGFuayBvYmplY3RzLlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIEJsYW5rKCkge31cblxuQmxhbmsucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuXG4vKipcbiAqIFVzZWQgdG8gcHJldmVudCBwcm9wZXJ0eSBjb2xsaXNpb25zIGJldHdlZW4gb3VyIFwibWFwXCIgYW5kIGl0cyBwcm90b3R5cGUuXG4gKiBAcGFyYW0geyFPYmplY3Q8c3RyaW5nLCAqPn0gbWFwIFRoZSBtYXAgdG8gY2hlY2suXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgVGhlIHByb3BlcnR5IHRvIGNoZWNrLlxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciBtYXAgaGFzIHByb3BlcnR5LlxuICovXG5jb25zdCBoYXMgPSBmdW5jdGlvbihtYXAsIHByb3BlcnR5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG1hcCwgcHJvcGVydHkpO1xufTtcblxuXG4vKipcbiAqIENyZWF0ZXMgYW4gbWFwIG9iamVjdCB3aXRob3V0IGEgcHJvdG90eXBlLlxuICogQHJldHVybiB7IU9iamVjdH1cbiAqL1xuY29uc3QgY3JlYXRlTWFwID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgQmxhbmsoKTtcbn07XG5cblxuLyoqICovXG5leHBvcnQge1xuICBjcmVhdGVNYXAsXG4gIGhhc1xufTtcblxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNSBUaGUgSW5jcmVtZW50YWwgRE9NIEF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUy1JU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVNYXAgfSBmcm9tICcuL3V0aWwnO1xuXG5cbi8qKlxuICogS2VlcHMgdHJhY2sgb2YgaW5mb3JtYXRpb24gbmVlZGVkIHRvIHBlcmZvcm0gZGlmZnMgZm9yIGEgZ2l2ZW4gRE9NIG5vZGUuXG4gKiBAcGFyYW0geyFzdHJpbmd9IG5vZGVOYW1lXG4gKiBAcGFyYW0gez9zdHJpbmc9fSBrZXlcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBOb2RlRGF0YShub2RlTmFtZSwga2V5KSB7XG4gIC8qKlxuICAgKiBUaGUgYXR0cmlidXRlcyBhbmQgdGhlaXIgdmFsdWVzLlxuICAgKiBAY29uc3QgeyFPYmplY3Q8c3RyaW5nLCAqPn1cbiAgICovXG4gIHRoaXMuYXR0cnMgPSBjcmVhdGVNYXAoKTtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgYXR0cmlidXRlIG5hbWUvdmFsdWUgcGFpcnMsIHVzZWQgZm9yIHF1aWNrbHkgZGlmZmluZyB0aGVcbiAgICogaW5jb21taW5nIGF0dHJpYnV0ZXMgdG8gc2VlIGlmIHRoZSBET00gbm9kZSdzIGF0dHJpYnV0ZXMgbmVlZCB0byBiZVxuICAgKiB1cGRhdGVkLlxuICAgKiBAY29uc3Qge0FycmF5PCo+fVxuICAgKi9cbiAgdGhpcy5hdHRyc0FyciA9IFtdO1xuXG4gIC8qKlxuICAgKiBUaGUgaW5jb21pbmcgYXR0cmlidXRlcyBmb3IgdGhpcyBOb2RlLCBiZWZvcmUgdGhleSBhcmUgdXBkYXRlZC5cbiAgICogQGNvbnN0IHshT2JqZWN0PHN0cmluZywgKj59XG4gICAqL1xuICB0aGlzLm5ld0F0dHJzID0gY3JlYXRlTWFwKCk7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IHRoZSBzdGF0aWNzIGhhdmUgYmVlbiBhcHBsaWVkIGZvciB0aGUgbm9kZSB5ZXQuXG4gICAqIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy5zdGF0aWNzQXBwbGllZCA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGUga2V5IHVzZWQgdG8gaWRlbnRpZnkgdGhpcyBub2RlLCB1c2VkIHRvIHByZXNlcnZlIERPTSBub2RlcyB3aGVuIHRoZXlcbiAgICogbW92ZSB3aXRoaW4gdGhlaXIgcGFyZW50LlxuICAgKiBAY29uc3RcbiAgICovXG4gIHRoaXMua2V5ID0ga2V5O1xuXG4gIC8qKlxuICAgKiBLZWVwcyB0cmFjayBvZiBjaGlsZHJlbiB3aXRoaW4gdGhpcyBub2RlIGJ5IHRoZWlyIGtleS5cbiAgICogeyFPYmplY3Q8c3RyaW5nLCAhRWxlbWVudD59XG4gICAqL1xuICB0aGlzLmtleU1hcCA9IGNyZWF0ZU1hcCgpO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUga2V5TWFwIGlzIGN1cnJlbnRseSB2YWxpZC5cbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB0aGlzLmtleU1hcFZhbGlkID0gdHJ1ZTtcblxuICAvKipcbiAgICogV2hldGhlciBvciB0aGUgYXNzb2NpYXRlZCBub2RlIGlzLCBvciBjb250YWlucywgYSBmb2N1c2VkIEVsZW1lbnQuXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBub2RlIG5hbWUgZm9yIHRoaXMgbm9kZS5cbiAgICogQGNvbnN0IHtzdHJpbmd9XG4gICAqL1xuICB0aGlzLm5vZGVOYW1lID0gbm9kZU5hbWU7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHs/c3RyaW5nfVxuICAgKi9cbiAgdGhpcy50ZXh0ID0gbnVsbDtcbn1cblxuXG4vKipcbiAqIEluaXRpYWxpemVzIGEgTm9kZURhdGEgb2JqZWN0IGZvciBhIE5vZGUuXG4gKlxuICogQHBhcmFtIHtOb2RlfSBub2RlIFRoZSBub2RlIHRvIGluaXRpYWxpemUgZGF0YSBmb3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gbm9kZU5hbWUgVGhlIG5vZGUgbmFtZSBvZiBub2RlLlxuICogQHBhcmFtIHs/c3RyaW5nPX0ga2V5IFRoZSBrZXkgdGhhdCBpZGVudGlmaWVzIHRoZSBub2RlLlxuICogQHJldHVybiB7IU5vZGVEYXRhfSBUaGUgbmV3bHkgaW5pdGlhbGl6ZWQgZGF0YSBvYmplY3RcbiAqL1xuY29uc3QgaW5pdERhdGEgPSBmdW5jdGlvbihub2RlLCBub2RlTmFtZSwga2V5KSB7XG4gIGNvbnN0IGRhdGEgPSBuZXcgTm9kZURhdGEobm9kZU5hbWUsIGtleSk7XG4gIG5vZGVbJ19faW5jcmVtZW50YWxET01EYXRhJ10gPSBkYXRhO1xuICByZXR1cm4gZGF0YTtcbn07XG5cblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIE5vZGVEYXRhIG9iamVjdCBmb3IgYSBOb2RlLCBjcmVhdGluZyBpdCBpZiBuZWNlc3NhcnkuXG4gKlxuICogQHBhcmFtIHs/Tm9kZX0gbm9kZSBUaGUgTm9kZSB0byByZXRyaWV2ZSB0aGUgZGF0YSBmb3IuXG4gKiBAcmV0dXJuIHshTm9kZURhdGF9IFRoZSBOb2RlRGF0YSBmb3IgdGhpcyBOb2RlLlxuICovXG5jb25zdCBnZXREYXRhID0gZnVuY3Rpb24obm9kZSkge1xuICBpbXBvcnROb2RlKG5vZGUpO1xuICByZXR1cm4gbm9kZVsnX19pbmNyZW1lbnRhbERPTURhdGEnXTtcbn07XG5cblxuLyoqXG4gKiBJbXBvcnRzIG5vZGUgYW5kIGl0cyBzdWJ0cmVlLCBpbml0aWFsaXppbmcgY2FjaGVzLlxuICpcbiAqIEBwYXJhbSB7P05vZGV9IG5vZGUgVGhlIE5vZGUgdG8gaW1wb3J0LlxuICovXG5jb25zdCBpbXBvcnROb2RlID0gZnVuY3Rpb24obm9kZSkge1xuICBpZiAobm9kZVsnX19pbmNyZW1lbnRhbERPTURhdGEnXSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGlzRWxlbWVudCA9IG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50O1xuICBjb25zdCBub2RlTmFtZSA9IGlzRWxlbWVudCA/IG5vZGUubG9jYWxOYW1lIDogbm9kZS5ub2RlTmFtZTtcbiAgY29uc3Qga2V5ID0gaXNFbGVtZW50ID8gbm9kZS5nZXRBdHRyaWJ1dGUoJ2tleScpIDogbnVsbDtcbiAgY29uc3QgZGF0YSA9IGluaXREYXRhKG5vZGUsIG5vZGVOYW1lLCBrZXkpO1xuXG4gIGlmIChrZXkpIHtcbiAgICBnZXREYXRhKG5vZGUucGFyZW50Tm9kZSkua2V5TWFwW2tleV0gPSBub2RlO1xuICB9XG5cbiAgaWYgKGlzRWxlbWVudCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBub2RlLmF0dHJpYnV0ZXM7XG4gICAgY29uc3QgYXR0cnMgPSBkYXRhLmF0dHJzO1xuICAgIGNvbnN0IG5ld0F0dHJzID0gZGF0YS5uZXdBdHRycztcbiAgICBjb25zdCBhdHRyc0FyciA9IGRhdGEuYXR0cnNBcnI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJpYnV0ZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGF0dHIgPSBhdHRyaWJ1dGVzW2ldO1xuICAgICAgY29uc3QgbmFtZSA9IGF0dHIubmFtZTtcbiAgICAgIGNvbnN0IHZhbHVlID0gYXR0ci52YWx1ZTtcblxuICAgICAgYXR0cnNbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIG5ld0F0dHJzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgYXR0cnNBcnIucHVzaChuYW1lKTtcbiAgICAgIGF0dHJzQXJyLnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IGNoaWxkID0gbm9kZS5maXJzdENoaWxkOyBjaGlsZDsgY2hpbGQgPSBjaGlsZC5uZXh0U2libGluZykge1xuICAgIGltcG9ydE5vZGUoY2hpbGQpO1xuICB9XG59O1xuXG5cbi8qKiAqL1xuZXhwb3J0IHtcbiAgZ2V0RGF0YSxcbiAgaW5pdERhdGEsXG4gIGltcG9ydE5vZGVcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE1IFRoZSBJbmNyZW1lbnRhbCBET00gQXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTLUlTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7XG4gICAgZ2V0RGF0YSxcbiAgICBpbml0RGF0YVxufSBmcm9tICcuL25vZGVfZGF0YSc7XG5cblxuLyoqXG4gKiBHZXRzIHRoZSBuYW1lc3BhY2UgdG8gY3JlYXRlIGFuIGVsZW1lbnQgKG9mIGEgZ2l2ZW4gdGFnKSBpbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIHRhZyB0byBnZXQgdGhlIG5hbWVzcGFjZSBmb3IuXG4gKiBAcGFyYW0gez9Ob2RlfSBwYXJlbnRcbiAqIEByZXR1cm4gez9zdHJpbmd9IFRoZSBuYW1lc3BhY2UgdG8gY3JlYXRlIHRoZSB0YWcgaW4uXG4gKi9cbmNvbnN0IGdldE5hbWVzcGFjZUZvclRhZyA9IGZ1bmN0aW9uKHRhZywgcGFyZW50KSB7XG4gIGlmICh0YWcgPT09ICdzdmcnKSB7XG4gICAgcmV0dXJuICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG4gIH1cblxuICBpZiAoZ2V0RGF0YShwYXJlbnQpLm5vZGVOYW1lID09PSAnZm9yZWlnbk9iamVjdCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBwYXJlbnQubmFtZXNwYWNlVVJJO1xufTtcblxuXG4vKipcbiAqIENyZWF0ZXMgYW4gRWxlbWVudC5cbiAqIEBwYXJhbSB7RG9jdW1lbnR9IGRvYyBUaGUgZG9jdW1lbnQgd2l0aCB3aGljaCB0byBjcmVhdGUgdGhlIEVsZW1lbnQuXG4gKiBAcGFyYW0gez9Ob2RlfSBwYXJlbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIHRhZyBmb3IgdGhlIEVsZW1lbnQuXG4gKiBAcGFyYW0gez9zdHJpbmc9fSBrZXkgQSBrZXkgdG8gaWRlbnRpZnkgdGhlIEVsZW1lbnQuXG4gKiBAcmV0dXJuIHshRWxlbWVudH1cbiAqL1xuY29uc3QgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uKGRvYywgcGFyZW50LCB0YWcsIGtleSkge1xuICBjb25zdCBuYW1lc3BhY2UgPSBnZXROYW1lc3BhY2VGb3JUYWcodGFnLCBwYXJlbnQpO1xuICBsZXQgZWw7XG5cbiAgaWYgKG5hbWVzcGFjZSkge1xuICAgIGVsID0gZG9jLmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2UsIHRhZyk7XG4gIH0gZWxzZSB7XG4gICAgZWwgPSBkb2MuY3JlYXRlRWxlbWVudCh0YWcpO1xuICB9XG5cbiAgaW5pdERhdGEoZWwsIHRhZywga2V5KTtcblxuICByZXR1cm4gZWw7XG59O1xuXG5cbi8qKlxuICogQ3JlYXRlcyBhIFRleHQgTm9kZS5cbiAqIEBwYXJhbSB7RG9jdW1lbnR9IGRvYyBUaGUgZG9jdW1lbnQgd2l0aCB3aGljaCB0byBjcmVhdGUgdGhlIEVsZW1lbnQuXG4gKiBAcmV0dXJuIHshVGV4dH1cbiAqL1xuY29uc3QgY3JlYXRlVGV4dCA9IGZ1bmN0aW9uKGRvYykge1xuICBjb25zdCBub2RlID0gZG9jLmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgaW5pdERhdGEobm9kZSwgJyN0ZXh0JywgbnVsbCk7XG4gIHJldHVybiBub2RlO1xufTtcblxuXG4vKiogKi9cbmV4cG9ydCB7XG4gIGNyZWF0ZUVsZW1lbnQsXG4gIGNyZWF0ZVRleHRcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE1IFRoZSBJbmNyZW1lbnRhbCBET00gQXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTLUlTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKiBAY29uc3QgKi9cbmNvbnN0IG5vdGlmaWNhdGlvbnMgPSB7XG4gIC8qKlxuICAgKiBDYWxsZWQgYWZ0ZXIgcGF0Y2ggaGFzIGNvbXBsZWF0ZWQgd2l0aCBhbnkgTm9kZXMgdGhhdCBoYXZlIGJlZW4gY3JlYXRlZFxuICAgKiBhbmQgYWRkZWQgdG8gdGhlIERPTS5cbiAgICogQHR5cGUgez9mdW5jdGlvbihBcnJheTwhTm9kZT4pfVxuICAgKi9cbiAgbm9kZXNDcmVhdGVkOiBudWxsLFxuXG4gIC8qKlxuICAgKiBDYWxsZWQgYWZ0ZXIgcGF0Y2ggaGFzIGNvbXBsZWF0ZWQgd2l0aCBhbnkgTm9kZXMgdGhhdCBoYXZlIGJlZW4gcmVtb3ZlZFxuICAgKiBmcm9tIHRoZSBET00uXG4gICAqIE5vdGUgaXQncyBhbiBhcHBsaWNhdGlvbnMgcmVzcG9uc2liaWxpdHkgdG8gaGFuZGxlIGFueSBjaGlsZE5vZGVzLlxuICAgKiBAdHlwZSB7P2Z1bmN0aW9uKEFycmF5PCFOb2RlPil9XG4gICAqL1xuICBub2Rlc0RlbGV0ZWQ6IG51bGxcbn07XG5cbmV4cG9ydCB7XG4gIG5vdGlmaWNhdGlvbnNcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE1IFRoZSBJbmNyZW1lbnRhbCBET00gQXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTLUlTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IG5vdGlmaWNhdGlvbnMgfSBmcm9tICcuL25vdGlmaWNhdGlvbnMnO1xuXG5cbi8qKlxuICogS2VlcHMgdHJhY2sgb2YgdGhlIHN0YXRlIG9mIGEgcGF0Y2guXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ29udGV4dCgpIHtcbiAgLyoqXG4gICAqIEB0eXBlIHsoQXJyYXk8IU5vZGU+fHVuZGVmaW5lZCl9XG4gICAqL1xuICB0aGlzLmNyZWF0ZWQgPSBub3RpZmljYXRpb25zLm5vZGVzQ3JlYXRlZCAmJiBbXTtcblxuICAvKipcbiAgICogQHR5cGUgeyhBcnJheTwhTm9kZT58dW5kZWZpbmVkKX1cbiAgICovXG4gIHRoaXMuZGVsZXRlZCA9IG5vdGlmaWNhdGlvbnMubm9kZXNEZWxldGVkICYmIFtdO1xufVxuXG5cbi8qKlxuICogQHBhcmFtIHshTm9kZX0gbm9kZVxuICovXG5Db250ZXh0LnByb3RvdHlwZS5tYXJrQ3JlYXRlZCA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgaWYgKHRoaXMuY3JlYXRlZCkge1xuICAgIHRoaXMuY3JlYXRlZC5wdXNoKG5vZGUpO1xuICB9XG59O1xuXG5cbi8qKlxuICogQHBhcmFtIHshTm9kZX0gbm9kZVxuICovXG5Db250ZXh0LnByb3RvdHlwZS5tYXJrRGVsZXRlZCA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgaWYgKHRoaXMuZGVsZXRlZCkge1xuICAgIHRoaXMuZGVsZXRlZC5wdXNoKG5vZGUpO1xuICB9XG59O1xuXG5cbi8qKlxuICogTm90aWZpZXMgYWJvdXQgbm9kZXMgdGhhdCB3ZXJlIGNyZWF0ZWQgZHVyaW5nIHRoZSBwYXRjaCBvcGVhcmF0aW9uLlxuICovXG5Db250ZXh0LnByb3RvdHlwZS5ub3RpZnlDaGFuZ2VzID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmNyZWF0ZWQgJiYgdGhpcy5jcmVhdGVkLmxlbmd0aCA+IDApIHtcbiAgICBub3RpZmljYXRpb25zLm5vZGVzQ3JlYXRlZCh0aGlzLmNyZWF0ZWQpO1xuICB9XG5cbiAgaWYgKHRoaXMuZGVsZXRlZCAmJiB0aGlzLmRlbGV0ZWQubGVuZ3RoID4gMCkge1xuICAgIG5vdGlmaWNhdGlvbnMubm9kZXNEZWxldGVkKHRoaXMuZGVsZXRlZCk7XG4gIH1cbn07XG5cblxuLyoqICovXG5leHBvcnQge1xuICBDb250ZXh0XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNSBUaGUgSW5jcmVtZW50YWwgRE9NIEF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUy1JU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5cbi8qKlxuICAqIEtlZXBzIHRyYWNrIHdoZXRoZXIgb3Igbm90IHdlIGFyZSBpbiBhbiBhdHRyaWJ1dGVzIGRlY2xhcmF0aW9uIChhZnRlclxuICAqIGVsZW1lbnRPcGVuU3RhcnQsIGJ1dCBiZWZvcmUgZWxlbWVudE9wZW5FbmQpLlxuICAqIEB0eXBlIHtib29sZWFufVxuICAqL1xubGV0IGluQXR0cmlidXRlcyA9IGZhbHNlO1xuXG5cbi8qKlxuICAqIEtlZXBzIHRyYWNrIHdoZXRoZXIgb3Igbm90IHdlIGFyZSBpbiBhbiBlbGVtZW50IHRoYXQgc2hvdWxkIG5vdCBoYXZlIGl0c1xuICAqIGNoaWxkcmVuIGNsZWFyZWQuXG4gICogQHR5cGUge2Jvb2xlYW59XG4gICovXG5sZXQgaW5Ta2lwID0gZmFsc2U7XG5cblxuLyoqXG4gKiBNYWtlcyBzdXJlIHRoYXQgdGhlcmUgaXMgYSBjdXJyZW50IHBhdGNoIGNvbnRleHQuXG4gKiBAcGFyYW0ge3N0cmluZ30gZnVuY3Rpb25OYW1lXG4gKiBAcGFyYW0geyp9IGNvbnRleHRcbiAqL1xuY29uc3QgYXNzZXJ0SW5QYXRjaCA9IGZ1bmN0aW9uKGZ1bmN0aW9uTmFtZSwgY29udGV4dCkge1xuICBpZiAoIWNvbnRleHQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjYWxsICcgKyBmdW5jdGlvbk5hbWUgKyAnKCkgdW5sZXNzIGluIHBhdGNoLicpO1xuICB9XG59O1xuXG5cbi8qKlxuICogTWFrZXMgc3VyZSB0aGF0IGEgcGF0Y2ggY2xvc2VzIGV2ZXJ5IG5vZGUgdGhhdCBpdCBvcGVuZWQuXG4gKiBAcGFyYW0gez9Ob2RlfSBvcGVuRWxlbWVudFxuICogQHBhcmFtIHshTm9kZXwhRG9jdW1lbnRGcmFnbWVudH0gcm9vdFxuICovXG5jb25zdCBhc3NlcnROb1VuY2xvc2VkVGFncyA9IGZ1bmN0aW9uKG9wZW5FbGVtZW50LCByb290KSB7XG4gIGlmIChvcGVuRWxlbWVudCA9PT0gcm9vdCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBjdXJyZW50RWxlbWVudCA9IG9wZW5FbGVtZW50O1xuICBjb25zdCBvcGVuVGFncyA9IFtdO1xuICB3aGlsZSAoY3VycmVudEVsZW1lbnQgJiYgY3VycmVudEVsZW1lbnQgIT09IHJvb3QpIHtcbiAgICBvcGVuVGFncy5wdXNoKGN1cnJlbnRFbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgIGN1cnJlbnRFbGVtZW50ID0gY3VycmVudEVsZW1lbnQucGFyZW50Tm9kZTtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcignT25lIG9yIG1vcmUgdGFncyB3ZXJlIG5vdCBjbG9zZWQ6XFxuJyArXG4gICAgICBvcGVuVGFncy5qb2luKCdcXG4nKSk7XG59O1xuXG5cbi8qKlxuICogTWFrZXMgc3VyZSB0aGF0IHRoZSBjYWxsZXIgaXMgbm90IHdoZXJlIGF0dHJpYnV0ZXMgYXJlIGV4cGVjdGVkLlxuICogQHBhcmFtIHtzdHJpbmd9IGZ1bmN0aW9uTmFtZVxuICovXG5jb25zdCBhc3NlcnROb3RJbkF0dHJpYnV0ZXMgPSBmdW5jdGlvbihmdW5jdGlvbk5hbWUpIHtcbiAgaWYgKGluQXR0cmlidXRlcykge1xuICAgIHRocm93IG5ldyBFcnJvcihmdW5jdGlvbk5hbWUgKyAnKCkgY2FuIG5vdCBiZSBjYWxsZWQgYmV0d2VlbiAnICtcbiAgICAgICAgJ2VsZW1lbnRPcGVuU3RhcnQoKSBhbmQgZWxlbWVudE9wZW5FbmQoKS4nKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIE1ha2VzIHN1cmUgdGhhdCB0aGUgY2FsbGVyIGlzIG5vdCBpbnNpZGUgYW4gZWxlbWVudCB0aGF0IGhhcyBkZWNsYXJlZCBza2lwLlxuICogQHBhcmFtIHtzdHJpbmd9IGZ1bmN0aW9uTmFtZVxuICovXG5jb25zdCBhc3NlcnROb3RJblNraXAgPSBmdW5jdGlvbihmdW5jdGlvbk5hbWUpIHtcbiAgaWYgKGluU2tpcCkge1xuICAgIHRocm93IG5ldyBFcnJvcihmdW5jdGlvbk5hbWUgKyAnKCkgbWF5IG5vdCBiZSBjYWxsZWQgaW5zaWRlIGFuIGVsZW1lbnQgJyArXG4gICAgICAgICd0aGF0IGhhcyBjYWxsZWQgc2tpcCgpLicpO1xuICB9XG59O1xuXG5cbi8qKlxuICogTWFrZXMgc3VyZSB0aGF0IHRoZSBjYWxsZXIgaXMgd2hlcmUgYXR0cmlidXRlcyBhcmUgZXhwZWN0ZWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gZnVuY3Rpb25OYW1lXG4gKi9cbmNvbnN0IGFzc2VydEluQXR0cmlidXRlcyA9IGZ1bmN0aW9uKGZ1bmN0aW9uTmFtZSkge1xuICBpZiAoIWluQXR0cmlidXRlcykge1xuICAgIHRocm93IG5ldyBFcnJvcihmdW5jdGlvbk5hbWUgKyAnKCkgY2FuIG9ubHkgYmUgY2FsbGVkIGFmdGVyIGNhbGxpbmcgJyArXG4gICAgICAgICdlbGVtZW50T3BlblN0YXJ0KCkuJyk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBNYWtlcyBzdXJlIHRoZSBwYXRjaCBjbG9zZXMgdmlydHVhbCBhdHRyaWJ1dGVzIGNhbGxcbiAqL1xuY29uc3QgYXNzZXJ0VmlydHVhbEF0dHJpYnV0ZXNDbG9zZWQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKGluQXR0cmlidXRlcykge1xuICAgIHRocm93IG5ldyBFcnJvcignZWxlbWVudE9wZW5FbmQoKSBtdXN0IGJlIGNhbGxlZCBhZnRlciBjYWxsaW5nICcgK1xuICAgICAgICAnZWxlbWVudE9wZW5TdGFydCgpLicpO1xuICB9XG59O1xuXG5cbi8qKlxuICAqIE1ha2VzIHN1cmUgdGhhdCB0YWdzIGFyZSBjb3JyZWN0bHkgbmVzdGVkLlxuICAqIEBwYXJhbSB7c3RyaW5nfSBub2RlTmFtZVxuICAqIEBwYXJhbSB7c3RyaW5nfSB0YWdcbiAgKi9cbmNvbnN0IGFzc2VydENsb3NlTWF0Y2hlc09wZW5UYWcgPSBmdW5jdGlvbihub2RlTmFtZSwgdGFnKSB7XG4gIGlmIChub2RlTmFtZSAhPT0gdGFnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdSZWNlaXZlZCBhIGNhbGwgdG8gY2xvc2UgXCInICsgdGFnICsgJ1wiIGJ1dCBcIicgK1xuICAgICAgICBub2RlTmFtZSArICdcIiB3YXMgb3Blbi4nKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIE1ha2VzIHN1cmUgdGhhdCBubyBjaGlsZHJlbiBlbGVtZW50cyBoYXZlIGJlZW4gZGVjbGFyZWQgeWV0IGluIHRoZSBjdXJyZW50XG4gKiBlbGVtZW50LlxuICogQHBhcmFtIHtzdHJpbmd9IGZ1bmN0aW9uTmFtZVxuICogQHBhcmFtIHs/Tm9kZX0gcHJldmlvdXNOb2RlXG4gKi9cbmNvbnN0IGFzc2VydE5vQ2hpbGRyZW5EZWNsYXJlZFlldCA9IGZ1bmN0aW9uKGZ1bmN0aW9uTmFtZSwgcHJldmlvdXNOb2RlKSB7XG4gIGlmIChwcmV2aW91c05vZGUgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZnVuY3Rpb25OYW1lICsgJygpIG11c3QgY29tZSBiZWZvcmUgYW55IGNoaWxkICcgK1xuICAgICAgICAnZGVjbGFyYXRpb25zIGluc2lkZSB0aGUgY3VycmVudCBlbGVtZW50LicpO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ2hlY2tzIHRoYXQgYSBjYWxsIHRvIHBhdGNoT3V0ZXIgYWN0dWFsbHkgcGF0Y2hlZCB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7P05vZGV9IHN0YXJ0Tm9kZSBUaGUgdmFsdWUgZm9yIHRoZSBjdXJyZW50Tm9kZSB3aGVuIHRoZSBwYXRjaFxuICogICAgIHN0YXJ0ZWQuXG4gKiBAcGFyYW0gez9Ob2RlfSBjdXJyZW50Tm9kZSBUaGUgY3VycmVudE5vZGUgd2hlbiB0aGUgcGF0Y2ggZmluaXNoZWQuXG4gKiBAcGFyYW0gez9Ob2RlfSBleHBlY3RlZE5leHROb2RlIFRoZSBOb2RlIHRoYXQgaXMgZXhwZWN0ZWQgdG8gZm9sbG93IHRoZVxuICogICAgY3VycmVudE5vZGUgYWZ0ZXIgdGhlIHBhdGNoO1xuICogQHBhcmFtIHs/Tm9kZX0gZXhwZWN0ZWRQcmV2Tm9kZSBUaGUgTm9kZSB0aGF0IGlzIGV4cGVjdGVkIHRvIHByZWNlZWQgdGhlXG4gKiAgICBjdXJyZW50Tm9kZSBhZnRlciB0aGUgcGF0Y2guXG4gKi9cbmNvbnN0IGFzc2VydFBhdGNoRWxlbWVudE5vRXh0cmFzID0gZnVuY3Rpb24oXG4gICAgc3RhcnROb2RlLFxuICAgIGN1cnJlbnROb2RlLFxuICAgIGV4cGVjdGVkTmV4dE5vZGUsXG4gICAgZXhwZWN0ZWRQcmV2Tm9kZSkge1xuICBjb25zdCB3YXNVcGRhdGVkID0gY3VycmVudE5vZGUubmV4dFNpYmxpbmcgPT09IGV4cGVjdGVkTmV4dE5vZGUgJiZcbiAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLnByZXZpb3VzU2libGluZyA9PT0gZXhwZWN0ZWRQcmV2Tm9kZTtcbiAgY29uc3Qgd2FzQ2hhbmdlZCA9IGN1cnJlbnROb2RlLm5leHRTaWJsaW5nID09PSBzdGFydE5vZGUubmV4dFNpYmxpbmcgJiZcbiAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLnByZXZpb3VzU2libGluZyA9PT0gZXhwZWN0ZWRQcmV2Tm9kZTtcbiAgY29uc3Qgd2FzUmVtb3ZlZCA9IGN1cnJlbnROb2RlID09PSBzdGFydE5vZGU7XG5cbiAgaWYgKCF3YXNVcGRhdGVkICYmICF3YXNDaGFuZ2VkICYmICF3YXNSZW1vdmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBtdXN0IGJlIGV4YWN0bHkgb25lIHRvcCBsZXZlbCBjYWxsIGNvcnJlc3BvbmRpbmcgJyArXG4gICAgICAgICd0byB0aGUgcGF0Y2hlZCBlbGVtZW50LicpO1xuICB9XG59O1xuXG5cbi8qKlxuICogVXBkYXRlcyB0aGUgc3RhdGUgb2YgYmVpbmcgaW4gYW4gYXR0cmlidXRlIGRlY2xhcmF0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gdGhlIHByZXZpb3VzIHZhbHVlLlxuICovXG5jb25zdCBzZXRJbkF0dHJpYnV0ZXMgPSBmdW5jdGlvbih2YWx1ZSkge1xuICBjb25zdCBwcmV2aW91cyA9IGluQXR0cmlidXRlcztcbiAgaW5BdHRyaWJ1dGVzID0gdmFsdWU7XG4gIHJldHVybiBwcmV2aW91cztcbn07XG5cblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBzdGF0ZSBvZiBiZWluZyBpbiBhIHNraXAgZWxlbWVudC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRoZSBwcmV2aW91cyB2YWx1ZS5cbiAqL1xuY29uc3Qgc2V0SW5Ta2lwID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgY29uc3QgcHJldmlvdXMgPSBpblNraXA7XG4gIGluU2tpcCA9IHZhbHVlO1xuICByZXR1cm4gcHJldmlvdXM7XG59O1xuXG5cbi8qKiAqL1xuZXhwb3J0IHtcbiAgYXNzZXJ0SW5QYXRjaCxcbiAgYXNzZXJ0Tm9VbmNsb3NlZFRhZ3MsXG4gIGFzc2VydE5vdEluQXR0cmlidXRlcyxcbiAgYXNzZXJ0SW5BdHRyaWJ1dGVzLFxuICBhc3NlcnRDbG9zZU1hdGNoZXNPcGVuVGFnLFxuICBhc3NlcnRWaXJ0dWFsQXR0cmlidXRlc0Nsb3NlZCxcbiAgYXNzZXJ0Tm9DaGlsZHJlbkRlY2xhcmVkWWV0LFxuICBhc3NlcnROb3RJblNraXAsXG4gIGFzc2VydFBhdGNoRWxlbWVudE5vRXh0cmFzLFxuICBzZXRJbkF0dHJpYnV0ZXMsXG4gIHNldEluU2tpcFxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYgVGhlIEluY3JlbWVudGFsIERPTSBBdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMtSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuXG4vKipcbiAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdGhlIG5vZGUgdGhlIHJvb3Qgb2YgYSBkb2N1bWVudCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5jb25zdCBpc0RvY3VtZW50Um9vdCA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgLy8gRm9yIFNoYWRvd1Jvb3RzLCBjaGVjayBpZiB0aGV5IGFyZSBhIERvY3VtZW50RnJhZ21lbnQgaW5zdGVhZCBvZiBpZiB0aGV5XG4gIC8vIGFyZSBhIFNoYWRvd1Jvb3Qgc28gdGhhdCB0aGlzIGNhbiB3b3JrIGluICd1c2Ugc3RyaWN0JyBpZiBTaGFkb3dSb290cyBhcmVcbiAgLy8gbm90IHN1cHBvcnRlZC5cbiAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBEb2N1bWVudCB8fCBub2RlIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudDtcbn07XG5cblxuLyoqXG4gKiBAcGFyYW0geyFOb2RlfSBub2RlIFRoZSBub2RlIHRvIHN0YXJ0IGF0LCBpbmNsdXNpdmUuXG4gKiBAcGFyYW0gez9Ob2RlfSByb290IFRoZSByb290IGFuY2VzdG9yIHRvIGdldCB1bnRpbCwgZXhjbHVzaXZlLlxuICogQHJldHVybiB7IUFycmF5PCFOb2RlPn0gVGhlIGFuY2VzdHJ5IG9mIERPTSBub2Rlcy5cbiAqL1xuY29uc3QgZ2V0QW5jZXN0cnkgPSBmdW5jdGlvbihub2RlLCByb290KSB7XG4gIGNvbnN0IGFuY2VzdHJ5ID0gW107XG4gIGxldCBjdXIgPSBub2RlO1xuXG4gIHdoaWxlIChjdXIgIT09IHJvb3QpIHtcbiAgICBhbmNlc3RyeS5wdXNoKGN1cik7XG4gICAgY3VyID0gY3VyLnBhcmVudE5vZGU7XG4gIH1cblxuICByZXR1cm4gYW5jZXN0cnk7XG59O1xuXG5cbi8qKlxuICogQHBhcmFtIHshTm9kZX0gbm9kZVxuICogQHJldHVybiB7IU5vZGV9IFRoZSByb290IG5vZGUgb2YgdGhlIERPTSB0cmVlIHRoYXQgY29udGFpbnMgbm9kZS5cbiAqL1xuY29uc3QgZ2V0Um9vdCA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgbGV0IGN1ciA9IG5vZGU7XG4gIGxldCBwcmV2ID0gY3VyO1xuXG4gIHdoaWxlIChjdXIpIHtcbiAgICBwcmV2ID0gY3VyO1xuICAgIGN1ciA9IGN1ci5wYXJlbnROb2RlO1xuICB9XG5cbiAgcmV0dXJuIHByZXY7XG59O1xuXG5cbi8qKlxuICogQHBhcmFtIHshTm9kZX0gbm9kZSBUaGUgbm9kZSB0byBnZXQgdGhlIGFjdGl2ZUVsZW1lbnQgZm9yLlxuICogQHJldHVybiB7P0VsZW1lbnR9IFRoZSBhY3RpdmVFbGVtZW50IGluIHRoZSBEb2N1bWVudCBvciBTaGFkb3dSb290XG4gKiAgICAgY29ycmVzcG9uZGluZyB0byBub2RlLCBpZiBwcmVzZW50LlxuICovXG5jb25zdCBnZXRBY3RpdmVFbGVtZW50ID0gZnVuY3Rpb24obm9kZSkge1xuICBjb25zdCByb290ID0gZ2V0Um9vdChub2RlKTtcbiAgcmV0dXJuIGlzRG9jdW1lbnRSb290KHJvb3QpID8gcm9vdC5hY3RpdmVFbGVtZW50IDogbnVsbDtcbn07XG5cblxuLyoqXG4gKiBHZXRzIHRoZSBwYXRoIG9mIG5vZGVzIHRoYXQgY29udGFpbiB0aGUgZm9jdXNlZCBub2RlIGluIHRoZSBzYW1lIGRvY3VtZW50IGFzXG4gKiBhIHJlZmVyZW5jZSBub2RlLCB1cCB1bnRpbCB0aGUgcm9vdC5cbiAqIEBwYXJhbSB7IU5vZGV9IG5vZGUgVGhlIHJlZmVyZW5jZSBub2RlIHRvIGdldCB0aGUgYWN0aXZlRWxlbWVudCBmb3IuXG4gKiBAcGFyYW0gez9Ob2RlfSByb290IFRoZSByb290IHRvIGdldCB0aGUgZm9jdXNlZCBwYXRoIHVudGlsLlxuICogQHJldHVybiB7IUFycmF5PE5vZGU+fVxuICovXG5jb25zdCBnZXRGb2N1c2VkUGF0aCA9IGZ1bmN0aW9uKG5vZGUsIHJvb3QpIHtcbiAgY29uc3QgYWN0aXZlRWxlbWVudCA9IGdldEFjdGl2ZUVsZW1lbnQobm9kZSk7XG5cbiAgaWYgKCFhY3RpdmVFbGVtZW50IHx8ICFub2RlLmNvbnRhaW5zKGFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcmV0dXJuIGdldEFuY2VzdHJ5KGFjdGl2ZUVsZW1lbnQsIHJvb3QpO1xufTtcblxuXG4vKipcbiAqIExpa2UgaW5zZXJ0QmVmb3JlLCBidXQgaW5zdGVhZCBpbnN0ZWFkIG9mIG1vdmluZyB0aGUgZGVzaXJlZCBub2RlLCBpbnN0ZWFkXG4gKiBtb3ZlcyBhbGwgdGhlIG90aGVyIG5vZGVzIGFmdGVyLlxuICogQHBhcmFtIHs/Tm9kZX0gcGFyZW50Tm9kZVxuICogQHBhcmFtIHshTm9kZX0gbm9kZVxuICogQHBhcmFtIHs/Tm9kZX0gcmVmZXJlbmNlTm9kZVxuICovXG5jb25zdCBtb3ZlQmVmb3JlID0gZnVuY3Rpb24ocGFyZW50Tm9kZSwgbm9kZSwgcmVmZXJlbmNlTm9kZSkge1xuICBjb25zdCBpbnNlcnRSZWZlcmVuY2VOb2RlID0gbm9kZS5uZXh0U2libGluZztcbiAgbGV0IGN1ciA9IHJlZmVyZW5jZU5vZGU7XG5cbiAgd2hpbGUgKGN1ciAhPT0gbm9kZSkge1xuICAgIGNvbnN0IG5leHQgPSBjdXIubmV4dFNpYmxpbmc7XG4gICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY3VyLCBpbnNlcnRSZWZlcmVuY2VOb2RlKTtcbiAgICBjdXIgPSBuZXh0O1xuICB9XG59O1xuXG5cbi8qKiAqL1xuZXhwb3J0IHtcbiAgZ2V0Rm9jdXNlZFBhdGgsXG4gIG1vdmVCZWZvcmVcbn07XG5cbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTUgVGhlIEluY3JlbWVudGFsIERPTSBBdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMtSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtcbiAgY3JlYXRlRWxlbWVudCxcbiAgY3JlYXRlVGV4dFxufSBmcm9tICcuL25vZGVzJztcbmltcG9ydCB7IGdldERhdGEgfSBmcm9tICcuL25vZGVfZGF0YSc7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSAnLi9jb250ZXh0JztcbmltcG9ydCB7XG4gIGFzc2VydEluUGF0Y2gsXG4gIGFzc2VydE5vVW5jbG9zZWRUYWdzLFxuICBhc3NlcnROb3RJbkF0dHJpYnV0ZXMsXG4gIGFzc2VydFZpcnR1YWxBdHRyaWJ1dGVzQ2xvc2VkLFxuICBhc3NlcnROb0NoaWxkcmVuRGVjbGFyZWRZZXQsXG4gIGFzc2VydFBhdGNoRWxlbWVudE5vRXh0cmFzLFxuICBzZXRJbkF0dHJpYnV0ZXMsXG4gIHNldEluU2tpcFxufSBmcm9tICcuL2Fzc2VydGlvbnMnO1xuaW1wb3J0IHtcbiAgZ2V0Rm9jdXNlZFBhdGgsXG4gIG1vdmVCZWZvcmVcbn0gZnJvbSAnLi9kb21fdXRpbCc7XG5cblxuLyoqIEB0eXBlIHs/Q29udGV4dH0gKi9cbmxldCBjb250ZXh0ID0gbnVsbDtcblxuLyoqIEB0eXBlIHs/Tm9kZX0gKi9cbmxldCBjdXJyZW50Tm9kZSA9IG51bGw7XG5cbi8qKiBAdHlwZSB7P05vZGV9ICovXG5sZXQgY3VycmVudFBhcmVudCA9IG51bGw7XG5cbi8qKiBAdHlwZSB7P0RvY3VtZW50fSAqL1xubGV0IGRvYyA9IG51bGw7XG5cblxuLyoqXG4gKiBAcGFyYW0geyFBcnJheTxOb2RlPn0gZm9jdXNQYXRoIFRoZSBub2RlcyB0byBtYXJrLlxuICogQHBhcmFtIHtib29sZWFufSBmb2N1c2VkIFdoZXRoZXIgb3Igbm90IHRoZXkgYXJlIGZvY3VzZWQuXG4gKi9cbmNvbnN0IG1hcmtGb2N1c2VkID0gZnVuY3Rpb24oZm9jdXNQYXRoLCBmb2N1c2VkKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZm9jdXNQYXRoLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgZ2V0RGF0YShmb2N1c1BhdGhbaV0pLmZvY3VzZWQgPSBmb2N1c2VkO1xuICB9XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyBhIHBhdGNoZXIgZnVuY3Rpb24gdGhhdCBzZXRzIHVwIGFuZCByZXN0b3JlcyBhIHBhdGNoIGNvbnRleHQsXG4gKiBydW5uaW5nIHRoZSBydW4gZnVuY3Rpb24gd2l0aCB0aGUgcHJvdmlkZWQgZGF0YS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKCFFbGVtZW50fCFEb2N1bWVudEZyYWdtZW50KSwhZnVuY3Rpb24oVCksVD0pOiA/Tm9kZX0gcnVuXG4gKiBAcmV0dXJuIHtmdW5jdGlvbigoIUVsZW1lbnR8IURvY3VtZW50RnJhZ21lbnQpLCFmdW5jdGlvbihUKSxUPSk6ID9Ob2RlfVxuICogQHRlbXBsYXRlIFRcbiAqL1xuY29uc3QgcGF0Y2hGYWN0b3J5ID0gZnVuY3Rpb24ocnVuKSB7XG4gIC8qKlxuICAgKiBUT0RPKG1veik6IFRoZXNlIGFubm90YXRpb25zIHdvbid0IGJlIG5lY2Vzc2FyeSBvbmNlIHdlIHN3aXRjaCB0byBDbG9zdXJlXG4gICAqIENvbXBpbGVyJ3MgbmV3IHR5cGUgaW5mZXJlbmNlLiBSZW1vdmUgdGhlc2Ugb25jZSB0aGUgc3dpdGNoIGlzIGRvbmUuXG4gICAqXG4gICAqIEBwYXJhbSB7KCFFbGVtZW50fCFEb2N1bWVudEZyYWdtZW50KX0gbm9kZVxuICAgKiBAcGFyYW0geyFmdW5jdGlvbihUKX0gZm5cbiAgICogQHBhcmFtIHtUPX0gZGF0YVxuICAgKiBAcmV0dXJuIHs/Tm9kZX0gbm9kZVxuICAgKiBAdGVtcGxhdGUgVFxuICAgKi9cbiAgY29uc3QgZiA9IGZ1bmN0aW9uKG5vZGUsIGZuLCBkYXRhKSB7XG4gICAgY29uc3QgcHJldkNvbnRleHQgPSBjb250ZXh0O1xuICAgIGNvbnN0IHByZXZEb2MgPSBkb2M7XG4gICAgY29uc3QgcHJldkN1cnJlbnROb2RlID0gY3VycmVudE5vZGU7XG4gICAgY29uc3QgcHJldkN1cnJlbnRQYXJlbnQgPSBjdXJyZW50UGFyZW50O1xuICAgIGxldCBwcmV2aW91c0luQXR0cmlidXRlcyA9IGZhbHNlO1xuICAgIGxldCBwcmV2aW91c0luU2tpcCA9IGZhbHNlO1xuXG4gICAgY29udGV4dCA9IG5ldyBDb250ZXh0KCk7XG4gICAgZG9jID0gbm9kZS5vd25lckRvY3VtZW50O1xuICAgIGN1cnJlbnRQYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgcHJldmlvdXNJbkF0dHJpYnV0ZXMgPSBzZXRJbkF0dHJpYnV0ZXMoZmFsc2UpO1xuICAgICAgcHJldmlvdXNJblNraXAgPSBzZXRJblNraXAoZmFsc2UpO1xuICAgIH1cblxuICAgIGNvbnN0IGZvY3VzUGF0aCA9IGdldEZvY3VzZWRQYXRoKG5vZGUsIGN1cnJlbnRQYXJlbnQpO1xuICAgIG1hcmtGb2N1c2VkKGZvY3VzUGF0aCwgdHJ1ZSk7XG4gICAgY29uc3QgcmV0VmFsID0gcnVuKG5vZGUsIGZuLCBkYXRhKTtcbiAgICBtYXJrRm9jdXNlZChmb2N1c1BhdGgsIGZhbHNlKTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBhc3NlcnRWaXJ0dWFsQXR0cmlidXRlc0Nsb3NlZCgpO1xuICAgICAgc2V0SW5BdHRyaWJ1dGVzKHByZXZpb3VzSW5BdHRyaWJ1dGVzKTtcbiAgICAgIHNldEluU2tpcChwcmV2aW91c0luU2tpcCk7XG4gICAgfVxuXG4gICAgY29udGV4dC5ub3RpZnlDaGFuZ2VzKCk7XG5cbiAgICBjb250ZXh0ID0gcHJldkNvbnRleHQ7XG4gICAgZG9jID0gcHJldkRvYztcbiAgICBjdXJyZW50Tm9kZSA9IHByZXZDdXJyZW50Tm9kZTtcbiAgICBjdXJyZW50UGFyZW50ID0gcHJldkN1cnJlbnRQYXJlbnQ7XG5cbiAgICByZXR1cm4gcmV0VmFsO1xuICB9O1xuICByZXR1cm4gZjtcbn07XG5cblxuLyoqXG4gKiBQYXRjaGVzIHRoZSBkb2N1bWVudCBzdGFydGluZyBhdCBub2RlIHdpdGggdGhlIHByb3ZpZGVkIGZ1bmN0aW9uLiBUaGlzXG4gKiBmdW5jdGlvbiBtYXkgYmUgY2FsbGVkIGR1cmluZyBhbiBleGlzdGluZyBwYXRjaCBvcGVyYXRpb24uXG4gKiBAcGFyYW0geyFFbGVtZW50fCFEb2N1bWVudEZyYWdtZW50fSBub2RlIFRoZSBFbGVtZW50IG9yIERvY3VtZW50XG4gKiAgICAgdG8gcGF0Y2guXG4gKiBAcGFyYW0geyFmdW5jdGlvbihUKX0gZm4gQSBmdW5jdGlvbiBjb250YWluaW5nIGVsZW1lbnRPcGVuL2VsZW1lbnRDbG9zZS9ldGMuXG4gKiAgICAgY2FsbHMgdGhhdCBkZXNjcmliZSB0aGUgRE9NLlxuICogQHBhcmFtIHtUPX0gZGF0YSBBbiBhcmd1bWVudCBwYXNzZWQgdG8gZm4gdG8gcmVwcmVzZW50IERPTSBzdGF0ZS5cbiAqIEByZXR1cm4geyFOb2RlfSBUaGUgcGF0Y2hlZCBub2RlLlxuICogQHRlbXBsYXRlIFRcbiAqL1xuY29uc3QgcGF0Y2hJbm5lciA9IHBhdGNoRmFjdG9yeShmdW5jdGlvbihub2RlLCBmbiwgZGF0YSkge1xuICBjdXJyZW50Tm9kZSA9IG5vZGU7XG5cbiAgZW50ZXJOb2RlKCk7XG4gIGZuKGRhdGEpO1xuICBleGl0Tm9kZSgpO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgYXNzZXJ0Tm9VbmNsb3NlZFRhZ3MoY3VycmVudE5vZGUsIG5vZGUpO1xuICB9XG5cbiAgcmV0dXJuIG5vZGU7XG59KTtcblxuXG4vKipcbiAqIFBhdGNoZXMgYW4gRWxlbWVudCB3aXRoIHRoZSB0aGUgcHJvdmlkZWQgZnVuY3Rpb24uIEV4YWN0bHkgb25lIHRvcCBsZXZlbFxuICogZWxlbWVudCBjYWxsIHNob3VsZCBiZSBtYWRlIGNvcnJlc3BvbmRpbmcgdG8gYG5vZGVgLlxuICogQHBhcmFtIHshRWxlbWVudH0gbm9kZSBUaGUgRWxlbWVudCB3aGVyZSB0aGUgcGF0Y2ggc2hvdWxkIHN0YXJ0LlxuICogQHBhcmFtIHshZnVuY3Rpb24oVCl9IGZuIEEgZnVuY3Rpb24gY29udGFpbmluZyBlbGVtZW50T3Blbi9lbGVtZW50Q2xvc2UvZXRjLlxuICogICAgIGNhbGxzIHRoYXQgZGVzY3JpYmUgdGhlIERPTS4gVGhpcyBzaG91bGQgaGF2ZSBhdCBtb3N0IG9uZSB0b3AgbGV2ZWxcbiAqICAgICBlbGVtZW50IGNhbGwuXG4gKiBAcGFyYW0ge1Q9fSBkYXRhIEFuIGFyZ3VtZW50IHBhc3NlZCB0byBmbiB0byByZXByZXNlbnQgRE9NIHN0YXRlLlxuICogQHJldHVybiB7P05vZGV9IFRoZSBub2RlIGlmIGl0IHdhcyB1cGRhdGVkLCBpdHMgcmVwbGFjZWRtZW50IG9yIG51bGwgaWYgaXRcbiAqICAgICB3YXMgcmVtb3ZlZC5cbiAqIEB0ZW1wbGF0ZSBUXG4gKi9cbmNvbnN0IHBhdGNoT3V0ZXIgPSBwYXRjaEZhY3RvcnkoZnVuY3Rpb24obm9kZSwgZm4sIGRhdGEpIHtcbiAgbGV0IHN0YXJ0Tm9kZSA9IC8qKiBAdHlwZSB7IUVsZW1lbnR9ICovKHsgbmV4dFNpYmxpbmc6IG5vZGUgfSk7XG4gIGxldCBleHBlY3RlZE5leHROb2RlID0gbnVsbDtcbiAgbGV0IGV4cGVjdGVkUHJldk5vZGUgPSBudWxsO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZXhwZWN0ZWROZXh0Tm9kZSA9IG5vZGUubmV4dFNpYmxpbmc7XG4gICAgZXhwZWN0ZWRQcmV2Tm9kZSA9IG5vZGUucHJldmlvdXNTaWJsaW5nO1xuICB9XG5cbiAgY3VycmVudE5vZGUgPSBzdGFydE5vZGU7XG4gIGZuKGRhdGEpO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgYXNzZXJ0UGF0Y2hFbGVtZW50Tm9FeHRyYXMoc3RhcnROb2RlLCBjdXJyZW50Tm9kZSwgZXhwZWN0ZWROZXh0Tm9kZSxcbiAgICAgICAgZXhwZWN0ZWRQcmV2Tm9kZSk7XG4gIH1cblxuICBpZiAobm9kZSAhPT0gY3VycmVudE5vZGUgJiYgbm9kZS5wYXJlbnROb2RlKSB7XG4gICAgcmVtb3ZlQ2hpbGQoY3VycmVudFBhcmVudCwgbm9kZSwgZ2V0RGF0YShjdXJyZW50UGFyZW50KS5rZXlNYXApO1xuICB9XG5cbiAgcmV0dXJuIChzdGFydE5vZGUgPT09IGN1cnJlbnROb2RlKSA/IG51bGwgOiBjdXJyZW50Tm9kZTtcbn0pO1xuXG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHRoZSBjdXJyZW50IG5vZGUgbWF0Y2hlcyB0aGUgc3BlY2lmaWVkIG5vZGVOYW1lIGFuZFxuICoga2V5LlxuICpcbiAqIEBwYXJhbSB7IU5vZGV9IG1hdGNoTm9kZSBBIG5vZGUgdG8gbWF0Y2ggdGhlIGRhdGEgdG8uXG4gKiBAcGFyYW0gez9zdHJpbmd9IG5vZGVOYW1lIFRoZSBub2RlTmFtZSBmb3IgdGhpcyBub2RlLlxuICogQHBhcmFtIHs/c3RyaW5nPX0ga2V5IEFuIG9wdGlvbmFsIGtleSB0aGF0IGlkZW50aWZpZXMgYSBub2RlLlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbm9kZSBtYXRjaGVzLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmNvbnN0IG1hdGNoZXMgPSBmdW5jdGlvbihtYXRjaE5vZGUsIG5vZGVOYW1lLCBrZXkpIHtcbiAgY29uc3QgZGF0YSA9IGdldERhdGEobWF0Y2hOb2RlKTtcblxuICAvLyBLZXkgY2hlY2sgaXMgZG9uZSB1c2luZyBkb3VibGUgZXF1YWxzIGFzIHdlIHdhbnQgdG8gdHJlYXQgYSBudWxsIGtleSB0aGVcbiAgLy8gc2FtZSBhcyB1bmRlZmluZWQuIFRoaXMgc2hvdWxkIGJlIG9rYXkgYXMgdGhlIG9ubHkgdmFsdWVzIGFsbG93ZWQgYXJlXG4gIC8vIHN0cmluZ3MsIG51bGwgYW5kIHVuZGVmaW5lZCBzbyB0aGUgPT0gc2VtYW50aWNzIGFyZSBub3QgdG9vIHdlaXJkLlxuICByZXR1cm4gbm9kZU5hbWUgPT09IGRhdGEubm9kZU5hbWUgJiYga2V5ID09IGRhdGEua2V5O1xufTtcblxuXG4vKipcbiAqIEFsaWducyB0aGUgdmlydHVhbCBFbGVtZW50IGRlZmluaXRpb24gd2l0aCB0aGUgYWN0dWFsIERPTSwgbW92aW5nIHRoZVxuICogY29ycmVzcG9uZGluZyBET00gbm9kZSB0byB0aGUgY29ycmVjdCBsb2NhdGlvbiBvciBjcmVhdGluZyBpdCBpZiBuZWNlc3NhcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30gbm9kZU5hbWUgRm9yIGFuIEVsZW1lbnQsIHRoaXMgc2hvdWxkIGJlIGEgdmFsaWQgdGFnIHN0cmluZy5cbiAqICAgICBGb3IgYSBUZXh0LCB0aGlzIHNob3VsZCBiZSAjdGV4dC5cbiAqIEBwYXJhbSB7P3N0cmluZz19IGtleSBUaGUga2V5IHVzZWQgdG8gaWRlbnRpZnkgdGhpcyBlbGVtZW50LlxuICovXG5jb25zdCBhbGlnbldpdGhET00gPSBmdW5jdGlvbihub2RlTmFtZSwga2V5KSB7XG4gIGlmIChjdXJyZW50Tm9kZSAmJiBtYXRjaGVzKGN1cnJlbnROb2RlLCBub2RlTmFtZSwga2V5KSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHBhcmVudERhdGEgPSBnZXREYXRhKGN1cnJlbnRQYXJlbnQpO1xuICBjb25zdCBjdXJyZW50Tm9kZURhdGEgPSBjdXJyZW50Tm9kZSAmJiBnZXREYXRhKGN1cnJlbnROb2RlKTtcbiAgY29uc3Qga2V5TWFwID0gcGFyZW50RGF0YS5rZXlNYXA7XG4gIGxldCBub2RlO1xuXG4gIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgbm9kZSBoYXMgbW92ZWQgd2l0aGluIHRoZSBwYXJlbnQuXG4gIGlmIChrZXkpIHtcbiAgICBjb25zdCBrZXlOb2RlID0ga2V5TWFwW2tleV07XG4gICAgaWYgKGtleU5vZGUpIHtcbiAgICAgIGlmIChtYXRjaGVzKGtleU5vZGUsIG5vZGVOYW1lLCBrZXkpKSB7XG4gICAgICAgIG5vZGUgPSBrZXlOb2RlO1xuICAgICAgfSBlbHNlIGlmIChrZXlOb2RlID09PSBjdXJyZW50Tm9kZSkge1xuICAgICAgICBjb250ZXh0Lm1hcmtEZWxldGVkKGtleU5vZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVtb3ZlQ2hpbGQoY3VycmVudFBhcmVudCwga2V5Tm9kZSwga2V5TWFwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDcmVhdGUgdGhlIG5vZGUgaWYgaXQgZG9lc24ndCBleGlzdC5cbiAgaWYgKCFub2RlKSB7XG4gICAgaWYgKG5vZGVOYW1lID09PSAnI3RleHQnKSB7XG4gICAgICBub2RlID0gY3JlYXRlVGV4dChkb2MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlID0gY3JlYXRlRWxlbWVudChkb2MsIGN1cnJlbnRQYXJlbnQsIG5vZGVOYW1lLCBrZXkpO1xuICAgIH1cblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGtleU1hcFtrZXldID0gbm9kZTtcbiAgICB9XG5cbiAgICBjb250ZXh0Lm1hcmtDcmVhdGVkKG5vZGUpO1xuICB9XG5cbiAgLy8gUmUtb3JkZXIgdGhlIG5vZGUgaW50byB0aGUgcmlnaHQgcG9zaXRpb24sIHByZXNlcnZpbmcgZm9jdXMgaWYgZWl0aGVyXG4gIC8vIG5vZGUgb3IgY3VycmVudE5vZGUgYXJlIGZvY3VzZWQgYnkgbWFraW5nIHN1cmUgdGhhdCB0aGV5IGFyZSBub3QgZGV0YWNoZWRcbiAgLy8gZnJvbSB0aGUgRE9NLlxuICBpZiAoZ2V0RGF0YShub2RlKS5mb2N1c2VkKSB7XG4gICAgLy8gTW92ZSBldmVyeXRoaW5nIGVsc2UgYmVmb3JlIHRoZSBub2RlLlxuICAgIG1vdmVCZWZvcmUoY3VycmVudFBhcmVudCwgbm9kZSwgY3VycmVudE5vZGUpO1xuICB9IGVsc2UgaWYgKGN1cnJlbnROb2RlRGF0YSAmJiBjdXJyZW50Tm9kZURhdGEua2V5ICYmICFjdXJyZW50Tm9kZURhdGEuZm9jdXNlZCkge1xuICAgIC8vIFJlbW92ZSB0aGUgY3VycmVudE5vZGUsIHdoaWNoIGNhbiBhbHdheXMgYmUgYWRkZWQgYmFjayBzaW5jZSB3ZSBob2xkIGFcbiAgICAvLyByZWZlcmVuY2UgdGhyb3VnaCB0aGUga2V5TWFwLiBUaGlzIHByZXZlbnRzIGEgbGFyZ2UgbnVtYmVyIG9mIG1vdmVzIHdoZW5cbiAgICAvLyBhIGtleWVkIGl0ZW0gaXMgcmVtb3ZlZCBvciBtb3ZlZCBiYWNrd2FyZHMgaW4gdGhlIERPTS5cbiAgICBjdXJyZW50UGFyZW50LnJlcGxhY2VDaGlsZChub2RlLCBjdXJyZW50Tm9kZSk7XG4gICAgcGFyZW50RGF0YS5rZXlNYXBWYWxpZCA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIGN1cnJlbnRQYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIGN1cnJlbnROb2RlKTtcbiAgfVxuXG4gIGN1cnJlbnROb2RlID0gbm9kZTtcbn07XG5cblxuLyoqXG4gKiBAcGFyYW0gez9Ob2RlfSBub2RlXG4gKiBAcGFyYW0gez9Ob2RlfSBjaGlsZFxuICogQHBhcmFtIHs/T2JqZWN0PHN0cmluZywgIUVsZW1lbnQ+fSBrZXlNYXBcbiAqL1xuY29uc3QgcmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbihub2RlLCBjaGlsZCwga2V5TWFwKSB7XG4gIG5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICBjb250ZXh0Lm1hcmtEZWxldGVkKC8qKiBAdHlwZSB7IU5vZGV9Ki8oY2hpbGQpKTtcblxuICBjb25zdCBrZXkgPSBnZXREYXRhKGNoaWxkKS5rZXk7XG4gIGlmIChrZXkpIHtcbiAgICBkZWxldGUga2V5TWFwW2tleV07XG4gIH1cbn07XG5cblxuLyoqXG4gKiBDbGVhcnMgb3V0IGFueSB1bnZpc2l0ZWQgTm9kZXMsIGFzIHRoZSBjb3JyZXNwb25kaW5nIHZpcnR1YWwgZWxlbWVudFxuICogZnVuY3Rpb25zIHdlcmUgbmV2ZXIgY2FsbGVkIGZvciB0aGVtLlxuICovXG5jb25zdCBjbGVhclVudmlzaXRlZERPTSA9IGZ1bmN0aW9uKCkge1xuICBjb25zdCBub2RlID0gY3VycmVudFBhcmVudDtcbiAgY29uc3QgZGF0YSA9IGdldERhdGEobm9kZSk7XG4gIGNvbnN0IGtleU1hcCA9IGRhdGEua2V5TWFwO1xuICBjb25zdCBrZXlNYXBWYWxpZCA9IGRhdGEua2V5TWFwVmFsaWQ7XG4gIGxldCBjaGlsZCA9IG5vZGUubGFzdENoaWxkO1xuICBsZXQga2V5O1xuXG4gIGlmIChjaGlsZCA9PT0gY3VycmVudE5vZGUgJiYga2V5TWFwVmFsaWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB3aGlsZSAoY2hpbGQgIT09IGN1cnJlbnROb2RlKSB7XG4gICAgcmVtb3ZlQ2hpbGQobm9kZSwgY2hpbGQsIGtleU1hcCk7XG4gICAgY2hpbGQgPSBub2RlLmxhc3RDaGlsZDtcbiAgfVxuXG4gIC8vIENsZWFuIHRoZSBrZXlNYXAsIHJlbW92aW5nIGFueSB1bnVzdWVkIGtleXMuXG4gIGlmICgha2V5TWFwVmFsaWQpIHtcbiAgICBmb3IgKGtleSBpbiBrZXlNYXApIHtcbiAgICAgIGNoaWxkID0ga2V5TWFwW2tleV07XG4gICAgICBpZiAoY2hpbGQucGFyZW50Tm9kZSAhPT0gbm9kZSkge1xuICAgICAgICBjb250ZXh0Lm1hcmtEZWxldGVkKGNoaWxkKTtcbiAgICAgICAgZGVsZXRlIGtleU1hcFtrZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRhdGEua2V5TWFwVmFsaWQgPSB0cnVlO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ2hhbmdlcyB0byB0aGUgZmlyc3QgY2hpbGQgb2YgdGhlIGN1cnJlbnQgbm9kZS5cbiAqL1xuY29uc3QgZW50ZXJOb2RlID0gZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnRQYXJlbnQgPSBjdXJyZW50Tm9kZTtcbiAgY3VycmVudE5vZGUgPSBudWxsO1xufTtcblxuXG4vKipcbiAqIEByZXR1cm4gez9Ob2RlfSBUaGUgbmV4dCBOb2RlIHRvIGJlIHBhdGNoZWQuXG4gKi9cbmNvbnN0IGdldE5leHROb2RlID0gZnVuY3Rpb24oKSB7XG4gIGlmIChjdXJyZW50Tm9kZSkge1xuICAgIHJldHVybiBjdXJyZW50Tm9kZS5uZXh0U2libGluZztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY3VycmVudFBhcmVudC5maXJzdENoaWxkO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ2hhbmdlcyB0byB0aGUgbmV4dCBzaWJsaW5nIG9mIHRoZSBjdXJyZW50IG5vZGUuXG4gKi9cbmNvbnN0IG5leHROb2RlID0gZnVuY3Rpb24oKSB7XG4gIGN1cnJlbnROb2RlID0gZ2V0TmV4dE5vZGUoKTtcbn07XG5cblxuLyoqXG4gKiBDaGFuZ2VzIHRvIHRoZSBwYXJlbnQgb2YgdGhlIGN1cnJlbnQgbm9kZSwgcmVtb3ZpbmcgYW55IHVudmlzaXRlZCBjaGlsZHJlbi5cbiAqL1xuY29uc3QgZXhpdE5vZGUgPSBmdW5jdGlvbigpIHtcbiAgY2xlYXJVbnZpc2l0ZWRET00oKTtcblxuICBjdXJyZW50Tm9kZSA9IGN1cnJlbnRQYXJlbnQ7XG4gIGN1cnJlbnRQYXJlbnQgPSBjdXJyZW50UGFyZW50LnBhcmVudE5vZGU7XG59O1xuXG5cbi8qKlxuICogTWFrZXMgc3VyZSB0aGF0IHRoZSBjdXJyZW50IG5vZGUgaXMgYW4gRWxlbWVudCB3aXRoIGEgbWF0Y2hpbmcgdGFnTmFtZSBhbmRcbiAqIGtleS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBlbGVtZW50J3MgdGFnLlxuICogQHBhcmFtIHs/c3RyaW5nPX0ga2V5IFRoZSBrZXkgdXNlZCB0byBpZGVudGlmeSB0aGlzIGVsZW1lbnQuIFRoaXMgY2FuIGJlIGFuXG4gKiAgICAgZW1wdHkgc3RyaW5nLCBidXQgcGVyZm9ybWFuY2UgbWF5IGJlIGJldHRlciBpZiBhIHVuaXF1ZSB2YWx1ZSBpcyB1c2VkXG4gKiAgICAgd2hlbiBpdGVyYXRpbmcgb3ZlciBhbiBhcnJheSBvZiBpdGVtcy5cbiAqIEByZXR1cm4geyFFbGVtZW50fSBUaGUgY29ycmVzcG9uZGluZyBFbGVtZW50LlxuICovXG5jb25zdCBlbGVtZW50T3BlbiA9IGZ1bmN0aW9uKHRhZywga2V5KSB7XG4gIG5leHROb2RlKCk7XG4gIGFsaWduV2l0aERPTSh0YWcsIGtleSk7XG4gIGVudGVyTm9kZSgpO1xuICByZXR1cm4gLyoqIEB0eXBlIHshRWxlbWVudH0gKi8oY3VycmVudFBhcmVudCk7XG59O1xuXG5cbi8qKlxuICogQ2xvc2VzIHRoZSBjdXJyZW50bHkgb3BlbiBFbGVtZW50LCByZW1vdmluZyBhbnkgdW52aXNpdGVkIGNoaWxkcmVuIGlmXG4gKiBuZWNlc3NhcnkuXG4gKlxuICogQHJldHVybiB7IUVsZW1lbnR9IFRoZSBjb3JyZXNwb25kaW5nIEVsZW1lbnQuXG4gKi9cbmNvbnN0IGVsZW1lbnRDbG9zZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHNldEluU2tpcChmYWxzZSk7XG4gIH1cblxuICBleGl0Tm9kZSgpO1xuICByZXR1cm4gLyoqIEB0eXBlIHshRWxlbWVudH0gKi8oY3VycmVudE5vZGUpO1xufTtcblxuXG4vKipcbiAqIE1ha2VzIHN1cmUgdGhlIGN1cnJlbnQgbm9kZSBpcyBhIFRleHQgbm9kZSBhbmQgY3JlYXRlcyBhIFRleHQgbm9kZSBpZiBpdCBpc1xuICogbm90LlxuICpcbiAqIEByZXR1cm4geyFUZXh0fSBUaGUgY29ycmVzcG9uZGluZyBUZXh0IE5vZGUuXG4gKi9cbmNvbnN0IHRleHQgPSBmdW5jdGlvbigpIHtcbiAgbmV4dE5vZGUoKTtcbiAgYWxpZ25XaXRoRE9NKCcjdGV4dCcsIG51bGwpO1xuICByZXR1cm4gLyoqIEB0eXBlIHshVGV4dH0gKi8oY3VycmVudE5vZGUpO1xufTtcblxuXG4vKipcbiAqIEdldHMgdGhlIGN1cnJlbnQgRWxlbWVudCBiZWluZyBwYXRjaGVkLlxuICogQHJldHVybiB7IUVsZW1lbnR9XG4gKi9cbmNvbnN0IGN1cnJlbnRFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgYXNzZXJ0SW5QYXRjaCgnY3VycmVudEVsZW1lbnQnLCBjb250ZXh0KTtcbiAgICBhc3NlcnROb3RJbkF0dHJpYnV0ZXMoJ2N1cnJlbnRFbGVtZW50Jyk7XG4gIH1cbiAgcmV0dXJuIC8qKiBAdHlwZSB7IUVsZW1lbnR9ICovKGN1cnJlbnRQYXJlbnQpO1xufTtcblxuXG4vKipcbiAqIEByZXR1cm4ge05vZGV9IFRoZSBOb2RlIHRoYXQgd2lsbCBiZSBldmFsdWF0ZWQgZm9yIHRoZSBuZXh0IGluc3RydWN0aW9uLlxuICovXG5jb25zdCBjdXJyZW50UG9pbnRlciA9IGZ1bmN0aW9uKCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGFzc2VydEluUGF0Y2goJ2N1cnJlbnRQb2ludGVyJywgY29udGV4dCk7XG4gICAgYXNzZXJ0Tm90SW5BdHRyaWJ1dGVzKCdjdXJyZW50UG9pbnRlcicpO1xuICB9XG4gIHJldHVybiBnZXROZXh0Tm9kZSgpO1xufTtcblxuXG4vKipcbiAqIFNraXBzIHRoZSBjaGlsZHJlbiBpbiBhIHN1YnRyZWUsIGFsbG93aW5nIGFuIEVsZW1lbnQgdG8gYmUgY2xvc2VkIHdpdGhvdXRcbiAqIGNsZWFyaW5nIG91dCB0aGUgY2hpbGRyZW4uXG4gKi9cbmNvbnN0IHNraXAgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBhc3NlcnROb0NoaWxkcmVuRGVjbGFyZWRZZXQoJ3NraXAnLCBjdXJyZW50Tm9kZSk7XG4gICAgc2V0SW5Ta2lwKHRydWUpO1xuICB9XG4gIGN1cnJlbnROb2RlID0gY3VycmVudFBhcmVudC5sYXN0Q2hpbGQ7XG59O1xuXG5cbi8qKlxuICogU2tpcHMgdGhlIG5leHQgTm9kZSB0byBiZSBwYXRjaGVkLCBtb3ZpbmcgdGhlIHBvaW50ZXIgZm9yd2FyZCB0byB0aGUgbmV4dFxuICogc2libGluZyBvZiB0aGUgY3VycmVudCBwb2ludGVyLlxuICovXG5jb25zdCBza2lwTm9kZSA9IG5leHROb2RlO1xuXG5cbi8qKiAqL1xuZXhwb3J0IHtcbiAgZWxlbWVudE9wZW4sXG4gIGVsZW1lbnRDbG9zZSxcbiAgdGV4dCxcbiAgcGF0Y2hJbm5lcixcbiAgcGF0Y2hPdXRlcixcbiAgY3VycmVudEVsZW1lbnQsXG4gIGN1cnJlbnRQb2ludGVyLFxuICBza2lwLFxuICBza2lwTm9kZVxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTUgVGhlIEluY3JlbWVudGFsIERPTSBBdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMtSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBjb25zdCAqL1xuY29uc3Qgc3ltYm9scyA9IHtcbiAgZGVmYXVsdDogJ19fZGVmYXVsdCdcbn07XG5cbi8qKiAqL1xuZXhwb3J0IHtcbiAgc3ltYm9sc1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTUgVGhlIEluY3JlbWVudGFsIERPTSBBdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMtSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gJy4vbm9kZV9kYXRhJztcbmltcG9ydCB7IHN5bWJvbHMgfSBmcm9tICcuL3N5bWJvbHMnO1xuaW1wb3J0IHtcbiAgY3JlYXRlTWFwLFxuICBoYXNcbn0gZnJvbSAnLi91dGlsJztcblxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd8dW5kZWZpbmVkfSBUaGUgbmFtZXNwYWNlIHRvIHVzZSBmb3IgdGhlIGF0dHJpYnV0ZS5cbiAqL1xuY29uc3QgZ2V0TmFtZXNwYWNlID0gZnVuY3Rpb24obmFtZSkge1xuICBpZiAobmFtZS5sYXN0SW5kZXhPZigneG1sOicsIDApID09PSAwKSB7XG4gICAgcmV0dXJuICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnO1xuICB9XG5cbiAgaWYgKG5hbWUubGFzdEluZGV4T2YoJ3hsaW5rOicsIDApID09PSAwKSB7XG4gICAgcmV0dXJuICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJztcbiAgfVxufTtcblxuXG4vKipcbiAqIEFwcGxpZXMgYW4gYXR0cmlidXRlIG9yIHByb3BlcnR5IHRvIGEgZ2l2ZW4gRWxlbWVudC4gSWYgdGhlIHZhbHVlIGlzIG51bGxcbiAqIG9yIHVuZGVmaW5lZCwgaXQgaXMgcmVtb3ZlZCBmcm9tIHRoZSBFbGVtZW50LiBPdGhlcndpc2UsIHRoZSB2YWx1ZSBpcyBzZXRcbiAqIGFzIGFuIGF0dHJpYnV0ZS5cbiAqIEBwYXJhbSB7IUVsZW1lbnR9IGVsXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgYXR0cmlidXRlJ3MgbmFtZS5cbiAqIEBwYXJhbSB7Pyhib29sZWFufG51bWJlcnxzdHJpbmcpPX0gdmFsdWUgVGhlIGF0dHJpYnV0ZSdzIHZhbHVlLlxuICovXG5jb25zdCBhcHBseUF0dHIgPSBmdW5jdGlvbihlbCwgbmFtZSwgdmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICBlbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgYXR0ck5TID0gZ2V0TmFtZXNwYWNlKG5hbWUpO1xuICAgIGlmIChhdHRyTlMpIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZU5TKGF0dHJOUywgbmFtZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBBcHBsaWVzIGEgcHJvcGVydHkgdG8gYSBnaXZlbiBFbGVtZW50LlxuICogQHBhcmFtIHshRWxlbWVudH0gZWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBwcm9wZXJ0eSdzIG5hbWUuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwcm9wZXJ0eSdzIHZhbHVlLlxuICovXG5jb25zdCBhcHBseVByb3AgPSBmdW5jdGlvbihlbCwgbmFtZSwgdmFsdWUpIHtcbiAgZWxbbmFtZV0gPSB2YWx1ZTtcbn07XG5cblxuLyoqXG4gKiBBcHBsaWVzIGEgdmFsdWUgdG8gYSBzdHlsZSBkZWNsYXJhdGlvbi4gU3VwcG9ydHMgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzIGJ5XG4gKiBzZXR0aW5nIHByb3BlcnRpZXMgY29udGFpbmluZyBhIGRhc2ggdXNpbmcgQ1NTU3R5bGVEZWNsYXJhdGlvbi5zZXRQcm9wZXJ0eS5cbiAqIEBwYXJhbSB7Q1NTU3R5bGVEZWNsYXJhdGlvbn0gc3R5bGVcbiAqIEBwYXJhbSB7IXN0cmluZ30gcHJvcFxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICovXG5jb25zdCBzZXRTdHlsZVZhbHVlID0gZnVuY3Rpb24oc3R5bGUsIHByb3AsIHZhbHVlKSB7XG4gIGlmIChwcm9wLmluZGV4T2YoJy0nKSA+PSAwKSB7XG4gICAgc3R5bGUuc2V0UHJvcGVydHkocHJvcCwgLyoqIEB0eXBlIHtzdHJpbmd9ICovKHZhbHVlKSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGVbcHJvcF0gPSB2YWx1ZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIEFwcGxpZXMgYSBzdHlsZSB0byBhbiBFbGVtZW50LiBObyB2ZW5kb3IgcHJlZml4IGV4cGFuc2lvbiBpcyBkb25lIGZvclxuICogcHJvcGVydHkgbmFtZXMvdmFsdWVzLlxuICogQHBhcmFtIHshRWxlbWVudH0gZWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBhdHRyaWJ1dGUncyBuYW1lLlxuICogQHBhcmFtIHsqfSBzdHlsZSBUaGUgc3R5bGUgdG8gc2V0LiBFaXRoZXIgYSBzdHJpbmcgb2YgY3NzIG9yIGFuIG9iamVjdFxuICogICAgIGNvbnRhaW5pbmcgcHJvcGVydHktdmFsdWUgcGFpcnMuXG4gKi9cbmNvbnN0IGFwcGx5U3R5bGUgPSBmdW5jdGlvbihlbCwgbmFtZSwgc3R5bGUpIHtcbiAgaWYgKHR5cGVvZiBzdHlsZSA9PT0gJ3N0cmluZycpIHtcbiAgICBlbC5zdHlsZS5jc3NUZXh0ID0gc3R5bGU7XG4gIH0gZWxzZSB7XG4gICAgZWwuc3R5bGUuY3NzVGV4dCA9ICcnO1xuICAgIGNvbnN0IGVsU3R5bGUgPSBlbC5zdHlsZTtcbiAgICBjb25zdCBvYmogPSAvKiogQHR5cGUgeyFPYmplY3Q8c3RyaW5nLHN0cmluZz59ICovKHN0eWxlKTtcblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBvYmopIHtcbiAgICAgIGlmIChoYXMob2JqLCBwcm9wKSkge1xuICAgICAgICBzZXRTdHlsZVZhbHVlKGVsU3R5bGUsIHByb3AsIG9ialtwcm9wXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5cbi8qKlxuICogVXBkYXRlcyBhIHNpbmdsZSBhdHRyaWJ1dGUgb24gYW4gRWxlbWVudC5cbiAqIEBwYXJhbSB7IUVsZW1lbnR9IGVsXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgYXR0cmlidXRlJ3MgbmFtZS5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIGF0dHJpYnV0ZSdzIHZhbHVlLiBJZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0IG9yXG4gKiAgICAgZnVuY3Rpb24gaXQgaXMgc2V0IG9uIHRoZSBFbGVtZW50LCBvdGhlcndpc2UsIGl0IGlzIHNldCBhcyBhbiBIVE1MXG4gKiAgICAgYXR0cmlidXRlLlxuICovXG5jb25zdCBhcHBseUF0dHJpYnV0ZVR5cGVkID0gZnVuY3Rpb24oZWwsIG5hbWUsIHZhbHVlKSB7XG4gIGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XG5cbiAgaWYgKHR5cGUgPT09ICdvYmplY3QnIHx8IHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBhcHBseVByb3AoZWwsIG5hbWUsIHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBhcHBseUF0dHIoZWwsIG5hbWUsIC8qKiBAdHlwZSB7Pyhib29sZWFufG51bWJlcnxzdHJpbmcpfSAqLyh2YWx1ZSkpO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ2FsbHMgdGhlIGFwcHJvcHJpYXRlIGF0dHJpYnV0ZSBtdXRhdG9yIGZvciB0aGlzIGF0dHJpYnV0ZS5cbiAqIEBwYXJhbSB7IUVsZW1lbnR9IGVsXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgYXR0cmlidXRlJ3MgbmFtZS5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIGF0dHJpYnV0ZSdzIHZhbHVlLlxuICovXG5jb25zdCB1cGRhdGVBdHRyaWJ1dGUgPSBmdW5jdGlvbihlbCwgbmFtZSwgdmFsdWUpIHtcbiAgY29uc3QgZGF0YSA9IGdldERhdGEoZWwpO1xuICBjb25zdCBhdHRycyA9IGRhdGEuYXR0cnM7XG5cbiAgaWYgKGF0dHJzW25hbWVdID09PSB2YWx1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IG11dGF0b3IgPSBhdHRyaWJ1dGVzW25hbWVdIHx8IGF0dHJpYnV0ZXNbc3ltYm9scy5kZWZhdWx0XTtcbiAgbXV0YXRvcihlbCwgbmFtZSwgdmFsdWUpO1xuXG4gIGF0dHJzW25hbWVdID0gdmFsdWU7XG59O1xuXG5cbi8qKlxuICogQSBwdWJsaWNseSBtdXRhYmxlIG9iamVjdCB0byBwcm92aWRlIGN1c3RvbSBtdXRhdG9ycyBmb3IgYXR0cmlidXRlcy5cbiAqIEBjb25zdCB7IU9iamVjdDxzdHJpbmcsIGZ1bmN0aW9uKCFFbGVtZW50LCBzdHJpbmcsICopPn1cbiAqL1xuY29uc3QgYXR0cmlidXRlcyA9IGNyZWF0ZU1hcCgpO1xuXG4vLyBTcGVjaWFsIGdlbmVyaWMgbXV0YXRvciB0aGF0J3MgY2FsbGVkIGZvciBhbnkgYXR0cmlidXRlIHRoYXQgZG9lcyBub3Rcbi8vIGhhdmUgYSBzcGVjaWZpYyBtdXRhdG9yLlxuYXR0cmlidXRlc1tzeW1ib2xzLmRlZmF1bHRdID0gYXBwbHlBdHRyaWJ1dGVUeXBlZDtcblxuYXR0cmlidXRlc1snc3R5bGUnXSA9IGFwcGx5U3R5bGU7XG5cblxuLyoqICovXG5leHBvcnQge1xuICB1cGRhdGVBdHRyaWJ1dGUsXG4gIGFwcGx5UHJvcCxcbiAgYXBwbHlBdHRyLFxuICBhdHRyaWJ1dGVzXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNSBUaGUgSW5jcmVtZW50YWwgRE9NIEF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUy1JU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge1xuICBlbGVtZW50T3BlbiBhcyBjb3JlRWxlbWVudE9wZW4sXG4gIGVsZW1lbnRDbG9zZSBhcyBjb3JlRWxlbWVudENsb3NlLFxuICB0ZXh0IGFzIGNvcmVUZXh0XG59IGZyb20gJy4vY29yZSc7XG5pbXBvcnQgeyB1cGRhdGVBdHRyaWJ1dGUgfSBmcm9tICcuL2F0dHJpYnV0ZXMnO1xuaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gJy4vbm9kZV9kYXRhJztcbmltcG9ydCB7XG4gIGFzc2VydE5vdEluQXR0cmlidXRlcyxcbiAgYXNzZXJ0Tm90SW5Ta2lwLFxuICBhc3NlcnRJbkF0dHJpYnV0ZXMsXG4gIGFzc2VydENsb3NlTWF0Y2hlc09wZW5UYWcsXG4gIHNldEluQXR0cmlidXRlc1xufSBmcm9tICcuL2Fzc2VydGlvbnMnO1xuXG5cbi8qKlxuICogVGhlIG9mZnNldCBpbiB0aGUgdmlydHVhbCBlbGVtZW50IGRlY2xhcmF0aW9uIHdoZXJlIHRoZSBhdHRyaWJ1dGVzIGFyZVxuICogc3BlY2lmaWVkLlxuICogQGNvbnN0XG4gKi9cbmNvbnN0IEFUVFJJQlVURVNfT0ZGU0VUID0gMztcblxuXG4vKipcbiAqIEJ1aWxkcyBhbiBhcnJheSBvZiBhcmd1bWVudHMgZm9yIHVzZSB3aXRoIGVsZW1lbnRPcGVuU3RhcnQsIGF0dHIgYW5kXG4gKiBlbGVtZW50T3BlbkVuZC5cbiAqIEBjb25zdCB7QXJyYXk8Kj59XG4gKi9cbmNvbnN0IGFyZ3NCdWlsZGVyID0gW107XG5cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBlbGVtZW50J3MgdGFnLlxuICogQHBhcmFtIHs/c3RyaW5nPX0ga2V5IFRoZSBrZXkgdXNlZCB0byBpZGVudGlmeSB0aGlzIGVsZW1lbnQuIFRoaXMgY2FuIGJlIGFuXG4gKiAgICAgZW1wdHkgc3RyaW5nLCBidXQgcGVyZm9ybWFuY2UgbWF5IGJlIGJldHRlciBpZiBhIHVuaXF1ZSB2YWx1ZSBpcyB1c2VkXG4gKiAgICAgd2hlbiBpdGVyYXRpbmcgb3ZlciBhbiBhcnJheSBvZiBpdGVtcy5cbiAqIEBwYXJhbSB7P0FycmF5PCo+PX0gc3RhdGljcyBBbiBhcnJheSBvZiBhdHRyaWJ1dGUgbmFtZS92YWx1ZSBwYWlycyBvZiB0aGVcbiAqICAgICBzdGF0aWMgYXR0cmlidXRlcyBmb3IgdGhlIEVsZW1lbnQuIFRoZXNlIHdpbGwgb25seSBiZSBzZXQgb25jZSB3aGVuIHRoZVxuICogICAgIEVsZW1lbnQgaXMgY3JlYXRlZC5cbiAqIEBwYXJhbSB7Li4uKn0gdmFyX2FyZ3MsIEF0dHJpYnV0ZSBuYW1lL3ZhbHVlIHBhaXJzIG9mIHRoZSBkeW5hbWljIGF0dHJpYnV0ZXNcbiAqICAgICBmb3IgdGhlIEVsZW1lbnQuXG4gKiBAcmV0dXJuIHshRWxlbWVudH0gVGhlIGNvcnJlc3BvbmRpbmcgRWxlbWVudC5cbiAqL1xuY29uc3QgZWxlbWVudE9wZW4gPSBmdW5jdGlvbih0YWcsIGtleSwgc3RhdGljcywgdmFyX2FyZ3MpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBhc3NlcnROb3RJbkF0dHJpYnV0ZXMoJ2VsZW1lbnRPcGVuJyk7XG4gICAgYXNzZXJ0Tm90SW5Ta2lwKCdlbGVtZW50T3BlbicpO1xuICB9XG5cbiAgY29uc3Qgbm9kZSA9IGNvcmVFbGVtZW50T3Blbih0YWcsIGtleSk7XG4gIGNvbnN0IGRhdGEgPSBnZXREYXRhKG5vZGUpO1xuXG4gIGlmICghZGF0YS5zdGF0aWNzQXBwbGllZCkge1xuICAgIGlmIChzdGF0aWNzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YXRpY3MubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IC8qKiBAdHlwZSB7c3RyaW5nfSAqLyhzdGF0aWNzW2ldKTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBzdGF0aWNzW2kgKyAxXTtcbiAgICAgICAgdXBkYXRlQXR0cmlidXRlKG5vZGUsIG5hbWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gRG93biB0aGUgcm9hZCwgd2UgbWF5IHdhbnQgdG8ga2VlcCB0cmFjayBvZiB0aGUgc3RhdGljcyBhcnJheSB0byB1c2UgaXRcbiAgICAvLyBhcyBhbiBhZGRpdGlvbmFsIHNpZ25hbCBhYm91dCB3aGV0aGVyIGEgbm9kZSBtYXRjaGVzIG9yIG5vdC4gRm9yIG5vdyxcbiAgICAvLyBqdXN0IHVzZSBhIG1hcmtlciBzbyB0aGF0IHdlIGRvIG5vdCByZWFwcGx5IHN0YXRpY3MuXG4gICAgZGF0YS5zdGF0aWNzQXBwbGllZCA9IHRydWU7XG4gIH1cblxuICAvKlxuICAgKiBDaGVja3MgdG8gc2VlIGlmIG9uZSBvciBtb3JlIGF0dHJpYnV0ZXMgaGF2ZSBjaGFuZ2VkIGZvciBhIGdpdmVuIEVsZW1lbnQuXG4gICAqIFdoZW4gbm8gYXR0cmlidXRlcyBoYXZlIGNoYW5nZWQsIHRoaXMgaXMgbXVjaCBmYXN0ZXIgdGhhbiBjaGVja2luZyBlYWNoXG4gICAqIGluZGl2aWR1YWwgYXJndW1lbnQuIFdoZW4gYXR0cmlidXRlcyBoYXZlIGNoYW5nZWQsIHRoZSBvdmVyaGVhZCBvZiB0aGlzIGlzXG4gICAqIG1pbmltYWwuXG4gICAqL1xuICBjb25zdCBhdHRyc0FyciA9IGRhdGEuYXR0cnNBcnI7XG4gIGNvbnN0IG5ld0F0dHJzID0gZGF0YS5uZXdBdHRycztcbiAgY29uc3QgaXNOZXcgPSAhYXR0cnNBcnIubGVuZ3RoO1xuICBsZXQgaSA9IEFUVFJJQlVURVNfT0ZGU0VUO1xuICBsZXQgaiA9IDA7XG5cbiAgZm9yICg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDIsIGogKz0gMikge1xuICAgIGNvbnN0IGF0dHIgPSBhcmd1bWVudHNbaV07XG4gICAgaWYgKGlzTmV3KSB7XG4gICAgICBhdHRyc0FycltqXSA9IGF0dHI7XG4gICAgICBuZXdBdHRyc1thdHRyXSA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2UgaWYgKGF0dHJzQXJyW2pdICE9PSBhdHRyKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgaWYgKGlzTmV3IHx8IGF0dHJzQXJyW2ogKyAxXSAhPT0gdmFsdWUpIHtcbiAgICAgIGF0dHJzQXJyW2ogKyAxXSA9IHZhbHVlO1xuICAgICAgdXBkYXRlQXR0cmlidXRlKG5vZGUsIGF0dHIsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBpZiAoaSA8IGFyZ3VtZW50cy5sZW5ndGggfHwgaiA8IGF0dHJzQXJyLmxlbmd0aCkge1xuICAgIGZvciAoOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxLCBqICs9IDEpIHtcbiAgICAgIGF0dHJzQXJyW2pdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGlmIChqIDwgYXR0cnNBcnIubGVuZ3RoKSB7XG4gICAgICBhdHRyc0Fyci5sZW5ndGggPSBqO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogQWN0dWFsbHkgcGVyZm9ybSB0aGUgYXR0cmlidXRlIHVwZGF0ZS5cbiAgICAgKi9cbiAgICBmb3IgKGkgPSAwOyBpIDwgYXR0cnNBcnIubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSAvKiogQHR5cGUge3N0cmluZ30gKi8oYXR0cnNBcnJbaV0pO1xuICAgICAgY29uc3QgdmFsdWUgPSBhdHRyc0FycltpICsgMV07XG4gICAgICBuZXdBdHRyc1tuYW1lXSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgYXR0ciBpbiBuZXdBdHRycykge1xuICAgICAgdXBkYXRlQXR0cmlidXRlKG5vZGUsIGF0dHIsIG5ld0F0dHJzW2F0dHJdKTtcbiAgICAgIG5ld0F0dHJzW2F0dHJdID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBub2RlO1xufTtcblxuXG4vKipcbiAqIERlY2xhcmVzIGEgdmlydHVhbCBFbGVtZW50IGF0IHRoZSBjdXJyZW50IGxvY2F0aW9uIGluIHRoZSBkb2N1bWVudC4gVGhpc1xuICogY29ycmVzcG9uZHMgdG8gYW4gb3BlbmluZyB0YWcgYW5kIGEgZWxlbWVudENsb3NlIHRhZyBpcyByZXF1aXJlZC4gVGhpcyBpc1xuICogbGlrZSBlbGVtZW50T3BlbiwgYnV0IHRoZSBhdHRyaWJ1dGVzIGFyZSBkZWZpbmVkIHVzaW5nIHRoZSBhdHRyIGZ1bmN0aW9uXG4gKiByYXRoZXIgdGhhbiBiZWluZyBwYXNzZWQgYXMgYXJndW1lbnRzLiBNdXN0IGJlIGZvbGxsb3dlZCBieSAwIG9yIG1vcmUgY2FsbHNcbiAqIHRvIGF0dHIsIHRoZW4gYSBjYWxsIHRvIGVsZW1lbnRPcGVuRW5kLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgZWxlbWVudCdzIHRhZy5cbiAqIEBwYXJhbSB7P3N0cmluZz19IGtleSBUaGUga2V5IHVzZWQgdG8gaWRlbnRpZnkgdGhpcyBlbGVtZW50LiBUaGlzIGNhbiBiZSBhblxuICogICAgIGVtcHR5IHN0cmluZywgYnV0IHBlcmZvcm1hbmNlIG1heSBiZSBiZXR0ZXIgaWYgYSB1bmlxdWUgdmFsdWUgaXMgdXNlZFxuICogICAgIHdoZW4gaXRlcmF0aW5nIG92ZXIgYW4gYXJyYXkgb2YgaXRlbXMuXG4gKiBAcGFyYW0gez9BcnJheTwqPj19IHN0YXRpY3MgQW4gYXJyYXkgb2YgYXR0cmlidXRlIG5hbWUvdmFsdWUgcGFpcnMgb2YgdGhlXG4gKiAgICAgc3RhdGljIGF0dHJpYnV0ZXMgZm9yIHRoZSBFbGVtZW50LiBUaGVzZSB3aWxsIG9ubHkgYmUgc2V0IG9uY2Ugd2hlbiB0aGVcbiAqICAgICBFbGVtZW50IGlzIGNyZWF0ZWQuXG4gKi9cbmNvbnN0IGVsZW1lbnRPcGVuU3RhcnQgPSBmdW5jdGlvbih0YWcsIGtleSwgc3RhdGljcykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGFzc2VydE5vdEluQXR0cmlidXRlcygnZWxlbWVudE9wZW5TdGFydCcpO1xuICAgIHNldEluQXR0cmlidXRlcyh0cnVlKTtcbiAgfVxuXG4gIGFyZ3NCdWlsZGVyWzBdID0gdGFnO1xuICBhcmdzQnVpbGRlclsxXSA9IGtleTtcbiAgYXJnc0J1aWxkZXJbMl0gPSBzdGF0aWNzO1xufTtcblxuXG4vKioqXG4gKiBEZWZpbmVzIGEgdmlydHVhbCBhdHRyaWJ1dGUgYXQgdGhpcyBwb2ludCBvZiB0aGUgRE9NLiBUaGlzIGlzIG9ubHkgdmFsaWRcbiAqIHdoZW4gY2FsbGVkIGJldHdlZW4gZWxlbWVudE9wZW5TdGFydCBhbmQgZWxlbWVudE9wZW5FbmQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqL1xuY29uc3QgYXR0ciA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgYXNzZXJ0SW5BdHRyaWJ1dGVzKCdhdHRyJyk7XG4gIH1cblxuICBhcmdzQnVpbGRlci5wdXNoKG5hbWUpO1xuICBhcmdzQnVpbGRlci5wdXNoKHZhbHVlKTtcbn07XG5cblxuLyoqXG4gKiBDbG9zZXMgYW4gb3BlbiB0YWcgc3RhcnRlZCB3aXRoIGVsZW1lbnRPcGVuU3RhcnQuXG4gKiBAcmV0dXJuIHshRWxlbWVudH0gVGhlIGNvcnJlc3BvbmRpbmcgRWxlbWVudC5cbiAqL1xuY29uc3QgZWxlbWVudE9wZW5FbmQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBhc3NlcnRJbkF0dHJpYnV0ZXMoJ2VsZW1lbnRPcGVuRW5kJyk7XG4gICAgc2V0SW5BdHRyaWJ1dGVzKGZhbHNlKTtcbiAgfVxuXG4gIGNvbnN0IG5vZGUgPSBlbGVtZW50T3Blbi5hcHBseShudWxsLCBhcmdzQnVpbGRlcik7XG4gIGFyZ3NCdWlsZGVyLmxlbmd0aCA9IDA7XG4gIHJldHVybiBub2RlO1xufTtcblxuXG4vKipcbiAqIENsb3NlcyBhbiBvcGVuIHZpcnR1YWwgRWxlbWVudC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBlbGVtZW50J3MgdGFnLlxuICogQHJldHVybiB7IUVsZW1lbnR9IFRoZSBjb3JyZXNwb25kaW5nIEVsZW1lbnQuXG4gKi9cbmNvbnN0IGVsZW1lbnRDbG9zZSA9IGZ1bmN0aW9uKHRhZykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGFzc2VydE5vdEluQXR0cmlidXRlcygnZWxlbWVudENsb3NlJyk7XG4gIH1cblxuICBjb25zdCBub2RlID0gY29yZUVsZW1lbnRDbG9zZSgpO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgYXNzZXJ0Q2xvc2VNYXRjaGVzT3BlblRhZyhnZXREYXRhKG5vZGUpLm5vZGVOYW1lLCB0YWcpO1xuICB9XG5cbiAgcmV0dXJuIG5vZGU7XG59O1xuXG5cbi8qKlxuICogRGVjbGFyZXMgYSB2aXJ0dWFsIEVsZW1lbnQgYXQgdGhlIGN1cnJlbnQgbG9jYXRpb24gaW4gdGhlIGRvY3VtZW50IHRoYXQgaGFzXG4gKiBubyBjaGlsZHJlbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGVsZW1lbnQncyB0YWcuXG4gKiBAcGFyYW0gez9zdHJpbmc9fSBrZXkgVGhlIGtleSB1c2VkIHRvIGlkZW50aWZ5IHRoaXMgZWxlbWVudC4gVGhpcyBjYW4gYmUgYW5cbiAqICAgICBlbXB0eSBzdHJpbmcsIGJ1dCBwZXJmb3JtYW5jZSBtYXkgYmUgYmV0dGVyIGlmIGEgdW5pcXVlIHZhbHVlIGlzIHVzZWRcbiAqICAgICB3aGVuIGl0ZXJhdGluZyBvdmVyIGFuIGFycmF5IG9mIGl0ZW1zLlxuICogQHBhcmFtIHs/QXJyYXk8Kj49fSBzdGF0aWNzIEFuIGFycmF5IG9mIGF0dHJpYnV0ZSBuYW1lL3ZhbHVlIHBhaXJzIG9mIHRoZVxuICogICAgIHN0YXRpYyBhdHRyaWJ1dGVzIGZvciB0aGUgRWxlbWVudC4gVGhlc2Ugd2lsbCBvbmx5IGJlIHNldCBvbmNlIHdoZW4gdGhlXG4gKiAgICAgRWxlbWVudCBpcyBjcmVhdGVkLlxuICogQHBhcmFtIHsuLi4qfSB2YXJfYXJncyBBdHRyaWJ1dGUgbmFtZS92YWx1ZSBwYWlycyBvZiB0aGUgZHluYW1pYyBhdHRyaWJ1dGVzXG4gKiAgICAgZm9yIHRoZSBFbGVtZW50LlxuICogQHJldHVybiB7IUVsZW1lbnR9IFRoZSBjb3JyZXNwb25kaW5nIEVsZW1lbnQuXG4gKi9cbmNvbnN0IGVsZW1lbnRWb2lkID0gZnVuY3Rpb24odGFnLCBrZXksIHN0YXRpY3MsIHZhcl9hcmdzKSB7XG4gIGVsZW1lbnRPcGVuLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gIHJldHVybiBlbGVtZW50Q2xvc2UodGFnKTtcbn07XG5cblxuLyoqXG4gKiBEZWNsYXJlcyBhIHZpcnR1YWwgVGV4dCBhdCB0aGlzIHBvaW50IGluIHRoZSBkb2N1bWVudC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ8Ym9vbGVhbn0gdmFsdWUgVGhlIHZhbHVlIG9mIHRoZSBUZXh0LlxuICogQHBhcmFtIHsuLi4oZnVuY3Rpb24oKHN0cmluZ3xudW1iZXJ8Ym9vbGVhbikpOnN0cmluZyl9IHZhcl9hcmdzXG4gKiAgICAgRnVuY3Rpb25zIHRvIGZvcm1hdCB0aGUgdmFsdWUgd2hpY2ggYXJlIGNhbGxlZCBvbmx5IHdoZW4gdGhlIHZhbHVlIGhhc1xuICogICAgIGNoYW5nZWQuXG4gKiBAcmV0dXJuIHshVGV4dH0gVGhlIGNvcnJlc3BvbmRpbmcgdGV4dCBub2RlLlxuICovXG5jb25zdCB0ZXh0ID0gZnVuY3Rpb24odmFsdWUsIHZhcl9hcmdzKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgYXNzZXJ0Tm90SW5BdHRyaWJ1dGVzKCd0ZXh0Jyk7XG4gICAgYXNzZXJ0Tm90SW5Ta2lwKCd0ZXh0Jyk7XG4gIH1cblxuICBjb25zdCBub2RlID0gY29yZVRleHQoKTtcbiAgY29uc3QgZGF0YSA9IGdldERhdGEobm9kZSk7XG5cbiAgaWYgKGRhdGEudGV4dCAhPT0gdmFsdWUpIHtcbiAgICBkYXRhLnRleHQgPSAvKiogQHR5cGUge3N0cmluZ30gKi8odmFsdWUpO1xuXG4gICAgbGV0IGZvcm1hdHRlZCA9IHZhbHVlO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAvKlxuICAgICAgICogQ2FsbCB0aGUgZm9ybWF0dGVyIGZ1bmN0aW9uIGRpcmVjdGx5IHRvIHByZXZlbnQgbGVha2luZyBhcmd1bWVudHMuXG4gICAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlL2luY3JlbWVudGFsLWRvbS9wdWxsLzIwNCNpc3N1ZWNvbW1lbnQtMTc4MjIzNTc0XG4gICAgICAgKi9cbiAgICAgIGNvbnN0IGZuID0gYXJndW1lbnRzW2ldO1xuICAgICAgZm9ybWF0dGVkID0gZm4oZm9ybWF0dGVkKTtcbiAgICB9XG5cbiAgICBub2RlLmRhdGEgPSBmb3JtYXR0ZWQ7XG4gIH1cblxuICByZXR1cm4gbm9kZTtcbn07XG5cblxuLyoqICovXG5leHBvcnQge1xuICBlbGVtZW50T3BlblN0YXJ0LFxuICBlbGVtZW50T3BlbkVuZCxcbiAgZWxlbWVudE9wZW4sXG4gIGVsZW1lbnRWb2lkLFxuICBlbGVtZW50Q2xvc2UsXG4gIHRleHQsXG4gIGF0dHJcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDE1IFRoZSBJbmNyZW1lbnRhbCBET00gQXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTLUlTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmV4cG9ydCB7XG4gIHBhdGNoSW5uZXIgYXMgcGF0Y2gsXG4gIHBhdGNoSW5uZXIsXG4gIHBhdGNoT3V0ZXIsXG4gIGN1cnJlbnRFbGVtZW50LFxuICBjdXJyZW50UG9pbnRlcixcbiAgc2tpcCxcbiAgc2tpcE5vZGVcbn0gZnJvbSAnLi9zcmMvY29yZSc7XG5leHBvcnQge1xuICBlbGVtZW50Vm9pZCxcbiAgZWxlbWVudE9wZW5TdGFydCxcbiAgZWxlbWVudE9wZW5FbmQsXG4gIGVsZW1lbnRPcGVuLFxuICBlbGVtZW50Q2xvc2UsXG4gIHRleHQsXG4gIGF0dHJcbn0gZnJvbSAnLi9zcmMvdmlydHVhbF9lbGVtZW50cyc7XG5leHBvcnQgeyBzeW1ib2xzIH0gZnJvbSAnLi9zcmMvc3ltYm9scyc7XG5leHBvcnQge1xuICBhdHRyaWJ1dGVzLFxuICBhcHBseUF0dHIsXG4gIGFwcGx5UHJvcFxufSBmcm9tICcuL3NyYy9hdHRyaWJ1dGVzJztcbmV4cG9ydCB7IG5vdGlmaWNhdGlvbnMgfSBmcm9tICcuL3NyYy9ub3RpZmljYXRpb25zJztcbmV4cG9ydCB7IGltcG9ydE5vZGUgfSBmcm9tICcuL3NyYy9ub2RlX2RhdGEnO1xuIiwiaW1wb3J0IHsgaXNPYmplY3QsIGlzRnVuY3Rpb24sIGlzQXJyYXksIERPTSB9IGZyb20gJ0BkbmFqcy9jb3JlL3NyYy9jb3JlLmpzJztcbmltcG9ydCB7XG4gICAgc2tpcCxcbiAgICB0ZXh0LFxuICAgIGF0dHIsXG4gICAgZWxlbWVudENsb3NlLFxuICAgIGVsZW1lbnRPcGVuU3RhcnQsXG4gICAgZWxlbWVudE9wZW5FbmQsXG4gICAgcGF0Y2ggYXMgb3JpZ2luYWxQYXRjaCxcbn0gZnJvbSAnaW5jcmVtZW50YWwtZG9tL2luZGV4LmpzJztcblxuZnVuY3Rpb24gaGFuZGxlQ2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihjaGlsZCkpIHtcbiAgICAgICAgICAgIGNoaWxkKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShjaGlsZCkpIHtcbiAgICAgICAgICAgIGhhbmRsZUNoaWxkcmVuKGNoaWxkKTtcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZCkge1xuICAgICAgICAgICAgdGV4dChjaGlsZCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gaW50ZXJwb2xhdGUodGVtcGxhdGUsIGRhdGEpIHtcbiAgICBpZiAoaXNGdW5jdGlvbih0ZW1wbGF0ZSkpIHtcbiAgICAgICAgbGV0IHJlcyA9IHRlbXBsYXRlLmNhbGwodGhpcywgZGF0YSk7XG4gICAgICAgIGludGVycG9sYXRlLmNhbGwodGhpcywgcmVzKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkodGVtcGxhdGUpKSB7XG4gICAgICAgIHRlbXBsYXRlLmZvckVhY2goKGNodW5rKSA9PiB7XG4gICAgICAgICAgICBpbnRlcnBvbGF0ZS5jYWxsKHRoaXMsIGNodW5rKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBoKGVsZW1lbnQsIHByb3BzLCAuLi5jaGlsZHJlbikge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGVsZW1lbnRPcGVuU3RhcnQoZWxlbWVudCk7XG5cbiAgICAgICAgaWYgKCFpc09iamVjdChwcm9wcykpIHtcbiAgICAgICAgICAgIGlmIChwcm9wcykge1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuLnVuc2hpZnQocHJvcHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvcHMgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGsgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgIGF0dHIoaywgcHJvcHNba10pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgbm9kZSA9IGVsZW1lbnRPcGVuRW5kKGVsZW1lbnQpO1xuICAgICAgICBjb25zdCBpc0NvbXBvbmVudCA9IERPTS5nZXRDb21wb25lbnQobm9kZSk7XG5cbiAgICAgICAgaWYgKGlzQ29tcG9uZW50KSB7XG4gICAgICAgICAgICBza2lwKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoYW5kbGVDaGlsZHJlbihjaGlsZHJlbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudENsb3NlKGVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF0Y2goc2NvcGUsIGZuLCBkYXRhKSB7XG4gICAgcmV0dXJuIG9yaWdpbmFsUGF0Y2goc2NvcGUsIGludGVycG9sYXRlLmJpbmQodGhpcywgZm4sIGRhdGEpKTtcbn1cblxuZXhwb3J0IHsgdGV4dCB9O1xuIiwiaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJ0BkbmFqcy9jb3JlL3NyYy9jb3JlLmpzJztcbmltcG9ydCB7IHBhdGNoIH0gZnJvbSAnLi4vbGliL2lkb20uanMnO1xuXG5leHBvcnQgY29uc3QgSURPTVRlbXBsYXRlTWl4aW4gPSAoc3VwZXJDbGFzcykgPT4gY2xhc3MgZXh0ZW5kcyBzdXBlckNsYXNzIHtcbiAgICByZW5kZXIodGVtcGxhdGUpIHtcbiAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZSB8fCB0aGlzLnRlbXBsYXRlO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih0ZW1wbGF0ZSkpIHtcbiAgICAgICAgICAgIGxldCB0cGwgPSB0ZW1wbGF0ZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGVtcGxhdGUgPSAoKSA9PiBwYXRjaCh0aGlzLCB0cGwpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLnJlbmRlcih0ZW1wbGF0ZSk7XG4gICAgfVxufTtcbiIsIi8qKlxuICogRE5BXG4gKiAoYykgMjAxNS0yMDE2IENoaWFsYWIgKGh0dHA6Ly93d3cuY2hpYWxhYi5jb20pIDxkZXZAY2hpYWxhYi5pbz5cbiAqIGh0dHA6Ly9kbmEuY2hpYWxhYi5pb1xuICpcbiAqIEp1c3QgYW5vdGhlciBjb21wb25lbnRzIHBhdHRlcm4uXG4gKiBVc2Ugd2l0aCBDdXN0b20gRWxlbWVudHMgc3BlY3MuXG4gKi9cbmltcG9ydCB7IG1peCwgcHJvcCwgc2hpbSwgRE9NLCBNSVhJTlMgfSBmcm9tICcuL3NyYy9jb3JlLmpzJztcbmltcG9ydCB7IHJlZ2lzdHJ5IH0gZnJvbSAnLi9zcmMvbGliL3JlZ2lzdHJ5LmpzJztcblxuLyoqXG4gKiBAbmFtZXNwYWNlIEROQVxuICovXG5leHBvcnQgeyBtaXgsIHByb3AsIHNoaW0sIERPTSwgTUlYSU5TIH07XG5leHBvcnQgeyByZWdpc3RyeSB9O1xuXG4vKipcbiAqIFJlZ2lzdGVyIGEgbmV3IGNvbXBvbmVudC5cbiAqIEBtZXRob2QgZGVmaW5lXG4gKiBAbWVtYmVyb2YhIEROQS5cbiAqIEBzdGF0aWNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgaWQgb2YgdGhlIGNvbXBvbmVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IEN0ciBUaGUgY29tcG9uZW50IGNvbnN0cnVjdG9yLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBPcHRpb25hbCBjb21wb25lbnQgY29uZmlndXJhdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZSh0YWdOYW1lLCBDb21wb25lbnQsIGNvbmZpZykge1xuICAgIHJldHVybiByZWdpc3RyeS5kZWZpbmUodGFnTmFtZSwgQ29tcG9uZW50LCBjb25maWcpO1xufVxuLyoqXG4gKiBDcmVhdGUgYW5kIGFwcGVuZCBhIG5ldyBjb21wb25lbnQgaW5zdGFuY2UuXG4gKiBAbWV0aG9kIHJlbmRlclxuICogQG1lbWJlcm9mISBETkEuXG4gKiBAc3RhdGljXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gbm9kZSBUaGUgcGFyZW50IG5vZGUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBDb21wb25lbnQgVGhlIGNvbXBvbmVudCBjb25zdHJ1Y3Rvci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBPcHRpb25hbCBzZXQgb2YgcHJvcGVydGllcyB0byBzZXQgdG8gdGhlIGNvbXBvbmVudC5cbiAqIEByZXR1cm4ge0hUTUxFbGVtZW50fSBUaGUgbmV3IGNvbXBvbmVudCBpbnN0YW5jZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcihub2RlLCBDb21wb25lbnQsIHByb3BzKSB7XG4gICAgbGV0IGVsZW1lbnQgPSBuZXcgQ29tcG9uZW50KCk7XG4gICAgZm9yIChsZXQgayBpbiBwcm9wcykge1xuICAgICAgICBlbGVtZW50W2tdID0gcHJvcHNba107XG4gICAgfVxuICAgIERPTS5hcHBlbmRDaGlsZChub2RlLCBlbGVtZW50KTtcbiAgICByZXR1cm4gZWxlbWVudDtcbn1cblxuLyoqXG4gKiBTaW1wbGUgQ3VzdG9tIENvbXBvbmVudCB3aXRoIHNvbWUgYmVoYXZpb3JzLlxuICogQGNsYXNzIEJhc2VDb21wb25lbnRcbiAqIEBleHRlbmRzIEhUTUxFbGVtZW50XG4gKiBAbWVtYmVyb2YgRE5BLlxuICogQHN0YXRpY1xuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogLy8gbXktY29tcG9uZW50LmpzXG4gKiBpbXBvcnQgeyBCYXNlQ29tcG9uZW50IH0gZnJvbSAnQGRuYWpzL2NvcmUnO1xuICogZXhwb3J0IGNsYXNzIE15Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gKiAgIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICogICAgIHJldHVybiBbJy4uLicsICcuLi4nXTtcbiAqICAgfVxuICogICBnZXQgY3NzKCkge1xuICogICAgIHJldHVybiAnLi4uJztcbiAqICAgfVxuICogICBnZXQgZXZlbnRzKCkge1xuICogICAgIHJldHVybiB7XG4gKiAgICAgICAnLi4uJzogJy4uLidcbiAqICAgICB9O1xuICogICB9XG4gKiAgIGdldCB0ZW1wbGF0ZSgpIHtcbiAqICAgICByZXR1cm4gJy4uLic7XG4gKiAgIH1cbiAqICAgZ2V0IHByb3BlcnRpZXMoKSB7XG4gKiAgICAgcmV0dXJuIHsgLi4uIH07XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgQmFzZUNvbXBvbmVudCBleHRlbmRzIG1peChcbiAgICBzaGltKHNlbGYuSFRNTEVsZW1lbnQpXG4pLndpdGgoXG4gICAgTUlYSU5TLkNvbXBvbmVudE1peGluLFxuICAgIE1JWElOUy5Qcm9wZXJ0aWVzTWl4aW4sXG4gICAgTUlYSU5TLlN0eWxlTWl4aW4sXG4gICAgTUlYSU5TLkV2ZW50c01peGluLFxuICAgIE1JWElOUy5UZW1wbGF0ZU1peGluXG4pIHt9XG4iLCIvKipcbiAqIEROQVxuICogKGMpIDIwMTUtMjAxNiBDaGlhbGFiIChodHRwOi8vd3d3LmNoaWFsYWIuY29tKSA8ZGV2QGNoaWFsYWIuaW8+XG4gKiBodHRwOi8vZG5hLmNoaWFsYWIuaW9cbiAqXG4gKiBKdXN0IGFub3RoZXIgY29tcG9uZW50cyBwYXR0ZXJuIHdpdGggSW5jcmVtZW50YWxET00gdGVtcGxhdGVzLlxuICovXG5pbXBvcnQgKiBhcyBJRE9NIGZyb20gJy4vc3JjL2xpYi9pZG9tLmpzJztcbmltcG9ydCB7IElET01UZW1wbGF0ZU1peGluIH0gZnJvbSAnLi9zcmMvbWl4aW5zL2lkb20uanMnO1xuaW1wb3J0IHsgbWl4LCBwcm9wLCBzaGltLCBET00sIE1JWElOUyB9IGZyb20gJ0BkbmFqcy9jb3JlL3NyYy9jb3JlLmpzJztcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgYXMgT3JpZ2luYWxDb21wb25lbnQgfSBmcm9tICdAZG5hanMvY29yZSc7XG5cbk1JWElOUy5JRE9NVGVtcGxhdGVNaXhpbiA9IElET01UZW1wbGF0ZU1peGluO1xuXG5leHBvcnQgeyBtaXgsIHByb3AsIHNoaW0sIERPTSwgTUlYSU5TIH07XG5leHBvcnQgeyByZWdpc3RyeSwgcmVuZGVyLCBkZWZpbmUgfSBmcm9tICdAZG5hanMvY29yZSc7XG5leHBvcnQgeyBJRE9NIH07XG5leHBvcnQgY2xhc3MgQmFzZUNvbXBvbmVudCBleHRlbmRzIG1peChPcmlnaW5hbENvbXBvbmVudCkud2l0aChJRE9NVGVtcGxhdGVNaXhpbikge31cbiIsImltcG9ydCB7IHN5bWJvbHMsIGF0dHJpYnV0ZXMsIG5vdGlmaWNhdGlvbnMgfSBmcm9tICdpbmNyZW1lbnRhbC1kb20vaW5kZXguanMnO1xuaW1wb3J0IHsgRE9NIH0gZnJvbSAnQGRuYWpzL2NvcmUvc3JjL2NvcmUuanMnO1xuXG5sZXQgX2NyZWF0ZWQgPSBub3RpZmljYXRpb25zLm5vZGVzQ3JlYXRlZDtcbmxldCBfcmVtb3ZlZCA9IG5vdGlmaWNhdGlvbnMubm9kZXNEZWxldGVkO1xubGV0IF9jaGFuZ2VkID0gYXR0cmlidXRlc1tzeW1ib2xzLmRlZmF1bHRdO1xuXG5ub3RpZmljYXRpb25zLm5vZGVzQ3JlYXRlZCA9IGZ1bmN0aW9uKG5vZGVzKSB7XG4gICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAoIURPTS5pc0NvbXBvbmVudChub2RlKSkge1xuICAgICAgICAgICAgaWYgKERPTS5iaW5kKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgRE9NLmNvbm5lY3Qobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAoX2NyZWF0ZWQpIHtcbiAgICAgICAgX2NyZWF0ZWQobm9kZXMpO1xuICAgIH1cbn07XG5cbm5vdGlmaWNhdGlvbnMubm9kZXNEZWxldGVkID0gZnVuY3Rpb24obm9kZXMpIHtcbiAgICBub2Rlcy5mb3JFYWNoKChub2RlKSA9PiBET00uZGlzY29ubmVjdChub2RlKSk7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKF9yZW1vdmVkKSB7XG4gICAgICAgIF9yZW1vdmVkKG5vZGVzKTtcbiAgICB9XG59O1xuXG5hdHRyaWJ1dGVzW3N5bWJvbHMuZGVmYXVsdF0gPSBmdW5jdGlvbihub2RlLCBhdHRyTmFtZSwgYXR0clZhbHVlKSB7XG4gICAgbGV0IG9sZFZhbHVlID0gbm9kZS5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChfY2hhbmdlZCkge1xuICAgICAgICBfY2hhbmdlZChub2RlLCBhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICB9XG4gICAgaWYgKERPTS5pc0NvbXBvbmVudChub2RlKSkge1xuICAgICAgICBsZXQgYXR0cnMgPSBub2RlLmNvbnN0cnVjdG9yLm9ic2VydmVkQXR0cmlidXRlcyB8fCBbXTtcbiAgICAgICAgaWYgKGF0dHJzLmluZGV4T2YoYXR0ck5hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgYXR0clZhbHVlID0gKGF0dHJWYWx1ZSA9PT0gdW5kZWZpbmVkKSA/IG51bGwgOiBhdHRyVmFsdWU7XG4gICAgICAgICAgICBET00udXBkYXRlKG5vZGUsIGF0dHJOYW1lLCBvbGRWYWx1ZSwgYXR0clZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iXSwibmFtZXMiOlsiaXNGdW5jdGlvbiIsIm9iaiIsImlzU3RyaW5nIiwiaXNPYmplY3QiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJpc1VuZGVmaW5lZCIsImlzQXJyYXkiLCJBcnJheSIsInJlZ2lzdHJ5IiwibmFtZSIsIkN0ciIsImNvbmZpZyIsImNvbXBvbmVudHMiLCJ0b0xvd2VyQ2FzZSIsImsiLCJkZXNjIiwiZ2V0RGVzY3JpcHRvciIsIkNPTVBPTkVOVF9TWU1CT0wiLCJDT05ORUNURUQiLCJESVNDT05ORUNURUQiLCJVUERBVEVEIiwiZ2V0Q29tcG9uZW50IiwiZWxlbWVudCIsImZ1bGwiLCJub2RlIiwibm9kZVR5cGUiLCJOb2RlIiwiRUxFTUVOVF9OT0RFIiwiZ2V0QXR0cmlidXRlIiwidGFnTmFtZSIsImdldCIsImlzQ29tcG9uZW50IiwiY29ubmVjdCIsImRpc2Nvbm5lY3QiLCJ1cGRhdGUiLCJvbGRWYWx1ZSIsIm5ld1ZhbHVlIiwiYmluZCIsIl9fcHJvdG9fXyIsImRlZmluZVByb3BlcnR5IiwiY3JlYXRlRWxlbWVudCIsImlzIiwiYXBwZW5kQ2hpbGQiLCJwYXJlbnQiLCJwYXJlbnROb2RlIiwibGFzdEVsZW1lbnRDaGlsZCIsInJlbW92ZUNoaWxkIiwiaW5zZXJ0QmVmb3JlIiwicmVmTm9kZSIsIm5leHRTaWJsaW5nIiwicmVwbGFjZUNoaWxkIiwic2V0QXR0cmlidXRlIiwidmFsdWUiLCJhdHRycyIsImNvbnN0cnVjdG9yIiwib2JzZXJ2ZWRBdHRyaWJ1dGVzIiwiaW5kZXhPZiIsInJlbW92ZUF0dHJpYnV0ZSIsIkNvbXBvbmVudE1peGluIiwiU3VwZXJDbGFzcyIsImNvbm5lY3RlZENhbGxiYWNrIiwiZGlzY29ubmVjdGVkQ2FsbGJhY2siLCJhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2siLCJsb2NhbE5hbWUiLCJDdXN0b21FdmVudCIsImV2Iiwic2VsZiIsImV4IiwiZXZlbnQiLCJwYXJhbXMiLCJ1bmRlZmluZWQiLCJldnQiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEN1c3RvbUV2ZW50IiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJkZXRhaWwiLCJkaXNwYXRjaCIsImV2TmFtZSIsImRhdGEiLCJUeXBlRXJyb3IiLCJkaXNwYXRjaEV2ZW50IiwiZGVmaW5lIiwiUHJvcGVydHkiLCJjdHJzIiwiXyIsInZhbGlkYXRvciIsIl9zZXR0ZXIiLCJ2YWwiLCJnZXR0ZXJGbiIsInNldHRlckZuIiwidmFsaWRhdGVUeXBlIiwiY2hhbmdlZCIsInNjb3BlIiwib2JzZXJ2ZSIsImNhbGxiYWNrIiwicHVzaCIsInVub2JzZXJ2ZSIsImlvIiwic3BsaWNlIiwiaSIsImxlbiIsImxlbmd0aCIsImNsYiIsImFjY2VwdHMiLCJuYW1lZCIsImF0dHJSZXF1ZXN0ZWQiLCJhdHRyTmFtZSIsImRlZmF1bHQiLCJpbml0VmFsdWUiLCJkZWZhdWx0VmFsdWUiLCJmcmVlemUiLCJhdHRyaWJ1dGUiLCJldmVudE5hbWUiLCJnZXR0ZXIiLCJzZXR0ZXIiLCJ2YWxpZGF0ZSIsImluaXQiLCJwcm9wIiwiU3RyaW5nIiwiQm9vbGVhbiIsIk51bWJlciIsImdldFZhbHVlIiwicHJvcGVydHkiLCJhdHRyVmFsIiwiSlNPTiIsInBhcnNlIiwiY29udGV4dCIsImF0dHIiLCJjdXJyZW50QXR0clZhbHVlIiwiUHJvcGVydGllc01peGluIiwicHJvcHMiLCJwcm9wZXJ0aWVzIiwicmVkdWNlIiwicmVzIiwicGFydGlhbFByb3BzIiwib2JzZXJ2ZWQiLCJoYXNBdHRyaWJ1dGUiLCJvbGRWYWwiLCJuZXdWYWwiLCJvYnNlcnZlUHJvcGVydHkiLCJwcm9wTmFtZSIsInVub2JzZXJ2ZVByb3BlcnR5IiwiRUxFTV9QUk9UTyIsIkVsZW1lbnQiLCJtYXRjaGVzIiwibWF0Y2hlc1NlbGVjdG9yIiwibW96TWF0Y2hlc1NlbGVjdG9yIiwibXNNYXRjaGVzU2VsZWN0b3IiLCJvTWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwiU1BMSVRfU0VMRUNUT1IiLCJFdmVudHNNaXhpbiIsImV2ZW50cyIsInJ1bGUiLCJtYXRjaCIsInNlbGVjdG9yIiwidHJpbSIsImRlbGVnYXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRhcmdldCIsInRyaWdnZXIiLCJyb290RG9jIiwiY3JlYXRlU3R5bGUiLCJkb2MiLCJvd25lckRvY3VtZW50Iiwic3R5bGVFbGVtIiwidHlwZSIsImhlYWQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsIlN0eWxlTWl4aW4iLCJ1cGRhdGVDU1MiLCJjbGFzc0xpc3QiLCJhZGQiLCJzdHlsZSIsImNzcyIsInRleHRDb250ZW50IiwiVGVtcGxhdGVNaXhpbiIsImF1dG9SZW5kZXIiLCJ0ZW1wbGF0ZSIsInJlbmRlciIsInRwbCIsImlubmVySFRNTCIsInQiLCJhcmd1bWVudHMiLCJNaXhpbiIsInN1cGVyY2xhc3MiLCJ3aXRoIiwiYXJncyIsInNsaWNlIiwiYyIsIm1peGluIiwibWl4Iiwic3VwZXJDbGFzcyIsImlzTmV3Iiwib3V0ZXJIVE1MIiwic2hpbSIsIk9yaWdpbmFsIiwiUG9seWZpbGxlZCIsImV4dGVuZHMiLCJjcmVhdGUiLCJET00iLCJET01fSEVMUEVSUyIsIk1JWElOUyIsImhhc093blByb3BlcnR5IiwiQmxhbmsiLCJoYXMiLCJtYXAiLCJjcmVhdGVNYXAiLCJOb2RlRGF0YSIsIm5vZGVOYW1lIiwia2V5IiwiYXR0cnNBcnIiLCJuZXdBdHRycyIsInN0YXRpY3NBcHBsaWVkIiwia2V5TWFwIiwia2V5TWFwVmFsaWQiLCJmb2N1c2VkIiwidGV4dCIsImluaXREYXRhIiwiZ2V0RGF0YSIsImltcG9ydE5vZGUiLCJpc0VsZW1lbnQiLCJhdHRyaWJ1dGVzIiwiY2hpbGQiLCJmaXJzdENoaWxkIiwiZ2V0TmFtZXNwYWNlRm9yVGFnIiwidGFnIiwibmFtZXNwYWNlVVJJIiwibmFtZXNwYWNlIiwiZWwiLCJjcmVhdGVFbGVtZW50TlMiLCJjcmVhdGVUZXh0IiwiY3JlYXRlVGV4dE5vZGUiLCJub3RpZmljYXRpb25zIiwiQ29udGV4dCIsImNyZWF0ZWQiLCJub2Rlc0NyZWF0ZWQiLCJkZWxldGVkIiwibm9kZXNEZWxldGVkIiwibWFya0NyZWF0ZWQiLCJtYXJrRGVsZXRlZCIsIm5vdGlmeUNoYW5nZXMiLCJpbkF0dHJpYnV0ZXMiLCJpblNraXAiLCJhc3NlcnROb1VuY2xvc2VkVGFncyIsIm9wZW5FbGVtZW50Iiwicm9vdCIsImN1cnJlbnRFbGVtZW50Iiwib3BlblRhZ3MiLCJFcnJvciIsImpvaW4iLCJhc3NlcnROb3RJbkF0dHJpYnV0ZXMiLCJmdW5jdGlvbk5hbWUiLCJhc3NlcnROb3RJblNraXAiLCJhc3NlcnRJbkF0dHJpYnV0ZXMiLCJhc3NlcnRWaXJ0dWFsQXR0cmlidXRlc0Nsb3NlZCIsImFzc2VydENsb3NlTWF0Y2hlc09wZW5UYWciLCJhc3NlcnROb0NoaWxkcmVuRGVjbGFyZWRZZXQiLCJwcmV2aW91c05vZGUiLCJhc3NlcnRQYXRjaEVsZW1lbnROb0V4dHJhcyIsInN0YXJ0Tm9kZSIsImN1cnJlbnROb2RlIiwiZXhwZWN0ZWROZXh0Tm9kZSIsImV4cGVjdGVkUHJldk5vZGUiLCJ3YXNVcGRhdGVkIiwicHJldmlvdXNTaWJsaW5nIiwid2FzQ2hhbmdlZCIsIndhc1JlbW92ZWQiLCJzZXRJbkF0dHJpYnV0ZXMiLCJwcmV2aW91cyIsInNldEluU2tpcCIsImlzRG9jdW1lbnRSb290IiwiRG9jdW1lbnQiLCJEb2N1bWVudEZyYWdtZW50IiwiZ2V0QW5jZXN0cnkiLCJhbmNlc3RyeSIsImN1ciIsImdldFJvb3QiLCJwcmV2IiwiZ2V0QWN0aXZlRWxlbWVudCIsImFjdGl2ZUVsZW1lbnQiLCJnZXRGb2N1c2VkUGF0aCIsImNvbnRhaW5zIiwibW92ZUJlZm9yZSIsInJlZmVyZW5jZU5vZGUiLCJpbnNlcnRSZWZlcmVuY2VOb2RlIiwibmV4dCIsImN1cnJlbnRQYXJlbnQiLCJtYXJrRm9jdXNlZCIsImZvY3VzUGF0aCIsInBhdGNoRmFjdG9yeSIsInJ1biIsImYiLCJmbiIsInByZXZDb250ZXh0IiwicHJldkRvYyIsInByZXZDdXJyZW50Tm9kZSIsInByZXZDdXJyZW50UGFyZW50IiwicHJldmlvdXNJbkF0dHJpYnV0ZXMiLCJwcmV2aW91c0luU2tpcCIsInJldFZhbCIsInBhdGNoSW5uZXIiLCJtYXRjaE5vZGUiLCJhbGlnbldpdGhET00iLCJwYXJlbnREYXRhIiwiY3VycmVudE5vZGVEYXRhIiwia2V5Tm9kZSIsImNsZWFyVW52aXNpdGVkRE9NIiwibGFzdENoaWxkIiwiZW50ZXJOb2RlIiwiZ2V0TmV4dE5vZGUiLCJuZXh0Tm9kZSIsImV4aXROb2RlIiwiZWxlbWVudE9wZW4iLCJlbGVtZW50Q2xvc2UiLCJza2lwIiwic3ltYm9scyIsImdldE5hbWVzcGFjZSIsImxhc3RJbmRleE9mIiwiYXBwbHlBdHRyIiwiYXR0ck5TIiwic2V0QXR0cmlidXRlTlMiLCJhcHBseVByb3AiLCJzZXRTdHlsZVZhbHVlIiwic2V0UHJvcGVydHkiLCJhcHBseVN0eWxlIiwiY3NzVGV4dCIsImVsU3R5bGUiLCJhcHBseUF0dHJpYnV0ZVR5cGVkIiwidXBkYXRlQXR0cmlidXRlIiwibXV0YXRvciIsIkFUVFJJQlVURVNfT0ZGU0VUIiwiYXJnc0J1aWxkZXIiLCJzdGF0aWNzIiwidmFyX2FyZ3MiLCJjb3JlRWxlbWVudE9wZW4iLCJqIiwiZWxlbWVudE9wZW5TdGFydCIsImVsZW1lbnRPcGVuRW5kIiwiYXBwbHkiLCJjb3JlRWxlbWVudENsb3NlIiwiY29yZVRleHQiLCJmb3JtYXR0ZWQiLCJoYW5kbGVDaGlsZHJlbiIsImNoaWxkcmVuIiwiZm9yRWFjaCIsImludGVycG9sYXRlIiwiY2h1bmsiLCJoIiwidW5zaGlmdCIsInBhdGNoIiwib3JpZ2luYWxQYXRjaCIsIklET01UZW1wbGF0ZU1peGluIiwiQ29tcG9uZW50IiwiQmFzZUNvbXBvbmVudCIsIkhUTUxFbGVtZW50IiwiT3JpZ2luYWxDb21wb25lbnQiLCJfY3JlYXRlZCIsIl9yZW1vdmVkIiwiX2NoYW5nZWQiLCJub2RlcyIsImF0dHJWYWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7OztBQVNBLEFBQU8sU0FB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