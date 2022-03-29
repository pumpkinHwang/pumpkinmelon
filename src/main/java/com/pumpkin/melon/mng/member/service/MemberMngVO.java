
package com.pumpkin.melon.mng.member.service;

import com.pumpkin.melon.cmmn.pagingDefaultVO;
import com.pumpkin.melon.usr.member.service.MemberVO;

/**
 * @author 개발팀
 * @version 1.0
 * @Class Name : MemberMngVO.java
 * @Description : MemberMngVO Class
 * @Modification Information
 * @
 * @ 수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2022.01.26  hsk3807          최초생성
 * @see Copyright (C) by FRO All right reserved.
 * @since 2022 . 01. 26
 */
public class MemberMngVO extends MemberVO {

    private static final long serialVersionUID = 1L;
    /**
     * 아무것도없으면 에러나서 이건한꺼번에 지울예정
     */
    private String testd;

    public String getTestd() {
        return testd;
    }

    public void setTestd(String testd) {
        this.testd = testd;
    }
}
