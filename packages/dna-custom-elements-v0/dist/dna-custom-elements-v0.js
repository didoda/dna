!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.DNA=t.DNA||{})}(this,function(t){"use strict";function e(t){return"function"==typeof t}function n(t){return"string"==typeof t}function r(t){return"[object Object]"===Object.prototype.toString.call(t)}function i(t){return void 0===t}function o(t){return Array.isArray(t)}function a(t){return i(t)||null===t||t===!1}function u(t){return self.Symbol?self.Symbol(t):"__"+t}function s(t){return t&&t[J]}function c(t,e,n){for(var r=0,i=t.length;r<i;r++)n=e(n,t[r],r,t);return n}function l(t,e,n){for(;t;)n=e(n,t),t=Object.getPrototypeOf(t);return n}function f(t,e){return l(t,function(n,r){if(r.hasOwnProperty(e)){var i=Object.getOwnPropertyDescriptor(r,e),o=void 0;i.hasOwnProperty("value")?o=i.value:i.hasOwnProperty("get")&&(o=i.get.call(t)),n.push(o)}return n},[])}function h(t,e){return c(f(t,e),function(t,e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n]);return t},{})}function p(t,e,r){var i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if(!n(e))throw new TypeError("Event name is undefined");var a=new Q(e,{detail:r,bubbles:i,cancelable:o});return t.dispatchEvent(a)}function d(t){return new W(t)}function v(t,e){if(""===e&&t.accepts(Boolean))return!0;if(!t.accepts(String))try{return JSON.parse(e)}catch(t){}return e}function y(t,e,n){var r=t.getAttribute(e);r!==n&&(a(n)?null!==r&&t.removeAttribute(e):("boolean"==typeof n&&(n=""),t.setAttribute(e,n)))}function b(t,e){return et.call(t,e)}function m(t,e,n){if(!n)return e;for(var r=t.target;r&&r!==e;){if(b(r,n))return r;r=r.parentNode}return null}function g(t,e){var n=this;return function(r){var i=m(r,n.node,t);i&&e.call(n,r,i)}}function C(t,e){var n=t.cssRules||t.rules;t.insertRule&&function(){for(var r=new RegExp(e+"([\\s.[:]|$)"),i=0,o=n.length;i<o;i++){var a=n[i];try{var u=a.cssText;if(a.selectorText){var s=a.cssText.split("{").shift().split(",").map(function(t){return t=t.trim(),t.match(r)?t:e+" "+t}).join(", ");u=a.cssText.replace(a.selectorText,s)}else(a.cssRules||a.rules)&&(C(a,e),u=a.cssText);t.deleteRule(i),t.insertRule(u,i)}catch(t){}}}()}function w(t,e,n){var r="."+n;t.textContent=e.replace(/\:host(\(([^({)]+(\([^)]*\))?)+\))?/g,function(t,e){return""+r+(e?e.slice(1,-1):"")}),C(t.sheet,r)}function k(t){return t.ownerDocument||rt}function x(t){var e=k(t.node).createElement("style");return e.id="style-"+t.is,e}function O(){}function M(t,e){this.attrs=ft(),this.attrsArr=[],this.newAttrs=ft(),this.staticsApplied=!1,this.key=e,this.keyMap=ft(),this.keyMapValid=!0,this.focused=!1,this.nodeName=t,this.text=null}function _(){this.created=mt.nodesCreated&&[],this.deleted=mt.nodesDeleted&&[]}function N(t){t.forEach(function(t){e(t)?t():o(t)?N(t):t&&oe(t)})}function E(t,n){var r=this;if(e(t)){var i=t.call(this,n);E.call(this,i)}else o(t)&&t.forEach(function(t){E.call(r,t)})}function S(t,e){for(var i=arguments.length,o=Array(i>2?i-2:0),u=2;u<i;u++)o[u-2]=arguments[u];return function(){r(e)||(e&&o.unshift(e),e={});var i=e.key;delete e.key;var u=X.get(e.is||t);ee(t,i);for(var c in e){var l=e[c];a(l)||u&&!n(l)&&isNaN(l)&&l!==!0||ne(c,l)}var f=re(t),h=u&&(s(f)||new u(f));if(h&&r(h.properties)){var p=h.properties;for(var d in e)p.hasOwnProperty(d)&&(h[d]=e[d])}return h&&0===o.length?qt():N(o),ie(t),f}}function A(t,e,n){return Tt(t,E.bind(this,e,n))}function T(t){try{return!n(t.outerHTML)}catch(t){return!0}}function j(t){var e=function t(){if(B(this,t),!T(this))return this;var e=X.get(this.is,!0),n=e.config,r=document.createElement(n.extends?n.extends:e.is);return r.__proto__=e.Ctr.prototype,n.extends&&r.setAttribute("is",e.is),r};return e.prototype=Object.create(t.prototype,{constructor:{value:e,configurable:!0,writable:!0}}),e}function D(t){var n=X.get(t.getAttribute("is")||t.tagName);return!!e(n)&&(t.__proto__=n.prototype,I(t,"constructor",{value:n,configurable:!0,writable:!0}),n.call(t),!0)}function P(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};X.define(t,e,n);var r={prototype:e.prototype};return n.extends&&(r.extends=n.extends),document.registerElement(t,r)}function R(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=new e;for(var i in n)r[i]=n[i];return t.appendChild(r),r}var L,I=Object.defineProperty,V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},B=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},H=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),F=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},z=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},q=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},U="components",X=(L={},F(L,U,{}),F(L,"define",function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};t=t.toLowerCase(),I(e.prototype,"is",{get:function(){return t}}),this[U][t]={is:t,Ctr:e,config:n}}),F(L,"get",function(t,e){var n=this[U][t.toLowerCase()];if(n)return e?n:n.Ctr}),L),G=u("dna"),J=u("component"),Y=u("node"),$=u("style"),K=function(t){return function(t){function e(){return B(this,e),q(this,t.apply(this,arguments))}return z(e,t),e.prototype.connectedCallback=function(){this.node[J]=this},e.prototype.disconnectedCallback=function(){},e.prototype.attributeChangedCallback=function(){},H(e,[{key:G,get:function(){return!0}},{key:"node",get:function(){return this[Y]},set:function(t){t[J]=this,this[Y]=t}}]),e}(t)},Q=self.CustomEvent;try{new Q("test")}catch(t){Q=function(t,e){var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n},Q.prototype=self.CustomEvent.prototype}var W=function(){function t(e){var n=this;B(this,t),this._=[],e=e||[],o(e)||(e=[e]),this.ctrs=e,this.validator=function(){return!0},this._setter=function(t){return t},this.getterFn=function(){return n.value},this.setterFn=function(t){if(!(null===(t=n._setter(t))||void 0===t||n.validateType(t)&&n.validator(t)))throw new TypeError("Invalid `"+t+"` value for `"+n.name+"` property for `"+n.scope.is+"`.");var e=n.value;e!==t&&(n.value=t,n.initialized&&n.changed(t,e))}}return t.prototype.observe=function(t){return(e(t)||n(t))&&this._.push(t),this},t.prototype.unobserve=function(t){var e=this._.indexOf(t);return e!==-1&&this._.splice(e,1),this},t.prototype.changed=function(t,e){this.defaultSet=!1;for(var r=0,i=this._.length;r<i;r++){var o=this._[r];n(o)?this.scope[o].call(this.scope,this,t,e):o.call(this.scope,this,t,e)}},t.prototype.accepts=function(t){return this.ctrs.indexOf(t)!==-1},t.prototype.named=function(t){return this.name=t,this.attrRequested===!0&&(this.attrName=this.name),this},t.prototype.default=function(t){return this.defaultValue=r(t)?Object.freeze(t):t,this},t.prototype.attribute=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return n(t)?(this.attrRequested=!1,this.attrName=t):(this.attrRequested=!!t,this.attrName=this.name),this},t.prototype.dispatch=function(t){return this.eventName=t,this},t.prototype.getter=function(t){var n=this;return e(t)&&(this.getterFn=function(){return t(n.value)}),this},t.prototype.setter=function(t){return e(t)&&(this._setter=t),this},t.prototype.validate=function(t){return e(t)&&(this.validator=t),this},t.prototype.validateType=function(t){var e=0,n=this.ctrs;if(0===n.length)return!0;for(;e<n.length;){if(t instanceof n[e]||t.constructor&&t.constructor===n[e])return!0;e++}return!1},t.prototype.init=function(t){this.scope=t,I(t,this.name,{get:this.getterFn.bind(this),set:this.setterFn.bind(this),configurable:!0}),i(this.defaultValue)||(t[this.name]=this.defaultValue,this.defaultSet=!0),this.initialized=!0},t}();I(d,"ANY",{get:function(){return d()}}),I(d,"STRING",{get:function(){return d(String)}}),I(d,"BOOLEAN",{get:function(){return d(Boolean)}}),I(d,"NUMBER",{get:function(){return d(Number)}});var Z=function(t){return function(t){function e(n){B(this,e);var r=q(this,t.call(this,n)),i=h(r,"properties");for(var o in i)i[o]instanceof W||(i[o]=d(i[o]));I(r,"properties",{value:i});var a=r.constructor.observedAttributes||[],u=function(t){var e=i[t];e.named(t).observe(function(t,e,n){return r.propertyChangedCallback(t.name,n,e)}).init(r);var n=e.attrName,o=e.eventName;n||a.indexOf(t)===-1||(e.attribute(),n=t),(n||o)&&e.observe(function(t,i,a){n&&y(r,n,r[e.name]),o&&p(r,o,{component:r,property:t.name,newValue:i,oldValue:a})})};for(var s in i)u(s);return r}return z(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.properties;for(var n in e){var r=e[n],o=r.attrName,a=r.name;(i(this[a])||r.defaultSet)&&(this.hasAttribute(o||a)?this[a]=v(r,this.getAttribute(o||a)):i(this.node[a])||(this[a]=this.node[a])),o&&y(this,o,this[a])}},e.prototype.attributeChangedCallback=function(e,n,r){t.prototype.attributeChangedCallback.call(this,e,n,r);var i=this.properties;for(var o in i){var a=i[o];if(a.attrName===e)return void(this[a.name]=v(a,r))}},e.prototype.propertyChangedCallback=function(){},e.prototype.observeProperty=function(t,e){return this.properties[t].observe(e)},e.prototype.unobserveProperty=function(t,e){this.properties[t].unobserve(e)},e}(t)},tt=Element.prototype,et=tt.matches||tt.mozMatchesSelector||tt.msMatchesSelector||tt.oMatchesSelector||tt.webkitMatchesSelector,nt=function(t){return function(t){function r(i){B(this,r);var o=q(this,t.call(this,i)),a=h(o,"events");for(var u in a){var s=n(a[u])?o[a[u]]:a[u];if(!e(s))throw new TypeError("Invalid callback for event.");var c=u.trim().split(" "),l=c.shift(),f=c.join(" ");a[u]={name:l,selector:f,callback:g.call(o,f,s)}}return I(o,"events",{value:a}),o}return z(r,t),r.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.events;for(var n in e)this.addEventListener(e[n].name,e[n].callback)},r.prototype.disconnectedCallback=function(){var e=this.events;for(var n in e)this.removeEventListener(e[n].name,e[n].callback);t.prototype.disconnectedCallback.call(this)},r.prototype.delegate=function(t,e,n){var r=g.call(this,e,n);return this.addEventListener(t,r)},r.prototype.trigger=function(t,e){return p(this,t,e,!(arguments.length>2&&void 0!==arguments[2])||arguments[2],!(arguments.length>3&&void 0!==arguments[3])||arguments[3])},r}(t)},rt=document,it=function(t){return function(t){function e(r){B(this,e);var i=q(this,t.call(this,r)),o=f(i,"css").filter(function(t){return n(t)}).join("\n");return o&&I(i,"css",{value:o}),i}return z(e,t),e.prototype.connectedCallback=function(){if(t.prototype.connectedCallback.call(this),n(this.css))if(this.shadowRoot){if(!this[$]){var e=this[$]=x(this);e.textContent=this.css,this.shadowRoot.appendChild(e)}}else if(!this.constructor[$]){var r=this.constructor[$]=x(this);k(this.node).head.appendChild(r),w(r,this.css,this.is)}this.classList.add(this.is)},e}(t)},ot=function(t){return function(t){function n(){return B(this,n),q(this,t.apply(this,arguments))}return z(n,t),n.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this),a(this.template)||this.render()},n.prototype.propertyChangedCallback=function(e,n,r){t.prototype.propertyChangedCallback.call(this,e,n,r),a(this.template)||this.render()},n.prototype.render=function(t){if(t=t||this.template,e(t))return t.call(this);var n=this.shadowRoot||this;i(this.__innerHTML)&&(this.__innerHTML=n.innerHTML),n.innerHTML=""+this.__innerHTML+t},n}(t)},at=function(){function t(e){B(this,t),e=e||function(){function t(){B(this,t)}return t}(),this.superclass=e}return t.prototype.with=function(){return c([].slice.call(arguments,0),function(t,e){return e(t)},this.superclass)},t}(),ut=function(t){return new at(t)},st={ComponentMixin:K,PropertiesMixin:Z,EventsMixin:nt,StyleMixin:it,TemplateMixin:ot},ct=Object.prototype.hasOwnProperty;O.prototype=Object.create(null);var lt=function(t,e){return ct.call(t,e)},ft=function(){return new O},ht=function(t,e,n){var r=new M(e,n);return t.__incrementalDOMData=r,r},pt=function(t){return dt(t),t.__incrementalDOMData},dt=function t(e){if(!e.__incrementalDOMData){var n=e instanceof Element,r=n?e.localName:e.nodeName,i=n?e.getAttribute("key"):null,o=ht(e,r,i);if(i&&(pt(e.parentNode).keyMap[i]=e),n)for(var a=e.attributes,u=o.attrs,s=o.newAttrs,c=o.attrsArr,l=0;l<a.length;l+=1){var f=a[l],h=f.name,p=f.value;u[h]=p,s[h]=void 0,c.push(h),c.push(p)}for(var d=e.firstChild;d;d=d.nextSibling)t(d)}},vt=function(t,e){return"svg"===t?"http://www.w3.org/2000/svg":"foreignObject"===pt(e).nodeName?null:e.namespaceURI},yt=function(t,e,n,r){var i=vt(n,e),o=void 0;return o=i?t.createElementNS(i,n):t.createElement(n),ht(o,n,r),o},bt=function(t){var e=t.createTextNode("");return ht(e,"#text",null),e},mt={nodesCreated:null,nodesDeleted:null};_.prototype.markCreated=function(t){this.created&&this.created.push(t)},_.prototype.markDeleted=function(t){this.deleted&&this.deleted.push(t)},_.prototype.notifyChanges=function(){this.created&&this.created.length>0&&mt.nodesCreated(this.created),this.deleted&&this.deleted.length>0&&mt.nodesDeleted(this.deleted)};var gt=function(t){return t instanceof Document||t instanceof DocumentFragment},Ct=function(t,e){for(var n=[],r=t;r!==e;)n.push(r),r=r.parentNode;return n},wt=function(t){for(var e=t,n=e;e;)n=e,e=e.parentNode;return n},kt=function(t){var e=wt(t);return gt(e)?e.activeElement:null},xt=function(t,e){var n=kt(t);return n&&t.contains(n)?Ct(n,e):[]},Ot=function(t,e,n){for(var r=e.nextSibling,i=n;i!==e;){var o=i.nextSibling;t.insertBefore(i,r),i=o}},Mt=null,_t=null,Nt=null,Et=null,St=function(t,e){for(var n=0;n<t.length;n+=1)pt(t[n]).focused=e},At=function(t){return function(e,n,r){var i=Mt,o=Et,a=_t,u=Nt;Mt=new _,Et=e.ownerDocument,Nt=e.parentNode;var s=xt(e,Nt);St(s,!0);var c=t(e,n,r);return St(s,!1),Mt.notifyChanges(),Mt=i,Et=o,_t=a,Nt=u,c}},Tt=At(function(t,e,n){return _t=t,Lt(),e(n),Bt(),t}),jt=function(t,e,n){var r=pt(t);return e===r.nodeName&&n==r.key},Dt=function(t,e){if(!_t||!jt(_t,t,e)){var n=pt(Nt),r=_t&&pt(_t),i=n.keyMap,o=void 0;if(e){var a=i[e];a&&(jt(a,t,e)?o=a:a===_t?Mt.markDeleted(a):Pt(Nt,a,i))}o||(o="#text"===t?bt(Et):yt(Et,Nt,t,e),e&&(i[e]=o),Mt.markCreated(o)),pt(o).focused?Ot(Nt,o,_t):r&&r.key&&!r.focused?(Nt.replaceChild(o,_t),n.keyMapValid=!1):Nt.insertBefore(o,_t),_t=o}},Pt=function(t,e,n){t.removeChild(e),Mt.markDeleted(e);var r=pt(e).key;r&&delete n[r]},Rt=function(){var t=Nt,e=pt(t),n=e.keyMap,r=e.keyMapValid,i=t.lastChild,o=void 0;if(i!==_t||!r){for(;i!==_t;)Pt(t,i,n),i=t.lastChild;if(!r){for(o in n)i=n[o],i.parentNode!==t&&(Mt.markDeleted(i),delete n[o]);e.keyMapValid=!0}}},Lt=function(){Nt=_t,_t=null},It=function(){return _t?_t.nextSibling:Nt.firstChild},Vt=function(){_t=It()},Bt=function(){Rt(),_t=Nt,Nt=Nt.parentNode},Ht=function(t,e){return Vt(),Dt(t,e),Lt(),Nt},Ft=function(){return Bt(),_t},zt=function(){return Vt(),Dt("#text",null),_t},qt=function(){_t=Nt.lastChild},Ut={default:"__default"},Xt=function(t){return 0===t.lastIndexOf("xml:",0)?"http://www.w3.org/XML/1998/namespace":0===t.lastIndexOf("xlink:",0)?"http://www.w3.org/1999/xlink":void 0},Gt=function(t,e,n){if(null==n)t.removeAttribute(e);else{var r=Xt(e);r?t.setAttributeNS(r,e,n):t.setAttribute(e,n)}},Jt=function(t,e,n){t[e]=n},Yt=function(t,e,n){e.indexOf("-")>=0?t.setProperty(e,n):t[e]=n},$t=function(t,e,n){if("string"==typeof n)t.style.cssText=n;else{t.style.cssText="";var r=t.style,i=n;for(var o in i)lt(i,o)&&Yt(r,o,i[o])}},Kt=function(t,e,n){var r=void 0===n?"undefined":V(n);"object"===r||"function"===r?Jt(t,e,n):Gt(t,e,n)},Qt=function(t,e,n){var r=pt(t),i=r.attrs;if(i[e]!==n){(Wt[e]||Wt[Ut.default])(t,e,n),i[e]=n}},Wt=ft();Wt[Ut.default]=Kt,Wt.style=$t;var Zt=[],te=function(t,e,n,r){var i=Ht(t,e),o=pt(i);if(!o.staticsApplied){if(n)for(var a=0;a<n.length;a+=2){var u=n[a],s=n[a+1];Qt(i,u,s)}o.staticsApplied=!0}for(var c=o.attrsArr,l=o.newAttrs,f=!c.length,h=3,p=0;h<arguments.length;h+=2,p+=2){var d=arguments[h];if(f)c[p]=d,l[d]=void 0;else if(c[p]!==d)break;var v=arguments[h+1];(f||c[p+1]!==v)&&(c[p+1]=v,Qt(i,d,v))}if(h<arguments.length||p<c.length){for(;h<arguments.length;h+=1,p+=1)c[p]=arguments[h];for(p<c.length&&(c.length=p),h=0;h<c.length;h+=2){var y=c[h],b=c[h+1];l[y]=b}for(var m in l)Qt(i,m,l[m]),l[m]=void 0}return i},ee=function(t,e,n){Zt[0]=t,Zt[1]=e,Zt[2]=n},ne=function(t,e){Zt.push(t),Zt.push(e)},re=function(){var t=te.apply(null,Zt);return Zt.length=0,t},ie=function(t){return Ft()},oe=function(t,e){var n=zt(),r=pt(n);if(r.text!==t){r.text=t;for(var i=t,o=1;o<arguments.length;o+=1){i=(0,arguments[o])(i)}n.data=i}return n},ae=Object.freeze({h:S,patch:A,text:oe}),ue=function(t){return function(t){function n(){return B(this,n),q(this,t.apply(this,arguments))}return z(n,t),n.prototype.render=function(n){var r=this;if(n=n||this.template,e(n)){var i=n.bind(this);n=function(){return A(r.shadowRoot||r.node,i)}}t.prototype.render.call(this,n)},n}(t)},se=function(t){return function(t){function e(){return B(this,e),q(this,t.apply(this,arguments))}return z(e,t),e.prototype.createdCallback=function(){this[G]||D(this)},e.prototype.attachedCallback=function(){this.connectedCallback()},e.prototype.detachedCallback=function(){this.disconnectedCallback()},H(e,[{key:"node",get:function(){return this}}]),e}(t)};st.IDOMMixin=ue,st.CustomElementMixin=se;var ce=function(t){function e(){return B(this,e),q(this,t.apply(this,arguments))}return z(e,t),e}(ut(j(self.HTMLElement)).with(st.ComponentMixin,st.PropertiesMixin,st.StyleMixin,st.EventsMixin,st.TemplateMixin,ue,se));t.shim=j,t.mix=ut,t.registry=X,t.MIXINS=st,t.IDOM=ae,t.BaseComponent=ce,t.prop=d,t.define=P,t.render=R,Object.defineProperty(t,"__esModule",{value:!0})});

//# sourceMappingURL=dna-custom-elements-v0.js.map
