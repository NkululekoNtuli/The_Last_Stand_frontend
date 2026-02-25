

const API_URL = "http://localhost:8080/the-last-stand";
const API_BASE = "http://localhost:8080/the-last-stand";
const start = "/start-game";
const heroes = "/heroes";
const login = "/login";
const logout = "/logout";
const in_game = "/in-game";
const save_heros = "/save-hero"
const token = localStorage.getItem("token");
const username = localStorage.getItem("username");

const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token
}


export async function loginRequest(data) {
    const res = await fetch(`${API_BASE}${login}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error("API error: " + res.status);
    }
    return res.json();
}


export async function registerRequest() {

}


export async function logoutRequest() {
    const res = await fetch(`${API_BASE}${logout}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            "username": username,
        })
    });
}


export async function executAbility(ability) {
    const response = await fetch(`${API_URL}${in_game}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ "ability": ability })
    });
    return await response.json();
}


export async function createGame(heroname) {
    const response = await fetch(`${API_BASE}${start}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            userName: username,
            heroName: heroname,
            enemyName: "Demon General"
        })
    });

    if (!response.ok) {
        throw new Error("API request failed");
    } else {
        window.location.href = "gameArea.html";
    }
}


export async function getHeros() {
    const respose = await fetch(`${API_URL}${heroes}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            "userName": username
        })
    });

    if (!respose.ok) {
        throw new Error("API error: " + res.status);
    }
    // window.location.href = "heros.html";

    return respose.json();

}


export async function saveHero(heroName, abilities) {
    const res = await fetch(`${API_BASE}${save_heros}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            "username": username,
            "heroName": heroName,
            "abilities": abilities
        })
    });

    if (!res.ok) {
        throw new Error("API error: " + res.status);
    }
    return res.json();
}