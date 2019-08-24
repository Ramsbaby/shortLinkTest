package com.jwlee.shortLinkTest;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * ShortLinkTestWebInitializer
 * @author jungwoolee
 * @since 2019-08-10
 *
 * war파일로 배포위해 web.xml 역할을 대체하는 SpringBootServletInitializer 상속받는 클래스 선언 -> WebApplicationInitializer 구현체
 *
 * 없으면 servletContainer에서 class 위치 못찾음.
 **/
public class ShortLinkTestWebInitializer extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(ShortLinkTestApplication.class);
    }
}
