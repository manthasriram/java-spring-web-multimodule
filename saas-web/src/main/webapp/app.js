/** * Defines the main config for the app * */
var mainApp = angular.module("mainApp", ['ngRoute', 'ngResource','appcore','app-config-ui']);

/** Define routes * */
mainApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'home.html'
	}).otherwise({
		redirectTo : '/'
	});
} ]);


mainApp.controller("BaseController", function($scope, $rootScope, $location, $route) {
	$scope.isUserLoggedIn = true;
	
	//Set the names for the app
	$scope.headerName = "My Saas App";
});
/**
 * Factory method to generate the menu's
 */
mainApp.factory('menuFactory', function() {
	var menuService = {};
	menuService.getMenuItems = function() {
		return [{
			"name" : "Home",
			"url" : "#/home",
			"iconClass" : "icon-home"
		}, {
			"name" : "Supply Chain DashBoard",
			"url" : "#/dashboard",
			"iconClass" : "icon-dashboard"
		},
		{
			"name" : "Core Objects",
			"iconClass" : "icon-building",
			"url" : "#",
			"class" : "dropdown-collapse",
			"submenu" : [ {
				"name" : "Company",
				"url" : "#company"
			} ,
			{
				"name" : "Items",
				"url" : "#items"
			} ,
			{
				"name" : "Warehouse",
				"url" : "#warehouse"
			}]
		},{
			"name" : "Purchase Orders",
			"iconClass" : "icon-building",
			"url" : "#",
			"class" : "dropdown-collapse",
			"submenu" : [ {
				"name" : "Purchase Order List",
				"url" : "#purchaseorders"
			},{
			"name" : "Purchase Imports",
			"url" : "#poimport"
		}]
		}, {
			"name" : "ASNS",
			"iconClass" : "icon-archive",
			"url" : "#",
			"class" : "dropdown-collapse",
			"submenu" : [ {
				"name" : "ASN Info",
				"url" : "#/shipments"
			}, {
				"name" : "Create ASN",
				"url" : "#/createasn"
			} ]
		} ,
		{
			"name" : "LPNS",
			"iconClass" : "icon-archive",
			"url" : "#",
			"class" : "dropdown-collapse",
			"submenu" : [ {
				"name" : "LPNs",
				"url" : "#/shipments"
			}, ]
		} ];
	};
	return menuService;
});

/**
 * Controller for the menu's
 * 
 * @param $scope
 * @param menuFactory
 */
function MenuController($scope, menuFactory) {
	$scope.menuItems = menuFactory.getMenuItems();
}

/** Add the controller to the main * */
mainApp.controller("MenuController", MenuController);



