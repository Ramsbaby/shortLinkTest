package com.jwlee.shortLinkTest.webapp.db.search.service;

import com.jwlee.shortLinkTest.webapp.common.ErrorInfo;
import com.jwlee.shortLinkTest.webapp.common.ReturnData;
import com.jwlee.shortLinkTest.webapp.controller.ShortLinkTestController;
import com.jwlee.shortLinkTest.webapp.db.search.model.SearchHistory;
import com.jwlee.shortLinkTest.webapp.db.search.repository.SearchHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@Service("searchHistoryService")
public class SearchHistoryServiceImpl implements SearchHistoryService{
    private final Logger logger = LoggerFactory.getLogger(ShortLinkTestController.class);

    @Autowired
    SearchHistoryRepository searchHistoryRepository;

    @Transactional
    public void save(SearchHistory entity) {
        searchHistoryRepository.save(entity);
    }

    @Override
    public ReturnData getSearchHistoryList(HttpServletRequest req, HttpServletResponse res)  {
        try {
            List<Map<String,Object>> searchHistoryList = searchHistoryRepository.selectSearchHistroryList();
            return new ReturnData(searchHistoryList);
        } catch (Exception e) {
            logger.info(e.getMessage());
            return new ReturnData(new ErrorInfo(e));
        }
    }

    @Override
    public ReturnData getKeywordTopList(HttpServletRequest req, HttpServletResponse res)  {
        try {
            List<Map<String,Object>> searchHistoryList = searchHistoryRepository.selectKeywordTopList();
            return new ReturnData(searchHistoryList);
        } catch (Exception e) {
            logger.info(e.getMessage());
            return new ReturnData(new ErrorInfo(e));
        }
    }

    // SearchHistoryUpdateCnt
    @Transactional
    public void updateHistoryCnt(SearchHistory searchHistory) {
        searchHistoryRepository.updateHistoryCnt( searchHistory );
    }
}
