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
      assessment: memberStore.getAssessment(member.id,assessmentId)
    };
    logger.info(viewData);
    response.render("comment",viewData)
  },
  
  updateComment(request, response)
  {
    const memberId = request.params.id
    const member = memberStore.getMember(memberId)
    const assessmentId = request.params.assessmentid
    const comment = request.body.comment;
    logger.info("Comment = ",comment)
    memberStore.editComment(memberId,assessmentId,comment);
    response.redirect("/trainerdashboard");
  },
};

module.exports = comment;