<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/cmm/_header.jsp" %>
<script type="text/javascript">
	var code = '<c:out value="${code}" />';
	if(code=='0000'){
		alert('저장 성공하였습니다.');
		location.href="/mng/service/video/videoList";
		//fnModalOpen('modaltest2', 'saveOk','location.href="/mng/service/videoList"');
	}else if(code=='9999'){
		var error = '<c:out value="${error}" />';
		alert("저장 실패하였습니다.");
		window.history.back();
		console.log(error);
		/*
		$('#modaltest2').find('p').text(error);
		$('#modaltest2').find('a').attr('onclick', 'window.history.back();');
		UI.modal.open(modaltest2);		//모달창 보여주기
		*/
	}
	
</script>
<!-- 
<div class="modal" id="modaltest2">
    <div class="modal-wrap" type="alert">
        <div class="modal-content">
            <p>저장 성공하였습니다.</p>
            <div class="btns btns--full-wh">
                <a href="javascript:" onclick="UI.modal.close(modaltest2)" class="btn--red modal__btn">확인</a>
            </div>
        </div>
    </div>
</div>
 -->
