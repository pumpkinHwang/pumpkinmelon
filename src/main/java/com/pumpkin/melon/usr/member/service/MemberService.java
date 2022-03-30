package com.pumpkin.melon.usr.member.service;

import org.egovframe.rte.psl.dataaccess.util.EgovMap;

import java.util.Map;

/**
 * @Class Name : MemberService.java
 * @Description : MemberService Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2022.01.26  황장운          최초생성
 *
 * @author 개발팀
 * @since 2022 . 01. 26
 * @version 1.0
 * @see
 * @see
 *
 *  Copyright (C) by FRO All right reserved.
 */
public interface MemberService {


  
	/**
	 * 로그인.로그인 페이지
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception Exception
	 */
	EgovMap memberLogin(MemberVO memberVO) throws Exception;

  
	/**
	 * 로그인.아이디 찾기
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception Exception
	 */
	EgovMap memberfindId(MemberVO memberVO) throws Exception;
	
  
	/**
	 * 로그인.비밀번호 찾기
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception Exception
	 */
	EgovMap memberfindPw(MemberVO memberVO) throws Exception;
	
	
	/**
	 * 로그인.관리자 비밀번호 찾기
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception Exception
	 */
	EgovMap mngMemberfindPw(MemberVO memberVO) throws Exception;

	/**
	 * 로그인.비밀번호변경.비밀번호변경
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception Exception
	 */
	EgovMap memberChangePasswordForm(MemberVO memberVO) throws Exception;
	
	/**
	 * 로그인.비밀번호변경.관리자 비밀번호변경
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception Exception
	 */
	EgovMap mngMemberChangePasswordForm(MemberVO memberVO) throws Exception;
	
	/**
	 * EsntlId를 이용한 로그인을 처리한다
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception Exception
	 */
	MemberVO actionLoginByEsntlId(MemberVO vo) throws Exception;
	
	/**
	 * EsntlId를 이용한 로그인을 처리한다
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception Exception
	 */
	String memberAccessProgram(Map<String, String> param) throws Exception;
	
	/**
	 * 회원정보 조회
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception Exception
	 */
	EgovMap memberSpCisLoginInfoSelect(MemberVO vo) throws Exception;

	/**
	 * 개인정보변경 조회
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception Exception
	 */
	EgovMap memberInfo(MemberVO memberVO) throws Exception;


	/**
	 * 개인정보변경
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception Exception
	 */
	EgovMap UserSave(MemberVO memberVO) throws Exception;
	
	/**
	 * 1년의 기간동안 이용하지 않은 대상에 대해서는 분리보관(휴면) 30일전 하기 정보를 이용자에게 알림
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception Exception
	 */
	void memberPasswordChangeNoticeYearList() throws Exception;
	
	/**
	 * 비밀번호 변경주기 분기 1회(3개월) 회원 상태값 변경
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception Exception
	 */
	void updateMemberMonthPasswordChangeYn(EgovMap egovMap) throws Exception;
	
	/**
	 * 1년의 기간동안 이용하지 않은 대상에 대해서는 분리보관(휴면) 이메일 발송 회원 상태값 변경
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception Exception
	 */
	void updateMemberYearPasswordChangeYn(EgovMap egovMap) throws Exception;
	
	/**
	 * 1년의 기간동안 이용하지 않은 대상에 대해서는 분리보관(휴면) 회원 사용여부 상태값 변경
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception Exception
	 */
	void updateMemberYearEnableYn() throws Exception;
}