# Step-2: Stock Empty 람다 배포
공장 서버에 메시지를 전달하는 람다를 만든 후 serverless framework로 배포합니다.

## 설계 구조
<pre>
  구매요청 = curl
     |
[ 영업 api ] -> sns -> sqs -> (Stock Empty labmda) -> [ 공장 api ]
</pre>


## 공장 서버에 메시지가 잘가는지 curl로 확인
```
curl --location --request POST 'http://factory.p3.api.codestates-devops.be:8080/manufacture' \
--header 'Content-Type: application/json' \
--data-raw '{
  "MessageGroupId": "stock-arrival-group",
  "MessageAttributeProductId": "CP-502101",
  "MessageAttributeProductCnt": 10,
  "MessageAttributeFactoryId": "FF-500293",
  "MessageAttributeRequester": "홍길동",
  "CallbackUrl": "https://rr298yy7hk.execute-api.ap-northeast-2.amazonaws.com/arrival"
}'
```

## 목표 
Step1 Sales-api-serviec와 합하여 Stock Empty 인프라를 완성하자.
