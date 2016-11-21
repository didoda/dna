!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.DNA=t.DNA||{})}(this,function(t){"use strict";function e(t){return"function"==typeof t}function n(t){return"string"==typeof t}function r(t){return"object"===("undefined"==typeof t?"undefined":v(t))}function o(t){return"undefined"==typeof t}function i(t){return Array.isArray(t)}function u(t,e,r){var o=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],i=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if(!n(e))throw new TypeError("Event name is undefined");var u=new g(e,{detail:r,bubbles:o,cancelable:i});return t.dispatchEvent(u)}function c(t){return t instanceof C?t:new C(t)}function a(t,e){if(""===e&&t.accepts(Boolean))return!0;if(!t.accepts(String))try{return JSON.parse(e)}catch(t){}return e}function s(t,e,n){var r=t.getAttribute(e);if(r!==n)if(null!==n&&void 0!==n&&n!==!1)switch("undefined"==typeof n?"undefined":v(n)){case"string":case"number":t.setAttribute(e,n);break;case"boolean":t.setAttribute(e,"")}else null!==r&&t.removeAttribute(e)}function f(t){var e=_.createElement("style");e.type="text/css",e.setAttribute("id","style-"+t);var n=_.head;return n.firstElementChild?n.insertBefore(e,n.firstElementChild):n.appendChild(e),e}function l(t){var e=function(){return Reflect.construct(t,[],this.constructor)};return e.prototype=Object.create(t.prototype,{constructor:{value:e,configurable:!0,writable:!0}}),e}function p(){return L.define.apply(L,arguments)}function h(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=new e;for(var o in n)r[o]=n[o];return t.appendChild(r),r}var v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y=(function(){function t(t){this.value=t}function e(e){function n(t,e){return new Promise(function(n,o){var c={key:t,arg:e,resolve:n,reject:o,next:null};u?u=u.next=c:(i=u=c,r(t,e))})}function r(n,i){try{var u=e[n](i),c=u.value;c instanceof t?Promise.resolve(c.value).then(function(t){r("next",t)},function(t){r("throw",t)}):o(u.done?"return":"normal",u.value)}catch(t){o("throw",t)}}function o(t,e){switch(t){case"return":i.resolve({value:e,done:!0});break;case"throw":i.reject(e);break;default:i.resolve({value:e,done:!1})}i=i.next,i?r(i.key,i.arg):u=null}var i,u;this._invoke=n,"function"!=typeof e.return&&(this.return=void 0)}return"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)},{wrap:function(t){return function(){return new e(t.apply(this,arguments))}},await:function(e){return new t(e)}}}(),function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}),d=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),b=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},m=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},g=void 0;try{new self.CustomEvent("test");g=self.CustomEvent}catch(t){g=function(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n},g.prototype=self.CustomEvent.prototype}var w=function(t){return function(t){function e(){return y(this,e),m(this,t.apply(this,arguments))}return b(e,t),e.prototype.connectedCallback=function(){},e.prototype.disconnectedCallback=function(){},e.prototype.attributeChangedCallback=function(){},d(e,[{key:"is",get:function(){return this.getAttribute("is")||this.localName}}]),e}(t)},E=Object.defineProperty,C=function(){function t(e){var n=this;y(this,t),this._=[],e=e||[],i(e)||(e=[e]),this.ctrs=e,this.validator=function(){return!0},this._setter=function(t){return t},this.getterFn=function(){return n.value},this.setterFn=function(t){if(t=n._setter(t),!(null===t||void 0===t||n.validateType(t)&&n.validator(t)))throw new TypeError("Invalid `"+t+"` value for `"+n.name+"` property for `"+n.scope.is+"`.");var e=n.value;e!==t&&(n.value=t,n.changed(t,e))}}return t.prototype.observe=function(t){return(e(t)||n(t))&&this._.push(t),this},t.prototype.unobserve=function(t){var e=this._.indexOf(t);return e!==-1&&this._.splice(e,1),this},t.prototype.changed=function(t,e){for(var r=0,o=this._.length;r<o;r++){var i=this._[r];n(i)?this.scope[i].call(this.scope,this,t,e):i(this,t,e)}},t.prototype.accepts=function(t){return this.ctrs.indexOf(t)!==-1},t.prototype.named=function(t){return this.name=t,this.attrRequested===!0&&(this.attrName=this.name),this},t.prototype.default=function(t){return this.defaultValue=r(t)?Object.freeze(t):t,this},t.prototype.attribute=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return n(t)?(this.attrRequested=!1,this.attrName=t):this.attrRequested=!!t,this},t.prototype.dispatch=function(t){return this.eventName=t,this},t.prototype.getter=function(t){var n=this;return e(t)&&(this.getterFn=function(){return t(n.value)}),this},t.prototype.setter=function(t){return e(t)&&(this._setter=t),this},t.prototype.validate=function(t){return e(t)&&(this.validator=t),this},t.prototype.validateType=function(t){var e=0,n=this.ctrs;if(0===n.length)return!0;for(;e<n.length;){if(t instanceof n[e]||t.constructor&&t.constructor===n[e])return!0;e++}return!1},t.prototype.init=function(t){this.scope=t,E(t,this.name,{get:this.getterFn.bind(this),set:this.setterFn.bind(this),configurable:!0}),o(this.defaultValue)||(t[this.name]=this.defaultValue)},t}();E(c,"ANY",{get:function(){return c()}}),E(c,"STRING",{get:function(){return c(String)}}),E(c,"BOOLEAN",{get:function(){return c(Boolean)}}),E(c,"NUMBER",{get:function(){return c(Number)}});var S=function(t){return function(t){function e(){y(this,e);var n=m(this,t.call(this)),r=n.properties;r?(i(r)||(r=[r]),r=r.reduce(function(t,e){for(var n in e)t[n]=c(e[n]);return t},{})):r={},Object.defineProperty(n,"properties",{value:r,writable:!1,configurable:!0});var o=function(t){var e=r[t];e.named(t).init(n);var o=e.attrName,i=e.eventName;(o||i)&&e.observe(function(){o&&s(n,o,n[e.name]),i&&u(n,i)})};for(var a in r)o(a);return n}return b(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.properties;for(var n in e){var r=e[n],i=r.attrName;i&&(o(this[r.name])?this.hasAttribute(i)&&(this[r.name]=a(r,this.getAttribute(i))):s(this,i,this[r.name]))}},e.prototype.attributeChangedCallback=function(e,n,r){t.prototype.attributeChangedCallback.call(this,e,n,r);var o=this.properties;for(var i in o){var u=o[i];if(u.attrName===e)return void(this[u.name]=a(u,r))}},e.prototype.observeProperty=function(t,e){this.properties[t].observe(e)},e.prototype.unobserveProperty=function(t,e){this.properties[t].unobserve(e)},e}(t)},x=Element.prototype,k=x.matches||x.matchesSelector||x.mozMatchesSelector||x.msMatchesSelector||x.oMatchesSelector||x.webkitMatchesSelector,M=/([^\s]+)(.*)?/,O=function(t){return function(t){function r(){y(this,r);var o=m(this,t.call(this)),i=o.events||{},u=function(t){var r=n(i[t])?o[i[t]]:i[t];if(!e(r))throw new TypeError("Invalid callback for event.");var u=t.match(M),c=u[1],a=(u[2]||"").trim();a?o.delegate(c,a,r):o.addEventListener(c,function(t){r.call(o,t,o)})};for(var c in i)u(c);return o}return b(r,t),r.prototype.delegate=function(t,e,n){var r=this;this.addEventListener(t,function(t){for(var o=t.target;o&&o!==r;)k.call(o,e)&&n.call(r,t,o),o=o.parentNode})},r.prototype.trigger=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return u(this,t,e,n,r)},r}(t)},_=document,N=function(t){return function(t){function e(){y(this,e);var n=m(this,t.call(this));if(!n.constructor.styleElem){var r=n.constructor;Object.defineProperty(r,"styleElem",{value:f(n.is)})}return n.updateCSS(),n}return b(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this),this.classList.add(this.is)},e.prototype.updateCSS=function(){var t=this.css;n(t)&&(this.constructor.styleElem.textContent=t)},e}(t)},P=function(t){return function(t){function r(){y(this,r);var e=m(this,t.call(this)),n=e.constructor.prototype;if(n.hasOwnProperty("template")){var o=e.properties;if(o){var i=function(){e.render()};for(var u in o)o[u].observe(i)}}return e}return b(r,t),r.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.constructor.prototype;e.hasOwnProperty("template")&&this.render()},r.prototype.render=function(t){if(t=t||this.template,e(t))t();else{if(!n(t))throw new Error("Invalid template property.");this.innerHTML=t}},r}(t)},j=Array.prototype.reduce||function(t){var e=this,n=e.length,r=0,o=void 0;if(2===arguments.length)o=arguments[1];else{for(;r<n&&!(r in e);)r++;o=e[r++]}for(;r<n;r++)r in e&&(o=t(o,e[r],r,e));return o},A=function(){function t(e){y(this,t),e=e||function(){function t(){y(this,t)}return t}(),this.superclass=e}return t.prototype.with=function(){var t=[].slice.call(arguments,0);return j.call(t,function(t,e){return e(t)},this.superclass)},t}(),T=function(t){return new A(t)},I={ComponentMixin:w,PropertiesMixin:S,EventsMixin:O,StyleMixin:N,TemplateMixin:P},R={dispatch:u},L=self.customElements,B=function(t){function e(){return y(this,e),m(this,t.apply(this,arguments))}return b(e,t),e}(T(l(self.HTMLElement)).with(I.ComponentMixin,I.PropertiesMixin,I.StyleMixin,I.EventsMixin,I.TemplateMixin));t.shim=l,t.mix=T,t.MIXINS=I,t.registry=L,t.define=p,t.render=h,t.BaseComponent=B,t.prop=c,t.HELPERS=R,Object.defineProperty(t,"__esModule",{value:!0})});

//# sourceMappingURL=dna-custom-elements-v1.js.map
