const requestValidate = (body, schema) => {

const { error, value } = schema.validate(body);
console.log("errir: ", error)
console.log("value: ", value);

if(!error){return true}
else{return error}
}


module.exports = {requestValidate}