const amqp = require('amqplib');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
// const User = require('../models/user');
// const Message = require('../models/message');
const logger  = require('../logger/logger')


const fetchFromQueue = async() => {


logger.info('fetch from queue start!')
    var queue = 'dataValidator';
    
    
    const consumer = async(connection) => {
logger.info('creating channel!')

      var ok = connection.createChannel(on_open);
      function on_open(err, channel) {
        if (err != null) bail(err);
logger.info('assert Queue')

        channel.assertQueue(queue);
        channel.consume(queue, (message) => {
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
.connect('amqp://localhost',(err, connection) => {
  if (err != null) bail(err);
  consumer(connection);
});
    
}










const dataPusher = async(input) => {

bodyObj= []




let bodyObjPromise = new Promise((Resolve, Reject) => {
    logger.info('creating body obj by checking condition to push to track api!')

    if ((input[0].randomNumber % 10) == 0) {
logger.info('condition true genrating random number')
    console.log("randomNumber1: ", input[0].randomNumber);
   
    input[0].randomNumber = Math.floor(Math.random() * (60 - 1 + 1) + 1)
    console.log("randomNumber2: ", input[0].randomNumber);




    setTimeout(() => {
        if ((input[0].randomNumber % 10) == 0) {
logger.info('condition true set category to failed')
        console.log("randomNumber3: ", input[0].randomNumber);
        input.forEach(element => {
            bodyObj.push({ userId: element.id, userMessage: element.message, category: 'Failed' });
        });
        Resolve(bodyObj)
        } else {
logger.info('condition false set category to retried')
        console.log("randomNumber4: ", input[0].randomNumber);
        input.forEach(element => {
            bodyObj.push({ userId: element.id, userMessage: element.message, category: 'Retried' });
        });
        Resolve(bodyObj)
        }
    }, 4000);




    }else{
logger.info('condition false set category to direct')
    console.log("randomNumber5: ", input[0].randomNumber);
    input.forEach(element => {
        bodyObj.push({ userId: element.id, userMessage: element.message, category: 'Direct' })
        Resolve(bodyObj)

    });
    }
});


bodyObjPromise.then(
    (value) => {
logger.info('making post request to track data api')
        makePostRequest('http://127.0.0.1:3004/data-tracker', value, input);
    }
);


}


const makePostRequest = async(path, bodyObj, input) => {

console.log("bodyobj: ", bodyObj);
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
        console.log("result", result);

    },
    (error) => {
    }
);
}


module.exports = {fetchFromQueue}