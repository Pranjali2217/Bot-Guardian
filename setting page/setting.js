
        let sidebar = document.querySelector(".sidebar");
        let sidebarBtn = document.querySelector(".sidebarBtn");
        let sidebarBtnhide = document.querySelector(".sidebarBtn");
        let sidehide = document.getElementById('sidehide');

        sidebarBtn.onclick = function () {
            sidebar.classList.toggle("active");
            if (sidebar.classList.contains("active")) {
                sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
                sidehide.style.display='none'
            } else
                sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
                sidehide.style.display='block'
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
        
        // this code is for logout btn pop up
        function confirmLogout() {
            if (window.confirm("Are you sure you want to log out?")) {
                // Redirect to the login page
                window.location.href = "../login page/index.html";
            }
        }

