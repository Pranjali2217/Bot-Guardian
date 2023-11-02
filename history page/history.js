let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
        sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else
        sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}

// this code is for logout btn pop up
function confirmLogout() {
    if (window.confirm("Are you sure you want to log out?")) {
        // Redirect to the login page
        window.location.href = "../login page/index.html";
    }
}

