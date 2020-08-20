"use strict";

var analytics = {
  
  
  generateMemberStats(member)
  {
    const memberStats = require("../utils/member-stats.js")
    let weight = member.startingweight;
    if(member.assessments.length > 0)
      {
        weight = member.assessments[member.assessments.length - 1].weight;
      }
    memberStats.bmi = this.calculateBMI(member,weight)
    return memberStats;
  },
  
  calculateBMI (member,weight)
  {
    if(member.height <= 0)
      return 0;
    else
      return (weight / (member.height * member.height));
  }
}

module.exports = analytics;
