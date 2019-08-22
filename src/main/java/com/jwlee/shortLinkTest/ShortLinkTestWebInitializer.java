package com.jwlee.shortLinkTest;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * ShortLinkTestWebInitializer
 * @author jungwoolee
 * @since 2019-07-22
 **/
public class ShortLinkTestWebInitializer extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(ShortLinkTestApplication.class);
    }
}
