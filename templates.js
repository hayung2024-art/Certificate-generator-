
}// ======================================
// Certificate Generator
// Template Management JavaScript
// ======================================


// ===============================
// Elements
// ===============================


const upload =
document.getElementById("templateUpload");


const preview =
document.getElementById("templatePreview");


const saveBtn =
document.getElementById("saveTemplate");


const clearBtn =
document.getElementById("clearTemplate");


const templateList =
document.getElementById("templateList");


const templateName =
document.getElementById("templateName");



let selectedImage = "";




// ===============================
// Image Preview Upload
// ===============================


if(upload){


upload.addEventListener("change",function(e){


    const file =
    e.target.files[0];



    if(!file)
    return;



    if(!file.type.startsWith("image/")){

        alert("Please select image file only");

        return;

    }



    const reader =
    new FileReader();



    reader.onload=function(){


        selectedImage =
        reader.result;



        if(preview){

            preview.src =
            selectedImage;

        }


    };


    reader.readAsDataURL(file);



});


}





// ===============================
// Clear Preview
// ===============================


if(clearBtn){


clearBtn.addEventListener("click",()=>{


    selectedImage="";


    if(preview){

        preview.src="";

    }


    if(upload){

        upload.value="";

    }


    if(templateName){

        templateName.value="";

    }


});


}






// ===============================
// Save Template
// ===============================


if(saveBtn){


saveBtn.addEventListener("click",function(){



    if(selectedImage===""){


        alert(
        "Please upload certificate template"
        );

        return;

    }




    let templates =
    JSON.parse(
        localStorage.getItem("templates")
    ) || [];




    let name =
    templateName ?
    templateName.value.trim()
    :
    "Certificate Template";




    let template={


        id:
        "TEMP-" + Date.now(),


        name:name,


        image:selectedImage,


        created:
        new Date()
        .toLocaleDateString()


    };





    templates.push(template);



    localStorage.setItem(
        "templates",
        JSON.stringify(templates)
    );




    alert(
    "Template Saved Successfully!"
    );



    loadTemplates();



    selectedImage="";



});



}








// ===============================
// Load Templates
// ===============================


function loadTemplates(){



if(!templateList)
return;



let templates =
JSON.parse(
localStorage.getItem("templates")
) || [];





templateList.innerHTML="";





if(templates.length===0){



templateList.innerHTML=`

<div class="empty-template">

<i class="fa-solid fa-image"></i>

<p>
No Templates Available
</p>

</div>

`;

return;


}







templates.reverse().forEach(temp=>{



templateList.innerHTML +=`



<div class="template-card">



<img 
src="${temp.image}"
alt="Certificate Template"
>



<h3>

${temp.name}

</h3>



<p>

${temp.created}

</p>



<div class="template-actions">


<button

class="use-template"

onclick="useTemplate('${temp.id}')">

<i class="fa-solid fa-check"></i>

Use

</button>





<button

class="delete-template"

onclick="deleteTemplate('${temp.id}')">


<i class="fa-solid fa-trash"></i>

Delete


</button>



</div>



</div>



`;



});



}



loadTemplates();








// ===============================
// Use Template
// ===============================


function useTemplate(id){



let templates =
JSON.parse(
localStorage.getItem("templates")
) || [];





let template =
templates.find(
item=>item.id===id
);





if(template){



localStorage.setItem(

"selectedTemplate",

JSON.stringify(template)

);




alert(
"Template Selected Successfully!"
);




window.location.href=
"create.html";



}



}








// ===============================
// Delete Template
// ===============================


function deleteTemplate(id){



if(!confirm(
"Delete this template?"
))

return;





let templates =
JSON.parse(
localStorage.getItem("templates")
) || [];




templates =
templates.filter(
item=>item.id!==id
);




localStorage.setItem(

"templates",

JSON.stringify(templates)

);




loadTemplates();



}