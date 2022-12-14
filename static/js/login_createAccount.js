let signUpOverlay = document.getElementById("sign-up-overlay")
let signInoverlay = document.getElementById("sign-in-overlay")

signUpOverlay.querySelector("button")
.addEventListener("click", ()=>{
    $(signUpOverlay).slideUp(1000)
    $(signInoverlay).slideDown(1000)
})

signInoverlay.querySelector("button")
.addEventListener("click", ()=>{
    $(signInoverlay).slideUp(1000)
    $(signUpOverlay).slideDown(1000)
})

let CREATE_FORM = document.querySelector("#create_account")
CREATE_FORM.addEventListener("submit",(e)=>{
    let valid  = true
    e.preventDefault()
    CREATE_FORM.querySelectorAll(".required").forEach(elem =>{
        if (elem.querySelector("input").value.length == 0){
            valid = false
            elem.querySelector(".promp-err").classList.remove("hidden")
        }
        else{
            true
            elem.querySelector(".promp-err").classList.add("hidden")
        }
    })
    let usernameInput = e.target.username.value.length   
    if (usernameInput < 3 || usernameInput >= 15){
        valid = false
        document.querySelector("#username-err").classList.remove("hidden")
    }
    else{
        document.querySelector("#username-err").classList.add("hidden")
    }
    if (e.target.password.value !== e.target.confirmPassword.value){
        valid = false
        document.querySelector("#sign-up-err").classList.remove("hidden")
    }
    else{
       
        document.querySelector("#sign-up-err").classList.add("hidden")
    }
 
    if(valid){
        let data ={
            "username":e.target.username.value,
            "email":e.target.email.value,
            "password":e.target.password.value  
        }
        $.ajax({
            url: "/create/user/algo/",
            method: "POST",
            data:{
                infor :data,
                csrfmiddlewaretoken: csrftoken
            },
            success:(res) =>{
               if(res){    
                    $(signInoverlay).slideUp(1000)
                    $(signUpOverlay).slideDown(1000)       
                
               }
            }
    
        })  
        
    }
})

let LOGIN_FORM = document.getElementById("login")
LOGIN_FORM.addEventListener("submit", (e)=>{

    e.preventDefault()
    let valid = true
    LOGIN_FORM.querySelectorAll(".required").forEach((elem)=>{

        if(elem.querySelector("input").value.length == 0){
            valid = false
            elem.querySelector(".promp-err").classList.remove("hidden")
        }
        else{
            
            elem.querySelector(".promp-err").classList.add("hidden")
        }
    })
    if (valid)
    {
       let data = {
        "username" : e.target.username.value,
        "password"  : e.target.password.value
       }
       $.ajax({
        url: "/user/login/algo",
        method: "POST",
        data:{
            infor :data,
            csrfmiddlewaretoken: csrftoken
        },
        success:(results) =>{
            if (!results["status"]){
                LOGIN_FORM.querySelector("#login-err").classList.remove("hidden")
           }
           else{
                window.location.href = "/home/"
           }
        }

    })
    }


})
