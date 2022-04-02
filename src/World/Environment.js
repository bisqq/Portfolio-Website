import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment {
    
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.setEnvironmentLight()
        this.setEnvironmentMap()
    }

    setEnvironmentLight() {
        const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75)
        light.position.set(0.5, 1, 0.75)
        scene.add(light)
        
        scene.background = new THREE.Color( 0xffffff );

    }
}