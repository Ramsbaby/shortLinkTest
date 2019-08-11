package com.jwlee.shortLinkTest.common.util;

import org.apache.commons.codec.binary.Hex;

import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;

public class Base62Util {

    private static final char[] HEX_CHARS = "0123456789abcdef".toCharArray();

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


    //    to hex, byte
    // 문자열을 헥사 스트링으로 변환하는 메서드
    public String stringToHex(String s) throws UnsupportedEncodingException
    {
        if (s == null) throw new NullPointerException();
        return asHex(s.getBytes());
    }

    private  String asHex(byte[] buf)
    {
        char[] chars = new char[2 * buf.length];
        for (int i = 0; i < buf.length; ++i)
        {
            chars[2 * i] = HEX_CHARS[(buf[i] & 0xF0) >>> 4];
            chars[2 * i + 1] = HEX_CHARS[buf[i] & 0x0F];
        }
        return new String(chars);
    }

    public static int byteArrayToInt(byte[] bytes) {
//        return ((((int)bytes[0] & 0xff) << 24) |
//                (((int)bytes[1] & 0xff) << 16) |
//                (((int)bytes[2] & 0xff) << 8) |
//                (((int)bytes[3] & 0xff)));

        return   bytes[3] & 0xFF |
                (bytes[2] & 0xFF) << 8 |
                (bytes[1] & 0xFF) << 16 |
                (bytes[0] & 0xFF) << 24;
    }

    public static long byteArrayToLong(byte[] bytes) {
        ByteBuffer buf = ByteBuffer.wrap(bytes);
        long longValue = buf.getLong();
        return longValue;
    }
}
