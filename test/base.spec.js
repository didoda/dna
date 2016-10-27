/* eslint-env mocha */

import { define, createElement, appendChild, setAttribute, removeChild } from './library.js';
import { TestBaseComponent } from './components/base.js';

const WRAPPER = document.body;
define('test-base-component', TestBaseComponent);

describe('Unit: BaseComponent', () => {
    let elem = createElement(TestBaseComponent);

    describe('Unit: BaseComponent > created', () => {
        it('check if element is correctly instantiated', () => {
            assert.equal(elem.created, true);
        });
    });

    describe('Unit: BaseComponent > attached', () => {
        it('check if element is correctly attached to the tree', () => {
            appendChild(WRAPPER, elem);
            assert.equal(elem.attached, true);
        });
    });

    describe('Unit: BaseComponent > attributeChanged', () => {
        setAttribute(elem, 'name', 'Alan');
        it('check if element is correctly trigger attributeChangedCallback', () => {
            assert.equal(elem.name, 'Alan');
        });
    });

    describe('Unit: BaseComponent > detached', () => {
        it('check if element is correctly detached from the tree', () => {
            removeChild(WRAPPER, elem);
            assert.equal(elem.attached, false);
        });
    });
});
