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
        //전체 스플리터 디자인
        $('#mainSplitter').jqxSplitter({ width: '100%', height: '100%', orientation: 'vertical', theme: jqxTheme, panels: [{ size: '70%', collapsible: false }, { size: '30%' }] });
        $('#subSplitter').jqxSplitter({ width: '100%', height: '100%', orientation: 'vertical', theme: jqxTheme, panels: [{ size: '40%', collapsible: false }, { size: '60%' }] });

        //좌측 영역 디자인(인풋영역)
        $("#jqxPanel").jqxPanel({ width: 350, height: 350});
        $('#inputUrl').jqxInput({width: '100%', height:21});
        $("#notiBtn").jqxButton();

        //가운데 영역 디자인(아웃풋 그리드 영역)
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


        //우측 영역 디자인(아웃풋 차트 영역)
        var settings = MyChart.getCommOptions(MyChart.T_PIE, MyChart.XUNIT_HOUR);
        $.extend(settings, {
            seriesGroups: [
                MyChart.getSeriesGroup($('#chartContainer'), MyChart.T_PIE, null,
                    MyChart.getSeries(
                        [ 'CNT' ],
                        [ 'ORIGINAL_URL' ],
                        false
                    )
                )
            ]
        });
        MyChart.create($('#chartContainer'), settings);
    },

    /** init data */
    initData: function() {
        Main.searchGrid();
    },

    /*=======================================================================================
    버튼 이벤트 처리
    ========================================================================================*/
    //엔터 및 '링크 축약하기' 버튼 눌렀을 때 이벤트
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
                //저장된 데이터 바탕으로 다시 grid 및 차트 조회
                Main.searchGrid();
            }
        });

    },

    //최초 로딩 시 DB에서 데이터 가져와 그리드, 차트에 데이터 넣는 이벤트
    searchGrid: function() {

        Server.get('/shortLink/getSearchHistoryList.do', {
            data: null,
            success: function(result) {
                //그리드 데이터 바인딩
                MyGrid.setLocalData($("#urlGrid"), result.resultData);

                //파이차트 데이터 바인딩
                $('#chartContainer').jqxChart({ source: result.resultData });
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