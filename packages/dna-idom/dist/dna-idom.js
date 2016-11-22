!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.DNA=t.DNA||{})}(this,function(t){"use strict";function e(t){return"function"==typeof t}function n(t){return"string"==typeof t}function r(t){return"object"===("undefined"==typeof t?"undefined":P(t))}function i(t){return"undefined"==typeof t}function o(t){return Array.isArray(t)}function u(t,e,r){var i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if(!n(e))throw new TypeError("Event name is undefined");var u=new R(e,{detail:r,bubbles:i,cancelable:o});return t.dispatchEvent(u)}function a(t){return t.nodeType===Node.ELEMENT_NODE&&(t=t.getAttribute("is")||t.tagName),V.get(t)}function c(t){var e=a(t);return e&&t instanceof e.Ctr}function s(t){if(c(t))return t[F].call(t),!0}function l(t){if(c(t))return t[H].call(t),!0}function f(t,e,n,r){if(c(t))return t[q].call(t,e,n,r),!0}function p(t,n){if(!e(n)){var r=a(t);r&&(n=r.Ctr)}return!!e(n)&&(t.__proto__=n.prototype,Object.defineProperty(t,"constructor",{value:n,configurable:!0,writable:!0}),n.call(t),!0)}function h(t){var e=a(t);if(e)return new e.Ctr}function d(t,e){return(t!==e.parentNode||t.lastElementChild!==e)&&(e.parentNode&&v(e.parentNode,e),t.appendChild(e),s(e))}function v(t,e){return t.removeChild(e),l(e)}function y(t,e,n){if(e.nextSibling!==n)return e.parentNode&&l(e),t.insertBefore(e,n),s(e)}function b(t,e,n){return e.parentNode&&l(e),t.replaceChild(e,n),l(n),s(e)}function m(t,e,n){var r=t.getAttribute(e);t.setAttribute(e,n);var i=t.constructor.observedAttributes||[];if(i.indexOf(e)!==-1)return f(t,e,r,n)}function g(t,e){var n=t.getAttribute(e);t.removeAttribute(e);var r=t.constructor.observedAttributes||[];if(r.indexOf(e)!==-1)return f(t,e,n,null)}function C(t){return t instanceof G?t:new G(t)}function w(t,e){if(""===e&&t.accepts(Boolean))return!0;if(!t.accepts(String))try{return JSON.parse(e)}catch(t){}return e}function x(t,e,n){var r=t.getAttribute(e);if(r!==n)if(null!==n&&void 0!==n&&n!==!1)switch("undefined"==typeof n?"undefined":P(n)){case"string":case"number":t.setAttribute(e,n);break;case"boolean":t.setAttribute(e,"")}else null!==r&&t.removeAttribute(e)}function k(t){var e=Z.createElement("style");e.type="text/css",e.setAttribute("id","style-"+t);var n=Z.head;return n.firstElementChild?n.insertBefore(e,n.firstElementChild):n.appendChild(e),e}function E(t){try{return!n(t.outerHTML)}catch(t){return!0}}function N(t){var e=function t(){if(T(this,t),!E(this))return this;var e=V.get(this.constructor),n=e.config,r=document.createElement(n.extends?n.extends:e.is);return r.__proto__=e.Ctr.prototype,n.extends&&r.setAttribute("is",e.is),r};return e.prototype=Object.create(t.prototype,{constructor:{value:e,configurable:!0,writable:!0}}),e}function A(){}function O(t,e){this.attrs=st(),this.attrsArr=[],this.newAttrs=st(),this.staticsApplied=!1,this.key=e,this.keyMap=st(),this.keyMapValid=!0,this.focused=!1,this.nodeName=t,this.text=null}function M(){this.created=yt.nodesCreated&&[],this.deleted=yt.nodesDeleted&&[]}function _(t){return function(){var e=t.apply(void 0,arguments)||le;return se?it.getComponent(e)&&Ut():se=e,le=null,e}}function S(t){var n=this;if(e(t)){var r=t.call(this);o(r)&&S.call(this,r)}else o(t)&&t.forEach(function(t){S.call(n,t)})}function D(t,e,n){return V.define(t,e,n)}function j(t,e,n){var r=new e;for(var i in n)r[i]=n[i];return it.appendChild(t,r),r}var P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},T=(function(){function t(t){this.value=t}function e(e){function n(t,e){return new Promise(function(n,i){var a={key:t,arg:e,resolve:n,reject:i,next:null};u?u=u.next=a:(o=u=a,r(t,e))})}function r(n,o){try{var u=e[n](o),a=u.value;a instanceof t?Promise.resolve(a.value).then(function(t){r("next",t)},function(t){r("throw",t)}):i(u.done?"return":"normal",u.value)}catch(t){i("throw",t)}}function i(t,e){switch(t){case"return":o.resolve({value:e,done:!0});break;case"throw":o.reject(e);break;default:o.resolve({value:e,done:!1})}o=o.next,o?r(o.key,o.arg):u=null}var o,u;this._invoke=n,"function"!=typeof e.return&&(this.return=void 0)}return"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)},{wrap:function(t){return function(){return new e(t.apply(this,arguments))}},await:function(e){return new t(e)}}}(),function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}),I=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),L=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},B=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},R=void 0;try{new self.CustomEvent("test");R=self.CustomEvent}catch(t){R=function(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n},R.prototype=self.CustomEvent.prototype}var V={components:{},define:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.components[t.toLowerCase()]={is:t,Ctr:e,config:n}},get:function(t){if(n(t))return this.components[t.toLowerCase()];if(e(t))for(var r in this.components){var i=this.components[r];if(i.Ctr===t)return i}}},F="connectedCallback",H="disconnectedCallback",q="attributeChangedCallback",z=Object.freeze({getComponent:a,isComponent:c,connect:s,disconnect:l,update:f,bind:p,createElement:h,appendChild:d,removeChild:v,insertBefore:y,replaceChild:b,setAttribute:m,removeAttribute:g}),U=function(t){return function(t){function e(){return T(this,e),B(this,t.apply(this,arguments))}return L(e,t),e.prototype.connectedCallback=function(){},e.prototype.disconnectedCallback=function(){},e.prototype.attributeChangedCallback=function(){},I(e,[{key:"is",get:function(){return this.getAttribute("is")||this.localName}}]),e}(t)},X=Object.defineProperty,G=function(){function t(e){var n=this;T(this,t),this._=[],e=e||[],o(e)||(e=[e]),this.ctrs=e,this.validator=function(){return!0},this._setter=function(t){return t},this.getterFn=function(){return n.value},this.setterFn=function(t){if(t=n._setter(t),!(null===t||void 0===t||n.validateType(t)&&n.validator(t)))throw new TypeError("Invalid `"+t+"` value for `"+n.name+"` property for `"+n.scope.is+"`.");var e=n.value;e!==t&&(n.value=t,n.changed(t,e))}}return t.prototype.observe=function(t){return(e(t)||n(t))&&this._.push(t),this},t.prototype.unobserve=function(t){var e=this._.indexOf(t);return e!==-1&&this._.splice(e,1),this},t.prototype.changed=function(t,e){for(var r=0,i=this._.length;r<i;r++){var o=this._[r];n(o)?this.scope[o].call(this.scope,this,t,e):o(this,t,e)}},t.prototype.accepts=function(t){return this.ctrs.indexOf(t)!==-1},t.prototype.named=function(t){return this.name=t,this.attrRequested===!0&&(this.attrName=this.name),this},t.prototype.default=function(t){return this.defaultValue=r(t)?Object.freeze(t):t,this},t.prototype.attribute=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return n(t)?(this.attrRequested=!1,this.attrName=t):this.attrRequested=!!t,this},t.prototype.dispatch=function(t){return this.eventName=t,this},t.prototype.getter=function(t){var n=this;return e(t)&&(this.getterFn=function(){return t(n.value)}),this},t.prototype.setter=function(t){return e(t)&&(this._setter=t),this},t.prototype.validate=function(t){return e(t)&&(this.validator=t),this},t.prototype.validateType=function(t){var e=0,n=this.ctrs;if(0===n.length)return!0;for(;e<n.length;){if(t instanceof n[e]||t.constructor&&t.constructor===n[e])return!0;e++}return!1},t.prototype.init=function(t){this.scope=t,X(t,this.name,{get:this.getterFn.bind(this),set:this.setterFn.bind(this),configurable:!0}),i(this.defaultValue)||(t[this.name]=this.defaultValue)},t}();X(C,"ANY",{get:function(){return C()}}),X(C,"STRING",{get:function(){return C(String)}}),X(C,"BOOLEAN",{get:function(){return C(Boolean)}}),X(C,"NUMBER",{get:function(){return C(Number)}});var J=function(t){return function(t){function e(){T(this,e);var n=B(this,t.call(this)),r=n.properties;r?(o(r)||(r=[r]),r=r.reduce(function(t,e){for(var n in e)t[n]=C(e[n]);return t},{})):r={},Object.defineProperty(n,"properties",{value:r,writable:!1,configurable:!0});var i=n.constructor.observedAttributes||[],a=function(t){var e=r[t];e.named(t).init(n);var o=e.attrName,a=e.eventName;!o&&i.indexOf(t)&&(e.attribute(t),o=t),(o||a)&&e.observe(function(){o&&x(n,o,n[e.name]),a&&u(n,a)})};for(var c in r)a(c);return n}return L(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.properties;for(var n in e){var r=e[n],o=r.attrName;o&&(i(this[r.name])?this.hasAttribute(o)&&(this[r.name]=w(r,this.getAttribute(o))):x(this,o,this[r.name]))}},e.prototype.attributeChangedCallback=function(e,n,r){t.prototype.attributeChangedCallback.call(this,e,n,r);var i=this.properties;for(var o in i){var u=i[o];if(u.attrName===e)return void(this[u.name]=w(u,r))}},e.prototype.observeProperty=function(t,e){this.properties[t].observe(e)},e.prototype.unobserveProperty=function(t,e){this.properties[t].unobserve(e)},e}(t)},Y=Element.prototype,K=Y.matches||Y.matchesSelector||Y.mozMatchesSelector||Y.msMatchesSelector||Y.oMatchesSelector||Y.webkitMatchesSelector,Q=/([^\s]+)(.*)?/,W=function(t){return function(t){function r(){T(this,r);var i=B(this,t.call(this)),o=i.events||{},u=function(t){var r=n(o[t])?i[o[t]]:o[t];if(!e(r))throw new TypeError("Invalid callback for event.");var u=t.match(Q),a=u[1],c=(u[2]||"").trim();c?i.delegate(a,c,r):i.addEventListener(a,function(t){r.call(i,t,i)})};for(var a in o)u(a);return i}return L(r,t),r.prototype.delegate=function(t,e,n){var r=this;this.addEventListener(t,function(t){for(var i=t.target;i&&i!==r;)K.call(i,e)&&n.call(r,t,i),i=i.parentNode})},r.prototype.trigger=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return u(this,t,e,n,r)},r}(t)},Z=document,$=function(t){return function(t){function e(){T(this,e);var n=B(this,t.call(this));if(!n.constructor.styleElem){var r=n.constructor;Object.defineProperty(r,"styleElem",{value:k(n.is)})}return n.updateCSS(),n}return L(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this),this.classList.add(this.is)},e.prototype.updateCSS=function(){var t=this.css;n(t)&&(this.constructor.styleElem.textContent=t)},e}(t)},tt=function(t){return function(t){function r(){T(this,r);var e=B(this,t.call(this));if(e.template){var n=e.properties;if(n){var i=function(){e.render()};for(var o in n)n[o].observe(i)}}return e}return L(r,t),r.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this),this.template&&this.render()},r.prototype.render=function(t){if(t=t||this.template,e(t))t();else{if(!n(t))throw new Error("Invalid template property.");this.innerHTML=t}},r}(t)},et=Array.prototype.reduce||function(t){var e=this,n=e.length,r=0,i=void 0;if(2===arguments.length)i=arguments[1];else{for(;r<n&&!(r in e);)r++;i=e[r++]}for(;r<n;r++)r in e&&(i=t(i,e[r],r,e));return i},nt=function(){function t(e){T(this,t),e=e||function(){function t(){T(this,t)}return t}(),this.superclass=e}return t.prototype.with=function(){var t=[].slice.call(arguments,0);return et.call(t,function(t,e){return e(t)},this.superclass)},t}(),rt=function(t){return new nt(t)},it=z,ot={ComponentMixin:U,PropertiesMixin:J,EventsMixin:W,StyleMixin:$,TemplateMixin:tt},ut={dispatch:u},at=Object.prototype.hasOwnProperty;A.prototype=Object.create(null);var ct=function(t,e){return at.call(t,e)},st=function(){return new A},lt=function(t,e,n){var r=new O(e,n);return t.__incrementalDOMData=r,r},ft=function(t){return pt(t),t.__incrementalDOMData},pt=function t(e){if(!e.__incrementalDOMData){var n=e instanceof Element,r=n?e.localName:e.nodeName,i=n?e.getAttribute("key"):null,o=lt(e,r,i);if(i&&(ft(e.parentNode).keyMap[i]=e),n)for(var u=e.attributes,a=o.attrs,c=o.newAttrs,s=o.attrsArr,l=0;l<u.length;l+=1){var f=u[l],p=f.name,h=f.value;a[p]=h,c[p]=void 0,s.push(p),s.push(h)}for(var d=e.firstChild;d;d=d.nextSibling)t(d)}},ht=function(t,e){return"svg"===t?"http://www.w3.org/2000/svg":"foreignObject"===ft(e).nodeName?null:e.namespaceURI},dt=function(t,e,n,r){var i=ht(n,e),o=void 0;return o=i?t.createElementNS(i,n):t.createElement(n),lt(o,n,r),o},vt=function(t){var e=t.createTextNode("");return lt(e,"#text",null),e},yt={nodesCreated:null,nodesDeleted:null};M.prototype.markCreated=function(t){this.created&&this.created.push(t)},M.prototype.markDeleted=function(t){this.deleted&&this.deleted.push(t)},M.prototype.notifyChanges=function(){this.created&&this.created.length>0&&yt.nodesCreated(this.created),this.deleted&&this.deleted.length>0&&yt.nodesDeleted(this.deleted)};var bt=function(t){return t instanceof Document||t instanceof DocumentFragment},mt=function(t,e){for(var n=[],r=t;r!==e;)n.push(r),r=r.parentNode;return n},gt=function(t){for(var e=t,n=e;e;)n=e,e=e.parentNode;return n},Ct=function(t){var e=gt(t);return bt(e)?e.activeElement:null},wt=function(t,e){var n=Ct(t);return n&&t.contains(n)?mt(n,e):[]},xt=function(t,e,n){for(var r=e.nextSibling,i=n;i!==e;){var o=i.nextSibling;t.insertBefore(i,r),i=o}},kt=null,Et=null,Nt=null,At=null,Ot=function(t,e){for(var n=0;n<t.length;n+=1)ft(t[n]).focused=e},Mt=function(t){var e=function(e,n,r){var i=kt,o=At,u=Et,a=Nt;kt=new M,At=e.ownerDocument,Nt=e.parentNode;var c=wt(e,Nt);Ot(c,!0);var s=t(e,n,r);return Ot(c,!1),kt.notifyChanges(),kt=i,At=o,Et=u,Nt=a,s};return e},_t=Mt(function(t,e,n){return Et=t,It(),e(n),Rt(),t}),St=Mt(function(t,e,n){var r={nextSibling:t};return Et=r,e(n),t!==Et&&t.parentNode&&Pt(Nt,t,ft(Nt).keyMap),r===Et?null:Et}),Dt=function(t,e,n){var r=ft(t);return e===r.nodeName&&n==r.key},jt=function(t,e){if(!Et||!Dt(Et,t,e)){var n=ft(Nt),r=Et&&ft(Et),i=n.keyMap,o=void 0;if(e){var u=i[e];u&&(Dt(u,t,e)?o=u:u===Et?kt.markDeleted(u):Pt(Nt,u,i))}o||(o="#text"===t?vt(At):dt(At,Nt,t,e),e&&(i[e]=o),kt.markCreated(o)),ft(o).focused?xt(Nt,o,Et):r&&r.key&&!r.focused?(Nt.replaceChild(o,Et),n.keyMapValid=!1):Nt.insertBefore(o,Et),Et=o}},Pt=function(t,e,n){t.removeChild(e),kt.markDeleted(e);var r=ft(e).key;r&&delete n[r]},Tt=function(){var t=Nt,e=ft(t),n=e.keyMap,r=e.keyMapValid,i=t.lastChild,o=void 0;if(i!==Et||!r){for(;i!==Et;)Pt(t,i,n),i=t.lastChild;if(!r){for(o in n)i=n[o],i.parentNode!==t&&(kt.markDeleted(i),delete n[o]);e.keyMapValid=!0}}},It=function(){Nt=Et,Et=null},Lt=function(){return Et?Et.nextSibling:Nt.firstChild},Bt=function(){Et=Lt()},Rt=function(){Tt(),Et=Nt,Nt=Nt.parentNode},Vt=function(t,e){return Bt(),jt(t,e),It(),Nt},Ft=function(){return Rt(),Et},Ht=function(){return Bt(),jt("#text",null),Et},qt=function(){return Nt},zt=function(){return Lt()},Ut=function(){Et=Nt.lastChild},Xt=Bt,Gt={default:"__default"},Jt=function(t){return 0===t.lastIndexOf("xml:",0)?"http://www.w3.org/XML/1998/namespace":0===t.lastIndexOf("xlink:",0)?"http://www.w3.org/1999/xlink":void 0},Yt=function(t,e,n){if(null==n)t.removeAttribute(e);else{var r=Jt(e);r?t.setAttributeNS(r,e,n):t.setAttribute(e,n)}},Kt=function(t,e,n){t[e]=n},Qt=function(t,e,n){e.indexOf("-")>=0?t.setProperty(e,n):t[e]=n},Wt=function(t,e,n){if("string"==typeof n)t.style.cssText=n;else{t.style.cssText="";var r=t.style,i=n;for(var o in i)ct(i,o)&&Qt(r,o,i[o])}},Zt=function(t,e,n){var r="undefined"==typeof n?"undefined":P(n);"object"===r||"function"===r?Kt(t,e,n):Yt(t,e,n)},$t=function(t,e,n){var r=ft(t),i=r.attrs;if(i[e]!==n){var o=te[e]||te[Gt.default];o(t,e,n),i[e]=n}},te=st();te[Gt.default]=Zt,te.style=Wt;var ee=3,ne=[],re=function(t,e,n,r){var i=Vt(t,e),o=ft(i);if(!o.staticsApplied){if(n)for(var u=0;u<n.length;u+=2){var a=n[u],c=n[u+1];$t(i,a,c)}o.staticsApplied=!0}for(var s=o.attrsArr,l=o.newAttrs,f=!s.length,p=ee,h=0;p<arguments.length;p+=2,h+=2){var d=arguments[p];if(f)s[h]=d,l[d]=void 0;else if(s[h]!==d)break;var v=arguments[p+1];(f||s[h+1]!==v)&&(s[h+1]=v,$t(i,d,v))}if(p<arguments.length||h<s.length){for(;p<arguments.length;p+=1,h+=1)s[h]=arguments[p];for(h<s.length&&(s.length=h),p=0;p<s.length;p+=2){var y=s[p],b=s[p+1];l[y]=b}for(var m in l)$t(i,m,l[m]),l[m]=void 0}return i},ie=function(t,e,n){ne[0]=t,ne[1]=e,ne[2]=n},oe=function(t,e){ne.push(t),ne.push(e)},ue=function(){var t=re.apply(null,ne);return ne.length=0,t},ae=function(t){var e=Ft();return e},ce=function(t,e){var n=Ht(),r=ft(n);if(r.text!==t){r.text=t;for(var i=t,o=1;o<arguments.length;o+=1){var u=arguments[o];i=u(i)}n.data=i}return n},se=void 0,le=void 0,fe={currentElement:qt,currentPointer:zt,skip:Ut,skipNode:Xt,elementClose:ae,text:ce,attr:oe,symbols:Gt,attributes:te,applyAttr:Yt,applyProp:Kt,notifications:yt,importNode:pt,elementOpenStart:function(){return le=ie.apply(void 0,arguments)},elementOpen:_(re),elementOpenEnd:_(ue),patchOuter:St,patchInner:_t,patch:_t,elementVoid:function(){var t=this.elementOpen.apply(this,arguments);return this.elementClose(arguments.length<=0?void 0:arguments[0]),t}},pe=function(t){return function(t){function n(){return T(this,n),B(this,t.apply(this,arguments))}return L(n,t),n.prototype.render=function(n){n=n||this.template,e(n)?fe.patch(this,S.bind(this,n)):t.prototype.render.call(this,n)},n}(t)},he=function(t){function e(){return T(this,e),B(this,t.apply(this,arguments))}return L(e,t),e}(rt(N(self.HTMLElement)).with(ot.ComponentMixin,ot.PropertiesMixin,ot.StyleMixin,ot.EventsMixin,ot.TemplateMixin));ot.IDomTemplateMixin=pe;var de=function(t){function e(){return T(this,e),B(this,t.apply(this,arguments))}return L(e,t),e}(rt(he).with(pe));t.mix=rt,t.prop=C,t.shim=N,t.HELPERS=ut,t.DOM=it,t.MIXINS=ot,t.IDOM=fe,t.BaseComponent=de,t.registry=V,t.render=j,t.define=D,Object.defineProperty(t,"__esModule",{value:!0})});

//# sourceMappingURL=dna-idom.js.map
