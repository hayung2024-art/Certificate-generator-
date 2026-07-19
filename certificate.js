
}// ======================================
// Certificate Generator System
// certificate.js
// ======================================


// ======================================
// GENERATE CERTIFICATE ID
// ======================================

function generateCertificateID(){

    let id;

    let certificates =
    JSON.parse(localStorage.getItem("certificates")) || [];


    do{

        let number =
        Math.floor(
            100000 + Math.random()*900000
        );

        id = "CERT-" + number;


    }
    while(
        certificates.some(
            cert=>cert.id===id
        )
    );


    return id;

}



// ======================================
// CREATE CERTIFICATE PAGE
// ======================================


const certificateForm =
document.getElementById("certificateForm");



if(certificateForm){



const certificateId =
document.getElementById("certificateId");



if(certificateId){

certificateId.value =
generateCertificateID();

}




// Auto Date


const dateInput =
document.getElementById("date");


if(dateInput && !dateInput.value){

dateInput.value =
new Date()
.toISOString()
.split("T")[0];

}




// Background Upload


const background =
document.getElementById("background");



if(background){


background.addEventListener(
"change",
(e)=>{


const file =
e.target.files[0];


if(file){


const reader =
new FileReader();



reader.onload=()=>{


localStorage.setItem(
"certificateBackground",
reader.result
);


};



reader.readAsDataURL(file);


}



});


}




// Preview Certificate


const previewBtn =
document.getElementById("previewBtn");



if(previewBtn){


previewBtn.addEventListener(
"click",
()=>{


updatePreview();


});


}




function updatePreview(){


let fields = [

["previewName","name"],
["previewCourse","course"],
["previewDate","date"],
["previewId","certificateId"]

];



fields.forEach(item=>{


let preview =
document.getElementById(item[0]);


let input =
document.getElementById(item[1]);



if(preview && input){

preview.innerText =
input.value || "-";

}


});



}




// SAVE CERTIFICATE


certificateForm.addEventListener(
"submit",
(e)=>{


e.preventDefault();



let certificate = {


id:
certificateId.value,


name:
document.getElementById("name").value.trim(),


father:
document.getElementById("father").value.trim(),


course:
document.getElementById("course").value.trim(),


type:
document.getElementById("type").value,


date:
document.getElementById("date").value,


organization:
document.getElementById("organization").value.trim(),


verified:false,


createdAt:
new Date().toISOString()


};





if(
certificate.name==="" ||
certificate.course===""
){

alert(
"Please fill required fields"
);

return;

}




let certificates =
JSON.parse(
localStorage.getItem("certificates")
)||[];




certificates.push(certificate);



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
// DISPLAY CERTIFICATE
// ======================================


let certificateData =
JSON.parse(
localStorage.getItem("currentCertificate")
);



if(certificateData){



function setText(id,value){


let element =
document.getElementById(id);


if(element){

element.innerText =
value || "-";

}


}




setText(
"candidateName",
certificateData.name
);



setText(
"courseName",
certificateData.course
);



setText(
"certificateId",
certificateData.id
);



setText(
"issueDate",
certificateData.date
);




// Background


let bg =
document.getElementById(
"certificateBg"
);



let savedBg =
localStorage.getItem(
"certificateBackground"
);



if(bg && savedBg){

bg.src =
savedBg;

}





// QR CODE


let qr =
document.getElementById(
"qrCode"
);



if(qr){


qr.innerHTML="";



let verifyURL =
window.location.origin +
"/verify.html?id=" +
certificateData.id;



new QRCode(
qr,
{

text:verifyURL,

width:120,

height:120

}

);


}



}




// ======================================
// DOWNLOAD PDF
// ======================================


const downloadBtn =
document.getElementById(
"downloadBtn"
);



if(downloadBtn){


downloadBtn.addEventListener(
"click",
async()=>{


const certificate =
document.getElementById(
"certificate"
);



if(!certificate)
return;



html2canvas(
certificate,
{

scale:2,

useCORS:true

}

)
.then(canvas=>{


let imgData =
canvas.toDataURL(
"image/png"
);



let pdf =
new jspdf.jsPDF(
"landscape",
"px",
[
canvas.width,
canvas.height
]
);



pdf.addImage(
imgData,
"PNG",
0,
0,
canvas.width,
canvas.height
);



pdf.save(
certificateData?.id ||
"certificate.pdf"
+
".pdf"
);





let count =
Number(
localStorage.getItem(
"downloadCount"
)
)||0;



localStorage.setItem(
"downloadCount",
count+1
);



});


});



}





// ======================================
// PRINT
// ======================================


const printBtn =
document.getElementById(
"printBtn"
);



if(printBtn){


printBtn.onclick=()=>{

window.print();

};


}