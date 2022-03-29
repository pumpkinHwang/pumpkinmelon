<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@include file="/WEB-INF/jsp/cmm/_header.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Error</title>
</head>

<body>
    <spring:message code='fail.common.msg' />
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
<%--    <iframe src="http://mini.osiu.kr:81/api/local/tomcatelog" style="width:100%;height:500px;"></iframe>--%>
<script>
    var jsonk = $.parseJSON('<c:out escapeXml="false" value="${jsonMap.writeValueAsString(listk)}"/>')
    var jsonv = $.parseJSON('<c:out value="${jsonMap.writeValueAsString(listv)}"/>')
</script>

</body>
</html>
