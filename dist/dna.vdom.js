!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?b(exports,require("vdom")):"function"==typeof define&&define.amd?define(["exports","vdom"],b):b(a.DNA=a.DNA||{},a.vdom)}(this,function(a,b){"use strict";function c(a){if("undefined"!=typeof window){var b=window[a];if("object"==typeof b&&b.hasOwnProperty("prototype")){var c=function(){};c.prototype=b.prototype,window[a]=c}return window[a]}return null}function d(a,b,c){var d=a;if("function"!=typeof d&&(d=d.constructor),!d)return!1;var e=H.getCallbacks(d,b);if(e&&Array.isArray(e))for(var f=0,g=e.length;f<g;f++)e[f].apply(a,c);return!0}function e(a,b){var c=void 0;if(a){c=Object.getOwnPropertyDescriptor(a,b);var d=Object.getPrototypeOf(a);!c&&d&&(c=e(d,b))}return c}function f(a,b,c){var d="function"==typeof b.get,e=function(){var e=void 0;return e=d?b.get.call(this):J.get(this,a),"undefined"!=typeof e?e:c};return e}function g(a,b,c){if(b&&b.set&&b.set.callbacks)return b.set.callbacks.push(c),b.set;var d=function c(d){var e=this;b.set?b.set.call(this,d):J.set(this,a,d);var f=this[a];return c.callbacks.forEach(function(b){"function"==typeof b&&b.call(e,a,f)}),f};return d.callbacks=[c],d}function h(a,b){for(;b;){var c=e(b,a);if(c)return!0;b=b.prototype}return!1}function i(a,b){if(Array.isArray(b))for(var c=0;c<b.length;c++)i(a,b[c]);else{var d=function(){if(a.__attachedBehaviors=a.__attachedBehaviors||[],a.__attachedBehaviors.indexOf(b)!==-1)return{v:void 0};Array.isArray(b.behaviors)&&i(a,b.behaviors);for(var c=[],d=b;d&&d!==E;)Object.getOwnPropertyNames(d).forEach(function(a){c.indexOf(a)===-1&&I.indexOf(a)===-1&&c.push(a)}),d=Object.getPrototypeOf(d);c.forEach(function(c){F.indexOf(c)!==-1?H.pushCallback(a,c,b[c]):c in a||(a[c]=b[c])}),b.prototype&&!function(){for(var c=[],d=b.prototype||Object.getPrototypeOf(b);d&&d!==E.prototype;)Object.getOwnPropertyNames(d).forEach(function(a){c.indexOf(a)===-1&&c.push(a)}),d=d.prototype||Object.getPrototypeOf(d);c.forEach(function(c){F.indexOf(c)!==-1?H.pushCallback(a,c,b.prototype[c]):h(c,a.prototype)||(a.prototype[c]=b.prototype[c])})}(),a.__attachedBehaviors.push(b)}();if("object"==typeof d)return d.v}}function j(a,b){return a.replace(/\:host[^\{]*/g,function(a){return a.split(",").map(function(a){return a=a.trim(),a.match(/\:host\(/)&&(a=a.replace(/\:host[^\s]*/,function(a){return a.trim().replace(":host(",":host").replace(/\)$/,"")})),a.replace(/\:host/,"."+b)}).join(", ")})}function k(a,b){var c="";Array.isArray(b)||(b=[b]),b.forEach(function(b){"function"==typeof b&&(b=b()),c+=j(b,a)}),a="style-"+a;var d=document.getElementById(a)||document.createElement("style");if(d.type="text/css",d.setAttribute("id",a),d.innerHTML="",d.appendChild(document.createTextNode(c)),!d.parentNode){var e=document.head;e.firstElementChild?e.insertBefore(d,e.firstElementChild):e.appendChild(d)}return d}function l(a,b){var c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||function(a){return[].indexOf.call(document.querySelectorAll(a),this)!==-1};return c.call(a,b)}function m(a,b,c,d){a.addEventListener(b,function(b){for(var e=b.target;e&&e!==a;){if(l(e,c))return void d.call(a,b,e);e=e.parentNode}})}function n(a){return a.replace(/\W+/g,"-").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase()}function o(a){return a.replace(/\W+(.)/g,function(a,b){return b.toUpperCase()})}function p(a,b,c){var d=a.getAttribute(b);null!==c&&void 0!==c&&c!==!1?"string"!=typeof c&&"number"!=typeof c||d===c?"boolean"==typeof c&&""!==d&&a.setAttribute(b,""):a.setAttribute(b,c):(d||""===d)&&a.removeAttribute(b)}function q(a){return P.get(a)||function(){var b=(a.observedAttributes||[]).map(function(a){return o(a)});return P.set(a,b),b}()}function r(a,b){return"undefined"!=typeof b&&(R[a]=b),R[a]}function s(a,b){if("function"==typeof b&&(b=b.call(a)),"string"==typeof b){b=b.replace(/[\n\r\t]/g,"").replace(/\s+/g," ");var c=new DOMParser,d=c.parseFromString(b,"text/html");b=d.body&&d.body.childNodes}if(b instanceof Node)if("TEMPLATE"===b.tagName){if("function"!=typeof document.importNode||"undefined"==typeof HTMLTemplateElement)throw new Error("Template element is not supported by the browser");var e=document.createDocumentFragment(),f=document.importNode(b.content,!0);e.appendChild(f),b=e.childNodes}else b=[b];return b instanceof NodeList&&(b=Array.prototype.slice.call(b,0)),b}function t(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],c=arguments.length<=2||void 0===arguments[2]||arguments[2],d={};return Array.prototype.forEach.call(a.attributes||[],function(a){c&&"is"!==a.name?d[a.name]=new W(a.value,b.namespace):d[a.name]=a.value}),d}function u(a){var c=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if("undefined"==typeof a||a.nodeType===Node.COMMENT_NODE)return!1;if(a.nodeType===Node.TEXT_NODE)return new b.virtualDom.VText(a.textContent);var d={};for(var e in c)c.hasOwnProperty(e)&&(d[e]=c[e]);a.tagName&&"svg"===a.tagName.toLowerCase()&&(d.namespace="http://www.w3.org/2000/svg");var f=a.constructor,g=d.hooks&&"function"==typeof f,h=t(a,d,g);g?h["life-cycle-hook"]=new V:h={attributes:h};var i=Array.prototype.filter.call(a.childNodes||[],function(a){return a&&a instanceof Node&&a.nodeType!==Node.COMMENT_NODE});return new b.virtualDom.VNode(a.tagName,h,i.map(function(a){return u(a,d)}),(void 0),d.namespace)}function v(a){var b=void 0;return a.name&&(b=a.name.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()}).replace(/^\-/,"")),b}function w(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],c=void 0,d={},e=void 0;return"string"==typeof a?(e=a,"function"==typeof b?(c=b,d={}):("object"==typeof b&&(d=b),"undefined"!=typeof d.prototype&&(c=d.prototype))):(c=a,"object"==typeof b&&(d=b)),"function"==typeof c?(e=e||d.tagName||c.hasOwnProperty("tagName")&&c.tagName||v(c),d.prototype=c.prototype,d.extends||"string"!=typeof c.extends||(d.extends=c.extends)):"object"==typeof c&&(d.prototype=c,c=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];d.prototype.constructor.apply(this,b)},c.prototype=d.prototype),d.prototype&&(d.prototype=Object.create(d.prototype)),{tagName:e,config:d,scope:c}}function x(a,b){var c=arguments.length<=2||void 0===arguments[2]||arguments[2],d=arguments[3],e=arguments.length<=4||void 0===arguments[4]?[]:arguments[4];Object.getOwnPropertyNames(b).forEach(function(h){var i=Object.getOwnPropertyDescriptor(b,h)||{},j="function"==typeof i.value;e.indexOf(h)===-1&&("undefined"!=typeof i.value&&j?j&&c&&(e.push(h),Object.defineProperty(a,h,i)):(e.push(h),i.configurable!==!1&&Object.defineProperty(a,h,{configurable:!0,get:f(h,i,i.value),set:g(h,i,d)})))});var h=b.prototype||Object.getPrototypeOf(b);h&&h!==HTMLElement.prototype&&x(a,h,c,d,e)}function y(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],c=w(a,b),d=c.scope,e=c.tagName,f=c.config,g=function(a){return a=a||document.createElement(f.extends?f.extends:e),x(a,d.prototype),Object.defineProperty(a,"is",{configurable:!1,get:function(){return e}}),a.createdCallback(),a};return Object.defineProperty(g.prototype,"constructor",{configurable:!1,get:function(){return d}}),g}var z=function(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")},A=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),B=function(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b},C=function(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)},D=function a(b,c,d){null===b&&(b=Function.prototype);var e=Object.getOwnPropertyDescriptor(b,c);if(void 0===e){var f=Object.getPrototypeOf(b);return null===f?void 0:a(f,c,d)}if("value"in e)return e.value;var g=e.get;if(void 0!==g)return g.call(d)};c("HTMLElement");var E=function(a){function b(){return z(this,b),B(this,Object.getPrototypeOf(b).apply(this,arguments))}return C(b,a),A(b,[{key:"createdCallback",value:function(){}},{key:"attachedCallback",value:function(){}},{key:"detachedCallback",value:function(){}},{key:"attributeChangedCallback",value:function(){}}]),b}(HTMLElement),F=["createdCallback","attachedCallback","detachedCallback","attributeChangedCallback"],G=new WeakMap,H=function(){function a(){z(this,a)}return A(a,null,[{key:"get",value:function(a){return G.get(a)||{}}},{key:"set",value:function(a,b){return G.set(a,b)}},{key:"getCallbacks",value:function(a,b){var c=this.get(a);return c[b]||[]}},{key:"setCallbacks",value:function(a,b,c){var d=this.get(a);d[b]=c,this.set(a,d)}},{key:"pushCallback",value:function(a,b,c){var d=this.getCallbacks(a,b);d.push(c),this.setCallbacks(a,b,d)}}]),a}(),I=["name","length","prototype","__proto__","arguments","caller","constructor"],J=function(){function a(){z(this,a)}return A(a,null,[{key:"get",value:function(b,c){var d=a.map.get(b)||{};return d[c]}},{key:"set",value:function(b,c,d){var e=arguments.length<=3||void 0===arguments[3]||arguments[3],f=a.map.get(b)||{},g=f[c];return g!==d&&(f[c]=d,a.map.set(b,f),e&&this.changed(b,c,g,d)),b[c]}},{key:"delete",value:function(b,c){var d=arguments.length<=2||void 0===arguments[2]||arguments[2],e=a.map.get(b)||{};if(e.hasOwnProperty(c)){var f=e[c];delete e[c],a.map.set(b,e),d&&this.changed(b,c,f,void 0)}}},{key:"observe",value:function(b,c,d){"function"==typeof c&&(d=c,c=a.GENERIC_OBSERVER);var e=a.callbacks.get(b)||{};e[c]=e[c]||[],e[c].push(d),a.callbacks.set(b,e);var f=e[c].length-1;return{cancel:function(){e[c]=e[c]||[],e[c][f]=null,a.callbacks.set(b,e)}}}},{key:"changed",value:function(b,c,d,e){var f=a.callbacks.get(b)||{},g=(f[c]||[]).some(function(a){return"function"==typeof a&&a.call(b,c,d,e)===!1});g||(f[a.GENERIC_OBSERVER]||[]).some(function(a){return"function"==typeof a&&a.call(b,c,d,e)===!1})}},{key:"GENERIC_OBSERVER",get:function(){return"-1"}}]),a}();J.map=new WeakMap,J.callbacks=new WeakMap;var K=new WeakMap,L=function(a){function b(){return z(this,b),B(this,Object.getPrototypeOf(b).apply(this,arguments))}return C(b,a),A(b,[{key:"createdCallback",value:function(){D(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this);var a=this.constructor;K.get(a)||(i(a,a.behaviors||[]),delete a.__attachedBehaviors,K.set(a,!0)),d(this,"createdCallback")}},{key:"attachedCallback",value:function(){D(Object.getPrototypeOf(b.prototype),"attachedCallback",this).call(this),d(this,"attachedCallback")}},{key:"detachedCallback",value:function(){D(Object.getPrototypeOf(b.prototype),"detachedCallback",this).call(this),d(this,"detachedCallback")}},{key:"attributeChangedCallback",value:function(a,c,e){D(Object.getPrototypeOf(b.prototype),"attributeChangedCallback",this).call(this,a,c,e),d(this,"attributeChangedCallback",[a,c,e])}}]),b}(E),M=function(a){function b(){return z(this,b),B(this,Object.getPrototypeOf(b).apply(this,arguments))}return C(b,a),A(b,[{key:"createdCallback",value:function(){if(D(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this),this.is){var a=this.constructor.css;a&&k(this.is,a),this.classList.add(this.is)}}}],[{key:"addCss",value:function(){return k.apply(void 0,arguments)}}]),b}(E),N=function(a){function b(){return z(this,b),B(this,Object.getPrototypeOf(b).apply(this,arguments))}return C(b,a),A(b,[{key:"createdCallback",value:function(){var a=this,c=this.constructor.events;if(c)for(var d in c)c.hasOwnProperty(d)&&!function(){var b="string"==typeof c[d]?a[c[d]]:c[d];if(b&&"function"==typeof b){var e=d.split(" "),f=e.shift(),g=e.join(" ");g?m(a,f,g,function(c,d){b.call(a,c,d)}):a.addEventListener(f,function(c){b.call(a,c,a)})}}();D(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this)}},{key:"trigger",value:function(a,b){var c=arguments.length<=2||void 0===arguments[2]||arguments[2],d=arguments.length<=3||void 0===arguments[3]||arguments[3];if(!a)throw new Error("Event name is undefined");var e=document.createEvent("Event");return"undefined"!=typeof e.initEvent&&e.initEvent(a,c,d),b&&(e.detail=b),this.dispatchEvent(e)}}]),b}(E),O=function(a){function b(){return z(this,b),B(this,Object.getPrototypeOf(b).apply(this,arguments))}return C(b,a),A(b,[{key:"createdCallback",value:function(){var a=this;D(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this);var c=this.constructor,d=c.observedProperties||[];d.forEach(function(b){var d=e(c.prototype,b)||{};Object.defineProperty(a,b,{configurable:!0,get:f(b,d),set:g(b,d,function(b,c){J.set(a,b,c)})})});for(var h=Array.prototype.slice.call(this.attributes||[],0),i=0,j=h.length;i<j;i++){var k=h[i],l=o(k.name);if(d.indexOf(l)!==-1){var m=k.value;if(this.removeAttribute(k.name),""===m)this[l]=!0;else try{this[l]=JSON.parse(m)}catch(a){this[l]=m}}}}},{key:"observeProperty",value:function(a,b){return J.observe(this,a,b)}},{key:"observeProperties",value:function(a){return J.observe(this,a)}}]),b}(E),P=new WeakMap,Q=function(a){function b(){return z(this,b),B(this,Object.getPrototypeOf(b).apply(this,arguments))}return C(b,a),A(b,[{key:"createdCallback",value:function(){var a=this;D(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this);var c=this.constructor,d=q(c);d.forEach(function(b){var d=e(c.prototype,b)||{};Object.defineProperty(a,b,{configurable:!0,get:f(b,d),set:g(b,d,function(a,b){var c=n(a);p(this,c,b)})})});for(var h=this.attributes||[],i=0,j=h.length;i<j;i++){var k=h[i];this.attributeChangedCallback(k.name,void 0,k.value)}d.forEach(function(b){p(a,n(b),a[b])})}},{key:"attributeChangedCallback",value:function(a,c,d){D(Object.getPrototypeOf(b.prototype),"attributeChangedCallback",this).call(this,a,c,d);var e=q(this.constructor);if(e&&Array.isArray(e)){var f=o(a);e.indexOf(f)!==-1&&(""===d&&(d=!0),d!==this[f]&&(this[f]=d))}}}]),b}(E),R={},S=!0,T=function(a){function b(){return z(this,b),B(this,Object.getPrototypeOf(b).apply(this,arguments))}return C(b,a),A(b,[{key:"createdCallback",value:function(){var a=this.constructor;a.hasOwnProperty("template")&&r(this.is,a.template),a&&a.autoUpdateView&&J.observe(this,function(){this.templateReady&&this.render()}),D(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this),this.templateReady=!0,this.render()}},{key:"render",value:function(a){if(a=a||r(this.is),a=s(this,a),null!==a&&void 0!==a){if(Array.isArray(a)){var b=J.get(this,"__lastNode");if(b){b instanceof Node&&(b=[b]);for(var c=0;c<b.length;c++){var d=b[c];d.parentNode===this&&this.removeChild(d)}}a instanceof Node&&(a=[a]);for(var e=0;e<a.length;e++)this.appendChild(a[e]);J.set(this,"__lastNode",a,!1)}return Promise.resolve()}return Promise.reject()}}],[{key:"autoUpdateView",get:function(){return S}}]),b}(E),U=function(a){function b(){return z(this,b),B(this,Object.getPrototypeOf(b).apply(this,arguments))}return C(b,a),A(b,null,[{key:"behaviors",get:function(){return[O,M,N,Q,T]}}]),b}(L),V=function(){function a(){z(this,a)}return A(a,[{key:"hook",value:function(b){var c=J.get(b,a.CREATED_PROP);c||J.set(b,a.CREATED_PROP,!0,!1),this.isAttached(b)}},{key:"isAttached",value:function(b){var c=J.get(b,a.ATTACHED_PROP);this.parentNode&&!c?(J.set(b,a.ATTACHED_PROP,!0,!1),this.trigger("attachedCallback")):!this.parentNode&&c&&(J.set(b,a.ATTACHED_PROP,!1,!1),this.trigger("detachedCallback"))}},{key:"trigger",value:function(a){if("function"==typeof this[a]){for(var b=arguments.length,c=Array(b>1?b-1:0),d=1;d<b;d++)c[d-1]=arguments[d];this[a].apply(this,c)}}}],[{key:"CREATED_PROP",get:function(){return"__virtualDomCreated"}},{key:"ATTACHED_PROP",get:function(){return"__virtualDomAttached"}}]),a}(),W=function(){function a(b,c){z(this,a),this.value=b,this.namespace=c}return A(a,[{key:"hook",value:function(a,b,c){var d=this.value,e=c&&c.value;e!==d&&(void 0!==d&&null!==d?this.namespace?(a.removeAttribute(b),a.setAttributeNS(this.namespace,b,d)):a.setAttribute(b,d):c&&(this.namespace?a.removeAttributeNS(this.namespace,b):a.removeAttribute(b)),"function"==typeof a.attributeChangedCallback&&a.attributeChangedCallback(b,e,d))}}]),a}(),X=function(a){function c(){return z(this,c),B(this,Object.getPrototypeOf(c).apply(this,arguments))}return C(c,a),A(c,[{key:"render",value:function(a){var c=this;if(a=a||r(this.is),a=s(this,a),null!==a&&void 0!==a){var d=new b.virtualDom.VNode(this.tagName),e=J.get(this,"__vtree")||d;if(Array.isArray(a)&&!function(){var e=c.constructor.useVirtualDomHooks;a=a.map(function(a){return u(a,{hooks:e})}),d=new b.virtualDom.VNode(c.tagName,{},a)}(),d instanceof b.virtualDom.VNode){var f=b.virtualDom.diff(e||u(),d);b.virtualDom.patch(this,f),J.set(this,"__vtree",d,!1)}return Promise.resolve()}return Promise.reject()}}],[{key:"useVirtualDomHooks",get:function(){return!0}}]),c}(T),Y=function(a){function b(){return z(this,b),B(this,Object.getPrototypeOf(b).apply(this,arguments))}return C(b,a),A(b,null,[{key:"behaviors",get:function(){return[O,M,N,Q,X]}}]),b}(U),Z='2.0.0-beta1'||"dev",$=Y;a.DNAVDomBaseComponent=Y,a.BaseComponent=$,a.Version=Z,a.DNAProperty=J,a.register=y,a.DNAComponent=E,a.DNAPropertiesComponent=O,a.DNAAttributesComponent=Q,a.DNAEventsComponent=N,a.DNAMixedComponent=L,a.DNAStyleComponent=M,a.DNATemplateComponent=T,a.DNABaseComponent=U,a.DNAVDomComponent=X,Object.defineProperty(a,"__esModule",{value:!0})});