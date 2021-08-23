createHeader();
if (localStorage.getItem("User") === null) {
    
    
} else {  

    
}


//-------------------------- PAGE HEADER FUNCTION  ----------------------------------//
function createHeader(){
let body = document.getElementById("body");
let main = document.getElementById("main");
let siteHeader = document.createElement("h1");
    body.appendChild(main);
    main.appendChild(siteHeader);
    siteHeader.id = "siteHeader";
    siteHeader.innerHTML = "Secret</br> News Letter</br> Club";
}

//---------------------------- CREATES LOGINFIELD ------------------------------------//


let main2 = document.createElement("div");
let signInDiv = document.createElement("div");
let signInName = document.createElement("input");
let signInPass = document.createElement("input");
let signInBtn = document.createElement("button");
    body.appendChild(main2);
    main2.id = "main2";
    signInDiv.id = "signInDiv";
    signInName.placeholder = "username";
    signInName.id = "signInName";
    signInPass.placeholder = "password";
    signInPass.id = "signInPass";
    signInPass.type = "password";
    main2.appendChild(signInDiv);
    signInDiv.appendChild(signInName);
    signInDiv.appendChild(signInPass);
    signInDiv.appendChild(signInBtn);
    signInBtn.innerHTML = "Sign In";
    signInBtn.id ="signInBtn";


//-------------------------  REGISTER ACCOUNT FUNCTION  -----------------------------------------//

let joinDiv = document.createElement("div");
let joinHeader = document.createElement("h4");
let joinBtn = document.createElement("button");
    main2.appendChild(joinDiv);
    joinDiv.id = "joinDiv";
    joinHeader.id ="joinHeader";
    joinDiv.appendChild(joinHeader);
    joinDiv.appendChild(joinBtn);
    joinHeader.innerHTML = "Not a Member? Do you want to join us?";
    joinBtn.innerHTML = "Join!";

    joinBtn.addEventListener("click", function(){
    joinDiv.innerHTML = "";
    signInDiv.innerHTML = "";
let newUsername = document.createElement("input");
let newUserEmail = document.createElement("input");
let newUserPass = document.createElement("input");
let newsLetterDiv = document.createElement("div");
let letterCheck = document.createElement("input");
let nLetterCheckLabel = document.createElement("label");
    newUsername.id = "newUsername";
    newUserEmail.id = "newUserEmail";
    newUserPass.id = "newUserPass";
    newUserPass.type = "password";
    nLetterCheckLabel.for = "nletterCheck";
    letterCheck.type = "checkbox";
    letterCheck.id = "letterCheck";
    nLetterCheckLabel.innerHTML = "Do you want our News Letter?";
let joinBtn2 = document.createElement("button");
    joinBtn2.innerHTML = "Join Secret Club";
    joinBtn2.id = "joinBtn2";
    newUsername.placeholder = "Choose a username";
    newUserEmail.placeholder = "Enter your Email";
    newUserPass.placeholder = "Choose your Password";
    joinDiv.appendChild(newUsername);
    joinDiv.appendChild(newUserEmail);
    joinDiv.appendChild(newUserPass);
    joinDiv.appendChild(newsLetterDiv);
    newsLetterDiv.appendChild(nLetterCheckLabel);
    newsLetterDiv.appendChild(letterCheck);
    joinDiv.appendChild(joinBtn2);


joinBtn2.addEventListener("click", function(){
    let newUsernameInput = document.getElementById("newUsername").value;
    let newUserEmailInput = document.getElementById("newUserEmail").value;
    let newUserPassInput = document.getElementById("newUserPass").value;
    let checkAccept;
    let checkbox = document.getElementById("letterCheck");
        if (checkbox.checked == true){
            checkAccept = true;
        } else {
            checkAccept = false;
        }

    let newUserNameandEmail =       
        {
        name:newUsernameInput,
        email:newUserEmailInput,
        newsletter:checkAccept,
        pwd:newUserPassInput
            };

    fetch("http://localhost:3000/admin/add",{
        method: "post",
        headers: {
             "Content-Type": "application/json",
            },
        body:JSON.stringify(newUserNameandEmail)
            })
         .then(res => res.json())
          .then(data => console.log(data))   
            signInDiv.innerHTML = "Welcome " + newUsernameInput + ", nice with a new face in this murky old club...</br> If you need to update your profile settings, please sign out and sign in again</br>";
            joinDiv.innerHTML = "";
            //joinDiv.innerHTML += "<button id='profileSettings'>Profile Settings</button></br>";
            joinDiv.innerHTML += "<button id='signOutBtn'>Sign Out</button>";

        let signOutBtn = document.getElementById("signOutBtn");
            signOutBtn.addEventListener("click", function(){
                location.reload();//efter att ha sparat i LS, ändra detta till clear LS. 
         })


    });

});



/*function createLoggedIn(){
    signInDiv.innerHTML = "";
    joinDiv.innerHTML = "";
    signInDiv.innerHTML += "<h3 id='welcomeBack'>Welcome back " + data.username + "!</h3></br>";
    joinDiv.innerHTML += "<button id='profileSettings'>Profile Settings</button></br>";
    joinDiv.innerHTML += "<button id='signOutBtn'>Sign Out</button>";

    let signOutBtn = document.getElementById("signOutBtn");
    signOutBtn.addEventListener("click", function(){
      location.reload();//efter att ha sparat i LS, ändra detta till clear LS. 

    }) 
}*/



// ---------------------------  LOGIN FUNCTION  ------------------------------------ //
signInBtn.addEventListener("click", function(){
    let enteredName = document.getElementById("signInName").value;
    let enteredPass = document.getElementById("signInPass").value;
    let loginDetails = {"name":enteredName,"pwd":enteredPass};
    console.log("clicked");

    fetch("http://localhost:3000/admin/login",{
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(loginDetails)
        })
       .then(res => res.json())
         .then(data => {

        console.log(data);
         if (data.login === "OK"){
            //createLoggedIn();  
            signInDiv.innerHTML = "";
            joinDiv.innerHTML = "";
            signInDiv.innerHTML += "<h3 id='welcomeBack'>Welcome back " + data.username + "!</h3></br>";
            joinDiv.innerHTML += "<button id='profileSettings'>Profile Settings</button></br>";
            joinDiv.innerHTML += "<button id='signOutBtn'>Sign Out</button>";
            localStorage.setItem("User", data.userkey);
            let signOutBtn = document.getElementById("signOutBtn");
            signOutBtn.addEventListener("click", function(){
              location.reload();//efter att ha sparat i LS, ändra detta till clear LS. 
        
            }) 
         
// ------------------------------------- PROFILE SETTINGS -------------------------------------------------//            
             let profileSettings = document.getElementById("profileSettings");
             profileSettings.addEventListener("click", function(){
                joinDiv.innerHTML = "";
                joinDiv.innerHTML += "Username: " + data.username + "</br>";
                joinDiv.innerHTML += "Email: " + data.email + "</br>";
                joinDiv.innerHTML += "Do you want our News Letter?<input id='check' type='checkbox'></br>";
                joinDiv.innerHTML += "<button id='saveBtn'>Save Changes</button>";
                if (data.newsletter === true){
                    document.getElementById("check").checked = true;
                    console.log(data.newsletter);
                } else {
                    //let nLetter = "No";
                    document.getElementById("check").checked = false;
                    console.log(data.newsletter);
                }
             
                document.getElementById("saveBtn").addEventListener("click", function(){
                if (data.newsletter == document.getElementById("check").checked){
                    console.log("no changes made");
                    joinDiv.innerHTML += "</br>No changes were made.";
                    joinDiv.innerHTML += "</br><button id='signOutBtn2'>Sign Out</button>";
                    document.getElementById("signOutBtn2").addEventListener("click", function(){
                        location.reload();
                    })
                

                } else {
                    let cb = document.getElementById("check");
                    if (cb.checked == true){
                        checkStatus = true;
                    } else {
                        checkStatus = false;
                    };
                    let updatedProfile = 
                        {name:data.username,
                          email:data.email,
                          newsletter:checkStatus
                        };

                fetch("http://localhost:3000/admin/change",{
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                
                    },
                    body:JSON.stringify(updatedProfile)
                    })
                     .then(res => res.json())
                      .then(data => {
                    console.log("newsletter status updated");
                    joinDiv.innerHTML += "</br>You have now updated your News Letter status";
                    joinDiv.innerHTML += "</br><button id='signOutBtn2'>Sign Out</button>";
                    document.getElementById("signOutBtn2").addEventListener("click", function(){
                        location.reload();
                    })

                   })
                }
             }) 

            })

        } else if (data.login === "ERROR"){
            signInDiv.innerHTML = "";
            signInDiv.innerHTML += "Wrong username or password, try again!";
            signInDiv.innerHTML += "</br><button id='signInAgainBtn'>Sign In Again</button>";
            document.getElementById("signInAgainBtn").addEventListener("click", function(){
                location.reload();
            })


        }
     })
    

});




