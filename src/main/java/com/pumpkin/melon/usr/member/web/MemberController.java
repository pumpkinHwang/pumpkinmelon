package com.pumpkin.melon.usr.member.web;

import com.pumpkin.melon.cmmn.mail.service.MailService;
import com.pumpkin.melon.cmmn.util.ReqUtils;
import com.pumpkin.melon.cmmn.util.SessionCookieUtil;
import com.pumpkin.melon.mng.member.service.MemberUserMngService;
import com.pumpkin.melon.usr.member.service.MemberService;
import com.pumpkin.melon.usr.member.service.MemberVO;
import egovframework.com.cmm.EgovMessageSource;
import egovframework.com.utl.sim.service.EgovClntInfo;
import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springmodules.validation.commons.DefaultBeanValidator;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller("memberController")
public class MemberController {

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

    @Resource(name = "mngMemberUserMngService")
    private MemberUserMngService memberUserMngService;

    @Resource(name = "mailService")
    private MailService mailService;


    /**
     * 로그인.로그인 페이지
     *
     * @param vo    - memberVO
     * @param model
     * @return "/usr/member/memberLogin"
     * @throws Exception
     */
    @RequestMapping(value = "/usr/member/memberLogin")
    public String memberLogin(@ModelAttribute("memberVO") MemberVO memberVO, ModelMap model, HttpServletRequest request, HttpServletResponse response, HttpSession session) throws Exception {
        return "/usr/member/memberLoginForm";
    }

    /**
     * 로그인.비밀번호 찾기
     *
     * @param vo    - memberVO
     * @param model
     * @return "/usr/member/memberfindPw"
     * @throws Exception
     */
    @RequestMapping(value = "/usr/member/memberLoginAjax")
    public ModelAndView memberLoginAjax(HttpServletRequest request, HttpServletResponse response, ModelMap model
            , @RequestBody MemberVO memberVO) throws Exception {

        ModelAndView mv = new ModelAndView("jsonView");

        if (!ReqUtils.getEmptyResult((String) memberVO.getId(), "").equals("")) {

            // 회원정보 조회
            memberVO.setRemoteAddress(EgovClntInfo.getClntIP(request));
            EgovMap loginMap = memberService.memberLogin(memberVO);

            if (ReqUtils.getEmptyResult((String) loginMap.get("result"), "").equals("true")) {

                mv.addObject("code", "0000");

                if (ReqUtils.getEmptyResult((String) loginMap.get("message"), "").equals("changePassword")) {
                    mv.addObject("code", "8888");
                    mv.addObject("message", egovMessageSource.getMessage("fail.common.account.passwordchangeyn", request.getLocale()));
                } else if (ReqUtils.getEmptyResult((String) loginMap.get("message"), "").equals("changePasswordMonth")) {
                    mv.addObject("code", "8888");
                    mv.addObject("message", egovMessageSource.getMessage("fail.common.account.changePasswordMonth", request.getLocale()));
                } else {
                }

                if (ReqUtils.getEmptyResult((String) loginMap.get("sessionUserId"), "").equals("")) {
                    MemberVO loginVO = new MemberVO();
                    loginVO = (MemberVO) ReqUtils.convertMapToObject(loginMap, loginVO);
                    SessionCookieUtil.setSessionAttribute(request, "loginVO", loginVO);
                }

            } else {

                String loginFailCntStr = "";
                if (loginMap.get("loginFailCnt") != null) {
                    loginFailCntStr = " (" + loginMap.get("loginFailCnt") + "회)";
                }

                mv.addObject("code", "9999");

                if (ReqUtils.getEmptyResult((String) loginMap.get("message"), "").equals("dormantUser")) {
                    memberVO.setId((String) loginMap.get("id"));
                    memberVO.setName((String) loginMap.get("name"));
                    memberVO.setEmail((String) loginMap.get("email"));
                    memberService.memberfindPw(memberVO);

                    mv.addObject("code", "7777");
                    mv.addObject("message", egovMessageSource.getMessage("fail.common.dormant.user", request.getLocale()));
                } else if (ReqUtils.getEmptyResult((String) loginMap.get("message"), "").equals("suspension")) {
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
     * @param vo    - memberVO
     * @param model
     * @return "/usr/member/memberfindId"
     * @throws Exception
     */
    @RequestMapping(value = "/usr/member/memberlogOut")
    public String memberlogOut(@ModelAttribute("memberVO") MemberVO memberVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {

        String returnPath = "redirect:/usr/member/memberLoginForm";
        request.getSession().invalidate();
        request.getSession(true);

        return returnPath;
    }

    /**
     * 로그인.아이디 찾기 화면
     *
     * @param vo    - memberVO
     * @param model
     * @return "/usr/member/memberfindId"
     * @throws Exception
     */
    @RequestMapping(value = "/usr/member/memberfindId")
    public String memberfindId(@ModelAttribute("memberVO") MemberVO memberVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return "/usr/member/memberfindId";
    }

    /**
     * 로그인.아이디 찾기
     *
     * @param vo    - memberVO
     * @param model
     * @return "/usr/member/memberfindId"
     * @throws Exception
     */
    @RequestMapping(value = "/usr/member/memberfindIdAjax")
    public ModelAndView memberfindIdAjax(HttpServletRequest request, HttpServletResponse response, ModelMap model
            , @RequestBody MemberVO memberVO) throws Exception {

        ModelAndView mv = new ModelAndView("jsonView");

        EgovMap resultMap = memberService.memberfindId(memberVO);

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
     * @param vo    - memberVO
     * @param model
     * @return "/usr/member/memberfindPw"
     * @throws Exception
     */
    @RequestMapping(value = "/usr/member/memberfindPw")
    public String memberfindPw(@ModelAttribute("memberVO") MemberVO memberVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return "/usr/member/memberfindId";
    }

    /**
     * 로그인.비밀번호 찾기
     *
     * @param vo    - memberVO
     * @param model
     * @return "/usr/member/memberfindPw"
     * @throws Exception
     */
    @RequestMapping(value = "/usr/member/memberfindPwAjax")
    public ModelAndView memberfindPw(HttpServletRequest request, HttpServletResponse response, ModelMap model
            , @RequestBody MemberVO memberVO) throws Exception {

        ModelAndView mv = new ModelAndView("jsonView");

        EgovMap resultMap = memberService.memberfindPw(memberVO);

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
     * @param vo    - memberVO
     * @param model
     * @return "/usr/member/memberChangePasswordForm"
     * @throws Exception
     */
    @RequestMapping(value = "/usr/member/memberChangePasswordForm")
    public String memberChangePasswordForm(@ModelAttribute("memberVO") MemberVO memberVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {

        model.addAttribute("memberVO", memberVO);
        return "/usr/member/memberChangePasswordForm";
    }

    /**
     * 로그인.비밀번호변경
     *
     * @param vo    - memberVO
     * @param model
     * @return "/usr/member/memberChangePasswordForm"
     * @throws Exception
     */
    @RequestMapping(value = "/usr/member/memberChangePassword")
    public ModelAndView directReplySave(HttpServletRequest request, HttpServletResponse response, ModelMap model
            , @RequestBody MemberVO memberVO, HttpSession session) throws Exception {

        ModelAndView mv = new ModelAndView("jsonView");

        MemberVO loginVO = (MemberVO) session.getAttribute("loginVO");
        memberVO.setId(loginVO.getId());

        EgovMap loginMap = memberService.memberChangePasswordForm(memberVO);

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
     * @param vo    - memberVO
     * @param model
     * @return "/usr/member/memberfindPw"
     * @throws Exception
     */
    @RequestMapping(value = "/usr/member/memberAccessFail")
    public String memberAccessFail(@ModelAttribute("memberVO") MemberVO memberVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        return "/memberAccessFail";
    }

    /**
     * 게시글 권한 조회
     *
     * @param vo    - memberVO
     * @param model
     * @return "/usr/member/memberfindPw"
     * @throws Exception
     */
    @RequestMapping(value = "/usr/member/memberAccessChk", method = RequestMethod.POST)
    public ModelAndView updateStateManual(HttpServletRequest request, HttpServletResponse response, ModelMap model
            , @RequestBody Map<String, String> param, HttpSession session) throws Exception {
        ModelAndView mv = new ModelAndView("jsonView");
        try {

            MemberVO loginVO = (MemberVO) session.getAttribute("loginVO");
            param.put("id", loginVO.getId());
            param.put("groupcode", loginVO.getGroupcode());

            String UserAccessProgram = memberService.memberAccessProgram(param);
            if (UserAccessProgram != null) {
                mv.addObject("code", "0000");
            } else {
                mv.addObject("code", "9999");
            }
        } catch (Exception e) {
            mv.addObject("code", "9999");
        }
        return mv;
    }


    /**
     * 개인정보 수정 화면
     *
     * @param vo    - memberVO
     * @param model
     * @return "/usr/member/memberChangeForm"
     * @throws Exception
     */
    @RequestMapping(value = "/usr/member/memberChangeForm")
    public String memberChangeForm(@ModelAttribute("memberVO") MemberVO memberVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {

        MemberVO loginVO = (MemberVO) request.getSession().getAttribute("loginVO");
        EgovMap memberMap = memberService.memberInfo(loginVO);

        //부서
        List<?> UserAgencyDepartmentList = memberUserMngService.UserAgencyDepartmentList();
        //파트너대리점명
        List<?> UserPAgencyDepartmentList = memberUserMngService.UserPAgencyDepartmentList();

        model.addAttribute("memberMap", memberMap);
        model.addAttribute("UserAgencyDepartmentList", UserAgencyDepartmentList);
        model.addAttribute("UserPAgencyDepartmentList", UserPAgencyDepartmentList);

        return "/usr/member/memberChangeForm";
    }


    @RequestMapping(value = "/usr/member/UserSave", method = RequestMethod.POST)
    public ModelAndView UserMngSave(@ModelAttribute("memberVO") MemberVO memberVO, HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
        ModelAndView modelAndView = new ModelAndView("jsonView");

        EgovMap resultMap = memberService.UserSave(memberVO);

        if (ReqUtils.getEmptyResult((String) resultMap.get("result"), "").equals("true")) {

            EgovMap memberMap = memberService.memberSpCisLoginInfoSelect(memberVO);
            String userAccessProgram = memberService.memberAccessProgram(memberMap);
            memberMap.put("userAccessProgram", ReqUtils.getEmptyResult(userAccessProgram, ""));

            MemberVO loginVO = new MemberVO();
            loginVO = (MemberVO) ReqUtils.convertMapToObject(memberMap, loginVO);
            SessionCookieUtil.setAttribute("loginVO", loginVO);

            modelAndView.addObject("code", "0000");
            modelAndView.addObject("message", egovMessageSource.getMessage("insert.success", request.getLocale()));

        } else {
            modelAndView.addObject("code", "9999");
            modelAndView.addObject("message", egovMessageSource.getMessage("insert.fail", request.getLocale()));
        }
        return modelAndView;
    }
}
