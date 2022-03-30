package com.pumpkin.melon.mng.member.service;

import java.util.List;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.pumpkin.melon.cmmn.pagingDefaultVO;

/**
 * @Class Name : MemberUserMngService.java
 * @Description : MemberUserMngService Class
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
public interface MemberUserMngService {



	/**
	 * 회원정보 관리.목록
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	List<?> UserList(pagingDefaultVO searchVO) throws Exception;

	/**
	 * 회원정보 관리.목록
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
	int UserListTotCnt(pagingDefaultVO searchVO);


	/**
	 * 회원정보 관리.상세
	 * @param vo - memberUserMngVO
	 * @return data[memberUserMngVO]
	 * @exception Exception
	 */
	EgovMap UserDetail(MemberUserMngVO memberUserMngVO) throws Exception;


	/**
	 * 회원정보 관리.신규등록화면
	 * @param vo - memberUserMngVO
	 * @return data[memberUserMngVO]
	 * @exception Exception
	 */
	EgovMap UserRegistForm(MemberUserMngVO memberUserMngVO) throws Exception;


	/**
	 * 회원정보 관리.수정화면
	 * @param vo - memberUserMngVO
	 * @return data[memberUserMngVO]
	 * @exception Exception
	 */
	EgovMap UserEditForm(MemberUserMngVO memberUserMngVO) throws Exception;


	/**
	 * 회원정보 관리.목록
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	List<?> UserMngList(pagingDefaultVO searchVO) throws Exception;

	/**
	 * 회원정보 관리.목록
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
	int UserMngListTotCnt(pagingDefaultVO searchVO);


	/**
	 * 회원정보 관리.상세
	 * @param vo - memberUserMngVO
	 * @return data[memberUserMngVO]
	 * @exception Exception
	 */
	EgovMap UserMngDetail(MemberUserMngVO memberUserMngVO) throws Exception;


	/**
	 * 회원정보 관리.신규등록화면
	 * @param vo - memberUserMngVO
	 * @return data[memberUserMngVO]
	 * @exception Exception
	 */
	EgovMap UserMngRegistForm(MemberUserMngVO memberUserMngVO) throws Exception;


	/**
	 * 회원정보 관리.수정화면
	 * @param vo - memberUserMngVO
	 * @return data[memberUserMngVO]
	 * @exception Exception
	 */
	EgovMap UserMngEditForm(MemberUserMngVO memberUserMngVO) throws Exception;

	/**
	 * 회원정보 목록 조회
	 * @param vo - memberUserMngVO
	 * @return data[memberUserMngVO]
	 * @exception Exception
	 */
	List<?> UserAccessList(MemberUserMngVO memberUserMngVO) throws Exception;
	
	/**
	 * 회원정보 관리.신규등록화면
	 * @return 회원그룹 리스트
	 * @exception Exception
	 */
	List<?> UserGroupList() throws Exception;
	
	/**
	 * 회원정보 관리.신규등록화면
	 * @return 부서 리스트
	 * @exception Exception
	 */
	List<?> UserAgencyDepartmentList() throws Exception;
	
	/**
	 * 회원정보 관리.신규등록화면
	 * @return ID갯수
	 * @exception
	 */
	int UserIdCnt(MemberUserMngVO memberUserMngVO) throws Exception;
	
	int UserEmailCnt(MemberUserMngVO memberUserMngVO) throws Exception;
	
	EgovMap userMngSave(MemberUserMngVO memberUserMngVO) throws Exception;
	
	List<?> UserPAgencyDepartmentList() throws Exception;
	
}
