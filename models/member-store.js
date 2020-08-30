'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require("../utils/logger");

const memberStore = {
  store: new JsonStore('./models/member-store.json', { members: [] }),
  collection: 'members' ,
  
  getAllMembers() {
    return this.store.findAll(this.collection);
  },

  getMember(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  getMemberByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  
  getMemberByPassword(password) {
    return this.store.findOneBy(this.collection, { password: password });
  },

  addMember(member) {
    this.store.add(this.collection, member);
    this.store.save();
  },

  deleteMember(id) {
    const member = this.getMember(id);
    this.store.remove(this.collection, member);
    this.store.save();
  },
  
  
  getAssessment(id, assessmentId) {
    const member = this.store.findOneBy(this.collection, { id: id });
    const assessments = member.assessments.filter(assessment => assessment.assessmentid == assessmentId);
    return assessments[0];
  },
  
  
  getUserAssessments(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  
  addAssessment(id, assessment) {
    const member = this.getMember(id);
    member.assessments.splice(0,0,assessment);
    this.store.save();
  },
  
  deleteAssessment(id, assessmentid) {
    const member = this.getMember(id);
    const assessments = member.assessments;
    _.remove(assessments, { assessmentid: assessmentid });
    this.store.save();
  },
  
  updateMember(member,updatedMember)
  {
    member.email = updatedMember.email;
    member.password = updatedMember.password;
    member.name = updatedMember.name;
    member.address = updatedMember.address;
    member.gender = updatedMember.gender;
    member.height = updatedMember.height;
    member.startingweight = updatedMember.startingweight;
    
    this.store.save();
  },
  
  editComment(userid,assessmentId,comment)
  {
    const assessment = this.getAssessment(userid,assessmentId)
    assessment.comment = comment;
    logger.info("Comment =",comment)
    this.store.save()
  },
  /*
  trend(member)
  {
    let trend = true;
    if (member.assessments.length >1) {
      trend = member.assessments[1].weight > member.assessments[0].weight;
    }
    return trend;
  }
  */
  
  setGoal(id,goal){
    const member = this.getMember(id);
    member.goal = goal;
    this.store.save();
  },
  
  checkGoalStatus(id,goal)
  {
    const member = this.getMember(id);
    let status = "";
    let date = goal.date
    goal.status = status;
    if(date < member.assessments[0].date)
      {
        status = ("Missed");
        return status;
      } else if ((date >= member.assessments[0].date)  && 
                 (member.assessments[0].weight != goal.weight) && 
                 (member.assessments[0].chest != goal.chest) && 
                 (member.assessments[0].thigh != goal.thigh) && 
                 (member.assessments[0].upperarm != goal.upperarm) &&
                 (member.assessments[0].waist != goal.waist) &&
                 (member.assessments[0].hips != goal.hips))  {
        status = ("Open");
        return status;
      } else if ((date >= member.assessments[0].date) && 
                 (member.assessments[0].weight == goal.weight) && 
                 (member.assessments[0].chest == goal.chest) && 
                 (member.assessments[0].thigh == goal.thigh) && 
                 (member.assessments[0].upperarm == goal.upperarm) &&
                 (member.assessments[0].waist == goal.waist) &&
                 (member.assessments[0].hips == goal.hips)) 
      {
        status = ("Achieved");
        return status;
      } 
    logger.info(date)
  },
};


module.exports = memberStore;