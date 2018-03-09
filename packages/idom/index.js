/**
 * DNA
 * (c) 2015-2017 Chialab (http://www.chialab.it) <dev@chialab.io>
 * http://dna.chialab.io
 *
 * Evolution-based components.
 * Use with IncrementalDOM templates.
 */
import { IDOMFactory } from './src/lib/idom.js';
import { IDOMMixin } from './src/mixins/idom.js';
import { mix, MIXINS, DOM } from '@dnajs/core/src/core.js';
import { proxy } from '@dnajs/core/src/lib/proxy.js';

export const IDOM = IDOMFactory(DOM);
export const h = IDOM.h;
export const patch = IDOM.patch;

MIXINS.IDOMMixin = IDOMMixin(patch);

export * from '@dnajs/core/src/core.js';
export { proxy };
export { registry } from '@dnajs/core/src/lib/registry.js';
export { bootstrap } from '@dnajs/core/src/lib/bootstrap.js';
export { define } from '@dnajs/core/src/lib/define.js';
export { render } from '@dnajs/core/src/lib/render.js';

const Component = proxy(class {
    constructor(node) {
        this.node = node || document.createElement(this.is);
    }
});

export class BaseComponent extends mix(Component).with(
    MIXINS.ComponentMixin,
    MIXINS.PropertiesMixin,
    MIXINS.StyleMixin,
    MIXINS.EventsMixin,
    MIXINS.TemplateMixin,
    MIXINS.IDOMMixin
) {}
