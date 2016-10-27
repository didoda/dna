!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.DNA=t.DNA||{})}(this,function(t){"use strict";function e(t){return"function"==typeof t}function n(t){return"string"==typeof t}function r(t){return"object"===("undefined"==typeof t?"undefined":$(t))}function i(t){return"undefined"==typeof t}function o(t){return Array.isArray(t)}function u(t){try{return!n(t.outerHTML)}catch(t){return!0}}function a(t){var e=function t(){if(I(this,t),!u(this))return this;var e=H.get(this.constructor),n=e.config,r=document.createElement(n.extends?n.extends:e.is);return r.__proto__=e.Ctr.prototype,n.extends&&r.setAttribute("is",e.is),r};return e.prototype=Object.create(t.prototype,{constructor:{value:e,configurable:!0,writable:!0}}),e}function s(t,e,r){var i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if(!n(e))throw new TypeError("Event name is undefined");var u=new CustomEvent(e,{detail:r,bubbles:i,cancelable:o});return t.dispatchEvent(u)}function c(t){return t instanceof G?t:new G(t)}function l(t,e){if(""===e&&t.accepts(Boolean))return!0;if(!t.accepts(String))try{return JSON.parse(e)}catch(t){}return e}function f(t,e,n){var r=t.getAttribute(e);if(r!==n)if(null!==n&&void 0!==n&&n!==!1)switch("undefined"==typeof n?"undefined":$(n)){case"string":case"number":t.setAttribute(e,n);break;case"boolean":t.setAttribute(e,"")}else null!==r&&t.removeAttribute(e)}function p(t){var e=Z.createElement("style");e.type="text/css",e.setAttribute("id","style-"+t);var n=Z.head;return n.firstElementChild?n.insertBefore(e,n.firstElementChild):n.appendChild(e),e}function h(t,e){return e!==t.textContent&&(t.textContent=e,!0)}function d(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=new e;for(var i in n)r[i]=n[i];return t.appendChild(r),r}function v(t){if(t.nodeType===Node.ELEMENT_NODE){var e=t.getAttribute("is")||t.tagName;return H.get(e)}return H.get(t)}function y(t){e(t[W])&&t[W].call(t)}function m(t){e(t[tt])&&t[tt].call(t)}function g(t,n,r,i){e(t[et])&&"is"!==n&&t[et].call(t,n,r,i)}function b(t,e){t.__proto__=e.prototype,Object.defineProperty(t,"constructor",{value:e,configurable:!0,writable:!0}),e.call(t)}function E(t,e){e=e||v(t),e&&(b(t,e.Ctr),y(t))}function k(t){var e=v(t);if(e)return new e.Ctr}function C(t,e){t===e.parentNode&&t.lastElementChild===e||(e.parentNode&&O(e.parentNode,e),t.appendChild(e),y(e))}function O(t,e){t.removeChild(e),m(e)}function w(t,e,n){var r=t.getAttribute(e);t.setAttribute(e,n);var i=t.constructor.observedAttributes||[];i.indexOf(e)!==-1&&g(t,e,r,n)}function N(t,e){var n=t.getAttribute(e);t.removeAttribute(e);var r=t.constructor.observedAttributes||[];r.indexOf(e)!==-1&&g(t,e,n,null)}function A(t,e,n){return H.define(t,e,n)}function x(t,e,n){var r=d(t,e,n);return y(r),r}function _(){}function M(t,e){this.attrs=ot(),this.attrsArr=[],this.newAttrs=ot(),this.staticsApplied=!1,this.key=e,this.keyMap=ot(),this.keyMapValid=!0,this.focused=!1,this.nodeName=t,this.text=null}function S(){this.created=pt.nodesCreated&&[],this.deleted=pt.nodesDeleted&&[]}function L(t,e){if(t)for(var n in t)e(n,t[n])}function T(t){return t===!0&&(t=""),"string"==typeof t&&(t="'"+t+"'"),t}function P(t){var e=[];return L(t,function(t,n){e.push("'"+t+"'",T(n))}),e}function D(t){return t.replace(/\$/g,"\\$")}function j(t){var e=new RegExp("^("+t.map(function(t){return D(t)}).join("|")+")");return e}var $="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},I=(function(){function t(t){this.value=t}function e(e){function n(t,e){return new Promise(function(n,i){var a={key:t,arg:e,resolve:n,reject:i,next:null};u?u=u.next=a:(o=u=a,r(t,e))})}function r(n,o){try{var u=e[n](o),a=u.value;a instanceof t?Promise.resolve(a.value).then(function(t){r("next",t)},function(t){r("throw",t)}):i(u.done?"return":"normal",u.value)}catch(t){i("throw",t)}}function i(t,e){switch(t){case"return":o.resolve({value:e,done:!0});break;case"throw":o.reject(e);break;default:o.resolve({value:e,done:!1})}o=o.next,o?r(o.key,o.arg):u=null}var o,u;this._invoke=n,"function"!=typeof e.return&&(this.return=void 0)}return"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)},{wrap:function(t){return function(){return new e(t.apply(this,arguments))}},await:function(e){return new t(e)}}}(),function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}),q=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),B=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},R=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},V=function(){function t(e){I(this,t),e=e||function(){function t(){I(this,t)}return t}(),this.superclass=e}return t.prototype.with=function(){return[].slice.call(arguments,0).reduce(function(t,e){return e(t)},this.superclass)},t}(),F=function(t){return new V(t)},H={components:{},define:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.components[t.toLowerCase()]={is:t,Ctr:e,config:n}},get:function(t){if(n(t))return this.components[t.toLowerCase()];if(e(t))for(var r in this.components){var i=this.components[r];if(i.Ctr===t)return i}}},z=function(t){return function(t){function e(){return I(this,e),R(this,t.apply(this,arguments))}return B(e,t),e.prototype.connectedCallback=function(){},e.prototype.disconnectedCallback=function(){},e.prototype.attributeChangedCallback=function(){},q(e,[{key:"is",get:function(){return this.getAttribute("is")||this.localName}}]),e}(t)},U=Object.defineProperty,G=function(){function t(e){var n=this;I(this,t),this._=[],e=e||[],o(e)||(e=[e]),this.ctrs=e,this.required=!1,this.validator=function(){return!0},this._setter=function(t){return t},this.getterFn=function(){return n.value},this.setterFn=function(t){if(t=n._setter(t),n.validateType(t)&&n.validator(t)){var e=n.value;return e!==t&&(n.value=t,n.changed(t,e)),!0}return!1}}return t.prototype.observe=function(t){return e(t)&&this._.push(t),this},t.prototype.unobserve=function(t){var e=this._.indexOf(t);return e!==-1&&this._.splice(e,1),this},t.prototype.changed=function(t,e){for(var n=0,r=this._.length;n<r;n++)this._[n](this,t,e)},t.prototype.accepts=function(t){return this.ctrs.indexOf(t)!==-1},t.prototype.named=function(t){return this.name=t,this.attrRequested===!0&&(this.attrName=this.name),this},t.prototype.default=function(t){return this.defaultValue=r(t)?Object.freeze(t):t,this},t.prototype.scoped=function(t){return this.scope=t,U(t,this.name,{get:this.getterFn.bind(this),set:this.setterFn.bind(this),configurable:!0}),this},t.prototype.attribute=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return n(t)?(this.attrRequested=!1,this.attrName=t):this.attrRequested=!!t,this},t.prototype.dispatch=function(t){return this.eventName=t,this},t.prototype.require=function(){return this.required=!0,this},t.prototype.getter=function(t){var n=this;return e(t)&&(this.getterFn=function(){return t(n.value)}),this},t.prototype.setter=function(t){return e(t)&&(this._setter=t),this},t.prototype.validate=function(t){return e(t)&&(this.validator=t),this},t.prototype.validateType=function(t){if(null===t||void 0===t)return!0;var e=0,n=this.ctrs;if(0===n.length)return!0;for(;e<n.length;){if(t instanceof n[e]||t.constructor&&t.constructor===n[e])return!0;e++}throw new TypeError("Invalid `"+t+'` value for "'+this.name+'" property'+(this.scope?" for "+this.scope.is:"")+".")},t.prototype.init=function(t){if(t=i(t)?this.defaultValue:t,!i(t)&&!this.setter(t)&&this.required)throw new Error('"'+this.name+'" property is required'+(this.scope?" for "+this.scope.is:"")+".")},t}();U(c,"ANY",{get:function(){return c()}}),U(c,"STRING",{get:function(){return c(String)}}),U(c,"BOOLEAN",{get:function(){return c(Boolean)}}),U(c,"NUMBER",{get:function(){return c(Number)}});var J=function(t){return function(t){function e(){I(this,e);var n=R(this,t.call(this)),r=n.properties;r?(o(r)||(r=[r]),r=r.reduce(function(t,e){for(var n in e)t[n]=c(e[n]);return t},{})):r={},Object.defineProperty(n,"properties",{value:r,writable:!1,configurable:!0});var i=function(t){var e=r[t];e.named(t).scoped(n).init();var i=e.attrName,o=e.eventName;(i||o)&&e.observe(function(){i&&f(n,i,n[e.name]),o&&s(n,o)})};for(var u in r)i(u);return n}return B(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.properties;for(var n in e){var r=e[n],o=r.attrName;o&&(i(this[r.name])?this.hasAttribute(o)&&(this[r.name]=l(r,this.getAttribute(o))):f(this,o,this[r.name]))}},e.prototype.attributeChangedCallback=function(e,n,r){t.prototype.attributeChangedCallback.call(this,e,n,r);var i=this.properties;for(var o in i){var u=i[o];if(u.attrName===e)return void(this[u.name]=l(u,r))}},e.prototype.observeProperty=function(t,e){this.properties[t].observe(e)},e}(t)},X=/([^\s]+)(.*)?/,Y=function(t){return function(t){function r(){I(this,r);var i=R(this,t.call(this)),o=i.events||{},u=function(t){var r=n(o[t])?i[o[t]]:o[t];if(!e(r))throw new TypeError("Invalid callback for event.");var u=t.match(X),a=u[1],s=(u[2]||"").trim();s?i.delegate(a,s,r):i.addEventListener(a,function(t){r.call(i,t,i)})};for(var a in o)u(a);return i}return B(r,t),r.prototype.delegate=function(t,e,n){var r=this;this.addEventListener(t,function(t){for(var i=t.target;i&&i!==r;)i.matches(e)&&n.call(r,t,i),i=i.parentNode})},r.prototype.trigger=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return s(this,t,e,n,r)},r}(t)},Z=document,K=function(t){return function(t){function e(){I(this,e);var n=R(this,t.call(this));if(!n.styleElem){var r=n.constructor;Object.defineProperty(r.prototype,"styleElem",{value:p(n.is)})}return n.updateCSS(),n}return B(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this),this.classList.add(this.is)},e.prototype.updateCSS=function(){var t=this.css;t&&h(this.styleElem,t)},e}(t)},Q=function(t){return function(t){function r(){I(this,r);var e=R(this,t.call(this));if(e.template){var n=e.properties;if(n){var i=function(){e.render()};for(var o in n)n[o].observe(i)}}return e}return B(r,t),r.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this),this.template&&this.render()},r.prototype.render=function(){var t=this.template;if(e(t))t();else{if(!n(t))throw new Error("Invalid template property.");this.innerHTML=t}},r}(t)},W="connectedCallback",tt="disconnectedCallback",et="attributeChangedCallback",nt=function(t){function e(){return I(this,e),R(this,t.apply(this,arguments))}return B(e,t),e}(F(new a(self.HTMLElement)).with(z,J,K,Y,Q)),rt=Object.prototype.hasOwnProperty;_.prototype=Object.create(null);var it=function(t,e){return rt.call(t,e)},ot=function(){return new _},ut=function(t,e,n){var r=new M(e,n);return t.__incrementalDOMData=r,r},at=function(t){return st(t),t.__incrementalDOMData},st=function t(e){if(!e.__incrementalDOMData){var n=e instanceof Element,r=n?e.localName:e.nodeName,i=n?e.getAttribute("key"):null,o=ut(e,r,i);if(i&&(at(e.parentNode).keyMap[i]=e),n)for(var u=e.attributes,a=o.attrs,s=o.newAttrs,c=o.attrsArr,l=0;l<u.length;l+=1){var f=u[l],p=f.name,h=f.value;a[p]=h,s[p]=void 0,c.push(p),c.push(h)}for(var d=e.firstChild;d;d=d.nextSibling)t(d)}},ct=function(t,e){return"svg"===t?"http://www.w3.org/2000/svg":"foreignObject"===at(e).nodeName?null:e.namespaceURI},lt=function(t,e,n,r){var i=ct(n,e),o=void 0;return o=i?t.createElementNS(i,n):t.createElement(n),ut(o,n,r),o},ft=function(t){var e=t.createTextNode("");return ut(e,"#text",null),e},pt={nodesCreated:null,nodesDeleted:null};S.prototype.markCreated=function(t){this.created&&this.created.push(t)},S.prototype.markDeleted=function(t){this.deleted&&this.deleted.push(t)},S.prototype.notifyChanges=function(){this.created&&this.created.length>0&&pt.nodesCreated(this.created),this.deleted&&this.deleted.length>0&&pt.nodesDeleted(this.deleted)};var ht=function(t){return t instanceof Document||t instanceof DocumentFragment},dt=function(t,e){for(var n=[],r=t;r!==e;)n.push(r),r=r.parentNode;return n},vt=function(t){for(var e=t,n=e;e;)n=e,e=e.parentNode;return n},yt=function(t){var e=vt(t);return ht(e)?e.activeElement:null},mt=function(t,e){var n=yt(t);return n&&t.contains(n)?dt(n,e):[]},gt=function(t,e,n){for(var r=e.nextSibling,i=n;i!==e;){var o=i.nextSibling;t.insertBefore(i,r),i=o}},bt=null,Et=null,kt=null,Ct=null,Ot=function(t,e){for(var n=0;n<t.length;n+=1)at(t[n]).focused=e},wt=function(t){var e=function(e,n,r){var i=bt,o=Ct,u=Et,a=kt;bt=new S,Ct=e.ownerDocument,kt=e.parentNode;var s=mt(e,kt);Ot(s,!0);var c=t(e,n,r);return Ot(s,!1),bt.notifyChanges(),bt=i,Ct=o,Et=u,kt=a,c};return e},Nt=wt(function(t,e,n){return Et=t,Lt(),e(n),Dt(),t}),At=wt(function(t,e,n){var r={nextSibling:t};return Et=r,e(n),t!==Et&&t.parentNode&&Mt(kt,t,at(kt).keyMap),r===Et?null:Et}),xt=function(t,e,n){var r=at(t);return e===r.nodeName&&n==r.key},_t=function(t,e){if(!Et||!xt(Et,t,e)){var n=at(kt),r=Et&&at(Et),i=n.keyMap,o=void 0;if(e){var u=i[e];u&&(xt(u,t,e)?o=u:u===Et?bt.markDeleted(u):Mt(kt,u,i))}o||(o="#text"===t?ft(Ct):lt(Ct,kt,t,e),e&&(i[e]=o),bt.markCreated(o)),at(o).focused?gt(kt,o,Et):r&&r.key&&!r.focused?(kt.replaceChild(o,Et),n.keyMapValid=!1):kt.insertBefore(o,Et),Et=o}},Mt=function(t,e,n){t.removeChild(e),bt.markDeleted(e);var r=at(e).key;r&&delete n[r]},St=function(){var t=kt,e=at(t),n=e.keyMap,r=e.keyMapValid,i=t.lastChild,o=void 0;if(i!==Et||!r){for(;i!==Et;)Mt(t,i,n),i=t.lastChild;if(!r){for(o in n)i=n[o],i.parentNode!==t&&(bt.markDeleted(i),delete n[o]);e.keyMapValid=!0}}},Lt=function(){kt=Et,Et=null},Tt=function(){return Et?Et.nextSibling:kt.firstChild},Pt=function(){Et=Tt()},Dt=function(){St(),Et=kt,kt=kt.parentNode},jt=function(t,e){return Pt(),_t(t,e),Lt(),kt},$t=function(){return Dt(),Et},It=function(){return Pt(),_t("#text",null),Et},qt=function(){return kt},Bt=function(){return Tt()},Rt=function(){Et=kt.lastChild},Vt=Pt,Ft={default:"__default"},Ht=function(t){return 0===t.lastIndexOf("xml:",0)?"http://www.w3.org/XML/1998/namespace":0===t.lastIndexOf("xlink:",0)?"http://www.w3.org/1999/xlink":void 0},zt=function(t,e,n){if(null==n)t.removeAttribute(e);else{var r=Ht(e);r?t.setAttributeNS(r,e,n):t.setAttribute(e,n)}},Ut=function(t,e,n){t[e]=n},Gt=function(t,e,n){e.indexOf("-")>=0?t.setProperty(e,n):t[e]=n},Jt=function(t,e,n){if("string"==typeof n)t.style.cssText=n;else{t.style.cssText="";var r=t.style,i=n;for(var o in i)it(i,o)&&Gt(r,o,i[o])}},Xt=function(t,e,n){var r="undefined"==typeof n?"undefined":$(n);"object"===r||"function"===r?Ut(t,e,n):zt(t,e,n)},Yt=function(t,e,n){var r=at(t),i=r.attrs;if(i[e]!==n){var o=Zt[e]||Zt[Ft.default];o(t,e,n),i[e]=n}},Zt=ot();Zt[Ft.default]=Xt,Zt.style=Jt;var Kt=3,Qt=[],Wt=function(t,e,n,r){var i=jt(t,e),o=at(i);if(!o.staticsApplied){if(n)for(var u=0;u<n.length;u+=2){var a=n[u],s=n[u+1];Yt(i,a,s)}o.staticsApplied=!0}for(var c=o.attrsArr,l=o.newAttrs,f=!c.length,p=Kt,h=0;p<arguments.length;p+=2,h+=2){var d=arguments[p];if(f)c[h]=d,l[d]=void 0;else if(c[h]!==d)break;var v=arguments[p+1];(f||c[h+1]!==v)&&(c[h+1]=v,Yt(i,d,v))}if(p<arguments.length||h<c.length){for(;p<arguments.length;p+=1,h+=1)c[h]=arguments[p];for(h<c.length&&(c.length=h),p=0;p<c.length;p+=2){var y=c[p],m=c[p+1];l[y]=m}for(var g in l)Yt(i,g,l[g]),l[g]=void 0}return i},te=function(t,e,n){Qt[0]=t,Qt[1]=e,Qt[2]=n},ee=function(t,e){Qt.push(t),Qt.push(e)},ne=function(){var t=Wt.apply(null,Qt);return Qt.length=0,t},re=function(t){var e=$t();return e},ie=function(t,e,n,r){return Wt.apply(null,arguments),re(t)},oe=function(t,e){var n=It(),r=at(n);if(r.text!==t){r.text=t;for(var i=t,o=1;o<arguments.length;o+=1){var u=arguments[o];i=u(i)}n.data=i}return n},ue=function(){function t(){I(this,t)}return t.close=function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){return close.apply(void 0,arguments)}),t.skip=function(){return Rt.apply(void 0,arguments)},t.skipNode=function(){return Vt.apply(void 0,arguments)},t.importNode=function(){return st.apply(void 0,arguments)},t.currentElement=function(){return qt.apply(void 0,arguments)},t.currentPointer=function(){return Bt.apply(void 0,arguments)},t.elementOpen=function(){return Wt.apply(void 0,arguments)},t.elementOpenStart=function(){return te.apply(void 0,arguments)},t.elementOpenEnd=function(){return ne.apply(void 0,arguments)},t.elementClose=function(){return re.apply(void 0,arguments)},t.elementVoid=function(){return ie.apply(void 0,arguments)},t.attr=function(){return ee.apply(void 0,arguments)},t.text=function(t){"undefined"==typeof t&&(t=""),oe(t)},t.applyAttr=function(){return zt.apply(void 0,arguments)},t.applyProp=function(){return Ut.apply(void 0,arguments)},t.patch=function(){return Nt.apply(void 0,arguments)},t.patchOuter=function(){return At.apply(void 0,arguments)},q(t,null,[{key:"symbols",get:function(){return Ft}},{key:"attributes",get:function(){return Zt}},{key:"notifications",get:function(){return pt}}]),t}(),ae=/^\s{2,}/g,se=/\>\s+\</g,ce=/(<\/?([a-zA-Z1-9\-]*)([^>]*)>?)/m,le=/((?:.|\n)*?)(?:\/?>|<|$)/,fe=/[\'\"\/\s]/,pe=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],he=/\/>$/,de=function(){function t(e){I(this,t),this.data=e.replace(/\n/g,"").replace(se,"><"),this.restart()}return t.prototype.restart=function(){this.setCurrent(this.data)},t.prototype.setCurrent=function(t){"string"==typeof t&&(this.current=t.replace(ae," "))},t.prototype.ended=function(){return!this.current},t.prototype.next=function(){var e=!1;if(!this.ended()){var n=void 0,r=this.current;if("<"!==r[0])if(">"===r[0]||"/"===r[0]&&">"===r[1]){var i=!1;"/"===r[0]?(n=[r,"/>"],i=!0):n=[r,">"],e={chunk:r,selfClosing:i,type:t.OPEN_ELEMENT_END}}else n=r.match(le),e={chunk:r,type:t.CONTENT,content:n[1]};else if(n=r.match(ce),"/"===r[1])e={chunk:r,type:t.CLOSE_ELEMENT,tag:n[2]};else{var o=n[1];e=">"===o[o.length-1]?{chunk:r,type:t.OPEN_ELEMENT,continue:!1,tag:n[2],selfClosing:t.isSelfClosing(n[2])||t.isSelfClosing(o),props:t.convertProps(n[3],!0)}:{chunk:r,type:t.OPEN_ELEMENT,continue:!0,tag:n[2],selfClosing:t.isSelfClosing(n[2]),props:t.convertProps(n[3])}}n&&n[1]!==r?this.setCurrent(r.substring(n[1].length)):this.setCurrent("")}return e},t.isSelfClosing=function(t){return pe.indexOf(t.toLowerCase())!==-1||!!t.match(he)},t.convertProps=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n={};if(t){for(var r=!1,i=!1,o=!1,u=null,a=0,s=t.length;a<s;a++){var c=t[a];"="===c?(r||(u=void 0),n[u]=!1,r=!1,o=!0):c.match(/[\s|\n]/)?i?(n[u]=n[u]||"",n[u]+=c):r?u&&(n[u]=!0,u=null,r=!1):o&&(u=null,o=!1):'"'!==c&&"'"!==c||null===u?o?(n[u]=n[u]||"",n[u]+=c):(r=!0,u=u||"",""===u&&c.match(fe)||(u+=c)):o&&n[u]!==!1?(u=null,r=!1,i=!1):(i=!0,n[u]=n[u]||"")}r&&u?n[u]=e:i&&(n[u]=!1)}return n},q(t,null,[{key:"OPEN_ELEMENT",get:function(){return"OPEN_ELEMENT"}},{key:"OPEN_ELEMENT_END",get:function(){return"OPEN_ELEMENT_END"}},{key:"CLOSE_ELEMENT",get:function(){return"CLOSE_ELEMENT"}},{key:"CONTENT",get:function(){return"CONTENT"}}]),t}(),ve=function(){function t(e){I(this,t),this.invocations=[],this.$=e}return t.prototype.addChunk=function(t){for(var e=this,n="",r=new de(t),i=r.next();i;){switch(i.type){case de.OPEN_ELEMENT:i.continue?(n+=this.genElementOpenStart(i),this.setElementOpen(i.tag)):n+=this.genElementOpen(i);break;case de.OPEN_ELEMENT_END:n+=this.genElementOpenEnd(i),this.clearElementOpen();break;case de.CLOSE_ELEMENT:n+=this.genElementClose(i);break;case de.CONTENT:if(this.isElementOpen()){var o=de.convertProps(i.content);o&&L(o,function(t,r){"undefined"===t&&r===!1||("undefined"===t?e.hasLastAttr()&&(n+=e.fillLastAttr(T(r))):n+=r===!1?e.setLastAttr("'"+t+"'"):e.addProperty("'"+t+"'",T(r)))})}else n+=this.addText(i.content)}i=r.next()}return n},t.prototype.invokeDOM=function(){var t=this;this.invocations.forEach(function(e,n){t.invocations[n]=!0})},t.prototype.queueInvocation=function(){return this.invocations.push(!1)-1},t.prototype.checkInvocation=function(t){return this.invocations[t]},t.prototype.interpolate=function(t,e){this.invokeDOM();var n=this.queueInvocation(),r="("+t.generate(e)+").apply("+this.$.scope+", "+this.$.args+")\n";return this.checkInvocation(n)?r:this.isElementOpen()?this.hasLastAttr()?this.fillLastAttr(r):(this.setLastAttr(r),""):this.$.helper+".text("+r+");"},t.prototype.genElementOpen=function(t){this.invokeDOM();var e="",n=P(t.props);return e+=t.selfClosing?this.$.helper+".elementVoid('"+t.tag+"'"+(n.length?", null, null, "+n.join(", "):"")+");":this.$.helper+".elementOpen('"+t.tag+"'"+(n.length?", null, null, "+n.join(", "):"")+");"},t.prototype.genElementOpenStart=function(t){var e=this;this.invokeDOM();var n=this.$.helper+".elementOpenStart('"+t.tag+"');";return t.props&&L(t.props,function(r,i){i===!1?(n+=e.setLastAttr("'"+r+"'"),delete t.props[r]):n+=e.$.helper+".attr('"+r+"', "+T(i)+");"}),n},t.prototype.genElementOpenEnd=function(t){this.invokeDOM();var e=this.$.helper+".elementOpenEnd();",n=this.getElementOpen();return(t.selfClosing||de.isSelfClosing(n))&&(t.tag||(t.tag=n),e+=this.genElementClose(t)),e},t.prototype.genElementClose=function(t){return this.invokeDOM(),this.clearLastAttr(),this.$.helper+".elementClose('"+t.tag+"');"},t.prototype.addText=function(t){return this.invokeDOM(),this.$.helper+".text('"+t+"');"},t.prototype.addProperty=function(t,e){return this.invokeDOM(),this.$.helper+".attr("+t+", "+e+");"},t.prototype.setLastAttr=function(t){var e="";return this.lastAttr=t,e},t.prototype.fillLastAttr=function(t){var e=this.getLastAttr();return this.clearLastAttr(),this.addProperty(e,t)},t.prototype.getLastAttr=function(){return this.lastAttr},t.prototype.hasLastAttr=function(){return!!this.lastAttr},t.prototype.clearLastAttr=function(){this.lastAttr=null},t.prototype.setElementOpen=function(t){this.lastElement=t},t.prototype.getElementOpen=function(){return this.lastElement},t.prototype.isElementOpen=function(){return!!this.lastElement},t.prototype.clearElementOpen=function(){this.lastElement=null},t}(),ye=function(){function t(e){I(this,t),this.start=j(e.start),this.end=j(e.end||e.start),this.contextStart=j(["{"]),this.contextEnd=j(["}"])}return t.prototype.interpolate=function(t,e){for(var n=this.start,r=this.end,i=this.contextStart,o=this.contextEnd,u=t.length,a=0,s="",c=0;a<u;){var l=t[a],f=t.slice(a);0===c&&f.match(n)?(c=1,s&&(e({interpolate:!1,chunk:s}),s=""),a+=f.match(n)[0].length):1===c&&f.match(r)?(a+=f.match(r)[0].length,e({interpolate:!0,chunk:s}),s="",c=0):(f.match(o)?(c>1&&c--,1===c&&a===u-1&&(e({interpolate:!0,chunk:s}),s="")):f.match(i)&&c>0&&c++,s+=l,a++)}s&&e({interpolate:c>=1,chunk:s})},t}(),me="$$$skin",ge="$$$this",be="$$$arguments",Ee=new ye({start:["`"]}),ke=new ye({start:["${"],end:["}"]}),Ce=function(){function t(e,n){I(this,t),this.parent=n,this.render=n instanceof t?n.render:new ve({helper:me,scope:ge,args:be}),this.body=e}return t.prototype.generate=function(t,e){return e=e||this.body,"function("+me+(t.length?", "+t.join(", "):"")+") { "+e+" }"},t.prototype.compile=function(){for(var t=this,e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];var i=this.generate(n);try{var o=function(){var t=new Function("var "+ge+" = this;\nvar "+be+" = arguments;\n("+i+").apply("+ge+", "+be+");"),e=function(){for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];return t.call.apply(t,[this,ue].concat(n))};return e.render=t,{v:e}}();if("object"===("undefined"==typeof o?"undefined":$(o)))return o.v}catch(e){var u=function(){var n=t.body;return{v:function(){var t=new Error("Malformed template. "+n+" => "+i);throw t.original=e,t}}}();if("object"===("undefined"==typeof u?"undefined":$(u)))return u.v}},t}(),Oe=function(t){function e(){return I(this,e),R(this,t.apply(this,arguments))}return B(e,t),e.prototype.chunk=function(){var t=this,e=[];return Ee.interpolate(this.body,function(n){n.interpolate?e.push(new we(n.chunk,t)):e.push(n.chunk)}),e},e.prototype.generate=function(e){var n=this,r="return ",i=this.chunk();return i.forEach(function(t,i){t instanceof we?r+=n.render.interpolate(t,e):(0===i&&(t=t.replace(/^\s*/,"")),r+=""+t)}),r+=";",t.prototype.generate.call(this,e,r)},e}(Ce),we=function(t){function e(){return I(this,e),R(this,t.apply(this,arguments))}return B(e,t),e.prototype.chunk=function(){var t=this,e=[];return ke.interpolate(this.body,function(n){n.interpolate?e.push(new Oe(n.chunk,t)):e.push(n.chunk)}),e},e.prototype.generate=function(e){var n=this,r="",i=this.chunk();return i.forEach(function(t){r+=t instanceof Oe?n.render.interpolate(t,e):n.render.addChunk(t)}),t.prototype.generate.call(this,e,r)},e}(Ce),Ne=function(){function t(){I(this,t);for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];var i=n.pop();if(i instanceof t)this.factory=i.factory,this.scope=i.scope;else if("function"==typeof i)this.factory=i;else{var o;this.factory=(o=new we(i)).compile.apply(o,n)}}return q(t,null,[{key:"IDOM",get:function(){return ue}}]),t.prototype.setScope=function(t){return this.scope=t,this},t.prototype.render=function(t){for(var e=this,n=arguments.length,r=Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return ue.patch(t,function(){return e.factory.apply(e.scope||null,r)}),this},t}(),Ae=function(t){return function(t){function e(){I(this,e);var n=R(this,t.call(this)),r=n.template;return r&&!n.hasOwnProperty("template")&&!function(){var t=n.constructor;"string"==typeof r&&(r=new Ne(r),Object.defineProperty(t.prototype,"template",{value:r}));var e=new Ne(r).setScope(n);Object.defineProperty(n,"template",{value:function(){return e.render(n)}})}(),n}return B(e,t),e}(t)},xe=function(t){function e(){return I(this,e),R(this,t.apply(this,arguments))}return B(e,t),e}(F(nt).with(Ae));t.SkinTemplateMixin=Ae,t.BaseComponent=xe,t.ComponentMixin=z,t.PropertiesMixin=J,t.EventsMixin=Y,t.StyleMixin=K,t.TemplateMixin=Q,t.Shim=a,t.mix=F,t.registry=H,t.define=A,t.render=x,t.prop=c,t.getComponent=v,t.connect=y,t.disconnect=m,t.update=g,t.bind=b,t.create=E,t.createElement=k,t.appendChild=C,t.removeChild=O,t.setAttribute=w,t.removeAttribute=N,Object.defineProperty(t,"__esModule",{value:!0})});

//# sourceMappingURL=dna-skin.js.map