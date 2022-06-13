const axios = require('axios');

exports.handler = function(event, context){

    let newevent = JSON.parse(event.Records[0].body)

    console.log("ev : ", newevent);

    axios.post('http://factory.p3.api.codestates-devops.be:8080/api/manufactures', 
    {
        "MessageGroupId": "stock-arrival-group",
        "MessageAttributeProductId": "CP-502101",
        "MessageAttributeProductCnt": 10,
        "MessageAttributeFactoryId": "FF-500293",
        "MessageAttributeRequester": "cch",
        "CallbackUrl": "https://d8jnv83r3c.execute-api.ap-northeast-2.amazonaws.com/send"
    }
)
.then(function (response) {
    console.log(response);
})
.catch(function (error) {
    console.log(error);
});

}
