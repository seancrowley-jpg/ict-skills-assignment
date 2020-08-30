"use strict";

const logger = require("../utils/logger");
const accounts = require ('./accounts.js');
const memberStore = require("../models/member-store.js")
const analytics = require("../utils/analytics.js")
const uuid = require("uuid");

const trainerdashboard = {
  index (request, response) {
    logger.info("Trainer Dashboard rendering");
    const members = memberStore.getAllMembers();
    const assessmentId = request.params.assessmentid;
    const viewData = {
      member: members,
    };
    logger.info("about to render");
    response.render("trainerdashboard", viewData)
  },
  
  deleteMember(request, response) {
    logger.info("Deleteing Member")
    const memberId = request.params.id;
    memberStore.deleteMember(memberId);
    response.redirect("/trainerdashboard")
  },
  
  trainerAssessment(request, response) {
    logger.info("Rendering members assessments");
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
    const assessmentId = request.params.assessmentid;
    const assessments = member.assessments
    var memberStats = analytics.generateMemberStats(member);
    const viewData = {
      title: "Trainer Dashboard",
      member: member,
      assessments: assessments,
      analytics: memberStats
    }
    logger.info("about to render")
    logger.info(assessments);
    response.render("trainerassessment", viewData)
  },
  
  setGoal(request, response) {
    const memberId = request.param('id');
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
    memberStore.setGoal(memberId,goal);
    //logger.info(member.goal);
    response.redirect("/dashboard");
  }
};


module.exports = trainerdashboard;