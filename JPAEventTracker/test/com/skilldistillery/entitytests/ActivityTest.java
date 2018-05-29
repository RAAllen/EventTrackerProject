package com.skilldistillery.entitytests;

import static org.junit.jupiter.api.Assertions.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.skilldistillery.entities.Activity;

class ActivityTest {

	private EntityManagerFactory emf;
	private EntityManager em;
	private Activity activity;

	@BeforeEach
	void setUp() throws Exception {
		emf = Persistence.createEntityManagerFactory("EventTrackerProject");
		em = emf.createEntityManager();
		activity = em.find(Activity.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		emf.close();
		activity = null;
	}
	
	@Test
	@DisplayName("Test Category is correctly mapped")
	void test_category_mappings() {
		assertEquals("Test Activity", activity.getName());
	}

}
