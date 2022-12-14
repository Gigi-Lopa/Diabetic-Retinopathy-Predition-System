let getResults = (ELEM_POSITIONS) =>{

    let NO_DR = `  
    <h4>Current Status: <b class="status-tag bg-success">NO DR</b> </h4>
    <br>
    <p>
    NO Diabetic Retinopathy detected. Eyes healthy
    </p>`
    let MILD = `
    <h4>Current Status: <b class="status-tag bg-yellow">MILD</b> </h4>
    <br>
    <p>
        Small areas of balloon-like swelling
        in the retina’s tiny blood vessels,
        called microaneurysms, occur at this
        earliest stage of the disease. These
        microaneurysms may leak fluid into
        the retina.   
    </p>`
    let MODERATE = `
    <h4>Current Status: <b class="status-tag bg-orange">MODERATE</b> </h4>
    <br>
    <p>
        As the disease
        progresses, blood vessels that
        nourish the retina may swell and
        distort. They may also lose their
        ability to transport blood. Both
        conditions cause characteristic
        changes to the appearance of the
        retina and may contribute to Diabetic
        Macular Edema (DME)
    </p>`
    let SEVERE = `
    <h4>Current Status: <b class="status-tag bg-danger" >SEVERE</b> </h4>
    <br>
    <p>
        Many more blood vessels are
        blocked, depriving blood supply to
        areas of the retina. These areas
        secrete growth factors that signal the
        retina to grow new blood vessels.
    </p>`
    let BLINDNESS = `
    <h4>Current Status: <b class="status-tag bg-danger">BLINDNESS</b> </h4>
    <br>
    <p>
        Blood vessels become
        fragile, which makes them more
        likely to leak and bleed.
        Scar tissue can
        contract and cause retinal
        detachment—the pulling away of the
        retina from underlying tissue, like
        wallpaper peeling away from a wall.
        Retinal detachment can lead to
        permanent vision loss.
    
    </p>`

    let IMAGE_POS  = 0
    document.querySelectorAll(".image-container").forEach(container=>{
        console.log(ELEM_POSITIONS[IMAGE_POS])
        if (ELEM_POSITIONS[IMAGE_POS] == 0){
            container.querySelector(".show-results").innerHTML = NO_DR
            
        }
        else if (ELEM_POSITIONS[IMAGE_POS] == 1){
            container.querySelector(".show-results").innerHTML = MILD 

        }
        else if (ELEM_POSITIONS[IMAGE_POS] == 2){
            container.querySelector(".show-results").innerHTML = MODERATE

        }
        else if (ELEM_POSITIONS[IMAGE_POS] == 3){
            container.querySelector(".show-results").innerHTML = SEVERE

        }
        else if (ELEM_POSITIONS[IMAGE_POS] == 4){
            container.querySelector(".show-results").innerHTML = BLINDNESS 
            
        }
        IMAGE_POS += 1
    
    })
    
}