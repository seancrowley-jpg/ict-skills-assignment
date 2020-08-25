"use strict"

settings(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Settings',
      member: loggedInUser
    };
    response.render('settings', viewData);
  },
  
  updateAccount(request,response) {
    const memberId = request.params.id;
    const member = memberstore.getMember(memberId)
    const updatedMember = {
      email: request.body.email,
      password: request.body.password,
      name: request.body.name,
      address: request.body.address,
      gender: request.body.gender,
      height: request.body.height,
      startingWeight: request.body.startingweight
    }
    memberstore.updateMember(member,updatedMember)
    response.redirect('/dashboard')
  }
};