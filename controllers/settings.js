"use strict"

const logger = require("../utils/logger");
const accounts = require ('./accounts.js');
const memberStore = require("../models/member-store.js")
const analytics = require("../utils/analytics.js")
const uuid = require("uuid");

const settings = {
  
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Settings',
      member: loggedInUser
    };
    logger.info(loggedInUser);
    response.render('settings', viewData);
  },
  
  updateMember(request,response) {
    const memberId = request.params.id;
    const member = accounts.getCurrentUser(request);
    const updatedMember = {
      email: request.body.email,
      password: request.body.password,
      name: request.body.name,
      address: request.body.address,
      gender: request.body.gender,
      height: request.body.height,
      startingWeight: request.body.startingweight
    }
    logger.info(member);
    memberStore.updateMember(member,updatedMember)
    response.redirect('/dashboard')
  }
};

module.exports = settings;