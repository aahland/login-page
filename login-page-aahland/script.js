if (localStorage.getItem("User") != null) {
    //console.log("inloggad");
    showLogInPAge();
    // anropa funktion för att visa inloggad sida.
} else {
    //console.log("inte inloggad");
    //anropa funtion för att visa sida för icke inloggad
}

function showLogInPAge() {
    var getUser = localStorage.getItem("User");
    userInfo.innerHTML = `User: ${getUser}`; 
    document.getElementById("welcome").innerHTML = "Welcome" + " " + getUser + "!";
    let login = document.getElementById("login");
    login.remove();
    document.getElementById("userInfoBox").classList.toggle("show");
           
    const signOutBtn = document.createElement("button");
    userInfoBox.appendChild(signOutBtn);
    signOutBtn.id = "signOutBtn";
    signOutBtn.insertAdjacentHTML("beforeend", "Sign out"); 

    //logga ut användare, töm localStorage och återvänd till startsida
    signOutBtn.addEventListener("click", function(){
    location.reload();
    localStorage.clear(); 
       
    })

}


let users = [
    {userName:"Janne", passWord:"test"},
    {userName:"Anton", passWord:"lösen"},
];

localStorage.setItem("users", JSON.stringify(users));

let getUsers = JSON.parse(localStorage.getItem("users"));
let getUser = localStorage.getItem("User");

// btn och event för login om användarnamn och pass är korrekt, visa rätt sida. 

const btn = document.getElementById("signBtn");

btn.addEventListener("click", function() {
    let userInput = document.getElementById("username").value;
    let userPass = document.getElementById("userpass").value;
  

    for (let i = 0; i < users.length; i++) {
        if ((userInput == users[i].userName) && (userPass == users[i].passWord)){
           localStorage.setItem("User", userInput);
           showLogInPAge(); break;      
           

        } else { 
           console.log("false")    
           document.getElementById("welcome").innerHTML = "Russian Spy?";
        
         }  

    }

// funktioner för att visa material under de olika valen i menyn: news, projects, my pages.

let newsBtn = document.getElementById("menuBtn1");

newsBtn.addEventListener("click", function(){
    document.getElementById("content").innerHTML = "<p>" + "No news today, come back later" + "</p>";
})

let projBtn = document.getElementById("menuBtn2");

projBtn.addEventListener("click", function(){
    document.getElementById("content").innerHTML = "<p>" + "No projects today, come back later" + "</p>";
})

let pagesBtn = document.getElementById("menuBtn3");

pagesBtn.addEventListener("click", function(){
    document.getElementById("content").innerHTML = "<p>" + "Under construction" + "</p>";
})
   
});