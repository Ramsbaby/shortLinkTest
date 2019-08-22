var MyUtil = {
		/** window.open() 팝업 */
		showPopup: function(url, frm, popNm, popW, popH) {
			var host = location.hostname.replace(/\./g, '_');
			popNm = popNm + host;
			var opts = [];
			opts.push('width=' + popW);
			opts.push('height=' + popH);
			opts.push('left=' + parseInt((screen.availWidth / 2) - (popW / 2)));
			opts.push('top=' + parseInt((screen.availHeight / 2) - (popH / 2)));
			opts.push('resizable=yes');
			opts.push('scrollbars=yes');
			opts.push('status=no');

			var win = window.open('', popNm, opts.join(','));
			if(win!=null && !win.closed)
				win.focus();
			frm.attr('method', 'POST');
			frm.attr('target', popNm);
			frm.attr('action', ctxPath + url);
			frm.submit();
			frm.empty();
			return win;
		},

		createPopup: function(url, frm, popNm, popW, popH, params) {
			frm.empty();
			if(params !== undefined) {
				$.each(params, function(key, value) {
					$('<input />', { type: 'hidden', id: key, name: key, value: value }).appendTo(frm);
				});
			}
			return this.showPopup(url, frm, popNm, popW, popH);
		},

		/**
		 * Object 복제
		 * @param obj
		 * @returns
		 */
		clone: function(obj) {
			if(obj == null || typeof(obj) != 'object') return obj;
			var newObj = obj.constructor();
			for(var key in obj) {
				if(obj.hasOwnProperty(key)) {
					newObj[key] = MyUtil.clone(obj[key]);
				}
			}
			return newObj;
		},

		/**
		 * 글자를 원하는 카운트로 잘라서 리턴한다.
		 * @param value
		 * @param charCnt
		 * @returns
		 */
		substr: function(value, charCnt) {
			if(value === null || value.isBlank()) return "";
			if(value.length > charCnt) {
				return value.substring(0, charCnt) + '...';
			}
			else {
				return value;
			}
		},
		/** unit1000 */
        convertTimestampToDate: function (row, column, value,value2,value3,value4) {

            value = MyUtil.setTimestampToDate(value);

			var cell = '<div style="text-align: center; overflow: hidden; padding-bottom: 2px; margin-top: 4px; margin-right: 5px; margin-left: 4px; -ms-text-overflow: ellipsis;" >';
			cell +=  value.getFullYear() + '-' + (value.getMonth()+1.0) + '-' + value.getDate() + ' ' + value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
			cell += '</div>';
			return cell;
		},
		/** unit1000 */
		setHyperlink: function (row, column, value,value2,value3,value4) {
			var cell = '<div style="text-align: left; overflow: hidden; padding-bottom: 2px; margin-top: 4px; margin-right: 5px; margin-left: 4px; -ms-text-overflow: ellipsis;" >'
			var realUrl = value4.SHORT_URL;

			if(value4.ORIGINAL_URL.indexOf(location.hostname) == -1)
                realUrl = value4.ORIGINAL_URL;

			cell += '<a href="'+ (realUrl)+'"/>';
			cell += value;
			cell += '</div>';
			return cell;
		},


        /** 크로스 브라우징 방지 */
        setTimestampToDate: function (date){
        	if(typeof date != 'string') return;
            date = date.split(".")[0];
            var ieDate = date.split("T")[0] +' '+ date.split("T")[1];

            //크로스 브라우징 (IE에서 new date 했을 경우 invalid date 뜨는 에러 막기 위해서)
            var arr, dsDate;
            arr  = ieDate.split('-');
            dsDate = new Date(arr[0] + "/" + arr[1] + "/" + arr[2] +'Z');
            date = dsDate;

            date = new Date(Date.parse(date));

            return date;
        }

};

/** ajax call */
var Server = (function() {
	return {
		post: function(url, params) {
			Server.ajax(url, 'post', params);
		},
		get: function(url, params) {
			Server.ajax(url, 'get', params);
		},
		ajax: function(url, method, params) {
			var ajaxOpts = {
					type: method.toUpperCase(),
					url: url,
					dataType: 'json',
					success: function(data, status) {
//						if($('body').hasClass('wait')) $('body').removeClass('wait');
						if(data.hasError) {
							if(params.error !== undefined) {
								params.error(data);
							}
							else {
                                alert(data.errorInfo.message);
							}
							return;
						}
						if(params.success !== undefined) {
							params.success(data.resultData, this.data);
						}
					},
					error: function(xhr) {
						if(params.error !== undefined) {
							params.error(xhr);
						}else{
							alert('처리 중 에러가 발생하였습니다.');
						}
					}
			};
			if(method === 'post') {
				try {
					if(params.data) ajaxOpts.data = JSON.stringify(params.data);
					var o = params.data;
					if(o && typeof o === 'object' && o !== null) {
						ajaxOpts.contentType = 'application/json; charset=utf-8';
					}
				} catch(e) {}
			}
			else {
				if(params.data) ajaxOpts.data = params.data;
			}
			$.ajax($.extend(ajaxOpts, params.options));
		}
	};
})();

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


/** jQuery extends */
$.extend({
    /** null check */
    isBlank: function (val) {
        var tmp = $.trim(val);
        if (tmp !== undefined && tmp != null && tmp.length > 0)
            return false;
        else
            return true;
    },

    isEmpty: function (obj) {
        if (obj !== undefined && obj != null)
            return false;
        else
            return true;
    }
});
