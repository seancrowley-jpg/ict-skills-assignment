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
  
  trainerAssessment(request, response) {
    logger.info("Rendering members assessments");
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
    //const assessmentId = request.params.assessmentid;
    var memberStats = analytics.generateMemberStats(member);
    const viewData = {
      title: "Trainer Dashboard",
      member: member,
      assessment: memberStore.getUserAssessments(memberId),
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
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    const assessment = memberStore.getAssessment(memberId, assessmentId)
    logger.info("Assessment",assessment)
    const comment = request.body.comment;
    logger.debug("Updating Comment ${assessmentId} from Member ${memberId}");
    memberStore.editComment(assessment,comment);
    response.redirect("/trainerdashboard");
    
  }
};


module.exports = trainerdashboard;