
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/cmm/_header.jsp" %>
<script type="text/javascript">
    $(document).ready(function () {
    	$("#pageUnit").on("change", function(){
    		$('#listForm').attr('action', '/mng/member/UserMng/UserMngList');
    	    $("#pageIndex").val(1);
    	    $("#listForm").submit();
    	});
    });

    function fnList(){
    	$('#listForm').attr('action', '/mng/member/UserMng/UserMngList');
    	$('#listForm').submit();
    }

    function fnSearchReset(){
    	$('.search-box-wrap').find('input[type=text],select').each(function(){
    		$(this).val('');
   		});
   	}

    //페이징 클릭하였을때
    function fn_egov_link_page(pageIdx){
    	$('#pageIndex').val(pageIdx);
    	$('#listForm').attr('action', '/mng/member/UserMng/UserMngList');
    	$('#listForm').submit();
    }

    //상세보기 로직
    function view(seq) {
    	$('#seq').val(seq);
    	$('#listForm').attr('action', '/mng/member/UserMng/UserMngDetail');
    	$('#listForm').submit();
    }

    function fnRegistForm(){
		location.href='/mng/member/UserMng/UserMngRegistForm';
    }

    function fnValidation(data){
    	if(data == "DELETE"){
    	fnModalOpen('modaltest1','delete', 'fnModalUpdate("DELETE");');
    	}else{
    	fnModalOpen('modaltest1','update', 'fnModalUpdate("UPDATE");');
    	}
    }
    function fnModalUpdate(mode){
    	UI.modal.close(modaltest1);
    	var formData = new FormData();
    	$("input[name=seq]:checked").each(function(){
    		var chk = $(this).val();
    		formData.append("Userseq",chk);

    	})
        formData.append("mode",mode);
        formData.append("useYn",$("#useYn").val());


        var theUrl = "<c:url value='/mng/member/UserMng/UserMngSave'/>";
        $.ajax({
        	type :"POST",
            enctype: 'multipart/form-data',
            url : theUrl,
            data: formData,
            async: false,
            processData: false,
            contentType: false,
            success:function(result){
                var data = JSON.parse(result);
                if(data){
                    if(data.code == "0000") {//성공
                        fnModalOpen('modaltest2', 'saveOk', 'location.href="/mng/member/UserMng/UserMngList"');
                    }else{//실패
                        fnModalOpen('modaltest2', 'saveFail', 'UI.modal.close(modaltest2)');
                        return false;
                    }
                }else{
                    alert('error');
                }
            },
            error:function(request,status,error){
                console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });
    }
</script>


<!-- sub top search box -->
<form:form modelAttribute="searchVO" id="listForm" name="listForm" method="post" action="">
 <input type="hidden" name="seq" id="seq" />
	<div class="search-box-wrap">
	    <div class="inner">
	        <div class="table-col">
	            <div class="th">상태정보</div>
	            <div class="td">
	                <div class="select-wrap w486">
	                    <select class="select" name="useYn">
	                        <option value="">전체</option>
	                        <option value="y" ${searchVO.useYn eq "y" ? "selected" : "" }>활성</option>
	                        <option value="n" ${searchVO.useYn eq "n" ? "selected" : "" }>비활성</option>
	                    </select>
	                </div>
	            </div>
	        </div>
			<div class="table-col">
				<div class="th">회원그룹</div>
				<div class="td">
					<div class="select-wrap w486">
						<select class="select" name="groupCode">
							<option value="">전체</option>
							<option value="00000001" ${searchVO.groupCode eq "00000001" ? "selected" : "" }>전체관리자</option>
							<option value="00000002" ${searchVO.groupCode eq "00000002" ? "selected" : "" }>부분관리자</option>
						</select>
					</div>
				</div>
			</div>
	        <div class="table-col">
	            <div class="th">검색어</div>
	            <div class="td add">
	            	<c:choose>
	            		<c:when test="${fn:length(searchVO.searchList) > 0}">
	           				<c:forEach items="${searchVO.searchList}" var="searchList" varStatus="searchStatus">
	            				<div class="loop">
				                    <div class="select-wrap w160">
				                        <select class="select" name="srchGubn">
				                            <option value="">전체</option>
				                            <option value="departmentName" ${searchList.srchGubn eq "departmentName" ? "selected" : "" }>소속부서/대리점</option>
				                            <option value="name" ${searchList.srchGubn eq "name" ? "selected" : "" }>회원명</option>
				                            <option value="id" ${searchList.srchGubn eq "id" ? "selected" : "" }>아이디명</option>
				                        </select>
				                    </div>
				                    <div class="input-wrap w318 ml5">
				                        <input type="text" class="input" name="srchKeyword" value="${searchList.srchKeyword}">
				                    </div>
				                    <c:set value="minus" var="icon" />
				                    <c:if test="${searchStatus.index < 1}"><c:set value="plus" var="icon" /></c:if>
				                    <button type="button" class="ico-search ${icon}"><em class="blind">플러스 마이너스 아이콘</em> </button>
				                </div>
	            			</c:forEach>
	            		</c:when>
	            		<c:otherwise>
	            			<div class="loop">
			                    <div class="select-wrap w160">
			                        <select class="select" name="srchGubn">
			                            <option value="">전체</option>
			                            <option value="departmentName">소속부서/대리점</option>
			                            <option value="name">회원명</option>
			                            <option value="id">아이디명</option>
			                        </select>
			                    </div>
			                    <div class="input-wrap w318 ml5">
			                        <input type="text" class="input" name="srchKeyword">
			                    </div>
			                    <button type="button" class="ico-search plus"><em class="blind">플러스 마이너스 아이콘</em> </button>
			                </div>
	            		</c:otherwise>
	            	</c:choose>
	            </div>
	            <div class="td">
	                <div class="row-btns al-r">
	                    <span class="col"><button type="button" class="btn-gray-sm" onclick="fnSearchReset();">초기화</button></span>
	                    <span class="col"><button type="button" class="btn-red-sm" onclick="fnList();">검색</button></span>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
	<!-- //sub top search box  -->

	<!-- filter -->
	<div class="filter-wrap">
	    <div class="inner flex">
	        <ul>
	            <li>총 <fmt:formatNumber value="${paginationInfo.totalRecordCount}" pattern="#,###" /> EA</li>
	            <li>
	            	Page <fmt:formatNumber value="${paginationInfo.currentPageNo}" pattern="#,###" /> /
	            	<c:set var="pageTotCnt" value="${fn:substringBefore(Math.ceil(paginationInfo.totalRecordCount/searchVO.pageUnit),'.')}"/>
	            	<fmt:formatNumber value="${pageTotCnt}" pattern="#,###" />
	           	</li>
	        </ul>
	        <div class="select-wrap w130">
	            <select class="select" id="pageUnit" name="pageUnit" >
	                <option value="10" ${searchVO.pageUnit eq "10" ? "selected" : "" }>10줄</option>
	                <option value="20" ${searchVO.pageUnit eq "20" ? "selected" : "" }>20줄</option>
	                <option value="50" ${searchVO.pageUnit eq "50" ? "selected" : "" }>50줄</option>
	                <option value="100" ${searchVO.pageUnit eq "100" ? "selected" : "" }>100줄</option>
	            </select>
	        </div>
	    </div>
	</div>
	<!-- //filter -->

	<!-- table : list page -->
	<c:if test="${totCnt < 1 }"><c:set value="type='nodata'" var="nodata"/></c:if>
	<div class="table-wrap">
	    <div class="table-list" ${nodata}>
	        <div class="tr">
	        	<div class="th check">
					<p>선택</p>
					<%--<label class="checkbox circle"><input type="checkbox"><i></i></label>--%>
	            </div>
	            <div class="th num">
	                <p>번호</p>
	            </div>
	            <div class="th">
	                <p>회원구분</p>
	            </div>
				<div class="th">
	                <p>회원그룹</p>
	            </div>
				<div class="th">
	                <p>소속부서/대리점</p>
	            </div>
				<div class="th">
	                <p>아이디명</p>
	            </div>
	            <div class="th">
	                <p>회원명</p>
	            </div>
	            <div class="th">
	                <p>상태</p>
	            </div>
	            <div class="th">
	                <p>최초등록일</p>
	            </div>
	        </div>
	        <c:choose>
	        	<c:when test="${totCnt > 0 }">
	        		<c:forEach var="result" items="${resultList}" varStatus="status">
	        			<div class="tr">
	        				<div class="td check">
								<label class="checkbox circle">
				                <input type="checkbox" name="seq" id="seq" value="<c:out value="${result.seq}"/>:<c:out value="${result.useYn}"/>">
									<i></i></label>
				            </div>
				            <div class="td">
				                <p><fmt:formatNumber value="${paginationInfo.totalRecordCount+1 - ((searchVO.pageIndex-1) * searchVO.pageUnit + status.count)}" pattern="#,###" /></p>
				            </div>
				            <div class="td">
				                <p>직조직</p>
				            </div>
							<div class="td">
				                <p><c:out value="${result.groupName}"/></p>

				            </div>
							<div class="td">
				                <p><c:out value="${result.departmentName}"/></p>
				            </div>
				            <div class="td">
				                <p class=""> <c:out value="${result.id}"/></p>
				            </div>
				            <div class="td">
								<p> <c:out value="${result.name}"/></p>
				            </div>
							<div class="td">
				                <p class=""><c:choose><c:when test="${result.useYn=='y'}">활성</c:when><c:otherwise>비활성</c:otherwise></c:choose></p>
				            </div>
				            <div class="td">
				                <p><fmt:formatDate value="${result.updateDatetime}" pattern="yyyy-MM-dd" /></p>
				            </div>
				        </div>
	        		</c:forEach>
	        	</c:when>
	        	<c:otherwise>
					<div class="nodata">
						검색 결과가 없습니다.
					</div>
	        	</c:otherwise>
	        </c:choose>
	    </div>
	</div>
	<!-- //table : list page -->
	<!-- 목록 페이지 테이블 아래 버튼 있는 경우 추가 -->

	<div class="flex"> <!-- 좌/우 모두 버튼이 있을 시 해당 class로 감싸기 -->
		<div class="left-btn">
			<button type="button" class="btn-gray-sm" onclick="fnValidation('DELETE');">삭제</button>
			<button type="button" class="btn-red-sm line ml6" onclick="fnValidation('UPDATE');">상태변경</button>
		</div>
		<div class="right-btn">
			<button type="button" class="btn-red-sm ml6" onclick="fnRegistForm();">신규등록</button>
		</div>
	</div>

    <div class="right-btn">

    </div>
    <!-- //목록 페이지 테이블 아래 버튼 있는 경우 추가 -->

	<!-- paging -->
	<div class="paging">
	    <div class="paging-wrap">
	    	<ui:pagination paginationInfo = "${paginationInfo}" type="image" jsFunction="fn_egov_link_page" />
	    	<form:hidden path="pageIndex" />
	    </div>
	 </div>
</form:form>
<div class="modal" id="modaltest1">
    <div class="modal-wrap" type="alert">
        <div class="modal-content">
            <p>/p>
            <div class="btns include-red-stroke">
                <a href="javascript:" onclick="UI.modal.close(modaltest1);" class="btn--red-stroke modal__btn" id="cancel">취소</a>
                <a href="javascript:" onclick="fnModalUpdate();" class="btn--red modal__btn" id="ok">확인</a>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modaltest2">
    <div class="modal-wrap" type="alert">
        <div class="modal-content">
            <p></p>
            <div class="btns btns--full-wh">
                <a href="javascript:" onclick="UI.modal.close(modaltest3)" class="btn--red modal__btn">확인</a>
            </div>
        </div>
    </div>
</div>
