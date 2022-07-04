package org.apca;

import org.apca.interceptors.RequestProcessingTimeInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	
	@Bean
	public RequestProcessingTimeInterceptor myInterceptor() {
	    return new RequestProcessingTimeInterceptor();
	}

	@Override
	  public void addInterceptors(InterceptorRegistry registry) {
	    
	    registry.addInterceptor(myInterceptor()); 
	    
	  }
}
