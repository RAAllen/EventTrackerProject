package com.skilldistillery.services;

import java.util.List;

import com.skilldistillery.entities.Activity;

public interface ActivityService {
	
	public List<Activity> index();
	
	public Activity show(int id);
	
	public Activity create(Activity actvity);
	
	public Activity replace(Activity activity, int id);
	
	public Activity update(Activity activity, int id);
	
	public Boolean delete(int id);

	List<Activity> findByCategoryId(int id);

}
