var MyGrid = {
		/** get jqxGrid default options */
		getDefaultOptions : function($grid) {
			return {
				width : "99.8%",
				height : "99.8%",
				autoheight : false,		/* loading slow */
				autorowheight: false,		/* loading slow */
				theme : jqxTheme,
				pageable : true,
				pagermode: 'simple',
				columnsresize : true,
				showstatusbar : false,
				selectionmode : "singlerow",
				enabletooltips : true,
				columnsheight: 26,
				rowsheight: 22,
				filterrowheight: 30,
				toolbarheight : 30,
				sortable : true,
				altrows: false,
//				filterable: true,  				/* loading slow */
				enablebrowserselection : true,
				showpinnedcolumnbackground: false,
				showsortcolumnbackground : false,
				pagesize : 1000,
				pagesizeoptions : [ "1000", "5000", "10000" ],
				localization : getLocalization('kr')
//				pagerrenderer : this.pagerrenderer
//				ready: function() {
//					$grid.jqxGrid({ filterable: true });
//				}
			};
		},

		/** create jqxGrid */
		create : function($grid, options, ctxmenuType, ctxmenuIdx) {
			var defOpts = this.getDefaultOptions($grid);
			// 그리드 헤더텍스트 정렬을 center로.. 처리
			try {
				$.each(options.columns, function(idx, value) {
					value.align = 'center';
				});
			} catch(e) {}
			$.extend(defOpts, options);
			$grid.jqxGrid(defOpts);
		},

		/** data refresh */
		updateBoundData : function($grid, reqUrl) {
			$grid.jqxGrid("clearselection");
			var adapter = $grid.jqxGrid("source");
			if(adapter !== undefined) {
				if(adapter._source.url == null || adapter._source.url == "")
					adapter._source.url = reqUrl;

				if($grid.jqxGrid('filterable')) {
					$grid.jqxGrid("updatebounddata", "filter");
				}
                else if($grid.jqxGrid('groupable')) {
                    $grid.jqxGrid("updatebounddata", "data");
                }
				else {
					$grid.jqxGrid("updatebounddata");
				}

				// 상태바 표시상태일때 높이조절
				if($grid.jqxGrid("showstatusbar") == true) {
					var gridId = $grid.attr("id");
					setTimeout('MyGrid.setStatusbarHeight("' + gridId + '")', 500);
				}
			}
		},

		setLocalData: function($grid, data) {
			$grid.jqxGrid('source')._source.localdata = data;
			$grid.jqxGrid('updateBoundData');
		}

};