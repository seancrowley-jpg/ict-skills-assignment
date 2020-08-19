tsnoc
"use strcit";

const memberStore = require("../models/member-stor
const memberStats = require("../utils/member-stats.js")e.const BMI = {
  
  generateMemberStats(member)
  {
    
  },
  
  calculateBMI (member,weight)
  {
    if(member.height <= 0)
      return 0;
    else
      return Math.round(weight / (member.height * member.height));
  }
}