
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

let scene, camera, renderer;

let hero, heroMixer, heroCurrentAction, heroActions = {};
let enemy, enemyMixer, enemyCurrentAction, enemyActions = {};
let environment, environmentMixer;
let clock;
let mixers = [];

try {

    init();
    animate();

} catch (error) {
    console.log("Mmm:" + error);
}


function init() {
    // Clock for animations
    clock = new THREE.Clock();

    // Scene & Camera
    scene = new THREE.Scene();
    scene.environmentRotation;
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.y = 100;
    camera.position.z = 420;
    camera.position.x = 90;
    camera.rotateOnWorldAxis(new THREE.Vector3(-0.5, 0.87, 0), 0.5)

    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('gameCanvas'),
        antialias: true
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x333333);
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.2;

    //Skybox setup
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    new RGBELoader()
        .setPath('/models/') // folder where your HDRI lives
        .load('Cloudymorning4k.hdr', (texture) => {

            const envMap = pmremGenerator.fromEquirectangular(texture).texture;

            scene.environment = envMap; // lighting + reflections
            scene.background = envMap;  // visible skybox
            texture.dispose();
            pmremGenerator.dispose();
        });

    // Light
    scene.add(new THREE.AmbientLight(0x8a7a6a, 2.5));
    const light = new THREE.DirectionalLight(0xffffff, 2.5);
    light.position.set(100, 20, 7.5);
    light.castShadow = true;

    light.shadow.mapSize.width = 500;
    light.shadow.mapSize.height = 500;

    light.shadow.camera.near = 1;
    light.shadow.camera.far = 100;
    light.shadow.camera.left = -30;
    light.shadow.camera.right = 30;
    light.shadow.camera.top = 30;
    light.shadow.camera.bottom = -30;
    scene.add(light);

    const loader = new GLTFLoader();

    loader.load('/models/last-stand-battle-scene-3.gltf', (gltf) => {
        environment = gltf.scene;

        environment.traverse((child) => {
            if (child.Mesh) {
                // child.castShadow = true;
                child.receiveShadow = true;

            }
        });

        environment.scale.set(8, 5, 8);
        environment.rotation.set(0, 1.2, 0);
        environment.position.set(50, -1, 1);
        scene.add(environment);
        console.log("env loaded:", environment);
        scene.add(new THREE.AmbientLight(0xffffff, 2.5));
    });



    loader.load('/models/Hero_m.gltf', (gltf) => {
        hero = gltf.scene;

        hero.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                // child.receiveShadow = true;

            }
        });

        hero.position.set(-80, -26, 330);
        hero.scale.set(0.35, 0.35, 0.35)
        hero.rotation.set(0, -3.5, 0)

        scene.add(hero);

        console.log("Hero loaded:", hero);



        // Animations
        if (gltf.animations.length) {
            heroMixer = new THREE.AnimationMixer(hero);
            mixers.push(heroMixer);

            gltf.animations.forEach((clip) => {
                const action = heroMixer.clipAction(clip);
                heroActions[clip.name] = action;
            });

            // Setting idle as default
            heroCurrentAction = heroActions["idle"];
            heroCurrentAction.play();
        }

    });


    loader.load('/models/demon4.gltf', (gltf) => {
        enemy = gltf.scene;

        enemy.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                // child.receiveShadow = true;

            }
        });

        enemy.position.set(100, -10, 100);
        enemy.scale.set(90, 90, 90)
        enemy.rotation.set(0, -0.5, 0)
        scene.add(enemy);


        if (gltf.animations.length) {
            const mixer = new THREE.AnimationMixer(enemy);
            mixer.clipAction(gltf.animations[0]).play();
            mixers.push(mixer);
        }


        // if (gltf.animations.length) {
        //     enemyMixer = new THREE.AnimationMixer(enemy);
        //     mixers.push(enemyMixer);

        //     gltf.animations.forEach((clip) => {
        //         const action = enemyMixer.clipAction(clip);
        //         enemyActions[clip.name] = action;
        //     });

        //     enemyCurrentAction = enemyActions["idle-1"];
        //     enemyCurrentAction.play();
        // }
    });

    // Window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    mixers.forEach(m => m.update(delta));

    renderer.render(scene, camera);
}


// Animations for actions
export async function triggerAnimation(action, target) {

    return new Promise(resolve => {
        let actions;
        let currentAction;
        if (target == "1") {
            actions = heroActions;
            currentAction = heroCurrentAction;
        } else {
            actions = enemyActions;
            currentAction = enemyCurrentAction;
        }

        let btnAnimationMap = { //Temp
            "Flame Burst": "mid-attack-rl-1",
            "Inferno Wave": "mid-attack-rl-2",
            "Scorch Mark": "basic-attack-r-1",
            "Phoenix Rebirth": "healing-1",
            "Aqua Blade": "mid-attack-rl-3",
            "Tidal Crash": "mid-attack-rl-4",
            "Frostbite": "basic-attack-r-2",
            "Glacial Prison": "mid-attack-rl-5",
            "Stone Fist": "basic-attack-r-3",
            "Earthquake": "mid-attack-rl-2",
            "Iron Skin": "healing-1",
            "Root Snare": "mid-attack-rl-4",
            "Gale Slash": "mid-attack-rl-1",
            "Hurricane Spiral": "mid-attack-rl-5",
            "Wind Shield": "healing-1",
            "Silence Gust": "basic-attack-r-1",
            "Shock Bolt": "basic-attack-r-2",
            "Storm Spear": "mid-attack-rl-3",
            "Chain Lightning": "mid-attack-rl-4",
            "Static Charge": "basic-attack-r-3",
            "Night Slash": "mid-attack-rl-1",
            "Umbral Nova": "mid-attack-rl-5",
            "Fear Gaze": "basic-attack-r-1",
            "Life Leech": "healing-1",
            "Radiant Beam": "mid-attack-rl-2",
            "Holy Pulse": "healing-1",
            "Blessing Aura": "healing-1",
            "Purify": "healing-1",
            "Arcane Missile": "basic-attack-r-2",
            "Mana Rift": "mid-attack-rl-3",
            "Astral Storm": "mid-attack-rl-4",
            "Arcane Shield": "healing-1"
        }

        action = btnAnimationMap[action];

        if (!actions[action]) {
            console.warn("Animation not found:", action);
            return;
        }

        const nextAction = actions[action];

        if (nextAction === currentAction) return;

        // Crossfade from idle → attack
        currentAction.fadeOut(0.2);
        nextAction.reset().fadeIn(0.2).play();

        // After attack ends → return to idle
        const clip = nextAction.getClip();
        setTimeout(() => {
            nextAction.fadeOut(0.2);
            actions["idle-1"].reset().fadeIn(0.2).play();
            if (target === "1") {
                heroCurrentAction = actions["idle-1"];;
            } else {
                enemyCurrentAction = actions["idle-1"];;
            }
            resolve();

        }, clip.duration * 1000);


    });
}



//#################################################################################3
// import { initBattleScene } from "./game/scenes/battleScene.js";
// import { initCharacterScene } from "./game/scenes/characterScene.js";
// import { initHUD } from "./game/ui/hud.js";

// function getPageName() {
//     return window.location.pathname.split("/").pop();
// }

// document.addEventListener("DOMContentLoaded", () => {
//     const page = getPageName();

//     switch (page) {
//         case "gameArea.html":
//             initBattleScene();
//             initHUD();
//             break;

//         case "characterCreation.html":
//             initCharacterScene();
//             break;

//         default:
//             console.log("Page loaded:", page);
//     }
// });
