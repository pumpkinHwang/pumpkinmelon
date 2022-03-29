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
package com.pumpkin.melon.cmmn.schedule;

import javax.annotation.Resource;

import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.pumpkin.melon.usr.member.service.MemberService;
import egovframework.com.cmm.EgovMessageSource;

@Component
public class memberJob {

	@Autowired
	Environment environment;
	
	@Resource(name = "memberService")
	private MemberService memberService;

	private static final Logger LOGGER = LoggerFactory.getLogger(memberJob.class);

	/** EgovMessageSource */
	@Resource(name = "egovMessageSource")
	EgovMessageSource egovMessageSource;

	// 매일 12시 실행
//	@Scheduled(cron = "0 0 12 * * *")
	// 1분주기
//	@Scheduled(cron = "0 * * * * *")
	public void execute() throws Exception {
		
		/* 3개월간 비밀번호 변경 안한 사용자 상태값 변경 */
		EgovMap map = new EgovMap();
		map.put("passwordChangeYn", "c");
		memberService.updateMemberMonthPasswordChangeYn(map);
		
		/* 11개월 기간동안 로그인하지 않은 사용자 대해서는 분리보관(휴면) 안내메일발송 */
		memberService.memberPasswordChangeNoticeYearList();
		
		/* 11개월 기간동안 로그인하지 않은 사용자 대해서는 분리보관(휴면) 안내메일 발송 상태값 저장 */
		map.put("passwordChangeYn", "e");
		memberService.updateMemberYearPasswordChangeYn(map);
		
		/* 1년간 로그인하지 않은 사용자의 사용여부 'n'으로 변경 */
		map.put("passwordChangeYn", "d");
		memberService.updateMemberYearEnableYn();
		
	}
	

}
