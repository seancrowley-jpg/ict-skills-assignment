"use strict";

const logger = require("../utils/logger");
const accounts = require ('./accounts.js');
const memberStore = require("../models/member-store.js")
const analytics = require("../utils/analytics.js")
const uuid = require("uuid");

const trainerdashboard = {
  index (request, response) {
    logger.info("Trainer Dashboard rendering");
    const members = memberStore.getAllMembers();
    const assessmentId = request.params.assessmentid;
    const viewData = {
      members: members,
    };
    logger.info("about to render");
    response.render("trainerdashboard", viewData)
  },
  
  deleteMember(request, response) {
    logger.info("Deleteing Member")
    const memberId = request.params.id;
    memberStore.deleteMember(memberId);
    response.redirect("/trainerdashboard")
  },
  
  trainerAssessment(request, response) {
    logger.info("Rendering members assessments");
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
<<<<<<< HEAD
    const assessmentId = request.params.assessmentid;
<<<<<<< HEAD
    const assessments = member.assessments;
    let goal = member.goal;
=======
    const assessments = member.assessments
=======
>>>>>>> f2a6fade306a7311f91331912e24e0705d165c0e
>>>>>>> c9caa101a07ad725b37c6b52ed949523521df4eb
    var memberStats = analytics.generateMemberStats(member);
    const viewData = {
      title: "Trainer Dashboard",
      member: member,
<<<<<<< HEAD
      assessments: assessments,
=======
>>>>>>> f2a6fade306a7311f91331912e24e0705d165c0e
      analytics: memberStats
    }
    logger.info("about to render")
    if(assessments.length >= 1)
      {
        goal.status = memberStore.checkGoalStatus(member.id,goal);
        assessments[0].trend = memberStats.trend;
      }
    logger.info(assessments);
    response.render("trainerassessment", viewData)
  },
  
  
  setGoal(request, response) {
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
    let goal = {
      date: request.body.date,
      weight: Number(request.body.weight),
      chest: Number(request.body.chest),
      thigh: Number(request.body.thigh),
      upperarm: Number(request.body.upperarm),
      waist: Number(request.body.waist),
      hips: Number(request.body.hips),
      status: ""
    }
    memberStore.setGoal(member.id,goal);
    logger.info(member.goal);
    response.redirect("/trainerassessment/" + memberId);
  }
};


module.exports = trainerdashboard;