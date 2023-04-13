import { FlowRouter } from "meteor/ostrio:flow-router-extra";
// import { BlazeLayout } from "meteor/kadira:blaze-layout";

import '../../ui/pages/co2.js';

FlowRouter.route('/co2', {
  name: 'App.home',
  action() {
    this.render('co2SVG');
  },
});

// FlowRouter.notFound = {
//   action() {
//     this.render('App_body', 'App_notFound');
//   },
// };
