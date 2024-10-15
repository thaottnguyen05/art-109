// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene


//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models



// ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~
let scene, camera, renderer, cube, cylinder;

function init() {
   scene = new THREE.Scene();
   camera = new THREE.PerspectiveCamera(
       75, 
       window.innerWidth / window.innerHeight, 
       0.1, 
       1000);

   renderer = new THREE.WebGLRenderer({antialias: true});
   renderer.setSize(window.innerWidth, window.innerHeight);
   document.body.appendChild(renderer.domElement);

   const light = new THREE.DirectionalLight(0xffffff, 3);
   light.position.set(3,3,9);
   scene.add(light);

   const helper = new THREE.DirectionalLightHelper(light,5);
   scene.add(helper)




   const geometry = new THREE.CapsuleGeometry( 1, 1, 1, 8 );

// //    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

   const texture = new THREE.TextureLoader().load('textures/grasslight-big.jpg')
   const material = new THREE.MeshBasicMaterial( { map: texture } );
   cube = new THREE.Mesh( geometry, material );
   scene.add( cube );


// // another shape
   const cylGeometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
   const cgtexture = new THREE.TextureLoader().load('textures/grasslight-big.jpg')
   const cgmaterial = new THREE.MeshBasicMaterial( { map: texture } ); 
   cylinder = new THREE.Mesh( cylGeometry, cgmaterial ); scene.add( cylinder );

// camera position
   camera.position.z = 5; 
}



function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener('resize', onWindowResize, false);

init()
animate()


// ~~~~~~~~~~~~~~~~ Initiate add-ons ~~~~~~~~~~~~~~~~
const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader(); // to load 3d models

loader.load('assets/dog_shiny.gltf',function(gltf){
    const dog = gltf.scene;
    scene.add(dog);
    dog.scale.set(3,3,3)
})

// →→→→→→ Follow next steps in tutorial: // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene