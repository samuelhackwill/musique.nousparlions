import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { BlazeLayout } from "meteor/kadira:blaze-layout";

import '../../ui/pages/home.js';
import '../../ui/pages/co2.js';

FlowRouter.route("/home", {
  name: "home",
  action() {
    BlazeLayout.render("home");
  }
}),

FlowRouter.route("/co2", {
  name: "co2",
  action(){
    BlazeLayout.render("co2");
  }
});
