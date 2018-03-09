import { isFunction } from '@dnajs/core/src/lib/typeof.js';

export const IDOMMixin = (patch) => (superClass) => class extends superClass {
    render(template) {
        template = template || this.template;
        if (isFunction(template)) {
            const tpl = template.bind(this);
            template = () => {
                patch.call(this, this.shadowRoot || this.node, tpl);
            };
        }
        super.render(template);
    }
};
