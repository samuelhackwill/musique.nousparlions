import './theLoser.html'
import './theLoser.css'

import {data} from '../../API/text/theLoser.js';


let cutscreen = false
let dangColor = "#0000FF"
let start = new Date()
let lastPlayer = null


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
            document.getElementById("theLoser-bg").style.opacity = 1
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

	wrapLine(arg){
        index = counter.get();
        getText = data[index]?.text
        getSpeaker = data[index]?.player
        getBubble = parseInt(arg.hash.whichBubble)
        
        if (getBubble == 2 && index == 30){
          return {
            line1 : "bon il s'agit des",
            line2 : "Variations Goldberg tu t'en",
            line3: "doutes"
          }
        }

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
      _index = index + 1
      endOfText = data.length-1
      player = data[_index]?.player


      // yeah if it's a new player AND we're not at the very first line of text,
      // we want to hide the previous speech bubble! well, make it ALL speech dialogs fu
      if (lastPlayer != player && lastPlayer != null){
        document.getElementById("loser-bulleG").style.opacity = "0"
        document.getElementById("loser-bulleD").style.opacity = "0"
        console.log(player)
        if(player == 1){
          document.getElementById("loser-bulleG").style.opacity = "1"
        }
        if(player == 2){
          document.getElementById("loser-bulleD").style.opacity = "1"
        }
        if(index == 29){
          document.getElementById("loser-bulleG").style.opacity = "1"
          document.getElementById("loser-bulleD").style.opacity = "1"
        }
      }

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

            case 2 :
              document.getElementById("openbook").style.opacity = 0
              document.getElementById("closedbook").style.opacity = 1
            break;

            case 16:
              setTimeout(() => {
                rawHTML = document.getElementById("loserBulleGTxt").children[0].outerHTML 
                newHTML = rawHTML.replace("Wertheimer", "<tspan class='st36'>Wertheimer</tspan>")
                console.log(newHTML)
                document.getElementById("loserBulleGTxt").children[0].outerHTML = newHTML
              }, 10);
            break;

            case 19:
              setTimeout(() => {
                rawHTML = document.getElementById("loserBulleDTxt").children[0].outerHTML 
                newHTML = rawHTML.replace("Salzburg", "<tspan class='st36'>Salzburg</tspan>")
                console.log(newHTML)
                document.getElementById("loserBulleDTxt").children[0].outerHTML = newHTML
              }, 10);
            break;

            case 22 :
                smoke()
            break;

            case 23:
              setTimeout(() => {
                rawHTML = document.getElementById("loserBulleDTxt").children[2].outerHTML 
                newHTML = rawHTML.replace("Mozartheum", "<tspan class='st36'>Mozartheum</tspan>")
                console.log(newHTML)
                document.getElementById("loserBulleDTxt").children[2].outerHTML = newHTML
              }, 10);
            break;

            case 28:
              setTimeout(() => {
                next()
                setTimeout(() => {
                  rawHTML = document.getElementById("loserBulleGTxt").children[0].outerHTML 
                  newHTML = rawHTML.replace("Gold", "<tspan class='st37'>Gold</tspan>")
                  document.getElementById("loserBulleGTxt").children[0].outerHTML = newHTML
                }, 10);
              }, 500);
            break;

            case 34 :
              document.getElementById("openbook").style.opacity = 1
              document.getElementById("closedbook").style.opacity = 0
            break;

            case 43 :
              setTimeout(() => {
                document.getElementById("openbook").style.opacity = 0
                document.getElementById("closedbook").style.opacity = 1
              },500)
            break;

            case 49 :
              document.getElementById("p1-tete-1").style.opacity = 0
              document.getElementById("p1-tete-2").style.opacity = 1
              document.getElementById("p1-bras-phone").style.opacity = 1
            break;

            case 54 :
              setTimeout(() => {
                document.getElementById("p1-tete-1").style.opacity = 1
                document.getElementById("p1-tete-2").style.opacity = 0
                document.getElementById("p1-bras-phone").style.opacity = 0
              },1000)
              break;


            case 62 :
              smoke()
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
          document.getElementById("p1-bras-repos").style.opacity = 0
          document.getElementById("p1-tete-1").style.opacity = 0
          document.getElementById("p1-tete-2").style.opacity = 1
          document.getElementById("p1-bras-extinction").style.opacity = 1
          document.getElementById("p1-cendrier").style.opacity = 1
          document.getElementById("fumee-extinction").style.opacity = 1
          document.getElementById("fumee-extinction").classList.add("smokeFloat")

            setTimeout(() => {
              document.getElementById("theLoser-bg").style.opacity = 0
              document.getElementById("p1").style.opacity = 0
              document.getElementById("p2").style.opacity = 0
            }, 3000);  
  
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
            document.body.style.transition = "all 1s"
            credits.style.opacity = "1"  
          }, 3000)
                      

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
        lastPlayer = player
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
                  document.getElementById("p1-bras-fume").style.opacity = 0
                  document.getElementById("p1-bras-repos").style.opacity = 1
                  setTimeout(() => {
                    document.getElementById("fumee-bas").style.opacity = 1
                    document.getElementById("fumee-bas").classList.add("smokeFloat")
                    document.getElementById("fumee-bas-c").classList.add("smokeLR")
                  }, 100);
                  setTimeout(() => {
                    exhale()
                  }, 1000);
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