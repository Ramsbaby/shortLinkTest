<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<title>SHORT_LINK_TEST_v0.0.1</title>
<%@include file="/inc/inc.jsp" %>
<script src="${pageContext.request.contextPath}/js/main.js"></script>
<style>
    #prgrsBar > div > span {
        left: 0px !important;
    }
</style>
<body>
<div id="header">
    <%@include file="/inc/header.jsp" %>
</div>
<div id="nav">
    <%@include file="/inc/nav.jsp" %>
</div>
<form id="mainForm" name="mainForm">
    <div id="section">
        <div id="loc">
            <%@include file="/inc/loc.jsp" %>
        </div>
        <div class="content">
            <div class="contentsP10" style="top: 0">
                <div id="mainSplitter">
                    <div >
                        <div id="jqxPanel" style="margin: auto">
                            <div style="margin-left: 10px; margin-right: 10px">
                                <h3>   URL : </h3>
                                <input type="text" id="inputUrl" />
                                <button id="notiBtn" type="button" style="margin-top: 5px" >링크 축약하기</button>
                            </div>
                        </div>

                    </div>
                    <div>
                        <div id="urlGrid">
                        </div>
                        <div id="container" style="width: 100%; height: 400px; margin-top: 15px; background-color: #F2F2F2;
                               border: 1px dashed #AAAAAA; overflow: auto;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
</body>
</html>