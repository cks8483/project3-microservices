# Step-3 : 공장서버의 콜백 메시지를 받아 재고를 추가하는 람다를 구현하기

## 상황 및 요구사항
***'부산-스테이츠' 영업팀 상황***
- 공장 REST api 서버로 영업 서버가 품절 상황을 공유해주었고, 
- 해당 품절제품은 '부산-스테이츠'와 공장업체간의 계약으로 품절이 되면 즉시 요청한 수량을 생산하기로 하였다.

- 생산된 제품은 즉시 '부산-스테이츠'에 입고까지 완료되고나면, 공장서버가 입고완료 상황을 영업서버에게 알린다. 
- 영업서버는 추가 생산된 수량만큼 재고를 변경한다.

***'부산-스테이츠' 내부 개발팀 상황***
- 내외부 개발자에게 전달할 새로운 요구사항을 충족시키는 다이어그램과 
- 인프라 설명 문서가 필요한 상황이다. 

## 목표 
최종적으로 영업서버에 callback 메시지가 도착하면 실행되는 new-product-envent람다를 통하여 RDS mysql에 재고를 추가하는 람다를 구현하기

## local curl 테스트
### 제품 추가
```
curl --location --request POST 'http://localhost:3000/send'
--header 'Content-Type: application/json'
--data-raw '{ "MessageGroupId": "stock-empty-group", "subject": "도넛-스테이츠 제품 입고", "message": "제품 입고", "MessageAttributeProductId": "CP-502101", "MessageAttributeProductCnt": "10", "MessageAttributeFactoryId": "FF-500293" }'
```

결과 값 <br>
The stock is: 20

## 다이어그램
![image](https://user-images.githubusercontent.com/50437623/173333466-f228e25a-f770-4e8e-b968-94059c639207.png)


## 학습목표 
- 각각 배웠던 서비스들을 활용해 요구사항에 따라 새로운 인프라 구성 할 수 있다.


