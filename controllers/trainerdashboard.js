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
<<<<<<< HEAD
    const assessmentId = request.params.assessmentid;
    const assessments = member.assessments
=======
>>>>>>> f2a6fade306a7311f91331912e24e0705d165c0e
    var memberStats = analytics.generateMemberStats(member);
    const viewData = {
      title: "Trainer Dashboard",
      member: member,
<<<<<<< HEAD
      assessments: assessments,
=======
>>>>>>> f2a6fade306a7311f91331912e24e0705d165c0e
      analytics: memberStats
    }
    logger.info("about to render")
    logger.info(assessments);
    response.render("trainerassessment", viewData)
  },
  
  /*
  updateComment(request, response)
  {
    const assessmentId = request.params.assessmentid;
    const userId =request.params.userid;
    const member = memberStore.getMember(userId);
    //const assessment = memberStore.getAssessment(memberId,assessmentId)
    //logger.info("Assessment",assessment)
    const comment = request.body.comment;
    //logger.debug("Updating Comment ${assessmentId} from Member ${memberId}");
    logger.info("Comment = ",comment)
    memberStore.editComment(assessmentId,comment);
    response.redirect("/trainerdashboard");
  },
  */
};


module.exports = trainerdashboard;