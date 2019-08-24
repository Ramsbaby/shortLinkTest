package com.jwlee.shortLinkTest.common.util;

public class Base62Util {

    static final char[] BASE62 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".toCharArray();

    private static Base62Util base62Util = null;


    private Base62Util()
    {}

    public static Base62Util getBase62UtilInstance()
    {
        if (base62Util==null) base62Util = new Base62Util();
        return base62Util;
    }

    /**
     * Base62 Encoding
     *
     * @return the base 62 string of an integer
     *
     * 62로 나눈 후 몫을 제외한 나머지를 계속 BASE62진수로 변환
     * 해당 값은 다시 62로 나누어서 재할당
     * 0보다 작으면 종료
     */
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
            int i = (int) (value % 62);
            sb.append(BASE62[i]);
            value /= 62;
        } while (value > 0);
        return sb.toString();
    }

    /**
     * Returns the base 62 value of a string.
     *
     * @return the base 62 value of a string.
     *
     * 한글자 한글자마다 글자의 순서를 result에 계속 더함
     * for문이 돌때마다 62를 곱해 다음 자리수 연산
     * 해당 글자를 62진수를 통해 다시 random key로 변환
     */
    public static int decode(String value) {
        int result = 0;
        int power = 1;
        for (int i = 0; i < value.length(); i++) {
            int digit = new String(BASE62).indexOf(value.charAt(i));
            result += digit * power;
            power *= 62;
        }
        return result;
    }

    public static long decodeToLong(String value) {
        long result = 0;
        long power = 1;
        for (int i = 0; i < value.length(); i++) {
            int digit = new String(BASE62).indexOf(value.charAt(i));
            result += digit * power;
            power *= 62;
        }
        return result;
    }

}
