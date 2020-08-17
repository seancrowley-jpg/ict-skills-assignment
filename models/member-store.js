'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const memberStore = {
  store: new JsonStore('./models/member-store.json', { members: [] }),
  collection: 'members' ,
  
  getAllMembers() {
    return this.store.findAll(this.collection);
  },

  getMemberById(id) {
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
    const member = this.getMemberById(id);
    this.store.remove(this.collection, member);
    this.store.save();
  },
  
    getAllAssessments() {
    return this.store.findAll(this.collection);
  },

  getAssessment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  getUserAssessments(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  
  addAssessment(assessment) {
    this.store.add(this.collection, assessment);
    this.store.save();
  },

  deleteAssessment(id) {
    const assessment = this.getAssessment(id);
    this.store.remove(this.collection, assessment);
    this.store.save();
  }
};


module.exports = memberStore;