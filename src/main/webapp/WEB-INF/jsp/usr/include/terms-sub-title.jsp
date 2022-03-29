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
            </p>
        </div>
    </div>
</div>

<script type="text/javascript">
var menuUrl = document.location.href.replace(/^.*\/\/[^\/]+/, '')

var locationTitle = '';
if (menuUrl.indexOf('termsPrivacy') != -1) {
	locationTitle = '개인정보 취급방침';
}else if(menuUrl.indexOf('termsUse') != -1){
	locationTitle = '이용약관';
}

$(".location-title").text(locationTitle);
$(".location-list").find("span:eq(1)").text(locationTitle);
	
</script>
