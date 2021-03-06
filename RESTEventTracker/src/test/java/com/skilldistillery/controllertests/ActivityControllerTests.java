//package com.skilldistillery.controllertests;
//
//import static org.junit.Assert.assertEquals;
//
//import java.io.IOException;
//import java.util.List;
//
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
//import org.springframework.boot.test.web.client.TestRestTemplate;
//import org.springframework.http.ResponseEntity;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import com.fasterxml.jackson.core.JsonParseException;
//import com.fasterxml.jackson.databind.JsonMappingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.skilldistillery.entities.Activity;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(webEnvironment=WebEnvironment.DEFINED_PORT)
//public class ActivityControllerTests {
//	
//	@Test
//	public void test_index() throws JsonParseException, JsonMappingException, IOException {
//		TestRestTemplate restTest = new TestRestTemplate();
//		ResponseEntity<String> response = restTest.getForEntity("http://localhost:8080/api/activities", String.class);
//		ObjectMapper mapper = new ObjectMapper();
//		List<Activity> activities = mapper.readValue(response.getBody(),  mapper.getTypeFactory().constructCollectionType(List.class, Activity.class));
//		assertEquals("Test Activity", activities.get(0).getName());
//	}
//
//}
