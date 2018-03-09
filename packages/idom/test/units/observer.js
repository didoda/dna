/* eslint-env mocha */

import { define, DOM, h, patch } from '../../index.js';
import { TestComponent } from '../components/observer.js';

define('test-idom-component', TestComponent);

const WRAPPER = document.createElement('div');
document.body.appendChild(WRAPPER);

describe('Unit: IDOM observer', () => {
    describe('callbacks', () => {
        const renderFactory = (data) => {
            if (data.show) {
                return <test-idom-component age={data.age} married={data.married}></test-idom-component>;
            }
        };
        patch(WRAPPER, renderFactory.bind(null, { show: true, age: 20, married: false }));
        const node = WRAPPER.querySelector('test-idom-component');
        const elem = DOM.getNodeComponent(node);
        it('should create a component instance', () => {
            assert.equal(elem.node.tagName.toLowerCase(), 'test-idom-component');
            assert.equal(elem.name, 'Alan');
            assert.equal(elem.lastName, 'Turing');
        });
        it('should update a component', () => {
            patch(WRAPPER, renderFactory.bind(null, { show: true, age: 21, married: true }));
            assert.equal(elem.node.getAttribute('age'), '21');
            assert.equal(elem.age, 21);
            assert.equal(elem.attributeChanges, 2);
            assert.equal(elem.married, true);
        });
        it('should remove a component', () => {
            patch(WRAPPER, renderFactory.bind(null, { show: false }));
            assert.equal(elem.node.parentNode, undefined);
            assert.equal(elem.disconnectedTimes, 1);
        });
    });
});
