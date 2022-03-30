package com.pumpkin.melon.usr.main.service.impl;

import com.pumpkin.melon.usr.main.service.MainService;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import com.pumpkin.melon.usr.main.service.MainVO;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.springframework.stereotype.Service;

/**
 * @Class Name : MainServiceImpl.java
 * @Description : MainServiceImpl Class
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
@Service("mainService") 
public class MainServiceImpl extends EgovAbstractServiceImpl implements MainService {

	private static final Logger LOGGER = LoggerFactory.getLogger(MainServiceImpl.class);
	
	@Resource(name="mainMapper")
	private MainMapper mainDAO;	

  
	/**
	 * 메인.메인 페이지
	 * @param vo - mainVO
	 * @return data[mainVO]
	 * @exception
	 */
	public EgovMap main(MainVO mainVO) throws Exception {
		return mainDAO.main(mainVO);
	}

}