"use strict";

const logger = require("../utils/logger");
const accounts = require ('./accounts.js');
const memberStore = require("../models/member-store.js")
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Dashboard",
      member: loggedInUser
    };
    logger.info('about to render')
    response.render("dashboard", viewData);
  },
  
  addAssessment(request,response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newAssessment = {
      assessmentId: uuid.v1(),
      userid: loggedInUser.id,
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperarm: request.body.upperarm,
      waist: request.body.waist,
      hips: request.body.hips,
    };
    memberStore.addAssessment(loggedInUser.id,newAssessment);
    response.redirect("/dashboard");
  },
  
  deleteAssessment(request,response)
  {
    const loggedInUser = accounts.getCurrentUser(request);
    const assessmentId = request.params.assessmentid;
    memberStore.deleteAssessment(loggedInUser.id, assessmentId)
    response.redirect("/dashboard");
  }
};


module.exports = dashboard;
