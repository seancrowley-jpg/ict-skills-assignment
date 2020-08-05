'use strict';

const logger = require('../utils/logger');

const assessment1 = {
  weight: "70",
  chest: "30",
  thigh: "40",
  upperarm: "20",
  waist: "50",
  hips: "40",
  trend: "false"
}

const assessment2 = {
  weight: "80",
  chest: "35",
  thigh: "42",
  upperarm: "28",
  waist: "55",
  hips: "45",
  trend: "true"
}

const assessments = [assessment1, assessment2];
module.exports = assessments;