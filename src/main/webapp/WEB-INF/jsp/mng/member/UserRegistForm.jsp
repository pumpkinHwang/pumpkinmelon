<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/cmm/_header.jsp" %>
<script type="text/javascript" src="/lib/se2/js/service/HuskyEZCreator.js" charset="utf-8"></script>
<script type="text/javascript">
  
  	var idCheckf = "";
	function idCheck(){
		 if($('#id').val()==""){
			 fnModalOpen('modaltest2','userId','fnValidatonFocus(\'id\')');
			 return false;
		 }
		 var formData = new FormData();
		 formData.append("id",  $("#id").val());
		 var theUrl = "<c:url value='/mng/member/UserMng/UserMngIdCheck'/>";
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
	                        fnModalOpen('modaltest2','idChkOk', 'UI.modal.close(modaltest2)');
	                        idCheckf = "ok";
	                        $('#chkId').val(data.chkId);
	                    }else if(data.code == "1111") {//중복
	                        fnModalOpen('modaltest2', 'idChkFail' ,'UI.modal.close(modaltest2)');
	                        idCheckf = "";
	                        $('#chkId').val("");
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
	var emailCheckf = "";
	function emailCheck(){
		 if($('#email').val()==""){
			 fnModalOpen('modaltest2','email','fnValidatonFocus(\'email\')');
			 return false;
		 }
		 if($('#email1').val()==""){
			 fnModalOpen('modaltest2','email','fnValidatonFocus(\'email1\')');
			 return false;
		 }
		 var formData = new FormData();
		 formData.append("email",  $('input[name=email1]').val().concat('@',$('input[name=email2]').val()));
		 var theUrl = "<c:url value='/mng/member/UserMng/UserMngEmailCheck'/>";
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
	                        fnModalOpen('modaltest2','emailChkOk', 'UI.modal.close(modaltest2)');
	                        emailCheckf = "ok";
	                        $("#chkEmail").val(data.chkEmail);
	                    }else if(data.code == "1111") {//중복
	                        fnModalOpen('modaltest2','emailChkFail', 'UI.modal.close(modaltest2)');
	                        emailCheckf = "";
	                        $("#chkEmail").val("");
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
	
    //저장 버튼 클릭 시 벨리데이션 체크
    function fnValidation(){
    	var type = $('input[name=type]:checked').val();
    	
    	if($('#groupCode').val()==""){
            fnModalOpen('modaltest2', 'groupCode', 'fnValidatonFocus(\'groupCode\')');
            return false;
        }
        if(idCheckf != "ok" || $('#id').val() != $('#chkId').val()){
            fnModalOpen('modaltest2', 'idCheck','fnValidatonFocus(\'id\')');
            return false;
        }
        if(emailCheckf != "ok" || $('input[name=email1]').val().concat('@',$('input[name=email2]').val()) != $('#chkEmail').val()){
            fnModalOpen('modaltest2', 'emailCheck','fnValidatonFocus(\'email\')');
            return false;
        }
        if(type == 'd'){
	        if($('#name').val()==""){
	            fnModalOpen('modaltest2', 'name', 'fnValidatonFocus(\'title\')');
	            return false;
	        }
	        if($('#department').val()==""){
	            fnModalOpen('modaltest2', 'department', 'fnValidatonFocus(\'department\')');
	            return false;
	        }
        }else if(type == 'p'){
        	 if($('#name2').val()==""){
                 fnModalOpen('modaltest2', 'name', 'fnValidatonFocus(\'title\')');
                 return false;
             }
        	 if($('#departmentName').val()==""){
                 fnModalOpen('modaltest2', 'pdepartmentc', 'fnValidatonFocus(\'pdepartmentc\')');
                 return false;
             }
        	 if($('#departmentCode').val()==""){
                 fnModalOpen('modaltest2', 'departmentCode', 'fnValidatonFocus(\'departmentCode\')');
                 return false;
             }
        }
        if($('#email').val()==""){
            fnModalOpen('modaltest2', 'email', 'fnValidatonFocus(\'email\')');
            return false;
        }
        //저장관련 메시지
        fnModalOpen('modaltest1', 'save', 'fnSave();');
    }
	function typeChange(){
		var type = $('input[name=type]:checked').val();
		if(type == 'p'){
			$("#pdepartment").show(); 
			$("#pname").show();
			$("#ddepartment").hide(); 
		}else{
			$("#pdepartment").hide(); 
			$("#pname").hide();
			$("#ddepartment").show(); 
		}
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
    	var type = $('input[name=type]:checked').val();
        UI.modal.close(modaltest1);
		
        var formData = new FormData();
        formData.append("mode",  $("#mode").val());
        formData.append("id",  $("#id").val());
        formData.append("userType","user");
        formData.append("useYn", $('input[name=useYn]:checked').val());
        if(type == 'p'){
        formData.append("department",  $("#departmentCode").val());	
        formData.append("name",  $("#name2").val());	
        formData.append("type",  "p");
        }else{
        formData.append("department",  $("#department").val());
        formData.append("name",  $("#name").val());
        formData.append("type",  "d");
        }
        
        formData.append("groupCode",  $("#groupCode").val());
        formData.append("email",  $('input[name=email1]').val().concat('@',$('input[name=email2]').val()));
        formData.append("telNo",  $('input[name=telNo1]').val().concat('-',$('input[name=telNo2]').val(),'-',$('input[name=telNo3]').val()));
        formData.append("telNo2",  $('input[name=telNo2]').val());

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
                        fnModalOpen('modaltest2', 'saveOk', 'location.href="/mng/member/User/UserList"');
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

    //목록버튼 클릭 시
    function fnList(){
        fnModalOpen('modaltest1', 'list','location.href="/mng/member/User/UserList"');
    }

    //취소버튼 클릭 시
    function fnCancel(){
        fnModalOpen('modaltest1', 'cancel', 'location.href="/mng/member/User/UserRegistForm"');
    }

</script>
<form id="detailForm" name="detailForm"  method="post" enctype="multipart/form-data">
    <input type="hidden" id="mode" name="mode" value="INSERT" />
    <input type="hidden" id="modelCode" name="modelCode" value="" />
    <input type="hidden" id="chkId" name="chkId" value=""/>
    <input type="hidden" id="chkEmail" name="chkEmail" value=""/>
    <!-- table : edit page -->
    <div class="table-wrap edit2">
        <div class="top-wrap">
            <strong class="top-title">1. 계정 기본정보 설정</strong>
            <hr class="hr">
        </div>
        <div class="table-edit type2">
            <div class="tr">
                <div class="th">
                    <p class="tit">회원구분</p>
                </div>
                <div class="td radio-group" onchange="typeChange()">
					<label class="radio txt">
                        <input type="radio" name="type" id="type" checked value="d">
                        <i></i>
                        직조직
                    </label>
                    <label class="radio txt">
                        <input type="radio" name="type" id="type" value="p">
                        <i></i>
                        파트너
                    </label>
                </div>
                <div class="th">
                    <p class="tit">상태정보</p>
                </div>
                <div class="td radio-group">
                    <label class="radio txt">
                        <input type="radio" name="useYn" id="useYn" checked value="y">
                        <i></i>
                        활성
                    </label>
                    <label class="radio txt">
                        <input type="radio" name="useYn" id="useYn" value="n">
                        <i></i>
                        비활성
                    </label>
                </div>
            </div>
            <div class="tr">
                <div class="th">
                    <p class="tit">등록자</p>
                </div>
                <div class="td">
                    <input type="text" value="<c:out value="${loginMngVO.name}"/>" readonly disabled>
                </div>
                <div class="th">
                    <p class="tit">최초등록일</p>
                </div>
                <div class="td ">
                    <input type="text" value="<c:out value="${date}"/>" readonly disabled>
                </div>
            </div>
        </div>

        <div class="top-wrap">
            <strong class="top-title">2. 계정정보 상세등록</strong>
            <p class="txt"><span>*</span> 는 필수 입력정보입니다.</p>
            <hr class="hr">
        </div>

        <div class="table-edit type2">
            <div class="tr">
                <div class="th">
                    <p class="tit required">회원그룹</p>
                </div>
                <div class="td ">
					<select class="select" name="groupCode" id="groupCode">
                        <option value="">전체</option>
                        <c:forEach items="${UserGroupList}" var="userGroupList" varStatus="status">
                        <option value="${userGroupList.code }" ${userGroupList.code eq searchVO.groupCode ? "selected" : "" }><c:out value="${userGroupList.name}"/></option>
                        </c:forEach>
                    </select>
                </div>
                <div class="th">
                    <p class="tit required">아이디</p>
               </div>
               <div class="td">
                   <input type="text" id="id" name="id">
                   <a href="javascript: idCheck()" class="btn-white-sm line">중복확인</a>
               </div>
            </div>
            <div class="tr">
                <div class="th">
                    <p class="tit">비밀번호</p>
                </div>
                <div class="td ">
					<input type="text" id="password" name="password" disabled>
                </div>
                <div class="th">
                    <p class="tit">비밀번호 확인</p>
               </div>
                <div class="td ">
                	<input type="text" disabled>
                </div>
            </div>

            <div class="tr" id="ddepartment">
                <div class="th">
                    <p class="tit required">부서</p>
                </div>
                <div class="td" >
					<select class="select on" id="department" name="department">
                        <option value="">선택</option>
                        <c:forEach items="${UserAgencyDepartmentList}" var="list" varStatus="status">
                            <option value="${list.code}" >${list.name}</option>
                        </c:forEach>
                    </select>
                </div>
              
                <div class="th">
                    <p class="tit required">회원명</p>
               </div>
                <div class="td ">
                	<input type="text" id="name" name="name">
                </div>
            </div>
            <div class="tr" id="pdepartment" style ="display:none">
                <div class="th">
                    <p class="tit required">대리점명</p>
                </div>
                <div class="td select-row-3">
                           <div class="select-wrap">
                               <input type="text" id="departmentName" name="departmentName" disabled>
                           </div>
                           <div class="select-wrap">
                               <select class="select on" id="pdepartmentc" name="pdepartmentc" onchange="departmentChange()">
			                        <option value="">선택</option>
			                        <c:forEach items="${UserPAgencyDepartmentList}" var="list" varStatus="status">
			                            <option value="${list.code}">${list.name}</option>
			                        </c:forEach>
			                        <option value="999999" >직접입력</option>
			                    </select>
                           </div>
               </div>
              
                <div class="th">
                    <p class="tit required">대리점코드</p>
               </div>
                <div class="td ">
                	<input type="text" id="departmentCode" name="departmentCode" disabled>
                </div>
            </div>
            <div class="tr" id="pname" style ="display:none">
                <div class="th">
                    <p class="tit">대표자명</p>
                </div>
                <div class="td ">
					<input type="text">
                </div>
                <div class="th">
                    <p class="tit required">회원명</p>
               </div>
                <div class="td ">
                	<input type="text" id="name2" name="name2">
                </div>
            </div>
            <div class="tr">
                <div class="th">
                    <p class="tit required">E-mail</p>
                </div>
                <div class="td ">
                    <input type="text" class="wp90" id="email" name="email1">
                    <span class="sign">@</span>
                    <input type="text" class="wp90" id="email1" name="email2">
                    <a href="javascript: emailCheck()" class="btn-white-sm line">중복확인</a>
                </div>
                <div class="th">
                    <p class="tit">회원연락처</p>
               </div>
               <div class="td ">
                    <div class="td">
                        <input type="text" class="" id="telNo" name="telNo1">
                        <span class="sign">-</span>
                        <input type="text" class="" id="telNo" name="telNo2">
                        <span class="sign">-</span>
                        <input type="text" class="" id="telNo" name="telNo3">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- //table : edit page -->
    <!-- 목록 페이지 테이블 아래 버튼 있는 경우 추가 -->
    <div class="row-btns mt35">
        <span class="col"><button type="button" class="btn-gray-sm" onclick="fnCancel();">취소</button></span>
        <span class="col"><button type="button" class="btn-red-sm" onclick="fnValidation();">저장</button></span>
        <span class="col"><button type="button" class="btn-red-sm line" onclick="fnList();">목록</button></span>
    </div>
</div>
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
