"use strict";

const logger = require("../utils/logger");
const accounts = require ('./accounts.js');
const memberStore = require("../models/member-store.js")
//const analytics = require("../utils/analytics.js")
const memberStats = require("../utils/member-stats.js")
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    let memberStats = memberStats.generateMemberStats(loggedInUser);
    const viewData = {
      title: "Dashboard",
      member: loggedInUser,
      analytics: memberStats
    };
    logger.info('about to render')
    response.render("dashboard", viewData);
  },
  
  addAssessment(request,response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newAssessment = {
      assessmentid: uuid.v1(),
      userid: loggedInUser.id,
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperarm: request.body.upperarm,
      waist: request.body.waist,
      hips: request.body.hips,
      trend: undefined,
      comment: request.body.comment,
      date: Date()
    };
    memberStore.addAssessment(loggedInUser.id,newAssessment);
    response.redirect("/dashboard");
  },
  
  deleteAssessment(request, response) {
    const memberId = accounts.getCurrentUser(request);
    const assessmentId = request.params.assessmentid;
    //logger.debug(`Deleting Song ${songId} from Playlist ${playlistId}`);
    memberStore.deleteAssessment(memberId.id, assessmentId);
    response.redirect("/dashboard");
  }
};


module.exports = dashboard;
