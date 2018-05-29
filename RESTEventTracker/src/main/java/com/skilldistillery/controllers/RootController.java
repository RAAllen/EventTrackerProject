package com.skilldistillery.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.entities.Activity;
import com.skilldistillery.entities.Category;
import com.skilldistillery.services.ActivityService;
import com.skilldistillery.services.CategoryService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4200"})
public class RootController {
	
	@Autowired
	private CategoryService cs;
	
	@Autowired
	private ActivityService as;
	
	@RequestMapping(path="/")
	public String home() {
		return "index.html";
	}
	
	@RequestMapping(path="activities", method=RequestMethod.GET) 
	public List<Activity> activityIndex(HttpServletRequest req, HttpServletResponse res) {
		return as.index();
	}
	
	@RequestMapping(path="activities/{id}", method=RequestMethod.GET) 
		public Activity showActivity(HttpServletRequest req, HttpServletResponse res, @PathVariable Integer id) {
		return as.show(id);
	}
	
	@RequestMapping(path="activities", method=RequestMethod.POST) 
	public Activity create(HttpServletRequest req, HttpServletResponse res, @RequestBody Activity activity, HttpServletRequest request, HttpServletResponse response) {
		return as.create(activity);
	}
	
	@RequestMapping(path="activities/{id}", method=RequestMethod.PUT)
	public Activity replaceCategory(HttpServletRequest req, HttpServletResponse res, @RequestBody Activity activity, @PathVariable Integer id) {
		return as.replace(activity, id);
	}

	@RequestMapping(path="activities/{id}", method=RequestMethod.PATCH)
	public Activity updateCategory(HttpServletRequest req, HttpServletResponse res, @RequestBody Activity activity, @PathVariable Integer id) {
		return as.update(activity, id);
	}
	
	@RequestMapping(path="activities/{id}", method=RequestMethod.DELETE)
	public Boolean deleteCategory(HttpServletRequest req, HttpServletResponse res, @PathVariable Integer id) {		
		boolean deleted = as.delete(id);
		return deleted;
	}
	
	@RequestMapping(path="categories", method=RequestMethod.GET) 
	public List<Category> index(HttpServletRequest req, HttpServletResponse res) {
		return cs.index();
	}
	
	@RequestMapping(path="categories/{id}", method=RequestMethod.GET) 
	public Category show(HttpServletRequest req, HttpServletResponse res, @PathVariable Integer id) {
		return cs.show(id);
	}
	
	@RequestMapping(path="categories", method=RequestMethod.POST) 
	public Category create(HttpServletRequest req, HttpServletResponse res, @RequestBody Category category, HttpServletRequest request, HttpServletResponse response) {
		return cs.create(category);
	}
	
	@RequestMapping(path="categories/{id}", method=RequestMethod.PUT)
	public Category replaceCategory(HttpServletRequest req, HttpServletResponse res, @RequestBody Category category, @PathVariable Integer id) {
		return cs.replace(category, id);
	}

	@RequestMapping(path="categories/{id}", method=RequestMethod.PATCH)
	public Category updateCategory(HttpServletRequest req, HttpServletResponse res, @RequestBody Category category, @PathVariable Integer id) {
		return cs.update(category, id);
	}
	
	@RequestMapping(path="categories/{id}", method=RequestMethod.DELETE)
	public Boolean deleteCategory(HttpServletRequest req, HttpServletResponse res, @RequestBody Category category, @PathVariable Integer id) {
		return cs.delete(id);
	}
	
	@RequestMapping(path="categories/{id}/activities", method=RequestMethod.GET)
	public List<Activity> getActivitiesByCategoryId(HttpServletRequest req, HttpServletResponse res, @PathVariable Integer id) {
		return as.findByCategoryId(id);
	}

}
