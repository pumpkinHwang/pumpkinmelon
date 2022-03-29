/******************************************************
 * 
 * 데이터거래소 구축 프로젝트
 *  
 * 파일명 : Constants.java 
 * 버전 : 1.0
 * 작성일자 : 2020. 10. 21.
 * 수정일자 : 
 * 작성자 : js.lee 
 *
 * Copyright 2020 tdes.thenet-global.com. All rights Reserved.
 *
 ******************************************************/

package com.pumpkin.melon.cmmn.util;

import egovframework.com.cmm.service.EgovProperties;

public class Constants {
	
	static public String protocol ;
	static public String ip ;
	static public String rankPort ;
	static public String port ;
	
	static public String list ;
	static public String rankings ;
	static public String suggest ;

	
	static {
		
		protocol = EgovProperties.getProperty("Globals.SEARCH.protocol") ;
		ip = EgovProperties.getProperty("Globals.SEARCH.ip") ;
		rankPort = EgovProperties.getProperty("Globals.SEARCH.rankPort") ;
		port = EgovProperties.getProperty("Globals.SEARCH.port") ;
		
		list = EgovProperties.getProperty("Globals.SEARCH.list") ;
		rankings = EgovProperties.getProperty("Globals.SEARCH.rankings") ;
		suggest = EgovProperties.getProperty("Globals.SEARCH.suggest") ;
		
	}

	
}
