var reqEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var replaceNotInt = /[^0-9]/gi;

//페이지 타이틀 변경시
var setPageTitle = function(str){
	if(str){
		document.title = str + " | 교통 데이터 거래소";
	}
}

/*
 * input 입력값 여부
 * if(isFillValue($("#inputId")))
 */

function isFillValue($obj){
	return ($.trim($obj.val()) == "") ? false : true;
}

/*
 * capsLock 여부 처리하기 input의 onkeypress="capsLock(evetn);" 로 사용함
*/

function capsLock(event,divCapsLock){    
    var name = "#"+divCapsLock;
    try {
	   if(event.type == "keyup"){
		    if(event.getModifierState("CapsLock")){
		        $(name).css('display', 'block');
		    }
		    else{
		    	 $(name).css('display', 'none');
		    } 
	   }
	}
	catch(err) {
	}

    return;
}


function hideCapsLock(event,divCapsLock){
    var name = "#"+divCapsLock;
	$(name).css('display', 'none');
    return;
}


/*
 * setCookie
 */
function setCookie(cname,cvalue,exdays) {
	document.cookie = cname + "=" + cvalue + ";"; 
}

/*
 * getCookie
 */
function getCookie(Name) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
		    if (c.indexOf(name) == 0) {
		    	return c.substring(name.length, c.length);
		    }
		}
	return "";
}

/*
 * 휴대전화 자동 - 입력
 * onKeyPress="inputPhoneNumber(this);"
 */
function inputPhoneNumber(obj) {
    var number = obj.value.replace(replaceNotInt, "");
    var phone = "";
    if(number.length < 4) {
    	obj.value = number;
        return false;
    } else if(number.length < 7) {
        phone += number.substr(0, 3);
        phone += "-";
        phone += number.substr(3);
    } else if(number.length < 11) {
        phone += number.substr(0, 3);
        phone += "-";
        phone += number.substr(3, 3);
        phone += "-";
        phone += number.substr(6);
    } else {
        phone += number.substr(0, 3);
        phone += "-";
        phone += number.substr(3, 4);
        phone += "-";
        phone += number.substr(7);
    }
    obj.value = phone;
}

/*
* 전화 자동 - 입력
* onKeyPress="TelFormatter(this);"
*/
function TelFormatter(obj){
	var num = obj.value.replace(replaceNotInt, "");
    var formatNum = '';
    if(num.length < 4 ){
    	obj.value = num;
        return false;
    }else if(num.length==8){
        formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
    }else if(num.length==11){
    	formatNum =  num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }else{
        if(num.indexOf('02') == 0){
            formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
        }else{
            formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        }
    }
    obj.value = formatNum;
}

/*
 * 출처 : https://m.blog.naver.com/PostView.nhn?blogId=cacung82&logNo=220797633911 가공함.
 */
function phoneFomatter(num,type){
    var formatNum = '';
    if(num.length==11){
        formatNum =  (type==0) ? num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3') : num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }else if(num.length==8){
        formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
    }else{
        if(num.indexOf('02') == 0){
            formatNum = (type==0) ? num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3') : num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
        }else{
            formatNum = (type==0) ? num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3') : num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        }
    }
    return formatNum;
}

function onlyNumber(){
    if(event.keyCode<48 || event.keyCode>57){
        event.returnValue=false;
     }
}

jQuery.fn.serializeObject = function() {
    var obj = null;
    try {
        if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
            var arr = this.serializeArray();
            if (arr) {
                obj = {};
                jQuery.each(arr, function() {
                    obj[this.name] = this.value;
                });
            }//if ( arr ) {
        }
    } catch (e) {
        alert(e.message);
    } finally {
    }

    return obj;
};

/*
 * comma 넣기
 */
function numberWithCommas(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/*
 * obj의 배열여부 확인하기
 */
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

//사용법 : ComUtils.callAjax
var ComUtils = {

		callAjax : function (url, param) {
		    var result;
			$.ajax({
				type:'POST',
				contentType : "application/json;charset=UTF-8",
				async:false,
				url:url,
				data:param,
				dataType:'json',
		        success: function(response) {
		        	result = response;
					return response;
		        },
				error:function(response) {
		        	result = response;
					return response;
				}
			});
			return result;
		}
		, callAsncAjax : function (url, param, callBack) {
		    var result;
			$.ajax({
				contentType : "application/json;charset=UTF-8",
				type:'post',
				async:true,
				url:url,
				data:param,
				dataType:'json',
		        success: function(response) {
		        	if (!ComUtils.isEmpty(callBack)) {
			        	callBack(response);
		        	}
		        },
				error:function(response) {
		        	if (!ComUtils.isEmpty(callBack)) {
			        	callBack(response);
		        	}
				}
			});
		}
		, callAsncAjaxMultipart : function (form, url, param, callBack) {
		    var result;
			$(form).ajaxSubmit({
				type:'post',
				async:true,
				url:url,
				data:param,
				dataType:'json',
		        success: function(response) {
		        	if (!ComUtils.isEmpty(callBack)) {
			        	callBack(response);
		        	}
		        },
				error:function(response) {
		        	if (!ComUtils.isEmpty(callBack)) {
			        	callBack(response);
		        	}
				}
			});
		}, isEmpty : function(arg){
			try {
				if (arg == null || arg == undefined || (arg + "") == "") return true;
				else return false;
			} catch (e) {
				return true;
			}
		}
		, nvl : function(arg, defaultStr){
			if (ComUtils.isEmpty(arg)) {
				if (ComUtils.isEmpty(defaultStr)) {
					return "";
				} else {
					return defaultStr;
				}
			} else {
				return arg;
			}
		}
		, getFormData : function (form) {
            var rtnJson = {};
            if (form.substr(0, 1) != "#") {
                form = "#" + form;
            }

            $(form).find("input, select, textarea").each(function(i, item) {
                rtnJson[ComUtils.nvl($(item).attr("id"), $(item).attr("name"))] = ComUtils.getValue(item);
            });
            return rtnJson;
        }
    	, setFormData : function (form, data) {
            if (form.substr(0, 1) != "#") {
                form = "#" + form;
            }

            $(form).find("input[type=text], select, textarea").each(function(i, item) {
                ComUtils.setValue($(item).attr("id"), ComUtils.nvl(data[$(item).attr("id")], ""));
            });
        }
        , setValue : function (id, value) {
            value = ComUtils.nvl(value);
            var item;
            if (typeof id == "string") {
                if (id.substr(0, 1) == "#") {
                    item = $(id);
                } else {
                    item = $("#" + id);
                }

                // 존재하지 않는 경우 이름으로 찾기
                if (item.length <= 0) {
                    item = $("input[name="+id+"]");
                    // $(':radio[name="radioSwitch"]:checked').val();
                }
            } else {
                item = id;
            }

            if ($(item).length > 0) {
                var typ = ComUtils.getType(item);
                if (typ == "text" || typ == "hidden" || typ == "password" || typ == "textarea") {
                    $(item).val(value);
                } else if (typ == "select-one") {
                    $(item).val(value);
                } else if (typ == "checkbox") {
                    $(item).prop('checked', !ComUtils.isEmpty(value));
                } else {
                    $(item).val(value);
                }
            }
        }
        , getValue : function (id) {
            var item;
            if (typeof id == "string") {
                if (id.substr(0, 1) == "#") {
                    item = $(id);
                } else {
                    item = $("#" + id);
                }

                // 존재하지 않는 경우 이름으로 찾기
                if (item.length <= 0) {
                    item = $("input[name="+id+"]");
                    // $(':radio[name="radioSwitch"]:checked').val();
                }
            } else {
                item = id;
            }

            var typ = ComUtils.getType(item);
            var rtnValue = "";
            if (typ == "text" || typ == "hidden" || typ == "password") {
                rtnValue = $(item).val().trim();
            } else if (typ == "select-one") {
                rtnValue = $(item)[0].value;
                // rtnValue = $("#" + $(item).attr("id") + " > option:selected").val();
            } else if (typ == "radio") {
                rtnValue = $(':radio[name="'+$(item).attr("name")+'"]:checked').val();
            } else if (typ == "checkbox") {
                if ($(item).is(":checked")) {
                    rtnValue = $(item).val();
                }
            } else {
                rtnValue = $(item).val();
            }
            return ComUtils.nvl(rtnValue);
        }
        // get type of the specified object
        , getType : function (item) {
            try {
                return $(item)[0].type;
            } catch (e) {
                ComUtils.log(item);
            }
        }
    	, getArrayString : function(arr) {
    		var str = "";
        	if (!this.isEmpty (arr)) {
	        	for (var i=0; i<arr.length; i++) {
	        		if (i==0) {
	        			str = arr[i];
	        		} else {
	        			str = str + "," + arr[i];
	        		}
	        	}
        	}
        	return str;
        }
        , clearForm : function (id) {
            $(id + " :input").each(function(i, item) {
                if (ComUtils.getType(this) != "button") {
                    ComUtils.setValue($(this), "");
                }
            });
        }
		, xssFilter : function(str, level){
    		/*
    		 * str  : [필수] 크로스사이트 스크립팅을 검사할 문자열
    		 * level    : [옵션] 검사레벨
    		 *            0 (기본) -> XSS취약한 문자 제거
    		 *            1 (선택) -> 단순한 <, > 치환
    		 */
    		if ( level == undefined || level == 0 ) {
    			str = str.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g,"");
			  }
			  else if (level != undefined && level == 1 ) {
				  str = str.replace(/\</g, "&lt;");
				  str = str.replace(/\>/g, "&gt;");
			  }
			  return str;
    	},
		xssDecode : function(str){
    		/*
    		 * 인코딩된 html 태그 디코딩 처리
    		 * str  : [필수] 크로스사이트 스크립팅을 검사할 문자열
    		 * ex   : ComUtils.xssDecode(str);
    		 */
			if(str != null){
				str = str.replace(/&lt;/g, '<');
				str = str.replace(/&gt;/g, '>');
				str = str.replace(/&amp;lt;/g, '<');
				str = str.replace(/&amp;gt;/g, '>');
				str = str.replace(/&amp;amp;lt;/g, '<');
				str = str.replace(/&amp;amp;gt;/g, '>');
				str = str.replace(/&amp;amp;nbsp;/g, ' ');
				str = str.replace(/&amp;amp;amp;/g, '&');
				str = str.replace(/&amp;amp;lsquo;/g, '‘');
				str = str.replace(/&amp;amp;rsquo;/g, "’");
				str = str.replace(/&amp;amp;#39;/g, "’");
				str = str.replace(/&amp;amp;#40;/g, "(");
				str = str.replace(/&amp;amp;#41;/g, ")");
				str = str.replace(/&amp;amp;quot;/g, '"');
				str = str.replace(/&amp;amp;middot;/g, '·');
				str = str.replace(/&amp;amp;lt;/g, "<");
				str = str.replace(/&amp;amp;gt;/g, ">");
				str = str.replace(/&#39;/g, "'");
				str = str.replace(/&amp;nbsp;/g, " ");
	            str = str.replace(/&amp;quot;/g, '"');
	            str = str.replace(/&amp;middot;/g, "·");
				//str = str.replace(/quot;/g, '"');// 잘못된 코드 변환
				//str = str.replace(/nbsp;/g, " ");// 잘못된 코드 변환
				//str = str.replace(/middot;/g, "·");// 잘못된 코드 변환
				str = str.replace(/&amp;/g, "&");

				//str = str.replace(/lt;/g, " ");// 잘못된 코드 변환
				//str = str.replace(/gt;/g, " ");// 잘못된 코드 변환
	            //str = str.replace(/&/g, " ");// 잘못된 코드 변환
	            //str = str.replace(/amp;/g, " "); // 잘못된 코드 변환
			}

			return str;
    	}
};


/**
 * modal 보여주는 공통 함수
 * modalId : modal id명
 * id : 구분자 id
 * callback : 모달의 확인 버튼 클릭 시 실행되는 callback 함수명
 * 
 * cancel : 취소
 * list : 목록
 * save : 저장
 * delete : 삭제
 * replySave : 댓글 저장
 * replyDelete : 댓글 삭제
 * 
 * title : 제목
 * contents : 내용
 * replyContents : 댓글
 * saveOk : 저장 성공
 * saveFail : 저장 실패
 * deleteOk : 삭제 성공
 * deleteFail : 삭제 실패
 */
function fnModalOpen(modalId, id, callback){
	//modaltest1 모달은 취소, 확인 두 버튼 있음. modaltest2 모달은 확인 버튼만 있음
	var msg = '';
	if(modalId=='modaltest1'){
		if(id=='cancel'){
			msg = '정보등록을 취소하시겠습니까?';
		}else if(id=='list'){
			msg = '정보등록 없이 목록으로<br/>이동하시겠습니까?';
		}else if(id=='save'){
			msg = '저장하시겠습니까?';
		}else if(id=='update'){
			msg = '상태정보를 변경 하시겠습니까?';
		}else if(id=='delete'){
			msg = '등록정보를 삭제 하시겠습니까?';
		}else if(id=='replySave'){
			msg = '댓글을 등록하시겠습니까?';
		}else if(id=='replyDelete'){
			msg = '댓글을 삭제하시겠습니까?';
		}else if(id=='PassWdChkCancel'){
			msg = '비밀번호 변경을 취소 하시겠습니까?'
		}else if(id=='memberChangeCancel'){
			msg = '개인정보 변경을 취소 하시겠습니까?'
		}
		
		$('#'+modalId).find('#cancel').attr('onclick','UI.modal.close('+modalId+');')
		$('#'+modalId).find('p').html(msg);
		$('#'+modalId).find('#ok').attr('onclick',callback);
	}else if(modalId=='modaltest2'){
		//벨리데이션과 저장 후 메시지 표시사용
		if(id=='title'){
			msg = '제목을 입력하여 주십시오.';
		}else if(id=='contents'){
			msg = '내용을 입력하여 주십시오.'
		}else if(id=='modelCode'){
			msg = '제품 카테고리를 선택하여 주십시오.'
		}else if(id=='pcLinkCategory' || id=='mobileLinkCategory'){
			msg = '최상위 분류를 입력하여 주십시오.'
		}else if(id=='pcLinkFolder' || id=='mobileLinkFolder'){
			msg = '폴더값을 입력하여 주십시오.'
		}else if(id=='replyContents'){
			msg = '댓글 내용을 입력하여 주십시오.'
		}else if(id=='file'){
			msg = '첨부파일을 첨부하여 주십시오.'
		}else if(id=='id' || id=='passWd'){
			msg = '아이디 및 비밀번호를 확인하여 주십시오.'
		}else if(id=='idCheck'){
			msg = '아이디 중복확인을 해주세요.'
		}else if(id=='emailCheck'){
			msg = '이메일 중복확인을 해주세요.'
		}else if(id=='telNo'){
			msg = '회원 연락처를 입력해 주십시오.'
		}else if(id=='name'){
			msg = '회원명을 입력해 주십시오.'
		}else if(id=='email'){
			msg = 'E-mail을 입력해 주십시오.'
		}else if(id=='agree'){
			msg = '\"로그인 동의\"를 체크하신 후, <br/>로그인 하여 주세요.'
		}else if(id=='idFindUser'){
			msg = '회원 가입 시, 등록한 성명 및 이메일을 확인하여 주십시오.'
		}else if(id=='idFindUserEmail'){
			msg = '아이디를 입력하신 회원가입 시 등록한 이메일로 발송하였습니다.'
		}else if(id=='pwFindUser'){
			msg = '회원 가입 시, 등록한 성명, 아이디 및 이메일을 확인하여 주십시오.'
		}else if(id=='pwFindUserEmail'){
			msg = '비밀번호를 입력하신 회원가입 시 등록한 이메일로 발송하였습니다.'
		}
		else if(id=='userName'){
			msg = '성명을 입력하여 주십시오.';
		}else if(id=='userId'){
			msg = '아이디를 입력하여 주십시오.';
		}else if(id=='userEmail'){
			msg = '가입시 사용한 이메일을 입력하여 주십시오.';
		}
		else if(id=='perPassWd'){
			msg = '기존 비밀번호를 입력하여 주십시오.'
		}else if(id=='newPassWd'){
			msg = '신규 비밀번호를 입력하여 주십시오.'
		}else if(id=='newPassWdChk'){
			msg = '신규 비밀번호를 재입력하여 주십시오.'
		}else if(id=='passWdFail'){
			msg = '기존 비밀번호가 유효하지 않습니다. 재입력하여 주십시오.'
		}else if(id=='chkPassWd'){
			msg = '입력하신 입력/재입력 신규 비밀번호가 동일하지 않습니다. 재입력하여 주십시오.'
		}else if(id=='chkPassSuccess'){
			msg = '비밀번호가 변경되었습니다. 재로그인 하십시오.'
		}else if(id=='accessCategoryName'){
			msg = '카테고리명을 입력하여 주십시오.'
		}else if(id=='accessCategoryCode'){
			msg = '카테고리코드를 입력하여 주십시오.'
		}else if(id=='cateroyChk'){
			msg = '코드정보가 이미 등록되어 있습니다. 다시 입력하여 주십시오.'
		}else if(id=='categoryCode'){
			msg = '권한 카테고리를 선택하여 주십시오.';
		}else if(id=='categoryCodeChk'){
			msg = '이미 권한으로 저장된 권한카테고리입니다. 다른 권한카테고리를 선택하십시오.';
		}else if(id=='userChk'){
			msg = '해당 권한을 가진 사용자가 존재합니다. 해당 권한에 속한 사용자를 다른 권한카테고리로 변경 후 삭제 가능합니다.';
		}else if(id=='menuCategoryGubn'){
			msg = '시스템구분 값을 선택하십시오.';
		}else if(id=='menuCategorySeq'){
			msg = '메뉴위치 값을 선택주십시오.';
		}else if(id=='masterCode'){
			msg = '권한코드를 입력하여 주십시오.';
		}else if(id=='masterName'){
			msg = '권한명을 입력하여 주십시오.';
		}else if(id=='menuUrl'){
			msg = 'URL를 입력하여 주십시오.';
		}else if(id=='saveOk'){
       		msg = '저장 성공하였습니다.'
		}else if(id=='saveFail'){
			msg = '저장 실패하였습니다.'
		}else if(id=='deleteOk'){
       		msg = '삭제 성공하였습니다.'
		}else if(id=='deleteFail'){
			msg = '삭제 실패하였습니다.'
		}else if(id =='version'){
			msg = '버전을 입력하여 주십시오.'
		}else if(id =='groupCode'){
			msg = '회원그룹을 선택해 주십시오.'
		} else if(id == 'department') {
			msg = '부서를 선택해 주십시오.'
		} else if(id == 'pdepartmentc') {
			msg = '대리점을 선택해 주십시오.'
		} else if(id == 'departmentCode') {
			msg = '대리점 코드를 입력해 주십시오.'
		} else if(id == 'password') {
			msg = '비밀번호를 입력해 주십시오.'
		} else if(id == 'passwordChk') {
			msg = '비밀번호 확인을 입력해 주십시오.'
		} else if(id=='passwordChkErr'){
			msg = '입력하신 비밀번호, 비밀번호 확인이 동일하지 않습니다.'
		} else if(id =='ambdPw'){
			msg = '비밀번호를 6~20자리로 입력하여 주세요.'
		} else if(id =='ambdPwChk'){
			msg = '비밀번호를 확인하여 주십시오.'
		} else if(id =='idChkOk'){
			msg = '사용 가능한 아이디입니다.'
		} else if(id =='idChkFail'){
			msg = '중복된 아이디입니다.'
		} else if(id =='emailChkOk'){
			msg = '사용 가능한 이메일입니다.'
		} else if(id =='emailChkFail'){
			msg = '중복된 이메일입니다.'
		}
		
		$('#'+modalId).find('p').html(msg);
		$('#'+modalId).find('a').attr('onclick',callback);
	}
	UI.modal.open(eval(modalId));		//모달창 보여주기
}

//벨리데이션 메시지 표시 후 포커스 이동해주는 로직
function fnValidatonFocus(id){
	if(id=='contents'){
		oEditors.getById['contentBody'].exec('FOCUS'); 
	}else{
		$('#'+id).focus();
	}
	UI.modal.close(modaltest2)
}

/**
 * fnSrchItemComboAjax
 * 검색박스에서 카테고리 콤보박스 동적으로 그려주는 함수
 * tagId : 이벤트 일어난 콤보박스 id
 * cd1 : ID_CD2
 * cd2 : ID_CD3
 */
function fnSrchItemComboAjax(tagId, cd1, cd2){
	var nextTagId = '';
	if(tagId =='srchDepth1' || tagId =='itemDepth1' || tagId =='quickSrchDepth1'){
		if(tagId =='srchDepth1'){
			nextTagId = 'srchDepth2';
			$('#srchDepth3>option').remove();
			$('#srchDepth3').append('<option value="">선택</option>');
		}else if(tagId =='itemDepth1'){
			nextTagId = 'itemDepth2';
			$('#itemDepth3>option').remove();
			$('#itemDepth3').append('<option value="">선택</option>');
		}else if(tagId =='quickSrchDepth1'){
			nextTagId = 'quickSrchDepth2';
			$('#quickSrchDepth3>option').remove();
			$('#quickSrchDepth3').append('<option value="">선택</option>');
		}
		
	}else if(tagId =='srchDepth2' || tagId =='itemDepth2' || tagId =='quickSrchDepth2'){
		if(tagId =='srchDepth2'){
			nextTagId = 'srchDepth3';
		}else if(tagId =='itemDepth2'){
			nextTagId = 'itemDepth3';
		} else if(tagId =='quickSrchDepth2'){
			nextTagId = 'quickSrchDepth3';
		}
	}
	
	$('#'+nextTagId+'>option').remove();
	$('#'+nextTagId).attr('readonly', false);
	$('#'+nextTagId).attr('disabled', false);
	var param = {'tagId': tagId, 'cd1' : cd1, 'cd2' : cd2};
	var saveUrl = '/common/itemComboChangeAjax';
    $.ajax({
       type :"POST",
       contentType: 'application/json;charset=UTF-8',
       url : saveUrl,
       data:  JSON.stringify(param),
       dataType : 'json',
       async: false,
       success:function(result){
    	   if(result.code == "0000") {
            	var list = result.list;
            	var optionHtml = '<option value="">선택</option>';
            	if(list.length > 0){
            		for(var j =0; j<list.length; j++){
            			var selHtml = '';
            			
            			var selTagId = '';
            			if(tagId == 'srchDepth1' || tagId == 'itemDepth1'){
            				selTagId=depth2;
            			}else if(tagId == 'srchDepth2' || tagId == 'itemDepth2'){
            				selTagId=depth3;
            			}
            			if(list[j].cd == selTagId){
            				selHtml = 'selected=selected';
            			}
	            		optionHtml += '<option value="'+list[j].cd+'"'+ selHtml+'>'+list[j].nm+'</option>';
	            	}
            	}
            	$('#'+nextTagId).append(optionHtml);
    	   }
       }
   });
}

/**
 * 리스트 화면에서 검색 필수 체크 로직 
 * fnSrchValidation
 * srchDepth1, srchDepth2, srchDepth3: 제품카테고리
 * srchGubn , srchKeyword : 검색어관련
 */
function fnSrchValidation(){
	var result = true;
	if($('#srchDepth1').val() != '' || $('#srchDepth2').val() != ''){
		if($('#srchDepth3').val()==''){
			$('#modaltest2').find('p').text('제품 카테고리를 선택해주세요.');
			$('#modaltest2').find('a').attr('onclick','fnChkModalClose(\'srchDepth\')');
			UI.modal.open(modaltest2);		//모달창 보여주기
			result = false;
		}
	}
	
	if(result){
		$('.loop').each(function(index){
			var srchGubn = $(this).find('select[name=srchGubn]').val();
			var srchKeyword = $(this).find('input[name=srchKeyword]').val();
			if(srchGubn == 'title' && srchKeyword =='' || srchGubn == 'name' && srchKeyword ==''){
				$('#modaltest2').find('p').text('검색어를 입력해주세요.');
				$('#modaltest2').find('a').attr('onclick','fnChkModalClose(\'srchGubn\',\''+index+'\')');
   				UI.modal.open(modaltest2);		//모달창 보여주기
   				result = false;
			}
		});
	}
	return result;
}
	
/**
 * 리스트화면의 검색박스부분 포커스 주는 함수 
 * fnChkModalClose
 * gubn : (srchDepth :제품카테고리 / srchGubn : 검색어 )
 * 모달창 닫기 제품 카테고리, 검색어 포커스 주기
 */
function fnChkModalClose(gubn, index){
	UI.modal.close(modaltest2);
	if(gubn=='srchDepth'){
		if($('#srchDepth1').val() != ''){
			$('#srchDepth2').focus();
		}
		if($('#srchDepth2').val() != ''){
			$('#srchDepth3').focus();
		}
	}else if(gubn=='srchGubn'){
		var srchGubn = $('.loop:eq('+index+')').find('select[name=srchGubn]')
		var srchKeyword = $('.loop:eq('+index+')').find('input[name=srchKeyword]')
		if($(srchGubn).val() == 'title' || $(srchGubn).val() == 'name'){
			if($(srchKeyword).val()==''){
				$(srchKeyword).focus();
			}
		}
	}
}

/**
 * 관리자 화면에서 
 * 자료형태pc, mobile구분하여 파일과 링크 이벤트 로직
 * 
 * fnSelectAttachType
 * seldivId : 자료형태 pc/mobile 를 감싸고 있는 부분
 * 		pc : pc-div
 * 		mobile : mo-div
 * comboVal : 현재 콤보박스 선택된 값
 * atchFileId : 수정화면일 경우 등록된 파일 식별자 가 존재함
 * 		파일 식별자로 파일 삭제처리 필요하기 때문에 추가 
 */
function fnSelectAttachType( seldivId, comboVal, atchFileId){
	var sel_div = $('#'+seldivId);
	if(comboVal=='file' || comboVal=='f'){
		$(sel_div).find('input').val('');			//파일첨부일 경우 최상의분류, 폴더값 null 처리
		$(sel_div).find('.add-file').show();
		$(sel_div).find('.link-div').hide();
	}else if(comboVal=='link' || comboVal=='l'){
		//자료링크일때 파일 삭제해주는 로직 필요
		//등록된 파일일 경우 파일seq로 삭제배열에 바인딩해줌. 등록되어있지 않는 파일일 경우 임시파일배열에서 삭제함.
		if(atchFileId != ''){
			fn_del(atchFileId);
		}else{
			deleteFile(seldivId);					
		}
		$(sel_div).find('.add-file').hide();
		$(sel_div).find('.link-div').show();
		$(sel_div).find('.link-div').css('display', 'contents');
	}
}

/**
 * fnAccessChk
 * 로그인한 사용자가 해당 게시물에 권한이 있는지 여부 체크
 * seq : 게시물 seq
 */
function fnAccessChk(seq,listUrl){
	
	var flag = true;
	var menuUrl; 
		
	if(listUrl == undefined){
		menuUrl = document.location.href;
	}else{
		menuUrl = listUrl;
	}
	
	menuUrl = menuUrl.replace(/^.*\/\/[^\/]+/, '');
	var param = {'menuUrl': menuUrl, 'seq' : seq};
	var url = '/usr/member/memberAccessChk';

	$.ajax({
       type :"POST",
       contentType: 'application/json;charset=UTF-8',
       url : url,
       data:  JSON.stringify(param),
       dataType : 'json',
       async: false,
       success:function(result){
    	   if(result.code == "9999") {
    		   flag = false;
    	   }
       }
    });
	
	return flag;
	
}
/**
 * 권한관리 등록화면에서 접근메뉴설정 text로 붙여서 넘기는거 로직
 * @returns
 */
function fnAuthorityCategoryMenuArray(){
	var checkField1;
	var categorySeqs;
    var categoryGubns;
	
	var checkField2;
    var menuCodes;
    var menuSeqs;
    var menuGubns;
	
    var checkCategorySeqs = "";
    var checkCategoryGubns = "";
    var checkedCount1 = 0;

    var checkMenuCodes = "";
    var checkMenuSeqs = "";
    var checkMenuGubns = "";
    var checkedCount2 = 0;
    
	checkField1 = document.detailForm.checkField1;
	categorySeqs = document.detailForm.menuCategorySeq;
    categoryGubns = document.detailForm.menuCategoryGubn;
    
    if(checkField1) {
    	if(typeof(checkField1.length) != "undefined") {
            for(var i=0; i < checkField1.length; i++) {
                if(checkField1[i].checked) {
                    checkCategorySeqs += ((checkedCount1==0? "" : ", ") + categorySeqs[i].value);
                    checkCategoryGubns += ((checkedCount1==0? "" : ", ") + categoryGubns[i].value);
                    checkedCount1++;
                }
            }
        } else {
            if(checkField1.checked) {
                checkCategorySeqs = categorySeqs.value;
                checkCategoryGubns = categoryGubns.value;
                checkedCount1 = 1;
            }
        }
    }
    
    document.detailForm.categorySeq.value=checkCategorySeqs;
    document.detailForm.categoryGubn.value=checkCategoryGubns;
    
    
   	checkField2 = document.detailForm.checkField2;
    menuCodes = document.detailForm.menuCode;
    menuSeqs = document.detailForm.menuSeq;
    menuGubns = document.detailForm.menuGubn;
    
    if(checkField2) {
    	if(typeof(checkField2.length) != "undefined") {
            for(var i=0; i < checkField2.length; i++) {
                if(checkField2[i].checked) {
                    checkMenuCodes += ((checkedCount2==0? "" : ",") + menuCodes[i].value);
                    checkMenuSeqs += ((checkedCount2==0? "" : ", ") + menuSeqs[i].value);
                    checkMenuGubns += ((checkedCount2==0? "" : ", ") + menuGubns[i].value);
                    checkedCount2++;
                }
            }
        } else {
            if(checkField2.checked) {
                checkMenuCodes = menuCodes.value;
                checkMenuSeqs = menuSeqs.value;
                checkMenuGubns = menuGubns.value;
                checkedCount2 = 1;
            }
        }
    }

   	document.detailForm.cateMenuSeq.value=checkMenuSeqs;
   	document.detailForm.cateMenuGubn.value=checkMenuGubns;
   	document.detailForm.cateMenuCode.value=checkMenuCodes;
}



function fnQuickSearchList() {
	if($('#quickSrchDepth3').val() != ''){
		$('#quickSearchForm').attr('action', '/search/quickSearch/quickSearchList');
		$('#quickSearchForm').submit();
	}
}

function fnIntegrateSearch(){
	if($('#srchIntegratedKeyworld').val() != ''){
		$('#integrateSearchForm').attr('action', '/search/integrateSearch/integrateSearchList');
		$('#integrateSearchForm').submit();
	}
}