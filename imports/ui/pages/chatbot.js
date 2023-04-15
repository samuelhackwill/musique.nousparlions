import './chatbot.html';
import './chatbot.css';
import {data} from '../../API/text/chatbot.js';


Template.chatbotSVG.onRendered(function(){
    document.body.style.backgroundColor = "black"

    document.getElementById("bg").addEventListener("animationend", function(){
        document.body.style.transition = "all 1s"
        // when title fades out, we want to first show piano, then the rest.
        console.log("title faded out, let's go bg")
        document.body.style.backgroundColor = "rgb(255,60,0)"

        document.getElementById("bg").style.opacity = 1
        document.getElementById("sam").style.opacity = 1
        document.getElementById("stef").style.opacity = 1
        document.getElementById("maes").style.opacity = 1
        // document.addEventListener("keyup", next)
        // document.addEventListener("touchstart", touchtouch)
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