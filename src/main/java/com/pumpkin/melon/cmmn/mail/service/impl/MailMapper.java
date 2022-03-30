package com.pumpkin.melon.cmmn.mail.service.impl;

import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.springframework.stereotype.Repository;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
 
/**
 * @Class Name : FileAttachMapper.java
 * @Description : FileAttachMapper Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2022.01.15  황장운          최초생성
 *
 * @author 개발팀
 * @since 2022 . 01. 15
 * @version 1.0
 * @see
 * @see
 *
 *  Copyright (C) by FRO All right reserved.
 */
@Repository("mailMapper") 
public class MailMapper extends EgovComAbstractDAO {
	
	/**
	 * 공통 첨부파일 상세 조회
	 * @param FileAttachVO - 조회할 정보가 담긴 VO
	 * @return EgovMap
	 * @exception Exception
	 */
	EgovMap mailDetail(EgovMap map){
		return selectOne("mailMapper.mailDetail", map);
	}

	/**
	 * 공통 cis 메일 상세 조회
	 * @return EgovMap
	 * @exception Exception
	 */
	EgovMap cisMailDetail(EgovMap map){
		return selectOne("mailMapper.cisMailDetail", map);
	}

}
