const { Account, Phone_Number } = require("../model/model")
const inputValidator = require("../utils/validator")
const { createClient } = require("redis")

const client = createClient({
    password: 'kvJuVTT2sSiBBvS6MuMJhVUnkBfUzcVE',
    socket: {
        host: 'redis-15022.c56.east-us.azure.cloud.redislabs.com',
        port: 15022
    }
});

client.on('error', err => console.log('Redis Client Error', err));

(async () => {
    await client.connect();
})()

const Outbound = async (req, res) => {
    const body = req.body
    const limitNum = await client.get(body.from.toString())
    console.log(limitNum);
    if (limitNum && limitNum > 50) {
        res.status(401).json({ message: "", error: `limit reach for from ${body.from}` })
    }
    const account = await Account.findOne({
        where: {
            username: body.username,
            auth_id: body.auth_id
        }
    })
    if (!account) {
        return res.status(403).json({ message: "No User Fond With That Credential" })
    }
    await inputValidator
        .validate(body)
        .catch((err) => {
            console.log(err);
            return res.status(400).json({ message: err })
        })
    const phone_number = await Phone_Number.findAll({
        where: {
            account_id: account.id
        }
    })
    const mappedNum = phone_number.map((phone) => phone.dataValues.number.trim())
    if (!mappedNum.includes(body.from)) {
        return res.status(400).json({ message: "from parameter not found" })
    }
    const stopObj = await client.get("stop")
    if (stopObj && (stopObj.split(" ")[1] === body.from || stopObj.split(" ")[0] === body.to)) {
        return res.status(400).json({ message: "", error: `sms from ${stopObj.from} to ${stopObj.to} blocked by STOP request` })
    }
    if (limitNum) {
        client.set(body.from.toString(), Number(limitNum) + 1)
    } else {
        client.set(body.from.toString(), 1)
    }
    return res.status(200).json({ message: "outbound sms ok", error: "" })
}

module.exports = Outbound