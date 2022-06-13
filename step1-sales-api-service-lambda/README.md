# Step1: Sales API 배포

Sales API를 lambda 형태로 리팩토링 한 후, serverless framework로 배포합니다.

## 배포 방법
1. 우선 aws 프로필을 환경변수로 적용해준다
export AWS_PROFILE=cch # 자신의 AWS 프로필 이름을 정해주세요.
2. yaml파일과 handler.js 작성 후 배포
```serverless remove --aws-profile cch --region ap-northeast-2 --stage dev --verbose```

## clean up
```serverless remove --aws-profile cch --region ap-northeast-2 --stage dev --verbose```


## 재고 확인
```
curl --location --request POST 'http://localhost:3000/send' \
--header 'Content-Type: application/json' \
--data-raw '{
    "MessageGroupId": "stock-empty-group",
    "subject": "부산도너츠 재고 부족",
    "message": "재고 부족",
    "MessageAttributeProductId": "CP-502101",
    "MessageAttributeFactoryId": "FF-500293"
}'
```

## 참고 
키워드 "express in lambda"
open https://www.npmjs.com/package/serverless-http

## 학습 목표
- 람다용으로 만들어지지 않은 node.js 프로젝트를 람다로 변환 할 수 있다.
