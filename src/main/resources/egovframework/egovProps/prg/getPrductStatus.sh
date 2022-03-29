# Shell Name : getPrductStatus.sh                                           	
# Description : 시스템에 설치된 서버(WAS,WEB,MAIL서버)의 실행상태를 조회하는 Shell 	
# Modification Information                                                				
#                                                                    
# 수정일                      수정자                   수정내용
# -------      --------     ---------------------------
# 2009.02.11    황장운                   최초 생성
#
# @author 공통 서비스 개발팀 황장운
# @since 2009. 02. 11
# @version 1.0
# @see
#
# Copyright (C) 2009 by MOPAS  All right reserved.

#echo $1	-PORT

netstat -na | grep -w "LISTEN" | grep -c $1