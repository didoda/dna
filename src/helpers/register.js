import { registry } from './registry.js';
import { digest } from './digest.js';
import { wrapPrototype } from './wrap-prototype.js';

/**
 * Create the Component constructor.
 * @param {Function|String} tagName The definition or the tag name of the Component.
 * @param {Object} options A set of options for the registration of the Component.
 * @return {Function} The Component constructor.
 */
export function register(fn, options = {}) {
    let pre = digest(fn, options);
    let scope = pre.scope;
    let tagName = pre.tagName;
    let config = pre.config;
    registry(tagName, scope);
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
    return res;
}
