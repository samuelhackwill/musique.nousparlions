import './home.html';
import './home.css';
import {Stats} from '../../API/stats/stats.js'

Template.home.onCreated(function(){
})

Template.home.onRendered(function(){
    document.body.style.backgroundColor = "black"
})

Template.home.helpers({
    playCount(arg){
        console.log(arg?.hash?.arg)
        if (arg == undefined) {
            return Stats.find({}).fetch().length
        }else{
            return Stats.find({story : arg?.hash?.arg}).fetch().length
        }
    },

    playCountFinished(arg){
        if (arg == undefined) {
            return Stats.find({timeToFinish:{$ne:null}}).fetch().length
        }else{
            return Stats.find({story : arg?.hash?.arg, timeToFinish:{$ne:null}}).fetch().length
        }
    }
})

Template.home.onRendered(function(){
    document.addEventListener("keydown", function(e){
        if (e.keyCode == 83) {
            scoreDivs = document.getElementsByClassName("count")
            for (let x = 0; x < scoreDivs.length; x++) {
                scoreDivs[x].style.display = "inline"
                setTimeout(() => {
                    scoreDivs[x].style.opacity = 1
                }, 0);
            }
        }
    })

    document.addEventListener("keyup", function(e){
        scoreDivs = document.getElementsByClassName("count")
        for (let x = 0; x < scoreDivs.length; x++) {
            scoreDivs[x].style.opacity = 0
        }
    })
})