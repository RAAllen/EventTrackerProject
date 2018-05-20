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
import com.skilldistillery.entities.Category;
import com.skilldistillery.services.ActivityService;
import com.skilldistillery.services.CategoryService;

@RestController
@RequestMapping("api")
public class CategoryController {
	
	@Autowired
	private CategoryService cs;
	
	@Autowired
	private ActivityService as;
	
	@RequestMapping(path="categories", method=RequestMethod.GET) 
	public List<Category> index() {
		return cs.index();
	}
	
	@RequestMapping(path="categories/{id}", method=RequestMethod.GET) 
	public Category show(@PathVariable Integer id) {
		return cs.show(id);
	}
	
	@RequestMapping(path="categories", method=RequestMethod.POST) 
	public Category create(@RequestBody Category category, HttpServletRequest request, HttpServletResponse response) {
		return cs.create(category);
	}
	
	@RequestMapping(path="categories/{id}", method=RequestMethod.PUT)
	public Category replaceCategory(@RequestBody Category category, @PathVariable Integer id) {
		return cs.replace(category, id);
	}

	@RequestMapping(path="categories/{id}", method=RequestMethod.PATCH)
	public Category updateCategory(@RequestBody Category category, @PathVariable Integer id) {
		return cs.update(category, id);
	}
	
	@RequestMapping(path="categories/{id}", method=RequestMethod.DELETE)
	public Boolean deleteCategory(@RequestBody Category category, @PathVariable Integer id) {
		return cs.delete(id);
	}
	
	@RequestMapping(path="categories/{id}/activities", method=RequestMethod.GET)
	public List<Activity> getActivitiesByCategoryId(@PathVariable Integer id) {
		return as.findByCategoryId(id);
	}

}
