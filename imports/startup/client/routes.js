import { FlowRouter } from "meteor/ostrio:flow-router-extra";

import { Stats } from '../../API/stats/stats.js';

import '../../ui/pages/co2.js';
import '../../ui/pages/chatbot.js';
import '../../ui/pages/bravo.js';
import '../../ui/pages/courage.js';
import '../../ui/pages/home.js';

FlowRouter.route('/co2', {
  name: 'co2',
  action() {
    this.render('co2SVG');
  },

  waitOn(params) {
    return [
      Meteor.subscribe('stats')
    ];
  }
});

FlowRouter.route('/chatbot', {
  name: 'chatbot',
  action() {
    this.render('chatbotSVG');
  },

  waitOn(params) {
    return [
      Meteor.subscribe('stats')
    ];
  }
});

FlowRouter.route('/bravo', {
  name: 'bravo',
  action() {
    this.render('bravoSVG');
  },

  waitOn() {
    return [
      Meteor.subscribe('stats')
    ];
  }
});

FlowRouter.route('/courage', {
  name: 'courage',
  action() {
    this.render('courageSVG');
  },

  waitOn() {
    return [
      Meteor.subscribe('stats')
    ];
  }
});

FlowRouter.route('/', {
  name: 'home',
  action() {
    this.render('home');
  },

  waitOn() {
    return [
      Meteor.subscribe('stats')
    ];
  }
});


// FlowRouter.route('/theLoser', {
//   name: 'theLoser',
//   action() {
//     this.render('theLoserSVG')
//   }
// });

// FlowRouter.route('/laFile', {
//   name: 'laFile',
//   action() {
//     this.render('laFileSVG')
//   }
// });