package org.apca.models;


import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.time.temporal.IsoFields;
import java.time.temporal.WeekFields;
import java.util.*;
import java.util.Map.Entry;

import org.joda.time.DateTime;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class Misc {


	@Autowired
	private  Environment env;
	
    public static  String dbType = "mssql";
	
	public static String apiPoint = "";
	public static String months[] = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
	public static String days[] = {"", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"};
	public static int readOnly = 0;
	public boolean tabVisible = false;
	public String getMonth(int month)
	{
		return Misc.months[month];
	}
	
	
	
	public String getLimitString(int limit, int offset)
	{
		
		Misc.displayMessage(Misc.dbType);
		String limitString = "";
		if(Misc.dbType.equalsIgnoreCase("mssql"))
		{
			limitString += " OFFSET "+offset+" ROWS FETCH NEXT "+limit+" ROWS ONLY ";
		}
		else if(Misc.dbType.equalsIgnoreCase("mssql")) {
			limitString += " LIMIT "+offset+", "+limit+" ";
		}
		
		//System.out.println("limit string "+limitString);
		return limitString;
	}
	
	public String createInput(String categoryId, String subcategoryId, String disagg, String gender, boolean isTogether )//I am using string for cat and sub cat id so I can pass empty strings
	{//istogether specifies whether the subcats are in one tab or not.
		
		String dataTotal = (isTogether) ? "el"+categoryId+"_"+disagg : "el"+categoryId+"_"+disagg+"_"+subcategoryId;
		String readOnly = (Misc.readOnly == 1) ?  "readonly='readonly'" : "";
		
		String input =  "<input type='text' "+readOnly+"  id='entry_"+categoryId+"_"+subcategoryId+"_"+disagg+"_"+gender+"' class='form-control entry-control numberonly autosum "+dataTotal+" el"+categoryId+"_"+subcategoryId+"_"+gender+" el"+categoryId+"_"+disagg+"_"+gender+"' data-total='"+dataTotal+"' data-subgroup='el"+categoryId+"_"+subcategoryId+"_"+gender+"' name='el"+categoryId+"_"+subcategoryId+"_"+disagg+"_"+gender+"' data-gender='"+gender+"' data-catId='"+categoryId+"' data-subcatId='"+subcategoryId+"' data-disagg='"+disagg+"'/>";
		
		return input;
		//return "";
	}
	
	
	public static String getDateCreated(long dateCreated)
	{
		DateTime dateTime = new DateTime(dateCreated);
		
		String hr = (dateTime.getHourOfDay() <10) ? "0"+dateTime.getHourOfDay() :dateTime.getHourOfDay()+"";
		String min = (dateTime.getMinuteOfHour() <10) ? "0"+dateTime.getMinuteOfHour() :dateTime.getMinuteOfHour()+"";
		String month = (dateTime.getMonthOfYear() <10) ? "0"+dateTime.getMonthOfYear() :dateTime.getMonthOfYear()+"";
		String date = (dateTime.getDayOfMonth() <10) ? "0"+dateTime.getDayOfMonth() :dateTime.getDayOfMonth()+"";
		String dateC = dateTime.getYear()+"-"+month+"-"+date+" "+hr+":"+min;
		
		return dateC;
	}

	
	public static String getValue(String value)
	{
		if(value == null)
		{
			return "";
		}
		else {
			return value;
		}
	}
	public static int getValue(int value)
	{
		return value;
	}
	
	public static void displayMessage(Object message)
	{
		System.out.println(message);
	}
	
	public static void logError(Exception e)
	{
		e.printStackTrace();
	}
	public String displayDeleted(int deleted)
	{
		if(deleted == 0)
		{
			return "<label class='badge badge-success'>Active</label>";
		}
		else {
			return "<label class='badge badge-warning'>Deleted</label>";
		}
	}
	
	public int getIntVal(String val)
	{
		if(val != null)
		{
			return Integer.valueOf(val);
		}
		else {
			return 0;
		}
	}
	
	
	
	public static String sendRestRequest(String url, String token) 
	{

		try {
			
			
	        // Create authorization header
	        String authorizationHeader = "Bearer " + token;
	
	        HttpClient client = HttpClient.newHttpClient();
	
	        // Create HTTP request object
	        HttpRequest request = HttpRequest.newBuilder()
	                .uri(URI.create(url))
	                .GET()
	                .header("Authorization", authorizationHeader)
	                .header("Content-Type", "application/json")
	                .build();
	        // Send HTTP request
	        HttpResponse<String> response = client.send(request,
	                HttpResponse.BodyHandlers.ofString());
	
	       return response.body();
		}catch(Exception e)
		{
			e.printStackTrace();
			return "";
		}
	}
	
	public static String sendPostRestRequestWithParams(String url, String token, HashMap<String, String> data) 
	{

		try {
			
			
			//var values = data;
			
			ObjectMapper objectMapper = new ObjectMapper();
	        String requestBody = objectMapper
	                .writeValueAsString(data);
	        
			
	        // Create authorization header
	        String authorizationHeader = "Bearer " + token;
	
	        HttpClient client = HttpClient.newHttpClient();
	
	        // Create HTTP request object
	        
	        HttpRequest request = HttpRequest.newBuilder()
	                .uri(URI.create(url))
	                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
	                .header("Authorization", authorizationHeader)
	                .header("Content-Type", "application/json")
	                .build();
	        
	        
	        // Send HTTP request
	        HttpResponse<String> response = client.send(request,
	                HttpResponse.BodyHandlers.ofString());

	        System.out.println(response.body());
	       return response.body();
		}catch(Exception e)
		{
			e.printStackTrace();
			return "";
		}
	}
	
	public void setVisibilityVar(boolean visible)
	{
		this.tabVisible = visible;
	}
	
	public boolean indexOf(List<Object> haystack, Object needle)
	{
		if(haystack.indexOf(needle.toString().toLowerCase()) > -1)
		{
			return true;
		}
		return false;
	}
	
	public static String sendPostRestRequestWithParamsV2(String url, String token, HashMap<String, Object> data) 
	{

		try {
			
			
			//var values = data;
			
			ObjectMapper objectMapper = new ObjectMapper();
	        String requestBody = objectMapper
	                .writeValueAsString(data);
	        
			
	        // Create authorization header
	        String authorizationHeader = "Bearer " + token;
	
	        HttpClient client = HttpClient.newHttpClient();
	
	        // Create HTTP request object
	        
	        HttpRequest request = HttpRequest.newBuilder()
	                .uri(URI.create(url))
	                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
	                .header("Authorization", authorizationHeader)
	                .header("Content-Type", "application/json")
	                .build();
	        
	        
	        // Send HTTP request
	        HttpResponse<String> response = client.send(request,
	                HttpResponse.BodyHandlers.ofString());

	        System.out.println(response.body());
	       return response.body();
		}catch(Exception e)
		{
			e.printStackTrace();
			return "";
		}
	}
	public static String sendPostRestRequestWithParamsV3(String url, String token, JSONObject data) 
	{

		try {
			
			
			//var values = data;
			
			ObjectMapper objectMapper = new ObjectMapper();
	        String requestBody = objectMapper
	                .writeValueAsString(data);
	        
			
	        // Create authorization header
	        String authorizationHeader = "Bearer " + token;
	
	        HttpClient client = HttpClient.newHttpClient();
	
	        // Create HTTP request object
	        
	        HttpRequest request = HttpRequest.newBuilder()
	                .uri(URI.create(url))
	                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
	                .header("Authorization", authorizationHeader)
	                .header("Content-Type", "application/json")
	                .build();
	        
	        
	        // Send HTTP request
	        HttpResponse<String> response = client.send(request,
	                HttpResponse.BodyHandlers.ofString());

	        System.out.println(response.body());
	       return response.body();
		}catch(Exception e)
		{
			e.printStackTrace();
			return "";
		}
	}
	public static String sendPostRestRequestWithParamsV4(String url, String token, Map<String, Object> data) 
	{

		try {
			
			
			//var values = data;
			
			ObjectMapper objectMapper = new ObjectMapper();
	        String requestBody = objectMapper
	                .writeValueAsString(data);
	        
			
	        // Create authorization header
	        String authorizationHeader = "Bearer " + token;
	
	        HttpClient client = HttpClient.newHttpClient();
	
	        // Create HTTP request object
	        
	        HttpRequest request = HttpRequest.newBuilder()
	                .uri(URI.create(url))
	                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
	                .header("Authorization", authorizationHeader)
	                .header("Content-Type", "application/json")
	                .build();
	        
	        
	        // Send HTTP request
	        HttpResponse<String> response = client.send(request,
	                HttpResponse.BodyHandlers.ofString());

	        System.out.println(response.body());
	       return response.body();
		}catch(Exception e)
		{
			e.printStackTrace();
			return "";
		}
	}
	
	public static String sendPostRestRequestWithParams2(String url, String token, HashMap<String, String> data) 
	{

		try {
			
			
			//var values = data;
			
			ObjectMapper objectMapper = new ObjectMapper();
	        String requestBody = objectMapper
	                .writeValueAsString(data);
	        
			
	        // Create authorization header
	        String authorizationHeader = "Bearer " + token;
	
	        HttpClient client = HttpClient.newHttpClient();
	
	        // Create HTTP request object
	        
	        HttpRequest request = HttpRequest.newBuilder()
	                .uri(URI.create(url))
	                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
	                .header("Authorization", authorizationHeader)
	                .header("Content-Type", "application/json")
	                .build();
	        
	        
	        // Send HTTP request
	        HttpResponse<String> response = client.send(request,
	                HttpResponse.BodyHandlers.ofString());

	        System.out.println(response.body());
	       return response.body();
		}catch(Exception e)
		{
			e.printStackTrace();
			return "";
		}
	}
	
	
	public static String sendPostRestRequestWithParams2(String url, String token, List<HashMap<String, String>> data) 
	{

		try {
			
			
			//var values = data;
			
			ObjectMapper objectMapper = new ObjectMapper();
	        String requestBody = objectMapper
	                .writeValueAsString(data);
	        
			
	        // Create authorization header
	        String authorizationHeader = "Bearer " + token;
	
	        HttpClient client = HttpClient.newHttpClient();
	
	        // Create HTTP request object
	        
	        HttpRequest request = HttpRequest.newBuilder()
	                .uri(URI.create(url))
	                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
	                .header("Authorization", authorizationHeader)
	                .header("Content-Type", "application/json")
	                .build();
	        
	        // Send HTTP request
	        HttpResponse<String> response = client.send(request,
	                HttpResponse.BodyHandlers.ofString());

	        System.out.println(response.body());
	       return response.body();
		}catch(Exception e)
		{
			e.printStackTrace();
			return "";
		}
	}
	
	
	public static String sendGetRestRequestWithParams(String url, String token, HashMap<String, String> data) 
	{

		try {
			
			
			//var values = data;
			
			ObjectMapper objectMapper = new ObjectMapper();
	        String requestBody = objectMapper
	                .writeValueAsString(data);
	        
			
	        // Create authorization header
	        String authorizationHeader = "Bearer " + token;
	
	        HttpClient client = HttpClient.newHttpClient();
	
	        // Create HTTP request object
	        
	        HttpRequest request = HttpRequest.newBuilder()
	                .uri(URI.create(url))
	                .GET()
	                .header("Authorization", authorizationHeader)
	                .header("Content-Type", "application/json")
	                .build();
	        
	        // Send HTTP request
	        HttpResponse<String> response = client.send(request,
	                HttpResponse.BodyHandlers.ofString());

	        System.out.println(response.body());
	       return response.body();
		}catch(Exception e)
		{
			e.printStackTrace();
			return "";
		}
	}
	
	public static List<JSONObject> convertJArrayToString(JSONArray object)
	{
		List<JSONObject> data = new ArrayList<>();
		for(int i=0; i<object.length(); i++)
		{
			JSONObject temp = new JSONObject(object.get(i).toString());
			data.add(temp);
		}
		
		return data;
	}
	
	
	public String displayNiceDateTime(long date)
	{
		return  this.displayNiceDate(date) + " "+ this.displayNiceTime(date);
	}
	
	public String displayNiceDate(long date)
	{
		DateTime niceDateObj = new DateTime(date);
		
		return niceDateObj.toString("E, dd MMM Y");
	}
	
	public String displayNiceTime(long date)
	{
		DateTime niceDateObj = new DateTime(date);
		return niceDateObj.toString("HH:mm");
	}
	
	public String getDateRangeOfWeek(int weekNo)
	{
		// Output "Wed Sep 26 14:23:28 EST 2012"

		
		
		
	    Calendar c = Calendar.getInstance();
	    //c.set(Calendar.YEAR, y);
	    c.setWeekDate(c.get(Calendar.YEAR), weekNo, Calendar.SUNDAY);
	    DateTime dateTime = new DateTime(c);
	    
	    
	    int i = c.get(Calendar.DAY_OF_WEEK) - c.getFirstDayOfWeek();
	    c.add(Calendar.DATE, - i - 7);
	   
	    Calendar start = dateTime.toGregorianCalendar();//c;
	   
	    DateTime endDateTime = dateTime.plusDays(6); 
	    //c.add(Calendar.DATE, 6);
	   
	    Calendar end = endDateTime.toGregorianCalendar();
	    
	    String startDate = Misc.getNiceDate(start);
	    String endDate = Misc.getNiceDate(end);
	    return startDate + " - "+endDate;
	}
	
	private static String getNiceDate(Calendar date)
	{
		
		String niceDate = (date.get(Calendar.DAY_OF_MONTH)) > 9 ? (date.get(Calendar.DAY_OF_MONTH))+"" : "0"+(date.get(Calendar.DAY_OF_MONTH));
		niceDate = niceDate+Misc.getPosition(date.get(Calendar.DAY_OF_MONTH));
		return days[date.get(Calendar.DAY_OF_WEEK)]+", "+niceDate+" "+Misc.months[date.get(Calendar.MONTH)]+" "+date.get(Calendar.YEAR);
	}
	
	private static String getPosition(int number)
	{
		String position = "";
		int remainder = number%10;
		if(remainder == 1)
		{
			position = "st";
		}
		else if(remainder == 2)
		{
			position = "nd";
		}
		else if(remainder == 3)
		{
			position = "rd";
		}
		else {
			position = "th";
		}
		return position;
		
	}
	
	public static String getModuleType(int moduleId)
	{
		String moduleString = "";
		switch(moduleId)
		{
			case 1:
				moduleString = "cPMTCT";
				break;
			case 2:
				moduleString = "HTS";
				break;
			default:
				moduleString = "";
		}
		
		return moduleString;
	}
	
	
	
	
	
	private List<String> getSubcategories(int categoryId)
	{
		
		List<String> subcats = new ArrayList<>();
		if(categoryId == 24 || categoryId == 25 || categoryId == 26 || categoryId == 27)
		{
			subcats.add("positive");
			subcats.add("negative");
		}
		else if(categoryId == 18 || categoryId == 19)
		{
			subcats.add("sdp");
			subcats.add("outside_sdp");
		}
		return subcats;
	}
	
	public static String encodeValue(String value) {
		try {
			return URLEncoder.encode(value, StandardCharsets.UTF_8.toString());
		}catch(Exception e)
		{
			return "";
		}
	}
	
	public static DateTime  getLastDateFromMonth(String reportingPeriod)
	{
		String[] reportingPeriodParts = reportingPeriod.split("/");
		int month = Integer.valueOf(reportingPeriodParts[0]) - 1; 
		int year = Integer.valueOf(reportingPeriodParts[1]);
		
		
		DateTime d = new DateTime(year, month + 1, 1, 0, 0);

		return d;
	}
	
	
	public static String getStringValue(JSONObject object, String key)
	{
		if(object.has(key))
		{
			return object.get(key).toString();
		}
		else {
			return "";
		}
	}
	
	public static JSONObject getJSONValue(JSONObject object, String key)
	{
		if(object.has(key))
		{
			return object.getJSONObject(key);
		}
		else {
			return new JSONObject();
		}
	}
	
	
	
	
	
	/*public static String getLastDayOfMonth(String date)
	{
		LocalDate convertedDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-M-d"));
		convertedDate = convertedDate.withDayOfMonth(
		                                convertedDate.getMonth().length(convertedDate.isLeapYear()));
		
		return convertedDate.toString();
		
	}*/
}
