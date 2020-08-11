const _ = require('lodash');
const JsonStore = require('./json-store');

const assessmentStore = {

  store: new JsonStore('./models/assessment-store.json', { assessments: [] }),
  collection: 'assessments',

  getAllAssessments() {
    return this.store.findAll(this.collection);
  },

  getAssessment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  getMembersAssessments(memberid) {
  return this.store.findBy(this.collection, { memberid: memberid });
  },

  addAssessment(assessment) {
    this.store.add(this.collection, assessment);
    this.store.save();
  },

  deleteAssessment(id) {
    const assessment = this.getAssessment(id);
    this.store.remove(this.collection, assessment);
    this.store.save();
  },

  deleteAllAssessments() {
    this.store.removeAll(this.collection);
    this.store.save();
  }
}

module.exports = assessmentStore;