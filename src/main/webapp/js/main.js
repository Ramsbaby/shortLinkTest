var timer;
var initrowdetails;

//http:// 포함인지 아닌지 check
var pattern = /^((http(s?))\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;

var Main = {
    /** variable */
    initVariable: function() {
    },

    /** add event */
    observe: function() {
        $('#inputUrl').on('keypress', function(event) { if(event.keyCode == 13) {Main.search(); return false;} return; });
        $('button').bind('click', function(event) { Main.eventControl(event); });
    },

    /** event handler */
    eventControl: function(event) {
        var curTarget = event.currentTarget;
        switch(curTarget.id) {
            case "notiBtn": this.search(); break;
        }
    },

    /** init design */
    initDesign: function() {
        $('#mainSplitter').jqxSplitter({ width: '100%', height: '100%', orientation: 'vertical', theme: jqxTheme, panels: [{ size: '70%', collapsible: false }, { size: '30%' }] });
        $('#subSplitter').jqxSplitter({ width: '100%', height: '100%', orientation: 'vertical', theme: jqxTheme, panels: [{ size: '40%', collapsible: false }, { size: '60%' }] });
        $("#jqxPanel").jqxPanel({ width: 350, height: 350});
        $('#inputUrl').jqxInput({width: '100%', height:21});


        MyGrid.create($("#urlGrid"), {
            source: new $.jqx.dataAdapter(
                {datatype: 'json'},
                {formatData: function(data) {return data;}}
            ),
            width:'100%',
            height:'99%',
            filterable: false,
            showfilterrow: false,
            pageable:false,
            editable: false,
            columns:
                [
                    { text : 'ID', datafield : 'ID', width : 100 , columntype: 'custom', hidden:true},
                    { text : '검색 일시', datafield : 'REGDATE', minwidth : 100 , cellsrenderer: MyUtil.convertTimestampToDate},
                    { text : 'Original URL', datafield : 'ORIGINAL_URL', width : 250 },
                    { text : 'Shortening URL', datafield : 'SHORT_URL', width : 250 , cellsrenderer: MyUtil.setHyperlink},
                    { text : '카운트', datafield : 'CNT', width : 60 , cellsalign:'center'}
                ]
        });

        $("#notiBtn").jqxButton();
        $("#notiBtn").click(function () {
        });


        var settings = MyChart2.getCommOptions(MyChart2.T_PIE, MyChart2.XUNIT_HOUR);
        $.extend(settings, {
            seriesGroups: [
                MyChart2.getSeriesGroup($('#chartContainer'), MyChart2.T_PIE, null,
                    MyChart2.getSeries(
                        [ 'CNT' ],
                        [ 'ORIGINAL_URL' ],
                        false
                    )
                )
            ]
        });
        MyChart2.create($('#chartContainer'), settings);
        // setup the chart
        // $('#chartContainer').jqxChart(settings);
    },

    /** init data */
    initData: function() {
        Main.searchGrid();
    },

    /*=======================================================================================
    버튼 이벤트 처리
    ========================================================================================*/


    search: function() {
        var flag;
        var re = new RegExp("^http","i");
        re.test($('#inputUrl').val())?flag=true:flag=false;

        if(!flag)
        {//프로토콜 명세 없이 domain만 입력한 경우
            $('#inputUrl').val('http://' + $('#inputUrl').val());
        }

        Server.get('/shortLink/getUrlToShortLink.do', {
            data: {originalUrl : $('#inputUrl').val(), protocolHostname : location.protocol + '//' + location.hostname + '/'},
            success: function(data) {
                var list = [];

                if(data.original_url.indexOf('.') == -1)
                {//62진수에 포함되지 않는 .이 없을 경우 shortening url로 간주 -> shortening url에 original url이 할당되어 있음..
                    data.original_url = data.short_url;
                }
                else
                {//.이 포함될 경우 62진수에 포함되지 않는 url이므로 original url로 간주 -> original url에 original url이 할당되어 있음..
                    data.original_url = data.original_url;
                }

                // list.push({ REGDATE: data.regdate, ORIGINAL_URL: data.original_url, SHORT_URL: data.short_url});
                Main.searchGrid();
            }
        });

    },

    searchGrid: function() {
        $.ajax({
            url: "/shortLink/getSearchHistoryList.do",
            data: '',
            beforeSend: function () {},
            success: function (res) {
                //그리드 데이터 바인딩
                MyGrid.setLocalData($("#urlGrid"), res.resultData.resultData);

                //파이차트 데이터 바인딩
                $('#chartContainer').jqxChart({ source: res.resultData.resultData });
                $('#chartContainer').jqxChart('update');
            }
        });
    }
};


$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});