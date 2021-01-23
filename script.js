const submitBtn = document.getElementById('submitBtn');
const form= document.getElementById('Form');
const successfulSubmission = document.getElementById('successfulSubmission');
const formCard = document.getElementById('formCard');

successfulSubmission.style.display = "none";

submitForm = ()=> {
    submitBtn.innerHTML=`Loading...`;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const memeScale = document.getElementById('memeScale').value;
    const prosCons = document.getElementById('prosCons').value;
    const profession = document.getElementById('profession').value;
    const socialScale = document.getElementById('socialScale').value;
    let apps = document.getElementById("apps").selectedOptions;
    let appsArr = [];

    for (let i=0; i<apps.length; i++) {
        appsArr.push(apps[i].label);
    }

    if (!name ||!email ||!age|| !profession || !apps||!prosCons) {
        if(!name){
            validationAlert("#NameVal","Name field should not be empty")
        }
        if(!email){
            validationAlert("#EmailVal","email field should not be empty")
        }
        if(!age){
            validationAlert("#AgeVal","age field should not be empty")
        }
        if(apps.length === 0){
            validationAlert("#AppsVal","Please select an option")
        }
        if(prosCons === ""){
            validationAlert("#ProsConsVal","Please fill out this field")
        }
        if(!memeScale){
            validationAlert("#MemeScaleVal","Please fill out this field")
        }
        if(!profession){
            validationAlert("#ProfessionVal","Profession field should not be empty")
        }
        if(socialScale.length === 0){
            validationAlert("#SocialScaleVal","Please fill out this field")
        }
        custom_alert('warning', 'Please fill out all the mandatory fields');
        submitBtn.innerHTML = "Submit"
    } else {
        let payload = {
            name:name,
            email:email,
            profession:profession,
            ageGroup:age,
            socialScale:socialScale,
            apps:appsArr,
            prosAndCons:prosCons,
            memeScale:memeScale
        }
        SaveResponse(payload);
    }
}

function redirectToForm(){
    successfulSubmission.style.display = "none";
    formCard.style.display = "block";       
}

async function SaveResponse(payload) {
    const datares = await fetch('https://hexoniq.herokuapp.com/response', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (datares.status !== 201) {
        custom_alert("warning", "something went wrong!!!");
        loginbtn.innerHTML = 'Try Again'
    } else {
        custom_alert('success', 'Thanks for your Response..');
        formCard.style.display = "none";
        successfulSubmission.style.display = "block";
        setTimeout(() => {
            form.reset()
            submitBtn.innerHTML=`Submit`;
        }, 2500);
    }
}

function displayMemescale(Scalevalue){
    const valueSpan = document.getElementById('memeScaleValue');
    valueSpan.innerHTML= `${Scalevalue}%`;
}


const validationAlert = (id,message) => {
    let  alertP = $(`${id}`);
    alertP.html(`
        <i class="fa fa-times-circle alert-danger danger" aria-hidden="true"></i> ${message}
        `);
}

const custom_alert = (type, message) =>{
    let newAlert = $("#message");
    if (type === 'success') {
        newAlert.html(`
        <div class="fade-in text-center m-0 alert alert-${type} fade show" role="alert">
            <i class="fa fa-check-circle alert-${type}" aria-hidden="true"></i> ${message}
        </div>`);
    } else if (type === 'warning'){
        newAlert.html(`
        <div class="fade-in text-center m-0 alert alert-${type} fade show" role="alert">
            <i class="fa fa-exclamation-circle alert-${type}" aria-hidden="true"></i> ${message}
        </div>`);
    } else {
        newAlert.html(`
        <div class="fade-in fade text-center m-0 alert alert-${type} fade show" role="alert">
            <i class="fa fa-times-circle alert-danger" aria-hidden="true"></i> ${message}
        </div>`);
    }
    setTimeout(() => {
        newAlert.html("");
    }, 4000);
    $("html, body").animate({
        scrollTop: $("#message").offset().top,
    },
    500
    );
}