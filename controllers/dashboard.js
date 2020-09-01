"use strict";

const logger = require("../utils/logger");
const accounts = require ('./accounts.js');
const memberStore = require("../models/member-store.js")
const analytics = require("../utils/analytics.js")
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
<<<<<<< HEAD
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const memberStats = analytics.generateMemberStats(loggedInUser);
    const assessments = loggedInUser.assessments;
    const viewData = {
      title: "Dashboard",
<<<<<<< HEAD
      member: loggedInUser,
<<<<<<< HEAD
      analytics: memberStats,
      assessments: assessments
=======
      analytics: memberStats
=======
      member: loggedInUser
=======
    logger.info("Dashboard Rendering");
    const viewData = {
      title: "Dashboard",
      assessment: assessmentStore.getAllAssessments(),
      member: memberStore.getAllMembers()
>>>>>>> 9e628b977f0ecc84d7fcede57d775626c3ab1d50
>>>>>>> bb5ffe3cd9566a44b1b8e92a8eab3e25f778cc81
>>>>>>> f2a6fade306a7311f91331912e24e0705d165c0e
    };
    let goal = loggedInUser.goal;
    if(assessments.length >= 1)
      {
        goal.status = memberStore.checkGoalStatus(loggedInUser.id,goal);
        assessments[0].trend = memberStats.trend;
      }
    logger.info(memberStats)
    response.render("dashboard", viewData);
  },
  
  addAssessment(request,response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const memberStats = analytics.generateMemberStats(loggedInUser);
    const today = new Date();
    const newAssessment = {
      assessmentid: uuid.v1(),
      userid: loggedInUser.id,
      weight: Number(request.body.weight),
      chest: Number(request.body.chest),
      thigh: Number(request.body.thigh),
      upperarm: Number(request.body.upperarm),
      waist: Number(request.body.waist),
      hips: Number(request.body.hips),
      trend: memberStats.trend,
      comment: "",
      date: today.toLocaleDateString()
    };
    memberStore.addAssessment(loggedInUser.id,newAssessment);
    response.redirect("/dashboard");
  },
  
  deleteAssessment(request, response) {
    const member = accounts.getCurrentUser(request);
    const assessmentId = request.params.assessmentid;
    memberStore.deleteAssessment(member.id, assessmentId);
    response.redirect("/dashboard");
  },
  
  setGoal(request, response) {
    const member = accounts.getCurrentUser(request);
    let goal = {
      date: request.body.date,
      weight: Number(request.body.weight),
      chest: Number(request.body.chest),
      thigh: Number(request.body.thigh),
      upperarm: Number(request.body.upperarm),
      waist: Number(request.body.waist),
      hips: Number(request.body.hips),
      status: "",
    }
    memberStore.setGoal(member.id,goal);
    response.redirect("/dashboard");
  }
};


module.exports = dashboard;
