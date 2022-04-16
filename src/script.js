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
//experience.camera.vizualizer.initializeAudio(iAre)

// Environment
var loader = new THREE.TextureLoader();
var material = new THREE.MeshLambertMaterial({ map: loader.load('./images/planet_lava.png')});
var geometry = new THREE.PlaneGeometry(5120 , 1440);
var mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0,0,-2000)
scene.add(mesh);

// Update Frames
const clock = new THREE.Clock();
const tick = () => {
    let deltaTime = clock.getDelta();

    experience.update(deltaTime)
    
    experience.controller.playerControls(experience.camera.controls, deltaTime)
    experience.emitter.trigger('tick')

    window.requestAnimationFrame(tick)
}

tick()