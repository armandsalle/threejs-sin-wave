import * as THREE from "three";

import img from "./hotdog.jpg";
import vshader from "./vertex.vert";
import fshader from "./fragment.frag";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.001,
  1000
);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.PlaneBufferGeometry(1, 1, 10, 10);

const clock = new THREE.Clock();

const uniforms = {
  u_t: {
    value: new THREE.TextureLoader().load(img),
  },
  u_time: {
    value: 0.0,
  },
  u_mouse: {
    value: {
      x: 0.0,
      y: 0.0,
    },
  },
  u_resolution: {
    value: {
      x: 0.0,
      y: 0.0,
    },
  },
  u_color: {
    value: new THREE.Color(0xffff00),
  },
};

const material = new THREE.ShaderMaterial({
  vertexShader: vshader,
  fragmentShader: fshader,
  uniforms: uniforms,
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

camera.position.z = 1;

onWindowResize();

// if ("ontouchstart" in window) {
//   document.addEventListener("touchmove", move);
// } else {
//   window.addEventListener("resize", onWindowResize, false);
//   document.addEventListener("mousemove", move);
// }

// function move(evt) {
//   uniforms.u_mouse.value.x = evt.touches ? evt.touches[0].clientX : evt.clientX;
//   uniforms.u_mouse.value.y = evt.touches ? evt.touches[0].clientY : evt.clientY;
// }

function onWindowResize(event) {
  const aspectRatio = window.innerWidth / window.innerHeight;
  let width, height;
  if (aspectRatio >= 1) {
    width = 1;
    height = (window.innerHeight / window.innerWidth) * width;
  } else {
    width = aspectRatio;
    height = 1;
  }
  camera.left = -width;
  camera.right = width;
  camera.top = height;
  camera.bottom = -height;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (uniforms.u_resolution !== undefined) {
    uniforms.u_resolution.value.x = window.innerWidth;
    uniforms.u_resolution.value.y = window.innerHeight;
  }
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  uniforms.u_time.value = clock.getElapsedTime();
}
animate();
