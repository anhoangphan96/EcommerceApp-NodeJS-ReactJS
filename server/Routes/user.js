const express = require("express");
const router = express.Router();
const userControllers = require("../Controllers/user");

router.post("/access", userControllers.userAcessClient);

module.exports = router;
