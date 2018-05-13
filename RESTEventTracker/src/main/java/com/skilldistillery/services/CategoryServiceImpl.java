package com.skilldistillery.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.entities.Category;
import com.skilldistillery.repositories.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService{

	@Autowired
	private CategoryRepository cr;
	
	@Override
	public List<Category> index() {
		return cr.findAll();
	}

	@Override
	public Category show(int id) {
		Optional<Category> opCategory = cr.findById(id);
		if(opCategory.isPresent()) {
			return opCategory.get();
		}
		return null;
	}

	@Override
	public Category create(Category category) {
		if(category.getName() != null && category.getDescription() != null) {
		cr.saveAndFlush(category);
		}
		return category;
	}

	@Override
	public Category replace(Category category, int id) {
		Optional<Category> opCategory = cr.findById(id);
		if(opCategory.isPresent() && category.getName() != null && category.getDescription() != null) {
			cr.saveAndFlush(opCategory.get());
		}
		return category;
	}

	@Override
	public Category update(Category category, int id) {
		Category managedCategory = show(id);
		if(category.getName() != null && !category.getName().equals("")) {
			managedCategory.setName(category.getName());
		}
		if(category.getDescription() != null && !category.getDescription().equals("")) {
			managedCategory.setDescription(category.getDescription());
		}
		cr.saveAndFlush(managedCategory);
		return null;
	}

	@Override
	public Boolean delete(int id) {
		Boolean b = false;
		try {
			cr.deleteById(id);
			b = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return b;
	}

}
