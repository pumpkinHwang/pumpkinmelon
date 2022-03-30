package com.pumpkin.melon.mng.member.web;

import com.pumpkin.melon.cmmn.util.ReqUtils;
import com.pumpkin.melon.cmmn.util.SessionCookieUtil;
import com.pumpkin.melon.mng.member.service.MemberLoginMngService;
import com.pumpkin.melon.mng.member.service.MemberMngVO;
import com.pumpkin.melon.usr.member.service.MemberService;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.utl.sim.service.EgovClntInfo;
import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springmodules.validation.commons.DefaultBeanValidator;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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

    /**
     * EgovMessageSource
     */
    @Resource(name = "egovMessageSource")
    EgovMessageSource egovMessageSource;


    /**
     * 로그인.로그인 페이지
     *
     * @param vo    - memberLoginMngVO
     * @param model
     * @return "/mng/member/memberLogin"
     * @throws Exception
     */
    @RequestMapping(value = "/mng/member/memberLogin")
    public String memberLogin(@ModelAttribute("memberLoginMngVO") MemberMngVO memberMngVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return "/mng/member/memberLoginForm";
    }

    /**
     * 로그인.로그인 페이지
     *
     * @param vo    - memberLoginMngVO
     * @param model
     * @return "/mng/member/memberLogin"
     * @throws Exception
     */
    @RequestMapping(value = "/mng/member/memberLoginAjax")
    public ModelAndView memberLoginAjax(HttpServletRequest request, HttpServletResponse response, ModelMap model, @RequestBody MemberMngVO memberMngVO, HttpSession session) throws Exception {

        ModelAndView mv = new ModelAndView("jsonView");

        if (!ReqUtils.getEmptyResult((String) memberMngVO.getId(), "").equals("")) {
            // 회원정보 조회
            memberMngVO.setRemoteAddress(EgovClntInfo.getClntIP(request));
            EgovMap loginMap = memberLoginMngService.memberLogin(memberMngVO);

            if (ReqUtils.getEmptyResult((String) loginMap.get("result"), "").equals("true")) {
                mv.addObject("code", "0000");
                if (ReqUtils.getEmptyResult((String) loginMap.get("sessionUserId"), "").equals("")) {
                    MemberMngVO loginMngVO = new MemberMngVO();
                    loginMngVO = (MemberMngVO) ReqUtils.convertMapToObject(loginMap, loginMngVO);
                    SessionCookieUtil.setSessionAttribute(request, "loginMngVO", loginMngVO);
                }
            } else {
                mv.addObject("code", "9999");
                if (ReqUtils.getEmptyResult((String) loginMap.get("message"), "").equals("suspension")) {
                    mv.addObject("message", egovMessageSource.getMessage("fail.common.account.suspension", request.getLocale()));
                } else if (ReqUtils.getEmptyResult((String) loginMap.get("message"), "").equals("reset")) {
                    mv.addObject("message", "현재 초기화 상태입니다.\n초기화 비밀번호를 입력하여 비밀번호 변경하시기 바랍니다.");
                } else if (ReqUtils.getEmptyResult((String) loginMap.get("message"), "").equals("five")) {
                    mv.addObject("message", "입력하신 비밀번호 입력 허용횟수(5회)를 초과하였습니다.\n담당자에게 문의 부탁드립니다.");
                } else if (ReqUtils.getEmptyResult((String) loginMap.get("message"), "").equals("access")) {
                    mv.addObject("message", egovMessageSource.getMessage("fail.common.login.access", request.getLocale()));
                } else if (ReqUtils.getEmptyResult((String) loginMap.get("message"), "").equals("empty")) {
                    mv.addObject("message", egovMessageSource.getMessage("fail.common.login", request.getLocale()));
                } else {
                    mv.addObject("message", "입력오류!\n아이디 혹은 비밀번호를 확인하여 주세요.\n5회 오류 시 계정이 잠깁니다.\n잠김 시 비밀번호를 초기화하여 진행하시기 바랍니다.\n입력오류 : " + loginMap.get("loginFailCnt") + "/5");
                }
            }
        }

        return mv;
    }

    /**
     * 로그아웃
     *
     * @param vo    - memberMngVO
     * @param model
     * @return "/usr/member/memberfindId"
     * @throws Exception
     */
    @RequestMapping(value = "/mng/member/memberlogOut")
    public String memberlogOut(@ModelAttribute("memberMngVO") MemberMngVO memberMngVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {

        String returnPath = "redirect:/mng/member/memberLogin";
        request.getSession().invalidate();
        request.getSession(true);

        return returnPath;
    }

    /**
     * 로그인.아이디 찾기 화면
     *
     * @param vo    - memberMngVO
     * @param model
     * @return "/usr/member/memberfindId"
     * @throws Exception
     */
    @RequestMapping(value = "/mng/member/memberfindId")
    public String memberfindId(@ModelAttribute("memberMngVO") MemberMngVO memberMngVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return "/mng/member/memberfindId";
    }

    /**
     * 로그인.아이디 찾기
     *
     * @param vo    - memberMngVO
     * @param model
     * @return "/usr/member/memberfindId"
     * @throws Exception
     */
    @RequestMapping(value = "/mng/member/memberfindIdAjax")
    public ModelAndView memberfindIdAjax(HttpServletRequest request, HttpServletResponse response, ModelMap model, @RequestBody MemberMngVO memberMngVO) throws Exception {

        ModelAndView mv = new ModelAndView("jsonView");

        EgovMap resultMap = memberService.memberfindId(memberMngVO);

        if (ReqUtils.getEmptyResult((String) resultMap.get("result"), "").equals("true")) {
            mv.addObject("code", "0000");
        } else {
            mv.addObject("code", "9999");
        }

        return mv;
    }

    /**
     * 로그인.비밀번호 찾기 화면
     *
     * @param vo    - memberMngVO
     * @param model
     * @return "/usr/member/memberfindPw"
     * @throws Exception
     */
    @RequestMapping(value = "/mng/member/memberfindPw")
    public String memberfindPw(@ModelAttribute("memberMngVO") MemberMngVO memberMngVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return "/mng/member/memberfindId";
    }

    /**
     * 로그인.비밀번호 찾기
     *
     * @param vo    - memberMngVO
     * @param model
     * @return "/usr/member/memberfindPw"
     * @throws Exception
     */
    @RequestMapping(value = "/mng/member/memberfindPwAjax")
    public ModelAndView memberfindPw(HttpServletRequest request, HttpServletResponse response, ModelMap model, @RequestBody MemberMngVO memberMngVO) throws Exception {

        ModelAndView mv = new ModelAndView("jsonView");

        EgovMap resultMap = memberService.mngMemberfindPw(memberMngVO);

        if (ReqUtils.getEmptyResult((String) resultMap.get("result"), "").equals("true")) {
            mv.addObject("code", "0000");
        } else {
            mv.addObject("code", "9999");
        }
        return mv;
    }

    /**
     * 로그인.비밀번호변경.비밀번호변경 화면
     *
     * @param vo    - memberMngVO
     * @param model
     * @return "/usr/member/memberChangePasswordForm"
     * @throws Exception
     */
    @RequestMapping(value = "/mng/member/memberChangePasswordForm")
    public String memberChangePasswordForm(@ModelAttribute("memberMngVO") MemberMngVO memberMngVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return "/mng/member/memberChangePasswordForm";
    }

    /**
     * 로그인.비밀번호변경
     *
     * @param vo    - memberMngVO
     * @param model
     * @return "/usr/member/memberChangePasswordForm"
     * @throws Exception
     */
    @RequestMapping(value = "/mng/member/memberChangePassword")
    public ModelAndView directReplySave(HttpServletRequest request, HttpServletResponse response, ModelMap model, @RequestBody MemberMngVO memberMngVO, HttpSession session) throws Exception {

        ModelAndView mv = new ModelAndView("jsonView");

        MemberMngVO loginVO = (MemberMngVO) session.getAttribute("loginMngVO");
        memberMngVO.setId(loginVO.getId());

        EgovMap loginMap = memberService.mngMemberChangePasswordForm(memberMngVO);

        if (ReqUtils.getEmptyResult((String) loginMap.get("result"), "").equals("true")) {
            mv.addObject("code", "0000");
        } else {
            mv.addObject("code", "9999");
        }

        return mv;
    }

    /**
     * 권한이 없는 경우 이동하는 페이지
     *
     * @param vo    - memberMngVO
     * @param model
     * @return "/usr/member/memberfindPw"
     * @throws Exception
     */
    @RequestMapping(value = "/mng/member/memberAccessFail")
    public String memberAccessFail(@ModelAttribute("memberMngVO") MemberMngVO memberMngVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return "/memberAccessFail";
    }


    @RequestMapping(value = "/mng/member/memberAdminConfirmPasswordAjax")
    public ModelAndView memberAdminConfirmPasswordAjax(HttpServletRequest request, HttpServletResponse response, ModelMap model, @RequestBody MemberMngVO memberMngVO, HttpSession session) throws Exception {
        ModelAndView mv = new ModelAndView("jsonView");

        EgovMap resultMap = memberLoginMngService.mngMemberChangePassword(memberMngVO);

        if (ReqUtils.getEmptyResult((String) resultMap.get("result"), "").equals("true")) {
            mv.addObject("code", "0000");
            mv.addObject("umId", resultMap.get("umId"));
        } else if (ReqUtils.getEmptyResult((String) resultMap.get("result"), "").equals("none")) {
            mv.addObject("code", "9999");
            mv.addObject("message", "사용자 아이디가 존재하지 않습니다.");
        } else if (ReqUtils.getEmptyResult((String) resultMap.get("message"), "").equals("suspension")) {
            mv.addObject("code", "9999");
            mv.addObject("message", egovMessageSource.getMessage("fail.common.account.suspension", request.getLocale()));
        } else if (ReqUtils.getEmptyResult((String) resultMap.get("message"), "").equals("pass")) {
            mv.addObject("code", "9999");
            mv.addObject("message", "정상 사용중인 아이디입니다.");
        } else {
            mv.addObject("code", "9999");
            mv.addObject("message", "입력오류!\n초기화 비밀번호가 다릅니다.");
        }
        return mv;
    }

    @RequestMapping(value = "/mng/member/memberAdminConfirmPasswordSave")
    public ModelAndView memberAdminConfirmPasswordSave(HttpServletRequest request, HttpServletResponse response, ModelMap model, @RequestBody MemberMngVO memberMngVO, HttpSession session) throws Exception {
        ModelAndView mv = new ModelAndView("jsonView");

        EgovMap resultMap = memberLoginMngService.mngMemberChangePasswordSave(memberMngVO);

        if (ReqUtils.getEmptyResult((String) resultMap.get("result"), "").equals("true")) {
            mv.addObject("code", "0000");
            mv.addObject("umId", resultMap.get("umId"));
        } else {
            mv.addObject("code", "9999");
            mv.addObject("message", "사용자 아이디가 존재하지 않습니다.");
        }
        return mv;
    }


}
