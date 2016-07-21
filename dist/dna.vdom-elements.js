!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?b(exports):"function"==typeof define&&define.amd?define(["exports"],b):b(a.DNA=a.DNA||{})}(this,function(a){"use strict";function b(a,b){var c="";Array.isArray(b)||(b=[b]),b.forEach(function(a){"function"==typeof a&&(a=a()),c+=a}),a="style-"+a;var d=document.getElementById(a)||document.createElement("style");if(d.type="text/css",d.setAttribute("id",a),d.innerHTML="",d.appendChild(document.createTextNode(c)),!d.parentNode){var e=document.head;e.firstElementChild?e.insertBefore(d,e.firstElementChild):e.appendChild(d)}return d}function c(a,b){var c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||function(a){return[].indexOf.call(document.querySelectorAll(a),this)!==-1};return c.call(a,b)}function d(a,b,d,e){a.addEventListener(b,function(b){for(var f=b.target;f&&f!==a;){if(c(f,d))return void e.call(a,b,f);f=f.parentNode}})}function e(a){return a.replace(/\W+/g,"-").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase()}function f(a){return a.replace(/\W+(.)/g,function(a,b){return b.toUpperCase()})}function g(a,b){var c=void 0;if(a){c=Object.getOwnPropertyDescriptor(a,b);var d=Object.getPrototypeOf(a);!c&&d&&(c=g(d,b))}return c}function h(a,b,c){var d="function"==typeof b.get,e=function(){var e=void 0;return e=d?b.get.call(this):ca.get(this,a),"undefined"!=typeof e?e:c};return e}function i(a,b,c){if(b&&b.set&&b.set.callbacks)return b.set.callbacks.push(c),b.set;var d=function c(d){var e=this;b.set?b.set.call(this,d):ca.set(this,a,d);var f=this[a];return c.callbacks.forEach(function(b){"function"==typeof b&&b.call(e,a,f)}),f};return d.callbacks=[c],d}function j(a,b,c){var d=a.getAttribute(b);null!==c&&void 0!==c&&c!==!1?"string"!=typeof c&&"number"!=typeof c||d===c?"boolean"==typeof c&&""!==d&&a.setAttribute(b,""):a.setAttribute(b,c):(d||""===d)&&a.removeAttribute(b)}function k(a){return ga.get(a)||function(){var b=(a.observedAttributes||[]).map(function(a){return f(a)});return ga.set(a,b),b}()}function l(a,b,c,d){if(d){var e=d[b];if(e instanceof ja)e.unhook&&e.unhook(a,b,c);else if("attributes"===b)for(var f in e)e.hasOwnProperty(f)&&a.removeAttribute(f);else if("style"===b)for(var g in e)e.hasOwnProperty(g)&&(a.style[g]="");else"string"==typeof e?a[b]="":a[b]=null}}function m(a,b,c,d,e){var f=c?c[d]:void 0;if("attributes"!==d){if(f&&"object"==typeof f&&Object.getPrototypeOf(f)!==Object.getPrototypeOf(e))return void(a[d]=e);"object"!=typeof a[d]&&(a[d]={});var g="style"===d?"":void 0;for(var h in e)if(e.hasOwnProperty(h)){var i=e[h];a[d][h]=void 0===i?g:i}}else for(var j in e)if(e.hasOwnProperty(j)){var k=e[j];"class"===j?!function(){var b=k.split(" "),c=f&&f[j]&&f[j].split(" ")||[];b.forEach(function(b){c.indexOf(b)===-1&&a.classList.add(b)}),c.forEach(function(c){b.indexOf(c)===-1&&a.classList.remove(c)})}():void 0===k?a.removeAttribute(j):a.setAttribute(j,k)}}function n(a,b,c){for(var d in b)if(b.hasOwnProperty(d)){var e=b[d];void 0===e||null===e?l(a,d,e,c):e instanceof ja?(l(a,d,e,c),e.hook&&e.hook(a,d,c?c[d]:void 0)):"object"==typeof e?m(a,b,c,d,e):a[d]=e}}function o(a){var b=document;if(a instanceof na)return b.createTextNode(a.text);if(!(a instanceof ma))return null;var c=a.properties||{},d=c.attributes&&c.attributes.is||c.is,e=null;e=null===a.namespace?d?b.createElement(a.tagName,d):b.createElement(a.tagName):d?b.createElementNS(a.namespace,a.tagName,d):b.createElementNS(a.namespace,a.tagName),n(e,c);for(var f=a.children,g=0;g<f.length;g++){var h=o(f[g]);h&&e.appendChild(h)}return e}function p(a){var b=a.parentNode;return b&&b.removeChild(a),null}function q(a,b){var c=o(b);return a&&a.appendChild(c),a}function r(a,b,c){var d=void 0;if(3===a.nodeType)a.replaceData(0,a.length,c.text),d=a;else{var e=a.parentNode;d=o(c),e&&d!==a&&e.replaceChild(d,a)}return d}function s(a,b,c){var d=a.parentNode,e=o(c);return d&&e!==a&&d.replaceChild(e,a),e}function t(a,b){for(var c=a.childNodes,d={},e=void 0,f=void 0,g=void 0,h=0;h<b.removes.length;h++)f=b.removes[h],e=c[f.from],f.key&&(d[f.key]=e),a.removeChild(e);for(var i=c.length,j=0;j<b.inserts.length;j++)g=b.inserts[j],e=d[g.key],a.insertBefore(e,g.to>=i++?null:c[g.to])}function u(a,b){var c=a.type,d=a.vNode,e=a.patch;switch(c){case oa.REMOVE:return p(b,d);case oa.INSERT:return q(b,e);case oa.VTEXT:return r(b,d,e);case oa.VNODE:return s(b,d,e);case oa.ORDER:return t(b,e),b;case oa.PROPS:return n(b,e,d.properties),b;default:return b}}function v(a){return Object.getPrototypeOf?Object.getPrototypeOf(a):a.__proto__?a.__proto__:a.constructor?a.constructor.prototype:null}function w(a,b,c){return a.splice(b,1),{from:b,key:c}}function x(a){for(var b={},c=[],d=a.length,e=0;e<d;e++){var f=a[e];f.key?b[f.key]=e:c.push(e)}return{keys:b,free:c}}function y(a,b){return a?(Array.isArray(a)?a.push(b):a=[a,b],a):b}function z(a){var b={};for(var c in a)a.hasOwnProperty(c)&&(b[c]=void 0);return b}function A(a,b,c){if(a instanceof ma&&(a.hooks&&(b[c]=y(b[c],new oa(oa.PROPS,a,z(a.hooks)))),a.descendantHooks))for(var d=a.children,e=d.length,f=0;f<e;f++){var g=d[f];c+=1,A(g,b,c),g instanceof ma&&g.count&&(c+=g.count)}}function B(a,b,c){A(a,b,c)}function C(a,b){var c=x(b),d=c.keys,e=c.free;if(e.length===b.length)return{children:b,moves:null};var f=x(a),g=f.keys,h=f.free;if(h.length===a.length)return{children:b,moves:null};for(var i=[],j=0,k=e.length,l=0,m=0;m<a.length;m++){var n=a[m],o=void 0;n.key?d.hasOwnProperty(n.key)?(o=d[n.key],i.push(b[o])):(o=m-l++,i.push(null)):j<k?(o=e[j++],i.push(b[o])):(o=m-l++,i.push(null))}for(var p=j>=e.length?b.length:e[j],q=0;q<b.length;q++){var r=b[q];r.key?g.hasOwnProperty(r.key)||i.push(r):q>=p&&i.push(r)}for(var s=i.slice(),t=0,u=[],v=[],y=void 0,z=0;z<b.length;){var A=b[z];for(y=s[t];null===y&&s.length;)u.push(w(s,t,null)),y=s[t];y&&y.key===A.key?(t++,z++):A.key?(y&&y.key&&d[y.key]!==z+1?(u.push(w(s,t,y.key)),y=s[t],y&&y.key===A.key?t++:v.push({key:A.key,to:z})):v.push({key:A.key,to:z}),z++):y&&y.key&&u.push(w(s,t,y.key))}for(;t<s.length;)y=s[t],u.push(w(s,t,y&&y.key));return u.length!==l||v.length?{children:i,moves:{removes:u,inserts:v}}:{children:i,moves:null}}function D(a,b,c,d,e){for(var f=a.children,g=C(f,b.children),h=g.children,i=f.length,j=h.length,k=i>j?i:j,l=0;l<k;l++){var m=f[l],n=h[l];e+=1,m?F(m,n,c,e):n&&(d=y(d,new oa(oa.INSERT,null,n))),m instanceof ma&&m.count&&(e+=m.count)}return g.moves&&(d=y(d,new oa(oa.ORDER,a,g.moves))),d}function E(a,b){var c=void 0;for(var d in a){d in b||(c=c||{},c[d]=void 0);var e=a[d],f=b[d];if(e!==f)if(e&&"object"==typeof e&&f&&"object"==typeof f)if(v(f)!==v(e))c=c||{},c[d]=f;else if(f instanceof ja)c=c||{},c[d]=f;else{var g=E(e,f);g&&(c=c||{},c[d]=g)}else c=c||{},c[d]=f}for(var h in b)h in a||(c=c||{},c[h]=b[h]);return c}function F(a,b,c,d){if(a!==b){var e=c[d],f=!1;if(null===b)B(a,c,d),e=c[d],e=y(e,new oa(oa.REMOVE,a,b));else if(b instanceof ma)if(a instanceof ma)if(a.tagName===b.tagName&&a.namespace===b.namespace&&a.key===b.key){var g=E(a.properties,b.properties);g&&(e=y(e,new oa(oa.PROPS,a,g))),e=D(a,b,c,e,d)}else e=y(e,new oa(oa.VNODE,a,b)),f=!0;else e=y(e,new oa(oa.VNODE,a,b)),f=!0;else b instanceof na&&(a instanceof na?a.text!==b.text&&(e=y(e,new oa(oa.VTEXT,a,b))):(e=y(e,new oa(oa.VTEXT,a,b)),f=!0));e&&(c[d]=e),f&&B(a,c,d)}}function G(a,b){var c={a:a};return F(a,b,c,0),c}function H(a,b){return a>b?1:-1}function I(a,b,c){if(0===a.length)return!1;for(var d=0,e=a.length-1,f=void 0,g=void 0;d<=e;){if(f=(e+d)/2>>0,g=a[f],d===e)return g>=b&&g<=c;if(g<b)d=f+1;else{if(!(g>c))return!0;e=f-1}}return!1}function J(a,b,c,d,e){if(d=d||{},a){I(c,e,e)&&(d[e]=a);var f=b.children;if(f)for(var g=a.childNodes,h=0;h<b.children.length;h++){e+=1;var i=f[h]||[],j=e+(i.count||0);I(c,e,j)&&J(g[h],i,c,d,e),e=j}}return d}function K(a,b,c,d){return c&&0!==c.length?(c.sort(H),J(a,b,c,d,0)):{}}function L(a){var b=[];for(var c in a)"a"!==c&&b.push(Number(c));return b}function M(a,b,c){if(!b)return a;var d=void 0;if(Array.isArray(c))for(var e=0;e<c.length;e++)d=u(c[e],b),b===a&&(a=d);else d=u(c,b),b===a&&(a=d);return a}function N(a,b){var c=L(b);if(0===c.length)return a;for(var d=K(a,b.a,c),e=0;e<c.length;e++){var f=c[e];a=M(a,d[f],b[f])}return a}function O(a,b){return N(a,b)}function P(a,b){if("function"==typeof b&&(b=b.call(a)),"string"==typeof b){b=b.replace(/[\n\r\t]/g,"").replace(/\s+/g," ");var c=new DOMParser,d=c.parseFromString(b,"text/html");b=d.body&&d.body.childNodes}if(b instanceof Node)if("TEMPLATE"===b.tagName){if("function"!=typeof document.importNode||"undefined"==typeof HTMLTemplateElement)throw new Error("Template element is not supported by the browser");var e=document.createDocumentFragment(),f=document.importNode(b.content,!0);e.appendChild(f),b=e.childNodes}else b=[b];return b instanceof NodeList&&(b=Array.prototype.slice.call(b,0)),b}function Q(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],c=arguments.length<=2||void 0===arguments[2]||arguments[2],d={};return Array.prototype.forEach.call(a.attributes||[],function(a){c&&"is"!==a.name?d[a.name]=new sa(a.value,b.namespace):(d.attributes=d.attributes||{},d.attributes.is=a.value)}),d}function R(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if("undefined"==typeof a||a.nodeType===Node.COMMENT_NODE)return!1;if(a.nodeType===Node.TEXT_NODE)return new na(a.textContent);var c={};for(var d in b)b.hasOwnProperty(d)&&(c[d]=b[d]);a.tagName&&"svg"===a.tagName.toLowerCase()&&(c.namespace="http://www.w3.org/2000/svg");var e=a.constructor,f=c.hooks&&"function"==typeof e,g=Q(a,c,f);f?g["life-cycle-hook"]=new ra:g={attributes:g};var h=Array.prototype.filter.call(a.childNodes||[],function(a){return a&&a instanceof Node&&a.nodeType!==Node.COMMENT_NODE});return new ma(a.tagName,g,h.map(function(a){return R(a,c)}),(void 0),c.namespace)}function S(a,b){var c=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];return Object.defineProperty(b.prototype,"is",{configurable:!1,get:function(){return a}}),customElements.define(a,b,c),b}var T=function(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")},U=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),V=function(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b},W=function(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)},X=function(a){return new Y(a)},Y=function(){function a(b){T(this,a),this.superclass=b}return U(a,[{key:"with",value:function(){return Array.from(arguments).reduce(function(a,b){return b(a)},this.superclass)}}]),a}(),Z=function(a){function b(){return T(this,b),V(this,Object.getPrototypeOf(b).apply(this,arguments))}return W(b,a),U(b,[{key:"connectedCallback",value:function(){}},{key:"disconnectedCallback",value:function(){}},{key:"attributeChangedCallback",value:function(){}}]),b}(HTMLElement),$=function(a){return function(a){function c(){T(this,c);var a=V(this,Object.getPrototypeOf(c).call(this));if(a.is){var d=a.constructor.css;d&&b(a.is,d),a.classList.add(a.is)}return a}return W(c,a),c}(a)},_=function(a){function b(){return T(this,b),V(this,Object.getPrototypeOf(b).apply(this,arguments))}return W(b,a),b}(X(Z).with($)),aa=function(a){return function(a){function b(){T(this,b);var a=V(this,Object.getPrototypeOf(b).call(this)),c=a.constructor.events;if(c)for(var e in c)c.hasOwnProperty(e)&&!function(){var b="string"==typeof c[e]?a[c[e]]:c[e];if(b&&"function"==typeof b){var f=e.split(" "),g=f.shift(),h=f.join(" ");h?d(a,g,h,function(c,d){b.call(a,c,d)}):a.addEventListener(g,function(c){b.call(a,c,a)})}}();return a}return W(b,a),U(b,[{key:"trigger",value:function(a,b){var c=arguments.length<=2||void 0===arguments[2]||arguments[2],d=arguments.length<=3||void 0===arguments[3]||arguments[3];if(!a)throw new Error("Event name is undefined");var e=document.createEvent("Event");return"undefined"!=typeof e.initEvent&&e.initEvent(a,c,d),b&&(e.detail=b),this.dispatchEvent(e)}}]),b}(a)},ba=function(a){function b(){return T(this,b),V(this,Object.getPrototypeOf(b).apply(this,arguments))}return W(b,a),b}(X(Z).with(aa)),ca=function(){function a(){T(this,a)}return U(a,null,[{key:"get",value:function(b,c){var d=a.map.get(b)||{};return d[c]}},{key:"set",value:function(b,c,d){var e=arguments.length<=3||void 0===arguments[3]||arguments[3],f=a.map.get(b)||{},g=f[c];return g!==d&&(f[c]=d,a.map.set(b,f),e&&this.changed(b,c,g,d)),b[c]}},{key:"delete",value:function(b,c){var d=arguments.length<=2||void 0===arguments[2]||arguments[2],e=a.map.get(b)||{};if(e.hasOwnProperty(c)){var f=e[c];delete e[c],a.map.set(b,e),d&&this.changed(b,c,f,void 0)}}},{key:"observe",value:function(b,c,d){"function"==typeof c&&(d=c,c=a.GENERIC_OBSERVER);var e=a.callbacks.get(b)||{};e[c]=e[c]||[],e[c].push(d),a.callbacks.set(b,e);var f=e[c].length-1;return{cancel:function(){e[c]=e[c]||[],e[c][f]=null,a.callbacks.set(b,e)}}}},{key:"changed",value:function(b,c,d,e){var f=a.callbacks.get(b)||{},g=(f[c]||[]).some(function(a){return"function"==typeof a&&a.call(b,c,d,e)===!1});g||(f[a.GENERIC_OBSERVER]||[]).some(function(a){return"function"==typeof a&&a.call(b,c,d,e)===!1})}},{key:"GENERIC_OBSERVER",get:function(){return"-1"}}]),a}();ca.map=new WeakMap,ca.callbacks=new WeakMap;var da=function(a){return function(a){function b(){T(this,b);var a=V(this,Object.getPrototypeOf(b).call(this)),c=a.constructor,d=c.observedProperties||[];d.forEach(function(b){var d=g(c.prototype,b)||{};Object.defineProperty(a,b,{configurable:!0,get:h(b,d),set:i(b,d,function(b,c){ca.set(a,b,c)})})});for(var e=Array.prototype.slice.call(a.attributes||[],0),j=0,k=e.length;j<k;j++){var l=e[j],m=f(l.name);if(d.indexOf(m)!==-1){var n=l.value;if(a.removeAttribute(l.name),""===n)a[m]=!0;else try{a[m]=JSON.parse(n)}catch(b){a[m]=n}}}return a}return W(b,a),U(b,[{key:"observeProperty",value:function(a,b){return ca.observe(this,a,b)}},{key:"observeProperties",value:function(a){return ca.observe(this,a)}}]),b}(a)},ea=function(a){function b(){return T(this,b),V(this,Object.getPrototypeOf(b).apply(this,arguments))}return W(b,a),b}(X(Z).with(da)),fa=function a(b,c,d){null===b&&(b=Function.prototype);var e=Object.getOwnPropertyDescriptor(b,c);if(void 0===e){var f=Object.getPrototypeOf(b);return null===f?void 0:a(f,c,d)}if("value"in e)return e.value;var g=e.get;if(void 0!==g)return g.call(d)},ga=new WeakMap,ha=function(a){return function(a){function b(){T(this,b);var a=V(this,Object.getPrototypeOf(b).call(this)),c=a.constructor,d=k(c);d.forEach(function(b){var d=g(c.prototype,b)||{};Object.defineProperty(a,b,{configurable:!0,get:h(b,d),set:i(b,d,function(a,b){var c=e(a);j(this,c,b)})})});for(var f=a.attributes||[],l=0,m=f.length;l<m;l++){var n=f[l];a.attributeChangedCallback(n.name,void 0,n.value)}return d.forEach(function(b){j(a,e(b),a[b])}),a}return W(b,a),U(b,[{key:"attributeChangedCallback",value:function(a,c,d){fa(Object.getPrototypeOf(b.prototype),"attributeChangedCallback",this).call(this,a,c,d);var e=k(this.constructor);if(e&&Array.isArray(e)){var g=f(a);e.indexOf(g)!==-1&&(""===d&&(d=!0),d!==this[g]&&(this[g]=d))}}}]),b}(a)},ia=function(a){function b(){return T(this,b),V(this,Object.getPrototypeOf(b).apply(this,arguments))}return W(b,a),b}(X(Z).with(ha)),ja=function(){function a(){T(this,a)}return U(a,[{key:"unhook",value:function(){return!0}}]),a}(),ka={},la=[],ma=function a(b,c,d,e,f){T(this,a),this.tagName=b,this.properties=c||ka,this.children=d||la,this.key=null!==e?String(e):void 0,this.namespace="string"==typeof f?f:null;var g=d&&d.length||0,h=0,i=!1,j=void 0;for(var k in c)if(c.hasOwnProperty(k)){var l=c[k];l instanceof ja&&(j||(j={}),j[k]=l)}for(var m=0;m<g;m++){var n=d[m];n instanceof a&&(h+=n.count||0,i||!n.hooks&&!n.descendantHooks||(i=!0))}this.count=g+h,this.hooks=j,this.descendantHooks=i},na=function a(b){T(this,a),this.text=String(b)},oa=function(){function a(b,c,d){T(this,a),this.type=Number(b),this.vNode=c,this.patch=d}return U(a,null,[{key:"NONE",get:function(){return 0}},{key:"VTEXT",get:function(){return 1}},{key:"VNODE",get:function(){return 2}},{key:"PROPS",get:function(){return 3}},{key:"ORDER",get:function(){return 4}},{key:"INSERT",get:function(){return 5}},{key:"REMOVE",get:function(){return 6}}]),a}(),pa=function(a){return function(a){function b(){return T(this,b),V(this,Object.getPrototypeOf(b).apply(this,arguments))}return W(b,a),U(b,[{key:"connectedCallback",value:function(){var a=this,c=this.constructor;c&&c.hasOwnProperty("template")&&(ca.observe(this,function(){a.templateReady&&a.render()}),this.templateReady=!0,this.render()),fa(Object.getPrototypeOf(b.prototype),"connectedCallback",this).call(this)}},{key:"render",value:function(a){if(a=a||this.constructor.template,a=P(this,a),null!==a&&void 0!==a){if(Array.isArray(a)){var b=ca.get(this,"__lastNode");if(b){b instanceof Node&&(b=[b]);for(var c=0;c<b.length;c++){var d=b[c];d.parentNode===this&&this.removeChild(d)}}a instanceof Node&&(a=[a]);for(var e=0;e<a.length;e++)this.appendChild(a[e]);ca.set(this,"__lastNode",a,!1)}return Promise.resolve()}return Promise.reject()}}]),b}(a)},qa=function(a){function b(){return T(this,b),V(this,Object.getPrototypeOf(b).apply(this,arguments))}return W(b,a),b}(X(Z).with(pa)),ra=function(a){function b(){return T(this,b),V(this,Object.getPrototypeOf(b).apply(this,arguments))}return W(b,a),U(b,[{key:"hook",value:function(a){var c=ca.get(a,b.CREATED_PROP);c||ca.set(a,b.CREATED_PROP,!0,!1),this.isAttached(a)}},{key:"isAttached",value:function(a){var c=ca.get(a,b.ATTACHED_PROP);this.parentNode&&!c?(ca.set(a,b.ATTACHED_PROP,!0,!1),this.trigger("connectedCallback")):!this.parentNode&&c&&(ca.set(a,b.ATTACHED_PROP,!1,!1),this.trigger("disconnectedCallback"))}},{key:"trigger",value:function(a){if("function"==typeof this[a]){for(var b=arguments.length,c=Array(b>1?b-1:0),d=1;d<b;d++)c[d-1]=arguments[d];this[a].apply(this,c)}}}],[{key:"CREATED_PROP",get:function(){return"__virtualDomCreated"}},{key:"ATTACHED_PROP",get:function(){return"__virtualDomAttached"}}]),b}(ja),sa=function(a){function b(a,c){T(this,b);var d=V(this,Object.getPrototypeOf(b).call(this));return d.value=a,d.namespace=c,d}return W(b,a),U(b,[{key:"hook",value:function(a,b,c){var d=this.value,e=c&&c.value;e!==d&&(void 0!==d&&null!==d?this.namespace?(a.removeAttribute(b),a.setAttributeNS(this.namespace,b,d)):a.setAttribute(b,d):c&&(this.namespace?a.removeAttributeNS(this.namespace,b):a.removeAttribute(b)),"function"==typeof a.attributeChangedCallback&&a.attributeChangedCallback(b,e,d))}}]),b}(ja),ta="__vtree",ua=function(a){return function(a){function b(){return T(this,b),V(this,Object.getPrototypeOf(b).apply(this,arguments))}return W(b,a),U(b,[{key:"render",value:function(a){var b=this;if(a=a||this.constructor.template,a=P(this,a),null!==a&&void 0!==a){var c=new ma(this.tagName),d=ca.get(this,ta)||c;if(a instanceof ma?c=new ma(this.tagName,{},[a]):Array.isArray(a)&&!function(){var d=b.constructor.useVirtualDomHooks;a=a.map(function(a){return R(a,{hooks:d})}),c=new ma(b.tagName,{},a)}(),c instanceof ma){var e=G(d,c);O(this,e),ca.set(this,ta,c,!1)}return Promise.resolve()}return Promise.reject()}}],[{key:"useVirtualDomHooks",get:function(){return!0}}]),b}(X(a).with(pa))},va=function(a){function b(){return T(this,b),V(this,Object.getPrototypeOf(b).apply(this,arguments))}return W(b,a),b}(X(Z).with(ua)),wa=X(Z).with(da,$,aa,ha,ua),xa=function(a){function b(){return T(this,b),V(this,Object.getPrototypeOf(b).apply(this,arguments))}return W(b,a),b}(wa);if("undefined"==typeof window.customElements){!function(){function a(a){return h.test(a)&&g.indexOf(a)===-1}function b(a){return e.createTreeWalker(a,NodeFilter.SHOW_ELEMENT,null,!1)}function c(a){return a.nodeType===Node.ELEMENT_NODE}function d(){this._definitions=new Map,this._constructors=new Map,this._whenDefinedMap=new Map,this._observers=new Set,this._attributeObserver=new MutationObserver(this._handleAttributeChange.bind(this)),this._newInstance=null,this.polyfilled=!0,this.enableFlush=!1,this._observeRoot(document)}var e=document,f=window,g=["annotation-xml","color-profile","font-face","font-face-src","font-face-uri","font-face-format","font-face-name","missing-glyph"],h=/^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/;d.prototype={define:function(b,c,d){function f(a){var b=h[a];if(void 0!==b&&"function"!=typeof b)throw new Error(g+" '"+a+"' is not a Function");return b}if(b=b.toString().toLowerCase(),"function"!=typeof c)throw new TypeError("constructor must be a Constructor");if(!a(b))throw new SyntaxError("The element name '"+b+"' is not valid.");if(this._definitions.has(b))throw new Error("An element with name '"+b+"' is already defined");if(this._constructors.has(c))throw new Error("Definition failed for '"+b+"': The constructor is already used.");var g=b,h=c.prototype;if("object"!=typeof h)throw new TypeError("Definition failed for '"+b+"': constructor.prototype must be an object");var i=f("connectedCallback"),j=f("disconnectedCallback"),k=f("attributeChangedCallback"),l=c.observedAttributes||[],m={name:b,localName:g,constructor:c,connectedCallback:i,disconnectedCallback:j,attributeChangedCallback:k,observedAttributes:l};this._definitions.set(g,m),this._constructors.set(c,g),this._addNodes(e.childNodes);var n=this._whenDefinedMap.get(g);n&&(n.resolve(void 0),this._whenDefinedMap.delete(g))},get:function(a){var b=this._definitions.get(a);return b?b.constructor:void 0},whenDefined:function(a){if(!h.test(a))return Promise.reject(new SyntaxError("The element name '"+a+"' is not valid."));if(this._definitions.has(a))return Promise.resolve();var b={promise:null};return b.promise=new Promise(function(a,c){b.resolve=a}),this._whenDefinedMap.set(a,b),b.promise},flush:function(){this.enableFlush&&(console.warn("flush!!!"),this._observers.forEach(function(a){this._handleMutations(a.takeRecords())},this))},_setNewInstance:function(a){this._newInstance=a},_observeRoot:function(a){a.__observer=new MutationObserver(this._handleMutations.bind(this)),a.__observer.observe(a,{childList:!0,subtree:!0}),this.enableFlush&&this._observers.add(a.__observer)},_unobserveRoot:function(a){a.__observer&&(a.__observer.disconnect(),a.__observer=null,this.enableFlush&&this._observers.delete(a.__observer))},_handleMutations:function(a){for(var b=0;b<a.length;b++){var c=a[b];"childList"===c.type&&(this._addNodes(c.addedNodes),this._removeNodes(c.removedNodes))}},_addNodes:function(a){for(var d=0;d<a.length;d++){var e=a[d];if(c(e)){this._unobserveRoot(e);var f=b(e);do{var g=f.currentNode,h=this._definitions.get(g.localName);if(h&&(g.__upgraded||this._upgradeElement(g,h,!0),g.__upgraded&&!g.__attached&&(g.__attached=!0,h&&h.connectedCallback&&h.connectedCallback.call(g))),g.shadowRoot&&this._addNodes(g.shadowRoot.childNodes),"LINK"===g.tagName){var i=function(){var a=g;return function(){a.removeEventListener("load",i),this._observeRoot(a.import),this._addNodes(a.import.childNodes)}.bind(this)}.bind(this)();g.import?i():g.addEventListener("load",i)}}while(f.nextNode())}}},_removeNodes:function(a){for(var d=0;d<a.length;d++){var e=a[d];if(c(e)){this._observeRoot(e);var f=b(e);do{var g=f.currentNode;if(g.__upgraded&&g.__attached){g.__attached=!1;var h=this._definitions.get(g.localName);h&&h.disconnectedCallback&&h.disconnectedCallback.call(g)}}while(f.nextNode())}}},_upgradeElement:function(a,b,c){var d=b.constructor.prototype;a.__proto__=d,c&&(this._setNewInstance(a),a.__upgraded=!0,new b.constructor,console.assert(null==this._newInstance));var e=b.observedAttributes;if(b.attributeChangedCallback&&e.length>0){this._attributeObserver.observe(a,{attributes:!0,attributeOldValue:!0,attributeFilter:e});for(var f=0;f<e.length;f++){var g=e[f];if(a.hasAttribute(g)){var h=a.getAttribute(g);a.attributeChangedCallback(g,null,h)}}}},_handleAttributeChange:function(a){for(var b=0;b<a.length;b++){var c=a[b];if("attributes"===c.type){var d=c.attributeName,e=c.oldValue,f=c.target,g=f.getAttribute(d),h=c.attributeNamespace;f.attributeChangedCallback(d,e,g,h)}}}},window.CustomElementsRegistry=d,d.prototype.define=d.prototype.define,d.prototype.get=d.prototype.get,d.prototype.whenDefined=d.prototype.whenDefined,d.prototype.flush=d.prototype.flush,d.prototype.polyfilled=d.prototype.polyfilled,d.prototype.enableFlush=d.prototype.enableFlush;var i=f.HTMLElement;f.HTMLElement=function(){var a=f.customElements;if(a._newInstance){var b=a._newInstance;return a._newInstance=null,b}if(this.constructor){var c=a._constructors.get(this.constructor);return c?e._createElement(c,!1):this}throw new Error("unknown constructor. Did you call customElements.define()?")},f.HTMLElement.prototype=Object.create(i.prototype),Object.defineProperty(f.HTMLElement.prototype,"constructor",{value:f.HTMLElement});for(var j=["Button","Canvas","Data","Head","Mod","TableCell","TableCol","Anchor","Area","Base","Body","BR","DataList","Details","Dialog","Div","DList","Embed","FieldSet","Form","Heading","HR","Html","IFrame","Image","Input","Keygen","Label","Legend","LI","Link","Map","Media","Menu","MenuItem","Meta","Meter","Object","OList","OptGroup","Option","Output","Paragraph","Param","Picture","Pre","Progress","Quote","Script","Select","Slot","Source","Span","Style","TableCaption","Table","TableRow","TableSection","Template","TextArea","Time","Title","Track","UList","Unknown"],k=0;k<j.length;k++){var l=window["HTML"+j[k]+"Element"];l&&(l.prototype.__proto__=f.HTMLElement.prototype)}var m=e.createElement;e._createElement=function(a,b,c){"string"!=typeof b&&(c=b,b=null);var d,g=f.customElements;d=b?m.call(e,a,b):m.call(e,a);var h=g._definitions.get((b||a).toLowerCase());return h&&g._upgradeElement(d,h,c),g._observeRoot(d),d},e.createElement=function(a,b){return e._createElement(a,b,!0)};var n=e.createElementNS;e.createElementNS=function(a,b){return"http://www.w3.org/1999/xhtml"===a?e.createElement(b):n.call(document,a,b)};var o=Element.prototype.attachShadow;o&&Object.defineProperty(Element.prototype,"attachShadow",{value:function(a){var b=o.call(this,a),c=f.customElements;return c._observeRoot(b),b}});var p=Node.prototype.cloneNode;Node.prototype.cloneNode=function(){var a=p.apply(this,arguments),b=a.getAttribute("is")||a.tagName,c=customElements._definitions.get(b.toLowerCase());return c&&customElements._upgradeElement(a,c,!0),a},window.customElements=new d}()}var ya=X(Z).with(da,$,aa,ha,pa),za=function(a){function b(){return T(this,b),V(this,Object.getPrototypeOf(b).apply(this,arguments))}return W(b,a),b}(ya),Aa='2.0.0-beta2'||"dev",Ba=function(a){function b(){return T(this,b),V(this,Object.getPrototypeOf(b).apply(this,arguments))}return W(b,a),U(b,null,[{key:"useVirtualDomHooks",get:function(){return!1}}]),b}(xa),Ca=Ba,Da=S;a.DNAVDomBaseComponent=xa,a.DNAVDomElementsBaseComponent=Ba,a.BaseComponent=Ca,a.register=Da,a.Version=Aa,a.mix=X,a.DNAProperty=ca,a.DNAComponent=Z,a.DNAPropertiesMixin=da,a.DNAPropertiesComponent=ea,a.DNAAttributesMixin=ha,a.DNAAttributesComponent=ia,a.DNAEventsMixin=aa,a.DNAEventsComponent=ba,a.DNAStyleMixin=$,a.DNAStyleComponent=_,a.DNATemplateMixin=pa,a.DNATemplateComponent=qa,a.DNABaseComponent=za,a.DNAVDomMixin=ua,a.DNAVDomComponent=va,Object.defineProperty(a,"__esModule",{value:!0})});