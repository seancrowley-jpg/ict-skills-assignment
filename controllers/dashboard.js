"use strict";

const logger = require("../utils/logger");
const accounts = require ('./accounts.js');
const memberStore = require("../models/member-store.js")
const analytics = require("../utils/analytics.js")
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
<<<<<<< HEAD
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    var memberStats = analytics.generateMemberStats(loggedInUser);
    const viewData = {
      title: "Dashboard",
<<<<<<< HEAD
      member: loggedInUser,
      analytics: memberStats
=======
      member: loggedInUser
=======
    logger.info("Dashboard Rendering");
    const viewData = {
      title: "Dashboard",
      assessment: assessmentStore.getAllAssessments(),
      member: memberStore.getAllMembers()
>>>>>>> 9e628b977f0ecc84d7fcede57d775626c3ab1d50
>>>>>>> bb5ffe3cd9566a44b1b8e92a8eab3e25f778cc81
    };
    logger.info('about to render')
    logger.info(memberStats);
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
