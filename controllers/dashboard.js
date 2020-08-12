"use strict";

const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store.js")
const memberStore = require("../models/member-store.js")
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("Dashboard Rendering");
    const viewData = {
      title: "Dashboard",
      assessment: assessmentStore.getAllAssessments(),
      member: memberStore.getAllMembers()
    };
    logger.info('about to render')
    response.render("dashboard", viewData);
  },
  
  addAssessment(request,response) {
    const newAssessment = {
      id: uuid.v1(),
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
