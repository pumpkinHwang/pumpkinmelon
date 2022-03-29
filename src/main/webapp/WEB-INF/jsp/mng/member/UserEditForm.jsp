<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/cmm/_header.jsp" %>
<script type="text/javascript">
    function fn_egov_selectList(){
        $('#detailForm').attr('action', "<c:url value='/mng/membmer/installationFileList'/>" );
        $('#detailForm').submit();
    }

    function fnEditForm(){
        $("#detailForm").attr("action", "<c:url value='/mng/solution/installationFileEditForm'/>" );
        $("#detailForm").submit();

    }

    //삭제버튼 클릭하였을 때
    function fnModalDelete(){
        fnModalOpen('modaltest1', 'delete', 'fnDelete()');
    }

    //게시글 삭제 로직
    function fnDelete(){
        UI.modal.close(modaltest1)
        var formData = new FormData();
        formData.append("boardNoticeGubun",  $("#boardNoticeGubun").val());
        formData.append("seq",  $("#seq").val());
        formData.append("mode",  $("#mode").val());

        var theUrl = "<c:url value='/mng/solution/installationFileSave'/>";
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
                        fnModalOpen('modaltest2', 'deleteOk', 'fn_egov_selectList()');
                    }else{//실패
                        fnModalOpen('modaltest2', 'deleteFail', '');
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
<!-- table : video detail page -->
<form id="detailForm" name="detailForm" method="post">
    <c:forEach items="${searchVO.srchKeyword}" var="srchKeyword" varStatus="status">
        <input type="hidden" name="srchKeyword" value="<c:out value="${srchKeyword}"/>"/>
    </c:forEach>
    <c:forEach items="${searchVO.srchGubn}" var="srchGubn" varStatus="status">
        <input type="hidden" name="srchGubn" value="<c:out value="${srchGubn}"/>"/>
    </c:forEach>
    <input type="hidden" name="pageUnit" value="<c:out value="${searchVO.pageUnit}"/>"/>
    <input type="hidden" name="pageIndex" value="<c:out value="${searchVO.pageIndex}"/>"/>
    <input type="hidden" name="srchEnableYn" value="<c:out value="${searchVO.srchEnableYn}"/>"/>
    <input type="hidden" name="srchDepth1" value="<c:out value="${searchVO.srchDepth1}"/>"/>
    <input type="hidden" name="srchDepth2" value="<c:out value="${searchVO.srchDepth2}"/>"/>
    <input type="hidden" name="srchDepth3" value="<c:out value="${searchVO.srchDepth3}"/>"/>
    <input type="hidden" id="boardNoticeGubun" name="boardNoticeGubun" value="InstallationFile" />
    <input type="hidden" id="seq" name="seq" value="<c:out value="${data.seq}"/>"/>
    <input type="hidden" id="mode" name="mode" value="DELETE"/>
    <div class="table-wrap">
        <div class="detail-title">
            <div class="detail-name ellipsis"><c:out value="${data.title}"/></div>
            <ul>
                <li>
                    <p class="tit">등록자</p>
                    <p class="txt"><c:out value="${data.writerName}"/></p>
                </li>
                <li>
                    <p class="tit">부서</p>
                    <p class="txt"><c:out value="${data.writerDepartment}"/></p>
                </li>
                <li>
                    <p class="tit">등록일자</p>
                    <p class="txt"><fmt:formatDate value="${data.registDatetime}" pattern="yyyy.MM.dd" /></p>
                </li>
                <li>
                    <p class="tit">제품 카테고리</p>
                    <p class="txt dep-cate">
                        <c:set var="itemCodeNm" value="${fn:split(data.itemCodeNm, '|') }" ></c:set>
                        <c:forEach items="${itemCodeNm}" var="itemCodeNm" varStatus="status">
                            <span><c:out value="${itemCodeNm}" /></span>
                        </c:forEach>
                    </p>
                </li>
            </ul>
        </div>
        <div class="table-detail">
            <div class="tr">
                <div class="td">
                    <p class="detail-txt">
                        ${data.contents}
                    </p>
                </div>
            </div>
            <div class="tr">
                <div class="th w90">
                    <p class="tit">첨부파일</p>
                </div>
                <div class="td">
                    <div class="add-file view">
                        <div class="add-file-names">
                            <div class="inner">
                                <c:forEach var="file" items="${fileList}" varStatus="status">
                                    <a class="name" href="<c:url value='/mng/cmm/fms/FileDown'/>?atchFileId=<c:out value="${file.atchFileId}"/>"><c:out value="${file.orignlFileNm}"/></a><br/>
                                </c:forEach>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tr">
                <div class="th w90">
                    <p class="tit">사용여부</p>
                </div>
                <div class="td">
                    <p>
                        <c:choose>
                            <c:when test="${data.enableYn eq 'y'}">활성</c:when>
                            <c:otherwise>비활성화</c:otherwise>
                        </c:choose>
                    </p>
                </div>
            </div>
        </div>
    </div>
</form>
<!-- table : video detail page -->
<div class="row-btns mt35">
    <span class="col"><button type="button" class="btn-gray-sm" onclick="fnModalDelete();">삭제</button></span>
    <span class="col"><button type="button" class="btn-red-sm" onclick="fnEditForm();">수정</button></span>
    <span class="col"><button type="button" class="btn-red-sm line" onclick="fn_egov_selectList();">목록</button></span>
</div>

<div class="modal" id="modaltest1">
    <div class="modal-wrap" type="alert">
        <div class="modal-content">
            <p>등록정보를 삭제 하시겠습니까?</p>
            <div class="btns include-red-stroke">
                <a href="javascript:;" onclick="UI.modal.close(modaltest1);" class="btn--red-stroke modal__btn" id="cancel">취소</a>
                <a href="javascript:;" onclick="fnDelete();" class="btn--red modal__btn" id="ok">확인</a>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modaltest2">
    <div class="modal-wrap" type="alert">
        <div class="modal-content">
            <p></p>
            <div class="btns btns--full-wh">
                <a href="javascript:;" onclick="UI.modal.close(modaltest2)" class="btn--red modal__btn">확인</a>
            </div>
        </div>
    </div>
</div>
