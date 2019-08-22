var MyChart = {
	/* 차트종류 */
	T_LINE: 'line',
	T_AREA: 'area',
	T_COLUMN: 'column',
	T_PIE: 'pie',

	/** 차트 생성 */
	create: function($chart, settings) {
		$chart.jqxChart(settings);
	},
	
	/** 공통 차트 옵션 */
	getCommOptions: function(chartType, xUnit, yFormatFn) {
		var opt = {
			title: "Shortening URL Call Rate",
			description: null,
			enableAnimations: true,
			showLegend: true,
			showBorderLine: true,
			enableCrosshairs: true,
			crosshairsColor: '#AA55AA',
			padding: { left: 10, top: 10, right: 10, bottom:10},
            legendLayout: { left: 10, top: 30, width: 300, height: 200, flow: 'vertical' },
            colorScheme: 'scheme05',
			xAxis: {
				labels: { 
					rotationPoint: 'topright',
					angle: -45,
					offset: { x: 0, y: -15 }
				},
				gridLines: { 
					visible: true,
					step: 99999
				}
			},
			valueAxis: {
				minValue: 0,
				gridLines: { visible: true },
				alternatingBackgroundColor: '#E5E5E5',
				alternatingBackgroundColor2: '#F5F5F5',
				alternatingBackgroundOpacity: 0.5
			}
		};
		// y축 formatFunction
		if(yFormatFn !== undefined) {
			opt.valueAxis.formatFunction = yFormatFn;
		}

		return opt;
	},
	
	toolTipFormatFn: function($chart, value, itemIndex, series, group, categoryValue, categoryAxis) {
		var dataItem = $chart.jqxChart('source')[itemIndex];

		var s = '<div style="text-align: left;"><b>' + $.format.date(new Date(MyUtil.setTimestampToDate(dataItem.REGDATE)), 'yyyy-MM-dd HH:mm:ss') + '</b><br>';
		$.each(group.series, function(idx, value) {
            s += dataItem.ORIGINAL_URL + ' : ' + dataItem[value.dataField] + '<br>';
		});
		s += '</div>';
		return s;
	},

	/**
	 * 차트 series 생성
	 * @param arrDataField 	dataField 배열
	 * @param arrDisText		displayText 배열
	 * @param isMarker		marker 표시여부
	 * @returns {Array}
	 */
	getSeries: function(arrDataField, arrDisText, arrColor, isMarker) {
		if($.isEmpty(arrDataField) || $.isEmpty(arrDisText)) return;
		if(arrDataField.length != arrDisText.length) return;
		isMarker = true;
		var series = [];
		for(var i = 0; i < arrDataField.length; i++) {
			if(isMarker) {
				series.push({
                    labelRadius: '60%',
                    radius: '50%',

                    dataField: arrDataField[i],
					displayText: arrDisText[i], 
					symbolType: 'square',
					labels: {
	            		visible: true,
	            		backgroundColor: '#FEFEFE',
	                   backgroundOpacity: 0.2,
	                   borderColor: '#7FC4EF',
	                   borderOpacity: 0.7,
	                   padding: { left: 5, right: 5, top: 0, bottom: 0 }
	            	}
				});
			}
			else {
				var newSeries = { dataField: arrDataField[i], displayText: arrDisText[i] };
				if(arrColor !== undefined) {
					newSeries.lineColor = arrColor[i];
					newSeries.fillColor = arrColor[i];
				}
				series.push(newSeries);
			}
		}
		return series;
	},
	
	/**
	 * seriesGroups 생성
	 * @param $chart
	 * @param seriesType
	 * @param toolTipFn
	 * @param series
	 * @returns {___anonymous6020_6481}
	 */
	getSeriesGroup: function($chart, seriesType, toolTipFn, series) {
        {

			return {
				   type: seriesType,
				   toolTipFormatFunction: function(value, itemIndex, series, group, categoryValue, categoryAxis) {
					   if(toolTipFn !== undefined && toolTipFn !== null) {
						   return toolTipFn($chart, value, itemIndex, series, group, categoryValue, categoryAxis);
					   }
					   else {
						   return MyChart.toolTipFormatFn($chart, value, itemIndex, series, group, categoryValue, categoryAxis);
					   }
				   },
				   series: series
			   };
		}
	}
};