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

const Inbound = async (req, res) => {
    try {
        const body = req.body
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
        if (!mappedNum.includes(body.to)) {
            return res.status(400).json({ message: "to parameter not found" })
        }
        if (body.text.toUpperCase().trim() === "STOP") {
            client.set("stop", `${body.to} ${body.from}`,
                {
                    EX: 4 * 60 * 60
                })
        }
        return res.status(200).json({ message: "inbound sms ok", error: "" })
    } catch (error) {
        res.status(500).json({ message: "An unexpected error occur", error: error })
    }
}

module.exports = Inbound