import './theLoser.html'
import './theLoser.css'

import {data} from '../../API/text/theLoser.js';


let cutscreen = false
let dangColor = "#0000FF"
let start = new Date()

Template.theLoserSVG.onCreated(function(){
    document.body.style.backgroundColor = dangColor
    counter = new ReactiveVar(-1);
    Meteor.call("insertStat", {story : "theLoser", timeToFinish : null, date : start})
})

Template.theLoserSVG.onRendered(function(){

    title = document.getElementById("theLoser-titre")
    title.addEventListener("animationend", function(){

        document.getElementById("p1").style.opacity = 1
        document.getElementById("p2").style.opacity = 1

        setTimeout(() => {
            document.getElementById("bg").style.opacity = 1
        }, 1000);

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


Template.theLoserSVG.helpers({
  dangColor(){
    return dangColor
  },

	wrapLine(){
        // this function's goal is to retrieve text and to split it in
        // one to six lines. One very long word breaks the wrapping.
    
        // ALSO, the fact that we're using a different logic to limit
        // insertions in the db (250 chars) is a problem. We would need
        // to refactor the function in the conversationEditor to use
        // the same logic, or to switch to a monospace font, etc.
    
        index = counter.get();
        getText = data[index]?.text
        getSpeaker = data[index]?.player
        getBubble = parseInt(arg.hash.whichBubble)

        if (getBubble != getSpeaker) {
            return
          }  

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


      if(cutscreen){
        return
      }


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
                document.getElementById("p1-tete-1").style.opacity = 1
                document.getElementById("p1-tete-2").style.opacity = 0
                document.getElementById("p1-bras-phone").style.opacity = 0
            break;

            case 0 :
                smoke()
            break;

            case 1 :
                exhale()
            break;
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

          document.getElementById("loser-bulleG").style.opacity = 0
          document.getElementById("loser-bulleD").style.opacity = 0

          finish = new Date()
          console.log("time to finish ", finish - start)
          Meteor.call("updateStat", {story : "theLoser", timeToFinish : finish - start, date : start})
  

          document.removeEventListener("keyup", next)
          document.removeEventListener("touchstart", touchtouch)


          if(nudge){
            clearTimeout(nudge)
          }
          
        //   g = document.getElementById("courage-public-assis")
        //   g.style.transition = "opacity 3s"

        //   g.addEventListener("transitionend", destroyAnimatedStuff)

          setTimeout(() => {
            console.log("bg should be dark, show credits")
            credits = document.getElementById("theLoser-credits")
            credits.style.opacity = "1"  
          }, 2500)
                      

          setTimeout(() => {
            // document.getElementById("bg-effects").style.opacity = 0
            // document.getElementById("r2").style.opacity = 0
            // document.getElementById("courage-ouvreur").style.opacity = 0
            // document.getElementById("courage-public").style.opacity = 0
            // document.getElementById("courage-samuels-assis").style.opacity = 0
            // document.getElementById("r1").style.opacity = 0  
            // document.getElementById("courage-public-assis").style.opacity = 0
          }, 1000);

          return
        }
    }

    smoke = function(){
        document.getElementById("p1-bras-fume").style.opacity = 1
        document.getElementById("p1-bras-repos").style.opacity = 0

        document.getElementById("fumee-bas").addEventListener("animationend", function(){
          document.getElementById("fumee-bas").classList.remove("smokeFloat")
          document.getElementById("fumee-bas-c").classList.remove("smokeLR")
          document.getElementById("fumee-bas").style.opacity=0
        })

        setTimeout(() => {
            document.getElementById("boubrulant").style.opacity = 1
            setTimeout(() => {
                document.getElementById("boubrulant").style.opacity = 0
                setTimeout(() => {                
                    setTimeout(() => {
                        document.getElementById("fumee-bas").style.opacity = 1
                        document.getElementById("fumee-bas").classList.add("smokeFloat")
                        document.getElementById("fumee-bas-c").classList.add("smokeLR")
                    }, 100);
                    document.getElementById("p1-bras-fume").style.opacity = 0
                    document.getElementById("p1-bras-repos").style.opacity = 1
                      }, 1000);        
            }, 1000);
        },500)
    }

    exhale = function(){
      // DRY as hell yes maam
        nez1 = document.getElementById("nez-1")

        nez2 = document.getElementById("nez-1-2")
        nez2c = document.getElementById("nez-1-2-c")
        nez3 = document.getElementById("nez-1-3")
        nez3c = document.getElementById("nez-1-3-c")
        nez4 = document.getElementById("nez-1-4")
        nez4c = document.getElementById("nez-1-4-c")

        nezarr2 = document.getElementById("nez-2-2")
        nezarr2c = document.getElementById("nez-2-2-c")
        nezarr3 = document.getElementById("nez-2-3")
        nezarr3c = document.getElementById("nez-2-3-c")
        nezarr4 = document.getElementById("nez-2-4")
        nezarr4c = document.getElementById("nez-2-4-c")

        nez1.style.opacity = 0.58

        
        nez2.addEventListener("animationend", function(){
          nez2.classList.remove("smokeFloat")
          nez2c.classList.remove("smokeLR")
          nez2.style.opacity=0
        })
        
        nez3.addEventListener("animationend", function(){
          nez3.classList.remove("smokeFloat")
          nez3c.classList.remove("smokeLR")
          nez3.style.opacity=0
        })
        
        nez4.addEventListener("animationend", function(){
          nez4.classList.remove("smokeFloat")
          nez4c.classList.remove("smokeLR")
          nez4.style.opacity=0
        })

        
        nezarr2.addEventListener("animationend", function(){
          nezarr2.classList.remove("smokeFloat")
          nezarr2c.classList.remove("smokeLR")
          nezarr2.style.opacity=0
        })
        
        nezarr3.addEventListener("animationend", function(){
          nezarr3.classList.remove("smokeFloat")
          nezarr3c.classList.remove("smokeLR")
          nezarr3.style.opacity=0
        })
        
        nezarr4.addEventListener("animationend", function(){
          nezarr4.classList.remove("smokeFloat")
          nezarr4c.classList.remove("smokeLR")
          nezarr4.style.opacity=0
        })

        setTimeout(() => {
            nez2.style.opacity = 0.58
            nezarr2.style.opacity = 0.58

            nez2.classList.add("smokeFloat")
            nez2c.classList.add("smokeLR")
            nezarr2.classList.add("smokeFloat")
            nezarr2c.classList.add("smokeLR")
        }, 250);

        setTimeout(() => {
            nez3.style.opacity = 0.58
            nezarr3.style.opacity = 0.58

            nez3.classList.add("smokeFloat")
            nez3c.classList.add("smokeLR")
            nezarr3.classList.add("smokeFloat")
            nezarr3c.classList.add("smokeLR")
        }, 500);

        setTimeout(() => {
            nez1.style.opacity = 0

            nez4.style.opacity = 0.58
            nezarr4.style.opacity = 0.58    

            nezarr4.classList.add("smokeFloat")
            nezarr4c.classList.add("smokeLR")
            nez4.classList.add("smokeFloat")
            nez4c.classList.add("smokeLR")
        }, 750);


    }