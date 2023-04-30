import './courage.html'
import './courage.css'

import {data} from '../../API/text/courage.js';

let cutscreen = false
let dangColor = "#B28D7F"
let start = new Date()

Template.courageSVG.onCreated(function(){
    document.body.style.backgroundColor = dangColor
    counter = new ReactiveVar(-1);
    Meteor.call("insertStat", {story : "courage", timeToFinish : null, date : start})
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
        // LOOL FU SO STUPIDLY COMPLICATED

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

            // first break;

            case 14:
              document.getElementById("courage-phylactere").style.opacity = 0
            break;

            case 15:
              document.getElementById("courage-phylactere").style.opacity = 1
            break;
            
            // animation of first guy

            case 16 :
                document.getElementById("courage-public").style.opacity = 1
            break;
            case 17 :
                document.getElementById("courage-p1-0").style.opacity = 0
                document.getElementById("courage-p1-1").style.opacity = 1
            break;
            case 18 :
                document.getElementById("mainprend").style.opacity = 0
                document.getElementById("maindonne").style.opacity = 1
            break;
            case 19 :
                document.getElementById("mainprend").style.opacity = 1
                document.getElementById("maindonne").style.opacity = 0
                document.getElementById("courage-p1-1").style.opacity = 0
                document.getElementById("courage-p1-2").style.opacity = 1
            break;
            case 20 :
                document.getElementById("courage-phylactere").style.opacity = 0
                document.getElementById("courage-samuel-2").style.opacity = 0
                document.getElementById("courage-samuel-3").style.opacity = 1
            break;
            case 21 :
                document.getElementById("courage-p1-2").style.opacity = 0
                document.getElementById("courage-p1-3").style.opacity = 1
            break;
            case 22 :
                document.getElementById("courage-samuel-3").style.opacity = 0
                document.getElementById("courage-samuel-4").style.opacity = 1
            break;
            case 23 :
                document.getElementById("courage-p1-3").style.opacity = 0
                document.getElementById("courage-p1-2").style.opacity = 1
            break;
            case 24 :
              // we need to prevent users from doing stuff if sam is not seated.
              cutscreen = true

              theGuyContainer = document.getElementById("courage-p1-2-animator")
              theGuy = document.getElementById("courage-p1-2")

              theGuyContainer.classList.add("depasseSam")
              theGuy.classList.add("normalJiggle")

              theGuyContainer.addEventListener("animationend", function(){
                document.getElementById("courage-p1-2").classList.remove("normalJiggle")
                setTimeout(() => {
                  // take a seat
                  document.getElementById("courage-p1-2").style.opacity = 0
                  document.getElementById("courage-public-assis").style.opacity = 1
                  },1000)
              })

                setTimeout(() => {
                  document.getElementById("courage-p1-2").classList.remove("normalJiggle")
                  document.getElementById("courage-p1-2").classList.add("awkwardJiggle")
                  // the timeout should be 15% of animation
                }, 1050);

                setTimeout(() => {
                  document.getElementById("courage-p1-2").classList.remove("awkwardJiggle")
                  document.getElementById("courage-p1-2").classList.add("normalJiggle")
                  // this  should be 50% of animation

                  setTimeout(() => {
                    // ok, sam is seated again, he can carry on reading.
                    cutscreen = false
                    document.getElementById("courage-samuel-4").style.opacity = 0
                    document.getElementById("courage-samuel-2").style.opacity = 1    
                  },1500)
                }, 3500);
            break;

            // end of animation of first guy
        
            case 25:
              document.getElementById("courage-phylactere").style.opacity = 1
            break

            // second break;

            case 38 :
              document.getElementById("courage-phylactere").style.opacity = 0
            break;

            // animation of the other peeps

            case 39 :
              document.getElementById("courage-phylactere").style.opacity = 1
              document.getElementById("courage-p2-0").style.opacity = 1
            break;

            case 40 :
                document.getElementById("courage-p2-0").style.opacity = 0
                document.getElementById("courage-p2-1").style.opacity = 1
            break;
            case 41 :
                document.getElementById("mainprend").style.opacity = 0
                document.getElementById("maindonne").style.opacity = 1
            break;
            case 42 :
                document.getElementById("mainprend").style.opacity = 1
                document.getElementById("maindonne").style.opacity = 0
                document.getElementById("courage-p2-1").style.opacity = 0
                document.getElementById("courage-p2-2a").style.opacity = 1
                document.getElementById("courage-p2-2b").style.opacity = 1
            break;
            case 43 :
                document.getElementById("courage-phylactere").style.opacity = 0
                document.getElementById("courage-samuel-2").style.opacity = 0
                document.getElementById("courage-samuel-3").style.opacity = 1
            break;
            case 44 :
                document.getElementById("courage-samuel-3").style.opacity = 0
                document.getElementById("courage-samuel-4").style.opacity = 1
            break;
            case 45 :
              // we need to prevent users from doing stuff if sam is not seated.
              cutscreen = true

              theGuyContainer1 = document.getElementById("courage-p2-2b-animator")
              theGuy1 = document.getElementById("courage-p2-2b")

              theGuyContainer2 = document.getElementById("courage-p2-2a-animator")
              theGuy2 = document.getElementById("courage-p2-2a")

              setTimeout(() => {
                theGuyContainer1.classList.add("depasseSam2")
                theGuy1.classList.add("normalJiggle")
              }, 500);
                            
              theGuyContainer2.classList.add("depasseSam2")
              theGuy2.classList.add("normalJiggle")  

              theGuyContainer1.addEventListener("animationend", function(){
                document.getElementById("courage-p2-2b").classList.remove("normalJiggle")
                setTimeout(() => {
                  document.getElementById("courage-p2-2b").style.opacity = 0
                  document.getElementById("courage-p2-3b").style.opacity = 1
                  },1000)
              })

              theGuyContainer2.addEventListener("animationend", function(){
                document.getElementById("courage-p2-2a").classList.remove("normalJiggle")
                setTimeout(() => {
                  document.getElementById("courage-p2-2a").style.opacity = 0
                  document.getElementById("courage-p2-3a").style.opacity = 1
                  },1000)
              })

                setTimeout(() => {
                  document.getElementById("courage-p2-2b").classList.remove("normalJiggle")
                  document.getElementById("courage-p2-2b").classList.add("awkwardJiggle")
                  document.getElementById("courage-p2-2a").classList.remove("normalJiggle")
                  document.getElementById("courage-p2-2a").classList.add("awkwardJiggle")
                  // the timeout should be 10% of animation
                }, 500);

                setTimeout(() => {
                  document.getElementById("courage-p2-2b").classList.remove("awkwardJiggle")
                  document.getElementById("courage-p2-2b").classList.add("normalJiggle")
                  document.getElementById("courage-p2-2a").classList.remove("awkwardJiggle")
                  document.getElementById("courage-p2-2a").classList.add("normalJiggle")
                  // this  should be 65% of animation

                  setTimeout(() => {
                    // ok, sam is seated again, he can carry on reading.
                    cutscreen = false
                    document.getElementById("courage-samuel-4").style.opacity = 0
                    document.getElementById("courage-samuel-2").style.opacity = 1    
                  },1500)
                }, 4000);
            break;
            case 46 :
              document.getElementById("courage-phylactere").style.opacity = 1
            break;

            //third break
            
            case 62 :
              document.getElementById("courage-phylactere").style.opacity = 0
            break;

            case 63 :
              document.getElementById("courage-phylactere").style.opacity = 1
            break;
            
            // last break

            case 75 :
              document.getElementById("courage-phylactere").style.opacity = 0
            break;

            case 76 :
              document.getElementById("courage-phylactere").style.opacity = 1
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

          document.getElementById("courage-phylactere").style.opacity = 0

          finish = new Date()
          console.log("time to finish ", finish - start)
          Meteor.call("updateStat", {story : "courage", timeToFinish : finish - start, date : start})
  

          document.removeEventListener("keyup", next)
          document.removeEventListener("touchstart", touchtouch)


          if(nudge){
            clearTimeout(nudge)
          }
          
          a = document.getElementById("bg-effects")
          a.style.transition = "opacity 3s"
          b = document.getElementById("r2")
          b.style.transition = "opacity 3s"
          c = document.getElementById("courage-ouvreur")
          c.style.transition = "opacity 3s"
          d = document.getElementById("courage-public")
          d.style.transition = "opacity 3s"
          e = document.getElementById("courage-samuels-assis")
          e.style.transition = "opacity 3s"          
          f = document.getElementById("r1")
          f.style.transition = "opacity 3s"
          g = document.getElementById("courage-public-assis")
          g.style.transition = "opacity 3s"

          g.addEventListener("transitionend", destroyAnimatedStuff)

          setTimeout(() => {
            console.log("bg should be dark, show credits")
            credits = document.getElementById("courage-credits")
            credits.style.opacity = "1"  
          }, 2500)
                      

          setTimeout(() => {
            document.getElementById("bg-effects").style.opacity = 0
            document.getElementById("r2").style.opacity = 0
            document.getElementById("courage-ouvreur").style.opacity = 0
            document.getElementById("courage-public").style.opacity = 0
            document.getElementById("courage-samuels-assis").style.opacity = 0
            document.getElementById("r1").style.opacity = 0  
            document.getElementById("courage-public-assis").style.opacity = 0
          }, 1000);

          return
        }
    }