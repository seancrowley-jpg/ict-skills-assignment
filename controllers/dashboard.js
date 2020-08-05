"use strict";

const logger = require("../utils/logger");
const assessments = {
  weight: "70",
  chest: "30",
  thigh: "40",
  upperarm: "20",
  waist: "50",
  hips: "40",
  trend: "false"
}

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
