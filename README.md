# project3-microservices

## 다이어그램
![pj3Diagram](https://user-images.githubusercontent.com/50437623/173313284-935566d1-4ee7-42f7-bbdf-aea6e150a914.png)

## 기능 설명
1. 물건을 구매 신청을 할 수 있다.
2. 구매 신청시 DB에 재고가 남아 있으면 판매완료 후 개수가 줄어든다.
3. 재고가 부족할 시 SNS로 재고 부족 메시지를 구독중인 sqs로 메시지를 보낸다.(혹시나 메시지를 보내는데 실패할 시 dead_letter로 이동)
4. sqs에 메시지가 도착하면 공장으로 물건종류, 개수, 구매자, callbackAPI주소를 담은 메시지를 공장 api로 전송한다.
5. callbackAPI에 메시지가 도착하면 재고생성 람다가 실행되고 DB로 신청한 물건 개수만큼 DB가 변경된다.

## 아키텍처 설명
1. sales 람다 배포 후 mysql db생성 후 연결, sns생성, sqs 생성
2. mysqsl 쿼리 작성, sales 람다를 생성한 sns로 연결 sns에서 sqs구독
3. sqs에서 메시지를 보내는데 실패한 메시지를 담아둘 dead_letter_queue와 연결
4. sqs에서 메시지가 전송될 때를 트리거로 하여 공장 서버에 재고부족 메시지 보내주는 stock-empty-lambda 람다 배포
5. 공장 서버는 영업 서버 api로 생성한 수 만큼 전송
6. 영업 서버 api는 콜백이 오면 new-product-event람다를 실행하여 mysql에 저장된 물건의 갯수를 증가시킴.


## 추가 설명
자세한 API 설명은 각 레포에 Readme를 통해 설명
