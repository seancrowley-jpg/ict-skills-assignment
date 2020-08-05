"use strict";

const logger = require("../utils/logger");
const assessments = require("./models/assessment-store");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Dashboard",
      assessment: assessments
    };
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;
