/**
 * @license ng-gc-loader-directive v0.1.0
 * (c) 2013-2013 GoCardless, Ltd.
 * https://github.com/gocardless-ng/ng-gc-loader-directive.git
 * License: MIT
 */
(function(){
'use strict';

angular.module('loader-template.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('loader-template.html',
    '<div class="loading" ng-show="loading"><div class="loading__container"><p class="loading__text">{{ loadingStatus }}</p></div></div>');
}]);

'use strict';

angular.module('gc.loaderController', [])
.controller('LoaderController', [
  '$scope',
  function LoaderController($scope) {

    $scope.$on('$routeChangeStart', function $routeChangeStart() {
      $scope.loadingStatus = 'Loading...';
      $scope.loading = true;
    });

    $scope.$on('$routeChangeSuccess', function $routeChangeSuccess() {
      $scope.loading = false;
    });

    $scope.$on('$routeChangeError', function $routeChangeError() {
      $scope.loadingStatus = 'Error while changing page';
    });

  }
]);

'use strict';

angular.module('gc.loader', [
  'gc.loaderController',
  'loader-template.html'
]).directive('loader',
  [function loaderDirective() {

    return {
      restrict: 'E',
      templateUrl: 'loader-template.html',
      replace: true,
      controller: 'LoaderController',
      scope: {}
    };

  }]);
})();