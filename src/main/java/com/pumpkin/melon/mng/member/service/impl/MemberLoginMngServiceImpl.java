package com.pumpkin.melon.mng.member.service.impl;

import com.pumpkin.melon.usr.member.service.MemberVO;
import org.apache.commons.collections.MapUtils;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import com.pumpkin.melon.cmmn.mail.service.MailService;
import com.pumpkin.melon.cmmn.util.ReqUtils;
import com.pumpkin.melon.mng.member.service.MemberLoginMngService;
import com.pumpkin.melon.mng.member.service.MemberMngVO;
import com.pumpkin.melon.usr.member.service.impl.MemberMapper;
import egovframework.com.utl.sim.service.EgovFileScrty;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.HtmlUtils;

import com.sun.star.io.IOException;

/**
 * @author 개발팀
 * @version 1.0
 * @Class Name : MemberLoginMngServiceImpl.java
 * @Description : MemberLoginMngServiceImpl Class
 * @Modification Information
 * @
 * @ 수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2022.01.26  황장운          최초생성
 * @see
 * @see Copyright (C) by FRO All right reserved.
 * @since 2022 . 01. 26
 */
@Service("mngMemberLoginMngService")
public class MemberLoginMngServiceImpl extends EgovAbstractServiceImpl implements MemberLoginMngService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MemberLoginMngServiceImpl.class);

    @Resource(name = "mngMemberLoginMngMapper")
    private MemberLoginMngMapper memberLoginMngDAO;

    @Resource(name = "memberMapper")
    private MemberMapper memberDAO;

    @Resource(name = "mailService")
    private MailService mailService;

    @Value("#{admin['admin.confirmPassword']}")
    private String confirmPassword;


    /**
     * 로그인.로그인 페이지
     *
     * @param vo - memberLoginMngVO
     * @return data[memberLoginMngVO]
     * @throws
     */
    public EgovMap memberLogin(MemberMngVO vo) throws Exception {
        EgovMap memberMap = new EgovMap();

        try {
            // 1. 입력한 아이디의 회원정보를 조회한다.
            memberMap = memberDAO.memberSpCisLoginInfoSelect(vo);

            if (MapUtils.isNotEmpty(memberMap)) {

                // 입력받은 패스워드의 html코드 제거
                vo.setPw(HtmlUtils.htmlUnescape(vo.getPw()));

                // 2. 입력한 비밀번호를 암호화한다.
                String enPassword = EgovFileScrty.encryptPassword(vo.getPw());

                // 계정사용 정지된 사용자의 경우 로그인안됨.
                if (ReqUtils.getEmptyResult((String) memberMap.get("enableyn"), "").equals("n")) {
                    memberMap.put("result", "false");
                    memberMap.put("message", "suspension");
                } else if (ReqUtils.getEmptyResult((String) memberMap.get("enableyn"), "").equals("r")) {
                    memberMap.put("result", "false");
                    memberMap.put("message", "reset");
                } else {
                    // 3. DB에 저장된 회원정보의 비밀번호화 사용자가 입력한 비밀번호를 비교하여 같은 경우에만 회원정보를 조회한다.
                    if (memberMap.get("pw").equals(enPassword)) {

                        // 권한목록 저장
                        //                        String userAccessProgram = memberDAO.memberAccessProgram(memberMap);
                        //                        memberMap.put("userAccessProgram", ReqUtils.getEmptyResult(userAccessProgram, ""));

                        // 로그인실패 이력 삭제
                        memberDAO.memberDeleteLoginFailHistory(vo);

                        // 로그인이력 등록
                        //                        vo.setStatus("0");
                        //                        memberDAO.memberInsertLoginHistory(vo);

                        // 로그인 history key 로그인상태테이블에 저장
                        //                        vo.setLoginHistorySeq(Integer.parseInt(vo.getSeq()));
                        //                        memberDAO.memberInsertLoginStatus(vo);

                        memberMap.put("result", "true");

                    } else {
                        // 로그인 시도 이력 등록
                        //                    vo.setStatus("0");
                        //                    memberDAO.memberInsertLoginHistory(vo);

                        // 로그인 실패 이력 등록
                        memberDAO.memberInsertLoginFailHistory(vo);

                        int loginFailCnt = memberDAO.memberLoginFailHistoryCnt(vo);
                        memberMap.put("loginFailCnt", loginFailCnt);

                        // 로그인실패를 5번 이상한 경우 계정을 정지시킴
                        if (loginFailCnt >= 5) {
                            vo.setEnableyn("n");
                            memberDAO.memberUpdateEnableYn(vo);
                            memberMap.put("result", "false");
                            memberMap.put("message", "five");
                        } else {
                            memberMap.put("result", "false");
                            memberMap.put("message", "login");
                        }
                    }
                }
            } else {
                memberMap = new EgovMap();
                memberMap.put("result", "false");
                memberMap.put("message", "empty");
            }
        } catch (IOException e) {
            e.getMessage();
        }

        return memberMap;
    }

    /**
     * 로그인.아이디 찾기
     *
     * @param vo - memberMngVO
     * @return data[memberMngVO]
     * @throws
     */
    public EgovMap memberfindId(MemberMngVO memberMngVO) throws Exception {

        EgovMap memberMap = new EgovMap();
        memberMap = memberDAO.memberfindId(memberMngVO);

        if (memberMap != null) {

            String resultCode = "";

            memberMap.put("code", "0002");
            resultCode = mailService.sendEmail(memberMap);

            if ("0000".equals(resultCode)) {
                memberMap.put("result", "true");
            }

        } else {
            memberMap = new EgovMap();
            memberMap.put("result", "false");
        }

        return memberMap;
    }

    @Override
    public EgovMap mngMemberChangePassword(MemberMngVO vo) throws Exception {
        EgovMap memberMap;
        EgovMap returnMap = new EgovMap();

        try {
            // 1. 입력한 아이디의 회원정보를 조회한다.
            memberMap = memberDAO.memberSpCisLoginInfoSelect(vo);

            if (MapUtils.isNotEmpty(memberMap)) {
                if (ReqUtils.getEmptyResult((String) memberMap.get("enableyn"), "").equals("n")) {
                    // 사용 정지
                    returnMap.put("result", "false");
                    returnMap.put("message", "suspension");
                } else if (ReqUtils.getEmptyResult((String) memberMap.get("enableyn"), "").equals("y")) {
                    // 정상 사용
                    returnMap.put("result", "false");
                    returnMap.put("message", "pass");
                } else {
                    // 초기화 상태
                    // 입력받은 패스워드의 html코드 제거
                    vo.setPw(HtmlUtils.htmlUnescape(vo.getPw()));
                    confirmPassword = HtmlUtils.htmlUnescape(confirmPassword);

                    // 2. 입력한 비밀번호를 암호화한다.
                    String enPassword = EgovFileScrty.encryptPassword(vo.getPw());
                    String enConfirmPassword = EgovFileScrty.encryptPassword(confirmPassword);

                    //properties의 초기화 비밀번호, 인풋에 입력한 비밀번호, 현재 초기화 된 비밀번호 비교
                    if (memberMap.get("pw").equals(enPassword) && memberMap.get("pw").equals(enConfirmPassword)) {
                        returnMap.put("result", "true");
                        returnMap.put("umId", memberMap.get("umId"));
                    } else {
                        returnMap.put("result", "false");
                    }
                }
            } else {
                returnMap.put("result", "none");
            }
        } catch (Exception e) {
            e.printStackTrace();
            e.getMessage();
        }

        return returnMap;
    }

    @Override
    public EgovMap mngMemberChangePasswordSave(MemberMngVO vo) throws Exception {
        EgovMap memberMap;
        EgovMap returnMap = new EgovMap();

        try {
            // 1. 입력한 아이디의 회원정보를 조회한다.
            memberMap = memberDAO.memberSpCisLoginInfoSelect(vo);

            if (MapUtils.isNotEmpty(memberMap)) {
                // 입력받은 패스워드의 html코드 제거
                vo.setPw(HtmlUtils.htmlUnescape(vo.getNewPassWd()));

                // 2. 입력한 비밀번호를 암호화한다.
                String enPassword = EgovFileScrty.encryptPassword(vo.getPw());

                vo.setPassWd(enPassword);
                vo.setEnableyn("y");

                // 패스워드 업데이트
                memberDAO.memberUpdatePassword(vo);
                // 사용정지 해제
                memberDAO.memberUpdateEnableYn(vo);
                // 로그인 실패 회수 초기화
                memberDAO.memberDeleteLoginFailHistory(vo);

                returnMap.put("result", "true");
                returnMap.put("umId", memberMap.get("umId"));
            } else {
                returnMap.put("result", "none");
            }
        } catch (Exception e) {
            e.printStackTrace();
            e.getMessage();
        }

        return returnMap;
    }

}