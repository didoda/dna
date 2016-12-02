!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.DNA=t.DNA||{})}(this,function(t){"use strict";function e(t){return"function"==typeof t}function n(t){return"string"==typeof t}function r(t){return"[object Object]"===Object.prototype.toString.call(t)}function i(t){return"undefined"==typeof t}function o(t){return Array.isArray(t)}function c(t){return i(t)||null===t||t===!1}function u(t){return self.Symbol?self.Symbol(t):"__"+t}function a(t){return t&&t.node}function s(t){return t&&t[U]}function l(t){if(t=s(t)||t,t[J])return t[Z].call(t),!0}function f(t){if(t=s(t)||t,t[J])return t[K].call(t),!0}function p(t,e,n,r){if(t=s(t)||t,t[J]){var i=t.constructor.observedAttributes||[];if(i.indexOf(e)!==-1)return t[Q].call(t,e,n,r),!0}}function h(t){if(n(t)&&(t=H.get(t)),e(t))return new t}function d(t,e){return t=a(t)||t,e=a(e)||e,(t!==e.parentNode||t.lastElementChild!==e)&&(e.parentNode&&v(e.parentNode,e),t.appendChild(e),l(e))}function v(t,e){return t=a(t)||t,e=a(e)||e,t.removeChild(e),f(e)}function b(t,e,n){if(t=a(t)||t,e=a(e)||e,n=a(n)||n,e.nextSibling!==n)return e.parentNode&&f(e),t.insertBefore(e,n),l(e)}function y(t,e,n){return e=a(e)||e,n=a(n)||n,e.parentNode&&f(e),t.replaceChild(e,n),f(n),l(e)}function g(t,e,n){t=a(t)||t;var r=t.getAttribute(e);return t.setAttribute(e,n),p(t,e,r,n)}function m(t,e){t=a(t)||t;var n=t.getAttribute(e);return t.removeAttribute(e),p(t,e,n,null)}function C(t,e,n){for(var r=0,i=t.length;r<i;r++)n=e(n,t[r],r,t);return n}function w(t,e,n){for(;t;)n=e(n,t),t=t.__proto__;return n}function k(t,e){return w(t,function(t,n){return n.hasOwnProperty(e)&&t.push(n[e]),t},[])}function E(t,e){var n=k(t,e);return C(n,function(t,e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n]);return t},{})}function x(t,e,r){var i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if(!n(e))throw new TypeError("Event name is undefined");var c=new et(e,{detail:r,bubbles:i,cancelable:o});return t.dispatchEvent(c)}function N(t){return new nt(t)}function O(t,e){if(""===e&&t.accepts(Boolean))return!0;if(!t.accepts(String))try{return JSON.parse(e)}catch(t){}return e}function A(t,e,n){var r=t.getAttribute(e);r!==n&&(c(n)?null!==r&&t.removeAttribute(e):("boolean"==typeof n&&(n=""),t.setAttribute(e,n)))}function _(t,e){return ot.call(t,e)}function M(t,e,n){if(!n)return e;for(var r=t.target;r&&r!==e;){if(_(r,n))return r;r=r.parentNode}return null}function j(t,e){var n=this;return function(r){var i=M(r,n.node,t);i&&e.call(n,r,i)}}function S(t){return t.ownerDocument||lt}function P(t){var e=S(t).createElement("style");return e.id="style-"+t.is,e}function T(t,e){var n="."+e;return t.replace(at,function(t){var e=t.slice(0,-1).split(st).map(function(t){return 0===t.indexOf(":host")?t.replace(ut,function(t,e,r){return r=r?r.slice(1,-1):"",""+n+r}):n+" "+t}).join(", ");return e+"{"})}function R(t,e,n){return H.define(t,e,n)}function L(t,e,n){var r=new e;for(var i in n)r[i]=n[i];return vt.appendChild(t,r),r}var B,I=Object.defineProperty,F=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},z=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),D=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},q=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},V=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},G="components",H=(B={},D(B,G,{}),D(B,"define",function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};t=t.toLowerCase(),I(e.prototype,"is",{get:function(){return t}}),this[G][t]={is:t,Ctr:e,config:n}}),D(B,"get",function(t,e){var n=this[G][t.toLowerCase()];if(n)return e?n:n.Ctr}),B),J=u("dna"),U=u("component"),X=u("node"),Y=u("style"),Z="connectedCallback",K="disconnectedCallback",Q="attributeChangedCallback",W=Object.freeze({getComponentNode:a,getNodeComponent:s,connect:l,disconnect:f,update:p,createElement:h,appendChild:d,removeChild:v,insertBefore:b,replaceChild:y,setAttribute:g,removeAttribute:m}),$={created:[],connected:[],disconnected:[],updated:[],on:function(t,n){o(this[t])&&e(n)&&this[t].push(n)},trigger:function(t,e){for(var n=arguments.length,r=Array(n>2?n-2:0),i=2;i<n;i++)r[i-2]=arguments[i];o(this[t])&&this[t].forEach(function(t){return t.call.apply(t,[null,e].concat(r))})}},tt=function(t){return function(t){function e(){F(this,e);var n=V(this,t.call(this));return $.trigger("created",n),n}return q(e,t),z(e,[{key:J,get:function(){return!0}},{key:"node",get:function(){return this[X]},set:function(t){t[U]=this,this[X]=t}}]),e.prototype.connectedCallback=function(){this.node[U]=this,$.trigger("connected",this)},e.prototype.disconnectedCallback=function(){$.trigger("disconnected",this)},e.prototype.attributeChangedCallback=function(){},e}(t)},et=self.CustomEvent;try{new et("test")}catch(t){et=function(t,e){var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n},et.prototype=self.CustomEvent.prototype}var nt=function(){function t(e){var n=this;F(this,t),this._=[],e=e||[],o(e)||(e=[e]),this.ctrs=e,this.validator=function(){return!0},this._setter=function(t){return t},this.getterFn=function(){return n.value},this.setterFn=function(t){if(t=n._setter(t),!(null===t||void 0===t||n.validateType(t)&&n.validator(t)))throw new TypeError("Invalid `"+t+"` value for `"+n.name+"` property for `"+n.scope.is+"`.");var e=n.value;e!==t&&(n.value=t,n.changed(t,e))}}return t.prototype.observe=function(t){return(e(t)||n(t))&&this._.push(t),this},t.prototype.unobserve=function(t){var e=this._.indexOf(t);return e!==-1&&this._.splice(e,1),this},t.prototype.changed=function(t,e){for(var r=0,i=this._.length;r<i;r++){var o=this._[r];n(o)?this.scope[o].call(this.scope,this,t,e):o(this,t,e)}},t.prototype.accepts=function(t){return this.ctrs.indexOf(t)!==-1},t.prototype.named=function(t){return this.name=t,this.attrRequested===!0&&(this.attrName=this.name),this},t.prototype.default=function(t){return this.defaultValue=r(t)?Object.freeze(t):t,this},t.prototype.attribute=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return n(t)?(this.attrRequested=!1,this.attrName=t):(this.attrRequested=!!t,this.attrName=this.name),this},t.prototype.dispatch=function(t){return this.eventName=t,this},t.prototype.getter=function(t){var n=this;return e(t)&&(this.getterFn=function(){return t(n.value)}),this},t.prototype.setter=function(t){return e(t)&&(this._setter=t),this},t.prototype.validate=function(t){return e(t)&&(this.validator=t),this},t.prototype.validateType=function(t){var e=0,n=this.ctrs;if(0===n.length)return!0;for(;e<n.length;){if(t instanceof n[e]||t.constructor&&t.constructor===n[e])return!0;e++}return!1},t.prototype.init=function(t){this.scope=t,I(t,this.name,{get:this.getterFn.bind(this),set:this.setterFn.bind(this),configurable:!0}),i(this.defaultValue)||(t[this.name]=this.defaultValue)},t}();I(N,"ANY",{get:function(){return N()}}),I(N,"STRING",{get:function(){return N(String)}}),I(N,"BOOLEAN",{get:function(){return N(Boolean)}}),I(N,"NUMBER",{get:function(){return N(Number)}});var rt=function(t){return function(t){function e(){F(this,e);var n=V(this,t.call(this)),r=E(n,"properties");for(var i in r)r[i]instanceof nt||(r[i]=N(r[i]));I(n,"properties",{value:r,writable:!1,configurable:!0});var o=n.constructor.observedAttributes||[],c=function(t){var e=r[t];e.named(t).observe(function(t,e,r){return n.propertyChangedCallback(t.name,r,e)}).init(n);var i=e.attrName,c=e.eventName;i||o.indexOf(t)===-1||(e.attribute(),i=t),(i||c)&&e.observe(function(){i&&A(n.node,i,n[e.name]),c&&x(n.node,c)})};for(var u in r)c(u);return n}return q(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.properties;for(var n in e){var r=e[n],o=r.attrName,c=r.name;i(this[c])?this.node.hasAttribute(o||c)&&(this[c]=O(r,this.node.getAttribute(o||c))):o&&A(this.node,o,this[c])}},e.prototype.attributeChangedCallback=function(e,n,r){t.prototype.attributeChangedCallback.call(this,e,n,r);var i=this.properties;for(var o in i){var c=i[o];if(c.attrName===e)return void(this[c.name]=O(c,r))}},e.prototype.propertyChangedCallback=function(t,e,n){$.trigger("updated",this,t,e,n)},e.prototype.observeProperty=function(t,e){return this.properties[t].observe(e)},e.prototype.unobserveProperty=function(t,e){this.properties[t].unobserve(e)},e}(t)},it=Element.prototype,ot=it.matches||it.mozMatchesSelector||it.msMatchesSelector||it.oMatchesSelector||it.webkitMatchesSelector,ct=function(t){return function(t){function r(){F(this,r);var i=V(this,t.call(this)),o=E(i,"events");for(var c in o){var u=n(o[c])?i[o[c]]:o[c];if(!e(u))throw new TypeError("Invalid callback for event.");var a=c.split(" ").slice(1).join(" ").trim();o[c]=j.call(i,a,u)}return I(i,"events",{value:o}),i}return q(r,t),r.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.events;for(var n in e){var r=n.split(" ").shift();this.node.addEventListener(r,e[n])}},r.prototype.disconnectedCallback=function(){var e=this.events;for(var n in e){var r=n.split(" ").shift();this.node.removeEventListener(r,e[n])}t.prototype.disconnectedCallback.call(this)},r.prototype.delegate=function(t,e,n){var r=j.call(this,e,n);this.node.addEventListener(t,r)},r.prototype.trigger=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return x(this.node,t,e,n,r)},r}(t)},ut=/(\:host)(\([^)]*\))?/g,at=/(#|\.|\@|\[|[a-zA-Z]|\:)([^{\;\}]*){/g,st=/\,\s*/,lt=document,ft=function(t){return function(t){function e(){F(this,e);var r=V(this,t.call(this)),i=k(r,"css").filter(function(t){return n(t)}).join("\n");return I(r,"css",{value:i}),r}return q(e,t),e.prototype.connectedCallback=function(){if(t.prototype.connectedCallback.call(this),n(this.css))if(this.node.shadowRoot){if(!this[Y]){var e=this[Y]=P(this.node);this.node.shadowRoot.appendChild(e),e.textContent=this.css}}else if(!this.constructor[Y]){var r=this.constructor[Y]=P(this.node);S(this.node).head.appendChild(r),r.textContent=T(this.css,this.is)}this.node.classList.add(this.is)},e}(t)},pt=function(t){return function(t){function r(){return F(this,r),V(this,t.apply(this,arguments))}return q(r,t),r.prototype.connectedCallback=function(){c(this.template)||this.render(),t.prototype.connectedCallback.call(this)},r.prototype.propertyChangedCallback=function(e,n,r){t.prototype.propertyChangedCallback.call(this,e,n,r),c(this.template)||this.render()},r.prototype.render=function(t){if(t=t||this.template,e(t))t.call(this);else if(n(t))(this.node.shadowRoot||this.node).innerHTML=t;else if(!c(t))throw new TypeError("Invalid template property.")},r}(t)},ht=function(){function t(e){F(this,t),e=e||function(){function t(){F(this,t)}return t}(),this.superclass=e}return t.prototype.with=function(){var t=[].slice.call(arguments,0);return C(t,function(t,e){return e(t)},this.superclass)},t}(),dt=function(t){return new ht(t)},vt=W,bt={ComponentMixin:tt,PropertiesMixin:rt,EventsMixin:ct,StyleMixin:ft,TemplateMixin:pt},yt=function(t){function e(){F(this,e);var n=V(this,t.call(this)),r=H.get(n.is,!0),i=r.config;return n.node=document.createElement(i.extends?i.extends:r.is),i.extends&&n.node.setAttribute("is",r.is),n}return q(e,t),e}(dt().with(bt.ComponentMixin,bt.PropertiesMixin,bt.StyleMixin,bt.EventsMixin,bt.TemplateMixin));t.registry=H,t.define=R,t.render=L,t.BaseComponent=yt,t.DOM=vt,t.MIXINS=bt,t.mix=dt,t.prop=N,t.notifications=$,Object.defineProperty(t,"__esModule",{value:!0})});

//# sourceMappingURL=dna-core.js.map
