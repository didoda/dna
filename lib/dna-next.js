!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?b(exports):"function"==typeof define&&define.amd?define(["exports"],b):b(a.DNA=a.DNA||{})}(this,function(a){"use strict";function b(a){var b=void 0;return a.name&&(b=a.name.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()}).replace(/^\-/,"")),b}function c(a,b){var d=void 0;if(a){d=Object.getOwnPropertyDescriptor(a,b);var e=Object.getPrototypeOf(a);!d&&e&&(d=c(e,b))}return d}function d(a,b,c){var d="function"==typeof b.get,e="__"+a,f=function(){var a=void 0;return a=d?b.get.call(this):"undefined"!=typeof this[e]?this[e]:c};return d||(f.bind=e),f}function e(a,b,c){if(b&&b.set&&b.set.callbacks)return b.set.callbacks.push(c),b.set;var d=function e(c){var d=this;b.set?b.set.call(this,c):this["__"+a]=c;var f=this[a];return e.callbacks.forEach(function(b){"function"==typeof b&&b.call(d,a,f)}),f};return d.callbacks=[c],d}function f(a){return a.replace(/\W+/g,"-").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase()}function g(a){return a.replace(/\W+(.)/g,function(a,b){return b.toUpperCase()})}function h(a){var c=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],d=void 0,e={},f=void 0;return"string"==typeof a?(f=a,"function"==typeof c?(d=c,e={}):("object"==typeof c&&(e=c),"undefined"!=typeof e.prototype&&(d=e.prototype))):(d=a,"object"==typeof c&&(e=c)),"function"==typeof d?(f=f||e.tagName||d.hasOwnProperty("tagName")&&d.tagName||b(d),e.prototype=d.prototype,e["extends"]||"string"!=typeof d["extends"]||(e["extends"]=d["extends"])):"object"==typeof d&&(e.prototype=d,d=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];e.prototype.constructor.apply(this,b)},d.prototype=e.prototype),e.prototype&&(e.prototype=Object.create(e.prototype)),{tagName:f,config:e,scope:d}}function i(a,b){var c=arguments.length<=2||void 0===arguments[2]||arguments[2],f=arguments[3],g=arguments.length<=4||void 0===arguments[4]?[]:arguments[4];Object.getOwnPropertyNames(b).forEach(function(h){var i=Object.getOwnPropertyDescriptor(b,h)||{},j="function"==typeof i.value;g.indexOf(h)===-1&&("undefined"!=typeof i.value&&j?j&&c&&(g.push(h),Object.defineProperty(a,h,i)):(g.push(h),i.configurable!==!1&&Object.defineProperty(a,h,{configurable:!0,get:d(h,i,i.value),set:e(h,i,f)})))});var h=b.prototype||Object.getPrototypeOf(b);h&&h!==HTMLElement.prototype&&i(a,h,c,f,g)}function j(a,b){if(a){var c=a.toLowerCase();return b&&(B[c]=b),B[c]}return null}function k(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],c=h(a,b),d=c.scope,e=c.tagName,f=c.config;"function"==typeof d.onRegister&&d.onRegister.call(d,e);var g=function(a){return a=a||document.createElement(f["extends"]?f["extends"]:e),i(a,d.prototype),Object.defineProperty(a,"is",{configurable:!1,get:function(){return e}}),a.createdCallback(),a};return Object.defineProperty(g.prototype,"constructor",{configurable:!1,get:function(){return d}}),j(e,d),g}function l(a,b,c){var d=a.getAttribute(b);null!==c&&void 0!==c&&c!==!1?"string"!=typeof c&&"number"!=typeof c||d===c?"boolean"==typeof c&&""!==d&&a.setAttribute(b,""):a.setAttribute(b,c):(d||""===d)&&a.removeAttribute(b)}function m(a,b){var c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||function(a){return[].indexOf.call(document.querySelectorAll(a),this)!==-1};return c.call(a,b)}function n(a,b,c,d){a.addEventListener(b,function(b){for(var e=b.target;e&&e!==a;){if(m(e,c))return void d.call(a,b,e);e=e.parentNode}})}function o(a){return"__"+a+"Callbacks"}function p(a,b,c){var d=a;if("function"!=typeof d&&(d=j(a.is)),!d)return!1;var e=o(b),f=d[e];if(f&&Array.isArray(f))for(var g=0,h=f.length;g<h;g++)f[g].apply(a,c);return!0}function q(a,b){for(;b;){var d=c(b,a);if(d)return!0;b=b.prototype}return!1}function r(a,b){if(Array.isArray(b))for(var c=0;c<b.length;c++)r(a,b[c]);else{var d=function(){if(a.__attachedBehaviors=a.__attachedBehaviors||[],a.__attachedBehaviors.indexOf(b)!==-1)return{v:void 0};Array.isArray(b.behaviors)&&r(a,b.behaviors);for(var c=[],d=b;d&&d!==z;)Object.getOwnPropertyNames(d).forEach(function(a){c.indexOf(a)===-1&&I.indexOf(a)===-1&&c.push(a)}),d=Object.getPrototypeOf(d);c.forEach(function(c){if(J.indexOf(c)!==-1){var d=o(c);a[d]=a[d]||[],a[d].push(b[c])}else c in a||(a[c]=b[c])}),b.prototype&&!function(){for(var c=[],d=b.prototype||Object.getPrototypeOf(b);d&&d!==z.prototype;)Object.getOwnPropertyNames(d).forEach(function(a){c.indexOf(a)===-1&&c.push(a)}),d=d.prototype||Object.getPrototypeOf(d);c.forEach(function(c){if(J.indexOf(c)!==-1){var d=o(c);a[d]=a[d]||[],a[d].push(b.prototype[c])}else q(c,a.prototype)||(a.prototype[c]=b.prototype[c])})}(),a.__attachedBehaviors.push(b)}();if("object"==typeof d)return d.v}}var s=!0,t=Object.freeze({autoUpdateView:s}),u=function(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")},v=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),w=function(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b},x=function(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)};if("function"!=typeof HTMLElement){var y=function(){};y.prototype=HTMLElement.prototype,HTMLElement=y}var z=function(a){function b(){return u(this,b),w(this,Object.getPrototypeOf(b).apply(this,arguments))}return x(b,a),v(b,[{key:"createdCallback",value:function(){}},{key:"attachedCallback",value:function(){}},{key:"detachedCallback",value:function(){}},{key:"attributeChangedCallback",value:function(){}}],[{key:"onRegister",value:function(){}}]),b}(HTMLElement),A=function R(a,b,c){null===a&&(a=Function.prototype);var d=Object.getOwnPropertyDescriptor(a,b);if(void 0===d){var e=Object.getPrototypeOf(a);return null===e?void 0:R(e,b,c)}if("value"in d)return d.value;var f=d.get;if(void 0!==f)return f.call(c)},B={},C={},D=function(a){function b(){return u(this,b),w(this,Object.getPrototypeOf(b).apply(this,arguments))}return x(b,a),v(b,[{key:"createdCallback",value:function(){A(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this);for(var a=Array.prototype.slice.call(this.attributes||[],0),c=C[this.is]||[],d=0,e=a.length;d<e;d++){var f=a[d],h=g(f.name);if(c.indexOf(h)!==-1){var i=f.value;if(this.removeAttribute(f.name),""===i)this[h]=!0;else try{this[h]=JSON.parse(i)}catch(j){this[h]=i}}}}}],[{key:"onRegister",value:function(a){var b=this,f=this.properties||[];C[a]=f,f.forEach(function(a){var f=c(b.prototype,a)||{};Object.defineProperty(b.prototype,a,{configurable:!0,get:d(a,f),set:e(a,f)})})}}]),b}(z),E={},F=function(a){function b(){return u(this,b),w(this,Object.getPrototypeOf(b).apply(this,arguments))}return x(b,a),v(b,[{key:"createdCallback",value:function(){var a=this;A(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this);for(var c=this.attributes||[],d=0,e=c.length;d<e;d++){var g=c[d];this.attributeChangedCallback(g.name,void 0,g.value)}var h=E[this.is]||[];h.forEach(function(b){l(a,f(b),a[b])})}},{key:"attributeChangedCallback",value:function(a,c,d){A(Object.getPrototypeOf(b.prototype),"attributeChangedCallback",this).call(this,a,c,d);var e=E[this.is];if(e&&Array.isArray(e)){var f=g(a);e.indexOf(f)!==-1&&(""===d&&(d=!0),d!==this[f]&&(this[f]=d))}}}],[{key:"onRegister",value:function(a){var b=this,h=this.attributes||[];E[a]=h.map(function(a){var h=g(a),i=c(b.prototype,h)||{};return Object.defineProperty(b.prototype,h,{configurable:!0,get:d(h,i),set:e(h,i,function(a,b){var c=f(a);l(this,c,b)})}),h})}}]),b}(z),G={},H=function(a){function b(){return u(this,b),w(this,Object.getPrototypeOf(b).apply(this,arguments))}return x(b,a),v(b,[{key:"createdCallback",value:function(){var a=this,c=G[this.is];if(c)for(var d in c)c.hasOwnProperty(d)&&!function(){var b="string"==typeof c[d]?a[c[d]]:c[d];if(b&&"function"==typeof b){var e=d.split(" "),f=e.shift(),g=e.join(" ");g?n(a,f,g,function(c,d){b.call(a,c,d)}):a.addEventListener(f,function(c){b.call(a,c,a)})}}();A(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this)}},{key:"trigger",value:function(a,b){var c=arguments.length<=2||void 0===arguments[2]||arguments[2],d=arguments.length<=3||void 0===arguments[3]||arguments[3];if(!a)throw new Error("Event name is undefined");var e=document.createEvent("Event");return"undefined"!=typeof e.initEvent&&e.initEvent(a,c,d),b&&(e.detail=b),this.dispatchEvent(e)}}],[{key:"onRegister",value:function(a){G[a]=this.events}}]),b}(z),I=["name","length","prototype","__proto__","arguments","caller","constructor"],J=["onRegister","createdCallback","attachedCallback","detachedCallback","attributeChangedCallback"],K=function(a){function b(){return u(this,b),w(this,Object.getPrototypeOf(b).apply(this,arguments))}return x(b,a),v(b,[{key:"createdCallback",value:function(){A(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this),p(this,"createdCallback")}},{key:"attachedCallback",value:function(){A(Object.getPrototypeOf(b.prototype),"attachedCallback",this).call(this),p(this,"attachedCallback")}},{key:"detachedCallback",value:function(){A(Object.getPrototypeOf(b.prototype),"detachedCallback",this).call(this),p(this,"detachedCallback")}},{key:"attributeChangedCallback",value:function(a,c,d){A(Object.getPrototypeOf(b.prototype),"attributeChangedCallback",this).call(this,a,c,d),p(this,"attributeChangedCallback",[a,c,d])}}],[{key:"onRegister",value:function(){for(var a=this,b=this,c=arguments.length,d=Array(c),e=0;e<c;e++)d[e]=arguments[e];z.onRegister.apply(this,d),J.forEach(function(b){var c=o(b);a[c]=[]});var f=this.behaviors||[];return r(this,f),p(this,"onRegister",d),delete this.__attachedBehaviors,b}}]),b}(z),L=function(a){function b(){return u(this,b),w(this,Object.getPrototypeOf(b).apply(this,arguments))}return x(b,a),v(b,[{key:"createdCallback",value:function(){A(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this);var a=this.is||this.getAttribute("is")||this.tagName.toLowerCase();a&&this.classList.add(a)}}],[{key:"onRegister",value:function(a){this.css&&this.addCss(a,this.css)}},{key:"addCss",value:function(a,b){var c=b;"function"==typeof b&&(c=b()),a="style-"+a;var d=document.getElementById(a)||document.createElement("style");if(d.type="text/css",d.setAttribute("id",a),d.innerHTML="",d.appendChild(document.createTextNode(c)),!d.parentNode){var e=document.head;e.firstElementChild?e.insertBefore(d,e.firstElementChild):e.appendChild(d)}return d}}]),b}(z),M={},N=function(a){function b(){return u(this,b),w(this,Object.getPrototypeOf(b).apply(this,arguments))}return x(b,a),v(b,[{key:"createdCallback",value:function(){var a=j(this.is);if(a&&a.autoUpdateView){var c=a.prototype;i(this,c,!1,function(){this.templateReady&&this.updateViewContent()})}A(Object.getPrototypeOf(b.prototype),"createdCallback",this).call(this),this.templateReady=!0,this.updateViewContent()}},{key:"getViewContent",value:function(){var a=null;if("function"==typeof this.render&&(a=this.render(),null!==a)){if(a instanceof Node||a instanceof DocumentFragment){var b=document.createElement("div");b.appendChild(a),a=b.innerHTML}a=a.replace(/[\n\r\t]/g,"").replace(/\s+/g," ")}return a}},{key:"updateViewContent",value:function(){var a=this.getViewContent();null!==a&&(this.innerHTML=a)}},{key:"render",value:function(){var a=M[this.is];if("function"==typeof a)return a.call(this);if("string"==typeof a)return a;if(a instanceof Node&&"TEMPLATE"===a.tagName){if("function"!=typeof document.importNode||"undefined"==typeof HTMLTemplateElement)throw new Error("Template element is not supported by the browser");return document.importNode(a.content,!0)}return null}}],[{key:"onRegister",value:function(a){this.hasOwnProperty("template")&&(M[a]=this.template)}},{key:"autoUpdateView",get:function(){return s}}]),b}(z),O=function(a){function b(){return u(this,b),w(this,Object.getPrototypeOf(b).apply(this,arguments))}return x(b,a),v(b,null,[{key:"behaviors",get:function(){return[L,H,D,F,N]}}]),b}(K),P=t,Q=(void 0).__DNA__VERSION__||"dev";a.Config=P,a.Version=Q,a.register=k,a.registry=j,a.REGISTRY=B,a.DNAComponent=z,a.DNAPropertiesComponent=D,a.DNAAttributesComponent=F,a.DNAEventsComponent=H,a.DNAMixedComponent=K,a.DNAStyleComponent=L,a.DNATemplateComponent=N,a.DNABaseComponent=O,Object.defineProperty(a,"__esModule",{value:!0})});