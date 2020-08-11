"use strict";

const express = require("express");
const router = express.Router();
const accounts = require(".")
const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get("/dashboard", dashboard.index);
router.post("/dashboard/addassessment", dashboard.addAssessment);
router.get("/dashboard/deleteassessment/:id", dashboard.deleteAssessment);

router.get("/about", about.index);



module.exports = router;
