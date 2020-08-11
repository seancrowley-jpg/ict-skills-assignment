"use strict";

const logger = require("../utils/logger");
const accounts = require ('./accounts.js');
const assessmentStore = require("../models/assessment-store.js")
const memberStore = require("../models/member-store.js")
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Dashboard",
      assessment: assessmentStore.getUserAssessments(loggedInUser.id),
      member: loggedInUser
    };
    logger.info('about to render')
    response.render("dashboard", viewData);
  },
  
  addAssessment(request,response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newAssessment = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperarm: request.body.upperarm,
      waist: request.body.waist,
      hips: request.body.hips,
    };
    assessmentStore.addAssessment(newAssessment);
    response.redirect("/dashboard");
  },
  
  deleteAssessment(request,response)
  {
    const assessmentId = request.params.id;
    assessmentStore.deleteAssessment(assessmentId);
    response.redirect("/dashboard");
  }
};


module.exports = dashboard;
