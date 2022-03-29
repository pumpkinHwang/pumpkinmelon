<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<div class="nav-toggle">
    <div class="hamburger">
        <span class="blind">모바일 네비게이션 영역</span>
    </div>
</div>
<nav id="nav" class="nav" >
    <div class="nav-wrap">
    	<p class="info-user">
           <span>${loginMngVO.name}</span>님<br>안녕하세요.
       </p>
       <div class="header-util">
           <div class="btn-search-view search1">
               <button type="button" class="btn-search">통합검색</button>
           </div>
           <div class="btn-search-view search2">
               <button type="button" class="btn-qsearch">퀵서치</button>
           </div>
       </div>
        <ul class="nav-menu">
        	<li>
                <a href="#!" title="시스템관리">시스템관리</a>
                <ul class="sub-menu">
                    <li>
                        <a href="/mng/authority/authority/authorityList">권한</a>
                    </li>
                    <li>
                        <a href="/mng/authority/menu/menuList">메뉴</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#!" title="계정관리">계정관리</a>
                <ul class="sub-menu">
                    <li>
                        <a href="/mng/member/UserMng/UserMngList">관리자</a>
                    </li>
                    <li>
                        <a href="/mng/member/User/UserList">사용자</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#!" title="서비스관리">서비스관리</a>
                <ul class="sub-menu">
                    <li>
                        <a href="/mng/service/partsCatalog/partsCatalogList">부품 매뉴얼</a>
                    </li>
                    <li>
                        <a href="/mng/service/manual/manualList">매뉴얼</a>
                    </li>
                    <li>
                        <a href="/mng/service/techShare/techShareList">기술정보 공유</a>
                    </li>
                    <li>
                        <a href="/mng/service/video/videoList">동영상</a>
                    </li>
                    <li>
                        <a href="/mng/service/firmware/firmwareList">펌웨어 공유</a>
                    </li>
                    <li>
                        <a href="/mng/service/errorCode/errorCodeList">에러코드</a>
                    </li>
                    <li>
                        <a href="/mng/service/learningMaterial/learningMaterialList">학습자료</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#!" title="솔루션관리">솔루션관리</a>
                <ul class="sub-menu">
                    <li>
                        <a href="/mng/solution/installationFile/installationFileList">설치파일</a>
                    </li>
                    <li>
                        <a href="/mng/solution/manual/manualList">매뉴얼</a>
                    </li>
                    <li>
                        <a href="/mng/solution/techShare/techShareList">기술정보 공유</a>
                    </li>
                    <li>
                        <a href="/mng/solution/video/videoList">동영상</a>
                    </li>
                    <li>
                        <a href="/mng/solution/marketing/marketingList">마케팅 자료</a>
                    </li>
                    <li>
                        <a href="/mng/solution/clientInstallInfo/clientInstallInfoList">고객사별 설치정보</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#!" title="영상/사진관리">영상/사진관리</a>
                <ul class="sub-menu">
                    <li>
                        <a href="/mng/mpic/firmware/firmwareList">펌웨어/소프트웨어</a>
                    </li>
                    <li>
                        <a href="/mng/mpic/manual/manualList">매뉴얼</a>
                    </li>
                    <li>
                        <a href="/mng/mpic/techShare/techShareList">기술정보 공유</a>
                    </li>
                    <li>
                        <a href="/mng/mpic/partsCatalog/partsCatalogList">부품 매뉴얼</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#!" class="mr90" title="지원요청관리">지원요청관리</a>
                <ul class="sub-menu">
                    <li>
                        <a href="/mng/support/licenseRequest/licenseRequestList">라이선스 변경/재발행</a>
                    </li>
                    <li>
                        <a href="/mng/support/techSupport/techSupportList">기술지원 신청</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#!" title="커뮤니티관리">커뮤니티관리</a>
                <ul class="sub-menu">
                    <li>
                        <a href="/mng/board/notice/noticeList">공지사항</a>
                    </li>
                    <li>
                        <a href="/mng/board/free/freeList">자유게시판</a>
                    </li>
                    <li>
                        <a href="/mng/board/directFree/directFreeList">직조직자유게시판</a>
                    </li>
                    <li>
                        <a href="/mng/board/directAnonymous/directAnonymousList">직조직익명게시판</a>
                    </li>
                </ul>
            </li>
            <li>
	            <a href="#!" title="통계/로그관리">통계/로그관리</a>
	            <ul class="sub-menu">
	                <li>
	                    <a href="/mng/statistics/statisticsList">통계관리</a>
	                </li>
	                <li>
	                    <a href="/mng/statistics/logMng/logMngList">로그관리</a>
	                </li>
	            </ul>
	        </li>
        </ul>
        <a href="#!" class="logout">로그아웃</a>
        <div class="nav-footer">
            <footer id="footer">
                <div class="inner">
                    <div class="footer-util">
                        <a href="/mng/common/termsPrivacy">개인정보취급방침</a>
                        <a href="/mng/common/termsUse">이용약관</a>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</nav>
