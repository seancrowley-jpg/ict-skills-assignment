"use strict";

const logger = require("../utils/logger");
const assessments = require("../models/assessment-store.js")
const members = require("../models/member-store.js")

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Dashboard",
      assessment: assessments,
      member: members
    };
    logger.info('about to render', assessments)
    response.render("dashboard", viewData);
  },
  
  addAssessment(request,response) {
    const newAssessment = {
      id: uuid(),
      weight: request.body.weight,
      chest: request.body.chest,
    }
  }
};


module.exports = dashboard;
