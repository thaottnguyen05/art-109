


import * as THREE from 'three';


import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models



let scene, camera, renderer, ball, dog, mixer;

// animation vars
let actionPant, actionTail

function init() {

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0x015220);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);




    // add direction light 
    const lightRight = new THREE.DirectionalLight(0xffffff, 4);
    lightRight.position.set(3, 4, 5);
    scene.add(lightRight);

    const helperRight = new THREE.DirectionalLightHelper(lightRight, 5);
    scene.add(helperRight);


    // add directional light 
    const lightLeft = new THREE.DirectionalLight(0xffff00, 4);
    lightLeft.position.set(-3, 2, 3);
    scene.add(lightLeft);

    const helperLeft = new THREE.DirectionalLightHelper(lightLeft, 5);
    scene.add(helperLeft);



    // ~~~~~~ Initiate add-ons ~~~~~~

    const controls = new OrbitControls(camera, renderer.domElement);
    const loader = new GLTFLoader(); // to load 3d models



    // ~~~~~~ Create Geometry ~~~~~~

    // create ball
    const geometryBall = new THREE.SphereGeometry(.2, 32, 16);


    // const materialBall = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // plain color

    const textureBall = new THREE.TextureLoader().load('textures/grasslight-big.jpg');
    const materialBall = new THREE.MeshStandardMaterial({ map: textureBall });


    ball = new THREE.Mesh(geometryBall, materialBall);
    scene.add(ball);


    // load dog model
    loader.load('assets/dog_shiny.gltf', function (gltf) {
        dog = gltf.scene;
        scene.add(dog);
        dog.scale.set(2, 2, 2);
        dog.position.y = -2; 

        // dog action
        mixer = new THREE.AnimationMixer(dog); 
        const clips = gltf.animations;

        const clipPant = THREE.AnimationClip.findByName(clips, 'pant');
        actionPant = mixer.clipAction(clipPant);
        actionPant.play();

        const clipTail = THREE.AnimationClip.findByName(clips, 'tail');
        actionTail = mixer.clipAction(clipTail);
        actionTail.play();
       
        })


    



    camera.position.z = 5;


}

// event listeners

let mouseIsDown = false;

document.querySelector("body").addEventListener("mousedown", () => {
    actionPant.play()
    actionPant.paused = false;
    mouseIsDown = true;
    console.log("mousedown")
})

document.querySelector("body").addEventListener("mouseup", () => {
    // actionPant.stop()
    actionPant.paused = true;
    mouseIsDown = false;
    console.log("mouseup")
})

document.querySelector("body").addEventListener("mousemove", () => {
    if(mouseIsDown = true){
        console.log("mousemove")
 
    }
})



const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate); // start loop by with frame update


    ball.rotation.x += 0.007;
    ball.rotation.y += 0.007;


    ball.position.x = Math.sin(Date.now() / 5000) * 2;
    ball.position.y = Math.sin(Date.now() / 3000) * 2;
    ball.position.z = Math.sin(Date.now() / 4000) * 2;
    // console.log(ball.position.x);

    if(dog) { 

        dog.rotation.y = Math.sin(Date.now() / 2000) * 1.2; // sin rotation
        mixer.update(clock.getDelta());

    }

    renderer.render(scene, camera);
}



function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener('resize', onWindowResize, false);

init(); // execute initialize function
animate(); // execute animation function