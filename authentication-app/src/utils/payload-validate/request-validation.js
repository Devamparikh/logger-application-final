const requestValidate = (body, schema) => {

const { error, value } = schema.validate({ username: body.username, password: body.password });
console.log("errir: ", error)
console.log("value: ", value);

if(!error){return true}
else{return error}
}


module.exports = {requestValidate}