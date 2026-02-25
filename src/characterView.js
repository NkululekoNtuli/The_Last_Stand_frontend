import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer;
let hero;

init();

function init() {
    // SCENE
    scene = new THREE.Scene();

    // CAMERA
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 25, 100); // position the camera
    camera.lookAt(0, 10, 0); // look at the model

    // RENDERER
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('characterCanvas'),
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x333333);

    // LIGHTS
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    // LOAD HERO
    const loader = new GLTFLoader();
    loader.load('/models/Hero.gltf', (gltf) => {
        hero = gltf.scene;
        hero.position.set(-13, 0, 70);
        hero.scale.set(22, 22, 22);
        hero.rotation.set(0, 0.3, 0); // no rotation
        scene.add(hero);

        // render once
        renderer.render(scene, camera);
    });

    // handle window resize
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // re-render
    renderer.render(scene, camera);
}



