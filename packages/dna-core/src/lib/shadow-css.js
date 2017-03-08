/**
 * A regex to match css `:host` selector.
 * @type {RegExp}
 * @private
 */
const HOST_REGEX = /\:host(\(([^({)]+(\([^)]*\))?)+\))?/g;

/**
 * Add a scope to all selectors.
 * @private
 *
 * @param {CSSStyleSheet} sheet The css sheet to scope.
 * @param {String} scope The scope selector.
 * @return {String} The scoped css.
 */
function scoped(sheet, scope) {
    let rules = sheet.cssRules || sheet.rules;
    if (sheet.insertRule) {
        let reg = new RegExp(`${scope}([\\s\.\[:]|$)`);
        let text = '';
        for (let i = 0, len = rules.length; i < len; i++) {
            let rule = rules[i];
            let body = rule.cssText;
            if (rule.selectorText) {
                let selector = rule.cssText.split('{').shift().split(',')
                    .map((rule) => {
                        rule = rule.trim();
                        if (rule.match(reg)) {
                            return rule;
                        }
                        return `${scope} ${rule}`;
                    })
                    .join(', ');
                text += rule.cssText.replace(rule.selectorText, selector);
            } else if (rule.cssRules || rule.rules) {
                scoped(rule, scope);
                text += rule.cssText;
            } else {
                text += body;
            }
        }
        return text;
    }
}

/**
 * Convert a shadowDOM css string into a normal scoped css.
 * @private
 *
 * @param {HTMLStyleElement} style The style element.
 * @param {String} css The css string to convert.
 * @param {String} is The component name for scoping.
 * @return {String} The converted string.
 */
export function convertShadowCSS(style, css, is) {
    let scope = `.${is}`;
    style.textContent = css.replace(HOST_REGEX, (fullMatch, mod) =>
        `${scope}${mod ? mod.slice(1, -1) : ''}`
    );
    style.textContent = scoped(style.sheet, scope) || '';
}
