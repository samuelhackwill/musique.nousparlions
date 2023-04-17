import { FlowRouter } from "meteor/ostrio:flow-router-extra";
// import { BlazeLayout } from "meteor/kadira:blaze-layout";

import '../../ui/pages/co2.js';
import '../../ui/pages/chatbot.js';
import '../../ui/pages/bravo.js';
import '../../ui/pages/home.js';

FlowRouter.route('/co2', {
  name: 'co2',
  action() {
    this.render('co2SVG');
  },
});

FlowRouter.route('/chatbot', {
  name: 'chatbot',
  action() {
    this.render('chatbotSVG');
  },
});

FlowRouter.route('/bravo', {
  name: 'bravo',
  action() {
    this.render('bravoSVG');
  },
});

FlowRouter.route('/', {
  name: 'home',
  action() {
    this.render('home')
  }
});

// FlowRouter.notFound = {
//   action() {
//     this.render('App_body', 'App_notFound');
//   },
// };
