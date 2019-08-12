package com.jwlee.shortLinkTest.webapp.db.search.service;

import com.jwlee.shortLinkTest.webapp.common.ReturnData;
import com.jwlee.shortLinkTest.webapp.db.search.model.SearchHistory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
* SearchHistoryService
* @author jungwoolee
* @since 2019-07-24
**/
@Service
public interface SearchHistoryService {

	public void save(SearchHistory entity);

	public ReturnData getSearchHistoryList(HttpServletRequest req, HttpServletResponse res);

	public ReturnData getKeywordTopList(HttpServletRequest req, HttpServletResponse res);

	public void updateHistoryCnt(SearchHistory searchHistory);
}
