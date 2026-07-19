// ======================================
// Certificate Generator
// Create Certificate JavaScript
// ======================================



// ======================================
// LOAD SELECTED TEMPLATE
// ======================================


let selectedTemplate =
JSON.parse(
    localStorage.getItem("selectedTemplate")
);



if(selectedTemplate){


    localStorage.setItem(
        "certificateBackground",
        selectedTemplate.image
    );


}





// ======================================
// GENERATE CERTIFICATE ID
// ======================================


function generateCertificateID(){


    let number =
    Math.floor(
        100000 +
        Math.random()*900000
    );


    return "CERT-" + number;


}





// ======================================
// CREATE PAGE ELEMENTS
// ======================================


const certificateForm =
document.getElementById("certificateForm");



const certificateId =
document.getElementById("certificateId");





// Auto Generate ID

if(certificateId){

    certificateId.value =
    generateCertificateID();

}





// ======================================
// BACKGROUND UPLOAD
// ======================================


const background =
document.getElementById("background");



if(background){


background.addEventListener(
"change",
function(e){


    let file =
    e.target.files[0];



    if(file){


        let reader =
        new FileReader();



        reader.onload=function(){


            localStorage.setItem(
                "certificateBackground",
                reader.result
            );


        }



        reader.readAsDataURL(file);



    }



});


}






// ======================================
// LIVE PREVIEW
// ======================================


const previewBtn =
document.getElementById("previewBtn");




if(previewBtn){


previewBtn.addEventListener(
"click",
function(){



let name =
document.getElementById("name");

let course =
document.getElementById("course");

let date =
document.getElementById("date");





if(document.getElementById("previewName")){


document.getElementById("previewName")
.innerText =
name.value;


}



if(document.getElementById("previewCourse")){


document.getElementById("previewCourse")
.innerText =
course.value;


}



if(document.getElementById("previewDate")){


document.getElementById("previewDate")
.innerText =
date.value;


}



if(document.getElementById("previewId")){


document.getElementById("previewId")
.innerText =
certificateId.value;


}



});


}






// ======================================
// SAVE CERTIFICATE
// ======================================


if(certificateForm){


certificateForm.addEventListener(
"submit",
function(e){


e.preventDefault();





let certificate = {


id:
certificateId.value,



name:
document.getElementById("name").value,



father:
document.getElementById("father").value,



course:
document.getElementById("course").value,



type:
document.getElementById("type").value,



date:
document.getElementById("date").value,



organization:
document.getElementById("organization").value,



verified:false,



created:
new Date()
.toLocaleDateString()



};







let certificates =
JSON.parse(
localStorage.getItem("certificates")
) || [];






certificates.push(
certificate
);






localStorage.setItem(

"certificates",

JSON.stringify(certificates)

);







localStorage.setItem(

"currentCertificate",

JSON.stringify(certificate)

);







alert(
"Certificate Created Successfully!"
);







window.location.href =
"certificate.html";




});


}






// ======================================
// AUTO LOAD ORGANIZATION SETTINGS
// ======================================


let settings =
JSON.parse(
localStorage.getItem("settings")
);



if(settings){



let org =
document.getElementById("organization");



if(org && settings.organization){


org.value =
settings.organization;


}



}





// ======================================
// CLEAR SELECTED TEMPLATE AFTER USE
// ======================================


window.addEventListener(
"beforeunload",
()=>{


localStorage.removeItem(
"selectedTemplate"
);


});