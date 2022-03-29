/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.pumpkin.melon.cmmn;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * @Class Name : pagingDefaultVO.java
 * @Description : pagingDefaultVO Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */
public class pagingDefaultVO implements Serializable {

	/**
	 *  serialVersion UID
	 */
	private static final long serialVersionUID = -858838578081269359L;

	private String seq;
	private String srchEnableYn;
	private String srchDepth1;
	private String srchDepth2;
	private String srchDepth3;
	private String[] srchGubn;
	private String[] srchKeyword;
	private List<Map> searchList;
	private String srchIntegratedKeyword;

	/** 로그인 id */
	private String id = "";

	/** 검색조건 */
	private String searchCondition = "";

	/** 검색Keyword */
	private String searchKeyword = "";

	/** 검색사용여부 */
	private String searchUseYn = "";

	/** 현재페이지 */
	private int pageIndex = 1;

	/** 페이지갯수 */
	private int pageUnit = 10;

	/** 페이지사이즈 */
	private int pageSize = 10;

	/** firstIndex */
	private int firstIndex = 1;

	/** lastIndex */
	private int lastIndex = 1;

	/** recordCountPerPage */
	private int recordCountPerPage = 10;

	public String getSrchIntegratedKeyword() {
		return srchIntegratedKeyword;
	}

	public void setSrchIntegratedKeyword(String srchIntegratedKeyword) {
		this.srchIntegratedKeyword = srchIntegratedKeyword;
	}
	
	public String getSeq() {
		return seq;
	}

	public void setSeq(String seq) {
		this.seq = seq;
	}

	public String[] getSrchGubn() {
		String[] arr = null;
		if(srchGubn != null) {
			arr = new String[srchGubn.length];
			for(int idx = 0; idx < srchGubn.length; idx++) {
				arr[idx] = srchGubn[idx];
			}
		}
		return arr;
	}

	public void setSrchGubn(String[] srchGubn) {
		if(srchGubn != null) {
			this.srchGubn = new String[srchGubn.length];
			for(int idx = 0; idx < srchGubn.length; idx++) {
				this.srchGubn[idx] = srchGubn[idx];
			}
		}
	}

	public String[] getSrchKeyword() {
		String[] arr = null;
		if(srchKeyword != null) {
			arr = new String[srchKeyword.length];
			for(int idx = 0; idx < srchKeyword.length; idx++) {
				arr[idx] = srchKeyword[idx];
			}
		}
		return arr;
	}
	public void setSrchKeyword(String[] srchKeyword) {
		if(srchKeyword != null) {
			this.srchKeyword = new String[srchKeyword.length];
			for(int idx = 0; idx < srchKeyword.length; idx++) {
				this.srchKeyword[idx] = srchKeyword[idx];
			}
		}
	}

	public List<Map> getSearchList(){
		List <Map> searchList=null;
		if(this.searchList != null){
			searchList = new ArrayList<Map>();
			searchList = this.searchList;
		}
		return searchList;
	}

	public void setSearchList(String[] srchGubn, String[] srchKeyword){

		if(srchKeyword != null) {
			
			searchList = new ArrayList<Map>();
			
			for(int idx = 0; idx < srchKeyword.length; idx++) {
				Map map = new HashMap();
				map.put("srchKeyword", srchKeyword[idx]);
				
				if(srchGubn.length == 0) {
					map.put("srchGubn", "all");
				}else {
					map.put("srchGubn", srchGubn[idx]);
				}
				searchList.add(map);
			}
		}
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getFirstIndex() {
		return firstIndex;
	}

	public void setFirstIndex(int firstIndex) {
		this.firstIndex = firstIndex;
	}

	public int getLastIndex() {
		return lastIndex;
	}

	public void setLastIndex(int lastIndex) {
		this.lastIndex = lastIndex;
	}

	public int getRecordCountPerPage() {
		return recordCountPerPage;
	}

	public void setRecordCountPerPage(int recordCountPerPage) {
		this.recordCountPerPage = recordCountPerPage;
	}

	public String getSearchCondition() {
		return searchCondition;
	}

	public void setSearchCondition(String searchCondition) {
		this.searchCondition = searchCondition;
	}
	
	public String getSrchEnableYn() {
		return srchEnableYn;
	}

	public void setSrchEnableYn(String srchEnableYn) {
		this.srchEnableYn = srchEnableYn;
	}
	
	public String getSrchDepth1() {
		return srchDepth1;
	}

	public void setSrchDepth1(String srchDepth1) {
		this.srchDepth1 = srchDepth1;
	}
	
	public String getSrchDepth2() {
		return srchDepth2;
	}

	public void setSrchDepth2(String srchDepth2) {
		this.srchDepth2 = srchDepth2;
	}
	public String getSrchDepth3() {
		return srchDepth3;
	}

	public void setSrchDepth3(String srchDepth3) {
		this.srchDepth3 = srchDepth3;
	}
	
	
	public String getSearchKeyword() {
		return searchKeyword;
	}

	public void setSearchKeyword(String searchKeyword) {
		this.searchKeyword = searchKeyword;
	}

	public String getSearchUseYn() {
		return searchUseYn;
	}

	public void setSearchUseYn(String searchUseYn) {
		this.searchUseYn = searchUseYn;
	}

	public int getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public int getPageUnit() {
		return pageUnit;
	}

	public void setPageUnit(int pageUnit) {
		this.pageUnit = pageUnit;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}


	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

}
