import './courage.html'
import './courage.css'

import {data} from '../../API/text/courage.js';

let lastPlayer = null

Template.courageSVG.onCreated(function(){
    document.body.style.backgroundColor = "#B28D7F"
    counter = new ReactiveVar(-1);
})

Template.courageSVG.onRendered(function(){

    title = document.getElementById("courage-title")
    title.addEventListener("animationend", function(){

        document.getElementById("courage-ouvreur").style.opacity = 1
        document.getElementById("bg-effects").style.opacity = 1
        document.getElementById("r2").style.opacity = 1
        document.getElementById("r1").style.opacity = 1

        document.addEventListener("keyup", next)
        document.addEventListener("touchstart", touchtouch)
      })

      nudge = setTimeout(() => {
        document.getElementById("instruct").style.opacity="1"
      }, 15000);

      document.body.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
    });
})  
