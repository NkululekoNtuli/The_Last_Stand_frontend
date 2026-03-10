import { createGame } from "/src/api/api.js";
import { getHeros } from "../../api/api";


initHeros();

function initHeros() {
    populateUserHeroes();

    const playBtn = document.getElementById("playBtn2");
    const createHero = document.getElementById("creatHero");
    const editHero = document.getElementById("editHero");

    if (playBtn) {
        playBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            const heroName = document.getElementById("heroName").textContent;

            if (!heroName) {
                alert("Select a hero!")
                return;
            }
            await createGame(heroName);
            localStorage.setItem("playerName", heroName);
            window.location.href = "gameArea.html";
        });
    }

    if (createHero) {
        createHero.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.setItem("heroToEdit", "");
            window.location.href = "characterCreation.html";
        })
    }

    if (editHero) {
        editHero.addEventListener("click", (e) => {
            e.preventDefault();
            const heroName = document.getElementById("heroName").textContent;

            if (!heroName) {
                alert("Select a hero!")
                return;
            }

            localStorage.setItem("heroToEdit", heroName);
            window.location.href = "characterCreation.html";
        });
    }
}


async function populateUserHeroes() {
    const heroes = await getHeros();
    const heroesLst = document.getElementById("heros");

    heroesLst.innerHTML = ""; // to clear list

    heroes.heroes.forEach(hero => {
        const li = document.createElement("li");
        li.textContent = hero.name;
        heroesLst.appendChild(li).addEventListener("click", () => { parsHeroInfo(hero) }); // :|
    });
}

function parsHeroInfo(hero) {

    const heroName = document.getElementById("heroName").innerHTML = hero.name;
    const heroHealth = document.getElementById("health").innerHTML = hero.health;
    const heroMana = document.getElementById("mana").innerHTML = hero.mana;
    const heroPassive = document.getElementById("passive").innerHTML = hero.passiveAbility;
    const heroPrimary = document.getElementById("primary").innerHTML = hero.primaryAbility;
    const heroSecondary = document.getElementById("secondary").innerHTML = hero.secondaryAbility;
    const heroTertiary = document.getElementById("tertiary").innerHTML = hero.tertiaryAbility;
    const heroUlt = document.getElementById("ultimate").innerHTML = hero.ultimateAbility;
    const heroWins = document.getElementById("wins").innerHTML = hero.wins;
    const heroLoses = document.getElementById("loses").innerHTML = hero.wins;
}

