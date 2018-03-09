import { appendChild } from './dom.js';
import { isArray, isFunction } from './typeof.js';
import { DNA_SYMBOL } from './symbols.js';

/**
 * Create and append a new component instance.
 * @method render
 * @memberof DNA
 *
 * @param {HTMLElement} node The parent node.
 * @param {Array<Function>|Function|Node} Component The component constructor or instance.
 * @param {Object} props Optional set of properties to set to the component.
 * @return {HTMLElement} The new component instance.
 */
export function render(node, Component, props) {
    if (isArray(Component)) {
        return Component.map((Ctr) => render(node, Ctr, props));
    } else if (isFunction(Component)) {
        let element;
        if (Component.prototype[DNA_SYMBOL]) {
            element = new Component();
            for (let k in props) {
                element[k] = props[k];
            }
        } else {
            element = Component(props);
        }
        return render(node, element);
    } else if (Component && (Component[DNA_SYMBOL] || Component instanceof Node)) {
        appendChild(node, Component);
        return Component;
    }
}
