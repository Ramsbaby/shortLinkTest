package com.jwlee.shortLinkTest;

import com.jwlee.shortLinkTest.common.util.Base62Util;
import org.apache.commons.codec.binary.Hex;
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
//        testEncodeAndDecode();
//        testRandomEncodeAndDecode();
    }



//    @Test
    public void testEncodeAndDecode() throws Exception{
//	    String bin = Integer.toBinaryString()
//        String url = Base62Util.getBase62UtilInstance().stringToHex("www.naver.com");
//        byte[] bytes = Hex.decodeHex(url.toCharArray());
//        System.out.println(Base62Util.getBase62UtilInstance().byteArrayToInt(bytes));
//
////        int intValue = Integer.parseInt(byteArrayToInt(bytes), 16);
//        System.out.println(Base62Util.getBase62UtilInstance().byteArrayToInt(bytes));
//        String encodedReservationNo = Base62Util.getBase62UtilInstance().encode(Base62Util.getBase62UtilInstance().byteArrayToInt(bytes));
//        System.out.println("ENCODE : "+encodedReservationNo+", DECODE : " + Base62Util.getBase62UtilInstance().decodeToLong(encodedReservationNo));
//
//        System.out.println("DECODE URL : " + new String(bytes, StandardCharsets.US_ASCII));

//        assertEquals(1234512345, Base62Util.decodeToLong(encodedReservationNo));
//        Base62Util.decodeToLong(encodedReservationNo);
    }

//    @Test
    public void testRandomEncodeAndDecode() throws Exception{
        for(int i=0; i < 10; i++) {
            Random rnd = new Random();
            long value = Math.abs(rnd.nextLong() % 10000000000L);
            System.out.println("VALUE : " + value);
            String encodedReservationNo = Base62Util.encodeToLong(value);
            System.out.println("ORIGINAL : " + value + ", ENCODE : " + encodedReservationNo + ", DECODE : " + Base62Util.decodeToLong(encodedReservationNo));
//            assertEquals(value, Base62Util.decodeToLong(encodedReservationNo));
//            Base62Util.decodeToLong(encodedReservationNo);
        }
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
