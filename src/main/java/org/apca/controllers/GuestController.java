package org.apca.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class GuestController {

	
	@RequestMapping("/")
	public ModelAndView index()
	{
		ModelAndView view = new ModelAndView("login");
		return view;
	}
	
	@RequestMapping("/login")
	public ModelAndView login()
	{
		ModelAndView view = new ModelAndView("login");
		return view;
	}
	@RequestMapping("/logout")
	public String logout()
	{
		  return "redirect:/login";
	}
	
	
}
