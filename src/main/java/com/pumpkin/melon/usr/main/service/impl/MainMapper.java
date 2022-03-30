package com.pumpkin.melon.usr.main.service.impl;

import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.springframework.stereotype.Repository;
import egovframework.com.cmm.service.impl.EgovComAbstractDAO;

import com.pumpkin.melon.usr.main.service.MainVO;

/**
 * @Class Name : MainMapper.java
 * @Description : MainMapper Class
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
@Repository("mainMapper") 
public class MainMapper extends EgovComAbstractDAO {


  
	/**
	 * 메인.메인 페이지
	 * @param vo - mainVO
	 * @return data[mainVO]
	 * @exception Exception
	 */
	public EgovMap main(MainVO mainVO) {
		return selectOne("mainMapper.main", mainVO);
	}

}