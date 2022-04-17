import './style.css'
import * as THREE from 'three'

import Experience from './Experience.js'
import ModelLoader from './System/ModelLoader'

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const experience = new Experience(canvas, scene)


// Environment
var loader = new THREE.TextureLoader()
var material = new THREE.MeshLambertMaterial({ map: loader.load('./images/planet_lava.png')})
var geometry = new THREE.PlaneGeometry(5120 , 1440)
var mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0,0,-2000)
scene.add(mesh)

var model = new ModelLoader(scene)
model.LoadModelInToEnvironment('./satellite.gltf', {x: 0, y: 0, z: 0})

// Update Frames
const clock = new THREE.Clock()
const position = new THREE.Vector3(0, 0, 0)

const tick = () => {
    let deltaTime = clock.getDelta()

    // model.setModelLocRotScale(
    //     {x: position.x -= deltaTime, y: 0, z: position.z -= deltaTime}, 
    //     {x: 0, y: 0, z: 0}, 
    //     {x: 1, y: 1, z: 1}
    // )

    experience.update()
    
    experience.emitter.trigger('tick')

    window.requestAnimationFrame(tick)
}

tick()