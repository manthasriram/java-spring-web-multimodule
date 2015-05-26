/**
 * Server side grid
 * source: angularjs resource
 * columndef:column definition
 * 
 * This is the legacy grid object
 */
angular.module('appcore').directive('grid', function() {
	return {
		restrict : 'E',
		replace : true,
		templateUrl : "views/commons/grid-template.html",
		controller : [ '$scope', '$http', '$attrs',
				function($scope, $http, $attrs) {

					$scope.pageSize = 10;
					$scope.totalRecords = 100;
					$scope.totalPages = 10;
					$scope.page = 1;
					$scope.displayCount = 0;

					$scope.loadGrid = function() {
						console.log("Called reload grid");
						var resource = $scope.$eval($attrs.source);
						if ($scope.filterForGrid == null) {
							$scope.filterForGrid = new Object();
						}
						$scope.filterForGrid["pageSize"] = $scope.pageSize;
						$scope.filterForGrid["page"] = $scope.page;

						resource.get($scope.filterForGrid, function(data) {
							$scope.gridData = data;
							$scope.totalPages = data.pages;
							$scope.totalRecords = data.totalRecords;

							if ($scope.totalRecords < $scope.pageSize) {
								$scope.displayCount = $scope.totalRecords;
							} else {
								$scope.displayCount = $scope.pageSize;
							}
						});
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
		link : function(scope, element, attrs) {

			scope.loadGrid();

			var columnDef = scope.$eval(attrs.columndef);

			/* Build the table header */
			var head = $('thead');
			var headRow = $('<tr/>').appendTo(head);

			$.each(columnDef, function(index, elem) {
				var th;
				if (elem.mDataProp == 'id') {
					th = $('<th><input id="mainselect"  type="checkbox" /></th>', {});

				} else {
					th = $('<th/>', {
						'text' : elem.label + "  ",
						'class': 'sortcolumn',
						'data-dbfield' : elem.mDataProp
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
			// DataTable
			scope.$watch('gridData', function(value) {
				var val = value || null;
				if (val) {
					$('tbody').html("");
					var body = $('tbody');

					$.each(value.listData, function(index, rowData) {
						var row = $('<tr/>').appendTo(body);

						$.each(columnDef, function(index, elem) {
							if (elem.mDataProp == 'id') {
								var idChBox = $('<input/>', {
									'class':'selectcolumn',
									'type':'checkbox',
									'data-columnid': rowData[elem.mDataProp],
								 });
								$('<td/>', {
								}).append(idChBox).appendTo(row);

							} else if (elem.mRender) {
								$('<td/>').html(elem.mRender(rowData))
										.appendTo(row);
							} else {
								$('<td/>', {
									'text' : rowData[elem.mDataProp]
								}).appendTo(row);
							}
						});
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
					delete  scope.filterForGrid["sort_asc"];
					
				} else if (e.hasClass('icon-sort-down')) {
					e.attr('class', 'icon-sort-up');
					delete scope.filterForGrid["sort_desc"];
					scope.filterForGrid["sort_asc"] = $(this).data('dbfield');
				}
				else if (e.hasClass('icon-sort-up')) {
					e.attr('class', 'icon-sort-down');
					scope.filterForGrid["sort_desc"] = $(this).data('dbfield');
					delete scope.filterForGrid["sort_asc"];
				}
				$(this).addClass('sorted');
				
				//Clear all other columns from the sorted
				
				//Call reload grid
				scope.loadGrid();
			});
			
			/**
			 * Toggle the selects 
			 */
			$('#mainselect').change(function() {
				if(this.checked) {
			        // Iterate each checkbox
			        $('.selectcolumn').each(function() {
			            this.checked = true;                        
			        });
			    }
				else{
					$('.selectcolumn').each(function() {
			            this.checked = false;                        
			        });
				}
			});
		}
	};
});

