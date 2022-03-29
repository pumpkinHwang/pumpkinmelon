<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/cmm/_header.jsp" %>
<script type="text/javascript">

function fnFindId() {
	
	if(!isFillValue($("#IdFindUserName"))){
        fnModalOpen('modaltest2', 'userName', 'fnValidatonFocus(\'IdFindUserName\')');
		return false;
    }
	if(!isFillValue($("#IdFindUserEmail"))){
		fnModalOpen('modaltest2', 'userEmail', 'fnValidatonFocus(\'IdFindUserEmail\')');
		return false;
    }
	
	var param = {'name' : $('#IdFindUserName').val(), 'email': $('#IdFindUserEmail').val()};
   	var url = '/mng/member/memberfindIdAjax';
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
             	   fnModalOpen('modaltest2', 'idFindUserEmail', 'location.href = "/mng/member/memberLogin"');
                }else{//실패
             	   fnModalOpen('modaltest2', 'idFindUser', 'UI.modal.close(modaltest2)');
                   return false;
               }
            }else{
         	   alert('죄송합니다. 통신 이상입니다. 잠시 후 다시 이용해 주십시오.');
         	   return false;
            }
        }
    });
}

//엔터키가 눌렸을 때 실행할 내용
function fnFindPw() {
	
	if(!isFillValue($("#pwFindUserName"))){
		fnModalOpen('modaltest2', 'userName', 'fnValidatonFocus(\'pwFindUserName\')');
		return false;
    }
	if(!isFillValue($("#pwFindUserId"))){
		fnModalOpen('modaltest2', 'userId', 'fnValidatonFocus(\'pwFindUserId\')');
		return false;
    }
	if(!isFillValue($("#pwFindUserEmail"))){
		fnModalOpen('modaltest2', 'userEmail', 'fnValidatonFocus(\'pwFindUserEmail\')');
		return false;
    }
	
	var param = {'name' : $('#pwFindUserName').val(), 'id' : $('#pwFindUserId').val(), 'email': $('#pwFindUserEmail').val()};
   	var url = '/mng/member/memberfindPwAjax';
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
             	   fnModalOpen('modaltest2', 'pwFindUserEmail', 'location.href = "/mng/member/memberLogin"');
                }else{//실패
             	   fnModalOpen('modaltest2', 'pwFindUser', 'UI.modal.close(modaltest2)');
                    return false;
               }
            }else{
         	   alert('죄송합니다. 통신 이상입니다. 잠시 후 다시 이용해 주십시오.');
         	   return false;
            }
        }
    });
}
</script>

    <div class="wrap">
	    <!-- 로그인 -->
	    <div class="log-wrap">
	        <div class="inner">
	            <h1 class="logo">
	                <a href="/usr/member/memberLogin">
	                    <span class="blind">PUMPKIN HWANG</span>
	                </a>
	            </h1>
	            <form name="loginForm" id="loginForm" action="/mng/member/memberLogin" method="post">
		            <input type="hidden" id="id" name="id" />
		        	<input type="hidden" id="name" name="name" />
		        	<input type="hidden" id="email" name="email" />
		            <div class="flex id-pw-flex">
	                   <div class="box-gray id">
	                       <p class="title">아이디 찾기</p>
	                       <div class="input-wrap">
	                           <input type="text" id="IdFindUserName" class="lg" placeholder="성명을 입력해 주세요.">
	                           <input type="email" id="IdFindUserEmail" class="lg" placeholder="가입시 사용한 이메일을 입력해 주세요.">
	                           <a href="javascript:" onclick="fnFindId();" class="btn-red-lg">확인</a>
	                       </div>
	                   </div>
	                   <div class="box-gray pw">
	                       <p class="title">비밀번호 찾기</p>
	                       <div class="input-wrap">
	                           <input type="text" id="pwFindUserName"  class="lg" placeholder="성명을 입력해 주세요.">
	                           <input type="text" id="pwFindUserId" class="lg" placeholder="아이디를 입력해 주세요.">
	                           <input type="email" id="pwFindUserEmail" class="lg" placeholder="가입시 사용한 이메일을 입력해 주세요.">
	                           <a href="javascript:" onclick="fnFindPw();" class="btn-red-lg">확인</a>
	                       </div>
	                   </div>
	               </div>
	            </form>
	            <p class="comment">
		           <em>아이디 찾기/비밀번호 찾기</em> 시, 문제가 발생할 경우 <em>‘서비스지원팀’</em>으로 연락 바랍니다. (담당자 : <em>서정일</em> jiseo@kr.pumpkin)
		        </p>
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
