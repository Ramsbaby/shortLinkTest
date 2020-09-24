# ShortLinkTest
**숏터닝 링크 서비스**

- 주사용 기술 : Java, Java Script, HTML5, CSS, spring frame work, spring-boot, Hibernate, jQuery, in-memory db(H2), 
lombok, Base62, jqxWidget.js

- 프로젝트 소개 : 
url을 입력받아 shortening url로 표현해주는 프로젝트입니다.
입력받은 url들을 변형시켜 그리드로 나열, 파이그래프로 통계데이터를 표현하고 있습니다.

- 문제해결 전략 :
입력받은 url의 랜덤키를 생성 후, 랜덤키를 62진수에 대응시켜 축약된 문자열을 얻어냅니다.
축약된 문자열, 원래url, 랜덤키를 DB에 삽입하여 동일한 url의 입력 혹은 동일한 축약url이 들어올 경우
원래의 값으로 돌려줍니다.
저장된 데이터들을 통해 통계데이터를 나타낼 수 있습니다.

- 프로젝트 빌드 방법 :
임베디드 톰캣 이용 중이므로, 
IDE에서 ShortLinkTestApplication.java를 메인 클래스로 하여 
이클립스 : 프로젝트 우클릭 > Run as... > Spring Boot App
intelliJ : Run > Run 'shortLinkTestApplication'
혹은 메이븐 package로 빌드 가능.


- 실행방법 :
IDE에서 임베디드톰캣실행 혹은 
war파일을 이용하여 커맨드 창에서 
java -jar ShortLinkTest-0.0.1-SNAPSHOT.war
명령어로 실행할 수 있습니다.
외부 톰캣에 war파일을 올리셔도 무방합니다.

````
