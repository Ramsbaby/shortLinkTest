package com.jwlee.shortLinkTest.webapp.common;

import java.util.Locale;

/**
* MsgService
* @author jungwoolee
* @since 2019-07-22
**/
public class MsgService {
	
	protected String getMessage(String code) {
		return getMessage(code, null);
	}

	protected String getMessage(String code, Object[] params) {
		return getMessage(code, params, Locale.getDefault());
	}

	protected String getMessage(String code, Object[] params, Locale locale) {
		return code;
	}
	// 추가 성공
	protected String getAddOkMessage() {
		return getMessage("추가되었습니다.");
	}

	// 중복 아이디 실패
	protected String getUserIdDuplicateMessage() {
		return getMessage("중복된 아이디가 존재합니다.");
	}


}
