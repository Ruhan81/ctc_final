import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js"
import { GLTFLoader } from "./build/GLTFLoader";

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
let boxmodel;
loader.load(
    'boxjellyfish/scene.gltf', // Adjust path as needed
    (gltf) => {
        boxmodel=gltf.scene;
        scene.add(boxmodel);
    },
    undefined,
    (error) => {
        console.error('An error occurred while loading the GLTF model:', error);
    }
);
camera.position.y = 0
camera.position.z = 15;

const facts = [
    "Not only can they see, but they have up to\n24 eyes, each contributing to distinct\nfunctions of vision (seeing colour, light and dark etc.)",
    "It is quite rare for them to live for longer than 9 months to a year",
    "A single sting can cause humans extreme pain, cardiac\narrest, paralysis, or even death, within 5 minutes",
    "Common prey include fish, worms, shrimp, and other crustaceans",
    "Common predators include sharks and leatherback sea turtles",
    "Commonly found in warm waters in the Indian and\nPacific oceans, between Thailand and the Phillipines\nand off the Northern coast of Australia",
    "Unlike most jellyfish, they can actually swim, they arent just carried by ocean currents",
    "Their tentacles can be up to 10 feet in length"
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

const audio = new Audio('jellyfishaudio.mp3');
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
    if(boxmodel){
      boxmodel.rotation.y+=0.01
    }
    fadeFacts()
    renderer.render(scene, camera);
}
animate();