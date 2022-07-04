package org.apca.interceptors;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apca.models.Misc;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.core.env.Environment;
//import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;




public class RequestProcessingTimeInterceptor  implements HandlerInterceptor{
	
	
	@Autowired
	private Environment env;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		
		
		HttpSession session = request.getSession();
		Object token = session.getAttribute("token");
		//System.out.println(token);
		Object role = session.getAttribute("role");
		Object firstTimeObject = session.getAttribute("firstTime");
	
		
		String requestUri = request.getRequestURI();
		if(requestUri.contains("public/"))
		{
			return true;
		}
		else if(requestUri.contains("/login"))
		{
			return true;
		}
		else if(requestUri.contains("super/") || requestUri.contains("admin/") || requestUri.contains("user/") || requestUri.contains("funder/")){
			
			if(token == null)
			{
				 response.sendRedirect(request.getContextPath()+"/login");
				return false;
			}
			else if(requestUri.contains("admin/")){
				
				//System.out.println("role"+role);
				if(role.toString().equalsIgnoreCase("admin") || role.toString().equalsIgnoreCase("super"))
				{
					return true;
				}
				else {
					response.sendRedirect(request.getContextPath()+"/login");
					return false;
				}
			}else if(requestUri.contains("user/"))
			{
				if(!role.toString().equalsIgnoreCase("user") && !role.toString().equalsIgnoreCase("admin"))
				{
					response.sendRedirect(request.getContextPath()+"/login");
					return false;
				}
				
			}
					
		}
		return true;
		
	
	}
	
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object o, ModelAndView model) throws Exception {
			  
		HttpSession session = request.getSession();
		Object role = session.getAttribute("role");
		Object modules = session.getAttribute("modules");
		Object countries = session.getAttribute("countries");
		
		String [] countryArray = new String[1];
		String [] moduleArray = new String[1];
		
		
		if(countries != null)
		{
			countries = countries.toString().replaceAll("\\s+","");
			
			countries = countries.toString().toLowerCase();
			countryArray =  countries.toString().split(",");
		}
		
		if(modules != null)
		{
			modules = modules.toString().replaceAll("\\s+","");
			modules = modules.toString().toLowerCase();
			moduleArray =  modules.toString().split(",");
		}
		
		String apiEndPoint = env.getProperty("app.endpoint");
		Misc.apiPoint = apiEndPoint;
		
		if(model != null)
		{
			model.addObject("apiEndPoint", apiEndPoint);
			model.addObject("role", role);
			model.addObject("modulesList", Arrays.asList(moduleArray));
			System.out.println(Arrays.asList(countryArray));
			model.addObject("countriesList", Arrays.asList(countryArray));
		}
		
	}
}
