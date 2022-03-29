<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
   <div class="header-user">
       <strong class="account"><em>${loginMngVO.name}</em>님</strong>
       <div class="my">
           <a href="/mng/member/memberlogOut" class="log">로그아웃</a>
           <a href="/mng/member/memberChangePasswordForm" class="pw">비밀번호변경</a>
       </div>
       <a href="#" class="search">통합검색 관리</a>
   </div>
