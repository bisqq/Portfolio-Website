import './style.css'
import * as THREE from 'three'

import Experience from './Experience.js'

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const experience = new Experience(canvas, scene)

// Music
const pon = './PonDeReplay.mp3'
const popcorn = './popcorn.mp3'
const iAre = './TheWayIAre.mp3'
experience.camera.vizualizer.initializeAudio(iAre)

// Test Object
const geometry = new THREE.BoxGeometry(5, 5, 5)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0, 10, -10)
scene.add(mesh)


// Update Frames
const clock = new THREE.Clock();
const tick = () => {
    let deltaTime = clock.getDelta();

    experience.update()
    experience.camera.vizualizer.update(deltaTime)
    
    experience.controller.playerControls(experience.camera.controls, deltaTime)
    experience.emitter.trigger('tick')

    window.requestAnimationFrame(tick)
}

tick()