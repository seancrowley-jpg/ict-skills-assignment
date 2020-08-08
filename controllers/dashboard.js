"use strict";

const logger = require("../utils/logger");
const assessments = require("../models/assessment-store.js")
const members = require("../modles/member-store.js")

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
};

module.exports = dashboard;
