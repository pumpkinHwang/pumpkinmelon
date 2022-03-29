package com.pumpkin.melon.cmmn.util;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import kr.go.onepass.client.org.apache.commons.lang.StringEscapeUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.multipart.MultipartHttpServletRequest;

public class ParameterUtil {

	private static Logger logger = LogManager.getLogger(ParameterUtil.class);

	public static Map getParameterMapWithOutSession(HttpServletRequest request) {
		Map map = new HashMap();
		getParam(request, map);

		return map;
	}
	public static Map getParameterMap(HttpServletRequest request) {

		Map map = new HashMap();
		getParam(request, map);

		return map;
	}

	/**
	 * 파라미터를 변형 해주는 기능
	 * @작성일    : 2015. 7. 15.
	 * @작성자      : keim
	 * @프로그램설명 :
	 * @진행상태: TO-DO
	 * recursive로 변형 예정
	 */
	private static void getParam(HttpServletRequest request, Map map) {
		int initCapacity = 1000;

        Map paramerterMap = request.getParameterMap(); // 1) 파라미터정보를 Map에 담는다.
        if(request instanceof MultipartHttpServletRequest){
        	// muliPart인 경우
        	Iterator<String> itr = ((MultipartHttpServletRequest) request).getFileNames();

        	while(itr.hasNext()){
        		String uploadFileName = itr.next();

        		List fileList = ((MultipartHttpServletRequest) request).getFiles(uploadFileName);

        		paramerterMap.put(uploadFileName, fileList);

        	}
        }

        Iterator iter = paramerterMap.keySet().iterator();
        String key = null;
        Object value = null;
    	String modelKey;
		String listModel;
		String column;

		for (Map.Entry<String, Object> entry : ((Map<String, Object>) paramerterMap) .entrySet()){
			key = entry.getKey() ;
			//value =((String[]) entry.getValue())[0];

			if(entry.getValue() instanceof String[]){
				String[] tmp  = (String[]) entry.getValue();
				if(tmp.length <2){
					value = ((String[]) entry.getValue())[0];
				}else{
					value =	Arrays.asList(((String[]) entry.getValue()));
				}
				value = cleanXSS(value);
			}else if(entry.getValue() instanceof List) {
				value = entry.getValue();

				String toLow = String.valueOf(key);
				if(!toLow.toLowerCase().matches(".*file.*")){
					value = cleanXSS(value);
				}
			}

			if(key.matches("[a-zA-Z](.*)\\[[0-9]{1,}\\]\\[(.*)\\]")){
    			// 여러건의 모델리스트일경우 List<Map>  //name =  "Hrm[0][DEPT_NM]"
				Pattern p = Pattern.compile("([a-zA-Z].*)\\[([0-9]{1,})\\]\\[(.*)\\]");
				Matcher m = p.matcher(key);
				m.matches();

        		modelKey = m.group(1);
    			column = m.group(3);
    			int seq = Integer.parseInt(m.group(2));
//    			modelKey = modelKey.replaceAll("\\[[0-9]{1,}\\]", "");
    			if(!map.containsKey(modelKey)){
    				map.put(modelKey,initList(initCapacity) );
    			}else{
    				//넘어온 데이터가 초기용량을초기 할 경우 기존 새로운 List를 생성하고 기존 데이터를 새로 바인드
    				if(seq >= initCapacity){
    					List tmpList = ((List)(map.get(modelKey)));
    					map.put(modelKey,initList(seq).addAll(tmpList) );
    				}
    			}
				if(((List)(map.get(modelKey))).get(seq) == null ){
					((List)(map.get(modelKey))).set(seq, new HashMap());
				}
				((Map)(((List)(map.get(modelKey))).get(seq))).put(column, value);
    		}

			else if(key.matches("[a-zA-Z](.*)\\[[0-9]{1,}\\]\\.(.*)")){
    			// 여러건의 모델리스트일경우 List<Map>  //name =  "Hrm[0].DEPT_NM"
        		modelKey = key.substring(0, key.indexOf("."));
    			column = key.substring(key.indexOf(".")+1);
    			int seq = Integer.parseInt(modelKey.substring(modelKey.indexOf("[")+1,modelKey.indexOf("]")));
    			modelKey = modelKey.replaceAll("\\[[0-9]{1,}\\]", "");
    			if(!map.containsKey(modelKey)){
    				map.put(modelKey,initList(initCapacity) );
    			}else{
    				//넘어온 데이터가 초기용량을초기 할 경우 기존 새로운 List를 생성하고 기존 데이터를 새로 바인드
    				if(seq >= initCapacity){
    					List tmpList = ((List)(map.get(modelKey)));
    					map.put(modelKey,initList(seq).addAll(tmpList) );
    				}
    			}
				if(((List)(map.get(modelKey))).get(seq) == null ){
					((List)(map.get(modelKey))).set(seq, new HashMap());
				}
				((Map)(((List)(map.get(modelKey))).get(seq))).put(column, value);
    		}else if(key.matches("[a-zA-Z](.*)\\.(.[^\\.]*)(.*)")){
	      			// 단건의Map 형태 //name =  "Hrm.DEPT_NM"
    	      		modelKey = key.substring(0, key.indexOf("."));
    	      		column = key.substring(key.indexOf(".")+1);
	    	      	//map.put(modelKey, value);
    	      		if(!map.containsKey(modelKey)){
    	      			map.put(modelKey, new HashMap());
    	      		}
    	      		((Map)(map.get(modelKey))).put(column, value);
    		}// Map<Map<Map>> 담기는 구조도 생성 해야함
    		else{
    			if(key.matches(".*\\[.*\\]")){
    				key = key.replace("[", "").replace("]", "");
    			}
    			// 단건의 데이터 //name =  "DEPT_NM"
    			map.put(key,value); // 수정해야함
    	    }
		}
		//map.get(modelKey)
		removeNullListFromMapObject(map);

	}



	private void generateObjectToMap(){

	}
	private static List initList(int size){
		List list = new ArrayList();
		for(int i =0 ; i < size; i++){
			list.add(i,null);
		}

		return list;
	}
	private static void removeNullList(List list ){
		list.removeAll(Collections.singleton(null));
	}
	private static void removeNullListFromMapObject(Map map ){
		for (Map.Entry<String, Object> entry : ((Map<String, Object>) map) .entrySet()){
			if(entry.getValue() instanceof List){
				removeNullList((List) entry.getValue());
			}
		}
	}

	public static Object cleanXSS(Object object) {

		if (!(object instanceof List) && !(object instanceof Map)) {
			String value;

			value = String.valueOf(object);
			//value = value.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
			value = value.replaceAll("<", "< ").replaceAll(">", " >");
			// value = value.replaceAll("\\(", "& #40;").replaceAll("\\)",
			// "& #41;");
			//value = value.replaceAll("'", "& #39;");
			value = value.replaceAll("'", "`");
			value = value.replaceAll("\"", "``");
			value = value.replaceAll("eval\\((.*)\\)", "");
			value = value.replaceAll(
					"[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
			//value = value.replaceAll("script", "");
			//value = org.springframework.web.util.HtmlUtils.htmlEscape(value);
			value = StringEscapeUtils.escapeSql(value);

			return value;
		} else {
			if (object instanceof List) {
				// List resultList = new ArrayList();
				List resultList = new ArrayList();
//				resultList.addAll((List)object);

				for (int i = 0; i < ((List) object).size(); i++) {
					// key = entry.getKey() ;

					// ((List)object).get(index)

					// tmps = cleanXSS(((List)obj ect).get(i));
					// resultList.set

					Object obj = cleanXSS(((List) object).get(i));
					if(obj != null ){
						((List) resultList).add(i,obj
								);
					}
					// object.


				}
				object = resultList;

			} else if (object instanceof Map) {

				for (Map.Entry<String, Object> entry : ((Map<String, Object>) object)
						.entrySet()) {
					// key = entry.getKey() ;
					entry.setValue(cleanXSS(entry.getValue()));
				}
			}
			return object;

		}
	}


	//	Object를 Map으로 변경
	public static Map ConverObjectToMap(Object obj){
		try {
			//Field[] fields = obj.getClass().getFields(); //private field는 나오지 않음.
			Field[] fields = obj.getClass().getDeclaredFields();
			Map resultMap = new HashMap();
			for(int i=0; i<=fields.length-1;i++){
				fields[i].setAccessible(true);
				resultMap.put(fields[i].getName(), fields[i].get(obj));
			}
			return resultMap;
		} catch (IllegalArgumentException e) {
			logger.info("형변환 시 예외가 발생하였습니다");
		} catch (IllegalAccessException e) {
			logger.info("형변환 시 예외가 발생하였습니다");
		}
		return null;
	}

}
