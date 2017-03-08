!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.DNA=t.DNA||{})}(this,function(t){"use strict";function e(t){return"function"==typeof t}function n(t){return"string"==typeof t}function r(t){return"[object Object]"===Object.prototype.toString.call(t)}function i(t){return void 0===t}function o(t){return Array.isArray(t)}function a(t){return i(t)||null===t||t===!1}function u(t){return self.Symbol?self.Symbol(t):"__"+t}function c(t){return t&&t.node}function s(t){return t&&t[ot]}function l(t){if(t=s(t)||t,t[it])return t.connectedCallback.call(t),!0}function f(t){if(t=s(t)||t,t[it])return t.disconnectedCallback.call(t),!0}function h(t,e,n,r){if(t=s(t)||t,t[it]){if((t.constructor.observedAttributes||[]).indexOf(e)!==-1)return t.attributeChangedCallback.call(t,e,n,r),!0}}function p(t){if(n(t)&&(t=rt.get(t)),e(t))return new t}function d(t,e){return t=c(t)||t,e=c(e)||e,(t!==e.parentNode||t.lastElementChild!==e)&&(e.parentNode&&v(e.parentNode,e),t.appendChild(e),l(e))}function v(t,e){return t=c(t)||t,e=c(e)||e,t.removeChild(e),f(e)}function y(t,e,n){if(t=c(t)||t,e=c(e)||e,n=c(n)||n,e.nextSibling!==n)return e.parentNode&&f(e),t.insertBefore(e,n),l(e)}function b(t,e,n){return e=c(e)||e,n=c(n)||n,e.parentNode&&f(e),t.replaceChild(e,n),f(n),l(e)}function m(t,e,n){t=c(t)||t;var r=t.getAttribute(e);return t.setAttribute(e,n),h(t,e,r,n)}function g(t,e){t=c(t)||t;var n=t.getAttribute(e);return t.removeAttribute(e),h(t,e,n,null)}function C(t,e,n){for(var r=0,i=t.length;r<i;r++)n=e(n,t[r],r,t);return n}function w(t,e,n){for(;t;)n=e(n,t),t=Object.getPrototypeOf(t);return n}function k(t,e){return w(t,function(n,r){if(r.hasOwnProperty(e)){var i=Object.getOwnPropertyDescriptor(r,e),o=void 0;i.hasOwnProperty("value")?o=i.value:i.hasOwnProperty("get")&&(o=i.get.call(t)),n.push(o)}return n},[])}function x(t,e){return C(k(t,e),function(t,e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n]);return t},{})}function O(t,e,r){var i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if(!n(e))throw new TypeError("Event name is undefined");var a=new lt(e,{detail:r,bubbles:i,cancelable:o});return t.dispatchEvent(a)}function N(t){return new ft(t)}function A(t,e){if(""===e&&t.accepts(Boolean))return!0;if(!t.accepts(String))try{return JSON.parse(e)}catch(t){}return e}function M(t,e,n){var r=t.getAttribute(e);r!==n&&(a(n)?null!==r&&t.removeAttribute(e):("boolean"==typeof n&&(n=""),t.setAttribute(e,n)))}function E(t,e){return dt.call(t,e)}function S(t,e,n){if(!n)return e;for(var r=t.target;r&&r!==e;){if(E(r,n))return r;r=r.parentNode}return null}function _(t,e){var n=this;return function(r){var i=S(r,n.node,t);i&&e.call(n,r,i)}}function T(t,e){var n=t.cssRules||t.rules;if(t.insertRule){var r=function(){for(var t=new RegExp(e+"([\\s.[:]|$)"),r="",i=0,o=n.length;i<o;i++){var a=n[i],u=a.cssText;if(a.selectorText){var c=a.cssText.split("{").shift().split(",").map(function(n){return n=n.trim(),n.match(t)?n:e+" "+n}).join(", ");r+=a.cssText.replace(a.selectorText,c)}else a.cssRules||a.rules?(T(a,e),r+=a.cssText):r+=u}return{v:r}}();if("object"===(void 0===r?"undefined":K(r)))return r.v}}function j(t,e,n){var r="."+n;t.textContent=e.replace(/\:host(\(([^({)]+(\([^)]*\))?)+\))?/g,function(t,e){return""+r+(e?e.slice(1,-1):"")}),t.textContent=T(t.sheet,r)||""}function D(t){return t.ownerDocument||yt}function P(t){var e=D(t.node).createElement("style");return e.id="style-"+t.is,e}function R(){}function L(t,e){this.attrs=Ot(),this.attrsArr=[],this.newAttrs=Ot(),this.staticsApplied=!1,this.key=e,this.keyMap=Ot(),this.keyMapValid=!0,this.focused=!1,this.nodeName=t,this.text=null}function I(){this.created=Tt.nodesCreated&&[],this.deleted=Tt.nodesDeleted&&[]}function B(t){t.forEach(function(t){e(t)?t():o(t)?B(t):t&&me(t)})}function V(t,n){var r=this;if(e(t)){var i=t.call(this,n);V.call(this,i)}else o(t)&&t.forEach(function(t){V.call(r,t)})}function q(t,e){for(var i=arguments.length,o=Array(i>2?i-2:0),u=2;u<i;u++)o[u-2]=arguments[u];return function(){r(e)||(e&&o.unshift(e),e={});var i=e.key;delete e.key;var u=rt.get(e.is||t);de(t,i);for(var c in e){var l=e[c];a(l)||u&&!n(l)&&isNaN(l)&&l!==!0||ve(c,l)}var f=ye(t),h=u&&(s(f)||new u(f));if(h&&r(h.properties)){var p=h.properties;for(var d in e)p.hasOwnProperty(d)&&(h[d]=e[d])}return h&&0===o.length?ne():B(o),be(t),f}}function z(t,e,n){return Ut(t,V.bind(this,e,n))}function F(){if(!this.node)throw new ReferenceError("The component's `node` is undefined.")}function H(t,e,n){var r={};0===n?r.value=function(){var t;F.call(this);for(var n=arguments.length,r=Array(n),i=0;i<n;i++)r[i]=arguments[i];return(t=this.node[e]).call.apply(t,[this.node].concat(r))}:n>0&&(r.get=function(){return F.call(this),this.node[e]},n>1&&(r.set=function(t){return F.call(this),this.node[e]=t})),Object.defineProperty(t,e,r)}function U(t){for(var e in we)H(t.prototype,e,we[e]);return t}function X(t){for(var e in rt.components)for(var n=rt.get(e),r=t.querySelectorAll(e+', [is="'+e+'"]'),i=0,o=r.length;i<o;i++){var a=new n(r[i]);l(a)}}function G(t,e,n){return rt.define(t,e,n)}function J(t,e,n){var r=new e;for(var i in n)r[i]=n[i];return d(t,r),r}var Y,$=Object.defineProperty,K="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Q=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},W=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),Z=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},tt=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},et=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},nt="components",rt=(Y={},Z(Y,nt,{}),Z(Y,"define",function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};t=t.toLowerCase(),$(e.prototype,"is",{get:function(){return t}}),this[nt][t]={is:t,Ctr:e,config:n}}),Z(Y,"get",function(t,e){var n=this[nt][t.toLowerCase()];if(n)return e?n:n.Ctr}),Y),it=u("dna"),ot=u("component"),at=u("node"),ut=u("style"),ct=Object.freeze({getComponentNode:c,getNodeComponent:s,connect:l,disconnect:f,update:h,createElement:p,appendChild:d,removeChild:v,insertBefore:y,replaceChild:b,setAttribute:m,removeAttribute:g}),st=function(t){return function(t){function e(){return Q(this,e),et(this,t.apply(this,arguments))}return tt(e,t),e.prototype.connectedCallback=function(){this.node[ot]=this},e.prototype.disconnectedCallback=function(){},e.prototype.attributeChangedCallback=function(){},W(e,[{key:it,get:function(){return!0}},{key:"node",get:function(){return this[at]},set:function(t){t[ot]=this,this[at]=t}}]),e}(t)},lt=self.CustomEvent;try{new lt("test")}catch(t){lt=function(t,e){var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n},lt.prototype=self.CustomEvent.prototype}var ft=function(){function t(e){var n=this;Q(this,t),this._=[],e=e||[],o(e)||(e=[e]),this.ctrs=e,this.validator=function(){return!0},this._setter=function(t){return t},this.getterFn=function(){return n.value},this.setterFn=function(t){if(!(null===(t=n._setter(t))||void 0===t||n.validateType(t)&&n.validator(t)))throw new TypeError("Invalid `"+t+"` value for `"+n.name+"` property for `"+n.scope.is+"`.");var e=n.value;e!==t&&(n.value=t,n.initialized&&n.changed(t,e))}}return t.prototype.observe=function(t){return(e(t)||n(t))&&this._.push(t),this},t.prototype.unobserve=function(t){var e=this._.indexOf(t);return e!==-1&&this._.splice(e,1),this},t.prototype.changed=function(t,e){this.defaultSet=!1;for(var r=0,i=this._.length;r<i;r++){var o=this._[r];n(o)?this.scope[o].call(this.scope,this,t,e):o.call(this.scope,this,t,e)}},t.prototype.accepts=function(t){return this.ctrs.indexOf(t)!==-1},t.prototype.named=function(t){return this.name=t,this.attrRequested===!0&&(this.attrName=this.name),this},t.prototype.default=function(t){return this.defaultValue=r(t)?Object.freeze(t):t,this},t.prototype.attribute=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return n(t)?(this.attrRequested=!1,this.attrName=t):(this.attrRequested=!!t,this.attrName=this.name),this},t.prototype.dispatch=function(t){return this.eventName=t,this},t.prototype.getter=function(t){var n=this;return e(t)&&(this.getterFn=function(){return t(n.value)}),this},t.prototype.setter=function(t){return e(t)&&(this._setter=t),this},t.prototype.validate=function(t){return e(t)&&(this.validator=t),this},t.prototype.validateType=function(t){var e=0,n=this.ctrs;if(0===n.length)return!0;for(;e<n.length;){if(t instanceof n[e]||t.constructor&&t.constructor===n[e])return!0;e++}return!1},t.prototype.init=function(t){this.scope=t,$(t,this.name,{get:this.getterFn.bind(this),set:this.setterFn.bind(this),configurable:!0}),i(this.defaultValue)||(t[this.name]=this.defaultValue,this.defaultSet=!0),this.initialized=!0},t}();$(N,"ANY",{get:function(){return N()}}),$(N,"STRING",{get:function(){return N(String)}}),$(N,"BOOLEAN",{get:function(){return N(Boolean)}}),$(N,"NUMBER",{get:function(){return N(Number)}});var ht=function(t){return function(t){function e(n){Q(this,e);var r=et(this,t.call(this,n)),i=x(r,"properties");for(var o in i)i[o]instanceof ft||(i[o]=N(i[o]));$(r,"properties",{value:i});var a=r.constructor.observedAttributes||[],u=function(t){var e=i[t];e.named(t).observe(function(t,e,n){return r.propertyChangedCallback(t.name,n,e)}).init(r);var n=e.attrName,o=e.eventName;n||a.indexOf(t)===-1||(e.attribute(),n=t),(n||o)&&e.observe(function(t,i,a){n&&M(r,n,r[e.name]),o&&O(r,o,{component:r,property:t.name,newValue:i,oldValue:a})})};for(var c in i)u(c);return r}return tt(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.properties;for(var n in e){var r=e[n],o=r.attrName,a=r.name;(i(this[a])||r.defaultSet)&&(this.hasAttribute(o||a)?this[a]=A(r,this.getAttribute(o||a)):i(this.node[a])||(this[a]=this.node[a])),o&&M(this,o,this[a])}},e.prototype.attributeChangedCallback=function(e,n,r){t.prototype.attributeChangedCallback.call(this,e,n,r);var i=this.properties;for(var o in i){var a=i[o];if(a.attrName===e)return void(this[a.name]=A(a,r))}},e.prototype.propertyChangedCallback=function(){},e.prototype.observeProperty=function(t,e){return this.properties[t].observe(e)},e.prototype.unobserveProperty=function(t,e){this.properties[t].unobserve(e)},e}(t)},pt=Element.prototype,dt=pt.matches||pt.mozMatchesSelector||pt.msMatchesSelector||pt.oMatchesSelector||pt.webkitMatchesSelector,vt=function(t){return function(t){function r(i){Q(this,r);var o=et(this,t.call(this,i)),a=x(o,"events");for(var u in a){var c=n(a[u])?o[a[u]]:a[u];if(!e(c))throw new TypeError("Invalid callback for event.");var s=u.trim().split(" "),l=s.shift(),f=s.join(" ");a[u]={name:l,selector:f,callback:_.call(o,f,c)}}return $(o,"events",{value:a}),o}return tt(r,t),r.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.events;for(var n in e)this.addEventListener(e[n].name,e[n].callback)},r.prototype.disconnectedCallback=function(){var e=this.events;for(var n in e)this.removeEventListener(e[n].name,e[n].callback);t.prototype.disconnectedCallback.call(this)},r.prototype.delegate=function(t,e,n){var r=_.call(this,e,n);return this.addEventListener(t,r)},r.prototype.trigger=function(t,e){return O(this,t,e,!(arguments.length>2&&void 0!==arguments[2])||arguments[2],!(arguments.length>3&&void 0!==arguments[3])||arguments[3])},r}(t)},yt=document,bt=function(t){return function(t){function e(r){Q(this,e);var i=et(this,t.call(this,r)),o=k(i,"css").filter(function(t){return n(t)}).join("\n");return o&&$(i,"css",{value:o}),i}return tt(e,t),e.prototype.connectedCallback=function(){if(t.prototype.connectedCallback.call(this),n(this.css))if(this.shadowRoot){if(!this[ut]){var e=this[ut]=P(this);e.textContent=this.css,this.shadowRoot.appendChild(e)}}else if(!this.constructor[ut]){var r=this.constructor[ut]=P(this);D(this.node).head.appendChild(r),j(r,this.css,this.is)}this.classList.add(this.is)},e}(t)},mt=function(t){return function(t){function n(){return Q(this,n),et(this,t.apply(this,arguments))}return tt(n,t),n.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this),a(this.template)||this.render()},n.prototype.propertyChangedCallback=function(e,n,r){t.prototype.propertyChangedCallback.call(this,e,n,r),a(this.template)||this.render()},n.prototype.render=function(t){if(t=t||this.template,e(t))return t.call(this);var n=this.shadowRoot||this;i(this.__innerHTML)&&(this.__innerHTML=n.innerHTML),n.innerHTML=""+this.__innerHTML+t},n}(t)},gt=function(){function t(e){Q(this,t),e=e||function(){function t(){Q(this,t)}return t}(),this.superclass=e}return t.prototype.with=function(){return C([].slice.call(arguments,0),function(t,e){return e(t)},this.superclass)},t}(),Ct=function(t){return new gt(t)},wt={ComponentMixin:st,PropertiesMixin:ht,EventsMixin:vt,StyleMixin:bt,TemplateMixin:mt},kt=Object.prototype.hasOwnProperty;R.prototype=Object.create(null);var xt=function(t,e){return kt.call(t,e)},Ot=function(){return new R},Nt=function(t,e,n){var r=new L(e,n);return t.__incrementalDOMData=r,r},At=function(t){return Mt(t),t.__incrementalDOMData},Mt=function t(e){if(!e.__incrementalDOMData){var n=e instanceof Element,r=n?e.localName:e.nodeName,i=n?e.getAttribute("key"):null,o=Nt(e,r,i);if(i&&(At(e.parentNode).keyMap[i]=e),n)for(var a=e.attributes,u=o.attrs,c=o.newAttrs,s=o.attrsArr,l=0;l<a.length;l+=1){var f=a[l],h=f.name,p=f.value;u[h]=p,c[h]=void 0,s.push(h),s.push(p)}for(var d=e.firstChild;d;d=d.nextSibling)t(d)}},Et=function(t,e){return"svg"===t?"http://www.w3.org/2000/svg":"foreignObject"===At(e).nodeName?null:e.namespaceURI},St=function(t,e,n,r){var i=Et(n,e),o=void 0;return o=i?t.createElementNS(i,n):t.createElement(n),Nt(o,n,r),o},_t=function(t){var e=t.createTextNode("");return Nt(e,"#text",null),e},Tt={nodesCreated:null,nodesDeleted:null};I.prototype.markCreated=function(t){this.created&&this.created.push(t)},I.prototype.markDeleted=function(t){this.deleted&&this.deleted.push(t)},I.prototype.notifyChanges=function(){this.created&&this.created.length>0&&Tt.nodesCreated(this.created),this.deleted&&this.deleted.length>0&&Tt.nodesDeleted(this.deleted)};var jt=function(t){return t instanceof Document||t instanceof DocumentFragment},Dt=function(t,e){for(var n=[],r=t;r!==e;)n.push(r),r=r.parentNode;return n},Pt=function(t){for(var e=t,n=e;e;)n=e,e=e.parentNode;return n},Rt=function(t){var e=Pt(t);return jt(e)?e.activeElement:null},Lt=function(t,e){var n=Rt(t);return n&&t.contains(n)?Dt(n,e):[]},It=function(t,e,n){for(var r=e.nextSibling,i=n;i!==e;){var o=i.nextSibling;t.insertBefore(i,r),i=o}},Bt=null,Vt=null,qt=null,zt=null,Ft=function(t,e){for(var n=0;n<t.length;n+=1)At(t[n]).focused=e},Ht=function(t){return function(e,n,r){var i=Bt,o=zt,a=Vt,u=qt;Bt=new I,zt=e.ownerDocument,qt=e.parentNode;var c=Lt(e,qt);Ft(c,!0);var s=t(e,n,r);return Ft(c,!1),Bt.notifyChanges(),Bt=i,zt=o,Vt=a,qt=u,s}},Ut=Ht(function(t,e,n){return Vt=t,$t(),e(n),Wt(),t}),Xt=function(t,e,n){var r=At(t);return e===r.nodeName&&n==r.key},Gt=function(t,e){if(!Vt||!Xt(Vt,t,e)){var n=At(qt),r=Vt&&At(Vt),i=n.keyMap,o=void 0;if(e){var a=i[e];a&&(Xt(a,t,e)?o=a:a===Vt?Bt.markDeleted(a):Jt(qt,a,i))}o||(o="#text"===t?_t(zt):St(zt,qt,t,e),e&&(i[e]=o),Bt.markCreated(o)),At(o).focused?It(qt,o,Vt):r&&r.key&&!r.focused?(qt.replaceChild(o,Vt),n.keyMapValid=!1):qt.insertBefore(o,Vt),Vt=o}},Jt=function(t,e,n){t.removeChild(e),Bt.markDeleted(e);var r=At(e).key;r&&delete n[r]},Yt=function(){var t=qt,e=At(t),n=e.keyMap,r=e.keyMapValid,i=t.lastChild,o=void 0;if(i!==Vt||!r){for(;i!==Vt;)Jt(t,i,n),i=t.lastChild;if(!r){for(o in n)i=n[o],i.parentNode!==t&&(Bt.markDeleted(i),delete n[o]);e.keyMapValid=!0}}},$t=function(){qt=Vt,Vt=null},Kt=function(){return Vt?Vt.nextSibling:qt.firstChild},Qt=function(){Vt=Kt()},Wt=function(){Yt(),Vt=qt,qt=qt.parentNode},Zt=function(t,e){return Qt(),Gt(t,e),$t(),qt},te=function(){return Wt(),Vt},ee=function(){return Qt(),Gt("#text",null),Vt},ne=function(){Vt=qt.lastChild},re={default:"__default"},ie=function(t){return 0===t.lastIndexOf("xml:",0)?"http://www.w3.org/XML/1998/namespace":0===t.lastIndexOf("xlink:",0)?"http://www.w3.org/1999/xlink":void 0},oe=function(t,e,n){if(null==n)t.removeAttribute(e);else{var r=ie(e);r?t.setAttributeNS(r,e,n):t.setAttribute(e,n)}},ae=function(t,e,n){t[e]=n},ue=function(t,e,n){e.indexOf("-")>=0?t.setProperty(e,n):t[e]=n},ce=function(t,e,n){if("string"==typeof n)t.style.cssText=n;else{t.style.cssText="";var r=t.style,i=n;for(var o in i)xt(i,o)&&ue(r,o,i[o])}},se=function(t,e,n){var r=void 0===n?"undefined":K(n);"object"===r||"function"===r?ae(t,e,n):oe(t,e,n)},le=function(t,e,n){var r=At(t),i=r.attrs;if(i[e]!==n){(fe[e]||fe[re.default])(t,e,n),i[e]=n}},fe=Ot();fe[re.default]=se,fe.style=ce;var he=[],pe=function(t,e,n,r){var i=Zt(t,e),o=At(i);if(!o.staticsApplied){if(n)for(var a=0;a<n.length;a+=2){var u=n[a],c=n[a+1];le(i,u,c)}o.staticsApplied=!0}for(var s=o.attrsArr,l=o.newAttrs,f=!s.length,h=3,p=0;h<arguments.length;h+=2,p+=2){var d=arguments[h];if(f)s[p]=d,l[d]=void 0;else if(s[p]!==d)break;var v=arguments[h+1];(f||s[p+1]!==v)&&(s[p+1]=v,le(i,d,v))}if(h<arguments.length||p<s.length){for(;h<arguments.length;h+=1,p+=1)s[p]=arguments[h];for(p<s.length&&(s.length=p),h=0;h<s.length;h+=2){var y=s[h],b=s[h+1];l[y]=b}for(var m in l)le(i,m,l[m]),l[m]=void 0}return i},de=function(t,e,n){he[0]=t,he[1]=e,he[2]=n},ve=function(t,e){he.push(t),he.push(e)},ye=function(){var t=pe.apply(null,he);return he.length=0,t},be=function(t){return te()},me=function(t,e){var n=ee(),r=At(n);if(r.text!==t){r.text=t;for(var i=t,o=1;o<arguments.length;o+=1){i=(0,arguments[o])(i)}n.data=i}return n},ge=Object.freeze({h:q,patch:z,text:me}),Ce=function(t){return function(t){function n(){return Q(this,n),et(this,t.apply(this,arguments))}return tt(n,t),n.prototype.render=function(n){var r=this;if(n=n||this.template,e(n)){var i=n.bind(this);n=function(){return z(r.shadowRoot||r.node,i)}}t.prototype.render.call(this,n)},n}(t)},we={attributes:1,classList:1,getAttribute:0,hasAttribute:0,setAttribute:0,removeAttribute:0,addEventListener:0,removeEventListener:0,dispatchEvent:0,style:1,querySelector:0,querySelectorAll:0,shadowRoot:1,attachShadow:0,createShadowRoot:0,innerText:2,innerHTML:2};wt.IDOMMixin=Ce;var ke=U(function(){function t(e){Q(this,t),this.node=e||document.createElement(this.is)}return t}()),xe=function(t){function e(){return Q(this,e),et(this,t.apply(this,arguments))}return tt(e,t),e}(Ct(ke).with(wt.ComponentMixin,wt.PropertiesMixin,wt.StyleMixin,wt.EventsMixin,wt.TemplateMixin,Ce));t.proxy=U,t.IDOM=ge,t.BaseComponent=xe,t.registry=rt,t.bootstrap=X,t.define=G,t.render=J,t.DOM=ct,t.MIXINS=wt,t.mix=Ct,t.prop=N,Object.defineProperty(t,"__esModule",{value:!0})});

//# sourceMappingURL=dna-idom.js.map
