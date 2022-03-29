package com.pumpkin.melon.mng.member.service;

import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import com.pumpkin.melon.mng.member.service.MemberMngVO;

/**
 * @Class Name : MemberLoginMngService.java
 * @Description : MemberLoginMngService Class
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
public interface MemberLoginMngService {


  
	/**
	 * 로그인.로그인 페이지
	 * @param vo - memberLoginMngVO
	 * @return data[memberLoginMngVO]
	 * @exception Exception
	 */
	EgovMap memberLogin(MemberMngVO vo) throws Exception;

}