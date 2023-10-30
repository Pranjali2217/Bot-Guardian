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

        
        // JavaScript functions for theme change, account deletion, and password reset
        function changeTheme() {
            const themeSelect = document.getElementById("themeSelect");
            const selectedTheme = themeSelect.value;

            if (selectedTheme === "dark") {
                document.body.className = "dark-theme";
            } else {
                document.body.className = "light-theme";
            }
        }

        function deleteAccount() {
            const confirmDelete = confirm("Are you sure you want to delete your account? This action cannot be undone.");
            if (confirmDelete) {
                // You would typically make an AJAX request to the server to delete the account.
                alert("Account deleted!");
            }
        }

        function resetPassword() {
            // You would typically navigate to a password reset page.
            alert("Password reset link sent to your email.");
        }           
