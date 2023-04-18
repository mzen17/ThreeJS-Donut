// Import libraries
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Local Libraries
import particles from './particles';
import Donut from './Donut';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// Create a group object
const group = new THREE.Group();
group.add(camera)

// Add your object to the group
scene.add(group);

// Set the pivot point by adjusting the position of the group
group.position.set(0, 0, 0);
camera.position.set(0, 0, 5);


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
const app = document.getElementById("app");
app!.appendChild( renderer.domElement );

const loader = new GLTFLoader();

const donut = new Donut(scene, loader);
donut.populate();




// Lights
const light = new THREE.PointLight( 0x9fc5e8, 5, 100 );
light.position.set( 0, 0, 5 );
scene.add( light );

// Particles
let pSys: particles = new particles(300, scene, loader);
pSys.populate();

let sync = 1;

function animate() {
	requestAnimationFrame( animate );

  donut.syncAnimate(sync);
  pSys.syncAnimateParticles(sync);
  renderer.render( scene, camera );
  }

const updateBtn = document.getElementById('particle-count-updater');
const particleCountInput = document.getElementById('particle-count') as HTMLInputElement;

updateBtn!.addEventListener('click', function() {
  event!.preventDefault()
  const particleCount = particleCountInput!.value;
  console.log('Particle Count:', particleCount);
  pSys.clearAll();
  pSys = new particles( parseInt(particleCount), scene, loader);
  pSys.populate();
});


animate();

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

var button = document.getElementById("jumpButton");

button!.addEventListener("click", function() {
  donut.jump();

});

window.addEventListener('wheel', event => {
  if (event.deltaY < 0) {
    group.rotation.y += 0.05;
    console.log('User scrolled up');

  } else if (event.deltaY > 0) {
    group.rotation.y -= 0.05;
    console.log('User scrolled down');
  }
});


