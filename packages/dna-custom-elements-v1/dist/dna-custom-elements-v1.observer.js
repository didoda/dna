!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.DNA=t.DNA||{})}(this,function(t){"use strict";function e(t){return"function"==typeof t}function n(t){return"string"==typeof t}function r(t){return"[object Object]"===Object.prototype.toString.call(t)}function i(t){return void 0===t}function o(t){return Array.isArray(t)}function a(t){return i(t)||null===t||t===!1}function u(t){return self.Symbol?self.Symbol(t):"__"+t}function s(t){return t&&t.node}function c(t){return t&&t[nt]}function l(t){if(t=c(t)||t,t[et])return t.connectedCallback.call(t),!0}function f(t){if(t=c(t)||t,t[et])return t.disconnectedCallback.call(t),!0}function h(t,e,n,r){if(t=c(t)||t,t[et]){if((t.constructor.observedAttributes||[]).indexOf(e)!==-1)return t.attributeChangedCallback.call(t,e,n,r),!0}}function p(t){if(n(t)&&(t=tt.get(t)),e(t))return new t}function d(t,e){return t=s(t)||t,e=s(e)||e,(t!==e.parentNode||t.lastElementChild!==e)&&(e.parentNode&&v(e.parentNode,e),t.appendChild(e),l(e))}function v(t,e){return t=s(t)||t,e=s(e)||e,t.removeChild(e),f(e)}function y(t,e,n){if(t=s(t)||t,e=s(e)||e,n=s(n)||n,e.nextSibling!==n)return e.parentNode&&f(e),t.insertBefore(e,n),l(e)}function b(t,e,n){return e=s(e)||e,n=s(n)||n,e.parentNode&&f(e),t.replaceChild(e,n),f(n),l(e)}function m(t,e,n){t=s(t)||t;var r=t.getAttribute(e);return t.setAttribute(e,n),h(t,e,r,n)}function g(t,e){t=s(t)||t;var n=t.getAttribute(e);return t.removeAttribute(e),h(t,e,n,null)}function C(t,e,n){for(var r=0,i=t.length;r<i;r++)n=e(n,t[r],r,t);return n}function w(t,e,n){for(;t;)n=e(n,t),t=Object.getPrototypeOf(t);return n}function k(t,e){return w(t,function(n,r){if(r.hasOwnProperty(e)){var i=Object.getOwnPropertyDescriptor(r,e),o=void 0;i.hasOwnProperty("value")?o=i.value:i.hasOwnProperty("get")&&(o=i.get.call(t)),n.push(o)}return n},[])}function x(t,e){return C(k(t,e),function(t,e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n]);return t},{})}function N(t,e,r){var i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if(!n(e))throw new TypeError("Event name is undefined");var a=new ut(e,{detail:r,bubbles:i,cancelable:o});return t.dispatchEvent(a)}function O(t){return new st(t)}function M(t,e){if(""===e&&t.accepts(Boolean))return!0;if(!t.accepts(String))try{return JSON.parse(e)}catch(t){}return e}function E(t,e,n){var r=t.getAttribute(e);r!==n&&(a(n)?null!==r&&t.removeAttribute(e):("boolean"==typeof n&&(n=""),t.setAttribute(e,n)))}function A(t,e){return ft.call(t,e)}function _(t,e,n){if(!n)return e;for(var r=t.target;r&&r!==e;){if(A(r,n))return r;r=r.parentNode}return null}function S(t,e){var n=this;return function(r){var i=_(r,n.node,t);i&&e.call(n,r,i)}}function j(t,e){var n=t.cssRules||t.rules;if(t.insertRule){var r=function(){for(var t=new RegExp(e+"([\\s.[:]|$)"),r="",i=0,o=n.length;i<o;i++){var a=n[i],u=a.cssText;if(a.selectorText){var s=a.cssText.split("{").shift().split(",").map(function(n){return n=n.trim(),n.match(t)?n:e+" "+n}).join(", ");r+=a.cssText.replace(a.selectorText,s)}else a.cssRules||a.rules?(j(a,e),r+=a.cssText):r+=u}return{v:r}}();if("object"===(void 0===r?"undefined":U(r)))return r.v}}function T(t,e,n){var r="."+n;t.textContent=e.replace(/\:host(\(([^({)]+(\([^)]*\))?)+\))?/g,function(t,e){return""+r+(e?e.slice(1,-1):"")}),t.textContent=j(t.sheet,r)||""}function D(t){return t.ownerDocument||pt}function P(t){var e=D(t.node).createElement("style");return e.id="style-"+t.is,e}function L(t){[].forEach.call(t,function(t){if(c(t))l(t);else{var e=tt.get(t.getAttribute("is")||t.tagName);if(e){var n=new e;n.node=t,l(n)}}t.children&&L(t.children)})}function R(t,e,n){return tt.define(t,e,n)}function V(t){for(var e in tt.components)for(var n=tt.get(e),r=t.querySelectorAll(e+', [is="'+e+'"]'),i=0,o=r.length;i<o;i++){var a=new n(r[i]);l(a)}}function I(){}function B(t,e){this.attrs=wt(),this.attrsArr=[],this.newAttrs=wt(),this.staticsApplied=!1,this.key=e,this.keyMap=wt(),this.keyMapValid=!0,this.focused=!1,this.nodeName=t,this.text=null}function F(){this.created=Ot.nodesCreated&&[],this.deleted=Ot.nodesDeleted&&[]}function H(t,n){var r=this;if(e(t)){var i=t.call(this,n);H.call(this,i)}else o(t)&&t.forEach(function(t){H.call(r,t)})}function z(t,e,n){return Vt(t,H.bind(this,e,n))}function q(t){var e=function(){return Reflect.construct(t,[],this.constructor)};return e.prototype=Object.create(t.prototype,{constructor:{value:e,configurable:!0,writable:!0}}),e}function X(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=new e;for(var i in n)r[i]=n[i];return t.appendChild(r),r}var G,J=Object.defineProperty,U="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Y=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},$=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),K=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},Q=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},W=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},Z="components",tt=(G={},K(G,Z,{}),K(G,"define",function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};t=t.toLowerCase(),J(e.prototype,"is",{get:function(){return t}}),this[Z][t]={is:t,Ctr:e,config:n}}),K(G,"get",function(t,e){var n=this[Z][t.toLowerCase()];if(n)return e?n:n.Ctr}),G),et=u("dna"),nt=u("component"),rt=u("node"),it=u("style"),ot=Object.freeze({getComponentNode:s,getNodeComponent:c,connect:l,disconnect:f,update:h,createElement:p,appendChild:d,removeChild:v,insertBefore:y,replaceChild:b,setAttribute:m,removeAttribute:g}),at=function(t){return function(t){function e(){return Y(this,e),W(this,t.apply(this,arguments))}return Q(e,t),e.prototype.connectedCallback=function(){this.node[nt]=this},e.prototype.disconnectedCallback=function(){},e.prototype.attributeChangedCallback=function(){},$(e,[{key:et,get:function(){return!0}},{key:"node",get:function(){return this[rt]},set:function(t){t[nt]=this,this[rt]=t}}]),e}(t)},ut=self.CustomEvent;try{new ut("test")}catch(t){ut=function(t,e){var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n},ut.prototype=self.CustomEvent.prototype}var st=function(){function t(e){var n=this;Y(this,t),this._=[],e=e||[],o(e)||(e=[e]),this.ctrs=e,this.validator=function(){return!0},this._setter=function(t){return t},this.getterFn=function(){return n.value},this.setterFn=function(t){if(!(null===(t=n._setter(t))||void 0===t||n.validateType(t)&&n.validator(t)))throw new TypeError("Invalid `"+t+"` value for `"+n.name+"` property for `"+n.scope.is+"`.");var e=n.value;e!==t&&(n.value=t,n.initialized&&n.changed(t,e))}}return t.prototype.observe=function(t){return(e(t)||n(t))&&this._.push(t),this},t.prototype.unobserve=function(t){var e=this._.indexOf(t);return e!==-1&&this._.splice(e,1),this},t.prototype.changed=function(t,e){this.defaultSet=!1;for(var r=0,i=this._.length;r<i;r++){var o=this._[r];n(o)?this.scope[o].call(this.scope,this,t,e):o.call(this.scope,this,t,e)}},t.prototype.accepts=function(t){return this.ctrs.indexOf(t)!==-1},t.prototype.named=function(t){return this.name=t,this.attrRequested===!0&&(this.attrName=this.name),this},t.prototype.default=function(t){return this.defaultValue=r(t)?Object.freeze(t):t,this},t.prototype.attribute=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return n(t)?(this.attrRequested=!1,this.attrName=t):(this.attrRequested=!!t,this.attrName=this.name),this},t.prototype.dispatch=function(t){return this.eventName=t,this},t.prototype.getter=function(t){var n=this;return e(t)&&(this.getterFn=function(){return t(n.value)}),this},t.prototype.setter=function(t){return e(t)&&(this._setter=t),this},t.prototype.validate=function(t){return e(t)&&(this.validator=t),this},t.prototype.validateType=function(t){var e=0,n=this.ctrs;if(0===n.length)return!0;for(;e<n.length;){if(t instanceof n[e]||t.constructor&&t.constructor===n[e])return!0;e++}return!1},t.prototype.init=function(t){this.scope=t,J(t,this.name,{get:this.getterFn.bind(this),set:this.setterFn.bind(this),configurable:!0}),i(this.defaultValue)||(t[this.name]=this.defaultValue,this.defaultSet=!0),this.initialized=!0},t}();J(O,"ANY",{get:function(){return O()}}),J(O,"STRING",{get:function(){return O(String)}}),J(O,"BOOLEAN",{get:function(){return O(Boolean)}}),J(O,"NUMBER",{get:function(){return O(Number)}});var ct=function(t){return function(t){function e(n){Y(this,e);var r=W(this,t.call(this,n)),i=x(r,"properties");for(var o in i)i[o]instanceof st||(i[o]=O(i[o]));J(r,"properties",{value:i});var a=r.constructor.observedAttributes||[],u=function(t){var e=i[t];e.named(t).observe(function(t,e,n){return r.propertyChangedCallback(t.name,n,e)}).init(r);var n=e.attrName,o=e.eventName;n||a.indexOf(t)===-1||(e.attribute(),n=t),(n||o)&&e.observe(function(t,i,a){n&&E(r,n,r[e.name]),o&&N(r,o,{component:r,property:t.name,newValue:i,oldValue:a})})};for(var s in i)u(s);return r}return Q(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.properties;for(var n in e){var r=e[n],o=r.attrName,a=r.name;(i(this[a])||r.defaultSet)&&(this.hasAttribute(o||a)?this[a]=M(r,this.getAttribute(o||a)):i(this.node[a])||(this[a]=this.node[a])),o&&E(this,o,this[a])}},e.prototype.attributeChangedCallback=function(e,n,r){t.prototype.attributeChangedCallback.call(this,e,n,r);var i=this.properties;for(var o in i){var a=i[o];if(a.attrName===e)return void(this[a.name]=M(a,r))}},e.prototype.propertyChangedCallback=function(){},e.prototype.observeProperty=function(t,e){return this.properties[t].observe(e)},e.prototype.unobserveProperty=function(t,e){this.properties[t].unobserve(e)},e}(t)},lt=Element.prototype,ft=lt.matches||lt.mozMatchesSelector||lt.msMatchesSelector||lt.oMatchesSelector||lt.webkitMatchesSelector,ht=function(t){return function(t){function r(i){Y(this,r);var o=W(this,t.call(this,i)),a=x(o,"events");for(var u in a){var s=n(a[u])?o[a[u]]:a[u];if(!e(s))throw new TypeError("Invalid callback for event.");var c=u.trim().split(" "),l=c.shift(),f=c.join(" ");a[u]={name:l,selector:f,callback:S.call(o,f,s)}}return J(o,"events",{value:a}),o}return Q(r,t),r.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.events;for(var n in e)this.addEventListener(e[n].name,e[n].callback)},r.prototype.disconnectedCallback=function(){var e=this.events;for(var n in e)this.removeEventListener(e[n].name,e[n].callback);t.prototype.disconnectedCallback.call(this)},r.prototype.delegate=function(t,e,n){var r=S.call(this,e,n);return this.addEventListener(t,r)},r.prototype.trigger=function(t,e){return N(this,t,e,!(arguments.length>2&&void 0!==arguments[2])||arguments[2],!(arguments.length>3&&void 0!==arguments[3])||arguments[3])},r}(t)},pt=document,dt=function(t){return function(t){function e(r){Y(this,e);var i=W(this,t.call(this,r)),o=k(i,"css").filter(function(t){return n(t)}).join("\n");return o&&J(i,"css",{value:o}),i}return Q(e,t),e.prototype.connectedCallback=function(){if(t.prototype.connectedCallback.call(this),n(this.css))if(this.shadowRoot){if(!this[it]){var e=this[it]=P(this);e.textContent=this.css,this.shadowRoot.appendChild(e)}}else if(!this.constructor[it]){var r=this.constructor[it]=P(this);D(this.node).head.appendChild(r),T(r,this.css,this.is)}this.classList.add(this.is)},e}(t)},vt=function(t){return function(t){function n(){return Y(this,n),W(this,t.apply(this,arguments))}return Q(n,t),n.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this),a(this.template)||this.render()},n.prototype.propertyChangedCallback=function(e,n,r){t.prototype.propertyChangedCallback.call(this,e,n,r),a(this.template)||this.render()},n.prototype.render=function(t){if(t=t||this.template,e(t))return t.call(this);var n=this.shadowRoot||this;i(this.__innerHTML)&&(this.__innerHTML=n.innerHTML),n.innerHTML=""+this.__innerHTML+t},n}(t)},yt=function(){function t(e){Y(this,t),e=e||function(){function t(){Y(this,t)}return t}(),this.superclass=e}return t.prototype.with=function(){return C([].slice.call(arguments,0),function(t,e){return e(t)},this.superclass)},t}(),bt=function(t){return new yt(t)},mt={ComponentMixin:at,PropertiesMixin:ct,EventsMixin:ht,StyleMixin:dt,TemplateMixin:vt};new MutationObserver(function(t){t.forEach(function(t){switch(t.type){case"childList":t.addedNodes&&L(t.addedNodes),t.removedNodes&&t.removedNodes.forEach(function(t){f(t)});break;case"attributes":var e=t.attributeName;if("is"===e)break;var n=t.target;h(n,e,t.oldValue,n.getAttribute(e))}})}).observe(document.body,{attributes:!0,childList:!0,subtree:!0});var gt=Object.prototype.hasOwnProperty;I.prototype=Object.create(null);var Ct=function(t,e){return gt.call(t,e)},wt=function(){return new I},kt=function(t,e,n){var r=new B(e,n);return t.__incrementalDOMData=r,r},xt=function(t){return Nt(t),t.__incrementalDOMData},Nt=function t(e){if(!e.__incrementalDOMData){var n=e instanceof Element,r=n?e.localName:e.nodeName,i=n?e.getAttribute("key"):null,o=kt(e,r,i);if(i&&(xt(e.parentNode).keyMap[i]=e),n)for(var a=e.attributes,u=o.attrs,s=o.newAttrs,c=o.attrsArr,l=0;l<a.length;l+=1){var f=a[l],h=f.name,p=f.value;u[h]=p,s[h]=void 0,c.push(h),c.push(p)}for(var d=e.firstChild;d;d=d.nextSibling)t(d)}},Ot={nodesCreated:null,nodesDeleted:null};F.prototype.markCreated=function(t){this.created&&this.created.push(t)},F.prototype.markDeleted=function(t){this.deleted&&this.deleted.push(t)},F.prototype.notifyChanges=function(){this.created&&this.created.length>0&&Ot.nodesCreated(this.created),this.deleted&&this.deleted.length>0&&Ot.nodesDeleted(this.deleted)};var Mt=function(t){return t instanceof Document||t instanceof DocumentFragment},Et=function(t,e){for(var n=[],r=t;r!==e;)n.push(r),r=r.parentNode;return n},At=function(t){for(var e=t,n=e;e;)n=e,e=e.parentNode;return n},_t=function(t){var e=At(t);return Mt(e)?e.activeElement:null},St=function(t,e){var n=_t(t);return n&&t.contains(n)?Et(n,e):[]},jt=null,Tt=null,Dt=null,Pt=null,Lt=function(t,e){for(var n=0;n<t.length;n+=1)xt(t[n]).focused=e},Rt=function(t){return function(e,n,r){var i=jt,o=Pt,a=Tt,u=Dt;jt=new F,Pt=e.ownerDocument,Dt=e.parentNode;var s=St(e,Dt);Lt(s,!0);var c=t(e,n,r);return Lt(s,!1),jt.notifyChanges(),jt=i,Pt=o,Tt=a,Dt=u,c}},Vt=Rt(function(t,e,n){return Tt=t,Ft(),e(n),Ht(),t}),It=function(t,e,n){t.removeChild(e),jt.markDeleted(e);var r=xt(e).key;r&&delete n[r]},Bt=function(){var t=Dt,e=xt(t),n=e.keyMap,r=e.keyMapValid,i=t.lastChild,o=void 0;if(i!==Tt||!r){for(;i!==Tt;)It(t,i,n),i=t.lastChild;if(!r){for(o in n)i=n[o],i.parentNode!==t&&(jt.markDeleted(i),delete n[o]);e.keyMapValid=!0}}},Ft=function(){Dt=Tt,Tt=null},Ht=function(){Bt(),Tt=Dt,Dt=Dt.parentNode},zt={default:"__default"},qt=function(t){return 0===t.lastIndexOf("xml:",0)?"http://www.w3.org/XML/1998/namespace":0===t.lastIndexOf("xlink:",0)?"http://www.w3.org/1999/xlink":void 0},Xt=function(t,e,n){if(null==n)t.removeAttribute(e);else{var r=qt(e);r?t.setAttributeNS(r,e,n):t.setAttribute(e,n)}},Gt=function(t,e,n){t[e]=n},Jt=function(t,e,n){e.indexOf("-")>=0?t.setProperty(e,n):t[e]=n},Ut=function(t,e,n){if("string"==typeof n)t.style.cssText=n;else{t.style.cssText="";var r=t.style,i=n;for(var o in i)Ct(i,o)&&Jt(r,o,i[o])}},Yt=function(t,e,n){var r=void 0===n?"undefined":U(n);"object"===r||"function"===r?Gt(t,e,n):Xt(t,e,n)},$t=wt();$t[zt.default]=Yt,$t.style=Ut;var Kt=function(t){return function(t){function n(){return Y(this,n),W(this,t.apply(this,arguments))}return Q(n,t),n.prototype.render=function(n){var r=this;if(n=n||this.template,e(n)){var i=n.bind(this);n=function(){return z(r.shadowRoot||r.node,i)}}t.prototype.render.call(this,n)},n}(t)},Qt=function(t){return function(t){function e(){return Y(this,e),W(this,t.apply(this,arguments))}return Q(e,t),$(e,[{key:"is",get:function(){return(this.node.getAttribute("is")||this.node.localName).toLowerCase()}},{key:"node",get:function(){return this}}]),e}(t)};mt.CustomElementMixin=Qt,mt.IDOMMixin=Kt;var Wt=function(t){function e(){return Y(this,e),W(this,t.apply(this,arguments))}return Q(e,t),e}(bt(q(self.HTMLElement)).with(mt.ComponentMixin,mt.PropertiesMixin,mt.StyleMixin,mt.EventsMixin,mt.TemplateMixin,Kt,Qt));t.registry=tt,t.define=R,t.bootstrap=V,t.shim=q,t.render=X,t.MIXINS=mt,t.BaseComponent=Wt,t.DOM=ot,t.mix=bt,t.prop=O,Object.defineProperty(t,"__esModule",{value:!0})});

//# sourceMappingURL=dna-custom-elements-v1.observer.js.map
