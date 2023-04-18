import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class Particles {
    particles_count: number; // Number of particles
    scene: THREE.Scene; // Scene to render to
    loader: GLTFLoader; // Loader to use to load

    particle: THREE.Object3D[] = []; // Array of particles
    particleSpeed: number[] = []; // Array populated by random numbers for falling and rotating speed.
    lowbar: number = -3; // Bar at which particles should reset
    materials: THREE.MeshBasicMaterial[] = [new THREE.MeshBasicMaterial( {color: 0x00ecff} ), new THREE.MeshBasicMaterial( {color: 0xecff00} ), new THREE.MeshBasicMaterial( {color: 0xff00ff} )]; // Material flavors
    sizes: THREE.BoxGeometry[] = [new THREE.BoxGeometry(0.05, 0.2, 0.05), new THREE.BoxGeometry(0.06, 0.2, 0.05)] // Box sizes
    rain_width: number[] = [8, 4, 8]; // Spread of particles

    // Constructor
    constructor(particles_count: number, scene: THREE.Scene, loader: GLTFLoader) {
        this.particles_count = particles_count;
        this.scene = scene;
        this.loader = loader;
    }

    // Populate the particles
    populate(this: Particles) {
        for(let i :number = 0; i<this.particles_count; i++) {
            // Load them a random size and material
            this.particle[i] = new THREE.Mesh( this.sizes[Math.floor(Math.random() * this.sizes.length)], this.materials[Math.floor(Math.random() * this.materials.length)]);
            
            // Set them a random position and a rotation in their y layer, determined by spread
            this.particle[i].rotation.set(Math.random() * 6.28, Math.random() * 6.28, Math.random() * 6.28);
            this.particle[i].position.set(this.particle[i].position.x - this.rain_width[0] + this.rain_width[0] * 2 * Math.random(), this.particle[i].position.y + this.rain_width[1] + Math.random(), this.particle[i].position.z - this.rain_width[2] + this.rain_width[2] * 2 * Math.random());
            
            // Set each particle a random speed
            this.particleSpeed[i] = (5 * Math.random() +2) * 0.001;

            // Add them to the scene
            this.scene.add( this.particle[i] );
        }
    }

    // Animation for the particles
    syncAnimateParticles(this: Particles, sync: number) {
        for(let i = 0; i<this.particles_count; i++) {
            // If no particle skip
            if(this.particle[i] == null) continue;

            // Scoot particle down
            this.particle[i].position.y -= sync * this.particleSpeed[i];
            this.particle[i].rotation.set((0.01+this.particle[i].rotation.x + this.particleSpeed[i]*0.1) * sync, (0.01 + this.particle[i].rotation.y + this.particleSpeed[i]*0.1) * sync, (0.01+this.particle[i].rotation.z + this.particleSpeed[i]*0.1) * sync);
        
            // If below set y index, reset them to the top
            if(this.particle[i].position.y < this.lowbar) {
                this.particle[i].rotation.set(Math.random() * 6.28, Math.random() * 6.28, Math.random() * 6.28)
                this.particle[i].position.set(2 * this.rain_width[0] * Math.random() - this.rain_width[0], this.rain_width[1] + Math.random(), 2 * this.rain_width[2] * Math.random()  - this.rain_width[2]);
            }
          }
    }

    // Delete all the particles
    clearAll(this: Particles) {
        for(let i = 0; i<this.particles_count; i++) {
            this.scene.remove(this.particle[i]);
        }
    }
}

export default Particles;