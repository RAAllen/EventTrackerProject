package com.skilldistillery.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.entities.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Integer>{

	public List<Activity> findByCategoryId(int id);
	
//	@Query("SELECT a FROM Activity a JOIN FETCH a.category WHERE id :id")
//	public Activity findByActivityId(@Param("id") int id);
	
}
