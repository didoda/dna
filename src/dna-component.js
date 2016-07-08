import { polyfillElement } from './helpers/polyfill-element.js';

polyfillElement('HTMLElement');

/**
 * This is the model to use to create DNA Custom Components.
 * @class DNAComponent
 * @extends HTMLElement
 *
 * @example
 * my-component.js
 * ```js
 * import { DNAComponent } from 'dna/component';
 * export class MyComponent extends DNAComponent {
 *   get createdCallback() {
 *     console.log('Created a MyComponent instance!!!');
 *   }
 * }
 * ```
 * app.js
 * ```js
 * import { register } from 'dna/component';
 * import { MyComponent } from './components/my-component/my-component.js';
 * var MyElement = register('my-component', MyComponent);
 * var element = new MyElement(); // logs "Created a MyComponent instance!!!"
 * ```
 */
export class DNAComponent extends HTMLElement {
    /**
     * Fires when an the element is registered.
     * @param {String} id The element definition name.
     */
    static onRegister() {}
    /**
     * Fires when an instance of the element is created.
     */
    createdCallback() {}
    /**
     * Fires when an instance was inserted into the document.
     */
    attachedCallback() {}
    /**
     * Fires when an instance was detached from the document.
     */
    detachedCallback() {}
    /**
     * Fires when an attribute was added, removed, or updated.
     * @param {String} attrName The changed attribute name.
     * @param {*} oldVal The value of the attribute before the change.
     * @param {*} newVal The value of the attribute after the change.
     */
    attributeChangedCallback() {}
}
