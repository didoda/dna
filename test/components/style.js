import { mix } from '../../src/lib/mixins.js';
import { Component } from '../../src/component.js';
import { StyleMixin } from '../../src/mixins/style-component.js';

class TestComponent extends mix(Component).with(StyleMixin) {
    constructor() {
        super();
        this.innerHTML = '<h1>DNA TESTS</h1>';
    }
}

let css = 'h1 { color: #5F9EA0; }';

export class TestComponent1 extends TestComponent {
    get css() {
        return `.test1-style-component ${css}`;
    }
}

export class TestComponent2 extends TestComponent {
    get css() {
        return `.test2-style-component.active ${css}`;
    }

    constructor() {
        super();
        this.classList.add('active');
    }
}