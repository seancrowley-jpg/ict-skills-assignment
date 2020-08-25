'use strict';

const memberstore = require('../models/member-store');
const trainerstore = require('../models/trainer-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('assessment', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const member = {
      email: request.body.email,
      password: request.body.password,
      name: request.body.name,
      address: request.body.address,
      gender: request.body.gender,
      height: request.body.height,
      startingweight: request.body.startingweight,
      id: uuid.v1(),
      assessments: []
    }
    memberstore.addMember(member);
    logger.info(`registering ${member.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {
    const member = memberstore.getMemberByEmail(request.body.email);
    const password = memberstore.getMemberByPassword(request.body.password);
    const trainer = trainerstore.getTrainerByEmail(request.body.email);
    const tPassword = trainerstore.getTrainerByPassword(request.body.password);
    if (member && password) {
      response.cookie('assessment', member.email);
      logger.info(`logging in ${member.email}`);
      response.redirect('/dashboard');
    } 
    else if(trainer && tPassword) {
      response.redirect('/trainerdashboard');
    }
    else {
      response.redirect('/login');
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.assessment;
    return memberstore.getMemberByEmail(userEmail);
  },
  
  settings(request, response) {
    const viewData = {
      title: 'Settings',
    };
    response.render('settings', viewData);
  },
  
  updateAccount(request,response) {
    const member = memberstore.getMember
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

module.exports = accounts;