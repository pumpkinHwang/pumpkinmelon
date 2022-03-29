<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/cmm/_header.jsp" %>
<script type="text/javascript">

	$(document).ready(function () {

		//제품카테고리의 첫번째 콤보박스에 값이있을경우
		if($('#srchDepth1').val() != ''){
			fnSrchItemComboAjax('srchDepth1',depth1,'');
			//검색 vo에 두번째 카테고리 값이 있을 경우
			if(depth2 != ''){
				fnSrchItemComboAjax('srchDepth2',depth1,depth2);
			}
		}

		//제품카테고리 콤보박스가 변경되었을 경우
		$("#srchDepth1, #srchDepth2").on("change", function(){
			depth1 = '';
			depth2 = '';
			depth3 = '';
			var tagId = $(this).attr('id');
			var gubn = '';
			if(tagId=='srchDepth1'){
				//첫번째 제품카테고리 콤보박스를 변경하엿을경우
				var thisCdId = $(this).val();
				fnSrchItemComboAjax(tagId,thisCdId,'');

			}else if(tagId=='srchDepth2'){
				//두번째 제품카테고리 콤보박스를 변경하엿을경우
				var thisCdId = $(this).val();
				var codeOther = $('#srchDepth1').val();
				fnSrchItemComboAjax(tagId,codeOther,thisCdId);
			}
		});
	});

	//퀵메뉴 결과
	function fnQuickList() {
		if($('#srchDepth3').val() != ''){
			$('#quickForm').attr('action', '/search/quickSearch/quickSearchList');
			$('#quickForm').submit();
		}
	}

	//공지사항 상세보기 로직
	function noticeView(seq) {
		if(fnSrchValidation()) {		//검색박스 필수 체크 로직
			$('#seq').val(seq);
			$('#noticeForm').attr('action', '/notice/notice/noticeDetail');
			$('#noticeForm').submit();
		}
	}

	function fnIntegrateSearch(param){
		if(param != undefined){
			$('#srchIntegrated').val(param);
		}
		if($('#srchIntegrated').val() != ''  || $('#srchIntegratedKeyword').val() != ''){
			$('#integrateForm').attr('action', '/search/integrateSearch/integrateSearchList');
			$('#integrateForm').submit();
		}
	}
</script>


<section class="search-wrap">
	<div class="inner">
		<div class="tab">
			<input type="radio" id="search1" name="tab1" checked>
			<label for="search1">
				<p>통합검색</p>
			</label>
			<div class="content">
				<form id="integrateForm" name="integrateForm" method="post" action="/search/integrateSearch/integrateSearchList">
					<div class="search-bar">
						<input type="text"  id="srchIntegrated" name="srchIntegrated" value="" class="search-input" placeholder="검색어를 입력해 주세요.">
						<button type="submit" class="btn-search" onclick="fnIntegrateSearch();"><span class="blind">search</span></button>
					</div>
					<ul class="hash-list">
						<c:forEach items="${relationList}" var="list" varStatus="relationStatus">
							<li><a href="javascript:fnIntegrateSearch('${list.value}');"># ${list.value}</a></li>
						</c:forEach>
					</ul>
				</form>
			</div>
		</div>
		<div class="tab">
			<input type="radio" id="search2" name="tab1">
			<label for="search2">
				<p>퀵서치</p>
			</label>
			<div class="content">
				<form:form modelAttribute="searchVO" id="quickForm" name="quickForm" method="post" action="">
					<div class="qsearch-select-wrap">
						<select class="on" id="srchDepth1" name="srchDepth1">
							<option value="">선택</option>
							<c:forEach items="${itemList}" var="list" varStatus="status">
								<option value="${list.cd}" ${searchVO.srchDepth1 eq list.cd ? "selected" : "" }>${list.nm}</option>
							</c:forEach>
						</select>
						<select id="srchDepth2" name="srchDepth2" disabled readonly>
							<option value="">선택</option>
						</select>
						<select id="srchDepth3" name="srchDepth3" disabled readonly>
							<option value="">선택</option>
						</select>
						<button type="button" class="btn-search" onclick="fnQuickList();"><span class="blind">search</span></button>
					</div>
				</form:form>

			</div>
		</div>
	</div>
</section>
<section class="contents">
	<section class="menu-wrap">
		<div class="inner">
			<div class="tab">
				<input type="radio" id="search3" name="tab2" checked>
				<label for="search3">
					<p>서비스</p>
				</label>
				<div class="content">
					<ul class="icon-list">
						<li class="icon-item">
							<a href="/service/partsCatalog/partsCatalogList">
								<img src="/img/usr/main/ico_service_1.svg" alt="">
								<img src="/img/usr/main/ico_m_service_1.svg" alt="">
								<span>부품 매뉴얼</span>
							</a>
						</li>
						<li class="icon-item">
							<a href="/service/manual/manualList">
								<img src="/img/usr/main/ico_service_2.svg" alt="">
								<img src="/img/usr/main/ico_m_service_2.svg" alt="">
								<span>매뉴얼</span>
							</a>
						</li>
						<li class="icon-item">
							<a href="/service/techShare/techShareList">
								<img src="/img/usr/main/ico_service_3.svg" alt="">
								<img src="/img/usr/main/ico_m_service_3.svg" alt="">
								<span>기술정보 공유</span>
							</a>
						</li>
						<li class="icon-item">
							<a href="/service/video/videoList">
								<img src="/img/usr/main/ico_service_4.svg" alt="">
								<img src="/img/usr/main/ico_m_service_4.svg" alt="">
								<span>동영상</span>
							</a>
						</li>
						<li class="icon-item">
							<a href="/service/firmware/firmwareList">
								<img src="/img/usr/main/ico_service_5.svg" alt="">
								<img src="/img/usr/main/ico_m_service_5.svg" alt="">
								<span>펌웨어 공유</span>
							</a>
						</li>
						<li class="icon-item">
							<a href="/service/errorCode/errorCodeList">
								<img src="/img/usr/main/ico_service_6.svg" alt="">
								<img src="/img/usr/main/ico_m_service_6.svg" alt="">
								<span>에러코드</span>
							</a>
						</li>
						<li class="icon-item">
							<a href="/service/learningMaterial/learningMaterialList">
								<img src="/img/usr/main/ico_service_7.svg" alt="">
								<img src="/img/usr/main/ico_m_service_7.svg" alt="">
								<span>학습자료</span>
							</a>
						</li>
						<ul>
				</div>
			</div>
			<div class="tab">
				<input type="radio" id="search4" name="tab2">
				<label for="search4">
					<p>솔루션</p>
				</label>
				<div class="content"> <!-- 설계 x / 디자인 x / 임시로 넣어둠 -->
					<ul class="icon-list">
						<li class="icon-item">
							<a href="/solution/installationfile/installationfileList">
								<img src="/img/usr/main/ico_solution_1.svg" alt="">
								<img src="/img/usr/main/ico_m_solution_1.svg" alt="">
								<span>설치파일</span>
							</a>
						</li>
						<li class="icon-item">
							<a href="/solution/manuals/manualsList">
								<img src="/img/usr/main/ico_solution_2.svg" alt="">
								<img src="/img/usr/main/ico_m_solution_2.svg" alt="">
								<span>매뉴얼</span>
							</a>
						</li>
						<li class="icon-item">
							<a href="/solution/techShare/techShareList">
								<img src="/img/usr/main/ico_solution_3.svg" alt="">
								<img src="/img/usr/main/ico_m_solution_3.svg" alt="">
								<span>기술정보 공유</span>
							</a>
						</li>
						<li class="icon-item">
							<a href="/solution/video/videoList">
								<img src="/img/usr/main/ico_solution_4.svg" alt="">
								<img src="/img/usr/main/ico_m_solution_4.svg" alt="">
								<span>동영상</span>
							</a>
						</li>
						<li class="icon-item">
							<a href="/solution/marketing/marketingList">
								<img src="/img/usr/main/ico_solution_5.svg" alt="">
								<img src="/img/usr/main/ico_m_solution_5.svg" alt="">
								<span>마케팅 자료</span>
							</a>
						</li>
						<li class="icon-item">
							<a href="/solution/clientInstallInfo/clientInstallInfoList">
								<img src="/img/usr/main/ico_solution_6.svg" alt="">
								<img src="/img/usr/main/ico_m_solution_6.svg" alt="">
								<span>고객사별 설치정보</span>
							</a>
						</li>
						<ul>
				</div>
			</div>
			<div class="tab">
				<input type="radio" id="search5" name="tab2">
				<label for="search5">
					<p>영상/사진</p>
				</label>
				<div class="content"> <!-- 설계 x / 디자인 x / 임시로 넣어둠 -->
					<ul class="icon-list">
						<li class="icon-item">
							<a href="/mpic/firmware/firmwareList">
								<img src="/img/usr/main/ico_vp_1.svg" alt="">
								<img src="/img/usr/main/ico_m_vp_1.svg" alt="">
								<span>펌웨어/ <br>소프트웨어</span>
							</a>
						</li>
						<li class="icon-item">
							<a href="/mpic/manual/manualList">
								<img src="/img/usr/main/ico_vp_2.svg" alt="">
								<img src="/img/usr/main/ico_m_vp_2.svg" alt="">
								<span>매뉴얼</span>
							</a>
						</li>
						<li class="icon-item">
							<a href="/mpic/techShare/techShareList">
								<img src="/img/usr/main/ico_vp_3.svg" alt="">
								<img src="/img/usr/main/ico_m_vp_3.svg" alt="">
								<span>기술정보 공유</span>
							</a>
						</li>
						<li class="icon-item">
							<a href="/mpic/partsCatalog/partsCatalogList">
								<img src="/img/usr/main/ico_vp_4.svg" alt="">
								<img src="/img/usr/main/ico_m_vp_4.svg" alt="">
								<span>부품 매뉴얼</span>
							</a>
						</li>
						<ul>
				</div>
			</div>
		</div>
	</section>
	<section class="bottom-wrap">
		<div class="inner">
			<div class="info-list">
				<div class="ver-pc">
					<ul>
						<li class="list-1">
							<img src="/img/usr/main/img_bg1.png" alt="">
							<div class="con">
								<p class="tit">라이선스</p>
								<a href="https://c-lms.com/license/enduser/portal/LAInput.jsp" target="_blank">신규발행</a>
								<a href="/support/licenseRequest/licenseRequestList">변경/재발행</a>
							</div>
						</li>
						<li class="list-2">
							<a href="/support/techSupport/techSupportList">
								<img src="/img/usr/main/img_bg2.png" alt="">
								<div class="con">
									<p class="tit">기술지원신청</p>
									<p class="txt">서비스 기술지원을 신청합니다.</p>
								</div>
							</a>
						</li>
					</ul>
				</div>
				<div class="ver-mo">
					<ul>
						<li class="list1">
							<a href="https://c-lms.com/license/enduser/portal/LAInput.jsp" target="_blank">
								<img src="/img/usr/main/img_m_bg1.png" alt="">
								<span>라이선스<br>신규발행</span>
							</a>
						</li>
						<li class="list2">
							<a href="/support/licenseRequest/licenseRequestList">
								<img src="/img/usr/main/img_m_bg2.png" alt="">
								<span>라이선스<br>변경/재발행</span>
							</a>
						</li>
						<li class="list3">
							<a href="/support/techSupport/techSupportList">
								<img src="/img/usr/main/img_m_bg3.png" alt="">
								<span>기술지원<br>신청</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="notice-list">
				<p class="title">공지사항</p>
				<div class="notice-items">
					<form:form modelAttribute="searchVO" id="noticeForm" name="noticeForm" method="post" action="">
						<input type="hidden" name="seq" id="seq" />
						<c:forEach var="result" items="${noticeList}" varStatus="status">
							<a href="javascript:">
								<p class="ellipsis" onclick="noticeView('<c:out value="${result.seq}"/>');">${result.title}</p>
								<span><fmt:formatDate value="${result.registDatetime}" pattern="yyyy.MM.dd" /></span>
							</a>
						</c:forEach>
					</form:form>
				</div>
			</div>
		</div>
	</section>
</section>