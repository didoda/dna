/* eslint-env mocha */

import { define, render, IDOM } from '../index.js';
import '../observer.js';
import {
    TestComponent1,
    TestComponent2,
    TestComponent3,
    TestComponent4,
    TestComponent5,
    TestPlaceholder,
    Test2Placeholder,
} from './components/template.js';

const WRAPPER = document.body;
self.IDOM = IDOM;

define('test1-template-component', TestComponent1);
define('test2-template-component', TestComponent2);
define('test3-template-component', TestComponent3);
define('test4-template-component', TestComponent4);
define('test5-template-component', TestComponent5);
define('test-vdom-placeholder', TestPlaceholder);
define('test2-vdom-placeholder', Test2Placeholder, {
    extends: 'figure',
});

describe('Unit: TemplateComponent', () => {
    it('should handle `template` with IDOM calls', () => {
        const elem = render(WRAPPER, TestComponent1);

        assert.equal(elem.innerHTML, '<span>Hello, </span>');
        elem.name = 'Alan';
        elem.lastName = 'Turing';
        elem.title = 'Title';
        assert.equal(elem.innerHTML, '<h1>Title</h1><br><span>Hello, Alan Turing</span>');
    });

    it('should handle `template` with JSX IDOM calls', () => {
        const elem = render(WRAPPER, TestComponent2);

        assert.equal(elem.innerHTML, '<span class="dna-test">Hello DNA!</span>');
    });

    it('should handle templates with <svg>', () => {
        const elem = render(WRAPPER, TestComponent4);

        elem.radius = 40;
        let svg = elem.firstElementChild;
        let circle = svg.querySelector('circle');
        assert.equal(svg && svg.tagName.toUpperCase(), 'SVG');
        assert.equal(circle.getAttribute('r'), '40');
    });

    describe('should handle sub components', () => {
        const elem = render(WRAPPER, TestComponent5);

        it('and their callbacks', () => {
            assert.equal(elem.querySelector('test-vdom-placeholder').value, 6);
            assert.equal(elem.querySelector('figure').value, 11);
        });
    });
});
