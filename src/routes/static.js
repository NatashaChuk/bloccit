const express = require("express");
const router = express.Router();
const staticController = require("../controllers/staticController");

router.get("/", staticController.index);

router.get("/macro", (req, res, body) => {
	res.send("polo")
});

router.get("/about", staticController.about);


module.exports = router;