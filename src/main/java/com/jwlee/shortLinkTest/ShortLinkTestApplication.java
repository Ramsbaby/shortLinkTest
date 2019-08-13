package com.jwlee.shortLinkTest;

import com.jwlee.shortLinkTest.common.util.Base62Util;
import org.apache.commons.codec.binary.Hex;
import org.junit.Test;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalancerClient;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.charset.StandardCharsets;
import java.util.Random;

import static junit.framework.TestCase.assertEquals;

/**
 * DemoApplication
 * @author jungwoolee
 * @since 2019-07-22
 **/
@Controller
@SpringBootApplication
//@RibbonClient(name = "hi-service", configuration = ServiceLoadbalancerConfiguration.class)
public class ShortLinkTestApplication{
//	private final RestTemplate restTemplate;
//	private final LoadBalancerClient loadBalancer;

//    @Autowired
//    ApiService apiService;

	public ShortLinkTestApplication() throws Exception{//RestTemplate restTemplate, LoadBalancerClient loadBalancer) {
//		this.restTemplate = restTemplate;
//		this.loadBalancer = loadBalancer;
    }






    public static void main(String[] args) {
        SpringApplication.run(ShortLinkTestApplication.class, args);
    }

//	@Bean
//	public ApplicationListener<ApplicationReadyEvent> listener1() {
//		return it -> {
//			String url = UriComponentsBuilder.fromHttpUrl("http://hi-service/")
//					.build()
//					.toUriString();
//			String response = restTemplate.getForObject(url, String.class);
//			System.out.println(response);
//		};
//	}

//	@Bean
//	public ApplicationListener<ApplicationReadyEvent> listener2() {
//		return it -> {
//			ServiceInstance instance = loadBalancer.choose("hi-service");
//			System.out.println(format("%s:%d", instance.getHost(), instance.getPort()));
//		};
//	}




    //********************   메인 페이지 관련   ********************
    @RequestMapping(value = {"/","/main.do"})
    String main() throws Exception{

        return "main";
    }
    //********************   메인 페이지 관련   ********************
}
