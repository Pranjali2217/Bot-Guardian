const fileInput = document.getElementById('file-input');
        const avatar = document.getElementById('avatar');

        let sidebar = document.querySelector(".sidebar");
        let sidebarBtn = document.querySelector(".sidebarBtn");
        sidebarBtn.onclick = function () {
            sidebar.classList.toggle("active");
            if (sidebar.classList.contains("active")) {
                sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
            } else
                sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
        }
    
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
            const profileURL = `NewProfile.html?full-name=${fullName}&dob=${dob}&mobile=${mobile}&email=${email}`;
    
            // Redirect to the profile.html page with the query parameters
            window.location.href = profileURL;
    
            // Prevent the form from submitting
            return false;
        }

// this code is for logout btn pop up
function confirmLogout() {
    if (window.confirm("Are you sure you want to log out?")) {
        // Redirect to the login page
        window.location.href = "index.html";
    }
}


       
