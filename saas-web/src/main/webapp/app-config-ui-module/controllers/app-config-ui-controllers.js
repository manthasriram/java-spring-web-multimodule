/**
 * Controler for the MasterDetailGrid page
 * Inherit this controller in the render pages
 */

angular.module('app-config-ui').controller(
    'masterDetailGridController',
    function ($scope, $routeParams, $resource) {

        //Read the params from the http request
        var uiGridDefinitionID = $routeParams.id;

        //Get the UI page definition
        gridDefintionResource = $resource("rest/ui/view/activity?id=" + uiGridDefinitionID);

        gridDefintionResource
            .get(function (data) {
                console.log("Fecthed UiGrid Definition");

                if (!data) {
                    console.log("Unable to fetch data");
                }

                var gridRestService = $resource("rest/" + data.dataObject.objectRootRestURL);

                console.log("Object REST URL : " + data.dataObject.objectRootRestURL);

                $scope.pageTitle = data.dataObject.pageTitle;

                //Build the Master detail grid object
                $scope.masterDetailObj = new MasterDetailGrid($scope, gridRestService, null,
                    data.dataObject.gridLayout.columns);
            });

    });

/**
 * This controller manage the UI Page Config Page intended to configure UI
 */

angular.module('app-config-ui').controller(
    'uiPageDefController',
    function ($scope, $resource, tableDefinitionProvider) {
        var gridRestService = $resource("rest/ui/activity");
        // Build the Master detail grid object
        $scope.masterDetailObj = new MasterDetailGrid($scope, gridRestService, null,
            tableDefinitionProvider.UI_PAGE_CONFIG);
    }).controller('editUIPageDefController', function($scope, $resource,$routeParams){

        var detailId = $routeParams.id;

        if(!detailId){
           detailId = "-1";
        }

    	 var detailsResource = $resource("rest/ui/activity/id/"+detailId);
    	 
    	 detailsResource.get(function(data) {
    		  console.log("Retrieved page def");
    		  $scope.hibernateEntities = data.dataObject.fields["hibernateEntities"].allValues;
    		  
    		  $scope.name =  data.dataObject.fields["name"].val;
    		  $scope.description =  data.dataObject.fields["description"].val;
    		  
    		  console.log($scope.hibernateEntities);
         });
    	

    });


