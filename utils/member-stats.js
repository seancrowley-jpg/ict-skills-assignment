"use strict";

var memberStats = {
  bmi: 0,
  bmiCategory: undefined,
  isidealbodyweight: undefined,
  trend: undefined,
  
  generateMemberStats(member)
  {
    var weight = member.startingweight;
    if(member.assessments.length > 0)
      {
        weight = member.assessments[member.assessments.length - 1].weight;
      }
    memberStats.bmi = this.calculateBMI(member,weight)
    return memberStats.bmi;
  },
  
  calculateBMI (member,weight)
  {
    if(member.height <= 0)
      return 0;
    else
      return (weight / (member.height * member.height));
  }
}

module.exports = memberStats;