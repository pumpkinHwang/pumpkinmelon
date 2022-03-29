package com.pumpkin.melon.mng.member.web;

import java.util.List;


import com.pumpkin.melon.cmmn.util.SessionCookieUtil;
import com.pumpkin.melon.mng.member.service.MemberLoginMngService;
import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import com.pumpkin.melon.cmmn.mail.service.MailService;
import com.pumpkin.melon.cmmn.util.ReqUtils;
import com.pumpkin.melon.usr.member.service.MemberService;
import com.pumpkin.melon.mng.member.service.MemberMngVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.utl.sim.service.EgovClntInfo;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.ModelAndView;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.springmodules.validation.commons.DefaultBeanValidator;

@Controller("memberLoginMngController")
public class MemberLoginMngController {

	@Resource(name = "mngMemberLoginMngService")
	private MemberLoginMngService memberLoginMngService;
	
	@Resource(name = "memberService")
	private MemberService memberService;

	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;

	@Resource(name = "beanValidator")
	protected DefaultBeanValidator beanValidator;
	
	/** EgovMessageSource */
	@Resource(name = "egovMessageSource")
	EgovMessageSource egovMessageSource;
	
	@Resource(name="mailService")
	private MailService mailService;

	/**
	 * 로그인.로그인 페이지
	 * @param vo - memberLoginMngVO
	 * @param model
	 * @return "/mng/member/memberLogin"
	 * @exception Exception
	 */
	@RequestMapping(value = "/mng/member/memberLogin")
	public String memberLogin(@ModelAttribute("memberLoginMngVO") MemberMngVO memberMngVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		return "/mng/member/memberLoginForm";
	}
	
	/**
	 * 로그인.로그인 페이지
	 * @param vo - memberLoginMngVO
	 * @param model
	 * @return "/mng/member/memberLogin"
	 * @exception Exception
	 */
	@RequestMapping(value = "/mng/member/memberLoginAjax")
	public ModelAndView memberLoginAjax(HttpServletRequest request, HttpServletResponse response, ModelMap model
			, @RequestBody MemberMngVO memberMngVO) throws Exception {
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		if(!ReqUtils.getEmptyResult((String)memberMngVO.getId(),"").equals("")) {
			// 회원정보 조회
			memberMngVO.setRemoteAddress(EgovClntInfo.getClntIP(request));
			EgovMap loginMap = memberLoginMngService.memberLogin(memberMngVO);
		
			if(ReqUtils.getEmptyResult((String)loginMap.get("result"),"").equals("true")) {
				
				mv.addObject("code", "0000");
				
				if(ReqUtils.getEmptyResult((String)loginMap.get("message"),"").equals("changePassword")) {
					mv.addObject("code", "8888");
					mv.addObject("message", egovMessageSource.getMessage("fail.common.account.passwordchangeyn",request.getLocale()));
				}else if(ReqUtils.getEmptyResult((String)loginMap.get("message"),"").equals("changePasswordMonth")) {
					mv.addObject("code", "8888");
					mv.addObject("message", egovMessageSource.getMessage("fail.common.account.changePasswordMonth",request.getLocale()));
				}else {
				}
				
				if(ReqUtils.getEmptyResult((String)loginMap.get("sessionUserId"),"").equals("")){
					MemberMngVO loginMngVO = new MemberMngVO();
					loginMngVO = (MemberMngVO) ReqUtils.convertMapToObject(loginMap, loginMngVO);
					SessionCookieUtil.setSessionAttribute(request, "loginMngVO", loginMngVO);
				}
			}else {
				
				mv.addObject("code", "9999");
				
				if(ReqUtils.getEmptyResult((String)loginMap.get("message"),"").equals("suspension")) {
					mv.addObject("message", egovMessageSource.getMessage("fail.common.account.suspension",request.getLocale()));
				}else if(ReqUtils.getEmptyResult((String)loginMap.get("message"),"").equals("five")) {
					mv.addObject("message", egovMessageSource.getMessage("fail.common.login.five",request.getLocale()));
				}else if(ReqUtils.getEmptyResult((String)loginMap.get("message"),"").equals("access")) {
					mv.addObject("message", egovMessageSource.getMessage("fail.common.login.access",request.getLocale()));
				}else if(ReqUtils.getEmptyResult((String)loginMap.get("message"),"").equals("empty")) {
					mv.addObject("message", egovMessageSource.getMessage("fail.common.login",request.getLocale()));
				}else if(ReqUtils.getEmptyResult((String)loginMap.get("message"),"").equals("dormantUser")) {
					memberMngVO.setId((String)loginMap.get("id"));
					memberMngVO.setName((String)loginMap.get("name"));
					memberMngVO.setEmail((String)loginMap.get("email"));
					memberService.memberfindPw(memberMngVO);
					mv.addObject("code", "7777");
					mv.addObject("message", egovMessageSource.getMessage("fail.common.dormant.user",request.getLocale()));
				}else {
					mv.addObject("message", "로그인이 실패하셨습니다. 아이디 혹은 비밀번호를 확인하여 주세요.("+ loginMap.get("loginFailCnt") +"회)");
				}
			}
		}
		return mv;
	}

	/**
	 * 로그아웃
	 * @param vo - memberMngVO
	 * @param model
	 * @return "/usr/member/memberfindId"
	 * @exception Exception
	 */
	@RequestMapping(value = "/mng/member/memberlogOut")
	public String memberlogOut(@ModelAttribute("memberMngVO") MemberMngVO memberMngVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {

		String returnPath = "/mng/member/memberLoginForm";
		request.getSession().invalidate();
		request.getSession(true);

		return returnPath;
	}
	
	/**
	 * 로그인.아이디 찾기 화면
	 * @param vo - memberMngVO
	 * @param model
	 * @return "/usr/member/memberfindId"
	 * @exception Exception
	 */
	@RequestMapping(value = "/mng/member/memberfindId")
	public String memberfindId(@ModelAttribute("memberMngVO") MemberMngVO memberMngVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		return "/mng/member/memberfindId";
	}
	
	/**
	 * 로그인.아이디 찾기
	 * @param vo - memberMngVO
	 * @param model
	 * @return "/usr/member/memberfindId"
	 * @exception Exception
	 */
	@RequestMapping(value = "/mng/member/memberfindIdAjax")
	public ModelAndView memberfindIdAjax(HttpServletRequest request, HttpServletResponse response, ModelMap model
			, @RequestBody MemberMngVO memberMngVO) throws Exception {

		ModelAndView mv = new ModelAndView("jsonView");
		
		EgovMap resultMap = memberService.memberfindId(memberMngVO);
		
		if(ReqUtils.getEmptyResult((String)resultMap.get("result"),"").equals("true")) {
			mv.addObject("code", "0000");
		}else {
			mv.addObject("code", "9999");
		}

		return mv;
	}
	
	/**
	 * 로그인.비밀번호 찾기 화면
	 * @param vo - memberMngVO
	 * @param model
	 * @return "/usr/member/memberfindPw"
	 * @exception Exception
	 */
	@RequestMapping(value = "/mng/member/memberfindPw")
	public String memberfindPw(@ModelAttribute("memberMngVO") MemberMngVO memberMngVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		return "/mng/member/memberfindId";
	}
	
	/**
	 * 로그인.비밀번호 찾기
	 * @param vo - memberMngVO
	 * @param model
	 * @return "/usr/member/memberfindPw"
	 * @exception Exception
	 */
	@RequestMapping(value = "/mng/member/memberfindPwAjax")
	public ModelAndView memberfindPw(HttpServletRequest request, HttpServletResponse response, ModelMap model
			, @RequestBody MemberMngVO memberMngVO) throws Exception {

		ModelAndView mv = new ModelAndView("jsonView");
			
		EgovMap resultMap = memberService.mngMemberfindPw(memberMngVO);
		
		if(ReqUtils.getEmptyResult((String)resultMap.get("result"),"").equals("true")) {
			mv.addObject("code", "0000");
		}else {
			mv.addObject("code", "9999");
		}
		return mv;
	}
	
	/**
	 * 로그인.비밀번호변경.비밀번호변경 화면
	 * @param vo - memberMngVO
	 * @param model
	 * @return "/usr/member/memberChangePasswordForm"
	 * @exception Exception
	 */
	@RequestMapping(value = "/mng/member/memberChangePasswordForm")
	public String memberChangePasswordForm(@ModelAttribute("memberMngVO") MemberMngVO memberMngVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		model.addAttribute("memberMngVO", memberMngVO);
		return "/mng/member/memberChangePasswordForm";
	}
	
	/**
	 * 로그인.비밀번호변경
	 * @param vo - memberMngVO
	 * @param model
	 * @return "/usr/member/memberChangePasswordForm"
	 * @exception Exception
	 */
	@RequestMapping(value = "/mng/member/memberChangePassword")
	public ModelAndView directReplySave(HttpServletRequest request, HttpServletResponse response, ModelMap model
			, @RequestBody MemberMngVO memberMngVO, HttpSession session) throws Exception {
		
		ModelAndView mv = new ModelAndView("jsonView");
		
		MemberMngVO loginVO = (MemberMngVO) session.getAttribute("loginMngVO");
		memberMngVO.setId(loginVO.getId());
		
		EgovMap loginMap = memberService.mngMemberChangePasswordForm(memberMngVO);
		
		if(ReqUtils.getEmptyResult((String)loginMap.get("result"),"").equals("true")) {
			mv.addObject("code", "0000");	
		}else{
			mv.addObject("code", "9999");	
		}

		return mv;
	}
	
	/**
	 * 권한이 없는 경우 이동하는 페이지
	 * @param vo - memberMngVO
	 * @param model
	 * @return "/usr/member/memberfindPw"
	 * @exception Exception
	 */
	@RequestMapping(value = "/mng/member/memberAccessFail")
	public String memberAccessFail(@ModelAttribute("memberMngVO") MemberMngVO memberMngVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		return "/memberAccessFail";
	}

                    
}
