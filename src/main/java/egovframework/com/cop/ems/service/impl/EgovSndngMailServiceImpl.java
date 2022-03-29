package egovframework.com.cop.ems.service.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.mail.internet.MimeMessage;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.mail.EmailAttachment;
import org.egovframe.rte.fdl.cryptography.impl.EgovARIACryptoServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailParseException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import egovframework.com.cmm.service.EgovFileMngService;
import egovframework.com.cmm.service.FileVO;
import egovframework.com.cop.ems.service.EgovMultiPartEmail;
import egovframework.com.cop.ems.service.EgovSndngMailService;
import egovframework.com.cop.ems.service.SndngMailVO;

/**
 * 메일 솔루션과 연동해서 이용해서 메일을 보내는 서비스 구현 클래스
 * @since 2011.09.09
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자          수정내용
 *  -------    --------    ---------------------------
 *  2011.09.09  황장운       최초 작성
 *  2011.12.06  황장운       메일 첨부파일이 기능 추가
 *  2013.05.23  황장운       메일 첨부파일이 없을 때 로직 추가
 *
 *  </pre>
 */
@Service("egovSndngMailService")
public class EgovSndngMailServiceImpl extends EgovARIACryptoServiceImpl implements EgovSndngMailService {

	@Resource(name = "egovMultiPartEmail")
	private EgovMultiPartEmail egovMultiPartEmail;

	/** SndngMailRegistDAO */
	@Resource(name = "sndngMailRegistDAO")
	private SndngMailRegistDAO sndngMailRegistDAO;


	@Resource(name = "EMSMailSender")
	private JavaMailSenderImpl mailSender;


	@Resource(name = "EgovFileMngService")
	private EgovFileMngService fileService;


	private static final Logger LOGGER = LoggerFactory.getLogger(EgovSndngMailServiceImpl.class);

	/**
	 * 메일을 발송한다
	 * @param vo SndngMailVO
	 * @return boolean
	 * @exception Exception
	 */
	@Override
	@SuppressWarnings("unused")
	public boolean sndngMail(SndngMailVO sndngMailVO) throws Exception {

		LOGGER.info("## sndngMail info : {} ", sndngMailVO);

		String recptnPerson = (sndngMailVO.getRecptnPerson() == null) ? "" : sndngMailVO.getRecptnPerson(); // 수신자
		String subject = (sndngMailVO.getSj() == null) ? "" : sndngMailVO.getSj(); // 메일제목
		String emailCn = (sndngMailVO.getEmailCn() == null) ? "" : sndngMailVO.getEmailCn(); // 메일내용
		String dsptchPerson = (sndngMailVO.getDsptchPerson() == null) ?  sndngMailVO.getRecptnPerson() : sndngMailVO.getDsptchPerson();

		String atchmnFileNm = (sndngMailVO.getOrignlFileNm() == null) ? "" : sndngMailVO.getOrignlFileNm(); // 첨부파일이름
		String atchmnFilePath = (sndngMailVO.getFileStreCours() == null) ? "" : sndngMailVO.getFileStreCours(); // 첨부파일경로
		String atchFileIdList = sndngMailVO.getAtchFileIdList();
		String[] atchFileArr = (atchFileIdList==null ?null : atchFileIdList.split(","));

		List<FileVO> fileVOList = new ArrayList<FileVO>();

		File uFile = null;


		try {
			EmailAttachment attachment = new EmailAttachment();
			// 첨부파일이 있을 때
//			if (atchmnFileNm != "" && atchmnFileNm != null && atchmnFilePath != "" && atchmnFilePath != null) {
			if (atchFileArr != null && ArrayUtils.isNotEmpty(atchFileArr)) {
				LOGGER.info("########## has file");
				FileVO fileVO = new FileVO();
				for (String atchFileId : atchFileArr) {
					LOGGER.info("atchFileId : {}", atchFileId);
					fileVO.setAtchFileId(atchFileId);
					fileVOList.addAll( fileService.selectFileInfs(fileVO));
				}

/*
				// 첨부할 attachment 정보를 생성합니다
				attachment.setPath(atchmnFilePath);
				attachment.setDisposition(EmailAttachment.ATTACHMENT);
				attachment.setDescription("첨부파일입니다");
				//attachment.setName(new String(atchmnFileNm.getBytes("UTF-8"),"latin1")); // 구버전의 경우 필요
				attachment.setName(atchmnFileNm);

				// 2015.05.08 주석수정 - 첨부파일 정보를 포함한 메일을 전송합니다
				egovMultiPartEmail.send(recptnPerson, subject, emailCn, attachment);
*/

				final MimeMessagePreparator preparator = new MimeMessagePreparator() {
					@Override public void prepare(MimeMessage mimeMessage) throws Exception {
						final MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
							helper.setFrom(dsptchPerson);
							helper.setTo(recptnPerson);
							helper.setSubject(subject);
							helper.setText(emailCn, true);
							for (FileVO fileInfo : fileVOList) {
								System.out.println("fileInfo "+ fileInfo);
								FileSystemResource file = new FileSystemResource( new File(fileInfo.getFileStreCours(), fileInfo.getStreFileNm()) );
								helper.addAttachment(fileInfo.getOrignlFileNm(), file);
							}
						}
					};
					mailSender.send(preparator);

			}
			else
			{
				// 메일을 전송합니다
//				egovMultiPartEmail.send(recptnPerson, subject, emailCn);
				LOGGER.info("########## none file");
				LOGGER.info(">>>> sndngMailVO : {}", sndngMailVO);
				
				final MimeMessagePreparator preparator = new MimeMessagePreparator() {
					@Override public void prepare(MimeMessage mimeMessage) throws Exception {
						final MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
							LOGGER.info("AAAAAAAAA dsptchPerson : "+dsptchPerson);
							helper.setFrom(dsptchPerson);
							LOGGER.info("AAAAAAAAA recptnPerson : "+recptnPerson);
							helper.setTo(recptnPerson);
							LOGGER.info("AAAAAAAAA subject : "+subject);
							helper.setSubject(subject);
							LOGGER.info("AAAAAAAAA emailCn : "+emailCn);
							helper.setText(emailCn, true);
						}
					};
					mailSender.send(preparator);

			}

			Throwable t = new Throwable();

		} catch (MailParseException ex) {
			//sndngMailVO.setSndngResultCode("F"); // 발송결과 실패
			//sndngMailRegistDAO.updateSndngMail(sndngMailVO); // 발송상태를 DB에 업데이트 한다.
			LOGGER.error("Sending Mail Exception : {} [failure when parsing the message]", ex.getCause());
			return false;
		} catch (MailAuthenticationException ex) {
			//sndngMailVO.setSndngResultCode("F"); // 발송결과 실패
			//sndngMailRegistDAO.updateSndngMail(sndngMailVO); // 발송상태를 DB에 업데이트 한다.
			LOGGER.error("Sending Mail Exception : {} [authentication failure]", ex.getCause());
			return false;
		} catch (MailSendException ex) {
			//sndngMailVO.setSndngResultCode("F"); // 발송결과 실패
			//sndngMailRegistDAO.updateSndngMail(sndngMailVO); // 발송상태를 DB에 업데이트 한다.
			LOGGER.error("Sending Mail Exception : {} [failure when sending the message]", ex.getCause());
			return false;
		} catch (Exception ex) {
			//sndngMailVO.setSndngResultCode("F"); // 발송결과 실패
			//sndngMailRegistDAO.updateSndngMail(sndngMailVO); // 발송상태를 DB에 업데이트 한다.
			LOGGER.error("Sending Mail Exception : {} [unknown Exception]", ex.getCause());
			LOGGER.debug(ex.getMessage());
			return false;
		}

		return true;
	}

}
