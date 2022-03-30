package com.pumpkin.melon.mng.member.service.impl;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import com.pumpkin.melon.cmmn.pagingDefaultVO;
import com.pumpkin.melon.cmmn.mail.service.MailService;
import com.pumpkin.melon.mng.member.service.MemberUserMngService;
import com.pumpkin.melon.mng.member.service.MemberUserMngVO;
import egovframework.com.utl.sim.service.EgovFileScrty;

import java.io.IOException;
import java.util.List;
import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.springframework.stereotype.Service;

/**
 * @Class Name : MemberUserMngServiceImpl.java
 * @Description : MemberUserMngServiceImpl Class
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
@Service("mngMemberUserMngService")
public class MemberUserMngServiceImpl extends EgovAbstractServiceImpl implements MemberUserMngService {

	private static final Logger LOGGER = LoggerFactory.getLogger(MemberUserMngServiceImpl.class);

	@Resource(name="mngMemberUserMngMapper")
	private MemberUserMngMapper memberUserMngDAO;
	@Resource(name="mailService")
	private MailService mailService;


	/**
	 * 회원정보 관리.목록
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	 @Override
	public List<?> UserList(pagingDefaultVO searchVO)  throws Exception {
		return memberUserMngDAO.UserList(searchVO);
	}

	/**
	 * 회원정보 관리.목록
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
	public int UserListTotCnt(pagingDefaultVO searchVO) {
		return memberUserMngDAO.UserListTotCnt(searchVO);
	}


	/**
	 * 회원정보 관리.상세
	 * @param vo - memberUserMngVO
	 * @return data[memberUserMngVO]
	 * @exception
	 */
	public EgovMap UserDetail(MemberUserMngVO memberUserMngVO) throws Exception {
		return memberUserMngDAO.UserDetail(memberUserMngVO);
	}


	/**
	 * 회원정보 관리.신규등록화면
	 * @param vo - memberUserMngVO
	 * @return data[memberUserMngVO]
	 * @exception
	 */
	public EgovMap UserRegistForm(MemberUserMngVO memberUserMngVO) throws Exception {
		return memberUserMngDAO.UserRegistForm(memberUserMngVO);
	}


	/**
	 * 회원정보 관리.수정화면
	 * @param vo - memberUserMngVO
	 * @return data[memberUserMngVO]
	 * @exception
	 */
	public EgovMap UserEditForm(MemberUserMngVO memberUserMngVO) throws Exception {
		return memberUserMngDAO.UserEditForm(memberUserMngVO);
	}



	/**
	 * 회원정보 관리.목록
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 목록
	 * @exception Exception
	 */
	 @Override
	public List<?> UserMngList(pagingDefaultVO searchVO)  throws Exception {
		return memberUserMngDAO.UserMngList(searchVO);
	}

	/**
	 * 회원정보 관리.목록
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return 글 총 갯수
	 * @exception
	 */
	public int UserMngListTotCnt(pagingDefaultVO searchVO) {
		return memberUserMngDAO.UserMngListTotCnt(searchVO);
	}


	/**
	 * 회원정보 관리.상세
	 * @param vo - memberUserMngVO
	 * @return data[memberUserMngVO]
	 * @exception
	 */
	public EgovMap UserMngDetail(MemberUserMngVO memberUserMngVO) throws Exception {
		return memberUserMngDAO.UserMngDetail(memberUserMngVO);
	}


	/**
	 * 회원정보 관리.신규등록화면
	 * @param vo - memberUserMngVO
	 * @return data[memberUserMngVO]
	 * @exception
	 */
	public EgovMap UserMngRegistForm(MemberUserMngVO memberUserMngVO) throws Exception {
		return memberUserMngDAO.UserMngRegistForm(memberUserMngVO);
	}


	/**
	 * 회원정보 관리.수정화면
	 * @param vo - memberUserMngVO
	 * @return data[memberUserMngVO]
	 * @exception
	 */
	public EgovMap UserMngEditForm(MemberUserMngVO memberUserMngVO) throws Exception {
		return memberUserMngDAO.UserMngEditForm(memberUserMngVO);
	}

	/**
	 * 회원정보 목록 조회
	 * @param vo - memberUserMngVO
	 * @return data[memberUserMngVO]
	 * @exception Exception
	 */
	 @Override
	public List<?> UserAccessList(MemberUserMngVO memberUserMngVO)  throws Exception {
		return memberUserMngDAO.UserAccessList(memberUserMngVO);
	}

	@Override
	public List<?> UserGroupList() throws Exception {
		// TODO Auto-generated method stub
		return memberUserMngDAO.UserGroupList();
	}

	@Override
	public List<?> UserAgencyDepartmentList() throws Exception {
		// TODO Auto-generated method stub
		return memberUserMngDAO.UserAgencyDepartmentList();
	}

	@Override
	public int UserIdCnt(MemberUserMngVO memberUserMngVO) throws Exception {
		// TODO Auto-generated method stub
		return memberUserMngDAO.UserIdCnt(memberUserMngVO);
	}

	@Override
	public int UserEmailCnt(MemberUserMngVO memberUserMngVO) throws Exception {
		// TODO Auto-generated method stub
		return memberUserMngDAO.UserEmailCnt(memberUserMngVO);
	}
	@Override
	public EgovMap userMngSave(MemberUserMngVO memberUserMngVO) throws Exception {
		EgovMap resultMap = new EgovMap();
		try {
			if(memberUserMngVO.getMode().equals("INSERT")) {
				// 게시글 등록
				EgovMap memberMap = new EgovMap();
				String pw = getRamdomPassword(4);
				String resultCode = "";
				memberMap.put("mberCertEmail", memberUserMngVO.getEmail());
				memberMap.put("ckbsPassword", pw);
				memberMap.put("code", "0003");
				resultCode = mailService.sendEmail(memberMap);
				if(memberUserMngVO.getUserType().equals("user")) {
					memberUserMngVO.setPassword(EgovFileScrty.encryptPassword(pw,memberUserMngVO.getId()));
				}else {
					memberUserMngVO.setPassword(EgovFileScrty.encryptPassword(pw));
				}
				memberUserMngDAO.insertUserMng(memberUserMngVO);
			}else if(memberUserMngVO.getMode().equals("UPDATE")) {
				// 게시글 수정
				for(int i=0;i<memberUserMngVO.getUserseq().length;i++) {
					int idx = memberUserMngVO.getUserseq()[i].indexOf(":");
					String seq = memberUserMngVO.getUserseq()[i].substring(0, idx);
					String useYn = memberUserMngVO.getUserseq()[i].substring(idx+1);
					memberUserMngVO.setSeq(seq);
					if(useYn.equals("y")) {
						memberUserMngVO.setUseYn("n");
					}else if(useYn.equals("n")) {
						memberUserMngVO.setUseYn("y");
					}
					memberUserMngDAO.updateUserMng(memberUserMngVO);
				}
			}else if(memberUserMngVO.getMode().equals("DELETE")) {
				// 게시글 삭제
				for(int i=0;i<memberUserMngVO.getUserseq().length;i++) {
					int idx = memberUserMngVO.getUserseq()[i].indexOf(":");
					String seq = memberUserMngVO.getUserseq()[i].substring(0, idx);
					memberUserMngVO.setSeq(seq);
					memberUserMngDAO.deleteUserMng(memberUserMngVO);
				}

			}
			resultMap.put("result", "true");
		}catch (IOException e) {
			resultMap.put("result", "false");
			e.getMessage();
		}

		return resultMap;
	}

	@Override
	public List<?> UserPAgencyDepartmentList() throws Exception {
		// TODO Auto-generated method stub
		return memberUserMngDAO.UserPAgencyDepartmentList();
	}

	public static String getRamdomPassword(int len) {
		char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };
		int idx = 0;
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < len; i++) {
			idx = (int) (charSet.length * Math.random());
			sb.append(charSet[idx]);
			}
		return sb.toString();
		}




}
