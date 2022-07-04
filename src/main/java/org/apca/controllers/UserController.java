package org.apca.controllers;

import java.io.IOException;
import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apca.domain.LandingPageIndicator;
import org.apca.domain.User;
import org.apca.domain.UserRoles;
import org.apca.domain.repositories.LandingPageRepository;
import org.apca.domain.repositories.UserRepository;
import org.apca.domain.repositories.UserRoleRepository;
import org.apca.models.Misc;
import org.apca.models.Pagination;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;





@Controller
public class UserController {

	//@Autowired
	//private  NamedParameterJdbcTemplate namedParameterJdbcTemplate;

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserRoleRepository userRoleRepository;
	
	@RequestMapping("/user/welcome")
	public ModelAndView renderWelcome(HttpServletRequest request)
	{
		HttpSession session = request.getSession();
		//String username = session.getAttribute("username").toString();
		
		ModelAndView model = new ModelAndView("user/welcome");
		model.addObject("pageTitle", "Welcome");
		return model;
	}
	
	@RequestMapping("/user/dashboard")
	public ModelAndView renderDashboard(HttpServletRequest request)
	{
		HttpSession session = request.getSession();
		Object token = session.getAttribute("token");
		System.out.println(token);
		ModelAndView model = new ModelAndView("user/dashboard");
		model.addObject("pageTitle", "Dashboard");
		
		Misc miscObj = new Misc();
		model.addObject("misc", miscObj);
		
		//get all countries
		final String getUserUrl = Misc.apiPoint+"/api/countries";		
		String countrieString = Misc.sendRestRequest(getUserUrl, token.toString());
		
		JSONArray countries = new JSONArray(countrieString);
		model.addObject("countries", countries);
		return model;
	}

	@RequestMapping("/user/edit-user1")
	public ModelAndView renderEditUser(HttpServletRequest request)
	{
		HttpSession session = request.getSession();
		String token = session.getAttribute("token").toString();

		long id = Long.valueOf(request.getParameter("id"));
		Optional<User> user = userRepository.findById(id);
		ModelAndView model = new ModelAndView("user/edit-user");

		//get all countries
		final String getUserUrl = Misc.apiPoint+"/api/countries";
		String countrieString = Misc.sendRestRequest(getUserUrl, token);


		UserRoles userRoles = userRoleRepository.findUserRolesByUserId(id);

		System.out.println("roles");
		System.out.println(userRoles);
		JSONArray countries = new JSONArray(countrieString);
		//List<JSONObject> lgas = Misc.convertJArrayToString(lgaArray);

		JSONObject userObj = new JSONObject();
		//userObj.put("id", user.get().get);



		model.addObject("pageTitle", "Edit User");
		model.addObject("countries", countries);
		model.addObject("user", user.get());
		model.addObject("userRoles", userRoles);

		model.addObject("currPage", "edit-user");
		return model;

	}
	@RequestMapping("/user/data-entry")
	public ModelAndView renderMonthlyEntry(HttpServletRequest request)
	{
		
		HttpSession session = request.getSession();
		Object token = session.getAttribute("token");
		ModelAndView model = new ModelAndView("user/data-entry");
		model.addObject("pageTitle", "Data Entry");
		model.addObject("currPage", "data-entry");
		Misc miscObj = new Misc();
		model.addObject("misc", miscObj);
		String readOnly = "0";//session.getAttribute("readOnly").toString();
		Misc.readOnly = Integer.valueOf(readOnly);
		model.addObject("readOnly", Integer.valueOf(readOnly));
		model.addObject("topbar", "Data Entry");
		
		//get all countries
		final String getUserUrl = Misc.apiPoint+"/api/countries";		
		String countrieString = Misc.sendRestRequest(getUserUrl, token.toString());
		
		JSONArray countries = new JSONArray(countrieString);
		
		
		Misc.readOnly = Integer.valueOf(readOnly);
		int moduleId = 1;
		//we will get all users from here and pass to from
		final String url = Misc.apiPoint+"/api/validation/get-validations?moduleId="+moduleId;

		//String dataStringObj = //Misc.sendRestRequest(url, token);
		model.addObject("moduleId", moduleId);
		model.addObject("validations", "[]");
		model.addObject("countries", countries);
		
		return model;
	}
	
	
	@RequestMapping("/user/add-user")
	public ModelAndView renderAddUser(HttpServletRequest request)
	{
		HttpSession session = request.getSession();
		String token = session.getAttribute("token").toString();

		ModelAndView model = new ModelAndView("user/add-user");
		
		//get all countries
		final String getUserUrl = Misc.apiPoint+"/api/countries";		
		String countrieString = Misc.sendRestRequest(getUserUrl, token);
		
		JSONArray countries = new JSONArray(countrieString);
		//List<JSONObject> lgas = Misc.convertJArrayToString(lgaArray);
		
		model.addObject("pageTitle", "Add User");
		model.addObject("countries", countries);
		model.addObject("currPage", "add-user");
		return model;
		
	}
	
	@RequestMapping("/user/view-users")
	public ModelAndView renderViewUsers(HttpServletRequest request)
	{
		ModelAndView model = new ModelAndView("user/view-users");
		
		//we will get all users from here and pass to from
		
		HttpSession session = request.getSession();
		String token = session.getAttribute("token").toString();
		
		final String getUserUrl = Misc.apiPoint+"/get-users";		
		String usersString = Misc.sendRestRequest(getUserUrl, token);
		
		JSONArray users = new JSONArray(usersString);
		System.out.println(users.toString());
		int page = 1;
		
		int limit = 400;
		
		
		
		int counter = limit * (page-1)+1;
		
		
		
		Pagination pagination = new Pagination(1, 50, users.length());
		
		int startPage = pagination.current_page-3;
        int endPage = pagination.current_page+3;
         
	   if(startPage <=0 )
	   {
	       startPage = 1;
	       endPage = endPage +  (startPage - 1);
	       
	   }
   
  
	   if(endPage > pagination.total_pages())
           endPage = pagination.total_pages();
  
		
	    Misc miscObj = new Misc();
		model.addObject("misc", miscObj);
	    model.addObject("startPage", startPage);
	    model.addObject("endPage", endPage);
	    model.addObject("pagination", pagination);
	    model.addObject("pagination", pagination);
	   
		model.addObject("currPage", "view-users");
		model.addObject("users", users);
		model.addObject("pagination", pagination);
		model.addObject("counter", counter);
		model.addObject("pageTitle", "View Users");
		return model;
	}

	@RequestMapping("/user/landing-page")
	public ModelAndView renderMonthlyEntry2 (HttpServletRequest request)
	{

		HttpSession session = request.getSession();
		Object token = session.getAttribute("token");
		ModelAndView model = new ModelAndView("user/landing-page");
		model.addObject("pageTitle", "Landing Page");
		model.addObject("currPage", "landing-page");
		Misc miscObj = new Misc();
		model.addObject("misc", miscObj);
		String readOnly = "0";//session.getAttribute("readOnly").toString();
		Misc.readOnly = Integer.valueOf(readOnly);
		model.addObject("readOnly", Integer.valueOf(readOnly));
		model.addObject("topbar", "Landing Page");

		//get all countries
		final String getUserUrl = Misc.apiPoint+"/api/countries";
		String countrieString = Misc.sendRestRequest(getUserUrl, token.toString());

		JSONArray countries = new JSONArray(countrieString);


		Misc.readOnly = Integer.valueOf(readOnly);
		int moduleId = 1;
		//we will get all users from here and pass to from
		final String url = Misc.apiPoint+"/api/validation/get-validations?moduleId="+moduleId;

		//String dataStringObj = //Misc.sendRestRequest(url, token);
		model.addObject("moduleId", moduleId);
		model.addObject("validations", "[]");
		model.addObject("countries", countries);

		return model;
	}

	@RequestMapping("/user/report")
	public ModelAndView renderMonthlyEntry3 (HttpServletRequest request)
	{

		HttpSession session = request.getSession();
		Object token = session.getAttribute("token");
		ModelAndView model = new ModelAndView("user/report");
		model.addObject("pageTitle", "Landing Page Report");
		model.addObject("currPage", "report");
		Misc miscObj = new Misc();
		model.addObject("misc", miscObj);
		String readOnly = "0";//session.getAttribute("readOnly").toString();
		Misc.readOnly = Integer.valueOf(readOnly);
		model.addObject("readOnly", Integer.valueOf(readOnly));
		model.addObject("topbar", "Landing Page Report");

		//get all countries
		final String getUserUrl = Misc.apiPoint+"/api/countries";
		String countrieString = Misc.sendRestRequest(getUserUrl, token.toString());

		JSONArray countries = new JSONArray(countrieString);


		Misc.readOnly = Integer.valueOf(readOnly);
		int moduleId = 1;
		//we will get all users from here and pass to from
		final String url = Misc.apiPoint+"/api/validation/get-validations?moduleId="+moduleId;

		//String dataStringObj = //Misc.sendRestRequest(url, token);
		model.addObject("moduleId", moduleId);
		model.addObject("validations", "[]");
		model.addObject("countries", countries);

		return model;
	}



}
