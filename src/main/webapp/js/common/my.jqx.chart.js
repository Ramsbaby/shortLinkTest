var MyChart2 = {
	/* 차트종류 */
	T_LINE: 'line',
	T_AREA: 'area',
	T_COLUMN: 'column',
	T_PIE: 'pie',
	
	/* Series Color */
	C_IF_AVG_IN: '#1CA3E3',
	C_IF_AVG_OUT: '#E7E707',
	C_IF_MAX_IN: '#2BA043',
	C_IF_MAX_OUT: '#FF7515',

	C_IF_MIN_IN: '#a45ace',
	C_IF_MIN_OUT: '#003499',
	C_IF_MAX_SUM: '#ba8e6a',
	C_IF_AVG_SUM: '#e585b0',
	C_IF_MIN_SUM: '#a8022d',
	
	/* x축 Unit */
	XUNIT_SECOND: 'second',
	XUNIT_MINUTE: 'minute',
	XUNIT_HOUR: 'hour',
	XUNIT_DAY: 'day',
	XUNIT_MONTH: 'month',
	XUNIT_YEAR: 'year',
	
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
	
	/** 컬럼차트 옵션 */
	getColumnOptions: function() {
		var opt = {
			title: null,
			description: null,
			enableAnimations: true,
			showLegend: true,
			showBorderLine: true,
			enableCrosshairs: true,
			crosshairsColor: '#AA55AA',
			padding: { left: 15, top: 15, right: 15, bottom: 0 },
			colorScheme: 'scheme05'
		};
		return opt;
	},
	
	/** bullet chart options */
	getBulletOptions: function() {
		return {
			width: "33%", 
			height: "95%",
			barSize: "40%",
	        title: "",
	        description: "",
	        ranges: [
	            { startValue: 0, endValue: 25, color: "#05A305", opacity: 1 },
	            { startValue: 25, endValue: 50, color: "#FDBD3A", opacity: 1 },
	            { startValue: 50, endValue: 75, color: "#FD6D3A", opacity: 1 },
	            { startValue: 75, endValue: 100, color: "#E03234", opacity: 1 }
	        ],
	        pointer: { value: 0, size: "30%", color: "#181818" },
	        target: { value: 0, size: 1, color: "#181818" },
	        ticks: { position: "near", interval: 25, size: 0 },
	        orientation: "vertical",
	        labelsFormatFunction: function (value, position) {
	            var labelsColor;
	            if (value < 25) {
	                labelsColor = "#05A305";
	            } else if (value < 50) {
	                labelsColor = "#FDBD3A";
	            } else if (value < 75) {
	                labelsColor = "#FD6D3A";
	            } else {
	                labelsColor = "#E03234";
	            }
	            return "<span style='color: " + labelsColor + ";'>" + value + "</span>";
	        },
	        showTooltip: true
	    };
	},
	
	createBulletChart: function($chart, settings) {
		$chart.jqxBulletChart(settings);
	},
		
	/**
	 * DateTime Line차트에 RangeSelector 옵션 추가 (차트 Zooming)
	 * @param settings
	 * @param objRS
	 * @param field
	 * @param unit
	 * @returns
	 */
	setRangeSelector: function(settings, objRS, field, unit) {
		if(objRS === undefined || field === undefined) return;
		if($.isBlank(unit)) unit = 'day';
		$.extend(settings.xAxis, {
			rangeSelector: {
				renderTo: objRS,
                size: 60,
                padding: { left: 30, right: 30, top: 0, bottom: 0 },
                backgroundColor: 'white',
                dataField: field,
                baseUnit: unit,
                gridLines: { visible: false },
                serieType: 'area',
                labels: {
//                	visible: false,
                    formatFunction: function (value) {
                    	var format = 'MM-dd';
                    	switch(unit) {
                    	case 'minute': format = 'MM-dd HH:mm'; break;
                    	case 'hour': format = 'MM-dd HH'; break;
                    	case 'day': format = 'MM-dd'; break;
                    	case 'month': format = 'yyyy-MM'; break;
                    	case 'year': format = 'yyyy'; break;
                    	}
                        return $.format.date(value, format);
                    }
                }
            }
		});
		return settings;
	},
	
	/** FormatFunction */
	unit1000FormatFn: function(value) {
		return HmUtil.convertUnit1000(value);
	},
	
	unit1024FormatFn: function(value) {
		return HmUtil.convertUnit1024(value);
	},
	
	toolTipFormatFn: function($chart, value, itemIndex, series, group, categoryValue, categoryAxis) {
		var dataItem = $chart.jqxChart('source')[itemIndex];

		//IE 크로스 브라우징 문제
        dataItem.REGDATE = MyUtil.setTimestampToDate(dataItem.REGDATE);

        console.log(dataItem);
		console.log(group);
		var s = '<div style="text-align: left;"><b>' + $.format.date(new Date(dataItem.REGDATE), 'yyyy-MM-dd HH:mm:ss') + '</b><br>';
		$.each(group.series, function(idx, value) {
            console.log(value);

            s += dataItem.ORIGINAL_URL + ' : ' + dataItem[value.dataField] + '<br>';
		});
		s += '</div>';
		return s;
	},
	
	unit1000ToolTipFormatFn: function($chart, value, itemIndex, series, group, categoryValue, categoryAxis) {
		var dataItem = $chart.jqxChart('source')[itemIndex];
		var s = '';
		if(categoryAxis.type == 'date')
			s += '<div style="text-align: left;"><b>' + $.format.date(categoryValue, 'yyyy-MM-dd HH:mm:ss') + '</b><br>';
		else 
			s += '<div style="text-align: left;"><b>' + categoryValue + '</b><br>';
		$.each(group.series, function(idx, value) {
			s += value.displayText + ' : ' + HmUtil.convertUnit1000(dataItem[value.dataField]) + '<br>';
		});
		s += '</div>';
		return s;
	},
	
	unit1024ToolTipFormatFn: function($chart, value, itemIndex, series, group, categoryValue, categoryAxis) {
		var dataItem = $chart.jqxChart('source')[itemIndex];
		var s = '';
		if(categoryAxis.type == 'date')
			s += '<div style="text-align: left;"><b>' + $.format.date(categoryValue, 'yyyy-MM-dd HH:mm:ss') + '</b><br>';
		else 
			s += '<div style="text-align: left;"><b>' + categoryValue + '</b><br>';
		$.each(group.series, function(idx, value) {
			s += value.displayText + ' : ' + HmUtil.convertUnit1024(dataItem[value.dataField]) + '<br>';
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
						   return MyChart2.toolTipFormatFn($chart, value, itemIndex, series, group, categoryValue, categoryAxis);
					   }
				   },
				   series: series
			   };
		}
	},
	getSeriesGroup2: function($chart, seriesType, toolTipFn, series, suffix) {
            return {
                type: seriesType,
                columnsGapPercent: 30,
                valueAxis:
                    {
                        minValue: 0,
                        formatSettings: { sufix: suffix}
                    },
                series: series
            };
	},

	/** 백분율 차트인 경우 데이터에서 최대값을 찾아 +1로 y축 maxValue를 설정한다. */
	setMaxValueForPer: function($chart, chartData, datafield) {
		var tmpArr = [];
		if(chartData != null && chartData.length > 0) {
			$.each(chartData, function(idx, value) {
				tmpArr.push(value[datafield]);
			});
			var maxVal = Math.max.apply(Math, tmpArr);
			if((maxVal + 1) > 100) maxVal = 100;
			else maxVal += 1;
			$chart.jqxChart('getInstance').valueAxis.minValue = 0;
			$chart.jqxChart('getInstance').valueAxis.maxValue = maxVal;
		}		   
	},
	
	/**
	* 동적 series, 소스 재설정 함수 
	*/
	setDynamicSource : function ($chart, data, legendTxt){
// 		console.log($chart, data, legendTxt);

		// data 없을때 그냥 널값을 source에 반영하고 리턴.
		if(data==null || data.length==0){
			$chart.jqxChart('source', data);
			$chart.jqxChart('update');
			return;
		}

		var legend_txt = "idx";
		if(legendTxt!=null) legend_txt = legendTxt;
		
		var itemIdxArr = []; // index 값 담음
		var dayArr = new Array(); // 날짜값 담음
		   
		for(var i=0; i<data.length; i++){  // index만 담음
		    // console.log(tmpChartDt[i]);
		    var oneDt = data[i];
		    var idx = oneDt.itemIdx;
		    var ymdhms = oneDt.ymdhms;
		    var val = oneDt.val;
		    // console.log(idx , itemIdxArr, itemIdxArr.hasOwnProperty(idx));
		    var flag = true;
		    $.each(itemIdxArr, function(index,data){ 
		 	   if(idx==data){ flag = false; return false;} 
			   });
		    if(flag){
		        itemIdxArr.push(idx); 
		        //console.log("push..", itemIdxArr, tmpChartDt[i]);
		    }
		}
		   
		// 날짜별 인덱스 담음
		for(var i=0; i<data.length; i++){ 
		    var oneDt = data[i];
		    var idx = oneDt.itemIdx;
		    var ymdhms = oneDt.ymdhms;
		    var val = oneDt.val;
		    var flag2 = true;
			
		    var newDt = {};
		    for(var z=0; z<itemIdxArr.length; z++){
		 		var oneIdx = itemIdxArr[z];
		 		var newName = legend_txt+oneIdx;
		 		if(oneIdx == idx) newDt[newName] = val;
		    }
		 	
		    newDt['ymdhms']=ymdhms;
		    newDt['val']=val;
		    if(!dayArr.hasOwnProperty(ymdhms)){
		        dayArr[ymdhms]={}; 
		    }else{
		 	   newDt['val']=dayArr[ymdhms]['val']+", "+val; // 동일한 날짜일때 val 값 쌓이도록.
		    }
		    
		    $.extend(dayArr[ymdhms], newDt);
		}

		var newSeriesGroup = [];
		for(var z=0; z<itemIdxArr.length; z++){
			var oneIdx = itemIdxArr[z];
			var newField = legend_txt+oneIdx;
			var newName = legend_txt+(z+1);
			
			var obj = { dataField: newField, displayText: newName };
			newSeriesGroup.push(obj);
		}
		
		var groups = $chart.jqxChart('seriesGroups');
		groups[0].series = newSeriesGroup;
		
		var tt = new Array();
		var keys = Object.keys(dayArr);
		for(var i=0; i<keys.length;i++){ 
			tt.push(dayArr[keys[i]]);
		}
		
		$chart.jqxChart('source', tt);
		$chart.jqxChart('update');
	}
		
};


var HmChart = {
	/** 차트 종류 */
	T_LINE: 'line',
		
	LINE_CHART : 0,
	BAR_CHART: 1,
	BUBBLE_CHART: 2,
	
	/** 기본 라인 차트 옵션 정의 */
	getDefaultLineChartOption : function() {
		return {
				title : null,
				description : null,
				enableAnimations : true,
				showLegend : true,
				padding : { left : 10, top : 5, right : 10, bottom : 5 },
				xAxis : { 
					dataField : 'ymdhms',
					formatFunction : function(value){
						return $.format.date(value, 'yyyy-MM-dd HH:mm');
					},
					type: 'date'
				}
			};
	},

		/** 차트 생성 */
		create: function($obj, settings) {
			$obj.jqxChart(settings);
		},
	
		create : function($obj, type, settings) {
			if(type == undefined) type == HmChart.LINE_CHART;
			
			/** 차트 기본 옵션 가져오기*/
			var defaultOptions = {};
			switch(type){
			case HmChart.LINE_CHART:
				defaultOptions = this.getDefaultLineChartOption();
				break;
			}
			
			$.extend(defaultOptions, settings);
			$obj.jqxChart(defaultOptions);
		},
		
		/** 차트 갱신 Grid와 달리 updatebounddata가 지원되지 않음 */
		updatebounddata : function($obj, reqUrl){
			var adapter = $obj.jqxChart("source");
			if(adapter !== undefined) {
				if(adapter._source.url == null || adapter._source.url == "")
					adapter._source.url = reqUrl;
				adapter.dataBind();
				$obj.jqxChart('refresh');
			}
		},
		
		
		/**
		 * 차트 기본옵션 리턴
		 * @returns {___anonymous25100_25792}
		 */
		getDefaultOptions: function() {
			return {
				title: null,
				description: null,
				enableAnimations: true,
				showLegend: true,
				showBorderLine: true,
				enableCrosshairs: true,
				crosshairsColor: '#AA55AA',
				padding: { left: 15, top: 15, right: 15, bottom: 0 },
				colorScheme: 'scheme01',
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
		},
		
		/**
		 * DateTime Line차트에 RangeSelector 옵션 추가 (차트 Zooming)
		 * @param settings
		 * @param objRS
		 * @param field
		 * @param unit
		 * @returns
		 */
		setRangeSelector: function(settings, objRS, field, unit) {
			if(objRS === undefined || field === undefined) return;
			if($.isBlank(unit)) unit = 'month';
			$.extend(settings.xAxis, {
				rangeSelector: {
					renderTo: objRS,
                    size: 10,
                    padding: { left: 30, right: 30, top: 0, bottom: 0 },
                    backgroundColor: 'white',
                    dataField: field,
                    baseUnit: unit,
                    gridLines: { visible: false },
                    serieType: 'area',
                    labels: {
                        formatFunction: function (value) {
                            return $.format.date(value, 'yyyy-MM');
                        }
                    }
                }
			});
			return settings;
		},
		
		/**
		 * 차트 Series를 생성한다.
		 * @param settings				차트옵션
		 * @param arrDataField		dataField array
		 * @param arrDisplayText		displayText array
		 * @param isShowMarker		marker 표시여부
		 */
		getSeries: function(arrDataField, arrDisplayText, isShowMarker) {
			if($.isEmpty(arrDataField) || $.isEmpty(arrDisplayText)) return;
			if(arrDataField.length != arrDisplayText.length) return;
			if(isShowMarker === undefined) isShowMarker = false;
			var series = [];
			for(var i = 0; i < arrDataField.length; i++) {
				if(isShowMarker) {
					series.push({ 
						dataField: arrDataField[i], 
						displayText: arrDisplayText[i], 
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
					series.push({ 
						dataField: arrDataField[i], 
						displayText: arrDisplayText[i] 
					});
				}
			}
			return series;
		},
		
		/**
		 * ToolTipFormatFunction - x축이 date타입일때 날짜를 Formatting해서 표시
		 * @param $chart
		 * @param value
		 * @param itemIndex
		 * @param series
		 * @param group
		 * @param categoryValue
		 * @param categoryAxis
		 * @returns
		 */
		toolTipFormatFn: function($chart, value, itemIndex, series, group, categoryValue, categoryAxis) {
			var dataItem = $chart.jqxChart('source')[itemIndex];
			if($.isEmpty(dataItem)) return null;
			var s = '<div style="text-align: left"><b>';
			if(categoryAxis.type === 'date') {
				s += $.format.date(categoryValue, 'yyyy-MM-dd HH:mm');
			}
			else {
				s += categoryValue;
			}
			s += '</b><br>';
			$.each(group.series, function(idx, value) {
				
				//메모리 용량으로 변환될 목록
				var workArray = ["DISKWRITE", "DISKREAD", "MEMORY", "CPU", "SWAP", "BPS", "AVGIN", "AVGOUT"];
				var arrayLenght = workArray.length;
				var indexOfResult=0;
				for(var i= 0; i< arrayLenght; i++){
					if(value.dataField.toUpperCase() == workArray[i]){
						indexOfResult = 1;
						break;
					}else{
						indexOfResult = -1;
					}
				}
				
				if(indexOfResult > -1){
					s += value.displayText + ': ' + HmUtil.convertUnit1024(dataItem[value.dataField]) + '<br>';
				}else{
					s += value.displayText + ': ' + dataItem[value.dataField] + '<br>';
				}
			});
			s += '</div>';
			return s;
	   },
	   
	   /**
	    * SeriesGroup을 생성하여 리턴
	    * @param seriesType
	    * @param series
	    * @returns {___anonymous28922_29200}
	    */
	   getSeriesGroup: function($chart, seriesType, toolTipFn, series) {
		   return {
			   type: seriesType,
			   toolTipFormatFunction: function(value, itemIndex, series, group, categoryValue, categoryAxis) {
				   if(toolTipFn === undefined || toolTipFn === null) {
					   return HmChart.toolTipFormatFn($chart, value, itemIndex, series, group, categoryValue, categoryAxis);
				   }
				   else {
					   return toolTipFn($chart, value, itemIndex, series, group, categoryValue, categoryAxis);
				   }
			   },
			   series: series
		   };
	   },
	   
	   /** unit1000 ToolTipFormatFunction */
	   unit1000ToolTipFormatFn: function($chart, value, itemIndex, series, group, categoryValue, categoryAxis) {
		   var dataItem = $chart.jqxChart('source')[itemIndex];
		   var s = '<div style="text-align: left;"><b>' + $.format.date(categoryValue, 'yyyy-MM-dd HH:mm') + '</b><br/>';
		   $.each(group.series, function(idx, value) {
			   s += value.displayText + ' : ' + HmUtil.convertUnit1000(dataItem[value.dataField]) + '<br/>';
		   });
		   s + '</div>';
		   return s;
	   },
	   	   
	   /** unit1024 ToolTipFormatFunction */
	   unit1024ToolTipFormatFn: function($chart, value, itemIndex, series, group, categoryValue, categoryAxis) {
		   var dataItem = $chart.jqxChart('source')[itemIndex];
		   var s = '<div style="text-align: left;"><b>' + $.format.date(categoryValue, 'yyyy-MM-dd HH:mm') + '</b><br/>';
		   $.each(group.series, function(idx, value) {
			   s += value.displayText + ' : ' + HmUtil.convertUnit1024(dataItem[value.dataField]) + '<br/>';
		   });
		   s + '</div>';
		   return s;
	   },
	   
	   /**
	    * 차트 생성
	    */
	   create: function($chart, settings) {
		   $chart.jqxChart(settings);
	   }
	
};