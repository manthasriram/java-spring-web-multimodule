/** * Defines the main config for the app * */
var mainApp = angular.module("mainApp", ['ngRoute']);

/** Define routes * */
mainApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'home.html'
	}).otherwise({
		redirectTo : '/'
	});
} ]);


mainApp.controller("BaseController", function($scope, $rootScope, $location, $route) {
	//Base App Controller
});