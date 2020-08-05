"use strict";

const logger = require("../utils/logger");
const assessments = require("./models/assesment-store");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "Dashboard",
    };
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;
