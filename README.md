# project3-microservices
## 시나리오
부산의 명물 부산도너츠를 판매합니다.
웹사이트를 통해서 주문 버튼을 누르는 것으로 구매(Sales API)가 가능합니다.
창고에 재고가 있다면 재고가 감소하고 구매가 완료됩니다.
유튜브스타 hoyong.LEE가 부산도너츠가 맛있다고 영상을 올렸습니다.
그를 따르는 데브옵스 수강생들이 몰려듭니다. 부산도너츠 주문이 급등합니다.
창고에 재고가 없기 때문에 구매가 불가능한 경우가 발생합니다.
창고의 부산도너츠 재고가 다 떨어지면 제조 공장에 알려서 다시 창고를 채우는 시스템을 구축해야합니다.
제조 공장인 <팩토리-스테이츠>에 주문을 요청(Leagcy Factory API)할 수 있습니다.
주문이 요청되면 일정 시간이 지난 후 창고에 재고가 증가합니다.

## 다이어그램
![pj3](https://user-images.githubusercontent.com/50437623/198676882-8688ca8b-7c18-4698-aadf-a352cca0e37d.png)



## 기능 설명
1. 물건을 구매 신청을 할 수 있다.
2. 구매 신청시 DB에 재고가 남아 있으면 판매완료 후 개수가 줄어든다.
3. 재고가 부족할 시 SNS로 재고 부족 메시지를 구독중인 sqs로 메시지를 보낸다.(혹시나 메시지를 보내는데 실패할 시 dead_letter로 이동)
4. sqs에 메시지가 도착하면 공장으로 물건종류, 개수, 구매자, callbackAPI주소를 담은 메시지를 공장 api로 전송한다.
5. callbackAPI에 메시지가 도착하면 재고생성 람다가 실행되고 DB로 신청한 물건 개수만큼 DB가 변경된다.

## 아키텍처 설명
1. sales 람다 배포 후 mysql db생성 후 연결, sns생성, sqs 생성
2. mySQL 쿼리 작성, sales 람다를 생성한 sns로 연결 sns에서 sqs구독
3. sqs에서 메시지를 보내는데 실패한 메시지를 담아둘 dead_letter_queue와 연결
4. sqs에서 메시지가 전송될 때를 트리거로 하여 공장 서버에 재고부족 메시지 보내주는 stock-empty-lambda 람다 배포
5. 공장 서버는 영업 서버 api로 생성한 수 만큼 전송
6. 영업 서버 api는 콜백이 오면 new-product-event람다를 실행하여 mysql에 저장된 물건의 갯수를 증가시킴.


## 추가 설명
1번 step1-sales-api-service-lambda : 도넛 판매, DB연동
2번 step2-stock-empty-lambda : 재고부족을 트리거로 SNS->SQS->재고요청람다 실행 
3번 step3-new-product-event-lambda : API도착시 DB재고 변경람다 실행
더 자세한 API 설명은 각 레포에 Readme를 통해 설명
