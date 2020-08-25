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
    const viewData = {
      member: members,
    };
    logger.info("about to render");
    response.render("trainerdashboard", viewData)
  },
  
  trainerAssessment(request, response) {
    logger.info("Rendering members assessments");
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
    var memberStats = analytics.generateMemberStats(member);
    const viewData = {
      title: "Trainer Dashboard",
      member: member,
      analytics: memberStats
    }
    logger.info("about to render")
    logger.info(member)
    response.render("trainerassessment", viewData)
  },
  
  deleteMember(request, response) {
    logger.info("Deleteing Member")
    const memberId = request.params.id;
    memberStore.deleteMember(memberId);
    response.redirect("/trainerdashboard")
  },
  
  updateComment(request,response)
  {
    logger.info("Editing Comment")
    const memberId = request.params.id;
    //const member = memberStore.getMember(memberId);
    const assessmentId = request.params.assessmentid;
    //const assessment = memberStore.getAssessment(memberId,assessmentId);
    const comment = request.body.comment;
    logger.info("Comment = ",comment)
    memberStore.editComment(assessmentId,comment)
    response.redirect("/trainerdashboard")
  }
};


module.exports = trainerdashboard;