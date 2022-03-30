package com.pumpkin.melon.cmmn.file.service.impl;

import java.util.List;

import com.pumpkin.melon.cmmn.file.service.FileAttachVO;
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
@Repository("fileAttachMapper") 
public class FileAttachMapper extends EgovComAbstractDAO {
	
	/**
	 * 공통 첨부파일 목록 조회
	 * @param FileAttachVO - 조회할 정보가 담긴 VO
	 * @return EgovMap
	 * @exception Exception
	 */
	List<?> fileAttachList(FileAttachVO fileAttachVO){
		return selectList("fileAttachMapper.fileAttachList", fileAttachVO);
	}
	
	/**
	 * 공통 첨부파일 상세 조회
	 * @param FileAttachVO - 조회할 정보가 담긴 VO
	 * @return EgovMap
	 * @exception Exception
	 */
	FileAttachVO fileAttachDetail(FileAttachVO fileAttachVO){
		return selectOne("fileAttachMapper.fileAttachDetail", fileAttachVO);
	}
	
	/**
	 * 공통 첨부파일 상세 조회 구분코드
	 * @param FileAttachVO - 조회할 정보가 담긴 VO
	 * @return EgovMap
	 * @exception Exception
	 */
	FileAttachVO fileAttachGubnDetail(FileAttachVO fileAttachVO){
		return selectOne("fileAttachMapper.fileAttachGubnDetail", fileAttachVO);
	}
	
	/**
	 * 공통 첨부파일 MAX SEQ 조회
	 * @param FileAttachVO - 조회할 정보가 담긴 VO
	 * @return EgovMap
	 * @exception Exception
	 */
	int fileAttachMaxSeq() {
		return selectOne("fileAttachMapper.fileAttachMaxSeq");
	}
	
	/**
	 * 공통 첨부파일  등록
	 * @param FileAttachVO - 조회할 정보가 담긴 VO
	 * @return EgovMap
	 * @exception Exception
	 */
	int insertFileAttach(FileAttachVO fileAttachVO) {
		return insert("fileAttachMapper.insertFileAttach", fileAttachVO);
	}
	
	/**
	 * 공통 첨부파일 삭제
	 * @param FileAttachVO - 조회할 정보가 담긴 VO
	 * @return EgovMap
	 * @exception Exception
	 */
	int deleteFileAttach(FileAttachVO fileAttachVO) {
		return delete("fileAttachMapper.deleteFileAttach", fileAttachVO);
	}
	
	


}
