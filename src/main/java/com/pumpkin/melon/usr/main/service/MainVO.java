
package com.pumpkin.melon.usr.main.service;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import com.pumpkin.melon.cmmn.pagingDefaultVO;

import java.util.List;

/**
 * @Class Name : MainVO.java
 * @Description : MainVO Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2022.01.26  황장운          최초생성
 *
 * @author 개발팀
 * @since 2022 . 01. 26
 * @version 1.0
 * @see
 *
 *  Copyright (C) by FRO All right reserved.
 */
public class MainVO extends pagingDefaultVO {

	private static final long serialVersionUID = 1L;

	private List<?> quickItem1DepthList;

	public List<?> getQuickItem1DepthList() {
		return quickItem1DepthList;
	}

	public void setQuickItem1DepthList(List<?> quickItem1DepthList) {
		this.quickItem1DepthList = quickItem1DepthList;
	}
}