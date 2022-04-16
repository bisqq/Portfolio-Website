import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import * as dat from 'lil-gui'


export default class Environment {
    
    constructor(_scene) {
        this.scene = _scene

        this.dracoLoader = new DRACOLoader()
        this.dracoLoader.setDecoderPath('draco/')

        this.gltfLoader = new GLTFLoader()
        this.gltfLoader.setDRACOLoader(this.dracoLoader)

        // Debug
        this.gui = new dat.GUI({ width: 340 })

        this.setEnvironmentLight()
        this.guiDebugging()
    }

    setEnvironmentLight() {
        const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75)
        light.position.set(0.5, 1, 0.75)
        //this.scene.add(light)

        const light2 = new THREE.DirectionalLight(0xffffff, 1)
        light2.position.set(0, 1, 10)
        this.scene.add(light2)
        
        this.scene.background = new THREE.Color( 0x000000 );

    }

    LoadModelInToEnvironment(modelFilePath, modelPostion) {
        this.gltfLoader.load(modelFilePath, (gltf) => {
            this.gltfObject = gltf.scene
            this.gltfObject.position.set(modelPostion.x, modelPostion.y, modelPostion.z)
            this.gltfObject.scale.set(10.0, 10.0, 10.0)

            this.scene.add(this.gltfObject)
        })
    }

    guiDebugging() {

    }
}