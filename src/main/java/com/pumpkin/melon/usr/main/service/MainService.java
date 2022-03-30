package com.pumpkin.melon.usr.main.service;

import org.egovframe.rte.psl.dataaccess.util.EgovMap;

/**
 * @Class Name : MainService.java
 * @Description : MainService Class
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
public interface MainService {


  
	/**
	 * 메인.메인 페이지
	 * @param vo - mainVO
	 * @return data[mainVO]
	 * @exception Exception
	 */
	EgovMap main(MainVO mainVO) throws Exception;

}