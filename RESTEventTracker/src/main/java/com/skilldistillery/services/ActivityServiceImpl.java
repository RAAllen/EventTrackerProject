package com.skilldistillery.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.entities.Activity;
import com.skilldistillery.entities.Category;
import com.skilldistillery.repositories.ActivityRepository;

@Service
public class ActivityServiceImpl implements ActivityService{

	@Autowired
	private ActivityRepository ar;
	
	@Autowired
	private ActivityService as;
	
	@Override
	public List<Activity> index() {
		return ar.findAll();
	}
	
	@Override
	public Activity show(int id) {
		Optional<Activity> opActivity = ar.findById(id);
		if(opActivity.isPresent()) {
			return opActivity.get();
		}
		return null;
	}
	
	@Override
	public Activity create(Activity activity) {
		Category category = new Category();
		category.setId(activity.getCategory().getId());
		activity.setCategory(category);
		if(activity.getName() == null || activity.getDescription() == null || activity.getCategory() == null || activity.getStartTime() == null) {
			activity = null;
		}
		ar.saveAndFlush(activity);
		return activity;
	}
	
	@Override
	public Activity replace(Activity activity, int id) {
		activity.setId(id);
		ar.saveAndFlush(activity);
		return activity;
	}
	
	@Override
	public Activity update(Activity activity, int id) {
		Activity managedActivity = as.show(id);
		managedActivity.setId(id);
		if(activity.getName() != null && !activity.getName().equals("")) {
			managedActivity.setName(activity.getName());
		}
		if(activity.getDescription() != null && !activity.getDescription().equals("")) {
			managedActivity.setDescription(activity.getDescription());
		}
		if(activity.getCategory() != null) {
			managedActivity.setCategory(activity.getCategory());
		}
		ar.saveAndFlush(managedActivity);
		return managedActivity;
	}
	
	@Override
	public Boolean delete(int id) {
		Boolean b = false;
		try {
			ar.deleteById(id);
			b = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return b;
	}
	
}
