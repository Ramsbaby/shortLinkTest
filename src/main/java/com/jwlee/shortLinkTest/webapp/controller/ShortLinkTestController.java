package com.jwlee.shortLinkTest.webapp.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
* SearchHistoryController
* @author jungwoolee
* @since 2019-07-24
**/
@RequestMapping("/shortLink")
@Controller
public class ShortLinkTestController {
    private static final Logger logger = LoggerFactory.getLogger(ShortLinkTestController.class);

    static final char[] BASE62 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".toCharArray();

    /**
     * Base62 Encoding
     *
     * @return the base 62 string of an integer
     */
    @RequestMapping(value = "/getSearchHistoryList")
    @ResponseBody
    public static String encode(int value) {
        final StringBuilder sb = new StringBuilder();
        do {
            int i = value % 62;
            sb.append(BASE62[i]);
            value /= 62;
        } while (value > 0);
        return sb.toString();
    }

    public static String encodeToLong(long value) {
        final StringBuilder sb = new StringBuilder();
        do {
            int i = (int)(value % 62);
            sb.append(BASE62[i]);
            value /= 62;
        } while (value > 0);
        return sb.toString();
    }

    /**
     * Returns the base 62 value of a string.
     *
     * @return the base 62 value of a string.
     */
    public static int decode(String value) {
        int result=0;
        int power=1;
        for (int i = 0; i < value.length(); i++) {
            int digit = new String(BASE62).indexOf(value.charAt(i));
            result += digit * power;
            power *= 62;
        }
        return result;
    }

    public static long decodeToLong(String value) {
        long result=0;
        long power=1;
        for (int i = 0; i < value.length(); i++) {
            int digit = new String(BASE62).indexOf(value.charAt(i));
            result += digit * power;
            power *= 62;
        }
        return result;
    }


}
