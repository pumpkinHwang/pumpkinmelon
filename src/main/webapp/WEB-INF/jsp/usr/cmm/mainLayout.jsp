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
    <body id="main" class="main">
        <div class="wrap">
            <div class="skip">
                <a href="#container">본문 바로가기</a>
            </div>
            <header id="header">
                <div class="inner">
                    <h1 class="header-logo">
                        <a href="/main"><span class="blind">PUMPKIN HWANG</span></a>
                    </h1>
                    <tiles:insertAttribute name="menu" />
                    <tiles:insertAttribute name="sidebar" />
                </div>
            </header>

            <main id="container">
                <tiles:insertAttribute name="content"/>
            </main>

            <tiles:insertAttribute name="footer" />

        </div>
    </body>
</html>