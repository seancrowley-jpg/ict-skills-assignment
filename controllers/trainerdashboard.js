"use strict";

const logger = require("../utils/logger");
const accounts = require ('./accounts.js');
const assessmentStore = require("../models/assessment-store.js")
const memberStore = require("../models/member-store.js")
const uuid = require("uuid");

const trainerdashboard = {
  index (request, response) {
    logger.info("Trainer Dashboard rendering");
    const memberId = request.params.id;
    const members = memberStore.getAllMembers();
    const assessments = assessmentStore.getUserAssessments(memberId);
    const viewData = {
      member: members,
      assessment: assessments
    };
    logger.info("about to render");
    response.render("trainerdashboard", viewData)
  },
  
  trainerAssessment(request, response) {
    logger.info("Rendering members assessments");
    const memberId = request.params.id;
    const member = memberStore.getMemberById(memberId);
    const viewData = {
      member: member,
      assessment: assessmentStore.getUserAssessments(member.id)
    }
    logger.info("about to render")
    response.render("trainerassessment", viewData)
  },
  
  deleteMember(request, response) {
    logger.info("Deleteing Member")
    const memberId = request.params.id;
    memberStore.deleteMember(memberId);
    response.redirect("/trainerdashboard")
  }
};


module.exports = trainerdashboard;