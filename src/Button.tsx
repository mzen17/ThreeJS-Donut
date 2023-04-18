import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class Button {
    scene: THREE.Scene; // Scene to render to
    loader: GLTFLoader; // Loader to use to load

    dimension: THREE.Vector3; // Button dimensions
    text: string; // Button string
    geometry: THREE.BoxGeometry | null = null; // Object3D

    // Construct button object (with dimensions)
    constructor(length: number, width: number, height: number, text: string, scene: THREE.Scene, loader: GLTFLoader) {
        this.dimension = new THREE.Vector3(length, width, height);
        this.text = text;
        this.scene=scene;
        this.loader = loader;
    }

    render() {
        this.geometry = new THREE.BoxGeometry( this.dimension.x, this.dimension.y, this.dimension.z );
        const wireframe = new THREE.WireframeGeometry( this.geometry );

        const line = new THREE.LineSegments( wireframe );
        (line.material as THREE.MeshBasicMaterial).depthTest= true;
        (line.material as THREE.MeshBasicMaterial).opacity = 1;
        this.scene.add( line );
    }

    rotate() {
        this.geometry!.rotateX(30);
    }
}
export default Button;