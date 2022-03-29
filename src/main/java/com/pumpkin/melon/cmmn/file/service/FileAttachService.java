package com.pumpkin.melon.cmmn.file.service;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.springframework.web.multipart.MultipartHttpServletRequest; 

/**
 * @Class Name : FileAttachService.java
 * @Description : FileAttachService Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2022.01.15  hsk3807          최초생성
 *
 * @author 개발팀
 * @since 2022 . 01. 15
 * @version 1.0
 * @see
 * @see
 *
 *  Copyright (C) by FRO All right reserved.
 */
public interface FileAttachService {
	
	/**
	 * 공통 첨부파일 목록 조회
	 * @param FileAttachVO - 조회할 정보가 담긴 VO
	 * @return EgovMap
	 * @exception Exception
	 */
	List<?> fileAttachList(FileAttachVO fileAttachVO) throws Exception;
	
	/**
	 * 공통 첨부파일 상세 조회
	 * @param FileAttachVO - 조회할 정보가 담긴 VO
	 * @return EgovMap
	 * @exception Exception
	 */
	FileAttachVO fileAttachDetail(FileAttachVO fileAttachVO) throws Exception;
	
	/**
	 * 공통 첨부파일 상세 조회 구분코드 pc, mo
	 * @param FileAttachVO - 조회할 정보가 담긴 VO
	 * @return EgovMap
	 * @exception Exception
	 */
	FileAttachVO fileAttachGubnDetail(FileAttachVO fileAttachVO) throws Exception;
	
	/**
	 * 공통 첨부파일 삭제
	 * @param FileAttachVO - 조회할 정보가 담긴 VO
	 * @return EgovMap
	 * @exception Exception
	 */
	int deleteFileAttach(FileAttachVO fileAttachVO) throws Exception;
	
	/**
	 * 파일마스터등록여부 파라미터를 받은 후 파일등록로직
	 * @param FileAttachVO - 조회할 정보가 담긴 VO
	 * @return EgovMap
	 * @exception Exception
	 */
	void insertFileCustom(List<?> fvoList, Map<String, String> paraMap) throws Exception;
	
	/**
	 * 첨부파일 업로드
	 * @param FileAttachVO - 조회할 정보가 담긴 VO
	 * @return EgovMap
	 * @exception Exception
	 */
	void attachFileUpload(MultipartHttpServletRequest multiRequest, Object obj, String uploadFolder) throws Exception;

	/**
	 * 첨부파일삭제
	 * @param FileAttachVO - 조회할 정보가 담긴 VO
	 * @return EgovMap
	 * @exception Exception
	 */
	void deleteAttachFileChange(Object techShareVO, String[] fileSnDel, String string) throws Exception;

}
