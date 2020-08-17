const _ = require('lodash');
const JsonStore = require('./json-store');

const assessmentStore = {

  store: new JsonStore('./models/member-store.json', { assessments: [] }),
  collection: 'assessments',

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
}

module.exports = assessmentStore;