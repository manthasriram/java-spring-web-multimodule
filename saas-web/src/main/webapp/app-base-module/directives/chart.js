angular.module('appcore').directive('chart', function() {
	return {
		restrict : 'A',
		replace : false,
		link : function(scope, elem, attrs) {
			var data = scope[attrs.chart];
			var _barColor = attrs.barcolor;
			var _hoverMessage = attrs.hovermessage;
			var _ylabel = attrs.ylabel;
			var _xlabel = attrs.xlabel;
			var _xTickLen = attrs.xticklen ? attrs.xticklen : 1;
			
			//var va = Date.UTC(2013, 0, 0, 0, 0);
			
			$.plot(elem, data, {
				series : {
					lines : {
						show : true,
						lineWidth: 5,
						fill : false
					},
					points: { 
						show: true,
						lineWidth: 7
					},
				},
				xaxis : {
					mode : "time",
					tickSize: [_xTickLen, "month"],
					timeformat : "%b %y",
					axisLabelUseCanvas: true,
					axisLabel: _xlabel,
					axisLabelPadding: 9,
				    //min: va,
				    font: {
				    	color: "rgba(255,255,255,0.9)"
					}
				},
				yaxis : {
					axisLabel: _ylabel,
					axisLabelUseCanvas: true,
					tickSize: 5,
				    font: {
					    color: "rgba(255,255,255,0.9)"
					}
				},
				legend : {
					show : true,
					position: "ne",
					labelBoxBorderColor: "none",
				},
				grid : {
					clickable : true,
					hoverable : true,
					autoHighlight: true,
				    mouseActiveRadius: 10,
				    aboveData: true,
				    backgroundColor: "#333333",
				    color: "rgba(0,0,0,0.4)",
				    borderWidth: 0,
				    minBorderMargin: 25,

				},
				tooltip: true,               //false
				tooltipOpts: {
				    content:   _hoverMessage,//"<strong>%y perfect orders in the month of %x </strong>"
				},
				colors : [ _barColor ]
			});
		}
	};
});

angular.module('appcore').directive('barchart', function() {
	return {
		restrict : 'A',
		replace : false,
		link : function(scope, elem, attrs) {
			var data = scope[attrs.barchart];
			var _barColor = attrs.barcolor;
			var _hoverMessage = attrs.hovermessage;
			var _ylabel = attrs.ylabel;
			var _xlabel = attrs.xlabel;
			
			var va = Date.UTC(2013, 0, 0, 0, 0);
			
			$.plot(elem, data, {
				series : {
					bars : {
						show : true,
		                fill: true,
		                barWidth: 60*60*1000*24*30, 
		                align: 'center'
					},
				},
				xaxis : {
					mode : "time",
					tickSize: [1, "month"],
					timeformat : "%b %y",
					axisLabelUseCanvas: true,
					axisLabel: _xlabel,
					axisLabelPadding: 5,
				    min: va,
				    font: {
				    	color: "rgba(255,255,255,0.9)"
					}
				},
				yaxis : {
					axisLabel: _ylabel,
					axisLabelUseCanvas: true,
				    font: {
					    color: "rgba(255,255,255,0.9)"
					}
				},
				legend : {
					show : true,
					position: "left",
					labelBoxBorderColor: "none",
				},
				grid : {
					clickable : true,
					hoverable : true,
					autoHighlight: true,
				    mouseActiveRadius: 10,
				    aboveData: true,
				    backgroundColor: "#333333",
				    color: "rgba(0,0,0,0.4)",
				    borderWidth: 0,
				    minBorderMargin: 25,

				},
				tooltip: true,               //false
				tooltipOpts: {
				    content:   _hoverMessage,//"<strong>%y perfect orders in the month of %x </strong>"
				},
				colors : [ _barColor ]
			});
		}
	};
});


angular.module('appcore').directive('multichart', function() {
	return {
		restrict : 'A',
		replace : false,
		link : function(scope, elem, attrs) {
			var data = scope[attrs.multichart];
			$.plot(elem, data, {
				
				xaxis: {
					mode : "time",
					tickSize: [1, "month"],
					timeformat : "%b %y",
					axisLabelUseCanvas: true,
					axisLabelPadding: 9,
					axisLabel: attrs.xlabel,
				    font: {
				    	color: "rgba(255,255,255,0.9)"
					}
		        },
		        yaxes: [
		            {
		            	axisLabel: attrs.ylabel1,
		            	axisLabelUseCanvas: true,
		            	axisLabelPadding: 10,
					    font: {
						    color: "rgba(255,255,255,0.9)"
						}
		            },
		            {
		            	alignTicksWithAxis: 2,
		    			position: "right",
		                axisLabel: attrs.ylabel2,
		                axisLabelPadding: 10,
		                axisLabelUseCanvas: true,
					    font: {
						    color: "rgba(255,255,255,0.9)"
						}
		            }
		        ],
		        grid: {
		            hoverable: true,
		            borderWidth: 1
		        },
		        legend: {
		            labelBoxBorderColor: "none",
		            position: "right"
		        },
		        tooltip: true,               //false
				tooltipOpts: {
				    //content:   _hoverMessage,//"<strong>%y perfect orders in the month of %x </strong>"
				},
		        colors : [ "#f3454","" ]
			});
		}
	};
});

