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
package com.pumpkin.melon.cmmn.mail.service.impl;

import java.nio.file.Files;

import javax.annotation.Resource;

import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang.StringUtils;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.pumpkin.melon.cmmn.mail.service.MailService;
import com.pumpkin.melon.cmmn.util.ReqUtils;
import egovframework.com.cop.ems.service.EgovSndngMailRegistService;
import egovframework.com.cop.ems.service.SndngMailVO;


@Service("mailService")
public class MailServiceImpl extends EgovAbstractServiceImpl implements MailService {

	/** log */
	private static final Logger LOGGER = LoggerFactory.getLogger(MailServiceImpl.class);

	@Value("${tdes.mail.sender}")
	private String memberSender;

	@Resource(name="mailMapper")
	private MailMapper mailDAO;	

	/** EgovSndngMailRegistService */
	@Resource(name = "sndngMailRegistService")
	private EgovSndngMailRegistService sndngMailRegistService;


	@Override
	public String sendEmail(EgovMap searchParam) throws Exception {
		
		EgovMap mailMap = mailDAO.mailDetail(searchParam);
		mailMap.put("id", searchParam.get("id"));
		mailMap.put("name", searchParam.get("name"));
		mailMap.put("ckbsPassword", searchParam.get("ckbsPassword"));
		mailMap.put("mberCertEmail", searchParam.get("mberCertEmail"));
		mailMap.put("paramMonth", searchParam.get("paramMonth"));
		mailMap.put("paramDay", searchParam.get("paramDay"));
		
		
		// 보내는 메일 유형을 가져온다.
		String typeCd = MapUtils.getString(searchParam, "code", "");
		SndngMailVO sndngMailVO = null;
		boolean result = false;

		// 메일 형식별 메일 양식을 읽어온다.
		// 해당 메일 양식에 필요한 내용을 매핑한다.
		switch (typeCd) {
		case "0002":	// 아이디찾기
			sndngMailVO = findIdMail(mailMap);
			break;
		case "0003":	// 비밀번호 찾기
			sndngMailVO = findPwMail(mailMap);
			break;
		case "0005":	// 휴면안내
			sndngMailVO = memberNoticeMail(mailMap);
			break;
		default:
			break;
		}

		LOGGER.info("sendMailVO ######");
    	result = sndngMailRegistService.insertSndngMail(sndngMailVO);

    	if(!result) {
    		return "9999";
    	}
 
		return "0000";
	}



	private SndngMailVO findIdMail(EgovMap searchParam) throws Exception {
		LOGGER.info("createEditAuthMail searchParam : {}",searchParam);
		SndngMailVO sndngMailVO = new SndngMailVO();
		ClassPathResource resource = null;
		String content=ReqUtils.getEmptyResult((String)searchParam.get("emailContents"));
		String toContent= "";

		//resource = new ClassPathResource("egovframework/mailTemplate/certifiedCode.html");
		//toContent = new String(Files.readAllBytes(resource.getFile().toPath()));
		toContent = content.replace("|USER_ID|", ReqUtils.getEmptyResult((String)searchParam.get("id")));

		// 메일을 보내기 위한 기본 정보를 설정한다.
		sndngMailVO.setRecptnPerson(ReqUtils.getEmptyResult((String)searchParam.get("mberCertEmail")));
    	sndngMailVO.setDsptchPerson(ReqUtils.getEmptyResult((String)searchParam.get("emailSender"))) ;
    	sndngMailVO.setSj(ReqUtils.getEmptyResult((String)searchParam.get("emailTitle"))); //
    	sndngMailVO.setEmailCn(toContent); //

		return sndngMailVO;
	}
	

	private SndngMailVO findPwMail(EgovMap searchParam) throws Exception {
		LOGGER.info("createEditAuthMail searchParam : {}",searchParam);
		SndngMailVO sndngMailVO = new SndngMailVO();
		ClassPathResource resource = null;
		String content=ReqUtils.getEmptyResult((String)searchParam.get("emailContents"));
		String toContent= "";

		toContent = content.replace("|USER_ID|", ReqUtils.getEmptyResult((String)searchParam.get("id")))
				.replace("|USER_NAME|", ReqUtils.getEmptyResult((String)searchParam.get("name")))
				.replace("|USER_TEMP_PASSWORD|", ReqUtils.getEmptyResult((String)searchParam.get("ckbsPassword")));

		// 메일을 보내기 위한 기본 정보를 설정한다.
		sndngMailVO.setRecptnPerson(ReqUtils.getEmptyResult((String)searchParam.get("mberCertEmail")));
    	sndngMailVO.setDsptchPerson(ReqUtils.getEmptyResult((String)searchParam.get("emailSender"))) ;
    	sndngMailVO.setSj(ReqUtils.getEmptyResult((String)searchParam.get("emailTitle"))); //
    	sndngMailVO.setEmailCn(toContent); //

		return sndngMailVO;
	}
	
	private SndngMailVO memberNoticeMail(EgovMap searchParam) throws Exception {
		LOGGER.info("createEditAuthMail searchParam : {}",searchParam);
		SndngMailVO sndngMailVO = new SndngMailVO();
		ClassPathResource resource = null;
		String toContent= null;
		String content=ReqUtils.getEmptyResult((String)searchParam.get("emailContents"));

		content = content.replace("|USER_ID|", ReqUtils.getEmptyResult((String)searchParam.get("id")))
				.replace("|PARAM_MONTH|", ReqUtils.getEmptyResult((String)searchParam.get("paramMonth")))
				.replace("|PARAM_DAY|", ReqUtils.getEmptyResult((String)searchParam.get("paramDay")));
		
		resource = new ClassPathResource("egovframework/mailTemplate/memberNotice.html");
		toContent = new String(Files.readAllBytes(resource.getFile().toPath()));
		toContent = toContent.replace("{content}", content);
		
		// 메일을 보내기 위한 기본 정보를 설정한다.
		sndngMailVO.setRecptnPerson(ReqUtils.getEmptyResult((String)searchParam.get("mberCertEmail")));
    	sndngMailVO.setDsptchPerson(ReqUtils.getEmptyResult((String)searchParam.get("emailSender"))) ;
    	sndngMailVO.setSj(ReqUtils.getEmptyResult((String)searchParam.get("emailTitle"))); //
    	sndngMailVO.setEmailCn(toContent); //

		return sndngMailVO;
	}


	@Override
	public String sendCISEmail(EgovMap searchParam) throws Exception {

		EgovMap mailMap = mailDAO.cisMailDetail(searchParam);

		// 보내는 메일 유형을 가져온다.
		SndngMailVO sndngMailVO = null;
		boolean result = false;

		// 메일 형식별 메일 양식을 읽어온다.
		// 해당 메일 양식에 필요한 내용을 매핑한다.

		sndngMailVO = cisEmail(mailMap);

		LOGGER.info("sendMailVO ######");
		result = sndngMailRegistService.insertSndngMail(sndngMailVO);

		if(!result) {
			return "9999";
		}

		return "0000";
	}



	private SndngMailVO cisEmail(EgovMap searchParam) throws Exception {
		LOGGER.info("createEditAuthMail searchParam : {}",searchParam);
		SndngMailVO sndngMailVO = new SndngMailVO();
		ClassPathResource resource = null;
		String content=ReqUtils.getEmptyResult((String)searchParam.get("emailContents"));

		// 메일을 보내기 위한 기본 정보를 설정한다.
		sndngMailVO.setRecptnPerson(ReqUtils.getEmptyResult((String)searchParam.get("emailReceivers")));
		sndngMailVO.setDsptchPerson(ReqUtils.getEmptyResult((String)searchParam.get("emailSender"))) ;
		sndngMailVO.setSj(ReqUtils.getEmptyResult((String)searchParam.get("emailTitle"))); //
		sndngMailVO.setEmailCn(content); //

		return sndngMailVO;
	}

	
}

