package com.pumpkin.melon.usr.member.service.impl;

import com.pumpkin.melon.cmmn.mail.service.MailService;
import com.pumpkin.melon.cmmn.util.ReqUtils;
import com.pumpkin.melon.usr.member.service.MemberService;
import com.pumpkin.melon.usr.member.service.MemberVO;
import egovframework.com.utl.sim.service.EgovFileScrty;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.util.HtmlUtils;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

/**
 * @Class Name : MemberServiceImpl.java
 * @Description : MemberServiceImpl Class
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
@Service("memberService") 
public class MemberServiceImpl extends EgovAbstractServiceImpl implements MemberService {

private static final Logger LOGGER = LoggerFactory.getLogger(MemberServiceImpl.class);
	
	@Resource(name="memberMapper")
	private MemberMapper memberDAO;	
	
	@Resource(name="mailService")
	private MailService mailService;

  
	/**
	 * 로그인
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception
	 */
	@Override
	public EgovMap memberLogin(MemberVO vo) throws Exception {

		EgovMap memberMap = new EgovMap();
		
		try {
			
			// 1. 입력한 아이디의 회원정보를 조회한다.
			memberMap = memberDAO.memberSpCisLoginInfoSelect(vo);
			
			if(memberMap != null) {
				
				// 입력받은 패스워드의 html코드 제거
				vo.setPassWd(HtmlUtils.htmlUnescape(vo.getPassWd()));
				
				// 2. 입력한 비밀번호를 암호화한다.
				String enPassword = EgovFileScrty.encryptPassword(vo.getPassWd(), vo.getId());
				vo.setEncodePassWd(enPassword);
				
				// 3. SHA-256으로 암호화된 비밀번호를 프로시저를 통해 조회한다.
				String dbEnPassword = memberDAO.memberSpGetSha256Password(vo);
				
				// 4. DB에 저장된 회원정보의 비밀번호화 사용자가 입력한 비밀번호를 비교하여 같은 경우에만 회원정보를 조회한다.
				if(memberMap.get("password").equals(dbEnPassword)) {
					
					// 계정사용 정지된 사용자의 경우 로그인안됨.
					if(ReqUtils.getEmptyResult((String)memberMap.get("enableyn"),"").equals("n")) {
		
						vo.setStatus("3");
						memberDAO.memberInsertLoginHistory(vo);
						
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
				
				memberMap = new EgovMap();
				
				int loginFailCnt = memberDAO.memberLoginFailHistoryCnt(vo);
				
				// 로그인실패를 5번 이상한 경우 계정을 정지시킴
				if(loginFailCnt >= 5) {
					memberMap.put("loginFailCnt", 5);
					memberMap.put("result", "false");
					memberMap.put("message", "five");
				}else {
					memberMap.put("result", "false");
					memberMap.put("message", "login");
				}
				
			}
			
		}catch (IOException e) {
			memberMap.put("result", "false");
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

  
	/**
	 * 로그인.비밀번호 찾기
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception
	 */
	public EgovMap memberfindPw(MemberVO memberVO) throws Exception {
		
		EgovMap memberMap = new EgovMap();
		memberMap = memberDAO.memberfindPw(memberVO);
		
		if(memberMap != null) {
			
			// 1. 랜덤한 비밀번호 10글자 생성
			EgovMap passwordMap = new EgovMap();
			String ckbsPassword = "";
			ckbsPassword = memberDAO.memberckbsPasswordCreateFunc(passwordMap);
			
			// 2. 비밀번호를 암호화한다.
			String enPassword = EgovFileScrty.encryptPassword(ckbsPassword, memberVO.getId());
			
			// 3. SHA-256으로 암호화된 비밀번호를 프로시저를 통해 조회한다.
			memberVO.setPassWd(ckbsPassword);
			memberVO.setEncodePassWd(enPassword);
			String dbEnPassword = memberDAO.memberSpGetSha256Password(memberVO);
			
			// 4. 암호화된 비밀번호를 개인정보테이블에 저장
			memberVO.setPassWd(dbEnPassword);
			memberDAO.memberUpdatePassword(memberVO);
			
			// 5. 비밀번호변경 히스토리 등록
			memberDAO.memberInsertPasswordHistory(memberVO);
			
			// 6. 계정 활성화
			memberVO.setEnableyn("y");
			memberDAO.memberUpdateEnableYn(memberVO);
			
			String resultCode = "";
			
			memberMap.put("ckbsPassword", ckbsPassword);
			memberMap.put("code", "0003");
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
	
	/**
	 * 로그인.비밀번호 찾기
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception
	 */
	public EgovMap mngMemberfindPw(MemberVO memberVO) throws Exception {
		
		EgovMap memberMap = new EgovMap();
		memberMap = memberDAO.memberfindPw(memberVO);
		
		if(memberMap != null) {
			
			// 1. 랜덤한 비밀번호 10글자 생성
			EgovMap passwordMap = new EgovMap();
			String ckbsPassword = "";
			ckbsPassword = memberDAO.memberckbsPasswordCreateFunc(passwordMap);
			
			// 2. 비밀번호를 암호화한다.
			String enPassword = EgovFileScrty.encryptPassword(ckbsPassword);
			
			// 3. 암호화된 비밀번호를 개인정보테이블에 저장
			memberVO.setPassWd(enPassword);
			memberDAO.memberUpdatePassword(memberVO);
			
			// 4. 비밀번호변경 히스토리 등록
			memberDAO.memberInsertPasswordHistory(memberVO);
			
			// 5. 계정 활성화
			memberVO.setEnableyn("y");
			memberDAO.memberUpdateEnableYn(memberVO);
			
			String resultCode = "";
			
			memberMap.put("ckbsPassword", ckbsPassword);
			memberMap.put("code", "0003");
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

  
	/**
	 * 비밀번호변경.비밀번호변경 화면
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception
	 */
	public EgovMap memberChangePasswordForm(MemberVO vo) throws Exception {
		
		EgovMap memberMap = new EgovMap();
		
		try {
			
			// 1. 입력한 아이디의 회원정보를 조회한다.
			memberMap = memberDAO.memberSpCisLoginInfoSelect(vo);
			
			if(memberMap != null) {
				
				// 입력받은 패스워드의 html코드 제거
				vo.setPassWd(HtmlUtils.htmlUnescape(vo.getPassWd()));
				
				// 2. 입력한 비밀번호를 암호화한다.
				String enPassword = EgovFileScrty.encryptPassword(vo.getPassWd(), vo.getId());
				vo.setEncodePassWd(enPassword);
				
				// 3. SHA-256으로 암호화된 비밀번호를 프로시저를 통해 조회한다.
				String dbEnPassword = memberDAO.memberSpGetSha256Password(vo);
				
				// 4. DB에 저장된 회원정보의 비밀번호화 사용자가 입력한 비밀번호를 비교하여 같은 경우에만 회원정보를 조회한다.
				if(memberMap.get("password").equals(dbEnPassword)) {
					
					// 1. 신규 비밀번호
					String ckbsPassword = HtmlUtils.htmlUnescape(vo.getNewPassWd());
					
					// 2. 비밀번호를 암호화한다.
					enPassword = EgovFileScrty.encryptPassword(ckbsPassword, vo.getId());
					
					// 3. SHA-256으로 암호화된 비밀번호를 프로시저를 통해 조회한다.
					vo.setPassWd(ckbsPassword);
					vo.setEncodePassWd(enPassword);
					dbEnPassword = memberDAO.memberSpGetSha256Password(vo);
					
					// 4. 암호화된 비밀번호를 개인정보테이블에 저장
					vo.setPassWd(dbEnPassword);
					memberDAO.memberUpdatePassword(vo);
					
					// 5. 비밀번호변경 히스토리 등록
					memberDAO.memberInsertPasswordHistory(vo);
					
					// 6. 사용가능 상태로 변경
					vo.setEnableyn("y");
					memberDAO.memberUpdateEnableYn(vo);
					
					memberMap.put("result", "true");
					
				}else {
					memberMap.put("result", "false");
				}
			}
			
		}catch (IOException e) {
			memberMap.put("result", "false");
			e.getMessage();
		}
		
		return memberMap;
	}
	
	/**
	 * 비밀번호변경.비밀번호변경 화면
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception
	 */
	public EgovMap mngMemberChangePasswordForm(MemberVO vo) throws Exception {
		
		EgovMap memberMap = new EgovMap();
		
		try {
			
			// 1. 입력한 아이디의 회원정보를 조회한다.
			memberMap = memberDAO.memberSpCisLoginInfoSelect(vo);
			
			if(memberMap != null) {
				
				// 입력받은 패스워드의 html코드 제거
				vo.setPassWd(HtmlUtils.htmlUnescape(vo.getPassWd()));
				
				// 2. 입력한 비밀번호를 암호화한다.
				String enPassword = EgovFileScrty.encryptPassword(vo.getPassWd());
				
				// 3. DB에 저장된 회원정보의 비밀번호화 사용자가 입력한 비밀번호를 비교하여 같은 경우에만 회원정보를 조회한다.
				if(memberMap.get("password").equals(enPassword)) {
					
					// 1. 신규 비밀번호
					String ckbsPassword = HtmlUtils.htmlUnescape(vo.getNewPassWd());
					
					// 2. 비밀번호를 암호화한다.
					enPassword = EgovFileScrty.encryptPassword(ckbsPassword);
					
					// 3. SHA-256으로 암호화된 비밀번호를 프로시저를 통해 조회한다.
					vo.setPassWd(enPassword);
					memberDAO.memberUpdatePassword(vo);
					
					// 4. 비밀번호변경 히스토리 등록
					memberDAO.memberInsertPasswordHistory(vo);
					
					// 5. 사용가능 상태로 변경
					vo.setEnableyn("y");
					memberDAO.memberUpdateEnableYn(vo);
					
					memberMap.put("result", "true");
					
				}else {
					memberMap.put("result", "false");
				}
			}
			
		}catch (IOException e) {
			memberMap.put("result", "false");
			e.getMessage();
		}
		
		return memberMap;
	}


	@Override
	public MemberVO actionLoginByEsntlId(MemberVO vo) throws Exception {
		
		MemberVO loginVO = memberDAO.actionLoginByEsntlId(vo);

    	// 3. 결과를 리턴한다.
    	if (loginVO != null && !loginVO.getId().equals("") && !loginVO.getPassWd().equals("")) {
    		return loginVO;
    	} else {
    		loginVO = new MemberVO();
    	}

    	return loginVO;
	}


	@Override
	public String memberAccessProgram(Map<String, String> param) throws Exception {
		return memberDAO.memberAccessProgram(param);
	}


	@Override
	public EgovMap memberSpCisLoginInfoSelect(MemberVO vo) throws Exception {
		return memberDAO.memberSpCisLoginInfoSelect(vo);
	}



	@Override
	public EgovMap memberInfo(MemberVO vo) throws Exception {
		return memberDAO.memberInfo(vo);
	}


	@Override
	public EgovMap UserSave(MemberVO vo) throws Exception {
		EgovMap memberMap = new EgovMap();
		EgovMap resMap = new EgovMap();

		try {
			// 1. 입력한 아이디의 회원정보를 조회한다.
			memberMap = memberDAO.memberSpCisLoginInfoSelect(vo);

			if(memberMap != null) {

				// 입력받은 패스워드의 html코드 제거
				vo.setPassWd(HtmlUtils.htmlUnescape(vo.getPassWd()));

				// 2. 입력한 비밀번호를 암호화한다.
				String enPassword = EgovFileScrty.encryptPassword(vo.getPassWd(), vo.getId());
				vo.setEncodePassWd(enPassword);

				// 3. SHA-256으로 암호화된 비밀번호를 프로시저를 통해 조회한다.
				String dbEnPassword = memberDAO.memberSpGetSha256Password(vo);

				// 4. DB에 저장된 회원정보의 비밀번호화 사용자가 입력한 비밀번호를 비교하여 같은 경우에만 정보를 수정한다.
				if(memberMap.get("password").equals(dbEnPassword)) {

					memberDAO.updateUser(vo);

					if(!"".equals(vo.getDepartmentName()) && vo.getDepartmentName() != null) {
						memberDAO.insertDepartment(vo);
					}

					resMap.put("result", "true");

				} else {
					resMap.put("result", "false");
				}
			}else {
				resMap.put("result", "false");
			}
		}catch (IOException e) {
			resMap.put("result", "false");
			e.getMessage();
		}

		return resMap;
	}

	/**
	 * 1년의 기간동안 이용하지 않은 대상에 대해서는 분리보관(휴면) 30일전 하기 정보를 이용자에게 알림
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception Exception
	 */
	@Override
	public void memberPasswordChangeNoticeYearList() throws Exception {
		List list = memberDAO.memberPasswordChangeNoticeYearList();
		
		if(list.size() > 0) {
			
			Calendar cal = Calendar.getInstance( );
			int month = cal.get(Calendar.MONTH)+2;
			int date = cal.get(Calendar.DATE);
			
			EgovMap memberMap = new EgovMap();
			memberMap.put("code", "0005");
			memberMap.put("paramMonth", String.valueOf(month));
			memberMap.put("paramDay", String.valueOf(date));
			
			String resultCode = "";
			
			for(int i=0; i<list.size(); i++) {
				Map map = (Map) list.get(i);
				memberMap.put("id",map.get("id"));
				memberMap.put("mberCertEmail",map.get("email"));
				resultCode = mailService.sendEmail(memberMap);
			}
			
		}
	}

	/**
	 * 비밀번호 변경주기 분기 1회(3개월) 회원 상태값 변경
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception Exception
	 */
	@Override
	public void updateMemberMonthPasswordChangeYn(EgovMap egovMap) throws Exception {
		memberDAO.updateMemberMonthPasswordChangeYn(egovMap);
	}

	/**
	 * 1년의 기간동안 이용하지 않은 대상에 대해서는 분리보관(휴면) 회원 상태값 변경
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception Exception
	 */
	@Override
	public void updateMemberYearPasswordChangeYn(EgovMap egovMap) throws Exception {
		memberDAO.updateMemberYearPasswordChangeYn(egovMap);
	}

	/**
	 * 1년의 기간동안 이용하지 않은 대상에 대해서는 분리보관(휴면) 회원 사용여부 상태값 변경
	 * @param vo - memberVO
	 * @return data[memberVO]
	 * @exception Exception
	 */
	@Override
	public void updateMemberYearEnableYn() throws Exception {
		memberDAO.updateMemberYearEnableYn();
	}
}