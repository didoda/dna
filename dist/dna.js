!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?b(exports):"function"==typeof define&&define.amd?define(["exports"],b):b(a.DNA=a.DNA||{})}(this,function(a){"use strict";function b(a){return a.replace(/\W+/g,"-").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase()}function c(a){return a.replace(/\W+(.)/g,function(a,b){return b.toUpperCase()})}function d(a,b){var c=void 0;if(a){c=Object.getOwnPropertyDescriptor(a,b);var e=Object.getPrototypeOf(a);!c&&e&&(c=d(e,b))}return c}function e(a,b,c){var d="function"==typeof b.get,e=function(){var e=void 0;return e=d?b.get.call(this):u.get(this,a),"undefined"!=typeof e?e:c};return e}function f(a,b,c){if(b&&b.set&&b.set.callbacks)return b.set.callbacks.push(c),b.set;var d=function c(d){var e=this;b.set?b.set.call(this,d):u.set(this,a,d);var f=this[a];return c.callbacks.forEach(function(b){"function"==typeof b&&b.call(e,a,f)}),f};return d.callbacks=[c],d}function g(a,b,c){var d=a.getAttribute(b);null!==c&&void 0!==c&&c!==!1?"string"!=typeof c&&"number"!=typeof c||d===c?"boolean"==typeof c&&""!==d&&a.setAttribute(b,""):a.setAttribute(b,c):(d||""===d)&&a.removeAttribute(b)}function h(a){return y.get(a)||function(){var b=(a.observedAttributes||[]).map(function(a){return c(a)});return y.set(a,b),b}()}function i(a,b){var c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||function(a){return[].indexOf.call(document.querySelectorAll(a),this)!==-1};return c.call(a,b)}function j(a,b,c,d){a.addEventListener(b,function(b){for(var e=b.target;e&&e!==a;){if(i(e,c))return void d.call(a,b,e);e=e.parentNode}})}function k(a,b){var c="";Array.isArray(b)||(b=[b]),b.forEach(function(a){"function"==typeof a&&(a=a()),c+=a}),a="style-"+a;var d=document.getElementById(a)||document.createElement("style");if(d.type="text/css",d.setAttribute("id",a),d.innerHTML="",d.appendChild(document.createTextNode(c)),!d.parentNode){var e=document.head;e.firstElementChild?e.insertBefore(d,e.firstElementChild):e.appendChild(d)}return d}function l(a,b){if("function"==typeof b&&(b=b.call(a)),"string"==typeof b){b=b.replace(/[\n\r\t]/g,"").replace(/\s+/g," ");var c=new DOMParser,d=c.parseFromString(b,"text/html");b=d.body&&d.body.childNodes}if(b instanceof Node)if("TEMPLATE"===b.tagName){if("function"!=typeof document.importNode||"undefined"==typeof HTMLTemplateElement)throw new Error("Template element is not supported by the browser");var e=document.createDocumentFragment(),f=document.importNode(b.content,!0);e.appendChild(f),b=e.childNodes}else b=[b];return b instanceof NodeList&&(b=Array.prototype.slice.call(b,0)),b}function m(a,b){var c=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],d=function(d){return d=d||document.createElement(c.extends?c.extends:a),d.__proto__=b.prototype,b.prototype.constructor.call(d),d};return d.prototype=b.prototype,Object.defineProperty(d.prototype,"constructor",{configurable:!1,get:function(){return b}}),d}var n=function(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")},o=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),p=function(a){return new q(a)},q=function(){function a(b){n(this,a),this.superclass=b}return o(a,[{key:"with",value:function(){return Array.from(arguments).reduce(function(a,b){return b(a)},this.superclass)}}]),a}(),r=function(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b},s=function(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)},t=function(a){function b(){return n(this,b),r(this,Object.getPrototypeOf(b).apply(this,arguments))}return s(b,a),o(b,[{key:"connectedCallback",value:function(){}},{key:"disconnectedCallback",value:function(){}},{key:"attributeChangedCallback",value:function(){}}]),b}(HTMLElement),u=function(){function a(){n(this,a)}return o(a,null,[{key:"get",value:function(b,c){var d=a.map.get(b)||{};return d[c]}},{key:"set",value:function(b,c,d){var e=arguments.length<=3||void 0===arguments[3]||arguments[3],f=a.map.get(b)||{},g=f[c];return g!==d&&(f[c]=d,a.map.set(b,f),e&&this.changed(b,c,g,d)),b[c]}},{key:"delete",value:function(b,c){var d=arguments.length<=2||void 0===arguments[2]||arguments[2],e=a.map.get(b)||{};if(e.hasOwnProperty(c)){var f=e[c];delete e[c],a.map.set(b,e),d&&this.changed(b,c,f,void 0)}}},{key:"observe",value:function(b,c,d){"function"==typeof c&&(d=c,c=a.GENERIC_OBSERVER);var e=a.callbacks.get(b)||{};e[c]=e[c]||[],e[c].push(d),a.callbacks.set(b,e);var f=e[c].length-1;return{cancel:function(){e[c]=e[c]||[],e[c][f]=null,a.callbacks.set(b,e)}}}},{key:"changed",value:function(b,c,d,e){var f=a.callbacks.get(b)||{},g=(f[c]||[]).some(function(a){return"function"==typeof a&&a.call(b,c,d,e)===!1});g||(f[a.GENERIC_OBSERVER]||[]).some(function(a){return"function"==typeof a&&a.call(b,c,d,e)===!1})}},{key:"GENERIC_OBSERVER",get:function(){return"-1"}}]),a}();u.map=new WeakMap,u.callbacks=new WeakMap;var v=function(a){return function(a){function b(){n(this,b);var a=r(this,Object.getPrototypeOf(b).call(this)),g=a.constructor,h=g.observedProperties||[];h.forEach(function(b){var c=d(g.prototype,b)||{};Object.defineProperty(a,b,{configurable:!0,get:e(b,c),set:f(b,c,function(b,c){u.set(a,b,c)})})});for(var i=Array.prototype.slice.call(a.attributes||[],0),j=0,k=i.length;j<k;j++){var l=i[j],m=c(l.name);if(h.indexOf(m)!==-1){var o=l.value;if(a.removeAttribute(l.name),""===o)a[m]=!0;else try{a[m]=JSON.parse(o)}catch(b){a[m]=o}}}return a}return s(b,a),o(b,[{key:"observeProperty",value:function(a,b){return u.observe(this,a,b)}},{key:"observeProperties",value:function(a){return u.observe(this,a)}}]),b}(a)},w=function(a){function b(){return n(this,b),r(this,Object.getPrototypeOf(b).apply(this,arguments))}return s(b,a),b}(p(t).with(v)),x=function a(b,c,d){null===b&&(b=Function.prototype);var e=Object.getOwnPropertyDescriptor(b,c);if(void 0===e){var f=Object.getPrototypeOf(b);return null===f?void 0:a(f,c,d)}if("value"in e)return e.value;var g=e.get;if(void 0!==g)return g.call(d)},y=new WeakMap,z=function(a){return function(a){function i(){n(this,i);var a=r(this,Object.getPrototypeOf(i).call(this)),c=a.constructor,j=h(c);j.forEach(function(h){var i=d(c.prototype,h)||{};Object.defineProperty(a,h,{configurable:!0,get:e(h,i),set:f(h,i,function(a,c){var d=b(a);g(this,d,c)})})});for(var k=a.attributes||[],l=0,m=k.length;l<m;l++){var o=k[l];a.attributeChangedCallback(o.name,void 0,o.value)}return j.forEach(function(c){g(a,b(c),a[c])}),a}return s(i,a),o(i,[{key:"attributeChangedCallback",value:function(a,b,d){x(Object.getPrototypeOf(i.prototype),"attributeChangedCallback",this).call(this,a,b,d);var e=h(this.constructor);if(e&&Array.isArray(e)){var f=c(a);e.indexOf(f)!==-1&&(""===d&&(d=!0),d!==this[f]&&(this[f]=d))}}}]),i}(a)},A=function(a){function b(){return n(this,b),r(this,Object.getPrototypeOf(b).apply(this,arguments))}return s(b,a),b}(p(t).with(z)),B=function(a){return function(a){function b(){n(this,b);var a=r(this,Object.getPrototypeOf(b).call(this)),c=a.constructor.events;if(c)for(var d in c)c.hasOwnProperty(d)&&!function(){var b="string"==typeof c[d]?a[c[d]]:c[d];if(b&&"function"==typeof b){var e=d.split(" "),f=e.shift(),g=e.join(" ");g?j(a,f,g,function(c,d){b.call(a,c,d)}):a.addEventListener(f,function(c){b.call(a,c,a)})}}();return a}return s(b,a),o(b,[{key:"trigger",value:function(a,b){var c=arguments.length<=2||void 0===arguments[2]||arguments[2],d=arguments.length<=3||void 0===arguments[3]||arguments[3];if(!a)throw new Error("Event name is undefined");var e=document.createEvent("Event");return"undefined"!=typeof e.initEvent&&e.initEvent(a,c,d),b&&(e.detail=b),this.dispatchEvent(e)}}]),b}(a)},C=function(a){function b(){return n(this,b),r(this,Object.getPrototypeOf(b).apply(this,arguments))}return s(b,a),b}(p(t).with(B)),D=function(a){return function(a){function b(){n(this,b);var a=r(this,Object.getPrototypeOf(b).call(this));if(a.is){var c=a.constructor.css;c&&k(a.is,c),a.classList.add(a.is)}return a}return s(b,a),b}(a)},E=function(a){function b(){return n(this,b),r(this,Object.getPrototypeOf(b).apply(this,arguments))}return s(b,a),b}(p(t).with(D)),F=function(a){return function(a){function b(){return n(this,b),r(this,Object.getPrototypeOf(b).apply(this,arguments))}return s(b,a),o(b,[{key:"connectedCallback",value:function(){var a=this,c=this.constructor;c&&c.hasOwnProperty("template")&&(u.observe(this,function(){a.templateReady&&a.render()}),this.templateReady=!0,this.render()),x(Object.getPrototypeOf(b.prototype),"connectedCallback",this).call(this)}},{key:"render",value:function(a){if(a=a||this.constructor.template,a=l(this,a),null!==a&&void 0!==a){if(Array.isArray(a)){var b=u.get(this,"__lastNode");if(b){b instanceof Node&&(b=[b]);for(var c=0;c<b.length;c++){var d=b[c];d.parentNode===this&&this.removeChild(d)}}a instanceof Node&&(a=[a]);for(var e=0;e<a.length;e++)this.appendChild(a[e]);u.set(this,"__lastNode",a,!1)}return Promise.resolve()}return Promise.reject()}}]),b}(a)},G=function(a){function b(){return n(this,b),r(this,Object.getPrototypeOf(b).apply(this,arguments))}return s(b,a),b}(p(t).with(F)),H=p(t).with(v,D,B,z,F),I=function(a){function b(){return n(this,b),r(this,Object.getPrototypeOf(b).apply(this,arguments))}return s(b,a),b}(H),J='2.0.0-beta2'||"dev";a.Version=J,a.mix=p,a.DNAProperty=u,a.register=m,a.DNAComponent=t,a.DNAPropertiesMixin=v,a.DNAPropertiesComponent=w,a.DNAAttributesMixin=z,a.DNAAttributesComponent=A,a.DNAEventsMixin=B,a.DNAEventsComponent=C,a.DNAStyleMixin=D,a.DNAStyleComponent=E,a.DNATemplateMixin=F,a.DNATemplateComponent=G,a.DNABaseComponent=I,Object.defineProperty(a,"__esModule",{value:!0})});