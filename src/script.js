import './style.css'
import * as THREE from 'three'

import Experience from './Experience.js'

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const experience = new Experience(canvas, scene)

// Test Object
const geometry = new THREE.BoxGeometry(5, 5, 5)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0, 10, -10)
scene.add(mesh)

const planeGeometry = new THREE.PlaneGeometry(64, 64, 64, 64)
const planeMaterial = new THREE.MeshNormalMaterial({ wireframe: true })
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
planeMesh.rotateX(-Math.PI / 2)
//scene.add(planeMesh)

experience.camera.vizualizer.initializeAudio('./popcorn.mp3')

const clock = new THREE.Clock();
const tick = () => {
    let deltaTime = clock.getDelta();

    experience.update()
    
    experience.controller.playerControls(experience.camera.controls, deltaTime)
    
    experience.emitter.trigger('tick')

    experience.camera.vizualizer.update(deltaTime)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()