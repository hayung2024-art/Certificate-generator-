
}// ======================================
// Certificate Generator
// Settings JavaScript
// ======================================


document.addEventListener("DOMContentLoaded",()=>{



// ======================================
// ELEMENTS
// ======================================


const settingsForm =
document.getElementById("settingsForm");


const websiteName =
document.getElementById("websiteName");


const organization =
document.getElementById("organization");


const director =
document.getElementById("director");


const signature =
document.getElementById("signature");


const logo =
document.getElementById("logo");


const background =
document.getElementById("background");


const theme =
document.getElementById("theme");


const prefix =
document.getElementById("prefix");


const footer =
document.getElementById("footer");





// ======================================
// LOAD SETTINGS
// ======================================


function loadSettings(){


let settings =
JSON.parse(
localStorage.getItem("settings")
) || {};



if(websiteName)

websiteName.value =
settings.websiteName || 
"Certificate Generator";



if(organization)

organization.value =
settings.organization || 
"";



if(director)

director.value =
settings.director || 
"";



if(theme)

theme.value =
settings.theme || 
"light";



if(prefix)

prefix.value =
settings.prefix || 
"CERT";



if(footer)

footer.value =
settings.footer ||
"Powered by Certificate Generator";




// Apply Theme

if(
settings.theme==="dark"
){

document.body.classList.add(
"dark-mode"
);

}



}



loadSettings();






// ======================================
// IMAGE UPLOAD FUNCTION
// ======================================


function saveImage(file,key){


return new Promise((resolve)=>{


if(!file){

resolve("");

return;

}



let reader =
new FileReader();



reader.onload=()=>{


localStorage.setItem(
key,
reader.result
);



resolve(
reader.result
);


};



reader.readAsDataURL(file);



});



}






// ======================================
// SAVE SETTINGS
// ======================================


if(settingsForm){



settingsForm.addEventListener(
"submit",
async(e)=>{


e.preventDefault();




let signatureData =
await saveImage(
signature?.files[0],
"signature"
);



let logoData =
await saveImage(
logo?.files[0],
"logo"
);



let backgroundData =
await saveImage(
background?.files[0],
"certificateBackground"
);






let oldSettings =
JSON.parse(
localStorage.getItem("settings")
)||{};





let settings = {


websiteName:
websiteName.value.trim(),


organization:
organization.value.trim(),


director:
director.value.trim(),


theme:
theme.value,


prefix:
prefix.value.trim(),


footer:
footer.value.trim(),



signature:
signatureData ||
oldSettings.signature ||
"",


logo:
logoData ||
oldSettings.logo ||
"",


background:
backgroundData ||
oldSettings.background ||
""



};






localStorage.setItem(

"settings",

JSON.stringify(settings)

);






// Apply Theme


if(settings.theme==="dark"){


document.body.classList.add(
"dark-mode"
);


}

else{


document.body.classList.remove(
"dark-mode"
);


}






alert(
"Settings Saved Successfully!"
);




});



}






// ======================================
// THEME CHANGE
// ======================================


if(theme){


theme.addEventListener(
"change",
()=>{


if(theme.value==="dark"){


document.body.classList.add(
"dark-mode"
);


}

else{


document.body.classList.remove(
"dark-mode"
);


}


});


}






// ======================================
// RESET SETTINGS
// ======================================


const resetBtn =
document.querySelector(
"button[type='reset']"
);



if(resetBtn){


resetBtn.addEventListener(
"click",
()=>{


let confirmReset =
confirm(
"Reset all settings?"
);



if(confirmReset){


localStorage.removeItem(
"settings"
);


localStorage.removeItem(
"logo"
);


localStorage.removeItem(
"signature"
);


localStorage.removeItem(
"certificateBackground"
);



location.reload();


}



});



}




});