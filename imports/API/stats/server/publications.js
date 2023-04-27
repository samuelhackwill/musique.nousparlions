import { Meteor } from 'meteor/meteor';
import { Stats } from "../stats.js"
// stats = {_id, story, timeToFinish, date}


Meteor.publish('stats', function(){
	return Stats.find({});
  });

  Meteor.methods({
    'removeEverything'() {
        Stats.remove({})
    },

    'insertStat'(obj){
      Stats.insert({story : obj.story, timeToFinish : obj.timeToFinish, date : obj.date})
    },

    'updateStat'(obj){
      console.log("update ", obj)
      Stats.update({story: obj.story, date : obj.date}, {$set : {timeToFinish : obj.timeToFinish}})
    }
  })