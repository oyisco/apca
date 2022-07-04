package org.apca.controllers.endpoints;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apca.models.Misc;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class EndPointController {

    @RequestMapping("/save-session")
    public String saveSession(HttpServletRequest request, @RequestParam String username, @RequestParam String token) {
        Misc misc = new Misc();

        //get the user details here first before saving session
        String userId = request.getParameter("userId");
        System.out.println("hello" + "got here");
        token = token.replace("Bearer", "").trim();
        HttpSession session = request.getSession();

        //System.out.println(Misc.apiPoint);
        final String getUserUrl = Misc.apiPoint + "/user-role/" + userId + "?userId=" + userId;
        String userRoleString = Misc.sendRestRequest(getUserUrl, token);

        System.out.println("user role string" + userRoleString);
        JSONObject userRole = new JSONObject(userRoleString);
        String role = "";
        String modules = userRole.getString("modules");
        Object countries = userRole.get("countries");

        if (userRole.getInt("roleId") == 1) {
            role = "admin";
        } else {
            role = "user";
        }


        //System.out.println(userRole.getString("roleType"));
        session.setAttribute("role", role);
        session.setAttribute("countries", countries);
        session.setAttribute("modules", modules);
        session.setAttribute("token", token);
        session.setAttribute("userId", userId);


        return role;
    }


    @RequestMapping("/get-data")
    public String getData(HttpServletRequest request) {

        String countryId = request.getParameter("countryId");
        String year = request.getParameter("year");
        Misc misc = new Misc();
        HttpSession session = request.getSession();
        String token = session.getAttribute("token").toString();
        final String url = Misc.apiPoint + "/api/aggregation/fy-period-country?&countryId=" + countryId + "&fyPeriod=" + year;
        String existingDataString = Misc.sendRestRequest(url, token);

        //JSONObject exisingData = new JSONObject(existingDataString);
        return existingDataString;

    }

    @RequestMapping("/get-data-for-type")
    public String getDataForType(HttpServletRequest request) {

        String countryId = request.getParameter("country");
        String year = request.getParameter("year");
        String type = request.getParameter("type");//this will always come through
        Misc misc = new Misc();
        HttpSession session = request.getSession();
        String token = session.getAttribute("token").toString();
        String existingDataString = "";
        if (!year.equalsIgnoreCase("") || !countryId.equalsIgnoreCase("")) {
            final String url = Misc.apiPoint + "/api/aggregation/fy-period-country-type?&countryId=" + countryId + "&fyPeriod=" + year + "&type=" + type;
            existingDataString = Misc.sendRestRequest(url, token);
        } else {
            year = Calendar.getInstance().get(Calendar.YEAR) + "";
            final String url = Misc.apiPoint + "/api/aggregation/fy-period-type?fyPeriod=" + year + "&type=" + type;
            existingDataString = Misc.sendRestRequest(url, token);

        }

        //JSONObject exisingData = new JSONObject(existingDataString);
        return existingDataString;

    }


    @RequestMapping("/save-user")
    public String saveUser(HttpServletRequest request, @RequestParam String username, @RequestParam String password, @RequestParam String role, @RequestParam String modules, @RequestParam String countries) {
        //we need to get all states, all lga, and all spokes

        String message = "";
        HttpSession session = request.getSession();
        String token = session.getAttribute("token").toString();

        String[] countryIds = countries.split(",");
        String[] moduleIds = modules.split(",");
        HashMap<String, Object> data = new HashMap<>();
        data.put("id", "0");
        data.put("username", username);
        data.put("password", password);
        data.put("countryCode", countryIds);
        data.put("modules", moduleIds);
        data.put("role", role);
        //System.out.println(data);

        String url = Misc.apiPoint + "/signup";
        String output = Misc.sendPostRestRequestWithParamsV2(url, token, data);
        System.out.println("Out " + output);
        if (output.equals("User already exist!")) {
            message = "User already exist!";
        } else if (output.equals("User registered successfully!")) {
            message = "User registered successfully!";
        }

        //System.out.println(output);

        return message;
    }

    @PostMapping("/save-data")
    public String saveData(HttpServletRequest request, @RequestParam String entryData, @RequestParam String year, @RequestParam String country) {
        //we need to get all states, all lga, and all spokes
        HttpSession session = request.getSession();
        String token = session.getAttribute("token").toString();
        String userId = session.getAttribute("userId").toString();

        //System.out.println(token);

        //extra data might be coming in from. For example, we might need to save post code data and get the id of the vaccination post code
        HashMap<String, Object> data = new HashMap<>();


        JSONObject dataObject = new JSONObject(entryData);
        //JSONArray dataArray = new JSONArray(entryData);
        Iterator<String> keys = dataObject.keys();

        while (keys.hasNext()) {

            //for(int i=0; i<dataArray.length(); i++)
            //{
            String key = keys.next();
            JSONObject dataToSave = dataObject.getJSONObject(key);//.getJSONObject(i);
            if (dataToSave.has("fyPeriodYear")) {

                String countryId = dataToSave.getString("countryId");
                String fyYear = dataToSave.getString("fyPeriodYear");
                String type = dataToSave.getString("type");
                final String getExitingUrl = Misc.apiPoint + "/api/aggregation/fy-period-country-type?type=" + type + "&countryId=" + countryId + "&fyPeriod=" + fyYear;
                String existingDataString = Misc.sendRestRequest(getExitingUrl, token);

                JSONObject existingData = new JSONObject(existingDataString);


                if (existingData.has("id") && !existingData.isNull("id")) {
                    System.out.println(existingData.get("id"));
                    dataToSave.put("id", existingData.getString("id"));
                }

                String id = UUID.randomUUID().toString();
                //dataToSave.put("id", id);
                dataToSave.put("userId", userId);
                //System.out.println(id);
                Map<String, Object> hashData = dataToSave.toMap();
                String url = Misc.apiPoint + "/api/aggregation";
                String output = Misc.sendPostRestRequestWithParamsV4(url, token, hashData);
                //System.out.println(output);
            }
        }

        return "ok";
    }

}
