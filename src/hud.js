
export function updateHealthBar(elementId, healthPercent) {
    // healthPercent = playerHealth - healthPercent;
    console.log("hp %: " + healthPercent);
    const bar = document.getElementById(elementId);
    if (!bar) {
        console.log("no such bar : " + elementId);
        return;
    }

    // Prevent values outside 0–100
    // healthPercent = Math.max(0, Math.min(100, healthPercent));

    bar.style.width = healthPercent + "%";
}


// document.addEventListener("click", () => {
//     const soundTrack = document.getElementById("soundTrack");
//     if (soundTrack.paused) {
//         soundTrack.volume = 0.2;
//         soundTrack.loop = true;
//         soundTrack.play();
//     }
// },
//     { once: true }
//     //make sound track fade in later
// );

try {

    //For player and enemy info
    document.getElementById("heroName").innerHTML = localStorage.getItem("playerName");
    document.getElementById("level").innerHTML = localStorage.getItem("playerLevel");

    //For buttons
    const playerAbilitiesStr = localStorage.getItem("playerAbilities");
    const playerAbilities = JSON.parse(playerAbilitiesStr);
    document.getElementById("abilityBtnPass").innerHTML = playerAbilities[0].name;
    document.getElementById("abilityBtn1").innerHTML = playerAbilities[4].name;
    document.getElementById("abilityBtn2").innerHTML = playerAbilities[2].name;
    document.getElementById("abilityBtn3").innerHTML = playerAbilities[3].name;
    document.getElementById("abilityBtnUlt").innerHTML = playerAbilities[1].name;
    document.getElementById("enemyName").innerHTML = localStorage.getItem("enemyName");
} catch (error) {
    console.log("Must have been the wind:" + error);
}