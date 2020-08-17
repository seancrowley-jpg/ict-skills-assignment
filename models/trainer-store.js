'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const trainerStore = {
  store: new JsonStore('./models/trainer-store.json', { trainers: []}),
  collection: 'trainers',
  
  getTrainerByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  
  getTrainerByPassword(password) {
    return this.store.findOneBy(this.collection, { password: password });
  },
};

module.exports = trainerStore;