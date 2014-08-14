/**
 * Created by Victor77 on 16.02.14.
 */


angular.module('VACANCY.directive', [])
.directive("redactor", function() {
    return {
        require: '?ngModel',
        link: function($scope, elem, attrs, controller) {
            controller.$render = function() {
                elem.redactor({
                    keyupCallback: function() {
                        $scope.$apply(controller.$setViewValue(elem.getCode()));
                    },
                    execCommandCallback: function() {
                        $scope.$apply(controller.$setViewValue(elem.getCode()));
                    }
                });
                elem.setCode(controller.$viewValue);
            };
        }
    };
});
