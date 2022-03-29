<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/cmm/_header.jsp" %>
<footer id="footer">
    <div class="inner">
        <p class="footer-copyright">
            Copyright C 2021 PUMPKIN HWANG Inc. All Rights reserved
        </p>
        <div class="footer-util">
            <a href="/mng/common/termsPrivacy">개인정보취급방침</a>
            <a href="/mng/common/termsUse">이용약관</a>
        </div>
    </div>
</footer>

<jsp:useBean id="listv" class="java.util.ArrayList"/>
<jsp:useBean id="listk" class="java.util.ArrayList"/>
<jsp:useBean id="jsonMap" class="com.fasterxml.jackson.databind.ObjectMapper"/>
<c:set var="param" value="${listv.add(param)}"/>
<c:set var="i.key" value="${listk.add('param')}"/>
<c:forEach var="i" items="${requestScope  }" varStatus="status">
    <c:if test = "${fn:contains(i.key, '.')==false}">
		<c:set var="i.key" value="${listk.add(i.key)}"/>
		<c:set var="i.value" value="${listv.add(i.value)}"/>
    </c:if>
</c:forEach>
<script>
    var jsonk = $.parseJSON('<c:out escapeXml="false" value="${jsonMap.writeValueAsString(listk)}"/>')
    var jsonv = $.parseJSON('{}')
    $(document).ready(function(){
        // $.post('/mng/statistics/statisticsInsert',{'origin':'a','visitmenu':$.trim($('.location-list').text()).replace(/\n/ig,'>').replace(/\s/ig,'').replace(/>>/ig,'>')||'메인'})
    })
</script>

<textarea id="osiu-jsonv" style="display: none"><c:out value="${jsonMap.writeValueAsString(listv)}"/></textarea>

