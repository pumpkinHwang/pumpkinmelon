<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<script type="text/javascript">

function authorityModal(modalId){
	var url = '';
	var param = {};
	var popId = '';
	if(modalId=='modal7'){
		$('#'+modalId).empty();
		var codeArray = $('#accessCategoryCode').val().split(",");
		
		url = '<c:out value="/common/authorityListAjax"/>';
		popId = 'modaltest7';
		
		 $.ajax({
	       type :"POST",
	       contentType: 'application/json;charset=UTF-8',
	       url : url,
	       data:  JSON.stringify(param),
	       dataType : 'json',
	       async: false,
	       success:function(result){
	    	   if(result.code == "0000") {
	            	var list = result.list;
	            	var optionHtml = '';
	            	if(list.length > 0){
	            		for(var j =0; j<list.length; j++){
	            			if(j==0){
	            				optionHtml+='<li class="first"><label class="checkbox circle"><input type="checkbox" name="checkAll" id="chk-all" onclick="fnCheckAll(\''+modalId+'\');" title="전체선택"><i></i>그룹명 </label></li>'
	            			}else{
	            				var selHtml = '';
	            				if(codeArray.length > 0){
	            					for(var k=0; k<codeArray.length; k++){
	            						if(codeArray[k]==list[j].accessCategoryCode){
	            							selHtml = 'checked=checked';
	            						}
	            					}
	            				}
	            				optionHtml += '<li><label class="checkbox circle"><input type="checkbox" name="checkField7" id="checkField7-'+j+'" '+selHtml+'>'
	            				+'<input name="checkId7" type="hidden" value="'+list[j].accessCategoryCode+'"><input name="checkName7" type="hidden" value="'+list[j].accessCategoryName+'">'
	            				+'<i></i>'+list[j].accessCategoryName+' </label></li>';
	            			}
		            	}
	            	}
	            	$('#'+modalId).append(optionHtml);
	    	   }
	       }
	   });
			 
	}else if(modalId=='modal9'){
		$('#'+modalId).find('tbody').empty();
		var groupUserIdArray = $('#groupUserId').val().split(",");
		
		url = '<c:out value="/common/authorityUserIdListAjax"/>';
		popId = 'modaltest9';
		$.ajax({
	       type :"POST",
	       contentType: 'application/json;charset=UTF-8',
	       url : url,
	       data:  JSON.stringify(param),
	       dataType : 'json',
	       async: false,
	       success:function(result){
	    	   if(result.code == "0000") {
	            	var list = result.list;
	            	var optionHtml = '';
	            	if(list.length > 0){
	            		for(var j =0; j<list.length; j++){
	            			var selHtml = '';
            				if(groupUserIdArray.length > 0){
            					for(var k=0; k<groupUserIdArray.length; k++){
            						if(groupUserIdArray[k]==list[j].id){
            							selHtml = 'checked=checked';
            						}
            					}
            				}
	            			
            				optionHtml += '<tr><td><label class="checkbox circle"><input type="checkbox" name="checkField9" id="checkField9-'+j+'" '+selHtml+'>'
            				+'<input name="checkCode9" type="hidden" value="'+list[j].groupCode+'"><input name="checkId9" type="hidden" value="'+list[j].id+'">'
            				+'<input name="checkName9" type="hidden" value="'+list[j].name+'"><i></i></label></td>'
            				+'<td>'+list[j].id+'</td><td>'+list[j].name+'</td><td>'+list[j].typeName+'</td><td>'+list[j].departmentName+'</td><td>'+list[j].email+'</td></tr>';
		            	}
	            	}
	            	$('#'+modalId).find('tbody').append(optionHtml);
	    	   }
	       }
	   });
	}
	UI.modal.open(eval(popId));
}

function fnModalSelect(modalId){
	var popId = '';
	var checkField;
    var ids;
    var codes;
    var names;
    
    var checkIds = "";
    var checkNames = "";
    var checkCodes = "";
    var checkedCount = 0;
    
	if(modalId=='modal7'){
		popId = 'modaltest7';
		document.detailForm.accessCategoryCode.value ='';
		$('#'+modalId+'_name').empty();
		 
		checkField = document.modalForm.checkField7;
	    ids = document.modalForm.checkId7;
	    names = document.modalForm.checkName7;
    
	}else if(modalId=='modal9'){
		popId = 'modaltest9';
		document.detailForm.groupCode.value='';
    	document.detailForm.groupUserId.value='';
    	$('#'+modalId+'_name').empty();
    	
		checkField = document.modalForm.checkField9;
	    codes = document.modalForm.checkCode9;
	    ids = document.modalForm.checkId9;
	    names = document.modalForm.checkName9;
	}
	
    if(checkField) {
    	if(typeof(checkField.length) != "undefined") {
            for(var i=0; i < checkField.length; i++) {
                if(checkField[i].checked) {
                	if(modalId=='modal9'){
                    	checkCodes += ((checkedCount==0? "" : ",") + codes[i].value);
                	}
                    checkIds += ((checkedCount==0? "" : ",") + ids[i].value);
                    checkNames += ((checkedCount==0? "" : ", ") + names[i].value);
                    checkedCount++;
                }
            }
        } else {
            if(checkField.checked) {
            	if(modalId=='modal9'){
              	  checkCodes = codes.value;
            	}
                checkIds = ids.value;
                checkNames = names.value;
                checkedCount = 1;
            }
        }
    }
    if(checkedCount ==0){
		alert('항목을 선택해 주세요.');
		return false;
    }else{
    	if(modalId=='modal7'){
    		document.detailForm.accessCategoryCode.value=checkIds;
	    }else if(modalId=='modal9'){
	    	document.detailForm.groupCode.value=checkCodes;
	    	document.detailForm.groupUserId.value=checkIds;
	    }
    	$('#'+modalId+'_name').append(checkNames);
    	UI.modal.close(eval(popId))
    }
}

function fnCheckAll(modalId){
	var checkName = '';
	if(modalId=='modal7'){
		checkName = 'checkField7';
	}else if(modalId=='modal9'){
		checkName = 'checkField9';
	}
	var chkAllYn = $('#'+modalId).find('input:checkbox[id="chk-all"]').is(":checked") ;
   	$('#'+modalId).find('input:checkbox[name="'+checkName+'"]').each(function() {
   	      this.checked = chkAllYn; //checked 처리		     
    });
}
</script>
<!-- type7 -->
<form id="modalForm" name="modalForm" >
<div class="modal" id="modaltest7">
    <div class="modal-wrap  modal--m-size" type="layer">
        <div class="modal-content">
            <div class="content-wrap chk-include">
                <strong class="pop-tit mb15">접근그룹관리</strong>
                <ul class="chk-list-wrap" id="modal7">
                </ul>
            </div>
            <div class="btns">
                <a href="javascript:;" onclick="UI.modal.close(modaltest7)" class="btn--gray modal__btn">닫기</a>
                <a href="javascript:;" onclick="fnModalSelect('modal7');" class="btn--red modal__btn">선택</a>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modaltest9">
	<div class="modal-wrap modal__table-wrap modal--m-size" type="layer">
	    <div class="modal-content">
	        <div class="content-wrap chk-include">
	            <strong class="pop-tit">접근그룹관리</strong>
	            <div class="modal-tb" id="modal9">
	                <table>
	                    <colgroup>
	                        <col width="7%">
	                        <col width="15%">
	                        <col width="13%">
	                        <col width="17%">
	                        <col width="17%">
	                        <col width="31%">
	                    </colgroup>
	                    <thead>
	                        <tr>
	                            <th><label class="checkbox circle"><input type="checkbox" name="checkAll" id="chk-all" onclick="fnCheckAll('modal9');" title="전체선택"><i></i></label></th>
	                            <th>계정명</th>
	                            <th>성명</th>
	                            <th>구분</th>
	                            <th>부서</th>
	                            <th>이메일</th>
	                        </tr>
	                    </thead>
	                    <tbody>
	                    </tbody>
	                </table>
	            </div>
	        </div>
	        <div class="btns">
	            <a href="javascript:;" onclick="UI.modal.close(modaltest9)" class="btn--gray modal__btn">닫기</a>
	            <a href="javascript:;" onclick="fnModalSelect('modal9');" class="btn--red modal__btn">선택</a>
	            </div>
	        </div>
	    </div>
	</div>
	<!-- //popup -->
<!-- //popup -->
</form>