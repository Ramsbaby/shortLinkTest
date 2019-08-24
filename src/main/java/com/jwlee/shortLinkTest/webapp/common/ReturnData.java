package com.jwlee.shortLinkTest.webapp.common;

import java.io.Serializable;

/**
* ReturnData
* @author jungwoolee
* @since 2019-08-10
**/
@SuppressWarnings("serial")
public class ReturnData implements Serializable {
	private boolean hasError;
	private ErrorInfo errorInfo;
	private Object resultData;
	
	public ReturnData() {
		this(false);
	}
	public ReturnData(boolean hasError) {
		this.hasError = hasError;
	}
	public ReturnData(Object resultData) {
		this.resultData = resultData;
	}
	public ReturnData(ErrorInfo errorInfo) {
		this.hasError = true;
		this.errorInfo = errorInfo;
	}
	/**
	 * @param hasError the hasError to set
	 */
	public void setHasError(boolean hasError) {
		this.hasError = hasError;
	}
	/**
	 * @return the resultData
	 */
	public Object getResultData() {
		return resultData;
	}
	/**
	 * @param data the resultData to set
	 */
	public void setResultData(Object resultData) {
		this.resultData = resultData;
	}
}
