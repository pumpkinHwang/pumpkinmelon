package com.pumpkin.melon.mng.member.service;

import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import com.pumpkin.melon.mng.member.service.MemberMngVO;

/**
 * @author 개발팀
 * @version 1.0
 * @Class Name : MemberLoginMngService.java
 * @Description : MemberLoginMngService Class
 * @Modification Information
 * @
 * @ 수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2022.01.26  황장운          최초생성
 * @see
 * @see Copyright (C) by FRO All right reserved.
 * @since 2022 . 01. 26
 */
public interface MemberLoginMngService {


    /**
     * 로그인.로그인 페이지
     *
     * @param vo - memberLoginMngVO
     * @return data[memberLoginMngVO]
     * @throws Exception
     */
    EgovMap memberLogin(MemberMngVO vo) throws Exception;

    EgovMap mngMemberChangePassword(MemberMngVO vo) throws Exception;

    EgovMap mngMemberChangePasswordSave(MemberMngVO vo) throws Exception;
}