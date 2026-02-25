// import { sendAction } from "../api/api";
// import { updateHealthBar } from "../hud";
// import { triggerAnimation } from "../main";
// import { executAbility } from "../api/api";




// function initEngine() {

// }

// export async function performAbility(action) {
//     const state = await sendAction("/game", action, "POST");
//     await triggerAnimation(action, "1");
//     updateHUD(state, "2");
//     await triggerAnimation(state.enemyAbilityUsed, "2");
//     updateHUD(state, "1");
// }

// export async function perform(action) {

//     if (action === "SURRENDER") {
//         window.location.href = "dashBoard.html";
//     }

//     const state = await sendAction("/endGame", action, "POST");
//     updateHUD(state);
// }


function updateHUD(state, target) {

    if (target === "1") {
        updateHealthBar("playerHealthBar", (state.playerHP / state.playerMaxHP) * 100);
    } else {
        updateHealthBar("playerManaBar", (state.playerMana / state.playerMaxMana) * 100);
        updateHealthBar("enemyHealthBar", (state.enemyHP / state.enemyMaxHP) * 100);
    }
}


//####################################################################################################
// import { sendAction } from "../api/api.js";

// export async function authenticate(type, credentials) {
//   const endpoint = type === "login" ? "/login" : "/register";

//   const result = await sendAction(endpoint, credentials);
//   localStorage.setItem("token", result.token);

//   window.location.href = "/pages/dashBoard.html";
// }