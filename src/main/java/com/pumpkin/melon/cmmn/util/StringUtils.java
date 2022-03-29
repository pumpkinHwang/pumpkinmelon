package com.pumpkin.melon.cmmn.util;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


/**
 * 전자결재 연동관련 문자열 반환 클래스  
 * @작성일    : 2016. 8. 26. 
 * @작성자      : hhennessy
 * @프로그램설명 :
 * @진행상태: TO-DO, DEBUG, TEST, COMPLETE  
 */
public final class StringUtils
{
	protected static Logger logger = LogManager.getLogger(StringUtils.class);
	
    
    /**
     * 주어진 문자열을 splitLength 단위로 분리하여 List<String> 객체로 반환.
      * 한글등은 단어단위로 계산하여 반영.
   *
      * @param string
      * @param splitLength
      * @param thin \r\n\t\f를 제거할지 여부.
      * @return
      */
     public static List<String> splitBytes(final String string, final int splitLength, final boolean thin){

         Log log = LogFactory.getLog(StringUtils.class);

         List<String> list = new ArrayList<String>();

         String orgString = string;

         if(thin){
             orgString = string.replaceAll("[\n\r\f\t]", "");
         }

         byte[] bytes =orgString.getBytes();;

         if(splitLength>=bytes.length){
             list.add(string);
             return list;
         }

         int boffset = 0;
         int eoffset = splitLength-1;
         int copylen = 0;
         byte[] buf = new byte[splitLength];
         String newstr = null;

         if(log.isDebugEnabled()) log.debug("total byte length="+bytes.length);

         while(true){
             if( (bytes[eoffset] & 0x80) != 0 ){
                 --eoffset; continue;
             }

             copylen = eoffset-boffset+1;
             if(log.isDebugEnabled()) log.debug("eoffset="+eoffset+"; boffset="+boffset+"; copylen="+copylen);
             System.arraycopy(bytes, boffset, buf, 0, copylen);

             newstr = new String(buf, 0, copylen);

             if(log.isDebugEnabled()) log.debug(list.size()+":"+copylen+":"+boffset+":"+eoffset+":"+newstr);

             list.add(newstr);

             boffset = eoffset+1;
//             eoffset = (eoffset+splitLength>=bytes.length ? bytes.length-1 : eoffset+splitLength);
             if(eoffset+splitLength<bytes.length){
              eoffset = eoffset+splitLength;
             }else{
              eoffset = bytes.length-1;
                 copylen = eoffset-boffset+1;
                 if(log.isDebugEnabled()) log.debug("eoffset="+eoffset+"; boffset="+boffset+"; copylen="+copylen);
                 System.arraycopy(bytes, boffset, buf, 0, copylen);
                 newstr = new String(buf, 0, copylen);

                 if(log.isDebugEnabled()) log.debug(list.size()+":"+copylen+":"+boffset+":"+eoffset+":"+newstr);

                 list.add(newstr);
                 boffset = eoffset+1;
             }

             if(boffset>=bytes.length) break;
             if(log.isDebugEnabled()) log.debug(bytes.length+"; eoffset="+eoffset+"; boffset="+boffset);
         }

         return list;
     }
     

	  public static String posFormat(int num, int pos)
	  {
	    String zero = "";
	    int gap = pos - String.valueOf(num).length();
	    for (int i = 0; i < gap; i++) {
	      zero = zero + "0";
	    }
	    return zero + num;
	  }
 }
