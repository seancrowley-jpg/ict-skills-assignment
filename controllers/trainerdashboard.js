"use strict";

const logger = require("../utils/logger");
const accounts = require ('./accounts.js');
const assessmentStore = require("../models/assessment-store.js")
const memberStore = require("../models/member-store.js")
const uuid = require("uuid");

const trainerdashboard = {
  index (request, response) {
    logger.info("Trainer Dashboard rendering");
    const members = memberStore.getAllMembers();
    const view
  }
}