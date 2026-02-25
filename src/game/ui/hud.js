import { executAbility } from "../../api/api.js";
import { triggerAnimation } from "../../main.js";


const enemyHealth = "enemyHealth";
const enemyMana = "enemyMana";
const playerHealth = "playerHealth";
const playerMana = "playerMana";
// const abilityBtnPass = "abilityBtnPass";
// const abilityBtn1 = "abilityBtn1";
// const abilityBtn2 = "abilityBtn2";
// const abilityBtn3 = "abilityBtn3";
// const abilityBtnUlt = "abilityBtnUlt";
// const quitBtn = "quitBtn";
const HUD_BUTTONS = ["abilityBtnPass", "abilityBtn1", "abilityBtn2", "abilityBtn3", "abilityBtnUlt", "quitBtn"]

initHUD();

function initHUD() {

    //Naming player fields
    setText("heroName", localStorage.getItem("playerName"));
    setText("level", localStorage.getItem("playerLevel"));
    setText("enemyName", localStorage.getItem("enemyName"));

    const abilities = getPlayerAbilities();

    if (abilities) {
        setText("abilityBtnPass", abilities[0]?.name);
        setText("abilityBtn1", abilities[4]?.name);
        setText("abilityBtn2", abilities[2]?.name);
        setText("abilityBtn3", abilities[3]?.name);
        setText("abilityBtnUlt", abilities[1]?.name);
    }

    bindHudButtons(HUD_BUTTONS);
}


async function hookButton(id) {
    const btn = document.getElementById(id);

    if (!btn) {
        return null;
    } else if (!id.includes("ability")) {
        hookNonAbilityButton(btn);
    }

    btn.addEventListener("click", async (e) => {
        e.preventDefault();

        // btn.disabled = true;
        HUD_BUTTONS.forEach(disableBtn);
        // alert("what button is this")
        const state = await executAbility(btn.textContent,);

        updateHUD(state, playerMana);
        await triggerAnimation(btn.textContent, "1");
        // alert("state: " + JSON.stringify(state));
        updateHUD(state, enemyHealth);
        // await triggerAnimation(state.enemyAbilityUsed, "2"); // fix animation mapping

        updateHUD(state, playerHealth);
        // updateHUD(state, enemyMana);
        // btn.disabled = false;
        HUD_BUTTONS.forEach(enableBtn);

        gameVictor(state);
    });

}

function disableBtn(id) {
    const btn = document.getElementById(id);
    btn.disabled = true;
}

function enableBtn(id) {
    const btn = document.getElementById(id);
    btn.disabled = false;
}


function updateHUD(state, target) {
    //1 = player
    if (target === playerHealth) {
        console.log("player hp: " + state.playerHP + " and  player max hp " + state.playerMaxHP);
        updateHealthBar("playerHealthBar", (state.playerHP / state.playerMaxHP) * 100);
    } else if (target === playerMana) {
        updateHealthBar("playerManaBar", (state.playerMana / state.playerMaxMana) * 100);
    } else if (target === enemyHealth) {
        updateHealthBar("enemyHealthBar", (state.enemyHP / state.enemyMaxHP) * 100);
    } else if (target === enemyMana) {
        // updateHealthBar("enemyHealthBar", (state.enemyHP / state.enemyMaxHP) * 100); impliment when enemy mana exist
    } else {
        console.log("player manna: " + state.playerMana + " and  player max mana " + state.playerMaxMana);

        updateHealthBar("playerManaBar", (state.playerMana / state.playerMaxMana) * 100);
        // updateHealthBar("enemyHealthBar", (state.enemyHP / state.enemyMaxHP) * 100);
    }
}

function hookNonAbilityButton(btn) {
    if (btn.id === "quitBtn") {
        btn.addEventListener("click", () => {
            window.location.href = "/pages/dashBoard.html";
        });
    } // add other hub elements later
}


function bindHudButtons(ids) {
    ids.forEach(hookButton);
}


function setText(id, value) {
    const element = document.getElementById(id);
    if (!element || value == null) return;
    element.textContent = value;
}


function getPlayerAbilities() {
    const data = localStorage.getItem("playerAbilities");

    if (!data) {
        console.warn("No player abilities in local storage");
        return null;
    }

    try {
        return JSON.parse(data);
    } catch (error) {
        console.error("Failed to parse player ablities", error);
        return null;
    }
}


function updateHealthBar(elementId, healthPercent) {
    // healthPercent = playerHealth - healthPercent;
    console.log("hp % : " + healthPercent + "for element: " + elementId);
    const bar = document.getElementById(elementId);
    if (!bar) {
        console.log("no such bar : " + elementId);
        return;
    }

    // Prevent values outside 0–100
    // healthPercent = Math.max(0, Math.min(100, healthPercent));

    bar.style.width = healthPercent + "%";
}

function soundHandler() {
    const soundTrack = document.getElementById("soundTrack");
    if (soundTrack.paused) {
        soundTrack.volume = 0.2;
        soundTrack.loop = true;
        soundTrack.play();
    }

    // { once: true }
    //make sound track fade in later

}

function gameVictor(state) {
    const playerHp = state.playerHP;
    const playerMana = state.playerMana;
    const enemyHp = state.enemyHP;
    const enemyMana = state.enemyMana;

    if (playerHp < 0) {
        alert("You have been slain!")
        window.location.href = "heros.html";
    } else if (playerMana < 0) {
        alert("You ran out of mana");
        window.location.href = "heros.html";
    } else if (enemyHp < 0) {
        alert("You win!");
        window.location.href = "heros.html";
    } else if (enemyMana < 0) {
        alert("Your endurance knows no bounds!")
        window.location.href = "heros.html";
    }
}