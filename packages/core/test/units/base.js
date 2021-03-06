/* eslint-env mocha */

import { define, DOM } from '../../index.js';
import { TestBaseComponent } from '../components/base.js';

const WRAPPER = document.body;
define('test-base-component', TestBaseComponent);

describe('Unit: BaseComponent', () => {
    const elem = DOM.createElement('test-base-component');
    elem.lastName = 'Turing';

    describe('> created', () => {
        it('check if element is correctly instantiated', () => {
            assert.equal(elem.created, true);
        });
    });

    describe('> attached', () => {
        it('check if element is correctly attached to the tree', () => {
            DOM.appendChild(WRAPPER, elem);
            assert.equal(elem.attached, true);
        });
    });

    describe('> attributeChanged', () => {
        DOM.setAttribute(elem, 'name', 'Alan');
        it('check if element is correctly trigger attributeChangedCallback', () => {
            assert.equal(elem.name, 'Alan');
        });
    });

    describe('> render', () => {
        it('check if element has been correctly rendered', () => {
            assert.equal(elem.node.querySelector('span').textContent, 'Alan Turing');
        });
    });

    describe('> detached', () => {
        it('check if element is correctly detached from the tree', () => {
            DOM.removeChild(WRAPPER, elem);
            assert.equal(elem.attached, false);
        });
    });
});
