package com.pumpkin.melon.cmmn.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.StringTokenizer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.servlet.http.HttpServletRequest;

/**
 * ci폼벨리데이션 형식
 */
public class FormValidation {

    private final List<Rule> pools = new ArrayList<Rule>();
    private HttpServletRequest request;
    private final boolean customRules = false;
    private final HashMap<String, String> messages = new HashMap<String, String>();
    private boolean status = true;
    public static boolean isStatus = true;
    public static void main(String [] args){

        boolean res = isRules("한글1","trim|required|min_length[2]|max_length[100]");
        System.out.println("res==>" + (res?"True":"False"));

        res = isRules("172.a.1.1","trim|required|valid_ip");
        System.out.println("valid_ip==>" + (res?"True":"False"));

        res = isRules("https://stackoverflow.com/questions/14799943/how-to-check-if-number-is-a-decimal","trim|required|valid_url");
        System.out.println("valid_url==>" + (res?"True":"False"));

    }
    public FormValidation() {
    }

    public FormValidation(HttpServletRequest request) {
        this.request = request;

    }

    public void setRules(String fieldName, String label, String rules) {
        pools.add(new Rule(fieldName, label, rules));
    }

    public static boolean isNumeric(String input) {
        try {
            Double.parseDouble(input);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }


    public static boolean isRules(String field, String rules) {
        List<String> tokens = new ArrayList<String>();
        StringTokenizer tokenizer = new StringTokenizer(rules, "|");
        while (tokenizer.hasMoreTokens()) {
            tokens.add(tokenizer.nextToken());
        }
        if(rules.indexOf("trim")>-1){
            field = field.trim();
        }
        for (String token : tokens) {
            String sint = token.replaceAll("[^0-9]","");
            if (token.equals("required")) {
                boolean eq = true;
                try {
                    eq = (field.equals("") || field == null);
                } catch (Exception e) {
                }
                if (eq) {
                    isStatus = isStatus && false;
                }
            } else if (token.startsWith("min_length")) {
                int iint = Integer.parseInt(sint);
                if(field.length()<iint){
                    isStatus = isStatus && false;
                }
            } else if (token.startsWith("max_length")) {
                int iint = Integer.parseInt(sint);
                if(field.length()>iint){
                    isStatus = isStatus && false;
                }
            } else if (token.startsWith("exact_length")) {
                int iint = Integer.parseInt(sint);
                if(field.length()>iint){
                    isStatus = isStatus && false;
                }
            } else if (token.startsWith("less_than")) {
                int iint = Integer.parseInt(sint);

                if(!isNumeric(field)){
                    return false;
                }
                if(Integer.parseInt(field)<iint){
                    isStatus = isStatus && false;
                }
            } else if (token.startsWith("greater_than")) {
                int iint = Integer.parseInt(sint);
                if(!isNumeric(field)){
                    return false;
                }
                if(Integer.parseInt(field)>iint){
                    isStatus = isStatus && false;
                }
            } else if (token.equals("alpha")) {
                Pattern p = Pattern.compile("^[a-zA-Z]*$");
                if(!p.matcher(field).find()){
                    isStatus = isStatus && false;
                }

            } else if (token.equals("alpha_numeric")) {
                Pattern p = Pattern.compile("^[a-zA-Z0-9]*$");
                if(!p.matcher(field).find()){
                    isStatus = isStatus && false;
                }
            } else if (token.equals("alpha_numeric_spaces")) {
                Pattern p = Pattern.compile("(?=.*\\S)[a-zA-Z0-9\\s]*");
                if(!p.matcher(field).find()){
                    isStatus = isStatus && false;
                }
            } else if (token.equals("alpha_dash")) {
                Pattern p = Pattern.compile("^[a-zA-Z0-9-]*$");
                if(!p.matcher(field).find()){
                    isStatus = isStatus && false;
                }
            } else if (token.startsWith("numeric")||token.startsWith("integer")) {
                Pattern p = Pattern.compile("^[0-9]*$");
                if(!p.matcher(field).find()){
                    isStatus = isStatus && false;
                }
            } else if (token.startsWith("decimal")) {
                Pattern p = Pattern.compile("^\\d+\\.\\d+");
                if(!p.matcher(field).find()){
                    isStatus = isStatus && false;
                }
            } else if (token.startsWith("valid_url")) {
                Pattern p = Pattern.compile("^[https:\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)");
                if(!p.matcher(field).find()){
                    isStatus = isStatus && false;
                }
            } else if (token.startsWith("valid_email")) {
                Pattern p = Pattern.compile("^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$");
                if(!p.matcher(field).find()){
                    isStatus = isStatus && false;
                }
            } else if (token.startsWith("valid_ip")) {
                String zeroTo255
                    = "(\\d{1,2}|(0|1)\\"
                      + "d{2}|2[0-4]\\d|25[0-5])";

                // Regex for a digit from 0 to 255 and
                // followed by a dot, repeat 4 times.
                // this is the regex to validate an IP address.
                String regex
                    = zeroTo255 + "\\."
                      + zeroTo255 + "\\."
                      + zeroTo255 + "\\."
                      + zeroTo255;

                // Compile the ReGex
                Pattern p = Pattern.compile(regex);
                if(!p.matcher(field).find()){
                    isStatus = isStatus && false;
                }
            }
        }
        return isStatus;
    }
    public static String nvl(String str){
        return str+"";
    }
    public boolean run() {
        if(nvl(request.getParameter("mode")).equals("DELETE")){
            return true;
        }
        for (Rule rule : pools) {
            List<String> tokens = new ArrayList<String>();
            StringTokenizer tokenizer = new StringTokenizer(rule.getRules(), "|");
            while (tokenizer.hasMoreTokens()) {
                tokens.add(tokenizer.nextToken());
            }
            String field = nvl(request.getParameter(rule.getField()));
            if(rule.getRules().indexOf("trim")>-1){
                field = field.trim();
            }
            for (String token : tokens) {
                String sint = token.replaceAll("[^0-9]","");
                if(token.indexOf("[")>-1){
                    Pattern px = Pattern.compile("\\[(.*?)\\]");
                    Matcher m = px.matcher(token);
                    while(m.find()) {
                        sint = m.group(1);
                    }
                }
                if (token.equals("required")) {
                    boolean eq = true;
                    try {
                        eq = (field.equals("") || field == null);
                    } catch (Exception e) {
                    }
                    if (eq) {
                        String message =  rule.getLabel() + " 항목은 필수입니다.";
                        setMessage(rule.getField(), message);
                        status = status && false;
                    }
                } else if (token.startsWith("min_length")) {
                    int iint = Integer.parseInt(sint);
                    if(field.length()<iint){
                        String message =  rule.getLabel() + " 항목은 "+sint+"자 이하는 허용되지 않습니다.";
                        setMessage(rule.getField(), message);
                        status = status && false;
                    }
                } else if (token.startsWith("max_length")) {
                    int iint = Integer.parseInt(sint);
                    if(field.length()>iint){
                        String message =  rule.getLabel() + " 항목은 "+sint+"자 이상은 허용되지 않습니다.";
                        setMessage(rule.getField(), message);
                        status = status && false;
                    }
                } else if (token.startsWith("exact_length")) {
                } else if (token.startsWith("less_than")) {

                    int iint = Integer.parseInt(sint);

                    if(!isNumeric(field)){
                        String message =  rule.getLabel() + " 항목은 숫자가 아닙니다.";
                        setMessage(rule.getField(), message);
                        status = status && false;
                        continue;
                    }
                    if(Integer.parseInt(field)<iint){
                        status = status && false;

                        String message =  rule.getLabel() + " 항목은 "+sint+" 보다 커야합니다.";
                        setMessage(rule.getField(), message);
                        status = status && false;
                    }

                } else if (token.startsWith("greater_than")) {
                    int iint = Integer.parseInt(sint);
                    if(!isNumeric(field)){

                        String message =  rule.getLabel() + " 항목은 숫자가 아닙니다.";
                        setMessage(rule.getField(), message);
                        status = status && false;
                        continue;
                    }
                    if(Integer.parseInt(field)>iint){
                        String message =  rule.getLabel() + " 항목은 "+sint+" 보다 작아야합니다.";
                        setMessage(rule.getField(), message);
                        status = status && false;
                    }
                } else if (token.equals("alpha")) {
                    Pattern p = Pattern.compile("^[a-zA-Z]*$");
                    if(!p.matcher(field).find()){
                        String message =  rule.getLabel() + " 항목은 "+sint+"자 알파벳만 허용됩니다.";
                        setMessage(rule.getField(), message);
                        status = status && false;
                    }

                } else if (token.equals("alpha_numeric")) {
                    Pattern p = Pattern.compile("^[a-zA-Z0-9]*$");
                    if(!p.matcher(field).find()){
                        String message =  rule.getLabel() + " 항목은 "+sint+"자 알파벳,숫자만 허용됩니다.";
                        setMessage(rule.getField(), message);
                        status = status && false;
                    }
                } else if (token.equals("alpha_numeric_spaces")) {
                    Pattern p = Pattern.compile("(?=.*\\S)[a-zA-Z0-9\\s]*");
                    if(!p.matcher(field).find()){
                        String message =  rule.getLabel() + " 항목은 알파벳,숫자,공백만 허용됩니다.";
                        setMessage(rule.getField(), message);
                        status = status && false;
                    }
                } else if (token.equals("alpha_dash")) {
                    Pattern p = Pattern.compile("^[a-zA-Z0-9-]*$");
                    if(!p.matcher(field).find()){
                        String message =  rule.getLabel() + " 항목은 알파벳,[-]만 허용됩니다.";
                        setMessage(rule.getField(), message);
                        status = status && false;
                    }
                } else if (token.startsWith("numeric")||token.startsWith("integer")) {
                    Pattern p = Pattern.compile("^[0-9]*$");
                    if(!p.matcher(field).find()){
                        String message =  rule.getLabel() + " 항목은 숫자만 허용됩니다.";
                        setMessage(rule.getField(), message);
                        status = status && false;
                    }
                } else if (token.startsWith("decimal")) {
                    Pattern p = Pattern.compile("^\\d+\\.\\d+");
                    if(!p.matcher(field).find()){
                        String message =  rule.getLabel() + " 항목은 숫자,소수점만 허용됩니다.";
                        setMessage(rule.getField(), message);
                        status = status && false;
                    }
                } else if (token.startsWith("valid_url")) {
                    Pattern p = Pattern.compile("^[https:\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)");
                    if(!p.matcher(field).find()){
                        String message =  rule.getLabel() + " 항목은 URL규칙만 허용됩니다.";
                        setMessage(rule.getField(), message);
                        status = status && false;
                    }
                } else if (token.startsWith("valid_phone")) {
                    Pattern p = Pattern.compile("\\d{3}-\\d{4}-\\d{4}");
                    if(!p.matcher(field).find()){
                        String message =  rule.getLabel() + " 항목은 전화번호규칙만 허용됩니다.";
                        setMessage(rule.getField(), message);
                        status = status && false;
                    }
                } else if (token.startsWith("valid_email")) {
                    Pattern p = Pattern.compile("^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$");
                    if(!p.matcher(field).find()){
                        String message =  rule.getLabel() + " 항목은 Email규칙만 허용됩니다.";
                        setMessage(rule.getField(), message);
                        status = status && false;
                    }
                } else if (token.startsWith("valid_val")) {
                    if(!sint.split(",")[0].equals(field)){
                        String message =  rule.getLabel() + " 항목은 "+(sint.split(",")[1])+"만 허용됩니다.";
                        setMessage(rule.getField(), message);
                        status = status && false;
                    }

                } else if (token.startsWith("valid_ip")) {
                    String zeroTo255
                        = "(\\d{1,2}|(0|1)\\"
                          + "d{2}|2[0-4]\\d|25[0-5])";

                    // Regex for a digit from 0 to 255 and
                    // followed by a dot, repeat 4 times.
                    // this is the regex to validate an IP address.
                    String regex
                        = zeroTo255 + "\\."
                          + zeroTo255 + "\\."
                          + zeroTo255 + "\\."
                          + zeroTo255;

                    // Compile the ReGex
                    Pattern p = Pattern.compile(regex);
                    if(!p.matcher(field).find()){
                        String message =  rule.getLabel() + " 항목은 IP규칙만 허용됩니다.";
                        setMessage(rule.getField(), message);
                        status = status && false;
                    }
                } else if (token.startsWith("matches")) {
                    token = token.substring(8, token.length() - 1);
                    String field2 = request.getParameter(token);
                    boolean match = false;
                    try {
                        match = field.equals(field2);
                    } catch (Exception e) {
                    }
                    if (!match) {
                        String field2Label = "";
                        for (Rule rl : pools) {
                            if (rl.getField().equals(token)) {
                                field2Label = rl.getLabel();
                            }
                        }
                        String message =  rule.getLabel() + " does not match with " + field2Label ;
                        setMessage(field, message);
                        status = status && false;
                    }
                }
            }
        }

        return status;
    }

    public String getValidationErrors() {
        String reval = "";
        for (String value : messages.values()) {
            reval = reval + value;
        }
        return reval;
    }
    public HashMap<String, String> getErrors() {

        return messages;
    }


    public HttpServletRequest getRequest() {
        return request;
    }

    public void setRequest(HttpServletRequest request) {
        this.request = request;
    }

    public void setMessage(String field, String message) {
            String msg = messages.get(field);
            if (msg == null) {
                msg = "";
            }
            if(msg.length()>0){
                msg += "\r\n";
            }
            msg += message;
            messages.put(field, msg);
    }

    public String formError(String field) {
        return messages.get(field);
    }
}

class Rule {

    private String field;
    private String label;
    private String rules;

    public Rule() {
    }

    public Rule(String field, String label, String rules) {
        this.field = field;
        this.label = label;
        this.rules = rules;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getRules() {
        return rules;
    }

    public void setRules(String rules) {
        this.rules = rules;
    }
}
class IsRule {

    private String val;
    private String label;
    private String rules;

    public IsRule() {
    }

    public IsRule(String val, String rules) {
        this.val = val;
        this.rules = rules;
    }

    public String getRules() {
        return rules;
    }

    public void setRules(String rules) {
        this.rules = rules;
    }
}
