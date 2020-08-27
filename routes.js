"use strict";

const express = require("express");
const router = express.Router();

const accounts = require("./controllers/accounts.js");
const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const trainerdashboard = require("./controllers/trainerdashboard.js")
const settings = require("./controllers/settings.js")
const comment = require("./controllers/comment.js");

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get("/dashboard", dashboard.index);
router.post("/dashboard/addassessment", dashboard.addAssessment);
router.get("/dashboard/deleteassessment/:assessmentid", dashboard.deleteAssessment);

router.get("/trainerdashboard", trainerdashboard.index);
router.get("/trainerassessment/:id", trainerdashboard.trainerAssessment);
router.get("/trainerdashboard/deletemember/:id", trainerdashboard.deleteMember);
//router.post("/trainerassessment/:id/addcomment", trainerdashboard.updateComment);



router.get('/settings', settings.index);
router.post('/settings', settings.updateMember);


router.get("/about", about.index);



module.exports = router;
