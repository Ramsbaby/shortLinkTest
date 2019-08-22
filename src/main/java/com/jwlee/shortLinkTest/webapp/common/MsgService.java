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
}
