package egovframework.com.cmm;

import org.egovframe.rte.ptl.mvc.tags.ui.pagination.AbstractPaginationRenderer;

import javax.servlet.ServletContext;

import org.springframework.web.context.ServletContextAware;
/**
 * ImagePaginationRenderer.java 클래스
 *
 * @author 황장운
 * @since 2011. 9. 16.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자           수정내용
 *  -------    -------------    ----------------------
 *   2011. 9. 16.   황장운       이미지 경로에 ContextPath추가
 *   2016. 6. 17.   황장운       표준프레임워크 v3.6 리뉴얼
 * </pre>
 */
public class ImagePaginationRenderer extends AbstractPaginationRenderer implements ServletContextAware{

	private ServletContext servletContext;

	public ImagePaginationRenderer() {

	}

	public void initVariables(){

		firstPageLabel = "<a href=\"#\" class=\"first disabled\" onclick=\"{0}({1}); return false;\">" + "<span class=\"blind\">첫페이지</span></a>&#160;";
		previousPageLabel = "<a href=\"#\" class=\"prev disabled\" onclick=\"{0}({1}); return false;\">" + "<span class=\"blind\">이전페이지</span></a>&#160;";
		currentPageLabel = "<a href=\"javascript:;\" class=\"on\">{0}</a>&#160;";
		otherPageLabel = "<a href=\"#\" onclick=\"{0}({1}); return false;\">{2}</a>&#160;";
		nextPageLabel = "<a href=\"#\" class=\"next\" onclick=\"{0}({1}); return false;\">" + "<span class=\"blind\">다음페이지</span></a>&#160;";
		lastPageLabel = "<a href=\"#\" class=\"last\" onclick=\"{0}({1}); return false;\">" + "<span class=\"blind\">마지막페이지</span></a>&#160;";

	}



	public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
		initVariables();
	}

}
