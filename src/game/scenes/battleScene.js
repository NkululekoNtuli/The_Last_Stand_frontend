import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let scene, camera, renderer;

export function initBattleScene() {
    const canvas = document.getElementById("gameCanvas");

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        60,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        2000
    );
    camera.position.set(0, 50, 200);

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    addLights();
    loadEnvironment();
    loadCharacters();

    animate();
}

function addLights() {
    scene.add(new THREE.AmbientLight(0xffd6b0, 0.6));

    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(50, 100, 50);
    dir.castShadow = true;
    scene.add(dir);
}

function loadEnvironment() {
    const loader = new GLTFLoader();
    loader.load("/models/last-stand-battle-scene-3.gltf", (gltf) => {
        gltf.scene.traverse((o) => {
            o.castShadow = true;
            o.receiveShadow = true;
        });
        scene.add(gltf.scene);
    });
}

function loadCharacters() {
    const loader = new GLTFLoader();

    loader.load("/models/Hero_m.gltf", (gltf) => {
        const hero = gltf.scene;
        hero.position.set(-80, 4, 400);
        hero.scale.set(20, 20, 20);
        scene.add(hero);
    });
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
