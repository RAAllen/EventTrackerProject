package com.skilldistillery.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.entities.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Integer>{

	public List<Activity> findByCategoryId(int id);
	
}
