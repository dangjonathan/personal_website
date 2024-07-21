//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create a Three.JS Scene
const scene = new THREE.Scene();

// Create a perspective camera with:
// - FOV of x degrees (vertical field of view, narrower view)
// - Aspect ratio based on window dimensions (prevents stretching/squishing)
// - Near clipping plane at 0.1 units (objects closer than this won't be rendered)
// - Far clipping plane at 1000 units (objects farther than this won't be rendered)
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);

//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = 'planet_earth';

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Load the file
loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    object.scale.set(12, 12, 12); // Example: Scale down to half size
    object.position.set(1, 20, 1)
    scene.add(object);
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);

// //Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

// //Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

// //Set how far the camera will be from the 3D model


camera.position.set(150, 270, 300)


// Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(500, 200, 500); // top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const bottomLight = new THREE.DirectionalLight(0xffffff, 0.5); // (color, intensity)
bottomLight.position.set(-1000, -200, -500); // bottom-ish i think?
bottomLight.castShadow = true;
scene.add(bottomLight);

const hemisphereLight = new THREE.HemisphereLight(0x237AE3 , 0x20A12A  , 0.5); // (skyColor, groundColor, intensity)
scene.add(hemisphereLight);
//This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === "planet_earth") {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.rotateSpeed = 0.5;
  controls.minPolarAngle = Math.PI / 3;
  controls.maxPolarAngle = Math.PI / 2;
  
  // Add this line to confine orbit controls to the renderer's DOM element
  controls.domElement = renderer.domElement;
}
//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement

  //Make the planet_earth move
  if (object && objToRender === "planet_earth") {
    object.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


//add mouse position listener, so we can make the planet_earth move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

animate();