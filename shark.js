import * as THREE from "./build/three.module";
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
let sharkmodel;
loader.load(
    'greatwhiteshark/scene.gltf', // Adjust path as needed
    (gltf) => {
        sharkmodel=gltf.scene;
        scene.add(sharkmodel);
    },
    undefined,
    (error) => {
        console.error('An error occurred while loading the GLTF model:', error);
    }
);
camera.position.y = 0.5
camera.position.z = 2;

const sharkfacts = [
    "It is THE LARGEST predatory fish in the ocean\ntoday, and can grow up to roughly 20 feet long",
    "Their teeth can grow as long as 6.6 inches",
    "They can detect a single drop of blood\nin 25 gallons (nearly 100 liters) of water",
    "In waters around Australia, the fatality\nrate from a single bite was nearly 60%",
    "Their blood is so highly toxic (extreme levels\nof mercury and arsenic) that almost\nno other animal would be able to tolerate it",
    "Orcas (killer whales) are one of their only predators",
    "As dangerous as they are, there have only been 354\nunprovoked attacks on humans, resulting in 57 fatalities",
    "They often detect their prey, not by sight or\nsmell, but by sensing the electric field\nof prey through pores on their snout"
];

// Store displayed fact elements
const sharkfactElements = [];

document.addEventListener("click", (event) => {
    let factText = RiTa.random(sharkfacts);
    let factDiv = document.createElement("div");
    factDiv.innerText = factText;
    factDiv.style.opacity = "1";
    factDiv.style.position = "absolute";
    factDiv.style.left = `${event.clientX}px`;
    factDiv.style.top = `${event.clientY}px`;
    factDiv.style.color = "white";
    factDiv.style.fontSize = "24px"
    document.body.appendChild(factDiv);

    sharkfactElements.push({ element: factDiv, opacity: 1 });
});

function fadesharkFacts() {
    for (let i = sharkfactElements.length - 1; i >= 0; i--) {
        let fact = sharkfactElements[i];
        fact.opacity -= 0.0025;
        fact.element.style.opacity = fact.opacity;

        if (fact.opacity <= 0) {
            fact.element.remove();
            sharkfactElements.splice(i, 1);
        }
    }
}

const audio = new Audio('sharkaudio.mp3');
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
    if(sharkmodel){
      sharkmodel.rotation.y+=0.01
    }
    fadesharkFacts()
    renderer.render(scene, camera);
}
animate();