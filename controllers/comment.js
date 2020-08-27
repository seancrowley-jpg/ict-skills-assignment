"use strict";

const logger = require("../utils/logger");
const accounts = require ('./accounts.js');
const memberStore = require("../models/member-store.js")
const analytics = require("../utils/analytics.js")
const uuid = require("uuid");

const comment = {
  index(request,response)
  {
    const memberId = request.params.id
    const member = memberStore.getMember(memberId)
    const assessmentId = request.params.assessmentid
    logger.debug(`Editing assessment ${assessmentId} from Member ${memberId}`);
    const viewData = {
      member: member,
      assessment: member.assessments
    };
    logger.info(viewData)
    response.render("comment",viewData)
  },
  
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
};

module.exports = comment;