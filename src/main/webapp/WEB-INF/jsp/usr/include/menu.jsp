<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<div class="nav-toggle">
    <div class="hamburger">
        <span class="blind">모바일 네비게이션 영역</span>
    </div>
</div>
<nav id="nav" class="nav" >
    <div class="nav-wrap">
    	<p class="info-user">
           <span>${loginVO.name}</span>님<br>안녕하세요.
       </p>
       <div class="header-util">
	         <div class="btn-search-view search1">
	             <button type="button" class="btn-search">통합검색</button>
	         </div>
	         <div class="btn-search-view search2">
	             <button type="button" class="btn-qsearch" onclick="location.href='/search/quickSearch/quickSearchList'">퀵서치</button>
	         </div>
     	</div>
        <ul class="nav-menu">
            <li>
                <a href="#!" title="서비스">서비스</a>
                <ul class="sub-menu">
                    <li>
                        <a href="/service/partsCatalog/partsCatalogList">부품 매뉴얼</a>
                    </li>
                    <li>
                        <a href="/service/manual/manualList">매뉴얼</a>
                    </li>
                    <li>
                        <a href="/service/techShare/techShareList">기술정보 공유</a>
                    </li>
                    <li>
                        <a href="/service/video/videoList">동영상</a>
                    </li>
                    <li>
                        <a href="/service/firmware/firmwareList">펌웨어 공유</a>
                    </li>
                    <li>
                        <a href="/service/errorCode/errorCodeList">에러코드</a>
                    </li>
                    <li>
                        <a href="/service/learningMaterial/learningMaterialList">학습자료</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#!" title="솔루션">솔루션</a>
                <ul class="sub-menu">
                    <li>
                        <a href="/solution/installationfile/installationfileList">설치파일</a>
                    </li>
                    <li>
                        <a href="/solution/manuals/manualsList">매뉴얼</a>
                    </li>
                    <li>
                        <a href="/solution/techShare/techShareList">기술정보 공유</a>
                    </li>
                    <li>
                        <a href="/solution/video/videoList">동영상</a>
                    </li>
                    <li>
                        <a href="/solution/marketing/marketingList">마케팅 자료</a>
                    </li>
                    <li>
                        <a href="/solution/clientInstallInfo/clientInstallInfoList">고객사별 설치정보</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#!" title="영상/사진">영상/사진</a>
                <ul class="sub-menu">
                    <li>
                        <a href="/mpic/firmware/firmwareList">펌웨어/소프트웨어</a>
                    </li>
                    <li>
                        <a href="/mpic/manual/manualList">매뉴얼</a>
                    </li>
                    <li>
                        <a href="/mpic/techShare/techShareList">기술정보 공유</a>
                    </li>
                    <li>
                        <a href="/mpic/partsCatalog/partsCatalogList">부품 매뉴얼</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#!" class="mr90" title="지원요청">지원요청</a>
                <ul class="sub-menu">
                    <li>
                        <a href="https://c-lms.com/license/enduser/portal/LAInput.jsp" target="_blank">라이선스 발행</a>
                    </li>
                    <li>
                        <a href="/support/licenseRequest/licenseRequestList">라이선스 변경/재발행</a>
                    </li>
                    <li>
                        <a href="/support/techSupport/techSupportList">기술지원 신청</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#!" title="공지사항">커뮤니티</a>
                <ul class="sub-menu">
                    <li>
                        <a href="/notice/notice/noticeList">공지사항</a>
                    </li>
                    <li>
                        <a href="/board/free/freeList">자유게시판</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#!" title="자유게시판">직조직 커뮤니티</a>
                <ul class="sub-menu">
                    <li>
                        <a href="/direct/freeBoard/freeBoardList">자유게시판</a>
                    </li>
                    <li>
                        <a href="/direct/anonymousBoard/anonymousBoardList">익명게시판</a>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="nav__log-link">
            <a href="/usr/member/memberlogOut" class="logout">로그아웃</a>
            <a href="/usr/member/memberChangeForm" class="pw">개인정보변경</a>
        </div>
        <div class="nav-footer">
            <footer id="footer">
                <div class="inner">
                    <div class="footer-util">
                        <a href="/usr/common/termsPrivacy">개인정보취급방침</a>
                        <a href="/usr/common/termsUse">이용약관</a>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</nav>
