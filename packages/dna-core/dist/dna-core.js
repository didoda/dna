!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.DNA=t.DNA||{})}(this,function(t){"use strict";function e(t){return"function"==typeof t}function n(t){return"string"==typeof t}function r(t){return"[object Object]"===Object.prototype.toString.call(t)}function i(t){return"undefined"==typeof t}function o(t){return Array.isArray(t)}function u(t){return i(t)||null===t||t===!1}function s(t){return self.Symbol?self.Symbol(t):"__"+t}function c(t){return t&&t.node}function a(t){return t&&t[K]}function l(t){if(t=a(t)||t,t[$])return t[Z].call(t),!0}function f(t){if(t=a(t)||t,t[$])return t[tt].call(t),!0}function p(t,e,n,r){if(t=a(t)||t,t[$]){var i=t.constructor.observedAttributes||[];if(i.indexOf(e)!==-1)return t[et].call(t,e,n,r),!0}}function h(t){if(n(t)&&(t=Y.get(t)),e(t))return new t}function d(t,e){return t=c(t)||t,e=c(e)||e,(t!==e.parentNode||t.lastElementChild!==e)&&(e.parentNode&&v(e.parentNode,e),t.appendChild(e),l(e))}function v(t,e){return t=c(t)||t,e=c(e)||e,t.removeChild(e),f(e)}function b(t,e,n){if(t=c(t)||t,e=c(e)||e,n=c(n)||n,e.nextSibling!==n)return e.parentNode&&f(e),t.insertBefore(e,n),l(e)}function y(t,e,n){return e=c(e)||e,n=c(n)||n,e.parentNode&&f(e),t.replaceChild(e,n),f(n),l(e)}function m(t,e,n){t=c(t)||t;var r=t.getAttribute(e);return t.setAttribute(e,n),p(t,e,r,n)}function g(t,e){t=c(t)||t;var n=t.getAttribute(e);return t.removeAttribute(e),p(t,e,n,null)}function C(t,e,n){for(var r=0,i=t.length;r<i;r++)n=e(n,t[r],r,t);return n}function w(t,e,n){for(;t;)n=e(n,t),t=Object.getPrototypeOf(t);return n}function x(t,e){return w(t,function(n,r){if(r.hasOwnProperty(e)){var i=Object.getOwnPropertyDescriptor(r,e),o=void 0;i.hasOwnProperty("value")?o=i.value:i.hasOwnProperty("get")&&(o=i.get.call(t)),n.push(o)}return n},[])}function k(t,e){var n=x(t,e);return C(n,function(t,e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n]);return t},{})}function E(t,e,r){var i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if(!n(e))throw new TypeError("Event name is undefined");var u=new it(e,{detail:r,bubbles:i,cancelable:o});return t.dispatchEvent(u)}function O(t){return new ot(t)}function A(t,e){if(""===e&&t.accepts(Boolean))return!0;if(!t.accepts(String))try{return JSON.parse(e)}catch(t){}return e}function N(t,e,n){var r=t.getAttribute(e);r!==n&&(u(n)?null!==r&&t.removeAttribute(e):("boolean"==typeof n&&(n=""),t.setAttribute(e,n)))}function S(t,e){return ct.call(t,e)}function j(t,e,n){if(!n)return e;for(var r=t.target;r&&r!==e;){if(S(r,n))return r;r=r.parentNode}return null}function M(t,e){var n=this;return function(r){var i=j(r,n.node,t);i&&e.call(n,r,i)}}function R(t,e){for(var n=t.cssRules||t.rules,r=new RegExp(e+"([.[:]|$)"),i=0,o=n.length;i<o;i++){var u=n[i];if(u.insertRule){var s=u.cssText;if(u.selectorText){var c=u.cssText.split("{").shift().split(",").map(function(t){return t=t.trim(),t.match(r)?t:e+" "+t}).join(", ");s=u.cssText.replace(u.selectorText,c)}else(u.cssRules||u.rules)&&(R(u,e),s=u.cssText);t.deleteRule(i),t.insertRule(s,i)}}}function T(t,e){var n="."+e;t.textContent=t.textContent.replace(lt,function(t,e,r){return""+n+(r||"")}),R(t.sheet,n)}function _(t){return t.ownerDocument||ft}function P(t){var e=_(t.node).createElement("style");return e.id="style-"+t.is,e}function L(t,n){return t[n]={configurable:!0,get:function(){if(!this.node)throw new ReferenceError("The component's `node` is undefined.");var t=this.node[n];return e(t)?t.bind(this.node):t}},t}function B(t){return t.prototype=Object.create(t.prototype,C(yt,function(t,e){return L(t,e)},{})),t}function q(t){for(var e in Y.components)for(var n=Y.get(e),r=t.querySelectorAll(e),i=0,o=r.length;i<o;i++){var u=new n(r[i]);l(u)}}function z(t,e,n){return Y.define(t,e,n)}function D(t,e,n){var r=new e;for(var i in n)r[i]=n[i];return d(t,r),r}var F,I=Object.defineProperty,V=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},G=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),H=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},J=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},U=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},X="components",Y=(F={},H(F,X,{}),H(F,"define",function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};t=t.toLowerCase(),I(e.prototype,"is",{get:function(){return t}}),this[X][t]={is:t,Ctr:e,config:n}}),H(F,"get",function(t,e){var n=this[X][t.toLowerCase()];if(n)return e?n:n.Ctr}),F),$=s("dna"),K=s("component"),Q=s("node"),W=s("style"),Z="connectedCallback",tt="disconnectedCallback",et="attributeChangedCallback",nt=Object.freeze({getComponentNode:c,getNodeComponent:a,connect:l,disconnect:f,update:p,createElement:h,appendChild:d,removeChild:v,insertBefore:b,replaceChild:y,setAttribute:m,removeAttribute:g}),rt=function(t){var e=function(t){function e(){return V(this,e),U(this,t.apply(this,arguments))}return J(e,t),e.prototype.connectedCallback=function(){this.node[K]=this},e.prototype.disconnectedCallback=function(){},e.prototype.attributeChangedCallback=function(){},G(e,[{key:$,get:function(){return!0}},{key:"node",get:function(){return this[Q]},set:function(t){t[K]=this,this[Q]=t}}]),e}(t);return e},it=self.CustomEvent;try{new it("test")}catch(t){it=function(t,e){var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n},it.prototype=self.CustomEvent.prototype}var ot=function(){function t(e){var n=this;V(this,t),this._=[],e=e||[],o(e)||(e=[e]),this.ctrs=e,this.validator=function(){return!0},this._setter=function(t){return t},this.getterFn=function(){return n.value},this.setterFn=function(t){if(t=n._setter(t),!(null===t||void 0===t||n.validateType(t)&&n.validator(t)))throw new TypeError("Invalid `"+t+"` value for `"+n.name+"` property for `"+n.scope.is+"`.");var e=n.value;e!==t&&(n.value=t,n.initialized&&n.changed(t,e))}}return t.prototype.observe=function(t){return(e(t)||n(t))&&this._.push(t),this},t.prototype.unobserve=function(t){var e=this._.indexOf(t);return e!==-1&&this._.splice(e,1),this},t.prototype.changed=function(t,e){this.defaultSet=!1;for(var r=0,i=this._.length;r<i;r++){var o=this._[r];n(o)?this.scope[o].call(this.scope,this,t,e):o.call(this.scope,this,t,e)}},t.prototype.accepts=function(t){return this.ctrs.indexOf(t)!==-1},t.prototype.named=function(t){return this.name=t,this.attrRequested===!0&&(this.attrName=this.name),this},t.prototype.default=function(t){return this.defaultValue=r(t)?Object.freeze(t):t,this},t.prototype.attribute=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return n(t)?(this.attrRequested=!1,this.attrName=t):(this.attrRequested=!!t,this.attrName=this.name),this},t.prototype.dispatch=function(t){return this.eventName=t,this},t.prototype.getter=function(t){var n=this;return e(t)&&(this.getterFn=function(){return t(n.value)}),this},t.prototype.setter=function(t){return e(t)&&(this._setter=t),this},t.prototype.validate=function(t){return e(t)&&(this.validator=t),this},t.prototype.validateType=function(t){var e=0,n=this.ctrs;if(0===n.length)return!0;for(;e<n.length;){if(t instanceof n[e]||t.constructor&&t.constructor===n[e])return!0;e++}return!1},t.prototype.init=function(t){this.scope=t,I(t,this.name,{get:this.getterFn.bind(this),set:this.setterFn.bind(this),configurable:!0}),i(this.defaultValue)||(t[this.name]=this.defaultValue,this.defaultSet=!0),this.initialized=!0},t}();I(O,"ANY",{get:function(){return O()}}),I(O,"STRING",{get:function(){return O(String)}}),I(O,"BOOLEAN",{get:function(){return O(Boolean)}}),I(O,"NUMBER",{get:function(){return O(Number)}});var ut=function(t){return function(t){function e(n){V(this,e);var r=U(this,t.call(this,n)),i=k(r,"properties");for(var o in i)i[o]instanceof ot||(i[o]=O(i[o]));I(r,"properties",{value:i});var u=r.constructor.observedAttributes||[],s=function(t){var e=i[t];e.named(t).observe(function(t,e,n){return r.propertyChangedCallback(t.name,n,e)}).init(r);var n=e.attrName,o=e.eventName;n||u.indexOf(t)===-1||(e.attribute(),n=t),(n||o)&&e.observe(function(){n&&N(r,n,r[e.name]),o&&E(r,o)})};for(var c in i)s(c);return r}return J(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.properties;for(var n in e){var r=e[n],o=r.attrName,u=r.name;(i(this[u])||r.defaultSet)&&(this.hasAttribute(o||u)?this[u]=A(r,this.getAttribute(o||u)):i(this.node[u])||(this[u]=this.node[u])),o&&N(this,o,this[u])}},e.prototype.attributeChangedCallback=function(e,n,r){t.prototype.attributeChangedCallback.call(this,e,n,r);var i=this.properties;for(var o in i){var u=i[o];if(u.attrName===e)return void(this[u.name]=A(u,r))}},e.prototype.propertyChangedCallback=function(){},e.prototype.observeProperty=function(t,e){return this.properties[t].observe(e)},e.prototype.unobserveProperty=function(t,e){this.properties[t].unobserve(e)},e}(t)},st=Element.prototype,ct=st.matches||st.mozMatchesSelector||st.msMatchesSelector||st.oMatchesSelector||st.webkitMatchesSelector,at=function(t){return function(t){function r(i){V(this,r);var o=U(this,t.call(this,i)),u=k(o,"events");for(var s in u){var c=n(u[s])?o[u[s]]:u[s];if(!e(c))throw new TypeError("Invalid callback for event.");var a=s.trim().split(" "),l=a.shift(),f=a.join(" ");u[s]={name:l,selector:f,callback:M.call(o,f,c)}}return I(o,"events",{value:u}),o}return J(r,t),r.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.events;for(var n in e)this.addEventListener(e[n].name,e[n].callback)},r.prototype.disconnectedCallback=function(){var e=this.events;for(var n in e)this.removeEventListener(e[n].name,e[n].callback);t.prototype.disconnectedCallback.call(this)},r.prototype.delegate=function(t,e,n){var r=M.call(this,e,n);return this.addEventListener(t,r)},r.prototype.trigger=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return E(this,t,e,n,r)},r}(t)},lt=/\:host(\(([^({]+(\([^)]*\))?)+\))?/g,ft=document,pt=function(t){return function(t){function e(r){V(this,e);var i=U(this,t.call(this,r)),o=x(i,"css").filter(function(t){return n(t)}).join("\n");return o&&I(i,"css",{value:o}),i}return J(e,t),e.prototype.connectedCallback=function(){if(t.prototype.connectedCallback.call(this),n(this.css))if(this.shadowRoot){if(!this[W]){var e=this[W]=P(this);e.textContent=this.css,this.shadowRoot.appendChild(e)}}else if(!this.constructor[W]){var r=this.constructor[W]=P(this);r.textContent=this.css,_(this.node).head.appendChild(r),T(r,this.is)}this.classList.add(this.is)},e}(t)},ht=function(t){return function(t){function n(){return V(this,n),U(this,t.apply(this,arguments))}return J(n,t),n.prototype.connectedCallback=function(){u(this.template)||this.render(),t.prototype.connectedCallback.call(this)},n.prototype.propertyChangedCallback=function(e,n,r){t.prototype.propertyChangedCallback.call(this,e,n,r),u(this.template)||this.render()},n.prototype.render=function(t){return t=t||this.template,e(t)?t.call(this):void((this.shadowRoot||this.node).innerHTML=t)},n}(t)},dt=function(){function t(e){V(this,t),e=e||function(){function t(){V(this,t)}return t}(),this.superclass=e}return t.prototype.with=function(){var t=[].slice.call(arguments,0);return C(t,function(t,e){return e(t)},this.superclass)},t}(),vt=function(t){return new dt(t)},bt={ComponentMixin:rt,PropertiesMixin:ut,EventsMixin:at,StyleMixin:pt,TemplateMixin:ht},yt=["attributes","classList","getAttribute","hasAttribute","setAttribute","removeAttribute","addEventListener","removeEventListener","dispatchEvent","style","querySelector","querySelectorAll","shadowRoot","attachShadow","createShadowRoot"],mt=B(function(){function t(){V(this,t)}return t}()),gt=function(t){function e(n){V(this,e);var r=U(this,t.call(this));if(!n){var i=Y.get(r.is,!0),o=i.config;n=document.createElement(o.extends?o.extends:i.is),o.extends&&n.setAttribute("is",i.is)}return r.node=n,r}return J(e,t),e}(vt(mt).with(bt.ComponentMixin,bt.PropertiesMixin,bt.StyleMixin,bt.EventsMixin,bt.TemplateMixin));t.registry=Y,t.proxy=B,t.BaseComponent=gt,t.bootstrap=q,t.define=z,t.render=D,t.DOM=nt,t.MIXINS=bt,t.mix=vt,t.prop=O,Object.defineProperty(t,"__esModule",{value:!0})});

//# sourceMappingURL=dna-core.js.map
