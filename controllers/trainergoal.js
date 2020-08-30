"use strict";

const logger = require("../utils/logger");
const accounts = require ('./accounts.js');
const memberStore = require("../models/member-store.js")
const analytics = require("../utils/analytics.js")
const uuid = require("uuid");

const goal = {
  index(request,response)
  {
    const memberId = request.params.id
    const member = memberStore.getMember(memberId)
    const viewData = {
      member: member,
    };
    logger.info(viewData);
    response.render("comment",viewData)
  },
  
    setGoal(request, response) {
    logger.info("Setting Goal");
    const memberId = request.params.id;
    const today = new Date();
    let goal = {
      date: today.toDateString(request.body.date),
      weight: Number(request.body.weight),
      chest: Number(request.body.chest),
      thigh: Number(request.body.thigh),
      upperarm: Number(request.body.upperarm),
      waist: Number(request.body.waist),
      hips: Number(request.body.hips),
    }
    memberStore.setGoal(memberId,goal);
    //logger.info(member.goal);
    response.redirect("/trainerdashboard");
  }
};

module.exports = goal;