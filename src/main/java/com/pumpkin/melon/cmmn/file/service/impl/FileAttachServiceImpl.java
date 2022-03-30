package com.pumpkin.melon.cmmn.file.service.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.pumpkin.melon.cmmn.file.service.FileAttachService;
import com.pumpkin.melon.cmmn.file.service.FileAttachVO;
import com.pumpkin.melon.cmmn.util.ReqUtils;
import org.apache.commons.beanutils.BeanUtils;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import egovframework.com.cmm.service.EgovFileMngUtil;
import egovframework.com.cmm.service.FileVO;
import egovframework.com.utl.sim.service.EgovFileTool;

/**
 * @Class Name : FileAttachServiceImpl.java
 * @Description : FileAttachServiceImpl Class
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
@Service("fileAttachService") 
public class FileAttachServiceImpl extends EgovAbstractServiceImpl implements FileAttachService {

	private static final Logger LOGGER = LoggerFactory.getLogger(FileAttachServiceImpl.class);
	
	@Resource(name="fileAttachMapper")
	private FileAttachMapper fileAttachDAO;
	
	@Resource(name="EgovFileMngUtil")
    private EgovFileMngUtil egovFileMngUtil;

	@Override
	public List<?> fileAttachList(FileAttachVO fileAttachVO) throws Exception {
		return fileAttachDAO.fileAttachList(fileAttachVO);
	}

	@Override
	public FileAttachVO fileAttachDetail(FileAttachVO fileAttachVO) throws Exception {
		return fileAttachDAO.fileAttachDetail(fileAttachVO);
	}

	@Override
	public FileAttachVO fileAttachGubnDetail(FileAttachVO fileAttachVO) throws Exception {
		return fileAttachDAO.fileAttachGubnDetail(fileAttachVO);
	}
	
	@Override
	public int deleteFileAttach(FileAttachVO fileAttachVO) throws Exception {
		return fileAttachDAO.deleteFileAttach(fileAttachVO);
	}

	@Override
	public void attachFileUpload(MultipartHttpServletRequest multiRequest
			, Object obj
			, String uploadFolder) throws Exception {
		
		List<FileVO> attachFileList = new ArrayList<FileVO>();
		Map<String, String> paraMap = BeanUtils.describe(obj);
		
		final Map<String, MultipartFile> files = multiRequest.getFileMap();
		if(!files.isEmpty()){
			LOGGER.info("attachFileList : " + attachFileList.toString());
			attachFileList = egovFileMngUtil.parseFileInf(files, "NTC_", 0, "temp", uploadFolder);
			insertFileCustom(attachFileList, paraMap);
    	}
		
	}
	
	@Override
	public void insertFileCustom(List<?> fileList, Map<String, String> paraMap) throws Exception {
		
		Iterator<?> iter = fileList.iterator();

		while (iter.hasNext()) {
			FileVO vo = (FileVO) iter.next();
			FileAttachVO fileAttachVO = new FileAttachVO();
			fileAttachVO.setOriginalFileName(vo.getOrignlFileNm());
			fileAttachVO.setOriginalFileNameOnly(vo.getOrignlFileNm().substring(0,vo.getOrignlFileNm().lastIndexOf(".")));
			fileAttachVO.setOriginalFileNameExt(vo.getFileExtsn());
			fileAttachVO.setSavedFileName(vo.getStreFileNm());
			fileAttachVO.setSavedFilePath(vo.getFileStreCours());
			fileAttachVO.setId(paraMap.get("id"));
			fileAttachVO.setGubn(vo.getGubn());	
			fileAttachVO.setBoardNoticeGubun(paraMap.get("boardNoticeGubun"));
			fileAttachVO.setBoardNoticeSeq(Integer.parseInt(paraMap.get("seq")));
			fileAttachDAO.insertFileAttach(fileAttachVO);
		}
	}
	
	public void deleteAttachFileChange(Object obj, String[] fileIdDel, String uploadFolder)  throws Exception {
		
		LOGGER.info("[START DELETE]");
		
		Map<String, String> paraMap = BeanUtils.describe(obj);
		String atchFileChng = ReqUtils.getEmptyResult((String)paraMap.get("atchFileChng"),"");
		
		if(atchFileChng.equals("U")) {
			
			for(int i=0; i<fileIdDel.length; i++) {

				String fileId = fileIdDel[i];
				
				FileAttachVO fileAttachVO = new FileAttachVO();
				fileAttachVO.setFileSeq(Integer.parseInt(fileId));				
				// 파일상세 조회
				fileAttachVO = fileAttachDetail(fileAttachVO);
				
				if(fileAttachVO != null) {
					if(!fileAttachVO.getFileStreCours().equals("") && !fileAttachVO.getStreFileNm().equals("")) {
						String filePath = fileAttachVO.getFileStreCours() + fileAttachVO.getStreFileNm();
						deleteFileAttach(fileAttachVO);
						EgovFileTool.deletePath(filePath);
					}
				}
			}
		}
	}
}
