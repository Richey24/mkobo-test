const express = require("express");
const Inbound = require("../controllers/Inbound");
const Outbound = require("../controllers/Outbound");

const router = express.Router()

router.post("/inbound/sms", Inbound)
router.post("/outbound/sms", Outbound)

module.exports = router