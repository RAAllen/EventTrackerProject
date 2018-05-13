package com.skilldistillery.services;

import java.util.List;

import com.skilldistillery.entities.Category;

public interface CategoryService {
	
	public List<Category> index();
	
	public Category show(int id);
	
	public Category create(Category category);
	
	public Category replace(Category category, int id);
	
	public Category update(Category category, int id);
	
	public Boolean delete(int id);

}
