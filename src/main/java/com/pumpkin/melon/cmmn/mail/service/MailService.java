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
package com.pumpkin.melon.cmmn.mail.service;

import java.util.Map;

import org.egovframe.rte.psl.dataaccess.util.EgovMap;

public interface MailService {

	public String sendEmail(EgovMap searchParam)throws Exception;

	public String sendCISEmail(EgovMap searchParam)throws Exception;

}

