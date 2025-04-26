import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// ----- Setup Canvas ----------------------------------
const canvas = document.querySelector('canvas.webgl')

// ----- Setup Scene -----------------------------------
const scene = new THREE.Scene();

// ----- Setup Axes Helper -----------------------------
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// ----- Create Object ---------------------------------
// Buffer Geometry
const geometry1 = new THREE.BufferGeometry()
const material2 = new THREE.MeshBasicMaterial({color: 'pink', wireframe: true})

const count = 500
const positionsArray = new Float32Array(count * 3 * 3)
for(let i = 0; i < count * 3 * 3; i++){
    positionsArray[i] = Math.random() - 0.5
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry1.setAttribute('position', positionsAttribute)

const cube1 = new THREE.Mesh(geometry1, material2)

// Other Box Geometry

//const texture = new THREE.Texture(image)
//texture.colorSpace = THREE.SRGBColorSpace

const texture = new THREE.TextureLoader().load('textures/basecolor.jpg')
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({
        map: texture,
        roughness: 0.4,
        metalness: 0.1
    })
)
cube2.position.set(2,0,0)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'orange'})
)
cube3.position.set(-3,0,0)

// Group
const group = new THREE.Group()
scene.add(group)
group.add(cube1)
group.add(cube2)
group.add(cube3)

// ----- Setup Lights ---------------------------------
//const light = new THREE.DirectionalLight(0xffffff, 1);
//light.position.set(5, 10, 7.5);
//scene.add(light);

// ----- Setup Camera -------------------------------
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight)
// const aspectRatio = window.innerWidth / window.innerHeight
// const camera = new THREE.OrthographicCamera(-5 * aspectRatio, 5 * aspectRatio, 3 * aspectRatio, -3 * aspectRatio, 1, 1000 )
// camera.position.x = 1
// camera.position.y = 1
camera.position.z = 3
scene.add(camera)

// ----- Controls -----------------------------------
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.target.y = 0
// controls.update()

/* Cursor
const cursor = {
    x : 0,
    y : 0
}
window.addEventListener('mousemove', (eventCursor) => {
    cursor.x = eventCursor.clientX / window.innerWidth - 0.5
    cursor.y = - (eventCursor.clientY / window.innerHeight - 0.5)
})*/

// ----- Resize -----------------------------------
window.addEventListener('resize', () => {
    // Update camera 
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    // Update renderer 
    renderer.setSize(window.innerWidth, window.innerHeight)

})
window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement){
        canvas.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})

// ----- Setup Renderer -----
const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// ----- Render Loop -----
const clock = new THREE.Clock()

const animate = () => {
    // Time
    const elapsedTime = clock.getElapsedTime()
    
    // Update Object
    cube3.position.y = Math.sin(elapsedTime) * 2
        // gsap.to(cube3.position, {duration : Math.cos(elapsedTime), delay: Math.cos(elapsedTime), x: 2})

    cube2.position.x = Math.cos(elapsedTime) * 2
    cube2.position.y = Math.sin(elapsedTime) * 2

    // cube1.rotation.y = elapsedTime

    /* Update Camera with JS
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    camera.position.y = Math.sin(cursor.y * Math.PI * 2) * 3
    camera.lookAt(group.position) */

    // Update Camera with Built-in Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(animate)
}
animate()
