!function(a){function b(a,b,e){return 4===arguments.length?c.apply(this,arguments):void d(a,{declarative:!0,deps:b,declare:e})}function c(a,b,c,e){d(a,{declarative:!1,deps:b,executingRequire:c,execute:e})}function d(a,b){b.name=a,a in n||(n[a]=b),b.normalizedDeps=b.deps}function e(a,b){if(b[a.groupIndex]=b[a.groupIndex]||[],-1==o.call(b[a.groupIndex],a)){b[a.groupIndex].push(a);for(var c=0,d=a.normalizedDeps.length;d>c;c++){var f=a.normalizedDeps[c],g=n[f];if(g&&!g.evaluated){var h=a.groupIndex+(g.declarative!=a.declarative);if(void 0===g.groupIndex||g.groupIndex<h){if(void 0!==g.groupIndex&&(b[g.groupIndex].splice(o.call(b[g.groupIndex],g),1),0==b[g.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");g.groupIndex=h}e(g,b)}}}}function f(a){var b=n[a];b.groupIndex=0;var c=[];e(b,c);for(var d=!!b.declarative==c.length%2,f=c.length-1;f>=0;f--){for(var g=c[f],i=0;i<g.length;i++){var k=g[i];d?h(k):j(k)}d=!d}}function g(a){return s[a]||(s[a]={name:a,dependencies:[],exports:{},importers:[]})}function h(b){if(!b.module){var c=b.module=g(b.name),d=b.module.exports,e=b.declare.call(a,function(a,b){if(c.locked=!0,"object"==typeof a)for(var e in a)d[e]=a[e];else d[a]=b;for(var f=0,g=c.importers.length;g>f;f++){var h=c.importers[f];if(!h.locked)for(var i=0;i<h.dependencies.length;++i)h.dependencies[i]===c&&h.setters[i](d)}return c.locked=!1,b},b.name);c.setters=e.setters,c.execute=e.execute;for(var f=0,i=b.normalizedDeps.length;i>f;f++){var j,k=b.normalizedDeps[f],l=n[k],o=s[k];o?j=o.exports:l&&!l.declarative?j=l.esModule:l?(h(l),o=l.module,j=o.exports):j=m(k),o&&o.importers?(o.importers.push(c),c.dependencies.push(o)):c.dependencies.push(null),c.setters[f]&&c.setters[f](j)}}}function i(a){var b,c=n[a];if(c)c.declarative?l(a,[]):c.evaluated||j(c),b=c.module.exports;else if(b=m(a),!b)throw new Error("Unable to load dependency "+a+".");return(!c||c.declarative)&&b&&b.__useDefault?b["default"]:b}function j(b){if(!b.module){var c={},d=b.module={exports:c,id:b.name};if(!b.executingRequire)for(var e=0,f=b.normalizedDeps.length;f>e;e++){var g=b.normalizedDeps[e],h=n[g];h&&j(h)}b.evaluated=!0;var l=b.execute.call(a,function(a){for(var c=0,d=b.deps.length;d>c;c++)if(b.deps[c]==a)return i(b.normalizedDeps[c]);throw new TypeError("Module "+a+" not declared as a dependency.")},c,d);l&&(d.exports=l),c=d.exports,c&&c.__esModule?b.esModule=c:b.esModule=k(c)}}function k(b){if(b===a)return b;var c={};if("object"==typeof b||"function"==typeof b)if(p){var d;for(var e in b)(d=Object.getOwnPropertyDescriptor(b,e))&&r(c,e,d)}else{var f=b&&b.hasOwnProperty;for(var e in b)(!f||b.hasOwnProperty(e))&&(c[e]=b[e])}return c["default"]=b,r(c,"__useDefault",{value:!0}),c}function l(b,c){var d=n[b];if(d&&!d.evaluated&&d.declarative){c.push(b);for(var e=0,f=d.normalizedDeps.length;f>e;e++){var g=d.normalizedDeps[e];-1==o.call(c,g)&&(n[g]?l(g,c):m(g))}d.evaluated||(d.evaluated=!0,d.module.execute.call(a))}}function m(a){if(u[a])return u[a];if("@node/"==a.substr(0,6))return t(a.substr(6));var b=n[a];if(!b)throw"Module "+a+" not present.";return f(a),l(a,[]),n[a]=void 0,b.declarative&&r(b.module.exports,"__esModule",{value:!0}),u[a]=b.declarative?b.module.exports:b.esModule}var n={},o=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},p=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(q){p=!1}var r;!function(){try{Object.defineProperty({},"a",{})&&(r=Object.defineProperty)}catch(a){r=function(a,b,c){try{a[b]=c.value||c.get.call(a)}catch(d){}}}}();var s={},t="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,u={"@empty":{}};return function(a,d,e){return function(f){f(function(f){for(var g={_nodeRequire:t,register:b,registerDynamic:c,get:m,set:function(a,b){u[a]=b},newModule:function(a){return a}},h=0;h<d.length;h++)(function(a,b){b&&b.__esModule?u[a]=b:u[a]=k(b)})(d[h],arguments[h]);e(g);var i=m(a[0]);if(a.length>1)for(var h=1;h<a.length;h++)m(a[h]);return i.__useDefault?i["default"]:i})}}}("undefined"!=typeof self?self:global)(["1"],[],function(a){!function(){var b=a;if("undefined"!=typeof window&&"undefined"!=typeof document&&window.location)var c=location.protocol+"//"+location.hostname+(location.port?":"+location.port:"");b.set("@@cjs-helpers",b.newModule({getPathVars:function(a){var b,d=a.lastIndexOf("!");b=-1!=d?a.substr(0,d):a;var e=b.split("/");return e.pop(),e=e.join("/"),"file:///"==b.substr(0,8)?(b=b.substr(7),e=e.substr(7),isWindows&&(b=b.substr(1),e=e.substr(1))):c&&b.substr(0,c.length)===c&&(b=b.substr(c.length),e=e.substr(c.length)),{filename:b,dirname:e}}}))}(),a.register("2",["3","4","5","6","7"],function(a){"use strict";var b,c,d,e,f,g,h;return{setters:[function(a){b=a["default"]},function(a){c=a["default"]},function(a){d=a["default"]},function(a){e=a["default"]},function(a){f=a.DNAComponent}],execute:function(){g={},h=function(a){function h(){return b(this,h),d(this,Object.getPrototypeOf(h).apply(this,arguments))}return e(h,a),c(h,[{key:"createdCallback",value:function(){for(var a=arguments.length,b=Array(a),c=0;a>c;c++)b[c]=arguments[c];f.prototype.createdCallback.apply(this,b),h.__triggerCallbacks(this,"createdCallback",b)}},{key:"attachedCallback",value:function(){for(var a=arguments.length,b=Array(a),c=0;a>c;c++)b[c]=arguments[c];f.prototype.attachedCallback.apply(this,b),h.__triggerCallbacks(this,"attachedCallback",b)}},{key:"detachedCallback",value:function(){for(var a=arguments.length,b=Array(a),c=0;a>c;c++)b[c]=arguments[c];f.prototype.detachedCallback.apply(this,b),h.__triggerCallbacks(this,"detachedCallback",b)}},{key:"attributeChangedCallback",value:function(a,b,c){f.prototype.attributeChangedCallback.apply(this,[a,b,c]),h.__triggerCallbacks(this,"attributeChangedCallback",[a,b,c])}}],[{key:"onRegister",value:function(){var a=this;if(!g[this.tagName]){for(var b=arguments.length,c=Array(b),d=0;b>d;d++)c[d]=arguments[d];f.onRegister.apply(this,c);var e=this.behaviors||[];h.__iterateBehaviors(this,e),h.__triggerCallbacks(this,"onRegister",c),delete this.__attachedBehaviors,g[this.tagName]=!0}return a}},{key:"__triggerCallbacks",value:function(a,b,c){var d=a;"function"!=typeof d&&d.constructor&&(d=d.constructor);var e=h.__getCallbackKey(b),f=d[e]||d.__proto__&&d.__proto__[e];if(f&&Array.isArray(f))for(var g=0,i=f.length;i>g;g++)f[g].apply(a,c)}},{key:"__iterateBehaviors",value:function(a,b){if(Array.isArray(b))for(var c=0;c<b.length;c++)a.__iterateBehaviors(a,b[c]);else{if(a.__attachedBehaviors=a.__attachedBehaviors||[],-1!==a.__attachedBehaviors.indexOf(b))return;var d=h.__componentCallbacks,e=Object.getOwnPropertyNames(b);for(var g in e){var i=e[g];if(i in f||"__componentCallbacks"!==i&&(a[i]=b[i]),-1!==d.indexOf(i)){var j=h.__getCallbackKey(i);a[j]=a[j]||[],a[j].push(b[i])}else i in f||"__componentCallbacks"!==i&&(a[i]=b[i])}if(b.prototype){e=Object.getOwnPropertyNames(b.prototype);for(var g in e){var i=e[g];if(-1!==d.indexOf(i)){var j=h.__getCallbackKey(i);a[j]=a[j]||[],a[j].push(b.prototype[i])}else i in f.prototype||(a.prototype[i]=b.prototype[i])}}a.__attachedBehaviors.push(b)}}},{key:"__getCallbackKey",value:function(a){return"__"+a+"Callbacks"}},{key:"__componentCallbacks",get:function(){return["onRegister","createdCallback","attachedCallback","detachedCallback","attributeChangedCallback"]}}]),h}(f),a("DNAMixedComponent",h)}}}),a.registerDynamic("8",[],!0,function(a,b,c){"use strict";function d(a){this.listenerMap=[{},{}],a&&this.root(a),this.handle=d.prototype.handle.bind(this)}function e(a,b){return a.toLowerCase()===b.tagName.toLowerCase()}function f(a,b){return this.rootElement===window?b===document:this.rootElement===b}function g(a,b){return a===b.id}var h=this,i=h.define;h.define=void 0,c.exports=d,d.prototype.root=function(a){var b,c=this.listenerMap;if(this.rootElement){for(b in c[1])c[1].hasOwnProperty(b)&&this.rootElement.removeEventListener(b,this.handle,!0);for(b in c[0])c[0].hasOwnProperty(b)&&this.rootElement.removeEventListener(b,this.handle,!1)}if(!a||!a.addEventListener)return this.rootElement&&delete this.rootElement,this;this.rootElement=a;for(b in c[1])c[1].hasOwnProperty(b)&&this.rootElement.addEventListener(b,this.handle,!0);for(b in c[0])c[0].hasOwnProperty(b)&&this.rootElement.addEventListener(b,this.handle,!1);return this},d.prototype.captureForType=function(a){return-1!==["blur","error","focus","load","resize","scroll"].indexOf(a)},d.prototype.on=function(a,b,c,d){var h,i,k,l;if(!a)throw new TypeError("Invalid event type: "+a);if("function"==typeof b&&(d=c,c=b,b=null),void 0===d&&(d=this.captureForType(a)),"function"!=typeof c)throw new TypeError("Handler must be a type of Function");return h=this.rootElement,i=this.listenerMap[d?1:0],i[a]||(h&&h.addEventListener(a,this.handle,d),i[a]=[]),b?/^[a-z]+$/i.test(b)?(l=b,k=e):/^#[a-z0-9\-_]+$/i.test(b)?(l=b.slice(1),k=g):(l=b,k=j):(l=null,k=f.bind(this)),i[a].push({selector:b,handler:c,matcher:k,matcherParam:l}),this},d.prototype.off=function(a,b,c,d){var e,f,g,h,i;if("function"==typeof b&&(d=c,c=b,b=null),void 0===d)return this.off(a,b,c,!0),this.off(a,b,c,!1),this;if(g=this.listenerMap[d?1:0],!a){for(i in g)g.hasOwnProperty(i)&&this.off(i,b,c);return this}if(h=g[a],!h||!h.length)return this;for(e=h.length-1;e>=0;e--)f=h[e],b&&b!==f.selector||c&&c!==f.handler||h.splice(e,1);return h.length||(delete g[a],this.rootElement&&this.rootElement.removeEventListener(a,this.handle,d)),this},d.prototype.handle=function(a){var b,c,d,e,f,g,h,i=a.type,j=[],k="ftLabsDelegateIgnore";if(a[k]!==!0){switch(h=a.target,3===h.nodeType&&(h=h.parentNode),d=this.rootElement,e=a.eventPhase||(a.target!==a.currentTarget?3:2)){case 1:j=this.listenerMap[1][i];break;case 2:this.listenerMap[0]&&this.listenerMap[0][i]&&(j=j.concat(this.listenerMap[0][i])),this.listenerMap[1]&&this.listenerMap[1][i]&&(j=j.concat(this.listenerMap[1][i]));break;case 3:j=this.listenerMap[0][i]}for(c=j.length;h&&c;){for(b=0;c>b&&(f=j[b],f);b++)if(f.matcher.call(h,f.matcherParam,h)&&(g=this.fire(a,h,f)),g===!1)return a[k]=!0,void a.preventDefault();if(h===d)break;c=j.length,h=h.parentElement}}},d.prototype.fire=function(a,b,c){return c.handler.call(b,a,b)};var j=function(a){if(a){var b=a.prototype;return b.matches||b.matchesSelector||b.webkitMatchesSelector||b.mozMatchesSelector||b.msMatchesSelector||b.oMatchesSelector}}(Element);return d.prototype.destroy=function(){this.off(),this.root()},h.define=i,c.exports}),a.register("9",["8"],function(a){"use strict";var b;return{setters:[function(a){b=a["default"]}],execute:function(){a("default",b)}}}),a.register("a",["3","4","5","6","9","7"],function(a){"use strict";var b,c,d,e,f,g,h;return{setters:[function(a){b=a["default"]},function(a){c=a["default"]},function(a){d=a["default"]},function(a){e=a["default"]},function(a){f=a["default"]},function(a){g=a.DNAComponent}],execute:function(){h=function(a){function h(){return b(this,h),d(this,Object.getPrototypeOf(h).apply(this,arguments))}return e(h,a),c(h,[{key:"createdCallback",value:function(){var a=this.constructor.bindEvents;if(a){var b=new f(this);for(var c in a){var d=this[a[c]];if(d&&"function"==typeof d){var e=c.split(" ").shift(),h=c.split(" ").slice(1).join(" ");h?b.on(e,h,d.bind(this)):b.on(e,d.bind(this))}}}g.prototype.createdCallback.call(this)}},{key:"addEventListener",value:function(a,b){return"undefined"!=typeof Node.prototype.addEventListener?Node.prototype.addEventListener.call(this,a,b):"undefined"!=typeof Node.prototype.attachEvent?Node.prototype.attachEvent.call(this,"on"+a,b):void 0}},{key:"trigger",value:function(a,b){var c=arguments.length<=2||void 0===arguments[2]?!0:arguments[2],d=arguments.length<=3||void 0===arguments[3]?!0:arguments[3],e=h.createEvent();if(e){if("undefined"!=typeof e.initEvent&&e.initEvent(a,c,d),e.detail=b,"undefined"!=typeof Node.prototype.dispatchEvent)return Node.prototype.dispatchEvent.call(this,e);if("undefined"!=typeof Node.prototype.fireEvent)return Node.prototype.fireEvent.call(this,"on"+a,e)}}}],[{key:"createEvent",value:function(){var a=arguments.length<=0||void 0===arguments[0]?"Event":arguments[0];return"undefined"!=typeof document.createEvent?document.createEvent(a):"undefined"!=typeof document.createEventObject?document.createEventObject():void 0}}]),h}(g),a("DNAEventComponent",h)}}}),a.register("b",[],function(a){"use strict";var b;return{setters:[],execute:function(){b=window.virtualDom,a("default",b)}}}),a.register("c",["3","4","5","6","d","7","b"],function(a){"use strict";function b(a){var b={};return Array.prototype.forEach.call(a.attributes||[],function(a){b["class"===a.name?"className":a.name]=a.value}),b}function c(a){return a.nodeType===Node.TEXT_NODE?new j.VText(a.textContent):new j.VNode(a.tagName,b(a),Array.prototype.map.call(a.childNodes||[],c))}var d,e,f,g,h,i,j,k;return{setters:[function(a){d=a["default"]},function(a){e=a["default"]},function(a){f=a["default"]},function(a){g=a["default"]},function(a){h=a.DNAConfig},function(a){i=a.DNAComponent},function(a){j=a["default"]}],execute:function(){k=function(a){function b(){return d(this,b),f(this,Object.getPrototypeOf(b).apply(this,arguments))}return g(b,a),e(b,[{key:"createdCallback",value:function(){this.updateViewContent(),i.prototype.createdCallback.call(this)}},{key:"updateViewContent",value:function(){if("function"==typeof this.render){var a=this.render(),b=a;if(a instanceof NodeList){b="";for(var d=0,e=a.length;e>d;d++)b+=a[d].outerHTML}else a instanceof Node&&(b=a.outerHTML);if(b=b.replace(/[\n\r\t]/g,"").replace(/\s+/g," "),h.useVirtualDOM){var f=document.createElement("div");f.innerHTML=b;var g=c(f);if(this._vtree){var i=j.diff(this._vtree,g);j.patch(this,i)}else this.innerHTML=b;this._vtree=g}else this.innerHTML=b}}}],[{key:"onRegister",value:function(){var a=this,b=this;this.template&&("function"==typeof b.template?b.prototype.render=function(){return b.template.call(this)}:"string"==typeof b.template?!function(){var c=b.template;b.prototype.render=function(a){return function(){return c}}(a)}():b.template instanceof Node&&"TEMPLATE"==b.template.tagName&&(b.prototype.render=function(){return document.importNode(b.template.content,!0)}),h.autoUpdateView&&!function(){var b=a.prototype;Object.getOwnPropertyNames(b).forEach(function(c){"function"!=typeof b[c]&&!function(){var d=Object.getOwnPropertyDescriptor(b,c)||{};Object.defineProperty(a.prototype,c,{configurable:!0,get:function(){return d.get?d.get.call(this):this["__"+c]},set:function(a){var b=void 0;return b=d.set?d.set.call(this,a):this["__"+c]=a,this.updateViewContent(),b}})}()})}())}}]),b}(i),a("DNATemplateComponent",k)}}}),a.register("e",["3","4","5","6","7"],function(a){"use strict";var b,c,d,e,f,g;return{setters:[function(a){b=a["default"]},function(a){c=a["default"]},function(a){d=a["default"]},function(a){e=a["default"]},function(a){f=a.DNAComponent}],execute:function(){g=function(a){function f(){return b(this,f),d(this,Object.getPrototypeOf(f).apply(this,arguments))}return e(f,a),c(f,null,[{key:"onRegister",value:function(){this.css&&this.addCss(this.css)}},{key:"addCss",value:function(a){"function"==typeof a&&(a=a());var b="style-"+this.tagName,c=document.getElementById(b)||document.createElement("style");if(c.type="text/css",c.setAttribute("id",b),c.styleSheet?c.styleSheet.cssText=a:(c.innerHTML="",c.appendChild(document.createTextNode(a))),!c.parentNode){var d=document.head||document.getElementsByTagName("head")[0];d.firstElementChild?d.insertBefore(c,d.firstElementChild):d.appendChild(c)}return c}}]),f}(f),a("DNAStyleComponent",g)}}}),a.register("5",[],function(a){"use strict";return{setters:[],execute:function(){a("default",function(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b})}}}),a.register("6",[],function(a){"use strict";return{setters:[],execute:function(){a("default",function(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)})}}}),a.register("4",[],function(a){"use strict";return{setters:[],execute:function(){a("default",function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}())}}}),a.register("f",["3","4","d"],function(a){"use strict";var b,c,d,e;return{setters:[function(a){b=a["default"]},function(a){c=a["default"]},function(a){d=a.DNAConfig}],execute:function(){e=function(){function a(){b(this,a)}return c(a,null,[{key:"register",value:function(b){var c=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],e=void 0,f=void 0;"string"==typeof b&&(e=b,"function"==typeof c?(b=c,c={}):"undefined"!=typeof c.prototype&&(b=c.prototype)),"function"==typeof b?(e=e||c.tagName||b.hasOwnProperty("tagName")&&b.tagName||a.classToElement(b),Object.defineProperty(b,"tagName",{get:function(){return e}}),"function"==typeof b.onRegister&&b.onRegister.call(b),c.prototype=b.prototype,c["extends"]||"string"!=typeof b["extends"]||(c["extends"]=b["extends"])):c.prototype=b;try{return b.prototype.is=e,f=d.useWebComponents?document.registerElement(e,c):function(){var a=document.createElement(e);return Object.setPrototypeOf(a,b.prototype),setTimeout(function(){a.createdCallback()},0),a},f.prototype.is=e,"function"==typeof b&&(f.prototype.constructor=b),f}catch(g){return console.error(g),!1}}},{key:"classToElement",value:function(a){var b=a.name||a.toString().match(/^function\s*([^\s(]+)/)[1];if(b)return a.name.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()}).replace(/^\-/,"")}},{key:"elementToClass",value:function(a){return a.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,function(a,b){return 0===+a?"":a.toUpperCase()}).replace(/[\-|\_]/g,"")}}]),a}(),a("DNAHelper",e)}}}),a.register("7",["3","4","5","6","f"],function(a){"use strict";var b,c,d,e,f,g,h;return{setters:[function(a){b=a["default"]},function(a){c=a["default"]},function(a){d=a["default"]},function(a){e=a["default"]},function(a){f=a.DNAHelper}],execute:function(){"function"!=typeof HTMLElement&&(g=function(){},g.prototype=HTMLElement.prototype,HTMLElement=g),h=function(a){function g(){return b(this,g),d(this,Object.getPrototypeOf(g).apply(this,arguments))}return e(g,a),c(g,[{key:"createdCallback",value:function(){}},{key:"attachedCallback",value:function(){}},{key:"detachedCallback",value:function(){}},{key:"attributeChangedCallback",value:function(a,b,c){}}],[{key:"onRegister",value:function(){}},{key:"tagName",get:function(){return this._tagName||f.classToElement(this)},set:function(a){"string"==typeof a&&(this._tagName=a)}}]),g}(HTMLElement),a("DNAComponent",h)}}}),a.register("10",["3","4","5","6","7"],function(a){"use strict";function b(a,c){var d=void 0;return a&&(d=Object.getOwnPropertyDescriptor(a,c),!d&&a.__proto__&&(d=b(a.__proto__,c))),d}function c(a,b){if(b&&b.set&&b.set.wrapped)return b.set;var c=function(c){var d=void 0;return d=b.set?b.set.call(this,c):this["__"+a]=c,null!==d&&void 0!==d?("string"==typeof d||"number"==typeof d)&&this.setAttribute(a,d):this.removeAttribute(a),d};return c.wrapped=!0,c}function d(a,b){return b.get||function(){return this["__"+a]}}var e,f,g,h,i,j;return{setters:[function(a){e=a["default"]},function(a){f=a["default"]},function(a){g=a["default"]},function(a){h=a["default"]},function(a){i=a.DNAComponent}],execute:function(){j=function(a){function j(){return e(this,j),g(this,Object.getPrototypeOf(j).apply(this,arguments))}return h(j,a),f(j,[{key:"createdCallback",value:function(){var a=this;i.prototype.createdCallback.call(this);for(var b=this.attributes||[],c=0,d=b.length;d>c;c++){var e=b[c];this.attributeChangedCallback(e.name,void 0,e.value)}var f=this.constructor.attributes||[];f.forEach(function(b){null!==a[b]&&void 0!==a[b]&&a.setAttribute(b,a[b])})}},{key:"attributeChangedCallback",value:function(a,b,c){i.prototype.attributeChangedCallback.call(this);var d=this.constructor;d&&d.attributes&&Array.isArray(d.attributes)&&-1!==d.attributes.indexOf(a)&&(this[a]=c)}}],[{key:"onRegister",value:function(){var a=this,e=this.attributes||[];e.forEach(function(e){var f=b(a.prototype,e)||{};Object.defineProperty(a.prototype,e,{configurable:!0,get:d(e,f),set:c(e,f)})})}}]),j}(i),a("DNAAttributesComponent",j)}}}),a.register("11",["3","4","5","6","2","a","c","e","10"],function(a){"use strict";var b,c,d,e,f,g,h,i,j,k;return{setters:[function(a){b=a["default"]},function(a){c=a["default"]},function(a){d=a["default"]},function(a){e=a["default"]},function(a){f=a.DNAMixedComponent},function(a){g=a.DNAEventComponent},function(a){h=a.DNATemplateComponent},function(a){i=a.DNAStyleComponent},function(a){j=a.DNAAttributesComponent}],execute:function(){k=function(a){function k(){return b(this,k),d(this,Object.getPrototypeOf(k).apply(this,arguments))}return e(k,a),c(k,[{key:"createdCallback",value:function(){f.prototype.createdCallback.call(this),this.is&&this.classList.add(this.is)}}],[{key:"behaviors",get:function(){return[i,g,j,h]}}]),k}(f),a("DNABaseComponent",k)}}}),a.register("12",["f","11"],function(a){"use strict";function b(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if("string"!=typeof a)throw"Missing or bad typed `tagName` property";var c=b.prototype;if("undefined"==typeof c)throw"Missing prototype";if("function"!=typeof c){var g=function(){};g.prototype=c,c=g}var i=d(c,h);for(var j in c.prototype)-1!==["createdCallback","attachedCallback","detachedCallback","attributeChangedCallback"].indexOf(j)&&(i.prototype[j]=e(i.prototype[j],h.prototype[j]));Object.defineProperty(i,"tagName",{configurable:!0,get:function(){return a}}),b.tagName=a;var k=f(i,b);return k.Extend=function(){var a=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],b="function"==typeof a?a:function(a){var b=function(){};return b.prototype=a,b}(a);return d(b,c)},k}function c(a){function b(b){if(-1===d.indexOf(b)){var c={key:b};if("function"==typeof a[b])c.value=a[b];else{var e=Object.getOwnPropertyDescriptor(a,b)||{};e.get?(c.get=e.get,c.set=e.set):c.value=a[b]}return d.push(b),c}}var c=[],d=["name","length","prototype"];for(var e in a){var f=b(e);f&&c.push(f)}var g=Object.getOwnPropertyNames(a);for(var h in g){var f=b(g[h]);f&&c.push(f)}return c}function d(a,b){function d(){k(Object.getPrototypeOf(d.prototype),"constructor",a).apply(a,arguments)}j(d,b);for(var e in b.prototype){var f=Object.getOwnPropertyDescriptor(b.prototype,e)||{};f.get&&Object.defineProperty(d.prototype,e,{get:f.get,set:f.set,configurable:!0})}return i(d,c(a.prototype),c(a))}function e(a,b){return function(){a.apply(this,arguments),b.apply(this,arguments)}}function f(){return g.register.apply(g,arguments)}var g,h,i,j,k;return a("Create",b),a("Register",f),{setters:[function(a){g=a.DNAHelper},function(a){h=a.DNABaseComponent}],execute:function(){i=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),j=function(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)},k=function a(b,c,d){null===b&&(b=Function.prototype);var e=Object.getOwnPropertyDescriptor(b,c);if(void 0===e){var f=Object.getPrototypeOf(b);return null===f?void 0:a(f,c,d)}if("value"in e)return e.value;var g=e.get;if(void 0!==g)return g.call(d)}}}}),a.register("3",[],function(a){"use strict";return{setters:[],execute:function(){a("default",function(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")})}}}),a.register("d",["3"],function(a){"use strict";var b,c;return{setters:[function(a){b=a["default"]}],execute:function(){c=function d(){b(this,d)},c.useWebComponents="undefined"!=typeof window&&("undefined"!=typeof window.WebComponents||"undefined"!=typeof window.CustomElements),c.useVirtualDOM="undefined"!=typeof window&&"undefined"!=typeof window.virtualDom,c.autoUpdateView=!0,a("DNAConfig",c)}}}),a.register("1",["7","10","a","2","e","c","11","12","d"],function(a){"use strict";var b={undefined:!0},b={undefined:!0},b={undefined:!0},b={undefined:!0},b={undefined:!0},b={undefined:!0},b={undefined:!0},b={undefined:!0};return{setters:[function(c){var d=Object.create(null);Object.keys(c).forEach(function(a){"default"===a||b[a]||(d[a]=c[a])}),a(d)},function(c){var d=Object.create(null);Object.keys(c).forEach(function(a){"default"===a||b[a]||(d[a]=c[a])}),a(d)},function(c){var d=Object.create(null);Object.keys(c).forEach(function(a){"default"===a||b[a]||(d[a]=c[a])}),a(d)},function(c){var d=Object.create(null);Object.keys(c).forEach(function(a){"default"===a||b[a]||(d[a]=c[a])}),a(d)},function(c){var d=Object.create(null);Object.keys(c).forEach(function(a){"default"===a||b[a]||(d[a]=c[a])}),a(d)},function(c){var d=Object.create(null);Object.keys(c).forEach(function(a){"default"===a||b[a]||(d[a]=c[a])}),a(d)},function(c){var d=Object.create(null);Object.keys(c).forEach(function(a){"default"===a||b[a]||(d[a]=c[a])}),a(d)},function(c){var d=Object.create(null);Object.keys(c).forEach(function(a){"default"===a||b[a]||(d[a]=c[a])}),a(d)},function(b){a({Config:b.DNAConfig})}],execute:function(){}}})})(function(a){"function"==typeof define&&define.amd?define([],a):"object"==typeof module&&module.exports&&"function"==typeof require?module.exports=a():DNAComponents=a()});
//# sourceMappingURL=dna-components.js.map