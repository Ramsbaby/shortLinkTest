package com.jwlee.shortLinkTest.webapp.db.search.repository;

import com.jwlee.shortLinkTest.webapp.db.search.model.SearchHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

/**
* SearchHistoryRepository
* @author jungwoolee
* @since 2019-07-24
**/
public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long> {
//
	@Query("SELECT s FROM SearchHistory s WHERE s.original_url=?1")
    SearchHistory findByOriginalUrl(String original_url);

	@Query("SELECT s FROM SearchHistory s WHERE s.short_url=?1")
    SearchHistory findByShortUrl(String short_url);

    @Query(value = "SELECT id, regdate, original_url, short_url, cnt \n" +
            "FROM SEARCH_HISTORY \n" +
            "ORDER BY regdate ASC",
            nativeQuery=true)
    List<Map <String, Object>> selectSearchHistroryList();

    @Query(value = "SELECT ROWNUM AS RANK, A.* FROM" +
            "(SELECT COUNT(SEARCH_WORD) AS CNT, SEARCH_WORD\n" +
            "FROM SEARCH_HISTORY\n" +
            "GROUP BY SEARCH_WORD\n" +
            "ORDER BY CNT DESC , SEARCH_WORD ASC LIMIT 10) AS A",
            nativeQuery=true)
    List<Map <String, Object>> selectKeywordTopList();


    @Transactional
    @Modifying    // update , delete Query
    @Query(value="update SEARCH_HISTORY s set s.cnt = s.cnt+1 WHERE s.id = :#{#searchHistory.id}", nativeQuery=true)
    Integer updateHistoryCnt(@Param("searchHistory") SearchHistory searchHistory);


}
