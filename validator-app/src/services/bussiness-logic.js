const amqp = require('amqplib');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const Message = require('../models/message');
const logger  = require('../logger/logger')


const fetchFromQueue = async() => {


logger.info('fetch from queue start!')
    var queue = 'dataValidator';
    
    
    function consumer(connection) {
logger.info('creating channel!')

      var ok = connection.createChannel(on_open);
      function on_open(err, channel) {
        if (err != null) bail(err);
logger.info('assert Queue')

        channel.assertQueue(queue);
        channel.consume(queue, function(message) {
          if (message !== null) {

            console.log(message.content.toString());
            input = JSON.parse(message.content.toString())
logger.info('msg from queue!', input)

            console.log("input: ", input);
            dataPusher(input)
            channel.ack(message);
    
    
          }
        });
      }
    }
    

require('amqplib/callback_api')
.connect('amqp://localhost', function(err, connection) {
  if (err != null) bail(err);
  consumer(connection);
});
    
}










async function dataPusher(input) {

bodyObj= []




let bodyObjPromise = new Promise(function(Resolve, Reject) {
    logger.info('creating body obj by checking condition to push to track api!')

    if ((input[0].randomNumber % 10) == 0) {
logger.info('condition true genrating random number')
    console.log("randomNumber1: ", input[0].randomNumber);
    // bodyObj = [{ userId: input.id, userMessage: input.message, category: 'Retried' }];
    // makePostRequest('http://127.0.0.1:3004/data-tracker', bodyObj, input);
    // apiCall(input, 'Retried')
    input[0].randomNumber = Math.floor(Math.random() * (60 - 1 + 1) + 1)
    // input[0].randomNumber = 10
    console.log("randomNumber2: ", input[0].randomNumber);




    setTimeout(() => {
        if ((input[0].randomNumber % 10) == 0) {
logger.info('condition true set category to failed')
        console.log("randomNumber3: ", input[0].randomNumber);
        input.forEach(element => {
            bodyObj.push({ userId: element.id, userMessage: element.message, category: 'Failed' });
        });
        Resolve(bodyObj)
        // bodyObj = [{ userId: input.id, userMessage: input.message, category: 'Failed' }];
        // makePostRequest('http://127.0.0.1:3004/data-tracker', bodyObj, input);
        } else {
logger.info('condition false set category to retried')
        console.log("randomNumber4: ", input[0].randomNumber);
        input.forEach(element => {
            bodyObj.push({ userId: element.id, userMessage: element.message, category: 'Retried' });
        });
        Resolve(bodyObj)
        // bodyObj = [{ userId: input.id, userMessage: input.message, category: 'Retried' }];
        // makePostRequest('http://127.0.0.1:3004/data-tracker', bodyObj, input);
        }
    }, 4000);




    // await setTimeout(dataPusher(input), 5000)
    }else{
logger.info('condition false set category to direct')
    console.log("randomNumber5: ", input[0].randomNumber);
    input.forEach(element => {
        bodyObj.push({ userId: element.id, userMessage: element.message, category: 'Direct' })
        Resolve(bodyObj)

    });
    // bodyObj = [{ userId: input.id, userMessage: input.message, category: 'Direct' }];
    // makePostRequest('http://127.0.0.1:3004/data-tracker', bodyObj, input);
        // await apiCall(input, 'Direct')
    }
});


bodyObjPromise.then(
    function(value) {
logger.info('making post request to track data api')
        makePostRequest('http://127.0.0.1:3004/data-tracker', value, input);
    }
);


}


async function makePostRequest(path, bodyObj, input) {

console.log("bodyobj: ", bodyObj);
// const user = await User.findById(input.id)
// console.log(user);
// const token = user.tokens[0].token
// console.log(token)
logger.info('setting header!')
const config = {
    headers: { 
    Authorization: `Bearer ${input[0].token}`,
    CorrelationId: uuidv4()
    }
};

logger.info('making post request using axios to track data api')
axios.post(path, bodyObj, config).then(
    (response) => {
        var result = response.data;
        // var messageId = result.result[0]._id
        // console.log("messageId", messageId);
        console.log("result", result);

        // input.messageId = messageId
    },
    (error) => {
        // console.log(error);
    }
);
}


module.exports = {fetchFromQueue}