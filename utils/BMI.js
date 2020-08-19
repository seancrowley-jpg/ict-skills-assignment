tsnoc
"use strcit";

const memberStore = require("../models/member-store.const BMI = {
  calculateBMI (member,weight)
  {
    if(member.height <= 0)
      return 0;
    else
      return Math.round(weight / (member.height * member.height));
  }
}