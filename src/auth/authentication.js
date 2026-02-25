// export async function apiPost(endpoint, data) {
//     const res = await fetch(`${API_BASE}${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data)
//     });

//     if (!res.ok) {
//         throw new Error("API error: " + res.status);
//     }
//     return res.json();
// }

import { loginRequest, registerRequest, logoutRequest } from "../api/api";

const API_BASE = "http://localhost:8080/the-last-stand";

initAuth();

export function initAuth() {
    bindAuthButtons([
        "loginBtn",
        "registerBtn"
    ])

}

function bindAuthButtons(ids) {
    ids.forEach(hookAuthButtons);
}


function hookAuthButtons(id) {
    const btn = document.getElementById(id);
    if (!btn) {
        return null;
    } else if (id === "loginBtn") {
        login(btn);
    } else if (id === "registerForm") {
        register(btn);
    }
}

// Handle login
function login(btn) {
    btn.addEventListener("click", async (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        localStorage.setItem("username", username);

        try {
            // alert("size: " + username.length);
            const data = await loginRequest(
                {
                    "name": username,
                    "password": password
                });

            // Save token for gameplay requests
            localStorage.setItem("token", data.token);
            localStorage.setItem("abilities", data.abilities);

            // alert("Login successful!");
            window.location.href = "dashBoard.html"; // Redirect to character creator
        } catch (err) {
            alert("Invalid username or password: " + err);
        }
    });
}

// Handle registration
function register(btn) {
    btn.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password1 = document.getElementById("password1").value;
        const password2 = document.getElementById("password2").value; // impliment later

        try {
            registerRequest({
                "name": username,
                "password": password1
            });

            alert("Account created! You can now login.");
            window.location.href = "login.html"; // Redirect to login to login
        } catch (err) {
            alert("Registration failed " + err);
        }
    });
}

export function logout(btn) {
    btn.addEventListener("click",);

    window.location.href = "login.html";
}




