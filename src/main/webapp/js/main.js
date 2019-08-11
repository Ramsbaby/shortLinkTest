
var timer;
var initrowdetails;
var quotes = ["I'm gonna make him an offer he can't refuse.", "Toto, I've got a feeling we're not in Kansas anymore.", "You talkin' to me?", "Bond. James Bond.", "I'll be back.", "Round up the usual suspects.", "I'm the king of the world!", "A martini. Shaken, not stirred.", "May the Force be with you.", "Well, nobody's perfect."];

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
        $('#mainSplitter').jqxSplitter({ width: '60%', height: '50%', orientation: 'vertical', theme: jqxTheme, panels: [{ size: '40%', collapsible: false }, { size: '60%' }] });
        $("#jqxPanel").jqxPanel({ width: 350, height: 350});
        $('#inputUrl').jqxInput({width: '100%', height:21});


        MyGrid.create($("#urlGrid"), {
            source: new $.jqx.dataAdapter(
                {datatype: 'json',},
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
                    { text : 'ID', datafield : 'id', width : 150 , columntype: 'custom', hidden:true},
                    { text : '검색 일시', datafield : 'regdate', minwidth : 100 , editable:false},
                    { text : 'Original URL', datafield : 'original_url', width : 250 , editable:true},
                    { text : 'Shortening URL', datafield : 'short_url', width : 250 , cellsrenderer: MyUtil.setHyperlink,  editable:true}
                ]
        });

        $("#notiBtn").jqxButton();
        $("#notiBtn").click(function () {
        });
    },

    /** init data */
    initData: function() {
    },

    /*=======================================================================================
    버튼 이벤트 처리
    ========================================================================================*/


    search: function() {
        var flag;
        var re = new RegExp("^http://","i");
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

                list.push({ regdate: data.regdate, original_url: data.original_url, short_url: data.short_url});
                $("#urlGrid").jqxGrid('addrow', null, list);
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