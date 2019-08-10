# ShortLinkTest
카카오 API를 이용한 책 검색 사이트 개발(개인프로젝트)

- 주사용 기술 : Java, Java Script, HTML5, CSS, spring frame work, spring-boot, Hibernate, jQuery, in-memory db(H2), 
lombok, Ribbon(클라이언트 사이드 로드밸런싱), SHA-256

카카오 책 검색 API와 연동하여 로그인/회원가입을 통한 책 카테고리별 검색, 나의 히스토리, 사용자들이 많이 검색한 키워드를 표현하였습니다.
스프링부트, JPA(Hibernate), 메모리 DB(H2) 환경에서 개발을 진행하였습니다.
사용한 라이브러리로는 롬복(lombok), Ribbon, H2 가상화서버, 프론트엔드 작업을 위한 jqxWidget 라이브러리 등을 활용하였습니다.
Ribbon 라이브러리를 통해 클라이언트 사이드 로드밸런싱 기술을 적용하여, 정상작동하는 서버일 경우에는 접속, 서버가 비정상 응답을 보내오는 경우에는 우회하여 정상서버에서 서블릿이 기동 되도록 적용하였습니다.
JPA 구조를 이용해 데이터에 접근하며, 해당 Data는 메모리 DB인 H2 가상화 db(H2 TCP Server)에 저장되도록 작업하였습니다.
민감정보는 SHA-2 알고리즘 중 SHA-256을 이용하여 암/복호화 과정을 거치도록 진행했습니다.
