const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const voiceButton = document.querySelector("#voice-btn");
const uploadButton = document.querySelector("#upload-btn");

let userText = null;
const API_KEY = "PASTE-YOUR-API-KEY-HERE"; // Paste your API key here

const loadDataFromLocalstorage = () => {
    // Load saved chats and theme from local storage and apply/add on the page
    const themeColor = localStorage.getItem("themeColor");

    document.body.classList.toggle("light-mode", themeColor === "light_mode");
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";

    const defaultText = `<div class="default-text">
                            <h1>Bot-Guardian</h1>
                            <p>Elevating Your AI Experience - Unlocking the power of advanced chatbot technology with <br>improved features, secured image uploads, password storage, and voice-activated search, all safeguarded by our trusted AI guardian.</p>                           
                       </div>`

    chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
    chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to bottom of the chat container
}

const createChatElement = (content, className) => {
    // Create new div and apply chat, specified class and set html content of div
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = content;
    return chatDiv; // Return the created chat div
}

const getChatResponse = async (incomingChatDiv) => {
    const API_URL = "https://api.openai.com/v1/completions";
    const pElement = document.createElement("p");

    // Define the properties and data for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: userText,
            max_tokens: 2048,
            temperature: 0.2,
            n: 1,
            stop: null
        })
    }

    // Send POST request to API, get response and set the reponse as paragraph element text
    try {
        const response = await (await fetch(API_URL, requestOptions)).json();
        pElement.textContent = response.choices[0].text.trim();
    } catch (error) { // Add error class to the paragraph element and set error text
        pElement.classList.add("error");
        pElement.textContent = "Oops! Something went wrong while retrieving the response. Please try again.";
    }

    // Remove the typing animation, append the paragraph element and save the chats to local storage
    incomingChatDiv.querySelector(".typing-animation").remove();
    incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
    localStorage.setItem("all-chats", chatContainer.innerHTML);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
}

const showTypingAnimation = () => {
    // Display the typing animation and call the getChatResponse function
    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="bot.png" alt="bot-img">
                        <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                        </div>
                    </div>
                    <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
                </div>`;
    // Create an incoming chat div with typing animation and append it to chat container
    const incomingChatDiv = createChatElement(html, "incoming");
    chatContainer.appendChild(incomingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    getChatResponse(incomingChatDiv);
}

const handleOutgoingChat = () => {
    userText = chatInput.value.trim(); // Get chatInput value and remove extra spaces
    if(!userText) return; // If chatInput is empty return from here

    // Clear the input field and reset its height
    chatInput.value = "";
    chatInput.style.height = `${initialInputHeight}px`;

    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="default_img.png" alt="user-img">
                        <p>${userText}</p>
                    </div>
                </div>`;

    // Create an outgoing chat div with user's message and append it to chat container
    const outgoingChatDiv = createChatElement(html, "outgoing");
    chatContainer.querySelector(".default-text")?.remove();
    chatContainer.appendChild(outgoingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    setTimeout(showTypingAnimation, 500);
}

themeButton.addEventListener("click", () => {
    // Toggle body's class for the theme mode and save the updated theme to the local storage 
    document.body.classList.toggle("light-mode");
    localStorage.setItem("themeColor", themeButton.innerText);
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
});


const initialInputHeight = chatInput.scrollHeight;

chatInput.addEventListener("input", () => {   
    // Adjust the height of the input field dynamically based on its content
    chatInput.style.height =  `${initialInputHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If the Enter key is pressed without Shift and the window width is larger 
    // than 800 pixels, handle the outgoing chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleOutgoingChat();
    }
});

loadDataFromLocalstorage();
sendButton.addEventListener("click", handleOutgoingChat);

//script for image upload-----------------
// const uploadButton = document.querySelector("#upload-btn");
const fileInput = document.createElement('input'); // Create a hidden input element
fileInput.type = 'file';
fileInput.accept = 'image/*';
fileInput.style.display = 'none'; // Hide the input element
document.body.appendChild(fileInput); // Append it to the document body
const avatar = document.getElementById('avatar');

uploadButton.addEventListener('click', function () {
    fileInput.click(); // Trigger a click on the hidden file input
});

fileInput.addEventListener('change', function () {
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('avatar', file);

        // Replace 'your-upload-url' with the actual URL where you want to upload the image
        fetch('your-upload-url', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                avatar.src = data.url; // Assuming the server responds with the image URL
            } else {
                console.error('Image upload failed');
            }
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
    }
});

//Script of voice
document.addEventListener('DOMContentLoaded', function () {
    const voiceSearchButton = document.getElementById('voice-search-button');

    // Check for Web Speech API support
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();

        // Configure the recognition
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = function () {
            console.log('Listening...');
        };

        recognition.onresult = function (event) {
            const result = event.results[0][0].transcript;
            searchInput.value = result;
            recognition.stop();
            console.log('Recognized: ' + result);
        };

        recognition.onerror = function (event) {
            console.error('Recognition error: ' + event.error);
        };

        voiceSearchButton.addEventListener('click', function () {
            recognition.start();
        });
    } else {
        // Web Speech API not supported
        voiceSearchButton.disabled = true;
        console.log('Web Speech API is not supported in this browser.');
    }
});

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
        window.location.href = "index.html";
    }
}




// New chat button Script
document.getElementById('newchat').addEventListener('click', function() {
    // Clear chat messages (this depends on how your chat messages are stored)
    clearChatMessages();

    // Reload the page
    // location.reload();
});

function clearChatMessages() {
    if(confirm("Are you sure you want new chats?")) {
        localStorage.removeItem("all-chats");
        loadDataFromLocalstorage();
    }
        
   
}



