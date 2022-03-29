<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="org.springframework.web.context.WebApplicationContext" %>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils" %>
<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui"  uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<!DOCTYPE html>
<html lang="ko">
	<tiles:insertAttribute name="header" />
	<body>
		<div class="wrap">
			<div class="skip">
				<a href="#container">본문 바로가기</a>
			</div>
			<header id="header" > <!-- 메인 타입 컨펌 전이라 아직 -->
				<div class="inner">
					<h1 class="header-logo">
				        <a href="/main"><span class="blind">PUMPKIN HWANG</span></a>
				    </h1>
					<tiles:insertAttribute name="menu" />
					<tiles:insertAttribute name="sidebar" />
				</div>
			</header>
			<!-- location -->
			<tiles:insertAttribute name="sub-title"/>
			<!-- //location -->
			<section id="container">
				<section class="contents terms">
					<tiles:insertAttribute name="content"/>
				</section>
			</section>
			<tiles:insertAttribute name="footer" />
		</div>
	</body>
</html>
