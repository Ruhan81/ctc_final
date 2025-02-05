import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.min.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/loaders/GLTFLoader.js";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#111996");
document.body.appendChild(renderer.domElement);

// Add a light
const light = new THREE.DirectionalLight(0xffffff, 10);
light.position.set(0, 0, 10);
scene.add(light);

// Load GLTF model
const loader = new GLTFLoader();
let anglerfishmodel;
loader.load(
    'weird_deepsea_anglerfish/scene.gltf', // Adjust path as needed
    (gltf) => {
        anglerfishmodel=gltf.scene;
        anglerfishmodel.scale.set(0.1,0.1,0.1)

        anglerfishmodel.traverse((child) => {
            if (child.isMesh) {
                child.geometry.computeVertexNormals(); // Recalculate normals for smooth shading
            }
        });
        scene.add(anglerfishmodel);
    },
    undefined,
    (error) => {
        console.error('An error occurred while loading the GLTF model:', error);
    }
);

camera.position.y = 0
camera.position.z = 30;

const facts = [
    'Females have the "Esca", a glowing lure, on\ntheir heads to attract prey in the ocean depths',
    "After a certain point in their lives, the\nmales have to fuse to the females permanently,\nusing the females for nutrition like a parasite",
    "Their stomachs can expand enough to allow\nthem to swallow prey twice their size",
    "They have very slow metabolism, allowing them to go months without eating",
    "Unlike most predators, they don't chew. Instead, they swallow prey whole",
    "Some species can control the brightness of their Esca",
    "Because they hunt in total darkness, they can\ndetect prey by the electric fields they produce"
];

// Store displayed fact elements
const factElements = [];

document.addEventListener("click", (event) => {
    let factText = RiTa.random(facts);

    let factDiv = document.createElement("div");
    factDiv.innerText = factText;
    factDiv.style.opacity = "1";
    factDiv.style.position = "absolute";
    factDiv.style.left = `${event.clientX}px`;
    factDiv.style.top = `${event.clientY}px`;
    factDiv.style.color = "white";
    factDiv.style.fontSize = "24px"
    document.body.appendChild(factDiv);

    factElements.push({ element: factDiv, opacity: 1 });
});

function fadeFacts() {
    for (let i = factElements.length - 1; i >= 0; i--) {
        let fact = factElements[i];
        fact.opacity -= 0.0025;
        fact.element.style.opacity = fact.opacity;

        if (fact.opacity <= 0) {
            fact.element.remove();
            factElements.splice(i, 1);
        }
    }
}

const audio = new Audio('angleraudio.mp3');
audio.volume=0.25

let flag = false

window.addEventListener('click', () => {
    if(flag===false){
        //audio.currentTime = 0; // Reset to start for quick replay
        audio.play();
        flag=true 
}});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    if(anglerfishmodel){
        anglerfishmodel.rotation.y+=0.01
    }
    fadeFacts()
    renderer.render(scene, camera);
}
animate();