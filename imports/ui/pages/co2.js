import './co2.html';
import './co2.css';
import '../full_svgs/co2.html';

Template.co2.onCreated(function(){
    console.log(`
    LAYERS :
    ecrans
        credits
        titre
        fond 
    flash
    bulle 
        texte 
        fond 
    wheels 
    carbody  
    samuel 
    carinside 
    radar  
    house  
    trees 
    dentelles
    bg 

    editing in the SVG should NEVER be adding classes! do it with javascript instead onRendered. Only edit the SVG to rename classes with wierd numbers. Thank you.
    `)
})

Template.co2.onRendered(function(){
    document.getElementById("titre").addEventListener("animationend", function(){
        console.log("title faded out, let's go bg")
        document.getElementById("bg").style.opacity = 1
    })

    setTimeout(function(){
        document.getElementById("flash").style.animation = "flash linear .5s"
    },5000)

    setTimeout(function(){
        document.getElementById("bulle").style.opacity = "1"
    },8000)
})