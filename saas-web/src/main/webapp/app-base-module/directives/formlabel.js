angular.module('appcore')
		.directive(
				'displayfield',
				function() {
					return {
						restrict : 'E',
						scope : {
							label : '@',
							value : '@'
						},
						template : '<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><label> {{label}}</label> : <Strong><span class="text-fb">{{value}}</span></strong></div>'
					};
				});

angular.module('appcore')
		.directive(
				'addressfield',
				function() {
					return {
						restrict : 'E',
						scope : {
							label : '@',
							value : '@'
						},
						template : '<div class="col-lg-2 col-md-3 col-sm-6 col-xs-12"> <label class="text-black">{{label}}</label><address class="text-fb">{{value}}</address> </div>'
					};
				});

angular.module('appcore')
		.directive(
				'chartheader',
				function() {
					return {
						restrict : 'E',
						scope : {
							label : '@',
							background : '@'
						},
						template : "<div class='box-header {{background}}'><div class='title'>{{label}}</div><div class='actions'><a class='btn box-remove btn-mini btn-link' href='#'><iclass='icon-remove'></i> </a> <a class='btn box-collapse btn-mini btn-link' href='#'><i></i> </a></div></div>"
					};
				});

/**
 * Date time picker
 */
angular.module('appcore')
		.directive(
				'datetime',
				function() {
					return {
						restrict : 'E',
						scope : {
							value : '@',
						},
						template : "<div class='datetimepicker input-group' id='datetimepicker'><div class='datepicker input-group' id='datepicker'><input class='form-control' data-format='yyyy-MM-dd' placeholder='Select datepicker' type='text' value='{{}}'><span class='input-group-addon'><span data-date-icon='icon-calendar' data-time-icon='icon-time' class='icon-calendar></span></span></div></div>"
					};
				});

/**
 * Directive for a edit field
 */
angular.module('appcore')
		.directive(
				'editableinput',
				function() {
					return {
						restrict : 'E',
						replace : true,
						scope : {
							label : '@',
							placeholder : '@',
							type : '@',
							model : '=',
							required : '='
						},
						template : "<div class='col-lg-3 col-md-4 col-sm-6 col-xs-12'>"
								+ "<div class='form-group'>"
								+ "<label> {{label}} </label>"
								+ "<input type='text' ng-model='model' class='form-control' class='{{type}}' placeholder='{{placeholder}}' ng-required='required'/>"
								//+ "<span class='help-inline'>Required field !</span>"
								+ "</div>" + "</div>"
					};
				});

/**
 * Directive for a drop down box
 */
angular.module('appcore')
		.directive(
				'selectformfield',
				function() {
					return {
						restrict : 'E',
						replace : true,
						scope : {
							label : '@',
							id : '@',
							selectedval : '=',
							options : '=',
							name : '@',
							required : '='
						},
						template : "<div class='col-lg-3 col-md-4 col-sm-6 col-xs-12'>"
								+ "<div class='form-group'>"
								+ "<label> {{label}}  </label>"
								+ "<select class='form-control' ng-model='selectedval' ng-attr-name='{{name}}' ng-options='item as item.name for item in options' ng-required='required'><option value=''>-- select --</option></select>"
								+ "</select></div></div>"
					};
				});
