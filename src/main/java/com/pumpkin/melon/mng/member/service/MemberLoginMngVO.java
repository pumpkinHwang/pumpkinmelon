
package com.pumpkin.melon.mng.member.service;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import com.pumpkin.melon.cmmn.pagingDefaultVO;

/**
 * @Class Name : MemberLoginMngVO.java
 * @Description : MemberLoginMngVO Class
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
public class MemberLoginMngVO extends pagingDefaultVO {

	private static final long serialVersionUID = 1L;

	/** 아무것도없으면 에러나서 이건한꺼번에 지울예정 */
	private String testd;
	public String getTestd() {
		return testd;
	}
	public void setTestd(String testd) {
		this.testd = testd;
	}

}