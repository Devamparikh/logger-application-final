const amqp = require('amqplib');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const Message = require('../models/message');



require('amqplib/callback_api')
.connect('amqp://localhost', function(err, connection) {
  if (err != null) bail(err);
  consumer(connection);
});



var queue = 'dataValidator';


function consumer(connection) {
  var ok = connection.createChannel(on_open);
  function on_open(err, channel) {
    if (err != null) bail(err);
    channel.assertQueue(queue);
    channel.consume(queue, function(message) {
      if (message !== null) {
        console.log(message.content.toString());
        input = JSON.parse(message.content.toString())
        console.log("input: ", input);
        dataPusher(input)
        channel.ack(message);


      }
    });
  }
}



async function findCategory(messageId) {
  const message = await Message.findById(messageId)
  if(!message) {
      return null
  }
  return message.category
}






// let myPromise = new Promise(function(Resolve, Reject) {
//   let x = 0;

// // The producing code (this may take some time)

//   if (x == 0) {
//     Resolve("OK");
//   } else {
//     Reject("Error");
//   }
// });

// myPromise.then(
//   function(value) {myDisplayer(value);},
//   function(error) {myDisplayer(error);}
// );











// dataPusher(input)


async function dataPusher(input) {
  // if (await findCategory(input.messageId) == 'Retried') {
  //   bodyObj = [{ userId: input.id, userMessage: input.message, category: 'Failed' }];
  //   makePostRequest('http://127.0.0.1:3000/data-tracker', bodyObj, input);
  //     // await apiCall(input, 'Failed')
  // }else{}

  bodyObj= []




  let bodyObjPromise = new Promise(function(Resolve, Reject) {
  
    if ((input[0].randomNumber % 10) == 0) {
      console.log("randomNumber1: ", input[0].randomNumber);
      // bodyObj = [{ userId: input.id, userMessage: input.message, category: 'Retried' }];
      // makePostRequest('http://127.0.0.1:3004/data-tracker', bodyObj, input);
      // apiCall(input, 'Retried')
      input[0].randomNumber = Math.floor(Math.random() * (60 - 1 + 1) + 1)
      // input[0].randomNumber = 10
      console.log("randomNumber2: ", input[0].randomNumber);
  
  
  
  
      setTimeout(() => {
        if ((input[0].randomNumber % 10) == 0) {
          console.log("randomNumber3: ", input[0].randomNumber);
          input.forEach(element => {
            bodyObj.push({ userId: element.id, userMessage: element.message, category: 'Failed' });
          });
          Resolve(bodyObj)
          // bodyObj = [{ userId: input.id, userMessage: input.message, category: 'Failed' }];
          // makePostRequest('http://127.0.0.1:3004/data-tracker', bodyObj, input);
        } else {
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
    function(value) {makePostRequest('http://127.0.0.1:3004/data-tracker', value, input);}
  );








  // if ((input[0].randomNumber % 10) == 0) {
  //   console.log("randomNumber1: ", input[0].randomNumber);
  //   // bodyObj = [{ userId: input.id, userMessage: input.message, category: 'Retried' }];
  //   // makePostRequest('http://127.0.0.1:3004/data-tracker', bodyObj, input);
  //   // apiCall(input, 'Retried')
  //   input[0].randomNumber = Math.floor(Math.random() * (60 - 1 + 1) + 1)
  //   // input[0].randomNumber = 10
  //   console.log("randomNumber2: ", input[0].randomNumber);




  //   setTimeout(() => {
  //     if ((input[0].randomNumber % 10) == 0) {
  //       console.log("randomNumber3: ", input[0].randomNumber);
  //       input.forEach(element => {
  //         bodyObj.push({ userId: element.id, userMessage: element.message, category: 'Failed' });
  //       });
  //       // bodyObj = [{ userId: input.id, userMessage: input.message, category: 'Failed' }];
  //       // makePostRequest('http://127.0.0.1:3004/data-tracker', bodyObj, input);
  //     } else {
  //       console.log("randomNumber4: ", input[0].randomNumber);
  //       input.forEach(element => {
  //         bodyObj.push({ userId: element.id, userMessage: element.message, category: 'Retried' });
  //       });
  //       // bodyObj = [{ userId: input.id, userMessage: input.message, category: 'Retried' }];
  //       // makePostRequest('http://127.0.0.1:3004/data-tracker', bodyObj, input);
  //     }
  //   }, 4000);




  //   // await setTimeout(dataPusher(input), 5000)
  // }else{
  //   console.log("randomNumber5: ", input[0].randomNumber);
  //   input.forEach(element => {
  //     bodyObj.push({ userId: element.id, userMessage: element.message, category: 'Direct' })
  //   });
  //   // bodyObj = [{ userId: input.id, userMessage: input.message, category: 'Direct' }];
  //   // makePostRequest('http://127.0.0.1:3004/data-tracker', bodyObj, input);
  //     // await apiCall(input, 'Direct')
  // }
  // console.log("bodyobj: ", bodyObj);
  
  
  // if(bodyObj == ''){
    
  //   setTimeout(() => {
  //     makePostRequest('http://127.0.0.1:3004/data-tracker', bodyObj, input);
  //   }, 5000);
  // }else{
  //   makePostRequest('http://127.0.0.1:3004/data-tracker', bodyObj, input);
  // }
  
  
}





// bodyObj = [{ userId: input.id, userMessage: input.message, category: 'Direct' }];
// makePostRequest('http://127.0.0.1:3000/data-tracker', bodyObj, input);



async function makePostRequest(path, bodyObj, input) {

  console.log("bodyobj: ", bodyObj);
  // const user = await User.findById(input.id)
  // console.log(user);
  // const token = user.tokens[0].token
  // console.log(token)
  const config = {
    headers: { 
      Authorization: `Bearer ${input[0].token}`,
      CorrelationId: uuidv4()
    }
  };


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



// await console.log(please);

// var input = '';
// (async () => {
// 	const connection = await amqp.connect('amqp://localhost:5672')
//     const channel = await connection.createChannel()
//     QUEUE = 'dataValidator'

//     const result = await channel.assertQueue(QUEUE)
//     const unknown = await channel.consume(QUEUE, message => {
//         // console.log(message);
//     input = JSON.parse(message.content.toString())
//     // if((input.randomNumber % 10) == 0)
//     // console.log(input)
// })
// // console.log(input)

// // console.log(unknown);
// })();
// console.log(input);