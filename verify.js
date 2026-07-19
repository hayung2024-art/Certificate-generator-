
}// ======================================
// Certificate Verification System
// verify.js
// ======================================



document.addEventListener("DOMContentLoaded",()=>{



// ======================================
// GET ELEMENTS
// ======================================


const verifyForm =
document.getElementById("verifyForm");


const certificateNumber =
document.getElementById("verifyId");


const resultBox =
document.getElementById("result");


const statusText =
document.getElementById("status");



const vName =
document.getElementById("vName");


const vCourse =
document.getElementById("vCourse");


const vType =
document.getElementById("vType");


const vId =
document.getElementById("vId");


const vDate =
document.getElementById("vDate");


const vOrg =
document.getElementById("vOrg");




// ======================================
// CLEAR RESULT
// ======================================


function clearResult(){


if(vName)
vName.innerText="-";


if(vCourse)
vCourse.innerText="-";


if(vType)
vType.innerText="-";


if(vId)
vId.innerText="-";


if(vDate)
vDate.innerText="-";


if(vOrg)
vOrg.innerText="-";


}



// ======================================
// VERIFY FUNCTION
// ======================================


function verifyCertificate(id){


let searchID =
id.trim().toUpperCase();



if(searchID===""){


alert(
"Please enter Certificate ID"
);


return;


}




let certificates =
JSON.parse(
localStorage.getItem("certificates")
)||[];




let certificate =
certificates.find(cert=>

cert.id.toUpperCase() === searchID

);





if(resultBox){

resultBox.style.display="block";

}





// ======================================
// VALID CERTIFICATE
// ======================================


if(certificate){



if(statusText){

statusText.innerHTML =
"✓ Certificate Verified Successfully";


statusText.className =
"success";


}




if(vName)
vName.innerText =
certificate.name || "-";



if(vCourse)
vCourse.innerText =
certificate.course || "-";



if(vType)
vType.innerText =
certificate.type || "-";



if(vId)
vId.innerText =
certificate.id || "-";



if(vDate)
vDate.innerText =
formatDate(certificate.date);



if(vOrg)
vOrg.innerText =
certificate.organization || "-";





// Update Verification Data


if(!certificate.verified){


certificate.verified=true;


certificate.verifyDate =
new Date()
.toISOString();



localStorage.setItem(

"certificates",

JSON.stringify(certificates)

);


}





}





// ======================================
// INVALID CERTIFICATE
// ======================================


else{


if(statusText){

statusText.innerHTML =
"✕ Invalid Certificate ID";


statusText.className =
"error";

}



clearResult();


}





}





// ======================================
// FORM SUBMIT
// ======================================


if(verifyForm){


verifyForm.addEventListener(
"submit",
(e)=>{


e.preventDefault();


verifyCertificate(
certificateNumber.value
);


});


}





// ======================================
// AUTO VERIFY FROM URL
// ======================================


let params =
new URLSearchParams(
window.location.search
);


let urlID =
params.get("id");



if(
urlID &&
certificateNumber &&
verifyForm
){


certificateNumber.value =
urlID;


verifyCertificate(urlID);


}





// ======================================
// DATE FORMAT
// ======================================


function formatDate(date){


if(!date)
return "-";


let d =
new Date(date);



return d.toLocaleDateString(
"en-IN",
{

day:"2-digit",

month:"short",

year:"numeric"

}

);


}



});