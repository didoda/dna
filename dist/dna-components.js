function _defaults(a,b){for(var c=Object.getOwnPropertyNames(b),d=0;d<c.length;d++){var e=c[d],f=Object.getOwnPropertyDescriptor(b,e);f&&f.configurable&&void 0===a[e]&&Object.defineProperty(a,e,f)}return a}function _possibleConstructorReturn(a,b){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!b||"object"!=typeof b&&"function"!=typeof b?a:b}function _inherits(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):_defaults(a,b))}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),DNAComponents=function(){function a(){_classCallCheck(this,a)}return _createClass(a,null,[{key:"register",value:function(a){var b=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],c=void 0,d=void 0;"function"==typeof a?("function"==typeof a.onRegister&&a.onRegister.call(a),c=b.tagName||a.hasOwnProperty("tagName")&&a.tagName||DNAComponent.classToElement(a),b.prototype=a.prototype,b["extends"]||(b["extends"]=a["extends"])):c=a;try{return d=document.registerElement(c,b),d.prototype.is=c,"function"==typeof a&&(d.prototype.constructor=a),a.template&&(d.prototype._template=a.template),d}catch(e){return console.error(e),!1}}},{key:"getTemplate",value:function(){return document.currentScript&&document.currentScript.parentNode?document.currentScript.parentNode.querySelector("template"):void 0}},{key:"instantiate",value:function(){var a=this.tagName||this.classToElement(this);return document.createElement(a)}},{key:"classToElement",value:function(a){return a.name.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()}).replace(/^\-/,"")}},{key:"elementToClass",value:function(a){return a.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,function(a,b){return 0===+a?"":a.toUpperCase()}).replace(/[\-|\_]/g,"")}}]),a}();if("function"!=typeof HTMLElement){var _HTMLElement=function(){};_HTMLElement.prototype=HTMLElement.prototype,HTMLElement=_HTMLElement}var DNAComponent=function(a){function b(){return _classCallCheck(this,b),_possibleConstructorReturn(this,Object.getPrototypeOf(b).apply(this,arguments))}return _inherits(b,a),_createClass(b,[{key:"createdCallback",value:function(){}},{key:"attachedCallback",value:function(){}},{key:"detachedCallback",value:function(){}},{key:"attributeChangedCallback",value:function(a,b,c){}}],[{key:"onRegister",value:function(){}},{key:"tagName",get:function(){return this._tagName||b.classToElement(this)},set:function(a){"string"==typeof a&&(this._tagName=a)}}]),b}(HTMLElement),DNAMixedComponent=function(a){function b(){return _classCallCheck(this,b),_possibleConstructorReturn(this,Object.getPrototypeOf(b).apply(this,arguments))}return _inherits(b,a),_createClass(b,[{key:"createdCallback",value:function(){for(var a=arguments.length,c=Array(a),d=0;a>d;d++)c[d]=arguments[d];DNAComponent.prototype.createdCallback.apply(this,c),b.__triggerCallbacks(this,"createdCallback",c)}},{key:"attachedCallback",value:function(){for(var a=arguments.length,c=Array(a),d=0;a>d;d++)c[d]=arguments[d];DNAComponent.prototype.attachedCallback.apply(this,c),b.__triggerCallbacks(this,"attachedCallback",c)}},{key:"detachedCallback",value:function(){for(var a=arguments.length,c=Array(a),d=0;a>d;d++)c[d]=arguments[d];DNAComponent.prototype.detachedCallback.apply(this,c),b.__triggerCallbacks(this,"detachedCallback",c)}},{key:"attributeChangedCallback",value:function(a,c,d){DNAComponent.prototype.attributeChangedCallback.apply(this,[a,c,d]),b.__triggerCallbacks(this,"attributeChangedCallback",[a,c,d])}}],[{key:"onRegister",value:function(){for(var a=arguments.length,c=Array(a),d=0;a>d;d++)c[d]=arguments[d];var e=DNAComponent.onRegister.apply(this,c),f=this.behaviors||[];return b.__iterateBehaviors(this,f),b.__triggerCallbacks(this,"onRegister",c),e}},{key:"__triggerCallbacks",value:function(a,c,d){var e=a[b.__getCallbackKey(c)];if(e&&Array.isArray(e))for(var f=0,g=e.length;g>f;f++){var h=e[f];h.apply(a,d)}}},{key:"__iterateBehaviors",value:function(a,c){if(Array.isArray(c))for(var d=0;d<c.length;d++)a.__iterateBehaviors(a,c[d]);else{if(a.__attachedBehaviors=a.__attachedBehaviors||[],-1!==a.__attachedBehaviors.indexOf(c.name))return;var e=b.__componentCallbacks,f=Object.getOwnPropertyNames(c);for(var g in f){var h=f[g];if(h in DNAComponent||"__componentCallbacks"!==h&&(a[h]=c[h]),-1!==e.indexOf(h)){var i=b.__getCallbackKey(h);a[i]=a[i]||[],a[i].push(c[h])}else h in DNAComponent||"__componentCallbacks"!==h&&(a[h]=c[h])}if(c.prototype){f=Object.getOwnPropertyNames(c.prototype);for(var g in f){var h=f[g];if(-1!==e.indexOf(h)){var i=b.__getCallbackKey(h);a.prototype[i]=a.prototype[i]||[],a.prototype[i].push(c.prototype[h])}else h in DNAComponent.prototype||(a.prototype[h]=c.prototype[h])}}a.__attachedBehaviors.push(c.name)}}},{key:"__getCallbackKey",value:function(a){return"__"+a+"Callbacks"}},{key:"__componentCallbacks",get:function(){return["init","createdCallback","attachedCallback","detachedCallback","attributeChangedCallback"]}}]),b}(DNAComponent),DNAEventComponent=function(a){function b(){return _classCallCheck(this,b),_possibleConstructorReturn(this,Object.getPrototypeOf(b).apply(this,arguments))}return _inherits(b,a),_createClass(b,[{key:"addEventListener",value:function(a,b){return"undefined"!=typeof Node.prototype.addEventListener?Node.prototype.addEventListener.call(this,a,b):"undefined"!=typeof Node.prototype.attachEvent?Node.prototype.attachEvent.call(this,"on"+a,b):void 0}},{key:"trigger",value:function(a,c){var d=arguments.length<=2||void 0===arguments[2]?!0:arguments[2],e=arguments.length<=3||void 0===arguments[3]?!0:arguments[3],f=b.createEvent();if(f){if("undefined"!=typeof f.initEvent&&f.initEvent(a,d,e),f.detail=c,"undefined"!=typeof Node.prototype.dispatchEvent)return Node.prototype.dispatchEvent.call(this,f);if("undefined"!=typeof Node.prototype.fireEvent)return Node.prototype.fireEvent.call(this,"on"+a,f)}}}],[{key:"createEvent",value:function(){var a=arguments.length<=0||void 0===arguments[0]?"Event":arguments[0];return"undefined"!=typeof document.createEvent?document.createEvent(a):"undefined"!=typeof document.createEventObject?document.createEventObject():void 0}}]),b}(DNAComponent),DNAAttributesComponent=function(a){function b(){return _classCallCheck(this,b),_possibleConstructorReturn(this,Object.getPrototypeOf(b).apply(this,arguments))}return _inherits(b,a),_createClass(b,[{key:"createdCallback",value:function(){DNAComponent.prototype.createdCallback.call(this);for(var a=this.attributes||[],b=0,c=a.length;c>b;b++){var d=a[b];this.attributeChangedCallback(d.name,void 0,d.value)}}},{key:"attributeChangedCallback",value:function(a,b,c){DNAComponent.prototype.attributeChangedCallback.call(this);var d=this.constructor;d&&d.attributes&&Array.isArray(d.attributes)&&-1!==d.attributes.indexOf(a)&&(this[a]=c)}}]),b}(DNAComponent),DNABaseComponent=function(a){function b(){return _classCallCheck(this,b),_possibleConstructorReturn(this,Object.getPrototypeOf(b).apply(this,arguments))}return _inherits(b,a),_createClass(b,[{key:"createdCallback",value:function(){DNAMixedComponent.prototype.createdCallback.call(this),this.is&&this.classList.add(this.is),this._template&&(this.innerHTML=this._template.innerHTML||"")}}],[{key:"behaviors",get:function(){return[DNAEventComponent,DNAAttributesComponent]}}]),b}(DNAMixedComponent);