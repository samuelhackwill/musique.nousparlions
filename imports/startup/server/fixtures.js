import { Meteor } from 'meteor/meteor';
import { Stats } from "../../API/stats/stats.js";

const stories = ["chatbot","bravo","courage","theLoser", "laFile","CO2"]
// stats = {_id, story, timeToFinish, date}

if (Stats.find({}).fetch().length < 1) {
    console.log("no data!")
    // Stats.insert({story : "chatbot", timeToFinish : 10000, date : new Date()})
    // Stats.insert({story : "bravo", timeToFinish : 10000, date : new Date()})
    // Stats.insert({story : "courage", timeToFinish : 10000, date : new Date()})
    // Stats.insert({story : "theLoser", timeToFinish : 10000, date : new Date()})
    // Stats.insert({story : "laFile", timeToFinish : 10000, date : new Date()})
    // Stats.insert({story : "Co2", timeToFinish : 10000, date : new Date()})
}else{
    console.log("data, no fix!")
}