!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.DNA=t.DNA||{})}(this,function(t){"use strict";function e(t){return"function"==typeof t}function n(t){return"string"==typeof t}function r(t){return"[object Object]"===Object.prototype.toString.call(t)}function o(t){return"undefined"==typeof t}function i(t){return Array.isArray(t)}function a(t){return o(t)||null===t||t===!1}function c(t,e,r){var o=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],i=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if(!n(e))throw new TypeError("Event name is undefined");var a=new N(e,{detail:r,bubbles:o,cancelable:i});return t.dispatchEvent(a)}function u(t){return t instanceof A?t:new A(t)}function s(t,e){if(""===e&&t.accepts(Boolean))return!0;if(!t.accepts(String))try{return JSON.parse(e)}catch(t){}return e}function l(t,e,n){var r=t.getAttribute(e);r!==n&&(a(n)?null!==r&&t.removeAttribute(e):("boolean"==typeof n&&(n=""),t.setAttribute(e,n)))}function p(t,e,n){var r=t[x]=t[x]||{},o=r[e]=r[e]||[];o.push(n)}function f(t){var e=t.ownerDocument||B,n=e.createElement("style");return n.id="style-"+t.is,e.head.appendChild(n),n}function h(t,e,n){for(var r=0,o=t.length;r<o;r++)n=e(n,t[r],r,t);return n}function d(t){var e=function(){return Reflect.construct(t,[],this.constructor)};return e.prototype=Object.create(t.prototype,{constructor:{value:e,configurable:!0,writable:!0}}),e}function v(){return G.define.apply(G,arguments)}function y(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=new e;for(var o in n)r[o]=n[o];return t.appendChild(r),r}var b,m=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},g=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),C=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},w=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},E=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},k="components",O=(b={},C(b,k,{}),C(b,"define",function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};t=t.toLowerCase(),Object.defineProperty(e.prototype,"is",{get:function(){return t}}),this[k][t]={is:t,Ctr:e,config:n}}),C(b,"get",function(t,e){var n=this[k][t.toLowerCase()];if(n)return e?n:n.Ctr}),b,"__component"),_="__node",x="__events",M=function(t){return function(t){function e(){return m(this,e),E(this,t.apply(this,arguments))}return w(e,t),e.prototype.connectedCallback=function(){this.node[O]=this},e.prototype.disconnectedCallback=function(){},e.prototype.attributeChangedCallback=function(){},g(e,[{key:"node",get:function(){return this[_]},set:function(t){t[O]=this,this[_]=t}}]),e}(t)},N=self.CustomEvent;try{new N("test")}catch(t){var j=N.prototype;N=function(t,e){var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n},N.prototype=j}var S=Object.defineProperty,A=function(){function t(e){var n=this;m(this,t),this._=[],e=e||[],i(e)||(e=[e]),this.ctrs=e,this.validator=function(){return!0},this._setter=function(t){return t},this.getterFn=function(){return n.value},this.setterFn=function(t){if(t=n._setter(t),!(null===t||void 0===t||n.validateType(t)&&n.validator(t)))throw new TypeError("Invalid `"+t+"` value for `"+n.name+"` property for `"+n.scope.is+"`.");var e=n.value;e!==t&&(n.value=t,n.changed(t,e))}}return t.prototype.observe=function(t){return(e(t)||n(t))&&this._.push(t),this},t.prototype.unobserve=function(t){var e=this._.indexOf(t);return e!==-1&&this._.splice(e,1),this},t.prototype.changed=function(t,e){for(var r=0,o=this._.length;r<o;r++){var i=this._[r];n(i)?this.scope[i].call(this.scope,this,t,e):i(this,t,e)}},t.prototype.accepts=function(t){return this.ctrs.indexOf(t)!==-1},t.prototype.named=function(t){return this.name=t,this.attrRequested===!0&&(this.attrName=this.name),this},t.prototype.default=function(t){return this.defaultValue=r(t)?Object.freeze(t):t,this},t.prototype.attribute=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return n(t)?(this.attrRequested=!1,this.attrName=t):(this.attrRequested=!!t,this.attrName=this.name),this},t.prototype.dispatch=function(t){return this.eventName=t,this},t.prototype.getter=function(t){var n=this;return e(t)&&(this.getterFn=function(){return t(n.value)}),this},t.prototype.setter=function(t){return e(t)&&(this._setter=t),this},t.prototype.validate=function(t){return e(t)&&(this.validator=t),this},t.prototype.validateType=function(t){var e=0,n=this.ctrs;if(0===n.length)return!0;for(;e<n.length;){if(t instanceof n[e]||t.constructor&&t.constructor===n[e])return!0;e++}return!1},t.prototype.init=function(t){this.scope=t,S(t,this.name,{get:this.getterFn.bind(this),set:this.setterFn.bind(this),configurable:!0}),o(this.defaultValue)||(t[this.name]=this.defaultValue)},t}();S(u,"ANY",{get:function(){return u()}}),S(u,"STRING",{get:function(){return u(String)}}),S(u,"BOOLEAN",{get:function(){return u(Boolean)}}),S(u,"NUMBER",{get:function(){return u(Number)}});var P=function(t){return function(t){function e(){m(this,e);var n=E(this,t.call(this)),r=n.properties;r?(i(r)||(r=[r]),r=r.reduce(function(t,e){for(var n in e)t[n]=u(e[n]);return t},{})):r={},Object.defineProperty(n,"properties",{value:r,writable:!1,configurable:!0});var o=n.constructor.observedAttributes||[],a=function(t){var e=r[t];e.named(t).observe(function(t,e,r){return n.propertyChangedCallback(t.name,r,e)}).init(n);var i=e.attrName,a=e.eventName;i||o.indexOf(t)===-1||(e.attribute(),i=t),(i||a)&&e.observe(function(){i&&l(n.node,i,n[e.name]),a&&c(n.node,a)})};for(var s in r)a(s);return n}return w(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.properties;for(var n in e){var r=e[n],i=r.attrName,a=r.name;i&&(o(this[a])?this.node.hasAttribute(i)&&(this[a]=s(r,this.node.getAttribute(i))):l(this.node,i,this[a]))}},e.prototype.attributeChangedCallback=function(e,n,r){t.prototype.attributeChangedCallback.call(this,e,n,r);var o=this.properties;for(var i in o){var a=o[i];if(a.attrName===e)return void(this[a.name]=s(a,r))}},e.prototype.propertyChangedCallback=function(){},e.prototype.observeProperty=function(t,e){return this.properties[t].observe(e)},e.prototype.unobserveProperty=function(t,e){this.properties[t].unobserve(e)},e}(t)},T=Element.prototype,L=T.matches||T.mozMatchesSelector||T.msMatchesSelector||T.oMatchesSelector||T.webkitMatchesSelector,R=/([^\s]+)(.*)?/,I=function(t){return function(t){function r(){return m(this,r),E(this,t.apply(this,arguments))}return w(r,t),r.prototype.connectedCallback=function(){var r=this;t.prototype.connectedCallback.call(this);var o=this.events||{},i=function(t){var i=n(o[t])?r[o[t]]:o[t];if(!e(i))throw new TypeError("Invalid callback for event.");var a=t.match(R),c=a[1],u=(a[2]||"").trim();if(u)r.delegate(c,u,i);else{var s=function(t){i.call(r,t,r)};r.node.addEventListener(c,s),p(r,c,s)}};for(var a in o)i(a)},r.prototype.disconnectedCallback=function(){var e=this;t.prototype.disconnectedCallback.call(this);var n=this[x]||{},r=function(t){n[t].forEach(function(n){return e.node.removeEventListener(t,n)})};for(var o in n)r(o)},r.prototype.delegate=function(t,e,n){var r=this,o=function(t){for(var o=t.target,i=r.node;o&&o!==i;)L.call(o,e)&&n.call(r,t,o),o=o.parentNode};this.node.addEventListener(t,o),p(this,t,o)},r.prototype.trigger=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return c(this.node,t,e,n,r)},r}(t)},B=document,F=function(t){return function(t){function e(){m(this,e);var n=E(this,t.call(this));if(!n.constructor.styleElem){var r=n.constructor;Object.defineProperty(r,"styleElem",{value:f(n)})}return n.updateCSS(),n}return w(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this),this.node.classList.add(this.is)},e.prototype.updateCSS=function(){var t=this.css;n(t)&&(this.constructor.styleElem.textContent=t)},e}(t)},q=function(t){return function(t){function r(){return m(this,r),E(this,t.apply(this,arguments))}return w(r,t),r.prototype.connectedCallback=function(){a(this.template)||this.render(),t.prototype.connectedCallback.call(this)},r.prototype.propertyChangedCallback=function(e,n,r){t.prototype.propertyChangedCallback.call(this,e,n,r),a(this.template)||this.render()},r.prototype.render=function(t){if(t=t||this.template,e(t))t.call(this);else if(n(t))(this.shadowRoot||this.node).innerHTML=t;else if(!a(t))throw new TypeError("Invalid template property.")},r}(t)},D=function(){function t(e){m(this,t),e=e||function(){function t(){m(this,t)}return t}(),this.superclass=e}return t.prototype.with=function(){var t=[].slice.call(arguments,0);return h(t,function(t,e){return e(t)},this.superclass)},t}(),V=function(t){return new D(t)},z={ComponentMixin:M,PropertiesMixin:P,EventsMixin:I,StyleMixin:F,TemplateMixin:q},H=function(t){return function(t){function e(){m(this,e);var n=E(this,t.call(this));return n[O]=n,n}return w(e,t),g(e,[{key:"is",get:function(){return(this.node.getAttribute("is")||this.node.localName).toLowerCase()}}]),e}(t)};z.CustomElementMixin=H;var G=self.customElements,J=function(t){function e(){return m(this,e),E(this,t.apply(this,arguments))}return w(e,t),e}(V(d(self.HTMLElement)).with(z.ComponentMixin,z.PropertiesMixin,z.StyleMixin,z.EventsMixin,z.TemplateMixin,H));t.shim=d,t.mix=V,t.MIXINS=z,t.registry=G,t.define=v,t.render=y,t.BaseComponent=J,t.prop=u,Object.defineProperty(t,"__esModule",{value:!0})});

//# sourceMappingURL=dna-custom-elements-v1.js.map
