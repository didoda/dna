!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.DNA=t.DNA||{})}(this,function(t){"use strict";function e(t){return"function"==typeof t}function n(t){return"string"==typeof t}function r(t){return"[object Object]"===Object.prototype.toString.call(t)}function i(t){return"undefined"==typeof t}function o(t){return Array.isArray(t)}function a(t){return i(t)||null===t||t===!1}function u(t){return self.Symbol?self.Symbol(t):"__"+t}function s(t){return t&&t[X]}function c(t,e,n){for(var r=0,i=t.length;r<i;r++)n=e(n,t[r],r,t);return n}function l(t,e,n){for(;t;)n=e(n,t),t=Object.getPrototypeOf(t);return n}function f(t,e){return l(t,function(n,r){if(r.hasOwnProperty(e)){var i=Object.getOwnPropertyDescriptor(r,e),o=void 0;i.hasOwnProperty("value")?o=i.value:i.hasOwnProperty("get")&&(o=i.get.call(t)),n.push(o)}return n},[])}function h(t,e){var n=f(t,e);return c(n,function(t,e){for(var n in e)t.hasOwnProperty(n)||(t[n]=e[n]);return t},{})}function p(t,e,r){var i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if(!n(e))throw new TypeError("Event name is undefined");var a=new $(e,{detail:r,bubbles:i,cancelable:o});return t.dispatchEvent(a)}function d(t){return new K(t)}function v(t,e){if(""===e&&t.accepts(Boolean))return!0;if(!t.accepts(String))try{return JSON.parse(e)}catch(t){}return e}function y(t,e,n){var r=t.getAttribute(e);r!==n&&(a(n)?null!==r&&t.removeAttribute(e):("boolean"==typeof n&&(n=""),t.setAttribute(e,n)))}function b(t,e){return Z.call(t,e)}function m(t,e,n){if(!n)return e;for(var r=t.target;r&&r!==e;){if(b(r,n))return r;r=r.parentNode}return null}function g(t,e){var n=this;return function(r){var i=m(r,n.node,t);i&&e.call(n,r,i)}}function C(t,e){for(var n=t.cssRules||t.rules,r=new RegExp(e+"([.[:]|$)"),i=0,o=n.length;i<o;i++){var a=n[i],u=a.cssText;if(a.selectorText){var s=a.cssText.split("{").shift().split(",").map(function(t){return t=t.trim(),t.match(r)?t:e+" "+t}).join(", ");u=a.cssText.replace(a.selectorText,s)}else(a.cssRules||a.rules)&&(C(a,e),u=a.cssText);t.deleteRule(i),t.insertRule(u,i)}}function w(t,e){var n="."+e;t.textContent=t.textContent.replace(et,function(t,e,r){return""+n+(r||"")}),C(t.sheet,n)}function k(t){return t.ownerDocument||nt}function x(t){var e=k(t.node).createElement("style");return e.id="style-"+t.is,e}function O(){}function M(t,e){this.attrs=lt(),this.attrsArr=[],this.newAttrs=lt(),this.staticsApplied=!1,this.key=e,this.keyMap=lt(),this.keyMapValid=!0,this.focused=!1,this.nodeName=t,this.text=null}function N(){this.created=bt.nodesCreated&&[],this.deleted=bt.nodesDeleted&&[]}function E(t){t.forEach(function(t){e(t)?t():o(t)?E(t):t&&oe(t)})}function S(t,n){var r=this;if(e(t)){var i=t.call(this,n);S.call(this,i)}else o(t)&&t.forEach(function(t){S.call(r,t)})}function A(t,e){for(var n=arguments.length,i=Array(n>2?n-2:0),o=2;o<n;o++)i[o-2]=arguments[o];return function(){r(e)||(e&&i.unshift(e),e={});var n=e.key;delete e.key,ee(t,n);var o=H.get(t),u=o&&(o.observedAttributes||[]);for(var c in e)a(e[c])||u&&u.indexOf(c)===-1||(ne(c,e[c]),delete e[c]);var l=re(t),f=s(l);if(f)for(var h in e)f[h]=e[h];return f&&0===i.length?qt():E(i),ie(t),l}}function _(t,e,n){return _t(t,S.bind(this,e,n))}function j(t){var e=function(){return Reflect.construct(t,[],this.constructor)};return e.prototype=Object.create(t.prototype,{constructor:{value:e,configurable:!0,writable:!0}}),e}function D(){return ce.define.apply(ce,arguments)}function T(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=new e;for(var i in n)r[i]=n[i];return t.appendChild(r),r}var P,R=Object.defineProperty,L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},I=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},B=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),V=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},F=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},z=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},q="components",H=(P={},V(P,q,{}),V(P,"define",function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};t=t.toLowerCase(),R(e.prototype,"is",{get:function(){return t}}),this[q][t]={is:t,Ctr:e,config:n}}),V(P,"get",function(t,e){var n=this[q][t.toLowerCase()];if(n)return e?n:n.Ctr}),P),U=u("dna"),X=u("component"),G=u("node"),J=u("style"),Y=function(t){var e=function(t){function e(){return I(this,e),z(this,t.apply(this,arguments))}return F(e,t),e.prototype.connectedCallback=function(){this.node[X]=this},e.prototype.disconnectedCallback=function(){},e.prototype.attributeChangedCallback=function(){},B(e,[{key:U,get:function(){return!0}},{key:"node",get:function(){return this[G]},set:function(t){t[X]=this,this[G]=t}}]),e}(t);return e},$=self.CustomEvent;try{new $("test")}catch(t){$=function(t,e){var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n},$.prototype=self.CustomEvent.prototype}var K=function(){function t(e){var n=this;I(this,t),this._=[],e=e||[],o(e)||(e=[e]),this.ctrs=e,this.validator=function(){return!0},this._setter=function(t){return t},this.getterFn=function(){return n.value},this.setterFn=function(t){if(t=n._setter(t),!(null===t||void 0===t||n.validateType(t)&&n.validator(t)))throw new TypeError("Invalid `"+t+"` value for `"+n.name+"` property for `"+n.scope.is+"`.");var e=n.value;e!==t&&(n.value=t,n.initialized&&n.changed(t,e))}}return t.prototype.observe=function(t){return(e(t)||n(t))&&this._.push(t),this},t.prototype.unobserve=function(t){var e=this._.indexOf(t);return e!==-1&&this._.splice(e,1),this},t.prototype.changed=function(t,e){this.defaultSet=!1;for(var r=0,i=this._.length;r<i;r++){var o=this._[r];n(o)?this.scope[o].call(this.scope,this,t,e):o.call(this.scope,this,t,e)}},t.prototype.accepts=function(t){return this.ctrs.indexOf(t)!==-1},t.prototype.named=function(t){return this.name=t,this.attrRequested===!0&&(this.attrName=this.name),this},t.prototype.default=function(t){return this.defaultValue=r(t)?Object.freeze(t):t,this},t.prototype.attribute=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return n(t)?(this.attrRequested=!1,this.attrName=t):(this.attrRequested=!!t,this.attrName=this.name),this},t.prototype.dispatch=function(t){return this.eventName=t,this},t.prototype.getter=function(t){var n=this;return e(t)&&(this.getterFn=function(){return t(n.value)}),this},t.prototype.setter=function(t){return e(t)&&(this._setter=t),this},t.prototype.validate=function(t){return e(t)&&(this.validator=t),this},t.prototype.validateType=function(t){var e=0,n=this.ctrs;if(0===n.length)return!0;for(;e<n.length;){if(t instanceof n[e]||t.constructor&&t.constructor===n[e])return!0;e++}return!1},t.prototype.init=function(t){this.scope=t,R(t,this.name,{get:this.getterFn.bind(this),set:this.setterFn.bind(this),configurable:!0}),i(this.defaultValue)||(t[this.name]=this.defaultValue,this.defaultSet=!0),this.initialized=!0},t}();R(d,"ANY",{get:function(){return d()}}),R(d,"STRING",{get:function(){return d(String)}}),R(d,"BOOLEAN",{get:function(){return d(Boolean)}}),R(d,"NUMBER",{get:function(){return d(Number)}});var Q=function(t){return function(t){function e(n){I(this,e);var r=z(this,t.call(this,n)),i=h(r,"properties");for(var o in i)i[o]instanceof K||(i[o]=d(i[o]));R(r,"properties",{value:i});var a=r.constructor.observedAttributes||[],u=function(t){var e=i[t];e.named(t).observe(function(t,e,n){return r.propertyChangedCallback(t.name,n,e)}).init(r);var n=e.attrName,o=e.eventName;n||a.indexOf(t)===-1||(e.attribute(),n=t),(n||o)&&e.observe(function(){n&&y(r,n,r[e.name]),o&&p(r,o)})};for(var s in i)u(s);return r}return F(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.properties;for(var n in e){var r=e[n],o=r.attrName,a=r.name;(i(this[a])||r.defaultSet)&&(this.hasAttribute(o||a)?this[a]=v(r,this.getAttribute(o||a)):i(this.node[a])||(this[a]=this.node[a])),o&&y(this,o,this[a])}},e.prototype.attributeChangedCallback=function(e,n,r){t.prototype.attributeChangedCallback.call(this,e,n,r);var i=this.properties;for(var o in i){var a=i[o];if(a.attrName===e)return void(this[a.name]=v(a,r))}},e.prototype.propertyChangedCallback=function(){},e.prototype.observeProperty=function(t,e){return this.properties[t].observe(e)},e.prototype.unobserveProperty=function(t,e){this.properties[t].unobserve(e)},e}(t)},W=Element.prototype,Z=W.matches||W.mozMatchesSelector||W.msMatchesSelector||W.oMatchesSelector||W.webkitMatchesSelector,tt=function(t){return function(t){function r(i){I(this,r);var o=z(this,t.call(this,i)),a=h(o,"events");for(var u in a){var s=n(a[u])?o[a[u]]:a[u];if(!e(s))throw new TypeError("Invalid callback for event.");var c=u.trim().split(" "),l=c.shift(),f=c.join(" ");a[u]={name:l,selector:f,callback:g.call(o,f,s)}}return R(o,"events",{value:a}),o}return F(r,t),r.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.events;for(var n in e)this.addEventListener(e[n].name,e[n].callback)},r.prototype.disconnectedCallback=function(){var e=this.events;for(var n in e)this.removeEventListener(e[n].name,e[n].callback);t.prototype.disconnectedCallback.call(this)},r.prototype.delegate=function(t,e,n){var r=g.call(this,e,n);return this.addEventListener(t,r)},r.prototype.trigger=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return p(this,t,e,n,r)},r}(t)},et=/\:host(\(([^({]+(\([^)]*\))?)+\))?/g,nt=document,rt=function(t){return function(t){function e(r){I(this,e);var i=z(this,t.call(this,r)),o=f(i,"css").filter(function(t){return n(t)}).join("\n");return o&&R(i,"css",{value:o}),i}return F(e,t),e.prototype.connectedCallback=function(){if(t.prototype.connectedCallback.call(this),n(this.css))if(this.shadowRoot){if(!this[J]){var e=this[J]=x(this);e.textContent=this.css,this.shadowRoot.appendChild(e)}}else if(!this.constructor[J]){var r=this.constructor[J]=x(this);r.textContent=this.css,k(this.node).head.appendChild(r),w(r,this.is)}this.classList.add(this.is)},e}(t)},it=function(t){return function(t){function n(){return I(this,n),z(this,t.apply(this,arguments))}return F(n,t),n.prototype.connectedCallback=function(){a(this.template)||this.render(),t.prototype.connectedCallback.call(this)},n.prototype.propertyChangedCallback=function(e,n,r){t.prototype.propertyChangedCallback.call(this,e,n,r),a(this.template)||this.render()},n.prototype.render=function(t){return t=t||this.template,e(t)?t.call(this):void((this.shadowRoot||this.node).innerHTML=t)},n}(t)},ot=function(){function t(e){I(this,t),e=e||function(){function t(){I(this,t)}return t}(),this.superclass=e}return t.prototype.with=function(){var t=[].slice.call(arguments,0);return c(t,function(t,e){return e(t)},this.superclass)},t}(),at=function(t){return new ot(t)},ut={ComponentMixin:Y,PropertiesMixin:Q,EventsMixin:tt,StyleMixin:rt,TemplateMixin:it},st=Object.prototype.hasOwnProperty;O.prototype=Object.create(null);var ct=function(t,e){return st.call(t,e)},lt=function(){return new O},ft=function(t,e,n){var r=new M(e,n);return t.__incrementalDOMData=r,r},ht=function(t){return pt(t),t.__incrementalDOMData},pt=function t(e){if(!e.__incrementalDOMData){var n=e instanceof Element,r=n?e.localName:e.nodeName,i=n?e.getAttribute("key"):null,o=ft(e,r,i);if(i&&(ht(e.parentNode).keyMap[i]=e),n)for(var a=e.attributes,u=o.attrs,s=o.newAttrs,c=o.attrsArr,l=0;l<a.length;l+=1){var f=a[l],h=f.name,p=f.value;u[h]=p,s[h]=void 0,c.push(h),c.push(p)}for(var d=e.firstChild;d;d=d.nextSibling)t(d)}},dt=function(t,e){return"svg"===t?"http://www.w3.org/2000/svg":"foreignObject"===ht(e).nodeName?null:e.namespaceURI},vt=function(t,e,n,r){var i=dt(n,e),o=void 0;return o=i?t.createElementNS(i,n):t.createElement(n),ft(o,n,r),o},yt=function(t){var e=t.createTextNode("");return ft(e,"#text",null),e},bt={nodesCreated:null,nodesDeleted:null};N.prototype.markCreated=function(t){this.created&&this.created.push(t)},N.prototype.markDeleted=function(t){this.deleted&&this.deleted.push(t)},N.prototype.notifyChanges=function(){this.created&&this.created.length>0&&bt.nodesCreated(this.created),this.deleted&&this.deleted.length>0&&bt.nodesDeleted(this.deleted)};var mt=function(t){return t instanceof Document||t instanceof DocumentFragment},gt=function(t,e){for(var n=[],r=t;r!==e;)n.push(r),r=r.parentNode;return n},Ct=function(t){for(var e=t,n=e;e;)n=e,e=e.parentNode;return n},wt=function(t){var e=Ct(t);return mt(e)?e.activeElement:null},kt=function(t,e){var n=wt(t);return n&&t.contains(n)?gt(n,e):[]},xt=function(t,e,n){for(var r=e.nextSibling,i=n;i!==e;){var o=i.nextSibling;t.insertBefore(i,r),i=o}},Ot=null,Mt=null,Nt=null,Et=null,St=function(t,e){for(var n=0;n<t.length;n+=1)ht(t[n]).focused=e},At=function(t){var e=function(e,n,r){var i=Ot,o=Et,a=Mt,u=Nt;Ot=new N,Et=e.ownerDocument,Nt=e.parentNode;var s=kt(e,Nt);St(s,!0);var c=t(e,n,r);return St(s,!1),Ot.notifyChanges(),Ot=i,Et=o,Mt=a,Nt=u,c};return e},_t=At(function(t,e,n){return Mt=t,Rt(),e(n),Bt(),t}),jt=function(t,e,n){var r=ht(t);return e===r.nodeName&&n==r.key},Dt=function(t,e){if(!Mt||!jt(Mt,t,e)){var n=ht(Nt),r=Mt&&ht(Mt),i=n.keyMap,o=void 0;if(e){var a=i[e];a&&(jt(a,t,e)?o=a:a===Mt?Ot.markDeleted(a):Tt(Nt,a,i))}o||(o="#text"===t?yt(Et):vt(Et,Nt,t,e),e&&(i[e]=o),Ot.markCreated(o)),ht(o).focused?xt(Nt,o,Mt):r&&r.key&&!r.focused?(Nt.replaceChild(o,Mt),n.keyMapValid=!1):Nt.insertBefore(o,Mt),Mt=o}},Tt=function(t,e,n){t.removeChild(e),Ot.markDeleted(e);var r=ht(e).key;r&&delete n[r]},Pt=function(){var t=Nt,e=ht(t),n=e.keyMap,r=e.keyMapValid,i=t.lastChild,o=void 0;if(i!==Mt||!r){for(;i!==Mt;)Tt(t,i,n),i=t.lastChild;if(!r){for(o in n)i=n[o],i.parentNode!==t&&(Ot.markDeleted(i),delete n[o]);e.keyMapValid=!0}}},Rt=function(){Nt=Mt,Mt=null},Lt=function(){return Mt?Mt.nextSibling:Nt.firstChild},It=function(){Mt=Lt()},Bt=function(){Pt(),Mt=Nt,Nt=Nt.parentNode},Vt=function(t,e){return It(),Dt(t,e),Rt(),Nt},Ft=function(){return Bt(),Mt},zt=function(){return It(),Dt("#text",null),Mt},qt=function(){Mt=Nt.lastChild},Ht={default:"__default"},Ut=function(t){return 0===t.lastIndexOf("xml:",0)?"http://www.w3.org/XML/1998/namespace":0===t.lastIndexOf("xlink:",0)?"http://www.w3.org/1999/xlink":void 0},Xt=function(t,e,n){if(null==n)t.removeAttribute(e);else{var r=Ut(e);r?t.setAttributeNS(r,e,n):t.setAttribute(e,n)}},Gt=function(t,e,n){t[e]=n},Jt=function(t,e,n){e.indexOf("-")>=0?t.setProperty(e,n):t[e]=n},Yt=function(t,e,n){if("string"==typeof n)t.style.cssText=n;else{t.style.cssText="";var r=t.style,i=n;for(var o in i)ct(i,o)&&Jt(r,o,i[o])}},$t=function(t,e,n){var r="undefined"==typeof n?"undefined":L(n);"object"===r||"function"===r?Gt(t,e,n):Xt(t,e,n)},Kt=function(t,e,n){var r=ht(t),i=r.attrs;if(i[e]!==n){var o=Qt[e]||Qt[Ht.default];o(t,e,n),i[e]=n}},Qt=lt();Qt[Ht.default]=$t,Qt.style=Yt;var Wt=3,Zt=[],te=function(t,e,n,r){var i=Vt(t,e),o=ht(i);if(!o.staticsApplied){if(n)for(var a=0;a<n.length;a+=2){var u=n[a],s=n[a+1];Kt(i,u,s)}o.staticsApplied=!0}for(var c=o.attrsArr,l=o.newAttrs,f=!c.length,h=Wt,p=0;h<arguments.length;h+=2,p+=2){var d=arguments[h];if(f)c[p]=d,l[d]=void 0;else if(c[p]!==d)break;var v=arguments[h+1];(f||c[p+1]!==v)&&(c[p+1]=v,Kt(i,d,v))}if(h<arguments.length||p<c.length){for(;h<arguments.length;h+=1,p+=1)c[p]=arguments[h];for(p<c.length&&(c.length=p),h=0;h<c.length;h+=2){var y=c[h],b=c[h+1];l[y]=b}for(var m in l)Kt(i,m,l[m]),l[m]=void 0}return i},ee=function(t,e,n){Zt[0]=t,Zt[1]=e,Zt[2]=n},ne=function(t,e){Zt.push(t),Zt.push(e)},re=function(){var t=te.apply(null,Zt);return Zt.length=0,t},ie=function(t){var e=Ft();return e},oe=function(t,e){var n=zt(),r=ht(n);if(r.text!==t){r.text=t;for(var i=t,o=1;o<arguments.length;o+=1){var a=arguments[o];i=a(i)}n.data=i}return n},ae=Object.freeze({h:A,patch:_,text:oe}),ue=function(t){return function(t){function n(){return I(this,n),z(this,t.apply(this,arguments))}return F(n,t),n.prototype.render=function(n){var r=this;n=n||this.template,e(n)&&!function(){var t=n.bind(r);n=function(){return _(r.shadowRoot||r.node,t)}}(),t.prototype.render.call(this,n)},n}(t)},se=function(t){return function(t){function e(){return I(this,e),z(this,t.apply(this,arguments))}return F(e,t),B(e,[{key:"is",get:function(){return(this.node.getAttribute("is")||this.node.localName).toLowerCase()}},{key:"node",get:function(){return this}}]),e}(t)},ce=self.customElements;ut.CustomElementMixin=se,ut.IDOMMixin=ue;var le=function(t){function e(){return I(this,e),z(this,t.apply(this,arguments))}return F(e,t),e}(at(j(self.HTMLElement)).with(ut.ComponentMixin,ut.PropertiesMixin,ut.StyleMixin,ut.EventsMixin,ut.TemplateMixin,ue,se));t.shim=j,t.mix=at,t.MIXINS=ut,t.IDOM=ae,t.BaseComponent=le,t.prop=d,t.registry=ce,t.define=D,t.render=T,Object.defineProperty(t,"__esModule",{value:!0})});

//# sourceMappingURL=dna-custom-elements-v1.js.map
