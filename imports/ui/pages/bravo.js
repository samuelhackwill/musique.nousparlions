import './bravo.html'
import './bravo.css'

import {data} from '../../API/text/bravo.js';

let lastPlayer = null

Template.bravoSVG.onCreated(function(){
    document.body.style.backgroundColor = "#333328"
    counter = new ReactiveVar(-1);
})


Template.bravoSVG.onRendered(function(){

    document.getElementById("bravo-titre").addEventListener("animationend", function(){
        document.body.style.transition = "all 1s"

        document.getElementById("seats").style.opacity = 1
        document.getElementById("pasapplaudit").style.opacity = 1
        document.getElementById("petitapplaudit").style.opacity = 1
        document.getElementById("public").style.opacity = 1
        document.getElementById("nuitAmericaine").style.opacity = 1

        document.addEventListener("keyup", next)
        document.addEventListener("touchstart", touchtouch)

        setTimeout(() => {
            document.getElementById("nuitAmericaine").style.opacity = 0
        }, 2000);
      })

      nudge = setTimeout(() => {
        document.getElementById("instruct").style.opacity=".2"
      }, 15000);

      document.body.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
    });
})  

Template.bravoSVG.helpers({
	wrapLine(arg){
        // this function's goal is to retrieve text and to split it in
        // one to six lines. One very long word breaks the wrapping.
        wrapMax = 75


        index = counter.get();
        getText = data[index]?.text
        getSpeaker = data[index]?.player
        getBubble = parseInt(arg.hash.whichBubble)
    
        if (getBubble != getSpeaker) {
          return
        }


        // if (getBubble == 2) {
        //     wrapMax = 75
        // }

        // if (getBubble == 3) {
        //     wrapMax = 90
        // }

        wrapCurrentWord = false
        wrapCounter = 0
        lineCounter = 1

        lines = {line1:[], line2:[], line3:[], line4:[], line5:[], line6:[], 
          // caution, these lines won't display!!!
          // see issue #10.
          line7:[],line8:[],line9:[],line10:[],line11:[],line12:[],line13:[]
    
        }
    
        // letters and numbers should default to medium
        // non-word (spaces, punctuation, etc) should default to small.
    
        words = getText.split(" ")
    
        for (var z = 0 ; z < words.length; z++) {
          for (var i = 0 ; i < words[z].length; i++){
            // console.log(words[z][i])
            // FOR EVERY LETTER
            // increment counter, that's it
            if (words[z][i]== "w" || words[z][i]== "m"){
              wrapCounter = wrapCounter + 2.8   
            }
    
            if (words[z][i]== "i" || words[z][i]== "j" || words[z][i]== "l" || words[z][i]== "f" || words[z][i]== "r" || words[z][i] == "t"){
              wrapCounter = wrapCounter - .5   
            }
    
            wrapCounter = wrapCounter + 2.8
    
            // console.log(wrapCounter, words[z])
    
            // we want to check, at EVERY letter, if we need to wrap current word,
            // and reset counter AS SOON as a letter is over 100.
            if (wrapCounter>=wrapMax) {
              // console.log(wrapCounter, words[z])
              // console.log("wrap at ", words[z])
              wrapCounter = 0
              wrapCurrentWord = true
            }
    
          }
          // also increment counter for spaces!
          wrapCounter = wrapCounter + 2.8
    
          // FOR EVERY WORD
          // check wrapCounter
          // insert "wrap" if wrapCounter > x
          // reset wrapCounter
    
          if (wrapCurrentWord) {
            lineCounter = lineCounter + 1
            wrapCurrentWord = false
          }
    
          selector = "line"+lineCounter
          // console.log(selector, lines[selector], words[z])
          lines[selector].push(words[z])
    
        }
    
    
        // console.log("index :", index,
        // "\n getText :", getText, 
        // "\n wrapCurrentWord :", wrapCurrentWord, 
        // "\n wrapCounter :", wrapCounter, 
        // "\n lineCounter :", lineCounter, 
        // "\n lines :", lines)
    
        return {
          line1:lines.line1.join(' '),
          line2:lines.line2.join(' '),
          line3:lines.line3.join(' '),
          line4:lines.line4.join(' '),
          line5:lines.line5.join(' '),
          line6:lines.line6.join(' ')
          // we're not returning the other arrays because we 
          // don't want text to overflow.
    
        }
      },
})



const next = function(e){
    e?.preventDefault();

    document.getElementById("instruct").style.opacity = "0"

    if(nudge){
      clearTimeout(nudge)
    }

    nudge = setTimeout(() => {
      document.getElementById("instruct").style.opacity="1"
    }, 15000);


    index = counter.get()
    _index = index + 1
    endOfText = data.length-1

    player = data[_index]?.player

    // console.log(lastPlayer, player, index)

    // yeah if it's a new player AND we're not at the very first line of text,
    // we want to hide the previous speech bubble! well, make it ALL speech dialogs fu
    if (lastPlayer != player && lastPlayer != null){
      document.getElementById("bravo-bulleDroite").style.opacity = "0"
      document.getElementById("bravo-bulleGauche").style.opacity = "0"
      document.getElementById("bravo-bulleGauchePetit").style.opacity = "0"
    }

    switch (player) {
      case 1:
        document.getElementById("bravo-bulleDroite").style.opacity = "1"
        break;
    
      case 2:
        document.getElementById("bravo-bulleGauche").style.opacity = "1"
        break;
    
      case 20:
        document.getElementById("bravo-bulleGauchePetit").style.opacity = "1"
        break;
    }

    
      // TIMED EVENTS

      // switch (index) {
      //   case -1 :
      //     document.getElementById("chatbot-stef2").style.opacity = "0"
      //     document.getElementById("chatbot-stef1").style.opacity = "1"
      //     break;

      //   case 0 :
      //     document.getElementById("chatbot-stef2").style.opacity = "1"
      //     document.getElementById("chatbot-stef1").style.opacity = "0"
      //     document.getElementById("handright").style.animation = "chatbot-typing .5s infinite steps(2)"
      //     document.getElementById("handleft").style.animation = "chatbot-typing .5s infinite steps(2) reverse"
      //     break;

      //   case 2 :
      //     setTimeout(() => {
      //       document.getElementById("handright").style.animation = ""
      //       document.getElementById("handleft").style.animation = ""
      //       },2000)  
      //   break;

      //   case 3 :
      //     setTimeout(() => {
      //       document.getElementById("chatbot-stef2").style.opacity = "0"
      //       document.getElementById("chatbot-stef3").style.opacity = "1"
      //       }, 2000);
      //     break;

      //   case 6 :
      //     document.getElementById("chatbot-sam1").style.opacity = "0"
      //     document.getElementById("chatbot-sam2").style.opacity = "1"
      //     setTimeout(() => {
      //       document.getElementById("chatbot-stef2").style.opacity = "1"
      //       document.getElementById("chatbot-stef3").style.opacity = "0"
      //       }, 1000);
      //     break;

      //     case 7 : 
      //     document.getElementById("handright").style.animation = "chatbot-typing .5s infinite steps(2)"
      //     document.getElementById("handleft").style.animation = "chatbot-typing .5s infinite steps(2) reverse"
      //     break;

      //     case 8 :
      //       setTimeout(() => {
      //         document.getElementById("handright").style.animation = ""
      //         document.getElementById("handleft").style.animation = ""
      //         },2000)    
      //     break;

      //     case 14 :
      //       setTimeout(() => {
      //         document.getElementById("handright").style.animation = "chatbot-typing .5s infinite steps(2)"
      //         document.getElementById("handleft").style.animation = "chatbot-typing .5s infinite steps(2) reverse"
      //         },1000)    
      //     break;

      //     case 15 :
      //       setTimeout(() => {
      //         document.getElementById("handright").style.animation = ""
      //         document.getElementById("handleft").style.animation = ""
      //         },1000)    
      //     break;

      //     case 16 :
      //       document.getElementById("chatbot-stef2").style.opacity = "0"
      //       document.getElementById("chatbot-stef3").style.opacity = "1"
      //     break;      

      //     case 36 :
      //       setTimeout(() => {
      //       document.getElementById("chatbot-stef3").style.opacity = "0"
      //       document.getElementById("chatbot-stef1").style.opacity = "1"
      //       eraseHand = document.getElementsByClassName("risenHand")
      //       for (let x = 0; x < eraseHand.length; x++) {
      //         eraseHand[x].style.display="none"
      //       }
      //       },2000)
      //     break;      

      //     case 38 :
      //       document.getElementById("chatbot-sam2").style.opacity = "0"
      //       document.getElementById("chatbot-sam1").style.opacity = "1"
      //     break;
    

      //  }

    
      //END CONDITION
      
      if (index<endOfText) {
        // we want to increment the counter every time the spacebar
        // is pressed to get new dialog lines
        index = counter.set(index+1)
      }else{
        // if we're at the end of the text, tell car to go away
        // then fade out.
        console.log("END OF TEXT")

        document.removeEventListener("keyup", next)
        document.removeEventListener("touchstart", touchtouch)
        document.getElementById("bravo-text").style.opacity="0"
        
        if(nudge){
          clearTimeout(nudge)
        }

        
        seats = document.getElementById("seats")
        bob = document.getElementById("pasapplaudit")
        bobet = document.getElementById("petitapplaudit")
        hands = document.getElementById("public")
        seats.style.transition = "opacity 5s"
        seats.style.opacity = "0"
        bob.style.transition = "opacity 5s"
        bob.style.opacity = "0"
        bobet.style.transition = "opacity 5s"
        bobet.style.opacity = "0"
        hands.style.transition = "opacity 5s"
        hands.style.opacity = "0"

          seats.addEventListener("transitionend", destroyAnimatedStuff)
          
          setTimeout(() => {
            console.log("bg should be dark, show credits")
            credits = document.getElementById("bravo-credits")
            credits.style.opacity = "1"  
          }, 2000)

        return
      }
      lastPlayer = player
  }

const touchtouch = function(e){
  console.log(e.touches[0].screenX, e.touches[0].screenY)
  const newDiv = document.createElement("div");
  bruits = ["tip!", "tap!", "toup!"]
  newDiv.innerHTML = bruits[Math.floor(Math.random() * bruits.length)]
  newDiv.classList.add("touchMarker")
  newDiv.style = "left:"+e.touches[0].screenX+"px;top:"+e.touches[0].screenY+"px;"
  document.body.appendChild(newDiv);

  newDiv.addEventListener("transitionend", killMarker)
  
  setTimeout(() => {
    moveup(newDiv)
  }, 100);
  
  }


const moveup = function(div){

  console.log(div)

  x = Math.floor(Math.random() * 150)
  y = Math.floor(Math.random() * 200)

  console.log("translate("+x+" px, -"+y+" px)")

  div.style.transform = "translate("+x+"px, -"+y+"px)"
  div.style.opacity = "0"
  next()
  }

killMarker = function(e){
  console.log("kill ", this)
}

destroyAnimatedStuff = function(){
  document.getElementById("instruct").innerHTML = ""
  document.getElementById("public").innerHTML = ""
  document.getElementById("petitapplaudit").innerHTML = ""
}
