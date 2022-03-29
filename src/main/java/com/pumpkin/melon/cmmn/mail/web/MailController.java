//package canon.kr.cis.cmmn.mail.web;
//
//import java.util.HashMap; 
//
//import javax.annotation.Resource;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.ModelMap;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.servlet.ModelAndView;
//
//import com.pumpkin.melon.cmmn.mail.service.MailService;
//import egovframework.com.cmm.LoginVO;
//
//@Controller
//public class MailController {
//
//	/** log */
//	private static final Logger LOGGER = LoggerFactory.getLogger(MailController.class);
//
//
//	@Resource(name="mailService")
//	private MailService mailService;
//
//	@Resource(name="userLogService")
//	private UserLogService userLogService;
//
//	/**
//	 * mail form view 이동
//	 * mail type 을 설정한다.
//	 * @param searchParam
//	 * @param request
//	 * @param response
//	 * @param model
//	 * @return
//	 */
//	@RequestMapping(value= {"/email/sendEmail"})
//	public String gotoMailFormView(@RequestParam HashMap<String, Object> searchParam, HttpServletRequest request, HttpServletResponse response, ModelMap model) {
//		LOGGER.info("call uri : {}",request.getRequestURI());
//		model.addAttribute("searchParam", searchParam);
//
//		return "frn/mail/sendEmail";
//	}
//
//
//	@RequestMapping(value= {"/email/api/sendEmail"})
//	public ModelAndView sendEmail(@RequestBody HashMap<String, Object> searchParam, HttpServletRequest request, HttpServletResponse response, ModelMap model) {
//		LOGGER.info("call uri : {}",request.getRequestURI());
//		LOGGER.info("searchParam : {}", searchParam);
//		ModelAndView modelAndView = new ModelAndView("jsonView");
//
//		String resultCode = null;
//		try {
//			LoginVO loginVO = UserLogUtil.setFrnLoginFuncion(request, "tdes.frn.menu.mydata.email.qna");	// 이메일문의하기
//	    	userLogService.setUserLogFunction(loginVO);
//
//			resultCode = frnMailService.sendEmail(searchParam);
//			if("0000".equals(resultCode)) {
//				modelAndView.addObject("code", "0000");
//				modelAndView.addObject("msg", "성공");
//			}else {
//				modelAndView.addObject("code", resultCode);
//				modelAndView.addObject("msg", "시스템 오류");
//			}
//		} catch (Exception e) {
//			modelAndView.addObject("code", "9999");
//			modelAndView.addObject("msg", "시스템 오류");
//		}
//
//		return modelAndView;
//
//	}
//
//}
//
