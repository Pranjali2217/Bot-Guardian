const sign_in_btn =document.querySelector("#sign-in-btn");
const sign_up_btn =document.querySelector("#sign-up-btn");
const container =document.querySelector(".container");

const sign_in_btn2 =document.querySelector("#sign-in-btn2");
const sign_up_btn2 =document.querySelector("#sign-up-btn2");

sign_up_btn.addEventListener("click",() =>{
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click",() =>{
    container.classList.remove("sign-up-mode");
});

sign_up_btn2.addEventListener("click",() =>{
    container.classList.add("sign-up-mode2");
});

sign_in_btn2.addEventListener("click",() =>{
    container.classList.remove("sign-up-mode2");
});

function checkPassword(){
    let password = document.getElementById("password").value;
    let cnfrmPassword = document.getElementById("cnfrm-password").value;
    console.log(" Password:", password,'\n',"Confirm Password:",cnfrmPassword);
    let message = document.getElementById("message");

    if(password.length != 0){
        if(password == cnfrmPassword){
            message.textContent = "Passwords match";
            message.style.backgroundColor = "#1dcd59";
        }
        else{
            message.textContent = "Password don't match";
            message.style.backgroundColor = "#ff4d4d";
        }
    }
    else{
        alert("Password can't be empty!");
        message.textContent = "";
    }
}


const fileInput = document.getElementById('file-input');
        const avatar = document.getElementById('avatar');
    
        fileInput.addEventListener('change', function () {
            const file = fileInput.files[0];
    
            if (file) {
                const reader = new FileReader();
    
                reader.onload = function (e) {
                    avatar.src = e.target.result;
                };
    
                reader.readAsDataURL(file);
            }
        });
    
        function validateForm() {
            // Get the user input values
            const fullName = document.getElementById('full-name').value;
            const dob = document.getElementById('dob').value;
            const mobile = document.getElementById('mobile').value;
            const email = document.getElementById('email').value;
    
            // Build the URL with query parameters
            const profileURL = `profile.html?full-name=${fullName}&dob=${dob}&mobile=${mobile}&email=${email}`;
    
            // Redirect to the profile.html page with the query parameters
            window.location.href = profileURL;
    
            // Prevent the form from submitting
            return false;
        }
