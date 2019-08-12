package com.jwlee.shortLinkTest.webapp.db.search.model;

import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.sql.Timestamp;
/**
* SearchHistory
* @author jungwoolee
* @since 2019-07-24
**/
@Entity
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


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getRandom_key() { return random_key; }

	public void setRandom_key(Long random_key) { this.random_key = random_key; }

	public String getOriginal_url() {
		return original_url;
	}

	public void setOriginal_url(String original_url) {
		this.original_url = original_url;
	}

	public String getShort_url() { return short_url; }

	public void setShort_url(String short_url) { this.short_url = short_url; }


	public int getCnt() { return cnt; }

	public void setCnt(int cnt) { this.cnt = cnt; }



	public Timestamp getRegdate() {
		return regdate;
	}

	public void setRegdate(Timestamp regdate) {
		this.regdate = regdate;
	}


	public SearchHistory(String original_url, Long random_key, String short_url, Timestamp regdate, Integer cnt) {
		super();
		this.random_key = random_key;
		this.original_url = original_url;
		this.short_url= short_url;
//		this.target = target;
		this.regdate = regdate;
		this.cnt = cnt;
	}

}
