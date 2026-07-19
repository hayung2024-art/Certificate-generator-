
}, 10000);// ======================================
// Dashboard JavaScript
// Certificate Generator System
// ======================================


// ======================================
// LOGIN SECURITY
// ======================================

document.addEventListener("DOMContentLoaded",()=>{


if(localStorage.getItem("isLoggedIn") !== "true"){

    window.location.href="login.html";
    return;

}


// ======================================
// LOGOUT SYSTEM
// ======================================

const logoutBtn =
document.getElementById("logoutBtn");


if(logoutBtn){

logoutBtn.addEventListener("click",(e)=>{

e.preventDefault();


const confirmLogout =
confirm("Are you sure you want to logout?");


if(confirmLogout){

localStorage.removeItem("isLoggedIn");
localStorage.removeItem("adminEmail");


window.location.href="login.html";

}


});


}


// ======================================
// GET CERTIFICATE DATA
// ======================================


let certificates =
JSON.parse(
localStorage.getItem("certificates")
) || [];



// ======================================
// DASHBOARD COUNTERS
// ======================================


const totalCertificates =
document.getElementById("totalCertificates");


const todayCertificates =
document.getElementById("todayCertificates");


const verifiedCertificates =
document.getElementById("verifiedCertificates");


const downloads =
document.getElementById("downloads");




// Total Certificate

if(totalCertificates){

totalCertificates.innerHTML =
certificates.length;

}




// Today's Certificate


let today =
new Date()
.toISOString()
.split("T")[0];


let todayCount =
certificates.filter(cert=>{

return cert.date === today;

}).length;



if(todayCertificates){

todayCertificates.innerHTML =
todayCount;

}




// Verified Certificate


let verifiedCount =
certificates.filter(cert=>{

return cert.verified === true;

}).length;



if(verifiedCertificates){

verifiedCertificates.innerHTML =
verifiedCount;

}




// PDF Download Count


if(downloads){

downloads.innerHTML =
localStorage.getItem("downloadCount") || 0;

}



// ======================================
// RECENT CERTIFICATE TABLE
// ======================================


const table =
document.getElementById("certificateTable");



if(table){


table.innerHTML="";



if(certificates.length===0){


table.innerHTML=`

<tr>

<td colspan="5" style="text-align:center">

No Certificates Found

</td>

</tr>

`;


}

else{


// Show latest 10 certificates

certificates
.slice()
.reverse()
.slice(0,10)
.forEach(cert=>{


let status =
cert.verified
?
`
<span class="status valid">
Verified
</span>
`
:
`
<span class="status pending">
Pending
</span>
`;



table.innerHTML +=`

<tr>

<td>
${cert.id || "-"}
</td>


<td>
${cert.name || "-"}
</td>


<td>
${cert.course || "-"}
</td>


<td>
${formatDate(cert.date)}
</td>


<td>
${status}
</td>


</tr>

`;



});


}



}



// ======================================
// ADMIN NAME
// ======================================


const adminName =
document.querySelector(".admin span");


let adminEmail =
localStorage.getItem("adminEmail");



if(adminName && adminEmail){

adminName.innerHTML =
adminEmail;


}



// ======================================
// DATE FORMAT FUNCTION
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



// ======================================
// AUTO UPDATE WITHOUT RELOAD
// ======================================


window.addEventListener(
"storage",
()=>{

location.reload();

});


});