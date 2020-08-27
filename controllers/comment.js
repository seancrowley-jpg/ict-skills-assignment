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
    const assessmentId = request.params.assessment.id
    logger.debug(`Editing assessment ${assessmentId} from Member ${memberId}`);
    const viewData = {
      member: memberStore.getMember(memberId),
      assessment: memberStore.getAssessment(memberId,assessmentId)
    };
    response.render("comment")
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