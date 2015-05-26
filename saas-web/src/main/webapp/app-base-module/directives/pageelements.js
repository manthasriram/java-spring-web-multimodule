/**
 * Filter Component Takes in the filterId. Makes a Ajax call to the server to
 * the details of the filter and builds the filter box
 * 
 * Usage:<gridfilter filterId='1'></gridfilter>
 */
angular.module('appcore').directive('gridfilter', function() {
	return {
		restrict : 'E',
		replace : true,
		scope : {
			filterId : '@'
		},
		templateUrl : "views/commons/filter-template.html",
		controller : [ '$scope', '$http','$attrs','filterService',
				function($scope, $http,$attrs, filterService) {
			
					$scope.showFilterDetails = true;
			
					/**
					 * Get the list of saved filters
					 */
			        $scope.getSavedFilterData = function(filterId){
			        	filterService.SavedFilterResource.get({
							id : filterId,isArray: true
						}, function(data) {
							$scope.savedfilters = data.dataList;
						});
			        };
					
			        /*
					 * Get the filter data
					 */
					$scope.getFilterData = function(filterId) {
						filterService.FilterResource.get({
							id : filterId,isArray: true
						}, function(data) {
							$scope.filterDetails = data;
							$scope.filterId = filterId;
						});
					};
					
					$scope.getFilterableMap = function(){
						var filterableMap = new Object();
						$("[id^=" + $scope.filterId + "]").each(function() {
							
							var value = $(this).val();
							if($(this).is("select")){
								value = $(this).find("option:selected").text();
							}
							
							var key = $(this).data("hibernatefield");
							filterableMap[key] = value;
						});
						return filterableMap;
					};

					/*
					 * Define the apply Filter function
					 */
					$scope.applyFilter = function() {
						/*
						 * Construct the filter map and store in the scope
						 * variable Send message to grid to load itself
						 */
						$scope.$emit('reload_grid', $scope.getFilterableMap());

						// Close the filter
						$('#filterDialog').modal('hide');
					};
					
					$scope.applyFilterWithMap = function(filterableMap){
						$scope.$emit('reload_grid', filterableMap);
					};
					
					/**
					 * Clear the existing contents
					 */
					$scope.clearFilter = function(){
						$scope.$emit('reload_grid', null);
					};
					
					/**
					 * Save the user created filter
					 */
					$scope.saveFilter = function(){
						
						$scope.applyFilter();

						$scope.savedFilter = {};
						$scope.savedFilter.filterName = $('#' + 'filter_name_id').val();
						$scope.savedFilter.filterId = $scope.filterId;
						$scope.savedFilter.filterMap = $scope.getFilterableMap();
						
						filterService.CreateSavedFilterResource.save({}, $scope.savedFilter, function(response) {
							$scope.getSavedFilterData($scope.filterId);
						}, function(error) {
							
						});
					};
					
					/**
					 * Change to new filter display mode
					 */
					$scope.newFilter = function(){
						 $scope.isManageFilter = false;
						 $scope.showFilterDetails = true;
						 // clear filter contents
						 $('#' + 'filter_name_id').val("");
						 $("[id^=" + $scope.filterId + "]").each(function() {
								 $(this).val("");
							});
					};
					
					/**
					 * Change to display mode
					 */
					$scope.manageFilters = function() {
						 $scope.isManageFilter = true;
						 $scope.showFilterDetails = false;
						 
					};
					
					/**
					 * Delete the saved filter
					 */
					$scope.deleteSavedFilter = function(){
						filterService.SavedFilterResource.delete({'id':  $scope.selectedSavedFilter});
						$scope.showFilterDetails = false;
						$scope.getSavedFilterData($scope.filterId);
					}
					
					/**
					 * Fetch the saved filter details
					 */
					$scope.fetchSavedFilter = function(){
						$scope.showFilterDetails = true;
						console.log($scope.selectedSavedFilter);
						
						$.each($scope.savedfilters, function(index, value){
							if(value.id == $scope.selectedSavedFilter){
								$('#filter_name_id').val(value.filterName);
								$.each(value.filterMap, function(k,v) {
									$('#' + $scope.filterId + "_" + k).val(v);
								});
							}
						});
					};
					
				} ],
		link : function(scope, iElement, iAttrs, ctrl) {

			var filterId = iAttrs.filterid;
			
			scope.getFilterData(filterId);
			scope.getSavedFilterData(filterId);
			
			
			/**
			 * Watch for the filter fields to be retrieved
			 */
			scope.$watch('filterDetails', function(data) {
				
				if(data){
				 // Build the filter elements dynamically
				if ($('#filter_form').length) {
					
					var div = $('<div/>', {
						'class' : 'form-group',
					});
					
					$('<label/>', {
						'class' : 'text',
						'text' : 'Filter Name'
					}).appendTo(div);
					
					$('<input/>', {
						'id' : 'filter_name_id',
						'name' : 'filter_name',
						'placeholder' : "Enter name for filter",
						'class' : 'form-control input-sm',
					}).appendTo(div);
					
					div.appendTo('#filter_form');

					$.each(data.filterList, function(i, filterElement) {

						id = filterId + "_" + filterElement.dbField;
						
						switch (filterElement.type) {
						case "text":
							var div = $('<div/>', {
								'class' : 'form-group',
							});
							
							$('<label/>', {
								'class' : 'text',
								'text' : filterElement.label
							}).appendTo(div);
							
							$('<input/>', {
								'id' : id,
								'name' : id,
								'ng-modal':id,
								'placeholder' : filterElement.label,
								'class' : 'form-control input-sm',
								'data-hibernatefield' : filterElement.dbField
							}).appendTo(div);
							
							div.appendTo('#filter_form');
							break;

						case "select":
							var div = $('<div/>', {
								'class' : 'form-group',
							});

							$('<label/>', {
								'class' : 'select',
								'text' : filterElement.label
							}).appendTo(div);

							var selectElement = $('<select/>', {
								'id' : id,
								'ng-modal':id,
								'name' : id,
								'class' : 'form-control input-sm',
								'data-hibernatefield' : filterElement.dbField
							});

							$.each(filterElement.systemCodeValues, function(key, value) {
								selectElement.append($("<option/>", {
									value : key,
									text : value
								}));
							});
							selectElement.appendTo(div);
							div.appendTo('#filter_form');
							break;
						}
					});
				}
				}
			});
		}
	};
});

/**
 * Displays the options for the dashboard tab
 */
angular.module('appcore').directive('dashboardoptions', function() {
	return {
		restrict : 'E',
		replace : true,
		scope : {
			suppliers : '@',
		},
		templateUrl : "views/dashboard/dashboardoptions.html"
	};
});

/**
 * Display the page header
 */
angular.module('appcore').directive('page-header', function() {
	return {
		restrict : 'E',
		replace : true,
		scope : {
			header : '@',
		},
		templateUrl : "views/commons/header-template.html"
	};
});

/**
 * Generates the action menu
 */
angular.module('appcore').directive('page-action-bar', function() {
	return {
		restrict : 'E',
		replace : true,
		scope : {
			header : '@',
		},
		link : function(scope, elm, attrs) {

		}
	};
});

/**
 * Display the page header
 */
angular.module('appcore').directive('notifications', function() {
	return {
		restrict : 'E',
		replace : true,
		templateUrl : "views/commons/notifications.html"
	};
});
