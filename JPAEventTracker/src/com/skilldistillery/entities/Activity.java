package com.skilldistillery.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class Activity {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="description")
	private String description;
	
	
	@Column(name="start_time")
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date startTime;
	
	@Column(name="end_time")
	@Temporal(TemporalType.TIMESTAMP)
	@UpdateTimestamp
	private Date endTime;
	
	@ManyToOne
	@JoinColumn(name="category_id")
	private Category category;
	
	// End of Fields

	public Activity() {
		super();
	}
	
	public Activity(String name, String description, Date startTime, Category category) {
		super();
		this.name = name;
		this.description = description;
		this.startTime = startTime;
		this.category = category;
	}
	
	// End of Constructors

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	// End of Gets/Sets
	
}
