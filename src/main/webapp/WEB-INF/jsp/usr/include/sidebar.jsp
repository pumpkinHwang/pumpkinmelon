<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
	<div class="header-util">
       <div class="btn-search-view search1">
           <button type="button" class="btn-search">통합검색</button>
           <!-- 통합검색 -->
           <div class="integrate-search-wrap">
               <form id="integrateSearchForm" name="integrateSearchForm" method="post" action="/search/integrateSearch/integrateSearchList">
                   <div class="inner">
                       <input type="text"  id="srchIntegratedKeyword" name="srchIntegratedKeyword" value="${searchVO.srchIntegratedKeyword}">
                       <button type="submit" class="srch-btn" onclick="fnIntegrateSearch();"><span class="blind">검색</span></button>
                   </div>
               </form>
           </div>
           <!-- //통합검색 -->

       </div>
       <div class="btn-search-view search2">
           <button type="button" class="btn-qsearch">퀵서치</button>
           <!-- quicksearch -->
           <div class="quicksearch-wrap">
                <form id="quickSearchForm" name="quickSearchForm" method="post" action="">
                   <div class="inner">
                       <div class="select-wrap">
                           <div class="select-box">
                               <select id="quickSrchDepth1" name="srchDepth1" class="on"> <!-- 활성화 될 경우 class on 추가 -->
                               </select>
                           </div>
                           <div class="select-box">
                               <select id="quickSrchDepth2" name="srchDepth2" disabled readonly>
                                   <option value="">선택</option>
                               </select>
                           </div>
                           <div class="select-box">
                               <select id="quickSrchDepth3" name="srchDepth3" disabled readonly>
                                   <option value="">선택</option>
                               </select>
                           </div>
                       </div>
                       <button type="button" class="btn-red" onclick="fnQuickSearchList()">검색</button>
                   </div>
                </form>
           </div>
           <!-- //quicksearch -->
       </div>
   </div>
   <div class="header-user">
       <strong class="account"><em>${loginVO.name}</em>님</strong>
       <div class="my">
           <a href="/usr/member/memberlogOut" class="log">로그아웃</a>
           <a href="/usr/member/memberChangeForm" class="pw">개인정보변경</a>
       </div>
   </div>
