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
  
  getAssessment(memberid,assessmentid) {
    const member =  this.getMember(memberid);
    const assessment = member.assessments.filter(assessment => assessment.assessmentid == assessmentid);
    return assessment;
    
  },
  
  getUserAssessments(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  
  addAssessment(id, assessment) {
    const member = this.getMember(id);
    member.assessments.push(assessment);
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
  
  editComment(assessment,comment)
  {

    //const assessment =  this.getAssessment(memberid,assessmentId);
    assessment.comment = comment;
    logger.info("Assessment = ",assessment);
    this.store.save();
  }
};


module.exports = memberStore;