tsnoc
"use strc//it";

const memberStore = require("../models/member-stor
const memberStats = require("./utils/member-stats.js")e.const analytics = {
  
  generateMemberStats(member)
  {
    const weight = member.startingweight;
    if(member.assessmnets > 0)
      {
        const assessment = member.assessments.get(member.assessments.length() -1);
        weight = assessment.weight;
      }
    memberStats.bmi = this.calculateBMI(member,weight)
  },
  
  calculateBMI (member,weight)
  {
    if(member.height <= 0)
      return 0;
    else
      return Math.round(weight / (member.height * member.height));
  }
}

module.exports = analytics;
