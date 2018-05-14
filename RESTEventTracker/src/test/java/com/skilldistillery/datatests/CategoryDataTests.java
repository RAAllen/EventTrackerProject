package com.skilldistillery.datatests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.skilldistillery.services.CategoryService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CategoryDataTests {
	
	@Autowired
	private CategoryService cs;
	
	@Test
	public void test_index() {
		assertNotEquals(0, cs.index().size());
		assertEquals("Test Category Name", cs.index().get(0).getName());
	}
	
	@Test
	public void test_show() {
		assertEquals("Test Category Name", cs.show(1).getName());
		assertEquals("This is a test category.", cs.show(1).getDescription());
	}

}
