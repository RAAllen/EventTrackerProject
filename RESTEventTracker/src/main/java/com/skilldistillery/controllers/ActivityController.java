package com.skilldistillery.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.entities.Activity;
import com.skilldistillery.services.ActivityService;

@RestController
@RequestMapping("api")
public class ActivityController {
	
	@Autowired
	private ActivityService as;
	
	@RequestMapping(path="activities", method=RequestMethod.GET) 
	public List<Activity> index() {
		return as.index();
	}
	
	@RequestMapping(path="activities/{id}", method=RequestMethod.GET) 
		public Activity show(@PathVariable Integer id) {
		return as.show(id);
	}
	
	@RequestMapping(path="activities", method=RequestMethod.POST) 
	public Activity create(@RequestBody Activity activity, HttpServletRequest request, HttpServletResponse response) {
		return as.create(activity);
	}
	
	@RequestMapping(path="activities/{id}", method=RequestMethod.PUT)
	public Activity replaceCategory(@RequestBody Activity activity, @PathVariable Integer id) {
		return as.replace(activity, id);
	}

	@RequestMapping(path="activities/{id}", method=RequestMethod.PATCH)
	public Activity updateCategory(@RequestBody Activity activity, @PathVariable Integer id) {
		return as.update(activity, id);
	}
	
	@RequestMapping(path="activities/{id}", method=RequestMethod.DELETE)
	public Boolean deleteCategory(@PathVariable Integer id) {		
		boolean deleted = as.delete(id);
		return deleted;
	}
	
	

}
