import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

export default class ModelLoader {
    constructor(_scene) {
        this.scene = _scene
        this.model = new GlftObject()

        this.dracoLoader = new DRACOLoader()
        this.dracoLoader.setDecoderPath('draco/')

        this.gltfLoader = new GLTFLoader()
        this.gltfLoader.setDRACOLoader(this.dracoLoader)
    }

    LoadModelInToEnvironment(modelFilePath, modelPostion) {
        this.gltfLoader.load(modelFilePath, (gltf) => {
            this.gltfObject = gltf.scene
            this.gltfObject.position.set(modelPostion.x, modelPostion.y, modelPostion.z)
            this.scene.add(this.gltfObject)

            this.model.setGltfObject(this.gltfObject)
        })
    }

    setModelLocRotScale(modelPostion, modelRotation, modelScale) {
        this.model.getGltfObject().position.set(modelPostion.x, modelPostion.y, modelPostion.z)
        this.model.getGltfObject().rotation.set(modelRotation.x, modelRotation.y, modelRotation.z)
        this.model.getGltfObject().scale.set(modelScale.x, modelScale.y, modelScale.z)
    }
}

class GlftObject {
    constructor() {
        this.gltfObject = null
    }

    setGltfObject(_gltfObject) {
        this.gltfObject = _gltfObject
    }

    getGltfObject() {
        return this.gltfObject
    }
}