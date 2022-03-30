package com.pumpkin.melon.usr.member.service.impl;

import com.pumpkin.melon.usr.member.service.MemberVO;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author 개발팀
 * @version 1.0
 * @Class Name : MemberMapper.java
 * @Description : MemberMapper Class
 * @Modification Information
 * @
 * @ 수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2022.01.26  황장운          최초생성
 * @see
 * @see Copyright (C) by FRO All right reserved.
 * @since 2022 . 01. 26
 */
@Repository("memberMapper")
public class MemberMapper extends EgovComAbstractDAO {


    /**
     * 로그인.로그인 페이지
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public EgovMap memberLogin(MemberVO memberVO) throws Exception {
        return selectOne("memberMapper.memberLogin", memberVO);
    }


    /**
     * 로그인.아이디 찾기
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public EgovMap memberfindId(MemberVO memberVO) throws Exception {
        return selectOne("memberMapper.memberfindId", memberVO);
    }

    /**
     * 로그인.아이디 찾기 이메일 내용 조회
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public EgovMap memberfindIdEmailForm(EgovMap map) throws Exception {
        return selectOne("memberMapper.memberfindIdEmailForm", map);
    }

    /**
     * 로그인.비밀번호 찾기
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public EgovMap memberfindPw(MemberVO memberVO) throws Exception {
        return selectOne("memberMapper.memberfindPw", memberVO);
    }

    /**
     * 10자리 임시 비밀번호 생성
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public String memberckbsPasswordCreateFunc(EgovMap egovMap) throws Exception {
        return selectOne("memberMapper.memberckbsPasswordCreateFunc", egovMap);
    }

    /**
     * 암호화된 임시 비밀번호 저장
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public void memberUpdatePassword(MemberVO memberVO) throws Exception {
        update("memberMapper.memberUpdatePassword", memberVO);
    }

    /**
     * 비밀번호 변경 히스토리 등록
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public void memberInsertPasswordHistory(MemberVO memberVO) throws Exception {
        insert("memberMapper.memberInsertPasswordHistory", memberVO);
    }

    /**
     * 로그인.비밀번호 찾기 이메일 내용 조회
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public EgovMap memberfindPasswordEmailForm(EgovMap map) throws Exception {
        return selectOne("memberMapper.memberfindPasswordEmailForm", map);
    }

    /**
     * 자유게시판.비밀번호변경.비밀번호변경 화면
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public EgovMap memberChangePasswordForm(MemberVO memberVO) throws Exception {
        return selectOne("memberMapper.memberChangePasswordForm", memberVO);
    }

    /**
     * EsntlId를 이용한 로그인을 처리한다
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public MemberVO actionLoginByEsntlId(MemberVO memberVO) throws Exception {
        return selectOne("memberMapper.actionLoginByEsntlId", memberVO);
    }

    /**
     * 회원아이디 기준 회원 비밀번호 조회
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public EgovMap memberSpCisLoginInfoSelect(MemberVO memberVO) throws Exception {
        return selectOne("memberMapper.memberSpCisLoginInfoSelect", memberVO);
    }

    /**
     * 사용자가 입력한 비밀번호를 DB에서 SHA256으로 암호화
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public String memberSpGetSha256Password(MemberVO memberVO) throws Exception {
        return selectOne("memberMapper.memberSpGetSha256Password", memberVO);
    }

    /**
     * 로그인한 사용자의 권한목록을 스트링으로 반환
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public String memberAccessProgram(Map<String, String> param) throws Exception {
        return selectOne("memberMapper.memberAccessProgram", param);
    }

    /**
     * 로그인 히스토리 등록
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public int memberInsertLoginHistory(MemberVO memberVO) throws Exception {
        return insert("memberMapper.memberInsertLoginHistory", memberVO);
    }

    /**
     * 로그인 실패 히스토리 카운트 조회
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public int memberLoginFailHistoryCnt(MemberVO memberVO) throws Exception {
        return selectOne("memberMapper.memberLoginFailHistoryCnt", memberVO);
    }

    /**
     * 로그인 5회이상 실패 시 계졍 사용중지
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public void memberUpdateEnableYn(MemberVO memberVO) throws Exception {
        update("memberMapper.memberUpdateEnableYn", memberVO);
    }

    /**
     * 로그인 실패 히스토리 등록
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public void memberInsertLoginFailHistory(MemberVO memberVO) throws Exception {
        insert("memberMapper.memberInsertLoginFailHistory", memberVO);
    }

    /**
     * 로그인 실패 히스토리 등록
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public void memberDeleteLoginFailHistory(MemberVO memberVO) throws Exception {
        update("memberMapper.memberDeleteLoginFailHistory", memberVO);
    }

    /**
     * 로그인 상태 등록
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public void memberInsertLoginStatus(MemberVO memberVO) throws Exception {
        insert("memberMapper.memberInsertLoginStatus", memberVO);
    }


    /**
     * 개인정보변경 조회
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public EgovMap memberInfo(MemberVO memberVO) throws Exception {
        return selectOne("memberMapper.memberInfo", memberVO);
    }

    /**
     * 개인정보변경 조회
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public int updateUser(MemberVO memberVO) throws Exception {
        return update("memberMapper.updateUser", memberVO);
    }

    /**
     * 대리점 등록
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public int insertDepartment(MemberVO memberVO) throws Exception {
        return update("memberMapper.insertDepartment", memberVO);
    }

    /**
     * 1년의 기간동안 이용하지 않은 대상에 대해서는 분리보관(휴면) 30일전 하기 정보를 이용자에게 알림
     *
     * @param
     * @return data[memberVO]
     * @throws Exception
     */
    public List<?> memberPasswordChangeNoticeYearList() {
        return selectList("memberMapper.memberPasswordChangeNoticeYearList");
    }

    /**
     * 비밀번호 변경주기 분기 1회(3개월) 회원 상태값 변경
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public void updateMemberMonthPasswordChangeYn(EgovMap egovMap) throws Exception {
        update("memberMapper.updateMemberMonthPasswordChangeYn", egovMap);
    }

    /**
     * 1년의 기간동안 이용하지 않은 대상에 대해서는 분리보관(휴면) 이메일 발송 회원 상태값 변경
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public void updateMemberYearPasswordChangeYn(EgovMap egovMap) throws Exception {
        update("memberMapper.updateMemberYearPasswordChangeYn", egovMap);
    }

    /**
     * 1년의 기간동안 이용하지 않은 대상에 대해서는 분리보관(휴면) 회원 사용여부 상태값 변경
     *
     * @param vo - memberVO
     * @return data[memberVO]
     * @throws Exception
     */
    public void updateMemberYearEnableYn() throws Exception {
        update("memberMapper.updateMemberYearEnableYn");
    }

}