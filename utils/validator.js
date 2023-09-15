const { object, number, string } = require("yup")

const inputValidator = object({
    from: string("Must be a string").required("Required from").min(6).max(16),
    to: string("Must be a string").required("Required to").min(6).max(16),
    text: string("Must be a string").required("Required text").min(1).max(20),
})

module.exports = inputValidator