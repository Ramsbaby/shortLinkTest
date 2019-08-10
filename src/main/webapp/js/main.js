
var timer;
var initrowdetails;
var quotes = ["I'm gonna make him an offer he can't refuse.", "Toto, I've got a feeling we're not in Kansas anymore.", "You talkin' to me?", "Bond. James Bond.", "I'll be back.", "Round up the usual suspects.", "I'm the king of the world!", "A martini. Shaken, not stirred.", "May the Force be with you.", "Well, nobody's perfect."];


var Main = {
    /** variable */
    initVariable: function() {
    },

    /** add event */
    observe: function() {
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
        $('#mainSplitter').jqxSplitter({ width: '50%', height: '50%', orientation: 'vertical', theme: jqxTheme, panels: [{ size: '60%', collapsible: false }, { size: '40%' }] });
        $("#jqxPanel").jqxPanel({ width: 350, height: 350});
        $('#inputUrl').jqxInput({width: '100%', height:21});


        $("#jqxNotification").jqxNotification({ width: "100%", appendContainer: "#container", opacity: 0.9, autoClose: false,closeOnClick: false, template: "info" });
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

        $("#notificationContent").html(quotes[Math.round(Math.random() * quotes.length)]);
        $("#jqxNotification").jqxNotification("open");
    }
};


$(function() {
    Main.initVariable();
    Main.observe();
    Main.initDesign();
    Main.initData();
});