package com.jwlee.shortLinkTest.webapp.common;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpSession;

/**
* SessionManager
* @author jungwoolee
* @since 2019-07-22
**/
public class SessionManager {

	/**
	 * set login seiion
	 * @param
	 */
	public static void setUser(String userId, Object menuData) {
		ServletRequestAttributes reqAttr = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpSession session = reqAttr.getRequest().getSession();
		session.setAttribute("userId", userId);
		session.setAttribute("menu", menuData);
	}

	/**
	 * get login AppDto
	 * @return
	 */
	public static String getUser(){
		try {
			ServletRequestAttributes reqAttr = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
			HttpSession session = reqAttr.getRequest().getSession();
			return (String) session.getAttribute("userId");
		} catch (Exception e) {
			return null;
		}
	}
}
