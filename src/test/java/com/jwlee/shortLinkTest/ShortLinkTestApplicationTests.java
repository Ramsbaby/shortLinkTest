package com.jwlee.shortLinkTest;

import com.jwlee.shortLinkTest.common.util.Base62Util;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Random;

import static junit.framework.TestCase.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest(
        properties = {
                "count=10"
        },
        classes = {ShortLinkTestApplication.class},
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
public class ShortLinkTestApplicationTests {
    @Value("${count}")
    private int count;

    @Test
    public void contextLoads() {
    }


    @Test
    public void testRandomEncodeAndDecode(){
        for(int i=0; i < count; i++) {
            Random rnd = new Random();
            long value = Math.abs(rnd.nextLong() % 10000000000L);
            System.out.println("VALUE : " + value);
            String encodedReservationNo = Base62Util.encodeToLong(value);
            System.out.println("ORIGINAL : " + value + ", ENCODE : " + encodedReservationNo + ", DECODE : " + Base62Util.decodeToLong(encodedReservationNo));
            assertEquals(value, Base62Util.decodeToLong(encodedReservationNo));
        }
    }
}
