import { getHeros, saveHero } from "../api/api";

initHeroCreation();

function initHeroCreation() {

    loadHeroData();
    const passiveSelect = document.getElementById("passive");
    const ultimateSelect = document.getElementById("ultimate");
    const ability1Select = document.getElementById("ability-1");
    const ability2Select = document.getElementById("ability-2");
    const ability3Select = document.getElementById("ability-3");
    const cancelBtn = document.getElementById("cancelBtn");

    cancelBtn.addEventListener("click", () => {
        window.location.href = "heros.html";
    });




    const abilities = localStorage.getItem("abilities").split(",")
    abilities.forEach(ability => {
        const option = document.createElement("option");
        option.value = ability;
        option.textContent = ability;
        passiveSelect.appendChild(option);
    })

    abilities.forEach(ability => {
        const option = document.createElement("option");
        option.value = ability;
        option.textContent = ability;
        ultimateSelect.appendChild(option);
    })

    abilities.forEach(ability => {
        const option = document.createElement("option");
        option.value = ability;
        option.textContent = ability;
        ability1Select.appendChild(option);
    })

    abilities.forEach(ability => {
        const option = document.createElement("option");
        option.value = ability;
        option.textContent = ability;
        ability2Select.appendChild(option);
    })

    abilities.forEach(ability => {
        const option = document.createElement("option");
        option.value = ability;
        option.textContent = ability;
        ability3Select.appendChild(option);
    })


    // Handle character creation
    const characterForm = document.getElementById("characterForm");
    if (characterForm) {
        characterForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const choosenAbilities = [];
            const heroName = document.getElementById("name").value;
            const choosenPass = document.getElementById("passive").value;
            const choosenUlt = document.getElementById("ultimate").value;
            const choosenAbl1 = document.getElementById("ability-1").value;
            const choosenAbl2 = document.getElementById("ability-2").value;
            const choosenAbl3 = document.getElementById("ability-3").value;



            try {
                if (!heroName || !choosenAbl1 || !choosenAbl2 || !choosenAbl3 || !choosenPass || !choosenUlt) {
                    alert("Fill in hero info");
                    return;
                }
                // alert(!heroName && !choosenAbl1 && !choosenAbl2 && !choosenAbl3 && !choosenPass && !choosenUlt);

                choosenAbilities.push(choosenPass);
                choosenAbilities.push(choosenUlt);
                choosenAbilities.push(choosenAbl1);
                choosenAbilities.push(choosenAbl2);
                choosenAbilities.push(choosenAbl3);
                const response = await saveHero(heroName, choosenAbilities);

                //optimize later
                // console.log(response);
                // localStorage.setItem("playerName", response.playerName);
                // localStorage.setItem("playerLevel", response.playerLevel);
                // localStorage.setItem("playerHP", response.playerHP);
                // localStorage.setItem("playerMana", response.playerMana);
                // localStorage.setItem("playerAbilities", JSON.stringify(response.playerAbilities));
                // localStorage.setItem("enemyName", response.enemyName);
                // localStorage.setItem("enemyLevel", response.enemyLevel);
                // localStorage.setItem("enemyHP", response.enemyHP);
                // localStorage.setItem("enemyMana", response.enemyMana);
                // localStorage.setItem("enemyAbilities", response.enemyAbilities);

                alert("character created!");
                window.location.href = "heros.html";
            } catch (err) {
                alert("Character creation failed " + err);
            }
        });
    }

}



async function loadHeroData() {
    const heroNameElem = document.getElementById("name");
    const passiveElem = document.getElementById("passive");
    const ability1Elem = document.getElementById("ability-1");
    const ability2Elem = document.getElementById("ability-2");
    const ability3Elem = document.getElementById("ability-3");
    const ultimateElem = document.getElementById("ultimate");
    const name = localStorage.getItem("heroToEdit");
    const heroes = await getHeros();

    heroes.heroes.forEach(hero => {
        if (hero.name === name) {
            heroNameElem.value = hero.name;
            passiveElem.value = hero.passiveAbility;
            ability1Elem.value = hero.primaryAbility;
            ability2Elem.value = hero.secondaryAbility;
            ability3Elem.value = hero.tertiaryAbility;
            ultimateElem.value = hero.ultimateAbility;
        }
    });
}