package com.pumpkin.melon.cmmn.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.pumpkin.melon.usr.member.service.MemberVO;

public class LoginInterceptor extends HandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		final HttpSession session = request.getSession();
		String path = request.getRequestURI();
		String serviceGubn = "";

		if(!path.equals("/main")) {
			serviceGubn = path.substring(1,path.indexOf("/", 1));
		}

		boolean ajax = "XMLHttpRequest".equals(request.getHeader("X-Requested-With"));
		if(ajax){
			return ajax;
		} else {
			if(serviceGubn.equals("mng")) {

				if (session.getAttribute("loginMngVO") == null) {
					if(path.contains("/mng/member/memberLogin") || path.contains("/mng/member/memberLoginAjax") || path.contains("/mng/member/memberfindId")
							|| path.contains("/mng/member/memberfindIdAjax") || path.contains("/mng/member/memberfindPw")
							|| path.contains("/mng/member/memberfindPwAjax") || path.contains("/mng/member/memberAccessFail")
							|| path.contains("/mng/service/video/videoGabiaSuccess") || path.contains("/mng/service/video/videoGabiaFail")
							|| path.contains("/mng/solution/video/videoGabiaSuccess") || path.contains("/mng/solution/video/videoGabiaFail")
							|| path.contains("/mng/common/termsUse") || path.contains("/mng/common/termsPrivacy")
					) {
						return true;
					}else {
						response.sendRedirect("/mng/member/memberLogin");
						return false;
					}
				}else {
					MemberVO loginVO = (MemberVO) session.getAttribute("loginMngVO");

					// 권한목록 (그룹권한 + 게시물권한)
					if(path.equals("/support/licenseRegistFormPopup") || path.equals("/support/licenseRequest") ) {
						if(loginVO.getUserAccessProgram().contains(path)) {
							return true;
						}else {
							return false;
						}
					}else {
						if(path.contains("/mng/member/memberLogin") || path.contains("/mng/member/memberLoginAjax")  || path.contains("/mng/member/memberfindId")
								|| path.contains("/mng/member/memberfindIdAjax") || path.contains("/mng/member/memberfindPw")
								|| path.contains("/mng/member/memberfindPwAjax")) {
							response.sendRedirect("/mng/board/notice/noticeList");
							return true;
						}else if(path.contains("/mng/member/memberlogOut") || path.contains("/mng/member/memberAccessFail")
								|| path.contains("/mng/common/termsUse") || path.contains("/mng/common/termsPrivacy")) {
							return true;
						}else if(path.contains("/mng/cmm/fms/FileDown")) {
							if(session.getAttribute("loginMngVO") != null) {
								return true;
							}else {
								response.sendRedirect("/mng/member/memberLogin");
								return false;
							}
						}else {
							String Accesspath = path.substring(0,path.lastIndexOf("/"));
							if(loginVO.getUserAccessProgram().contains(Accesspath)) {
								return true;
							}else {
								response.sendRedirect("/mng/member/memberAccessFail");
								return false;
							}
						}
					}
				}
			}else {
				if (session.getAttribute("loginVO") == null) {
					if(path.contains("/usr/member/memberLogin") || path.contains("/usr/member/memberLoginAjax") || path.contains("/usr/member/memberfindId")
							|| path.contains("/usr/member/memberfindIdAjax") || path.contains("/usr/member/memberfindPw")
							|| path.contains("/usr/member/memberfindPwAjax") || path.contains("/usr/member/memberAccessFail")
							|| path.contains("/usr/common/termsUse") || path.contains("/usr/common/termsPrivacy")
							) {
						return true;
					}else {
						response.sendRedirect("/usr/member/memberLogin");
						return false;
					}
				}else {
					MemberVO loginVO = (MemberVO) session.getAttribute("loginVO");

					// 권한목록 (그룹권한 + 게시물권한)
					if(path.equals("/support/licenseRegistFormPopup") || path.equals("/support/licenseRequest")) {
						if(loginVO.getUserAccessProgram().contains(path)) {
							return true;
						}else {
							return false;
						}
					}else {
						if(path.contains("/usr/member/memberLogin") || path.contains("/usr/member/memberLoginAjax")  || path.contains("/usr/member/memberfindId")
								|| path.contains("/usr/member/memberfindIdAjax") || path.contains("/usr/member/memberfindPw")
								|| path.contains("/usr/member/memberfindPwAjax")) {
							response.sendRedirect("/main");
							return true;
						}else if(path.contains("/usr/member/memberlogOut") || path.contains("/usr/member/memberAccessFail")
								|| path.contains("/usr/common/termsUse") || path.contains("/usr/common/termsPrivacy")
								|| path.contains("/search/integrateSearch/integrateSearchList") || path.contains("/usr/member/memberChangePassword")
								|| path.contains("/search/quickSearch/quickSearchList") || path.contains("/search/integrateSearch/integrateSearchList")
								|| path.contains("/usr/member/memberChangeForm")) {
							return true;
						}else if(path.contains("/usr/cmm/fms/FileDown")) {
							if(session.getAttribute("loginVO") != null) {
								return true;
							}else {
								response.sendRedirect("/usr/member/memberLogin");
								return false;
							}
						}else {
							String Accesspath = path.substring(0,path.lastIndexOf("/"));
							if(loginVO.getUserAccessProgram().contains(Accesspath)) {
								return true;
							}else {
								response.sendRedirect("/usr/member/memberAccessFail");
								return false;
							}
						}
					}
				}
			}
		}
	}
}
