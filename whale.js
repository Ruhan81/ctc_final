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
let whalemodel;
loader.load(
    'sperm_whale/scene.gltf', // Adjust path as needed
    (gltf) => {
        whalemodel=gltf.scene;
        scene.add(whalemodel);
    },
    undefined,
    (error) => {
        console.error('An error occurred while loading the GLTF model:', error);
    }
);
camera.position.y = 1
camera.position.z = 10

const facts = [
    "They are the largest toothed whale, weighing up to 50 tons",
    "Their head makes up 1/3rd of their length,\ncarrying the largest brain of any animal on Earth",
    "They consume up to 2 tons of food DAILY",
    "They can hold their breaths for up to 90 minutes,\nand dive deeper than 3000ft looking for prey!",
    "Females often adopt offsprings that aren't their own and raise them",
    "They nap for 10-15 minutes at a time\nseveral times a day, in groups, VERTICALLY",
    "They communicate with each other using clicks (called\ncodas), each with a distinct purpose",
    "Their diet consists mainly of octopi and squid"
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

const audio = new Audio('whaleaudio.mp3');
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
    if(whalemodel){
      whalemodel.rotation.y+=0.01
    }
    fadeFacts()
    renderer.render(scene, camera);
}
animate();