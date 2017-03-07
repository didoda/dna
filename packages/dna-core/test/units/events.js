/* eslint-env mocha */

import { define, render, DOM } from '../../index.js';
import { CustomEvent } from '../../src/helpers/custom-event.js';
import { TestComponent, TestInvalidComponent } from '../components/events.js';

function dispatch(node, evName) {
    let ev = new CustomEvent(evName, {
        bubbles: true,
        cancelable: true,
        detail: undefined,
    });
    return node.dispatchEvent(ev);
}

const WRAPPER = document.body;
define('test-events-component', TestComponent);
define('test2-events-component', TestInvalidComponent);

describe('Unit: EventsComponent', () => {
    const elem = render(WRAPPER, TestComponent);
    describe('delegate', () => {
        describe('custom events', () => {
            it('should be handled', () => {
                assert.equal(elem.customElement, elem.node);
                assert.equal(elem.custom instanceof Event, true);
                assert.equal(elem.custom.detail.data, 1234);
            });
        });

        describe('using api', () => {
            const span = elem.node.querySelector('span');
            let fired = false;
            elem.delegate('checkDelegation', 'span', () => fired = true);
            dispatch(span, 'checkDelegation');
            it('should trigger a function callback', () => {
                assert(fired);
            });
        });

        describe('events', () => {
            const span = elem.node.querySelector('span');
            const button = elem.node.querySelector('button');
            const input = elem.node.querySelector('input');

            before((done) => {
                dispatch(span, 'click');
                dispatch(button, 'click');
                input.value = 'DNA Tests';
                dispatch(input, 'change');
                setTimeout(() => done(), 500);
            });

            after(() => {
                delete elem.clickedSpan;
                delete elem.clickedElement;
                delete elem.changedElement;
                delete elem.clickedSpanEvent;
                delete elem.clicked;
                delete elem.changed;
            });

            it('should trigger a function callback', () => {
                assert.equal(elem.clickedSpan, span);
                assert.equal(elem.clickedSpanEvent instanceof Event, true);
                assert.equal(elem.clickedSpanEvent.type, 'click');
            });

            it('should track click on button element', () => {
                assert.equal(elem.clickedElement, button);
                assert.equal(elem.clicked instanceof Event, true);
                assert.equal(elem.clicked.type, 'click');
            });

            it('should track changes on input element', () => {
                assert.equal(elem.changedElement, input);
                assert.equal(elem.changed instanceof Event, true);
                assert.equal(elem.changed.type, 'change');
            });
        });

        describe('undelegate', () => {
            const span = elem.node.querySelector('span');
            const button = elem.node.querySelector('button');
            const input = elem.node.querySelector('input');

            before((done) => {
                DOM.removeChild(WRAPPER, elem);
                dispatch(span, 'click');
                dispatch(button, 'click');
                input.value = 'DNA Tests';
                dispatch(input, 'change');
                setTimeout(() => done(), 500);
            });

            it('should stop to delegate on component detached', () => {
                assert.equal(elem.clickedSpan, undefined);
                assert.equal(elem.clickedSpanEvent, undefined);
                assert.equal(elem.clickedElement, undefined);
                assert.equal(elem.clicked, undefined);
                assert.equal(elem.changedElement, undefined);
                assert.equal(elem.changed, undefined);
            });
        });
    });
    describe('trigger', () => {
        it('should throw when event name is not defined in trigger', () => {
            let wrapper = () => {
                elem.trigger();
            };
            assert.throws(wrapper, Error, 'Event name is undefined');
        });
    });
    describe('delegate invalid callbacks', () => {
        it('should throw', () => {
            let wrapper = () => {
                render(WRAPPER, TestInvalidComponent);
            };
            assert.throws(wrapper, TypeError, 'Invalid callback for event.');
        });
    });
});