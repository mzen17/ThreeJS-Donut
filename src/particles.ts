import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class Particles {
    particles_count: number; // Number of particles
    scene: THREE.Scene; // Scene to render to
    loader: GLTFLoader; // Loader to use to load

    particle: THREE.Object3D[] = []; // Array of particles
    particleSpeed: number[] = []; // Array populated by random numbers for falling and rotating speed.
    lowbar: number = -3;

    constructor(particles_count: number, scene: THREE.Scene, loader: GLTFLoader) {
        this.particles_count = particles_count;
        this.scene = scene;
        this.loader = loader;
    }

    // Populate the particles
    populate(this: Particles) {

        const path = ["/pink_flakes.glb", "/blue_flakes.glb", "yellow_flakes.glb"];

        for(let i :number = 0; i<this.particles_count; i++) {
            this.loader.load( ("/flakes/" + path[Math.round(Math.random() * 2)]), (particleFunc) => {
                this.particle[i] = particleFunc.scene;
                this.particle[i].scale.set(0.2, 0.2, 0.2);
                this.particle[i].rotation.set(Math.random() * 6.28, Math.random() * 6.28, Math.random() * 6.28);
                this.particle[i].position.set(this.particle[i].position.x  + -8 + 16 * Math.random(), this.particle[i].position.y + 4 + Math.random(), this.particle[i].position.z -8 + 16 * Math.random());
                this.scene.add( this.particle[i] );
                this.particleSpeed[i] = (5 * Math.random() +2) * 0.001;
            }, undefined, function ( error ) {
                console.error( error );
            } );
        }
    }

    // Animation for the particles
    animateParticles(this: Particles) {
        for(let i = 0; i<this.particles_count; i++) {
            if(this.particle[i] == null) continue;
           this.particle[i].position.y -= this.particleSpeed[i];
           this.particle[i].rotation.set(0.01+this.particle[i].rotation.x + this.particleSpeed[i]*0.1, 0.01 + this.particle[i].rotation.y + this.particleSpeed[i]*0.1, 0.01+this.particle[i].rotation.z + this.particleSpeed[i]*0.1);
        
            if(this.particle[i].position.y < -3) {
             this.particle[i].scale.set(0.2, 0.2, 0.2);
             this.particle[i].rotation.set(Math.round(Math.random() * 6.28),Math.round(Math.random() * 6.28),Math.round(Math.random() * 6.28))
             this.particle[i].position.set(-8 + 16 * Math.random(), 3 + Math.random(),-3 + 6 * Math.random());
            }
          }
    }

    // Animation for the particles
    syncAnimateParticles(this: Particles, sync: number) {
        for(let i = 0; i<this.particles_count; i++) {
            if(this.particle[i] == null) continue;
           this.particle[i].position.y -= sync * this.particleSpeed[i];
           this.particle[i].rotation.set((0.01+this.particle[i].rotation.x + this.particleSpeed[i]*0.1) * sync, (0.01 + this.particle[i].rotation.y + this.particleSpeed[i]*0.1) * sync, (0.01+this.particle[i].rotation.z + this.particleSpeed[i]*0.1) * sync);
        
            if(this.particle[i].position.y < this.lowbar) {
             this.particle[i].scale.set(0.2, 0.2, 0.2);
             this.particle[i].rotation.set(Math.random() * 6.28, Math.random() * 6.28, Math.random() * 6.28)
             this.particle[i].position.set(-8 + 16 * Math.random(), 3 + Math.random(),-3 + 6 * Math.random());
            }
          }
    }

    clearAll(this: Particles) {
        for(let i = 0; i<this.particles_count; i++) {
            this.scene.remove(this.particle[i]);
        }
    }
}

export default Particles;