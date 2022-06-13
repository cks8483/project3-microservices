# Step1: Sales API 배포

Sales API를 lambda 형태로 리팩토링 한 후, serverless framework로 배포합니다.

## 배포 방법
1. 우선 aws 프로필을 환경변수로 적용해준다 <br>
export AWS_PROFILE=cch (자신의 AWS 프로필 이름을 정해주세요) <br>
(PROFILE 생성 방법 https://velog.io/@cks8483/aws-cli-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)

2. yaml파일과 handler.js 작성 후 배포
```serverless deploy --aws-profile cch --region ap-northeast-2 --stage dev --verbose```

## clean up
```serverless remove --aws-profile cch --region ap-northeast-2 --stage dev --verbose```

## RDS에 데이터값 추가 하기
```
-- RDS에 생성한 데이터베이스 리소스에 아래 table들을 생성하고, 값을 추가해넣으세요.
CREATE TABLE `product` (
    `product_id` BINARY(16)  NOT NULL ,
    -- http://mdr.tta.or.kr/item/1036/property/sku
    `sku` varchar(200)  NOT NULL ,
    -- Field documentation comment 3
    `name` varchar(200)  NOT NULL ,
    `price` int  NOT NULL ,
    `stock` int  NOT NULL ,
    `factory_id` BINARY(16)  NOT NULL ,
    `ad_id` BINARY(16)  NOT NULL ,
    PRIMARY KEY (
        `product_id`
    ),
    CONSTRAINT `uc_product_sku` UNIQUE (
        `sku`
    ),
    CONSTRAINT `uc_product_name` UNIQUE (
        `name`
    )
);

CREATE TABLE `product` (
    `product_id` BINARY(16)  NOT NULL ,
    `sku` varchar(200)  NOT NULL ,
    `name` varchar(200)  NOT NULL ,
    `price` int  NOT NULL ,
    `stock` int  NOT NULL ,
    `factory_id` BINARY(16)  NOT NULL ,
    `ad_id` BINARY(16)  NOT NULL ,
    PRIMARY KEY (
        `product_id`
    ),
    CONSTRAINT `uc_product_sku` UNIQUE (
        `sku`
    ),
    CONSTRAINT `uc_product_name` UNIQUE (
        `name`
    )
);

CREATE TABLE `factory` (
    `factory_id` BINARY(16)  NOT NULL ,
    -- http://mdr.tta.or.kr/item/1036/property/sku
    `identifier` varchar(200)  NOT NULL ,
    -- Field documentation comment 3
    `name` varchar(200)  NOT NULL ,
    `manager_email` varchar(200)  NOT NULL ,
    `API` varchar(200)  NOT NULL ,
    PRIMARY KEY (
        `factory_id`
    ),
    CONSTRAINT `uc_factory_name` UNIQUE (
        `name`
    )
);

CREATE TABLE `advertisement` (
    `ad_id` BINARY(16)  NOT NULL ,
    `status` boolean  NOT NULL ,
    `manager_email` varchar(200)  NOT NULL ,
    PRIMARY KEY (
        `ad_id`
    )
);

ALTER TABLE `product` ADD CONSTRAINT `fk_product_factory_id` FOREIGN KEY(`factory_id`)
REFERENCES `factory` (`factory_id`);

ALTER TABLE `product` ADD CONSTRAINT `fk_product_ad_id` FOREIGN KEY(`ad_id`)
REFERENCES `advertisement` (`ad_id`);




INSERT INTO factory(factory_id, identifier, name, manager_email, api) VALUES(UUID_TO_BIN(UUID()),'FF-500293','부산도너츠 공장', 'dob_factory@codeatates.com', '');


INSERT INTO advertisement(ad_id, status, manager_email) VALUES(UUID_TO_BIN(UUID()),true, 'dob_ad@codeatates.com');


SELECT BIN_TO_UUID(factory_id) as factory_id FROM factory;
-- 5ff9da54-c9b8-11ec-a849-0a5824c89b02

SELECT BIN_TO_UUID(ad_id) as ad_id FROM advertisement;
-- 5ffd3e64-c9b8-11ec-a849-0a5824c89b02

INSERT INTO product(product_id, sku, name, price, stock, factory_id, ad_id)
VALUES(UUID_TO_BIN(UUID()),'CP-502101','부산도너츠', 19900, 3, UUID_TO_BIN("213175b4-c9bf-11ec-a849-0a5824c89b02"),
UUID_TO_BIN('2134c868-c9bf-11ec-a849-0a5824c89b02'));
```



## 로컬에서 curl을 이용한 구매 요청 테스트
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

재고가 있을 시 <br>
message : 판매 완료

재고가 없을 때 <br>
message : 재고 부족, 제품 생산 요청!

## 참고 
키워드 "express in lambda"
open https://www.npmjs.com/package/serverless-http

## 학습 목표
- 람다용으로 만들어지지 않은 node.js 프로젝트를 람다로 변환 할 수 있다.
- RDS mysql을 이용 할 수 있다.
