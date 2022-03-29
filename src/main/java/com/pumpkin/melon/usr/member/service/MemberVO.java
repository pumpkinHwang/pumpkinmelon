
package com.pumpkin.melon.usr.member.service;

import org.egovframe.rte.psl.dataaccess.util.EgovMap;
import com.pumpkin.melon.cmmn.pagingDefaultVO;

/**
 * @author 개발팀
 * @version 1.0
 * @Class Name : MemberVO.java
 * @Description : MemberVO Class
 * @Modification Information
 * @
 * @ 수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2022.01.26  hsk3807          최초생성
 * @see Copyright (C) by FRO All right reserved.
 * @since 2022 . 01. 26
 */
public class MemberVO extends pagingDefaultVO {

    private static final long serialVersionUID = 1L;
    private String seq;
    private String pw;
    private String id;
    private String name;
    private String hp;
    private String email;
    private String type;
    private String pol;
    private String pri;
    private String etc;
    private String status;
    private String lockCount;
    private String regDate;
    private String sessionkey;
    private String enableyn;
    private String telno;
    private String registno;
    private String department;
    private String departmentName;
    private String representativename;
    private String groupcode;
    private String useyn;
    private String passWd;
    private String encodePassWd;
    private String remoteAddress;
    private String userAccessProgram;
    private int loginHistorySeq;
    private String newPassWd;
    private String newPassWdChk;
    private String changePassword;

    @Override
    public String getSeq() {
        return seq;
    }

    @Override
    public void setSeq(String seq) {
        this.seq = seq;
    }

    public String getPw() {
        return pw;
    }

    public void setPw(String pw) {
        this.pw = pw;
    }

    public String getHp() {
        return hp;
    }

    public void setHp(String hp) {
        this.hp = hp;
    }

    public String getPol() {
        return pol;
    }

    public void setPol(String pol) {
        this.pol = pol;
    }

    public String getPri() {
        return pri;
    }

    public void setPri(String pri) {
        this.pri = pri;
    }

    public String getEtc() {
        return etc;
    }

    public void setEtc(String etc) {
        this.etc = etc;
    }

    public String getLockCount() {
        return lockCount;
    }

    public void setLockCount(String lockCount) {
        this.lockCount = lockCount;
    }

    public String getRegDate() {
        return regDate;
    }

    public void setRegDate(String regDate) {
        this.regDate = regDate;
    }

    public String getSessionkey() {
        return sessionkey;
    }

    public void setSessionkey(String sessionkey) {
        this.sessionkey = sessionkey;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelno() {
        return telno;
    }

    public void setTelno(String telno) {
        this.telno = telno;
    }

    public String getRegistno() {
        return registno;
    }

    public void setRegistno(String registno) {
        this.registno = registno;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public String getRepresentativename() {
        return representativename;
    }

    public void setRepresentativename(String representativename) {
        this.representativename = representativename;
    }

    public String getGroupcode() {
        return groupcode;
    }

    public void setGroupcode(String groupcode) {
        this.groupcode = groupcode;
    }

    public String getEnableyn() {
        return enableyn;
    }

    public void setEnableyn(String enableyn) {
        this.enableyn = enableyn;
    }

    public String getUseyn() {
        return useyn;
    }

    public void setUseyn(String useyn) {
        this.useyn = useyn;
    }

    public String getPassWd() {
        return passWd;
    }

    public void setPassWd(String passWd) {
        this.passWd = passWd;
    }

    public String getEncodePassWd() {
        return encodePassWd;
    }

    public void setEncodePassWd(String encodePassWd) {
        this.encodePassWd = encodePassWd;
    }

    public String getRemoteAddress() {
        return remoteAddress;
    }

    public void setRemoteAddress(String remoteAddress) {
        this.remoteAddress = remoteAddress;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUserAccessProgram() {
        return userAccessProgram;
    }

    public void setUserAccessProgram(String userAccessProgram) {
        this.userAccessProgram = userAccessProgram;
    }

    public int getLoginHistorySeq() {
        return loginHistorySeq;
    }

    public void setLoginHistorySeq(int loginHistorySeq) {
        this.loginHistorySeq = loginHistorySeq;
    }

    public String getNewPassWd() {
        return newPassWd;
    }

    public void setNewPassWd(String newPassWd) {
        this.newPassWd = newPassWd;
    }

    public String getNewPassWdChk() {
        return newPassWdChk;
    }

    public void setNewPassWdChk(String newPassWdChk) {
        this.newPassWdChk = newPassWdChk;
    }

    public String getChangePassword() {
        return changePassword;
    }

    public void setChangePassword(String changePassword) {
        this.changePassword = changePassword;
    }

}
