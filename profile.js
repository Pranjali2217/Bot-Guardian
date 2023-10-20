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
