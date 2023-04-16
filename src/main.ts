// Import libraries
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Local Libraries
import particles from './particles';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
const app = document.getElementById("app");
app!.appendChild( renderer.domElement );

const loader = new GLTFLoader();

let donut:THREE.Object3D;

loader.load( '/tinyfile_donut.glb', function ( gltf ) {

  donut = gltf.scene;
  donut.rotation.z += 14;

	scene.add( donut );


}, undefined, function ( error ) {

	console.error( error );

} );

// Lights
const light = new THREE.PointLight( 0x9fc5e8, 5, 100 );
light.position.set( 0, 0, 5 );
scene.add( light );


camera.position.z = 5;

// Particles
const pSys: particles = new particles(200, scene, loader);
pSys.populate();

let sync = 1;

function animate() {
	requestAnimationFrame( animate );

  if (donut) { // Make sure the object is loaded before trying to rotate it
    donut.rotation.y += sync*0.01;
  }
  pSys.syncAnimateParticles(sync);
  renderer.render( scene, camera );
  }

  

animate();

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

