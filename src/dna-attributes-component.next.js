'use strict';

import { DNAComponent } from './dna-component.next.js';

/**
 * Simple Custom Component with attributes watching and reflecting.
 * @class DNAAttributesComponent
 * @extends DNAComponent
 *
 * @example
 * my-component.next.js
 * ```js
 * import { DNAAttributesComponent } from 'dna/component';
 * export class MyComponent extends DNAAttributesComponent {
 *   get attributes() {
 *     return ['name'];
 *   }
 * }
 * ```
 * app.next.js
 * ```js
 * import { Register } from 'dna/component';
 * import { MyComponent } from './components/my-component/my-component.next.js';
 * var MyElement = Register(MyComponent);
 * var element = new MyElement();
 * element.setAttribute('name', 'Newton');
 * console.log(element.name); // logs "Newton"
 * ```
 */
export class DNAAttributesComponent extends DNAComponent {
    /**
     * Fires when an the element is registered.
     */
    static onRegister(...args) {
        let attributesToWatch = this.attributes || [];
        this.normalizedAttributes = attributesToWatch.map((attr) => {
            attr = dashToCamel(attr);
            let descriptor = getDescriptor(this.prototype, attr) || {};
            Object.defineProperty(this.prototype, attr, {
                configurable: true,
                get: wrapDescriptorGet(attr, descriptor),
                set: wrapDescriptorSet(attr, descriptor)
            });
            return attr;
        });
    }
    /**
     * On `created` callback, sync attributes with properties.
     */
    createdCallback() {
        super.createdCallback();
        let attributes = this.attributes || [];
        for (let i = 0, len = attributes.length; i < len; i++) {
            let attr = attributes[i];
            if (attr.value == '') {
                // boolean attributes
                if (this.getAttribute(attr.name) !== null) {
                    this.attributeChangedCallback(attr.name, undefined, true);
                }
                continue;
            }
            this.attributeChangedCallback(attr.name, undefined, attr.value);
        }
        let ctrAttributes = this.constructor.normalizedAttributes || [];
        ctrAttributes.forEach((attr) => {
            if (this[attr] !== null && this[attr] !== undefined && this[attr] !== false) {
                this.setAttribute(camelToDash(attr), this[attr]);
            }
        });
    }
    /**
     * On `attributeChanged` callback, sync attributes with properties.
     * @private
     * @param {String} attrName The changed attribute name.
     * @param {*} oldVal The value of the attribute before the change.
     * @param {*} newVal The value of the attribute after the change.
     */
    attributeChangedCallback(attr, oldVal, newVal) {
        super.attributeChangedCallback(attr, oldVal, newVal);
        let cl = this.constructor;
        if (cl && cl.normalizedAttributes && Array.isArray(cl.normalizedAttributes)) {
            attr = dashToCamel(attr);
            if (cl.normalizedAttributes.indexOf(attr) !== -1) {
                this[attr] = newVal;
            }
        }
    }
}

function getDescriptor(ctr, attr) {
    let res;
    if (ctr) {
        res = Object.getOwnPropertyDescriptor(ctr, attr);
        if (!res && ctr.__proto__) {
            res = getDescriptor(ctr.__proto__, attr);
        }
    }
    return res;
}

function wrapDescriptorSet(attr, descriptor) {
    if (descriptor && descriptor.set && descriptor.set.wrapped) {
        return descriptor.set;
    }
    let setter = function(value) {
        if (descriptor.set) {
            try {
                descriptor.set.call(this, value);
            } catch(ex) {
                this['__' + attr] = value;
            }
        } else {
            this['__' + attr] = value;
        }
        let res = this[attr];
        let dashed = camelToDash(attr);
        if (res !== null && res !== undefined && res !== false) {
            if ((typeof res == 'string' || typeof res == 'number') && this.getAttribute(attr) !== res) {
                this.setAttribute(dashed, res);
            } else if (typeof res == 'boolean') {
                this.setAttribute(dashed, dashed);
            }
        } else if (this.getAttribute(dashed)) {
            this.removeAttribute(dashed);
        }
        return res;
    }
    setter.wrapped = true;
    return setter;
}

function wrapDescriptorGet(attr, descriptor) {
    return function() {
        let res;
        if (typeof descriptor.get === 'function') {
            try {
                res = descriptor.get.call(this);
            } catch(ex) {
                res = this['__' + attr];
            }
        } else {
            res = this['__' + attr];
        }
        return res;
    }
}

function camelToDash(str) {
    return str.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
}

function dashToCamel(str) {
    return str.replace(/\W+(.)/g, function (x, chr) {
        return chr.toUpperCase();
    });
}
