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
  
  checkGoalStatus(id,goal,date)
  {
    const member = this.getMember(id);
    const assessment = member.assessments[0];
    const today = new Date();
    const now = today.toLocaleDateString();
    member.goal = goal;
    let status = "";
    goal.status = status;
    if(date > now)
      {
        status = ("Missed");
        return status;
      } else if (date < now) {
        status = ("Open");
        return status;
      } else if ((date < now) && 
                 (assessment.weight === goal.weight) && 
                 (assessment.chest === goal.chest) && 
                 (assessment.thigh === goal.thigh) && 
                 (assessment.upperarm === goal.upperarm) &&
                 (assessment.waist === goal.waist) &&
                 (assessment.hips === goal.hips))
        {
          status = ("Achieved")
          return status;
        }
    logger.info(date)
  },
};


module.exports = memberStore;