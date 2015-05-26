/* Module definition */

angular.module("app-config-ui", []).config(
    ['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/uipagedefinition', {
            templateUrl: 'app-config-ui-module/views/uipagedef/gridUIPageDef.html',
            controller: 'uiPageDefController'
        }).when('/renderactivity/:id', {
            templateUrl: 'app-config-ui-module/views/base/renderGridDetail.html',
            controller: 'masterDetailGridController'
        }).when('/uipagedefinition/detail/:id', {
            templateUrl:'app-config-ui-module/views/uipagedef/newUIPageConfig.html',
            controller:'editUIPageDefController'
        });
    }]);