const express = require("express");

const router = express.Router();
const {generateShortUrl,getRedirectUrl,getUrlAnalytics} = require("../controller/url");

router.post("/",generateShortUrl);
router.get("/:shortId",getRedirectUrl);
router.get("/analytics/:shortId",getUrlAnalytics);

module.exports = router;