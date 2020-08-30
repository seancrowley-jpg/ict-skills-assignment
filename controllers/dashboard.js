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
    logger.info('about to render')
    logger.info(memberStats)
    //logger.info(loggedInUser.goal)
    //assessments.reverse();
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
      trend: analytics.trend,
      comment: "",
      date: today.toDateString()
    };
    //newAssessment.trend = memberStore.trend(loggedInUser)
    memberStore.addAssessment(loggedInUser.id,newAssessment);
    //logger.info(memberStore.trend);
    //logger.info(newAssessment)
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
    const today = new Date();
    let goal = {
      date: today.toDateString(request.body.date),
      weight: Number(request.body.weight),
      chest: Number(request.body.chest),
      thigh: Number(request.body.thigh),
      upperarm: Number(request.body.upperarm),
      waist: Number(request.body.waist),
      hips: Number(request.body.hips),
    }
    memberStore.setGoal(member.id,goal);
    logger.info(member.goal);
    response.redirect("/dashboard");
  }
};


module.exports = dashboard;
