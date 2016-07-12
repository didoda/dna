!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?b(exports,require("vdom")):"function"==typeof define&&define.amd?define(["exports","vdom"],b):b(a.DNA=a.DNA||{},a.vdom)}(this,function(a,b){"use strict";function c(a){var b=void 0;return a.name&&(b=a.name.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()}).replace(/^\-/,"")),b}function d(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],d=void 0,e={},f=void 0;return"string"==typeof a?(f=a,"function"==typeof b?(d=b,e={}):("object"==typeof b&&(e=b),"undefined"!=typeof e.prototype&&(d=e.prototype))):(d=a,"object"==typeof b&&(e=b)),"function"==typeof d?(f=f||e.tagName||d.hasOwnProperty("tagName")&&d.tagName||c(d),e.prototype=d.prototype,e.extends||"string"!=typeof d.extends||(e.extends=d.extends)):"object"==typeof d&&(e.prototype=d,d=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];e.prototype.constructor.apply(this,b)},d.prototype=e.prototype),e.prototype&&(e.prototype=Object.create(e.prototype)),{tagName:f,config:e,scope:d}}function e(a){return a.replace(/\W+/g,"-").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase()}function f(a){return a.replace(/\W+(.)/g,function(a,b){return b.toUpperCase()})}function g(a){if("undefined"!=typeof window){var b=window[a];if("object"==typeof b&&b.hasOwnProperty("prototype")){var c=function(){};c.prototype=b.prototype,window[a]=c}return window[a]}return null}function h(a,b,c){var d=a;if("function"!=typeof d&&(d=d.constructor),!d)return!1;var e=I.getCallbacks(d,b);if(e&&Array.isArray(e))for(var f=0,g=e.length;f<g;f++)e[f].apply(a,c);return!0}function i(a,b){var c=void 0;if(a){c=Object.getOwnPropertyDescriptor(a,b);var d=Object.getPrototypeOf(a);!c&&d&&(c=i(d,b))}return c}function j(a,b,c){var d="function"==typeof b.get,e=function(){var e=void 0;return e=d?b.get.call(this):K.get(this,a),"undefined"!=typeof e?e:c};return e}function k(a,b,c){if(b&&b.set&&b.set.callbacks)return b.set.callbacks.push(c),b.set;var d=function c(d){var e=this;b.set?b.set.call(this,d):K.set(this,a,d);var f=this[a];return c.callbacks.forEach(function(b){"function"==typeof b&&b.call(e,a,f)}),f};return d.callbacks=[c],d}function l(a,b){for(;b;){var c=i(b,a);if(c)return!0;b=b.prototype}return!1}function m(a,b){if(Array.isArray(b))for(var c=0;c<b.length;c++)m(a,b[c]);else{var d=function(){if(a.__attachedBehaviors=a.__attachedBehaviors||[],a.__attachedBehaviors.indexOf(b)!==-1)return{v:void 0};Array.isArray(b.behaviors)&&m(a,b.behaviors);for(var c=[],d=b;d&&d!==F;)Object.getOwnPropertyNames(d).forEach(function(a){c.indexOf(a)===-1&&J.indexOf(a)===-1&&c.push(a)}),d=Object.getPrototypeOf(d);c.forEach(function(c){G.indexOf(c)!==-1?I.pushCallback(a,c,b[c]):c in a||(a[c]=b[c])}),b.prototype&&!function(){for(var c=[],d=b.prototype||Object.getPrototypeOf(b);d&&d!==F.prototype;)Object.getOwnPropertyNames(d).forEach(function(a){c.indexOf(a)===-1&&c.push(a)}),d=d.prototype||Object.getPrototypeOf(d);c.forEach(function(c){G.indexOf(c)!==-1?I.pushCallback(a,c,b.prototype[c]):l(c,a.prototype)||(a.prototype[c]=b.prototype[c])})}(),a.__attachedBehaviors.push(b)}();if("object"==typeof d)return d.v}}function n(a,b){return a.replace(/\:host[^\{]*/g,function(a){return a.split(",").map(function(a){return a=a.trim(),a.match(/\:host\(/)&&(a=a.replace(/\:host[^\s]*/,function(a){return a.trim().replace(":host(",":host").replace(/\)$/,"")})),a.replace(/\:host/,"."+b)}).join(", ")})}function o(a,b){var c="";Array.isArray(b)||(b=[b]),b.forEach(function(b){"function"==typeof b&&(b=b()),c+=n(b,a)}),a="style-"+a;var d=document.getElementById(a)||document.createElement("style");if(d.type="text/css",d.setAttribute("id",a),d.innerHTML="",d.appendChild(document.createTextNode(c)),!d.parentNode){var e=document.head;e.firstElementChild?e.insertBefore(d,e.firstElementChild):e.appendChild(d)}return d}function p(a,b){var c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||function(a){return[].indexOf.call(document.querySelectorAll(a),this)!==-1};return c.call(a,b)}function q(a,b,c,d){a.addEventListener(b,function(b){for(var e=b.target;e&&e!==a;){if(p(e,c))return void d.call(a,b,e);e=e.parentNode}})}function r(a,b,c){var d=a.getAttribute(b);null!==c&&void 0!==c&&c!==!1?"string"!=typeof c&&"number"!=typeof c||d===c?"boolean"==typeof c&&""!==d&&a.setAttribute(b,""):a.setAttribute(b,c):(d||""===d)&&a.removeAttribute(b)}function s(a){return Q.get(a)||function(){var b=(a.observedAttributes||[]).map(function(a){return f(a)});return Q.set(a,b),b}()}function t(a,b){return"undefined"!=typeof b&&(S[a]=b),S[a]}function u(a,b){if("function"==typeof b&&(b=b.call(a)),"string"==typeof b){b=b.replace(/[\n\r\t]/g,"").replace(/\s+/g," ");var c=new DOMParser,d=c.parseFromString(b,"text/html");b=d.body&&d.body.childNodes}if(b instanceof Node)if("TEMPLATE"===b.tagName){if("function"!=typeof document.importNode||"undefined"==typeof HTMLTemplateElement)throw new Error("Template element is not supported by the browser");var e=document.createDocumentFragment(),f=document.importNode(b.content,!0);e.appendChild(f),b=e.childNodes}else b=[b];return b instanceof NodeList&&(b=Array.prototype.slice.call(b,0)),b}function v(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],c=arguments.length<=2||void 0===arguments[2]||arguments[2],d={};return Array.prototype.forEach.call(a.attributes||[],function(a){c&&"is"!==a.name?d[a.name]=new X(a.value,b.namespace):d[a.name]=a.value}),d}function w(a){var c=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if("undefined"==typeof a||a.nodeType===Node.COMMENT_NODE)return!1;if(a.nodeType===Node.TEXT_NODE)return new b.virtualDom.VText(a.textContent);var d={};for(var e in c)c.hasOwnProperty(e)&&(d[e]=c[e]);a.tagName&&"svg"===a.tagName.toLowerCase()&&(d.namespace="http://www.w3.org/2000/svg");var f=a.constructor,g=d.hooks&&"function"==typeof f,h=v(a,d,g);g?h["life-cycle-hook"]=new W:h={attributes:h};var i=Array.prototype.filter.call(a.childNodes||[],function(a){return a&&a instanceof Node&&a.nodeType!==Node.COMMENT_NODE});return new b.virtualDom.VNode(a.tagName,h,i.map(function(a){return w(a,d)}),(void 0),d.namespace)}function x(){var a=d.apply(void 0,arguments),b=a.scope,c=a.config,e=a.tagName;c.prototype=Object.create(c.prototype,{is:{configurable:!1,get:function(){return e}}});var f=document.registerElement(e,c);return Object.defineProperty(f.prototype,"constructor",{configurable:!1,get:function(){return b}}),f}function y(a,b){var c=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],d=(b.observedProperties||[]).map(f),e=(b.observedAttributes||[]).map(f);return function(b){function f(){return A(this,f),C(this,Object.getPrototypeOf(f).apply(this,arguments))}return D(f,b),B(f,[{key:"render",value:function(){var b=this,d={};e.forEach(function(a){d[a]=b.props[a]}),c.extends&&(d.is=a);var f=React.createElement(c.extends||a,d);return f}},{key:"componentDidMount",value:function(){var a=this,b=ReactDOM.findDOMNode(this);d.forEach(function(c){b[c]=a.props[c]})}}],[{key:"getDefaultProps",get:function(){var a={};return d.concat(e).forEach(function(b){a[b]=void 0}),a}}]),f}(React.Component)}function z(){ba.apply(void 0,arguments);var a=d.apply(void 0,arguments),b=a.scope,c=a.config,e=a.tagName;return y(e,b,c)}var A=function(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")},B=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),C=function(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b},D=function(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)},E=function a(b,c,d){null===b&&(b=Function.prototype);var e=Object.getOwnPropertyDescriptor(b,c);if(void 0===e){var f=Object.getPrototypeOf(b);return null===f?void 0:a(f,c,d)}if("value"in e)return e.value;var g=e.get;if(void 0!==g)return g.call(d)};g("HTMLElement");var F=function(a){function b(){return A(this,b),C(this,Object.getPrototypeOf(b).apply(this,arguments))}return D(b,a),B(b,[{key:"createdCallback",value:function(){}},{key:"attachedCallback",value:function(){}},{key:"detachedCallback",value:function(){}},{key:"attributeChangedCallback",value:function(){}}]),b}(HTMLElement),G=["createdCallback","attachedCallback","detachedCallback","attributeChangedCallback"],H=new WeakMap,I=function(){function a(){A(this,a)}return B(a,null,[{key:"get",value:function(a){return H.get(a)||{}}},{key:"set",value:function(a,b){return H.set(a,b)}},{key:"getCallbacks",value:function(a,b){var c=this.get(a);return c[b]||[]}},{key:"setCallbacks",value:function(a,b,c){var d=this.get(a);d[b]=c,this.set(a,d)}},{key:"pushCallback",value:function(a,b,c){var d=this.getCallbacks(a,b);d.push(c),this.setCallbacks(a,b,d)}}]),a}(),J=["name","length","prototype","__proto__","arguments","caller","constructor"],K=function(){function a(){A(this,a)}return B(a,null,[{key:"get",value:function(b,c){var d=a.map.get(b)||{};return d[c]}},{key:"set",value:function(b,c,d){var e=arguments.length<=3||void 0===arguments[3]||arguments[3],f=a.map.get(b)||{},g=f[c];return g!==d&&(f[c]=d,a.map.set(b,f),e&&this.changed(b,c,g,d)),b[c]}},{key:"delete",value:function(b,c){var d=arguments.length<=2||void 0===arguments[2]||arguments[2],e=a.map.get(b)||{};if(e.hasOwnProperty(c)){var f=e[c];delete e[c],a.map.set(b,e),d&&this.changed(b,c,f,void 0)}}},{key:"observe",value:function(b,c,d){"function"==typeof c&&(d=c,c=a.GENERIC_OBSERVER);var e=a.callbacks.get(b)||{};e[c]=e[c]||[],e[c].push(d),a.callbacks.set(b,e);var f=e[c].length-1;return{cancel:function(){e[c]=e[c]||[],e[c][f]=null,a.callbacks.set(b,e)}}}},{key:"changed",value:function(b,c,d,e){var f=a.callbacks.get(b)||{},g=(f[c]||[]).some(function(a){return"function"==typeof a&&a.call(b,c,d,e)===!1});g||(f[a.GENERIC_OBSERVER]||[]).some(function(a){return"function"==typeof a&&a.call(b,c,d,e)===!1})}},{key:"GENERIC_OBSERVER",get:function(){return"-1"}}]),a}();K.map=new WeakMap,K.callbacks=new WeakMap;var L=new WeakMap,M=function(a){function b(){return A(this,b),C(this,Object.getPrototypeOf(b).apply(this,arguments))}return D(b,a),B(b,[{key:"createdCallback",value:function(){E(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this);var a=this.constructor;L.get(a)||(m(a,a.behaviors||[]),delete a.__attachedBehaviors,L.set(a,!0)),h(this,"createdCallback")}},{key:"attachedCallback",value:function(){E(Object.getPrototypeOf(b.prototype),"attachedCallback",this).call(this),h(this,"attachedCallback")}},{key:"detachedCallback",value:function(){E(Object.getPrototypeOf(b.prototype),"detachedCallback",this).call(this),h(this,"detachedCallback")}},{key:"attributeChangedCallback",value:function(a,c,d){E(Object.getPrototypeOf(b.prototype),"attributeChangedCallback",this).call(this,a,c,d),h(this,"attributeChangedCallback",[a,c,d])}}]),b}(F),N=function(a){function b(){return A(this,b),C(this,Object.getPrototypeOf(b).apply(this,arguments))}return D(b,a),B(b,[{key:"createdCallback",value:function(){if(E(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this),this.is){var a=this.constructor.css;a&&o(this.is,a),this.classList.add(this.is)}}}],[{key:"addCss",value:function(){return o.apply(void 0,arguments)}}]),b}(F),O=function(a){function b(){return A(this,b),C(this,Object.getPrototypeOf(b).apply(this,arguments))}return D(b,a),B(b,[{key:"createdCallback",value:function(){var a=this,c=this.constructor.events;if(c)for(var d in c)c.hasOwnProperty(d)&&!function(){var b="string"==typeof c[d]?a[c[d]]:c[d];if(b&&"function"==typeof b){var e=d.split(" "),f=e.shift(),g=e.join(" ");g?q(a,f,g,function(c,d){b.call(a,c,d)}):a.addEventListener(f,function(c){b.call(a,c,a)})}}();E(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this)}},{key:"trigger",value:function(a,b){var c=arguments.length<=2||void 0===arguments[2]||arguments[2],d=arguments.length<=3||void 0===arguments[3]||arguments[3];if(!a)throw new Error("Event name is undefined");var e=document.createEvent("Event");return"undefined"!=typeof e.initEvent&&e.initEvent(a,c,d),b&&(e.detail=b),this.dispatchEvent(e)}}]),b}(F),P=function(a){function b(){return A(this,b),C(this,Object.getPrototypeOf(b).apply(this,arguments))}return D(b,a),B(b,[{key:"createdCallback",value:function(){var a=this;E(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this);var c=this.constructor,d=c.observedProperties||[];d.forEach(function(b){var d=i(c.prototype,b)||{};Object.defineProperty(a,b,{configurable:!0,get:j(b,d),set:k(b,d,function(b,c){K.set(a,b,c)})})});for(var e=Array.prototype.slice.call(this.attributes||[],0),g=0,h=e.length;g<h;g++){var l=e[g],m=f(l.name);if(d.indexOf(m)!==-1){var n=l.value;if(this.removeAttribute(l.name),""===n)this[m]=!0;else try{this[m]=JSON.parse(n)}catch(a){this[m]=n}}}}},{key:"observeProperty",value:function(a,b){return K.observe(this,a,b)}},{key:"observeProperties",value:function(a){return K.observe(this,a)}}]),b}(F),Q=new WeakMap,R=function(a){function b(){return A(this,b),C(this,Object.getPrototypeOf(b).apply(this,arguments))}return D(b,a),B(b,[{key:"createdCallback",value:function(){var a=this;E(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this);var c=this.constructor,d=s(c);d.forEach(function(b){var d=i(c.prototype,b)||{};Object.defineProperty(a,b,{configurable:!0,get:j(b,d),set:k(b,d,function(a,b){var c=e(a);r(this,c,b)})})});for(var f=this.attributes||[],g=0,h=f.length;g<h;g++){var l=f[g];this.attributeChangedCallback(l.name,void 0,l.value)}d.forEach(function(b){r(a,e(b),a[b])})}},{key:"attributeChangedCallback",value:function(a,c,d){E(Object.getPrototypeOf(b.prototype),"attributeChangedCallback",this).call(this,a,c,d);var e=s(this.constructor);if(e&&Array.isArray(e)){var g=f(a);e.indexOf(g)!==-1&&(""===d&&(d=!0),d!==this[g]&&(this[g]=d))}}}]),b}(F),S={},T=!0,U=function(a){function b(){return A(this,b),C(this,Object.getPrototypeOf(b).apply(this,arguments))}return D(b,a),B(b,[{key:"createdCallback",value:function(){var a=this.constructor;a.hasOwnProperty("template")&&t(this.is,a.template),a&&a.autoUpdateView&&K.observe(this,function(){this.templateReady&&this.render()}),E(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this),this.templateReady=!0,this.render()}},{key:"render",value:function(a){if(a=a||t(this.is),a=u(this,a),null!==a&&void 0!==a){if(Array.isArray(a)){var b=K.get(this,"__lastNode");if(b){b instanceof Node&&(b=[b]);for(var c=0;c<b.length;c++){var d=b[c];d.parentNode===this&&this.removeChild(d)}}a instanceof Node&&(a=[a]);for(var e=0;e<a.length;e++)this.appendChild(a[e]);K.set(this,"__lastNode",a,!1)}return Promise.resolve()}return Promise.reject()}}],[{key:"autoUpdateView",get:function(){return T}}]),b}(F),V=function(a){function b(){return A(this,b),C(this,Object.getPrototypeOf(b).apply(this,arguments))}return D(b,a),B(b,null,[{key:"behaviors",get:function(){return[P,N,O,R,U]}}]),b}(M),W=function(){function a(){A(this,a)}return B(a,[{key:"hook",value:function(b){var c=K.get(b,a.CREATED_PROP);c||K.set(b,a.CREATED_PROP,!0,!1),this.isAttached(b)}},{key:"isAttached",value:function(b){var c=K.get(b,a.ATTACHED_PROP);this.parentNode&&!c?(K.set(b,a.ATTACHED_PROP,!0,!1),this.trigger("attachedCallback")):!this.parentNode&&c&&(K.set(b,a.ATTACHED_PROP,!1,!1),this.trigger("detachedCallback"))}},{key:"trigger",value:function(a){if("function"==typeof this[a]){for(var b=arguments.length,c=Array(b>1?b-1:0),d=1;d<b;d++)c[d-1]=arguments[d];this[a].apply(this,c)}}}],[{key:"CREATED_PROP",get:function(){return"__virtualDomCreated"}},{key:"ATTACHED_PROP",get:function(){return"__virtualDomAttached"}}]),a}(),X=function(){function a(b,c){A(this,a),this.value=b,this.namespace=c}return B(a,[{key:"hook",value:function(a,b,c){var d=this.value,e=c&&c.value;e!==d&&(void 0!==d&&null!==d?this.namespace?(a.removeAttribute(b),a.setAttributeNS(this.namespace,b,d)):a.setAttribute(b,d):c&&(this.namespace?a.removeAttributeNS(this.namespace,b):a.removeAttribute(b)),"function"==typeof a.attributeChangedCallback&&a.attributeChangedCallback(b,e,d))}}]),a}(),Y=function(a){function c(){return A(this,c),C(this,Object.getPrototypeOf(c).apply(this,arguments))}return D(c,a),B(c,[{key:"render",value:function(a){var c=this;if(a=a||t(this.is),a=u(this,a),null!==a&&void 0!==a){var d=new b.virtualDom.VNode(this.tagName),e=K.get(this,"__vtree")||d;if(Array.isArray(a)&&!function(){var e=c.constructor.useVirtualDomHooks;a=a.map(function(a){return w(a,{hooks:e})}),d=new b.virtualDom.VNode(c.tagName,{},a)}(),d instanceof b.virtualDom.VNode){var f=b.virtualDom.diff(e||w(),d);b.virtualDom.patch(this,f),K.set(this,"__vtree",d,!1)}return Promise.resolve()}return Promise.reject()}}],[{key:"useVirtualDomHooks",get:function(){return!0}}]),c}(U),Z=function(a){function b(){return A(this,b),C(this,Object.getPrototypeOf(b).apply(this,arguments))}return D(b,a),B(b,null,[{key:"behaviors",get:function(){return[P,N,O,R,Y]}}]),b}(V),$='2.0.0-beta1'||"dev",_=function(a){function b(){return A(this,b),C(this,Object.getPrototypeOf(b).apply(this,arguments))}return D(b,a),B(b,null,[{key:"useVirtualDomHooks",get:function(){return!1}}]),b}(Z),aa=_,ba=x;a.register=z,a.DNAVDomBaseComponent=Z,a.DNAVDomElementsBaseComponent=_,a.BaseComponent=aa,a.Version=$,a.DNAProperty=K,a.DNAComponent=F,a.DNAPropertiesComponent=P,a.DNAAttributesComponent=R,a.DNAEventsComponent=O,a.DNAMixedComponent=M,a.DNAStyleComponent=N,a.DNATemplateComponent=U,a.DNABaseComponent=V,a.DNAVDomComponent=Y,Object.defineProperty(a,"__esModule",{value:!0})});