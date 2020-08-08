"use strict";

const logger = require("../utils/logger");
const assessments = require("../models/assessment-store.js")

const dashboard = {
  index(request, response) {
    logger.info("Dashboard Rendering");
    const viewData = {
      title: "Dashboard",
      assessment: assessments
    };
    logger.info('about to render', assessments)
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;
