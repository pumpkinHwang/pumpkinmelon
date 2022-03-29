<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/cmm/_header.jsp" %>
<script type="text/javascript">

//엔터키가 눌렸을 때 실행할 내용
function fnValidation() {

	if(!isFillValue($("#passWd"))){
        fnModalOpen('modaltest2', 'perPassWd', 'fnValidatonFocus(\'passWd\')');
		return false;
    }
	if(!isFillValue($("#newPassWd"))){
        fnModalOpen('modaltest2', 'newPassWd', 'fnValidatonFocus(\'newPassWd\')');
		return false;
    }
	if(!isFillValue($("#newPassWdChk"))){
        fnModalOpen('modaltest2', 'newPassWdChk', 'fnValidatonFocus(\'newPassWdChk\')');
		return false;
    }
	if($("#newPassWd").val() != $("#newPassWdChk").val()){
		fnModalOpen('modaltest2', 'chkPassWd', 'fnValidatonFocus(\'chkPassWd\')');
		return false;
	}
	//저장관련 메시지
	fnModalOpen('modaltest1', 'save', 'fnChangePassWd();');
}
	
function fnChangePassWd() {
	UI.modal.close(modaltest1);
	var param = {'passWd' : $('#passWd').val(), 'newPassWd': $('#newPassWd').val(), 'newPassWdChk': $('#newPassWdChk').val()};
   	var url = '/mng/member/memberChangePassword';
    $.ajax({
       type :"POST",
       contentType: 'application/json;charset=UTF-8',
       url : url,
       data:  JSON.stringify(param),
       dataType : 'json',
       async: false,
       success:function(result){
     	  if(result){
               if(result.code == "0000") {//성공
            	   fnModalOpen('modaltest2', 'chkPassSuccess', 'location.href = "/mng/member/memberlogOut"');
               }else{//실패
            	   fnModalOpen('modaltest2', 'passWdFail', 'UI.modal.close(modaltest2)');
                   return false;
              }
           }else{
        	   alert('죄송합니다. 통신 이상입니다. 잠시 후 다시 이용해 주십시오.');
        	   return false;
           }
       }
   });
}

//취소버튼 클릭 시
function fnCancel(){
	fnModalOpen('modaltest1', 'PassWdChkCancel', 'location.href="/mng/board/notice/noticeList"');
}
</script>

    <div class="wrap">
	    <!-- 로그인 -->
	    <div class="log-wrap">
	        <div class="inner">
	            <h1 class="logo">
	                <a href="javascript:">
	                    <span class="blind">PUMPKIN HWANG</span>
	                </a>
	            </h1>
	            <div class="flex pwc">
                     <div class="box-gray">
                         <p class="title">비밀번호 변경</p>
                         <div class="input-wrap">
                             <input type="password" id="passWd" name="passWd" class="lg" placeholder="기존 비밀번호를 입력해 주십시오.">
		                     <input type="password" id="newPassWd" name="newPassWd" class="lg" placeholder="신규 비밀번호를 입력해 주십시오.">
		                     <input type="password" id="newPassWdChk" name="newPassWdChk" class="lg" placeholder="신규 비밀번호를 재입력하여 주십시오.">
                             <div class="row-btns">
                             	 <c:if test="${memberVO.changePassword ne 'n' }">
	                                 <span class="col">
	                                     <a href="javascript:;" onclick="fnCancel();" class="btn-gray-lg">취소</a>
	                                 </span>
                             	 </c:if>
                                 <span class="col">
                                     <a href="javascript:;" onclick="fnValidation();" class="btn-red-lg">확인</a>
                                 </span>
                             </div>
                         </div>
                     </div>
                 </div>
	             <p class="comment">
                 	<em>비밀번호 변경</em> 시, 문제가 발생할 경우 <em>‘펌킨황’</em> 으로 연락 바랍니다. (담당자 : <em>펌킨황</em> pumpkinHwang8404@gmail.com)
                 </p>
	        </div>
	    </div>
    </div>
    <!-- //목록 페이지 테이블 아래 버튼 있는 경우 추가 -->
	<div class="modal" id="modaltest1">
	    <div class="modal-wrap" type="alert">
	        <div class="modal-content">
	            <p>저장하시겠습니까?</p>
	            <div class="btns include-red-stroke">
	                <a href="javascript:" onclick="UI.modal.close(modaltest1);" class="btn--red-stroke modal__btn" id="cancel">취소</a>
	                <a href="javascript:" onclick="fnChangePassWd();" class="btn--red modal__btn" id="ok">확인</a>
	            </div>
	        </div>
	    </div>
	</div>
	<div class="modal" id="modaltest2">
	    <div class="modal-wrap" type="alert">
	        <div class="modal-content">
	            <p></p>
	            <div class="btns btns--full-wh">
	                <a href="javascript:" onclick="UI.modal.close(modaltest2)" class="btn--red modal__btn">확인</a>
	            </div>
	        </div>
	    </div>
	</div>
