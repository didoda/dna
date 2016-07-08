import * as Config from './dna-config.js';
import { DNAComponent } from './dna-component.js';
import { DNAProperty } from './helpers/dna-property.js';
import { registry } from './helpers/registry.js';
import { templateRegistry, templateToNodes } from './helpers/template.js';


/**
 * Simple Custom Component with template handling using the `template` property.
 * @class DNATemplateComponent
 * @extends DNAComponent
 *
 * @example
 * my-component.js
 * ```js
 * import { DNATemplateComponent } from 'dna/component';
 * export class MyComponent extends DNATemplateComponent {
 *   static get template() {
 *     return `<h1>${this.name}</h1>`;
 *   }
 *   get name() {
 *     return 'Newton';
 *   }
 * }
 * ```
 * app.js
 * ```js
 * import { register } from 'dna/component';
 * import { MyComponent } from './components/my-component/my-component.js';
 * var MyElement = register('my-component', MyComponent);
 * var element = new MyElement();
 * console.log(element.innerHTML); // logs "<h1>Newton</h1>"
 * ```
 */
export class DNATemplateComponent extends DNAComponent {
    /**
     * Fires when an the element is registered.
     * @param {String} id The element definition name.
     */
    static onRegister(is) {
        if (this.hasOwnProperty('template')) {
            templateRegistry(is, this.template);
        }
    }
    /**
     * Default `autoUpdateView` conf.
     */
    static get autoUpdateView() {
        return Config.autoUpdateView;
    }
    /**
     * Fires when an instance of the element is created.
     */
    createdCallback() {
        let ctr = registry(this.is);
        if (ctr && ctr.autoUpdateView) {
            DNAProperty.observe(this, function() {
                if (this.templateReady) {
                    this.render();
                }
            });
        }
        super.createdCallback();
        this.templateReady = true;
        this.render();
    }
    /**
     * Get the component content.
     * @deprecated
     * @private
     */
    getViewContent() {
        this.render();
        return this.innerHTML;
    }
    /**
     * Update Component child nodes.
     * @param {*} content Optional result of a `render` of an extended class.
     * @return Promise The render promise.
     */
    render(content) {
        content = content || templateRegistry(this.is);
        content = templateToNodes(this, content);
        if (content !== null && content !== undefined) {
            if (Array.isArray(content)) {
                let oldChildren = DNAProperty.get(this, '__lastNode');
                if (oldChildren) {
                    if (oldChildren instanceof Node) {
                        oldChildren = [oldChildren];
                    }
                    for (let i = 0; i < oldChildren.length; i++) {
                        let oldChild = oldChildren[i];
                        if (oldChild.parentNode === this) {
                            this.removeChild(oldChild);
                        }
                    }
                }
                if (content instanceof Node) {
                    content = [content];
                }
                for (let i = 0; i < content.length; i++) {
                    this.appendChild(content[i]);
                }
                DNAProperty.set(this, '__lastNode', content, false);
            }
            return Promise.resolve();
        }
        return Promise.reject();
    }
    /**
     * Update Component child nodes.
     * @deprecated
     * @private
     * @param {*} content Optional result of a `render` of an extended class.
     */
    updateViewContent(content) {
        return this.render(content);
    }
}
