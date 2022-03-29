package com.pumpkin.melon.mng.member.web;

import java.util.List;

import com.pumpkin.melon.mng.member.service.MemberUserMngService;
import com.pumpkin.melon.mng.member.service.MemberUserMngVO;
import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import com.pumpkin.melon.cmmn.util.ReqUtils;
import com.pumpkin.melon.mng.member.service.MemberMngVO;
import egovframework.com.cmm.EgovMessageSource;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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

@Controller("memberUserMngController")
public class MemberUserMngController {

	@Resource(name = "mngMemberUserMngService")
	private MemberUserMngService memberUserMngService;

	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;

	@Resource(name = "beanValidator")
	protected DefaultBeanValidator beanValidator;
	/** EgovMessageSource */
	@Resource(name = "egovMessageSource")
	EgovMessageSource egovMessageSource;



	/**
	 * 회원정보 관리.목록
	 * @param searchVO - 조회할 정보가 담긴 pagingDefaultVO
	 * @param model
	 * @return "/mng/member/UserList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/mng/member/User/UserList")
	public String UserList(@ModelAttribute("memberUserMngVO") MemberUserMngVO searchVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {

		searchVO.setPageUnit(searchVO.getPageUnit());
		searchVO.setPageSize(propertiesService.getInt("pageSize"));

		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
		paginationInfo.setPageSize(searchVO.getPageSize());

		searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
		searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		searchVO.setSearchList(searchVO.getSrchGubn(), searchVO.getSrchKeyword());
		List<?> UserList = memberUserMngService.UserList(searchVO);
		model.addAttribute("resultList", UserList);
		
		List<?> UserGroupList = memberUserMngService.UserGroupList();
		model.addAttribute("userGroupList", UserGroupList);
		int totCnt = memberUserMngService.UserListTotCnt(searchVO);
		paginationInfo.setTotalRecordCount(totCnt);
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("totCnt", totCnt);
		model.addAttribute("searchVO", searchVO);
		return "/mng/member/UserList";
	}



	/**
	 * 회원정보 관리.상세
	 * @param vo - memberUserMngVO
	 * @param model
	 * @return "/mng/member/UserDetail"
	 * @exception Exception
	 */
	@RequestMapping(value = "/mng/member/User/UserDetail")
	public String UserDetail(@ModelAttribute("memberUserMngVO") MemberUserMngVO memberUserMngVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {

		//MemberUserMngVO memberUserMngVO = new MemberUserMngVO();

		model.addAttribute("data",memberUserMngService.UserDetail(memberUserMngVO));

		return "/mng/member/UserDetail";
	}



	/**
	 * 회원정보 관리.신규등록화면
	 * @param vo - memberUserMngVO
	 * @param model
	 * @return "/mng/member/UserRegistForm"
	 * @exception Exception
	 */
	@RequestMapping(value = "/mng/member/User/UserRegistForm")
	public String UserRegistForm(@ModelAttribute("memberUserMngVO") MemberUserMngVO memberUserMngVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {

		//MemberUserMngVO memberUserMngVO = new MemberUserMngVO();
		//회원그룹
		List<?> UserGroupList = memberUserMngService.UserGroupList();
		//부서
		List<?> UserAgencyDepartmentList = memberUserMngService.UserAgencyDepartmentList();
		//파트너대리점명
		List<?> UserPAgencyDepartmentList = memberUserMngService.UserPAgencyDepartmentList();
		
		
		model.addAttribute("UserGroupList",UserGroupList);
		model.addAttribute("UserAgencyDepartmentList",UserAgencyDepartmentList);		
		model.addAttribute("UserPAgencyDepartmentList",UserPAgencyDepartmentList);	
		model.addAttribute("data",memberUserMngService.UserRegistForm(memberUserMngVO));

		return "/mng/member/UserRegistForm";
	}



	/**
	 * 회원정보 관리.수정화면
	 * @param vo - memberUserMngVO
	 * @param model
	 * @return "/mng/member/UserEditForm"
	 * @exception Exception
	 */
	@RequestMapping(value = "/mng/member/User/UserEditForm")
	public String UserEditForm(@ModelAttribute("memberUserMngVO") MemberUserMngVO memberUserMngVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {

		//MemberUserMngVO memberUserMngVO = new MemberUserMngVO();

		model.addAttribute("data",memberUserMngService.UserEditForm(memberUserMngVO));

		return "/mng/member/UserEditForm";
	}

	/**
	 * 회원정보 관리.목록
	 * @param searchVO - 조회할 정보가 담긴 pagingDefaultVO
	 * @param model
	 * @return "/mng/member/UserList"
	 * @exception Exception
	 */
	@RequestMapping(value = "/mng/member/UserMng/UserMngList")
	public String UserMngList(@ModelAttribute("memberUserMngVO") MemberUserMngVO searchVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {

		searchVO.setPageUnit(searchVO.getPageUnit());
		searchVO.setPageSize(propertiesService.getInt("pageSize"));

		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
		paginationInfo.setPageSize(searchVO.getPageSize());

		searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
		searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		searchVO.setSearchList(searchVO.getSrchGubn(), searchVO.getSrchKeyword());
		List<?> UserList = memberUserMngService.UserMngList(searchVO);
		model.addAttribute("resultList", UserList);

		int totCnt = memberUserMngService.UserMngListTotCnt(searchVO);
		paginationInfo.setTotalRecordCount(totCnt);
		model.addAttribute("paginationInfo", paginationInfo);
		model.addAttribute("totCnt", totCnt);
		model.addAttribute("searchVO", searchVO);
		return "/mng/member/UserMngList";
	}



	/**
	 * 회원정보 관리.상세
	 * @param vo - memberUserMngVO
	 * @param model
	 * @return "/mng/member/UserDetail"
	 * @exception Exception
	 */
	@RequestMapping(value = "/mng/member/UserMng/UserMngDetail")
	public String UserMngDetail(@ModelAttribute("memberUserMngVO") MemberUserMngVO memberUserMngVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {

		//MemberUserMngVO memberUserMngVO = new MemberUserMngVO();

		model.addAttribute("data",memberUserMngService.UserDetail(memberUserMngVO));

		return "/mng/member/UserMngDetail";
	}



	/**
	 * 회원정보 관리.신규등록화면
	 * @param vo - memberUserMngVO
	 * @param model
	 * @return "/mng/member/UserRegistForm"
	 * @exception Exception
	 */
	@RequestMapping(value = "/mng/member/UserMng/UserMngRegistForm")
	public String UserMngRegistForm(@ModelAttribute("memberUserMngVO") MemberUserMngVO memberUserMngVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {

		//MemberUserMngVO memberUserMngVO = new MemberUserMngVO();
		//부서
		List<?> UserAgencyDepartmentList = memberUserMngService.UserAgencyDepartmentList();
		
		model.addAttribute("UserAgencyDepartmentList",UserAgencyDepartmentList);
		model.addAttribute("data",memberUserMngService.UserRegistForm(memberUserMngVO));

		return "/mng/member/UserMngRegistForm";
	}

	@RequestMapping(value = "/mng/member/UserMng/UserMngIdCheck", method = RequestMethod.POST)
	public ModelAndView UserMngIdCheck(@ModelAttribute("memberUserMngVO") MemberUserMngVO memberUserMngVO, HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");
		try {
				int idCnt = memberUserMngService.UserIdCnt(memberUserMngVO);
				if(idCnt < 1 ) {
					mv.addObject("code", "0000");
					mv.addObject("chkId", memberUserMngVO.getId());
				}else {
					mv.addObject("code", "1111");	
				}
			}
		 catch (Exception e) {
			mv.addObject("code", "9999");
		}
		return mv;
	}
	@RequestMapping(value = "/mng/member/UserMng/UserMngEmailCheck", method = RequestMethod.POST)
	public ModelAndView UserMngEmailCheck(@ModelAttribute("memberUserMngVO") MemberUserMngVO memberUserMngVO, HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");
		try {
				int idCnt = memberUserMngService.UserEmailCnt(memberUserMngVO);
				if(idCnt < 1 ) {
					mv.addObject("code", "0000");
					mv.addObject("chkEmail", memberUserMngVO.getEmail());
				}else {
					mv.addObject("code", "1111");	
				}
			}
		 catch (Exception e) {
			mv.addObject("code", "9999");
		}
		return mv;
	}
	
	@RequestMapping(value = "/mng/member/UserMng/UserMngSave", method = RequestMethod.POST)
	public ModelAndView UserMngSave(@ModelAttribute("memberUserMngVO") MemberUserMngVO memberUserMngVO, HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		ModelAndView modelAndView = new ModelAndView("jsonView");
		MemberMngVO loginVO = (MemberMngVO) request.getSession().getAttribute("loginMngVO");
		memberUserMngVO.setSessionUserId(loginVO.getId());							//로그인한 사용자 아이디
		memberUserMngVO.setSessionUserName(loginVO.getName());				//로그인한 사용자 이름
		EgovMap resultMap = memberUserMngService.userMngSave(memberUserMngVO);
		
		if(ReqUtils.getEmptyResult((String)resultMap.get("result"),"").equals("true")) {
			modelAndView.addObject("code", "0000");
			modelAndView.addObject("message", egovMessageSource.getMessage("insert.success",request.getLocale()));
		}else {
			modelAndView.addObject("code", "9999");
			modelAndView.addObject("message", egovMessageSource.getMessage("insert.fail",request.getLocale()));
		}
		return modelAndView;
	}
	


	/**
	 * 회원정보 관리.수정화면
	 * @param vo - memberUserMngVO
	 * @param model
	 * @return "/mng/member/UserEditForm"
	 * @exception Exception
	 */
	@RequestMapping(value = "/mng/member/UserMng/UserMngEditForm")
	public String UserMngEditForm(@ModelAttribute("memberUserMngVO") MemberUserMngVO memberUserMngVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {

		//MemberUserMngVO memberUserMngVO = new MemberUserMngVO();

		model.addAttribute("data",memberUserMngService.UserEditForm(memberUserMngVO));

		return "/mng/member/UserMngEditForm";
	}


}
