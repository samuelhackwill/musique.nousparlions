import { FlowRouter } from "meteor/ostrio:flow-router-extra";
// import { BlazeLayout } from "meteor/kadira:blaze-layout";

import '../../ui/pages/co2.js';
import '../../ui/pages/chatbot.js';

FlowRouter.route('/co2', {
  name: 'co2',
  action() {
    console.log(this)
    this.render('co2SVG');
  },
});

FlowRouter.route('/chatbot', {
  name: 'chatbot',
  action() {
    this.render('chatbotSVG');
  },
});

// FlowRouter.notFound = {
//   action() {
//     this.render('App_body', 'App_notFound');
//   },
// };
