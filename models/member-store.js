'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const memberStore = {
  store: new JsonStore('./models/member-store.json', { members: [] }),
  collection: 'members',
  
  getAllMembers() {
    return this.store.findAll(this.collection);
  },

  getMembers(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addMember(member) {
    this.store.add(this.collection, member);
    this.store.save();
  },

  deleteMember(id) {
    const member = this.getAssessment(id);
    this.store.remove(this.collection, member);
    this.store.save();
  },

  deleteAllMembers() {
    this.store.removeAll(this.collection);
    this.store.save();
  }
}


module.exports = memberStore;