/* eslint-disable vars-on-top, no-var, prefer-arrow-callback, prefer-rest-params */
/* global DNA:{} */

(function(scope) {
    if (typeof scope.DNA === 'undefined') {
        // eslint-disable-next-line
        throw new Error('dna-angular-plugin: cannot find DNA library.');
    }

    var DNA = scope.DNA;
    var Config = DNA.Config;

    function bindAttribute(element, $attrs, key) {
        $attrs.$observe(key, function(newValue, oldValue) {
            element.attributeChangedCallback(key, oldValue, newValue);
        });
    }

    function ngCreate() {
        // save original `useWebComponents` conf
        var _useWebComponents = Config.useWebComponents;
        // get the constructor
        var ctr = DNA.create.apply(DNA, arguments);
        var descriptor = ctr.prototype.constructor;
        var ngDescriptor = {
            restrict: 'E',
        };
        if (typeof descriptor.templateUrl === 'string') {
            ngDescriptor.templateUrl = descriptor.templateUrl;
        }
        ngDescriptor.controller = [
            '$scope', '$element', '$attrs',
            function($scope, $element, $attrs) {
                var element = $element[0];
                Object.setPrototypeOf(element, descriptor.prototype);
                element.is = ctr.prototype.is;
                element.$scope = $scope;
                element.$element = $element;
                element.$attrs = $attrs;
                element.createdCallback();
                element.attachedCallback();
                $scope.$on('$destroy', function() {
                    element.detachedCallback();
                });
                if (typeof descriptor.attributes !== 'undefined' &&
                    Array.isArray(descriptor.attributes)) {
                    descriptor.attributes.forEach(function(attrName) {
                        bindAttribute(element, $attrs, attrName);
                    });
                }
            },
        ];
        // restore original `useWebComponents` conf
        Config.useWebComponents = _useWebComponents;
        return function() {
            return ngDescriptor;
        };
    }
    DNA.ngCreate = ngCreate;
}(this));
