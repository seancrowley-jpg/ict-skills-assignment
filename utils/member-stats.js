"use strict";

const memberStats = {
  bmi: undefined,
  bmiCategory: undefined,
  isidealbodyweight: undefined,
  trend: undefined,
  
  generateMemberStats(member)
  {
    const weight = member.startingweight;
    if(member.assessments.length > 0)
      {
        const assessment = member.assessments[member.assessments.length - 1].weight;
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

module.exports = memberStats;