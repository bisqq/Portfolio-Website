import * as THREE from 'three'
import Experience from '../Experience.js'
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js'

export default class Camera {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setControls()
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(50, this.sizes.width / this.sizes.height, 0.01, 1000)
        this.scene.add(this.instance)
    }

    setControls() {
        this.controls = new PointerLockControls(this.instance, this.canvas)

        window.addEventListener('click', () => {
            this.controls.lock()
        })
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }
}