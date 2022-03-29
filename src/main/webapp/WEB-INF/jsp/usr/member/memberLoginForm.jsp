<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/cmm/_header.jsp" %>
<script type="text/javascript">

//엔터키가 눌렸을 때 실행할 내용
function login() {
	
	if(!$('#agree').is(':checked')){
        fnModalOpen('modaltest2', 'agree', 'fnValidatonFocus(\'agree\')');
		return false;
	}
	
	if(!isFillValue($("#id"))){
		fnModalOpen('modaltest2', 'id', 'fnValidatonFocus(\'id\')');
		return false;
    }
	if(!isFillValue($("#passWd"))){
		fnModalOpen('modaltest2', 'passWd', 'fnValidatonFocus(\'passWd\')');
		return false;
    }
	var param = {'id' : $('#id').val(), 'passWd': $('#passWd').val()};
   	var url = '/usr/member/memberLoginAjax';
   	$.ajax({
        type :"POST",
        contentType: 'application/json;charset=UTF-8',
        url : url,
        data:  JSON.stringify(param),
        dataType : 'json',
        async: false,
        success:function(result){
      	  if(result){
                if(result.code == "0000") { 
                	location.href="/main";
                }else if(result.code == "8888") { 
                	$('#modaltest2').find('p').html(result.message);
            		$('#modaltest2').find('a').attr('onclick','fnChangePw()');
            		UI.modal.open(eval('modaltest2'));		//모달창 보여주기
            		return false;
                }else if(result.code == "7777") { 
                	$('#modaltest2').find('p').html(result.message);
                	$('#modaltest2').find('a').attr('onclick','UI.modal.close(modaltest2)');
            		UI.modal.open(eval('modaltest2'));		//모달창 보여주기
            		return false;
                }else{
                	$('#modaltest2').find('p').html(result.message);
            		$('#modaltest2').find('a').attr('onclick','UI.modal.close(modaltest2)');
            		UI.modal.open(eval('modaltest2'));		//모달창 보여주기
            		return false;
                }
            }else{
         	   alert('죄송합니다. 통신 이상입니다. 잠시 후 다시 이용해 주십시오.');
         	   return false;
            }
        }
    });
}

function fnChangePw(){
	UI.modal.close('modaltest2');
	
	$("#changePassword").val('n');
	$('#loginForm').attr('action', '/usr/member/memberChangePasswordForm');
	$('#loginForm').submit();
	
}

</script>

<!-- 로그인 -->
<div class="log-wrap">
    <div class="inner">
        <h1 class="logo">
            <a href="javascript:">
                <span class="blind">PUMPKIN HWANG</span>
            </a>
        </h1>
        <div class="box-gray">
            <p class="b-item">- 본 사이트는 펌킨황의 개인사이트입니다.</p>
<%--            <p class="b-item">- 본 사이트의 모든 내용은 보안사항으로 ID 및 Password 가 유출되지 않도록 각별히 주의하여 주시기 바랍니다.</p>--%>
<%--            <p class="b-item">- 로그인 하시면 내용을 볼 수 있음과 동시에 정보 유출 시 현재 아이디 사용자가 모든 책임을 갖게 되는 것을 의미합니다.</p>--%>
        </div>
        <div class="agree">
        	<label class="checkbox">
        		<input type="checkbox" name="agree" class="form_chk" title="선택"  id="agree" >
        		<i></i>
       		</label>
            <span>동의하시면 체크박스를 선택하신 후 로그인 하시기 바랍니다.</span>
        </div>
        <form name="loginForm" id="loginForm" action="/usr/member/memberLogin" method="post">
	        <div class="login-wrap">
	            <div class="input-wrap">
	            	<input type="text" title="아이디" placeholder="아이디를 입력해 주세요." maxlength="50" name="id" id="id" value=""  class="lg" />
	            	<input type="password" title="비밀번호" name="passWd" id="passWd" autocomplete="off" class="lg"  placeholder="비밀번호를 입력해 주세요." maxlength="14" onkeyup="capsLock(event, 'tt_passWd');" onblur="hideCapsLock(event, 'tt_passWd');"/>
	            	<input type="hidden" name="changePassword" id="changePassword" value="" />
	            </div>
	            <a href="javascript:;" class="btn-red-lg" onclick="login();">로그인</a>
                <div class="log-search">
                    <a href="/usr/member/memberfindId" class="search-id">아이디 찾기</a>
                    <a href="/usr/member/memberfindId" class="search-pw">비밀번호 찾기</a>
                </div>
	        </div>
        </form>
        <p class="comment">
            <em>회원가입 문의, 사용문의 및 접속문제 발생</em> 시, <br class="mo-br"><em>‘펌킨팀’</em> 으로 연락 바랍니다. <br class="mo-br">(담당자 : <em>펌킨황</em> pumpkinHwang8404@gmail.com)
        </p>
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
