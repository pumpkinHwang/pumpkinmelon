package com.pumpkin.melon.mng.member.service.impl;

import java.util.List;

import com.pumpkin.melon.mng.member.service.MemberUserMngVO;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import com.pumpkin.melon.cmmn.pagingDefaultVO;
import org.springframework.stereotype.Repository;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;

/**
 * @Class Name : MemberUserMngMapper.java
 * @Description : MemberUserMngMapper Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2022.01.26  hsk3807          최초생성
 *
 * @author 개발팀
 * @since 2022 . 01. 26
 * @version 1.0
 * @see
 * @see
 *
 *  Copyright (C) by FRO All right reserved.
 */
@Repository("mngMemberUserMngMapper")
public class MemberUserMngMapper extends EgovComAbstractDAO {



	/**
	 * 회원정보 관리.목록
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<?> UserList(pagingDefaultVO searchVO) {
	    return selectList("mngMemberUserMngMapper.UserList", searchVO);
	}

	/**
	 * 회원정보 관리.목록
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
	public int UserListTotCnt(pagingDefaultVO searchVO){
	    return selectOne("mngMemberUserMngMapper.UserListTotCnt", searchVO);
	}


	/**
	 * 회원정보 관리.상세
	 * @param vo - memberUserMngVO
	 * @return data[memberUserMngVO]
	 * @exception Exception
	 */
	public EgovMap UserDetail(MemberUserMngVO memberUserMngVO) {
		return selectOne("mngMemberUserMngMapper.UserDetail", memberUserMngVO);
	}


	/**
	 * 회원정보 관리.신규등록화면
	 * @param vo - memberUserMngVO
	 * @return data[memberUserMngVO]
	 * @exception Exception
	 */
	public EgovMap UserRegistForm(MemberUserMngVO memberUserMngVO) {
		return selectOne("mngMemberUserMngMapper.UserRegistForm", memberUserMngVO);
	}


	/**
	 * 회원정보 관리.수정화면
	 * @param vo - memberUserMngVO
	 * @return data[memberUserMngVO]
	 * @exception Exception
	 */
	public EgovMap UserEditForm(MemberUserMngVO memberUserMngVO) {
		return selectOne("mngMemberUserMngMapper.UserEditForm", memberUserMngVO);
	}

	/**
	 * 회원정보 관리.목록
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	public List<?> UserMngList(pagingDefaultVO searchVO) {
	    return selectList("mngMemberUserMngMapper.UserMngList", searchVO);
	}

	/**
	 * 회원정보 관리.목록
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
	public int UserMngListTotCnt(pagingDefaultVO searchVO){
	    return selectOne("mngMemberUserMngMapper.UserMngListTotCnt", searchVO);
	}


	/**
	 * 회원정보 관리.상세
	 * @param vo - memberUserMngVO
	 * @return data[memberUserMngVO]
	 * @exception Exception
	 */
	public EgovMap UserMngDetail(MemberUserMngVO memberUserMngVO) {
		return selectOne("mngMemberUserMngMapper.UserMngDetail", memberUserMngVO);
	}


	/**
	 * 회원정보 관리.신규등록화면
	 * @param vo - memberUserMngVO
	 * @return data[memberUserMngVO]
	 * @exception Exception
	 */
	public EgovMap UserMngRegistForm(MemberUserMngVO memberUserMngVO) {
		return selectOne("mngMemberUserMngMapper.UserMngRegistForm", memberUserMngVO);
	}


	/**
	 * 회원정보 관리.수정화면
	 * @param vo - memberUserMngVO
	 * @return data[memberUserMngVO]
	 * @exception Exception
	 */
	public EgovMap UserMngEditForm(MemberUserMngVO memberUserMngVO) {
		return selectOne("mngMemberUserMngMapper.UserMngEditForm", memberUserMngVO);
	}
	
	/**
	 * 회원정보 목록 조회
	 * @param vo - memberUserMngVO
	 * @return data[memberUserMngVO]
	 * @exception Exception
	 */
	public List<?> UserAccessList(MemberUserMngVO memberUserMngVO) {
	    return selectList("mngMemberUserMngMapper.UserAccessList", memberUserMngVO);
	}
	
	public List<?> UserGroupList() throws Exception {
		return selectList("mngMemberUserMngMapper.UserGroupList");
	}

	public List<?> UserAgencyDepartmentList() throws Exception {
		return selectList("mngMemberUserMngMapper.UserAgencyDepartmentList");
	}
	
	public int UserIdCnt(MemberUserMngVO memberUserMngVO) throws Exception {
		return selectOne("mngMemberUserMngMapper.UserIdCnt",memberUserMngVO);
	}
	public int UserEmailCnt(MemberUserMngVO memberUserMngVO) throws Exception {
		return selectOne("mngMemberUserMngMapper.UserEmailCnt",memberUserMngVO);
	}
	public int insertUserMng(MemberUserMngVO memberUserMngVO)throws Exception {
		return insert("mngMemberUserMngMapper.insertUserMng", memberUserMngVO);
	}
	public int updateUserMng(MemberUserMngVO memberUserMngVO)throws Exception {
		return update("mngMemberUserMngMapper.updateUserMng", memberUserMngVO);
	}
	public int deleteUserMng(MemberUserMngVO memberUserMngVO)throws Exception {
		return delete("mngMemberUserMngMapper.deleteUserMng", memberUserMngVO);
	}
	public List<?> UserPAgencyDepartmentList() throws Exception {
		return selectList("mngMemberUserMngMapper.UserPAgencyDepartmentList");
	}
}
