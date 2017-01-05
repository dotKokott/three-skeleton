var createApp = require('canvas-testbed')

var THREE = require('three')
var OrbitControls = require('three-orbit-controls')(THREE)

var glsl = require('glslify')

var vert = glsl.file('./shaders/vert.glsl')
var frag = glsl.file('./shaders/frag.glsl')

createApp(render, start, {
    context: 'webgl',
    onResize: resize
})

var renderer,
    scene,
    camera,
    controls

function start(gl, width, height) {
    renderer = new THREE.WebGLRenderer({
        canvas: gl.canvas
    })
    renderer.setClearColor(0x000000, 1.0)

    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(50, width/height, 1, 1000)
    camera.position.set(0, 1, -3)
    camera.lookAt(new THREE.Vector3())

    controls = new OrbitControls(camera)

    var geo = new THREE.BoxGeometry(1,1,1)

    var uniforms = {
        val: { type: "f", value: 1 }
    };
    
    var mat = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vert,
            fragmentShader: frag
        });

    var box = new THREE.Mesh(geo, mat)
    scene.add(box)
}

function render(gl, width, height) {
    renderer.render(scene, camera)
}

function resize(width, height) {
    if (!renderer)
        return

    renderer.setViewport(0, 0, width, height)
    camera.aspect = width/height
    camera.updateProjectionMatrix()
}
