package com.pumpkin.melon.usr.main.web;

import java.util.List;


import com.pumpkin.melon.usr.main.service.MainService;
import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import com.pumpkin.melon.usr.main.service.MainVO;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.SessionStatus;
import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import org.springmodules.validation.commons.DefaultBeanValidator;

@Controller("mainController")
public class MainController {

	@Resource(name = "mainService")
	private MainService mainService;

	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;

	@Resource(name = "beanValidator")
	protected DefaultBeanValidator beanValidator;


	/**
	 * 메인.메인 페이지
	 * @param vo - mainVO
	 * @param model
	 * @return "/usr/main"
	 * @exception Exception
	 */
	@RequestMapping(value = {"/","/main"})
	public String main(@ModelAttribute("searchVO") MainVO searchVO, ModelMap model, HttpServletRequest request, HttpServletResponse response) throws Exception {

		return "/usr/main/main";
	}


}
