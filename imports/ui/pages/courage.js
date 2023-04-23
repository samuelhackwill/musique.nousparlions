import './courage.html'
import './courage.css'

import {data} from '../../API/text/courage.js';

let lastPlayer = null

Template.courageSVG.onCreated(function(){
    document.body.style.backgroundColor = "#B28D7F"
    counter = new ReactiveVar(-1);
})

Template.courageSVG.onRendered(function(){

    console.log(data)

    title = document.getElementById("courage-title")
    title.addEventListener("animationend", function(){

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


Template.courageSVG.helpers({
	wrapLine(){
        // this function's goal is to retrieve text and to split it in
        // one to six lines. One very long word breaks the wrapping.
    
        // ALSO, the fact that we're using a different logic to limit
        // insertions in the db (250 chars) is a problem. We would need
        // to refactor the function in the conversationEditor to use
        // the same logic, or to switch to a monospace font, etc.
    
        index = counter.get();
        getText = data[index]

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
            if (wrapCounter>=65) {
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
      }
    
    
})

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

const killMarker = function(e){
  console.log("kill ", this)
}

const destroyAnimatedStuff = function(){
  document.getElementById("instruct").innerHTML = ""
  document.getElementById("co2-bg").innerHTML = ""
}

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
      endOfText = data.length-1

        // TIMED EVENTS

        switch (index) {
            case -1 :
                document.getElementById("courage-ouvreur").style.opacity = 1
            break;
            case 0 :
                document.getElementById("courage-samuels").style.opacity = 1
            break;
            case 1 :
                document.getElementById("courage-samuel-0").style.opacity = 0
                document.getElementById("courage-samuel-1").style.opacity = 1
            break;
            case 2 :
                document.getElementById("mainprend").style.opacity = 0
                document.getElementById("maindonne").style.opacity = 1
            break;
            case 3 :
                document.getElementById("mainprend").style.opacity = 1
                document.getElementById("maindonne").style.opacity = 0
                document.getElementById("courage-samuel-1").style.opacity = 0
                document.getElementById("courage-samuels-assis").style.opacity = 1
            break;
            case 4 :
                document.getElementById("courage-phylactere").style.opacity = 1
            break;
            case 14 :
                document.getElementById("courage-phylactere").style.opacity = 0
            break;
            case 15 :
                document.getElementById("courage-public").style.opacity = 1
            break;
            case 16 :
                document.getElementById("courage-p1-0").style.opacity = 0
                document.getElementById("courage-p1-1").style.opacity = 1
            break;
            case 17 :
                document.getElementById("mainprend").style.opacity = 0
                document.getElementById("maindonne").style.opacity = 1
            break;
            case 18 :
                document.getElementById("mainprend").style.opacity = 1
                document.getElementById("maindonne").style.opacity = 0
                document.getElementById("courage-p1-1").style.opacity = 0
                document.getElementById("courage-p1-2").style.opacity = 1
            break;
            case 19 :
                document.getElementById("courage-samuel-2").style.opacity = 0
                document.getElementById("courage-samuel-3").style.opacity = 1
            break;
            case 20 :
                document.getElementById("courage-p1-2").style.opacity = 0
                document.getElementById("courage-p1-3").style.opacity = 1
            break;
            case 21 :
                document.getElementById("courage-samuel-3").style.opacity = 0
                document.getElementById("courage-samuel-4").style.opacity = 1
            break;
            case 22 :
                document.getElementById("courage-p1-3").style.opacity = 0
                document.getElementById("courage-p1-2").style.opacity = 1
            break;

            // p1 arrive
            // p1 se met devant l'ouvreur
            // l'ouvreur tend la main
            // p1 se met devant samuel
            // samuel lève la tête
            // p1 monte son doigt
            // samuel se lève
            // animation de P1 jusqu'à sa place, puis s'asseoit.
            // samuel se rasseoit
            

        }

      
        //END CONDITION
        
        if (index<endOfText) {
          // we want to increment the counter every time the spacebar
          // is pressed to get new dialog lines
          console.log(index)
          index = counter.set(index+1)
        }else{
          // if we're at the end of the text, tell car to go away
          // then fade out.
          console.log("END OF TEXT")

          document.removeEventListener("keyup", next)
          document.removeEventListener("touchstart", touchtouch)


        //   if(nudge){
        //     clearTimeout(nudge)
        //   }

        //   var el = document.getElementsByClassName("car")[0];
        //   el.style.animation = 'carOut 20s';

        //   document.getElementById("co2-bulle").style.opacity = "0"

          
        //   setTimeout(() => {
        //     bg = document.getElementById("co2-bg")
        //     bg.style.transition = "opacity 5s"
        //     bg.style.opacity = "0"
        //     bg.addEventListener("transitionend", destroyAnimatedStuff)
        //     setTimeout(() => {
        //       console.log("bg should be dark, show credits")
        //       credits = document.getElementById("co2-credits")
        //       credits.style.opacity = "1"  
        //     }, 1000)
        //   }, 2000);

          return
        }
    }