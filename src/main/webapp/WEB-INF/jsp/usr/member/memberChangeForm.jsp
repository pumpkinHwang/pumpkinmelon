<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/cmm/_header.jsp" %>
<script type="text/javascript">
  
    //저장 버튼 클릭 시 벨리데이션 체크
    function fnValidation(){
    	var type = $('#type').val();

        if($('#password').val() == "") {
            fnModalOpen('modaltest2', 'password', 'fnValidatonFocus(\'password\')');
            return false;
        }

        if($('#passwordChk').val() == "") {
            fnModalOpen('modaltest2', 'passwordChk', 'fnValidatonFocus(\'passwordChk\')');
            return false;
        }

        if($('#password').val() != $('#passwordChk').val()) {
            fnModalOpen('modaltest2', 'passwordChkErr', 'fnValidatonFocus(\'password\')');
            return false;
        }

        if(type == 'd'){

            if($('#department').val() == "") {
                fnModalOpen('modaltest2', 'department', 'fnValidatonFocus(\'department\')');
                return false;
            }

	        if($('#name').val()==""){
	            fnModalOpen('modaltest2', 'name', 'fnValidatonFocus(\'name\')');
	            return false;
	        }
        }else if(type == 'p'){

            if($('#pdepartmentc').val() == "") {
                fnModalOpen('modaltest2', 'pdepartmentc', 'fnValidatonFocus(\'pdepartmentc\')');
                return false;
            }

            if($('#departmentCode').val() == "") {
                fnModalOpen('modaltest2', 'departmentCode', 'fnValidatonFocus(\'departmentCode\')');
                return false;
            }

        	 if($('#name2').val()==""){
                 fnModalOpen('modaltest2', 'name', 'fnValidatonFocus(\'name2\')');
                 return false;
             }
        }

        //이메일
        if($('#email1').val()==""){
            fnModalOpen('modaltest2', 'email', 'fnValidatonFocus(\'email1\')');
            return false;
        }
        if($('#email2').val()==""){
            fnModalOpen('modaltest2', 'email', 'fnValidatonFocus(\'email2\')');
            return false;
        }

        //저장관련 메시지
        fnModalOpen('modaltest1', 'save', 'fnSave();');
    }


	function departmentChange(){
		var departmentCode = $("#pdepartmentc").val();
		if(departmentCode == '999999'){
			$("#departmentName").val('');	
			$("#departmentCode").val('')
			$("#departmentName").removeAttr('disabled');
			$("#departmentCode").removeAttr('disabled');
			
		}else{
		$("#departmentName").attr('disabled','disabled');
		$("#departmentCode").attr('disabled','disabled');
		$("#departmentName").val($("#pdepartmentc option:checked").text());	
		$("#departmentCode").val(departmentCode);
		}
	}
    //저장 로직
    function fnSave(){
    	var type = $('#type').val();
        UI.modal.close(modaltest1);
		
        var formData = new FormData();
        formData.append("seq",  $("#seq").val());
        formData.append("passWd",  $("#password").val());
        formData.append("id",  $("#id").val());
        
        if(type == 'p'){
            formData.append("department",  $("#departmentCode").val());
            if($("#pdepartmentc").val() == '999999') {
                formData.append("departmentName",  $("#departmentName").val());
            }
            formData.append("name",  $("#name2").val());
            formData.append("representativename",  $("#representativeName").val());
        }else{
            formData.append("department",  $("#department").val());
            formData.append("name",  $("#name").val());
            formData.append("representativename",  '');
        }
        
        formData.append("email",  $('input[name=email1]').val() + '@' + $('input[name=email2]').val());
        formData.append("telno",  $('input[name=telNo1]').val() + '-' + $('input[name=telNo2]').val() + '-' + $('input[name=telNo3]').val());

        var theUrl = "<c:url value='/usr/member/UserSave'/>";
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
                        location.href="/main";
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

    //취소버튼 클릭 시
    function fnCancel(){
        fnModalOpen('modaltest1', 'memberChangeCancel', 'location.href="/main"');
    }


    //비밀번호 변경
    function fnPasswordChange() {
        $('#detailForm').attr('action', '/usr/member/memberChangePasswordForm');
        $('#detailForm').submit();
    }

</script>
<form id="detailForm" name="detailForm"  method="post" enctype="multipart/form-data">

    <input type="hidden" id="type" name="type" value="<c:out value="${memberMap.type}"/>">
    <input type="hidden" id="seq" name="seq" value="<c:out value="${memberMap.seq}"/>">
    <input type="hidden" id="id" name="id" value="<c:out value="${memberMap.id}"/>">

    <section class="contents log">

        <div class="table-wrap edit2">
            <div class="top-wrap">
                <p class="txt"><span>*</span> 는 필수 입력정보입니다.</p>
                <hr class="hr">
            </div>
            <div class="table-edit type2">
                <div class="tr">
                    <div class="th">
                        <p class="tit">아이디</p>
                    </div>
                    <div class="td">
                        <input type="text" class="disabled" value="<c:out value="${memberMap.id}"/>">
                    </div>
                </div>
                <div class="tr">
                    <div class="th">
                        <p class="tit required">비밀번호</p>
                    </div>
                    <div class="td ">
                        <input type="password" id="password" name="password">
                    </div>
                    <div class="th">
                        <p class="tit required">비밀번호 확인</p>
                    </div>
                    <div class="td ">
                        <input type="password" id="passwordChk" name="passwordChk">
                    </div>
                </div>

                <div class="tr" id="ddepartment" style="${memberMap.type eq 'd' ? '' : 'display:none'}">
                    <div class="th">
                        <p class="tit required">부서</p>
                    </div>
                    <div class="td" >
                        <select class="select on" id="department" name="department">
                            <option value="">선택</option>
                            <c:forEach items="${UserAgencyDepartmentList}" var="list" varStatus="status">
                                <option value="${list.code}" ${list.code eq memberMap.department ? "selected" : "" }>${list.name}</option>
                            </c:forEach>
                        </select>
                    </div>

                    <div class="th">
                        <p class="tit required">회원명</p>
                    </div>
                    <div class="td ">
                        <input type="text" id="name" name="name" value="<c:out value="${memberMap.name}"/>">
                    </div>
                </div>
                <div class="tr" id="pdepartment" style="${memberMap.type eq 'p' ? '' : 'display:none'}">
                    <div class="th">
                        <p class="tit required">대리점명</p>
                    </div>
                    <div class="td">
                        <input type="text" id="departmentName" name="departmentName" disabled value="<c:out value="${memberMap.departmentName}"/>">
                        <select class="select ml10" id="pdepartmentc" name="pdepartmentc" onchange="departmentChange()">
                            <option value="">선택</option>
                            <c:forEach items="${UserPAgencyDepartmentList}" var="list" varStatus="status">
                                <option value="${list.code}" ${list.code eq memberMap.department ? "selected" : "" }>${list.name}</option>
                            </c:forEach>
                            <option value="999999" ${list.code eq memberMap.department ? "selected" : "" }>직접입력</option>
                        </select>
                    </div>

                    <div class="th">
                        <p class="tit required">대리점코드</p>
                    </div>
                    <div class="td ">
                        <input type="text" id="departmentCode" name="departmentCode" disabled value="<c:out value="${memberMap.department}"/>">
                    </div>
                </div>
                <div class="tr" id="pname" style="${memberMap.type eq 'p' ? '' : 'display:none'}">
                    <div class="th">
                        <p class="tit">대표자명</p>
                    </div>
                    <div class="td ">
                        <input type="text" id="representativeName" name="representativeName" value="<c:out value="${memberMap.representativeName}"/>">
                    </div>
                    <div class="th">
                        <p class="tit required">회원명</p>
                    </div>
                    <div class="td ">
                        <input type="text" id="name2" name="name2" value="<c:out value="${memberMap.name}"/>">
                    </div>
                </div>
                <div class="tr">
                    <div class="th">
                        <p class="tit required">E-mail</p>
                    </div>
                    <div class="td">
                        <c:set var="email" value="${fn:split(memberMap.email,'@')}" />
                        <input type="email" id="email1" name="email1" class="mr5" value="<c:out value="${email[0]}"/>"> @ <input id="email2" name="email2" type="email" class="ml5" value="<c:out value="${email[1]}"/>">
                    </div>
                    <div class="th">
                        <p class="tit">회원연락처</p>
                    </div>
                    <div class="td ">
                        <c:set var="telNo" value="${fn:split(memberMap.telNo,'-')}" />
                        <input type="tel" value="<c:out value="${telNo[0]}"/>" id="tel1" name="telNo1"> <span class="dec-ico">-</span>
                        <input type="tel" value="<c:out value="${telNo[1]}"/>" id="tel2" name="telNo2"> <span class="dec-ico">-</span>
                        <input type="tel" value="<c:out value="${telNo[2]}"/>" id="tel3" name="telNo3">
                    </div>
                </div>
            </div>
        </div>

        <div class="row-btns">
            <span class="col"><button type="button" class="btn-gray-sm" onclick="fnCancel();">취소</button></span>
            <span class="col"><button type="button" class="btn-red-sm" onclick="fnValidation()">변경</button></span>
            <span class="col"><button type="button" class="btn-red-sm line pw-change-btn" onclick="fnPasswordChange();">비밀번호 변경</button></span>
        </div>


    </section>
</form>
<!-- //목록 페이지 테이블 아래 버튼 있는 경우 추가 -->
<div class="modal" id="modaltest1">
    <div class="modal-wrap" type="alert">
        <div class="modal-content">
            <p>저장하시겠습니까?</p>
            <div class="btns include-red-stroke">
                <a href="javascript:" onclick="UI.modal.close(modaltest1);" class="btn--red-stroke modal__btn" id="cancel">취소</a>
                <a href="javascript:" onclick="fnSave();" class="btn--red modal__btn" id="ok">확인</a>
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