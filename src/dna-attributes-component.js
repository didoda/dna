import { DNAComponent } from './dna-component.js';
import {
    dashToCamel,
    camelToDash,
    getDescriptor,
    wrapDescriptorGet,
    wrapDescriptorSet,
} from './dna-helper.js';

function setValue(context, attr, value) {
    let currentAttrValue = context.getAttribute(attr);
    if (value !== null && value !== undefined && value !== false) {
        if (
            (typeof value === 'string' || typeof value === 'number')
            && currentAttrValue !== value) {
            context.setAttribute(attr, value);
        } else if (typeof value === 'boolean' && currentAttrValue !== '') {
            context.setAttribute(attr, '');
        }
    } else if (currentAttrValue || currentAttrValue === '') {
        context.removeAttribute(attr);
    }
}

/**
 * Simple Custom Component with attributes watching and reflecting.
 * @class DNAAttributesComponent
 * @extends DNAComponent
 *
 * @example
 * my-component.js
 * ```js
 * import { DNAAttributesComponent } from 'dna/component';
 * export class MyComponent extends DNAAttributesComponent {
 *   get attributes() {
 *     return ['name'];
 *   }
 * }
 * ```
 * app.js
 * ```js
 * import { Register } from 'dna/component';
 * import { MyComponent } from './components/my-component/my-component.js';
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
    static onRegister() {
        let attributesToWatch = this.attributes || [];
        this.__normalizedAttributes = attributesToWatch.map((attr) => {
            let camelAttr = dashToCamel(attr);
            let descriptor = getDescriptor(this.prototype, camelAttr) || {};
            Object.defineProperty(this.prototype, camelAttr, {
                configurable: true,
                get: wrapDescriptorGet(camelAttr, descriptor),
                set: wrapDescriptorSet(camelAttr, descriptor, function(prop, res) {
                    let dashed = camelToDash(prop);
                    setValue(this, dashed, res);
                }),
            });
            return camelAttr;
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
            this.attributeChangedCallback(attr.name, undefined, attr.value);
        }
        let ctrAttributes = this.constructor.__normalizedAttributes || [];
        ctrAttributes.forEach((attr) => {
            setValue(this, camelToDash(attr), this[attr]);
        });
    }
    /**
     * On `attributeChanged` callback, sync attributes with properties.
     * @param {String} attrName The changed attribute name.
     * @param {*} oldVal The value of the attribute before the change.
     * @param {*} newVal The value of the attribute after the change.
     */
    attributeChangedCallback(attr, oldVal, newVal) {
        super.attributeChangedCallback(attr, oldVal, newVal);
        let ctr = this.constructor;
        let attrs = ctr && ctr.__normalizedAttributes;
        if (attrs && Array.isArray(attrs)) {
            let camelAttr = dashToCamel(attr);
            if (attrs.indexOf(camelAttr) !== -1) {
                if (newVal === '') {
                    newVal = true;
                }
                if (newVal !== this[camelAttr]) {
                    this[camelAttr] = newVal;
                }
            }
        }
    }
}
