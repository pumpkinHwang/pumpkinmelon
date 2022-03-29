<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"   uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<div class="location-wrap">
    <div class="inner">
        <h2 class="location-title"></h2>
        <div class="location-list">
            <p class="ellipsis">
            	<span>Home</span>
                <i class="ico-loction"></i>
                <span></span>
                <i class="ico-loction"></i>
                <span></span>
            </p>
        </div>
    </div>
</div>

<script type="text/javascript">
var menuUrl = document.location.href;
menuUrl = menuUrl.replace(/^.*\/\/[^\/]+/, '');
menuUrl = menuUrl.substring(0,menuUrl.lastIndexOf('/'));

var arr = new Array();
<c:forEach items="${menuSubCategoryList }" var="menuSubCategoryList">
var menuSubCategoryList_menuUrl = "${menuSubCategoryList.menuUrl}";
menuSubCategoryList_menuUrl = menuSubCategoryList_menuUrl.substring(0,menuSubCategoryList_menuUrl.lastIndexOf('/'));
if(menuUrl == menuSubCategoryList_menuUrl){
	var locationTitle = "${menuSubCategoryList.menuCodeName}";
	$(".location-title").text(locationTitle);

	var cate1 = "${menuSubCategoryList.menuCategoryName}";
	$(".location-list").find("span:eq(1)").text(cate1);
	$(".location-list").find("span:eq(2)").text(locationTitle);
}
</c:forEach>


if(menuUrl=='/search/integrateSearch'){
	$(".location-title").text('통합검색');
	$(".location-list").find("span:eq(1)").text('통합검색');
	$(".location-list").find("span:eq(2)").text('통합검색');
}
</script>
