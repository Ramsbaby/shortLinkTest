package com.jwlee.shortLinkTest.webapp.db.search.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.sql.Timestamp;
/**
* SearchHistory
* @author jungwoolee
* @since 2019-08-11
**/
@Entity
@Getter
@Setter
@Table(name = "search_history")
public class SearchHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private Long random_key;

	@Column(nullable = false)
	private String original_url;

	@Column(nullable = false)
	private String short_url;

	@Column(nullable = false)
	private Timestamp regdate;

	@Column(nullable = false)
	@ColumnDefault("1")
	private Integer cnt;


	public SearchHistory() {
		super();
	}


	public SearchHistory(String original_url, Long random_key, String short_url, Timestamp regdate, Integer cnt) {
		super();
		this.random_key = random_key;
		this.original_url = original_url;
		this.short_url= short_url;
		this.regdate = regdate;
		this.cnt = cnt;
	}

}
