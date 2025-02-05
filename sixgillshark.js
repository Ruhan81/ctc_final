import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#111996");
document.body.appendChild(renderer.domElement);

// Add a light
const light = new THREE.DirectionalLight(0xffffff, 50);
light.position.set(0, 0, 10);
scene.add(light);

// Load GLTF model
const loader = new GLTFLoader();
let sixgillsharkmodel;
loader.load(
    'sixgillshark/sixgillshark.gltf', // Adjust path as needed
    (gltf) => {
        sixgillsharkmodel=gltf.scene;
        sixgillsharkmodel.scale.set(0.95,0.95,0.95)
        scene.add(sixgillsharkmodel);
    },
    undefined,
    (error) => {
        console.error('An error occurred while loading the GLTF model:', error);
    }
);
camera.position.y = 0
camera.position.z = 15;

const facts = [
    "Instead of the typical 5, they possess 6 long pairs of gill slits, hence the name",
        "Their litters range from 22 all the way to 108!",
        "They can live up to EIGHTY years!",
        "At lengths of up to 6m, they are one of\nthe largest sharks in the ocean today",
        "They have previously been filmed attacking submarines",
        "They are believed to be among the most prehistoric\nof sharks. Some of their characteristics\nare unchanged since 200 million years ago",
        "They can be found up to depths of 6000ft!"
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
    if(sixgillsharkmodel){
      sixgillsharkmodel.rotation.y+=0.01
    }
    fadeFacts()
    renderer.render(scene, camera);
}
animate();
