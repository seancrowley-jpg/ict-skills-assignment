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
    var memberStats = analytics.generateMemberStats(loggedInUser);
    const assessments = loggedInUser.assessments;
    const viewData = {
      title: "Dashboard",
      member: loggedInUser,
      analytics: memberStats,
      assessments: assessments
    };
    logger.info('about to render')
    logger.info(memberStats);
    //assessments.reverse();
    response.render("dashboard", viewData);
  },
  
  addAssessment(request,response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const memberStats = analytics.generateMemberStats(loggedInUser)
    const today = new Date();
    let newAssessment = {
      assessmentid: uuid.v1(),
      userid: loggedInUser.id,
      weight: Number(request.body.weight),
      chest: Number(request.body.chest),
      thigh: Number(request.body.thigh),
      upperarm: Number(request.body.upperarm),
      waist: Number(request.body.waist),
      hips: Number(request.body.hips),
      trend: Boolean(memberStats.trend),
      comment: "",
      date: today.toGMTString()
    };
    newAssessment.trend === memberStats.trend;
    memberStore.addAssessment(loggedInUser.id,newAssessment);
    logger.info(newAssessment)
    response.redirect("/dashboard");
  },
  
  deleteAssessment(request, response) {
    const member = accounts.getCurrentUser(request);
    const assessmentId = request.params.assessmentid;
    memberStore.deleteAssessment(member.id, assessmentId);
    response.redirect("/dashboard");
  }
};


module.exports = dashboard;
