package com.jwlee.shortLinkTest.common.configuration;

import com.netflix.client.config.IClientConfig;
import com.netflix.loadbalancer.AvailabilityFilteringRule;
import com.netflix.loadbalancer.IPing;
import com.netflix.loadbalancer.IRule;
import com.netflix.loadbalancer.PingUrl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

/**
* ServiceLoadbalancerConfiguration - 클라이언트 로드밸런싱, do not configuration
* @author jungwoolee
* @since 2019-07-24
**/

public class ServiceLoadbalancerConfiguration {
    private final Logger logger = LoggerFactory.getLogger(ServiceLoadbalancerConfiguration.class);

    @Autowired
    IClientConfig ribbonClientConfig;

    @Bean
    public IPing ribbonPing(IClientConfig config) {
        return new PingUrl(false, "");
    }

    @Bean
    public IRule ribbonRule(IClientConfig config) {
        return new AvailabilityFilteringRule();
    }
}
