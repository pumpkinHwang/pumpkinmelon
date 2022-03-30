
package com.pumpkin.melon.cmmn.file.service;
import com.pumpkin.melon.cmmn.pagingDefaultVO;

/**
 * @Class Name : FileAttachVO.java
 * @Description : FileAttachVO Class
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
 *
 *  Copyright (C) by FRO All right reserved.
 */
public class FileAttachVO extends pagingDefaultVO {

	private static final long serialVersionUID = 1L;

	private int fileSeq;
	private int detlSeq;
	private int boardNoticeSeq;
	private String boardNoticeGubun;
	private int downloadCount;
	private String originalFileName;
	private String originalFileNameOnly;
	private String originalFileNameExt;
	private String savedFileName;
	private String savedFilePath;
	private int displayOrder;
	private String registUser;
	private String registDateTime;
	private String updateUser;
	private String updateDateTime;
	
	private int atchFileId;
	private int fileSn;
	private String fileStreCours;
	private String streFileNm;
	private String fileExtsn;
	private String orignlFileNm;
	private String gubn;

	public int getFileSeq() {
		return fileSeq;
	}
	public void setFileSeq(int fileSeq) {
		this.fileSeq = fileSeq;
	}
	public int getDetlSeq() {
		return detlSeq;
	}
	public void setDetlSeq(int detlSeq) {
		this.detlSeq = detlSeq;
	}
	public int getBoardNoticeSeq() {
		return boardNoticeSeq;
	}
	public void setBoardNoticeSeq(int boardNoticeSeq) {
		this.boardNoticeSeq = boardNoticeSeq;
	}
	public String getBoardNoticeGubun() {
		return boardNoticeGubun;
	}
	public void setBoardNoticeGubun(String boardNoticeGubun) {
		this.boardNoticeGubun = boardNoticeGubun;
	}
	public int getDownloadCount() {
		return downloadCount;
	}
	public void setDownloadCount(int downloadCount) {
		this.downloadCount = downloadCount;
	}
	public String getOriginalFileName() {
		return originalFileName;
	}
	public void setOriginalFileName(String originalFileName) {
		this.originalFileName = originalFileName;
	}
	public String getOriginalFileNameOnly() {
		return originalFileNameOnly;
	}
	public void setOriginalFileNameOnly(String originalFileNameOnly) {
		this.originalFileNameOnly = originalFileNameOnly;
	}
	public String getOriginalFileNameExt() {
		return originalFileNameExt;
	}
	public void setOriginalFileNameExt(String originalFileNameExt) {
		this.originalFileNameExt = originalFileNameExt;
	}
	public String getSavedFileName() {
		return savedFileName;
	}
	public void setSavedFileName(String savedFileName) {
		this.savedFileName = savedFileName;
	}
	public String getSavedFilePath() {
		return savedFilePath;
	}
	public void setSavedFilePath(String savedFilePath) {
		this.savedFilePath = savedFilePath;
	}
	public int getDisplayOrder() {
		return displayOrder;
	}
	public void setDisplayOrder(int displayOrder) {
		this.displayOrder = displayOrder;
	}
	public String getRegistUser() {
		return registUser;
	}
	public void setRegistUser(String registUser) {
		this.registUser = registUser;
	}
	public String getRegistDateTime() {
		return registDateTime;
	}
	public void setRegistDateTime(String registDateTime) {
		this.registDateTime = registDateTime;
	}
	public String getUpdateUser() {
		return updateUser;
	}
	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}
	public String getUpdateDateTime() {
		return updateDateTime;
	}
	public void setUpdateDateTime(String updateDateTime) {
		this.updateDateTime = updateDateTime;
	}
	public int getAtchFileId() {
		return atchFileId;
	}
	public void setAtchFileId(int atchFileId) {
		this.atchFileId = atchFileId;
	}
	public int getFileSn() {
		return fileSn;
	}
	public void setFileSn(int fileSn) {
		this.fileSn = fileSn;
	}
	public String getFileStreCours() {
		return fileStreCours;
	}
	public void setFileStreCours(String fileStreCours) {
		this.fileStreCours = fileStreCours;
	}
	public String getStreFileNm() {
		return streFileNm;
	}
	public void setStreFileNm(String streFileNm) {
		this.streFileNm = streFileNm;
	}
	public String getFileExtsn() {
		return fileExtsn;
	}
	public void setFileExtsn(String fileExtsn) {
		this.fileExtsn = fileExtsn;
	}
	public String getOrignlFileNm() {
		return orignlFileNm;
	}
	public void setOrignlFileNm(String orignlFileNm) {
		this.orignlFileNm = orignlFileNm;
	}
	public String getGubn() {
		return gubn;
	}
	public void setGubn(String gubn) {
		this.gubn = gubn;
	}
	

}
