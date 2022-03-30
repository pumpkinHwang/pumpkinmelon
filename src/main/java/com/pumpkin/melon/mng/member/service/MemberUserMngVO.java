
package com.pumpkin.melon.mng.member.service;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import com.pumpkin.melon.cmmn.pagingDefaultVO;

/**
 * @Class Name : MemberUserMngVO.java
 * @Description : MemberUserMngVO Class
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
 *
 *  Copyright (C) by FRO All right reserved.
 */
public class MemberUserMngVO extends pagingDefaultVO {

	private static final long serialVersionUID = 1L;

	/** 아무것도없으면 에러나서 이건한꺼번에 지울예정 */
	private String testd;
	private String[] Userseq;
	private String id;
	private String password;
	private String name;
	private String type;
	private String userType;
	private String email;
	private String telNo;
	private String department;
	private String groupCode;
	private String useYn;
	
	private String mode;
	
	private String sessionUserId;
	private String sessionUserName;
	
	
	public String getTestd() {
		return testd;
	}
	public void setTestd(String testd) {
		this.testd = testd;
	}
	
	public String[] getUserseq() {
		return Userseq;
	}
	public void setUserseq(String[] userseq) {
		Userseq = userseq;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTelNo() {
		return telNo;
	}
	public void setTelNo(String telNo) {
		this.telNo = telNo;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getGroupCode() {
		return groupCode;
	}
	public void setGroupCode(String groupCode) {
		this.groupCode = groupCode;
	}
	public String getSessionUserId() {
		return sessionUserId;
	}
	public void setSessionUserId(String sessionUserId) {
		this.sessionUserId = sessionUserId;
	}
	public String getSessionUserName() {
		return sessionUserName;
	}
	public void setSessionUserName(String sessionUserName) {
		this.sessionUserName = sessionUserName;
	}
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	
	

}
