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
    memberStats.bmi = this.calculateBMI(member,weight);
    memberStats.bmicategory = this.determineBMICategory(memberStats.bmi);
    return memberStats;
  },
  
  calculateBMI (member,weight)
  {
    if(member.height <= 0)
      return 0;
    else
      return Math.round((weight / (member.height * member.height)));
  },
  
  determineBMICategory (bmiValue) {
    let bmiCategory = " ";
    if ( bmiValue < 16 ) {
            bmiCategory = ("SEVERELY UNDERWEIGHT");
            return bmiCategory;
        } else if ( (bmiValue >= 16) && (bmiValue < 18.5) ) {
            bmiCategory = ("UNDERWEIGHT");
            return bmiCategory;
        } else if ( (bmiValue >= 18.5) && (bmiValue < 25) ) {
            bmiCategory = ("NORMAL");
            return bmiCategory;
        } else if ( (bmiValue >= 25) && (bmiValue < 30) ) {
            bmiCategory = ("OVERWEIGHT");
            return bmiCategory;
        } else if ( (bmiValue >= 30) && (bmiValue < 35) ) {
            bmiCategory = ("MODERATELY OBESE");
            return bmiCategory;
        } else if ( bmiValue >= 35 ) {
            bmiCategory = ("SEVERELY OBESE");
            return bmiCategory;
        } else return null;
  }
}

module.exports = analytics;
