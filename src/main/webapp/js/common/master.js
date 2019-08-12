var jqxTheme = 'ui-book', ctxPath = '';

$(function() {
	Master.initVariable();
	Master.observe();
	Master.initDesign();
	Master.initData();
});

var Master = {

	initVariable: function() {
		ctxPath = $('#ctxPath').val();
	},
		
	observe: function() {
		$('#btnLogout').bind('click', function(event) { Master.prcsLogout(); });
	},
	
	initDesign: function() {
		$.ajaxSetup({ cache: false });
		
		//메뉴생성
		if($('#mega-menu') !== undefined) {
			$('#mega-menu').dcMegaMenu({ rowItems: '6',
				beforeOpen: function() { 
					$('#mega-menu').css('z-index', 9999999);
				},
                onLoad: function() {
                    $('#mega-menu').css('visibility', 'visible');
				}
			});
		}
	},
	
	initData: function() {
		Master.setLoc();
		document.title = "SHORT_LINK_TEST_v0.0.1";
		Master.setCommInit();
	},

	
	// 공통초기화 (이미지, 버튼 등등)
	setCommInit: function() {
		try {
			var pwin = $('#pwindow');
			if(pwin.length == 0) {
				pwin = $('<div id="pwindow" style="position: absolute;"></div>');
				pwin.append($('<div></div>'));
				pwin.append($('<div></div>'));
				$('body').append(pwin);
			}
		} catch(e) {}
	},

    // location 영역 설정
    setLoc: function(event) {
    	var urlPath = window.location.pathname;
    	$('#mega-menu li.level-1 a').each(function() {
        	var href = $(this).attr('href');
        	if(urlPath == href) {
        		var menu = $(this).text();
        		$('#navMenuNm, #navPageMenu').text(menu);
        	}
        });
    },

    /** 
     * 로그아웃 처리
     */
    prcsLogout: function() {
    	if(!confirm("로그아웃 하시겠습니까?")) return;
    	$('#hForm').attr({
    		method: 'post',
    		action: ctxPath + '/login/prcsLogout.do',
    		target: '_self'
    	}).submit();
    },

	enumBookTargetField: function () {
		var field = [
			{label:"전체", value:"all"},
            {label:"제목", value:"title"},
            {label:"ISBN", value:"isbn"},
            {label:"주제어", value:"keyword"},
            {label:"목차", value:"contents"},
            {label:"책소개", value:"overview"},
            {label:"출판사", value:"publisher"}];

		return field;
    }
};