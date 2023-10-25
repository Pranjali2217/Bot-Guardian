document.addEventListener("DOMContentLoaded", function() {
    const saveButton = document.getElementById("saveButton");

    saveButton.addEventListener("click", function() {
        const username = document.getElementById("username").value;
        const theme = document.getElementById("theme").value;
        const notifications = document.getElementById("notifications").checked;

        // You can save the settings to local storage, a database, or send them to a server.
        // For this example, we'll just display them in an alert.
        alert(`Settings saved:
            Username: ${username}
            Theme: ${theme}
            Notifications: ${notifications ? "Enabled" : "Disabled"}`);
    });
});




