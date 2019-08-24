package com.jwlee.shortLinkTest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * DemoApplication
 * @author jungwoolee
 * @since 2019-08-10
 **/
@Controller
@SpringBootApplication
public class ShortLinkTestApplication{
	public ShortLinkTestApplication() throws Exception{
    }

    public static void main(String[] args) {
        SpringApplication.run(ShortLinkTestApplication.class, args);
    }


    //********************   메인 페이지 관련   ********************
    @RequestMapping(value = {"/","/main.do"})
    String main() throws Exception{

        return "main";
    }
    //********************   메인 페이지 관련   ********************
}
