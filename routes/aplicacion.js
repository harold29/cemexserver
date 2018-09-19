'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());

/**
 * GET /api/ili/appVersion
 *
 */
router.get('/appVersion', (req, res, next) => {
    res.json({"version" : "0.0.8"});
});

module.exports = router;
