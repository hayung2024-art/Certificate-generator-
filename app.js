
});// ======================================
// Certificate Generator
// Common Application JavaScript
// ======================================


document.addEventListener("DOMContentLoaded",()=>{



// ======================================
// LOGIN PROTECTION
// ======================================


const publicPages = [

"",

"index.html",

"login.html",

"verify.html"

];



let currentPage =
window.location.pathname
.split("/")
.pop();



let isLoggedIn =
localStorage.getItem(
"isLoggedIn"
);



if(

!publicPages.includes(currentPage)

&&

isLoggedIn !== "true"

){


window.location.href =
"login.html";


return;


}




// ======================================
// LOGOUT SYSTEM
// ======================================


const logoutBtn =
document.getElementById(
"logoutBtn"
);



if(logoutBtn){


logoutBtn.addEventListener(
"click",
(e)=>{


e.preventDefault();



if(
confirm(
"Are you sure you want to logout?"
)
){


localStorage.removeItem(
"isLoggedIn"
);


localStorage.removeItem(
"adminEmail"
);



window.location.href =
"login.html";


}



});



}





// ======================================
// MOBILE SIDEBAR
// ======================================


const menuBtn =
document.getElementById(
"menuBtn"
);


const sidebar =
document.querySelector(
".sidebar"
);



if(menuBtn && sidebar){



menuBtn.addEventListener(
"click",
()=>{


sidebar.classList.toggle(
"show"
);


});


}



// Close sidebar on link click


document
.querySelectorAll(".menu a")
.forEach(link=>{


link.addEventListener(
"click",
()=>{


if(window.innerWidth < 768){


sidebar?.classList.remove(
"show"
);


}


});


});






// ======================================
// ACTIVE MENU
// ======================================


let currentURL =
window.location.href;



document
.querySelectorAll(".menu li")
.forEach(item=>{


let link =
item.querySelector("a");



if(
link &&
currentURL.includes(
link.getAttribute("href")
)
){


item.classList.add(
"active"
);


}


});






// ======================================
// DARK MODE
// ======================================


const darkBtn =
document.getElementById(
"darkModeBtn"
);



let darkMode =
localStorage.getItem(
"darkMode"
);



if(darkMode==="true"){


document.body.classList.add(
"dark-mode"
);


}




if(darkBtn){


darkBtn.addEventListener(
"click",
()=>{


document.body.classList.toggle(
"dark-mode"
);



let enabled =
document.body.classList.contains(
"dark-mode"
);



localStorage.setItem(
"darkMode",
enabled
);



});


}






// ======================================
// LOAD WEBSITE SETTINGS
// ======================================


function loadSettings(){



let settings =
JSON.parse(
localStorage.getItem(
"settings"
)
)||{};




document
.querySelectorAll(
".organization-name"
)
.forEach(element=>{


if(settings.organization){


element.innerText =
settings.organization;


}



});




document
.querySelectorAll(
".website-name"
)
.forEach(element=>{


if(settings.websiteName){


element.innerText =
settings.websiteName;


}



});



}



loadSettings();






// ======================================
// SAVE SETTINGS FUNCTION
// ======================================


window.saveSettings =
function(data){


localStorage.setItem(

"settings",

JSON.stringify(data)

);



alert(
"Settings Saved Successfully!"
);



};







// ======================================
// AUTO YEAR
// ======================================


document
.querySelectorAll(".year")
.forEach(element=>{


element.innerText =
new Date()
.getFullYear();


});






// ======================================
// PREVENT MULTIPLE SUBMIT
// ======================================


document
.querySelectorAll("form")
.forEach(form=>{


form.addEventListener(
"submit",
()=>{


let button =
form.querySelector(
"button[type='submit']"
);



if(button){


button.disabled=true;


button.style.opacity="0.7";



setTimeout(()=>{


button.disabled=false;

button.style.opacity="1";


},2000);



}



});


});






// ======================================
// AUTO UPDATE LOGIN USER
// ======================================


let adminEmail =
localStorage.getItem(
"adminEmail"
);



document
.querySelectorAll(
".admin-email"
)
.forEach(element=>{


if(adminEmail){

element.innerText =
adminEmail;


}


});



});