import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect.js'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

// --BEGIN: Lights ------------------------------------------------------------------------------
const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75)
light.position.set(0.5, 1, 0.75)
scene.add(light)

scene.background = new THREE.Color( 0xffffff );

// --END: Lights ------------------------------------------------------------------------------

// Test Object
const geometry = new THREE.BoxGeometry(5, 5, 5)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0, 10, -10)
scene.add(mesh)

const planeGeometry = new THREE.PlaneGeometry(2000, 2000)
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.position.set(0, 0, 0)
plane.rotateX(-Math.PI / 2)
plane.receiveShadow = true
scene.add(plane)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.01, 1000)
scene.add(camera)

const controls = new PointerLockControls(camera, canvas)
controls.lock()
scene.add(controls.getObject())

window.addEventListener('keydown', (e) => {
    e.preventDefault();
    switch ( event.code ) {

        case 'KeyW':
            moveForward = true;
            break;

        case 'KeyA':
            moveLeft = true;
            break;

        case 'KeyS':
            moveBackward = true;
            break;

        case 'KeyD':
            moveRight = true;
            break;

        case 'Space':
            if ( canJump === true ) velocity.y += 350;
            canJump = false;
            break;

    }
  })
  
  window.addEventListener('keyup', (e) => {
    e.preventDefault();
    switch ( event.code ) {

        case 'KeyW':
            moveForward = false;
            break;

        case 'KeyA':
            moveLeft = false;
            break;

        case 'KeyS':
            moveBackward = false;
            break;

        case 'KeyD':
            moveRight = false;
            break;

    }
  })

  window.addEventListener('click', () => {
    controls.lock()
  })
  
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock();
const tick = () => {

    let deltaTime = clock.getDelta();

    // Update controls
    velocity.x -= velocity.x * 10.0 * deltaTime;
    velocity.z -= velocity.z * 10.0 * deltaTime;

    velocity.y -= 9.8 * 100.0 * deltaTime; // 100.0 = mass

    direction.z = Number( moveForward ) - Number( moveBackward );
    direction.x = Number( moveRight ) - Number( moveLeft );
    direction.normalize(); // this ensures consistent movements in all directions

    if ( moveForward || moveBackward ) {
        velocity.z -= direction.z * 400.0 * deltaTime;
    }
    
    if ( moveLeft || moveRight ) {
        velocity.x -= direction.x * 400.0 * deltaTime;
    }

    controls.moveRight( - velocity.x * deltaTime );
    controls.moveForward( - velocity.z * deltaTime );

    controls.getObject().position.y += ( velocity.y * deltaTime ); // new behavior

    if ( controls.getObject().position.y < 10 ) {

        velocity.y = 0;
        controls.getObject().position.y = 10;

        canJump = true;

    }

    // Render
    new OutlineEffect(renderer).render(scene, camera)
    //renderer.render(scene, camera)
  
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
  }
  
  tick()