!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.DNA=t.DNA||{})}(this,function(t){"use strict";function e(t){return"function"==typeof t}function n(t){return"string"==typeof t}function r(t){return"object"===("undefined"==typeof t?"undefined":A(t))}function i(t){return"undefined"==typeof t}function o(t){return Array.isArray(t)}function u(t,e,r){var i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if(!n(e))throw new TypeError("Event name is undefined");var u=new T(e,{detail:r,bubbles:i,cancelable:o});return t.dispatchEvent(u)}function c(t){if(t.nodeType===Node.ELEMENT_NODE){var e=t.getAttribute("is")||t.tagName;return P.get(e)}return P.get(t)}function a(t){return!!e(t[L])&&(t[L].call(t),!0)}function s(t){return!!e(t[I])&&(t[I].call(t),!0)}function f(t,n,r,i){return!(!e(t[R])||"is"===n)&&(t[R].call(t,n,r,i),!0)}function l(t,e){e=e||c(t).Ctr,t.__proto__=e.prototype,Object.defineProperty(t,"constructor",{value:e,configurable:!0,writable:!0}),e.call(t)}function p(t,e){return e=e||c(t),!!e&&(l(t,e.Ctr),!0)}function h(t){var e=c(t);if(e)return new e.Ctr}function d(t,e){return(t!==e.parentNode||t.lastElementChild!==e)&&(e.parentNode&&v(e.parentNode,e),t.appendChild(e),a(e))}function v(t,e){return t.removeChild(e),s(e)}function y(t,e,n){var r=t.getAttribute(e);t.setAttribute(e,n);var i=t.constructor.observedAttributes||[];return i.indexOf(e)!==-1&&(f(t,e,r,n),!0)}function b(t,e){var n=t.getAttribute(e);t.removeAttribute(e);var r=t.constructor.observedAttributes||[];return r.indexOf(e)!==-1&&(f(t,e,n,null),!0)}function m(t){return t instanceof H?t:new H(t)}function g(t,e){if(""===e&&t.accepts(Boolean))return!0;if(!t.accepts(String))try{return JSON.parse(e)}catch(t){}return e}function C(t,e,n){var r=t.getAttribute(e);if(r!==n)if(null!==n&&void 0!==n&&n!==!1)switch("undefined"==typeof n?"undefined":A(n)){case"string":case"number":t.setAttribute(e,n);break;case"boolean":t.setAttribute(e,"")}else null!==r&&t.removeAttribute(e)}function w(t){var e=U.createElement("style");e.type="text/css",e.setAttribute("id","style-"+t);var n=U.head;return n.firstElementChild?n.insertBefore(e,n.firstElementChild):n.appendChild(e),e}function E(t,e){return e!==t.textContent&&(t.textContent=e,!0)}function x(t){try{return!n(t.outerHTML)}catch(t){return!0}}function _(t){var e=function t(){if(N(this,t),!x(this))return this;var e=P.get(this.constructor),n=e.config,r=document.createElement(n.extends?n.extends:e.is);return r.__proto__=e.Ctr.prototype,n.extends&&r.setAttribute("is",e.is),r};return e.prototype=Object.create(t.prototype,{constructor:{value:e,configurable:!0,writable:!0}}),e}function k(t,e,n){return P.define(t,e,n)}function S(t,e,n){var r=new e;for(var i in n)r[i]=n[i];return Z.appendChild(t,r),r}var A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},N=(function(){function t(t){this.value=t}function e(e){function n(t,e){return new Promise(function(n,i){var c={key:t,arg:e,resolve:n,reject:i,next:null};u?u=u.next=c:(o=u=c,r(t,e))})}function r(n,o){try{var u=e[n](o),c=u.value;c instanceof t?Promise.resolve(c.value).then(function(t){r("next",t)},function(t){r("throw",t)}):i(u.done?"return":"normal",u.value)}catch(t){i("throw",t)}}function i(t,e){switch(t){case"return":o.resolve({value:e,done:!0});break;case"throw":o.reject(e);break;default:o.resolve({value:e,done:!1})}o=o.next,o?r(o.key,o.arg):u=null}var o,u;this._invoke=n,"function"!=typeof e.return&&(this.return=void 0)}return"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)},{wrap:function(t){return function(){return new e(t.apply(this,arguments))}},await:function(e){return new t(e)}}}(),function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}),O=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),M=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},j=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},T=void 0;try{new self.CustomEvent("test");T=self.CustomEvent}catch(t){T=function(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n},T.prototype=self.CustomEvent.prototype}var P={components:{},define:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.components[t.toLowerCase()]={is:t,Ctr:e,config:n}},get:function(t){if(n(t))return this.components[t.toLowerCase()];if(e(t))for(var r in this.components){var i=this.components[r];if(i.Ctr===t)return i}}},L="connectedCallback",I="disconnectedCallback",R="attributeChangedCallback",B=Object.freeze({getComponent:c,connect:a,disconnect:s,update:f,bind:l,create:p,createElement:h,appendChild:d,removeChild:v,setAttribute:y,removeAttribute:b}),F=function(t){return function(t){function e(){return N(this,e),j(this,t.apply(this,arguments))}return M(e,t),e.prototype.connectedCallback=function(){},e.prototype.disconnectedCallback=function(){},e.prototype.attributeChangedCallback=function(){},O(e,[{key:"is",get:function(){return this.getAttribute("is")||this.localName}}]),e}(t)},D=Object.defineProperty,H=function(){function t(e){var n=this;N(this,t),this._=[],e=e||[],o(e)||(e=[e]),this.ctrs=e,this.validator=function(){return!0},this._setter=function(t){return t},this.getterFn=function(){return n.value},this.setterFn=function(t){if(t=n._setter(t),n.validateType(t)&&n.validator(t)){var e=n.value;return e!==t&&(n.value=t,n.changed(t,e)),!0}return!1}}return t.prototype.observe=function(t){return(e(t)||n(t))&&this._.push(t),this},t.prototype.unobserve=function(t){var e=this._.indexOf(t);return e!==-1&&this._.splice(e,1),this},t.prototype.changed=function(t,e){for(var r=0,i=this._.length;r<i;r++){var o=this._[r];n(o)?this.scope[o].call(this.scope,this,t,e):o(this,t,e)}},t.prototype.accepts=function(t){return this.ctrs.indexOf(t)!==-1},t.prototype.named=function(t){return this.name=t,this.attrRequested===!0&&(this.attrName=this.name),this},t.prototype.default=function(t){return this.defaultValue=r(t)?Object.freeze(t):t,this},t.prototype.attribute=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return n(t)?(this.attrRequested=!1,this.attrName=t):this.attrRequested=!!t,this},t.prototype.dispatch=function(t){return this.eventName=t,this},t.prototype.getter=function(t){var n=this;return e(t)&&(this.getterFn=function(){return t(n.value)}),this},t.prototype.setter=function(t){return e(t)&&(this._setter=t),this},t.prototype.validate=function(t){return e(t)&&(this.validator=t),this},t.prototype.validateType=function(t){if(null===t||void 0===t)return!0;var e=0,n=this.ctrs;if(0===n.length)return!0;for(;e<n.length;){if(t instanceof n[e]||t.constructor&&t.constructor===n[e])return!0;e++}throw new TypeError("Invalid `"+t+'` value for "'+this.name+'" property'+(this.scope?" for "+this.scope.is:"")+".")},t.prototype.init=function(t){this.scope=t,D(t,this.name,{get:this.getterFn.bind(this),set:this.setterFn.bind(this),configurable:!0}),i(this.defaultValue)||this.setter(this.defaultValue)},t}();D(m,"ANY",{get:function(){return m()}}),D(m,"STRING",{get:function(){return m(String)}}),D(m,"BOOLEAN",{get:function(){return m(Boolean)}}),D(m,"NUMBER",{get:function(){return m(Number)}});var q=function(t){return function(t){function e(){N(this,e);var n=j(this,t.call(this)),r=n.properties;r?(o(r)||(r=[r]),r=r.reduce(function(t,e){for(var n in e)t[n]=m(e[n]);return t},{})):r={},Object.defineProperty(n,"properties",{value:r,writable:!1,configurable:!0});var i=function(t){var e=r[t];e.named(t).init(n);var i=e.attrName,o=e.eventName;(i||o)&&e.observe(function(){i&&C(n,i,n[e.name]),o&&u(n,o)})};for(var c in r)i(c);return n}return M(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.properties;for(var n in e){var r=e[n],o=r.attrName;o&&(i(this[r.name])?this.hasAttribute(o)&&(this[r.name]=g(r,this.getAttribute(o))):C(this,o,this[r.name]))}},e.prototype.attributeChangedCallback=function(e,n,r){t.prototype.attributeChangedCallback.call(this,e,n,r);var i=this.properties;for(var o in i){var u=i[o];if(u.attrName===e)return void(this[u.name]=g(u,r))}},e.prototype.observeProperty=function(t,e){this.properties[t].observe(e)},e}(t)},z=Element.prototype,V=z.matches||z.matchesSelector||z.mozMatchesSelector||z.msMatchesSelector||z.oMatchesSelector||z.webkitMatchesSelector,G=/([^\s]+)(.*)?/,J=function(t){return function(t){function r(){N(this,r);var i=j(this,t.call(this)),o=i.events||{},u=function(t){var r=n(o[t])?i[o[t]]:o[t];if(!e(r))throw new TypeError("Invalid callback for event.");var u=t.match(G),c=u[1],a=(u[2]||"").trim();a?i.delegate(c,a,r):i.addEventListener(c,function(t){r.call(i,t,i)})};for(var c in o)u(c);return i}return M(r,t),r.prototype.delegate=function(t,e,n){var r=this;this.addEventListener(t,function(t){for(var i=t.target;i&&i!==r;)V.call(i,e)&&n.call(r,t,i),i=i.parentNode})},r.prototype.trigger=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return u(this,t,e,n,r)},r}(t)},U=document,X=function(t){return function(t){function e(){N(this,e);var n=j(this,t.call(this));if(!n.styleElem){var r=n.constructor;Object.defineProperty(r.prototype,"styleElem",{value:w(n.is)})}return n.updateCSS(),n}return M(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this),this.classList.add(this.is)},e.prototype.updateCSS=function(){var t=this.css;t&&E(this.styleElem,t)},e}(t)},Y=function(t){return function(t){function r(){N(this,r);var e=j(this,t.call(this));if(e.template){var n=e.properties;if(n){var i=function(){e.render()};for(var o in n)n[o].observe(i)}}return e}return M(r,t),r.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this),this.template&&this.render()},r.prototype.render=function(){var t=this.template;if(e(t))t();else{if(!n(t))throw new Error("Invalid template property.");this.innerHTML=t}},r}(t)},K=Array.prototype.reduce||function(t){var e=this,n=e.length,r=0,i=void 0;if(2===arguments.length)i=arguments[1];else{for(;r<n&&!(r in e);)r++;i=e[r++]}for(;r<n;r++)r in e&&(i=t(i,e[r],r,e));return i},Q=function(){function t(e){N(this,t),e=e||function(){function t(){N(this,t)}return t}(),this.superclass=e}return t.prototype.with=function(){var t=[].slice.call(arguments,0);return K.call(t,function(t,e){return e(t)},this.superclass)},t}(),W=function(t){return new Q(t)},Z=B,$={ComponentMixin:F,PropertiesMixin:q,EventsMixin:J,StyleMixin:X,TemplateMixin:Y},tt={dispatch:u},et=function(t){function e(){return N(this,e),j(this,t.apply(this,arguments))}return M(e,t),e}(W(_(self.HTMLElement)).with($.ComponentMixin,$.PropertiesMixin,$.StyleMixin,$.EventsMixin,$.TemplateMixin));t.mix=W,t.prop=m,t.shim=_,t.HELPERS=tt,t.DOM=Z,t.MIXINS=$,t.registry=P,t.define=k,t.render=S,t.BaseComponent=et,Object.defineProperty(t,"__esModule",{value:!0})});

//# sourceMappingURL=dna.js.map
