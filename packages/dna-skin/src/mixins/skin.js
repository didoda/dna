import Template from 'skin-template';
import { DOM } from '@dnajs/core/src/library-helpers.js';

const IDOM = Template.IDOM;

IDOM.afterElementOpen((node) => {
    if (DOM.isComponent(node)) {
        return false;
    }
});

export const SkinTemplateMixin = (SuperClass) => class extends SuperClass {
    constructor() {
        super();
        let template = this.template;
        if (template) {
            let Ctr = this.constructor;
            if (typeof template === 'string') {
                template = new Template(template);
                Object.defineProperty(Ctr.prototype, 'template', {
                    value: template,
                });
            }
            let tpl = new Template(template).setScope(this);
            Object.defineProperty(this, 'template', {
                value: () => tpl.render(this),
            });
            this.render();
        }
    }
};
