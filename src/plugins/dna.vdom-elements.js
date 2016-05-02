import { DNAVDomBaseComponent } from '../extra/dna-vdom-base-component.js';
import { create as _create } from '../dna-helper.js';
import { register as _register } from './dna.elements.js';

export * from '../dna.js';
export * from '../extra/dna-vdom-component.js';
export { DNAVDomBaseComponent };

export const register = _register;

/**
 * Create and register a Custom Element.
 * @param {string} tagName The tag to use for the custom element. (required)
 * @param {object} config A configuration object. (`prototype` key is required)
 * @return {function} The Component constructor.
 */
export function create(fn, options = {}) {
    return _create(fn, options, {
        base: DNAVDomBaseComponent,
        register: _register,
    });
}
