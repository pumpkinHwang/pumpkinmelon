package com.pumpkin.melon.cmmn.util;

import java.lang.reflect.Method;
import java.net.InetAddress;
import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public final class ReqUtils {

	private static Logger logger = LogManager.getLogger(ParameterUtil.class);

	/******************************************************************
	 * 널데이터 체크(String 형식)
	 * @param getVal 데이터값
	 * @param chgdata 널일때 교체할 값
	 ******************************************************************/
	public static String getEmptyResult(String getVal, String chgdata) {
		String rVal = getVal;
		if(getVal == null || getVal.equals("") || getVal.equals("null")){
			rVal = chgdata;
		}else{
			rVal = rVal.replaceAll("<", "&lt;");
			rVal = rVal.replaceAll(">", "&gt;");
			//rVal = rVal.replaceAll("&", "&amp;");
		}

		return rVal;
	}

	/******************************************************************
	 * 널데이터 체크(String 형식)
	 * @param getVal 데이터값
	 * @param chgdata 널일때 교체할 값
	 * 데이터 값에 대한 기본적인 태그 변경 및 제거 처리
	 ******************************************************************/
	public static String getEmptyResult(String getVal) {
		String rVal = getVal;

		if(getVal == null || getVal.equals("") || getVal.equals("null")){
			rVal = "";
		}else{
			rVal = rVal.replaceAll("<", "&lt;");
			rVal = rVal.replaceAll(">", "&gt;");
			//rVal = rVal.replaceAll("&", "&amp;");
		}

		return rVal;
	}

	public static String getRequestIpAddress(HttpServletRequest request) {
		String ip = request.getRemoteAddr();
		if (ip.equalsIgnoreCase("0:0:0:0:0:0:0:1")) {
			try {
				InetAddress inetAddress = InetAddress.getLocalHost();
			    String ipAddress = inetAddress.getHostAddress();
			    ip = ipAddress;
			} catch (Exception e) {
				logger.info("예외가 발생하였습니다");
			}
		}
		return ip;
	}


	/******************************************************************
	 * Key에 해당되는 정보 추출
	 * @param Data 데이터값
	 * @param key 추출 대상 키
	 * 데이터(Map)의 Key에 해당되는 데이터List를 추출하여 반환
	 ******************************************************************/
	public static List getList(Map Data, String key) {
		if(Data.containsKey(key)) {
			Object obj = Data.get(key);
			if (obj != null) {
				if (obj instanceof List) {
					return (List) obj;
				} else {
					List ls = new ArrayList();
					ls.add(obj);
					return (List) ls;
				}
			}
		}
		return null;
	}

	/******************************************************************
	 * Key에 해당되는 정보 추출
	 * @param Data 데이터값
	 * @param key 추출 대상 키
	 * 데이터(Map)의 Key에 해당되는 데이터List를 추출하여 반환
	 ******************************************************************/
	public static String[] getArrays(Map Data, String key) {
		if(Data.containsKey(key)) {
			Object obj = Data.get(key);
			if (obj != null) {
				if (obj instanceof List) {
					List ls = (List)obj;
					return (String[])ls.toArray(new String[ls.size()]);
				} else {
					List ls = new ArrayList();
					ls.add(obj);
					return (String[])ls.toArray(new String[ls.size()]);
					//return (String[])obj;
				}

			}
		}
		return null;
	}

	/******************************************************************
	 * 널데이터 체크(String 형식)
	 * @param getVal 데이터값
	 * @param chgdata 널일때 교체할 값
	 ******************************************************************/
	public static String getReplaceResult(String getVal) {
		String rVal = getVal;
		if(getVal == null || getVal.equals("") || getVal.equals("null")){
			return "";
		}else{
			rVal = rVal.replaceAll("&", "&amp;");
			rVal = rVal.replaceAll("<", "&lt;");
			rVal = rVal.replaceAll(">", "&gt;");
			rVal = rVal.replaceAll("'", "&apos;");
			rVal = rVal.replaceAll("\"", "&quot;");
			//rVal = rVal.replaceAll("&", "&amp;");
		}

		return rVal;
	}
	/**
	* Map을 Vo로 변환
	* @param map
	* @param obj
	* @return
	*/
	public static Object convertMapToObject(Map<String,Object> map,Object obj){
	    String keyAttribute = null;
	    String setMethodString = "set";
	    String methodString = null;
	    Iterator itr = map.keySet().iterator();

	    while(itr.hasNext()){
	        keyAttribute = (String) itr.next();
	        methodString = setMethodString+keyAttribute.substring(0,1).toUpperCase()+keyAttribute.substring(1);
	        Method[] methods = obj.getClass().getDeclaredMethods();
	        for(int i=0;i<methods.length;i++){
	            if(methodString.equals(methods[i].getName())){
	                try{
	                    methods[i].invoke(obj, map.get(keyAttribute));
	                }catch(Exception e){
	                    e.printStackTrace();
	                }
	            }
	        }
	    }
	    return obj;
	}
	
	/**
	 * videoplayer 정보 가지고 오기
	 * @param videoKey
	 * @return
	 * @throws Exception 
	 */
	public static String getVideoPlayerInfo(String videoKey) throws Exception {
		String rVal = videoKey;
		
		Random rnd = new Random();
		
		String uccKey = "cecda46f18e191d76099603b7b9034da";
		String mediaKey = videoKey;
		String remoteAddr = "::1";
		
		Date time = new Date();
		SimpleDateFormat format = new SimpleDateFormat ( "yyyy/MM/dd HH:mm:ss");
		String date1 = format.format(time);
        String date2 = "1970/01/01 09:00:00"; //날짜2
       
        Date format1 = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").parse(date1);
        Date format2 = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").parse(date2);
        
        long diffSec = (format1.getTime() - format2.getTime()) / 1000; //초 차이
        int timestamp = (int) diffSec;
        
        String randomKey = getRandomString(5);
       String hashStr = randomKey + "|" + mediaKey + "|" + uccKey + "|" + remoteAddr + "|" + timestamp;
        //N3m7M|7pZ03RkDItA_VGhcQbCxeO_nBwkqZ8EHFggSndAJk20%2A|cecda46f18e191d76099603b7b9034da|::1|1642572689
        //MD5 md5Hash = "System.Security.Cryptography.MD5CryptoServiceProvider";
        String okey = randomKey + getEncMD5(hashStr);				//이것때문에 안뜨는것 같음..
        
        //String openUrl = "http://play.smartucc.kr/player_secure.php?k=" + mediaKey + "&okey=" + okey + "&ts=" + timestamp;	//이것때문에 안뜨는것 같음..
        String openUrl = "http://play.smartucc.kr/player_secure.php?k=" + mediaKey + "&ts=" + timestamp;
		return openUrl;
	}
	
	/**
	 * 문자열을 MD-5 방식으로 암호화
	 * @param txt 암호화 하려하는 문자열
	 * @return String
	 * @throws Exception
	 */
	public static String getEncMD5(String txt) throws Exception {
	    StringBuffer sbuf = new StringBuffer();
	    MessageDigest mDigest = MessageDigest.getInstance("MD5");
	    mDigest.update(txt.getBytes());
	    byte[] msgStr = mDigest.digest() ;
	     
	    for(int i=0; i < msgStr.length; i++){
	        String tmpEncTxt = Integer.toHexString((int)msgStr[i] & 0x00ff) ;          
	        sbuf.append(tmpEncTxt) ;
	    }
	    return sbuf.toString() ;
	}

	public static String getRandomString(int length) {
	    String str = "";
	    for (int i = 0; i < length; i++)
	    {
	        int category = ((int) (Math.random() * 100) % 3);
	        // 랜덤 숫자
	        if (category == 0){
	            int num = (int) (Math.random() * 10);
	            str = str.concat(String.valueOf(num));
	        } // 랜덤 소문자
	        else if (category == 1){
	            int startnum = 97;
	            int num = ((int) (Math.random() * 100) % 26);
	            char character = (char)(startnum + num);
	            str = str.concat(String.valueOf(character));
	        } // 랜덤 대문자
	        else{
	            int startnum = 65;
	            int num = ((int) (Math.random() * 100) % 26);
	            char character = (char)(startnum + num);
	            str = str.concat(String.valueOf(character));
	        }
	    }
	    return str;
	}
	
	
}
