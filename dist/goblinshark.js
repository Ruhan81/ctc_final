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
let gsmodel;
loader.load(
    'goblinshark2.glb', // Adjust path as needed
    (gltf) => {
        gsmodel=gltf.scene;
        gsmodel.scale.set(2.5,2.5,2.5)

        gsmodel.traverse((child) => {
            if (child.isMesh) {
                child.geometry.computeVertexNormals(); // Recalculate normals for smooth shading
            }
        });
        scene.add(gsmodel);
    },
    undefined,
    (error) => {
        console.error('An error occurred while loading the GLTF model:', error);
    }
);

camera.position.y = 1
camera.position.z = 9;

const facts = [
    "Because they live in the depths of the ocean, they\nlocate their prey using electroreceptors in their nose",
    "They can live for up to 60 years",
    "They live at depths of 4000+ feet",
    "They have 30-50 rows of near-transparent teeth.\nThey cannot even fit them all in their mouth",
    'They possess a long, flattened snout (the\n"Rostrum"), which can be over 1ft long',
    "Not only their teeth, but their skin\ntoo is translucent, making them appear\npink-ish due to visible blood vessels",
    "When hunting, their jaw can extend by more\nthan 1ft, and they swallow their prey whole"
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
    if(gsmodel){
        gsmodel.rotation.y+=0.01
    }
    fadeFacts()
    renderer.render(scene, camera);
}
animate();