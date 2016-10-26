!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.DNA=t.DNA||{})}(this,function(t){"use strict";function e(){}function n(t,e){this.attrs=I(),this.attrsArr=[],this.newAttrs=I(),this.staticsApplied=!1,this.key=e,this.keyMap=I(),this.keyMapValid=!0,this.focused=!1,this.nodeName=t,this.text=null}function r(){this.created=z.nodesCreated&&[],this.deleted=z.nodesDeleted&&[]}function o(t,e){if(t)for(var n in t)e(n,t[n])}function i(t){return t===!0&&(t=""),"string"==typeof t&&(t="'"+t+"'"),t}function u(t){var e=[];return o(t,function(t,n){e.push("'"+t+"'",i(n))}),e}function a(t){return t.replace(/\$/g,"\\$")}function s(t){var e=new RegExp("^("+t.map(function(t){return a(t)}).join("|")+")");return e}function c(t){return"function"==typeof t}function l(t){return"string"==typeof t}function f(t){return"object"===("undefined"==typeof t?"undefined":kt(t))}function p(t){return"undefined"==typeof t}function h(t){return Array.isArray(t)}function d(t){if(t.nodeType===Node.ELEMENT_NODE){var e=t.getAttribute("is")||t.tagName;return ce.default.get(e)}return null}function v(t){c(t[le])&&t[le]()}function y(t){c(t[fe])&&t[fe]()}function m(t,e,n,r){c(t[pe])&&"is"!==e&&t[pe](e,n,r)}function g(t,e){t.__proto__=e.prototype,Object.defineProperty(t,"constructor",{value:e,configurable:!0,writable:!0}),e.call(t)}function E(t,e){e=e||d(t),e&&(g(t,e.Ctr),v(t))}function b(t,e){t===e.parentNode&&t.lastElementChild===e||(e.parentNode&&k(e.parentNode,e),t.appendChild(e),v(e))}function k(t,e){t.removeChild(e),y(e)}function O(t,e,n){var r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];if(!l(e))throw new TypeError("Event name is undefined");var i=new CustomEvent(e,{detail:n,bubbles:r,cancelable:o});return t.dispatchEvent(i)}function C(t){return t instanceof Me?t:new Me(t)}function w(t,e){if(""===e&&t.accepts(Boolean))return!0;if(!t.accepts(String))try{return JSON.parse(e)}catch(t){}return e}function N(t,e,n){var r=t.getAttribute(e);if(r!==n)if(null!==n&&void 0!==n&&n!==!1)switch("undefined"==typeof n?"undefined":kt(n)){case"string":case"number":t.setAttribute(e,n);break;case"boolean":t.setAttribute(e,"")}else null!==r&&t.removeAttribute(e)}function M(t){var e=Se.createElement("style");e.type="text/css",e.setAttribute("id","style-"+t);var n=Se.head;return n.firstElementChild?n.insertBefore(e,n.firstElementChild):n.appendChild(e),e}function x(t,e){return e!==t.textContent&&(t.textContent=e,!0)}function A(t){try{return!l(t.outerHTML)}catch(t){return!0}}function _(t){var e=function t(){if(Ot(this,t),!A(this))return this;var e=ce.default.get(this.is),n=e.config,r=document.createElement(n.extends?n.extends:this.is);return r.__proto__=e.Ctr.prototype,n.extends&&r.setAttribute("is",this.is),r};return e.prototype=Object.create(t.prototype,{constructor:{value:e,configurable:!0,writable:!0}}),e}function S(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=new e;for(var o in n)r[o]=n[o];return t.appendChild(r),r}function L(t,e,n){return Object.defineProperty(e.prototype,"is",{configurable:!1,get:function(){return t}}),ce.default.define(t,e,n),e}function T(t,e,n){var r=S(t,e,n);return v(r),r}try{new self.CustomEvent("test")}catch(t){var D=function(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n};D.prototype=self.CustomEvent.prototype,self.CustomEvent=D}Array.prototype.reduce||(Array.prototype.reduce=function(t){if(null===this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!=typeof t)throw new TypeError(t+" is not a function");var e=Object(this),n=e.length>>>0,r=0,o=void 0;if(2==arguments.length)o=arguments[1];else{for(;r<n&&!(r in e);)r++;if(r>=n)throw new TypeError("Reduce of empty array with no initial value");o=e[r++]}for(;r<n;r++)r in e&&(o=t(o,e[r],r,e));return o});var P=Element.prototype;P.matches||(P.matches=P.matchesSelector||P.mozMatchesSelector||P.msMatchesSelector||P.oMatchesSelector||P.webkitMatchesSelector);var j=Object.prototype.hasOwnProperty;e.prototype=Object.create(null);var $=function(t,e){return j.call(t,e)},I=function(){return new e},q=function(t,e,r){var o=new n(e,r);return t.__incrementalDOMData=o,o},R=function(t){return B(t),t.__incrementalDOMData},B=function t(e){if(!e.__incrementalDOMData){var n=e instanceof Element,r=n?e.localName:e.nodeName,o=n?e.getAttribute("key"):null,i=q(e,r,o);if(o&&(R(e.parentNode).keyMap[o]=e),n)for(var u=e.attributes,a=i.attrs,s=i.newAttrs,c=i.attrsArr,l=0;l<u.length;l+=1){var f=u[l],p=f.name,h=f.value;a[p]=h,s[p]=void 0,c.push(p),c.push(h)}for(var d=e.firstChild;d;d=d.nextSibling)t(d)}},V=function(t,e){return"svg"===t?"http://www.w3.org/2000/svg":"foreignObject"===R(e).nodeName?null:e.namespaceURI},F=function(t,e,n,r){var o=V(n,e),i=void 0;return i=o?t.createElementNS(o,n):t.createElement(n),q(i,n,r),i},H=function(t){var e=t.createTextNode("");return q(e,"#text",null),e},z={nodesCreated:null,nodesDeleted:null};r.prototype.markCreated=function(t){this.created&&this.created.push(t)},r.prototype.markDeleted=function(t){this.deleted&&this.deleted.push(t)},r.prototype.notifyChanges=function(){this.created&&this.created.length>0&&z.nodesCreated(this.created),this.deleted&&this.deleted.length>0&&z.nodesDeleted(this.deleted)};var U=function(t){return t instanceof Document||t instanceof DocumentFragment},G=function(t,e){for(var n=[],r=t;r!==e;)n.push(r),r=r.parentNode;return n},J=function(t){for(var e=t,n=e;e;)n=e,e=e.parentNode;return n},X=function(t){var e=J(t);return U(e)?e.activeElement:null},Y=function(t,e){var n=X(t);return n&&t.contains(n)?G(n,e):[]},Z=function(t,e,n){for(var r=e.nextSibling,o=n;o!==e;){var i=o.nextSibling;t.insertBefore(o,r),o=i}},K=null,Q=null,W=null,tt=null,et=function(t,e){for(var n=0;n<t.length;n+=1)R(t[n]).focused=e},nt=function(t){var e=function(e,n,o){var i=K,u=tt,a=Q,s=W;K=new r,tt=e.ownerDocument,W=e.parentNode;var c=Y(e,W);et(c,!0);var l=t(e,n,o);return et(c,!1),K.notifyChanges(),K=i,tt=u,Q=a,W=s,l};return e},rt=nt(function(t,e,n){return Q=t,ct(),e(n),pt(),t}),ot=nt(function(t,e,n){var r={nextSibling:t};return Q=r,e(n),t!==Q&&t.parentNode&&at(W,t,R(W).keyMap),r===Q?null:Q}),it=function(t,e,n){var r=R(t);return e===r.nodeName&&n==r.key},ut=function(t,e){if(!Q||!it(Q,t,e)){var n=R(W),r=Q&&R(Q),o=n.keyMap,i=void 0;if(e){var u=o[e];u&&(it(u,t,e)?i=u:u===Q?K.markDeleted(u):at(W,u,o))}i||(i="#text"===t?H(tt):F(tt,W,t,e),e&&(o[e]=i),K.markCreated(i)),R(i).focused?Z(W,i,Q):r&&r.key&&!r.focused?(W.replaceChild(i,Q),n.keyMapValid=!1):W.insertBefore(i,Q),Q=i}},at=function(t,e,n){t.removeChild(e),K.markDeleted(e);var r=R(e).key;r&&delete n[r]},st=function(){var t=W,e=R(t),n=e.keyMap,r=e.keyMapValid,o=t.lastChild,i=void 0;if(o!==Q||!r){for(;o!==Q;)at(t,o,n),o=t.lastChild;if(!r){for(i in n)o=n[i],o.parentNode!==t&&(K.markDeleted(o),delete n[i]);e.keyMapValid=!0}}},ct=function(){W=Q,Q=null},lt=function(){return Q?Q.nextSibling:W.firstChild},ft=function(){Q=lt()},pt=function(){st(),Q=W,W=W.parentNode},ht=function(t,e){return ft(),ut(t,e),ct(),W},dt=function(){return pt(),Q},vt=function(){return ft(),ut("#text",null),Q},yt=function(){return W},mt=function(){return lt()},gt=function(){Q=W.lastChild},Et=ft,bt={default:"__default"},kt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ot=(function(){function t(t){this.value=t}function e(e){function n(t,e){return new Promise(function(n,o){var a={key:t,arg:e,resolve:n,reject:o,next:null};u?u=u.next=a:(i=u=a,r(t,e))})}function r(n,i){try{var u=e[n](i),a=u.value;a instanceof t?Promise.resolve(a.value).then(function(t){r("next",t)},function(t){r("throw",t)}):o(u.done?"return":"normal",u.value)}catch(t){o("throw",t)}}function o(t,e){switch(t){case"return":i.resolve({value:e,done:!0});break;case"throw":i.reject(e);break;default:i.resolve({value:e,done:!1})}i=i.next,i?r(i.key,i.arg):u=null}var i,u;this._invoke=n,"function"!=typeof e.return&&(this.return=void 0)}return"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)},{wrap:function(t){return function(){return new e(t.apply(this,arguments))}},await:function(e){return new t(e)}}}(),function(t,e){}),Ct=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),wt=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},Nt=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},Mt=function(t){return 0===t.lastIndexOf("xml:",0)?"http://www.w3.org/XML/1998/namespace":0===t.lastIndexOf("xlink:",0)?"http://www.w3.org/1999/xlink":void 0},xt=function(t,e,n){if(null==n)t.removeAttribute(e);else{var r=Mt(e);r?t.setAttributeNS(r,e,n):t.setAttribute(e,n)}},At=function(t,e,n){t[e]=n},_t=function(t,e,n){e.indexOf("-")>=0?t.setProperty(e,n):t[e]=n},St=function(t,e,n){if("string"==typeof n)t.style.cssText=n;else{t.style.cssText="";var r=t.style,o=n;for(var i in o)$(o,i)&&_t(r,i,o[i])}},Lt=function(t,e,n){var r="undefined"==typeof n?"undefined":kt(n);"object"===r||"function"===r?At(t,e,n):xt(t,e,n)},Tt=function(t,e,n){var r=R(t),o=r.attrs;if(o[e]!==n){var i=Dt[e]||Dt[bt.default];i(t,e,n),o[e]=n}},Dt=I();Dt[bt.default]=Lt,Dt.style=St;var Pt=3,jt=[],$t=function(t,e,n,r){var o=ht(t,e),i=R(o);if(!i.staticsApplied){if(n)for(var u=0;u<n.length;u+=2){var a=n[u],s=n[u+1];Tt(o,a,s)}i.staticsApplied=!0}for(var c=i.attrsArr,l=i.newAttrs,f=!c.length,p=Pt,h=0;p<arguments.length;p+=2,h+=2){var d=arguments[p];if(f)c[h]=d,l[d]=void 0;else if(c[h]!==d)break;var v=arguments[p+1];(f||c[h+1]!==v)&&(c[h+1]=v,Tt(o,d,v))}if(p<arguments.length||h<c.length){for(;p<arguments.length;p+=1,h+=1)c[h]=arguments[p];for(h<c.length&&(c.length=h),p=0;p<c.length;p+=2){var y=c[p],m=c[p+1];l[y]=m}for(var g in l)Tt(o,g,l[g]),l[g]=void 0}return o},It=function(t,e,n){jt[0]=t,jt[1]=e,jt[2]=n},qt=function(t,e){jt.push(t),jt.push(e)},Rt=function(){var t=$t.apply(null,jt);return jt.length=0,t},Bt=function(t){var e=dt();return e},Vt=function(t,e,n,r){return $t.apply(null,arguments),Bt(t)},Ft=function(t,e){var n=vt(),r=R(n);if(r.text!==t){r.text=t;for(var o=t,i=1;i<arguments.length;i+=1){var u=arguments[i];o=u(o)}n.data=o}return n},Ht=function(){function t(){Ot(this,t)}return t.close=function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){return close.apply(void 0,arguments)}),t.skip=function(){return gt.apply(void 0,arguments)},t.skipNode=function(){return Et.apply(void 0,arguments)},t.importNode=function(){return B.apply(void 0,arguments)},t.currentElement=function(){return yt.apply(void 0,arguments)},t.currentPointer=function(){return mt.apply(void 0,arguments)},t.elementOpen=function(){return $t.apply(void 0,arguments)},t.elementOpenStart=function(){return It.apply(void 0,arguments)},t.elementOpenEnd=function(){return Rt.apply(void 0,arguments)},t.elementClose=function(){return Bt.apply(void 0,arguments)},t.elementVoid=function(){return Vt.apply(void 0,arguments)},t.attr=function(){return qt.apply(void 0,arguments)},t.text=function(t){"undefined"==typeof t&&(t=""),Ft(t)},t.applyAttr=function(){return xt.apply(void 0,arguments)},t.applyProp=function(){return At.apply(void 0,arguments)},t.patch=function(){return rt.apply(void 0,arguments)},t.patchOuter=function(){return ot.apply(void 0,arguments)},Ct(t,null,[{key:"symbols",get:function(){return bt}},{key:"attributes",get:function(){return Dt}},{key:"notifications",get:function(){return z}}]),t}(),zt=/^\s{2,}/g,Ut=/\>\s+\</g,Gt=/(<\/?([a-zA-Z1-9\-]*)([^>]*)>?)/m,Jt=/((?:.|\n)*?)(?:\/?>|<|$)/,Xt=/[\'\"\/\s]/,Yt=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],Zt=/\/>$/,Kt=function(){function t(e){Ot(this,t),this.data=e.replace(/\n/g,"").replace(Ut,"><"),this.restart()}return t.prototype.restart=function(){this.setCurrent(this.data)},t.prototype.setCurrent=function(t){"string"==typeof t&&(this.current=t.replace(zt," "))},t.prototype.ended=function(){return!this.current},t.prototype.next=function(){var e=!1;if(!this.ended()){var n=void 0,r=this.current;if("<"!==r[0])if(">"===r[0]||"/"===r[0]&&">"===r[1]){var o=!1;"/"===r[0]?(n=[r,"/>"],o=!0):n=[r,">"],e={chunk:r,selfClosing:o,type:t.OPEN_ELEMENT_END}}else n=r.match(Jt),e={chunk:r,type:t.CONTENT,content:n[1]};else if(n=r.match(Gt),"/"===r[1])e={chunk:r,type:t.CLOSE_ELEMENT,tag:n[2]};else{var i=n[1];e=">"===i[i.length-1]?{chunk:r,type:t.OPEN_ELEMENT,continue:!1,tag:n[2],selfClosing:t.isSelfClosing(n[2])||t.isSelfClosing(i),props:t.convertProps(n[3],!0)}:{chunk:r,type:t.OPEN_ELEMENT,continue:!0,tag:n[2],selfClosing:t.isSelfClosing(n[2]),props:t.convertProps(n[3])}}n&&n[1]!==r?this.setCurrent(r.substring(n[1].length)):this.setCurrent("")}return e},t.isSelfClosing=function(t){return Yt.indexOf(t.toLowerCase())!==-1||!!t.match(Zt)},t.convertProps=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n={};if(t){for(var r=!1,o=!1,i=!1,u=null,a=0,s=t.length;a<s;a++){var c=t[a];"="===c?(r||(u=void 0),n[u]=!1,r=!1,i=!0):c.match(/[\s|\n]/)?o?(n[u]=n[u]||"",n[u]+=c):r?u&&(n[u]=!0,u=null,r=!1):i&&(u=null,i=!1):'"'!==c&&"'"!==c||null===u?i?(n[u]=n[u]||"",n[u]+=c):(r=!0,u=u||"",""===u&&c.match(Xt)||(u+=c)):i&&n[u]!==!1?(u=null,r=!1,o=!1):(o=!0,n[u]=n[u]||"")}r&&u?n[u]=e:o&&(n[u]=!1)}return n},Ct(t,null,[{key:"OPEN_ELEMENT",get:function(){return"OPEN_ELEMENT"}},{key:"OPEN_ELEMENT_END",get:function(){return"OPEN_ELEMENT_END"}},{key:"CLOSE_ELEMENT",get:function(){return"CLOSE_ELEMENT"}},{key:"CONTENT",get:function(){return"CONTENT"}}]),t}(),Qt=function(){function t(e){Ot(this,t),this.invocations=[],this.$=e}return t.prototype.addChunk=function(t){for(var e=this,n="",r=new Kt(t),u=r.next();u;){switch(u.type){case Kt.OPEN_ELEMENT:u.continue?(n+=this.genElementOpenStart(u),this.setElementOpen(u.tag)):n+=this.genElementOpen(u);break;case Kt.OPEN_ELEMENT_END:n+=this.genElementOpenEnd(u),this.clearElementOpen();break;case Kt.CLOSE_ELEMENT:n+=this.genElementClose(u);break;case Kt.CONTENT:if(this.isElementOpen()){var a=Kt.convertProps(u.content);a&&o(a,function(t,r){"undefined"===t&&r===!1||("undefined"===t?e.hasLastAttr()&&(n+=e.fillLastAttr(i(r))):n+=r===!1?e.setLastAttr("'"+t+"'"):e.addProperty("'"+t+"'",i(r)))})}else n+=this.addText(u.content)}u=r.next()}return n},t.prototype.invokeDOM=function(){var t=this;this.invocations.forEach(function(e,n){t.invocations[n]=!0})},t.prototype.queueInvocation=function(){return this.invocations.push(!1)-1},t.prototype.checkInvocation=function(t){return this.invocations[t]},t.prototype.interpolate=function(t,e){this.invokeDOM();var n=this.queueInvocation(),r="("+t.generate(e)+").apply("+this.$.scope+", "+this.$.args+")\n";return this.checkInvocation(n)?r:this.isElementOpen()?this.hasLastAttr()?this.fillLastAttr(r):(this.setLastAttr(r),""):this.$.helper+".text("+r+");"},t.prototype.genElementOpen=function(t){this.invokeDOM();var e="",n=u(t.props);return e+=t.selfClosing?this.$.helper+".elementVoid('"+t.tag+"'"+(n.length?", null, null, "+n.join(", "):"")+");":this.$.helper+".elementOpen('"+t.tag+"'"+(n.length?", null, null, "+n.join(", "):"")+");"},t.prototype.genElementOpenStart=function(t){var e=this;this.invokeDOM();var n=this.$.helper+".elementOpenStart('"+t.tag+"');";return t.props&&o(t.props,function(r,o){o===!1?(n+=e.setLastAttr("'"+r+"'"),delete t.props[r]):n+=e.$.helper+".attr('"+r+"', "+i(o)+");"}),n},t.prototype.genElementOpenEnd=function(t){this.invokeDOM();var e=this.$.helper+".elementOpenEnd();",n=this.getElementOpen();return(t.selfClosing||Kt.isSelfClosing(n))&&(t.tag||(t.tag=n),e+=this.genElementClose(t)),e},t.prototype.genElementClose=function(t){return this.invokeDOM(),this.clearLastAttr(),this.$.helper+".elementClose('"+t.tag+"');"},t.prototype.addText=function(t){return this.invokeDOM(),this.$.helper+".text('"+t+"');"},t.prototype.addProperty=function(t,e){return this.invokeDOM(),this.$.helper+".attr("+t+", "+e+");"},t.prototype.setLastAttr=function(t){var e="";return this.lastAttr=t,e},t.prototype.fillLastAttr=function(t){var e=this.getLastAttr();return this.clearLastAttr(),this.addProperty(e,t)},t.prototype.getLastAttr=function(){return this.lastAttr},t.prototype.hasLastAttr=function(){return!!this.lastAttr},t.prototype.clearLastAttr=function(){this.lastAttr=null},t.prototype.setElementOpen=function(t){this.lastElement=t},t.prototype.getElementOpen=function(){return this.lastElement},t.prototype.isElementOpen=function(){return!!this.lastElement},t.prototype.clearElementOpen=function(){this.lastElement=null},t}(),Wt=function(){function t(e){Ot(this,t),this.start=s(e.start),this.end=s(e.end||e.start),this.contextStart=s(["{"]),this.contextEnd=s(["}"])}return t.prototype.interpolate=function(t,e){for(var n=this.start,r=this.end,o=this.contextStart,i=this.contextEnd,u=t.length,a=0,s="",c=0;a<u;){var l=t[a],f=t.slice(a);0===c&&f.match(n)?(c=1,s&&(e({interpolate:!1,chunk:s}),s=""),a+=f.match(n)[0].length):1===c&&f.match(r)?(a+=f.match(r)[0].length,e({interpolate:!0,chunk:s}),s="",c=0):(f.match(i)?(c>1&&c--,1===c&&a===u-1&&(e({interpolate:!0,chunk:s}),s="")):f.match(o)&&c>0&&c++,s+=l,a++)}s&&e({interpolate:c>=1,chunk:s})},t}(),te="$$$skin",ee="$$$this",ne="$$$arguments",re=new Wt({start:["`"]}),oe=new Wt({start:["${"],end:["}"]}),ie=function(){function t(e,n){Ot(this,t),this.parent=n,this.render=n instanceof t?n.render:new Qt({helper:te,scope:ee,args:ne}),this.body=e}return t.prototype.generate=function(t,e){return e=e||this.body,"function("+te+(t.length?", "+t.join(", "):"")+") { "+e+" }"},t.prototype.compile=function(){for(var t=this,e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];var o=this.generate(n);try{var i=function(){var t=new Function("var "+ee+" = this;\nvar "+ne+" = arguments;\n("+o+").apply("+ee+", "+ne+");"),e=function(){for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];return t.call.apply(t,[this,Ht].concat(n))};return e.render=t,{v:e}}();if("object"===("undefined"==typeof i?"undefined":kt(i)))return i.v}catch(e){var u=function(){var n=t.body;return{v:function(){var t=new Error("Malformed template. "+n+" => "+o);throw t.original=e,t}}}();if("object"===("undefined"==typeof u?"undefined":kt(u)))return u.v}},t}(),ue=function(t){function e(){return Ot(this,e),Nt(this,t.apply(this,arguments))}return wt(e,t),e.prototype.chunk=function(){var t=this,e=[];return re.interpolate(this.body,function(n){n.interpolate?e.push(new ae(n.chunk,t)):e.push(n.chunk)}),e},e.prototype.generate=function(e){var n=this,r="return ",o=this.chunk();return o.forEach(function(t,o){t instanceof ae?r+=n.render.interpolate(t,e):(0===o&&(t=t.replace(/^\s*/,"")),r+=""+t)}),r+=";",t.prototype.generate.call(this,e,r)},e}(ie),ae=function(t){function e(){return Ot(this,e),Nt(this,t.apply(this,arguments))}return wt(e,t),e.prototype.chunk=function(){var t=this,e=[];return oe.interpolate(this.body,function(n){n.interpolate?e.push(new ue(n.chunk,t)):e.push(n.chunk)}),e},e.prototype.generate=function(e){var n=this,r="",o=this.chunk();return o.forEach(function(t){r+=t instanceof ue?n.render.interpolate(t,e):n.render.addChunk(t)}),t.prototype.generate.call(this,e,r)},e}(ie),se=function(){function t(){Ot(this,t);for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];var o=n.pop();if(o instanceof t)this.factory=o.factory,this.scope=o.scope;else if("function"==typeof o)this.factory=o;else{var i;this.factory=(i=new ae(o)).compile.apply(i,n)}}return Ct(t,null,[{key:"IDOM",get:function(){return Ht}}]),t.prototype.setScope=function(t){return this.scope=t,this},t.prototype.render=function(t){for(var e=this,n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return Ht.patch(t,function(){return e.factory.apply(e.scope||null,r)}),this},t}(),ce={native:self.customElements,custom:{components:{},define:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};this.components[t.toLowerCase()]={Ctr:e,config:n}},get:function(t){return this.components[t.toLowerCase()]}}};ce.default=ce.native;var le="connectedCallback",fe="disconnectedCallback",pe="attributeChangedCallback",he=se.IDOM.notifications,de=se.IDOM.attributes,ve=se.IDOM.symbols,ye=he.nodesCreated,me=he.nodesDeleted,ge=de[ve.default];he.nodesCreated=function(t){t.forEach(function(t){return!t.is&&E(t)}),ye&&ye(t)},he.nodesDeleted=function(t){t.forEach(function(t){return y(t)}),me&&me(t)},de[ve.default]=function(t,e,n){var r=d(t);if(r){t.is||E(t,r);var o=t.getAttribute(e),i=r.Ctr.observedAttributes||[];i.indexOf(e)!==-1&&m(t,e,o,n)}ge&&ge(t,e,n)};var Ee=function(){function t(e){Ot(this,t),e=e||function(){function t(){Ot(this,t)}return t}(),this.superclass=e}return t.prototype.with=function(){return[].slice.call(arguments,0).reduce(function(t,e){return e(t)},this.superclass)},t}(),be=function(t){return new Ee(t)},ke=self.HTMLElement,Oe=function(){return Reflect.construct(ke,[],this.constructor)};Oe.prototype=Object.create(ke.prototype,{constructor:{value:Oe,configurable:!0,writable:!0}});var Ce={HTMLElement:Oe},we=function(t){return function(t){function e(){return Ot(this,e),Nt(this,t.apply(this,arguments))}return wt(e,t),e.prototype.connectedCallback=function(){},e.prototype.disconnectedCallback=function(){},e.prototype.attributeChangedCallback=function(){},e}(t)},Ne=Object.defineProperty,Me=function(){function t(e){var n=this;Ot(this,t),this._=[],e=e||[],h(e)||(e=[e]),this.ctrs=e,this.required=!1,this.validator=function(){return!0},this._setter=function(t){return t},this.getterFn=function(){return n.value},this.setterFn=function(t){if(t=n._setter(t),n.validateType(t)&&n.validator(t)){var e=n.value;return e!==t&&(n.value=t,n.changed(t,e)),!0}return!1}}return t.prototype.observe=function(t){return c(t)&&this._.push(t),this},t.prototype.unobserve=function(t){var e=this._.indexOf(t);return e!==-1&&this._.splice(e,1),this},t.prototype.changed=function(t,e){for(var n=0,r=this._.length;n<r;n++)this._[n](this,t,e)},t.prototype.accepts=function(t){return this.ctrs.indexOf(t)!==-1},t.prototype.named=function(t){return this.name=t,this.attrRequested===!0&&(this.attrName=this.name),this},t.prototype.default=function(t){return this.defaultValue=f(t)?Object.freeze(t):t,this},t.prototype.scoped=function(t){return this.scope=t,Ne(t,this.name,{get:this.getterFn.bind(this),set:this.setterFn.bind(this),configurable:!0}),this},t.prototype.attribute=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return l(t)?(this.attrRequested=!1,this.attrName=t):this.attrRequested=!!t,this},t.prototype.dispatch=function(t){return this.eventName=t,this},t.prototype.require=function(){return this.required=!0,this},t.prototype.getter=function(t){var e=this;return c(t)&&(this.getterFn=function(){return t(e.value)}),this},t.prototype.setter=function(t){return c(t)&&(this._setter=t),this},t.prototype.validate=function(t){return c(t)&&(this.validator=t),this},t.prototype.validateType=function(t){if(null===t||void 0===t)return!0;var e=0,n=this.ctrs;if(0===n.length)return!0;for(;e<n.length;){if(t instanceof n[e]||t.constructor&&t.constructor===n[e])return!0;e++}throw new TypeError("Invalid `"+t+'` value for "'+this.name+'" property'+(this.scope?" for "+this.scope.is:"")+".")},t.prototype.init=function(t){if(t=p(t)?this.defaultValue:t,!p(t)&&!this.setter(t)&&this.required)throw new Error('"'+this.name+'" property is required'+(this.scope?" for "+this.scope.is:"")+".")},t}();Ne(C,"ANY",{get:function(){return C()}}),Ne(C,"STRING",{get:function(){return C(String)}}),Ne(C,"BOOLEAN",{get:function(){return C(Boolean)}}),Ne(C,"NUMBER",{get:function(){return C(Number)}});var xe=function(t){return function(t){function e(){Ot(this,e);var n=Nt(this,t.call(this)),r=n.properties;r?(h(r)||(r=[r]),r=r.reduce(function(t,e){for(var n in e)t[n]=C(e[n]);return t},{})):r={},Object.defineProperty(n,"properties",{value:r,writable:!1,configurable:!0});var o=function(t){var e=r[t];e.named(t).scoped(n).init();var o=e.attrName,i=e.eventName;(o||i)&&e.observe(function(){o&&N(n,o,n[e.name]),i&&O(n,i)})};for(var i in r)o(i);return n}return wt(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this);var e=this.properties;for(var n in e){var r=e[n],o=r.attrName;o&&(p(this[r.name])?this.hasAttribute(o)&&(this[r.name]=w(r,this.getAttribute(o))):N(this,o,this[r.name]))}},e.prototype.attributeChangedCallback=function(e,n,r){t.prototype.attributeChangedCallback.call(this,e,n,r);var o=this.properties;for(var i in o){var u=o[i];if(u.attrName===e)return void(this[u.name]=w(u,r))}},e.prototype.observeProperty=function(t,e){this.properties[t].observe(e)},e}(t)},Ae=/([^\s]+)(.*)?/,_e=function(t){return function(t){function e(){Ot(this,e);var n=Nt(this,t.call(this)),r=n.events||{},o=function(t){var e=l(r[t])?n[r[t]]:r[t];if(!c(e))throw new TypeError("Invalid callback for event.");var o=t.match(Ae),i=o[1],u=(o[2]||"").trim();u?n.delegate(i,u,e):n.addEventListener(i,function(t){e.call(n,t,n)})};for(var i in r)o(i);return n}return wt(e,t),e.prototype.delegate=function(t,e,n){var r=this;this.addEventListener(t,function(t){for(var o=t.target;o&&o!==r;)o.matches(e)&&n.call(r,t,o),o=o.parentNode})},e.prototype.trigger=function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return O(this,t,e,n,r)},e}(t)},Se=document,Le=function(t){return function(t){function e(){Ot(this,e);var n=Nt(this,t.call(this));if(!n.styleElem){var r=n.constructor;Object.defineProperty(r.prototype,"styleElem",{value:M(n.is)})}return n.updateCSS(),n}return wt(e,t),e.prototype.connectedCallback=function(){t.prototype.connectedCallback.call(this),this.classList.add(this.is)},e.prototype.updateCSS=function(){var t=this.css;t&&x(this.styleElem,t)},e}(t)},Te=function(t){return function(t){function e(){Ot(this,e);var n=Nt(this,t.call(this)),r=n.template;if(r&&!n.hasOwnProperty("template")){var o=n.constructor;"string"==typeof r&&(r=new se(r),Object.defineProperty(o.prototype,"template",{value:r})),Object.defineProperty(n,"template",{value:new se(r).setScope(n)})}if(n.hasOwnProperty("template")){n.render();var i=n.properties;if(i){var u=function(){n.render()};for(var a in i)i[a].observe(u)}}return n}return wt(e,t),e.prototype.render=function(){var t=this.template;if(!(t instanceof se))throw new Error("Invalid template property.");t.render(this)},e}(t)};ce.default=ce.custom,Ce.HTMLElement=new _(self.HTMLElement);var De=se,Pe=De.IDOM,je=ce.default,$e=be(Ce.HTMLElement).with(we,xe,Le,_e,Te);t.Template=De,t.IDOM=Pe,t.render=T,t.ComponentMixin=we,t.PropertiesMixin=xe,t.EventsMixin=_e,t.StyleMixin=Le,t.TemplateMixin=Te,t.mix=be,t.Polyfill=_,t.ELEMENTS=Ce,t.registry=je,t.BaseComponent=$e,t.prop=C,t.define=L,t.getComponent=d,t.connect=v,t.disconnect=y,t.update=m,t.bind=g,t.create=E,t.appendChild=b,t.removeChild=k,Object.defineProperty(t,"__esModule",{value:!0})});

//# sourceMappingURL=dna-idom.js.map