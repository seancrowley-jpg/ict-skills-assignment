"use strict";

const logger = require("../utils/logger");
const accounts = require ('./accounts.js');
const memberStore = require("../models/member-store.js")
const analytics = require("../utils/analytics.js")
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const memberStats = analytics.generateMemberStats(loggedInUser);
    const assessments = loggedInUser.assessments;
    const viewData = {
      title: "Dashboard",
      member: loggedInUser,
      analytics: memberStats,
      assessments: assessments
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
