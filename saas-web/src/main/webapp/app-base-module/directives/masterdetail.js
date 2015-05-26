/**
 * Master Detail grid
 * 
 * The grid gets the definition from REST call 
 * source: angularjs resource
 * columndef:column definition
 * 
 * example : <masterdetail grid-def-id="ui.grid.job" masterDetailObj="jobsGridObj"></<masterdetail>
 * 
 * grid-def-id: This id for the grid is defined in the server
 * source: MasterDetailGrid obj. 
 * Takes in the scope, angular resource object and REST url
 */
angular.module('appcore').directive('masterdetail', function() {
	return {
		restrict : 'E',
		replace : true,
		templateUrl : "views/commons/grid-template.html",
		controller : [ '$scope', '$resource', '$attrs', function($scope, $resource, $attrs) {

			$scope.pageSize = 10;
			$scope.totalRecords = 100;
			$scope.totalPages = 10;
			$scope.page = 1;
			$scope.displayCount = 0;

			/**
			 * Set the master Detail object and load the grid
			 */
			$scope.initGrid = function() {
				//Get the column definition from the master detail object
				if ($scope.masterDetailObj) {
					console.log("Initializing the grid");
					$scope.columnDef = $scope.masterDetailObj.gridColumnDefinition();
					console.log("Column definition:" + JSON.stringify($scope.columnDef));
					$scope.loadGrid();
				}
			};

			/**
			 * Load the grid
			 */
			$scope.loadGrid = function() {
				if ($resource) {
					console.log("loading the grid");
					//Build the filter for the grid
					if ($scope.filterForGrid == null) {
						$scope.filterForGrid = new Object();
					}
					$scope.filterForGrid["pageSize"] = $scope.pageSize;
					$scope.filterForGrid["page"] = $scope.page;

					//Fetch the grid resource from the object and make the rest call with filter configuration
					$scope.masterDetailObj.gridResource.get($scope.filterForGrid, function(data) {
						$scope.gridData = data;
						$scope.totalPages = data.pages;
						$scope.totalRecords = data.totalRecords;

						if ($scope.totalRecords < $scope.pageSize) {
							$scope.displayCount = $scope.totalRecords;
						} else {
							$scope.displayCount = $scope.pageSize;
						}
					});
				}
			};

			$scope.navigate = function(operation) {
				switch (operation) {
				case "next":
					if ($scope.page < $scope.totalPages) {
						$scope.page = $scope.page + 1;
					}
					break;
				case "prev":
					if ($scope.page > 1) {
						$scope.page = $scope.page - 1;
					}
					break;
				case "start":
					$scope.page = 1;
					break;
				case "end":
					$scope.page = $scope.totalPages
					break;
				}
				$scope.loadGrid();
			};

			/**
			 * Delete items in the grid
			 */
			$scope.deleteSelected = function() {
				console.log("Delete Clicked");
				$scope.masterDetailObj.deleteGridItem();
			};

			//This message is received from the filter
			$scope.$on('reload_grid', function(event, data) {
				$scope.filterForGrid = data;
				$scope.page = 1;
				$scope.loadGrid();
			});

			//This message is received from the filter
			$scope.$on('refesh_grid', function(event, data) {
				$scope.loadGrid();
			});

		} ],
		link : function(scope, element, attrs, resource) {

			//Watch for the Definition object to be loaded and then init the grid
			scope.$watch(attrs.source, function(masterDetailData) {
				console.log("Watch ###" + masterDetailData);
				if (masterDetailData) {
					console.log("Master Detail Data:" + masterDetailData);
					scope.masterDetailObj = masterDetailData;
					scope.initGrid();
				}
			});

			/* Build the table header */
			var head = $('thead');
			var headRow = $('<tr/>').appendTo(head);

			//Get the column def watch and build the table
			scope.$watch('columnDef', function(columnDef) {
				if (columnDef) {
					$.each(columnDef, function(index, elem) {
						var th;
						console.log("Rendering column:" + elem);
						if (elem.type == 'CheckBox') {
							th = $('<th><input id="mainselect"  type="checkbox" /></th>', {});
						} else {
							th = $('<th/>', {
								'text' : elem.label + "  ",
								'class' : 'sortcolumn',
								'data-dbfield' : elem.dataBinding
							});
							if (elem.sort == 'true') {
								$('<span/>', {
									'class' : 'icon-sort',
								}).appendTo(th);
							}
						}
						th.appendTo(headRow);
					});

					// watch for any changes to our data, rebuild the
					// Here we build table
					scope.$watch('gridData', function(value) {
						var val = value || null;
						if (val) {
							$('tbody').html("");
							var body = $('tbody');
							$.each(value.listData, function(index, rowData) {
								var row = $('<tr/>').appendTo(body);
								console.log("Columns:" + JSON.stringify(columnDef));
								console.log("RowData:" + JSON.stringify(rowData));
								if (columnDef) {
									$.each(columnDef, function(index, elem) {
										console.log("Element:" + JSON.stringify(elem));
										if (elem.type == "CheckBox") {
											var idChBox = $('<input/>', {
												'class' : 'selectcolumn',
												'type' : 'checkbox',
												'data-columnid' : rowData[elem.dataBinding],
											});
											$('<td/>', {}).append(idChBox).appendTo(row);

										} else if (elem.type == "status") {
											$('<td/>', {
												'text' : rowData[elem.dataBinding]
											}).appendTo(row);
										}else if(elem.customRenderFunc){
											$('<td/>').html(elem.customRenderFunc(rowData))
											.appendTo(row);
										} else {
											console.log("Appending:" + rowData[elem.dataBinding]);
											$('<td/>', {
												'text' : rowData[elem.dataBinding]
											}).appendTo(row);
										}
									});
								}
							});

							$('#mainselect').change(function() {
								console.log("wee2e");
								if (this.checked) {
									// Iterate each checkbox
									$('.selectcolumn').each(function() {
										this.checked = true;
									});
								} else {
									$('.selectcolumn').each(function() {
										this.checked = false;
									});
								}
							});
						}
					});
				}
			});

			/**
			 * 
			 */
			$('.sortcolumn').click(function() {

				if (scope.filterForGrid == null) {
					scope.filterForGrid = new Object();
				}

				var e = $(this).find("span");
				if (e.hasClass('icon-sort')) {
					e.attr('class', 'icon-sort-down');
					scope.filterForGrid["sort_desc"] = $(this).data('dbfield');
					delete scope.filterForGrid["sort_asc"];

				} else if (e.hasClass('icon-sort-down')) {
					e.attr('class', 'icon-sort-up');
					delete scope.filterForGrid["sort_desc"];
					scope.filterForGrid["sort_asc"] = $(this).data('dbfield');
				} else if (e.hasClass('icon-sort-up')) {
					e.attr('class', 'icon-sort-down');
					scope.filterForGrid["sort_desc"] = $(this).data('dbfield');
					delete scope.filterForGrid["sort_asc"];
				}
				$(this).addClass('sorted');

				//Clear all other columns from the sorted

				//Call reload grid
				scope.loadGrid();
			});

		}
	};
});
