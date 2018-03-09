import { isFalsy, isFunction, isString, isArray } from '@dnajs/core/src/lib/typeof.js';
import { registry } from '@dnajs/core/src/lib/registry.js';

const PROPERTIES = '__properties';

export function IDOMFactory(DOM) {
    function setProperty(element, property, value) {
        if (element[property] !== value) {
            element[property] = value;
            if (isFalsy(value)) {
                unsetProperty(element, property, value);
            } else if (value === true) {
                DOM.setAttribute(element, property, '');
            } else if (typeof value !== 'object') {
                DOM.setAttribute(element, property, value);
            }
        }
    }
    
    function unsetProperty(element, property, nullVal = undefined) {
        element[property] = nullVal;
        DOM.removeAttribute(element, property);
    }
    
    function patch(node, children, currentCounter = 0, initial = true) {
        if (!isArray(children)) {
            children = [children];
        }
        node = DOM.getComponentNode(node) || node;
        children.forEach((child) => {
            const oldChildNode = node.childNodes[currentCounter];
            if (isArray(child)) {
                currentCounter = patch(node, child, currentCounter, false);
            } else if (isFunction(child)) {
                currentCounter = patch(node, child.call(this, oldChildNode, true), currentCounter, false);
            } else if (child) {
                if (isString(child)) {
                    if (oldChildNode) {
                        if (oldChildNode.nodeType === Node.TEXT_NODE) {
                            if (oldChildNode.textContent !== child) {
                                oldChildNode.textContent = child;
                            }
                        } else {
                            DOM.insertBefore(node, document.createTextNode(child), oldChildNode);
                        }
                    } else {
                        DOM.appendChild(node, document.createTextNode(child));
                    }
                } else {
                    child = DOM.getComponentNode(child) || child;
                    if (child !== oldChildNode) {
                        if (oldChildNode) {
                            DOM.insertBefore(node, child, oldChildNode);
                        } else {
                            DOM.appendChild(node, child);
                        }
                    }
                }
                currentCounter++;
            }
        });
        if (initial) {
            while (node.childNodes.length > currentCounter) {
                DOM.removeChild(node, node.lastChild);
            }
        }
        return currentCounter;
    }
    
    function h(tagName, properties, ...children) {
        if (isArray(properties)) {
            children = properties;
            properties = {};
        } else {
            properties = properties || {};
        }
        return (oldNode, shouldSkipChildren = false) => {
            oldNode = DOM.getNodeComponent(oldNode) || oldNode;
            let node = (() => {
                if (oldNode) {
                    if (oldNode instanceof Node) {
                        if (oldNode.tagName.toLowerCase() === tagName.toLowerCase()) {
                            return oldNode;
                        }
                    } else if (oldNode.is.toLowerCase() === (properties.is || tagName).toLowerCase()) {
                        return oldNode;
                    }
                }
                return DOM.createElement(tagName, properties.is);
            })();
    
            if (properties) {
                if (node[PROPERTIES]) {
                    for (let k in node[PROPERTIES]) {
                        if (!(k in properties)) {
                            unsetProperty(node, k);
                        }
                    }
                }
                for (let k in properties) {
                    setProperty(node, k, properties[k]);
                }
            }
            node[PROPERTIES] = properties;
    
            if (!shouldSkipChildren || !registry.get(tagName)) {
                patch(node, children);
            }
            return node;
        };
    }

    return { h, patch };
}
