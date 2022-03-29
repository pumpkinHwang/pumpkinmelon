package com.pumpkin.melon.mng.member.service.impl;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import com.pumpkin.melon.cmmn.mail.service.MailService;
import com.pumpkin.melon.cmmn.util.ReqUtils;
import com.pumpkin.melon.mng.member.service.MemberLoginMngService;
import com.pumpkin.melon.usr.member.service.MemberVO;
import com.pumpkin.melon.usr.member.service.impl.MemberMapper;
import egovframework.com.utl.sim.service.EgovFileScrty;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.springframework.stereotype.Service;
import org.springframework.web.util.HtmlUtils;

import com.sun.star.io.IOException;

/**
 * @Class Name : MemberLoginMngServiceImpl.java
 * @Description : MemberLoginMngServiceImpl Class
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
@Service("mngMemberLoginMngService") 
public class MemberLoginMngServiceImpl extends EgovAbstractServiceImpl implements MemberLoginMngService {

	private static final Logger LOGGER = LoggerFactory.getLogger(MemberLoginMngServiceImpl.class);
	
	@Resource(name="mngMemberLoginMngMapper")
	private MemberLoginMngMapper memberLoginMngDAO;	
	
	@Resource(name="memberMapper")
	private MemberMapper memberDAO;	
	
	@Resource(name="mailService")
	private MailService mailService;

  
	/**
	 * 로그인.로그인 페이지
	 * @param vo - memberLoginMngVO
	 * @return data[memberLoginMngVO]
	 * @exception
	 */
	public EgovMap memberLogin(MemberVO vo) throws Exception {
//		return memberLoginMngDAO.memberLogin(memberLoginMngVO);

		EgovMap memberMap = new EgovMap();
	
		try {
			// 1. 입력한 아이디의 회원정보를 조회한다.
			memberMap = memberDAO.memberSpCisLoginInfoSelect(vo);
			
			if(memberMap != null) {
				
				String groupCode = ReqUtils.getEmptyResult((String)memberMap.get("groupcode"), "");
				
				// 현 시스템 그룹코드 기준으로 전체관리자, 부분관리자만 접속가능함.
				if(groupCode.equals("00000000") || groupCode.equals("00000001") || groupCode.equals("00000002")) {
					
					// 입력받은 패스워드의 html코드 제거
					vo.setPassWd(HtmlUtils.htmlUnescape(vo.getPassWd()));
					
					// 2. 입력한 비밀번호를 암호화한다.
					String enPassword = EgovFileScrty.encryptPassword(vo.getPassWd());
					
					// 3. DB에 저장된 회원정보의 비밀번호화 사용자가 입력한 비밀번호를 비교하여 같은 경우에만 회원정보를 조회한다.
					if(memberMap.get("password").equals(enPassword)) {
						// 계정사용 정지된 사용자의 경우 로그인안됨.
						if(ReqUtils.getEmptyResult((String)memberMap.get("enableyn"),"").equals("n")) {
							memberMap.put("result", "false");
							memberMap.put("message", "suspension");
						}else {
							
							// 권한목록 저장
							String userAccessProgram = memberDAO.memberAccessProgram(memberMap);
							memberMap.put("userAccessProgram", ReqUtils.getEmptyResult(userAccessProgram, ""));
							
							// 로그인실패 이력 삭제
							memberDAO.memberDeleteLoginFailHistory(vo);
							
							// 로그인이력 등록
							vo.setStatus("0");
							memberDAO.memberInsertLoginHistory(vo);
							
							// 로그인 history key 로그인상태테이블에 저장
							vo.setLoginHistorySeq(Integer.parseInt(vo.getSeq()));
							memberDAO.memberInsertLoginStatus(vo);
							
							memberMap.put("result", "true");
							
							String passwordChangeYn = ReqUtils.getEmptyResult((String)memberMap.get("passwordchangeyn"));
							if(!passwordChangeYn.equals("")) {
								if(passwordChangeYn.equals("n")) {
									memberMap.put("message", "changePassword");
								}else if(passwordChangeYn.equals("c")) {
									memberMap.put("message", "changePasswordMonth");
								}else if(passwordChangeYn.equals("d")) {
									memberMap.put("result", "false");
									memberMap.put("message", "dormantUser");
								}else {
								}
							}
						}
						
					}else {
						// 로그인 시도 이력 등록
						vo.setStatus("0");
						memberDAO.memberInsertLoginHistory(vo);
						
						// 로그인 실패 이력 등록
						memberDAO.memberInsertLoginFailHistory(vo);
						
						int loginFailCnt = memberDAO.memberLoginFailHistoryCnt(vo);
						memberMap.put("loginFailCnt", loginFailCnt);
						
						// 로그인실패를 5번 이상한 경우 계정을 정지시킴
						if(loginFailCnt >= 5) {
							vo.setEnableyn("n");
							memberDAO.memberUpdateEnableYn(vo);
							memberMap.put("result", "false");
							memberMap.put("message", "five");
						}else {
							memberMap.put("result", "false");
							memberMap.put("message", "login");
						}
					}
				}else {
					memberMap.put("result", "false");
					memberMap.put("message", "access");
				}
				
			}else {
				memberMap = new EgovMap();
				memberMap.put("result", "false");
				memberMap.put("message", "empty");
			}
		}catch (IOException e) {
			e.getMessage();
		}
		
		return memberMap;
	
	}
	
	/**
	 * 로그인.아이디 찾기
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception
	 */
	public EgovMap memberfindId(MemberVO memberVO) throws Exception {
		
		EgovMap memberMap = new EgovMap();
		memberMap = memberDAO.memberfindId(memberVO);
		
		if(memberMap != null) {
			
			String resultCode = "";
			
			memberMap.put("code", "0002");
			resultCode = mailService.sendEmail(memberMap);
			
			if("0000".equals(resultCode)) {
				memberMap.put("result", "true");
	    	}
		
		}else {
			memberMap = new EgovMap();
			memberMap.put("result", "false");
		}
		
		return memberMap;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}