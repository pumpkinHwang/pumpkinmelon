<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/cmm/_header.jsp" %>
<script type="text/javascript">

    function fn_egov_selectList(){
        $('#detailForm').attr('action', '/mng/member/User/UserList');
        $('#detailForm').submit();
    }
</script>
<%--<iframe src="http://mini.osiu.kr:81/api/java_cis/${requestScope['javax.servlet.forward.servlet_path']}" style="width:100%;height:400px;"></iframe>--%>
<!-- table : video detail page -->
<form id="detailForm" name="detailForm" method="post">
    <c:forEach items="${searchVO.srchKeyword}" var="srchKeyword" varStatus="status">
        <input type="hidden" name="srchKeyword" value="${srchKeyword}"/>
    </c:forEach>
    <c:forEach items="${searchVO.srchGubn}" var="srchGubn" varStatus="status">
        <input type="hidden" name="srchGubn" value="${srchGubn}"/>
    </c:forEach>
    <input type="hidden" name="pageIndex" value="${searchVO.pageIndex}"/>
    <input type="hidden" name="pageUnit" value="${searchVO.pageUnit}"/>
    <input type="hidden" id="seq" name="seq" value="${data.seq}"/>
    <div class="table-wrap">
        <div class="detail-title">
            <div class="detail-name ellipsis">${data.title}</div>
            <ul>
                <li>
                    <p class="tit">등록자</p>
                    <p class="txt">${data.writerName}</p>
                </li>
                <li>
                    <p class="tit">부서</p>
                    <p class="txt">${data.writerDepartment}</p>
                </li>
                <li>
                    <p class="tit">등록일자</p>
                    <p class="txt"><fmt:formatDate value="${data.updateDatetime}" pattern="yyyy.MM.dd" /></p>
                </li>
                <li>
                    <p class="tit">버전</p>
                    <p class="txt">${data.version}</p>
                </li>
                <li>
                    <p class="tit">제품 카테고리</p>
                    <p class="txt"></p>
                </li>
            </ul>
        </div>
        <div class="table-detail">
            <div class="tr">
                <div class="td">
                    <p class="detail-txt">
                        ${data.contents}
                        <!-- ${data.contents.replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "")}
	                    <c:out value="${data.contents}" escapeXml="false"></c:out>
	                     -->
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
                                <span class="name" href="#"></span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
<!-- table : video detail page -->

<!-- 상세 페이지 버튼 -->
<div class="row-btns mt35">
    <span class="col"><button type="button" class="btn-red-sm line" onclick="fn_egov_selectList();">목록</button></span>
</div>
<!-- //상세 페이지 버튼 -->

