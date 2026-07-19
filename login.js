/* ==========================================
   CERTIFICATE GENERATOR
   ADMIN LOGIN JAVASCRIPT
========================================== */


/* Demo Admin Account */

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "admin123";



/* Get Elements */

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const togglePassword = document.querySelector(".togglePassword");

const rememberCheckbox = document.querySelector(
    ".remember input"
);



/* ==========================================
   SHOW / HIDE PASSWORD
========================================== */


if(togglePassword){


togglePassword.addEventListener("click",()=>{


    if(passwordInput.type === "password"){


        passwordInput.type="text";


        togglePassword.classList.remove(
            "fa-eye"
        );


        togglePassword.classList.add(
            "fa-eye-slash"
        );


    }

    else{


        passwordInput.type="password";


        togglePassword.classList.remove(
            "fa-eye-slash"
        );


        togglePassword.classList.add(
            "fa-eye"
        );


    }


});


}




/* ==========================================
   AUTO FILL REMEMBER LOGIN
========================================== */


window.addEventListener(
"DOMContentLoaded",
()=>{


const savedEmail =
localStorage.getItem("savedEmail");


if(savedEmail && emailInput){


    emailInput.value=savedEmail;


    if(rememberCheckbox){

        rememberCheckbox.checked=true;

    }


}



});






/* ==========================================
   LOGIN SYSTEM
========================================== */


if(loginForm){


loginForm.addEventListener(
"submit",
(e)=>{


e.preventDefault();



const email =
emailInput.value.trim();


const password =
passwordInput.value.trim();



/* Validation */


if(email==="" || password===""){


    alert(
    "Please enter email and password"
    );


    return;


}




/* Check Login */


if(
email===ADMIN_EMAIL &&
password===ADMIN_PASSWORD
){



// Save Session


localStorage.setItem(
"isLoggedIn",
"true"
);


localStorage.setItem(
"adminEmail",
email
);




// Remember Me


if(
rememberCheckbox &&
rememberCheckbox.checked
){


localStorage.setItem(
"savedEmail",
email
);


}

else{


localStorage.removeItem(
"savedEmail"
);


}




alert(
"Login Successful!"
);



window.location.href=
"dashboard.html";



}

else{


alert(
"Invalid Email or Password!"
);



}



});


}





/* ==========================================
   LOGIN PAGE PROTECTION
========================================== */


if(
localStorage.getItem("isLoggedIn")
==="true"
&&
location.pathname.includes("login.html")
){


window.location.href=
"dashboard.html";


}






/* ==========================================
   LOGOUT FUNCTION
========================================== */


const logoutBtn =
document.getElementById("logoutBtn");


if(logoutBtn){


logoutBtn.addEventListener(
"click",
()=>{


localStorage.removeItem(
"isLoggedIn"
);


localStorage.removeItem(
"adminEmail"
);


alert(
"Logged Out Successfully"
);


window.location.href=
"login.html";


});


}