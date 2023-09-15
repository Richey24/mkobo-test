const { Account, Phone_Number } = require("./model/model")

const account = [
    {
        id: 1,
        number: "4924195509198",
        account_id: "1",
    },
    {
        id: 2,
        number: "4924195509196",
        account_id: "1",
    },
    {
        id: 3,
        number: "4924195509197",
        account_id: "1",
    },
    {
        id: 4,
        number: "4924195509195",
        account_id: "1",
    },
    {
        id: 5,
        number: "4924195509049",
        account_id: "1",
    },
    {
        id: 6,
        number: "4924195509012",
        account_id: "1",
    },
    {
        id: 7,
        number: "4924195509193",
        account_id: "1",
    },
    {
        id: 8,
        number: "4924195509029",
        account_id: "1",
    },
    {
        id: 9,
        number: "4924195509192",
        account_id: "1",
    },
    {
        id: 10,
        number: "4924195509194",
        account_id: "1",
    },
    {
        id: 11,
        number: "31297728125",
        account_id: "1",
    },
    {
        id: 12,
        number: "3253280312",
        account_id: "1",
    },
    {
        id: 13,
        number: "3253280311",
        account_id: "1",
    },
    {
        id: 14,
        number: "3253280315",
        account_id: "1",
    },
    {
        id: 15,
        number: "3253280313",
        account_id: "1",
    },
    {
        id: 16,
        number: "3253280329",
        account_id: "1",
    },
    {
        id: 17,
        number: "441224459508",
        account_id: "1",
    },
    {
        id: 18,
        number: "441224980086",
        account_id: "1",
    },
    {
        id: 19,
        number: "441224980087",
        account_id: "1",
    },
    {
        id: 20,
        number: "441224980096",
        account_id: "1",
    },
    {
        id: 21,
        number: "441224980098",
        account_id: "1",
    },
    {
        id: 22,
        number: "441224980099",
        account_id: "1",
    },
]

const inputData = () => {
    account.forEach(async (acc) => {
        const obj = await Phone_Number.create({ id: acc.id, number: acc.number, account_id: acc.account_id })
        console.log(obj.username);
    })
}

module.exports = inputData