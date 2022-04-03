import * as THREE from 'three'

export default class PlayerController {

    constructor() {
        this.canJump = false;
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;

        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();

        window.addEventListener('keydown', (e) => {
            e.preventDefault();
            switch ( event.code ) {
        
                case 'KeyW':
                    this.moveForward = true;
                    break;
        
                case 'KeyA':
                    this.moveLeft = true;
                    break;
        
                case 'KeyS':
                    this.moveBackward = true;
                    break;
        
                case 'KeyD':
                    this.moveRight = true;
                    break;
        
                case 'Space':
                    if ( this.canJump === true ) this.velocity.y += 250;
                    this.canJump = false;
                    break;
        
            }
          })
          
          window.addEventListener('keyup', (e) => {
            e.preventDefault();
            switch ( event.code ) {
        
                case 'KeyW':
                    this.moveForward = false;
                    break;
        
                case 'KeyA':
                    this.moveLeft = false;
                    break;
        
                case 'KeyS':
                    this.moveBackward = false;
                    break;
        
                case 'KeyD':
                    this.moveRight = false;
                    break;
        
            }
          })
    }
    playerControls(controls, deltaTime) {
        this.velocity.x -= this.velocity.x * 5.0 * deltaTime;
        this.velocity.z -= this.velocity.z * 5.0 * deltaTime;
    
        this.velocity.y -= 9.8 * 100.0 * deltaTime; // 100.0 = mass
    
        this.direction.z = Number( this.moveForward ) - Number( this.moveBackward );
        this.direction.x = Number( this.moveRight ) - Number( this.moveLeft );
        this.direction.normalize(); // this ensures consistent movements in all directions
    
        if ( this.moveForward || this.moveBackward ) {
            this.velocity.z -= this.direction.z * 400.0 * deltaTime;
        }
        
        if ( this.moveLeft || this.moveRight ) {
            this.velocity.x -= this.direction.x * 400.0 * deltaTime;
        }
    
        controls.moveRight( - this.velocity.x * deltaTime );
        controls.moveForward( - this.velocity.z * deltaTime );
    
        controls.getObject().position.y += ( this.velocity.y * deltaTime ); // new behavior
    
        if ( controls.getObject().position.y < 10 ) {
    
            this.velocity.y = 0;
            controls.getObject().position.y = 10;
    
            this.canJump = true;
        }
    }

}