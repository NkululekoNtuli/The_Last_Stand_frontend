import { executAbility } from "../../api/api.js";
import { triggerAnimation } from "../../main.js";


const enemyHealth = "enemyHealth";
const enemyMana = "enemyMana";
const playerHealth = "playerHealth";
const playerMana = "playerMana";
const audio = "audio";
const soundTrack = document.getElementById("soundTrackAudio");
const HUD_BUTTONS = ["abilityBtnPass", "abilityBtn1", "abilityBtn2", "abilityBtn3", "abilityBtnUlt", "quitBtn", "soundTrackBtn"];


document.addEventListener("DOMContentLoaded", () => {
    initHUD();
});
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

    // soundTrack.play();
    bindHudButtons(HUD_BUTTONS);

}


async function hookButton(id) {

    const btn = document.getElementById(id);

    if (!btn) {
        return null;
    } else if (!id.includes("ability")) {
        console.log("testing3");
        hookNonAbilityButton(btn);
    } else {
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
}

function hookNonAbilityButton(btn) {

    if (btn.id === "quitBtn") {
        btn.addEventListener("click", () => {
            window.location.href = "/pages/dashBoard.html";
        });
    } else if (btn.id === "soundTrackBtn") {
        console.log("testing2");
        const soundTrack = document.getElementById("soundTrackAudio");
        // soundTrack.loop = true;

        btn.addEventListener("click", () => {

            console.log(soundTrack.paused);
            if (soundTrack.paused) {
                soundTrack.play().catch(err => console.log("Play blocked:", err));
                btn.textContent = "⏸️";
            } else {
                soundTrack.pause();
                btn.textContent = "▶️";
            }
        });

    } else {
        console.log("Audio elements not found!2" + btn.id);
    }// add other hub elements later
}

function updateHUD(state, target) {
    //1 = player
    if (target === playerHealth) {
        // console.log("player hp: " + state.playerHP + " and  player max hp " + state.playerMaxHP);
        updateBar("playerHealthBar", state.playerHP, state.playerMaxHP);
        // updateBar("playerHealthBar", (state.playerHP / state.playerMaxHP) * 100);
    } else if (target === playerMana) {
        updateBar("playerManaBar", state.playerMana, state.playerMaxHP);
    } else if (target === enemyHealth) {
        updateBar("enemyHealthBar", state.enemyHP, state.enemyMaxHP);
    } else if (target === enemyMana) {
        // updateHealthBar("enemyHealthBar", (state.enemyHP / state.enemyMaxHP) * 100); impliment when enemy mana exist
    } else {
        // console.log("player manna: " + state.playerMana + " and  player max mana " + state.playerMaxMana);

        // updateBar("playerManaBar", (state.playerMana / state.playerMaxMana) * 100);
        updateBar("playerManaBar", state.playerMana, state.playerMaxHP);
        // updateHealthBar("enemyHealthBar", (state.enemyHP / state.enemyMaxHP) * 100);
    }

    document.getElementById("level").textContent = state.playerLevel;
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


function updateBar(elementId, barValue, max) {
    // healthPercent = playerHealth - healthPercent;
    // console.log("hp % : " + healthPercent + "for element: " + elementId);
    const bar = document.getElementById(elementId);

    if (!bar) {
        console.log("no such bar : " + elementId);
        return;
    }

    const percent = (barValue / max) * 100;
    bar.style.width = percent + "%";
}


function disableBtn(id) {
    const btn = document.getElementById(id);
    btn.disabled = true;
}

function enableBtn(id) {
    const btn = document.getElementById(id);
    btn.disabled = false;
}

function gameVictor(state) {
    const playerHp = state.playerHP;
    const playerMana = state.playerMana;
    const enemyHp = state.enemyHP;
    const enemyMana = state.enemyMana;

    if (playerHp <= 0) {
        alert("You have been slain!")
        window.location.href = "heros.html";
    } else if (playerMana <= 0) {
        alert("You ran out of mana");
        window.location.href = "heros.html";
    } else if (enemyHp <= 0) {
        alert("You win!");
        window.location.href = "heros.html";
    } else if (enemyMana <= 0) {
        alert("Your endurance knows no bounds!")
        window.location.href = "heros.html";
    }
}