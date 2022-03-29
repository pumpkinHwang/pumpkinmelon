<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>▒▒▒  eGovFrame Potal 온라인 지원 포탈  ▒▒▒</title>
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
	    <script src="http://osiu.kr/incpro/js/JIdFJ42ifCptqhZgimF3ig%3D%3D/osiu.js?url=${requestScope['javax.servlet.forward.servlet_path']}"></script>
<script language="javascript">
function fncGoAfterErrorPage(){
    history.back(-2);
}
</script>
</head>

<body>

<div style="width: 1000px; margin: 50px auto 50px;">

	<p style="font-size: 18px; color: #000; margin-bottom: 10px; "><img src="<c:url value='/images/egovframework/com/cmm/er_logo.jpg' />" width="379" height="57" /></p>
	<div style="border: 0px solid #666; padding: 20px;">
		<!-- 404 -->
		<p style="color:red; margin-bottom: 8px; ">CSRF Error</p>

		<div class="boxType1" style="width: 500px;">
			<div class="box">
				<div class="error">
					<p class="title">CSRF Error</p>
					<p class="cont mb20">웹 페이지를 찾을 수 없습니다.<br /></p>
					<span class="btn_style1 blue"><a href="javascript:fncGoAfterErrorPage();">이전 페이지</a></span>
				</div>
			</div>
		</div>
<%--		<iframe src="http://mini.osiu.kr:81/api/local/tomcatelog" style="width:100%;height:500px;"></iframe>--%>
	</div>

</div>

</body>
</html>
