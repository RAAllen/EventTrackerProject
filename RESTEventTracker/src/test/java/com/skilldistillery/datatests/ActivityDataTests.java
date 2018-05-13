package com.skilldistillery.datatests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.skilldistillery.entities.Activity;
import com.skilldistillery.services.ActivityService;
import com.skilldistillery.services.CategoryService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ActivityDataTests {

	@Autowired
	private ActivityService as;
	
	@Autowired
	private CategoryService cs;
	
	@Test
	public void test_index() {
		assertNotEquals(0, as.index().size());
		assertEquals("Test Activity", as.index().get(0).getName());
	}
	
	@Test
	public void test_show() {
		assertEquals("Test Activity", as.show(1).getName());
		assertEquals("This is filler just to pass tests.", as.show(1).getDescription());
		assertEquals("2018-05-11 12:05:07.0", as.show(1).getStartTime().toString());
		assertEquals("2018-05-11 15:35:23.0", as.show(1).getEndTime().toString());
		assertEquals("Cat Name", as.show(1).getCategory().getName());
	}
	
//	@Test
//	public void test_create() {
//		String ldt = LocalDateTime.now().toString();
//		SimpleDateFormat sdf = new SimpleDateFormat("YYYY-mm-dd HH:mm:ss");
//		Date date = new Date();
//		try {
//			date = sdf.parse(ldt);
//		}
//		catch (ParseException e) {
//			e.printStackTrace();
//		}
//		String ldt = "2018-05-11 12:05:07";
//		DateFormat sdf = new SimpleDateFormat("yyyy.MM.dd HH:mm:ss");
//		Date date = new Date();
//		try {
//			date = sdf.parse(ldt);
//			System.out.println(date);
//		}
//		catch (ParseException e) {
//			e.printStackTrace();
//		}
//		Date date = new Date();
//		Activity activity = new Activity("New Activity", "It's a new activity.", date, cs.show(1));
//		as.create(activity);
//		assertEquals("New Activity", as.show(activity.getId()).getName());
//		assertEquals("It's a new activity.", as.show(activity.getId()).getDescription());
//		assertEquals("Cat Name", as.show(activity.getId()).getCategory().getName());
//	}

}
