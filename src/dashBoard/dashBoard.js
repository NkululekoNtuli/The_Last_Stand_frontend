import { logoutRequest } from "../api/api";


initDashBoard();

function initDashBoard() {

    bindButtons([
        "logoutBtn",
        "rankingsBtn",
        "searchBtn",
        "heroBtn"
    ])
}


function bindButtons(ids) {
    ids.forEach(hookDashButtons);
}

function hookDashButtons(id) {
    // const btnId = btn.id;
    const btn = document.getElementById(id);

    if (id === "logoutBtn") {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();

            logoutRequest();
            window.location.href = "login.html";
        })
    } else if (id === "rankingsBtn") {
        btn.addEventListener("click", () => {

        })
    } else if (id === "searchBtn") {
        btn.addEventListener("click", () => {

        })
    } else if (id === "heroBtn") {

        btn.addEventListener("click", () => {
            window.location.href = "heros.html";
        })
    }
}