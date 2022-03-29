<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<c:set var="pageTitle"><spring:message code="comCmmErr.runtimeException.code"/></c:set><!-- 시스템 에러 -->
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title><spring:message code="title.html"/></title>
<link href="<c:url value='/css/egovframework/com/com.css' />" rel="stylesheet" type="text/css" />
	    <link rel="stylesheet" type="text/css" href="/css/style.css">
		<link rel="stylesheet" type="text/css" href="/css/incpro/osiu.css"/>
	    <link rel="shortcut icon" type="image/x-icon" href="/img/common/favicon.ico">
		<link href="<c:url value='/css/egovframework/com/com.css' />" rel="stylesheet" type="text/css" />
	    <script type="text/javascript" src="/js/vendor/jquery-3.6.0.min.js"></script>
	    <script type="text/javascript" src="/js/vendor/library.js"></script>
	    <script type="text/javascript" src="/js/ui.js"></script>

        <script type="text/javascript" src="/js/jquery-3.4.1.min.js"></script>
	    <script type="text/javascript" src="/js/commonFn.js"></script>

	    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	    <script src="/js/incpro/osiu.js"></script>
<script language="javascript">
function fncGoAfterErrorPage(){
    history.back(-2);
}
</script>
</head>
<body>
<div style="width: 1000px; margin: 50px auto 50px;">
	<p style="font-size: 18px; color: #000; margin-bottom: 10px; "><img src="<c:url value='/images/egovframework/com/cmm/er_logo.jpg' />" width="379" height="57" /></p>
	<div style="border: ppx solid #666; padding: 20px;">

		<p style="color:red; margin-bottom: 8px; ">${pageTitle}<br /></p>

		<div class="boxType1" style="width: 700px;">
			<div class="box">
				<div class="error">
					<p class="title"><spring:message code="comCmmErr.runtimeException.title" /></p><!-- 알 수 없는 오류가 발생했습니다! -->
					<p class="cont mb20">${pageTitle}<br /></p>
					<span class="btn_style1 blue"><a href="javascript:fncGoAfterErrorPage();"><spring:message code="comCmmErr.button" /><!-- 이전 페이지 --></a></span>
				</div>
			</div>
		</div>
	</div>
</div>

</body>
</html>
