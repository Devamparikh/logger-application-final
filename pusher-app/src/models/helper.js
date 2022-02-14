const client = require('../db/redis')

const incrementRequestCounter = async (userKey) => {
    await client.json.NUMINCRBY(userKey, ".requestCounter", 1);
    const value = await client.json.get(userKey)
    console.log("value: ", value)
}

module.exports = {incrementRequestCounter}